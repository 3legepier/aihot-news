import urllib.request, json, sys

urls = [
    'https://aihot-news.vercel.app/',
    'https://aihot-news.vercel.app/api/public/items?mode=selected&take=2',
    'https://aihot-news.vercel.app/api/public/daily',
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=15)
        body = resp.read().decode('utf-8', errors='replace')[:500]
        print(f'OK [{resp.status}] {url}')
        print(f'  Body: {body[:200]}')
    except Exception as e:
        print(f'FAIL {url}')
        print(f'  Error: {e}')
    print()
