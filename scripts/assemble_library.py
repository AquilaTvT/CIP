#!/usr/bin/env python3
"""Build the shipped, offline, three-language library from reviewed local sources."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads((ROOT/p).read_text())
def main():
    problems=read('data/problems.json');source=read('data/source/manifest.json');zh={}
    for part in ['zh-0-1.json','zh-2.json','zh-3.json','zh-4-5.json']:
        values=read('data/translations/'+part)
        if zh.keys() & values.keys():raise ValueError('Duplicate translated labels')
        zh.update(values)
    apg=read('data/translations/en-apg.json');out={}
    for p in problems:
        key=p['label'];s=source[key]
        if not zh.get(key):raise ValueError('Missing Chinese: '+key)
        out[key]={'ja':s['ja'],'en':s.get('en') or {'html':apg[key],'samples':s['ja']['samples'],'source':s['url'],'provenance':'local-translation'},'zh':{'html':zh[key],'samples':s['ja']['samples'],'source':s['url'],'provenance':'local-translation'}}
    (ROOT/'data/statements.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
    (ROOT/'data/statements.js').write_text('window.CI_STATEMENTS='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
    print('Library:',len(out),'problems;',len(out)*3,'local statements')
if __name__=='__main__':main()
