export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { url, method, headers = {}, body = null } = req.body || {};

        if (!url || !method) {
            res.status(400).json({ error: 'Missing url or method' });
            return;
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch (_) {
            res.status(400).json({ error: 'Invalid target URL' });
            return;
        }

        // Only allow http/https targets
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            res.status(400).json({ error: 'Only http/https URLs are allowed' });
            return;
        }

        const cleanHeaders = {};
        for (const [key, value] of Object.entries(headers)) {
            const lower = key.toLowerCase();
            // Strip hop-by-hop/internal headers
            if (['host', 'origin', 'content-length', 'connection'].includes(lower)) continue;
            const strValue = String(value ?? '');
            if (!isLatin1(strValue)) {
                res.status(400).json({
                    error: 'Invalid header value',
                    message: `Header "${key}" contains non-latin1 characters (for example “…”).`
                });
                return;
            }
            cleanHeaders[key] = strValue;
        }

        const hasBody = body !== null && body !== undefined && body !== '';
        const targetResponse = await fetch(url, {
            method,
            headers: cleanHeaders,
            body: hasBody ? body : undefined,
            redirect: 'follow'
        });

        const responseBuffer = Buffer.from(await targetResponse.arrayBuffer());

        // Pass through status and content-type
        const ct = targetResponse.headers.get('content-type');
        if (ct) res.setHeader('content-type', ct);

        // Optional informative headers
        res.setHeader('x-proxy-target', parsedUrl.host);
        res.setHeader('x-proxy-status', String(targetResponse.status));

        res.status(targetResponse.status).send(responseBuffer);
    } catch (err) {
        res.status(502).json({ error: 'Proxy request failed', message: err.message });
    }
}

function isLatin1(value) {
    for (let i = 0; i < value.length; i += 1) {
        if (value.charCodeAt(i) > 255) return false;
    }
    return true;
}
