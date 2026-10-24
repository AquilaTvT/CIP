"""Set B · run-length encoding: string scanning, parsing numbers, prefix sums with binary search, interval DP."""

LETTERS = 'abcdefghijklmnopqrstuvwxyz'


def runs_string(rng, runs, max_run, alphabet=3):
    letters = LETTERS[:alphabet]
    out, previous = [], ''
    for _ in range(runs):
        c = rng.choice([x for x in letters if x != previous] or letters)
        out.append(c * rng.randint(1, max_run))
        previous = c
    return ''.join(out)


def encode(s):
    out, i = [], 0
    while i < len(s):
        j = i
        while j < len(s) and s[j] == s[i]:
            j += 1
        out.append(f'{s[i]}{j - i}')
        i = j
    return ''.join(out)


def encode_tests(rng):
    tests = [{'input': 'a\n'}, {'input': 'ab\n'}, {'input': 'z' * 1000 + '\n'}, {'input': 'abcdefghijklmnopqrstuvwxyz\n'}]
    for runs, max_run, alphabet in [(5, 3, 2), (30, 12, 3), (400, 30, 5), (2000, 9, 26)]:
        tests.append({'input': runs_string(rng, runs, max_run, alphabet) + '\n'})
    return tests


def decode_tests(rng):
    tests = [{'input': 'a1\n'}, {'input': 'q100\n'}, {'input': 'a1b1a1b1\n'}]
    for runs, max_run, alphabet in [(4, 3, 2), (40, 15, 4), (300, 40, 6), (1500, 12, 26)]:
        tests.append({'input': encode(runs_string(rng, runs, max_run, alphabet)) + '\n'})
    return tests


def access_tests(rng):
    tests = []
    for runs, max_count, queries in [(1, 5, 5), (3, 1, 3), (6, 10, 20), (50, 10**6, 40), (400, 10**12, 300), (3000, 10**12, 3000)]:
        letters, counts, previous = [], [], ''
        for _ in range(runs):
            c = rng.choice([x for x in LETTERS if x != previous])
            letters.append(c)
            counts.append(rng.randint(1, max_count))
            previous = c
        total = sum(counts)
        ends, acc = [], 0
        for k in counts:
            acc += k
            ends.append(acc)
        picks = [rng.randint(1, total) for _ in range(queries)]
        # Always probe the first and last position of a few runs: the classic off-by-one spots.
        for index in rng.sample(range(runs), min(runs, 5)):
            picks.append(ends[index])
            picks.append(ends[index] - counts[index] + 1)
        encoded = ''.join(f'{c}{k}' for c, k in zip(letters, counts))
        tests.append({'input': f'{encoded}\n{len(picks)}\n' + '\n'.join(map(str, picks)) + '\n'})
    return tests


def fold_tests(rng):
    fixed = ['a', 'ab', 'aaaa', 'aaaaa', 'abab', 'ababab', 'abcabcabcabc', 'aaaaaaaaaaaa' * 8, 'nowisthetime', 'abcabcabcabcabcabcabcabcabcabcx',
             'aabaabaabaabaab' * 4, 'xyxyxyxyxyzzzzzzzzzzxyxyxyxyxyzzzzzzzzzz']
    tests = [{'input': s[:100] + '\n'} for s in fixed]
    for _ in range(6):
        unit = runs_string(rng, rng.randint(1, 4), 3, 3)
        piece = unit * rng.randint(2, 6) + runs_string(rng, 2, 2, 3)
        s = (piece * rng.randint(1, 4))[:100]
        tests.append({'input': s + '\n'})
    for length in [40, 77, 100]:
        tests.append({'input': ''.join(rng.choice('ab') for _ in range(length)) + '\n'})
    return tests


PREAMBLE = {
    'zh': """游程编码（run-length encoding）把字符串中连续重复的字符压缩成“字符 + 次数”。本套题只处理由英文小写字母组成的字符串。

把字符串切分为若干段，使每段由同一个字符重复组成，且相邻两段的字符不同（即每段都是“极长”的连续重复）。若某段由字符 c 重复 k 次构成，就把它写成 c 后接十进制整数 k（k = 1 时也要写出 1）。把各段依次连接起来，就得到该字符串的编码。

例如 `aaabccddddd` 的编码是 `a3b1c2d5`，`xxxxxxxxxxxxy` 的编码是 `x12y1`。各小问从标准输入读取数据。""",
    'ja': """ランレングス符号化（run-length encoding）は、同じ文字の連続を「文字 + 個数」に置き換える圧縮法である。このセットでは英小文字からなる文字列だけを扱う。

文字列を、各部分が同じ文字の繰り返しからなり、隣り合う部分の文字が異なるように分割する（つまり各部分は極大な連続である）。文字 c が k 個並んだ部分を、c の後に十進数の k を続けたもので表す（k = 1 でも 1 を書く）。これらを順に連結したものを、その文字列の符号と呼ぶ。

例えば `aaabccddddd` の符号は `a3b1c2d5`、`xxxxxxxxxxxxy` の符号は `x12y1` である。各小問は標準入力からデータを読み込む。""",
    'en': """Run-length encoding compresses a run of a repeated character into “character + count”. This set only deals with strings of lowercase English letters.

Split the string into pieces so that each piece is one character repeated, and adjacent pieces use different characters (each piece is a maximal run). A piece made of k copies of c is written as c followed by k in decimal (k = 1 is written too). Joining the pieces in order gives the encoding of the string.

For example, `aaabccddddd` encodes to `a3b1c2d5`, and `xxxxxxxxxxxxy` encodes to `x12y1`. Every part reads its data from standard input.""",
}

PARTS = [
    {
        'id': 'CI-RLE-1',
        'level': 2,
        'points': 15,
        'title': {'zh': '编码', 'ja': '符号化', 'en': 'Encode'},
        'statement': {
            'zh': '给定字符串 s，输出它的游程编码。\n\n### 输入\n\n一行，字符串 s（1 ≤ |s| ≤ 10⁵，仅含英文小写字母）。\n\n### 输出\n\n输出 s 的编码。',
            'ja': '文字列 s が与えられる。s の符号を出力せよ。\n\n### 入力\n\n1 行に文字列 s（1 ≤ |s| ≤ 10⁵、英小文字のみ）が与えられる。\n\n### 出力\n\ns の符号を出力せよ。',
            'en': 'Given a string s, print its run-length encoding.\n\n### Input\n\nOne line with the string s (1 ≤ |s| ≤ 10⁵, lowercase letters only).\n\n### Output\n\nPrint the encoding of s.',
        },
        'samples': [{'input': 'aaabccddddd\n', 'expected': 'a3b1c2d5\n'}, {'input': 'z\n', 'expected': 'z1\n'}],
        'tests': encode_tests,
        'solution': """s = input().strip()
parts = []
i = 0
while i < len(s):
    j = i
    while j < len(s) and s[j] == s[i]:
        j += 1
    parts.append(s[i] + str(j - i))
    i = j
print(''.join(parts))
""",
        'brute': """from itertools import groupby
s = input().strip()
print(''.join(c + str(len(list(group))) for c, group in groupby(s)))
""",
        'explanation': {
            'zh': '用两个下标扫描：i 指向当前段的开头，j 向右走到第一个不同的字符，j − i 就是这一段的长度，然后令 i = j 继续。每个字符只被看一次，复杂度 O(|s|)。把各段先放进列表，最后用 `join` 连接，比反复用 `+` 拼接字符串更快。也可以使用 `itertools.groupby`。',
            'ja': '2 つの添字で走査する。i が現在の部分の先頭を指し、j を最初に異なる文字まで進めると、j − i がその部分の長さになる。その後 i = j として続ける。各文字を一度しか見ないので O(|s|) である。部分をリストに集めて最後に `join` で連結するほうが、`+` で文字列をつなぎ続けるより速い。`itertools.groupby` を使ってもよい。',
            'en': 'Scan with two indices: i marks the start of the current run and j walks right to the first different character, so j − i is the run length; then set i = j. Each character is visited once, so the work is O(|s|). Collect the pieces in a list and `join` them at the end, which is faster than growing a string with `+`. `itertools.groupby` works too.',
        },
    },
    {
        'id': 'CI-RLE-2',
        'level': 2,
        'points': 20,
        'title': {'zh': '解码', 'ja': '復号', 'en': 'Decode'},
        'statement': {
            'zh': '给定一个编码 E，输出被编码的原字符串。次数可能有多位数字。\n\n### 输入\n\n一行，编码 E。E 是某个字符串的编码，原字符串长度不超过 10⁵。\n\n### 输出\n\n输出原字符串。',
            'ja': '符号 E が与えられる。もとの文字列を出力せよ。個数は複数桁のことがある。\n\n### 入力\n\n1 行に符号 E が与えられる。E はある文字列の符号であり、もとの文字列の長さは 10⁵ 以下である。\n\n### 出力\n\nもとの文字列を出力せよ。',
            'en': 'Given an encoding E, print the original string. A count may have several digits.\n\n### Input\n\nOne line with the encoding E. E encodes some string of length at most 10⁵.\n\n### Output\n\nPrint the original string.',
        },
        'samples': [{'input': 'a3b1c2d5\n', 'expected': 'aaabccddddd\n'}, {'input': 'x12y1\n', 'expected': 'xxxxxxxxxxxxy\n'}],
        'tests': decode_tests,
        'solution': """e = input().strip()
out = []
i = 0
while i < len(e):
    c = e[i]
    j = i + 1
    while j < len(e) and e[j].isdigit():
        j += 1
    out.append(c * int(e[i + 1:j]))
    i = j
print(''.join(out))
""",
        'brute': """import re
print(''.join(c * int(k) for c, k in re.findall(r'([a-z])(\\d+)', input())))
""",
        'explanation': {
            'zh': '编码由“一个字母 + 一串数字”重复组成。读到字母后，一直向右读取数字，直到遇到下一个字母或末尾，把这段数字用 `int` 转换成次数。常见错误是只读一位数字，例如把 `x12` 当成 `x1` 和 `2`。也可以用正则表达式 `([a-z])(\\d+)` 一次取出所有段。',
            'ja': '符号は「英字 1 文字 + 数字の並び」の繰り返しである。英字を読んだら、次の英字か末尾に達するまで数字を読み進め、その部分を `int` で個数に変換する。よくある誤りは数字を 1 桁しか読まないことで、`x12` を `x1` と `2` と解釈してしまう。正規表現 `([a-z])(\\d+)` ですべての部分を取り出してもよい。',
            'en': 'An encoding is a sequence of “one letter + a run of digits”. After a letter, read digits until the next letter or the end and convert them with `int`. The classic mistake is reading a single digit, turning `x12` into `x1` and `2`. A regular expression `([a-z])(\\d+)` extracts every piece at once.',
        },
    },
    {
        'id': 'CI-RLE-3',
        'level': 3,
        'points': 30,
        'title': {'zh': '随机访问', 'ja': 'ランダムアクセス', 'en': 'Random Access'},
        'statement': {
            'zh': """给定一个编码 E，其中的次数可能非常大，原字符串无法完整展开。对 Q 个询问，求原字符串第 p 个字符（从 1 开始计数）。

### 输入

```
E
Q
p_1
p_2
⋮
p_Q
```

- E 的段数不超过 10⁵，每段的次数为 1 到 10¹² 之间的整数。
- 1 ≤ Q ≤ 10⁵，1 ≤ p_i ≤ 原字符串的长度。

### 输出

把 Q 个询问的答案按顺序连接成一个字符串，输出一行。""",
            'ja': """符号 E が与えられる。個数は非常に大きいことがあり、もとの文字列をすべて展開することはできない。Q 個の質問それぞれについて、もとの文字列の p 文字目（1 から数える）を求めよ。

### 入力

```
E
Q
p_1
p_2
⋮
p_Q
```

- E の部分の数は 10⁵ 以下で、各部分の個数は 1 以上 10¹² 以下の整数である。
- 1 ≤ Q ≤ 10⁵、1 ≤ p_i ≤ もとの文字列の長さ。

### 出力

Q 個の答えを順に連結した文字列を 1 行に出力せよ。""",
            'en': """Given an encoding E whose counts may be huge, so the original string cannot be expanded. Answer Q queries: for each, find the p-th character of the original string (counting from 1).

### Input

```
E
Q
p_1
p_2
⋮
p_Q
```

- E has at most 10⁵ pieces, and each count is an integer from 1 to 10¹².
- 1 ≤ Q ≤ 10⁵ and 1 ≤ p_i ≤ the length of the original string.

### Output

Print the Q answers joined into one string on a single line.""",
        },
        'samples': [
            {'input': 'a3b1c2d5\n4\n1\n4\n5\n11\n', 'expected': 'abcd\n'},
            {'input': 'a1000000000000b1c999999999999\n4\n1\n1000000000000\n1000000000001\n2000000000000\n', 'expected': 'aabc\n'},
        ],
        'tests': access_tests,
        'solution': """import re
import sys
from bisect import bisect_left

data = sys.stdin.read().split()
letters, ends = [], []
total = 0
for c, k in re.findall(r'([a-z])(\\d+)', data[0]):
    total += int(k)
    letters.append(c)
    ends.append(total)          # ends[i] = position of the last character of piece i
q = int(data[1])
print(''.join(letters[bisect_left(ends, int(p))] for p in data[2:2 + q]))
""",
        'brute': """import re, sys
data = sys.stdin.read().split()
pieces = [(c, int(k)) for c, k in re.findall(r'([a-z])(\\d+)', data[0])]
out = []
for p in map(int, data[2:]):
    for c, k in pieces:
        if p <= k:
            out.append(c)
            break
        p -= k
print(''.join(out))
""",
        'explanation': {
            'zh': """把每段的“结束位置”累加成前缀和：第 i 段覆盖位置 (ends[i−1], ends[i]]。第 p 个字符所在的段，就是第一个满足 ends[i] ≥ p 的 i，这正是 `bisect_left(ends, p)` 的含义。

每个询问用二分查找只需 O(log R)，总计 O((R + Q) log R)，其中 R 是段数。逐段减去次数的做法每次询问是 O(R)，当 R 与 Q 都达到 10⁵ 时就太慢了。Python 的整数没有上限，10¹² 量级的和不会溢出。""",
            'ja': """各部分の終わりの位置を累積和として持つ。i 番目の部分は位置 (ends[i−1], ends[i]] を表すので、p 文字目を含む部分は ends[i] ≥ p となる最初の i であり、これは `bisect_left(ends, p)` で求められる。

各質問は二分探索で O(log R) なので、全体で O((R + Q) log R)（R は部分の数）となる。部分を先頭から 1 つずつ引いていく方法は質問ごとに O(R) かかり、R と Q がともに 10⁵ だと間に合わない。Python の整数には上限がないので、10¹² 程度の和があふれる心配はない。""",
            'en': """Accumulate the end position of each piece: piece i covers positions (ends[i−1], ends[i]]. The piece containing position p is the first i with ends[i] ≥ p, which is exactly `bisect_left(ends, p)`.

Each query is a binary search in O(log R), for O((R + Q) log R) in total with R pieces. Subtracting counts piece by piece costs O(R) per query, too slow when R and Q are both 10⁵. Python integers are unbounded, so sums around 10¹² never overflow.""",
        },
    },
    {
        'id': 'CI-RLE-4',
        'level': 5,
        'points': 35,
        'title': {'zh': '折叠', 'ja': '折りたたみ', 'en': 'Folding'},
        'statement': {
            'zh': """游程编码只能压缩单个字符的重复。现在考虑更强的“折叠表示”，它按如下规则定义：

1. 一个英文小写字母是折叠表示，表示它自身。
2. 若 X、Y 是折叠表示，则连接 XY 也是折叠表示，表示两者所表示字符串的连接。
3. 若 X 是折叠表示，k 是不小于 2 的整数（十进制、无前导零），则 `k(X)` 是折叠表示，表示把 X 所表示的字符串重复 k 次。

例如 `3(ab)c` 表示 `abababc`，`2(3(a)b)` 表示 `aaabaaab`。给定字符串 s，求表示 s 的折叠表示的最短长度（括号和数字都计入长度）。

### 输入

一行，字符串 s（1 ≤ |s| ≤ 100，仅含英文小写字母）。

### 输出

输出最短长度。

### 样例说明

`aaaaaaaaaa` 可以写成 `10(a)`，长度为 5。`aaabaaab` 可以写成 `2(aaab)`（长度 7），但 `2(3(a)b)` 长度只有 8，不更短；而 `aaabaaab` 本身长度为 8，所以答案是 7。""",
            'ja': """ランレングス符号化は 1 文字の繰り返ししか圧縮できない。そこで、次の規則で定める「折りたたみ表現」を考える。

1. 英小文字 1 文字は折りたたみ表現であり、その文字自身を表す。
2. X、Y が折りたたみ表現ならば、連結 XY も折りたたみ表現であり、それぞれが表す文字列の連結を表す。
3. X が折りたたみ表現で、k が 2 以上の整数（十進表記、先頭に 0 をつけない）ならば、`k(X)` も折りたたみ表現であり、X が表す文字列を k 回繰り返したものを表す。

例えば `3(ab)c` は `abababc` を、`2(3(a)b)` は `aaabaaab` を表す。文字列 s が与えられるので、s を表す折りたたみ表現の長さ（括弧と数字も数える）の最小値を求めよ。

### 入力

1 行に文字列 s（1 ≤ |s| ≤ 100、英小文字のみ）が与えられる。

### 出力

最小の長さを出力せよ。

### 入力例の説明

`aaaaaaaaaa` は `10(a)` と書けるので長さは 5 である。`aaabaaab` は `2(aaab)`（長さ 7）と書ける。`2(3(a)b)` は長さ 8 で短くならず、`aaabaaab` そのものも長さ 8 なので、答えは 7 である。""",
            'en': """Run-length encoding only compresses repeats of one character. Consider the stronger “folded form”, defined by these rules:

1. A lowercase letter is a folded form and stands for itself.
2. If X and Y are folded forms, their concatenation XY is a folded form, standing for the concatenation of what they stand for.
3. If X is a folded form and k ≥ 2 is an integer (decimal, no leading zeros), then `k(X)` is a folded form standing for the string of X repeated k times.

For example, `3(ab)c` stands for `abababc`, and `2(3(a)b)` stands for `aaabaaab`. Given a string s, find the minimum length of a folded form that stands for s (parentheses and digits count).

### Input

One line with the string s (1 ≤ |s| ≤ 100, lowercase letters only).

### Output

Print the minimum length.

### About the samples

`aaaaaaaaaa` can be written as `10(a)`, of length 5. `aaabaaab` can be written as `2(aaab)` of length 7; `2(3(a)b)` has length 8 and is not shorter, and `aaabaaab` itself has length 8, so the answer is 7.""",
        },
        'samples': [{'input': 'aaaaaaaaaa\n', 'expected': '5\n'}, {'input': 'aaabaaab\n', 'expected': '7\n'}, {'input': 'abababababcdcdcdcd\n', 'expected': '10\n'}],
        'tests': fold_tests,
        'solution': """s = input().strip()
n = len(s)
# best[i][j]: the shortest folded form of s[i..j] (inclusive).
best = [[0] * n for _ in range(n)]
for length in range(1, n + 1):
    for i in range(n - length + 1):
        j = i + length - 1
        if length == 1:
            best[i][j] = 1
            continue
        value = min(best[i][k] + best[k + 1][j] for k in range(i, j))
        piece = s[i:j + 1]
        for p in range(1, length // 2 + 1):
            if length % p == 0 and piece[:p] * (length // p) == piece:
                value = min(value, len(str(length // p)) + 2 + best[i][i + p - 1])
        best[i][j] = value
print(best[0][n - 1])
""",
        'brute': """import sys
from functools import lru_cache
sys.setrecursionlimit(10000)

@lru_cache(maxsize=None)
def fold(t):
    if len(t) == 1:
        return 1
    result = len(t)
    for cut in range(1, len(t)):
        result = min(result, fold(t[:cut]) + fold(t[cut:]))
    for unit in range(1, len(t)):
        if len(t) % unit == 0 and t == t[:unit] * (len(t) // unit):
            result = min(result, len(str(len(t) // unit)) + 2 + fold(t[:unit]))
    return result

print(fold(input().strip()))
""",
        'explanation': {
            'zh': """这是区间动态规划。令 best[i][j] 为子串 s[i..j] 的最短折叠表示长度，按区间长度从小到大计算：

- 长度为 1 时只能写成字母本身，长度 1。
- 规则 2：在某处 k 切开，best[i][k] + best[k+1][j]。这也包含了“原样写出”的情况。
- 规则 3：若子串由长度为 p 的单元重复 L/p 次构成（p 整除 L），可写成 `(L/p)(单元)`，长度为 L/p 的位数 + 2 + best[i][i+p−1]。

最优表示的最外层要么是一次连接，要么是一次重复，所以这两种转移覆盖了所有可能。状态数 O(n²)，每个状态枚举 O(n) 个切点，总计 O(n³)，n = 100 时只有约十万次运算。""",
            'ja': """区間 DP で解く。best[i][j] を部分文字列 s[i..j] の最短の折りたたみ表現の長さとし、区間の長さが短い順に求める。

- 長さ 1 のときは文字そのものなので 1。
- 規則 2：位置 k で分けて best[i][k] + best[k+1][j]。そのまま書く場合もこれに含まれる。
- 規則 3：部分文字列が長さ p の単位の L/p 回の繰り返しなら（p は L の約数）、`(L/p)(単位)` と書け、長さは L/p の桁数 + 2 + best[i][i+p−1] となる。

最適な表現の一番外側は連結か繰り返しのどちらかなので、この 2 種類の遷移ですべての場合を尽くしている。状態は O(n²) 個、各状態で O(n) 個の分割点を調べるので全体で O(n³)。n = 100 なら約 10 万回の計算で済む。""",
            'en': """This is interval dynamic programming. Let best[i][j] be the shortest folded form of s[i..j], computed in order of increasing length:

- Length 1 can only be the letter itself, of length 1.
- Rule 2: cut at k, giving best[i][k] + best[k+1][j]. Writing the substring as is falls under this case.
- Rule 3: if the substring is a unit of length p repeated L/p times (p divides L), write `(L/p)(unit)` with length digits(L/p) + 2 + best[i][i+p−1].

The outermost step of an optimal form is either a concatenation or a repetition, so these two transitions cover every case. There are O(n²) states with O(n) cut points each, O(n³) overall — about a hundred thousand steps for n = 100.""",
        },
    },
]

SET = {
    'id': 'runlength',
    'title': {'zh': '游程编码', 'ja': 'ランレングス符号', 'en': 'Run-Length Encoding'},
    'minutes': 120,
    'preamble': PREAMBLE,
    'files': {},
    'parts': PARTS,
}
