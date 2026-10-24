#!/usr/bin/env python3
"""Apply checked-in reviewed static Chinese translations; no translation service or network."""
import json,re,html
from pathlib import Path
m=json.loads(Path('data/source/manifest.json').read_text()); ps=json.loads(Path('data/problems.json').read_text())
records={}
common={'Problem Statement':'题目描述','Constraints':'约束','Input':'输入','Output':'输出','The input is given from Standard Input in the following format:':'输入通过标准输入给出，格式如下：','Input is given from Standard Input in the following format:':'输入通过标准输入给出，格式如下：','All values in the input are integers.':'输入中的所有数值均为整数。','All input values are integers.':'输入中的所有数值均为整数。','Print the answer.':'输出答案。','Print the answer as an integer.':'以整数形式输出答案。','Print the answer as an integer. ':'以整数形式输出答案。'}
for p in ps:
 if p['level']!=2:continue
 label=p['label'];src=m[label]['en']['html'];blocks=[]
 for match in re.finditer(r'<(p|li|h3)(?:\s[^>]*)?>(.*?)</\1>',src,re.S):
  raw=match.group(2);tokens=[]
  def tok(mt):
   tokens.append(mt.group(0));return '{'+str(len(tokens)-1)+'}'
  text=re.sub(r'<(?:var|code)(?:\s[^>]*)?>.*?</(?:var|code)>|<img\b[^>]*>',tok,raw,flags=re.S)
  text=html.unescape(re.sub('<[^>]*>','',text));text=re.sub(r'\s+',' ',text).strip()
  translated=common.get(text)
  if re.fullmatch(r'Sample (Input|Output) \d+',text):translated=text.replace('Sample Input','输入样例').replace('Sample Output','输出样例')
  if re.fullmatch(r'Score\s*:\s*\{0\}\s*points',text):translated='配点：{0} 分'
  if not re.search('[A-Za-z]',text):translated=text
  if re.fullmatch(r'\{0\} is an integer\.',text):translated='{0} 是整数。'
  if re.fullmatch(r'\{0\} and \{1\} are integers\.',text):translated='{0} 和 {1} 均为整数。'
  blocks.append({'start':match.start(2),'end':match.end(2),'text':text,'tokens':tokens,'translation':translated})
 records[label]={'source':src,'blocks':blocks}

label=""
for line in Path('data/translations/source/zh-2.tsv').read_text().splitlines():
 if not line:continue
 if '\t' not in line:label=line;continue
 idx,value=line.split('\t',1);records[label]['blocks'][int(idx)]['translation']=value
result={};missing=[]
for label,r in records.items():
 src=r['source']
 for i,b in reversed(list(enumerate(r['blocks']))):
  value=b['translation']
  if value is None:missing.append((label,i,b['text']));continue
  for n,tok in enumerate(b['tokens']):
   if '{'+str(n)+'}' not in value:raise ValueError(f'Missing token {label} {i} {n}')
  value=re.sub(r'\{(\d+)\}',lambda mt:b['tokens'][int(mt.group(1))],value)
  src=src[:b['start']]+value+src[b['end']:]
 result[label]=src
print('missing:',missing)
if missing:raise SystemExit(1)

result['ABC289B']=re.sub(r'<details>.*?</details>', '<details><summary>什么是连通分量？</summary>\n从一个图中选取部分顶点和边所得到的图，称为原图的<b>子图</b>。<br>\n如果任意两个顶点之间都能沿边互相到达，则称这个图是<b>连通的</b>。<br>\n<b>连通分量</b>是一个连通子图，且不存在包含它的更大的连通子图。\n</details>',result['ABC289B'],flags=re.S)
result['ABC200A']=re.sub(r'<details>.*?</details>', '<details><summary>什么是世纪？</summary>\n一个世纪是一百年。例如，第 <var>1</var> 世纪是公元 <var>1</var> 年至 <var>100</var> 年，第 <var>2</var> 世纪是公元 <var>101</var> 年至 <var>200</var> 年，以此类推。\n</details>',result['ABC200A'],flags=re.S)
result['ABC335B']=result['ABC335B'].replace('What is lexicographical order for non-negative integer triples?','什么是非负整数三元组的字典序？')
Path('data/translations/zh-2.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print('Rebuilt',len(result),'manually translated Chinese statements.')
