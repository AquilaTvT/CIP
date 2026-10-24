"""Apply independently written Chinese prose while preserving official markup/data."""
import sys, re, json, html
from pathlib import Path
from collections import Counter
sys.path.insert(0,str(Path(__file__).resolve().parent))
from collect_statements import Tree,Node,VOID
ROOT=Path(__file__).resolve().parents[1]

def render(n):
 if isinstance(n,str):return html.escape(n,quote=False)
 body=''.join(render(x) for x in n.children)
 if not n.tag:return body
 attrs=''.join(' '+k+'="'+html.escape(str(v),quote=True)+'"' for k,v in n.attrs.items())
 return '<'+n.tag+attrs+'>'+body+('' if n.tag in VOID else '</'+n.tag+'>')

def prose(n):
 tokens=[]
 def visit(x):
  if isinstance(x,str):return x
  if x.tag in {'var','code','img'}:
   idx=len(tokens);tokens.append(render(x));return '{'+str(idx)+'}'
  if x.tag=='br':return ' '
  return ''.join(visit(y) for y in x.children)
 return re.sub(r'\s+',' ',''.join(visit(x) for x in n.children)).strip(),tokens

def auto(s):
 fixes={'Problem Statement':'题目描述','Constraints':'约束','Input':'输入','Output':'输出','Note':'说明','Notes':'说明','Scoring':'评分','The input is given from Standard Input in the following format:':'输入通过标准输入给出，格式如下：','Input is given from Standard Input in the following format:':'输入通过标准输入给出，格式如下：','All values in the input are integers.':'输入中的所有数值均为整数。','All input values are integers.':'输入中的所有数值均为整数。','All inputs are integers.':'输入均为整数。'}
 if s in fixes:return fixes[s]
 if re.fullmatch(r'Score\s*:\s*\{0\}\s*points',s):return '分值：{0}'
 m=re.fullmatch(r'Sample (Input|Output)\s*(\d+)',s)
 if m:return '样例'+('输入 ' if m[1]=='Input' else '输出 ')+m[2]
 if not re.search('[a-zA-Z]',re.sub(r'\{\d+\}','',s)):return s
 return None

def collect():
 problems=json.loads((ROOT/'data/problems.json').read_text());source=json.loads((ROOT/'data/source/manifest.json').read_text()); entries=[]
 for p in problems:
  if p['level']!=3:continue
  label=p['label'];tree=Tree(source[label]['en']['html']).root; blocks=[]
  for container in list(tree.walk()):
   if container.tag not in {'details','section','div','li'}:continue
   children=[];group=[]
   def flush():
    if not group:return
    text=''.join(x if isinstance(x,str) else x.text() for x in group)
    if re.search('[a-zA-Z]',text):
     paragraph=Node('p',parent=container);paragraph.children=list(group);children.append(paragraph)
    else:children.extend(group)
    group.clear()
   for child in container.children:
    if isinstance(child,str) or child.tag in {'var','code','a','strong','em','b','i','span','br'}:group.append(child)
    else:flush();children.append(child)
   flush();container.children=children
  for n in tree.walk():
   if n.tag not in {'p','li','h1','h2','h3','h4','h5','h6','summary','th','td'}:continue
   if any(a is not n and a.tag in {'p','li','pre','table'} for a in n.walk()):continue
   s,tokens=prose(n)
   if not s:continue
   automatic=auto(s)
   blocks.append((n,s,tokens,automatic))
  entries.append((label,tree,blocks))
 return entries

if __name__=='__main__':
 entries=collect()
 if len(sys.argv)>1 and sys.argv[1]=='show':
  start=int(sys.argv[2]);end=int(sys.argv[3])
  for label,tree,blocks in entries[start:end]:
   print('\n###',label)
   for i,(n,s,tokens,automatic) in enumerate(blocks):
    if automatic is None:print(f'{label}:{i}|{s}  TOKENS: '+ ' '.join(f'{j}='+re.sub('<[^>]+>','',v) for j,v in enumerate(tokens)))
 else:
  translated={}
  for line in (ROOT/'data/translations/zh-3-prose.txt').read_text().splitlines():
   if '|' in line:
    key,value=line.split('|',1);translated[key]=value
  output={};missing=[]
  for label,tree,blocks in entries:
   for i,(n,s,tokens,automatic) in enumerate(blocks):
    value=automatic if automatic is not None else translated.get(f'{label}:{i}')
    if value is None:missing.append(f'{label}:{i}');continue
    if Counter(re.findall(r'\{\d+\}',value))!=Counter(re.findall(r'\{\d+\}',s)):
     raise ValueError(f'Placeholder mismatch {label}:{i}: '+value)
    encoded=html.escape(value,quote=False)
    encoded=re.sub(r'\{(\d+)\}',lambda match:tokens[int(match[1])],encoded)
    n.children=Tree(encoded).root.children
   output[label]=render(tree)
  if missing:raise ValueError('Missing '+','.join(missing))
  (ROOT/'data/translations/zh-3.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
  print('Translated',len(output),'complete statements')
