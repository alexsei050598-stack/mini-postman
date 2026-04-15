async function sendRequest() {
    const methodSelect = document.getElementById('method');
    const method = (methodSelect.value || 'GET').toUpperCase();
    const url = document.getElementById('url').value.trim();
    const headersRaw = document.getElementById('headers').value;
    const bodyInput = document.getElementById('body').value;
    const mode = document.getElementById('mode').value;
    const useProxy = !!document.getElementById('useProxy')?.checked;
    const output = document.getElementById('responseOutput');
    const statusLine = document.getElementById('statusLine');
    const requestInfo = document.getElementById('requestInfo');
    const statusBadge = document.getElementById('statusBadge');
    const analysis = document.getElementById('analysis');
    const copyBtn = document.getElementById('copyBtn');

    // URL checks
    if (!url) {
        output.textContent = 'Введите URL перед отправкой.';
        statusLine.textContent = 'Status: —';
        statusLine.className = 'status';
        statusBadge.textContent = '—';
        statusBadge.className = 'status-badge';
        updateMethodStyle(method);
        return;
    }
    try {
        new URL(url);
    } catch (_) {
        output.textContent = 'URL выглядит некорректным. Проверьте схему (http/https) и домен.';
        statusLine.textContent = 'Status: invalid URL';
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        updateMethodStyle(method);
        return;
    }

    // Methods that may carry request body
    const methodAllowsBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    let headers;
    try {
        headers = parseHeaders(headersRaw);
    } catch (err) {
        statusLine.textContent = 'Status: headers error';
        statusLine.className = 'status error';
        output.textContent = err.message;
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        analysis.textContent = '';
        return;
    }

    // Validate JSON body only when Content-Type explicitly says JSON
    const contentTypeHeader = Object.entries(headers).find(([k]) => k.toLowerCase() === 'content-type');
    const hasJsonContentType = contentTypeHeader && contentTypeHeader[1].toLowerCase().includes('application/json');
    if (methodAllowsBody && bodyInput && hasJsonContentType) {
        try {
            JSON.parse(bodyInput);
        } catch (err) {
            statusLine.textContent = 'Status: body is not valid JSON';
            statusLine.className = 'status error';
            output.textContent = 'Тело запроса невалидно для Content-Type application/json: ' + err.message;
            statusBadge.textContent = 'ERR';
            statusBadge.className = 'status-badge error';
            analysis.textContent = '';
            return;
        }
    }

    output.textContent = 'Sending request...';
    statusLine.textContent = 'Status: pending...';
    statusLine.className = 'status';
    statusBadge.textContent = '...';
    statusBadge.className = 'status-badge';
    requestInfo.textContent = `Request: ${method} ${url}`;
    analysis.textContent = '';
    copyBtn.disabled = true;
    updateMethodStyle(method);

    // Save to history right before sending
    saveToHistory({ method, url, body: bodyInput, headers: headersRaw });
    renderHistory();

    const options = { method, headers };

    // Add body only for methods that support it
    if (methodAllowsBody && bodyInput) {
        // Only set content-type if user didn't provide one (case-insensitive)
        const hasContentType = Object.keys(headers).some(
            h => h.toLowerCase() === 'content-type'
        );
        if (!hasContentType && method === 'POST') {
            headers['Content-Type'] = 'application/json';
        }
        options.body = bodyInput;
    }

    try {
        // Simulate network conditions
        if (mode === 'slow3g') {
            await sleep(1500);
        } else if (mode === 'offline') {
            throw new OfflineError('Offline mode enabled');
        }

        let requestUrl = url;
        let requestOptions = options;
        if (useProxy) {
            requestUrl = '/api/proxy';
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                    method,
                    headers,
                    body: methodAllowsBody ? (bodyInput || null) : null
                })
            };
        }

        const response = await fetch(requestUrl, requestOptions);
        const buffer = await response.arrayBuffer();
        const hasBody = buffer.byteLength > 0;
        const text = hasBody ? new TextDecoder().decode(buffer) : '';
        const contentType = response.headers.get('content-type') || '';

        const statusText = response.statusText || '';
        statusLine.textContent = `Status: ${response.status} ${statusText}`.trim();
        statusLine.className = `status ${response.ok ? 'ok' : getStatusClass(response.status)}`;
        const badgeClass = getStatusBadge(response.status);
        statusBadge.textContent = response.status;
        statusBadge.className = `status-badge ${badgeClass}`;
        analysis.textContent = analyzeStatus(response.status);

        const noContent =
            method === 'HEAD' ||
            response.status === 204 ||
            response.status === 304 ||
            !hasBody ||
            text.trim() === '';

        let formatted;
        if (noContent) {
            formatted = '[no content]';
        } else if (contentType.includes('application/json')) {
            formatted = formatJson(text);
        } else if (contentType.startsWith('text/') || contentType.includes('xml') || contentType.includes('html')) {
            formatted = escapeHtml(text || '[empty response]');
        } else {
            formatted = `[binary content] ${buffer.byteLength} bytes` + (contentType ? ` (${contentType})` : '');
        }

        output.innerHTML = formatted;
        copyBtn.disabled = false;

        // Highlight API-side errors (non-2xx)
        if (!response.ok) {
            output.innerHTML =
                `<div>API вернуло ошибку: ${response.status} ${statusText}</div><hr>` +
                output.innerHTML;
        }
    } catch (err) {
        statusLine.textContent = 'Status: failed';
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        analysis.textContent = '';
        copyBtn.disabled = false;
        const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
        if (offline || err instanceof OfflineError) {
            output.textContent = 'Нет соединения с интернетом (offline режим или реальный оффлайн).';
            return;
        }

        output.textContent = getErrorHint(err, url);
    }
}

function formatJson(text, { fallbackToText = false } = {}) {
    try {
        const parsed = JSON.parse(text);
        const json = JSON.stringify(parsed, null, 2);
        return syntaxHighlight(json);
    } catch (_) {
        if (fallbackToText) {
            return escapeHtml(text || '[empty response]');
        }
        throw _;
    }
}

function parseHeaders(raw) {
    const headers = {};
    if (!raw.trim()) return headers;

    const lines = raw.split('\n');
    for (const line of lines) {
        if (!line.trim()) continue;
        const idx = line.indexOf(':');
        if (idx === -1) {
            throw new Error('Каждый header должен быть в формате Key: Value');
        }
        const key = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim();
        if (!key) {
            throw new Error('Header name не может быть пустым');
        }
        headers[key] = value;
    }
    return headers;
}

function getErrorHint(err, requestUrl) {
    if (!(err instanceof TypeError)) {
        return `Ошибка запроса: ${err.message}`;
    }

    let targetHost = '';
    try {
        targetHost = new URL(requestUrl).host;
    } catch (_) {
        return 'Запрос не ушёл: проблемы с сетью, DNS или CORS. ' + err.message;
    }

    const currentHost = typeof window !== 'undefined' ? window.location.host : '';
    const crossOrigin = targetHost && currentHost && targetHost !== currentHost;
    if (crossOrigin) {
        return `Запрос заблокирован браузером (CORS/Network policy) для домена ${targetHost}.`;
    }

    return 'Запрос не ушёл: проблемы с сетью, DNS или CORS. ' + err.message;
}

function addHeaderFromInputs() {
    const key = getSelectedHeaderKey();
    const valueEl = document.getElementById('headerValue');
    const value = (valueEl.value || '').trim();

    if (!key) return;
    appendOrReplaceHeader(key, value);
    valueEl.value = '';
    valueEl.focus();
}

function applyHeaderPreset(type) {
    if (type === 'json') {
        setHeaderSelectValue('Content-Type');
        appendOrReplaceHeader('Content-Type', 'application/json');
    }
    if (type === 'auth') {
        setHeaderSelectValue('Authorization');
        appendOrReplaceHeader('Authorization', 'Bearer ');
    }
    if (type === 'accept') {
        setHeaderSelectValue('Accept');
        appendOrReplaceHeader('Accept', 'application/json');
    }
}

function clearHeadersEditor() {
    document.getElementById('headers').value = '';
}

function formatHeadersEditor() {
    const headersEl = document.getElementById('headers');
    try {
        const obj = parseHeaders(headersEl.value);
        headersEl.value = Object.entries(obj)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n');
    } catch (_) {
        // Keep original content if formatting cannot be applied
    }
}

function appendOrReplaceHeader(key, value) {
    const headersEl = document.getElementById('headers');
    let lines = headersEl.value
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

    const keyLower = key.toLowerCase();
    let replaced = false;
    lines = lines.map(line => {
        const idx = line.indexOf(':');
        if (idx === -1) return line;
        const existingKey = line.slice(0, idx).trim().toLowerCase();
        if (existingKey === keyLower) {
            replaced = true;
            return `${key}: ${value}`;
        }
        return line;
    });

    if (!replaced) lines.push(`${key}: ${value}`);
    headersEl.value = lines.join('\n');
}

function getSelectedHeaderKey() {
    const select = document.getElementById('headerNameSelect');
    const customKeyEl = document.getElementById('headerCustomKey');
    const selected = (select.value || '').trim();
    if (selected === 'Custom') {
        return (customKeyEl.value || '').trim();
    }
    return selected;
}

function setHeaderSelectValue(key) {
    const select = document.getElementById('headerNameSelect');
    if (!select) return;
    const exists = Array.from(select.options).some(opt => opt.value === key);
    select.value = exists ? key : 'Custom';
    toggleCustomHeaderKeyInput();
    if (!exists) {
        const customKeyEl = document.getElementById('headerCustomKey');
        customKeyEl.value = key;
    }
}

function toggleCustomHeaderKeyInput() {
    const select = document.getElementById('headerNameSelect');
    const customKeyEl = document.getElementById('headerCustomKey');
    const showCustom = select && select.value === 'Custom';
    if (!customKeyEl) return;
    customKeyEl.style.display = showCustom ? 'block' : 'none';
    if (showCustom) {
        customKeyEl.focus();
    } else {
        customKeyEl.value = '';
    }
}

function escapeHtml(str) {
    return (str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function syntaxHighlight(json) {
    const escaped = escapeHtml(json);
    return escaped.replace(
        /(\"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\\"])*\"\\s*:?)|(\\b(true|false|null)\\b)|(-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g,
        match => {
            let cls = 'number';
            if (/^\".*\"\\s*:/.test(match)) {
                cls = 'key';
            } else if (/^\"/.test(match)) {
                cls = 'string';
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return `<span class="token ${cls}">${match}</span>`;
        }
    );
}

function getStatusClass(code) {
    if (code >= 200 && code < 300) return 'ok';
    if (code >= 400 && code < 500) return 'warn';
    return 'error';
}

function getStatusBadge(code) {
    if (code >= 200 && code < 300) return 'success';
    if (code >= 400 && code < 500) return 'warn';
    return 'error';
}

function analyzeStatus(code) {
    if (code >= 200 && code < 300) return 'Все ок: ответ 2xx.';
    if (code === 404) return '404: возможно, неверный endpoint или ресурс не существует.';
    if (code === 403) return '403: нет доступа/прав, проверьте авторизацию или токен.';
    if (code >= 500) return '5xx: проблема на стороне сервера, повторите позже или сообщите backend.';
    if (code >= 400 && code < 500) return '4xx: клиентская ошибка, проверьте запрос/права.';
    return '';
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

class OfflineError extends Error {}

// History handling
const HISTORY_KEY = 'mini-postman-history';
const HISTORY_LIMIT = 15;

function saveToHistory(entry) {
    try {
        const existing = loadHistory();
        const filtered = existing.filter(
            e => !(e.method === entry.method && e.url === entry.url && e.body === entry.body && e.headers === entry.headers)
        );
        filtered.unshift({ ...entry, ts: Date.now() });
        const trimmed = filtered.slice(0, HISTORY_LIMIT);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    } catch (_) {
        // If storage fails, silently ignore to keep UX smooth
    }
}

function loadHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (_) {
        return [];
    }
}

function renderHistory() {
    const list = document.getElementById('historyList');
    const history = loadHistory();
    list.innerHTML = '';

    if (!history.length) {
        list.innerHTML = '<div style="color:#888">История пуста</div>';
        return;
    }

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.title = item.url;
        div.onclick = () => fillFromHistory(item);

        const meta = document.createElement('div');
        meta.className = 'meta';
        const methodTag = document.createElement('span');
        methodTag.className = `tag ${item.method.toLowerCase()}`;
        methodTag.textContent = item.method;
        meta.appendChild(methodTag);

        const urlEl = document.createElement('span');
        urlEl.className = 'url';
        urlEl.textContent = item.url;
        meta.appendChild(urlEl);

        div.appendChild(meta);

        if (item.body) {
            const bodyTag = document.createElement('span');
            bodyTag.className = 'tag';
            bodyTag.textContent = 'body';
            div.appendChild(bodyTag);
        }

        if (item.headers) {
            const headersTag = document.createElement('span');
            headersTag.className = 'tag';
            headersTag.textContent = 'headers';
            div.appendChild(headersTag);
        }

        list.appendChild(div);
    });
}

function fillFromHistory(item) {
    document.getElementById('method').value = item.method;
    document.getElementById('url').value = item.url;
    document.getElementById('body').value = item.body || '';
    document.getElementById('headers').value = item.headers || '';
    updateMethodStyle(item.method);
}

// Initial render
window.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) copyBtn.disabled = true;
    updateMethodStyle(document.getElementById('method').value);
    document.getElementById('method').addEventListener('change', e => {
        updateMethodStyle(e.target.value);
    });

    const headerValue = document.getElementById('headerValue');
    const headerNameSelect = document.getElementById('headerNameSelect');
    if (headerNameSelect) {
        headerNameSelect.addEventListener('change', toggleCustomHeaderKeyInput);
        toggleCustomHeaderKeyInput();
    }
    if (headerValue) {
        headerValue.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addHeaderFromInputs();
            }
        });
    }
});

function clearAll() {
    document.getElementById('url').value = '';
    document.getElementById('headers').value = '';
    const headerNameSelect = document.getElementById('headerNameSelect');
    if (headerNameSelect) {
        headerNameSelect.value = 'Content-Type';
    }
    document.getElementById('headerCustomKey').value = '';
    toggleCustomHeaderKeyInput();
    document.getElementById('headerValue').value = '';
    document.getElementById('body').value = '';
    document.getElementById('responseOutput').textContent = '';
    document.getElementById('statusLine').textContent = 'Status: —';
    document.getElementById('statusLine').className = 'status';
    document.getElementById('statusBadge').textContent = '—';
    document.getElementById('statusBadge').className = 'status-badge';
    document.getElementById('requestInfo').textContent = '';
    document.getElementById('analysis').textContent = '';
    document.getElementById('copyBtn').disabled = true;
}

async function copyResponse() {
    const text = document.getElementById('responseOutput').innerText || '';
    if (!text.trim()) return;
    try {
        await navigator.clipboard.writeText(text);
    } catch (_) {
        // ignore clipboard errors
    }
}

function updateMethodStyle(method) {
    const select = document.getElementById('method');
    if (!select) return;
    const normalized = (method || '').toUpperCase();
    select.className = '';
    select.classList.add(`method-${normalized}`);
}
