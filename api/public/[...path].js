const API_BASE = 'https://aihot.virxact.com';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, context) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  const { params } = context;
  const pathSegments = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const search = new URL(req.url).search;
  const targetUrl = API_BASE + '/api/public/' + pathSegments + search;

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
