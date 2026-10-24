"""Set C · a small stack machine: simulation, labels and jumps, error handling, compiling expressions."""
import re

ARITHMETIC = ['ADD', 'SUB', 'MUL', 'DIV', 'MOD']

SAMPLE_STRAIGHT = """# (3 + 4) * 5, then 17 mod 5
PUSH 3
PUSH 4
ADD
PUSH 5
MUL
PRINT
PUSH 17
DUP
STORE x
PUSH 5
MOD
PRINT
LOAD x
PRINT
"""

SAMPLE_LOOP = """# count down from 5
PUSH 5
STORE n
loop:
LOAD n
JZ done
LOAD n
PRINT
LOAD n
PUSH 1
SUB
STORE n
JMP loop
done:
HALT
"""

SAMPLE_GCD = """# gcd(84, 36) by Euclid's algorithm
PUSH 84
STORE a
PUSH 36
STORE b
loop:
LOAD b
JZ end
LOAD a
LOAD b
MOD
LOAD b
STORE a
STORE b
JMP loop
end:
LOAD a
PRINT
"""

SAMPLE_UNDERFLOW = """PUSH 2
PRINT
ADD
PRINT
"""

SAMPLE_FOREVER = """PUSH 1
PRINT
again:
JMP again
"""


def straight_program(rng, length):
    """Random straight-line code that never underflows or divides by zero."""
    stack, registers, lines = [], {}, []
    while len(lines) < length:
        options = ['PUSH', 'LOAD'] if len(stack) < 2 else []
        if stack:
            options += ['PRINT', 'DUP', 'STORE', 'POP']
        if len(stack) >= 2:
            options += ['SWAP', 'ADD', 'SUB', 'MUL', 'DIV', 'MOD', 'ADD', 'SUB']
        if len(stack) < 6:
            options += ['PUSH', 'PUSH', 'LOAD']
        op = rng.choice(options)
        if op == 'PUSH':
            value = rng.randint(-50, 99)
            stack.append(value)
            lines.append(f'PUSH {value}')
        elif op == 'LOAD':
            name = rng.choice('abcxyz')
            stack.append(registers.get(name, 0))
            lines.append(f'LOAD {name}')
        elif op == 'STORE':
            name = rng.choice('abcxyz')
            registers[name] = stack.pop()
            lines.append(f'STORE {name}')
        elif op == 'POP':
            stack.pop()
            lines.append('POP')
        elif op == 'DUP':
            stack.append(stack[-1])
            lines.append('DUP')
        elif op == 'SWAP':
            stack[-1], stack[-2] = stack[-2], stack[-1]
            lines.append('SWAP')
        elif op == 'PRINT':
            lines.append('PRINT')
            stack.pop()
        else:
            a, b = stack[-2], stack[-1]
            if op in ('DIV', 'MOD') and b == 0:
                continue
            value = {'ADD': a + b, 'SUB': a - b, 'MUL': a * b, 'DIV': a // b if b else 0, 'MOD': a % b if b else 0}[op]
            if abs(value) > 10**12:
                continue
            stack[-2:] = [value]
            lines.append(op)
        if rng.random() < 0.04:
            lines.append('# note')
    lines.append('PUSH 0' if not stack else 'DUP')
    lines.append('PRINT')
    return '\n'.join(lines) + '\n'


def loop_programs(rng):
    """Terminating programs with loops, written the way a person would."""
    n = rng.randint(1, 30)
    countdown = SAMPLE_LOOP.replace('PUSH 5\nSTORE n', f'PUSH {n}\nSTORE n').replace('# count down from 5', f'# count down from {n}')
    total = rng.randint(0, 300)
    summation = f"""# 1 + 2 + ... + {total}
PUSH 0
STORE s
PUSH {total}
STORE i
top:
LOAD i
JZ out
LOAD s
LOAD i
ADD
STORE s
LOAD i
PUSH 1
SUB
STORE i
JMP top
out:
LOAD s
PRINT
"""
    k = rng.randint(1, 60)
    fibonacci = f"""# the first {k} Fibonacci numbers
PUSH 0
STORE a
PUSH 1
STORE b
PUSH {k}
STORE k
next:
LOAD k
JZ stop
LOAD a
PRINT
LOAD a
LOAD b
ADD
LOAD b
STORE a
STORE b
LOAD k
PUSH 1
SUB
STORE k
JMP next
stop:
HALT
PUSH 999
PRINT
"""
    a, b = rng.randint(1, 10**6), rng.randint(1, 10**6)
    gcd = SAMPLE_GCD.replace('84', str(a)).replace('36', str(b))
    start = rng.randint(2, 3000)
    collatz = f"""# Collatz steps from {start}
PUSH {start}
STORE n
PUSH 0
STORE c
step:
LOAD n
PUSH 1
SUB
JZ finish
LOAD c
PUSH 1
ADD
STORE c
LOAD n
PUSH 2
MOD
JZ even
LOAD n
PUSH 3
MUL
PUSH 1
ADD
STORE n
JMP step
even:
LOAD n
PUSH 2
DIV
STORE n
JMP step
finish:
LOAD c
PRINT
"""
    rows, cols = rng.randint(1, 9), rng.randint(1, 9)
    table = f"""# multiplication table {rows} x {cols}
PUSH {rows}
STORE i
outer:
LOAD i
JZ end
PUSH {cols}
STORE j
inner:
LOAD j
JZ advance
LOAD i
LOAD j
MUL
PRINT
LOAD j
PUSH 1
SUB
STORE j
JMP inner
advance:
LOAD i
PUSH 1
SUB
STORE i
JMP outer
end:
"""
    return [countdown, summation, fibonacci, gcd, collatz, table]


def loop_tests(rng):
    programs = loop_programs(rng) + loop_programs(rng)
    programs.append('HALT\nPUSH 1\nPRINT\n')
    programs.append('# only a comment\n\nlabel:\n')
    programs.append('PUSH 7\nJZ skip\nPUSH 1\nPRINT\nskip:\nPUSH 0\nJZ last\nPUSH 2\nPRINT\nlast:\nPUSH 3\nPRINT\n')
    return [{'input': '', 'files': {'program.txt': program}} for program in programs]


def countdown_to(k, padding):
    program = f'PUSH {k}\nSTORE n\nl:\nLOAD n\nJZ e\nLOAD n\nPUSH 1\nSUB\nSTORE n\nJMP l\ne:\nPUSH 42\nPRINT\n'
    return program + 'PUSH 0\nPOP\n' * (padding // 2) + 'HALT\n' * (padding % 2)


def fault_tests(rng):
    programs = []
    for program in loop_programs(rng):
        lines = program.split('\n')
        candidates = [i for i, line in enumerate(lines) if line.startswith(('PUSH', 'LOAD'))]
        broken = list(lines)
        del broken[rng.choice(candidates)]
        programs.append('\n'.join(broken))
    programs += [
        SAMPLE_UNDERFLOW,
        SAMPLE_FOREVER,
        'PUSH 1\nJMP nowhere\n',
        'PUSH 0\nJZ missing\nPUSH 5\nPRINT\n',
        'PUSH 1\nJZ missing\nPUSH 5\nPRINT\n',
        'PUSH 10\nPUSH 0\nDIV\nPRINT\n',
        'PUSH 10\nPUSH 3\nPUSH 3\nSUB\nMOD\nPRINT\n',
        'SWAP\n',
        'PUSH 1\nSWAP\n',
        'loop:\nPUSH 1\nPOP\nJMP loop\n',
        # counting down by 2 from an odd number never reaches 0
        '# halve the distance\nPUSH 9\nSTORE n\nl:\nLOAD n\nJZ e\nLOAD n\nPUSH 2\nSUB\nSTORE n\nJMP l\ne:\nLOAD n\nPRINT\n',
        # 7k + 6 instructions, plus padding: exactly 200000 stops normally, one more times out
        countdown_to(28570, 4),
        countdown_to(28570, 5),
        countdown_to(199999, 0),
        'PUSH -7\nPUSH 2\nDIV\nPRINT\nPUSH -7\nPUSH 2\nMOD\nPRINT\nPRINT\n',
    ]
    programs += loop_programs(rng)[:2]
    return [{'input': '', 'files': {'program.txt': program}} for program in programs]


def expression(rng, depth, budget):
    if depth <= 0 or budget[0] <= 0 or rng.random() < 0.3:
        budget[0] -= 1
        return str(rng.choice([0, 1, 2, 3, 7, 10, rng.randint(0, 10**9)]))
    left = expression(rng, depth - 1, budget)
    right = expression(rng, depth - 1, budget)
    op = rng.choice('+-*')
    text = f'{left}{op}{right}'
    if rng.random() < 0.35:
        text = f'({text})'
    return text


def spaced(rng, text):
    """Insert spaces between tokens, never inside a number."""
    tokens = re.findall(r'\d+|[-+*()]', text)
    return ''.join(token + (' ' * rng.randint(1, 2) if rng.random() < 0.3 else '') for token in tokens).strip()


def compile_tests(rng):
    tests = [{'input': '0\n'}, {'input': '1-2-3\n'}, {'input': '2*3+4*5\n'}, {'input': '((((((7))))))\n'}, {'input': '8-(3-1)*2\n'},
             {'input': ' 1 + ( 2 * ( 3 - 4 ) ) * 5 \n'}]
    for depth, budget in [(3, 5), (5, 20), (8, 80), (12, 300), (16, 800)]:
        tests.append({'input': spaced(rng, expression(rng, depth, [budget])) + '\n'})
    nested = '1'
    for i in range(48):
        nested = f'({nested}{rng.choice("+-*")}{i % 9 + 1})'
    tests.append({'input': nested + '\n'})
    return tests


INTERPRETER = """import sys

def load(path):
    program, labels = [], {}
    with open(path, encoding='utf-8') as f:
        for number, raw in enumerate(f, 1):
            line = raw.strip()
            if not line or line.startswith('#'):
                continue
            if line.endswith(':'):
                labels[line[:-1]] = len(program)
                continue
            parts = line.split()
            program.append((number, parts[0], parts[1] if len(parts) > 1 else None))
    return program, labels
"""

BRUTE_INTERPRETER = """
NEED = {'POP': 1, 'DUP': 1, 'PRINT': 1, 'STORE': 1, 'JZ': 1, 'SWAP': 2, 'ADD': 2, 'SUB': 2, 'MUL': 2, 'DIV': 2, 'MOD': 2}

def execute(limit, report_steps, check_errors):
    lines = open('program.txt', encoding='utf-8').read().split('\\n')
    code = [(i + 1, s.split()) for i, s in enumerate(map(str.strip, lines)) if s and not s.startswith('#')]
    labels = {}
    instructions = []
    for number, words in code:
        if words[0].endswith(':'):
            labels[words[0][:-1]] = len(instructions)
        else:
            instructions.append((number, words))
    stack, memory, printed, pc, steps = [], {}, [], 0, 0
    message = None
    while 0 <= pc < len(instructions):
        if check_errors and steps == limit:
            message = 'timeout'
            break
        number, words = instructions[pc]
        op = words[0]
        if check_errors and (len(stack) < NEED.get(op, 0) or (op in ('JMP', 'JZ') and words[1] not in labels)):
            message = f'error: line {number}'
            break
        if check_errors and op in ('DIV', 'MOD') and stack[-1] == 0:
            message = f'error: line {number}'
            break
        steps += 1
        pc += 1
        if op == 'HALT':
            break
        if op == 'JMP':
            pc = labels[words[1]]
        elif op == 'JZ':
            if stack.pop() == 0:
                pc = labels[words[1]]
        elif op == 'PUSH':
            stack.append(int(words[1]))
        elif op == 'LOAD':
            stack.append(memory.get(words[1], 0))
        elif op == 'STORE':
            memory[words[1]] = stack.pop()
        elif op == 'POP':
            stack.pop()
        elif op == 'DUP':
            stack.append(stack[-1])
        elif op == 'SWAP':
            stack.append(stack.pop(-2))
        elif op == 'PRINT':
            printed.append(stack.pop())
        else:
            b = stack.pop()
            a = stack.pop()
            stack.append({'ADD': a + b, 'SUB': a - b, 'MUL': a * b, 'DIV': a // b if b else 0, 'MOD': a % b if b else 0}[op])
    for value in printed:
        print(value)
    if message:
        print(message)
    if report_steps:
        print('steps', steps)
"""

PREAMBLE = {
    'zh': """考虑一台简单的栈式计算机。它有一个存放整数的栈，以及 26 个寄存器 `a`–`z`（初值都是 0）。程序保存在文件 `program.txt` 中，每行是下列之一：

- 空行，或去掉首尾空白后以 `#` 开头的行：注释，执行时忽略。
- `名字:`：定义一个标签，名字由英文字母、数字和下划线组成。标签不是指令，它代表紧随其后的下一条指令的位置。
- 一条指令，指令名与参数之间用一个空格分隔。

| 指令 | 作用 |
| --- | --- |
| `PUSH x` | 把整数 x 压入栈（−10⁹ ≤ x ≤ 10⁹） |
| `LOAD r` | 把寄存器 r 的值压入栈 |
| `STORE r` | 弹出一个值，存入寄存器 r |
| `POP` | 弹出一个值并丢弃 |
| `DUP` | 再压入一份栈顶的值 |
| `SWAP` | 交换栈顶的两个值 |
| `ADD` `SUB` `MUL` `DIV` `MOD` | 先弹出 b，再弹出 a，压入 a + b、a − b、a × b、⌊a / b⌋、a − b × ⌊a / b⌋ |
| `PRINT` | 弹出一个值并输出到一行 |
| `JMP L` | 跳转到标签 L |
| `JZ L` | 弹出一个值，若为 0 则跳转到标签 L，否则继续执行下一条 |
| `HALT` | 停止执行 |

执行从第一条指令开始，依次向下；遇到 `HALT` 或执行完最后一条指令后停止。同一标签不会定义两次。`DIV` 与 `MOD` 按向下取整定义，例如 −7 `DIV` 2 = −4，−7 `MOD` 2 = 1（与 Python 的 `//`、`%` 相同）。各小问从当前目录读取 `program.txt`。""",
    'ja': """簡単なスタック計算機を考える。整数を積むスタックと、26 個のレジスタ `a`–`z`（初期値はすべて 0）を持つ。プログラムはファイル `program.txt` に書かれ、各行は次のいずれかである。

- 空行、または前後の空白を除いて `#` で始まる行：コメントであり、実行時には無視する。
- `名前:`：ラベルの定義。名前は英字・数字・下線からなる。ラベルは命令ではなく、直後の命令の位置を表す。
- 1 つの命令。命令名と引数は空白 1 つで区切られる。

| 命令 | 動作 |
| --- | --- |
| `PUSH x` | 整数 x をスタックに積む（−10⁹ ≤ x ≤ 10⁹） |
| `LOAD r` | レジスタ r の値を積む |
| `STORE r` | 値を 1 つ取り出し、レジスタ r に格納する |
| `POP` | 値を 1 つ取り出して捨てる |
| `DUP` | 先頭の値をもう 1 つ積む |
| `SWAP` | 先頭の 2 つの値を入れ替える |
| `ADD` `SUB` `MUL` `DIV` `MOD` | b、a の順に取り出し、a + b、a − b、a × b、⌊a / b⌋、a − b × ⌊a / b⌋ を積む |
| `PRINT` | 値を 1 つ取り出し、1 行に出力する |
| `JMP L` | ラベル L へ移る |
| `JZ L` | 値を 1 つ取り出し、0 ならラベル L へ移る。そうでなければ次の命令へ進む |
| `HALT` | 実行を止める |

実行は最初の命令から始まり、上から順に進む。`HALT` を実行するか、最後の命令を実行し終えると停止する。同じラベルが 2 回定義されることはない。`DIV` と `MOD` は切り捨て（床関数）で定め、例えば −7 `DIV` 2 = −4、−7 `MOD` 2 = 1 である（Python の `//`、`%` と同じ）。各小問はカレントディレクトリの `program.txt` を読み込む。""",
    'en': """Consider a simple stack machine. It has a stack of integers and 26 registers `a`–`z`, all starting at 0. A program is stored in the file `program.txt`; each line is one of:

- an empty line, or a line whose first non-space character is `#`: a comment, ignored when running;
- `name:` — a label definition. Names use letters, digits and underscores. A label is not an instruction; it marks the position of the instruction right after it;
- one instruction, with its name and argument separated by a single space.

| Instruction | Effect |
| --- | --- |
| `PUSH x` | push the integer x (−10⁹ ≤ x ≤ 10⁹) |
| `LOAD r` | push the value of register r |
| `STORE r` | pop a value and store it in register r |
| `POP` | pop a value and discard it |
| `DUP` | push another copy of the top value |
| `SWAP` | exchange the top two values |
| `ADD` `SUB` `MUL` `DIV` `MOD` | pop b, then pop a, and push a + b, a − b, a × b, ⌊a / b⌋ or a − b × ⌊a / b⌋ |
| `PRINT` | pop a value and print it on its own line |
| `JMP L` | jump to label L |
| `JZ L` | pop a value; jump to label L if it is 0, otherwise continue with the next instruction |
| `HALT` | stop |

Execution starts at the first instruction and proceeds downward. It stops at `HALT` or after the last instruction has run. No label is defined twice. `DIV` and `MOD` round down: −7 `DIV` 2 = −4 and −7 `MOD` 2 = 1, the same as Python's `//` and `%`. Each part reads `program.txt` from the current directory.""",
}

PARTS = [
    {
        'id': 'CI-VM-1',
        'level': 2,
        'points': 15,
        'title': {'zh': '顺序执行', 'ja': '順番に実行する', 'en': 'Straight-Line Code'},
        'statement': {
            'zh': '`program.txt` 中只包含 `PUSH` `LOAD` `STORE` `POP` `DUP` `SWAP` `ADD` `SUB` `MUL` `DIV` `MOD` `PRINT` 这些指令、注释与空行，没有标签与跳转。保证执行过程中栈中的值总是足够，且不会除以 0。执行程序，按顺序输出 `PRINT` 打印的值。\n\n### 输出\n\n每个打印的值占一行。',
            'ja': '`program.txt` には命令 `PUSH` `LOAD` `STORE` `POP` `DUP` `SWAP` `ADD` `SUB` `MUL` `DIV` `MOD` `PRINT` と、コメント・空行だけが含まれ、ラベルやジャンプはない。実行中にスタックの値が足りなくなることはなく、0 での除算も起こらない。プログラムを実行し、`PRINT` が出力する値を順に出力せよ。\n\n### 出力\n\n出力される値を 1 行に 1 つずつ出力せよ。',
            'en': '`program.txt` contains only `PUSH` `LOAD` `STORE` `POP` `DUP` `SWAP` `ADD` `SUB` `MUL` `DIV` `MOD` `PRINT`, comments and empty lines; there are no labels or jumps. The stack always holds enough values and no division by zero occurs. Run the program and print the values printed by `PRINT`, in order.\n\n### Output\n\nPrint each value on its own line.',
        },
        'files': {'program.txt': SAMPLE_STRAIGHT},
        'samples': [{'input': '', 'expected': '35\n2\n17\n'}],
        'tests': lambda rng: [{'input': '', 'files': {'program.txt': straight_program(rng, n)}} for n in [1, 4, 10, 30, 120, 600, 3000]],
        'solution': """stack, registers = [], {}
with open('program.txt', encoding='utf-8') as f:
    for line in f:
        words = line.split()
        if not words or words[0].startswith('#'):
            continue
        op = words[0]
        if op == 'PUSH':
            stack.append(int(words[1]))
        elif op == 'LOAD':
            stack.append(registers.get(words[1], 0))
        elif op == 'STORE':
            registers[words[1]] = stack.pop()
        elif op == 'POP':
            stack.pop()
        elif op == 'DUP':
            stack.append(stack[-1])
        elif op == 'SWAP':
            stack[-1], stack[-2] = stack[-2], stack[-1]
        elif op == 'PRINT':
            print(stack.pop())
        else:
            b = stack.pop()
            a = stack.pop()
            if op == 'ADD':
                stack.append(a + b)
            elif op == 'SUB':
                stack.append(a - b)
            elif op == 'MUL':
                stack.append(a * b)
            elif op == 'DIV':
                stack.append(a // b)
            else:
                stack.append(a % b)
""",
        'brute': BRUTE_INTERPRETER + "\nexecute(None, False, False)\n",
        'explanation': {
            'zh': '用 Python 列表当作栈：`append` 压入，`pop()` 弹出栈顶；寄存器用字典保存，没写过的寄存器取默认值 0（`dict.get(r, 0)`）。逐行读取、跳过空行与注释，再按指令名分支。二元运算要先弹出 b 再弹出 a，顺序弄反会让 `SUB` 和 `DIV` 出错。Python 的 `//` 与 `%` 恰好是向下取整的定义。',
            'ja': 'Python のリストをスタックとして使い、`append` で積み、`pop()` で先頭を取り出す。レジスタは辞書で持ち、まだ書き込まれていないレジスタは既定値 0（`dict.get(r, 0)`）とする。1 行ずつ読み、空行とコメントを飛ばしてから命令名で分岐する。二項演算では先に b、次に a を取り出す。順序を逆にすると `SUB` や `DIV` が誤る。Python の `//` と `%` はちょうど床関数による定義になっている。',
            'en': 'Use a Python list as the stack: `append` pushes and `pop()` removes the top. Keep registers in a dictionary; a register never written reads as 0 (`dict.get(r, 0)`). Read line by line, skip empty lines and comments, then branch on the instruction name. For binary operations pop b first and a second; reversing them breaks `SUB` and `DIV`. Python’s `//` and `%` already round down as the machine requires.',
        },
    },
    {
        'id': 'CI-VM-2',
        'level': 3,
        'points': 20,
        'title': {'zh': '跳转与步数', 'ja': 'ジャンプと実行数', 'en': 'Jumps and Steps'},
        'statement': {
            'zh': '现在 `program.txt` 可以使用全部指令与标签。保证程序在执行至多 10⁵ 条指令后停止，执行中不会出现栈中值不足、跳转到未定义标签或除以 0 的情况。\n\n执行程序，输出 `PRINT` 打印的值；最后再输出一行 `steps K`，其中 K 是实际执行的指令条数。标签、注释和空行不是指令；`HALT` 计为一条被执行的指令。',
            'ja': '`program.txt` ではすべての命令とラベルが使われる。プログラムは高々 10⁵ 個の命令を実行したあとで停止し、実行中にスタックの値が足りなくなること、未定義のラベルへのジャンプ、0 での除算は起こらない。\n\nプログラムを実行して `PRINT` が出力する値を出力し、最後に `steps K` を 1 行出力せよ。K は実際に実行された命令の個数である。ラベル・コメント・空行は命令ではない。`HALT` は実行された命令として数える。',
            'en': 'Now `program.txt` may use every instruction and labels. The program stops after executing at most 10⁵ instructions, and it never runs short of stack values, jumps to an undefined label or divides by zero.\n\nRun the program and print the values printed by `PRINT`, followed by one line `steps K`, where K is the number of instructions executed. Labels, comments and empty lines are not instructions; `HALT` counts as an executed instruction.',
        },
        'files': {'program.txt': SAMPLE_LOOP},
        'samples': [{'input': '', 'expected': '5\n4\n3\n2\n1\nsteps 50\n'}, {'input': '', 'files': {'program.txt': SAMPLE_GCD}, 'expected': '12\nsteps 26\n'}],
        'tests': loop_tests,
        'solution': INTERPRETER + """
program, labels = load('program.txt')
stack, registers = [], {}
pc = steps = 0
while pc < len(program):
    number, op, arg = program[pc]
    pc += 1
    steps += 1
    if op == 'HALT':
        break
    if op == 'JMP':
        pc = labels[arg]
    elif op == 'JZ':
        if stack.pop() == 0:
            pc = labels[arg]
    elif op == 'PUSH':
        stack.append(int(arg))
    elif op == 'LOAD':
        stack.append(registers.get(arg, 0))
    elif op == 'STORE':
        registers[arg] = stack.pop()
    elif op == 'POP':
        stack.pop()
    elif op == 'DUP':
        stack.append(stack[-1])
    elif op == 'SWAP':
        stack[-1], stack[-2] = stack[-2], stack[-1]
    elif op == 'PRINT':
        print(stack.pop())
    else:
        b = stack.pop()
        a = stack.pop()
        stack.append({'ADD': a + b, 'SUB': a - b, 'MUL': a * b, 'DIV': a // b, 'MOD': a % b}[op])
print('steps', steps)
""",
        'brute': BRUTE_INTERPRETER + "\nexecute(None, True, False)\n",
        'explanation': {
            'zh': """先把整个文件读进来，做一次“预处理”：去掉注释与空行，把指令按顺序存进列表，同时用字典记录每个标签对应的“下一条指令的下标”。这样跳转只需把程序计数器 pc 改成 `labels[L]`。

执行循环每轮取出 `program[pc]`，先让 pc 加一，再执行指令；跳转指令会覆盖 pc。`steps` 在每条被执行的指令上加一，所以 `HALT` 也被计入。因为标签不占指令位置，跳到程序末尾的标签会自然结束循环。""",
            'ja': """まずファイル全体を読み、前処理を行う。コメントと空行を除いて命令を順にリストへ入れ、各ラベルが指す「次の命令の添字」を辞書に記録する。こうすればジャンプはプログラムカウンタ pc を `labels[L]` に変えるだけで済む。

実行ループでは毎回 `program[pc]` を取り出し、pc を 1 進めてから命令を実行する。ジャンプ命令は pc を上書きする。`steps` は実行した命令ごとに 1 増やすので、`HALT` も数えられる。ラベルは命令の位置を占めないので、末尾のラベルへのジャンプは自然にループを終える。""",
            'en': """Read the whole file first and preprocess it: drop comments and empty lines, store the instructions in a list, and record in a dictionary the index of the instruction that follows each label. A jump then just sets the program counter pc to `labels[L]`.

Each iteration fetches `program[pc]`, increments pc, then executes; jumps overwrite pc. `steps` grows on every executed instruction, so `HALT` is counted. Labels occupy no instruction slot, so a jump to a label at the very end simply ends the loop.""",
        },
    },
    {
        'id': 'CI-VM-3',
        'level': 3,
        'points': 30,
        'title': {'zh': '错误与超时', 'ja': 'エラーと打ち切り', 'en': 'Errors and Timeouts'},
        'statement': {
            'zh': """现在的程序可能有错。按如下规则执行，并输出 `PRINT` 打印的值：

- 在即将执行一条指令时，若栈中的值少于该指令需要弹出的个数（`POP` `DUP` `PRINT` `STORE` `JZ` 需要 1 个，`SWAP` 与五个运算指令需要 2 个），或该指令是 `JMP`、`JZ` 且标签未定义，或该指令是 `DIV`、`MOD` 且除数（栈顶的值）为 0，则停止执行，并输出一行 `error: line L`，其中 L 是该指令在文件中的行号（从 1 开始）。
- 若已经执行了 200000 条指令而程序还要继续执行下一条，则停止执行，并输出一行 `timeout`。
- 其他情况正常执行；正常停止时不输出额外的行。

本小问不输出 `steps`。""",
            'ja': """プログラムに誤りがある場合を考える。次の規則に従って実行し、`PRINT` が出力する値を出力せよ。

- 命令を実行しようとしたとき、スタックの値がその命令が取り出す個数より少ない場合（`POP` `DUP` `PRINT` `STORE` `JZ` は 1 個、`SWAP` と 5 つの演算命令は 2 個）、命令が `JMP` か `JZ` でラベルが定義されていない場合、または命令が `DIV` か `MOD` で除数（スタックの先頭の値）が 0 の場合は、実行を止めて `error: line L` を 1 行出力せよ。L はその命令のファイル中での行番号（1 から数える）である。
- 200000 個の命令を実行した時点でまだ次の命令を実行しようとしているなら、実行を止めて `timeout` を 1 行出力せよ。
- それ以外は通常どおり実行する。正常に停止したときは追加の行を出力しない。

この小問では `steps` を出力しない。""",
            'en': """Programs may now be wrong. Run them under these rules and print the values printed by `PRINT`:

- When an instruction is about to run and the stack holds fewer values than it pops (`POP` `DUP` `PRINT` `STORE` `JZ` need 1; `SWAP` and the five arithmetic instructions need 2), or it is `JMP` or `JZ` with an undefined label, or it is `DIV` or `MOD` with a divisor (the top value) of 0, stop and print one line `error: line L`, where L is the instruction's line number in the file, counting from 1.
- If 200000 instructions have already run and the program is about to run another, stop and print one line `timeout`.
- Otherwise run normally; a normal stop prints nothing extra.

This part does not print `steps`.""",
        },
        'files': {'program.txt': SAMPLE_UNDERFLOW},
        'samples': [{'input': '', 'expected': '2\nerror: line 3\n'}, {'input': '', 'files': {'program.txt': SAMPLE_FOREVER}, 'expected': '1\ntimeout\n'}],
        'tests': fault_tests,
        'solution': INTERPRETER + """
NEED = {'POP': 1, 'DUP': 1, 'PRINT': 1, 'STORE': 1, 'JZ': 1, 'SWAP': 2, 'ADD': 2, 'SUB': 2, 'MUL': 2, 'DIV': 2, 'MOD': 2}
LIMIT = 200000

program, labels = load('program.txt')
stack, registers, out = [], {}, []
pc = steps = 0
while pc < len(program):
    if steps == LIMIT:
        out.append('timeout')
        break
    number, op, arg = program[pc]
    if (len(stack) < NEED.get(op, 0) or (op in ('JMP', 'JZ') and arg not in labels)
            or (op in ('DIV', 'MOD') and stack[-1] == 0)):
        out.append(f'error: line {number}')
        break
    pc += 1
    steps += 1
    if op == 'HALT':
        break
    if op == 'JMP':
        pc = labels[arg]
    elif op == 'JZ':
        if stack.pop() == 0:
            pc = labels[arg]
    elif op == 'PUSH':
        stack.append(int(arg))
    elif op == 'LOAD':
        stack.append(registers.get(arg, 0))
    elif op == 'STORE':
        registers[arg] = stack.pop()
    elif op == 'POP':
        stack.pop()
    elif op == 'DUP':
        stack.append(stack[-1])
    elif op == 'SWAP':
        stack[-1], stack[-2] = stack[-2], stack[-1]
    elif op == 'PRINT':
        out.append(str(stack.pop()))
    else:
        b = stack.pop()
        a = stack.pop()
        stack.append({'ADD': a + b, 'SUB': a - b, 'MUL': a * b, 'DIV': a // b, 'MOD': a % b}[op])
sys.stdout.write(''.join(line + '\\n' for line in out))
""",
        'brute': BRUTE_INTERPRETER + "\nexecute(200000, False, True)\n",
        'explanation': {
            'zh': """把所有检查放在“执行之前”：先看步数是否已达上限，再看这条指令是否会出错，都没问题才执行。这样错误行号就是将要执行的那条指令的行号，而 `PRINT` 已经输出的值都保留。

预处理时要记住每条指令在文件中的原始行号，因为注释、空行和标签不占指令位置，下标和行号并不相同。超时的判断条件是“已执行 200000 条且还要执行下一条”，所以恰好在第 200000 条停止的程序不算超时。

把输出先收集到列表、最后一次性写出，比每次 `print` 更快；在 200000 步的循环里，这一差别很明显。""",
            'ja': """すべての検査を「実行する前」に行う。まず実行数が上限に達していないかを見て、次にその命令がエラーにならないかを確かめ、問題がなければ実行する。こうするとエラーの行番号は実行しようとした命令の行番号になり、それまでに `PRINT` で出力した値も残る。

前処理では各命令のファイル中の行番号を覚えておく。コメント・空行・ラベルは命令の位置を占めないので、添字と行番号は一致しない。打ち切りの条件は「200000 個実行済みで、さらに次を実行しようとしている」ことなので、ちょうど 200000 個目で止まるプログラムは打ち切りにならない。

出力はリストに集めて最後にまとめて書き出すと、毎回 `print` するより速い。200000 回のループではこの差が目立つ。""",
            'en': """Do every check before executing: first whether the step limit is reached, then whether this instruction would fail, and only then run it. The error line is then the line of the instruction about to run, and values already printed by `PRINT` are kept.

Remember each instruction's original line number while preprocessing: comments, empty lines and labels take no instruction slot, so index and line number differ. The timeout condition is “200000 executed and about to run another”, so a program that stops exactly at the 200000th instruction is not a timeout.

Collect the output in a list and write it once at the end; across 200000 iterations this is noticeably faster than calling `print` each time.""",
        },
    },
    {
        'id': 'CI-VM-4',
        'level': 4,
        'points': 35,
        'title': {'zh': '编译表达式', 'ja': '式のコンパイル', 'en': 'Compiling Expressions'},
        'statement': {
            'zh': """给定一个算术表达式，生成一个能在这台机器上计算并打印其值的程序。表达式由非负整数（不超过 10⁹，无前导零）、二元运算符 `+` `-` `*` 和括号组成，记号之间可以有任意空格。`*` 的优先级高于 `+` 与 `-`，同级运算从左到右结合；没有一元负号。

按如下规则把表达式 E 翻译为指令序列 code(E)：

- E 是整数 n 时，code(E) 是一条 `PUSH n`。
- E 是 A op B（op 是最后计算的运算）时，code(E) 依次是 code(A)、code(B)，以及 `ADD`、`SUB` 或 `MUL` 中对应的一条。
- 括号只决定运算顺序，本身不产生指令。

输出 code(E)，最后再加一条 `PRINT`。这样得到的程序是唯一的。

### 输入

一行，表达式 E。E 的长度不超过 10⁵，括号的嵌套深度不超过 50。

### 输出

每行一条指令。""",
            'ja': """算術式が与えられるので、この計算機でその値を計算して出力するプログラムを作れ。式は非負整数（10⁹ 以下、先頭に 0 をつけない）、二項演算子 `+` `-` `*`、括弧からなり、字句の間には任意個の空白が入りうる。`*` は `+`、`-` より優先順位が高く、同じ優先順位の演算は左結合である。単項マイナスはない。

式 E を次の規則で命令列 code(E) に翻訳する。

- E が整数 n のとき、code(E) は `PUSH n` の 1 命令である。
- E が A op B（op は最後に計算される演算）のとき、code(E) は code(A)、code(B)、そして `ADD`、`SUB`、`MUL` のうち対応する 1 命令をこの順に並べたものである。
- 括弧は計算の順序を決めるだけで、それ自体は命令を生まない。

code(E) の後に `PRINT` を 1 つ加えたものを出力せよ。こうして得られるプログラムは一意に定まる。

### 入力

1 行に式 E が与えられる。E の長さは 10⁵ 以下、括弧の入れ子の深さは 50 以下である。

### 出力

1 行に 1 命令ずつ出力せよ。""",
            'en': """Given an arithmetic expression, produce a program for this machine that computes and prints its value. The expression consists of non-negative integers (at most 10⁹, no leading zeros), the binary operators `+` `-` `*`, and parentheses, with any number of spaces between tokens. `*` binds tighter than `+` and `-`, and operators of equal precedence associate to the left. There is no unary minus.

Translate an expression E into the instruction sequence code(E):

- If E is an integer n, code(E) is the single instruction `PUSH n`.
- If E is A op B, where op is the operation evaluated last, code(E) is code(A), then code(B), then the matching one of `ADD`, `SUB` or `MUL`.
- Parentheses only fix the order of evaluation and produce no instruction themselves.

Print code(E) followed by one `PRINT`. This program is unique.

### Input

One line with the expression E. E has length at most 10⁵, and parentheses nest at most 50 deep.

### Output

Print one instruction per line.""",
        },
        'samples': [{'input': '2*3+4*5\n', 'expected': 'PUSH 2\nPUSH 3\nMUL\nPUSH 4\nPUSH 5\nMUL\nADD\nPRINT\n'}, {'input': '8 - (3 - 1) * 2\n', 'expected': 'PUSH 8\nPUSH 3\nPUSH 1\nSUB\nPUSH 2\nMUL\nSUB\nPRINT\n'}],
        'tests': compile_tests,
        'solution': """import re
import sys

tokens = re.findall(r'\\d+|[-+*()]', sys.stdin.read())
pos = 0
code = []


def expression():
    # expression := term (('+' | '-') term)*
    global pos
    term()
    while pos < len(tokens) and tokens[pos] in ('+', '-'):
        op = tokens[pos]
        pos += 1
        term()
        code.append('ADD' if op == '+' else 'SUB')


def term():
    # term := factor ('*' factor)*
    global pos
    factor()
    while pos < len(tokens) and tokens[pos] == '*':
        pos += 1
        factor()
        code.append('MUL')


def factor():
    # factor := number | '(' expression ')'
    global pos
    if tokens[pos] == '(':
        pos += 1
        expression()
        pos += 1                 # the matching ')'
    else:
        code.append(f'PUSH {int(tokens[pos])}')
        pos += 1


expression()
code.append('PRINT')
print('\\n'.join(code))
""",
        'brute': """import re, sys
tokens = re.findall(r'\\d+|[-+*()]', sys.stdin.read())
precedence = {'+': 1, '-': 1, '*': 2}
output, operators = [], []
for token in tokens:
    if token.isdigit():
        output.append(f'PUSH {int(token)}')
    elif token == '(':
        operators.append(token)
    elif token == ')':
        while operators[-1] != '(':
            output.append({'+': 'ADD', '-': 'SUB', '*': 'MUL'}[operators.pop()])
        operators.pop()
    else:
        while operators and operators[-1] != '(' and precedence[operators[-1]] >= precedence[token]:
            output.append({'+': 'ADD', '-': 'SUB', '*': 'MUL'}[operators.pop()])
        operators.append(token)
while operators:
    output.append({'+': 'ADD', '-': 'SUB', '*': 'MUL'}[operators.pop()])
print('\\n'.join(output + ['PRINT']))
""",
        'explanation': {
            'zh': """这是递归下降语法分析。把文法写成三个层次，每层一个函数：

```
expression := term (('+' | '-') term)*
term       := factor ('*' factor)*
factor     := number | '(' expression ')'
```

优先级由层次决定：`*` 在更深的 `term` 层处理，所以先结合。左结合由 `while` 循环保证：每读完一个右操作数就立即输出运算指令，`1-2-3` 因此得到 `PUSH 1, PUSH 2, SUB, PUSH 3, SUB`。在“读完右操作数之后”输出运算，正是题目要求的后序翻译。

先用正则表达式把输入切成记号，空格自然被跳过。嵌套深度不超过 50，递归深度只有约 150 层，在 Python 的默认上限之内。整个过程是 O(|E|)。也可以用调度场算法（shunting-yard）得到同样的结果。""",
            'ja': """再帰下降構文解析で解く。文法を 3 つの階層に分け、それぞれを 1 つの関数にする。

```
expression := term (('+' | '-') term)*
term       := factor ('*' factor)*
factor     := number | '(' expression ')'
```

優先順位は階層で決まる。`*` はより深い `term` で処理されるので先に結合する。左結合は `while` ループで保証される。右側の被演算子を読み終えるたびにすぐ演算命令を出すので、`1-2-3` は `PUSH 1, PUSH 2, SUB, PUSH 3, SUB` になる。「右側を読み終えてから演算を出す」ことが、問題の求める後置順の翻訳そのものである。

まず正規表現で入力を字句に分けると、空白は自然に読み飛ばされる。入れ子の深さは 50 以下なので再帰は約 150 段で、Python の既定の上限に収まる。全体で O(|E|)。操車場アルゴリズム（shunting-yard）でも同じ結果が得られる。""",
            'en': """This is recursive-descent parsing. Write the grammar in three levels, one function each:

```
expression := term (('+' | '-') term)*
term       := factor ('*' factor)*
factor     := number | '(' expression ')'
```

Precedence comes from the levels: `*` is handled in the deeper `term` level, so it binds first. Left associativity comes from the `while` loops: the operator is emitted as soon as its right operand is read, so `1-2-3` becomes `PUSH 1, PUSH 2, SUB, PUSH 3, SUB`. Emitting the operator after both operands is exactly the post-order translation the statement asks for.

Split the input into tokens with a regular expression first, which skips spaces naturally. Nesting is at most 50 deep, so recursion stays around 150 frames, well within Python’s default limit. The whole pass is O(|E|). The shunting-yard algorithm gives the same result.""",
        },
    },
]

SET = {
    'id': 'stackvm',
    'title': {'zh': '栈式计算机', 'ja': 'スタック計算機', 'en': 'A Stack Machine'},
    'minutes': 150,
    'preamble': PREAMBLE,
    'files': {},
    'parts': PARTS,
}
