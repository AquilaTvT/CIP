"""Set E · a rail network: parsing, Dijkstra, a state graph for transfers, earliest arrival on a timetable."""

SAMPLE_LINES = """# line  headway  station minutes station minutes ... station
Marunouchi 4 Ikebukuro 7 Korakuen 2 Hongo-sanchome 2 Ochanomizu 2 Awajicho 2 Otemachi 2 Tokyo
Namboku 6 Komagome 4 Todaimae 2 Korakuen 3 Iidabashi 4 Yotsuya

Chuo 4 Tokyo 2 Kanda 2 Ochanomizu 4 Iidabashi 3 Yotsuya 6 Shinjuku
Oedo 5 Ueno 3 Hongo-sanchome 2 Kasuga 3 Iidabashi 12 Shinjuku
Yamanote 3 Tokyo 2 Kanda 2 Akihabara 4 Ueno 10 Komagome 8 Ikebukuro 9 Shinjuku 7 Shibuya
Inokashira 7 Shibuya 3 Komaba-todaimae 4 Shimokitazawa 16 Kichijoji
"""

SYLLABLES = ['a', 'i', 'ka', 'ki', 'ku', 'ko', 'sa', 'shi', 'su', 'se', 'ta', 'chi', 'tsu', 'to', 'na', 'ni', 'no', 'ha', 'hi',
             'fu', 'ma', 'mi', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 'wa', 'ga', 'gi', 'go', 'za', 'ji', 'da', 'ba', 'be']
PREFIXES = ['', '', '', '', 'Kita-', 'Minami-', 'Higashi-', 'Nishi-', 'Shin-', 'Naka-']
SUFFIXES = ['', '', '', 'yama', 'kawa', 'bashi', 'dai', 'machi', 'zaka', 'hara', 'oka', 'shima', 'mae']
LINE_NAMES = ['Sakura', 'Hikari', 'Kodama', 'Asahi', 'Midori', 'Aoba', 'Kaede', 'Tsubame', 'Hayate', 'Komachi', 'Nozomi',
              'Mizuho', 'Hibari', 'Tsubasa', 'Yamabiko', 'Toki', 'Asama', 'Kagayaki', 'Sazanami', 'Wakashio', 'Tokiwa',
              'Azusa', 'Kaiji', 'Odoriko', 'Shiosai', 'Ayame', 'Akagi', 'Kusatsu', 'Nasuno', 'Hakutaka']


def unique_words(rng, count, make):
    words, seen = [], set()
    while len(words) < count:
        word = make()
        if word not in seen:
            seen.add(word)
            words.append(word)
    return words


def station_names(rng, count):
    return unique_words(rng, count, lambda: rng.choice(PREFIXES) + (''.join(
        rng.choice(SYLLABLES) for _ in range(rng.randint(2, 3))) + rng.choice(SUFFIXES)).capitalize())


def line_names(rng, count):
    names = rng.sample(LINE_NAMES, min(count, len(LINE_NAMES)))
    extra = unique_words(rng, count - len(names) + 10, lambda: ''.join(rng.choice(SYLLABLES) for _ in range(3)).capitalize())
    return names + [name for name in extra if name not in names][:count - len(names)]


def network(rng, stations, lines, length=(3, 10), share=0.3, max_time=8, components=1):
    """Lines as random walks over a pool of station names; separate pools give separate components."""
    names = station_names(rng, stations)
    titles = line_names(rng, lines)
    pools = [names[i::components] for i in range(components)]
    result = []
    for index, title in enumerate(titles):
        pool = pools[index % components]
        used = sorted({s for line in result if line[2] is pool for s in line[1]}, key=pool.index)
        fresh = [s for s in pool if s not in used]
        route = [rng.choice(used) if used else fresh.pop(0)]
        for _ in range(rng.randint(*length) - 1):
            options = [s for s in used if s not in route]
            if fresh and (not options or rng.random() > share):
                route.append(fresh.pop(rng.randrange(len(fresh))))
            elif options:
                route.append(rng.choice(options))
        if len(route) < 2:
            continue
        result.append((title, route, pool))
    text = ['# line headway stations and minutes']
    for title, route, _ in result:
        words = [title, str(rng.randint(2, 15))]
        for station in route[:-1]:
            words += [station, str(rng.randint(1, max_time))]
        words.append(route[-1])
        text.append(' '.join(words))
        if rng.random() < 0.1:
            text.append('')
    return '\n'.join(text) + '\n', sorted({s for _, route, _ in result for s in route})


def queries(rng, stations, count, with_time=False):
    lines = [str(count)]
    for _ in range(count):
        a = rng.choice(stations)
        b = a if rng.random() < 0.05 else rng.choice(stations)
        lines.append(f'{a} {b}' + (f' {rng.randint(0, 1000)}' if with_time else ''))
    return '\n'.join(lines) + '\n'


def small_networks():
    return [
        '# one line\nSolo 5 Alpha 3 Beta\n',
        'Red 4 A 1 B 1 C 1 D\nBlue 6 X 2 B 2 Y\nGreen 3 C 5 Y 1 Z\n',
        'East 10 P 5 Q\nWest 10 Q 1 P\n',
        '# two separate towns\nUp 2 N1 1 N2 1 N3\nDown 3 S1 4 S2\n',
    ]


def summary_tests(rng):
    files = small_networks()
    files.append('Ring 4 A 1 B 1 C\nRing2 4 C 1 D 1 A\nRing3 4 B 1 D\nRing4 4 D 9 E\n')
    for stations, lines, share in [(20, 4, 0.3), (60, 10, 0.4), (200, 25, 0.35), (900, 70, 0.3)]:
        files.append(network(rng, stations, lines, share=share, length=(3, 20))[0])
    return [{'input': '', 'files': {'lines.txt': f}} for f in files]


def travel_tests(rng, with_transfer=False, with_time=False):
    tests = []
    for text in small_networks():
        names = sorted({w for line in text.splitlines() if line and not line.startswith('#') for w in line.split()[2::2]})
        body = queries(rng, names, 6, with_time).split('\n', 1)[1]
        head = f'{rng.choice([0, 2, 10])} 6\n' if with_transfer else '6\n'
        tests.append({'input': head + body, 'files': {'lines.txt': text}})
    for stations, lines, components, count in [(15, 3, 1, 10), (40, 8, 2, 30), (120, 16, 1, 50), (300, 30, 1, 60), (400, 40, 2, 60)]:
        text, names = network(rng, stations, lines, components=components, length=(3, 15), max_time=9)
        body = queries(rng, names, count, with_time).split('\n', 1)[1]
        head = f'{rng.choice([1, 3, 5, 15, 40])} {count}\n' if with_transfer else f'{count}\n'
        tests.append({'input': head + body, 'files': {'lines.txt': text}})
    return tests


PARSE = """
lines = []
with open('lines.txt', encoding='utf-8') as f:
    for raw in f:
        words = raw.split()
        if not words or words[0].startswith('#'):
            continue
        name, headway, *rest = words
        lines.append((name, int(headway), rest[0::2], [int(t) for t in rest[1::2]]))
"""

BRUTE_PARSE = """import sys
data = [l.split() for l in open('lines.txt') if l.strip() and not l.lstrip().startswith('#')]
"""

PREAMBLE = {
    'zh': """某城市的铁路网保存在文件 `lines.txt` 中。空行和以 `#` 开头的行是注释；其余每行描述一条线路，格式为

```
线路名 H 站名 时间 站名 时间 … 站名
```

站名与时间交替出现：线路依次经过 k 个车站（k ≥ 2），第 i 个时间是第 i 站与第 i + 1 站之间的行驶时间（分钟）。列车在两个方向上运行，所需时间相同。H 是发车间隔，只在第 4 问中使用。线路名与站名由英文字母、数字和 `-` 组成。一条线路不会两次经过同一个站；不同线路可以经过同一个站，在该站可以换乘。

1 ≤ 行驶时间 ≤ 30，1 ≤ H ≤ 30；车站至多 1000 个，各线路的区间数之和至多 3000。样例中的线路图是对东京若干线路的大幅简化，时间只是示意。各小问都从当前目录读取 `lines.txt`。""",
    'ja': """ある都市の鉄道網がファイル `lines.txt` に保存されている。空行と `#` で始まる行はコメントである。それ以外の各行は 1 つの路線を表し、形式は次のとおりである。

```
路線名 H 駅名 時間 駅名 時間 … 駅名
```

駅名と時間が交互に並ぶ。路線は k 個の駅を順に通り（k ≥ 2）、i 番目の時間は i 番目の駅と i + 1 番目の駅の間の所要時間（分）である。列車は両方向に走り、所要時間はどちらも同じである。H は運転間隔で、小問 4 でのみ使う。路線名と駅名は英字・数字・`-` からなる。1 つの路線が同じ駅を 2 度通ることはない。異なる路線が同じ駅を通ることはあり、その駅で乗り換えができる。

1 ≤ 所要時間 ≤ 30、1 ≤ H ≤ 30 であり、駅は 1000 個以下、全路線の区間数の総和は 3000 以下である。例の路線図は東京のいくつかの路線を大きく簡略化したもので、時間も目安にすぎない。各小問はカレントディレクトリの `lines.txt` を読み込む。""",
    'en': """The rail network of a city is stored in the file `lines.txt`. Empty lines and lines starting with `#` are comments; every other line describes one rail line in the form

```
name H station minutes station minutes … station
```

Stations and times alternate: the line passes k stations in order (k ≥ 2), and the i-th time is the travel time in minutes between the i-th and (i + 1)-th stations. Trains run in both directions and take the same time either way. H is the headway between trains, used only in part 4. Names consist of letters, digits and `-`. A line never passes the same station twice; different lines may share a station, where passengers can change.

1 ≤ travel time ≤ 30 and 1 ≤ H ≤ 30; there are at most 1000 stations and at most 3000 sections over all lines. The sample map is a heavily simplified piece of Tokyo with illustrative times. Each part reads `lines.txt` from the current directory.""",
}

PARTS = [
    {
        'id': 'CI-RAIL-1',
        'level': 2,
        'points': 15,
        'title': {'zh': '换乘站', 'ja': '乗換駅', 'en': 'Interchanges'},
        'statement': {
            'zh': '求车站的个数 N 和线路的条数 L。再列出所有换乘站——有两条或更多线路经过的车站——以及经过它的线路条数：按线路条数从多到少排列，条数相同时按站名的字典序（字符编码顺序）排列。\n\n### 输出\n\n第一行输出 N 和 L。之后每行输出一个换乘站，格式为 `站名 线路条数`。',
            'ja': '駅の個数 N と路線の本数 L を求めよ。さらに、すべての乗換駅（2 本以上の路線が通る駅）を、通る路線の本数とともに列挙せよ。本数の多い順に並べ、本数が等しい場合は駅名の辞書順（文字コード順）とする。\n\n### 出力\n\n1 行目に N と L を出力せよ。続けて乗換駅を 1 行に 1 つずつ、`駅名 本数` の形式で出力せよ。',
            'en': 'Find the number of stations N and the number of lines L. Then list every interchange, a station served by two or more lines, with the number of lines serving it: more lines first, ties broken by station name in lexicographic (character code) order.\n\n### Output\n\nPrint N and L on the first line, then one interchange per line in the form `station count`.',
        },
        'samples': [{'input': '', 'expected': '20 6\nIidabashi 3\nShinjuku 3\nTokyo 3\nHongo-sanchome 2\nIkebukuro 2\nKanda 2\nKomagome 2\nKorakuen 2\nOchanomizu 2\nShibuya 2\nUeno 2\nYotsuya 2\n'}],
        'tests': summary_tests,
        'solution': PARSE + """
lines_at = {}
for name, _, stations, _ in lines:
    for station in stations:
        lines_at.setdefault(station, set()).add(name)

print(len(lines_at), len(lines))
interchanges = [(station, len(names)) for station, names in lines_at.items() if len(names) >= 2]
for station, count in sorted(interchanges, key=lambda item: (-item[1], item[0])):
    print(station, count)
""",
        'brute': BRUTE_PARSE + """from collections import Counter
count = Counter(s for words in data for s in set(words[2::2]))
print(len(count), len(data))
for k in range(len(data), 1, -1):
    for s in sorted(s for s, c in count.items() if c == k):
        print(s, k)
""",
        'explanation': {
            'zh': '用字典把站名映射到经过它的线路集合：`lines_at.setdefault(station, set()).add(name)`，站的个数就是字典的大小。排序时用 `key=lambda item: (-item[1], item[0])`：取负号让条数从多到少，条数相同时按站名升序。Python 的字符串比较正是按字符编码逐个比较，与题目要求一致。读文件时要跳过空行与注释行；`line.split()` 会顺便去掉行尾的换行符和多余的空格。',
            'ja': '辞書で駅名を、その駅を通る路線の集合に対応づける：`lines_at.setdefault(station, set()).add(name)`。駅の個数は辞書の大きさである。並べ替えには `key=lambda item: (-item[1], item[0])` を使う。符号を反転すると本数の多い順になり、本数が等しければ駅名の昇順になる。Python の文字列比較は文字コードを先頭から比べるので、問題の要求と一致する。ファイルを読むときは空行とコメント行を飛ばす。`line.split()` は行末の改行や余分な空白もまとめて取り除いてくれる。',
            'en': 'Map each station name to the set of lines serving it with `lines_at.setdefault(station, set()).add(name)`; the number of stations is the size of the dictionary. Sort with `key=lambda item: (-item[1], item[0])`: negating the count puts larger counts first, and equal counts fall back to ascending names. Python compares strings by character code, exactly as required. Skip empty and comment lines while reading; `line.split()` also drops the trailing newline and extra spaces.',
        },
    },
    {
        'id': 'CI-RAIL-2',
        'level': 3,
        'points': 20,
        'title': {'zh': '最短行驶时间', 'ja': '最短所要時間', 'en': 'Shortest Travel Time'},
        'statement': {
            'zh': '先不考虑换乘与等车，只计算列车的行驶时间。标准输入的第一行是询问数 Q（1 ≤ Q ≤ 100），接下来 Q 行各有两个站名 A、B，它们都在 `lines.txt` 中出现。对每个询问，求从 A 到 B 的最短行驶时间；无法到达时输出 `-1`。A 与 B 相同时答案为 0。\n\n### 输出\n\n对每个询问输出一行。',
            'ja': 'まず乗り換えや待ち時間は考えず、列車の所要時間だけを考える。標準入力の 1 行目に質問の個数 Q（1 ≤ Q ≤ 100）があり、続く Q 行にそれぞれ駅名 A、B が与えられる。どちらも `lines.txt` に現れる駅である。各質問について、A から B への最短の所要時間を求めよ。到達できない場合は `-1` を出力せよ。A と B が同じなら答えは 0 である。\n\n### 出力\n\n各質問について 1 行ずつ出力せよ。',
            'en': 'Ignore transfers and waiting for now and count only the time spent on trains. The first line of standard input holds the number of queries Q (1 ≤ Q ≤ 100); each of the next Q lines holds two station names A and B that appear in `lines.txt`. For each query, find the shortest travel time from A to B, or print `-1` if B cannot be reached. If A and B are the same, the answer is 0.\n\n### Output\n\nPrint one line per query.',
        },
        'samples': [{'input': '3\nTodaimae Komaba-todaimae\nHongo-sanchome Tokyo\nKichijoji Kichijoji\n', 'expected': '24\n6\n0\n'}],
        'tests': lambda rng: travel_tests(rng),
        'solution': 'import heapq\nimport sys\n' + PARSE + """
graph = {}
for _, _, stations, times in lines:
    for a, b, t in zip(stations, stations[1:], times):
        graph.setdefault(a, []).append((b, t))
        graph.setdefault(b, []).append((a, t))


def shortest(source, target):
    dist = {source: 0}
    heap = [(0, source)]
    while heap:
        d, u = heapq.heappop(heap)
        if u == target:
            return d
        if d > dist[u]:
            continue
        for v, t in graph[u]:
            if d + t < dist.get(v, float('inf')):
                dist[v] = d + t
                heapq.heappush(heap, (d + t, v))
    return -1


q, *rest = sys.stdin.read().split('\\n')
for query in rest[:int(q)]:
    a, b = query.split()
    print(shortest(a, b))
""",
        'brute': BRUTE_PARSE + """from collections import deque
edges = {}
for words in data:
    st, tm = words[2::2], [int(x) for x in words[3::2]]
    for i in range(len(tm)):
        edges.setdefault(st[i], []).append((st[i + 1], tm[i]))
        edges.setdefault(st[i + 1], []).append((st[i], tm[i]))
tokens = sys.stdin.read().split()
for i in range(int(tokens[0])):
    a, b = tokens[1 + 2 * i], tokens[2 + 2 * i]
    best = {a: 0}
    queue = deque([a])
    while queue:
        u = queue.popleft()
        for v, t in edges[u]:
            if best[u] + t < best.get(v, 10 ** 9):
                best[v] = best[u] + t
                queue.append(v)
    print(best.get(b, -1))
""",
        'explanation': {
            'zh': """行驶时间各不相同，不能用 BFS，要用 Dijkstra 算法。把每条线路上相邻的两站连成一条无向边，存进邻接表；同一对车站被几条线路连接时，保留几条边也没有关系。

每个询问从 A 做一次 Dijkstra：用 `heapq` 取出当前距离最小的车站，若取出的距离比记录的大就跳过（那是过期的堆元素），否则松弛它的邻边。取出 B 时即可结束。每个询问的复杂度为 O((V + E) log V)，V、E 分别是车站数与区间数。A 与 B 相同时，第一次取出的就是 B，自然得到 0。""",
            'ja': """所要時間が区間ごとに異なるので BFS は使えず、Dijkstra 法を使う。各路線で隣り合う 2 駅を無向辺で結び、隣接リストに入れる。同じ 2 駅が複数の路線で結ばれていても、辺を複数持ったままでかまわない。

各質問について A から Dijkstra 法を 1 回行う。`heapq` から距離の最も小さい駅を取り出し、記録より大きい距離なら古い要素なので飛ばし、そうでなければ隣接する辺を緩和する。B を取り出した時点で終えてよい。1 質問あたり O((V + E) log V) で、V と E は駅と区間の数である。A と B が同じなら最初に取り出すのが B なので、自然に 0 になる。""",
            'en': """Travel times differ from section to section, so BFS does not apply; use Dijkstra's algorithm. Join each pair of neighbouring stations on a line with an undirected edge in an adjacency list. When several lines connect the same pair, keeping parallel edges is harmless.

Run one Dijkstra from A per query: pop the station with the smallest distance from `heapq`, skip it if the popped distance is larger than the recorded one (a stale entry), and otherwise relax its edges. Stop when B is popped. Each query costs O((V + E) log V) for V stations and E sections. When A equals B, the first station popped is B, giving 0 with no special case.""",
        },
    },
    {
        'id': 'CI-RAIL-3',
        'level': 4,
        'points': 30,
        'title': {'zh': '换乘的代价', 'ja': '乗り換えの手間', 'en': 'The Cost of Changing'},
        'statement': {
            'zh': '现在考虑换乘：在车站从一条线路换到另一条线路需要 T 分钟。出发时可以乘坐经过 A 的任意一条线路，不计换乘。标准输入的第一行是 T 和 Q（0 ≤ T ≤ 60，1 ≤ Q ≤ 100），接下来 Q 行各有两个站名 A、B。对每个询问，求从 A 到 B 所需的最短时间，即行驶时间与换乘时间之和；无法到达时输出 `-1`。A 与 B 相同时答案为 0。\n\n### 输出\n\n对每个询问输出一行。',
            'ja': '乗り換えを考える。駅で 1 つの路線から別の路線へ乗り換えるには T 分かかる。出発時は A を通る任意の路線に乗ることができ、これは乗り換えに数えない。標準入力の 1 行目に T と Q（0 ≤ T ≤ 60、1 ≤ Q ≤ 100）があり、続く Q 行にそれぞれ駅名 A、B が与えられる。各質問について、A から B へ行くのに必要な最短の時間（所要時間と乗り換え時間の和）を求めよ。到達できない場合は `-1` を出力せよ。A と B が同じなら答えは 0 である。\n\n### 出力\n\n各質問について 1 行ずつ出力せよ。',
            'en': 'Now changing lines costs time: switching from one line to another at a station takes T minutes. At the start, the passenger may board any line through A without it counting as a change. The first line of standard input holds T and Q (0 ≤ T ≤ 60, 1 ≤ Q ≤ 100); each of the next Q lines holds two station names A and B. For each query, find the least total time from A to B, travel plus changes, or print `-1` if B cannot be reached. If A and B are the same, the answer is 0.\n\n### Output\n\nPrint one line per query.',
        },
        'samples': [{'input': '10 3\nTodaimae Komaba-todaimae\nHongo-sanchome Tokyo\nKichijoji Kichijoji\n', 'expected': '51\n8\n0\n'}],
        'tests': lambda rng: travel_tests(rng, with_transfer=True),
        'solution': 'import heapq\nimport sys\n' + PARSE + """
# A state is (station, line): where the passenger is and which line they are on.
ride = {}
lines_at = {}
for index, (_, _, stations, times) in enumerate(lines):
    for station in stations:
        lines_at.setdefault(station, []).append(index)
    for a, b, t in zip(stations, stations[1:], times):
        ride.setdefault((a, index), []).append(((b, index), t))
        ride.setdefault((b, index), []).append(((a, index), t))


def shortest(source, target, change):
    dist = {(source, line): 0 for line in lines_at[source]}
    heap = [(0, source, line) for line in lines_at[source]]
    while heap:
        d, station, line = heapq.heappop(heap)
        if station == target:
            return d
        if d > dist[(station, line)]:
            continue
        moves = list(ride.get((station, line), []))
        moves += [((station, other), change) for other in lines_at[station] if other != line]
        for state, cost in moves:
            if d + cost < dist.get(state, float('inf')):
                dist[state] = d + cost
                heapq.heappush(heap, (d + cost, *state))
    return -1


first, *rest = sys.stdin.read().split('\\n')
change, q = map(int, first.split())
for query in rest[:q]:
    a, b = query.split()
    print(shortest(a, b, change))
""",
        'brute': BRUTE_PARSE + """from collections import deque
tokens = sys.stdin.read().split()
T, Q = int(tokens[0]), int(tokens[1])
edges = {}
for li, words in enumerate(data):
    st, tm = words[2::2], [int(x) for x in words[3::2]]
    for i in range(len(tm)):
        edges.setdefault((st[i], li), []).append(((st[i + 1], li), tm[i]))
        edges.setdefault((st[i + 1], li), []).append(((st[i], li), tm[i]))
states = list(edges)
for (s, li) in states:
    for (s2, lj) in states:
        if s == s2 and li != lj:
            edges[(s, li)].append(((s, lj), T))
for i in range(Q):
    a, b = tokens[2 + 2 * i], tokens[3 + 2 * i]
    best = {state: 0 for state in states if state[0] == a}
    queue = deque(best)
    while queue:
        u = queue.popleft()
        for v, t in edges[u]:
            if best[u] + t < best.get(v, 10 ** 9):
                best[v] = best[u] + t
                queue.append(v)
    found = [d for state, d in best.items() if state[0] == b]
    print(min(found) if found else -1)
""",
        'explanation': {
            'zh': """只用“车站”作为状态是不够的：到达同一个站时坐的是哪条线，决定了之后要不要付换乘的代价。所以把 (车站, 线路) 一起作为状态。沿线路行驶对应 (第 i 站, l) 与 (第 i + 1 站, l) 之间权为行驶时间的边；在同一站换线对应从 (s, l) 到 (s, l′) 权为 T 的边。

出发时可以坐经过 A 的任意线路，所以把所有 (A, l) 的距离都设为 0 并放进堆，这是多起点的 Dijkstra；第一次取出车站为 B 的状态时，它的距离就是答案。

状态数等于各线路站数之和，至多 4000 左右。一个站有 m 条线路时有 m(m − 1) 条换乘边；若 m 很大，可以加一个“站厅”顶点：(s, l) → 站厅权 T，站厅 → (s, l′) 权 0，边数就只与 m 成正比。""",
            'ja': """駅だけを状態にするのでは足りない。同じ駅に着いても、どの路線に乗っているかによって、その後に乗り換えの手間がかかるかどうかが変わるからである。そこで (駅, 路線) を状態とする。路線に沿った移動は (i 番目の駅, l) と (i + 1 番目の駅, l) を結ぶ重み＝所要時間の辺、同じ駅での乗り換えは (s, l) から (s, l′) への重み T の辺になる。

出発時は A を通る任意の路線に乗れるので、すべての (A, l) の距離を 0 としてヒープに入れる（多始点の Dijkstra 法）。駅が B である状態を初めて取り出したときの距離が答えである。

状態の数は各路線の駅数の総和で、高々 4000 程度である。m 本の路線が通る駅には m(m − 1) 本の乗換辺ができる。m が大きいときは「コンコース」頂点を加え、(s, l) → コンコースを重み T、コンコース → (s, l′) を重み 0 とすれば、辺の数は m に比例する程度で済む。""",
            'en': """Stations alone are not enough as states: arriving at the same station on different lines leads to different futures, because staying on the current line is free while switching costs T. So use (station, line) as the state. Riding gives an edge between (i-th station, l) and ((i + 1)-th station, l) weighted by the travel time; changing at a station gives an edge from (s, l) to (s, l′) of weight T.

At the start any line through A may be boarded, so put every (A, l) into the heap with distance 0, a multi-source Dijkstra. The first popped state whose station is B gives the answer.

There is one state per station on each line, about 4000 at most. A station served by m lines gets m(m − 1) change edges; if m were large, a concourse vertex would help: (s, l) → concourse with weight T and concourse → (s, l′) with weight 0, so the edges grow only linearly in m.""",
        },
    },
    {
        'id': 'CI-RAIL-4',
        'level': 5,
        'points': 35,
        'title': {'zh': '按时刻表出行', 'ja': '時刻表どおりに', 'en': 'Following the Timetable'},
        'statement': {
            'zh': """最后考虑时刻表。每条线路的两个终点站各自在第 0, H, 2H, … 分钟发出一班列车，列车一直开到另一端，在中途各站不停留：从第 1 站于第 d 分钟出发的列车，在第 d +（前 i − 1 个行驶时间之和）分钟到达并立即离开第 i 站；反方向的列车同理。乘客位于车站时，可以搭乘此后（包括同一分钟）离开该站的任意一班列车；换乘不另外花费时间。

标准输入的第一行是询问数 Q（1 ≤ Q ≤ 100），接下来 Q 行各有站名 A、B 和整数 s（0 ≤ s ≤ 1000），表示乘客在第 s 分钟位于 A。对每个询问，求最早在第几分钟到达 B；无法到达时输出 `-1`。A 与 B 相同时答案为 s。

### 输出

对每个询问输出一行。""",
            'ja': """最後に時刻表を考える。各路線の両端の駅から、それぞれ 0, H, 2H, … 分に列車が 1 本ずつ発車し、反対側の端まで走る。途中の駅では停車時間がない。すなわち 1 番目の駅を d 分に発車した列車は、d +（最初の i − 1 個の所要時間の和）分に i 番目の駅に着き、すぐに発車する。逆方向の列車も同様である。駅にいる乗客は、その時刻以降（同じ分を含む）にその駅を発車する任意の列車に乗れる。乗り換えに追加の時間はかからない。

標準入力の 1 行目に質問の個数 Q（1 ≤ Q ≤ 100）があり、続く Q 行にそれぞれ駅名 A、B と整数 s（0 ≤ s ≤ 1000）が与えられる。乗客は s 分に A にいる。各質問について、B に最も早く到着する時刻（分）を求めよ。到達できない場合は `-1` を出力せよ。A と B が同じなら答えは s である。

### 出力

各質問について 1 行ずつ出力せよ。""",
            'en': """Finally, follow the timetable. From each of the two terminals of a line, a train departs at minutes 0, H, 2H, … and runs to the other end without dwelling at intermediate stations: a train leaving the first station at minute d reaches the i-th station at minute d + (the sum of the first i − 1 travel times) and leaves it at once. Trains in the opposite direction behave the same way. A passenger at a station can board any train leaving it at that minute or later; changing trains takes no extra time.

The first line of standard input holds the number of queries Q (1 ≤ Q ≤ 100); each of the next Q lines holds station names A and B and an integer s (0 ≤ s ≤ 1000), meaning the passenger is at A at minute s. For each query, find the earliest minute at which the passenger can reach B, or print `-1` if B cannot be reached. If A and B are the same, the answer is s.

### Output

Print one line per query.""",
        },
        'samples': [{'input': '3\nTodaimae Komaba-todaimae 0\nTodaimae Komaba-todaimae 40\nUeno Kasuga 58\n', 'expected': '45\n73\n65\n'}],
        'tests': lambda rng: travel_tests(rng, with_time=True),
        'solution': 'import heapq\nimport sys\n' + PARSE + """
# For each station: (next station, minutes, offset of this station from the terminal, headway)
legs = {}
for _, headway, stations, times in lines:
    offsets = [0]
    for t in times:
        offsets.append(offsets[-1] + t)
    total = offsets[-1]
    for i, t in enumerate(times):
        a, b = stations[i], stations[i + 1]
        legs.setdefault(a, []).append((b, t, offsets[i], headway))              # away from the first terminal
        legs.setdefault(b, []).append((a, t, total - offsets[i + 1], headway))  # towards it


def departure(now, offset, headway):
    # the first train with departure offset + k * headway >= now, k >= 0
    if now <= offset:
        return offset
    return offset + -(-(now - offset) // headway) * headway


def earliest(source, target, start):
    best = {source: start}
    heap = [(start, source)]
    while heap:
        now, u = heapq.heappop(heap)
        if u == target:
            return now
        if now > best[u]:
            continue
        for v, t, offset, headway in legs.get(u, []):
            arrive = departure(now, offset, headway) + t
            if arrive < best.get(v, float('inf')):
                best[v] = arrive
                heapq.heappush(heap, (arrive, v))
    return -1


q, *rest = sys.stdin.read().split('\\n')
for query in rest[:int(q)]:
    a, b, s = query.split()
    print(earliest(a, b, int(s)))
""",
        'brute': BRUTE_PARSE + """tokens = sys.stdin.read().split()
legs = []
for words in data:
    h, st, tm = int(words[1]), words[2::2], [int(x) for x in words[3::2]]
    pos = [sum(tm[:i]) for i in range(len(st))]
    for i in range(len(tm)):
        legs.append((st[i], st[i + 1], pos[i], tm[i], h))
        legs.append((st[i + 1], st[i], pos[-1] - pos[i + 1], tm[i], h))
for i in range(int(tokens[0])):
    a, b, s = tokens[1 + 3 * i], tokens[2 + 3 * i], int(tokens[3 + 3 * i])
    best = {a: s}
    changed = True
    while changed:
        changed = False
        for u, v, o, t, h in legs:
            if u in best:
                d = max(0, (best[u] - o) // h * h)
                while d + o < best[u]:
                    d += h
                if d + o + t < best.get(v, 10 ** 9):
                    best[v] = d + o + t
                    changed = True
    print(best.get(b, -1))
""",
        'explanation': {
            'zh': """以“到达各站的最早时刻”为距离做 Dijkstra。设乘客在第 τ 分钟位于某站，考虑经过它的一条线路的一个方向：若该站在这个方向上距始发站 o 分钟，则经过该站的列车时刻是 o, o + H, o + 2H, …，其中不早于 τ 的第一班是 o + max(0, ⌈(τ − o) / H⌉) · H，乘上它到达下一站的时刻再加上这一段的行驶时间。Python 中向上取整可以写成 `-(-x // H)`。

边的“权”取决于出发时刻，Dijkstra 为什么仍然正确？因为到站越早，赶上的车不会越晚：到达下一站的时刻是出发时刻的单调不减函数（FIFO 性质）。因此“最早到达的车站先确定”的贪心依然成立。

不必单独处理“留在车上”：列车在站内不停留，乘客在第 x 分钟随车到站，这班车也在第 x 分钟离站，正好就是“不早于 x 的第一班”，所以继续乘坐同一班车已经包含在内。""",
            'ja': """「各駅に最も早く着く時刻」を距離として Dijkstra 法を行う。乗客が τ 分にある駅にいるとし、その駅を通る路線の一方向を考える。この方向でその駅が始発駅から o 分の位置にあれば、駅を通る列車の時刻は o, o + H, o + 2H, … であり、τ 以降の最初の列車は o + max(0, ⌈(τ − o) / H⌉) · H である。それに乗れば、この区間の所要時間を足した時刻に次の駅に着く。Python では切り上げを `-(-x // H)` と書ける。

辺の「重み」が出発時刻によって変わるのに、なぜ Dijkstra 法が正しいのか。早く駅に着いて、より遅い列車にしか乗れなくなることはない。つまり次の駅への到着時刻は出発時刻について単調非減少である（FIFO 性）。そのため「最も早く着く駅から確定させる」貪欲法がそのまま成り立つ。

「列車に乗ったままでいる」場合を別に扱う必要はない。列車は駅に停車しないので、x 分に列車で駅に着いた乗客にとって、その列車も x 分に発車し、ちょうど「x 分以降の最初の列車」になる。同じ列車に乗り続ける経路は自然に含まれている。""",
            'en': """Run Dijkstra with the earliest arrival time at each station as the distance. Suppose the passenger is at a station at minute τ and consider one direction of a line through it. If the station lies o minutes from that direction's terminal, trains pass at o, o + H, o + 2H, …, and the first one at or after τ leaves at o + max(0, ⌈(τ − o) / H⌉) · H; boarding it reaches the next station that many minutes plus the section's travel time later. In Python, `-(-x // H)` rounds up.

Why does Dijkstra still work when the edge weight depends on the departure time? Arriving earlier never forces a later train: the arrival time at the next station is a non-decreasing function of the time you reach this one (the FIFO property). So settling the earliest-reached station first remains correct.

Staying on a train needs no special case. Trains do not dwell, so a passenger who arrives at minute x on a train finds that same train leaving at minute x, which is exactly the first departure at or after x.""",
        },
    },
]

SET = {
    'id': 'rail',
    'title': {'zh': '城市铁路', 'ja': '都市の鉄道', 'en': 'City Rail'},
    'minutes': 150,
    'preamble': PREAMBLE,
    'files': {'lines.txt': SAMPLE_LINES},
    'parts': PARTS,
}
