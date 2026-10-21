"""Check generated metadata, structured data, local URLs, fragments, and sitemap."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET
ROOT=Path('geek-services-site')
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags=[]; self.ids=set(); self.ld=[]; self.in_ld=False; self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags.append((tag,a))
        if 'id' in a: self.ids.add(a['id'])
        if tag=='script' and a.get('type')=='application/ld+json': self.in_ld=True
    def handle_endtag(self, tag):
        if tag=='script': self.in_ld=False
    def handle_data(self, data):
        if self.in_ld: self.ld.append(json.loads(data))
files=list(ROOT.rglob('*.html'))
pages={f:Page(f.read_text()) for f in files}
titles=set(); descriptions=set(); urls=set(); links=0
for file,page in pages.items():
    raw=file.read_text()
    tags=page.tags
    assert sum(t=='h1' for t,a in tags)==1, file
    head=Page(raw.split('</head>',1)[0])
    assert sum(t=='title' for t,a in head.tags)==1, file
    desc=[a['content'] for t,a in tags if t=='meta' and a.get('name')=='description']
    assert len(desc)==1 and desc[0] not in descriptions, file
    descriptions.add(desc[0])
    import re
    title=re.search('<title>(.*?)</title>',raw)[1]
    assert title not in titles,file
    titles.add(title)
    canonical=[a['href'] for t,a in tags if t=='link' and a.get('rel')=='canonical']
    assert len(canonical)==1 and canonical[0].startswith('https://geekservicesny.com/'),file
    assert canonical[0] not in urls,file
    urls.add(canonical[0])
    og=[a['content'] for t,a in tags if t=='meta' and a.get('property')=='og:url']
    assert og==canonical,file
    assert page.ld,file
    assert not any(t=='meta' and a.get('name')=='keywords' for t,a in tags),file
    for tag,attrs in tags:
        href=attrs.get('href') if tag in ('a','link') else attrs.get('src')
        if not href: continue
        parts=urlsplit(href)
        if parts.scheme or parts.netloc: continue
        path=unquote(parts.path)
        target=(ROOT/path.lstrip('/')) if path.startswith('/') else file.parent/path
        if not path: target=file
        if target.is_dir(): target=target/'index.html'
        assert target.exists(),f'{file}: broken link {href}'
        if parts.fragment and target.suffix=='.html':
            assert parts.fragment in pages[target].ids,f'{file}: missing fragment {href}'
        links+=1
sitemap=ET.parse(ROOT/'sitemap.xml')
sitemap_urls={x.text for x in sitemap.findall('.//{*}loc')}
assert sitemap_urls==urls-{'https://geekservicesny.com/thank-you/'}
contact=pages[ROOT/'contact/index.html']
forms=[a for t,a in contact.tags if t=='form']
assert len(forms)==1 and forms[0].get('data-netlify')=='true' and forms[0].get('method')=='POST'
assert (ROOT/'thank-you/index.html').exists()
print(f'Passed: {len(files)} pages, {links} local links/assets, unique SEO metadata, JSON-LD, sitemap, form configuration.')
