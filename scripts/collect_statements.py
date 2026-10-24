#!/usr/bin/env python3
"""Cache official public AtCoder statements for offline use; never fall back across languages."""
import argparse, concurrent.futures, hashlib, html, json, pathlib, re, subprocess, time
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'data/source'
PAGES = SOURCE / 'pages'
MEDIA = ROOT / 'data/media'
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
ALLOWED = {'p','div','section','span','h1','h2','h3','h4','h5','h6','ul','ol','li','pre','code','var','strong','b','em','i','u','s','sub','sup','table','thead','tbody','tfoot','tr','th','td','br','hr','img','a','details','summary','blockquote','center'}
class Node:
    def __init__(self, tag='', attrs=(), parent=None): self.tag,self.attrs,self.parent,self.children=tag,dict(attrs),parent,[]
    def text(self): return ''.join(x if isinstance(x,str) else x.text() for x in self.children)
    def walk(self):
        yield self
        for x in self.children:
            if isinstance(x,Node): yield from x.walk()
    def find(self,pred): return next((x for x in self.walk() if pred(x)),None)
class Tree(HTMLParser):
    def __init__(self,source):
        super().__init__(convert_charrefs=True);self.root=Node();self.cur=self.root;self.feed(source)
    def handle_starttag(self,tag,attrs):
        n=Node(tag,attrs,self.cur); self.cur.children.append(n)
        if tag not in VOID:self.cur=n
    def handle_startendtag(self,tag,attrs):self.handle_starttag(tag,attrs);self.handle_endtag(tag)
    def handle_endtag(self,tag):
        if tag in VOID:return
        n=self.cur
        while n.parent:
            if n.tag==tag:self.cur=n.parent;return
            n=n.parent
    def handle_data(self,s):self.cur.children.append(s)
def get(url,target):
    if target.exists() and target.stat().st_size:return target.read_bytes()
    target.parent.mkdir(parents=True,exist_ok=True)
    tmp=target.with_suffix(target.suffix+'.partial')
    run=subprocess.run(['/usr/bin/curl','--silent','--show-error','--fail','--location','--max-time','40','--retry','2',url,'-o',str(tmp)],capture_output=True,text=True)
    if run.returncode:raise RuntimeError(run.stderr.strip()[:250])
    tmp.replace(target);return target.read_bytes()
def render(n,url):
    if isinstance(n,str):return html.escape(n,quote=False)
    if n.tag in {'script','style','iframe','button','form','input','link','meta'}:return ''
    body=''.join(render(x,url) for x in n.children)
    if n.tag not in ALLOWED:return body
    attrs={k:v for k,v in n.attrs.items() if k in {'colspan','rowspan','alt','title','width','height'}}
    if n.tag=='a':
        target=urljoin(url,n.attrs.get('href',''))
        if target.startswith(('https://','http://','#')):attrs.update(href=target,target='_blank',rel='noopener noreferrer')
    if n.tag=='img':
        target=urljoin(url,n.attrs.get('src',''));suffix=pathlib.Path(urlparse(target).path).suffix
        if suffix.lower() not in {'.svg','.png','.jpg','.jpeg','.gif','.webp'}:suffix='.png'
        name=hashlib.sha256(target.encode()).hexdigest()[:20]+suffix
        get(target,MEDIA/name);attrs['src']='data/media/'+name
    if n.tag=='pre':attrs['class']='statement-code'
    a=''.join(' '+k+'="'+html.escape(str(v),quote=True)+'"' for k,v in attrs.items())
    return '<'+n.tag+a+'>'+body+('' if n.tag in VOID else '</'+n.tag+'>')
def samples(n):
    entries={}; headings=[x for x in n.walk() if re.fullmatch('h[1-6]',x.tag)]
    for h in headings:
        t=h.text().strip();m=re.search(r'(?:Sample\s+(Input|Output)|(?:Input|Output)\s+Example\s*#?|(?:入力例|出力例))\s*([0-9０-９]+)',t,re.I)
        if not m:continue
        kind='input' if ('Input' in t or '入力例' in t) else 'expected';num=int(m.group(2));parent=h.parent
        children=parent.children;start=children.index(h)+1;pre=None
        for c in children[start:]:
            if not isinstance(c,Node):continue
            if re.fullmatch('h[1-6]',c.tag):break
            pre=c.find(lambda a:a.tag=='pre')
            if pre:break
        if pre:entries.setdefault(num,{})[kind]=pre.text().replace('\r\n','\n').strip('\n')+'\n'
    return [v for k,v in sorted(entries.items()) if 'input' in v and 'expected' in v]
def parse(p):
    p=dict(p)
    aliases={'ABC049C':'arc065_a','ABC086C':'arc089_a'}
    if p['label'] in aliases:p['url']=p['url'].rsplit('/',1)[0]+'/'+aliases[p['label']]
    source=get(p['url']+'?lang=ja',PAGES/(p['id']+'.html')).decode('utf-8')
    tree=Tree(source).root;node=tree.find(lambda x:x.attrs.get('id')=='task-statement')
    if not node:raise ValueError('No statement node')
    out={'title':tree.find(lambda x:x.tag=='title').text(),'url':p['url']}
    for language in ('ja','en'):
        n=node.find(lambda x:'lang-'+language in x.attrs.get('class','').split())
        if not n:
            if language=='ja' and not node.find(lambda x:'lang-en' in x.attrs.get('class','').split()):n=node
            else:continue
        main_children=list(n.children);extras=[]
        if p['contestId']=='APG4bPython' or p['label']=='PracticeA':
            for i,c in enumerate(main_children):
                if isinstance(c,Node):
                    h=c.find(lambda x:x.tag in {'h2','h3'} and re.match(r'^(ヒント|テスト入出力|解答例|Notice|References|注意|参考)' ,x.text().strip()))
                    if h:extras=main_children[i:];main_children=main_children[:i];break
        main_html=''.join(render(x,p['url']) for x in main_children)
        corrections=[]
        if language=='en' and p['label']=='ABC201A':
            main_html=main_html.replace('<h3>Constrains</h3>','<h3>Constraints</h3>')
            corrections.append({'kind':'heading','from':'Constrains','to':'Constraints','reason':'Correct official English heading typo; requirements unchanged.'})
        if language=='en' and p['label']=='ABC132C':
            marker='<h3>Problem Statement</h3>';first=main_html.find(marker);second=main_html.find(marker,first+len(marker))
            if second>=0:main_html=main_html[:second]+main_html[second:].replace(marker,'<h3>Constraints</h3>',1)
            corrections.append({'kind':'heading','from':'second Problem Statement','to':'Constraints','reason':'Heading verified against the Japanese constraints section; requirements unchanged.'})
        out[language]={'html':main_html,'samples':samples(Tree(main_html).root),'source':p['url']+'?lang='+language,'provenance':'official'}
        if corrections:out[language]['corrections']=corrections
        if extras:out[language]['supplementaryHtml']=''.join(render(x,p['url']) for x in extras)
    return p['label'],out

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--limit',type=int);ap.add_argument('--workers',type=int,default=3);args=ap.parse_args()
    for d in (SOURCE,PAGES,MEDIA):d.mkdir(parents=True,exist_ok=True)
    problems=json.loads((ROOT/'data/problems.json').read_text());problems=problems[:args.limit] if args.limit else problems
    # Import only user-owned cached pages with a matching canonical task URL.
    for f in (pathlib.Path.home()/'Library/Application Support/CI Practice/cache/pages').glob('*.html'):
        txt=f.read_text()
        for p in problems:
            if p['url']+'?' in txt and not (PAGES/(p['id']+'.html')).exists(): (PAGES/(p['id']+'.html')).write_text(txt)
    manifest_path=SOURCE/'manifest.json';manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else {};errors={}
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        future_map={pool.submit(parse,p):p for p in problems}
        for f in concurrent.futures.as_completed(future_map):
            p=future_map[f]
            try:
                label,record=f.result();manifest[label]=record
                manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
                print('OK',len(manifest),label,','.join(k for k in ('ja','en') if k in record),flush=True)
            except Exception as ex:errors[p['label']]=str(ex);print('ERROR',p['label'],str(ex),flush=True)
    report={'expected':len(problems),'records':len(manifest),'missingEn':[p['label'] for p in problems if 'en' not in manifest.get(p['label'],{})],'errors':errors}
    (SOURCE/'collection-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False),flush=True)
if __name__=='__main__':main()
