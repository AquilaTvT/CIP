"""Assemble reviewed Chinese problem specifications with unchanged official I/O examples."""
import json,re,html,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
from collect_statements import Tree,Node
ROOT=Path(__file__).resolve().parents[1]
def text(s):
    return ''.join('<code>'+html.escape(part[1:-1])+'</code>' if part.startswith('`') and part.endswith('`') else html.escape(part) for part in re.split(r'(`[^`]+`)',s))
def build(label,spec,source):
    en=source['en']['html'];tree=Tree(en).root
    sections={};current=None
    for n in tree.walk():
        if n.tag=='h3': current=n.text().strip();sections.setdefault(current,[])
        elif n.tag in ('pre','img') and current: sections[current].append(n)
    def raw(n):
        if isinstance(n,str):return html.escape(n,quote=False)
        attrs=''.join(' '+k+'="'+html.escape(v,quote=True)+'"' for k,v in n.attrs.items())
        return '<'+n.tag+attrs+'>'+''.join(raw(c) for c in n.children)+('' if n.tag in {'img','br','hr'} else '</'+n.tag+'>')
    out='<h3>题目</h3>'+''.join('<p>'+text(p)+'</p>' for p in spec['body'].split('\n'))
    out+=''.join(raw(n) for n in sections.get('Problem Statement',[]) if n.tag=='img')
    out+='<h3>约束</h3><ul>'+''.join('<li>'+text(c)+'</li>' for c in spec['constraints'])+'</ul>'
    out+='<h3>输入</h3><p>从标准输入按以下格式读取：</p>'+''.join(raw(n) for n in sections.get('Input',[]))
    out+='<h3>输出</h3><p>'+text(spec['output'])+'</p>'+''.join(raw(n) for n in sections.get('Output',[]))
    for key,nodes in sections.items():
        match=re.fullmatch(r'Sample (Input|Output)\s*(\d+)',key)
        if not match:continue
        kind,num=match.groups();out+='<h3>样例'+('输入 ' if kind=='Input' else '输出 ')+num+'</h3>'+''.join(raw(n) for n in nodes)
        if kind=='Output' and spec.get('examples',{}).get(num):out+='<p>'+text(spec['examples'][num])+'</p>'
    return out
if __name__=='__main__':
    source=json.loads((ROOT/'data/source/manifest.json').read_text());specs=json.loads((ROOT/'data/translations/advanced-specs.json').read_text())
    output={k:build(k,v,source[k]) for k,v in specs.items()}
    (ROOT/'data/translations/zh-4-5.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
    print('Built',len(output),'Chinese statements')
