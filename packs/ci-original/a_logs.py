"""Set A · access log analysis: reading a data file, dictionaries, sorting, two-pointer windows."""

SAMPLE_LOG = """08:59:58 alice /index.html 200
09:00:03 bob /login 200
09:00:03 alice /search?q=graph 200
09:00:41 carol /index.html 200
09:01:15 bob /api/items 500
09:01:16 bob /api/items 500
09:01:20 alice /api/items 503
09:02:02 dave /index.html 404
09:29:59 alice /logout 200
09:31:10 bob /api/items 200
09:40:00 carol /search?q=dp 200
10:05:00 alice /index.html 200
10:05:30 carol /api/items 502
10:06:10 erin /index.html 200
"""

USERS = ['alice', 'bob', 'carol', 'dave', 'erin', 'frank', 'grace', 'heidi', 'ivan', 'judy', 'mallory', 'niaj', 'olivia', 'peggy', 'rupert', 'sybil', 'trent', 'victor', 'walter', 'yuki', 'zhang', 'kenta', 'mei', 'sora']
PATHS = ['/index.html', '/login', '/logout', '/api/items', '/api/items/42', '/api/cart', '/search?q=graph', '/search?q=dp', '/static/app.js', '/help']


def clock(seconds):
    return f'{seconds // 3600:02d}:{seconds % 3600 // 60:02d}:{seconds % 60:02d}'


def make_log(rng, n, users=None, start=0, end=86399, error_rate=0.12, bursts=0):
    """A sorted log. Bursts concentrate error responses in short intervals."""
    users = users or rng.sample(USERS, rng.randint(1, min(len(USERS), max(1, n // 3) + 1)))
    times = sorted(rng.randint(start, end) for _ in range(n))
    burst_windows = [(t, t + rng.randint(5, 300)) for t in rng.sample(times, min(bursts, len(times)))] if bursts else []
    lines = []
    for t in times:
        user = rng.choice(users)
        path = rng.choice(PATHS)
        in_burst = any(a <= t <= b for a, b in burst_windows)
        if rng.random() < (0.7 if in_burst else error_rate):
            status = rng.choice([500, 502, 503, 504])
        else:
            status = rng.choice([200, 200, 200, 200, 201, 204, 301, 304, 403, 404])
        lines.append(f'{clock(t)} {user} {path} {status}')
    return '\n'.join(lines) + '\n'


def logs(rng, sizes, **options):
    return [{'input': '', 'files': {'access.log': make_log(rng, n, **options)}} for n in sizes]


def session_logs(rng):
    """Few users with gaps clustered around the 1800-second threshold."""
    tests = []
    for size in [5, 8, 12, 30, 60, 200, 2000]:
        users = rng.sample(USERS, rng.randint(1, 4 if size < 100 else 12))
        t = rng.randint(0, 3600)
        lines = []
        for _ in range(size):
            t += rng.choice([0, 1, 30, 600, 1799, 1800, 1801, 2400, 5])
            if t > 86399:
                break
            lines.append(f'{clock(t)} {rng.choice(users)} {rng.choice(PATHS)} {rng.choice([200, 404, 500])}')
        tests.append({'input': '', 'files': {'access.log': '\n'.join(lines) + '\n'}})
    return tests


def window_tests(rng):
    tests = [
        {'input': '1\n', 'files': {'access.log': '00:00:00 alice /a 500\n23:59:59 bob /b 503\n'}},
        {'input': '86400\n', 'files': {'access.log': '00:00:00 alice /a 500\n12:00:00 bob /b 200\n23:59:59 bob /b 503\n'}},
        {'input': '10\n', 'files': {'access.log': '10:00:00 alice /a 200\n10:00:05 bob /b 404\n'}},
        {'input': '5\n', 'files': {'access.log': '00:00:02 carol /x 500\n00:00:02 carol /x 500\n00:00:03 dave /y 501\n'}},
        {'input': '3600\n', 'files': {'access.log': '23:30:00 alice /a 500\n23:59:59 alice /a 500\n'}},
    ]
    for size, width in [(20, 60), (50, 30), (200, 600), (800, 120), (1500, 45), (2500, 900)]:
        tests.append({'input': f'{width}\n', 'files': {'access.log': make_log(rng, size, bursts=max(1, size // 400), error_rate=0.08)}})
    return tests


BRUTE_WINDOW = r"""
W = int(input())
count = [0] * 86400
for line in open('access.log', encoding='utf-8'):
    clock, user, path, status = line.split()
    if int(status) >= 500:
        h, m, s = map(int, clock.split(':'))
        count[h * 3600 + m * 60 + s] += 1
prefix = [0]
for c in count:
    prefix.append(prefix[-1] + c)
best, best_t = -1, 0
for t in range(0, 86400 - W + 1):
    c = prefix[t + W] - prefix[t]
    if c > best:
        best, best_t = c, t
print(best, f'{best_t // 3600:02d}:{best_t % 3600 // 60:02d}:{best_t % 60:02d}')
"""

PREAMBLE = {
    'zh': """某网站把访问记录保存在文本文件 `access.log` 中。每行是一条请求记录，由空格分隔的四个字段组成：

```
时刻 用户名 路径 状态码
```

- 时刻的格式为 `HH:MM:SS`（`00:00:00` 到 `23:59:59`），表示同一天内的时间。文件按时刻非降序排列，同一时刻可能有多条记录。
- 用户名由 1 到 16 个英文小写字母组成。
- 路径以 `/` 开头，不含空白字符。
- 状态码是 100 到 599 的整数。500 及以上表示服务器错误。

文件以换行结尾，记录数 N 满足 1 ≤ N ≤ 20000。各小问的程序都从当前目录读取 `access.log`；除非另有说明，标准输入为空。下面给出的 `access.log` 用于所有样例。""",
    'ja': """あるウェブサイトのアクセス記録が、テキストファイル `access.log` に保存されている。各行は 1 件のリクエストを表し、空白で区切られた次の 4 つの項目からなる。

```
時刻 ユーザー名 パス ステータスコード
```

- 時刻は `HH:MM:SS` 形式（`00:00:00` から `23:59:59`）で、同じ日の時刻を表す。ファイルは時刻の昇順（同じ時刻の行が複数あってもよい）に並んでいる。
- ユーザー名は英小文字 1 文字以上 16 文字以下である。
- パスは `/` で始まり、空白を含まない。
- ステータスコードは 100 以上 599 以下の整数である。500 以上はサーバーエラーを表す。

ファイルは改行で終わり、行数 N は 1 ≤ N ≤ 20000 を満たす。各小問のプログラムはカレントディレクトリの `access.log` を読み込むこと。特に断りがない限り、標準入力は空である。以下の `access.log` はすべての入力例で使われる。""",
    'en': """A web server writes its access records to the text file `access.log`. Each line describes one request with four fields separated by spaces:

```
time user path status
```

- The time has the form `HH:MM:SS` (from `00:00:00` to `23:59:59`) within a single day. Lines are sorted by time in non-decreasing order; several lines may share a time.
- A user name consists of 1 to 16 lowercase English letters.
- A path starts with `/` and contains no whitespace.
- The status is an integer from 100 to 599. A status of 500 or more is a server error.

The file ends with a newline and has N lines, 1 ≤ N ≤ 20000. In every part, read `access.log` from the current directory; standard input is empty unless stated otherwise. The `access.log` shown below is used by all samples.""",
}

PARTS = [
    {
        'id': 'CI-LOG-1',
        'level': 2,
        'points': 15,
        'title': {'zh': '记录与用户', 'ja': '記録とユーザー', 'en': 'Records and Users'},
        'statement': {
            'zh': '输出 `access.log` 的记录数 N，以及出现过的不同用户名的个数。\n\n### 输出\n\n第一行输出 N，第二行输出不同用户名的个数。',
            'ja': '`access.log` の行数 N と、現れる異なるユーザー名の個数を出力せよ。\n\n### 出力\n\n1 行目に N を、2 行目に異なるユーザー名の個数を出力せよ。',
            'en': 'Print the number of records N in `access.log` and the number of distinct user names that appear.\n\n### Output\n\nPrint N on the first line and the number of distinct user names on the second.',
        },
        'samples': [{'input': '', 'expected': '14\n5\n'}],
        'tests': lambda rng: logs(rng, [1, 2, 7, 40, 300, 900]) + [{'input': '', 'files': {'access.log': '00:00:00 zz /a 200\n00:00:00 zz /a 200\n'}}],
        'solution': """users = set()
n = 0
with open('access.log', encoding='utf-8') as f:
    for line in f:
        time, user, path, status = line.split()
        users.add(user)
        n += 1
print(n)
print(len(users))
""",
        'explanation': {
            'zh': '逐行读取文件，用计数器统计行数，用集合（set）保存用户名；集合会自动去掉重复元素，最后它的大小就是不同用户名的个数。`with open(...)` 会在读取结束后关闭文件。每行只需 `split()` 一次，时间复杂度为 O(N)。',
            'ja': 'ファイルを 1 行ずつ読み、行数を数えながらユーザー名を集合（set）に入れる。集合は重複を自動で除くので、最後の要素数が異なるユーザー名の個数になる。`with open(...)` を使えば読み終えたときにファイルが閉じられる。各行は `split()` を 1 回するだけで、計算量は O(N)。',
            'en': 'Read the file line by line, counting lines and adding each user name to a set. A set discards duplicates, so its final size is the number of distinct names. `with open(...)` closes the file when reading ends. Each line is split once, so the work is O(N).',
        },
    },
    {
        'id': 'CI-LOG-2',
        'level': 2,
        'points': 20,
        'title': {'zh': '用户排行', 'ja': 'ユーザー別の件数', 'en': 'Requests per User'},
        'statement': {
            'zh': '对每个用户统计其请求数，并按请求数从多到少输出所有用户；请求数相同时，按用户名的字典序从小到大输出。\n\n### 输出\n\n每行输出一个用户，格式为 `用户名 请求数`。',
            'ja': 'ユーザーごとにリクエスト数を数え、リクエスト数の多い順にすべてのユーザーを出力せよ。リクエスト数が等しい場合は、ユーザー名の辞書順で小さい方を先に出力せよ。\n\n### 出力\n\n1 行に 1 人ずつ、`ユーザー名 リクエスト数` の形式で出力せよ。',
            'en': 'Count the requests of each user and print every user in decreasing order of request count. Break ties by user name in increasing lexicographic order.\n\n### Output\n\nPrint one user per line in the form `user count`.',
        },
        'samples': [{'input': '', 'expected': 'alice 5\nbob 4\ncarol 3\ndave 1\nerin 1\n'}],
        'tests': lambda rng: logs(rng, [1, 3, 10, 50, 400, 900]) + [{'input': '', 'files': {'access.log': '01:00:00 b /a 200\n02:00:00 a /a 200\n03:00:00 c /a 200\n03:00:01 b /a 404\n03:00:02 a /a 200\n'}}],
        'solution': """from collections import Counter

count = Counter()
with open('access.log', encoding='utf-8') as f:
    for line in f:
        count[line.split()[1]] += 1
for user, k in sorted(count.items(), key=lambda item: (-item[1], item[0])):
    print(user, k)
""",
        'explanation': {
            'zh': '用字典（这里用 `collections.Counter`）把用户名映射到次数。排序的关键是写出比较键：`(-次数, 用户名)`。取负号让次数大的排在前面，次数相同时再按用户名升序。不同用户数为 U 时，排序的代价是 O(U log U)，总计 O(N + U log U)。',
            'ja': '辞書（ここでは `collections.Counter`）でユーザー名から件数への対応を作る。並べ替えではキー `(-件数, ユーザー名)` を使う。件数に負号をつけると多い順になり、件数が同じときはユーザー名の昇順になる。ユーザー数を U とすると、全体の計算量は O(N + U log U)。',
            'en': 'Map each user name to a count with a dictionary (here `collections.Counter`). Sort with the key `(-count, name)`: negating the count puts larger counts first, and equal counts fall back to the name in increasing order. With U users the total cost is O(N + U log U).',
        },
    },
    {
        'id': 'CI-LOG-3',
        'level': 3,
        'points': 30,
        'title': {'zh': '会话', 'ja': 'セッション', 'en': 'Sessions'},
        'statement': {
            'zh': """对同一个用户，按时刻顺序考察其全部请求。若两条相邻请求的时刻之差不超过 1800 秒，就认为它们属于同一个会话；否则后一条请求开始一个新的会话。也就是说，一个会话是该用户的一段极长的连续请求，其中每条请求与前一条的间隔都不超过 1800 秒。会话的长度是其中的请求数。

求所有用户的会话总数、最长会话的长度，以及拥有最长会话的全部用户。

### 输出

第一行输出会话总数，第二行输出最长会话的长度，第三行按字典序升序输出拥有最长会话的用户名，以一个空格分隔。

### 样例说明

alice 在 09:29:59 与 10:05:00 之间间隔 2101 秒，因此有两个会话，长度分别为 4 和 1；bob 只有一个长度为 4 的会话，最后两条请求相隔 1794 秒；carol 有两个会话。""",
            'ja': """同じユーザーのリクエストを時刻の順に見る。隣り合う 2 つのリクエストの時刻の差が 1800 秒以下ならば同じセッションに属するとし、そうでなければ後のリクエストから新しいセッションが始まるとする。つまりセッションとは、そのユーザーの連続するリクエストの極大な列で、各リクエストが直前のリクエストから 1800 秒以内にあるものである。セッションの長さは含まれるリクエストの数とする。

全ユーザーのセッションの総数、最も長いセッションの長さ、および最長のセッションを持つすべてのユーザーを求めよ。

### 出力

1 行目にセッションの総数を、2 行目に最長のセッションの長さを、3 行目に最長のセッションを持つユーザー名を辞書順の昇順で空白区切りで出力せよ。

### 入力例の説明

alice は 09:29:59 と 10:05:00 の間が 2101 秒空くため、長さ 4 と 1 の 2 つのセッションを持つ。bob は長さ 4 のセッションを 1 つ持つ（最後の 2 件の間隔は 1794 秒）。carol はセッションを 2 つ持つ。""",
            'en': """Look at the requests of one user in time order. Two consecutive requests belong to the same session if their times differ by at most 1800 seconds; otherwise the later request starts a new session. In other words, a session is a maximal run of a user's consecutive requests in which each request is at most 1800 seconds after the previous one. The length of a session is its number of requests.

Find the total number of sessions over all users, the length of the longest session, and every user who has a session of that length.

### Output

Print the total number of sessions on the first line and the longest length on the second. On the third line print the users with a longest session in increasing lexicographic order, separated by single spaces.

### About the sample

For alice the gap between 09:29:59 and 10:05:00 is 2101 seconds, so she has two sessions of lengths 4 and 1. Bob has one session of length 4 (his last two requests are 1794 seconds apart). Carol has two sessions.""",
        },
        'samples': [{'input': '', 'expected': '7\n4\nalice bob\n'}],
        'tests': session_logs,
        'solution': """last = {}      # user -> time of the previous request
current = {}   # user -> length of the running session
best = {}      # user -> longest session so far
sessions = 0
with open('access.log', encoding='utf-8') as f:
    for line in f:
        clock, user, path, status = line.split()
        h, m, s = map(int, clock.split(':'))
        t = h * 3600 + m * 60 + s
        if user in last and t - last[user] <= 1800:
            current[user] += 1
        else:
            current[user] = 1
            sessions += 1
        last[user] = t
        best[user] = max(best.get(user, 0), current[user])
longest = max(best.values())
print(sessions)
print(longest)
print(' '.join(sorted(user for user, length in best.items() if length == longest)))
""",
        'brute': """records = {}
for line in open('access.log', encoding='utf-8'):
    clock, user, path, status = line.split()
    h, m, s = map(int, clock.split(':'))
    records.setdefault(user, []).append(h * 3600 + m * 60 + s)
lengths = []
for user, times in records.items():
    run = [times[0]]
    for t in times[1:]:
        if t - run[-1] <= 1800:
            run.append(t)
        else:
            lengths.append((len(run), user))
            run = [t]
    lengths.append((len(run), user))
longest = max(length for length, user in lengths)
print(len(lengths))
print(longest)
print(' '.join(sorted({user for length, user in lengths if length == longest})))
""",
        'explanation': {
            'zh': """因为文件已按时刻排序，所以不必先把每个用户的记录分组：只要为每个用户保存“上一条请求的时刻”和“当前会话的长度”，就能在一次扫描中完成。

处理一条请求时，若该用户出现过且间隔不超过 1800 秒，当前会话长度加一；否则开始新会话，会话总数加一。同时维护每个用户的最长会话。注意边界：间隔恰好为 1800 秒时属于同一会话。整个过程为 O(N)。""",
            'ja': """ファイルは時刻順に並んでいるので、ユーザーごとに記録をまとめ直す必要はない。ユーザーごとに「直前のリクエストの時刻」と「現在のセッションの長さ」を辞書で持てば、1 回の走査で求められる。

リクエストを読むたびに、そのユーザーの直前の時刻からの差が 1800 秒以下なら現在のセッションを 1 伸ばし、そうでなければ新しいセッションを始めて総数を 1 増やす。あわせてユーザーごとの最長の長さを更新する。差がちょうど 1800 秒のときは同じセッションである点に注意。計算量は O(N)。""",
            'en': """Because the file is sorted by time, there is no need to group the records by user first. Keep, for each user, the time of the previous request and the length of the running session in dictionaries, and a single pass is enough.

For each request, if the user has a previous request at most 1800 seconds earlier, extend the running session; otherwise start a new session and increase the total. Track each user's longest session as you go. Note the boundary: a gap of exactly 1800 seconds stays in the same session. The pass is O(N).""",
        },
    },
    {
        'id': 'CI-LOG-4',
        'level': 4,
        'points': 35,
        'title': {'zh': '错误高峰', 'ja': 'エラーの集中', 'en': 'Error Burst'},
        'statement': {
            'zh': """把时刻换算为从 `00:00:00` 起的秒数（0 到 86399）。对整数 t（0 ≤ t ≤ 86400 − W），称区间 [t, t + W − 1] 为一个长度为 W 秒的时间窗。

求时间窗内状态码不小于 500 的记录数的最大值，以及达到该最大值的最小的 t。

### 输入

标准输入给出一个整数 W（1 ≤ W ≤ 86400）。

### 输出

在一行中输出最大记录数与最小的 t，以一个空格分隔；t 按 `HH:MM:SS` 格式输出。若文件中没有状态码不小于 500 的记录，输出 `0 00:00:00`。

### 样例说明

W = 60 时，09:01:15、09:01:16、09:01:20 的三条错误记录可以同时落入一个窗口。窗口必须包含 09:01:20，所以 t ≥ 09:00:21，答案为 `3 09:00:21`。W = 3600 时，四条错误记录跨度超过一小时，最多只能包含前三条，最小的 t 为 08:01:21。""",
            'ja': """時刻を `00:00:00` からの秒数（0 以上 86399 以下）に直す。整数 t（0 ≤ t ≤ 86400 − W）に対し、区間 [t, t + W − 1] を長さ W 秒の時間窓と呼ぶ。

時間窓に含まれる、ステータスコードが 500 以上の記録の数の最大値と、その最大値を達成する t のうち最小のものを求めよ。

### 入力

標準入力から整数 W（1 ≤ W ≤ 86400）が与えられる。

### 出力

最大の件数と最小の t を空白区切りで 1 行に出力せよ。t は `HH:MM:SS` 形式で出力すること。ステータスコードが 500 以上の記録がない場合は `0 00:00:00` と出力せよ。

### 入力例の説明

W = 60 のとき、09:01:15、09:01:16、09:01:20 の 3 件のエラーが 1 つの窓に入る。窓は 09:01:20 を含む必要があるので t ≥ 09:00:21 となり、答えは `3 09:00:21` である。W = 3600 のとき、4 件のエラーの幅は 1 時間を超えるため、含められるのは最初の 3 件までであり、最小の t は 08:01:21 である。""",
            'en': """Convert each time to seconds since `00:00:00` (0 to 86399). For an integer t with 0 ≤ t ≤ 86400 − W, the interval [t, t + W − 1] is a time window of W seconds.

Find the largest number of records with status 500 or more that fall in one window, and the smallest t that achieves it.

### Input

Standard input contains one integer W (1 ≤ W ≤ 86400).

### Output

Print the largest count and the smallest t on one line, separated by a space, with t in the form `HH:MM:SS`. If the file has no record with status 500 or more, print `0 00:00:00`.

### About the samples

With W = 60, the three errors at 09:01:15, 09:01:16 and 09:01:20 fit in one window. The window must contain 09:01:20, so t ≥ 09:00:21 and the answer is `3 09:00:21`. With W = 3600, the four errors span more than an hour, so at most the first three fit, and the smallest t is 08:01:21.""",
        },
        'samples': [{'input': '60\n', 'expected': '3 09:00:21\n'}, {'input': '3600\n', 'expected': '3 08:01:21\n'}],
        'tests': window_tests,
        'solution': """import sys
from bisect import bisect_left, bisect_right

W = int(sys.stdin.readline())
errors = []
with open('access.log', encoding='utf-8') as f:
    for line in f:
        clock, user, path, status = line.split()
        if int(status) >= 500:
            h, m, s = map(int, clock.split(':'))
            errors.append(h * 3600 + m * 60 + s)

# An optimal window can always be shifted left until it starts at 0
# or until its right end sits exactly on an error time.
best, best_t = 0, 0
for e in errors:
    t = max(0, e - W + 1)
    count = bisect_right(errors, t + W - 1) - bisect_left(errors, t)
    if count > best or (count == best and t < best_t):
        best, best_t = count, t
print(best, f'{best_t // 3600:02d}:{best_t % 3600 // 60:02d}:{best_t % 60:02d}')
""",
        'brute': BRUTE_WINDOW,
        'explanation': {
            'zh': """先只保留错误记录的时刻，它们已经有序。若把最优窗口向左平移，窗口内的记录数只会在“右端离开某条记录”时减少，因此最小的最优 t 要么是 0，要么满足 t + W − 1 恰好等于某条错误记录的时刻。

于是只需对每条错误时刻 e 检查候选 t = max(0, e − W + 1)，并用二分查找（`bisect`）数出落在 [t, t + W − 1] 内的记录数。复杂度为 O(E log E)，E 是错误记录数。也可以用双指针在 O(E) 内完成，或在 86400 秒上做前缀和。

直接对每个 t 逐条数记录是 O(86400 × E)，记录较多时会超时。""",
            'ja': """まずエラーの記録の時刻だけを取り出す。これらはすでに昇順である。最適な窓を左にずらしていくと、窓の中の件数が減るのは右端がある記録から外れるときだけなので、最小の最適な t は 0 であるか、t + W − 1 がちょうどあるエラーの時刻に一致する。

したがって各エラー時刻 e について候補 t = max(0, e − W + 1) を調べ、[t, t + W − 1] に入る件数を二分探索（`bisect`）で数えればよい。計算量はエラー数を E として O(E log E)。尺取り法なら O(E)、86400 秒の累積和を使う方法もある。

t ごとに記録を 1 件ずつ数える方法は O(86400 × E) となり、記録が多いと時間内に終わらない。""",
            'en': """Keep only the times of error records; they are already sorted. If you slide an optimal window to the left, its count can only drop when the right end leaves a record, so the smallest optimal t is either 0 or has t + W − 1 equal to some error time.

So it is enough to try t = max(0, e − W + 1) for every error time e and count the records in [t, t + W − 1] with binary search (`bisect`). That is O(E log E) for E errors; a two-pointer sweep gives O(E), and a prefix sum over the 86400 seconds also works.

Counting records one by one for every t costs O(86400 × E) and is too slow when there are many records.""",
        },
    },
]

SET = {
    'id': 'logs',
    'title': {'zh': '访问日志分析', 'ja': 'アクセスログの解析', 'en': 'Access Log Analysis'},
    'minutes': 120,
    'preamble': PREAMBLE,
    'files': {'access.log': SAMPLE_LOG},
    'parts': PARTS,
}
