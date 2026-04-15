const LOCALE_KEY = 'mini-postman-locale';
const I18N = {
    en: {
        kicker: 'QA-ready',
        mode_normal: 'Normal',
        mode_slow3g: 'Slow 3G',
        mode_offline: 'Offline',
        use_proxy: 'Use proxy',
        send: 'Send',
        clear: 'Clear',
        curl_import_title: 'Import from DevTools cURL',
        import: 'Import',
        curl_placeholder: "Paste 'Copy as cURL' command here",
        headers_placeholder: 'Headers (key: value per line)\nContent-Type: application/json\nAuthorization: Bearer ...',
        custom_header: 'Custom...',
        custom_header_key: 'Custom header key',
        header_value_placeholder: 'Header value (e.g. Bearer TOKEN)',
        add: 'Add',
        accept_json: 'Accept JSON',
        format: 'Format',
        clear_headers: 'Clear headers',
        body_placeholder: 'Request body (JSON)',
        history: 'History',
        response: 'Response:',
        copy_response: 'Copy response',
        status_dash: 'Статус: —',
        status_invalid_url: 'Статус: некорректный URL',
        status_invalid_target_url: 'Статус: неверный target URL',
        status_headers_error: 'Статус: ошибка заголовков',
        status_body_invalid_json: 'Статус: body невалидный JSON',
        status_pending: 'Статус: отправка...',
        status_failed: 'Статус: ошибка',
        status_imported: 'Статус: импортировано',
        status_import_error: 'Статус: ошибка импорта',
        status_ok: 'Статус: {status} {statusText}',
        request_prefix: 'Request: {method} {url}',
        enter_valid_url: 'Enter URL before sending.',
        invalid_url_message: 'URL looks invalid. Check scheme (http/https) and domain.',
        invalid_json_message: 'Request body is invalid for Content-Type application/json: {message}',
        no_internet: 'No internet connection (offline mode or real offline).',
        api_error_prefix: 'API returned error: {status} {statusText}',
        no_content: '[no content]',
        empty_response: '[empty response]',
        binary_content: '[binary content] {size} bytes{ct}',
        history_empty: 'History is empty',
        tag_body: 'body',
        tag_headers: 'headers',
        header_format_error: 'Each header must be in format Key: Value',
        header_name_empty: 'Header name cannot be empty',
        header_invalid_chars: 'Header "{key}" has invalid symbols (for example “…”). Use ASCII symbols.',
        curl_insert_hint: 'Paste cURL command from DevTools (Copy as cURL).',
        curl_imported_ok: 'cURL imported. Review fields and press Send.',
        curl_import_failed: 'Failed to import cURL: {message}',
        curl_empty: 'Empty command.',
        curl_must_start: 'Command must start with curl.',
        curl_url_not_found: 'URL not found in cURL command.',
        openai_dashboard_hint: 'For OpenAI use API endpoint like https://api.openai.com/v1/... (not /dashboard/...).',
        network_dns_cors: 'Request failed: network, DNS or CORS issue. {message}',
        cors_blocked: 'Request blocked by browser (CORS/Network policy) for domain {host}.',
        request_error: 'Request error: {message}',
        status_analysis_ok: 'All good: 2xx response.',
        status_analysis_404: '404: possibly wrong endpoint or resource does not exist.',
        status_analysis_403: '403: no access/permissions, check auth token.',
        status_analysis_5xx: '5xx: server-side problem, retry later or contact backend.',
        status_analysis_4xx: '4xx: client error, check request/permissions.'
    },
    ru: {
        kicker: 'QA-ready',
        mode_normal: 'Обычный',
        mode_slow3g: 'Slow 3G',
        mode_offline: 'Оффлайн',
        use_proxy: 'Через прокси',
        send: 'Отправить',
        clear: 'Очистить',
        curl_import_title: 'Импорт из DevTools cURL',
        import: 'Импорт',
        curl_placeholder: "Вставьте команду 'Copy as cURL' сюда",
        headers_placeholder: 'Заголовки (key: value в строке)\nContent-Type: application/json\nAuthorization: Bearer ...',
        custom_header: 'Свой...',
        custom_header_key: 'Свой ключ заголовка',
        header_value_placeholder: 'Значение заголовка (например Bearer TOKEN)',
        add: 'Добавить',
        accept_json: 'Accept JSON',
        format: 'Формат',
        clear_headers: 'Очистить заголовки',
        body_placeholder: 'Тело запроса (JSON)',
        history: 'История',
        response: 'Ответ:',
        copy_response: 'Скопировать ответ',
        status_dash: 'Status: —',
        status_invalid_url: 'Status: invalid URL',
        status_invalid_target_url: 'Status: invalid target URL',
        status_headers_error: 'Status: headers error',
        status_body_invalid_json: 'Status: body is not valid JSON',
        status_pending: 'Status: pending...',
        status_failed: 'Status: failed',
        status_imported: 'Status: imported',
        status_import_error: 'Status: import error',
        status_ok: 'Status: {status} {statusText}',
        request_prefix: 'Request: {method} {url}',
        enter_valid_url: 'Введите URL перед отправкой.',
        invalid_url_message: 'URL выглядит некорректным. Проверьте схему (http/https) и домен.',
        invalid_json_message: 'Тело запроса невалидно для Content-Type application/json: {message}',
        no_internet: 'Нет соединения с интернетом (offline режим или реальный оффлайн).',
        api_error_prefix: 'API вернуло ошибку: {status} {statusText}',
        no_content: '[нет содержимого]',
        empty_response: '[пустой ответ]',
        binary_content: '[бинарный контент] {size} bytes{ct}',
        history_empty: 'История пуста',
        tag_body: 'body',
        tag_headers: 'headers',
        header_format_error: 'Каждый header должен быть в формате Key: Value',
        header_name_empty: 'Header name не может быть пустым',
        header_invalid_chars: 'Header "{key}" содержит недопустимые символы (например “…”). Используйте ASCII символы.',
        curl_insert_hint: 'Вставьте команду cURL из DevTools (Copy as cURL).',
        curl_imported_ok: 'cURL импортирован. Проверьте данные и нажмите Send.',
        curl_import_failed: 'Не удалось импортировать cURL: {message}',
        curl_empty: 'Пустая команда.',
        curl_must_start: 'Команда должна начинаться с curl.',
        curl_url_not_found: 'URL не найден в cURL команде.',
        openai_dashboard_hint: 'Для OpenAI используйте API endpoint вида https://api.openai.com/v1/... (а не /dashboard/...).',
        network_dns_cors: 'Запрос не ушёл: проблемы с сетью, DNS или CORS. {message}',
        cors_blocked: 'Запрос заблокирован браузером (CORS/Network policy) для домена {host}.',
        request_error: 'Ошибка запроса: {message}',
        status_analysis_ok: 'Все ок: ответ 2xx.',
        status_analysis_404: '404: возможно, неверный endpoint или ресурс не существует.',
        status_analysis_403: '403: нет доступа/прав, проверьте авторизацию или токен.',
        status_analysis_5xx: '5xx: проблема на стороне сервера, повторите позже или сообщите backend.',
        status_analysis_4xx: '4xx: клиентская ошибка, проверьте запрос/права.'
    }
};

let currentLocale = localStorage.getItem(LOCALE_KEY) || 'ru';
if (!I18N[currentLocale]) currentLocale = 'ru';

function t(key, vars = {}) {
    const dict = I18N[currentLocale] || I18N.ru;
    let template = dict[key] || I18N.en[key] || key;
    Object.entries(vars).forEach(([k, v]) => {
        template = template.replaceAll(`{${k}}`, String(v ?? ''));
    });
    return template;
}

function setLocale(locale) {
    currentLocale = I18N[locale] ? locale : 'ru';
    localStorage.setItem(LOCALE_KEY, currentLocale);
    applyI18n();
}

function applyI18n() {
    document.documentElement.lang = currentLocale === 'ru' ? 'ru' : 'en';
    const localeLabel = document.getElementById('localeLabel');
    if (localeLabel) localeLabel.textContent = currentLocale.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

    const statusLine = document.getElementById('statusLine');
    if (statusLine && (statusLine.textContent === 'Status: —' || statusLine.textContent === t('status_dash'))) {
        statusLine.textContent = t('status_dash');
    }

    renderHistory();
}

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
        output.textContent = t('enter_valid_url');
        statusLine.textContent = t('status_dash');
        statusLine.className = 'status';
        statusBadge.textContent = '—';
        statusBadge.className = 'status-badge';
        updateMethodStyle(method);
        return;
    }
    try {
        new URL(url);
    } catch (_) {
        output.textContent = t('invalid_url_message');
        statusLine.textContent = t('status_invalid_url');
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        updateMethodStyle(method);
        return;
    }

    const knownUrlIssue = getKnownUrlIssue(url);
    if (knownUrlIssue) {
        statusLine.textContent = t('status_invalid_target_url');
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        output.textContent = knownUrlIssue;
        analysis.textContent = '';
        return;
    }

    // Methods that may carry request body
    const methodAllowsBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    let headers;
    try {
        headers = parseHeaders(headersRaw);
    } catch (err) {
        statusLine.textContent = t('status_headers_error');
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
            statusLine.textContent = t('status_body_invalid_json');
            statusLine.className = 'status error';
            output.textContent = t('invalid_json_message', { message: err.message });
            statusBadge.textContent = 'ERR';
            statusBadge.className = 'status-badge error';
            analysis.textContent = '';
            return;
        }
    }

    output.textContent = '...';
    statusLine.textContent = t('status_pending');
    statusLine.className = 'status';
    statusBadge.textContent = '...';
    statusBadge.className = 'status-badge';
    requestInfo.textContent = t('request_prefix', { method, url });
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
        statusLine.textContent = t('status_ok', { status: response.status, statusText }).trim();
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
            formatted = t('no_content');
        } else if (contentType.includes('application/json')) {
            formatted = formatJson(text);
        } else if (contentType.startsWith('text/') || contentType.includes('xml') || contentType.includes('html')) {
            formatted = escapeHtml(text || t('empty_response'));
        } else {
            formatted = t('binary_content', {
                size: buffer.byteLength,
                ct: contentType ? ` (${contentType})` : ''
            });
        }

        output.innerHTML = formatted;
        copyBtn.disabled = false;

        // Highlight API-side errors (non-2xx)
        if (!response.ok) {
            output.innerHTML =
                `<div>${t('api_error_prefix', { status: response.status, statusText })}</div><hr>` +
                output.innerHTML;
        }
    } catch (err) {
        statusLine.textContent = t('status_failed');
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        analysis.textContent = '';
        copyBtn.disabled = false;
        const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
        if (offline || err instanceof OfflineError) {
            output.textContent = t('no_internet');
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
            throw new Error(t('header_format_error'));
        }
        const key = line.slice(0, idx).trim();
        const value = sanitizeHeaderValue(line.slice(idx + 1).trim());
        if (!key) {
            throw new Error(t('header_name_empty'));
        }
        if (!isLatin1(value)) {
            throw new Error(t('header_invalid_chars', { key }));
        }
        headers[key] = value;
    }
    return headers;
}

function importCurlCommand() {
    const curlInput = document.getElementById('curlInput');
    const output = document.getElementById('responseOutput');
    const statusLine = document.getElementById('statusLine');
    const statusBadge = document.getElementById('statusBadge');
    const analysis = document.getElementById('analysis');
    const raw = (curlInput?.value || '').trim();

    if (!raw) {
        statusLine.textContent = t('status_import_error');
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        output.textContent = t('curl_insert_hint');
        analysis.textContent = '';
        return;
    }

    try {
        const parsed = parseCurlCommand(raw);
        if (!parsed.url) throw new Error(t('curl_url_not_found'));

        document.getElementById('url').value = parsed.url;
        document.getElementById('method').value = parsed.method || 'GET';
        updateMethodStyle(parsed.method || 'GET');
        document.getElementById('headers').value = parsed.headers.join('\n');
        document.getElementById('body').value = parsed.body || '';
        const proxyEl = document.getElementById('useProxy');
        if (proxyEl) proxyEl.checked = true;

        statusLine.textContent = t('status_imported');
        statusLine.className = 'status ok';
        statusBadge.textContent = 'OK';
        statusBadge.className = 'status-badge success';
        output.textContent = t('curl_imported_ok');
        analysis.textContent = '';
    } catch (err) {
        statusLine.textContent = t('status_import_error');
        statusLine.className = 'status error';
        statusBadge.textContent = 'ERR';
        statusBadge.className = 'status-badge error';
        output.textContent = t('curl_import_failed', { message: err.message });
        analysis.textContent = '';
    }
}

function parseCurlCommand(raw) {
    // Remove line continuations to parse multiline copied commands
    const normalized = raw.replace(/\\\r?\n/g, ' ').trim();
    const tokens = shellSplit(normalized);
    if (!tokens.length) throw new Error(t('curl_empty'));
    if (tokens[0] !== 'curl') throw new Error(t('curl_must_start'));

    let method = '';
    let url = '';
    const headers = [];
    const bodyChunks = [];

    for (let i = 1; i < tokens.length; i += 1) {
        const t = tokens[i];
        if (t === '-X' || t === '--request') {
            method = (tokens[i + 1] || '').toUpperCase();
            i += 1;
            continue;
        }
        if (t === '-H' || t === '--header') {
            const headerLine = normalizeCurlValue(tokens[i + 1] || '');
            if (headerLine) headers.push(headerLine);
            i += 1;
            continue;
        }
        if (t === '--url') {
            url = normalizeCurlValue(tokens[i + 1] || '');
            i += 1;
            continue;
        }
        if (t === '-d' || t === '--data' || t === '--data-raw' || t === '--data-binary' || t === '--data-urlencode') {
            bodyChunks.push(normalizeCurlValue(tokens[i + 1] || ''));
            i += 1;
            continue;
        }
        if (/^https?:\/\//i.test(t)) {
            url = normalizeCurlValue(t);
            continue;
        }
    }

    const body = bodyChunks.join('&');
    if (!method) method = body ? 'POST' : 'GET';

    return { method, url, headers, body };
}

function shellSplit(input) {
    const out = [];
    let cur = '';
    let quote = '';
    let escaped = false;

    for (let i = 0; i < input.length; i += 1) {
        const ch = input[i];
        if (escaped) {
            cur += ch;
            escaped = false;
            continue;
        }
        if (ch === '\\') {
            escaped = true;
            continue;
        }
        if (quote) {
            if (ch === quote) {
                quote = '';
            } else {
                cur += ch;
            }
            continue;
        }
        if (ch === '"' || ch === "'") {
            quote = ch;
            continue;
        }
        if (/\s/.test(ch)) {
            if (cur) {
                out.push(cur);
                cur = '';
            }
            continue;
        }
        cur += ch;
    }
    if (cur) out.push(cur);
    return out;
}

function normalizeCurlValue(v) {
    let value = String(v || '').trim();
    if (value.startsWith("$'") && value.endsWith("'")) {
        value = value.slice(2, -1)
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\'/g, "'");
    }
    return value;
}

function sanitizeHeaderValue(value) {
    // Replace typographic punctuation that commonly appears after copy/paste
    return String(value)
        .replace(/\u2026/g, '...')
        .replace(/\u2013/g, '-')
        .replace(/\u2014/g, '-')
        .replace(/\u2018|\u2019/g, "'")
        .replace(/\u201C|\u201D/g, '"');
}

function isLatin1(value) {
    for (let i = 0; i < value.length; i += 1) {
        if (value.charCodeAt(i) > 255) return false;
    }
    return true;
}

function getKnownUrlIssue(rawUrl) {
    let u;
    try {
        u = new URL(rawUrl);
    } catch (_) {
        return null;
    }

    if (u.host === 'api.openai.com' && u.pathname.startsWith('/dashboard/')) {
        return t('openai_dashboard_hint');
    }

    return null;
}

function getErrorHint(err, requestUrl) {
    if (!(err instanceof TypeError)) {
        return t('request_error', { message: err.message });
    }

    let targetHost = '';
    try {
        targetHost = new URL(requestUrl).host;
    } catch (_) {
        return t('network_dns_cors', { message: err.message });
    }

    const currentHost = typeof window !== 'undefined' ? window.location.host : '';
    const crossOrigin = targetHost && currentHost && targetHost !== currentHost;
    if (crossOrigin) {
        return t('cors_blocked', { host: targetHost });
    }

    return t('network_dns_cors', { message: err.message });
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
    if (code >= 200 && code < 300) return t('status_analysis_ok');
    if (code === 404) return t('status_analysis_404');
    if (code === 403) return t('status_analysis_403');
    if (code >= 500) return t('status_analysis_5xx');
    if (code >= 400 && code < 500) return t('status_analysis_4xx');
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
        list.innerHTML = `<div style="color:#888">${t('history_empty')}</div>`;
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
            bodyTag.textContent = t('tag_body');
            div.appendChild(bodyTag);
        }

        if (item.headers) {
            const headersTag = document.createElement('span');
            headersTag.className = 'tag';
            headersTag.textContent = t('tag_headers');
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
    applyI18n();
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

    const localeToggle = document.getElementById('localeToggle');
    if (localeToggle) {
        localeToggle.addEventListener('click', () => {
            setLocale(currentLocale === 'ru' ? 'en' : 'ru');
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
    const curlInput = document.getElementById('curlInput');
    if (curlInput) curlInput.value = '';
    document.getElementById('responseOutput').textContent = '';
    document.getElementById('statusLine').textContent = t('status_dash');
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
