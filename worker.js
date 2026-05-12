const API_BASE = 'https://aihot.virxact.com';
const HTML_URL = 'https://raw.githubusercontent.com/3legepier/aihot-news/main/index.html';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

let htmlCache = null;
let htmlCacheTime = 0;

async function getHTML() {
  if (htmlCache && Date.now() - htmlCacheTime < 300000) return htmlCache;
  try {
    const resp = await fetch(HTML_URL, { headers: { 'User-Agent': UA } });
    if (resp.ok) {
      htmlCache = await resp.text();
      htmlCacheTime = Date.now();
      return htmlCache;
    }
  } catch {}
  return htmlCache || '<html><body><h1>Loading...</h1></body></html>';
}

async function handleAPI(request, url) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }
  const apiPath = url.pathname.replace(/^\/api\/public\/?/, '');
  const targetUrl = API_BASE + '/api/public/' + apiPath + url.search;
  try {
    const resp = await fetch(targetUrl, {
      headers: { 'User-Agent': UA },
    });
    const body = await resp.text();
    return new Response(body, {
      status: resp.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...CORS_HEADERS,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...CORS_HEADERS,
      },
    });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith('/api/public')) {
      return handleAPI(request, url);
    }

    const html = await getHTML();
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};
