"""Set D · a warehouse robot on a grid: neighbours, breadth-first search, subset DP, lexicographic Dijkstra."""

SAMPLE_MAP = """7 13
S.....#......
.###.##.####.
.#*#......*#.
.#.#.####.##.
...#....#....
.#####.##.#*.
......#.....G
"""

SAMPLE_WALLED = """5 7
S.#....
..#.##.
..#.#G#
..#.###
.......
"""


def text(rows):
    return f'{len(rows)} {len(rows[0])}\n' + '\n'.join(''.join(row) for row in rows) + '\n'


def random_rows(rng, h, w, density):
    return [['#' if rng.random() < density else '.' for _ in range(w)] for _ in range(h)]


def shelf_rows(rng, h, w, clutter=0.02):
    """Aisles every third row, two-deep shelves with gaps in between, a few boxes left in the aisles."""
    rows = []
    while len(rows) < h:
        rows.append(['#' if rng.random() < clutter else '.' for _ in range(w)])
        pattern = []
        while len(pattern) < w:
            pattern += ['#'] * rng.randint(3, 9) + ['.'] * rng.randint(1, 2)
        rows.append(pattern[:w])
        rows.append(list(pattern[:w]))
    return rows[:h]


def maze_rows(rng, h, w, loops=0.0):
    rows = [['#'] * w for _ in range(h)]
    rows[0][0] = '.'
    stack = [(0, 0)]
    while stack:
        r, c = stack[-1]
        options = [(r + dr, c + dc) for dr, dc in ((2, 0), (-2, 0), (0, 2), (0, -2))
                   if 0 <= r + dr < h and 0 <= c + dc < w and rows[r + dr][c + dc] == '#']
        if not options:
            stack.pop()
            continue
        nr, nc = rng.choice(options)
        rows[(r + nr) // 2][(c + nc) // 2] = rows[nr][nc] = '.'
        stack.append((nr, nc))
    for row in rows:
        for c in range(w):
            if row[c] == '#' and rng.random() < loops:
                row[c] = '.'
    return rows


def place(rng, rows, packages, goal=None):
    cells = [(r, c) for r, row in enumerate(rows) for c, ch in enumerate(row) if ch == '.' and (r, c) != goal]
    picks = rng.sample(cells, 2 + packages - (goal is not None))
    if goal is not None:
        picks.insert(1, goal)
    for (r, c), ch in zip(picks, ['S', 'G'] + ['*'] * packages):
        rows[r][c] = ch
    return rows


def fortress(rows, r, c, thickness):
    """Wall in the cell (r, c) with square rings of shelves."""
    h, w = len(rows), len(rows[0])
    for radius in range(1, thickness + 1):
        for rr in range(r - radius, r + radius + 1):
            for cc in range(c - radius, c + radius + 1):
                if 0 <= rr < h and 0 <= cc < w and max(abs(rr - r), abs(cc - c)) == radius:
                    rows[rr][cc] = '#'
    return rows


def edge_maps():
    return ['1 2\nSG\n', '1 3\nS#G\n', '3 3\n#.#\n.S.\n#G#\n', '3 3\n.#.\n#S#\n.#G\n', '1 9\n.*.S#*.G.\n', '4 1\nG\n.\n.\nS\n']


def count_tests(rng):
    maps = edge_maps()
    maps += [text(place(rng, random_rows(rng, 8, 12, 0.3), 2)), text(place(rng, shelf_rows(rng, 30, 47), 4)),
             text(place(rng, maze_rows(rng, 61, 81, 0.05), 3)), text(place(rng, random_rows(rng, 100, 100, 0.45), 8))]
    return [{'input': '', 'files': {'map.txt': m}} for m in maps]


def route_tests(rng):
    maps = edge_maps()
    maps += [text(place(rng, random_rows(rng, 10, 10, 0.25), 1)), text(place(rng, shelf_rows(rng, 40, 60, 0.08), 3)),
             text(place(rng, maze_rows(rng, 101, 101), 0)), text(place(rng, maze_rows(rng, 79, 121, 0.02), 2)),
             text(place(rng, random_rows(rng, 120, 160, 0.42), 5))]
    walled = place(rng, shelf_rows(rng, 60, 90), 2)
    goal = next((r, c) for r, row in enumerate(walled) for c, ch in enumerate(row) if ch == 'G')
    maps.append(text(fortress(walled, *goal, 1)))
    return [{'input': '', 'files': {'map.txt': m}} for m in maps]


def collect_tests(rng):
    maps = edge_maps() + ['2 5\n*S*.*\n.*G*.\n', '3 4\nS.#*\n..#.\n*.#G\n']
    for h, w, k, density in [(5, 7, 3, 0.2), (12, 12, 5, 0.3), (20, 30, 8, 0.25), (35, 35, 8, 0.3)]:
        maps.append(text(place(rng, random_rows(rng, h, w, density), k)))
    maps.append(text(place(rng, shelf_rows(rng, 45, 80, 0.03), 8)))
    maps.append(text(place(rng, maze_rows(rng, 51, 71, 0.04), 7)))
    maps.append(text(place(rng, maze_rows(rng, 121, 161, 0.01), 8)))
    walled = place(rng, random_rows(rng, 20, 20, 0.15), 6)
    target = next((r, c) for r, row in enumerate(walled) for c, ch in enumerate(row) if ch == '*')
    maps.append(text(fortress(walled, *target, 1)))
    return [{'input': '', 'files': {'map.txt': m}} for m in maps]


def drill_tests(rng):
    maps = edge_maps() + [SAMPLE_MAP, '3 5\nS###G\n.###.\n.....\n', '5 5\nS....\n####.\n#G#..\n###.#\n.....\n']
    for h, w, density, thickness in [(9, 9, 0.5, 1), (25, 25, 0.35, 2), (40, 70, 0.45, 2), (90, 90, 0.3, 3)]:
        rows = place(rng, random_rows(rng, h, w, density), 0)
        goal = next((r, c) for r, row in enumerate(rows) for c, ch in enumerate(row) if ch == 'G')
        maps.append(text(fortress(rows, *goal, thickness)))
    rows = shelf_rows(rng, 150, 150, 0.05)
    rows = place(rng, fortress(rows, 75, 75, 4), 0, goal=(75, 75))
    maps.append(text(rows))
    maps.append(text(place(rng, maze_rows(rng, 99, 99), 0)))
    maps.append(text(place(rng, random_rows(rng, 120, 120, 0.7), 0)))
    return [{'input': '', 'files': {'map.txt': m}} for m in maps]


READ = """h, w, *grid = open('map.txt', encoding='utf-8').read().split()
h, w = int(h), int(w)
"""

FIND = """for r in range(h):
    for c in range(w):
        if grid[r][c] == 'S':
            start = (r, c)
        elif grid[r][c] == 'G':
            goal = (r, c)
"""

BFS = """

def bfs(source):
    dist = [[-1] * w for _ in range(h)]
    dist[source[0]][source[1]] = 0
    queue = deque([source])
    while queue:
        r, c = queue.popleft()
        for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
            if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] != '#' and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))
    return dist
"""

BRUTE_READ = """h, w, *g = open('map.txt').read().split()
h, w = int(h), int(w)
cells = {(r, c): g[r][c] for r in range(h) for c in range(w)}
start = next(p for p, ch in cells.items() if ch == 'S')
goal = next(p for p, ch in cells.items() if ch == 'G')


def layers(source):
    seen = {source: 0}
    frontier = [source]
    while frontier:
        following = []
        for r, c in frontier:
            for p in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if cells.get(p, '#') != '#' and p not in seen:
                    seen[p] = seen[(r, c)] + 1
                    following.append(p)
        frontier = following
    return seen
"""

PREAMBLE = {
    'zh': """某仓库里有一台搬运机器人。仓库的平面图保存在文件 `map.txt` 中：第一行是两个整数 H 和 W，接下来的 H 行各有 W 个字符，表示 H 行 W 列的格子。各字符的含义如下：

| 字符 | 含义 |
| --- | --- |
| `#` | 货架 |
| `.` | 通道 |
| `S` | 机器人的初始位置，恰有一个 |
| `G` | 充电站，恰有一个 |
| `*` | 货物，至多 8 个 |

没有货架的格子称为空地，`S`、`G`、`*` 所在的格子也是空地。机器人每一步移动到上下左右相邻的一个空地，不能离开平面图。1 ≤ H, W ≤ 200。各小问都从当前目录读取 `map.txt`。""",
    'ja': """ある倉庫で 1 台の搬送ロボットが働いている。倉庫の見取り図はファイル `map.txt` に保存されている。1 行目に 2 つの整数 H と W があり、続く H 行にはそれぞれ W 文字が並び、H 行 W 列のマス目を表す。各文字の意味は次のとおりである。

| 文字 | 意味 |
| --- | --- |
| `#` | 棚 |
| `.` | 通路 |
| `S` | ロボットの初期位置（ちょうど 1 つ） |
| `G` | 充電ステーション（ちょうど 1 つ） |
| `*` | 荷物（8 個以下） |

棚のないマスを空きマスと呼ぶ。`S`、`G`、`*` のマスも空きマスである。ロボットは 1 歩で上下左右に隣り合う空きマスへ移動でき、見取り図の外には出られない。1 ≤ H, W ≤ 200 である。各小問はカレントディレクトリの `map.txt` を読み込む。""",
    'en': """A robot moves goods around a warehouse. The floor plan is stored in the file `map.txt`: the first line holds two integers H and W, and each of the next H lines holds W characters, describing a grid of H rows and W columns. The characters mean:

| Character | Meaning |
| --- | --- |
| `#` | a shelf |
| `.` | an aisle |
| `S` | the robot's starting cell (exactly one) |
| `G` | the charging dock (exactly one) |
| `*` | a package (at most 8) |

A cell without a shelf is an open cell; the cells of `S`, `G` and `*` are open too. In one move the robot steps to an open cell adjacent up, down, left or right, and it never leaves the plan. 1 ≤ H, W ≤ 200. Each part reads `map.txt` from the current directory.""",
}

PARTS = [
    {
        'id': 'CI-MAP-1',
        'level': 1,
        'points': 15,
        'title': {'zh': '统计格子', 'ja': 'マスを数える', 'en': 'Counting Cells'},
        'statement': {
            'zh': '求空地的个数，以及死胡同的个数。死胡同是这样的空地：在与它上下左右相邻的格子中，恰好有一个是空地。\n\n### 输出\n\n第一行输出空地的个数，第二行输出死胡同的个数。',
            'ja': '空きマスの個数と、行き止まりの個数を求めよ。行き止まりとは、上下左右に隣り合うマスのうち空きマスがちょうど 1 つであるような空きマスのことである。\n\n### 出力\n\n1 行目に空きマスの個数を、2 行目に行き止まりの個数を出力せよ。',
            'en': 'Count the open cells and the dead ends. A dead end is an open cell with exactly one open cell among its neighbours up, down, left and right.\n\n### Output\n\nPrint the number of open cells on the first line and the number of dead ends on the second.',
        },
        'samples': [{'input': '', 'expected': '59\n7\n'}],
        'tests': count_tests,
        'solution': READ + """
open_cells = dead_ends = 0
for r in range(h):
    for c in range(w):
        if grid[r][c] == '#':
            continue
        open_cells += 1
        neighbours = 0
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] != '#':
                neighbours += 1
        if neighbours == 1:
            dead_ends += 1
print(open_cells)
print(dead_ends)
""",
        'brute': """h, w, *g = open('map.txt').read().split()
h, w = int(h), int(w)
pad = ['#' * (w + 2)] + ['#' + row + '#' for row in g] + ['#' * (w + 2)]
cells = [(r, c) for r in range(1, h + 1) for c in range(1, w + 1) if pad[r][c] != '#']
print(len(cells))
print(sum(1 for r, c in cells if [pad[r - 1][c], pad[r + 1][c], pad[r][c - 1], pad[r][c + 1]].count('#') == 3))
""",
        'explanation': {
            'zh': '用 `open(...).read().split()` 一次读入全部记号：前两个是 H 和 W，其余正好是 H 行字符串。对每个空地检查上下左右四个方向，越界的方向直接跳过。一个常用的技巧是在地图四周补一圈 `#`，这样就不必判断越界。把四个方向写成列表 `[(-1, 0), (1, 0), (0, -1), (0, 1)]` 再循环，可以省去四段几乎相同的代码。',
            'ja': '`open(...).read().split()` で全トークンを一度に読むと、最初の 2 つが H と W、残りがちょうど H 行の文字列になる。各空きマスについて上下左右を調べ、範囲外の方向は飛ばす。地図の周りを `#` で 1 周囲んでおけば範囲の判定が要らなくなる、というのはよく使う工夫である。4 方向をリスト `[(-1, 0), (1, 0), (0, -1), (0, 1)]` にしてループで回せば、ほとんど同じコードを 4 回書かずに済む。',
            'en': 'Reading everything with `open(...).read().split()` gives H and W as the first two tokens and exactly H row strings after them. For each open cell, check the four neighbours and skip those outside the grid. A common trick is to surround the plan with a border of `#`, which removes the bounds checks altogether. Looping over the direction list `[(-1, 0), (1, 0), (0, -1), (0, 1)]` saves writing four nearly identical blocks.',
        },
    },
    {
        'id': 'CI-MAP-2',
        'level': 2,
        'points': 20,
        'title': {'zh': '最短路径', 'ja': '最短経路', 'en': 'Shortest Route'},
        'statement': {
            'zh': '求机器人从 `S` 到达 `G` 的最少步数；不能到达时输出 `-1`。再求从 `S` 出发无论怎样移动都到达不了的空地的个数。\n\n### 输出\n\n第一行输出最少步数（或 `-1`），第二行输出到达不了的空地的个数。',
            'ja': 'ロボットが `S` から `G` へ移動するのに必要な最小の歩数を求めよ。到達できない場合は `-1` を出力せよ。また、`S` からどのように移動しても到達できない空きマスの個数を求めよ。\n\n### 出力\n\n1 行目に最小の歩数（または `-1`）を、2 行目に到達できない空きマスの個数を出力せよ。',
            'en': 'Find the fewest moves that take the robot from `S` to `G`, or print `-1` if `G` cannot be reached. Also count the open cells that the robot cannot reach from `S` at all.\n\n### Output\n\nPrint the fewest moves (or `-1`) on the first line and the number of unreachable open cells on the second.',
        },
        'samples': [{'input': '', 'expected': '18\n0\n'}],
        'tests': route_tests,
        'solution': 'from collections import deque\n\n' + READ + FIND + BFS + """

dist = bfs(start)
print(dist[goal[0]][goal[1]])
print(sum(1 for r in range(h) for c in range(w) if grid[r][c] != '#' and dist[r][c] == -1))
""",
        'brute': BRUTE_READ + """
seen = layers(start)
print(seen.get(goal, -1))
print(sum(1 for p, ch in cells.items() if ch != '#' and p not in seen))
""",
        'explanation': {
            'zh': """每一步的代价都相同，最短步数用广度优先搜索（BFS）求。从 `S` 出发，用 `collections.deque` 作队列，按“距离 0 的格子、距离 1 的格子……”的顺序逐层扩展；一个格子第一次被访问时记下的距离，就是它的最短距离。把 `dist` 初始化为 −1 表示尚未访问，同一个数组也就兼作“已访问”标记。

一次 BFS 就得到从 `S` 到所有格子的距离：`G` 的距离是第一行的答案，距离仍为 −1 的空地就是到达不了的格子。整体 O(HW)。

不要用递归的深度优先搜索求最短路：DFS 先找到的路线不一定最短，而且 200 × 200 的地图会超出 Python 的递归深度上限。""",
            'ja': """1 歩の重みがすべて等しいので、最小の歩数は幅優先探索（BFS）で求める。`S` から始め、`collections.deque` をキューとして「距離 0 のマス、距離 1 のマス、……」と層ごとに広げていく。あるマスを初めて訪れたときに記録した距離が、そのマスへの最短距離である。`dist` を −1 で初期化して未訪問を表せば、同じ配列が訪問済みの印も兼ねる。

1 回の BFS で `S` からすべてのマスへの距離が求まる。`G` の距離が 1 行目の答えであり、距離が −1 のままの空きマスが到達できないマスである。全体で O(HW)。

最短経路を再帰の深さ優先探索で求めてはいけない。DFS が先に見つける経路は最短とは限らず、200 × 200 の地図では Python の再帰の深さの上限も超えてしまう。""",
            'en': """Every move costs the same, so breadth-first search finds the fewest moves. Start at `S` with a `collections.deque` as the queue and expand layer by layer: the cells at distance 0, then 1, and so on. The distance recorded when a cell is first reached is its shortest distance. Initialising `dist` to −1 marks unvisited cells, so the same array doubles as the visited set.

One BFS gives the distance from `S` to every cell: the distance of `G` is the first answer, and open cells still at −1 are the unreachable ones. The whole run is O(HW).

Avoid recursive depth-first search here: the first route DFS finds need not be the shortest, and a 200 × 200 plan exceeds Python's recursion limit.""",
        },
    },
    {
        'id': 'CI-MAP-3',
        'level': 4,
        'points': 30,
        'title': {'zh': '收取货物', 'ja': '荷物の回収', 'en': 'Collecting Packages'},
        'statement': {
            'zh': '机器人要收齐全部货物：从 `S` 出发，以任意顺序经过每个 `*` 至少一次，最后到达 `G`。经过 `*` 时货物即被取走，不另外花费步数；途中可以多次经过任何空地，包括 `G`。求所需的最少步数；无法完成时输出 `-1`。没有货物时，答案就是从 `S` 到 `G` 的最少步数。\n\n### 输出\n\n输出一个整数。',
            'ja': 'ロボットはすべての荷物を回収する。`S` を出発し、各 `*` のマスを任意の順序で少なくとも 1 回ずつ通り、最後に `G` に到着する。`*` のマスを通れば荷物は回収され、追加の歩数はかからない。途中では `G` を含むどの空きマスを何度通ってもよい。必要な最小の歩数を求めよ。不可能な場合は `-1` を出力せよ。荷物がない場合、答えは `S` から `G` への最小の歩数である。\n\n### 出力\n\n整数を 1 つ出力せよ。',
            'en': 'The robot must collect every package: starting at `S`, it visits each `*` cell at least once in any order and finally arrives at `G`. Passing a `*` cell picks up its package at no extra cost, and the robot may pass any open cell, `G` included, as often as it likes. Find the fewest moves needed, or print `-1` if it is impossible. With no packages, the answer is the fewest moves from `S` to `G`.\n\n### Output\n\nPrint one integer.',
        },
        'samples': [{'input': '', 'expected': '36\n'}],
        'tests': collect_tests,
        'solution': 'from collections import deque\n\n' + READ + FIND.replace("""            goal = (r, c)
""", """            goal = (r, c)
        elif grid[r][c] == '*':
            packages.append((r, c))
""") .replace('for r in range(h):', 'packages = []\nfor r in range(h):', 1) + BFS + """

INF = float('inf')
k = len(packages)
targets = packages + [goal]


def distances(source):
    dist = bfs(source)
    return [dist[r][c] if dist[r][c] >= 0 else INF for r, c in targets]


first = distances(start)                    # from S to each package and to G
between = [distances(p) for p in packages]  # from package i to each package and to G

# best[mask][i]: fewest moves to collect the packages in mask, standing on package i
best = [[INF] * k for _ in range(1 << k)]
for i in range(k):
    best[1 << i][i] = first[i]
for mask in range(1 << k):
    for i in range(k):
        if best[mask][i] == INF:
            continue
        for j in range(k):
            if not mask >> j & 1:
                cost = best[mask][i] + between[i][j]
                if cost < best[mask | 1 << j][j]:
                    best[mask | 1 << j][j] = cost

answer = first[k] if k == 0 else min(best[-1][i] + between[i][k] for i in range(k))
print(answer if answer < INF else -1)
""",
        'brute': BRUTE_READ + """
from itertools import permutations
packages = [p for p, ch in cells.items() if ch == '*']
reach = {p: layers(p) for p in [start] + packages}
best = None
for order in permutations(packages):
    stops = [start, *order, goal]
    if all(b in reach[a] for a, b in zip(stops, stops[1:])):
        total = sum(reach[a][b] for a, b in zip(stops, stops[1:]))
        best = total if best is None else min(best, total)
print(-1 if best is None else best)
""",
        'explanation': {
            'zh': """把问题缩小到真正需要访问的点上：`S`、K 个货物和 `G`。先从 `S` 和每个货物各做一次 BFS，得到这些点两两之间的最少步数；剩下的就只是决定取货的顺序。

顺序最多有 8! = 40320 种，全部枚举也来得及；更通用的做法是对子集做动态规划（状态压缩 DP）：`best[mask][i]` 表示已经取走集合 mask 中的货物、当前停在货物 i 时的最少步数。从 `best[mask][i]` 走向尚未取走的货物 j，就更新 `best[mask | 1 << j][j]`。答案是 `min(best[全集][i] + d(i, G))`。

复杂度为 O(K·HW + 2^K·K²)。某个货物或 `G` 到达不了时，相应的距离为无穷大，答案也就成为 `-1`。路上顺便经过别的货物也没有问题：这样的路线等于另一种取货顺序，已经包含在 DP 之中。""",
            'ja': """問題を、実際に訪れるべき点に絞る。`S`、K 個の荷物、`G` である。まず `S` と各荷物から 1 回ずつ BFS を行い、これらの点の間の最小歩数を求める。残るのは荷物を回る順番を決めることだけである。

順番は高々 8! = 40320 通りなので全列挙でも間に合うが、より一般的なのは部分集合上の動的計画法（bit DP）である。`best[mask][i]` を「集合 mask の荷物を回収済みで、いま荷物 i にいるときの最小歩数」とし、まだ回収していない荷物 j へ進むたびに `best[mask | 1 << j][j]` を更新する。答えは `min(best[全体][i] + d(i, G))` である。

計算量は O(K·HW + 2^K·K²)。到達できない荷物や `G` があれば距離は無限大となり、答えは `-1` になる。途中で別の荷物の上を通ってもかまわない。そのような経路は別の回収順と同じものであり、すでに DP に含まれている。""",
            'en': """Shrink the problem to the points that matter: `S`, the K packages and `G`. Run one BFS from `S` and one from each package to get the fewest moves between these points; what remains is choosing the order in which to collect the packages.

There are at most 8! = 40320 orders, so trying them all is fast enough, but the general tool is dynamic programming over subsets: `best[mask][i]` is the fewest moves after collecting the packages in mask and standing on package i. From `best[mask][i]`, moving to an uncollected package j updates `best[mask | 1 << j][j]`. The answer is `min(best[all][i] + d(i, G))`.

The cost is O(K·HW + 2^K·K²). If a package or `G` is unreachable, its distance is infinite and the answer becomes `-1`. Routes that happen to pass another package are covered as well: such a route is just a different collection order, which the DP already considers.""",
        },
    },
    {
        'id': 'CI-MAP-4',
        'level': 4,
        'points': 35,
        'title': {'zh': '拆除货架', 'ja': '棚の撤去', 'en': 'Clearing Shelves'},
        'statement': {
            'zh': '为了让机器人尽快回到充电站，现在允许它拆除货架：机器人也可以移动到有货架的格子，这时该货架被拆除，计为一次拆除。本小问不考虑货物，`*` 视为通道。机器人从 `S` 前往 `G` 时，首先要使拆除次数最少；在此前提下，再使步数最少。求此时的拆除次数和步数。\n\n### 输出\n\n在一行中输出拆除次数和步数，以一个空格分隔。',
            'ja': 'ロボットを早く充電ステーションに戻すため、棚の撤去を認める。ロボットは棚のあるマスにも移動でき、そのときその棚は撤去され、撤去 1 回と数える。この小問では荷物は考えず、`*` は通路とみなす。`S` から `G` へ向かうとき、まず撤去の回数を最小にし、その中で歩数を最小にする。このときの撤去の回数と歩数を求めよ。\n\n### 出力\n\n撤去の回数と歩数を空白で区切って 1 行に出力せよ。',
            'en': 'To get the robot back to its dock sooner, it may now clear shelves: it can step onto a shelf cell, which removes that shelf and counts as one removal. Packages play no role in this part; treat `*` as an aisle. Going from `S` to `G`, the robot first minimises the number of removals and then, among those routes, the number of moves. Find both numbers.\n\n### Output\n\nPrint the number of removals and the number of moves on one line, separated by a space.',
        },
        'samples': [{'input': '', 'expected': '0 18\n'}, {'input': '', 'files': {'map.txt': SAMPLE_WALLED}, 'expected': '1 11\n'}],
        'tests': drill_tests,
        'solution': 'import heapq\n\n' + READ + FIND + """
# best[r][c]: the smallest (removals, moves) found so far for the cell (r, c)
best = [[None] * w for _ in range(h)]
best[start[0]][start[1]] = (0, 0)
heap = [(0, 0, *start)]
while heap:
    removals, moves, r, c = heapq.heappop(heap)
    if (removals, moves) != best[r][c]:
        continue                     # an outdated entry
    if (r, c) == goal:
        break
    for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
        if 0 <= nr < h and 0 <= nc < w:
            cost = (removals + (1 if grid[nr][nc] == '#' else 0), moves + 1)
            if best[nr][nc] is None or cost < best[nr][nc]:
                best[nr][nc] = cost
                heapq.heappush(heap, (*cost, nr, nc))

print(*best[goal[0]][goal[1]])
""",
        'brute': """h, w, *g = open('map.txt').read().split()
h, w = int(h), int(w)
cells = {(r, c): g[r][c] for r in range(h) for c in range(w)}
start = next(p for p, ch in cells.items() if ch == 'S')
goal = next(p for p, ch in cells.items() if ch == 'G')
limit = 0
while True:
    seen = {(start, 0)}
    frontier = [(start, 0)]
    moves = 0
    found = None
    while frontier and found is None:
        following = []
        for (r, c), used in frontier:
            if (r, c) == goal:
                found = moves
                break
            for p in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if p in cells:
                    state = (p, used + (cells[p] == '#'))
                    if state[1] <= limit and state not in seen:
                        seen.add(state)
                        following.append(state)
        frontier = following
        moves += 1
    if found is not None:
        print(limit, found)
        break
    limit += 1
""",
        'explanation': {
            'zh': """把“拆除次数”和“步数”合成一个代价：进入空地的代价是 (0, 1)，进入货架的代价是 (1, 1)。代价按字典序比较——先比拆除次数，再比步数——相加时各分量分别相加。这样的代价沿路线只增不减，所以 Dijkstra 算法依然正确。

Python 的元组本来就按字典序比较，把 `(拆除次数, 步数, 行, 列)` 直接放进 `heapq` 即可。也可以把代价编码成一个整数 `拆除次数 × H × W + 步数`：最优路线不会重复经过同一格，步数小于 H × W，所以这个整数的大小顺序与字典序一致。

如果只求拆除次数，0-1 BFS 就够了；这里还要在拆除次数相同的路线中比较步数，用 Dijkstra 更直接。格子数记为 V = HW，复杂度为 O(V log V)。""",
            'ja': """「撤去の回数」と「歩数」を 1 つのコストにまとめる。空きマスへ入るコストを (0, 1)、棚のマスへ入るコストを (1, 1) とし、コストは辞書式順序で比べる（まず撤去回数、次に歩数）。足し算は成分ごとに行う。このコストは経路に沿って減ることがないので、Dijkstra 法がそのまま使える。

Python のタプルはもともと辞書式に比較されるので、`(撤去回数, 歩数, 行, 列)` をそのまま `heapq` に入れればよい。コストを 1 つの整数 `撤去回数 × H × W + 歩数` に符号化してもよい。最適な経路は同じマスを 2 度通らないので歩数は H × W 未満となり、この整数の大小は辞書式順序と一致する。

撤去回数だけなら 0-1 BFS で求まるが、ここでは撤去回数が等しい経路の中で歩数も比べるため、Dijkstra 法のほうが素直である。マスの数を V = HW として O(V log V)。""",
            'en': """Combine the two goals into one cost: entering an open cell costs (0, 1) and entering a shelf costs (1, 1). Costs are compared lexicographically, removals first and moves second, and added component-wise. They never decrease along a route, so Dijkstra's algorithm remains correct.

Python tuples already compare lexicographically, so `(removals, moves, row, column)` can go straight into `heapq`. Alternatively, encode the cost as one integer `removals × H × W + moves`: an optimal route never revisits a cell, so moves stay below H × W and the integers order exactly like the pairs.

For the removals alone a 0-1 BFS would do, but breaking ties by moves makes Dijkstra the straightforward choice. With V = HW cells the cost is O(V log V).""",
        },
    },
]

SET = {
    'id': 'warehouse',
    'title': {'zh': '仓库机器人', 'ja': '倉庫ロボット', 'en': 'The Warehouse Robot'},
    'minutes': 120,
    'preamble': PREAMBLE,
    'files': {'map.txt': SAMPLE_MAP},
    'parts': PARTS,
}
