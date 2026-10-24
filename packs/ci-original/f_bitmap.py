"""Set F · a black-and-white image: scanning, flood fill, holes and digital topology, the largest rectangle."""

SAMPLE_IMAGE = """10 24
........................
.###..#######..#...###..
.#.#..#.....#..##..###..
.###..#.###.#...#..###..
.#.#..#.#.#.#...........
.###..#.###.#..#.#......
......#.....#...#.......
......#######..#.#......
........................
###.....................
"""

FONT = {
    'A': ['#####', '#...#', '#####', '#...#', '#...#'],
    'B': ['####.', '#..#.', '#####', '#...#', '#####'],
    'C': ['#####', '#....', '#....', '#....', '#####'],
    'E': ['#####', '#....', '#####', '#....', '#####'],
    'F': ['#####', '#....', '####.', '#....', '#....'],
    'H': ['#...#', '#...#', '#####', '#...#', '#...#'],
    'I': ['#####', '..#..', '..#..', '..#..', '#####'],
    'L': ['#....', '#....', '#....', '#....', '#####'],
    'M': ['#####', '#.#.#', '#.#.#', '#...#', '#...#'],
    'O': ['#####', '#...#', '#...#', '#...#', '#####'],
    'P': ['#####', '#...#', '#####', '#....', '#....'],
    'Q': ['#####', '#...#', '#...#', '#..##', '#####'],
    'T': ['#####', '..#..', '..#..', '..#..', '..#..'],
    'U': ['#...#', '#...#', '#...#', '#...#', '#####'],
    '8': ['#####', '#...#', '#####', '#...#', '#####'],
}


def picture(rows):
    return f'{len(rows)} {len(rows[0])}\n' + '\n'.join(rows) + '\n'


def noise(rng, h, w, p):
    return [''.join('#' if rng.random() < p else '.' for _ in range(w)) for _ in range(h)]


def rings(n):
    """Concentric square rings with a single pixel in the middle: every ring has one hole."""
    size = 4 * n + 1
    grid = [['.'] * size for _ in range(size)]
    for k in range(0, 2 * n + 1, 2):
        for i in range(k, size - k):
            grid[k][i] = grid[size - 1 - k][i] = grid[i][k] = grid[i][size - 1 - k] = '#'
    return [''.join(row) for row in grid]


def lettering(rng, lines, width):
    rows = []
    for _ in range(lines):
        block = [''] * 5
        while len(block[0]) < width - 6:
            glyph = FONT[rng.choice(sorted(FONT))]
            gap = '.' * rng.randint(1, 2)
            block = [row + gap + g for row, g in zip(block, glyph)]
        rows += ['.' * width] + [row.ljust(width, '.')[:width] for row in block]
    return rows + ['.' * width]


def lattice(h, w, step=3):
    return [''.join('#' if r % step == 0 or c % step == 0 else '.' for c in range(w)) for r in range(h)]


def diamond(n):
    size = 2 * n + 1
    return [''.join('#' if abs(r - n) + abs(c - n) == n else '.' for c in range(size)) for r in range(size)]


def spiral(n):
    """One long arm winding inwards: a large component that encloses nothing."""
    grid = [['.'] * n for _ in range(n)]
    r, c, dr, dc = 0, 0, 0, 1
    grid[0][0] = '#'
    while True:
        for _ in range(2):
            nr, nc, ar, ac = r + dr, c + dc, r + 2 * dr, c + 2 * dc
            if (0 <= nr < n and 0 <= nc < n and grid[nr][nc] == '.'
                    and not (0 <= ar < n and 0 <= ac < n and grid[ar][ac] == '#')):
                r, c = nr, nc
                grid[r][c] = '#'
                break
            dr, dc = dc, -dr
        else:
            return [''.join(row) for row in grid]


def planted(rng, h, w, p, height, width):
    rows = [list(row) for row in noise(rng, h, w, p)]
    top, left = rng.randrange(h - height + 1), rng.randrange(w - width + 1)
    for r in range(top, top + height):
        for c in range(left, left + width):
            rows[r][c] = '#'
    return [''.join(row) for row in rows]


def checkerboard(h, w):
    return [''.join('#' if (r + c) % 2 == 0 else '.' for c in range(w)) for r in range(h)]


def edge_images():
    return [['....'] * 3, ['#'], ['#' * 7] * 5, ['#.#', '.#.', '#.#'], ['.'] * 4 + ['#']]


def files(images):
    return [{'input': '', 'files': {'image.txt': picture(rows)}} for rows in images]


def count_tests(rng):
    return files(edge_images() + [lettering(rng, 2, 60), noise(rng, 50, 80, 0.1), noise(rng, 150, 150, 0.0025),
                                  noise(rng, 150, 200, 0.3)])


def component_tests(rng):
    return files(edge_images() + [checkerboard(10, 10), rings(5), lettering(rng, 3, 70), diamond(12), spiral(31),
                                  noise(rng, 100, 100, 0.4), noise(rng, 160, 200, 0.58)])


def hole_tests(rng):
    return files(edge_images() + [rings(10), lettering(rng, 4, 90), lattice(61, 91), diamond(15), spiral(41),
                                  checkerboard(9, 13), noise(rng, 30, 30, 0.5), noise(rng, 120, 120, 0.45),
                                  noise(rng, 200, 200, 0.62), noise(rng, 160, 160, 0.5)])


def rectangle_tests(rng):
    return files(edge_images() + [['#'] * 200, ['#' * 200], lettering(rng, 2, 50), noise(rng, 60, 60, 0.7),
                                  planted(rng, 150, 150, 0.5, 40, 55), noise(rng, 200, 200, 0.85)])


READ = """h, w, *image = open('image.txt', encoding='utf-8').read().split()
h, w = int(h), int(w)
"""

PREAMBLE = {
    'zh': """文件 `image.txt` 保存了一幅黑白图像：第一行是两个整数 H 和 W（1 ≤ H, W ≤ 200），接下来的 H 行各有 W 个字符，`#` 表示黑色像素，`.` 表示白色像素。从上往下第 r 行、从左往右第 c 列的像素记为 (r, c)，r 和 c 都从 1 开始。

两个黑色像素上下或左右相邻时称为相连。彼此能通过相连关系到达的黑色像素构成一个连通块。各小问都从当前目录读取 `image.txt`。""",
    'ja': """ファイル `image.txt` に白黒画像が保存されている。1 行目に 2 つの整数 H と W（1 ≤ H, W ≤ 200）があり、続く H 行にはそれぞれ W 文字が並ぶ。`#` は黒画素、`.` は白画素を表す。上から r 行目、左から c 列目の画素を (r, c) と書き、r と c は 1 から数える。

2 つの黒画素が上下または左右に隣り合うとき、それらはつながっているという。つながりをたどって互いに行き来できる黒画素の集まりを連結成分と呼ぶ。各小問はカレントディレクトリの `image.txt` を読み込む。""",
    'en': """The file `image.txt` holds a black-and-white image. The first line has two integers H and W (1 ≤ H, W ≤ 200), and each of the next H lines has W characters: `#` is a black pixel and `.` a white one. The pixel in row r from the top and column c from the left is written (r, c), counting from 1.

Two black pixels are connected when they are adjacent up, down, left or right. Black pixels that can reach one another through connected pairs form a component. Each part reads `image.txt` from the current directory.""",
}

PARTS = [
    {
        'id': 'CI-IMG-1',
        'level': 1,
        'points': 15,
        'title': {'zh': '黑色像素', 'ja': '黒画素', 'en': 'Black Pixels'},
        'statement': {
            'zh': '求黑色像素的个数。若至少有一个黑色像素，再求包含所有黑色像素的最小矩形：它的最上行 r1、最左列 c1、最下行 r2 和最右列 c2。\n\n### 输出\n\n第一行输出黑色像素的个数。若至少有一个黑色像素，第二行输出 `r1 c1 r2 c2`。',
            'ja': '黒画素の個数を求めよ。黒画素が 1 つ以上あるときは、すべての黒画素を含む最小の長方形の、最も上の行 r1、最も左の列 c1、最も下の行 r2、最も右の列 c2 も求めよ。\n\n### 出力\n\n1 行目に黒画素の個数を出力せよ。黒画素が 1 つ以上あるときは、2 行目に `r1 c1 r2 c2` を出力せよ。',
            'en': 'Count the black pixels. If there is at least one, also find the smallest rectangle containing all of them: its top row r1, left column c1, bottom row r2 and right column c2.\n\n### Output\n\nPrint the number of black pixels on the first line. If there is at least one, print `r1 c1 r2 c2` on the second line.',
        },
        'samples': [{'input': '', 'expected': '66\n2 1 10 22\n'}],
        'tests': count_tests,
        'solution': READ + """
black = [(r + 1, c + 1) for r in range(h) for c in range(w) if image[r][c] == '#']
print(len(black))
if black:
    rows = [r for r, _ in black]
    columns = [c for _, c in black]
    print(min(rows), min(columns), max(rows), max(columns))
""",
        'brute': """h, w, *g = open('image.txt').read().split()
rows = [i + 1 for i, line in enumerate(g) if '#' in line]
cols = [j + 1 for j, column in enumerate(zip(*g)) if '#' in column]
print(sum(line.count('#') for line in g))
if rows:
    print(rows[0], cols[0], rows[-1], cols[-1])
""",
        'explanation': {
            'zh': '读入后遍历所有像素，记下黑色像素的个数，以及它们行号、列号的最小值和最大值即可。输出要求从 1 开始的行列号，而 Python 的下标从 0 开始，别忘了加 1。没有黑色像素时只输出一行；这类边界情况在考试中很常见，动手之前先确认题目对它的要求。',
            'ja': '読み込んだらすべての画素を調べ、黒画素の個数と、その行番号・列番号の最小値と最大値を記録すればよい。出力は 1 から数えた行番号・列番号なので、0 から始まる Python の添字に 1 を足すのを忘れないこと。黒画素がないときは 1 行だけ出力する。こうした境界の場合は試験でもよく問われるので、書き始める前に問題の要求を確かめておくとよい。',
            'en': 'Visit every pixel and track the number of black pixels together with the smallest and largest row and column among them. The output counts from 1 while Python indexes from 0, so remember to add 1. With no black pixels only one line is printed; edge cases like this are common in the exam, so check what the statement asks for before you start coding.',
        },
    },
    {
        'id': 'CI-IMG-2',
        'level': 2,
        'points': 20,
        'title': {'zh': '连通块', 'ja': '連結成分', 'en': 'Components'},
        'statement': {
            'zh': '求连通块的个数 K，以及每个连通块的像素数。\n\n### 输出\n\n第一行输出 K。若 K ≥ 1，第二行把各连通块的像素数按从大到小的顺序输出，以空格分隔。',
            'ja': '連結成分の個数 K と、各連結成分の画素数を求めよ。\n\n### 出力\n\n1 行目に K を出力せよ。K ≥ 1 のときは、2 行目に各連結成分の画素数を大きい順に空白区切りで出力せよ。',
            'en': 'Find the number of components K and the number of pixels in each.\n\n### Output\n\nPrint K on the first line. If K ≥ 1, print the component sizes in decreasing order on the second line, separated by spaces.',
        },
        'samples': [{'input': '', 'expected': '11\n24 13 9 8 4 3 1 1 1 1 1\n'}],
        'tests': component_tests,
        'solution': READ + """
seen = [[False] * w for _ in range(h)]
sizes = []
for r in range(h):
    for c in range(w):
        if image[r][c] == '#' and not seen[r][c]:
            seen[r][c] = True
            stack = [(r, c)]
            size = 0
            while stack:
                y, x = stack.pop()
                size += 1
                for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                    if 0 <= ny < h and 0 <= nx < w and image[ny][nx] == '#' and not seen[ny][nx]:
                        seen[ny][nx] = True
                        stack.append((ny, nx))
            sizes.append(size)

print(len(sizes))
if sizes:
    print(*sorted(sizes, reverse=True))
""",
        'brute': """from collections import Counter
h, w, *g = open('image.txt').read().split()
h, w = int(h), int(w)
parent = {}


def find(a):
    while parent[a] != a:
        parent[a] = parent[parent[a]]
        a = parent[a]
    return a


for r in range(h):
    for c in range(w):
        if g[r][c] == '#':
            parent[(r, c)] = (r, c)
            for p in ((r - 1, c), (r, c - 1)):
                if p in parent:
                    parent[find(p)] = find((r, c))
sizes = sorted(Counter(find(p) for p in parent).values(), reverse=True)
print(len(sizes))
if sizes:
    print(*sizes)
""",
        'explanation': {
            'zh': """从每个尚未访问的黑色像素出发做一次填充（BFS，或用栈的 DFS），访问到的像素就是一个连通块，顺便数出它的大小。每个像素总共只被访问一次，整体 O(HW)。

不要用递归写 DFS：200 × 200 的全黑图像中，一个连通块有 40000 个像素，递归深度远超 Python 默认的上限（约 1000）。用列表当栈的循环写法没有这个限制。也可以用并查集：扫描时把每个黑色像素与它上方、左方的黑色像素合并。""",
            'ja': """まだ訪れていない黒画素から塗りつぶし（BFS、またはスタックを使う DFS）を行うと、訪れた画素が 1 つの連結成分になり、その大きさも同時に数えられる。各画素は全体で 1 回しか訪れないので O(HW) である。

DFS を再帰で書いてはいけない。200 × 200 の真っ黒な画像では 1 つの連結成分が 40000 画素になり、Python の既定の再帰の上限（約 1000）をはるかに超える。リストをスタックとして使うループなら、この制限は受けない。Union-Find を使い、走査しながら各黒画素を上と左の黒画素と併合する方法もある。""",
            'en': """Flood-fill from every black pixel not yet visited, with BFS or with DFS on an explicit stack: the pixels reached form one component, and counting them gives its size. Each pixel is visited once overall, so the pass is O(HW).

Do not write the DFS recursively: in an all-black 200 × 200 image one component has 40000 pixels, far beyond Python's default recursion limit of about 1000. A loop with a list as the stack has no such limit. Union-find works too: while scanning, merge each black pixel with the black pixels above it and to its left.""",
        },
    },
    {
        'id': 'CI-IMG-3',
        'level': 4,
        'points': 30,
        'title': {'zh': '数洞', 'ja': '穴を数える', 'en': 'Counting Holes'},
        'statement': {
            'zh': """对一个连通块 C，考虑把 C 以外的黑色像素全部改成白色所得的图像。在这幅图像中，白色像素在上下、左右和斜向共 8 个方向上相邻时相连；这样形成的白色区域中，不含图像边缘像素（第 1 行、第 H 行、第 1 列或第 W 列的像素）的区域称为 C 的洞。

从上到下逐行、每行从左到右扫描图像，按首次遇到的先后顺序，输出每个连通块的像素数和洞的个数。

### 输出

每个连通块输出一行：像素数与洞的个数，以空格分隔。""",
            'ja': """連結成分 C について、C 以外の黒画素をすべて白に変えた画像を考える。この画像では、白画素どうしは上下・左右・斜めの 8 方向に隣り合うときにつながっているとする。こうしてできる白い領域のうち、画像の縁の画素（1 行目、H 行目、1 列目、W 列目の画素）を含まないものを C の穴と呼ぶ。

画像を上の行から順に、各行は左から右へ走査し、初めて出会う順に、各連結成分の画素数と穴の個数を出力せよ。

### 出力

連結成分ごとに 1 行、画素数と穴の個数を空白で区切って出力せよ。""",
            'en': """For a component C, consider the image obtained by turning every black pixel outside C white. In that image, white pixels are connected when they are adjacent in any of the 8 directions, diagonals included. A white region formed this way that contains no pixel on the edge of the image (row 1, row H, column 1 or column W) is a hole of C.

Scan the image row by row from the top, each row from left to right. In the order in which the scan first meets them, print each component's size and number of holes.

### Output

Print one line per component: its number of pixels and its number of holes, separated by a space.""",
        },
        'samples': [{'input': '', 'expected': '13 2\n24 1\n4 0\n9 0\n8 1\n1 0\n1 0\n1 0\n1 0\n1 0\n3 0\n'}],
        'tests': hole_tests,
        'solution': READ + """
FOUR = ((-1, 0), (1, 0), (0, -1), (0, 1))
EIGHT = FOUR + ((-1, -1), (-1, 1), (1, -1), (1, 1))


def label(colour, steps):
    \"\"\"Number the regions of one colour in scan order; return the label grid and each region's pixels.\"\"\"
    labels = [[-1] * w for _ in range(h)]
    regions = []
    for r in range(h):
        for c in range(w):
            if image[r][c] == colour and labels[r][c] < 0:
                labels[r][c] = len(regions)
                cells = [(r, c)]
                for y, x in cells:              # cells grows while we walk it: a BFS
                    for dy, dx in steps:
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < h and 0 <= nx < w and image[ny][nx] == colour and labels[ny][nx] < 0:
                            labels[ny][nx] = len(regions)
                            cells.append((ny, nx))
                regions.append(cells)
    return labels, regions


black, components = label('#', FOUR)
_, whites = label('.', EIGHT)
holes = [0] * len(components)
for cells in whites:
    if all(0 < y < h - 1 and 0 < x < w - 1 for y, x in cells):
        y, x = cells[0]                         # the first pixel of the region in scan order
        holes[black[y - 1][x]] += 1             # the pixel above it belongs to the enclosing component
for cells, count in zip(components, holes):
    print(len(cells), count)
""",
        'brute': """h, w, *g = open('image.txt').read().split()
h, w = int(h), int(w)
cells = {(r, c) for r in range(h) for c in range(w) if g[r][c] == '#'}
done = set()
for start in sorted(cells):
    if start in done:
        continue
    comp = {start}
    stack = [start]
    while stack:
        r, c = stack.pop()
        for p in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if p in cells and p not in comp:
                comp.add(p)
                stack.append(p)
    done |= comp
    # Only this component, inside its bounding box with a one-pixel margin that counts as outside.
    r0, r1 = min(r for r, _ in comp) - 1, max(r for r, _ in comp) + 1
    c0, c1 = min(c for _, c in comp) - 1, max(c for _, c in comp) + 1
    white = {(r, c) for r in range(r0, r1 + 1) for c in range(c0, c1 + 1)} - comp
    region = {p for p in white if p[0] in (r0, r1) or p[1] in (c0, c1)}
    holes = -1
    while region:
        holes += 1
        stack = list(region)
        white -= region
        while stack:
            r, c = stack.pop()
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    p = (r + dr, c + dc)
                    if p in white:
                        white.discard(p)
                        stack.append(p)
        region = {min(white)} if white else set()
    print(len(comp), holes)
""",
        'explanation': {
            'zh': """按定义直接做：对每个连通块重新构造一幅图像，再对白色像素做一次 8 方向的填充。每个连通块要 O(HW)，而连通块可能有上万个，总计约 10⁹ 次操作，来不及。

关键的观察是：只需在原图上对白色像素做一次 8 方向的连通标记。不含边缘像素的每个白色区域恰好是一个洞，而它属于哪个连通块也很容易找到。按扫描顺序取这个区域的第一个像素 p，它正上方的像素 q 一定是黑色的：如果 q 是白色，它与 p 相连，又比 p 更早被扫描到，矛盾。q 所在的连通块就是围住这个区域的连通块。洞里可能还有别的连通块，但它们被这个白色区域包住，所有像素都在 p 所在的行之下，所以 q 不会属于它们。

于是总共只需两次标记：黑色用 4 方向、白色用 8 方向，各 O(HW)；然后对每个不接触边缘的白色区域，给 q 所在连通块的洞数加 1。

为什么黑色用 4 方向、白色用 8 方向？两个只在斜向接触的黑色像素并不相连，白色就必须能从它们之间斜着穿过；否则会出现“两块互不相连，却合起来围出一个洞”的矛盾。一个用 4 方向、另一个用 8 方向，“相连”和“围住”才能一致。""",
            'ja': """定義どおりに、連結成分ごとに画像を作り直して白画素を 8 方向で塗りつぶすと、1 成分あたり O(HW) かかる。連結成分は 1 万個を超えることもあり、合計で約 10⁹ 回の操作になって間に合わない。

鍵となる観察は、元の画像で白画素の 8 方向の連結成分を 1 回求めるだけでよいことである。縁の画素を含まない白い領域はそれぞれちょうど 1 つの穴であり、どの連結成分の穴かもすぐにわかる。走査順でその領域の最初の画素 p をとると、そのすぐ上の画素 q は必ず黒である。q が白なら p とつながっていて、しかも p より先に走査されるので矛盾するからである。q を含む連結成分が、この領域を囲む連結成分である。穴の中に別の連結成分があっても、それはこの白い領域に囲まれていて、すべての画素が p の行より下にあるので、q がそれに属することはない。

したがって、黒は 4 方向、白は 8 方向でそれぞれ 1 回ずつ連結成分を求めれば O(HW) で済む。あとは縁に触れない白い領域ごとに、q を含む連結成分の穴の数を 1 増やせばよい。

なぜ黒は 4 方向、白は 8 方向なのか。斜めにだけ接する 2 つの黒画素はつながっていないので、白画素はその間を斜めに通り抜けられなければならない。そうでないと「つながっていない 2 つの成分が合わさって穴を囲む」という矛盾が生じる。一方を 4 方向、他方を 8 方向にしてはじめて、「つながる」と「囲む」が整合する。""",
            'en': """Following the definition literally, rebuilding the image for each component and flood-filling its white pixels in 8 directions, costs O(HW) per component. There can be tens of thousands of components, about 10⁹ steps in total, which is far too slow.

The key observation is that one 8-direction labelling of the white pixels of the original image suffices. Every white region that avoids the edge is exactly one hole, and finding its owner is easy. Take the region's first pixel p in scan order. The pixel q directly above p must be black: if it were white, it would be connected to p and scanned before it, a contradiction. The component containing q is the one that encloses the region. Other components may sit inside the hole, but they are wrapped by this white region and all their pixels lie below p's row, so q cannot belong to them.

So two labellings are enough, black with 4 directions and white with 8, each O(HW). Then, for every white region that avoids the edge, add one hole to the component containing q.

Why 4 directions for black and 8 for white? Two black pixels touching only diagonally are not connected, so white must be able to slip between them diagonally; otherwise two separate components could jointly enclose a hole. Pairing 4 with 8 is what keeps “connected” and “enclosed” consistent.""",
        },
    },
    {
        'id': 'CI-IMG-4',
        'level': 4,
        'points': 35,
        'title': {'zh': '最大的黑色矩形', 'ja': '最大の黒い長方形', 'en': 'The Largest Black Rectangle'},
        'statement': {
            'zh': '在边与图像的边平行、且只由黑色像素组成的矩形中，求面积（像素数）最大者的面积。没有黑色像素时输出 0。\n\n### 输出\n\n输出一个整数。',
            'ja': '辺が画像の辺に平行で、黒画素だけからなる長方形のうち、面積（画素数）が最大のものの面積を求めよ。黒画素がなければ 0 を出力せよ。\n\n### 出力\n\n整数を 1 つ出力せよ。',
            'en': "Among rectangles whose sides are parallel to the image's and which consist only of black pixels, find the largest area in pixels. Print 0 if there are no black pixels.\n\n### Output\n\nPrint one integer.",
        },
        'samples': [{'input': '', 'expected': '9\n'}],
        'tests': rectangle_tests,
        'solution': READ + """
heights = [0] * w     # heights[c]: black pixels in column c ending at the current row
best = 0
for row in image:
    for c in range(w):
        heights[c] = heights[c] + 1 if row[c] == '#' else 0
    # the largest rectangle under this histogram
    stack = []        # columns whose heights increase from bottom to top
    for c in range(w + 1):
        current = heights[c] if c < w else 0      # a bar of height 0 at the end flushes the stack
        while stack and heights[stack[-1]] >= current:
            height = heights[stack.pop()]
            left = stack[-1] + 1 if stack else 0
            best = max(best, height * (c - left))
        stack.append(c)
print(best)
""",
        'brute': """h, w, *g = open('image.txt').read().split()
h, w = int(h), int(w)
best = 0
for top in range(h):
    full = [True] * w
    for bottom in range(top, h):
        full = [f and g[bottom][c] == '#' for c, f in enumerate(full)]
        if not any(full):
            break
        run = 0
        for f in full:
            run = run + 1 if f else 0
            best = max(best, run * (bottom - top + 1))
print(best)
""",
        'explanation': {
            'zh': """逐行把问题化成直方图：`heights[c]` 表示第 c 列中、截至当前行向上连续的黑色像素个数——遇到黑色加 1，遇到白色归 0。任何全黑矩形，以它的最下行作为当前行时，都是这个直方图下的一个矩形，所以答案就是各行直方图中最大矩形的最大值。

直方图中的最大矩形用单调栈求：从左到右扫描，栈中保存高度递增的列。遇到更低的柱子时，把不比它低的柱子依次弹出；被弹出的柱子向右最远延伸到当前列之前，向左最远延伸到新栈顶之后，所以以它的高度为高的最大矩形宽为 `c - left`。每列入栈、出栈各一次，一行 O(W)，整体 O(HW)。末尾补一个高度为 0 的柱子，可以把栈里剩下的柱子一并处理。

枚举上下两行再找连续的列需要 O(H²W)，200 × 200 时约 800 万次，Python 也许勉强来得及；单调栈才是这道题想考的。""",
            'ja': """行ごとにヒストグラムの問題に帰着させる。`heights[c]` を「c 列で、現在の行まで上に連続する黒画素の個数」とし、黒なら 1 増やし、白なら 0 に戻す。どの真っ黒な長方形も、その最下行を現在の行とすれば、このヒストグラムの下にある長方形になる。よって答えは、各行のヒストグラムにおける最大長方形の最大値である。

ヒストグラムの最大長方形は単調スタックで求める。左から順に見て、スタックには高さが増加する列を積んでおく。より低い柱が来たら、それより低くない柱を順に取り出す。取り出した柱は、右へは現在の列の手前まで、左へは新しいスタック先頭の次の列まで伸ばせるので、その高さを持つ最大の長方形の幅は `c - left` である。各列は 1 回ずつ積まれて取り出されるので 1 行 O(W)、全体で O(HW)。末尾に高さ 0 の柱を加えると、スタックに残った柱もまとめて処理できる。

上下の 2 行を全探索して連続する列を探すと O(H²W)、200 × 200 で約 800 万回となり、Python でもぎりぎり間に合うかもしれないが、この問題が問うているのは単調スタックの方である。""",
            'en': """Turn each row into a histogram: `heights[c]` is the number of consecutive black pixels in column c ending at the current row, incremented on black and reset to 0 on white. Every all-black rectangle, viewed from its bottom row, is a rectangle under that row's histogram, so the answer is the best over all rows of the largest rectangle in a histogram.

Solve the histogram with a monotonic stack: scan left to right keeping columns of increasing height on the stack. When a lower bar arrives, pop every bar that is not lower. A popped bar extends right up to just before the current column and left to just after the new stack top, so the widest rectangle of its height has width `c - left`. Each column is pushed and popped once, O(W) per row and O(HW) overall. An extra bar of height 0 at the end flushes whatever remains on the stack.

Trying every pair of top and bottom rows and scanning for runs costs O(H²W), about 8 million steps for 200 × 200, which Python might just manage; the monotonic stack is what the question is really after.""",
        },
    },
]

SET = {
    'id': 'bitmap',
    'title': {'zh': '黑白图像', 'ja': '白黒画像', 'en': 'Black and White'},
    'minutes': 120,
    'preamble': PREAMBLE,
    'files': {'image.txt': SAMPLE_IMAGE},
    'parts': PARTS,
}
