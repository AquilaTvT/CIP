#!/usr/bin/env python3
"""Build reviewed local Chinese/English statements; no online translation dependency."""
import html,json,pathlib,re,sys
from collect_statements import Tree
ROOT=pathlib.Path(__file__).resolve().parents[1]
M=json.loads((ROOT/'data/source/manifest.json').read_text())
T=ROOT/'data/translations'
C={
'ここにプログラムを追記':('在此补全程序','Complete the program here'),
'生徒の数Nを読み込む':('读取学生人数 N','Read the number of students N'),
'各生徒のゴールまでの時間を読み込む':('读取每名学生的完赛用时','Read each finishing time'),
'dataの中で隣り合う等しい要素が存在するなら"YES"を出力し、そうでなければ"NO"を出力する':('若 data 中存在相邻相等元素，输出 YES，否则输出 NO','Print YES if data contains equal adjacent elements; otherwise print NO'),
'リンゴ・パイナップルをそれぞれ1つずつ購入するとき合計S円になるような買い方が何通りあるか':('计算各买一个苹果和菠萝且总价为 S 的选法数','Count apple/pineapple choices with total price S'),
'ここにコードを追記する':('在此补全程序','Complete the program here'),
'x 番の組織が親組織に提出する報告書の枚数を返す関数':('返回组织 x 向上级提交的报告份数','Return the number of reports submitted by organization x'),
'ここに追記して再帰関数を実装する':('在此补全递归函数','Complete the recursive function here'),
'これ以降の行は変更しなくてよい':('以下各行无需修改','The following lines need no changes'),
'p[i] : 組織 i の親組織':('p[i]：组织 i 的上级','p[i]: the parent of organization i'),
'組織 0 の親組織は存在しないので -1 を入れておく':('组织 0 没有上级，设为 −1','Organization 0 has no parent; use -1'),
'組織 0 に相当する部分は入力で与えられないため、リスト [-1] を作成して "+" 演算子で結合する':('输入不含组织 0 的上级，将 [-1] 拼接在读取的列表前','The input omits organization 0; prepend [-1] using list concatenation'),
'children[i] = 組織 i の子組織のリスト':('children[i] 为组织 i 的直属下级列表','children[i] lists the direct children of organization i'),
'組織 i の親組織は parent':('parent 为组织 i 的上级','parent is the parent of organization i'),
'parent の子組織リストに i を追加':('将 i 加入 parent 的下级列表','Add i to the list of children of parent'),
'各組織について答えを計算し出力する':('计算并输出各组织的答案','Compute and print the answer for each organization'),
'1 人のテストの点数を表すリストから合計点を計算して返す関数':('计算并返回一个人成绩列表的总和','Return the sum of one person\'s list of test scores'),
'引数 scores: scores[i] に i 番目のテストの点数が入っている':('参数 scores：scores[i] 保存对应考试成绩','Argument scores: scores[i] contains the corresponding test score'),
'返り値: 1 人のテストの合計点':('返回值：该人的总分','Returns: the person\'s total score'),
'3 人の合計点からプレゼントの予算を計算して出力する関数':('根据三人的总分计算并输出礼物预算','Compute and print the present budget from the three totals'),
'引数 sum_a: A 君のテストの合計点':('参数 sum_a：A 的总分','Argument sum_a: A\'s total score'),
'引数 sum_b: B 君のテストの合計点':('参数 sum_b：B 的总分','Argument sum_b: B\'s total score'),
'引数 sum_c: C 君のテストの合計点':('参数 sum_c：C 的总分','Argument sum_c: C\'s total score'),
'返り値: なし':('返回值：无','Returns: nothing'),
'ここから先は変更しない':('以下部分不要修改','Do not modify the following part'),
'N 個の入力を受け取ってリストに入れて返す関数':('读取 N 个输入值并作为列表返回','Read N input values and return them as a list'),
'引数 N: 入力を受け取る個数':('参数 N：读取数值的个数','Argument N: number of values to read'),
'返り値: 受け取った N 個の整数値からなるリスト':('返回值：读入的 N 个整数构成的列表','Returns: a list of the N integers read'),
'科目の数 N を受け取る':('读取考试科目数 N','Read the number of tests N'),
'それぞれのテストの点数を受け取る':('读取各自考试成绩','Read the test scores'),
'それぞれの合計点を計算':('计算各自总分','Compute each total score'),
'プレゼントの予算を出力':('输出礼物预算','Print the present budget')}
def section(h,s):return '<section><h3>'+h+'</h3>'+s+'</section>'
def para(s):return '<p>'+html.escape(s)+'</p>'
def source_input(s):
    m=re.search(r'<h[1-6]>\s*(?:Input|入力)\s*</h[1-6]>.*?(<pre[^>]*>.*?</pre>)',s,re.S)
    if not m:raise ValueError('missing input')
    return m.group(1).replace('\r','')
def starters(s,lang):
    out=[]
    for n in Tree(s).root.walk():
        if n.tag=='pre' and re.search(r'\binput\(|\bdef ',n.text()):
            code=n.text()
            for k,v in sorted(C.items(),key=lambda z:-len(z[0])):code=code.replace(k,v[0 if lang=='zh' else 1])
            if re.search(r'[ぁ-ヿ]',code):raise ValueError('untranslated starter '+code)
            out.append('<pre>'+html.escape(code)+'</pre>')
    return ''.join(out)
def load_rows(path):
    result=[]
    for line in path.read_text().splitlines():
        if not line:continue
        # Literal vertical bars in mathematical names and prose are content.
        line=line.replace('|AB|','AB').replace('|BC|','BC').replace('|CA|','CA').replace('竖线 | 组成','竖线 ｜ 组成')
        fields=line.split('|');assert len(fields)==5,(fields[0],len(fields))
        result.append(fields)
    return result
def build(lang,path):
    out={}
    for label,description,constraints,output,explain in load_rows(path):
        rec=M[label];src=(rec.get('en') if lang=='zh' else None) or rec['ja'];s=src['html'];explain=explain.split('¦')
        names=('题目','约束','输入','输出','初始程序','样例输入','样例输出') if lang=='zh' else ('Problem Statement','Constraints','Input','Output','Starter Program','Sample Input','Sample Output')
        body=section(names[0],para(description))+section(names[1],para(constraints))+section(names[2],source_input(s))+section(names[3],para(output))
        if label.startswith('APG4bPython'):
            code=starters(rec['ja']['html'],lang)
            if code:body+=section(names[4],code)
        for i,sample in enumerate(src['samples'],1):
            body+=section(names[5]+' '+str(i),'<pre>'+html.escape(sample['input'])+'</pre>')
            body+=section(names[6]+' '+str(i),'<pre>'+html.escape(sample['expected'])+'</pre>'+(para(explain[i-1]) if len(explain)>=i and explain[i-1] else ''))
        # The source diagrams are part of the problem and remain available offline.
        imgs=re.findall(r'<img\b[^>]*>',s)
        for img in imgs:
            img=re.sub(r' alt="[^"]*"',' alt="'+('题目附图' if lang=='zh' else 'Problem diagram')+'"',img)
            body+='<p>'+img+'</p>'
        out[label]=body
    return out
zh=build('zh',T/'zh-0-1-source.txt');en=build('en',T/'en-apg-source.txt')
(T/'zh-0-1.json').write_text(json.dumps(zh,ensure_ascii=False,indent=2)+'\n')
(T/'en-apg.json').write_text(json.dumps(en,ensure_ascii=False,indent=2)+'\n')
print('Chinese',len(zh),'English',len(en))
