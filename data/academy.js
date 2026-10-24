/* Plume Foundations. Original course content, compiled by scripts/assemble_academy.py. */
window.PLUME_ACADEMY = {
  "version": 2,
  "lessons": [
    {
      "id": "first-program",
      "order": 1,
      "stage": "start",
      "minutes": 40,
      "prerequisiteIds": [],
      "relatedProblems": [
        "PracticeA"
      ],
      "content": {
        "zh": {
          "title": "第一个程序",
          "summary": "运行、输出与错误信息。",
          "sections": [
            {
              "title": "程序、输入与输出",
              "body": "程序是一组让计算机按规则执行的指令。本课程使用 Python：你把指令写在编辑器中，再点击运行。编辑器保存的是程序文本；输入框保存的是本次给程序的数据；输出区域显示程序执行后写出的结果。这三个位置承担不同角色。把答案写在输入框中，不会自动成为程序输出；修改代码后，也需要重新运行才能看到新结果。\n\n先把一次运行想成“代码加上输入，产生输出”。本课没有输入，程序直接生成固定的两行文字或数字。之后同一份程序会接收不同输入，输出也会随之变化。自动检查会多次执行同一份代码，因此程序应该依据本次的数据计算，而不是依赖上次运行的变量。本地练习环境每次运行都会从新的 Python 状态开始。\n\n编程的第一步是能说清自己准备让程序做什么。运行前预测结果，运行后逐行比较，发现差异时回到对应语句。这比随机修改符号更容易找到原因。现在先只关注代码与输出；文件、账户和网络都不是本课所需的条件。"
            },
            {
              "title": "读懂一条 print 语句",
              "body": "观察 print(\"Python\")。print 是 Python 已经提供的函数名，可以先把函数理解成一个有名字的操作。圆括号表示调用这个操作，括号内是交给它的内容。英文双引号把 Python 标记为字符串，也就是一段文字。引号用来告诉解释器文字从哪里开始、到哪里结束，它们本身不会出现在输出中。单引号也可以，但两端必须配对，不能一端单引号、一端双引号。\n\n字符串外的空格可以帮助排版，而字符串内的空格是实际数据。print(\"a b\") 会输出中间那个空格。print(\"ab\") 则没有空格。中文输入法常产生弯引号或全角括号，它们不能代替 Python 语法中的半角引号与括号。练习时先确认使用英文标点。\n\nprint 默认在末尾写入一个换行。因此两条连续的 print 通常显示为两行。若一条 print 内有多个值，用逗号分隔，它默认用空格连接这些值。这是输出接口的规则，不是编辑器替你整理答案。把标点、文字与实际输出逐项对应，才能稳定地控制格式。",
              "code": "print(\"Python\")\nprint(\"a b\")\nprint(3, 4)\n",
              "output": "Python\na b\n3 4\n"
            },
            {
              "title": "表达式先计算，再输出",
              "body": "括号内可以放文字，也可以放计算式。print(3 + 4) 的执行过程分两步：先计算 3 + 4 得到整数 7，再把 7 写入输出。print(\"3 + 4\") 则把整个内容当作文字，不会进行加法。看到引号时，先问自己这里是在表示文本，还是本来想让 Python 计算。\n\n整数可以直接写成 0、8、56 等形式。加法用 +，减法用 -，乘法用 *。计算遵守常见的优先级：乘法先于加减，括号中的部分先计算。例如 2 + 3 * 4 得到 14，而 (2 + 3) * 4 得到 20。程序不会从左到右无条件地把所有运算按同一优先级处理。\n\n预测下面程序时，给每一行写出中间计算结果，然后再写最终显示内容。第一行是文字，第二行是按优先级计算，第三行由括号改变顺序。最后一行用一个 print 同时输出两个结果，结果之间有一个空格。这样跟踪小例子，可以把“代码看起来像什么”与“计算机实际执行什么”区分开来。",
              "code": "print(\"2 + 3 * 4\")\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(10 - 3, 2 * 6)\n",
              "output": "2 + 3 * 4\n14\n20\n7 12\n"
            },
            {
              "title": "完整程序的逐行核对",
              "body": "现在把多个输出步骤组成一个完整程序。假设题目要求第一行输出 Items，第二行输出 3 盒、每盒 4 件的总件数，第三行输出比总件数多 2 的数。先用自己的话写出三步：输出固定标题，计算 3 × 4，计算 3 × 4 + 2。再把每一步对应到一条 print，而不是边运行边猜需要多少行。\n\n执行从第一行开始，依次向下。注释以 # 开始，用来解释代码，Python 不把它当成指令。空白行也不产生输出。请注意“源码中的空行”和“输出中的空行”不同：前者只是分隔代码，后者要由 print() 等语句实际写出。下面的注释与空行不会让答案多出行。\n\n这段程序没有变量，也不读取输入。每次运行都应得到同样的三行。先记录预测结果，再运行，并比较行数、文字大小写和数字。若只观察最后一个数字，很容易漏掉前面的格式错误。算法题中格式是接口的一部分，因此完整核对输出，也是编程本身的一项技能。",
              "code": "# Three boxes, four items each\nprint(\"Items\")\n\nprint(3 * 4)\nprint(3 * 4 + 2)\n",
              "output": "Items\n12\n14\n"
            },
            {
              "title": "从错误信息定位问题",
              "body": "程序不能运行时，先读错误种类和行号，不要把整段代码重写。SyntaxError 表示 Python 没能按语法理解代码。常见原因是漏掉右括号、漏掉引号、使用中文标点。报错箭头指出解释器发现问题的位置，但真正漏掉的符号可能在前一行，所以要连同附近一起查看。修改一处后重新运行，确认新的结果。\n\nNameError 常见于把文字写在引号外。例如想输出 hello 却写 print(hello)，Python 会把 hello 当成一个名字，尝试寻找它对应的值。本课没有给这个名字赋值，因此不能使用它。正确的固定文字输出是 print(\"hello\")。这里不需要去定义一个变量来绕开问题，先理解文字与名字的区别。\n\n程序能运行但输出不同，是另一类问题。print(\"56\") 与 print(56) 在此例中显示相同，可是 print(\"8 * 7\") 不会计算。多余的提示语、额外空行、大小写错误也不会造成语法错误，却会使检查失败。把“无法执行”和“执行后结果不符”分开判断，才能选择合适的修正方向。"
            },
            {
              "title": "把题目要求变成可检查的程序",
              "body": "开始练习前，先圈出输入、处理、输出三个部分。本题明确没有输入，因此不要调用 input；处理包含一次乘法；输出要求两行。再把固定不变的文字与需要计算的值分开：Hello, World! 是原样输出的问候，8 × 7 是需要转换成 Python 算式的计算。\n\n然后列一个很小的核对表：第一行是否包含正确的逗号、一个空格和感叹号；第二行是否只含 56；是否一共两行。因为本题只有固定输出，一个测试就足够覆盖要求。这里不需要为了增加测试数量而给无输入的程序塞进随机数据。后面的输入题才需要用不同数据验证分支与边界。\n\n遇到新题时保留这个顺序：读格式，写处理步骤，预测一个结果，写代码，再比较完整输出。自动检查只能显示所测情况是否匹配，阅读题目和解释代码的能力不能由绿色标记替代。完成本课后，你应能够不用运行就说明每一条 print 的作用，以及为什么它产生了对应的一行。"
            }
          ],
          "exerciseTitle": "两行输出",
          "task": "不读取任何输入。第一行输出 Hello, World!，第二行输出算式 8 × 7 的值。使用 Python 计算第二行。",
          "input": "无输入。",
          "output": "输出恰好两行：第一行为 Hello, World!，第二行为整数结果。",
          "hint": "分别写两条 print()。Python 的乘法运算符是 *。",
          "explanation": "这道练习不读取输入，因此代码只需要两条输出语句。第一条使用带引号的字符串，准确输出 Hello, World!。第二条把 8 * 7 放在引号外，让 Python 计算得到整数 56。两次 print 默认各加一个换行，恰好形成题目要求的两行。不要添加提示语、空行，也不要把乘号写成数学排版用的 ×。运行后先检查第一行的逗号、空格和感叹号，再核对第二行是否为 56。本题没有输入边界，唯一需要检查的是完整输出格式。",
          "objectives": [
            "区分程序、输入和输出，知道运行按钮执行的是哪段代码。",
            "正确书写字符串、整数和算式，预测顺序执行的结果。",
            "按题目格式输出，并利用报错行号修正语法问题。"
          ],
          "checkpoints": [
            {
              "question": "print(\"8 * 7\") 与 print(8 * 7) 的输出有什么不同？",
              "answer": "前者输出引号内的文字 8 * 7；后者先计算乘法，再输出 56。"
            },
            {
              "question": "为什么不要输出“答案是 56”？",
              "answer": "题目只要求整数结果 56。说明性文字也是程序输出，会造成与期望格式不符。"
            }
          ]
        },
        "en": {
          "title": "Your first program",
          "summary": "Run code, print output, and read errors.",
          "sections": [
            {
              "title": "A program, its input, and its output",
              "body": "A program is a sequence of instructions for a computer. In this course those instructions are written in Python. The editor contains the program, the input area contains the data supplied for this particular run, and the output area shows what the program writes. They have different jobs: typing an answer into the input area does not make it the program’s output. After editing code, run it again to obtain a new result.\n\nThink of execution as code plus input producing output. This first lesson has no input, so the program produces fixed lines. Later, the same program will receive different data. Local checks start with fresh Python state, so you should not expect variables from an earlier run to remain available. Before each run, predict the result; afterward, compare it line by line. A specific difference gives you something concrete to investigate."
            },
            {
              "title": "Read one print statement",
              "body": "Look at print(\"Python\"). print is a function supplied by Python; for now, think of a function as a named operation. Parentheses call that operation, and the contents are its arguments. Ordinary quotation marks identify Python as text, called a string. The quotation marks tell the interpreter where the text begins and ends; they are not included in the output. Single quotes also work, provided the opening and closing marks match.\n\nSpaces inside a string are data: \"a b\" contains a space, while \"ab\" does not. Curly quotation marks and full-width parentheses from an input method are not substitutes for Python’s ordinary syntax characters. By default, print adds a newline after its arguments. When several values are separated by commas in one call, print normally places spaces between them. These rules let you predict the exact output.",
              "code": "print(\"Python\")\nprint(\"a b\")\nprint(3, 4)\n",
              "output": "Python\na b\n3 4\n"
            },
            {
              "title": "Evaluate before printing",
              "body": "The argument to print can be text or an expression. Executing print(3 + 4) first evaluates the addition to the integer 7 and then writes 7. In print(\"3 + 4\"), quotation marks make the entire argument text, so no addition occurs. Whenever you see quotes, decide whether the program needs literal text or a calculated value.\n\nWrite integers directly, such as 0, 8, or 56. Python uses + for addition, - for subtraction, and * for multiplication. Multiplication has priority over addition and subtraction; parentheses override that order. Thus 2 + 3 * 4 is 14, whereas (2 + 3) * 4 is 20. Trace the example before running it: identify the text line, evaluate each expression, and account for the space inserted between the two values in the final print call.",
              "code": "print(\"2 + 3 * 4\")\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(10 - 3, 2 * 6)\n",
              "output": "2 + 3 * 4\n14\n20\n7 12\n"
            },
            {
              "title": "Trace a complete small program",
              "body": "Combine the pieces into a complete program. Suppose the specification asks for Items on the first line, the number of items in three boxes of four on the second, and that total plus two on the third. Translate the request into three actions before writing code: print a fixed heading, calculate 3 × 4, and calculate 3 × 4 + 2. Assign one print call to each requested line.\n\nExecution proceeds downward. A comment starts with # and is not an instruction. An empty source line also produces no output: source formatting and output formatting are separate. In this example the comment and blank line do not add output lines. Because the program reads no input, repeated runs should produce the same result. Compare all three lines, including capitalization and line count, rather than checking only the final number.",
              "code": "# Three boxes, four items each\nprint(\"Items\")\n\nprint(3 * 4)\nprint(3 * 4 + 2)\n",
              "output": "Items\n12\n14\n"
            },
            {
              "title": "Use errors as evidence",
              "body": "When execution fails, start with the error type and line number instead of rewriting everything. SyntaxError means Python could not parse the code. Missing closing parentheses, unmatched quotes, and full-width punctuation are common causes. The arrow indicates where the parser noticed the problem, which can be just after the actual mistake; inspect the nearby line as well. Change one thing and run again.\n\nNameError can occur when intended text is left unquoted. In print(hello), Python treats hello as a name whose value should already exist. For fixed text, use print(\"hello\"). A program that runs but produces the wrong output needs a different investigation: look for uncalculated quoted expressions, extra prompts, unexpected empty lines, or incorrect capitalization. Distinguishing a failure to execute from an incorrect result makes debugging more systematic."
            },
            {
              "title": "Turn a specification into checks",
              "body": "Before the exercise, separate input, processing, and output. There is explicitly no input, so no input() call is needed. Processing consists of one multiplication, and output consists of two lines. Distinguish fixed text from a value to calculate: Hello, World! is the literal greeting, while 8 × 7 must become a Python expression.\n\nMake a short checklist: the first line has the correct comma, one space, and an exclamation mark; the second contains only 56; there are exactly two lines. One fixed-output test is appropriate here. Later input-based exercises will need varied boundary cases. Keep this workflow for future problems: read the format, state the steps, predict an example, implement it, and compare the entire output. You should be able to explain each statement without relying on a successful check alone."
            }
          ],
          "exerciseTitle": "Two lines of output",
          "task": "Read no input. Print Hello, World! on the first line and the value of 8 × 7 on the second. Let Python calculate the second line.",
          "input": "There is no input.",
          "output": "Print exactly two lines: Hello, World! followed by the integer result.",
          "hint": "Use two print() calls. Multiplication in Python uses *.",
          "explanation": "This exercise reads no input, so it needs only two output statements. The first passes the exact string Hello, World! to print. The second passes the unquoted expression 8 * 7, which Python evaluates to the integer 56. Each print adds one newline, producing exactly two lines. Do not add a prompt, an empty line, or the mathematical multiplication glyph × in your Python expression. Check the greeting’s comma, space, and exclamation mark before checking the second line. There are no input boundary cases; the complete output format is the condition to verify.",
          "objectives": [
            "Distinguish program, input, and output, and identify what Run executes.",
            "Write strings, integers, and expressions, and predict sequential execution.",
            "Match an output specification and use error locations to repair syntax."
          ],
          "checkpoints": [
            {
              "question": "How do print(\"8 * 7\") and print(8 * 7) differ?",
              "answer": "The first prints the literal text 8 * 7. The second evaluates the multiplication and prints 56."
            },
            {
              "question": "Why should the program not print “The answer is 56”?",
              "answer": "The specification requests only 56. Additional explanatory text is part of the output and does not match that format."
            }
          ]
        },
        "ja": {
          "title": "最初のプログラム",
          "summary": "実行、出力、エラーの読み方。",
          "sections": [
            {
              "title": "プログラム・入力・出力",
              "body": "プログラムとは、コンピュータに行わせる処理を順番に書いたものです。このコースでは Python で記述し、エディタのコードを実行します。エディタには手順、入力欄には今回のデータ、出力欄にはプログラムが書き出した結果が入ります。3 つの役割を混同しないでください。入力欄に答えを書いても出力にはなりません。また、コードを書き換えただけでは結果は更新されず、再実行が必要です。\n\n1 回の実行を「コードと入力から出力を作る過程」と考えます。本課には入力がなく、決まった文字や数字を直接出力します。後の課では、同じコードに異なる入力を与えます。ローカルの確認では毎回新しい Python の状態から始まるため、前回の実行で作った変数が残っていることを期待してはいけません。\n\n実行前に結果を予想し、実行後に 1 行ずつ照合します。異なる行があれば、その行を出すコードへ戻ります。根拠なく記号を変えるよりも、違いを具体的に特定するほうが修正しやすくなります。今はコードと出力の関係に集中してください。ファイル操作やアカウント登録、通信の知識は必要ありません。"
            },
            {
              "title": "print 文を分解する",
              "body": "print(\"Python\") を見てみます。print は Python が用意している関数の名前です。今は「名前の付いた操作」と考えれば十分です。丸括弧でその操作を呼び出し、括弧内の内容を渡します。半角の引用符で囲んだ Python は文字列、つまり文字の並びです。引用符は文字列の開始と終了を伝えるための記号で、出力には含まれません。一重引用符でも書けますが、開きと閉じは同じ種類にそろえます。\n\n文字列の外側の空白と、内側の空白は役割が違います。\"a b\" の空白はデータなので表示されますが、\"ab\" にはありません。入力方式によって入る曲がった引用符や全角括弧は、Python の半角記号の代わりにはなりません。まず半角の記号で書いていることを確認します。\n\nprint は通常、最後に改行を追加します。連続した 2 回の print は 2 行の出力になります。また、1 回の呼び出しで値をカンマ区切りにすると、その間には通常空白が入ります。これは出力関数の規則です。記号と表示結果の対応を一つずつ理解すると、必要な形式を自分で制御できるようになります。",
              "code": "print(\"Python\")\nprint(\"a b\")\nprint(3, 4)\n",
              "output": "Python\na b\n3 4\n"
            },
            {
              "title": "計算してから出力する",
              "body": "print の括弧内には、文字列だけでなく式も書けます。print(3 + 4) では、まず加算を計算して整数 7 を得て、それを出力します。一方、print(\"3 + 4\") は全体が文字列なので加算をしません。引用符を見たら、文字をそのまま表示したいのか、計算した値が必要なのかを区別します。\n\n整数は 0、8、56 のように直接書けます。加算は +、減算は -、乗算は * を使います。演算には優先順位があり、乗算は加減算より先です。括弧内はさらに優先されます。したがって 2 + 3 * 4 は 14、(2 + 3) * 4 は 20 です。すべてを無条件に左から同じ優先度で処理するわけではありません。\n\n下の例は実行前に 1 行ずつ追ってください。最初の行は文字列、次の行は通常の優先順位による計算、その次は括弧で順序を変更した計算です。最後の print は 2 つの計算結果を 1 行に出し、その間に空白を置きます。小さな例の途中結果を書くことで、コードの見た目と実際に行われる処理を分けて考えられます。",
              "code": "print(\"2 + 3 * 4\")\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(10 - 3, 2 * 6)\n",
              "output": "2 + 3 * 4\n14\n20\n7 12\n"
            },
            {
              "title": "短いプログラムを最後まで追う",
              "body": "複数の出力を組み合わせて、1 つのプログラムにします。1 行目に Items、2 行目に「3 箱に各 4 個」の総数、3 行目に総数より 2 大きい数を出すとします。まず「固定の見出しを出す」「3 × 4 を計算する」「3 × 4 + 2 を計算する」の 3 手順に分けます。それぞれを 1 回の print に対応させれば、出力行数も明確になります。\n\n実行は先頭から下へ進みます。# で始まるコメントは説明のためのもので、処理として実行されません。ソース中の空行も出力を発生させません。「コードを読みやすくする空行」と「答えの空行」は別です。後者を出すには print() などの処理が必要です。例のコメントや空行で出力行数は増えません。\n\nこのプログラムは変数も入力も使わないので、何度実行しても同じ 3 行になります。先に予想を書き、実行結果の行数、文字の大文字・小文字、数値を照合します。最後の数字だけを見ると、前の行の形式の誤りを見落とします。出力形式を守ることも、問題を解くために必要な作業です。",
              "code": "# Three boxes, four items each\nprint(\"Items\")\n\nprint(3 * 4)\nprint(3 * 4 + 2)\n",
              "output": "Items\n12\n14\n"
            },
            {
              "title": "エラーを手掛かりにする",
              "body": "実行できない場合は、すべてを書き直す前にエラーの種類と行番号を読みます。SyntaxError は、Python が構文として読み取れなかったという意味です。閉じ括弧の不足、引用符の対応漏れ、全角記号などを調べます。矢印は問題を発見した位置を示すため、実際の原因が直前の行にある場合もあります。周辺も確認し、1 箇所直したら再実行します。\n\nNameError は、文字を引用符で囲み忘れた場合にも起こります。print(hello) と書くと、Python は hello を名前として扱い、対応する値を探します。本課ではその名前に値を代入していないので使えません。固定の文字なら print(\"hello\") とします。変数を増やして回避する前に、文字列と名前の違いを理解します。\n\n実行できても答えが違う場合は、別の調べ方が必要です。print(\"56\") と print(56) は同じ表示になりますが、print(\"8 * 7\") は計算をしません。余計な案内文や空行、大文字・小文字の違いも構文エラーにはならない一方で、出力の不一致を起こします。「実行不能」と「実行結果の誤り」を分けて考えると、修正する場所を絞れます。"
            },
            {
              "title": "問題文を確認可能な手順にする",
              "body": "演習の前に、入力・処理・出力の 3 部分を確認します。この問題には入力がないので input() は不要です。処理は乗算 1 回、出力は 2 行です。Hello, World! はそのまま出す文字列であり、8 × 7 は Python の式に置き換える計算です。\n\n確認項目を小さくまとめます。1 行目のカンマ・1 個の空白・感嘆符が正しいか、2 行目は 56 だけか、全部で 2 行かを見ます。固定出力しかない問題なので、テストは 1 個で要求を確認できます。入力を読まないプログラムへ適当な値を増やしても、新しい条件の確認にはなりません。後の課では入力を変えて分岐や境界を調べます。\n\n新しい問題でも「形式を読む、手順を書く、結果を予想する、実装する、全出力を比べる」の順番を保ちます。自動テストの通過だけでは、コードの意味を理解した証明にはなりません。各 print が何を受け取り、どの行を出すのかを、実行せず説明できることを本課の到達点にします。"
            }
          ],
          "exerciseTitle": "2 行の出力",
          "task": "入力はありません。1 行目に Hello, World!、2 行目に 8 × 7 の値を出力してください。2 行目の値は Python で計算してください。",
          "input": "入力はありません。",
          "output": "Hello, World! と計算結果の整数を、それぞれ 1 行ずつ、合計 2 行で出力してください。",
          "hint": "print() を 2 回使います。Python の乗算演算子は * です。",
          "explanation": "入力がないため、必要なのは出力文 2 個です。1 個目は引用符で囲んだ Hello, World! をそのまま表示します。2 個目は 8 * 7 を引用符の外に書き、Python に整数 56 を計算させます。print はそれぞれ末尾に改行を付けるので、指定どおり 2 行になります。案内文や空行を追加せず、Python の式で乗算記号 × を使わないでください。最初の行のカンマ・空白・感嘆符と、次の行の 56 を順に確認します。入力の境界条件はなく、出力全体の形式が確認対象です。",
          "objectives": [
            "プログラム・入力・出力を区別し、実行するコードを確認する。",
            "文字列・整数・式を正しく書き、実行順に結果を予測する。",
            "指定の形式で出力し、エラーの行番号から構文を修正する。"
          ],
          "checkpoints": [
            {
              "question": "print(\"8 * 7\") と print(8 * 7) はどう違いますか。",
              "answer": "前者は文字列 8 * 7 をそのまま表示します。後者は乗算を計算して 56 を表示します。"
            },
            {
              "question": "「答えは 56」と出力してはいけないのはなぜですか。",
              "answer": "指定は整数 56 だけです。説明文も出力の一部なので、要求された形式と一致しません。"
            }
          ]
        }
      },
      "starter": "# TODO\n",
      "solution": "print(\"Hello, World!\")\nprint(8 * 7)\n",
      "tests": [
        {
          "input": "",
          "expected": "Hello, World!\n56\n"
        }
      ]
    },
    {
      "id": "input-and-numbers",
      "order": 2,
      "stage": "start",
      "minutes": 50,
      "prerequisiteIds": [
        "first-program"
      ],
      "relatedProblems": [
        "APG4bPython EX5",
        "ABC302A"
      ],
      "content": {
        "zh": {
          "title": "输入与整数",
          "summary": "把输入文字转换成可以计算的数。",
          "sections": [
            {
              "title": "输入是一段文字，不是自动识别的数字",
              "body": "上一课的程序总是输出固定结果。实际题目给出的是一类问题：同一份代码应处理不同的数字。input() 每次读取一行，并去掉末尾的换行符，结果仍是字符串。即使输入看起来全是数字，Python 也不会自动判断你想要整数。电话号码、编号也可能由数字组成，这正是输入与数值转换分开的原因。\n\n变量可以理解为当前指向某个值的名字。n = input() 的顺序是先执行右边，再把结果绑定到左边的 n。这里 = 是赋值，不是数学中的永久等式。之后写 n = int(n)，会先读取旧 n 的字符串值，转换后再让 n 指向新整数。也可以把两步写成 n = int(input())，但应先理解展开过程。\n\n输入一行 12 后，print(n + n) 的意义取决于 n 的类型：字符串连接得到 1212，整数相加得到 24。不要仅凭显示内容判断类型。变量名不会自动决定类型，叫 number 的变量也可能保存文字；真正决定类型的是读入和转换的操作。",
              "code": "raw = input()\nprint(raw + raw)\nn = int(raw)\nprint(n + n)\n",
              "output": "1212\n24\n",
              "exampleInput": "12\n"
            },
            {
              "title": "先拆分，再逐个转换",
              "body": "题目常把多个整数写在同一行，例如 7 3。直接执行 int(input()) 会尝试把整段 \"7 3\" 转成一个整数，因中间含空白而失败。应先使用 split()：它按空白把一行拆成若干段，返回按原顺序排列的列表。列表会在后面的课程系统学习；现在只需知道 parts[0] 取第一段，parts[1] 取第二段，下标从 0 开始。\n\n先写易读的展开形式：line = input()；parts = line.split()；n = int(parts[0])；k = int(parts[1])。给定输入 7 3，line 是 \"7 3\"，parts 是两个字符串，n 与 k 最后才是整数。split() 不传参数时，会把连续空白作为分隔，因此一般不用自己数中间有几个空格。\n\n理解后再看 n, k = map(int, input().split())。map 把 int 应用于每一段，左边两个名字按顺序接收两个结果，这叫拆包。它并不比展开形式更正确，只是更短。输入规定只有两项时才能用两个名字接收；数量不符会报错。先依据题目的行结构读数据，再考虑简写。",
              "code": "line = input()\nparts = line.split()\nn = int(parts[0])\nk = int(parts[1])\nprint(n + k)\n",
              "output": "10\n",
              "exampleInput": "7 3\n"
            },
            {
              "title": "整除、余数与整数精度",
              "body": "盒数、人数、步数等问题经常需要整数结果。Python 中 / 做普通除法，结果通常是浮点数，例如 7 / 3；// 是向下取整的除法，7 // 3 为 2；% 给出余数，7 % 3 为 1。对于非负 n 和正 k，始终有 n = (n // k) * k + n % k，且余数小于 k。这个关系可以用来检查自己的模型。\n\n向下取整不是向零截断。负数参与时，-7 // 3 为 -3，余数为 2。当前装盒练习只使用非负物品数，不需要处理这类情况，但记住运算符的真实含义，避免以后把不同语言中的除法行为混在一起。除数为 0 会产生 ZeroDivisionError，是否可能为零应先看约束。\n\nPython 的整数能按需要扩展，不会因为答案超过 32 位整数范围就自动溢出。不过把整数改为浮点数再转回去，可能失去精度。涉及整除和向上取整时，优先寻找纯整数式。下面程序同时输出商、余数和重建的原数，最后一行应与最初输入 n 相同。",
              "code": "n, k = map(int, input().split())\nq = n // k\nr = n % k\nprint(q, r)\nprint(q * k + r)\n",
              "output": "2 1\n7\n",
              "exampleInput": "7 3\n"
            },
            {
              "title": "逐步追踪变量的值",
              "body": "赋值允许用旧值计算新值。假设有 balance = 100，再执行 balance = balance - 30：先读右边的旧 balance，得到 100 - 30 = 70，最后左边更新为 70。这不是要求求解等式 balance = balance - 30；赋值箭头在概念上从右边指向左边。多个语句按顺序执行，后面的语句看到前面更新后的值。\n\n下面程序读入预算、单价和数量。对输入 100、12 5，先得到三个整数；cost = price * quantity 得到 60；remaining = budget - cost 得到 40。输出要求是总花费和剩余预算，用一个 print(cost, remaining) 就能产生空格分隔的一行。不要在输入里额外写“预算：”，因为整数转换只接受数值文本。\n\n跟踪时可在纸上写“语句执行后”的变量表，一行对应一次更新。预算不改变、单价不改变，只有新变量 cost 和 remaining 被创建。学会区分输入量、中间量与答案，有助于避免重复读取输入，也能防止为了节省变量名而覆盖之后还需要的数据。",
              "code": "budget = int(input())\nprice, quantity = map(int, input().split())\ncost = price * quantity\nremaining = budget - cost\nprint(cost, remaining)\n",
              "output": "60 40\n",
              "exampleInput": "100\n12 5\n"
            },
            {
              "title": "常见输入错误与修正方法",
              "body": "ValueError 常表示转换的文字不是合法整数，例如把 \"3.5\"、空字符串或 \"7 3\" 直接交给 int。先查看题目规定：若是一行多个整数，需要 split；若是小数，就不应使用整数读法；若漏填了测试输入，则应修正测试数据，而不是在程序里随意塞一个默认值。题目的约束决定程序可以假设哪些输入合法。\n\nEOFError 表示代码试图读取的行已经不存在。一个常见原因是题目把两个整数放在同一行，你却调用了两次 input。另一个原因是调试时又调用 input 来“看看读到了什么”，结果额外消耗了一行。每次 input 都会向后推进输入位置，不会重复返回刚才那一行。要查看已读内容，打印保存它的变量即可，提交前再移除调试输出。\n\n变量名大小写不同代表不同名字。读入 n 后使用 N，会出现 NameError。可以选择任何清楚且合法的名字，但同一含义应保持一致。不要把本来要提交的程序写成 input(\"请输入数字\")，这会把提示语写入标准输出，影响自动检查。本地练习和算法题都依赖约定好的输入格式，不需要交互式提示。"
            },
            {
              "title": "从数量关系得到装盒公式",
              "body": "不要一开始就背向上取整公式。先把物品分成装满的盒子和剩余部分。N = 7、K = 3 时，两盒各装三件，剩一件还要一盒，因此答案为三；N = 12、K = 4 时，三盒恰好装完，不应再加一。由此得到规则：整数商是基础盒数，只有余数大于零才多一盒。下一课将用条件分支直接表达这条规则。\n\n本课先使用等价表达式 (N + K - 1) // K。它在做整除前增加 K - 1，足以把任何正余数推到下一档，却不会让原本整除的数量再多一档。可以把 N 写成 qK + r，其中 0 ≤ r < K：若 r = 0，结果为 q；若 r > 0，结果为 q + 1。这解释了公式的原因，而不只是给出记忆方法。\n\n最后把题意转成三段程序：读取 N、K；计算答案；输出一个整数。测试选 0 件、恰好装满、刚超过一盒、大数。每个测试对应一个可能出错的逻辑点。若你只测 7 3，错误写法 N // K + 1 也会通过，所以测试必须区分“看似合理”和“覆盖边界”的算法。"
            }
          ],
          "exerciseTitle": "分装盒子",
          "task": "有 N 个物品，每个盒子最多装 K 个。求装下全部物品至少需要多少盒。0 ≤ N ≤ 10⁹，1 ≤ K ≤ 10⁹。",
          "input": "一行包含两个整数 N K。",
          "output": "输出所需盒数，一个整数。",
          "hint": "N 能整除 K 时不加盒子；否则还需要一个盒子。也可以计算 (N + K - 1) // K。",
          "explanation": "先确定 N 是物品数、K 是每盒容量，容量至少为 1，因此不会除以零。N // K 给出能装满的盒数，N % K 表示剩余物品；余数为 0 时无需额外盒子，否则再加一。将这个规则化简，可写成 (N + K - 1) // K。参考解采用后一种整数表达式，不把大整数转成浮点数。N = 0 时分子是 K - 1，整除结果为 0；N 能整除 K 时结果恰好是商；不能整除时结果比商多一。四个测试分别覆盖有余数、恰好整除、没有物品及大整数。运算次数固定，时间与额外空间为 O(1)。",
          "objectives": [
            "按行读取输入，区分字符串与整数。",
            "先掌握 split、int 和拆包，再理解 map 的简写。",
            "使用整除和余数建模，正确处理零与整除边界。"
          ],
          "checkpoints": [
            {
              "question": "input() 读到 12 后，得到整数还是字符串？",
              "answer": "字符串 \"12\"。需要 int(input()) 才得到整数 12。"
            },
            {
              "question": "N=12、K=4 时，为什么 N//K+1 不正确？",
              "answer": "12 件恰好装满 3 盒，不需要第 4 盒。只有余数非零时才加一。"
            }
          ]
        },
        "en": {
          "title": "Input and integers",
          "summary": "Convert input text into values you can calculate with.",
          "sections": [
            {
              "title": "Input begins as text",
              "body": "The previous program always produced fixed output. An input-based problem asks one program to handle many values. Each input() reads one line and removes its final newline, but returns a string even when the characters look numeric. This separation matters because a telephone number or identifier may contain digits without being a quantity to calculate.\n\nA variable is a name referring to a current value. In n = input(), the right side runs first and its result is assigned to n. Assignment is not a permanent mathematical equation. n = int(n) converts the old string value and rebinds n to an integer. Combining the operations as n = int(input()) is convenient once you understand both steps. For input 12, string addition produces 1212 while integer addition produces 24; the name of a variable does not determine its type.",
              "code": "raw = input()\nprint(raw + raw)\nn = int(raw)\nprint(n + n)\n",
              "output": "1212\n24\n",
              "exampleInput": "12\n"
            },
            {
              "title": "Split first, then convert",
              "body": "Problems often place several integers on one line, such as 7 3. int(input()) would try to convert the whole string \"7 3\" into one integer and fail. First call split(), which separates the line at whitespace and returns an ordered list of pieces. Lists are covered later; for now, parts[0] means the first piece and parts[1] the second, because indices start at zero.\n\nRead the expanded example before adopting shorthand. The line is text, its pieces are still text, and only int creates numeric values. With no argument, split() handles repeated whitespace. Once this is clear, n, k = map(int, input().split()) expresses the same idea: map applies int to each piece, and unpacking assigns the two results in order. The number of receiving names must match the number of values.",
              "code": "line = input()\nparts = line.split()\nn = int(parts[0])\nk = int(parts[1])\nprint(n + k)\n",
              "output": "10\n",
              "exampleInput": "7 3\n"
            },
            {
              "title": "Quotients, remainders, and exact integers",
              "body": "Counts of boxes, people, or moves usually need integer results. In Python, / performs ordinary division and normally produces a floating-point number. // rounds the quotient downward: 7 // 3 is 2. % returns the remainder: 7 % 3 is 1. For nonnegative n and positive k, n equals (n // k) * k + n % k, with the remainder smaller than k. Use that identity to check your interpretation.\n\nFlooring is not truncation toward zero: -7 // 3 is -3, with remainder 2. The packing exercise uses nonnegative quantities, but the distinction matters later. Division by zero raises an error. Python integers can grow beyond fixed 32-bit limits; converting them to floating point can lose precision. Prefer integer formulas when the desired result is an exact count.",
              "code": "n, k = map(int, input().split())\nq = n // k\nr = n % k\nprint(q, r)\nprint(q * k + r)\n",
              "output": "2 1\n7\n",
              "exampleInput": "7 3\n"
            },
            {
              "title": "Trace changing values",
              "body": "Assignment can use an old value to compute a new one. After balance = 100, the statement balance = balance - 30 evaluates the right side using 100 and then stores 70. It is not a mathematical equation to solve. Conceptually, the assignment moves a value from right to left. Later statements see updates performed by earlier statements.\n\nThe example reads a budget, a price, and a quantity. For the shown input, cost becomes 12 × 5 = 60 and remaining becomes 100 - 60 = 40. One print call separates those answers with a space. Do not add labels such as “budget:” to numeric input. When tracing, record values after each assignment. Distinguishing input values, intermediate values, and answers helps you avoid rereading data or overwriting a value you still need.",
              "code": "budget = int(input())\nprice, quantity = map(int, input().split())\ncost = price * quantity\nremaining = budget - cost\nprint(cost, remaining)\n",
              "output": "60 40\n",
              "exampleInput": "100\n12 5\n"
            },
            {
              "title": "Diagnose input mistakes",
              "body": "ValueError often means that int received text that is not a valid integer, such as \"3.5\", an empty string, or the unsplit line \"7 3\". Compare your reading code with the specification: multiple integers need splitting; decimal values need a different conversion; missing test data should be repaired in the input, not concealed by an arbitrary default value. Constraints tell you which inputs the program may assume are valid.\n\nEOFError means another requested line does not exist. Perhaps two integers were on one line while your code called input twice. Every input() advances the input position; it does not repeat the previous line. Inspect a stored variable instead of reading again. Names are case-sensitive, so n and N differ. Finally, avoid input(\"Enter a number\"): its prompt becomes output and interferes with a judged program’s required format."
            },
            {
              "title": "Derive the packing formula",
              "body": "Do not begin by memorizing a ceiling formula. Separate full boxes from leftover items. With N = 7 and K = 3, two boxes hold six items and one remaining item needs another box. With N = 12 and K = 4, three boxes are already enough. Thus the quotient is the base count, with one added only for a positive remainder. The next lesson will express that rule with a branch.\n\nHere use the equivalent expression (N + K - 1) // K. Write N as qK + r, where 0 ≤ r < K. Adding K - 1 leaves an exact multiple in quotient q, but moves any positive remainder into quotient q + 1. Implement reading, calculation, and output as separate steps. Test zero, exact multiples, a leftover item, and large values; a single example cannot distinguish the correct rule from always adding one."
            }
          ],
          "exerciseTitle": "Packing boxes",
          "task": "There are N items and each box holds at most K items. Find the minimum number of boxes needed. 0 ≤ N ≤ 10⁹ and 1 ≤ K ≤ 10⁹.",
          "input": "One line containing two integers N K.",
          "output": "Print the number of boxes as one integer.",
          "hint": "An exact multiple needs no extra box. Otherwise add one; equivalently, use (N + K - 1) // K.",
          "explanation": "Identify N as the item count and K as capacity. K is at least 1, so division by zero cannot occur. N // K counts full boxes and N % K counts leftover items. A zero remainder needs no extra box; a positive remainder needs one. The equivalent integer formula is (N + K - 1) // K, which the reference uses without converting large integers to floating point. For N = 0, the numerator K - 1 yields zero boxes. Exact multiples yield the ordinary quotient; other inputs yield one more. The four checks cover a remainder, an exact multiple, no items, and a large integer. The number of operations is fixed, so time and extra space are O(1).",
          "objectives": [
            "Read input by line and distinguish strings from integers.",
            "Understand split, int, and unpacking before using map as shorthand.",
            "Model integer quantities with quotient and remainder, including zero and exact multiples."
          ],
          "checkpoints": [
            {
              "question": "Does input() reading 12 return an integer or a string?",
              "answer": "It returns the string \"12\". int(input()) converts it to the integer 12."
            },
            {
              "question": "Why is N//K+1 wrong for N=12 and K=4?",
              "answer": "Twelve items fit exactly in three boxes. An additional box is needed only for a nonzero remainder."
            }
          ]
        },
        "ja": {
          "title": "入力と整数",
          "summary": "入力された文字列を計算できる数値に変換する。",
          "sections": [
            {
              "title": "入力はまず文字列になる",
              "body": "前課は固定の結果を出すプログラムでした。入力のある問題では、同じコードで異なる値を処理します。input() は 1 行を読み、末尾の改行を除きますが、結果は数字だけでも文字列です。電話番号や識別子のように、数字で書かれていても計算する量とは限らないため、入力と数値への変換は別の操作になっています。\n\n変数は、現在の値を参照する名前と考えます。n = input() は右側を先に実行して、その結果を n に代入します。= は永続的な数学の等式ではありません。n = int(n) と書けば、古い n の文字列を整数へ変換してから n を更新します。2 段階を理解すれば n = int(input()) とまとめられます。\n\n入力が 12 のとき、文字列の n + n は 1212、整数の n + n は 24 になります。画面に見える文字だけで型を判断しないでください。変数を number と名付けても整数になるわけではなく、どの操作で作った値かによって型が決まります。",
              "code": "raw = input()\nprint(raw + raw)\nn = int(raw)\nprint(n + n)\n",
              "output": "1212\n24\n",
              "exampleInput": "12\n"
            },
            {
              "title": "分割してから整数へ変換する",
              "body": "問題では 7 3 のように、複数の整数を 1 行に書くことがあります。int(input()) では文字列 \"7 3\" 全体を 1 個の整数へ変えようとして失敗します。先に split() を使うと、空白で分かれた文字列の一覧を元の順番で得られます。リストは後で学びますが、ここでは parts[0] が最初、parts[1] が 2 番目で、番号が 0 から始まることを押さえます。\n\nまず例のように操作を展開します。line は行全体の文字列、parts の各要素も文字列で、int を使った後の n と k が整数です。引数なしの split() は連続する空白も区切りとして扱うので、空白の個数を数える必要はありません。\n\n理解できたら n, k = map(int, input().split()) という短い形を使えます。map は各要素に int を適用し、左の 2 つの名前が順に結果を受け取ります。これはアンパックと呼ばれます。短い形がより正しいわけではありません。受け取る名前の数と値の数が一致すること、問題文の行構造に沿って読むことが大切です。",
              "code": "line = input()\nparts = line.split()\nn = int(parts[0])\nk = int(parts[1])\nprint(n + k)\n",
              "output": "10\n",
              "exampleInput": "7 3\n"
            },
            {
              "title": "整数除算・余り・正確な整数",
              "body": "箱数・人数・移動回数などは整数で答えることが多くあります。Python の / は通常の除算で、通常は浮動小数点数を返します。// は商の切り下げで、7 // 3 は 2、% は余りで、7 % 3 は 1 です。非負の n と正の k では n = (n // k) * k + n % k が成り立ち、余りは k より小さくなります。この関係で解釈を確かめられます。\n\n切り下げは 0 方向への切り捨てとは異なります。-7 // 3 は -3、余りは 2 です。今回の箱詰めは非負の個数だけですが、後で他の言語の除算と混同しないよう意味を覚えます。除数が 0 なら ZeroDivisionError になります。0 があり得るかは制約で確認します。\n\nPython の整数は必要に応じて大きくなるため、32 ビットの範囲を超えただけではオーバーフローしません。一方、浮動小数点数へ変換すると精度を失う場合があります。正確な個数が必要なら整数だけの式を優先します。例では商・余り・元の値の再構成を表示し、最後の値が n に一致することを確認します。",
              "code": "n, k = map(int, input().split())\nq = n // k\nr = n % k\nprint(q, r)\nprint(q * k + r)\n",
              "output": "2 1\n7\n",
              "exampleInput": "7 3\n"
            },
            {
              "title": "変数の値を順に追う",
              "body": "代入では、古い値から新しい値を作れます。balance = 100 の後に balance = balance - 30 を実行すると、右辺の古い 100 で 100 - 30 = 70 を計算し、その後 balance を 70 に更新します。数学の等式を解いているのではありません。概念的には右から左へ値を渡します。後の文は、それまでの更新を反映した値を使います。\n\n例は予算、単価、個数を読みます。入力が 100 と 12 5 なら、cost = price * quantity で 60、remaining = budget - cost で 40 になります。print(cost, remaining) は空白区切りの 1 行を出力します。入力に「予算：」のような見出しを加えると、整数への変換は失敗します。\n\n追跡するときは、各文を実行した直後の値を表にします。budget・price・quantity は変わらず、cost と remaining が新たに作られます。入力の値、中間結果、最終的な答えを区別すると、同じ入力を繰り返し読んだり、後で必要な値を上書きしたりする誤りを避けられます。",
              "code": "budget = int(input())\nprice, quantity = map(int, input().split())\ncost = price * quantity\nremaining = budget - cost\nprint(cost, remaining)\n",
              "output": "60 40\n",
              "exampleInput": "100\n12 5\n"
            },
            {
              "title": "入力の誤りを切り分ける",
              "body": "ValueError は、int に整数として解釈できない文字を渡した場合によく出ます。\"3.5\"、空文字列、分割前の \"7 3\" などです。問題の形式を確認し、1 行の複数整数なら split、小数なら適切な変換、入力欄が不足しているならテストデータを修正します。適当な既定値で隠すのではなく、どの入力が合法かを制約から判断します。\n\nEOFError は、もう存在しない行を読もうとしたことを表します。2 個の整数が同じ行なのに input を 2 回呼んだ場合などに起こります。確認のつもりで input を追加すると、それも次の行を消費します。input() は入力位置を進めるので、前に読んだ行をもう一度返しません。確認には保存済みの変数を表示し、提出前にデバッグ出力を削除します。\n\nn と N は別の名前です。入力後に別の大文字・小文字を使うと NameError になります。また input(\"数字を入力\") のような案内付きの入力は、案内文を標準出力へ書きます。自動判定では余計な出力になるため、合意された入力形式をそのまま読み取ります。"
            },
            {
              "title": "個数の関係から式を導く",
              "body": "最初から切り上げの式を暗記する必要はありません。満杯の箱と余った品物に分けます。N = 7、K = 3 なら 2 箱で 6 個を入れ、残り 1 個にもう 1 箱必要です。N = 12、K = 4 なら 3 箱で十分です。つまり商を基本の箱数にし、余りが正のときだけ 1 を加えます。次の課では条件分岐で直接この規則を書けます。\n\nここでは同じ意味の (N + K - 1) // K を使います。N = qK + r、0 ≤ r < K と分解すると、r = 0 の場合は K - 1 を加えても商は q のままです。r > 0 の場合だけ次の商 q + 1 に進みます。式を覚えるだけでなく、なぜ整数商を正しく切り上げられるかを説明できます。\n\nコードは「N と K を読む、計算する、整数を出す」の 3 部分に分けます。テストは 0 個、割り切れる個数、箱から 1 個あふれる場合、大きな数を選びます。それぞれが別の誤りを検出します。7 3 だけでは N // K + 1 という誤った式も通るため、境界を区別できる入力が必要です。"
            }
          ],
          "exerciseTitle": "箱詰め",
          "task": "N 個の品物があり、1 箱には最大 K 個入ります。すべてを入れるのに必要な箱の最小個数を求めてください。0 ≤ N ≤ 10⁹、1 ≤ K ≤ 10⁹ です。",
          "input": "1 行に整数 N K が与えられます。",
          "output": "必要な箱の個数を整数で出力してください。",
          "hint": "N が K の倍数なら追加の箱は不要です。それ以外は 1 箱追加します。(N + K - 1) // K とも書けます。",
          "explanation": "N は品物数、K は容量です。K ≥ 1 なのでゼロ除算は起こりません。N // K は満杯になる箱の数、N % K は残りの品物数です。余りが 0 なら追加不要、正なら 1 箱追加します。同じ規則を整数式 (N + K - 1) // K で表せます。参考解は浮動小数点数に変換せず、この式を使います。N = 0 なら分子 K - 1 を K で割って 0、割り切れるなら商そのもの、それ以外なら商より 1 大きい結果です。4 個のテストで余りあり、割り切れる場合、品物なし、大きな整数を確認します。演算数は一定で、時間と追加領域は O(1) です。",
          "objectives": [
            "入力を行単位で読み、文字列と整数を区別する。",
            "split・int・代入を理解してから map の省略形を使う。",
            "整数除算と余りでモデル化し、0 と割り切れる境界を扱う。"
          ],
          "checkpoints": [
            {
              "question": "input() で 12 を読むと整数になりますか。",
              "answer": "文字列 \"12\" です。int(input()) で整数 12 に変換します。"
            },
            {
              "question": "N=12、K=4 で N//K+1 が誤るのはなぜですか。",
              "answer": "3 箱でちょうど収まり、4 箱目は不要だからです。余りがあるときだけ 1 を加えます。"
            }
          ]
        }
      },
      "starter": "n, k = map(int, input().split())\n# TODO\n",
      "solution": "n, k = map(int, input().split())\nprint((n + k - 1) // k)\n",
      "tests": [
        {
          "input": "7 3\n",
          "expected": "3\n"
        },
        {
          "input": "12 4\n",
          "expected": "3\n"
        },
        {
          "input": "0 9\n",
          "expected": "0\n"
        },
        {
          "input": "1000000000 3\n",
          "expected": "333333334\n"
        }
      ]
    },
    {
      "id": "conditions",
      "order": 3,
      "stage": "start",
      "minutes": 45,
      "prerequisiteIds": [
        "input-and-numbers"
      ],
      "relatedProblems": [
        "ABC086A",
        "APG4bPython EX6"
      ],
      "content": {
        "zh": {
          "title": "条件分支",
          "summary": "把规则写成明确且互不遗漏的情况。",
          "sections": [
            {
              "title": "比较产生真或假",
              "body": "同一程序有时要根据输入选择不同处理。例如分数达到 60 就输出 Pass，否则输出 Fail。这里先进行比较，再决定执行哪段代码。比较的结果是布尔值 True 或 False，不是文字 \"True\"，也不是一个新的输入。表达式 score >= 60 就能表示“分数至少为60”。判断需要的边界应来自题目，不应凭经验把“至少”写成“大于”。\n\n常用比较符有 ==、!=、<、<=、>、>=。= 负责赋值，== 才比较是否相等。中文里的“超过”对应 >，“不少于”对应 >=，“不等于”对应 !=。把自然语言中的数量关系翻成比较符时，特别留意是否包含相等情况。整数恰好落在阈值上，是最值得测试的数据之一。\n\n下面先直接打印比较结果，观察 60 >= 60 为 True，而 60 > 60 为 False。这里输出 True/False 只是用于学习条件；实际题目若要求 Pass/Fail，就应在分支中输出指定文字，不能把布尔值当成答案格式。",
              "code": "score = 60\nprint(score >= 60)\nprint(score > 60)\nprint(score == 60)\nprint(score != 60)\n",
              "output": "True\nFalse\nTrue\nFalse\n"
            },
            {
              "title": "缩进规定分支的范围",
              "body": "if 后面写条件与冒号，下一行用缩进表示属于这个条件的处理。课程统一采用四个空格。else 后没有条件，它处理 if 不成立的情况，也需要冒号。if 与 else 应处于相同缩进层级，而各自的内部语句再向右缩进。缩进不是装饰，它决定哪些语句会一起执行。\n\n观察下面例子。输入 59 时，只会输出 Fail，接着输出 Done；输入 60 时则输出 Pass，再输出 Done。最后的 print(\"Done\") 没有缩进，表示它位于整个分支之后，因此两种情况都会执行。若把它缩进到 else 内，就只有不及格时才会输出，这改变了程序含义。\n\n编写分支时可以先画出“条件真”和“条件假”两条路径，写出每条路径应有的动作，再对应到代码块。一个代码块可以有多行，而不只是一个 print。不要通过随意增减空格来消除报错；应先想清楚这行应属于哪个分支，再调整缩进。",
              "code": "score = int(input())\nif score >= 60:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")\nprint(\"Done\")\n",
              "output": "Fail\nDone\n",
              "exampleInput": "59\n"
            },
            {
              "title": "多类情况与判断顺序",
              "body": "三类以上的情况可以用 elif，意思是“否则，如果”。Python 从上到下检查条件；找到第一个为真的条件后，只执行它的代码块，并跳过后面的 elif 和 else。因此判断顺序是算法的一部分，不能随意交换。若条件有包含关系，通常应把更具体的情况放前面，或者把范围分成真正不重叠的区间。\n\n例如 90 分以上为 A，60 到 89 分为 B，其余为 C。先写 score >= 90，接着写 score >= 60 就足够了。第二个条件看起来也包含 90，但执行到这里时已经知道第一个条件失败，即 score < 90，因此范围自动缩小为 60 到 89。程序路径携带着前面判断得到的信息。\n\n输入 75 时，第一项 False，第二项 True，输出 B，后面不再检查。若先判断 >= 60，输入 95 会直接被分成 B，A 就永远无法到达。用阈值前一个、阈值本身、阈值后一个的数据检查，比只选随机中间值更容易发现这种顺序错误。",
              "code": "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 60:\n    print(\"B\")\nelse:\n    print(\"C\")\n",
              "output": "B\n",
              "exampleInput": "75\n"
            },
            {
              "title": "组合条件，避免省略比较",
              "body": "and 表示两个条件都成立，or 表示至少一个成立，not 反转一个真伪结果。例如 x % 2 == 0 and x % 3 == 0，先分别判断是否能被 2、3 整除，再要求两者同时为真。为了阅读清楚，可以给每个完整比较加括号。初学时不要过度依赖运算符优先级，把逻辑边界写出来更容易核对。\n\n一个常见错误是想表示“x 等于 1 或 2”却写成 x == 1 or 2。右边的 2 不是“x 等于2”，而是一个独立的非零整数，在条件位置会被视为真，导致整个条件总成立。应写 x == 1 or x == 2。自然语言能够省略主语，程序中的两个比较却要分别写完整。\n\n条件也可以先保存到变量，例如 divisible_by_two = n % 2 == 0。这样能把复杂规则拆成可命名的小判断。下面程序针对输入 6，分别得到 True、True，合并后仍为 True。真实分类时，可以使用这些布尔变量，也可以直接写表达式；选择你能够清楚解释的形式。",
              "code": "n = int(input())\ndivisible_by_two = n % 2 == 0\ndivisible_by_three = n % 3 == 0\nprint(divisible_by_two)\nprint(divisible_by_three)\nprint(divisible_by_two and divisible_by_three)\n",
              "output": "True\nTrue\nTrue\n",
              "exampleInput": "6\n"
            },
            {
              "title": "一个分支链，还是多个独立判断",
              "body": "一组 if / elif 与多个 if 解决的问题不同。若题目要求从多种类别中输出唯一标签，应使用分支链。若题目要求列出所有满足的特征，就可能需要多个独立 if。例如一个数既是偶数又能被 3 整除，这两个事实可以同时成立；但练习要求在此时输出 Both，而不是分别输出 Two、Three。\n\n下面例子故意使用独立 if，输入 6 会输出两行。它不是语法错误，也不是 Python 重复执行了同一行，而是两个条件分别成立，各自触发自己的 print。把第二个 if 改为 elif 后，输出就只剩第一行。修改前应先判断题目到底需要一个类别还是多个特征，不要认为某一种写法永远正确。\n\n另一个常见误区是以为 else 会对应整个上方所有 if。实际上 else 只属于与它构成同一语法结构、同一层级的那个 if 链。多段独立判断混写时，很容易让 else 接到意料之外的位置。保持结构简单，必要时使用完整分支链并检查每条路径的输出次数。",
              "code": "n = int(input())\nif n % 2 == 0:\n    print(\"Two\")\nif n % 3 == 0:\n    print(\"Three\")\n",
              "output": "Two\nThree\n",
              "exampleInput": "6\n"
            },
            {
              "title": "用决策表检查分类是否完整",
              "body": "把练习拆成两个是非问题：能否被 2 整除，能否被 3 整除。两个条件各有真、假，因此共有四种组合。两者真对应 Both，只有第一个真对应 Two，只有第二个真对应 Three，两者假对应 Neither。先列出这四格，再写代码，可以清楚地看到是否漏掉情况。\n\n实现时，Both 必须优先于更宽泛的单项条件。后续 elif 利用前面已经失败的信息，因此无需在 Two 分支里再次写“不能被3整除”。最后的 else 代表所有未被前面覆盖的输入，不是“发生错误”才执行。对题目约束内的任何正整数，四类中应恰好有一类成立。\n\n为每一格选择最小或简单代表：6、2、3、1。再考虑较大的倍数和接近上界的数，检查代码是否依赖某几个写死数字。若结果标签正确但多输出了一行，应回头检查是否用了独立 if。若 6 被判成 Two，应检查顺序。将具体失败现象与逻辑结构对应，比不停替换比较符更有效。"
            }
          ],
          "exerciseTitle": "整数分类",
          "task": "给定整数 N。若 N 同时能被 2 和 3 整除，输出 Both；否则若能被 2 整除，输出 Two；否则若能被 3 整除，输出 Three；其余情况输出 Neither。1 ≤ N ≤ 10⁹。",
          "input": "一个整数 N。",
          "output": "输出 Both、Two、Three、Neither 中的一个，大小写必须一致。",
          "hint": "先检查同时满足的情况，再检查单独满足的情况。",
          "explanation": "练习规则按优先级划分四类。先判断 n % 2 == 0 and n % 3 == 0，覆盖 6 的倍数；未进入该分支时，才依次判断单独能被 2 整除、单独能被 3 整除，最后用 else 接收两者都不满足的整数。必须使用同一组 if / elif / else，保证只输出一次。测试 6、8、9、1 分别到达四个分支，因此既检查顺序，也检查是否遗漏分类。所有比较与取余的次数固定，时间和额外空间 O(1)。题目要求特定英文大小写，输出中不添加解释。",
          "objectives": [
            "将文字规则转成布尔条件和互斥分支。",
            "追踪 if / elif / else 的执行路径，正确处理相等边界。",
            "用 and、or 与余数表达分类，并为每个分支设计测试。"
          ],
          "checkpoints": [
            {
              "question": "多个独立 if 和一组 if / elif 有何区别？",
              "answer": "独立 if 会逐个判断，可能执行多段；if / elif 只执行第一段成立的分支。"
            },
            {
              "question": "若先判断“能被2整除”，输入6会怎样？",
              "answer": "会进入 Two 分支而跳过后面 Both，所以应先判断最具体的“同时整除”。"
            }
          ]
        },
        "en": {
          "title": "Conditional branches",
          "summary": "Turn a rule into complete, unambiguous cases.",
          "sections": [
            {
              "title": "Comparisons produce truth values",
              "body": "A program sometimes needs to choose an action based on its input. For example, a score of at least 60 may require Pass, while a lower score requires Fail. First evaluate a comparison; then choose which code runs. A comparison produces the Boolean value True or False, not the text \"True\" and not another input value. score >= 60 expresses “at least sixty.”\n\nThe operators are ==, !=, <, <=, >, and >=. Remember that = assigns a value while == compares values. Translate phrases carefully: “exceeds” means >, whereas “no less than” includes equality and means >=. The example prints comparison results for learning purposes. A real task asking for Pass or Fail still needs those exact words, not a printed Boolean.",
              "code": "score = 60\nprint(score >= 60)\nprint(score > 60)\nprint(score == 60)\nprint(score != 60)\n",
              "output": "True\nFalse\nTrue\nFalse\n"
            },
            {
              "title": "Indentation defines a branch",
              "body": "An if statement contains a condition followed by a colon. Its body is indented; this course uses four spaces per level. else has no condition because it covers the case in which the if condition is false. It also needs a colon. Align if and else, then indent each body one level deeper. Indentation defines execution, not just appearance.\n\nIn the example, input 59 prints Fail and then Done; input 60 prints Pass and then Done. The final print is outside both bodies, so it always runs. Indenting it inside else would change the behavior. Before coding, sketch the true and false paths and list their actions. A branch can contain several statements. When repairing indentation, decide which block a statement belongs to instead of adding spaces until the error disappears.",
              "code": "score = int(input())\nif score >= 60:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")\nprint(\"Done\")\n",
              "output": "Fail\nDone\n",
              "exampleInput": "59\n"
            },
            {
              "title": "Multiple cases and their order",
              "body": "Use elif, meaning “otherwise, if,” for three or more cases. Python checks conditions from top to bottom. Once one is true, it executes that body and skips all later alternatives in the chain. Consequently, ordering is part of the algorithm. Put a more specific case before a broader overlapping case, or divide the possibilities into disjoint ranges.\n\nFor grades A at 90 or above, B from 60 to 89, and C below 60, test >= 90 before >= 60. Reaching the second test already implies that the first failed, so the upper boundary is implicit. With input 75, the first condition is false and the second true. If >= 60 came first, 95 would incorrectly become B. Test immediately below, at, and above every boundary.",
              "code": "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 60:\n    print(\"B\")\nelse:\n    print(\"C\")\n",
              "output": "B\n",
              "exampleInput": "75\n"
            },
            {
              "title": "Combine complete conditions",
              "body": "and requires both conditions, or requires at least one, and not reverses a truth value. In x % 2 == 0 and x % 3 == 0, each comparison checks divisibility and and combines the results. Parentheses around complete comparisons can make the intended grouping easier to read.\n\nA frequent mistake is writing x == 1 or 2 for “x equals one or two.” The 2 is a separate nonzero integer, treated as true in a condition; it does not mean x == 2. Write both comparisons explicitly: x == 1 or x == 2. Natural language can omit repeated words, but the program cannot infer them. You may also store comparison results in descriptive Boolean variables. This separates a complicated decision into named questions that can be traced independently.",
              "code": "n = int(input())\ndivisible_by_two = n % 2 == 0\ndivisible_by_three = n % 3 == 0\nprint(divisible_by_two)\nprint(divisible_by_three)\nprint(divisible_by_two and divisible_by_three)\n",
              "output": "True\nTrue\nTrue\n",
              "exampleInput": "6\n"
            },
            {
              "title": "One chain or independent decisions",
              "body": "An if / elif chain and several independent if statements solve different tasks. Use a chain when the specification requires exactly one category. Independent tests may be appropriate when you must report every property that holds. A number can be even and divisible by three at the same time, but this exercise requests Both rather than two separate output lines.\n\nThe example intentionally uses independent tests, so input 6 prints two lines. Python is not repeating a statement; two different true conditions activate two different bodies. Changing the second if to elif would leave only the first output. Neither structure is universally correct: choose according to the required behavior. Also remember that an else belongs to its own syntactic if chain, not automatically to every if written above it. Trace output counts on each path.",
              "code": "n = int(input())\nif n % 2 == 0:\n    print(\"Two\")\nif n % 3 == 0:\n    print(\"Three\")\n",
              "output": "Two\nThree\n",
              "exampleInput": "6\n"
            },
            {
              "title": "Verify the decision table",
              "body": "Split the exercise into two yes-or-no questions: divisible by two, and divisible by three. Two Booleans give four combinations. Both true means Both; only the first true means Two; only the second true means Three; neither true means Neither. Writing this table before coding exposes missing categories.\n\nThe combined case must precede the broader individual conditions. Later elif branches inherit information from earlier failures, so the Two branch does not need to repeat “not divisible by three.” The final else represents valid inputs not covered earlier, not merely an error situation. Test a simple representative of each combination, such as 6, 2, 3, and 1. If output has extra lines, inspect independent if statements; if 6 becomes Two, inspect order. Tie each observed failure to a specific structural explanation."
            }
          ],
          "exerciseTitle": "Classify an integer",
          "task": "Given N, print Both if it is divisible by both 2 and 3. Otherwise print Two if divisible by 2, Three if divisible by 3, and Neither otherwise. 1 ≤ N ≤ 10⁹.",
          "input": "One integer N.",
          "output": "Print one of Both, Two, Three, or Neither, with the exact capitalization.",
          "hint": "Check the combined case before either individual case.",
          "explanation": "The specification defines four categories with a priority order. First test n % 2 == 0 and n % 3 == 0, covering multiples of six. Only if that fails should the program test divisibility by two, then divisibility by three, and finally use else for neither. One if / elif / else chain guarantees a single output. Inputs 6, 8, 9, and 1 reach the four different branches, checking both order and coverage. The number of arithmetic operations and comparisons is fixed, so time and extra space are O(1). Preserve the required capitalization and print no explanatory text.",
          "objectives": [
            "Translate verbal rules into Boolean conditions and exclusive branches.",
            "Trace if / elif / else and handle equality boundaries correctly.",
            "Combine conditions with and, or, and remainders, then test every branch."
          ],
          "checkpoints": [
            {
              "question": "How do separate if statements differ from an if / elif chain?",
              "answer": "Separate statements all perform their checks and may execute several bodies. A chain executes only its first matching branch."
            },
            {
              "question": "What goes wrong if divisibility by 2 is checked first for 6?",
              "answer": "It selects Two before reaching Both. Check the more specific combined condition first."
            }
          ]
        },
        "ja": {
          "title": "条件分岐",
          "summary": "規則を、漏れのない場合分けで表す。",
          "sections": [
            {
              "title": "比較の結果は真偽値になる",
              "body": "入力によって処理を選ぶ場合があります。例えば得点が 60 以上なら Pass、それ未満なら Fail と表示するなら、先に比較をしてから処理を決めます。比較結果は True または False という真偽値で、文字列 \"True\" や追加の入力ではありません。score >= 60 は「60 以上」を表します。「以上」を「より大きい」と取り違えないよう、境界は問題文に従って決めます。\n\n比較演算子には ==、!=、<、<=、>、>= があります。= は代入、== は等しいかの比較です。「超える」は >、「少なくとも」は >=、「異なる」は != です。自然言語を記号へ直すときは、等しい場合を含むか確認します。閾値とちょうど同じ整数は重要なテスト入力です。\n\n例では比較結果を直接表示します。60 >= 60 は True、60 > 60 は False になります。ここで真偽値を出すのは条件を学ぶためです。実際の問題が Pass/Fail を要求するなら、分岐でその文字を出す必要があり、True/False をそのまま答えにはできません。",
              "code": "score = 60\nprint(score >= 60)\nprint(score > 60)\nprint(score == 60)\nprint(score != 60)\n",
              "output": "True\nFalse\nTrue\nFalse\n"
            },
            {
              "title": "インデントで分岐の範囲を決める",
              "body": "if の後に条件とコロンを書き、次の行を下げて条件成立時の処理を示します。このコースでは 1 段を空白 4 個に統一します。else は if が偽のときを扱うので条件を書きませんが、コロンは必要です。if と else の位置をそろえ、それぞれの処理を 1 段下げます。インデントは見た目の飾りではなく、実行範囲を決めます。\n\n例で 59 を入力すると Fail、続いて Done が出ます。60 なら Pass、続いて Done です。最後の print(\"Done\") は下がっていないので分岐全体の後にあり、どちらでも実行されます。これを else の中へ下げると、不合格時だけ出す意味に変わります。\n\nまず条件が真の経路と偽の経路を描き、それぞれに必要な処理を並べます。その後でコードのブロックに対応させます。ブロックには複数の文を書けます。エラーを消すために無作為に空白を増減するのではなく、その文がどの経路に属するべきかを決めてから位置を直してください。",
              "code": "score = int(input())\nif score >= 60:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")\nprint(\"Done\")\n",
              "output": "Fail\nDone\n",
              "exampleInput": "59\n"
            },
            {
              "title": "複数の場合と判定順序",
              "body": "3 種類以上の場合には elif、つまり「そうでなく、もし」を使います。Python は上から条件を調べ、最初に真になったブロックだけを実行し、残りの elif と else を飛ばします。したがって条件の順番もアルゴリズムの一部です。条件が包含関係なら具体的な場合を先にするか、重ならない範囲に分けます。\n\n90 点以上を A、60～89 点を B、それ未満を C とするなら、先に score >= 90、次に score >= 60 と書けます。2 個目も単独では 90 を含みますが、そこへ来る時点で最初が偽、つまり score < 90 と分かっています。経路には前の判定で得た情報が含まれています。\n\n75 なら最初が False、次が True となり B を出し、その後は判定しません。>= 60 を先にすると 95 も B になり、A に届きません。閾値の直前・一致・直後を試すと、この種の順序の誤りを見つけやすくなります。途中の値だけを無作為に選ぶより、条件の境目を意識して検証します。",
              "code": "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 60:\n    print(\"B\")\nelse:\n    print(\"C\")\n",
              "output": "B\n",
              "exampleInput": "75\n"
            },
            {
              "title": "比較を省略せず組み合わせる",
              "body": "and は両条件が真、or は少なくとも一方が真、not は真偽の反転を表します。x % 2 == 0 and x % 3 == 0 は、2 で割り切れるか、3 で割り切れるかをそれぞれ調べ、結果を組み合わせます。各比較を括弧で囲むとまとまりを読み取りやすくなります。初めは優先順位に頼り過ぎず、論理の区切りを明示して構いません。\n\n「x が 1 または 2」として x == 1 or 2 と書くのは誤りです。右の 2 は x == 2 の省略ではなく、独立した非ゼロ整数です。条件では真と扱われるので全体が常に真になります。x == 1 or x == 2 と両方の比較を書きます。文章では主語を省略できても、コードは比較を補完してくれません。\n\n判定を divisible_by_two = n % 2 == 0 のように変数へ保存することもできます。複雑な規則を名前の付いた小さな問いに分解できます。例の入力 6 では各変数が True となり、and でも True です。直接式を書く形でも、途中の真偽値を保存する形でも、説明しやすいものを選びます。",
              "code": "n = int(input())\ndivisible_by_two = n % 2 == 0\ndivisible_by_three = n % 3 == 0\nprint(divisible_by_two)\nprint(divisible_by_three)\nprint(divisible_by_two and divisible_by_three)\n",
              "output": "True\nTrue\nTrue\n",
              "exampleInput": "6\n"
            },
            {
              "title": "分岐の連鎖か、独立した判定か",
              "body": "if / elif の連鎖と、独立した複数の if は用途が違います。複数の分類から唯一のラベルを選ぶなら連鎖を使います。一方、成立する特徴をすべて列挙するなら、独立した判定が必要な場合があります。偶数であり 3 の倍数でもある整数は存在しますが、演習の要求は Two と Three の 2 行ではなく Both です。\n\n例は意図的に独立した if を使うため、6 で 2 行を出します。これは構文エラーでも同じ文の重複実行でもなく、別々の条件がそれぞれ真になった結果です。2 個目を elif にすると最初の出力だけになります。変更する前に、1 分類が必要なのか、複数の特徴を出すのかを確認します。どちらかが常に正しいわけではありません。\n\nelse が上にあるすべての if をまとめて受けると考えるのも誤りです。else は同じ構文と階層の if の連鎖にだけ対応します。独立した判定を混在させると、意図しない if に else が結び付くことがあります。構造を単純に保ち、経路ごとの出力回数も追跡してください。",
              "code": "n = int(input())\nif n % 2 == 0:\n    print(\"Two\")\nif n % 3 == 0:\n    print(\"Three\")\n",
              "output": "Two\nThree\n",
              "exampleInput": "6\n"
            },
            {
              "title": "判定表で漏れを確認する",
              "body": "演習を 2 つの質問に分けます。2 で割り切れるか、3 で割り切れるかです。それぞれ真と偽があるので、組合せは 4 通りです。両方真なら Both、最初だけ真なら Two、次だけ真なら Three、両方偽なら Neither です。先にこの 4 マスを作れば、場合の漏れが見えます。\n\n実装では Both を単独の条件より前に置きます。後の elif は前の条件が偽だった情報を利用するので、Two の分岐で「3 では割り切れない」と繰り返す必要はありません。最後の else は前までに分類されなかった正しい入力を受けるもので、異常時専用ではありません。制約内の正整数は 4 種類のうち必ず 1 つに属します。\n\n各マスの簡単な代表として 6・2・3・1 を選びます。さらに大きな倍数などで、特定の数を直接書き込んでいないか確認できます。余計な行が出れば独立 if の使用、6 が Two なら順序を調べます。具体的な失敗とコードの構造を結び付けると、比較記号を無作為に変えるより原因へ近づけます。"
            }
          ],
          "exerciseTitle": "整数の分類",
          "task": "整数 N が与えられます。2 と 3 の両方で割り切れるなら Both、そうでなく 2 で割り切れるなら Two、そうでなく 3 で割り切れるなら Three、それ以外なら Neither を出力してください。1 ≤ N ≤ 10⁹ です。",
          "input": "整数 N が 1 個与えられます。",
          "output": "Both、Two、Three、Neither のいずれかを、大文字と小文字を区別して出力してください。",
          "hint": "両方の条件を満たす場合を、片方だけの場合より先に判定します。",
          "explanation": "条件には優先順位があります。最初に n % 2 == 0 and n % 3 == 0 を調べ、6 の倍数を分類します。それが偽の場合だけ 2 の倍数、次に 3 の倍数を調べ、残りを else にします。1 組の if / elif / else にすることで出力は必ず 1 回です。6・8・9・1 はそれぞれ異なる分岐を通り、順序と漏れを確認します。演算と比較の回数は一定で、時間と追加領域は O(1) です。指定された英語の大文字・小文字を保ち、説明文を出力しません。",
          "objectives": [
            "文章の規則を真偽条件と重複しない分岐に変える。",
            "if / elif / else の経路を追い、等号を含む境界を扱う。",
            "and・or・余りで分類し、各分岐を確認する入力を作る。"
          ],
          "checkpoints": [
            {
              "question": "独立した if と if / elif の違いは何ですか。",
              "answer": "独立した if はすべて判定され、複数の処理が動く場合があります。連鎖は最初に成立した分岐だけを実行します。"
            },
            {
              "question": "6 に対して最初に 2 の倍数を判定するとどうなりますか。",
              "answer": "Both より先に Two が選ばれます。より具体的な両方の条件を先に確認します。"
            }
          ]
        }
      },
      "starter": "n = int(input())\n# TODO\n",
      "solution": "n = int(input())\nif n % 2 == 0 and n % 3 == 0:\n    print(\"Both\")\nelif n % 2 == 0:\n    print(\"Two\")\nelif n % 3 == 0:\n    print(\"Three\")\nelse:\n    print(\"Neither\")\n",
      "tests": [
        {
          "input": "6\n",
          "expected": "Both\n"
        },
        {
          "input": "8\n",
          "expected": "Two\n"
        },
        {
          "input": "9\n",
          "expected": "Three\n"
        },
        {
          "input": "1\n",
          "expected": "Neither\n"
        }
      ]
    },
    {
      "id": "loops",
      "order": 4,
      "stage": "start",
      "minutes": 50,
      "prerequisiteIds": [
        "conditions"
      ],
      "relatedProblems": [
        "ABC281A",
        "ABC083B"
      ],
      "content": {
        "zh": {
          "title": "循环与累积",
          "summary": "逐项处理数据，并维护一个答案。",
          "sections": [
            {
              "title": "用范围描述重复，而不是复制代码",
              "body": "如果需要输出1到5，复制五条 print 尚可；若上界来自输入，复制就无法解决一般问题。for 循环把“对每个候选执行同一动作”写成一个结构。for i in range(1, 6) 每轮给 i 一个新整数，再执行缩进的代码块。这里 i 是当前候选，不是循环次数的总和。\n\nrange(stop) 从0到 stop-1；range(start, stop) 从 start 到 stop-1；第三个参数可以指定步长。右端总是不包含在内。range(2, 9, 2) 依次产生2、4、6、8。范围为空时，循环体一次也不执行，这通常是合法情况，不是运行错误。\n\n先在纸上列出范围实际产生的值，再预测输出。下面输入4产生1、2、3、4。n+1 的用途只是让 n 被包含，并不意味着循环额外处理一个 n+1。把上界的“包含或不包含”翻译正确，是循环入门中最重要的边界习惯。",
              "code": "n = int(input())\nfor i in range(1, n + 1):\n    print(i)\n",
              "output": "1\n2\n3\n4\n",
              "exampleInput": "4\n"
            },
            {
              "title": "累积变量有明确含义",
              "body": "求和不是让每轮输出一个新答案，而是把每轮贡献加到已有答案中。total=0 放在循环前，表示还没有处理任何数。total = total + i 先读取旧 total，再加入当前 i。简写 total += i 表达相同的更新。初始值、更新位置和最后输出的位置三者都要明确。\n\n求1到4的和时，开始 total=0，处理1后为1，处理2后为3，处理3后为6，处理4后为10。每轮结束时，total 都是“到当前数为止的和”。这个始终保持的解释叫循环不变量。初学时不用背术语，但应能用一句话解释变量在每轮后的含义。\n\n下面额外输出 i 和 total，展示追踪表，最后才打印总和。这些中间行仅供学习；正式提交若只要求总和，应删掉循环内的调试 print。若 total=0 错放到循环内部，前面的和会被反复抹掉，最后只留下末项。",
              "code": "total = 0\nfor i in range(1, 5):\n    total += i\n    print(i, total)\nprint(total)\n",
              "output": "1 1\n2 3\n3 6\n4 10\n10\n"
            },
            {
              "title": "while 必须让状态接近结束",
              "body": "while 在每轮开始前检查条件，条件为真才执行本体，再回到条件处重新检查。它适合不知道准确次数、但知道何时应结束的问题。例如把一个正整数反复整除2，直到不大于1。x>1 是继续条件，x//=2 让状态逐步减小，steps+=1 记录执行次数。\n\n输入20时，x 的变化为20→10→5→2→1，一共四次。循环退出时仍可访问 x 和 steps，分别为1与4。输入1时，第一次条件就不成立，循环体不执行，steps 保持0。因此初始化不能放在循环内部，否则零轮的情况可能没有定义答案。\n\n如果忘记更新 x，条件会一直为真，形成无限循环。遇到运行超时，应先问“这一轮之后哪个量发生变化，是否保证接近终点”。不要只把时间限制调大。while 也不是比 for 更高级，两者应按状态变化方式选择；已知枚举范围时，for 通常更容易检查。",
              "code": "x = int(input())\nsteps = 0\nwhile x > 1:\n    x //= 2\n    steps += 1\nprint(x, steps)\n",
              "output": "1 4\n",
              "exampleInput": "20\n"
            },
            {
              "title": "把筛选条件放进循环",
              "body": "枚举与筛选可以分开理解：for 决定哪些数会被检查，if 决定当前数是否贡献答案。求偶数和时，先遍历完整的1到N，再用 i%2==0 过滤。这样每个候选都明确经过一次判断，正确性容易说明。不要把“是否是偶数”错误写成只判断输入 N，循环中应检查当前候选 i。\n\n计数与求和使用不同更新。统计偶数有几个，应 count+=1；计算偶数之和，应 total+=i。两者初始都为0，但变量含义不同。下面同时维护这两个结果，输入7得到3个偶数、总和12。跟踪2、4、6各轮，可以看到计数每次只加一，而总和加入当前值。\n\n外层是 for，内层是 if，因此累加语句需要两级缩进。若把 total+=i 退回到与 if 同级，所有数都会被累加。缩进层级可以当作逻辑层级来读：对于每个 i，如果它是偶数，那么更新两个累计值。",
              "code": "n = int(input())\ncount = 0\ntotal = 0\nfor i in range(1, n + 1):\n    if i % 2 == 0:\n        count += 1\n        total += i\nprint(count, total)\n",
              "output": "3 12\n",
              "exampleInput": "7\n"
            },
            {
              "title": "提前结束和跳过当前轮",
              "body": "break 立即结束它所在的循环，程序继续执行循环之后的语句。它适合已经找到所需结果、无需再搜索的情况。continue 则只跳过当前轮剩余语句，继续下一轮。二者影响范围不同，不能当作同义词。刚学习循环时，简单的 if 往往更清楚；仅在它们能让流程更直接时使用。\n\n例如寻找1到N中第一个能被7整除的数，找到7后即可 break；若题目要统计所有符合条件的数，break 就会漏掉14、21等后续候选。是否能够提前停止，必须从题意推导，而不是因为已经看到了一个成功样例。\n\ncontinue 与 while 组合时尤其要注意：若状态更新写在 continue 后面，这一轮会跳过更新，可能导致永不前进。修正方法是把所有路径都必须执行的更新放在可靠的位置，或改成更直接的条件结构。阅读循环时逐条跟踪“下一步去哪里”，比单独理解某个关键字更重要。",
              "code": "for i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    if i > 5:\n        break\n    print(i)\n",
              "output": "1\n3\n5\n"
            },
            {
              "title": "从题意写出循环，并验证小输入",
              "body": "本练习可以用四句话描述：候选是1到N；符合条件的是偶数；每个符合条件的候选贡献它自己的值；所有贡献相加后输出。四句话分别对应 range、if、total+=i 和最后的 print。先写这种不依赖语法的算法说明，再逐项转换成代码，能减少不知道从哪一行开始的困惑。\n\n测试从最小输入开始。N=1 时没有偶数，答案应为0，检查初始化是否正确。N=2 时答案为2，检查右端是否遗漏。N=7 时只加2、4、6，检查筛选和累计。最后用较大N观察程序能否及时结束；本题上限10000，逐个检查完全够用。\n\n还可以手算循环次数：从1到N共N轮，每轮只是一次取余、判断和可能的加法，因此时间随N线性增长。此时无需强行套公式。先保证你能够解释范围、状态、更新和结束四件事，再学习把线性方法优化为常数时间。"
            }
          ],
          "exerciseTitle": "偶数之和",
          "task": "给定 N，求 1 到 N（含两端）中所有偶数的和。1 ≤ N ≤ 10000。请先用循环实现。",
          "input": "一个整数 N。",
          "output": "输出偶数之和。",
          "hint": "把答案初始化为 0，遍历 range(1, n + 1)，仅在 i % 2 == 0 时加入答案。",
          "explanation": "先定义 total 为“已经检查过的整数中，偶数的和”，初始没有检查任何数，所以为 0。for 遍历 1 到 n，必须使用 range(1, n + 1) 包含右端。每轮仅在 i % 2 == 0 时累加 i，奇数不改变状态。循环结束，所有候选都已检查，total 就符合题意。N=1 时不会发生累加而输出0；N=2 检查右端是否包含；奇数上界检查是否误加；最大输入检查总和。循环 N 次，时间 O(N)，额外空间 O(1)。虽然可以推导公式，本课先练习循环与不变量。",
          "objectives": [
            "区分固定范围的 for 与按条件继续的 while。",
            "初始化并更新累积状态，逐轮解释变量变化。",
            "从枚举范围和筛选条件写出循环，检查结束条件与端点。"
          ],
          "checkpoints": [
            {
              "question": "range(1, n) 为什么不适合求1到n的和？",
              "answer": "右端 n 不包含在内，应使用 range(1, n + 1)。"
            },
            {
              "question": "为什么 total=0 要写在循环外？",
              "answer": "它表示开始时尚未累计；写在循环内会每轮清空前面得到的结果。"
            }
          ]
        },
        "en": {
          "title": "Loops and accumulation",
          "summary": "Process values one by one while maintaining an answer.",
          "sections": [
            {
              "title": "Describe repetition with a range",
              "body": "Copying five print statements can display one through five, but copying cannot handle an upper bound supplied as input. A for loop expresses one action repeated for each candidate. In for i in range(1, 6), i receives a new integer each iteration, then the indented body runs. i is the current candidate, not an accumulated count.\n\nrange(stop) starts at zero; range(start, stop) starts at start. Both exclude stop. A third argument sets the step, so range(2, 9, 2) yields 2, 4, 6, 8. An empty range executes nothing. List the generated values before tracing the body. For input four, range(1, n + 1) includes four but never processes five. Correct endpoint translation prevents off-by-one errors.",
              "code": "n = int(input())\nfor i in range(1, n + 1):\n    print(i)\n",
              "output": "1\n2\n3\n4\n",
              "exampleInput": "4\n"
            },
            {
              "title": "Give an accumulator a precise meaning",
              "body": "Accumulation adds each new contribution to an existing answer. Place total = 0 before the loop to represent processing no values yet. total = total + i reads the old total before adding i; total += i is shorthand. Decide separately where initialization, updating, and final output belong.\n\nFor one through four, the totals are initially zero, then one, three, six, and ten. After each iteration, total means the sum of all values processed so far. This persistent meaning is called a loop invariant. The example prints a trace table for learning, then the final sum. Remove trace output when a problem requests only the answer. Reinitializing total inside the body erases previous contributions and leaves only the latest value.",
              "code": "total = 0\nfor i in range(1, 5):\n    total += i\n    print(i, total)\nprint(total)\n",
              "output": "1 1\n2 3\n3 6\n4 10\n10\n"
            },
            {
              "title": "A while loop must make progress",
              "body": "while checks its condition before every iteration. If true, it runs the body and checks again. Use it when you know the stopping condition more naturally than the number of repetitions. Repeatedly halving an integer until it is at most one is an example: x > 1 controls continuation, x //= 2 reduces the state, and steps += 1 counts work.\n\nStarting from twenty gives 20, 10, 5, 2, 1, requiring four iterations. Starting from one executes none, so initialize steps before the loop. Forgetting to update x creates an infinite loop. When a run times out, ask which quantity changes and why it approaches termination. while is not more advanced than for; choose the structure that makes the intended progress easiest to verify.",
              "code": "x = int(input())\nsteps = 0\nwhile x > 1:\n    x //= 2\n    steps += 1\nprint(x, steps)\n",
              "output": "1 4\n",
              "exampleInput": "20\n"
            },
            {
              "title": "Filter inside a traversal",
              "body": "Enumeration and filtering are separate ideas. for decides which values are inspected; if decides whether the current value contributes. For an even-number sum, inspect every integer from one through N and filter with i % 2 == 0. Test the current candidate i, not merely the original input N.\n\nCounting and summing use different updates: count += 1 records one qualifying item, while total += i adds its value. Both start at zero but represent different quantities. The example maintains both and returns three even numbers with sum twelve for input seven. The update statements need two indentation levels because they belong inside both for and if. Moving total += i out of the if would add every integer instead of just even ones.",
              "code": "n = int(input())\ncount = 0\ntotal = 0\nfor i in range(1, n + 1):\n    if i % 2 == 0:\n        count += 1\n        total += i\nprint(count, total)\n",
              "output": "3 12\n",
              "exampleInput": "7\n"
            },
            {
              "title": "Stop or skip deliberately",
              "body": "break ends its enclosing loop immediately, then execution continues after that loop. continue skips only the remaining statements of the current iteration and proceeds to the next one. They are not interchangeable. Use either only when it makes the intended flow clearer than an ordinary conditional.\n\nIf searching for the first multiple of seven, finding seven may justify break. If counting all multiples, it would incorrectly omit fourteen and later candidates. Early stopping needs a reason from the problem, not just a passing example. Be careful with continue inside while: if the state update lies after continue, that path skips the update and may never make progress. Trace where control goes next on every branch, including paths that skip work.",
              "code": "for i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    if i > 5:\n        break\n    print(i)\n",
              "output": "1\n3\n5\n"
            },
            {
              "title": "Build and test a loop from the task",
              "body": "Describe the exercise in four sentences: candidates are one through N; qualifying candidates are even; each qualifying candidate contributes its own value; print the sum of contributions. These map to range, if, total += i, and the final print. Writing this language-independent plan first removes uncertainty about where to begin coding.\n\nTest N = 1 for an empty answer set, N = 2 for the included right endpoint, and N = 7 for filtering and accumulation. A larger value checks that execution ends promptly. With at most ten thousand candidates, inspecting each one is adequate. There are N iterations with a small fixed amount of work, so time grows linearly. Before replacing the loop with a formula, ensure that you can explain its range, state, update, and termination."
            }
          ],
          "exerciseTitle": "Sum the even numbers",
          "task": "Given N, find the sum of all even integers from 1 through N inclusive. 1 ≤ N ≤ 10000. Start with a loop-based solution.",
          "input": "One integer N.",
          "output": "Print the sum of the even integers.",
          "hint": "Initialize the answer to 0. Visit range(1, n + 1) and add i only when i % 2 == 0.",
          "explanation": "Define total as the sum of even integers already inspected. Initially no integer has been inspected, so it is zero. Iterate from one through n using range(1, n + 1), adding i only when i % 2 == 0. Each update preserves the meaning of total. When the loop ends, every candidate has been inspected and total is the required answer. N = 1 tests an empty set of even values; N = 2 tests inclusion of the right endpoint; an odd upper bound checks filtering; the largest case checks accumulation. There are N iterations, giving O(N) time and O(1) extra space. A formula exists, but this lesson intentionally practices a loop and its invariant.",
          "objectives": [
            "Choose for for a known range and while for condition-controlled repetition.",
            "Initialize and update accumulated state, explaining each iteration.",
            "Translate a candidate range and filter into a terminating loop with correct endpoints."
          ],
          "checkpoints": [
            {
              "question": "Why does range(1, n) omit part of the sum from one through n?",
              "answer": "The right endpoint n is excluded. Use range(1, n + 1)."
            },
            {
              "question": "Why initialize total outside the loop?",
              "answer": "It represents the empty accumulated prefix. Reinitializing inside would erase all previous work each iteration."
            }
          ]
        },
        "ja": {
          "title": "繰り返しと集計",
          "summary": "値を順番に調べ、答えを更新する。",
          "sections": [
            {
              "title": "処理をコピーせず範囲で表す",
              "body": "1 から 5 を出すだけなら print を 5 個書けますが、上限が入力で変わる問題には対応できません。for は候補ごとに同じ処理をする構造です。for i in range(1, 6) は各回で新しい整数を i に代入し、インデントした本体を実行します。i は現在の候補であり、累積した回数ではありません。\n\nrange(stop) は 0 から、range(start, stop) は start から始め、どちらも stop は含みません。3 番目の引数は増分で、range(2, 9, 2) は 2・4・6・8 です。範囲が空なら本体を 1 回も実行しませんが、これは通常の動作です。\n\nまず生成される値を紙に並べてから本体を追います。入力 4 なら 1・2・3・4 になります。n + 1 は n を含めるための右端で、n + 1 自身を処理する意味ではありません。問題の「端を含むか」を正確に翻訳する習慣を付けます。",
              "code": "n = int(input())\nfor i in range(1, n + 1):\n    print(i)\n",
              "output": "1\n2\n3\n4\n",
              "exampleInput": "4\n"
            },
            {
              "title": "累積変数の意味を決める",
              "body": "集計は毎回新しい答えを独立して出すのではなく、今までの答えに現在の寄与を加えます。total = 0 はまだ何も処理していないことを表し、ループ前に置きます。total = total + i は古い値を読んでから更新し、total += i はその短い形です。初期化・更新・最終出力の位置を別々に考えます。\n\n1 から 4 の合計なら、最初は 0、1 の後は 1、2 の後は 3、3 の後は 6、4 の後は 10 です。各回の後で total は「ここまでに処理した数の合計」を表します。この保たれる意味をループ不変条件と呼びます。用語よりも、変数の意味を毎回説明できることが重要です。\n\n例は学習用に i と total を表示し、最後に合計を出します。答えだけが必要な提出では途中の print を削除します。total = 0 を本体の中へ置くと、それまでの合計が毎回消えて最後の項だけになります。",
              "code": "total = 0\nfor i in range(1, 5):\n    total += i\n    print(i, total)\nprint(total)\n",
              "output": "1 1\n2 3\n3 6\n4 10\n10\n"
            },
            {
              "title": "while では終了へ近づける",
              "body": "while は毎回の開始前に条件を確認し、真なら本体を実行して、再び条件へ戻ります。回数より終了条件が自然に分かる問題に適しています。正整数を 2 で割り続けて 1 以下にする場合、x > 1 が継続条件、x //= 2 が状態の縮小、steps += 1 が回数の記録です。\n\n20 からは 20→10→5→2→1 と変化して 4 回です。終了後も x と steps を参照でき、1 と 4 になります。最初から 1 なら本体を実行せず steps は 0 です。0 回の場合にも答えを定義するため、初期化は外に置きます。\n\nx の更新を忘れると条件が真のままで、無限ループになります。時間切れなら「各回で何が変わり、なぜ終了へ近づくか」を確認します。時間制限を延ばすだけでは直りません。while が for より上級というわけではなく、既知の範囲を列挙するなら for のほうが検証しやすい場合が多くあります。",
              "code": "x = int(input())\nsteps = 0\nwhile x > 1:\n    x //= 2\n    steps += 1\nprint(x, steps)\n",
              "output": "1 4\n",
              "exampleInput": "20\n"
            },
            {
              "title": "走査の中で条件を絞る",
              "body": "列挙と選別を分けて考えます。for は調べる値を決め、if は現在の値を答えに含めるか決めます。偶数の和なら 1～N をすべて走査し、i % 2 == 0 で選びます。入力 N 自体ではなく、現在の候補 i を判定しなければなりません。各候補を 1 回ずつ判断する構造は、正しさを説明しやすくなります。\n\n個数と合計では更新が違います。偶数の個数なら count += 1、偶数の和なら total += i です。初期値はどちらも 0 ですが意味が異なります。例では入力 7 に対し、偶数 3 個、合計 12 を得ます。2・4・6 の各回で、個数は 1 ずつ増え、合計には現在の値が加わります。\n\nfor の中に if があるため、更新文には 2 段のインデントが必要です。total += i を if と同じ深さへ戻すと、すべての整数を加えてしまいます。階層を「各 i について、偶数なら、2 つの集計を更新する」と読んで確認してください。",
              "code": "n = int(input())\ncount = 0\ntotal = 0\nfor i in range(1, n + 1):\n    if i % 2 == 0:\n        count += 1\n        total += i\nprint(count, total)\n",
              "output": "3 12\n",
              "exampleInput": "7\n"
            },
            {
              "title": "終了と現在の回の省略",
              "body": "break はそれを含むループを直ちに終了し、ループ後へ進みます。continue は現在の回の残りだけを飛ばして次の回へ進みます。影響する範囲が異なるので同じ意味ではありません。初学時は通常の if のほうが分かりやすいことも多く、流れが明確になる場合に使います。\n\n1～N の最初の 7 の倍数を探すなら、7 を見つけた時点で break できます。しかし全部の個数を求めるなら、14・21 などを調べずに終わるため誤りです。途中で止めてよいかは問題の要求から判断し、1 つの成功例が見つかっただけで終了してはいけません。\n\nwhile と continue の組合せには注意が必要です。状態の更新を continue より後に置くと、その経路では更新が飛ばされ、前へ進まなくなる場合があります。必ず必要な更新がすべての経路で行われる位置へ置くか、単純な条件構造に直します。キーワードだけでなく「次にどの文へ移るか」を追う習慣を付けます。",
              "code": "for i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    if i > 5:\n        break\n    print(i)\n",
              "output": "1\n3\n5\n"
            },
            {
              "title": "問題からループを組み立てる",
              "body": "演習を 4 文で説明します。「候補は 1～N」「条件は偶数」「条件を満たす数は自身の値を寄与する」「寄与の合計を出す」です。それぞれ range、if、total += i、最後の print に対応します。構文から離れた手順を先に書けば、どの行から実装するか迷いにくくなります。\n\n最小入力から調べます。N=1 なら偶数なしで答え 0 となり、初期化を確認できます。N=2 は答え 2 で右端の包含、N=7 は 2・4・6 だけを加える選別と累積を確認します。大きい値では適切な時間で終了するか見ます。上限 10000 なら、すべてを順に調べて問題ありません。\n\n回数も数えられます。1～N の N 回で、それぞれ余り・比較・必要な加算をするだけなので、時間は N に比例します。今は公式を無理に使う必要はありません。範囲、状態、更新、終了の 4 点を説明できてから、線形の方法を一定時間へ改善する考え方に進みます。"
            }
          ],
          "exerciseTitle": "偶数の合計",
          "task": "整数 N が与えられます。1 以上 N 以下の偶数の合計を求めてください。1 ≤ N ≤ 10000 です。まずはループで実装してください。",
          "input": "整数 N が 1 個与えられます。",
          "output": "偶数の合計を出力してください。",
          "hint": "答えを 0 で初期化し、range(1, n + 1) を走査して i % 2 == 0 のときだけ加算します。",
          "explanation": "total を「確認済みの整数に含まれる偶数の合計」と定義します。最初は何も調べていないので 0 です。range(1, n + 1) で右端 n まで調べ、i % 2 == 0 の場合だけ i を加えます。各更新後も total の意味は変わりません。終了時には全候補を確認したため答えになります。N=1 は偶数なし、N=2 は右端の包含、奇数の上限は選別、最大値は累積を確認します。N 回の反復なので時間 O(N)、追加領域 O(1) です。公式も導けますが、本課ではループと不変条件を練習します。",
          "objectives": [
            "範囲が決まる for と条件で続く while を使い分ける。",
            "集計する状態を初期化し、各反復の変化を説明する。",
            "列挙範囲と選別条件を実装し、端点と終了を確認する。"
          ],
          "checkpoints": [
            {
              "question": "1 から n の合計に range(1, n) が不適切なのはなぜですか。",
              "answer": "右端の n を含まないためです。range(1, n + 1) を使います。"
            },
            {
              "question": "total=0 をループの外に置く理由は何ですか。",
              "answer": "集計開始前の値だからです。中に置くと毎回以前の結果を消してしまいます。"
            }
          ]
        }
      },
      "starter": "n = int(input())\n# TODO\n",
      "solution": "n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    if i % 2 == 0:\n        total += i\nprint(total)\n",
      "tests": [
        {
          "input": "1\n",
          "expected": "0\n"
        },
        {
          "input": "2\n",
          "expected": "2\n"
        },
        {
          "input": "7\n",
          "expected": "12\n"
        },
        {
          "input": "10000\n",
          "expected": "25005000\n"
        }
      ]
    },
    {
      "id": "strings",
      "order": 5,
      "stage": "python",
      "minutes": 50,
      "prerequisiteIds": [
        "loops"
      ],
      "relatedProblems": [
        "ABC081A",
        "ABC303A",
        "ABC233B"
      ],
      "content": {
        "zh": {
          "title": "字符串",
          "summary": "下标、切片与逐字符处理。",
          "sections": [
            {
              "title": "字符串是有位置的字符序列",
              "body": "输入除了数字，也可能是名称、命令或一串符号。字符串保存字符的顺序，\"ab\" 与 \"ba\" 是不同值。len(s) 返回字符串的长度。Python 下标从0开始，所以长度为n时，非负下标是0到n-1。s[0] 取第一个字符，s[n-1] 取最后一个，s[-1] 是访问末尾的另一种写法。\n\n对 s=\"python\"，位置0是p，位置1是y，位置5是n，而位置6不存在。取 s[6] 会产生 IndexError。负下标从末尾向前数：-1是最后一个，-2是倒数第二个。它不是“非法下标自动修正”，如果向前超出整个字符串，同样会出错。\n\n读取 input() 得到的本来就是字符串，因此本课不要再调用 int。输入说明允许哪些字符，应按题目处理；字母与数字字符同样可以逐个访问，但字符 \"7\" 不是整数7。本课练习非空字符串，才保证 s[0] 和 s[-1] 都可以安全使用。",
              "code": "s = \"python\"\nprint(len(s))\nprint(s[0], s[1], s[-1])\n",
              "output": "6\np y n\n"
            },
            {
              "title": "切片用半开区间取出一段",
              "body": "单个下标取一个字符，切片 s[l:r] 取一段连续字符，从 l 开始，到 r 之前结束。这与 range 的右端不包含规则相同。s[1:4] 取位置1、2、3，长度为3。先写下实际位置，再数字符，可以避免把右端也算进去。\n\n省略左端表示从开头开始，省略右端表示到末尾。因此 s[:3] 取前三个字符，s[3:] 去掉前三个字符。s[:] 得到相同内容的字符串。第三项是步长：s[::2] 每隔一个取一个，s[::-1] 用负步长从后向前，形成倒序。没有必要一次背熟所有组合，先掌握连续切片与倒序即可。\n\n切片与单下标的边界行为不同。切片超过实际末尾时会截到可用范围，空范围返回空字符串；单下标越界会报错。不过不应因此随意写边界，算法仍需知道要取哪一段。观察下面输出，逐项指出每行来自哪些位置，而不是只记最终单词。",
              "code": "s = \"abcdef\"\nprint(s[1:4])\nprint(s[:3])\nprint(s[3:])\nprint(s[::2])\nprint(s[::-1])\n",
              "output": "bcd\nabc\ndef\nace\nfedcba\n"
            },
            {
              "title": "按字符遍历与统计",
              "body": "如果只关心每个字符的值，不需要自己维护下标，可以直接写 for ch in s。每轮 ch 得到一个长度为1的字符串，按原来的顺序遍历。统计某个字符的出现次数时，先 count=0，再在 ch == \"a\" 时 count+=1。这与上一课统计符合条件的整数完全同构，只是候选从数字变成字符。\n\n需要知道位置时，则用 for i in range(len(s))，通过 s[i] 访问当前字符。选哪种循环取决于题目是否需要位置，不是代码越短越好。比较相邻字符时可以从 i=1 开始，比较 s[i] 与 s[i-1]，避免不小心用 s[-1] 把末尾当作第一个字符的前驱。\n\n下面输入 banana，每轮 ch 依次为 b、a、n、a、n、a，计数只在三个a上更新，所以输出3。将循环不变量说成“已经看过的部分里a的个数”，就能解释为什么循环结束后得到整个字符串的计数。",
              "code": "s = input()\ncount = 0\nfor ch in s:\n    if ch == \"a\":\n        count += 1\nprint(count)\n",
              "output": "3\n",
              "exampleInput": "banana\n"
            },
            {
              "title": "不能原地改字符，要构造新值",
              "body": "字符串不可变，意思是不能通过 s[0]=\"x\" 修改其中一格。这样的赋值会产生 TypeError。可以计算一个新字符串，再把名字 s 绑定到它，例如 s=\"x\"+s[1:]。旧字符串本身没有被修改，变量只是开始引用新的值。列表将在下一课提供可修改的序列，两者要分开理解。\n\nreplace(old,new) 返回替换后的新字符串。例如 s.replace(\"1\",\"l\") 把所有字符1换成字母l。仅调用 s.replace(...) 而不保存或使用返回结果，不会改变 s。字符串拼接使用 +，重复使用 *，例如 \"ab\"*3 得到 ababab，但这些操作也会产生新字符串。\n\n下面同时打印原值与替换结果，验证原值保持不变。处理大量字符时，反复拼接可能反复复制已有内容；后续学习列表后，可以先收集片段再 join。当前小练习先理解值与变量的区别，不要把“可以给 s 重新赋值”误解成“可以修改字符串内部”。",
              "code": "s = \"a1b1\"\nchanged = s.replace(\"1\", \"l\")\nprint(s)\nprint(changed)\nprint(\"ab\" * 3)\n",
              "output": "a1b1\nalbl\nababab\n"
            },
            {
              "title": "字符比较要忠于输入约束",
              "body": "字符串比较区分大小写，\"A\" != \"a\"。空格也是字符，\"ab\" 与 \"a b\" 不相等，长度也不同。input() 只去掉行末换行，不会自动删除开头的空格。strip() 能去除两端空白，但只有题意允许时才应该用；随意“清洗”可能改变真正需要比较的数据。\n\n算法练习通常明确限制为英小写字母、数字或特定符号，这让逐字符比较有确定含义。本课回文题只包含小写字母，因此无需转小写，也无需删除标点。不要因为日常语言里可能忽略空格，就擅自把这套习惯带入程序。程序处理的是题目定义的字符串。\n\n下面使用固定字符串展示空格的作用：长度是5而不是3；与 \"aba\" 比较为False；去掉两端空白后才为True。学习例子可以显示这些中间结果，最终练习则只输出指定的 Yes 或 No。若视觉上看起来相同却检查失败，可查看长度或用 repr(s) 暂时显示空白边界。",
              "code": "s = \" aba \"\nprint(len(s))\nprint(s == \"aba\")\nprint(s.strip() == \"aba\")\n",
              "output": "5\nFalse\nTrue\n"
            },
            {
              "title": "从回文定义得到判定程序",
              "body": "“正着读和反着读一样”可以翻译成两个相等的字符串：原字符串与反转字符串。s[::-1] 构造反转结果，== 逐位置检查是否完全相同。若相等输出 Yes，否则 No。先使用普通 if / else 写清楚流程，熟悉后再阅读参考解中的条件表达式；短写法不会改变判断的数学含义。\n\n也可以不用反转，而是比较第i位与第n-1-i位。两端向中间靠近，任意一对不同就不是回文。奇数长度的中间字符与自己对应，始终相等；一个字符当然是回文。这种另一种思路帮助说明切片方案为何正确，而不是因为某个方法“碰巧有效”。\n\n验证时选择a、abba、abcba、abca：分别覆盖单字符、偶数长度、奇数长度和内部不一致。不要只检查首尾相等，abca的首尾都是a，但中间不匹配。算法应覆盖全部对应位置。反转需要额外保存一个字符串，输入长度越大，复制与比较的工作也线性增加。",
              "code": "s = input()\nreversed_s = s[::-1]\nif s == reversed_s:\n    print(\"Yes\")\nelse:\n    print(\"No\")\n",
              "output": "No\n",
              "exampleInput": "abca\n"
            }
          ],
          "exerciseTitle": "回文判断",
          "task": "给定由小写英文字母组成的非空字符串 S。如果从左到右与从右到左读完全相同，输出 Yes，否则输出 No。1 ≤ |S| ≤ 100000。",
          "input": "一行字符串 S。",
          "output": "输出 Yes 或 No。",
          "hint": "比较 s 与 s[::-1]。一个字符也构成回文。",
          "explanation": "回文要求第一个字符等于最后一个、第二个等于倒数第二个，直到所有位置都对应相等。反转字符串会把这些对应关系排到同一位置，因此 s == s[::-1] 等价于回文定义。参考解根据比较结果输出 Yes 或 No；一个字符反转后不变，应输出 Yes，偶数与奇数长度都不需要特殊处理。非空且仅含小写字母的约束意味着无需清理大小写或空格。四个测试覆盖单字符、偶数回文、奇数回文和内部不匹配。反转构造长度为 |S| 的新字符串，比较也最多检查 |S| 个位置，所以时间与额外空间均为 O(|S|)。",
          "objectives": [
            "使用长度、下标和切片访问字符串，解释0起始的边界。",
            "遍历字符并构造新字符串，理解不可变性。",
            "按字符精确比较，用反转或两端比较判断回文。"
          ],
          "checkpoints": [
            {
              "question": "长度为5的字符串，最后一个非负下标是多少？",
              "answer": "4。下标范围是0到长度减1，也可用-1访问最后一个字符。"
            },
            {
              "question": "s[::-1] 会把原来的 s 改成倒序吗？",
              "answer": "不会，它返回新的倒序字符串。只有执行 s = s[::-1] 才会让变量 s 绑定到新值。"
            }
          ]
        },
        "en": {
          "title": "Strings",
          "summary": "Indexing, slicing, and character-by-character processing.",
          "sections": [
            {
              "title": "A string is an indexed sequence",
              "body": "Input may contain names, commands, or symbols rather than numbers. A string preserves character order, so \"ab\" and \"ba\" are different values. len(s) gives its length. Python indices start at zero: for length n, nonnegative indices run from zero to n - 1. s[0] accesses the first character and s[-1] the last.\n\nFor \"python\", index zero is p, one is y, and five is n. Index six does not exist and raises IndexError. Negative indices count backward from the end, but can also go out of range. input() already returns a string, so do not apply int for this exercise. The character \"7\" and the integer 7 are distinct values. Accessing the endpoints is safe here because the constraints explicitly exclude an empty string.",
              "code": "s = \"python\"\nprint(len(s))\nprint(s[0], s[1], s[-1])\n",
              "output": "6\np y n\n"
            },
            {
              "title": "Slices select half-open ranges",
              "body": "A single index selects one character; s[l:r] selects a consecutive section starting at l and ending before r. This uses the same excluded-right-end convention as range. s[1:4] selects indices one, two, and three, giving three characters. List the positions before counting them.\n\nAn omitted left endpoint means the beginning; an omitted right endpoint means the end. Thus s[:3] selects the first three and s[3:] removes them. A third component is the step: s[::2] selects every other character and s[::-1] reverses the string. Unlike single indexing, slices are clipped to the available range and can return an empty string. That does not remove the need to choose logically correct endpoints. Explain which positions produce every line of the example.",
              "code": "s = \"abcdef\"\nprint(s[1:4])\nprint(s[:3])\nprint(s[3:])\nprint(s[::2])\nprint(s[::-1])\n",
              "output": "bcd\nabc\ndef\nace\nfedcba\n"
            },
            {
              "title": "Traverse and count characters",
              "body": "When only character values matter, use for ch in s instead of managing indices. Each iteration receives a one-character string in the original order. To count a, initialize count to zero and increment it when ch == \"a\". This is the same enumeration-and-filter pattern used for integers in the previous lesson.\n\nWhen positions matter, use for i in range(len(s)) and access s[i]. Choose based on the information needed, not merely code length. To compare adjacent characters, starting at index one avoids accidentally using s[-1] as the predecessor of the first character. For banana, the sequence is b, a, n, a, n, a, with three increments. The invariant is “the number of a characters in the prefix already examined,” which explains the final count.",
              "code": "s = input()\ncount = 0\nfor ch in s:\n    if ch == \"a\":\n        count += 1\nprint(count)\n",
              "output": "3\n",
              "exampleInput": "banana\n"
            },
            {
              "title": "Strings are immutable values",
              "body": "Strings are immutable: assigning s[0] = \"x\" raises TypeError instead of changing one position. You can create a new value, such as \"x\" + s[1:], and assign it to s. The old string itself has not changed; the name now refers to another value. Lists in the next lesson behave differently.\n\nreplace(old, new) returns a new string with replacements. Calling s.replace(...) without using its result leaves s unchanged. + concatenates and * repeats strings, again creating new values. The example prints both the original and replacement to demonstrate this distinction. Repeated concatenation can copy existing content many times; after learning lists, collecting pieces and joining them is useful for larger tasks. For now, distinguish rebinding a variable from mutating an object.",
              "code": "s = \"a1b1\"\nchanged = s.replace(\"1\", \"l\")\nprint(s)\nprint(changed)\nprint(\"ab\" * 3)\n",
              "output": "a1b1\nalbl\nababab\n"
            },
            {
              "title": "Respect the character specification",
              "body": "String comparison is case-sensitive: \"A\" differs from \"a\". Spaces are characters too, so \"ab\" and \"a b\" have different content and lengths. input() removes the ending newline but does not automatically remove leading spaces. strip() removes surrounding whitespace; use it only when the specification permits that transformation.\n\nCompetitive exercises often restrict input to lowercase English letters, digits, or designated symbols. This palindrome task uses lowercase letters only, so neither case conversion nor punctuation removal is required. Do not import everyday conventions about ignoring spaces into an exact string problem. The example shows a five-character value that becomes three characters after stripping. For debugging invisible differences, temporarily inspect len(s) or repr(s), then remove diagnostic output from the submitted program.",
              "code": "s = \" aba \"\nprint(len(s))\nprint(s == \"aba\")\nprint(s.strip() == \"aba\")\n",
              "output": "5\nFalse\nTrue\n"
            },
            {
              "title": "Derive a palindrome test",
              "body": "“The same forward and backward” translates into equality between the original string and its reversal. s[::-1] creates the reversed value, and == checks complete equality. Write an ordinary if / else first; the reference’s conditional expression is only a shorter form of the same decision.\n\nAnother derivation compares index i with n - 1 - i, moving inward. Any unequal pair disproves the palindrome property. The middle character of an odd-length string corresponds to itself, and a single character is therefore a palindrome. Test a, abba, abcba, and abca. The last example has equal endpoints but an unequal interior, showing why checking only first and last is insufficient. Reversing and comparing require work proportional to the string length, and the reversed copy requires additional storage.",
              "code": "s = input()\nreversed_s = s[::-1]\nif s == reversed_s:\n    print(\"Yes\")\nelse:\n    print(\"No\")\n",
              "output": "No\n",
              "exampleInput": "abca\n"
            }
          ],
          "exerciseTitle": "Palindrome check",
          "task": "Given a nonempty lowercase English string S, print Yes if it reads identically forward and backward, and No otherwise. 1 ≤ |S| ≤ 100000.",
          "input": "One line containing S.",
          "output": "Print Yes or No.",
          "hint": "Compare s with s[::-1]. A one-character string is also a palindrome.",
          "explanation": "A palindrome pairs the first character with the last, the second with the next-to-last, and so on. Reversing the string places those counterparts at matching indices, so s == s[::-1] is equivalent to the definition. The reference prints Yes or No from that comparison. A single character is unchanged by reversal and counts as a palindrome; even and odd lengths require no special case. The nonempty lowercase-only constraints mean there is no case folding or whitespace cleanup to perform. Tests cover one character, even and odd palindromes, and an internal mismatch. Reversal creates a new string of length |S| and comparison inspects at most that many positions, giving O(|S|) time and extra space.",
          "objectives": [
            "Access strings using lengths, indices, and slices with zero-based boundaries.",
            "Traverse characters and build a new string without mutating the original.",
            "Compare characters exactly and recognize palindromes by reversal or paired positions."
          ],
          "checkpoints": [
            {
              "question": "What is the last nonnegative index of a five-character string?",
              "answer": "Four. Valid nonnegative indices run from zero through length minus one; -1 also accesses the final character."
            },
            {
              "question": "Does s[::-1] reverse the original value in place?",
              "answer": "No. It returns a new reversed string. Assigning s = s[::-1] makes the name refer to that new value."
            }
          ]
        },
        "ja": {
          "title": "文字列",
          "summary": "添字、スライス、1 文字ずつの処理。",
          "sections": [
            {
              "title": "文字列は位置のある文字の列",
              "body": "入力には数値だけでなく名前、命令、記号列などもあります。文字列は順序を保存するので \"ab\" と \"ba\" は別の値です。len(s) は長さを返します。Python の添字は 0 始まりで、長さ n なら非負の添字は 0～n-1 です。s[0] が先頭、s[n-1] が末尾で、s[-1] でも末尾を取れます。\n\ns=\"python\" なら位置 0 は p、1 は y、5 は n で、6 は存在しません。s[6] は IndexError になります。負の添字は末尾から数え、-1 が最後、-2 が最後から 2 番目です。範囲外を自動修正する機能ではなく、前へ行き過ぎてもエラーです。\n\ninput() の結果は元々文字列なので、この課で int に変換する必要はありません。どの文字が許されるかは問題の指定に従います。数字の文字 \"7\" もアクセスできますが、整数 7 とは異なります。本演習は空でないため、s[0] と s[-1] を安全に読めます。",
              "code": "s = \"python\"\nprint(len(s))\nprint(s[0], s[1], s[-1])\n",
              "output": "6\np y n\n"
            },
            {
              "title": "スライスは半開区間を取り出す",
              "body": "単一の添字は 1 文字、s[l:r] というスライスは連続する範囲を取ります。l から始め、r の直前までです。range と同じく右端を含まないため、s[1:4] は位置 1・2・3 の 3 文字になります。実際の位置を並べてから数えると、右端を余分に入れる誤りを防げます。\n\n左端を省略すると先頭、右端を省略すると末尾までです。s[:3] は先頭 3 文字、s[3:] は先頭 3 文字を除いた部分です。3 番目の成分は増分で、s[::2] は 1 つおき、s[::-1] は逆方向へ進んだ文字列です。全組合せを暗記せず、まず連続範囲と反転を理解します。\n\n単一添字と違い、スライスの端が範囲を超えると存在する部分までに調整され、空の範囲は空文字列になります。ただしアルゴリズムが必要とする範囲を考えなくてよいわけではありません。例の各行が元のどの位置から来たか説明してください。",
              "code": "s = \"abcdef\"\nprint(s[1:4])\nprint(s[:3])\nprint(s[3:])\nprint(s[::2])\nprint(s[::-1])\n",
              "output": "bcd\nabc\ndef\nace\nfedcba\n"
            },
            {
              "title": "文字ごとに走査して数える",
              "body": "位置が不要で文字の値だけを調べるなら、for ch in s と直接書けます。ch は毎回長さ 1 の文字列になり、元の順番で取り出されます。a の個数なら count=0 から始め、ch == \"a\" のとき count+=1 とします。前課の整数の選別と同じ構造で、候補が文字へ変わっただけです。\n\n位置も必要なら for i in range(len(s)) で s[i] を使います。短さだけでなく必要な情報で書き方を選びます。隣接文字を比較するなら i=1 から始めて s[i] と s[i-1] を比較すると、誤って s[-1] を先頭文字の直前として扱うことを防げます。\n\nbanana では ch が b・a・n・a・n・a の順となり、3 個の a だけで更新されて答えは 3 です。「ここまでに見た部分の a の個数」という意味が毎回保たれます。全体を見終われば、その意味から文字列全体の個数であることが分かります。",
              "code": "s = input()\ncount = 0\nfor ch in s:\n    if ch == \"a\":\n        count += 1\nprint(count)\n",
              "output": "3\n",
              "exampleInput": "banana\n"
            },
            {
              "title": "文字列は直接書き換えられない",
              "body": "文字列は変更不能で、s[0]=\"x\" のような位置への代入は TypeError になります。代わりに \"x\"+s[1:] で新しい値を作り、s に代入できます。元の文字列が変更されたのではなく、名前 s が別の値を参照します。次課のリストでは内部を更新できるため、区別して理解します。\n\nreplace(old,new) は置換後の新しい文字列を返します。s.replace(\"1\",\"l\") は数字の 1 を文字 l へ置換しますが、戻り値を保存も使用もしなければ s は変わりません。+ は連結、* は繰り返しで、\"ab\"*3 は ababab です。これらも新しい値を作ります。\n\n例で元の値と置換結果を両方表示し、元が変わらないことを確かめます。大量の文字を何度も連結すると、既存部分を繰り返しコピーする場合があります。後でリストを学んだら、部分を集めて join する方法も使えます。今は変数への再代入と、文字列内部の変更を混同しないことが大切です。",
              "code": "s = \"a1b1\"\nchanged = s.replace(\"1\", \"l\")\nprint(s)\nprint(changed)\nprint(\"ab\" * 3)\n",
              "output": "a1b1\nalbl\nababab\n"
            },
            {
              "title": "入力の文字条件をそのまま扱う",
              "body": "文字列の比較は大文字と小文字を区別し、\"A\" と \"a\" は異なります。空白も文字なので \"ab\" と \"a b\" は内容も長さも違います。input() は末尾の改行だけを除き、先頭の空白を自動削除しません。strip() は両端の空白を除きますが、題意で許される場合だけ使います。任意の整形は比較対象を変えてしまいます。\n\n問題では英小文字、数字、指定記号などへ入力を制限することが多く、文字ごとの比較の意味が明確です。本課は小文字だけなので、小文字化や記号の削除は不要です。日常の文章で空白を無視する場合があっても、その慣習を勝手にプログラムへ持ち込まないでください。\n\n例の元の長さは 3 ではなく 5 です。\"aba\" との比較は False、両端の空白を除いた後は True になります。見た目が同じなのに一致しない場合、len(s) や repr(s) で空白の境界を確認できます。ただし提出前には診断用の出力を除き、指定された Yes/No だけを表示します。",
              "code": "s = \" aba \"\nprint(len(s))\nprint(s == \"aba\")\nprint(s.strip() == \"aba\")\n",
              "output": "5\nFalse\nTrue\n"
            },
            {
              "title": "回文の定義から判定を書く",
              "body": "「順方向と逆方向が同じ」は、元の文字列と反転した文字列の等価比較に直せます。s[::-1] で反転を作り、== で内容全体を比較し、一致なら Yes、そうでなければ No です。まず通常の if / else で流れを書き、理解した後に参考解の条件式による短縮形を読んでください。短い表記でも判断の意味は同じです。\n\n反転せず、位置 i と n-1-i を比較する考え方もあります。両端から中央へ進み、1 組でも違えば回文ではありません。奇数長の中央は自分自身と対応するので必ず一致し、1 文字も回文です。この説明から、反転比較が偶然ではなく定義どおりの判定だと分かります。\n\na・abba・abcba・abca で、1 文字、偶数長、奇数長、内部不一致を確認します。abca は両端が a でも中央が合わないため、先頭と末尾だけの判定では不足します。反転コピーを作り、全位置を比較するので、長さに比例して処理と追加領域が増えます。",
              "code": "s = input()\nreversed_s = s[::-1]\nif s == reversed_s:\n    print(\"Yes\")\nelse:\n    print(\"No\")\n",
              "output": "No\n",
              "exampleInput": "abca\n"
            }
          ],
          "exerciseTitle": "回文の判定",
          "task": "空でない英小文字の文字列 S が与えられます。順方向と逆方向から読んだ文字列が一致するなら Yes、そうでなければ No を出力してください。1 ≤ |S| ≤ 100000 です。",
          "input": "1 行に文字列 S が与えられます。",
          "output": "Yes または No を出力してください。",
          "hint": "s と s[::-1] を比較します。1 文字の文字列も回文です。",
          "explanation": "回文は最初と最後、2 番目と最後から 2 番目という対応がすべて一致する文字列です。反転すると対応する文字が同じ添字に来るため、s == s[::-1] が定義と同じ判定になります。参考解は結果に応じて Yes または No を出します。1 文字は反転しても同じなので Yes で、偶数長と奇数長を特別扱いする必要はありません。空でない英小文字という制約なので、大文字の変換や空白削除も不要です。テストは 1 文字、偶数回文、奇数回文、内部の不一致を確認します。反転コピーと比較により、時間・追加領域とも O(|S|) です。",
          "objectives": [
            "長さ・添字・スライスを使い、0 始まりの境界を説明する。",
            "文字を走査し、元の文字列を変更せず新しい文字列を作る。",
            "文字を正確に比較し、反転や両端の対応から回文を判定する。"
          ],
          "checkpoints": [
            {
              "question": "長さ 5 の文字列の最後の非負添字は何ですか。",
              "answer": "4 です。0 から長さ−1 までで、-1 でも末尾へアクセスできます。"
            },
            {
              "question": "s[::-1] は元の文字列を直接反転しますか。",
              "answer": "しません。反転した新しい文字列を返します。s = s[::-1] と代入した場合に s の参照先が変わります。"
            }
          ]
        }
      },
      "starter": "s = input()\n# TODO\n",
      "solution": "s = input()\nprint(\"Yes\" if s == s[::-1] else \"No\")\n",
      "tests": [
        {
          "input": "a\n",
          "expected": "Yes\n"
        },
        {
          "input": "abba\n",
          "expected": "Yes\n"
        },
        {
          "input": "abcba\n",
          "expected": "Yes\n"
        },
        {
          "input": "abca\n",
          "expected": "No\n"
        }
      ]
    },
    {
      "id": "lists",
      "order": 6,
      "stage": "python",
      "minutes": 50,
      "prerequisiteIds": [
        "strings"
      ],
      "relatedProblems": [
        "APG4bPython EX10",
        "ABC213B"
      ],
      "content": {
        "zh": {
          "title": "列表与下标",
          "summary": "保存一组数，同时处理位置和值。",
          "sections": [
            {
              "title": "用一个列表保存一组输入",
              "body": "当题目给出N个数，分别命名为a、b、c无法适应N变化。列表把按顺序排列的一组值保存到一个对象中，例如 [7,2,5]。方括号表示列表，逗号分隔元素，列表长度用len(a)取得。它与字符串都是有序序列，但列表可以保存整数，而且能够修改元素。\n\n一行整数的常见读法是 list(map(int,input().split()))。按由内到外解释：input读整行字符串，split得到各段文字，map把每一段转为整数，list把转换结果收集成可重复访问的列表。少了int转换，得到的仍是字符串，数值比较可能变成字典序比较，例如文字\"10\"排在\"2\"前面。\n\n第一行的N描述元素数量，第二行才是数据。读入后先明确n与len(a)各自代表什么；合法输入保证两者相等。不要额外读取N行，除非输入格式确实逐行给出元素。理解这条数据管道后，再使用简写，而不是把整句当成无法拆解的口诀。",
              "code": "n = int(input())\na = list(map(int, input().split()))\nprint(n, len(a))\nprint(a[0], a[-1])\n",
              "output": "3 3\n7 5\n",
              "exampleInput": "3\n7 2 5\n"
            },
            {
              "title": "元素、下标与位置是三件事",
              "body": "列表a=[10,30,20]中，下标1对应值30；按题目常见的1起始编号，它位于第2个位置。下标是访问数据的地址式编号，值是那个位置保存的内容，两者恰好相同只是偶然。把for x in a里的x当成下标再访问a[x]，可能越界，也可能访问到完全无关的元素。\n\n只要值时用for value in a；需要位置时可以用for i in range(len(a))。enumerate(a)则同时提供下标和值：for i,value in enumerate(a)。每轮先得到一对数据，再按顺序拆到两个名字中，与之前接收两个输入数的拆包思想相同。\n\n下面输出从1开始的位置和值。内部始终使用0起始下标，只有显示时加1，可以让边界规则保持一致。不要在读入后给列表随意加一个占位值，除非你能解释整段算法为何采用1起始存储；混用两种编号往往比统一转换更容易出错。",
              "code": "a = [10, 30, 20]\nfor i, value in enumerate(a):\n    print(i + 1, value)\n",
              "output": "1 10\n2 30\n3 20\n"
            },
            {
              "title": "更新、追加与稳定的遍历范围",
              "body": "列表允许a[i]=新值，这与字符串不同。a.append(x)把一个元素加在末尾，长度增加1。它不是把列表整体替换成x，也不是返回一个更新后的列表；直接执行a.append(x)即可，不要写a=a.append(x)，因为append的返回值是None，会覆盖原变量。\n\n使用下标更新值时，应确保下标已经存在。一个长度为3的列表不能用a[3]=9来新增第4项，应使用append。删除和追加都会改变长度，可能影响正在进行的遍历；初学时尽量先遍历原列表，把结果放到新列表中，而不是边访问边改变结构。\n\n下面先把第二项改为4，再追加9，结果长度从3变4。接着建立doubled，逐项保存两倍值，原列表不受影响。每轮append一次，输出顺序保持与输入相同。这个“读旧列表、写新列表”的模式很适合筛选、转换和重建，也为后续二维数据处理提供基础。",
              "code": "a = [7, 2, 5]\na[1] = 4\na.append(9)\ndoubled = []\nfor value in a:\n    doubled.append(value * 2)\nprint(a)\nprint(doubled)\n",
              "output": "[7, 4, 5, 9]\n[14, 8, 10, 18]\n"
            },
            {
              "title": "求最大值时不要假设初始为零",
              "body": "求和从0开始是因为0是加法的单位元；求最大值不能机械套用同样初始化。若数据全为负数，0比所有元素都大，程序可能返回一个根本不存在的值。题目保证N≥1时，可以用第一个元素a[0]作为候选，从后续元素中找更大的值。\n\n以[-8,-3,-6]为例，初始best=-8；看到-3，它更大，更新为-3；看到-6，不更新；最终-3。每轮之后，best都是“已经看过的元素的最大值”。如果只需要值，可以使用Python的max(a)，但练习还要位置，所以需要更完整的状态。\n\nmin、max、sum是方便的内置工具，应知道输入为空时的差异：sum([])为0，max([])和min([])没有默认候选会报错。不能因为某个测试没遇到空列表就忽略约束。本题非空正好允许以首元素初始化；其他题若允许空集合，必须先定义空时应输出什么。",
              "code": "a = [-8, -3, -6]\nbest = a[0]\nfor value in a[1:]:\n    if value > best:\n        best = value\nprint(best)\nprint(sum(a))\n",
              "output": "-3\n-17\n"
            },
            {
              "title": "复制名字与复制数据不同",
              "body": "b=a不会自动创建一份独立列表，而是让两个名字指向同一个列表。因此修改b[0]也会通过a看到。这种关系叫别名。字符串也可被多个名字引用，但因为不能原地修改，通常不会像列表这样出现“改一处、另一处也变了”的现象。\n\n对于一维整数列表，b=a.copy()或b=a[:]可以复制出独立的外层列表。之后修改b中的某个整数位置，不影响a。注意这是浅复制；若列表里还放着其他列表，内部对象仍可能共享。下一课会专门处理二维列表，这里先不要把浅复制当作任意深度的完整复制。\n\n下面用三个名字验证：alias与a共享，copied是独立副本。通过alias把第一项改成9后，a改变，而copied仍是原始内容。检查代码时，除了跟踪数值，还要留意哪些变量引用同一个可变对象；这能解释很多看起来像“数据自己变了”的问题。",
              "code": "a = [1, 2, 3]\nalias = a\ncopied = a.copy()\nalias[0] = 9\nprint(a)\nprint(copied)\n",
              "output": "[9, 2, 3]\n[1, 2, 3]\n"
            },
            {
              "title": "同时保存最优值与最早位置",
              "body": "练习既要最大值又要位置，保存最大值的下标best就能同时获得两者：值是a[best]，位置是best+1。初始best=0，然后从下标1开始扫描。遇到严格更大的数才更新，遇到相等值保持旧下标。这里比较符的选择直接决定“第一次出现”是否正确。\n\n对[3,9,9,2]逐步跟踪：初始候选为下标0的3；下标1是9，更新best为1；下标2也是9，不大于当前9，所以不更新；最后2也不更新。输出值9与位置2。若写>=，第二个9会替代第一个，变成位置3。\n\n检查最小N=1、全负数、多个最大值、最大值在末尾这四类情况。循环中不要排序，因为排序会改变原来的位置；也不要只保留最大值却丢失对应下标。先根据输出要求决定状态要保存什么，再选择遍历方式，这是从列表操作走向算法设计的一步。",
              "code": "a = [3, 9, 9, 2]\nbest = 0\nfor i in range(1, len(a)):\n    if a[i] > a[best]:\n        best = i\nprint(a[best], best + 1)\n",
              "output": "9 2\n"
            }
          ],
          "exerciseTitle": "第一次出现的最大值",
          "task": "给定 N 个整数 A₁…Aₙ，输出最大值及其第一次出现的位置（从 1 开始）。1 ≤ N ≤ 100000，−10⁹ ≤ Aᵢ ≤ 10⁹。",
          "input": "第一行 N；第二行 N 个整数。",
          "output": "一行输出最大值和位置，用一个空格分隔。",
          "hint": "保存最大值的下标 best；只在发现严格更大值时替换它。",
          "explanation": "把 best 定义为已扫描部分中“最大值第一次出现的下标”。N≥1，因此下标0一定存在，初始 best=0 正确，即使第一个值为负也成立。从下标1向后扫描：若 a[i]>a[best]，更大的值使旧候选失效，应令 best=i；否则保留旧候选，相等时自然保留第一次出现的位置。循环结束后输出最大值 a[best]，并把0起始下标换成题目的1起始位置 best+1。单元素测试检查初始化，重复最大值检查严格比较，全负数检查初始候选，末尾最大检查是否漏掉最后元素。时间 O(N)，输入列表占 O(N) 空间，额外只保存一个下标。",
          "objectives": [
            "读入并保存数列，区分元素值、下标与题目中的位置。",
            "用遍历、更新和追加处理列表，避免错误的最大值初始化。",
            "理解别名与复制，以明确的不变量寻找最早出现的最大值。"
          ],
          "checkpoints": [
            {
              "question": "所有数都是负数时，把最大值初始化为0会怎样？",
              "answer": "0可能不在输入中却比所有输入更大，导致错误。应使用第一个输入元素作为初始候选。"
            },
            {
              "question": "寻找最大值的第一次出现，为何用 > 而不是 >=？",
              "answer": "相等时不替换旧候选，就保留较早位置；>=会不断改成后面相同值的位置。"
            }
          ]
        },
        "en": {
          "title": "Lists and indices",
          "summary": "Store a sequence and work with both positions and values.",
          "sections": [
            {
              "title": "Store related values in one list",
              "body": "When a task provides N numbers, separate names such as a, b, and c cannot adapt to arbitrary N. A list stores an ordered collection in one object, for example [7, 2, 5]. Brackets define the list, commas separate elements, and len(a) gives its length. Like strings, lists are sequences, but their elements can be integers and can be changed.\n\nRead list(map(int, input().split())) from inside outward: read a line, split it into text pieces, convert each piece to an integer, then collect the results into a reusable list. Without conversion, comparisons would be textual rather than numeric. An initial N describes the element count; follow the stated line format instead of assuming that each element occupies its own line.",
              "code": "n = int(input())\na = list(map(int, input().split()))\nprint(n, len(a))\nprint(a[0], a[-1])\n",
              "output": "3 3\n7 5\n",
              "exampleInput": "3\n7 2 5\n"
            },
            {
              "title": "Separate values, indices, and positions",
              "body": "In a = [10, 30, 20], index one contains value thirty and corresponds to the second one-based position. An index identifies where an element is; a value is what is stored there. Treating x from for x in a as an index and accessing a[x] may go out of range or select unrelated data.\n\nUse for value in a when only values matter, or range(len(a)) when indices matter. enumerate(a) supplies both: for i, value in enumerate(a) unpacks each index-value pair. The example prints one-based positions by adding one only at output time. Keeping internal indices zero-based avoids mixing conventions. Do not insert a dummy element merely to imitate a problem’s numbering unless the entire storage scheme is designed consistently around that choice.",
              "code": "a = [10, 30, 20]\nfor i, value in enumerate(a):\n    print(i + 1, value)\n",
              "output": "1 10\n2 30\n3 20\n"
            },
            {
              "title": "Update and append deliberately",
              "body": "Lists allow a[i] = new_value, unlike strings. a.append(x) adds one element at the end and increases the length. It modifies the list rather than returning a replacement, so do not write a = a.append(x): append returns None and would overwrite your variable.\n\nAn indexed assignment requires an existing position. For a three-element list, a[3] = 9 is invalid; use append to add a fourth element. Appending or deleting while traversing can alter the traversal itself. A simple reliable pattern is to read the original list and write transformed values into a new list. The example first changes an element and appends another, then builds doubled without changing a. One append per visited value preserves order and makes filtering or transformation easier to reason about.",
              "code": "a = [7, 2, 5]\na[1] = 4\na.append(9)\ndoubled = []\nfor value in a:\n    doubled.append(value * 2)\nprint(a)\nprint(doubled)\n",
              "output": "[7, 4, 5, 9]\n[14, 8, 10, 18]\n"
            },
            {
              "title": "Initialize extrema from real data",
              "body": "A sum starts at zero because zero is the additive identity. A maximum does not automatically have the same starting value. With all-negative data, zero exceeds every actual element and may produce an answer absent from the input. If N is at least one, initialize from a[0] and inspect the remaining values.\n\nFor [-8, -3, -6], the candidate starts at -8, changes to -3, and remains there. After each step it is the maximum of the inspected prefix. Python’s max(a) can find the value directly, but the exercise also needs a position. Remember that sum([]) is zero, while max([]) and min([]) have no candidate and raise an error unless a default is supplied. Use the problem’s nonempty guarantee rather than assuming every collection is nonempty.",
              "code": "a = [-8, -3, -6]\nbest = a[0]\nfor value in a[1:]:\n    if value > best:\n        best = value\nprint(best)\nprint(sum(a))\n",
              "output": "-3\n-17\n"
            },
            {
              "title": "Copying a name is not copying data",
              "body": "b = a does not create an independent list. It gives a second name to the same object, so changing b[0] is also visible through a. This relationship is called aliasing. Strings can share references too, but their immutability prevents the same in-place editing effect.\n\nFor a one-dimensional integer list, a.copy() or a[:] creates an independent outer list. Replacing an integer element in that copy does not alter the original. This is a shallow copy: if elements are themselves lists, nested objects may remain shared. The next lesson examines that issue. In the example, alias shares with a while copied is independent. Track object relationships as well as numeric values when explaining why a modification appears through another variable.",
              "code": "a = [1, 2, 3]\nalias = a\ncopied = a.copy()\nalias[0] = 9\nprint(a)\nprint(copied)\n",
              "output": "[9, 2, 3]\n[1, 2, 3]\n"
            },
            {
              "title": "Track the first best position",
              "body": "The exercise requests both a maximum value and its position. Storing the candidate index best provides both: the value is a[best], and the one-based position is best + 1. Start at index zero, scan from one onward, and update only for a strictly larger value. Equality must preserve the earlier index.\n\nFor [3, 9, 9, 2], best moves from zero to one at the first nine, stays there at the second nine, and remains there at two. The answer is value nine at position two. Using >= would instead select the later nine. Test a singleton, negative values, ties, and an extremum at the end. Sorting is inappropriate because it changes positions. Decide which information the output requires before choosing what state to maintain.",
              "code": "a = [3, 9, 9, 2]\nbest = 0\nfor i in range(1, len(a)):\n    if a[i] > a[best]:\n        best = i\nprint(a[best], best + 1)\n",
              "output": "9 2\n"
            }
          ],
          "exerciseTitle": "First maximum",
          "task": "Given N integers A₁…Aₙ, print the maximum and its first position, counting from 1. 1 ≤ N ≤ 100000 and −10⁹ ≤ Aᵢ ≤ 10⁹.",
          "input": "N on the first line; N integers on the second.",
          "output": "Print the maximum and its position on one line, separated by a space.",
          "hint": "Keep the index best, and change it only when you find a strictly greater value.",
          "explanation": "Define best as the index of the first maximum in the inspected prefix. Since N is at least one, index zero exists and is a valid initial candidate even for negative values. Scan from index one. If a[i] > a[best], the new larger value invalidates the old candidate, so assign best = i. Otherwise keep the earlier index; equality therefore preserves the first occurrence. At the end, print a[best] and convert its zero-based index to the requested position with best + 1. Tests cover a singleton, tied maxima, all-negative values, and a maximum at the final element. Time is O(N), input storage is O(N), and only one extra candidate index is needed.",
          "objectives": [
            "Store a sequence and distinguish values, indices, and one-based positions.",
            "Traverse, update, and append items while initializing extrema correctly.",
            "Understand aliases and copies, then track the first maximum with a clear invariant."
          ],
          "checkpoints": [
            {
              "question": "What happens if the initial maximum is zero but all inputs are negative?",
              "answer": "Zero may not be an input and is greater than every actual value. Initialize from the first input element instead."
            },
            {
              "question": "Why use > rather than >= to find the first maximum?",
              "answer": "Keeping the earlier candidate on equality preserves the first occurrence; >= replaces it with later equal values."
            }
          ]
        },
        "ja": {
          "title": "リストと添字",
          "summary": "数列を保存し、位置と値を扱う。",
          "sections": [
            {
              "title": "複数の値をリストで保存する",
              "body": "N 個の値を受け取るとき、a・b・c のような個別の名前では N の変化に対応できません。リストは [7,2,5] のように順序付きの値を 1 つの対象にまとめます。角括弧がリスト、カンマが要素の区切りで、長さは len(a) です。文字列と同じく順序がありますが、整数などを保存でき、要素を変更できます。\n\nlist(map(int,input().split())) は内側から読みます。input で行を取得し、split で文字列を分け、map でそれぞれを整数にし、list で繰り返し参照できる形に集めます。int を省くと文字列のままで、比較も数値ではなく文字の順となり、\"10\" が \"2\" より先になる場合があります。\n\n最初の N は個数、次の行がデータです。n と len(a) の意味を区別し、合法な入力では一致すると理解します。入力形式が 1 行の数列なら、勝手に N 行を読まないでください。式を呪文として覚えるより、データの変換順序を説明できることが大切です。",
              "code": "n = int(input())\na = list(map(int, input().split()))\nprint(n, len(a))\nprint(a[0], a[-1])\n",
              "output": "3 3\n7 5\n",
              "exampleInput": "3\n7 2 5\n"
            },
            {
              "title": "値・添字・位置を分ける",
              "body": "a=[10,30,20] では添字 1 の値は 30 で、問題でよく使う 1 始まりの位置なら 2 番目です。添字は場所の番号、値は保存内容です。たまたま同じ数になることがあっても役割は違います。for x in a の x を添字だと思って a[x] とすると、範囲外や無関係の要素を参照します。\n\n値だけなら for value in a、添字が必要なら for i in range(len(a)) が使えます。enumerate(a) は両方を返し、for i,value in enumerate(a) と書けます。各回の添字と値の組を、以前の入力と同様に 2 つの名前へ順番に代入します。\n\n例は 1 始まりの位置と値を出します。内部は 0 始まりに統一し、表示の時だけ 1 を加えると境界規則が明確です。理由なく先頭へダミー要素を追加して 1 始まりに変えると、長さや範囲を混同しがちです。保存方法全体を説明できる場合だけ別の規約を採用します。",
              "code": "a = [10, 30, 20]\nfor i, value in enumerate(a):\n    print(i + 1, value)\n",
              "output": "1 10\n2 30\n3 20\n"
            },
            {
              "title": "変更・追加と走査範囲",
              "body": "リストは文字列と違い、a[i]=新しい値で内部を変更できます。a.append(x) は末尾へ 1 要素を加え、長さを 1 増やします。更新後のリストを返す操作ではないので、a=a.append(x) と書いてはいけません。append の返り値は None であり、元の変数を失います。\n\n添字で代入できるのは存在する位置だけです。長さ 3 に対して a[3]=9 で 4 個目を作ることはできず、append を使います。追加や削除は長さを変え、進行中の走査に影響する場合があります。初めは元を読み、新しいリストへ結果を書く方法が理解しやすくなります。\n\n例は 2 番目を 4 に変え、9 を追加して長さを 3 から 4 にします。その後 doubled へ各値の 2 倍を集め、a は変更しません。各回で 1 個追加するため順序も保たれます。「元を読む、別の結果を書く」は選別や変換に使え、後の二次元データの基礎にもなります。",
              "code": "a = [7, 2, 5]\na[1] = 4\na.append(9)\ndoubled = []\nfor value in a:\n    doubled.append(value * 2)\nprint(a)\nprint(doubled)\n",
              "output": "[7, 4, 5, 9]\n[14, 8, 10, 18]\n"
            },
            {
              "title": "最大値は実際の要素から始める",
              "body": "合計を 0 から始めるのは、0 が加算に影響しない値だからです。最大値へ同じ初期化を機械的に使えません。すべて負数なら 0 が全要素より大きく、入力に存在しない答えになります。N≥1 なら a[0] を候補にして、残りからより大きい値を探せます。\n\n[-8,-3,-6] なら最初は -8、-3 を見て更新し、-6 では維持して -3 です。各回で「確認した要素の最大値」という意味が保たれます。値だけなら Python の max(a) も使えますが、演習では位置も必要なので状態に添字を持たせます。\n\nmin・max・sum は便利ですが、空の入力での違いも知っておきます。sum([]) は 0、max([]) と min([]) は既定値なしでは候補がなくエラーになります。問題の制約を読まずに非空を仮定してはいけません。本題は非空なので先頭から始められますが、別の問題で空集合を許すなら、その時の出力を先に決めます。",
              "code": "a = [-8, -3, -6]\nbest = a[0]\nfor value in a[1:]:\n    if value > best:\n        best = value\nprint(best)\nprint(sum(a))\n",
              "output": "-3\n-17\n"
            },
            {
              "title": "名前の代入とデータのコピー",
              "body": "b=a は独立したリストを作らず、2 つの名前を同じ対象へ向けます。したがって b[0] を変えると a からも変更が見えます。これを別名参照と呼びます。文字列も参照を共有できますが、内部を書き換えられないため、リストのような見え方にはなりにくくなっています。\n\n一次元の整数リストなら a.copy() または a[:] で独立した外側のリストを作れます。コピーの整数要素を置き換えても元に影響しません。ただし浅いコピーなので、要素の中にリストがある場合は内部を共有する可能性があります。次課で二次元を扱うとき、この点を詳しく確認します。\n\n例では alias と a が共有し、copied は独立です。alias を通じて最初を 9 にすると a も変わり、copied は元の内容を保ちます。値だけでなく、どの名前が同じ変更可能な対象を指すかを追うと、「別のデータが勝手に変わった」ように見える現象を説明できます。",
              "code": "a = [1, 2, 3]\nalias = a\ncopied = a.copy()\nalias[0] = 9\nprint(a)\nprint(copied)\n",
              "output": "[9, 2, 3]\n[1, 2, 3]\n"
            },
            {
              "title": "最大値の最初の位置を追う",
              "body": "演習は最大値と位置を求めます。候補の添字 best を保存すれば、値は a[best]、1 始まりの位置は best+1 で得られます。best=0 で開始し、添字 1 から調べ、真に大きい場合だけ更新します。同じ値では以前の添字を残すことが「最初」の条件です。\n\n[3,9,9,2] なら、最初は添字 0 の 3、添字 1 の 9 で best=1 に変わります。添字 2 も 9 ですが、現在より大きくないので維持します。最後の 2 でも変わらず、値 9・位置 2 が答えです。>= にすると後の 9 に置き換わり、位置 3 になってしまいます。\n\nN=1、全負数、最大値の重複、末尾が最大を試します。ソートは元の位置を変えるため、この目的には不要です。最大値だけを保存して位置を忘れても不足します。出力に必要な情報から状態を決め、その状態を維持する走査方法を選ぶことが、リスト操作を使ったアルゴリズム設計になります。",
              "code": "a = [3, 9, 9, 2]\nbest = 0\nfor i in range(1, len(a)):\n    if a[i] > a[best]:\n        best = i\nprint(a[best], best + 1)\n",
              "output": "9 2\n"
            }
          ],
          "exerciseTitle": "最初の最大値",
          "task": "N 個の整数 A₁…Aₙ が与えられます。最大値と、それが最初に現れる位置を 1 始まりで出力してください。1 ≤ N ≤ 100000、−10⁹ ≤ Aᵢ ≤ 10⁹ です。",
          "input": "1 行目に N、2 行目に N 個の整数が与えられます。",
          "output": "最大値と位置を空白区切りで 1 行に出力してください。",
          "hint": "最大値の添字 best を保存し、現在より真に大きい値を見つけたときだけ更新します。",
          "explanation": "best を「走査済み部分の最大値が最初に現れる添字」とします。N≥1 なので添字 0 が存在し、負数でも best=0 は正しい初期候補です。添字 1 から調べ、a[i]>a[best] なら新しい最大値へ best=i と更新します。それ以外は維持するため、同値でも最初の位置が残ります。終了時に a[best] を出し、0 始まりを題目の 1 始まりへ変換して best+1 を出します。単一要素、最大値の重複、全負数、末尾最大のテストで各境界を確認します。時間 O(N)、入力保存 O(N)、追加する候補添字は 1 個です。",
          "objectives": [
            "数列を保存し、値・添字・1 始まりの位置を区別する。",
            "走査・更新・追加を行い、最大値の初期化を正しく選ぶ。",
            "別名とコピーを理解し、不変条件で最初の最大値を追跡する。"
          ],
          "checkpoints": [
            {
              "question": "入力がすべて負数なのに最大値を 0 で始めるとどうなりますか。",
              "answer": "入力に存在しない 0 が全要素より大きくなり誤ります。最初の要素を候補にします。"
            },
            {
              "question": "最初の最大値に > を使い >= を使わない理由は何ですか。",
              "answer": "同値では更新しなければ先の位置が残ります。>= では後の同値へ置き換わります。"
            }
          ]
        }
      },
      "starter": "n = int(input())\na = list(map(int, input().split()))\n# TODO\n",
      "solution": "n = int(input())\na = list(map(int, input().split()))\nbest = 0\nfor i in range(1, n):\n    if a[i] > a[best]:\n        best = i\nprint(a[best], best + 1)\n",
      "tests": [
        {
          "input": "1\n-5\n",
          "expected": "-5 1\n"
        },
        {
          "input": "4\n3 9 9 2\n",
          "expected": "9 2\n"
        },
        {
          "input": "3\n-8 -2 -5\n",
          "expected": "-2 2\n"
        },
        {
          "input": "3\n0 1 2\n",
          "expected": "2 3\n"
        }
      ]
    },
    {
      "id": "nested-loops",
      "order": 7,
      "stage": "python",
      "minutes": 55,
      "prerequisiteIds": [
        "lists"
      ],
      "relatedProblems": [
        "ABC343B",
        "ABC075B"
      ],
      "content": {
        "zh": {
          "title": "嵌套循环与二维列表",
          "summary": "从逐个元素走向逐行、逐列处理。",
          "sections": [
            {
              "title": "为什么需要循环中的循环",
              "body": "一维列表只有一个位置编号，表格则需要行、列两个编号。遍历所有格子可以描述为“依次选择每一行，再在这一行中依次选择每一列”。这就是嵌套循环：外层变量r决定当前行，内层变量c决定这一行中的列。内层全部执行完，外层才前进到下一行。\n\nH=2、W=3时，访问次序是(0,0)、(0,1)、(0,2)，然后(1,0)、(1,1)、(1,2)。不是先同时增加r和c；那样只会走对角线，遗漏大多数格子。两层都从0开始，只是在它们各自的时机更新。\n\n下例直接打印坐标，不涉及数据。请先预测会有几行输出，再逐行核对。总次数是H乘W，因为外层每次都完整运行W次内层。即使你把内外层顺序交换，总访问数也不变，但访问顺序会改变，后续涉及行状态时这种差异就很重要。",
              "code": "h, w = 2, 3\nfor r in range(h):\n    for c in range(w):\n        print(r, c)\n",
              "output": "0 0\n0 1\n0 2\n1 0\n1 1\n1 2\n"
            },
            {
              "title": "缩进、重置与循环变量的职责",
              "body": "双重循环中，初始化放在哪一层决定它多久重置一次。total在最外面初始化，表示整个表格的累计结果；row_total放在外层循环内、内层循环前初始化，表示当前这一行的累计结果。每换一行，它都会重新变成0，而全局total继续保留。\n\n下面用乘法表的形式计算两行、每行三项：第1行为1、2、3，第2行为2、4、6。内层更新row_total，内层结束后把本行和加入total并输出。本行和依次为6、12，全表和18。通过这个例子可以区分“每个格子执行”“每一行执行”“整个程序只执行一次”三种位置。\n\n不要在内层再次使用外层相同的变量名，例如两层都写for i，会覆盖外层当前值，后续很难理解。使用r、c或row、value体现职责。对每条语句问一句它应执行H×W次、H次还是1次，再选择缩进位置，能够系统地修正许多累计错误。",
              "code": "h, w = 2, 3\ntotal = 0\nfor r in range(h):\n    row_total = 0\n    for c in range(w):\n        value = (r + 1) * (c + 1)\n        row_total += value\n    total += row_total\n    print(row_total)\nprint(total)\n",
              "output": "6\n12\n18\n"
            },
            {
              "title": "逐行建立二维列表",
              "body": "Python中的二维列表可以理解为“元素还是列表的列表”。grid[0]取得第一整行，grid[0][1]先取第一行，再取该行的第二个元素。一般写grid[r][c]，先行后列。H与W不同的长方形是检查是否把行列弄反的好输入，正方形有时会掩盖错误。\n\n读入时先grid=[]，每轮用已有的一维读法创建row，然后grid.append(row)。外层循环执行H次，所以最后有H个独立行列表。每行应有W个整数，这是合法输入保证的结构。变量_是普通合法名字，常用于表示这个循环次数变量不会被使用，不是特殊指令。\n\n学会展开写法后，也能读懂grid=[list(map(int,input().split())) for _ in range(h)]。这叫列表推导式，含义是对每轮计算左边的表达式，再把所有结果收集为列表。它只是展开循环的紧凑表示。初学时保留多行版本，更方便检查每一次输入与添加。",
              "code": "h, w = map(int, input().split())\ngrid = []\nfor _ in range(h):\n    row = list(map(int, input().split()))\n    grid.append(row)\nprint(len(grid), len(grid[0]))\nprint(grid[1][2])\n",
              "output": "2 3\n6\n",
              "exampleInput": "2 3\n1 2 3\n4 5 6\n"
            },
            {
              "title": "每一行都要真正独立",
              "body": "需要先创建全0表格时，不能把一行简单重复H次。[[0]*W]*H会重复同一个行列表的引用。修改grid[0][0]时，其他行对应位置也可能改变，因为这些行实际是同一个对象。上一课的别名问题在二维结构里更隐蔽，看起来有多行不代表真的有多个行对象。\n\n可靠的展开写法是每轮重新执行row=[0]*W，再append到grid。这里[0]*W用来构造整数元素的一行没有共享可变行的问题；关键是外层每次都重新创建这个列表。列表推导式[[0]*W for _ in range(H)]也遵循同样原则，每轮生成一个新的内层列表。\n\n下面修改第一行第二列为9，第二行应保持全0。这个小实验比只看打印出来的初始表格更有区分力：错误的共享行在还没修改时看起来完全正常。检查可变数据结构时，试着改变一个局部，再观察不应该变化的部分，是很有效的验证方法。",
              "code": "h, w = 2, 3\ngrid = []\nfor _ in range(h):\n    row = [0] * w\n    grid.append(row)\ngrid[0][1] = 9\nprint(grid[0])\nprint(grid[1])\n",
              "output": "[0, 9, 0]\n[0, 0, 0]\n"
            },
            {
              "title": "按值遍历与按坐标遍历",
              "body": "若只关心格子的值，可以写for row in grid，再写for value in row。这样不需要下标，适合总和、计数、寻找最大值。若题目需要坐标、相邻格子或修改指定位置，就用for r in range(H)、for c in range(W)，再访问grid[r][c]。两种结构会访问相同格子，但提供的信息不同。\n\n下面计算每一列的和。先创建长度W的col_sums，外层遍历行，内层遍历列，当前值加到col_sums[c]。第0列不断接收各行的第0项，第1列接收各行第1项。这里不能在每行开始时重置col_sums，否则最后只留下最后一行。\n\nprint(*col_sums)中的星号把列表元素展开为print的多个参数，所以输出空格分隔的值，而不是带方括号的列表。它不改变列表，也不进行乘法。若不熟悉这种语法，也可以逐个print让每个列和占一行，但实际格式必须服从题目。",
              "code": "grid = [[1, 2, 3], [4, 5, 6]]\nh, w = 2, 3\ncol_sums = [0] * w\nfor r in range(h):\n    for c in range(w):\n        col_sums[c] += grid[r][c]\nprint(*col_sums)\n",
              "output": "5 7 9\n"
            },
            {
              "title": "把格子计数写成完整算法",
              "body": "练习的候选是全部H×W格，每格有一个值，符合条件是value>X，贡献是1而不是value。先把这四点写清楚，就不会把“数量”误做成“合计”。即使两个格子的数相同，它们位于不同位置，也应分别判断和计数，不要先用集合去重。\n\n可以先读完grid，再双重循环统计；也可以读一行就处理一行，因为判断不依赖别的行。后一种方式减少存储，但不减少总访问次数。起始代码采用前一种，参考解采用后一种，目的是展示同一算法可以有不同的数据保存方式，而不是要求一定写得最短。\n\n检查H或W等于1的单行、单列，再用H不等于W的表格确认行列范围。值恰好等于X时不能计数；所有格子都不满足时，答案保持0；全部满足时应为H×W。每个格子恰好访问一次说明不会遗漏或重复。不要把循环理解成“多写一层就能处理更多”，而要说明每一层对应哪一个独立的选择。"
            }
          ],
          "exerciseTitle": "超过阈值的格子",
          "task": "给定H行W列的整数表格与整数X，统计严格大于X的格子数量。位置不同的格子分别计数，即使它们的值相同。1≤H,W≤50，−10⁹≤X,A[r][c]≤10⁹。",
          "input": "第一行H W X；接下来H行，每行W个整数。",
          "output": "输出严格大于X的格子总数。",
          "hint": "外层遍历各行，内层遍历这一行中的值；仅在value > x时让计数加一。",
          "explanation": "每个格子是否被统计，只取决于本格的值与X，无需保存邻居信息。外层读取H行，内层检查这一行的W个值，每个value > x就让全局count加一。count初始化在全部循环之前，不能每行清零。参考解按行处理，不必保留整个表格；起始代码保存grid也可以，之后再双重遍历，二者答案一致。严格大于意味着等于X不能计数。测试覆盖单格等号、长方形含负数、只有一列且全部符合、完全不符合和重复值。时间O(HW)；参考解只保存当前行，额外空间O(W)。",
          "objectives": [
            "按外层和内层次序追踪双重循环，计算总执行次数。",
            "逐行读入二维列表，通过grid[r][c]访问格子。",
            "创建独立行，区分每行状态与整个表格状态。"
          ],
          "checkpoints": [
            {
              "question": "外层执行H次、每次内层执行W次，一共访问多少格？",
              "answer": "H×W格。不是H+W，因为每一行都会完整执行一次内层循环。"
            },
            {
              "question": "为什么不能用[[0]*w]*h来创建独立的行？",
              "answer": "外层重复的是同一个行列表的引用，多行会共享；修改一行可能影响其他行。应每次重新创建行。"
            }
          ]
        },
        "en": {
          "title": "Nested loops and grids",
          "summary": "Move from individual elements to rows and columns.",
          "sections": [
            {
              "title": "Why a loop can contain another loop",
              "body": "A one-dimensional list needs one position number; a table needs a row and a column. Visiting every cell means choosing each row in turn and then choosing every column within that row. In nested loops, r identifies the outer row and c the inner column. The outer loop advances only after the inner loop finishes.\n\nFor two rows and three columns, the order is (0,0), (0,1), (0,2), then (1,0), (1,1), (1,2). Increasing both indices together would visit only a diagonal and omit cells. Predict the output count before running the coordinate example: it is H×W because every row performs W inner iterations. Swapping the loops preserves the number of visits but changes their order, which matters when maintaining per-row state.",
              "code": "h, w = 2, 3\nfor r in range(h):\n    for c in range(w):\n        print(r, c)\n",
              "output": "0 0\n0 1\n0 2\n1 0\n1 1\n1 2\n"
            },
            {
              "title": "Scope each piece of state",
              "body": "Where a variable is initialized determines how often it resets. Initialize total outside both loops for a whole-table accumulation. Initialize row_total inside the outer loop but before the inner one for a fresh total on each row. Starting a new row resets only row_total; total retains earlier rows.\n\nThe example generates rows 1,2,3 and 2,4,6. Inner iterations accumulate one row; after the inner loop, its sum is added to the overall total. Row sums are six and twelve, giving eighteen overall. Distinguish statements that run once per cell, once per row, and once per program. Avoid reusing the same loop variable name at both levels. Ask whether each statement should run H×W times, H times, or once, then place it at the matching indentation.",
              "code": "h, w = 2, 3\ntotal = 0\nfor r in range(h):\n    row_total = 0\n    for c in range(w):\n        value = (r + 1) * (c + 1)\n        row_total += value\n    total += row_total\n    print(row_total)\nprint(total)\n",
              "output": "6\n12\n18\n"
            },
            {
              "title": "Build a grid one row at a time",
              "body": "A grid is a list whose elements are themselves lists. grid[0] obtains the first whole row; grid[0][1] first selects that row, then its second element. In grid[r][c], the row comes first. A rectangular example is useful for catching swapped dimensions that a square grid might hide.\n\nStart with grid = [], read each row using the familiar one-dimensional input expression, and append that fresh row. Repeat H times. The name _ is an ordinary variable conventionally used when its value is not needed. Later, the compact form [list(map(int, input().split())) for _ in range(h)] expresses the same process as a list comprehension: evaluate one expression per iteration and collect the results. Understand the expanded loop before using that shorthand.",
              "code": "h, w = map(int, input().split())\ngrid = []\nfor _ in range(h):\n    row = list(map(int, input().split()))\n    grid.append(row)\nprint(len(grid), len(grid[0]))\nprint(grid[1][2])\n",
              "output": "2 3\n6\n",
              "exampleInput": "2 3\n1 2 3\n4 5 6\n"
            },
            {
              "title": "Give every row a fresh list",
              "body": "Do not create a zero grid with [[0] * W] * H. The outer repetition duplicates references to one row list, not independent row objects. Updating grid[0][0] can therefore change corresponding positions in other rows. This is the aliasing issue from the previous lesson, hidden inside a nested structure.\n\nA reliable expanded form creates row = [0] * W anew on every outer iteration and appends it. Repeating integer zero within one row is not the problematic part; reusing the mutable row is. The comprehension [[0] * W for _ in range(H)] also creates a fresh row each time. The example changes only one row. Such a mutation test reveals sharing that is invisible when merely printing the initial all-zero grid.",
              "code": "h, w = 2, 3\ngrid = []\nfor _ in range(h):\n    row = [0] * w\n    grid.append(row)\ngrid[0][1] = 9\nprint(grid[0])\nprint(grid[1])\n",
              "output": "[0, 9, 0]\n[0, 0, 0]\n"
            },
            {
              "title": "Values or coordinates",
              "body": "When only values matter, write for row in grid and then for value in row. No indices are needed for totals, counts, or extrema. Use row and column indices when you need coordinates, neighbors, or updates at specific positions. The two forms visit the same cells but expose different information.\n\nThe example maintains one sum per column. Initialize col_sums with W zeros, then add grid[r][c] to col_sums[c]. Each position accumulates values from the corresponding column across all rows. Do not reset this list at the start of a row. In print(*col_sums), the star unpacks list elements into separate function arguments, yielding space-separated output instead of brackets. It neither multiplies nor changes the list. Always match the output layout required by the actual task.",
              "code": "grid = [[1, 2, 3], [4, 5, 6]]\nh, w = 2, 3\ncol_sums = [0] * w\nfor r in range(h):\n    for c in range(w):\n        col_sums[c] += grid[r][c]\nprint(*col_sums)\n",
              "output": "5 7 9\n"
            },
            {
              "title": "Turn cell counting into a complete algorithm",
              "body": "The exercise has H×W candidate cells. Each cell qualifies when value > X and contributes one, not its numeric value. State these facts before coding so that a count does not accidentally become a sum. Equal numbers at different positions remain separate cells; do not remove duplicates.\n\nYou may store the whole grid and traverse it afterward, or process each row immediately because no decision depends on other rows. Streaming reduces storage but not the number of cell inspections. The starter and reference illustrate these two valid organizations. Test single rows, single columns, a nonsquare rectangle, equality with X, no qualifying cells, and all qualifying cells. Visiting each row-column combination exactly once explains both coverage and lack of duplication. Every nesting level should correspond to a specific independent choice."
            }
          ],
          "exerciseTitle": "Cells above a threshold",
          "task": "Given an H-by-W integer grid and integer X, count cells whose value is strictly greater than X. Different positions are counted separately, even when their values are equal. 1 ≤ H,W ≤ 50 and −10⁹ ≤ X,A[r][c] ≤ 10⁹.",
          "input": "The first line contains H W X. Each of the next H lines contains W integers.",
          "output": "Print the total number of cells strictly greater than X.",
          "hint": "Loop over rows, then over the values in that row. Increment the count only when value > x.",
          "explanation": "Each cell’s contribution depends only on its value and X, so no neighbor information is required. The outer loop reads H rows; the inner loop examines each of the W values and increments a single count when value > x. Initialize count before both loops, not once per row. The reference processes rows as they arrive and need not store the whole grid. The starter stores grid instead, which also works if followed by a nested traversal. Strictly greater excludes equality. Tests cover a single equal cell, a rectangular grid with negatives, a single column with all cells qualifying, no qualifying cells, and repeated values. Time is O(HW); the reference stores only the current row, using O(W) extra space.",
          "objectives": [
            "Trace outer and inner loops and calculate their total work.",
            "Read a two-dimensional list by rows and access cells with grid[r][c].",
            "Create independent rows and distinguish per-row state from whole-grid state."
          ],
          "checkpoints": [
            {
              "question": "If the outer loop runs H times and the inner loop W times per row, how many cells are visited?",
              "answer": "H×W, not H+W, because every row performs a full inner traversal."
            },
            {
              "question": "Why does [[0]*w]*h not create independent rows?",
              "answer": "The outer repetition copies references to one row list. Editing one row can affect others; create a fresh row each time."
            }
          ]
        },
        "ja": {
          "title": "二重ループと二次元リスト",
          "summary": "要素ごとの処理から、行と列の処理へ進む。",
          "sections": [
            {
              "title": "ループの中にループが必要な理由",
              "body": "一次元リストは位置の番号が 1 つですが、表には行と列の 2 つが必要です。全マスの走査は「各行を選び、その行の各列を選ぶ」と説明できます。外側の r が現在の行、内側の c がその行の列です。内側を最後まで実行してから、外側が次の行へ進みます。\n\nH=2、W=3 なら (0,0)、(0,1)、(0,2) の後に (1,0)、(1,1)、(1,2) です。r と c を同時に増やすのではありません。それでは対角線しか通らず、多くのマスを見落とします。それぞれの番号が自分のタイミングで進みます。\n\n例はデータを使わず座標だけを出します。実行前に出力行数を予測し、順に確認してください。外側の各回で W 回を実行するため、総数は H×W です。内外を入れ替えても数は同じですが順序は変わり、行ごとの状態を保持するときには重要な違いになります。",
              "code": "h, w = 2, 3\nfor r in range(h):\n    for c in range(w):\n        print(r, c)\n",
              "output": "0 0\n0 1\n0 2\n1 0\n1 1\n1 2\n"
            },
            {
              "title": "状態の初期化位置を決める",
              "body": "二重ループでは初期化の位置がリセット頻度を決めます。total を両ループの外で初期化すれば表全体の合計、row_total を外側の中・内側の前で初期化すれば現在行の合計です。次の行では row_total だけが 0 に戻り、total は前の行までの結果を保持します。\n\n例は 1 行目に 1・2・3、2 行目に 2・4・6 を作ります。内側で row_total を更新し、終了後にその行の合計を total へ加えて表示します。行合計は 6 と 12、全体は 18 です。「各マス」「各行」「プログラム全体で 1 回」の 3 種類の実行位置を区別できます。\n\n内外の変数を両方 i にすると、内側が外側の現在値を上書きして理解しにくくなります。r と c、row と value など役割を分けた名前を使います。各文が H×W 回、H 回、1 回のどれを実行すべきか考え、その答えに従ってインデントを決めると集計の誤りを修正しやすくなります。",
              "code": "h, w = 2, 3\ntotal = 0\nfor r in range(h):\n    row_total = 0\n    for c in range(w):\n        value = (r + 1) * (c + 1)\n        row_total += value\n    total += row_total\n    print(row_total)\nprint(total)\n",
              "output": "6\n12\n18\n"
            },
            {
              "title": "行ごとに二次元リストを作る",
              "body": "二次元リストは、要素もリストになっているリストです。grid[0] で最初の行全体を取り、grid[0][1] でその行の 2 番目を取ります。grid[r][c] は行が先、列が後です。H と W が違う長方形は行列の取り違えを見つけやすく、正方形だけでは誤りを隠す場合があります。\n\n入力では grid=[] から始め、既知の一次元の読み方で row を作り、grid.append(row) で追加します。H 回繰り返すので独立した H 行ができます。各行に W 個あることは合法入力の保証です。_ は普通の変数名で、値を使わない反復変数を示す慣習であり、特別な命令ではありません。\n\n展開形を理解すると、[list(map(int,input().split())) for _ in range(h)] も読めます。これはリスト内包表記で、各回で左の式を計算し結果を集めます。複数行のループを短くしただけです。初学時は展開形を残すと、行の読み込みと追加を追跡しやすくなります。",
              "code": "h, w = map(int, input().split())\ngrid = []\nfor _ in range(h):\n    row = list(map(int, input().split()))\n    grid.append(row)\nprint(len(grid), len(grid[0]))\nprint(grid[1][2])\n",
              "output": "2 3\n6\n",
              "exampleInput": "2 3\n1 2 3\n4 5 6\n"
            },
            {
              "title": "各行を独立したリストにする",
              "body": "全 0 の表を [[0]*W]*H で作ってはいけません。外側の繰り返しは 1 つの行リストへの参照を複製し、独立した行を作りません。grid[0][0] を変えると他の行の同じ位置も変わる場合があります。前課の別名参照が入れ子の内部で起きており、表示上複数行でも別の対象とは限りません。\n\n確実な展開形は、毎回 row=[0]*W を新しく作って grid へ追加するものです。整数 0 を 1 行に並べる部分ではなく、変更可能な行そのものを共有することが問題です。[[0]*W for _ in range(H)] という内包表記も毎回新しい行を作るので同じ原則です。\n\n例で最初の行の 2 列目だけを 9 に変え、次の行は全 0 のままと確認します。共有行でも変更前の見た目は正常なので、初期表示だけでは区別できません。局所的に変更し、変わるべきでない部分を観察することは、可変構造を調べる有効な方法です。",
              "code": "h, w = 2, 3\ngrid = []\nfor _ in range(h):\n    row = [0] * w\n    grid.append(row)\ngrid[0][1] = 9\nprint(grid[0])\nprint(grid[1])\n",
              "output": "[0, 9, 0]\n[0, 0, 0]\n"
            },
            {
              "title": "値を走査するか座標を走査するか",
              "body": "値だけが必要なら for row in grid、さらに for value in row と書けます。合計・個数・最大値などには添字が不要です。座標、隣のマス、指定位置の更新が必要なら r と c を range で走査し、grid[r][c] を使います。どちらも同じマスを訪れますが、利用できる情報が異なります。\n\n例は各列の和を計算します。長さ W の col_sums を 0 で作り、各格子を col_sums[c] へ加えます。位置 0 は各行の 0 列目、位置 1 は 1 列目を集めます。これを行の開始ごとに初期化すると、最後の行だけになるので、表全体を通して保持します。\n\nprint(*col_sums) の * は要素を複数の引数に展開する記号で、空白区切りに出力します。リストを変更せず、乗算でもありません。1 個ずつ print すれば各和を別行にもできますが、実際の出力形式は問題の指定に合わせます。",
              "code": "grid = [[1, 2, 3], [4, 5, 6]]\nh, w = 2, 3\ncol_sums = [0] * w\nfor r in range(h):\n    for c in range(w):\n        col_sums[c] += grid[r][c]\nprint(*col_sums)\n",
              "output": "5 7 9\n"
            },
            {
              "title": "マスの個数を数える手順を完成する",
              "body": "候補は H×W マス、条件は value>X、寄与は値そのものではなく 1 です。この 3 点を先に書けば、個数を合計と取り違えません。同じ数でも別の位置なら別の候補なので、集合で重複を除いてはいけません。位置ごとに判断します。\n\ngrid 全体を読んでから走査しても、1 行読むたび処理しても構いません。他の行に依存しないためです。後者は保存量を減らしますが訪問回数は同じです。初期コードと参考解はそれぞれの形を示しており、短さを強制する意図ではありません。保存方法と判定アルゴリズムを分けて理解します。\n\nH または W が 1 の単一行・列、H≠W の長方形を確認します。X と等しい値は除外、全て非該当なら 0、全て該当なら H×W です。各行列の組を 1 回だけ訪れるので漏れも重複もありません。単にループを増やすのではなく、各階層がどの独立した選択に対応するか説明してください。"
            }
          ],
          "exerciseTitle": "閾値より大きいマス",
          "task": "H 行 W 列の整数の表と整数 X が与えられます。値が X より真に大きいマスの個数を求めてください。同じ値でも位置が違えば別々に数えます。1 ≤ H,W ≤ 50、−10⁹ ≤ X,A[r][c] ≤ 10⁹ です。",
          "input": "1 行目に H W X、その後 H 行にそれぞれ W 個の整数が与えられます。",
          "output": "X より真に大きいマスの総数を出力してください。",
          "hint": "外側で行、内側でその行の値を走査し、value > x の場合だけ個数を 1 増やします。",
          "explanation": "各マスを数えるかは、その値と X だけで決まるため隣接情報は不要です。外側で H 行を読み、内側で W 個を調べ、value > x の場合だけ全体の count を増やします。count は両ループの前で初期化し、行ごとに消してはいけません。参考解は読みながら処理するため全表を保存しません。初期コードのように grid を保存してから二重に走査しても正しく解けます。「真に大きい」ので等しい値は除外します。単一マスの等号、負数を含む長方形、1 列で全部該当、全部非該当、重複値をテストします。時間 O(HW)、参考解の追加領域は現在の行の O(W) です。",
          "objectives": [
            "外側と内側の実行順を追い、総反復回数を数える。",
            "行ごとに二次元リストを読み、grid[r][c] で参照する。",
            "各行を独立して作り、行単位と表全体の状態を区別する。"
          ],
          "checkpoints": [
            {
              "question": "外側 H 回、各回の内側 W 回なら、何マス訪問しますか。",
              "answer": "H×W マスです。各行で内側を全部実行するので H+W ではありません。"
            },
            {
              "question": "[[0]*w]*h で独立した行を作れない理由は何ですか。",
              "answer": "同じ行リストへの参照を繰り返すため共有されます。各回で新しい行を作る必要があります。"
            }
          ]
        }
      },
      "starter": "h, w, x = map(int, input().split())\ngrid = []\nfor _ in range(h):\n    row = list(map(int, input().split()))\n    grid.append(row)\n# TODO\n",
      "solution": "h, w, x = map(int, input().split())\ncount = 0\nfor _ in range(h):\n    row = list(map(int, input().split()))\n    for value in row:\n        if value > x:\n            count += 1\nprint(count)\n",
      "tests": [
        {
          "input": "1 1 5\n5\n",
          "expected": "0\n"
        },
        {
          "input": "2 3 0\n-2 0 4\n3 -1 2\n",
          "expected": "3\n"
        },
        {
          "input": "3 1 -5\n-4\n0\n8\n",
          "expected": "3\n"
        },
        {
          "input": "2 2 10\n1 2\n3 4\n",
          "expected": "0\n"
        },
        {
          "input": "2 3 2\n2 3 2\n3 2 3\n",
          "expected": "3\n"
        }
      ]
    },
    {
      "id": "functions",
      "order": 8,
      "stage": "python",
      "minutes": 55,
      "prerequisiteIds": [
        "nested-loops"
      ],
      "relatedProblems": [
        "APG4bPython EX13",
        "ABC083B"
      ],
      "content": {
        "zh": {
          "title": "函数与拆解",
          "summary": "把一段可重复的计算命名。",
          "sections": [
            {
              "title": "为一段计算定义清楚的接口",
              "body": "程序逐渐变长时，重复复制一段计算容易在修改时漏掉某个副本。函数给这段计算起一个名字，并明确它需要哪些值、返回什么结果。调用者不必每次重新展开内部步骤，只要遵守这个约定。函数不仅为了减少代码长度，也帮助你把一个问题拆成可以分别检查的小部分。\n\ndef square(x):定义名为square的函数，x是参数，是每次调用传入的值在函数内使用的名字。下一行缩进的return x*x计算平方并把结果交还调用者。定义阶段不会计算某个具体数；square(4)才是一次调用。括号里的4叫实参，它本次赋给参数x。\n\n函数名应该描述工作，而不是叫function1之类难以区分的名称。先写一句契约：“接收一个整数，返回它的平方”。明确契约后，可以独立测试0、正数、负数，再把函数放进更大的程序。调用前函数定义必须已经执行，否则Python找不到这个名字。",
              "code": "def square(x):\n    return x * x\n\nprint(square(0))\nprint(square(4))\nprint(square(-3))\n",
              "output": "0\n16\n9\n"
            },
            {
              "title": "逐步追踪一次调用",
              "body": "执行answer=square(4)+square(3)时，不是把函数里的代码原样当成文字替换。Python先调用square(4)，建立本次局部参数x=4，计算并返回16；再调用square(3)，这次x=3，返回9；最后外层把16与9相加，赋给answer得到25。每次调用有自己的局部状态。\n\n函数可以接收多个参数，例如total_cost(price,quantity)。参数顺序有意义：total_cost(12,5)把12交给price、5交给quantity。名字能帮助说明含义，但Python不会根据数值大小猜哪个是价格。调用时应与定义的接口一致，不要少传或多传必需参数。\n\n下面函数先计算subtotal，再加固定费用2。外层的budget不会因为函数内部计算而改变。把调用过程画成“传入12和5→内部得到60→返回62→外层减去62”有助于区分函数内部与调用者的状态。返回后，程序从调用位置继续执行，不会重新从文件开头开始。",
              "code": "def total_cost(price, quantity):\n    subtotal = price * quantity\n    return subtotal + 2\n\nbudget = 100\ncost = total_cost(12, 5)\nprint(cost)\nprint(budget - cost)\n",
              "output": "62\n38\n"
            },
            {
              "title": "return 返回值，print 产生输出",
              "body": "print把内容写到输出区域；return把值交给调用者。一个函数可以返回数值而完全不显示任何东西，也可以显示文字却不返回有用的结果。若你还要把结果参与后续运算，应使用return，而不是仅仅在函数内print。屏幕上看到答案，并不等于调用表达式得到了这个数。\n\n函数执行到结尾但没有return，返回的是None，表示没有特定结果。起始代码中的pass也是一个“暂时什么也不做”的合法占位语句，并不会自动完成计算。调用这样的函数后再print，会显示None。修复方法是实现计算并返回答案，而不是试图把None转换成整数。\n\nreturn还会立刻结束本次函数，后面的语句不再执行。因此把return误放在循环内部，可能只处理第一个元素就返回。下面把求和循环全部完成后才return，外层既可以打印结果，也可以再次使用它。通过缩进确认return的位置，是检查函数最重要的步骤之一。",
              "code": "def list_total(values):\n    total = 0\n    for value in values:\n        total += value\n    return total\n\nanswer = list_total([2, 3, 4])\nprint(answer)\nprint(answer * 2)\n",
              "output": "9\n18\n"
            },
            {
              "title": "局部名字、重新赋值与可变对象",
              "body": "函数内创建的名字通常是局部变量，只属于这次调用。外面有n=20，调用half(n)把这个整数传给参数x；内部x//=2只把局部x重新绑定到10，外面的n仍为20。参数名可以与外面的变量名相同，但并不因此成为同一个名字。初学时用不同名字追踪，更容易看出边界。\n\n不要把上面的结论误推广为“函数永远不能影响外部数据”。如果传入列表，参数会引用同一个可变列表，内部执行values[0]=9就会改到调用者看到的对象。这与上一课的别名完全一致。只读计算函数应尽量不修改输入；确实要修改时，应在契约中明确说明。\n\n本课digit_sum接收整数，每轮用n//=10丢掉末位，属于局部重新赋值，调用者的整数不受影响。也不需要global关键字。让函数通过参数接收数据、通过return交回结果，能减少隐蔽依赖，独立测试时只需给定参数即可。",
              "code": "def half(x):\n    x //= 2\n    return x\n\nn = 20\nanswer = half(n)\nprint(answer)\nprint(n)\n",
              "output": "10\n20\n"
            },
            {
              "title": "把输入、计算和输出分离",
              "body": "完整程序通常可以分成三层：主程序按题目格式读取数据；函数完成一项明确计算；主程序把返回值按题目要求输出。这样函数既能用于真实输入，也能直接用手写参数测试。若函数内部每次都input，它就依赖输入行顺序，测试和复用都会变得困难。\n\n下面函数rectangle_area接收长与宽，返回面积。主程序读取一行两个整数、调用函数、输出结果。为了检查函数，可以另外在学习时调用rectangle_area(1,1)或rectangle_area(0,5)，但正式程序必须只处理题目要求的输入和输出，不能把测试调用一起留在提交结果中。\n\n分解时不要为每一行代码都创建一个函数。优先提取有清晰含义、会重复使用或值得单独验证的计算。例如“计算数位和”是完整任务，“把答案加一”是否值得抽取要看上下文。函数数量不是质量指标，接口清楚、依赖少、每个部分能解释和测试才是目的。",
              "code": "def rectangle_area(height, width):\n    return height * width\n\nh, w = map(int, input().split())\narea = rectangle_area(h, w)\nprint(area)\n",
              "output": "24\n",
              "exampleInput": "6 4\n"
            },
            {
              "title": "为数位和建立状态与契约",
              "body": "练习要求非负整数的十进制数位和。例如307的结果是3+0+7=10，不是求这个数除以10的商，也不是统计有几位。函数名digit_sum表达这个任务。先把输入约定写成n≥0，输出约定写成“一个非负整数，等于所有数位的和”。本题不需要处理负号，因此不应额外设计题目没有要求的负数规则。\n\n利用前面学过的余数与整除：n%10取最后一位，n//10去掉最后一位。307依次取出7、0、3，未处理部分依次变成30、3、0。total相应变成7、7、10。数字被倒序取出不影响总和，因为加法顺序不改变结果。\n\ntotal初始为0，循环条件n>0，每轮删除一位保证结束。return必须写在循环后。n=0时循环零次，也应返回0；单数位则一次就结束。用这些小例子先验证函数，再接上input和print。能够解释每轮total与n的含义，比只记住这段while代码更有助于迁移到数位计数、进制转换等后续问题。"
            }
          ],
          "exerciseTitle": "数位和",
          "task": "给定非负整数 N，输出其十进制数位之和。请实现 digit_sum(n)，然后调用它输出结果。0 ≤ N ≤ 10¹⁸。",
          "input": "一个整数 N。",
          "output": "输出 N 的数位和。",
          "hint": "n % 10 取末位，n //= 10 去掉末位。累积变量从 0 开始，n = 0 时也应返回 0。",
          "explanation": "函数的契约是接收非负整数n，返回其十进制数位和。total从0开始，while n>0时用n%10取末位，累加后用n//=10删除末位。每轮后，total是已经删除的数位之和，n保存尚未处理的高位，因此最终n=0时total正好是全部数位之和。输入0不会进入循环，仍返回0。主程序只读取N、调用digit_sum并打印返回结果，不在函数内部额外输出。测试0、单数位、夹杂0的多位数以及大整数，检查空循环、取余和整数精度。若十进制位数为D，循环D次，时间O(D)，额外空间O(1)。",
          "objectives": [
            "定义参数和返回值，把计算与输入输出分开。",
            "追踪调用时的局部变量，分清 return、print 与提前结束。",
            "为函数说明输入约定和结果含义，用小测试验证数位处理。"
          ],
          "checkpoints": [
            {
              "question": "函数内print(answer)与return answer有什么不同？",
              "answer": "print把内容写到输出；return把值交还调用者。后续需要计算时应返回值，必要时由外层打印。"
            },
            {
              "question": "digit_sum里反复修改局部n，为什么不会把外层整数变量改掉？",
              "answer": "参数n是函数内部的名字；整数不可变，局部重新赋值只改变这个名字的绑定，不会改动外层名字。"
            },
            {
              "question": "为什么n=0也应得到正确结果？",
              "answer": "total先初始化为0；while n>0一次不执行，最后return total，因此返回0。"
            }
          ]
        },
        "en": {
          "title": "Functions and decomposition",
          "summary": "Give a reusable calculation a name.",
          "sections": [
            {
              "title": "Give a calculation an interface",
              "body": "As a program grows, copying a calculation creates multiple versions that can drift apart. A function names the calculation and specifies what values it needs and what result it returns. Callers can use that contract without repeating the internal steps. The benefit is not merely shorter code: separately defined work can be tested independently.\n\ndef square(x): defines square with parameter x, a local name for a value supplied by a call. The indented return x * x computes and returns the result. Defining the function does not square a particular number; square(4) calls it with argument four. State a contract before coding: “accept an integer and return its square.” Test zero, positive, and negative values. The definition must have executed before a call can use the function’s name.",
              "code": "def square(x):\n    return x * x\n\nprint(square(0))\nprint(square(4))\nprint(square(-3))\n",
              "output": "0\n16\n9\n"
            },
            {
              "title": "Trace a function call",
              "body": "For answer = square(4) + square(3), Python does not substitute source text mechanically. It calls square with local x equal to four and receives sixteen, then calls it with x equal to three and receives nine. The caller adds those results to obtain twenty-five. Each call has its own local state.\n\nA function may take several parameters, such as total_cost(price, quantity). Argument order matters: total_cost(12, 5) supplies twelve as price and five as quantity. Python does not infer roles from numeric values. In the example, the function calculates a subtotal and adds a fixed fee. Trace “inputs 12 and 5, subtotal 60, returned result 62, remaining budget 38.” After returning, execution resumes at the call site rather than restarting the file.",
              "code": "def total_cost(price, quantity):\n    subtotal = price * quantity\n    return subtotal + 2\n\nbudget = 100\ncost = total_cost(12, 5)\nprint(cost)\nprint(budget - cost)\n",
              "output": "62\n38\n"
            },
            {
              "title": "Returning is different from printing",
              "body": "print writes output; return supplies a value to the caller. A function can return a number without displaying anything, or display text without returning a useful result. If later computation needs the result, return it. Seeing a number on screen does not mean the call expression evaluated to that number.\n\nA function reaching its end without return yields None. The starter’s pass is a valid placeholder that does nothing, not an automatic solution. Implement the computation and return its answer rather than trying to convert None into an integer. return also ends the call immediately, so placing it inside a loop may stop after one element. The example returns only after all additions, allowing the caller to print and reuse the sum. Check the return statement’s indentation carefully.",
              "code": "def list_total(values):\n    total = 0\n    for value in values:\n        total += value\n    return total\n\nanswer = list_total([2, 3, 4])\nprint(answer)\nprint(answer * 2)\n",
              "output": "9\n18\n"
            },
            {
              "title": "Local names and mutable objects",
              "body": "Names created inside a function are usually local to that call. If n is twenty and half(n) receives it as x, x //= 2 rebinds local x to ten while the caller’s n remains twenty. Equal-looking variable names inside and outside a function do not automatically identify the same binding.\n\nDo not conclude that functions can never affect outside data. A list argument can refer to the same mutable object as the caller’s list, so values[0] = 9 would modify that shared object. This is the aliasing behavior already studied. A read-only calculation should avoid modifying its inputs; intentional mutation belongs in the contract. digit_sum receives an immutable integer and only rebinds its local parameter. Parameters and return values avoid hidden global dependencies and make independent tests straightforward.",
              "code": "def half(x):\n    x //= 2\n    return x\n\nn = 20\nanswer = half(n)\nprint(answer)\nprint(n)\n",
              "output": "10\n20\n"
            },
            {
              "title": "Separate input, computation, and output",
              "body": "A complete program often has three parts: the main program reads the required format, a function performs a well-defined calculation, and the main program prints the returned result. The same function can then be tested with literal arguments without constructing input text. If it calls input internally, it becomes coupled to the input stream’s order and is harder to test or reuse.\n\nThe example separates rectangle_area from reading and printing. During learning, additional calls such as rectangle_area(1, 1) can test the function, but do not leave diagnostic calls in a judged program’s output. Nor should every line become a separate function. Extract work with a clear meaning, reuse, or independent testing value. The aim is understandable interfaces and limited dependencies, not the largest possible function count.",
              "code": "def rectangle_area(height, width):\n    return height * width\n\nh, w = map(int, input().split())\narea = rectangle_area(h, w)\nprint(area)\n",
              "output": "24\n",
              "exampleInput": "6 4\n"
            },
            {
              "title": "Derive the digit-sum contract",
              "body": "The exercise requests a nonnegative integer’s decimal digit sum. For 307 the result is 3 + 0 + 7 = 10, not its quotient by ten or its number of digits. Specify the contract: input n is nonnegative; the returned integer is the sum of its digits. No rule for negative signs is required.\n\nUse familiar arithmetic: n % 10 extracts the last digit and n // 10 removes it. For 307, extracted digits are seven, zero, and three; unprocessed values become thirty, three, and zero. Totals become seven, seven, and ten. Reversed extraction does not affect a sum. Initialize total before the loop, use n > 0, and return after the loop. Zero must work without any iteration. Explain the meaning of both variables before adapting this pattern to later digit problems."
            }
          ],
          "exerciseTitle": "Digit sum",
          "task": "Given a nonnegative integer N, print the sum of its decimal digits. Implement digit_sum(n), then call it to produce the output. 0 ≤ N ≤ 10¹⁸.",
          "input": "One integer N.",
          "output": "Print the digit sum of N.",
          "hint": "n % 10 extracts the last digit; n //= 10 removes it. Start the sum at 0 so that n = 0 also returns 0.",
          "explanation": "The function’s contract is to accept a nonnegative integer n and return the sum of its decimal digits. Start total at zero. While n is positive, extract the last digit using n % 10, add it, and remove it using n //= 10. After every iteration, total contains the sum of removed digits while n retains the unprocessed prefix. When n becomes zero, all digits have contributed. Input zero skips the loop and correctly returns zero. The main program reads N, calls digit_sum, and prints the returned value; the function needs no output of its own. Tests cover zero, one digit, internal zeros, and a large integer. With D digits, time is O(D) and extra space is O(1).",
          "objectives": [
            "Define parameters and return values, separating calculation from input and output.",
            "Trace local variables and distinguish returning, printing, and early exit.",
            "Specify a function’s input contract and result, then test digit processing on small cases."
          ],
          "checkpoints": [
            {
              "question": "How do print(answer) and return answer differ inside a function?",
              "answer": "print writes output; return supplies a value to the caller. Return values needed in later calculations, then print them outside if required."
            },
            {
              "question": "Why does repeatedly rebinding local n inside digit_sum not change the caller’s integer variable?",
              "answer": "The parameter is a local name. Integers are immutable, and rebinding that name does not rebind the caller’s name."
            },
            {
              "question": "Why does the algorithm handle n=0?",
              "answer": "total starts at zero; while n>0 executes no iterations; returning total therefore produces zero."
            }
          ]
        },
        "ja": {
          "title": "関数と分解",
          "summary": "繰り返し使う計算に名前を付ける。",
          "sections": [
            {
              "title": "計算に明確な受け渡し口を作る",
              "body": "プログラムが長くなると、同じ計算をコピーした箇所の一部だけ修正し忘れることがあります。関数は計算に名前を付け、必要な値と返す結果を明確にします。呼び出し側は内部の手順を毎回展開せず、約束に従って使えます。短縮だけでなく、問題を個別に確認できる部分へ分けるための仕組みです。\n\ndef square(x): は square という関数を定義し、x は呼び出しで渡す値を内部で使う名前です。下げた行の return x*x は平方を計算して呼び出し元へ返します。定義しただけでは特定の数を計算せず、square(4) が実際の呼び出しです。括弧内の 4 が実引数で、今回の x に渡されます。\n\n名前は仕事を説明するものにします。「整数を受け取り平方を返す」と契約を書き、0・正数・負数を独立に試せます。呼び出しの前には定義が実行済みでなければなりません。まだ作られていない関数名を Python は見つけられません。",
              "code": "def square(x):\n    return x * x\n\nprint(square(0))\nprint(square(4))\nprint(square(-3))\n",
              "output": "0\n16\n9\n"
            },
            {
              "title": "1 回の呼び出しを順に追う",
              "body": "answer=square(4)+square(3) では、コードを文字として置換するわけではありません。まず square(4) を呼び、局所的な x=4 で 16 を返します。次に square(3) が x=3 で 9 を返し、外側で足して answer=25 になります。各呼び出しは別々の局所状態を持ちます。\n\ntotal_cost(price,quantity) のように複数の引数も受け取れます。順番に意味があり、total_cost(12,5) は price に 12、quantity に 5 を渡します。名前が役割を説明しても、Python が数値から価格を推測するわけではありません。定義の契約どおりに必要な個数を渡します。\n\n例の関数は小計を求め、固定料金 2 を加えます。budget は内部の計算で変化しません。「12 と 5 を渡す→小計 60→62 を返す→外側で引く」と追うと内外の状態を区別できます。return 後は呼び出した場所の続きへ戻り、ファイル先頭から再実行するのではありません。",
              "code": "def total_cost(price, quantity):\n    subtotal = price * quantity\n    return subtotal + 2\n\nbudget = 100\ncost = total_cost(12, 5)\nprint(cost)\nprint(budget - cost)\n",
              "output": "62\n38\n"
            },
            {
              "title": "返すことと表示することは違う",
              "body": "print は出力欄へ書き、return は呼び出し元へ値を渡します。関数は何も表示せず数値を返すことも、文字を表示して有用な値を返さないこともできます。後続の計算に使う結果は return で返します。画面に数が出たことと、呼び出し式がその数を得たことは別です。\n\nreturn なしで末尾へ達した関数は None を返します。初期コードの pass も「今は何もしない」という合法な仮置き文で、自動的に計算してくれません。その結果を print すると None が出ます。None を整数へ変えるのではなく、処理を実装して答えを返すよう修正します。\n\nreturn はその呼び出しを直ちに終了するため、後の文は実行されません。ループ内へ置き間違えると最初の要素だけで終了することがあります。例は全て加算してから return し、外側で表示も再利用もできます。return のインデントが適切かは、関数を確認する重要なポイントです。",
              "code": "def list_total(values):\n    total = 0\n    for value in values:\n        total += value\n    return total\n\nanswer = list_total([2, 3, 4])\nprint(answer)\nprint(answer * 2)\n",
              "output": "9\n18\n"
            },
            {
              "title": "局所名・再代入・変更可能な対象",
              "body": "関数内で作る名前は通常、その呼び出しに属する局所変数です。外に n=20 があり half(n) の引数 x へ渡しても、x//=2 は局所的な x を 10 へ再代入するだけで、外の n は 20 のままです。内外で同じ綴りの名前を使っても、自動的に同じ束縛にはなりません。初めは別名で追うと境界が分かりやすくなります。\n\nただし「関数は外部のデータに影響しない」と一般化してはいけません。リストを渡すと同じ変更可能な対象を参照するので、values[0]=9 は呼び出し元から見えるリストも変えます。前課の別名参照と同じです。読み取り専用の計算なら入力を変更せず、意図して変更するなら契約で説明します。\n\ndigit_sum の n//=10 は整数の局所的な再代入なので、呼び出し元の整数には影響しません。global も必要ありません。引数で受け取り、return で返す構造にすると隠れた依存が減り、引数を与えるだけで個別に試せます。",
              "code": "def half(x):\n    x //= 2\n    return x\n\nn = 20\nanswer = half(n)\nprint(answer)\nprint(n)\n",
              "output": "10\n20\n"
            },
            {
              "title": "入力・計算・出力を分離する",
              "body": "全体を 3 部分に分けられます。メイン処理が指定形式の入力を読み、関数が明確な計算を行い、メイン処理が返り値を指定形式で出します。同じ関数を、入力文字列を作らず直接数値の引数で試せます。関数内部で毎回 input すると、入力の行順に依存して再利用や確認が難しくなります。\n\n例の rectangle_area は縦横から面積を返すだけです。主処理が 2 整数を読み、関数を呼び、結果を表示します。学習中は rectangle_area(1,1) や rectangle_area(0,5) も試せますが、提出では確認用の追加出力を残さず、問題が指定したデータだけを処理します。\n\nすべての 1 行を関数にする必要もありません。明確な仕事、再利用する処理、個別に検証したい計算を優先します。「各桁の和」はまとまった役割ですが、「答えへ 1 を加える」を独立させる価値は状況次第です。数を増やすのでなく、契約を明確にして説明と検証を容易にすることが目的です。",
              "code": "def rectangle_area(height, width):\n    return height * width\n\nh, w = map(int, input().split())\narea = rectangle_area(h, w)\nprint(area)\n",
              "output": "24\n",
              "exampleInput": "6 4\n"
            },
            {
              "title": "桁の和の状態と契約を作る",
              "body": "演習は非負整数の十進各桁の和です。307 なら 3+0+7=10 で、10 で割った商でも桁数でもありません。digit_sum という名前が役割を表します。入力条件は n≥0、返り値は全桁の和に等しい非負整数です。負号の処理は要求されていないので、不要な規則を追加しません。\n\n既に学んだ余りと整数除算を使います。n%10 が末尾の桁、n//10 が末尾を除いた部分です。307 では 7・0・3 を取り出し、未処理部分は 30・3・0、total は 7・7・10 になります。加算の結果は順序によらないため、逆から取り出しても問題ありません。\n\ntotal を 0 で始め、n>0 の間だけ繰り返します。毎回 1 桁減るので終了し、return はループ後へ置きます。n=0 は 0 回、1 桁なら 1 回で終わります。小さい例で関数を確認してから入出力を接続します。2 変数の意味を説明できれば、桁の個数や進数変換などへも考え方を応用できます。"
            }
          ],
          "exerciseTitle": "各桁の和",
          "task": "非負整数 N が与えられます。十進表記の各桁の和を出力してください。digit_sum(n) を実装し、呼び出して結果を表示してください。0 ≤ N ≤ 10¹⁸ です。",
          "input": "整数 N が 1 個与えられます。",
          "output": "N の各桁の和を出力してください。",
          "hint": "n % 10 で末尾の桁を取り出し、n //= 10 でその桁を除きます。合計を 0 から始めれば n = 0 にも対応できます。",
          "explanation": "関数の契約は、非負整数 n を受け取り、十進各桁の和を返すことです。total を 0 で開始し、n>0 の間、n%10 で末尾を取り出して加え、n//=10 でその桁を除きます。各回の後、total は除いた桁の和、n は未処理の上位部分なので、n=0 なら全桁の和が得られています。入力 0 はループを飛ばして 0 を返します。メイン処理は入力、呼び出し、返り値の出力だけを担当し、関数内では余計な表示をしません。0・1 桁・内部に 0 を含む数・大整数で境界と整数処理を確認します。桁数 D に対して時間 O(D)、追加領域 O(1) です。",
          "objectives": [
            "引数と返り値を定義し、計算と入出力を分ける。",
            "呼び出し中の局所変数を追い、return・print・早期終了を区別する。",
            "入力条件と結果の意味を定め、小さい例で桁処理を検証する。"
          ],
          "checkpoints": [
            {
              "question": "関数内の print(answer) と return answer はどう違いますか。",
              "answer": "print は出力へ書き、return は呼び出し元へ値を渡します。後で計算に使う値は返し、必要なら外側で表示します。"
            },
            {
              "question": "digit_sum 内で n を更新しても外側の整数変数が変わらない理由は何ですか。",
              "answer": "仮引数 n は局所的な名前です。整数は変更不能で、局所名の再代入は呼び出し元の名前を変えません。"
            },
            {
              "question": "n=0 を正しく処理できる理由は何ですか。",
              "answer": "total を 0 で始め、while n>0 は 0 回実行されます。そのまま total を返すので 0 です。"
            }
          ]
        }
      },
      "starter": "def digit_sum(n):\n    # TODO\n    pass\n\nn = int(input())\nprint(digit_sum(n))\n",
      "solution": "def digit_sum(n):\n    total = 0\n    while n > 0:\n        total += n % 10\n        n //= 10\n    return total\n\nn = int(input())\nprint(digit_sum(n))\n",
      "tests": [
        {
          "input": "0\n",
          "expected": "0\n"
        },
        {
          "input": "7\n",
          "expected": "7\n"
        },
        {
          "input": "1002003\n",
          "expected": "6\n"
        },
        {
          "input": "999999999999999999\n",
          "expected": "162\n"
        }
      ]
    },
    {
      "relatedProblems": [
        "APG4bPython EX12",
        "ABC300A"
      ],
      "starter": "n = int(input())\na = list(map(int, input().split()))\n# Repair initialization, equality, and output indexing.\nbest, position = 0, 0\nfor i in range(n):\n    if a[i] >= best:\n        best, position = a[i], i\nprint(position, best)\n",
      "solution": "n = int(input())\na = list(map(int, input().split()))\nbest, position = a[0], 0\nfor i in range(1, n):\n    if a[i] > best:\n        best, position = a[i], i\nprint(position + 1, best)\n",
      "tests": [
        {
          "input": "1\n-7\n",
          "expected": "1 -7\n"
        },
        {
          "input": "4\n-4 7 7 2\n",
          "expected": "2 7\n"
        },
        {
          "input": "3\n0 0 0\n",
          "expected": "1 0\n"
        },
        {
          "input": "4\n9 5 3 1\n",
          "expected": "1 9\n"
        },
        {
          "input": "3\n-1000000000 0 1000000000\n",
          "expected": "3 1000000000\n"
        }
      ],
      "content": {
        "zh": {
          "exerciseTitle": "修复最大值位置",
          "task": "给定N个整数，输出最大值第一次出现的位置（从1开始）及最大值。起始代码故意包含逻辑错误，请修复。1≤N≤200000，−10⁹≤Aᵢ≤10⁹。",
          "input": "第一行N，第二行N个整数。",
          "output": "输出位置和最大值，以空格分隔。",
          "hint": "用第一个元素初始化；相等时保留旧位置；最后转换为从1开始。",
          "explanation": "先用A[0]建立合法最大值，逐个扫描其余元素。只有严格更大的值才能替换已有最大值与位置，因此并列最大值保留最早下标。循环结束后输出position+1和best。单元素输入不进入循环但初值已是答案。每个元素检查一次，时间O(N)，读取列表空间O(N)，扫描额外空间O(1)。",
          "title": "调试：把错误变成可解释的证据",
          "summary": "从最小反例、变量追踪和不变式入手，定位错误而不是猜改。",
          "sections": [
            {
              "title": "先把“错了”改写成一个问题",
              "body": "程序出错时，先区分三件事：读入的数据是否符合预期，计算的结果是否符合题意，输出是否符合格式。SyntaxError 意味着代码还没有执行；运行时异常表示某一步无法继续；WA 则说明程序正常结束但答案错误。它们需要不同的证据。不要看到 WA 就随便修改比较符号，也不要看到异常就用 try 包住整段代码。先记录一个能复现问题的输入、题目要求的输出、程序实际输出，把这三个对象放在一起。这样“感觉不对”会变成“在第三个元素之后计数多了一次”之类可检查的假设。调试的目标是说明错误为什么出现，而不仅是让眼前一个样例通过。"
            },
            {
              "title": "读报错，而不是跳过报错",
              "body": "Python 的 traceback 通常应从末尾读起：最后一行给出异常类型和原因，其上方指出发生异常的位置。IndexError 常见于访问 a[n]，因为最后一个合法下标是 n-1；ValueError 常见于把整行“3 4”交给 int；NameError 常见于变量拼写不同或使用前没有赋值。报错行不一定是根因：某个函数提前返回 None，后面参与加法才会报 TypeError。沿着数据来源往前追，确认每个变量的类型和含义。对于循环，尤其检查第一次与最后一次迭代。Python 的 a[-1] 是合法访问，越界方向不同可能不会报错，因此“没有异常”并不能证明下标正确。"
            },
            {
              "title": "构造最小反例",
              "body": "本课要输出最大值第一次出现的位置。若把当前最大值初始化为 0，正数样例可能全对，但输入 [-7] 就足以证明错误：最大值应该是 -7，程序却可能保留 0。若遇到相等值也更新位置，输入 [5,5] 就会暴露“第一次”被改成“最后一次”的错误。把大输入缩减成这样的两三项，有助于排除无关因素。缩减时必须保持题目的约束，不能用 N=0 来指责一个明确要求 N≥1 的程序。每发现一个错误，就留下对应输入作为回归测试；改完一个条件后重新运行这些输入，防止修正重复值时破坏全负数的情况。"
            },
            {
              "title": "按时间记录变量",
              "body": "对于 [-4,7,7,2]，先保存 best=-4、position=0。读到下标 1 的 7 时，7>-4 成立，更新为 best=7、position=1。读到下标 2 的 7 时，严格大于不成立，两个变量都保持不变。读到 2 时也不更新，最后把内部下标 1 转换为题目位置 2。跟踪表应写出“处理前状态、当前元素、条件、处理后状态”，而不是只写最终答案。临时打印可以送到标准错误，避免污染正式输出；提交前删掉不必要的诊断。这里使用固定列表，便于你先手算再运行，核对每一行。",
              "code": "a = [-4, 7, 7, 2]\nbest, position = a[0], 0\nfor i in range(1, len(a)):\n    if a[i] > best:\n        best, position = a[i], i\n    print(i, best, position)\nprint(position + 1, best)",
              "output": "1 7 1\n2 7 1\n3 7 1\n2 7\n"
            },
            {
              "title": "用不变式说明修复",
              "body": "不变式是每轮循环都应成立的陈述。本例可以写成：处理完下标 0 到 i 的元素后，best 是这些元素的最大值，position 是这个最大值最早出现的下标。初始化用第一个实际元素，因此陈述在只处理第一项时成立。新元素更大时，它成为唯一的新最大值；新元素相等或更小时，旧最大值和最早位置都仍然有效。每轮都保存了这个性质，所以扫描结束时就得到整段列表的答案。这比“样例都过了”更有说服力，也能直接解释为什么比较必须用 >，为什么不能随意选择 0 当初值。"
            },
            {
              "title": "把测试组织成不同类别",
              "body": "边界测试不是多输几个随机数。先列出每一种可能改变程序分支的情况：只有一个元素、全部为负、最大值重复、最大值在开头、最大值在末尾、存在 0、数值达到约束端点。一个输入可以覆盖多种情况，但不能让所有输入都具有相同形状。然后准备一个独立的朴素校验器，例如先用 max 找最大值，再用 index 找第一次出现的位置。对短列表比较两个实现，能够发现手写循环的问题；不要让校验器复制被测程序的同一个循环，否则两个版本可能共享同一错误。自动测试提供证据，不取代对题意和不变式的理解。"
            },
            {
              "title": "调试工作坊：一次只检验一个假设",
              "body": "拿到一个失败程序时，先复制一份原始代码和失败输入，再开始修改。假设你发现输出位置少了1，可以只修改最后输出，验证N=1和最大值在末尾的输入；这一步不应该顺便改初始化或比较规则。接着用全负数测试验证初始值，用重复最大值测试验证更新条件。把修复按原因分开，能够知道是哪条改变带来了效果，也能在新错误出现时撤回最小改动。对于每个测试，先手算答案再运行，而不是看到输出后再解释它。\n\n还可以做变形测试：给所有元素都加上同一个常数，最大值的位置应不变，输出最大值应增加该常数；在末尾追加一个严格小于原最大值的数，最早最大位置不应改变；追加一个与最大值相等的数，位置仍应不变。这些关系无需另写复杂正解器，就能检验程序是否真正遵守题意。不过任意重排并不保持“第一次位置”，所以不能把排序当成这个问题的测试变换。最后阅读自己的修复说明，确保能回答初始状态为何合法、每轮保留了什么、输出为何只转换一次下标。只有这三点都明确，调试才从碰运气变成可以复用的方法。"
            }
          ],
          "objectives": [
            "根据异常类型选择检查方向",
            "构造最小反例并追踪变量",
            "用不变式验证初值与比较符号"
          ],
          "checkpoints": [
            {
              "question": "为什么最大值不能总从0开始？",
              "answer": "输入可能全部为负，0甚至不是输入元素。应从第一个实际值开始。"
            },
            {
              "question": "为什么相等时不更新位置？",
              "answer": "旧位置更早，更新会把第一次出现变成最后一次。"
            }
          ]
        },
        "en": {
          "exerciseTitle": "Repair the maximum position",
          "task": "Given N integers, output the first one-based position of the maximum and the maximum itself. The starter intentionally contains logical errors; repair them. 1≤N≤200000; −10⁹≤Aᵢ≤10⁹.",
          "input": "N, then a line of N integers.",
          "output": "Print the position and maximum separated by a space.",
          "hint": "Initialize from the first element, retain the index on equality, and convert the final index.",
          "explanation": "Initialize from A[0], then inspect each remaining element. Only a strictly larger value replaces both the maximum and its index, preserving the earliest occurrence among ties. Print position+1 and best after the loop. For one element the loop is empty and initialization already gives the answer. Time is O(N), input storage O(N), and extra scanning space O(1).",
          "title": "Debugging with evidence",
          "summary": "Use small counterexamples, state traces, and invariants instead of speculative edits.",
          "sections": [
            {
              "title": "Turn failure into a precise question",
              "body": "First separate input interpretation, computation, and output formatting. A SyntaxError means the program did not start; a runtime exception identifies an operation that could not continue; a wrong answer means execution finished with the wrong result. These require different evidence. Do not replace comparison signs at random or hide an entire program inside try. Keep a reproducible input, the required output, and the actual output together. Replace “something looks wrong” with a claim such as “the counter increases twice after the third item.” A repair should explain why the failure happened, not merely make one sample pass."
            },
            {
              "title": "Read the exception from the bottom",
              "body": "Read a Python traceback from its final line: it names the exception and reason, while nearby lines locate the failing operation. IndexError often comes from accessing a[n], ValueError from passing a whole line such as “3 4” to int, and NameError from spelling or initialization mistakes. The failing line need not be the root cause: a function might return None earlier and only fail when its result is added. Follow the value backwards and inspect its type and meaning. Check the first and last loop iterations. Remember that a[-1] is valid Python, so an incorrect negative index may silently return an unrelated element."
            },
            {
              "title": "Shrink a counterexample",
              "body": "The exercise asks for the first position of the maximum. Initializing the current maximum to zero may pass every positive sample, yet [-7] is enough to disprove it. Updating the position on equality is exposed by [5,5]: the required first occurrence becomes the last. Reduce a large failure to two or three relevant values so unrelated state cannot distract you. Keep the reduced input inside the stated constraints; N=0 is not a valid objection to a task promising N at least one. Preserve each discovered counterexample as a regression test and rerun the collection after every repair."
            },
            {
              "title": "Trace state through time",
              "body": "For [-4,7,7,2], initialize best=-4 and position=0. At index 1, seven is strictly larger, so both variables change. At index 2, equality leaves the position untouched. The final value two changes nothing. Convert internal index one to output position two only at the end. A useful trace records the previous state, current element, condition, and new state, rather than just the final answer. Send temporary diagnostics to standard error if you need to keep the required output clean. The executable example uses a fixed list so you can predict every line before running it.",
              "code": "a = [-4, 7, 7, 2]\nbest, position = a[0], 0\nfor i in range(1, len(a)):\n    if a[i] > best:\n        best, position = a[i], i\n    print(i, best, position)\nprint(position + 1, best)",
              "output": "1 7 1\n2 7 1\n3 7 1\n2 7\n"
            },
            {
              "title": "Explain the repair with an invariant",
              "body": "After processing positions zero through i, best must be their maximum and position must be its earliest index. Initialization from the first actual element establishes that statement. A strictly larger new element becomes the new maximum, so its index is correct. An equal or smaller element cannot improve the maximum or its earliest occurrence, so the old state remains correct. This preserves the statement at every step and proves the final answer. The argument explains both important choices: use a real element for initialization and a strict greater-than comparison for updates. Passing samples alone cannot provide that explanation."
            },
            {
              "title": "Design categories of tests",
              "body": "Boundary testing is more deliberate than trying several random numbers. List the situations that change control flow: one element, all negative values, repeated maxima, a maximum at the beginning or end, zero, and values at the constraint limits. One case may cover several categories, but avoid giving every test the same shape. An independent small-input oracle can find max(a) and then a.index(max(a)). Compare that with the handwritten scan on short lists. Do not duplicate the same loop inside the oracle, since both implementations could share the same mistake. Tests supply evidence while the invariant explains why the repair generalizes."
            },
            {
              "title": "Workshop: test one hypothesis at a time",
              "body": "Keep the original failing code and input before editing. If the printed position appears one too small, change only the final output and test a singleton and a maximum at the end. Do not simultaneously change initialization and the comparison. Next use negative-only inputs to investigate initialization, then repeated maxima to test tie handling. Separating repairs by cause tells you which edit produced the improvement and lets you undo a minimal change if a new failure appears. Predict each test’s answer before running it.\n\nMetamorphic tests add another independent check. Adding the same constant to every element should preserve the maximum position while shifting the maximum value by that constant. Appending a strictly smaller value should preserve the earliest maximum; appending an equal maximum should preserve it too. These relationships need no complicated oracle. Arbitrary reordering does not preserve the first position, so sorting is not an admissible transformation for this task. Finish by explaining why initialization is valid, what every iteration preserves, and why index conversion happens exactly once."
            }
          ],
          "objectives": [
            "Classify failures before editing",
            "Shrink counterexamples and trace state",
            "Justify initialization and comparisons with an invariant"
          ],
          "checkpoints": [
            {
              "question": "Why is zero an unsafe initial maximum?",
              "answer": "All values may be negative, and zero may not occur. Initialize from an actual element."
            },
            {
              "question": "Why should equality not update the index?",
              "answer": "The saved index is earlier; updating would return the last maximum instead."
            }
          ]
        },
        "ja": {
          "exerciseTitle": "最大値の位置を修正する",
          "task": "N個の整数から最大値が最初に現れる位置（1始まり）と最大値を出力してください。初期コードには意図的な論理誤りがあります。1≤N≤200000、−10⁹≤Aᵢ≤10⁹。",
          "input": "1行目N、2行目N個の整数。",
          "output": "位置と最大値を空白で区切って出力。",
          "hint": "先頭要素で初期化し、同値なら位置を保持し、最後に1始まりへ変換。",
          "explanation": "A[0]で最大値を初期化して残りを走査します。厳密に大きい値のときだけ値と位置を更新するため、同じ最大値の最初の位置を保持します。終了後position+1とbestを出力します。一要素ではループは空ですが初期状態が答えです。時間O(N)、入力領域O(N)、走査の追加領域O(1)です。",
          "title": "根拠を集めてデバッグする",
          "summary": "最小の反例、変数の追跡、不変条件から原因を特定します。",
          "sections": [
            {
              "title": "「間違い」を具体的な問いにする",
              "body": "不具合が起きたら、入力の解釈、計算、出力形式を分けて確認します。SyntaxError では処理が始まっていません。実行時例外では、ある操作を続行できません。WA では正常終了していても結果が違います。この違いによって調べる証拠も変わります。比較記号を無作為に変更したり、処理全体を try で隠したりしないでください。再現できる入力、必要な出力、実際の出力を並べ、最初に食い違う場所を探します。「何となく変だ」を「三番目の要素の後で二回増えている」という検証可能な仮説に直します。一つのサンプルが通っただけでなく、なぜ不具合が起きたかを説明することが修正の目的です。"
            },
            {
              "title": "例外の末尾から読む",
              "body": "Python の traceback は最後の行から読むと、例外の種類と理由を把握できます。その上に、失敗した操作の位置が示されています。IndexError は a[n] の参照、ValueError は「3 4」という一行をそのまま int に渡すこと、NameError は変数名の相違や未代入によってよく発生します。ただし報告された行が原因の始まりとは限りません。関数が先に None を返し、後の加算で初めて TypeError になることもあります。値がどこから来たかを逆にたどり、型と意味を確認しましょう。ループでは最初と最後の反復を必ず追います。a[-1] は正しい構文なので、誤った負の添字は例外を出さずに末尾を返す点にも注意が必要です。"
            },
            {
              "title": "小さな反例を作る",
              "body": "本課題では最大値が最初に現れる位置を求めます。暫定最大値を 0 にすると、正の数のサンプルは通っても [-7] だけで誤りを示せます。また同値の場合も位置を更新すると、[5,5] によって「最初」が「最後」に変わることを確認できます。大きな入力を二つか三つの必要な値に縮めると、関係のない状態に惑わされません。縮小後も制約を守る必要があります。N≥1 の問題に N=0 を与えて失敗しても、問題に対する反例にはなりません。見つけた反例は回帰テストとして残します。重複値の修正によって全要素が負の場合を壊していないか、修正のたびに小さなテスト集合全体を再実行して確認します。"
            },
            {
              "title": "変数を時系列で追跡する",
              "body": "[-4,7,7,2] なら、初期状態は best=-4、position=0 です。添字 1 の値 7 で厳密な大小条件が成立し、両方を更新します。添字 2 の値も 7 ですが、等しいので更新しません。最後の 2 でも状態は変わりません。内部添字 1 を出力するときだけ位置 2 に変換します。追跡表には最終答えだけでなく、処理前の状態、現在の値、条件の判定、処理後の状態を書きます。診断用の出力は標準エラーに送ると正式な出力と区別できますが、提出前には不要なものを取り除きましょう。次の固定リストの例は、各行を手計算してから実行し、状態の変化を一つずつ確認するためのものです。",
              "code": "a = [-4, 7, 7, 2]\nbest, position = a[0], 0\nfor i in range(1, len(a)):\n    if a[i] > best:\n        best, position = a[i], i\n    print(i, best, position)\nprint(position + 1, best)",
              "output": "1 7 1\n2 7 1\n3 7 1\n2 7\n"
            },
            {
              "title": "不変条件で修正を説明する",
              "body": "各反復後に成り立つべき主張を不変条件と呼びます。この例では「添字 0 から i までの最大値が best であり、それが最初に現れる添字が position である」と書けます。実際の先頭要素を初期値にするため、最初の一項だけを処理した時点で成立します。新しい値が厳密に大きければ新最大値となり、その位置を保存します。同じか小さければ、既存の最大値と最初の位置はそのまま正しい状態です。この性質を毎回保つので、終了時にはリスト全体に対して成立します。サンプルが通るという観察より強い説明であり、比較を > にする理由と、初期値を無条件に 0 にしない理由を同時に示します。"
            },
            {
              "title": "テストを種類ごとに設計する",
              "body": "境界テストは適当な乱数を何個か入力することではありません。要素が一つ、全部負、最大値が重複、最大値が先頭または末尾、0 を含む、制約の端に近い値、といった分岐に関わる種類を先に列挙します。一つの入力で複数の種類を確認しても構いませんが、全テストが同じ形にならないようにします。独立した簡単な正解器として max(a) と a.index(max(a)) を使えば、小さいリストで手書きの走査と比較できます。正解器に同じループをコピーすると同じ不具合を共有するので避けます。自動テストで証拠を増やしながら、題意と不変条件の説明で、未実行の入力にも修正が通用する理由を確かめます。"
            },
            {
              "title": "実習：仮説を一つずつ検証する",
              "body": "失敗した元コードと入力を保存してから変更を始めます。位置が1小さいと思ったら出力部分だけを直し、一要素と末尾最大の入力で確認します。その時に初期値や比較まで一緒に変更しないでください。次に全負数で初期値を、最大値の重複で同値処理を調べます。原因ごとに修正を分けると、どの変更が効果を持ったか分かり、新しい失敗が出ても最小変更を戻せます。実行結果を見てから理由を後付けせず、先に期待答えを手で決めましょう。\n\n変形によるテストもできます。全要素に同じ定数を足しても最大位置は変わらず、最大値だけがその定数分増えるはずです。元最大値より小さい値や、同じ最大値を末尾へ追加しても、最初の位置は変わりません。この関係なら複雑な正解器がなくても題意との整合性を確認できます。ただし任意の並べ替えは最初の位置を保存しないので、ソートをこの問題の検査変換にしてはいけません。最後に、初期状態の合法性、各反復で保存する性質、添字変換を一回だけ行う理由を自分で説明します。"
            }
          ],
          "objectives": [
            "失敗の種類から調査方法を選ぶ",
            "最小反例と状態追跡を作る",
            "初期値と比較を不変条件で説明する"
          ],
          "checkpoints": [
            {
              "question": "最大値を必ず0で初期化してよいですか。",
              "answer": "全要素が負なら誤ります。実在する先頭要素で初期化します。"
            },
            {
              "question": "同値で位置を更新しないのはなぜですか。",
              "answer": "保存した位置の方が早く、更新すると最後の出現になるためです。"
            }
          ]
        }
      },
      "id": "debugging",
      "order": 9,
      "stage": "methods",
      "minutes": 50,
      "prerequisiteIds": [
        "functions"
      ]
    },
    {
      "relatedProblems": [
        "ABC081B",
        "ABC083B"
      ],
      "starter": "n = int(input())\n# Compute the three operation counts without enumerating pairs.\n",
      "solution": "n = int(input())\npairs = n * (n - 1) // 2\nx, steps = n, 0\nwhile x > 0:\n    x //= 2\n    steps += 1\nprint(n, pairs, steps)\n",
      "tests": [
        {
          "input": "1\n",
          "expected": "1 0 1\n"
        },
        {
          "input": "2\n",
          "expected": "2 1 2\n"
        },
        {
          "input": "7\n",
          "expected": "7 21 3\n"
        },
        {
          "input": "8\n",
          "expected": "8 28 4\n"
        },
        {
          "input": "1000000000000000000\n",
          "expected": "1000000000000000000 499999999999999999500000000000000000 60\n"
        }
      ],
      "content": {
        "zh": {
          "exerciseTitle": "精确计算操作次数",
          "task": "输入整数N（1≤N≤10¹⁸）。输出扫描N个元素的次数N、不同下标无序对数量N(N−1)/2、以及从x=N开始反复x//=2直到x=0的迭代次数。",
          "input": "一行整数N。",
          "output": "三个整数，以空格分隔。",
          "hint": "前两项直接计算；第三项用不断减半的while循环。",
          "explanation": "扫描次数直接为N。每个不同下标对若有序计算会出现两次，所以无序数量是N(N−1)//2。减半循环每次更新x并加一次计数，包含1变为0的一步。最多约60次，时间O(logN)，额外变量数O(1)；Python大整数的位运算成本随位数增长，此处输入上限固定且很小。",
          "title": "复杂度：先估计，再实现",
          "summary": "数清真正重复的操作，区分算法增长、输入成本和实际耗时。",
          "sections": [
            {
              "title": "为什么正确还不够",
              "body": "一个逐一枚举所有数对的程序可以完全正确，却在较大输入上无法及时结束。题目约束不仅规定允许输入什么，也在提示需要什么规模的算法。N=20 时枚举数对很轻松，N=200000 时数对约有两百亿个，无法靠改用更短的变量名挽救。复杂度讨论的是输入扩大时工作量如何增长，不是某种程序风格的评价。开始写代码前，先找出规模变量：一个列表可能只有N；多次区间查询同时涉及N和Q；网格涉及H与W。分别估计读入、预处理、每次查询与输出，避免只分析最漂亮的一小段循环而忽略整体程序。"
            },
            {
              "title": "从操作次数推导阶",
              "body": "一个循环读取N个元素，需要N次处理，称为O(N)。两个连续循环各做N次，总量是2N，仍然是O(N)；两个嵌套循环每次都完整遍历N项，总量是N²，属于O(N²)。如果内层从i+1开始，则次数是(N-1)+(N-2)+…+1=N(N-1)/2，仍为二次增长。大O记号保留增长中主导的部分，但不表示常数在实际运行中毫无影响。分析时先写精确或可比较的次数，再简化阶数，能防止把所有“两层循环”都机械判为O(N²)。之后的双指针课程中，两层语法循环就可能只有线性总移动次数。"
            },
            {
              "title": "对数来自不断缩小",
              "body": "若每一步把候选范围缩成一半，N个候选经过大约log₂N步就只剩一个。N从8增加到16，线性处理翻倍，但二分步骤只多一次。对N=1、2、4、8逐个手算：把正整数x反复做x//=2直到0，需要1、2、3、4次；这里数的是包含最后一次从1到0的循环，所以不能和另一种“缩到1就停止”的定义混淆。算法证明必须对应你实际写的停止条件。对数的底数不同只相差常数倍，复杂度里通常写O(logN)。然而读取N个输入仍需O(N)，不能因为查询循环是对数，就声称整个读取列表的程序也是对数。",
              "code": "for n in [1, 2, 4, 8, 16]:\n    x, steps = n, 0\n    while x > 0:\n        x //= 2\n        steps += 1\n    print(n, steps)",
              "output": "1 1\n2 2\n4 3\n8 4\n16 5\n"
            },
            {
              "title": "看见隐藏的线性操作",
              "body": "Python把很多遍历封装成一个表达式，写得短并不代表常数时间。sum(a[l:r])先复制切片，再求和，费用与区间长度有关；x in a对普通列表可能扫描全部元素；a.count(x)也会完整统计。若对每个元素再调用一次count，就可能变成O(N²)。与此相对，列表下标访问通常O(1)，字典或集合查找通常平均O(1)，但需要保存额外数据。a.sort()的排序成本应按O(NlogN)考虑，sorted(a)还会产生一个新列表。选择方法时同时写出时间和内存，尤其警惕每轮新建长列表、保存所有数对、递归中不断复制剩余数组等隐蔽开销。"
            },
            {
              "title": "用数量级筛选方案",
              "body": "取N=100000：N约十万，Nlog₂N约一百七十万，N²约一百亿。这个比较足以淘汰明显不合适的全扫描方案，却不能许诺某个次数必定在一秒内结束，因为Python版本、操作内容、运行环境和数据结构都影响常数。先选择增长速度合适的算法，再用接近上限的合法数据测量；不要仅用五个元素的样例判断性能。性能测试也要有代表性，例如提前退出的循环可能在随机输入上很快，却在“始终没有找到答案”的输入上达到最坏情况。报告复杂度时说明是最坏界、平均界还是摊还界，不要把一次幸运的早停当成通用保证。"
            },
            {
              "title": "练习：比较三个精确计数",
              "body": "本课不要求编写一个运行N²次的程序来证明它很慢，而要求输出三个操作次数：一次完整扫描为N；枚举不同下标无序对为N(N-1)//2；把N反复整除2直到0的次数由短循环得到。注意N最大可到10¹⁸，显式生成range(N)或所有数对毫无必要。第三项也可以用整数的bit_length得到，但先手写循环更容易对应定义。乘法再整除2使用整数运算，避免浮点数在大整数附近丢精度。三个答案描述不同算法的工作量，并不要求真正执行前两类操作。这里“计算操作次数”与“执行这些操作”之间的区分，本身就是一次通过数学减少计算的示范。"
            },
            {
              "title": "工作坊：把一段程序拆成账本",
              "body": "设程序先读N个数，排序一次，再回答Q次二分查找。可以分别记账：读入O(N)，排序O(NlogN)，查询总和O(QlogN)，输出O(Q)，合计O(NlogN+QlogN)，而不是随手写O(logN)。如果每次查询前都重新排序，排序费用就变成O(QNlogN)，即使二分函数一字未改，整体算法也已经完全不同。把不依赖查询的计算移到查询循环外，是很实际的优化，但必须确认输入数组不会在查询之间改变。\n\n再看内存账本：保存原数组、排序副本和Q个输出字符串，数量级为O(N+Q)。如果把所有可能的区间都保存下来，区间对象数会达到O(N²)，即便之后的查询很快也可能先耗尽内存。测试时可以用两个递增规模观察趋势，但测到两倍时间不自动证明线性，因为缓存、启动费用和输入分布也影响结果。理论计数与实测应相互补充：理论用于排除无法扩展的方法，实测用于发现实现常数和隐藏复制。练习结束后，尝试在纸上预测N翻倍时三项输出如何变化，再使用程序验证，观察线性、二次和对数增长的不同形状。"
            }
          ],
          "objectives": [
            "计算循环的总工作量",
            "发现切片与库函数中的隐藏开销",
            "区分精确计数、复杂度与实测时间"
          ],
          "checkpoints": [
            {
              "question": "两个顺序执行的N次循环为什么不是N²？",
              "answer": "次数相加为2N，并非每次外层都再执行N次。"
            },
            {
              "question": "为何不能用N²循环来计算数对数量？",
              "answer": "计数已有闭式N(N-1)//2；实际枚举会在大N上失去可行性。"
            }
          ]
        },
        "en": {
          "exerciseTitle": "Exact operation counts",
          "task": "Given N with 1≤N≤10¹⁸, print N, the number N(N−1)/2 of unordered distinct-index pairs, and the iterations of x//=2 starting at N and stopping at zero.",
          "input": "One integer N.",
          "output": "Three space-separated integers.",
          "hint": "Use formulas for the first two counts and a halving loop for the third.",
          "explanation": "A scan visits N elements. Ordered distinct-index pairs count each unordered pair twice, giving N(N−1)//2. The loop counts every halving, including the final transition from one to zero. It takes about sixty iterations at most: O(logN) iterations and O(1) variables. Python integer-operation cost depends on bit length, which is small under this fixed bound.",
          "title": "Complexity before implementation",
          "summary": "Count repeated work and distinguish growth rates, input cost, and measured time.",
          "sections": [
            {
              "title": "Correctness is only one requirement",
              "body": "A program that examines every pair can be correct yet finish too late. Constraints describe legal inputs and also guide the scale of the algorithm. Twenty elements make pair enumeration easy; two hundred thousand give roughly twenty billion pairs. Shorter variable names cannot repair that growth. Complexity describes how required work changes as input grows, not whether code looks elegant. Identify the independent sizes before coding: a list may use N, repeated range questions use N and Q, and a grid uses H and W. Account for input, preprocessing, each query, and output rather than analyzing only the most attractive loop."
            },
            {
              "title": "Derive the order from operations",
              "body": "One pass processing N elements takes N iterations, or O(N). Two consecutive passes take 2N operations and remain O(N); two nested full passes take N squared. If the inner pass starts at i+1, the count is (N−1)+(N−2)+…+1=N(N−1)/2, still quadratic. Big-O keeps the dominant growth term, but constants can matter in measurements. Write an exact or comparable operation count before simplifying it. Counting indentation levels is not a valid analysis: a later two-pointer algorithm may contain a while inside a for yet perform only linearly many pointer movements across the entire execution."
            },
            {
              "title": "Where logarithms come from",
              "body": "Repeatedly halving a candidate range takes about log₂N steps to leave one candidate. Doubling N adds roughly one halving step rather than doubling the work. Trace x//=2 until zero for initial values 1,2,4,8: the iteration counts are 1,2,3,4. That convention includes the final transition from one to zero; a loop that stops at one has a different exact count. Match the proof to the actual stopping condition. Different logarithm bases differ by a constant factor. Also keep input cost visible: a logarithmic search does not make a program logarithmic when it first reads an entire N-element list.",
              "code": "for n in [1, 2, 4, 8, 16]:\n    x, steps = n, 0\n    while x > 0:\n        x //= 2\n        steps += 1\n    print(n, steps)",
              "output": "1 1\n2 2\n4 3\n8 4\n16 5\n"
            },
            {
              "title": "Expose hidden linear work",
              "body": "A short Python expression can conceal a full traversal. sum(a[l:r]) copies a slice and then sums it, so its cost depends on range length. Membership in a list and a.count(x) may scan the whole list. Calling count once for every element can therefore be quadratic despite having only one visible loop. Indexing is normally constant time, while sets and dictionaries usually offer average constant-time lookup at the cost of additional storage. Sorting costs O(N log N), and sorted creates a new list. Track memory as well as time, especially when copying long lists, storing all pairs, or slicing repeatedly inside recursion."
            },
            {
              "title": "Use scale to reject unsuitable approaches",
              "body": "At N=100000, N is one hundred thousand, N log₂N is about 1.7 million, and N squared is ten billion. That comparison can reject an obviously unsuitable exhaustive scan, but it cannot promise a fixed number of operations per second. Python version, operation type, machine, and representation affect constants. Choose suitable growth first, then measure legal near-limit cases rather than tiny samples. Include inputs that prevent early exit: random data may find an answer quickly while a no-answer case forces the worst path. State whether a bound is worst-case, average, or amortized instead of treating one fortunate early return as a guarantee."
            },
            {
              "title": "Exercise: compute counts, not the work itself",
              "body": "Print three exact counts: N for a complete scan, N(N−1)//2 for unordered pairs of distinct indices, and the number of repeated integer halvings needed to reach zero. N may be as large as 10¹⁸, so never actually iterate over all N items or generate the pairs. Use the closed formula for the second count and a short loop for the third. Python integers keep the multiplication exact; converting to floating point can lose precision. Although bit_length offers the halving count directly, implement the loop first to connect its behavior to the definition. Counting a workload need not require performing that workload."
            },
            {
              "title": "Workshop: keep a cost ledger",
              "body": "Suppose a program reads N numbers, sorts once, and answers Q binary-search queries. Record input O(N), sorting O(N log N), queries O(Q log N), and output O(Q), giving O(N log N+Q log N), not simply O(log N). Sorting again before every query changes preprocessing to O(QN log N) even if the search function is identical. Moving query-independent work outside the query loop is useful only after verifying that the underlying data remains unchanged.\n\nKeep a memory ledger too. The original array, a sorted copy, and Q output strings use O(N+Q) storage. Saving every possible interval requires O(N²) objects and can exhaust memory before fast queries begin. Timing two growing inputs can reveal a trend but does not prove a complexity class: startup costs, caching, and distributions also matter. Use theory to reject algorithms that cannot scale, and measurements to expose constants or hidden copying. Finally predict how each exercise output changes when N doubles, then run the program to compare linear, quadratic, and logarithmic growth."
            }
          ],
          "objectives": [
            "Count total loop operations",
            "Identify hidden traversal and copying",
            "Separate exact counts, growth rates, and measurements"
          ],
          "checkpoints": [
            {
              "question": "Why are two consecutive N-step loops not quadratic?",
              "answer": "Their counts add to 2N; they are not nested."
            },
            {
              "question": "Why not enumerate pairs to count them?",
              "answer": "The exact formula is available, while enumeration is infeasible for large N."
            }
          ]
        },
        "ja": {
          "exerciseTitle": "操作数を正確に計算する",
          "task": "1≤N≤10¹⁸を入力し、全走査の回数N、異なる添字の無順序ペア数N(N−1)/2、x=Nからx//=2を繰り返して0に至る反復数を出力。",
          "input": "整数Nを1行。",
          "output": "三つの整数を空白区切り。",
          "hint": "最初の二つは式、三つ目は半分にするwhileを使います。",
          "explanation": "全走査はN回です。順序付きの異なる添字ペアでは各組を二度数えるので、N(N−1)//2になります。減半ループは1から0への操作も含めて数えます。最大約60反復で、O(logN)反復、O(1)個の変数です。Python整数の操作費用はビット長に依存しますが、この上限では小さい値です。",
          "title": "実装前に計算量を見積もる",
          "summary": "繰り返される処理を数え、増加率と入力費用と実測時間を区別します。",
          "sections": [
            {
              "title": "正しいだけでは足りない理由",
              "body": "すべての組を調べるプログラムは正しくても、大きな入力では時間内に終わらない場合があります。制約は合法な入力を定めると同時に、必要なアルゴリズムの規模を示しています。要素が20個なら組の列挙は容易ですが、20万個なら約200億組になります。変数名を短くしてもこの増加は解消しません。計算量は入力が大きくなったとき処理がどう増えるかを表し、コードの見た目を評価するものではありません。書き始める前に独立した規模を確認します。リストにはN、区間への質問にはNとQ、盤面にはHとWがあります。入力、前計算、質問一回分、出力まで数え、都合のよいループだけの分析にしないことが大切です。"
            },
            {
              "title": "操作回数から次数を導く",
              "body": "N要素を一度ずつ処理するループはN回、つまりO(N)です。N回のループを二つ続ければ2N回なのでO(N)のままです。各反復の中で再び全N要素を走査するとN²回になります。内側がi+1から始まる場合も、回数は(N−1)+(N−2)+…+1=N(N−1)/2であり、二次的に増えます。大Oは支配的な増加項を残す記法ですが、実測で定数が無意味になるわけではありません。まず具体的な回数や比較可能な式を書いてから簡約しましょう。インデントの深さを数えるだけでは不十分です。後の尺取り法ではfor内にwhileがあっても、ポインタが全体で動く回数は線形に抑えられます。"
            },
            {
              "title": "対数は繰り返し半分にする操作から生まれる",
              "body": "候補範囲を毎回半分にすると、およそlog₂N回で一つになります。Nを8から16へ増やすと線形走査は倍になりますが、半分にする回数はほぼ一回増えるだけです。正整数xを0までx//=2で減らす処理を、1、2、4、8から手で追うと、反復数は1、2、3、4です。この定義は1から0への最後の操作を含み、1で止まる定義とは厳密な回数が違います。停止条件に一致した説明をする必要があります。対数の底の違いは定数倍なので通常O(logN)と書きます。ただしN個の入力を読み込む費用はO(N)です。探索部分が対数でも、リスト全体を読むプログラムまで対数時間と呼ぶことはできません。",
              "code": "for n in [1, 2, 4, 8, 16]:\n    x, steps = n, 0\n    while x > 0:\n        x //= 2\n        steps += 1\n    print(n, steps)",
              "output": "1 1\n2 2\n4 3\n8 4\n16 5\n"
            },
            {
              "title": "式の中に隠れた線形処理を見つける",
              "body": "Pythonでは一つの式が長い走査を隠していることがあります。sum(a[l:r])は部分リストをコピーしてから加算するため、区間長に比例した費用がかかります。通常のリストに対するx in aやa.count(x)も全体を調べる場合があります。各要素についてcountを呼べば、見えるループが一つでもO(N²)になり得ます。一方、添字アクセスは通常O(1)、集合と辞書の検索は平均O(1)ですが、保存領域が必要です。ソートはO(NlogN)として考え、sortedでは新しいリストも作られます。各反復で長いリストを生成したり、全ペアを保存したり、再帰ごとに残りの配列をコピーしたりする処理に注意し、時間と領域の両方を見積もりましょう。"
            },
            {
              "title": "桁の違いで候補を絞る",
              "body": "N=100000なら、Nは十万、Nlog₂Nは約170万、N²は百億です。この比較で明らかに不適切な全探索を除外できますが、「この回数なら必ず一秒」という約束はできません。Pythonの版、操作内容、機械、表現方法によって定数が変わるためです。まず増加率の適切な方法を選び、その後で制約上限に近い合法なデータを測定します。五要素程度のサンプルだけで性能を判断してはいけません。早期終了する処理では、乱数だと答えが早く見つかっても、最後まで答えが存在しない入力で最悪経路を通ります。最悪、平均、償却のどの評価なのかを明記し、偶然の早期終了を全入力に対する保証と取り違えないようにします。"
            },
            {
              "title": "演習：処理せずに回数を計算する",
              "body": "本演習ではN²回の処理を実行して遅さを確認するのではなく、三種類の正確な回数を出力します。全走査はN回、異なる添字の無順序ペアはN(N−1)//2回、Nを整数除算で0まで半分にする回数は短いループで求めます。Nは10¹⁸にもなるので、range(N)を実際に走査したり全ペアを生成したりする必要はありません。三番目はbit_lengthでも得られますが、最初は定義に対応したループを書きましょう。掛け算の後で整数として2で割り、巨大整数付近で精度を失う浮動小数点変換を避けます。出力するのは操作回数であり、その操作を実行することではありません。数式によって計算そのものを省く考え方を実感する課題です。"
            },
            {
              "title": "実習：処理ごとの費用表を書く",
              "body": "N個を読んで一回ソートし、Q回二分探索するプログラムを考えます。入力O(N)、整列O(NlogN)、質問全体O(QlogN)、出力O(Q)と別々に記録し、全体をO(NlogN+QlogN)と評価します。探索関数だけを見てO(logN)と書いてはいけません。質問のたびにソートし直すと、探索関数が同じでも整列費用はO(QNlogN)です。質問に依存しない計算を外へ移すのは有効ですが、途中で配列が変化しないという確認が必要です。\n\n領域の表も作ります。元配列、整列済みの複製、Q個の出力文字列ならO(N+Q)です。全区間を保存するとO(N²)個の対象になり、その後の質問が速くても先にメモリを使い切ることがあります。二つの規模で時間を測ると傾向は見えますが、起動費用やキャッシュや分布の影響があるため、倍になったことだけで線形性は証明できません。理論で拡大不可能な方法を除き、実測で定数や隠れた複製を見つけます。最後にNを倍にしたとき演習の三出力がどう変わるかを紙で予想してから実行してください。"
            }
          ],
          "objectives": [
            "ループ全体の操作数を数える",
            "コピーや関数内の走査を見抜く",
            "厳密回数・増加率・実測を分ける"
          ],
          "checkpoints": [
            {
              "question": "N回のループ二つを続けても二次にならないのは？",
              "answer": "処理数は足して2Nであり、入れ子ではないためです。"
            },
            {
              "question": "組数を求めるために全組を列挙しないのは？",
              "answer": "閉じた式で正確に求められ、大きいNで列挙は不可能だからです。"
            }
          ]
        }
      },
      "id": "complexity",
      "order": 10,
      "stage": "methods",
      "minutes": 50,
      "prerequisiteIds": [
        "debugging"
      ]
    },
    {
      "id": "exhaustive-search",
      "order": 11,
      "stage": "methods",
      "minutes": 50,
      "prerequisiteIds": [
        "complexity"
      ],
      "relatedProblems": [
        "ABC087B",
        "ABC085C",
        "ABC282B"
      ],
      "content": {
        "zh": {
          "title": "枚举：先定义候选，再保证不重不漏",
          "summary": "把题意转换为有限候选空间，并用约束判断枚举是否合适。",
          "sections": [
            {
              "title": "枚举是一种完整算法",
              "body": "枚举不是“没想到好方法”的临时做法，而是在可接受范围内检查全部候选的完整算法。它通常由三部分构成：候选的定义、产生候选的顺序、判断候选是否合格的条件。例如统计和为K的数对，候选不是一个数值，而是两个不同位置组成的下标对。先确定位置是否有顺序，是否允许选同一个位置，重复数值是否代表不同对象。把这些问题写清楚之后，再设计循环，远比先写两层for再猜范围可靠。约束N≤2000意味着约两百万个无序对，二次枚举在本课规模内是合理教学起点；若N变成二十万，就必须重新评估方法。"
            },
            {
              "title": "用i<j表达无序对",
              "body": "外层i从0到N-1，内层j从i+1到N-1。这样每次都有i<j，自然排除了自己和自己配对。任意两个不同位置中，较小的位置只能放在i，较大的只能放在j，因此它们只出现一次。如果两层都遍历range(n)，则会生成(i,j)和(j,i)，还会生成(i,i)；最后简单除以2不能可靠处理自配对。若题目确实要求有序对，则反而不能套用i<j。循环结构必须来自对象定义。对于三个不同位置组成的无序组，可以类似使用i<j<k；但候选数会增长为约N³/6，写循环前要先检验可行性。"
            },
            {
              "title": "手算每一对与计数变化",
              "body": "用a=[1,3,1,3]、K=4追踪。i=0时依次检查j=1、2、3，前后两项合格，计数从0变1再变2。i=1时检查j=2、3，只有j=2合格，计数变3。i=2时检查j=3，计数变4。最后i=3没有合法j，内层是空循环。注意两个1和两个3并未被合并：四个位置组合分别是(0,1)、(0,3)、(1,2)、(2,3)。把“值的组合只有一种”和“下标对有四种”区分开，是本课最重要的读题点之一。下方代码打印每个候选及更新后的计数，用完诊断后正式解法只输出最终count。",
              "code": "a, k = [1, 3, 1, 3], 4\ncount = 0\nfor i in range(len(a)):\n    for j in range(i + 1, len(a)):\n        if a[i] + a[j] == k:\n            count += 1\n        print(i, j, count)",
              "output": "0 1 1\n0 2 1\n0 3 2\n1 2 3\n1 3 3\n2 3 4\n"
            },
            {
              "title": "把枚举分成生成与判定",
              "body": "调试全探索时，先暂时不看条件，确认循环是否生成正确候选，再检查判定表达式。若漏掉最后一个位置，问题在生成阶段；若用了差而不是和，问题在判定阶段；若把count=0放进外层循环，则合格候选都被看到，却在汇总阶段丢掉历史。把这三个阶段分开，可以快速缩小范围。判定函数若比较复杂，可单独写成is_valid并对几组候选测试，但不要为了形式制造不必要的函数。现在判定只有a[i]+a[j]==k，直接写在循环中更清晰。计数变量应在所有候选开始前初始化，且每个合格候选恰好增加一次。"
            },
            {
              "title": "减少维度必须有依据",
              "body": "全探索也能通过约束减少候选，而不是立即改成陌生算法。例如三个非负整数x、y、z满足x+y+z=N，枚举x和y后，z=N-x-y已经被唯一确定，无需再循环z。剩下要检查z≥0以及其他条件；若还枚举z，就重复做本可直接算出的工作。相反，在本课数对计数中，给定a[i]后只能确定需要的值K-a[i]，不能确定唯一的下标，因为这个值可能出现多次。以后字典可以统计此前出现的次数，但本课首先要求你能证明直接枚举正确。任何剪枝都要说明被跳过的候选为何不可能满足条件，不能凭当前样例“看起来没用”就删掉分支。"
            },
            {
              "title": "正确性、成本与反例",
              "body": "证明可以分成覆盖性、唯一性和判定正确性：任意合法下标对都有较小者和较大者，因此会被某次i<j生成；不同循环位置产生不同下标对，因此不会重复；最后和等于K的判断与题意完全一致，因此count就是答案。检查次数固定为N(N-1)/2，负数和0不会改变循环次数。测试至少包括N=1、没有合格对、全相同元素、正负数抵消。全相同且每个值是K/2时，答案就是组合数，能直接检查是否错误去重或除二。不要为了减少空间保存所有候选：边生成边判断就够，除输入列表外只需要几个变量。"
            },
            {
              "title": "工作坊：有序、无序与可重复选择",
              "body": "把同一组数对问题改成三个版本，能检查你是否真的理解候选空间。版本一允许有序且不同下标，(i,j)与(j,i)都算，候选总数为N(N-1)。版本二无序且不同下标，就是本课的N(N-1)/2。版本三允许同一个下标被选两次且顺序不区分，可以枚举i≤j，候选数为N(N+1)/2。三个版本的数据完全相同，只有对象定义变了，循环范围和答案就会改变。不要看到两个数就自动写i<j，而应该从题目措辞确认是哪一种。\n\n进一步测试本课算法：把输入列表倒序或任意重排，合格下标对的数量应保持不变，因为数值多重集合未变；给每个元素增加常数c，并把目标增加2c，答案也应不变。删除一个元素则没有固定的答案变化，因为它参与了多少合格对取决于其他值。你可以手工列出三元素输入的全部三个候选，再逐个检查程序是否访问到了它们。对于每一个循环边界，解释起点为什么合法、终点为什么不会遗漏，特别是range的右端不包含这一点。最后确认计数没有提前停止，输出没有混入调试轨迹。这样的检查习惯会直接迁移到货币枚举、网格选择和状态搜索。"
            }
          ],
          "exerciseTitle": "和为目标值的数对",
          "task": "给定 N 个整数和目标值 K，统计满足 i < j 且 Aᵢ + Aⱼ = K 的下标对数量。相同数值出现在不同位置时视为不同元素。1 ≤ N ≤ 2000，−10⁹ ≤ K, Aᵢ ≤ 10⁹。",
          "input": "第一行 N K；第二行 N 个整数 Aᵢ。",
          "output": "输出符合条件的下标对数量。",
          "hint": "使用两重循环，只枚举 j > i。不要先去掉列表中的重复数。",
          "explanation": "把答案初始化为0，然后逐一选择第一个下标i。第二个下标从i+1开始，因此每次候选都使用两个不同位置，且每个无序对只出现一次。只有a[i]+a[j]==k时增加计数。相同数值位于不同位置仍是不同元素，不能预先去重，也不能找到一个匹配后立即退出内层循环。对于N=1，根本没有候选，初值0自然就是答案。对于四个2且K=4，六个不同下标对都会被统计。覆盖性来自任意不同下标必有较小和较大者，唯一性来自i<j的表示唯一，判定式又恰好等于题意，因此总计数正确。比较次数为N(N−1)/2，时间O(N²)；读取列表占O(N)空间，循环本身仅需O(1)额外状态。",
          "objectives": [
            "从题意定义候选对象",
            "使用i<j保证不重不漏",
            "根据约束判断枚举和剪枝是否合理"
          ],
          "checkpoints": [
            {
              "question": "四个2、K=4时有多少下标对？",
              "answer": "六对，等于4×3/2。四个位置分别是0、1、2、3，合法下标对为(0,1)、(0,2)、(0,3)、(1,2)、(1,3)、(2,3)。数值虽然相同，位置身份仍然不同，不能合并。"
            },
            {
              "question": "为什么不能一遇到合格对就break？",
              "answer": "需要统计全部下标对，同一个i可能配多个j。"
            }
          ]
        },
        "en": {
          "title": "Exhaustive search without omissions or duplicates",
          "summary": "Translate the statement into a finite candidate space and check feasibility.",
          "sections": [
            {
              "title": "Enumeration is a complete algorithm",
              "body": "Exhaustive search is not merely a temporary solution used when nothing clever occurs. It is a complete method whenever the candidate space is small enough. Separate three decisions: what constitutes a candidate, how candidates are generated, and how validity is checked. In a pair-sum task, candidates are pairs of positions, not just numerical values. Determine whether order matters, whether a position may be reused, and whether equal values at different positions remain different objects. Answering those questions before writing loops prevents many errors. With N at most two thousand, roughly two million unordered pairs provide a reasonable teaching baseline; a bound of two hundred thousand would require reconsideration."
            },
            {
              "title": "Represent an unordered pair by i < j",
              "body": "Let i range from zero through N−1 and j from i+1 through N−1. This automatically excludes pairing a position with itself. For any two distinct indices, the smaller can only be i and the larger can only be j, so the pair is generated once. Two complete range(n) loops also generate reversed pairs and self-pairs; dividing the final answer by two does not reliably repair those extra cases. Conversely, a task explicitly asking for ordered pairs should not use this restriction. For unordered triples, the analogous condition is i<j<k, but its roughly cubic candidate count must be checked before implementation."
            },
            {
              "title": "Trace every pair and the counter",
              "body": "Take a=[1,3,1,3] and K=4. For i=0, j visits 1,2,3; the first and third candidates are valid, bringing the count to two. For i=1, only j=2 is valid, bringing it to three. For i=2, j=3 supplies the fourth pair. The final i has no valid j, so the inner loop is empty. The two ones and two threes have not been merged: the accepted position pairs are (0,1), (0,3), (1,2), and (2,3). There is one combination of values but four combinations of positions. The trace prints every candidate; the submitted solution should print only the final count.",
              "code": "a, k = [1, 3, 1, 3], 4\ncount = 0\nfor i in range(len(a)):\n    for j in range(i + 1, len(a)):\n        if a[i] + a[j] == k:\n            count += 1\n        print(i, j, count)",
              "output": "0 1 1\n0 2 1\n0 3 2\n1 2 3\n1 3 3\n2 3 4\n"
            },
            {
              "title": "Separate generation, checking, and aggregation",
              "body": "When debugging exhaustive search, first ignore the condition and inspect which candidates the loops generate. A missing final position is a generation error. Comparing a difference instead of a sum is a validity-check error. Placing count=0 inside the outer loop loses earlier results during aggregation even though the candidates were visited correctly. Separating these stages narrows the investigation. A complex predicate may deserve its own is_valid function and direct tests, but a one-line sum comparison is clearer inline. Initialize the accumulator before all candidates are generated, and increment it exactly once for each valid candidate."
            },
            {
              "title": "Reduce a dimension only when justified",
              "body": "Exhaustive search can exploit constraints without switching to an unfamiliar algorithm. If nonnegative x,y,z satisfy x+y+z=N, choosing x and y uniquely determines z=N−x−y, so a third loop is unnecessary. You still check z≥0 and any additional conditions. In this pair-counting task, knowing a[i] determines the required value K−a[i], but not a unique index: that value may occur several times. A later dictionary method can count previous occurrences. First establish the direct solution. Any pruning rule must explain why skipped candidates cannot be valid; never remove a branch simply because it appeared unhelpful in one sample."
            },
            {
              "title": "Prove coverage and test structural boundaries",
              "body": "A proof has three parts. Coverage: every legal pair has a smaller and larger index, so the loops visit it. Uniqueness: distinct loop positions generate distinct index pairs. Validity: the sum comparison is exactly the condition in the statement. Therefore the accumulator equals the answer. The fixed check count is N(N−1)/2, regardless of negative values or zero. Test N=1, no valid pairs, all equal values, and positive-negative cancellation. When every value equals K/2, every pair is valid, providing a direct combinatorial oracle. Generate and test candidates immediately instead of storing them all; only a few variables beyond the input list are needed."
            },
            {
              "title": "Workshop: ordered, unordered, and repeated selections",
              "body": "Change the same pair problem into three versions. Ordered distinct-index pairs have N(N−1) candidates because (i,j) and (j,i) both count. Unordered distinct-index pairs are this lesson’s N(N−1)/2. Unordered selections allowing the same index twice can use i≤j and have N(N+1)/2 candidates. Identical numerical data produces different answers because the objects being counted changed. Never write i<j merely because two values are mentioned; derive it from the statement.\n\nFor our version, reversing or otherwise permuting the input preserves the number of matching pairs because the multiset of values is unchanged. Adding c to every value and 2c to the target also preserves the answer. Removing one element has no fixed effect because its number of partners varies. Manually list all three candidates of a three-element input and verify that the loops visit each exactly once. Explain every range endpoint, especially Python’s excluded right endpoint. Finally check that counting does not stop after the first match and that diagnostic output is absent from the submitted result."
            }
          ],
          "exerciseTitle": "Pairs with a target sum",
          "task": "Given N integers and a target K, count index pairs with i < j and Aᵢ + Aⱼ = K. Equal values at different positions are distinct elements. 1 ≤ N ≤ 2000 and −10⁹ ≤ K, Aᵢ ≤ 10⁹.",
          "input": "N K on the first line; N integers Aᵢ on the second.",
          "output": "Print the number of valid index pairs.",
          "hint": "Use two loops with j > i. Do not remove repeated values first.",
          "explanation": "Initialize the answer to zero, choose the first index i, and let the second index begin at i+1. Every candidate uses two distinct positions and every unordered pair appears exactly once. Increment only when a[i]+a[j]==k. Equal values at different positions remain different elements, so do not deduplicate or stop after the first match for an i. For N=1 no candidate exists and zero is correct; four twos with K=4 yield six pairs. Coverage follows because distinct indices have a unique smaller and larger member; uniqueness follows from that representation; the validity test matches the statement. There are N(N−1)/2 comparisons, giving O(N²) time, O(N) input storage, and O(1) extra scanning state.",
          "objectives": [
            "Define candidates from the statement",
            "Use i<j to ensure exact coverage",
            "Justify feasibility and any pruning"
          ],
          "checkpoints": [
            {
              "question": "How many pairs for four twos and K=4?",
              "answer": "Six: 4×3/2. Equal values remain distinct positions."
            },
            {
              "question": "Why not break after the first valid pair?",
              "answer": "All pairs are required, and one i can match several j values."
            }
          ]
        },
        "ja": {
          "title": "漏れと重複のない全探索",
          "summary": "問題文を有限の候補集合に変え、制約から実行可能性を判断します。",
          "sections": [
            {
              "title": "全探索も完成したアルゴリズムである",
              "body": "全探索は、良い方法を思いつくまでの仮の処理とは限りません。候補数が十分小さければ、それ自体が完全な解法です。候補の定義、生成する順番、条件判定という三つを分けて考えます。和がKになるペアでは、候補は数値そのものではなく二つの位置の組です。順序を区別するか、同じ位置を再利用できるか、同値でも位置が違えば別の対象かを先に決めましょう。二重forを書いてから範囲を推測するより安全です。本課題のN≤2000では無順序ペアは約200万組で、二次時間の基本解法を学ぶ妥当な規模です。もし上限が20万なら同じ解法をそのまま採用できず、改めて計算量を検討する必要があります。"
            },
            {
              "title": "無順序ペアをi<jで表す",
              "body": "外側のiを0からN−1、内側のjをi+1からN−1まで動かします。常にi<jなので、自分自身との組を除外できます。任意の異なる二添字では、小さい方だけがi、大きい方だけがjになり、必ず一回だけ生成されます。両方をrange(n)にすると逆順の組と自己ペアも現れます。最後に2で割るだけでは自己ペアを正しく処理できません。反対に、問題が順序付きペアを要求しているならi<jに制限してはいけません。構造は対象の定義から決めます。無順序の三要素ならi<j<kとできますが、候補数は約N³/6になるので、実装の前に規模を検討します。"
            },
            {
              "title": "候補とカウンタを一組ずつ追う",
              "body": "a=[1,3,1,3]、K=4を使います。i=0ではj=1、2、3を調べ、最初と最後が条件を満たすのでcountは2になります。i=1ではj=2だけが合格して3、i=2ではj=3が合格して4になります。最後のi=3にはjが存在せず、内側のループは空です。二つの1と二つの3を同じ一要素にまとめてはいけません。合格する位置の組は(0,1)、(0,3)、(1,2)、(2,3)の四つです。「値の組合せは一種類」と「添字の組は四種類」を区別することが、この問題の重要な読解点です。次の追跡コードでは候補ごとに状態を出しますが、正式な解答では最終countだけを出力します。",
              "code": "a, k = [1, 3, 1, 3], 4\ncount = 0\nfor i in range(len(a)):\n    for j in range(i + 1, len(a)):\n        if a[i] + a[j] == k:\n            count += 1\n        print(i, j, count)",
              "output": "0 1 1\n0 2 1\n0 3 2\n1 2 3\n1 3 3\n2 3 4\n"
            },
            {
              "title": "生成・判定・集計を分ける",
              "body": "全探索を調べるときは、最初に条件式を無視して、ループが何を生成するか確認します。最後の添字が抜けるなら生成段階、和ではなく差を比較していれば判定段階、外側ループ内でcount=0にしていれば集計段階の問題です。最後の場合は候補を見ているのに、それまでの結果を失っています。この三段階を分けると原因を絞りやすくなります。判定が複雑ならis_valid関数に分け、候補を直接渡して検証できます。ただし今の条件はa[i]+a[j]==kだけなので、形式のために関数を増やさずその場に書く方が明快です。集計変数は全候補の生成前に初期化し、合格候補一つにつき一度だけ増やします。"
            },
            {
              "title": "次元を減らすには根拠が必要",
              "body": "全探索でも制約を利用すれば、別の難しい手法へ飛ばずに候補を減らせます。非負整数x、y、zがx+y+z=Nを満たすなら、xとyを選ぶとz=N−x−yに決まり、三番目のループは不要です。ただしz≥0や追加条件は調べます。一方、このペア問題でa[i]を決めると必要な値K−a[i]は分かりますが、位置は一意には決まりません。同じ値が複数位置にある可能性があるためです。後で辞書を使えば既出回数をまとめられますが、まず直接列挙が正しいことを理解します。枝刈りを行うなら、飛ばした候補が条件を満たさない理由を説明する必要があります。一つのサンプルで役に立たなそうだった、という理由で候補を消してはいけません。"
            },
            {
              "title": "正しさと費用と反例をまとめる",
              "body": "証明を網羅性、一意性、判定の正しさに分けます。合法なペアには小さい添字と大きい添字があるため、必ずi<jの形で生成されます。異なるループ位置は異なる添字組を表すので重複しません。最後の和の比較が題意そのものなので、countが答えです。判定回数は常にN(N−1)/2で、負数や0があっても変わりません。テストにはN=1、合格なし、全値同一、正負の打消しを含めます。すべての値がK/2なら全ペアが合格し、組合せの式が正解器になります。これによって誤った重複除去や二分割を発見できます。候補をすべて保存せず、その場で判定して集計すれば、入力リスト以外には少数の変数だけが必要です。"
            },
            {
              "title": "実習：順序と再選択の有無を比べる",
              "body": "同じ数列で問題を三種類に変えます。異なる添字の順序付きペアなら(i,j)と(j,i)を区別しN(N−1)候補です。順序を区別しない異なる添字なら本課のN(N−1)/2です。同じ添字を二回選ぶことを許す無順序組ならi≤jでN(N+1)/2候補になります。数値が同じでも対象の定義でループ範囲と答えが変わります。二つの数と書かれたから自動でi<jにするのではなく、文章からどの種類か確認しましょう。\n\n本課の条件では、列を逆順や任意順に並べ替えても値の多重集合が同じなので合格ペア数は変わりません。各値へc、目標へ2cを加えても答えは同じです。一要素を削除した場合は相手の数に依存し、一定の差にはなりません。三要素の全三候補を手で列挙し、ループが一度ずつ訪れるか確かめます。各範囲の始点と終点、特にrangeの右端が含まれない理由を説明してください。最初の合格で停止していないこと、診断用出力が解答に混入していないことも確認します。この習慣は硬貨の枚挙や状態探索にもそのまま役立ちます。"
            }
          ],
          "exerciseTitle": "和が指定値になるペア",
          "task": "N 個の整数と目標値 K が与えられます。i < j かつ Aᵢ + Aⱼ = K を満たす添字のペア数を求めてください。同じ値でも位置が異なれば別の要素です。1 ≤ N ≤ 2000、−10⁹ ≤ K, Aᵢ ≤ 10⁹ です。",
          "input": "1 行目に N K、2 行目に N 個の整数 Aᵢ が与えられます。",
          "output": "条件を満たす添字のペア数を出力してください。",
          "hint": "二重ループで j > i だけを調べます。リストから同じ値を削除してはいけません。",
          "explanation": "答えを0で初期化し、最初の添字iを順に選びます。二番目はi+1から始めるので異なる位置だけを使い、各無順序ペアが一度だけ現れます。a[i]+a[j]==kのときだけ増やします。同値でも位置が違えば別要素なので、重複除去や最初の一致でのbreakは行いません。N=1では候補がなく初値0が答えです。2が四つでK=4なら六組になります。異なる添字には小さい方と大きい方が一意にあるので網羅性と一意性が成立し、判定式も題意に一致するため総数は正しい値です。比較はN(N−1)/2回で時間O(N²)、入力領域O(N)、走査追加状態O(1)です。",
          "objectives": [
            "題意から候補を定義する",
            "i<jで漏れと重複を防ぐ",
            "全探索と枝刈りの根拠を説明する"
          ],
          "checkpoints": [
            {
              "question": "2が四つ、K=4なら何組ですか。",
              "answer": "4×3/2=6組です。同値でも位置は別です。"
            },
            {
              "question": "最初の合格でbreakしないのは？",
              "answer": "全組の数が必要で、一つのiが複数のjと組めるためです。"
            }
          ]
        }
      },
      "starter": "n, k = map(int, input().split())\na = list(map(int, input().split()))\n# TODO\n",
      "solution": "n, k = map(int, input().split())\na = list(map(int, input().split()))\ncount = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        if a[i] + a[j] == k:\n            count += 1\nprint(count)\n",
      "tests": [
        {
          "input": "1 4\n2\n",
          "expected": "0\n"
        },
        {
          "input": "4 4\n2 2 2 2\n",
          "expected": "6\n"
        },
        {
          "input": "5 0\n-2 2 -1 1 0\n",
          "expected": "2\n"
        },
        {
          "input": "4 100\n1 2 3 4\n",
          "expected": "0\n"
        }
      ]
    },
    {
      "id": "sorting-and-complexity",
      "order": 12,
      "stage": "methods",
      "minutes": 50,
      "prerequisiteIds": [
        "exhaustive-search"
      ],
      "relatedProblems": [
        "ABC088B",
        "ABC201B",
        "ABC212C"
      ],
      "content": {
        "zh": {
          "title": "排序：让最优答案出现在相邻位置",
          "summary": "区分排序接口、证明相邻检查充分，并保留题目真正需要的信息。",
          "sections": [
            {
              "title": "顺序如何改变候选结构",
              "body": "在任意顺序的列表中寻找最接近的两个数，直接想法是枚举所有下标对。然而数值差只依赖两个值，不依赖它们原来的位置，因此可以先把值按大小排列。排序不是简单的预处理习惯，而是把“可能很远的两个候选”变成“可以用相邻关系检查”的结构变化。用[10,2,5,15]观察：原输入中相邻差未必代表最优值；排序成[2,5,10,15]之后，相邻差为3、5、5，最小值3就出现了。在其他问题中，原有位置可能决定可选条件，那时不能未经证明就排序。始终先问：重排会不会改变答案的定义？"
            },
            {
              "title": "明确是否修改原列表",
              "body": "sorted(a)返回新的有序列表，原来的a保持不变；a.sort()直接修改a，返回值是None。因此写a=a.sort()会把变量a变成None，后续访问列表时才报错。默认升序，reverse=True得到降序，不能在升序推导的差值公式里偷偷换成降序。若原序还要用于输出位置，可以保存带位置的元组，例如(value,index)，但要明确并列时的顺序规则。本课只输出最小差，不需要原下标，所以原地排序最直接。尽管名称叫原地，Python排序可能使用额外工作空间；分析时不能因此断言整个排序过程绝不分配内存。",
              "code": "a = [5, 1, 4]\nb = sorted(a)\nprint(a)\nprint(b)\nresult = a.sort(reverse=True)\nprint(a)\nprint(result)",
              "output": "[5, 1, 4]\n[1, 4, 5]\n[5, 4, 1]\nNone\n"
            },
            {
              "title": "为什么只看相邻元素足够",
              "body": "设排序后b[i]≤b[j]，且j>i+1。差b[j]-b[i]等于从i到j之间所有相邻差的和，而每个相邻差都非负。因此，这个较远的差不可能小于区间内每一个相邻差；至少存在一个相邻候选不比它差。于是对任意最优的远距离配对，都能找到一个同样好或更好的相邻配对，检查相邻元素就足够了。这是“存在一个最优解具有某种结构”的证明，而不是宣称所有最优配对都相邻。若多个值相等，很多不同位置都能组成差0的最优对；我们只需要找最小差，不需要枚举所有达到最小差的对。"
            },
            {
              "title": "追踪排序后的扫描",
              "body": "用[8,3,10,4]排序得到[3,4,8,10]。先用第一组合法相邻差4-3=1初始化answer，而不是用0；若初值为0，后续min会一直保留0，除非实际存在重复值，否则答案错误。接着检查8-4=4，answer仍为1；最后检查10-8=2，仍为1。一般循环可以从i=1扫描到N-2，因为第一对已经用于初始化。也可以把answer初始化为一个足够大的值再扫描所有相邻对，但那个“足够大”必须由约束证明。优先从真实候选初始化，可以少记一个人为哨兵，也使N=2时的空循环自然正确。",
              "code": "a = sorted([8, 3, 10, 4])\nanswer = a[1] - a[0]\nprint(a, answer)\nfor i in range(1, len(a) - 1):\n    gap = a[i + 1] - a[i]\n    answer = min(answer, gap)\n    print(i, gap, answer)",
              "output": "[3, 4, 8, 10] 1\n1 4 1\n2 2 1\n"
            },
            {
              "title": "重复值、负数与比较键",
              "body": "重复值必须保留，因为两个不同位置都等于8时，合法最小差就是0。先做set去重会把最优候选删掉。负数不需要特殊分支，升序相减仍非负，例如[-8,-7,-3]的相邻差是1和4。字符串排序则按字符顺序，不会把“10”和“2”当作整数比较，读入阶段要把数值转换成int。扩展到带名字的记录时，可用key指定按哪个字段排序，而不是依赖整段元组的默认比较；如果需要第二关键字，要明确写入key。排序保证的稳定性指相同关键字保留原相对顺序，它不自动替你实现题目要求的所有并列规则。"
            },
            {
              "title": "如何决定用排序还是枚举",
              "body": "如果题目询问最小差、大小排名、按顺序分配、相同值聚集，排序值得优先考虑，但仍要证明重排后哪些候选可以省去。本课把O(N²)数对检查变成O(NlogN)排序加O(N)扫描，N≤200000时才有合理规模。若N非常小，朴素枚举仍可作为独立测试用的正解器：对短列表枚举所有i<j，求abs(a[i]-a[j])最小值，与排序解比较。测试包括两端极值、全相同、已经升序、逆序、全负数，以及最优对原来相距很远。不要把本课结论套到“原数组相邻两数差最小”的题，那类题的邻接关系本来由输入位置决定，排序会改变问题。"
            },
            {
              "title": "工作坊：排序前后保留了哪些性质",
              "body": "请对列表[5,1,5,9]回答几个问题。排序前后的总和、元素个数、最大值、最小值和每种数值的出现次数都不变；原位置、相邻元素关系以及某个值第一次出现的下标通常会变。最小绝对差只使用数值与不同位置对应的两个元素，重排后仍能选到同样的两个对象，因此答案保持0。若问题改成最长连续递增片段，排序会把原本不相邻的对象放到一起，显然不能保持答案。把这些不变量列出来，比凭经验说“这题大概可以排序”更严谨。\n\n还要区分“返回最小差”和“返回最小差对应的所有下标对”。后者在全部相同的输入上可能有N(N-1)/2个答案，仅扫描相邻对不能完整枚举这些下标对；本课证明只保证找到一个最优值。若只需返回其中一对原下标，可以排序(value,index)后记录相邻候选的原位置。若存在并列，还需根据题目规定选择字典序最小或其他规则，而不能认为排序稳定性自动完成了全部要求。练习时先写下你要输出的对象是什么，再决定需要保留哪些信息。最后把排序解与朴素枚举在所有两三项的小例子上对比，特别检查重复值没有在处理中丢失。"
            }
          ],
          "exerciseTitle": "最小差值",
          "task": "给定 N 个整数，找出两个不同位置上的数，其绝对差最小，输出这个差值。允许重复值。2 ≤ N ≤ 200000，−10⁹ ≤ Aᵢ ≤ 10⁹。",
          "input": "第一行 N；第二行 N 个整数。",
          "output": "输出最小绝对差。",
          "hint": "排序后，只需要检查相邻两个数的差。重复值可以让答案为 0。",
          "explanation": "先把整数列表升序排序，保留所有重复值。使用第一对相邻值的差a[1]-a[0]初始化答案，避免人为哨兵值；N≥2保证这一对存在。随后扫描尚未检查的相邻对，用更小的差更新答案。排序后任何较远两值的差都是中间若干非负相邻差之和，所以一定有相邻差不大于它；全局最小差因此能在相邻对中找到。两个不同位置的相同数值会相邻并产生0，这是合法答案而非需要消除的重复。负数排序后同样适用。排序O(NlogN)，扫描O(N)，总时间O(NlogN)；输入列表和排序工作空间按O(N)计。若题目要求原下标，需另存位置，但本练习只输出差值。",
          "objectives": [
            "正确选择sorted与sort",
            "证明相邻差包含最优解",
            "避免去重、字符串排序和位置丢失错误"
          ],
          "checkpoints": [
            {
              "question": "为什么先set去重会错？",
              "answer": "相同值位于不同位置时差0是合法答案，去重会删掉它。"
            },
            {
              "question": "排序后为什么不需要abs？",
              "answer": "升序中a[i+1]≥a[i]，前者减后者自然非负。"
            }
          ]
        },
        "en": {
          "title": "Sorting to expose adjacent candidates",
          "summary": "Choose the right sorting interface and prove why adjacent comparisons suffice.",
          "sections": [
            {
              "title": "How ordering changes the candidate space",
              "body": "To find the closest two values in an arbitrary list, the direct approach examines every pair. But numerical distance depends on the values, not on their original positions, so reordering is allowed. Sorting is not an automatic preprocessing habit: it changes the structure so distant-looking candidates can be replaced by neighbors in value order. For [10,2,5,15], original neighbors do not explain the optimum; sorting yields [2,5,10,15] with gaps 3,5,5. In other tasks, original positions may define which selections are legal. Ask whether reordering preserves the question before sorting merely because the technique is familiar."
            },
            {
              "title": "Choose an interface deliberately",
              "body": "sorted(a) returns a new ordered list without changing a. In contrast, a.sort() modifies a and returns None, so assigning a=a.sort() destroys the variable’s reference to the list. The default order is ascending; reverse=True changes the order and also changes which subtraction produces a nonnegative gap. If the original positions are needed later, retain pairs such as (value,index), with an explicit tie rule. This exercise only asks for the distance, so sorting the existing list is straightforward. “In place” describes the visible interface; Python’s sort can still allocate temporary workspace, which must be considered in a memory discussion.",
              "code": "a = [5, 1, 4]\nb = sorted(a)\nprint(a)\nprint(b)\nresult = a.sort(reverse=True)\nprint(a)\nprint(result)",
              "output": "[5, 1, 4]\n[1, 4, 5]\n[5, 4, 1]\nNone\n"
            },
            {
              "title": "Prove that adjacent pairs suffice",
              "body": "For sorted b and j>i+1, the difference b[j]−b[i] is the sum of all adjacent gaps between them. Every gap is nonnegative. Consequently, a distant pair cannot have a difference smaller than every adjacent gap inside its interval: some adjacent candidate is at least as good. Any optimum can therefore be replaced by an equally good or better neighboring pair. This proves that an optimum exists among neighbors, not that every optimal pair must be adjacent. With repeated equal values, many position pairs can all have distance zero. The exercise asks for the minimum value, not an enumeration of every pair attaining it."
            },
            {
              "title": "Trace the ordered scan",
              "body": "Sorting [8,3,10,4] gives [3,4,8,10]. Initialize answer from the first real gap, 4−3=1. Zero is not a suitable initial value for a minimum: every later min would retain it even when no equal values exist. The next gap is four, then two, so the answer remains one. Since the first pair established the initial candidate, the remaining scan starts at i=1 and ends at N−2. An artificially large sentinel can also work, but its size must follow from the constraints. Initializing from a genuine candidate avoids that extra assumption and handles N=2 with an empty remaining loop.",
              "code": "a = sorted([8, 3, 10, 4])\nanswer = a[1] - a[0]\nprint(a, answer)\nfor i in range(1, len(a) - 1):\n    gap = a[i + 1] - a[i]\n    answer = min(answer, gap)\n    print(i, gap, answer)",
              "output": "[3, 4, 8, 10] 1\n1 4 1\n2 2 1\n"
            },
            {
              "title": "Duplicates, negatives, and keys",
              "body": "Keep duplicates: two different positions both containing eight produce the valid optimal difference zero. Converting the list to a set would remove that candidate. Negative values need no special branch because ascending subtraction stays nonnegative. Input strings, however, sort lexicographically rather than numerically, so convert numeric tokens to int first. For named records, use an explicit key to choose the field instead of accidentally comparing entire tuples. If a secondary rule is required, include it in the key. Stability means records with equal keys retain their previous relative order; it does not invent all tie rules that a statement might request."
            },
            {
              "title": "Recognize when sorting is appropriate",
              "body": "Minimum distances, ranks, ordered allocation, and groups of equal values often suggest sorting, but you must still explain which candidates can be discarded afterward. Here an O(N²) pair scan becomes O(N log N) sorting plus O(N) scanning, suitable for the stated large bound. Keep the brute-force version as an independent oracle for short lists: enumerate all i<j and minimize abs(a[i]−a[j]). Compare both methods on extreme values, duplicates, ascending and descending lists, negatives, and an optimal pair originally far apart. Do not transfer the result to a question specifically about adjacent positions in the original array; sorting would redefine its adjacency relation."
            },
            {
              "title": "Workshop: what does sorting preserve?",
              "body": "For [5,1,5,9], sorting preserves the total, length, extrema, and frequency of every value. It generally changes positions, original adjacency, and first-occurrence indices. Minimum absolute difference only uses the values of two distinct elements, so the same objects remain selectable and the optimum stays zero. A longest contiguous increasing segment is different: sorting creates new neighbor relations and does not preserve the answer. Listing preserved properties is more reliable than saying that sorting “seems appropriate.”\n\nAlso separate returning the minimum distance from returning every pair of original indices attaining it. An all-equal array may have N(N−1)/2 optimal pairs, so scanning only neighbors cannot list them all. Our proof guarantees finding an optimal value. To return one pair of original indices, retain (value,index) records while sorting and save the chosen adjacent pair’s original indices. If ties require a lexicographic or other rule, implement that rule explicitly. Write down the requested output object before discarding information, then compare the optimized method with exhaustive search on short lists containing duplicates."
            }
          ],
          "exerciseTitle": "Minimum difference",
          "task": "Given N integers, find the minimum absolute difference between values at two distinct positions. Repeated values are allowed. 2 ≤ N ≤ 200000 and −10⁹ ≤ Aᵢ ≤ 10⁹.",
          "input": "N on the first line; N integers on the second.",
          "output": "Print the minimum absolute difference.",
          "hint": "After sorting, check only adjacent pairs. Repeated values can produce an answer of 0.",
          "explanation": "Sort the integer list in ascending order without removing duplicates. Initialize the answer from a[1]−a[0]; N≥2 guarantees that real candidate exists. Scan the remaining adjacent pairs and retain the smallest gap. Any difference between nonadjacent sorted values is a sum of intervening nonnegative gaps, so at least one adjacent gap is no larger. Hence a global minimum occurs among adjacent candidates. Equal values at distinct positions become neighbors and give zero, a valid answer rather than redundant data to remove. Negative values require no extra branch. Sorting takes O(N log N), the scan O(N), and total storage including the input and sorting workspace is O(N). Returning original indices would require preserving them, but this exercise asks only for the distance.",
          "objectives": [
            "Choose sorted or sort correctly",
            "Prove the adjacent-gap reduction",
            "Preserve duplicates and required positional information"
          ],
          "checkpoints": [
            {
              "question": "Why can set conversion change the answer?",
              "answer": "Distinct positions with equal values give distance zero; deduplication removes that pair."
            },
            {
              "question": "Why is abs unnecessary after sorting?",
              "answer": "In ascending order, a[i+1] is at least a[i]."
            }
          ]
        },
        "ja": {
          "title": "ソートで隣接候補を取り出す",
          "summary": "ソートの使い分けと、隣同士だけで十分な理由を学びます。",
          "sections": [
            {
              "title": "順序によって候補の構造が変わる",
              "body": "任意順のリストから最も近い二値を選ぶなら、直接的には全添字ペアを調べます。しかし数値の差は元の位置に依存しないので、値を大小順に並べ替えられます。ソートは単なる習慣的な前処理ではなく、離れて見える候補を値の隣接関係で扱えるようにする構造変化です。[10,2,5,15]を[2,5,10,15]にすると、隣接差3、5、5から最小値3が現れます。元の順番で隣同士だけを見るのとは違います。他の問題では元の位置が選択条件を決めることもあり、その場合に無条件でソートすると題意を変えてしまいます。まず「並べ替えても答えの定義が保たれるか」を確認してください。"
            },
            {
              "title": "元のリストを書き換えるかを決める",
              "body": "sorted(a)は新しい整列済みリストを返し、aを変更しません。a.sort()はa自身を書き換えてNoneを返すため、a=a.sort()と代入するとaはリストでなくなります。既定は昇順で、reverse=Trueなら降順です。昇順に合わせて導いた差の式に、説明なしで降順を混ぜてはいけません。元の位置が必要なら(value,index)のような組で保存し、同値の順序も明確にします。本課題は差だけを求めるので、元リストの並べ替えが簡潔です。「その場で並べ替える」という操作の説明は、内部で追加領域を一切使わないという保証ではありません。Pythonのソートには作業用メモリが必要になる場合があります。",
              "code": "a = [5, 1, 4]\nb = sorted(a)\nprint(a)\nprint(b)\nresult = a.sort(reverse=True)\nprint(a)\nprint(result)",
              "output": "[5, 1, 4]\n[1, 4, 5]\n[5, 4, 1]\nNone\n"
            },
            {
              "title": "隣接要素だけで十分な理由を証明する",
              "body": "整列後のbについてi<jを取り、間に要素がある場合を考えます。b[j]−b[i]は、その間のすべての隣接差を足した値です。各隣接差は非負なので、遠い二値の差が途中のすべての隣接差より小さくなることはありません。少なくとも一つ、同等かそれ以上に良い隣接候補があります。したがって最適な遠いペアを、同等かさらに良い隣接ペアに置き換えられます。これは「最適解が隣接候補の中に存在する」という証明で、「すべての最適ペアが隣接する」という主張ではありません。同じ値が複数あれば差0の最適ペアは多数ありますが、本課題は最小差だけを求めます。"
            },
            {
              "title": "整列後の走査を追う",
              "body": "[8,3,10,4]を並べ替えると[3,4,8,10]です。最初の実在する隣接差4−3=1をanswerの初期値にします。最小値を0で初期化すると、その後のminは常に0を保持し、重複値がない場合に誤答となります。次の差8−4=4、最後の差10−8=2ではどちらもanswerは1のままです。最初のペアを初期化に使ったので、残りのループはi=1からN−2までで十分です。非常に大きい番兵値から始めて全ペアを走査してもよいのですが、その大きさは制約に基づく必要があります。実在する候補から初期化すると仮定が一つ減り、N=2では残りのループが空でも自然に正しくなります。",
              "code": "a = sorted([8, 3, 10, 4])\nanswer = a[1] - a[0]\nprint(a, answer)\nfor i in range(1, len(a) - 1):\n    gap = a[i + 1] - a[i]\n    answer = min(answer, gap)\n    print(i, gap, answer)",
              "output": "[3, 4, 8, 10] 1\n1 4 1\n2 2 1\n"
            },
            {
              "title": "重複・負数・比較キーに注意する",
              "body": "重複値は残します。異なる二位置がともに8なら差0が合法な最適候補で、setによる重複除去はそれを消してしまいます。負数にも特別な分岐は不要で、[-8,-7,-3]なら隣接差は1と4です。ただし文字列は文字の順で整列され、「10」と「2」は整数の大小として比較されません。入力時にintへ変換しましょう。名前付き記録へ応用するときはkeyで比較する項目を指定し、タプル全体の暗黙の比較に頼らないようにします。第二条件があるならkeyにも明記します。安定なソートとは同じキーの元の相対順を保つことであり、問題が要求する並列時の規則をすべて自動で実現する意味ではありません。"
            },
            {
              "title": "ソートと全探索をどう選ぶか",
              "body": "最小差、順位、順番に割り当てる処理、同値の集約などではソートが候補になります。ただし並べ替え後にどの候補を省けるかの証明は必要です。本課題ではO(N²)のペア判定を、O(NlogN)のソートとO(N)の走査に置き換え、N≤200000に対応します。小さい入力では全探索を独立の正解器として残し、すべてのi<jでabs(a[i]−a[j])を計算して比較できます。両端の極値、全値同一、昇順、逆順、全負数、元の位置では遠い最適ペアを試します。この結論を「元配列で隣接する二要素の最小差」に流用してはいけません。その隣接関係は入力位置で定まり、ソートすると問題を別のものへ変えてしまいます。"
            },
            {
              "title": "実習：並べ替えで保つ性質を確認する",
              "body": "[5,1,5,9]を並べ替えても、総和、個数、最大値、最小値、各値の出現回数は変わりません。元位置、元の隣接関係、最初の出現添字は一般に変わります。最小絶対差は異なる二要素の数値を使うだけで、同じ対象を再び選べるので答え0を保ちます。最長連続増加部分なら、新たな隣接関係が作られて答えを保ちません。「ソートできそう」という印象ではなく、保存される性質を列挙すると根拠が明確になります。\n\nまた最小差の値を返すことと、それを達成する元添字ペアをすべて返すことは別です。全要素同一では最適ペアがN(N−1)/2個あり、隣接だけの走査で全ペアは列挙できません。本課の証明は最適値が見つかる保証です。一組の元添字を返すだけなら(value,index)を並べ替え、選んだ隣接候補の元位置を保存できます。並列時に辞書順などが指定されるなら、その規則を明示的に実装します。情報を捨てる前に出力対象を定義し、重複を含む短い列で全探索と比較してください。"
            }
          ],
          "exerciseTitle": "最小の差",
          "task": "N 個の整数が与えられます。異なる 2 つの位置の値の絶対差の最小値を求めてください。同じ値が複数現れてもかまいません。2 ≤ N ≤ 200000、−10⁹ ≤ Aᵢ ≤ 10⁹ です。",
          "input": "1 行目に N、2 行目に N 個の整数が与えられます。",
          "output": "絶対差の最小値を出力してください。",
          "hint": "ソートした後、隣り合う要素の差だけを調べます。同じ値があれば答えは 0 になり得ます。",
          "explanation": "整数列を昇順に整列し、重複値も残します。N≥2なので存在する最初の隣接差a[1]−a[0]で答えを初期化し、残る隣接ペアを走査して小さい差を保持します。離れた二値の差は間の非負な隣接差の和なので、少なくとも一つの隣接差がそれ以下です。したがって全体の最小値は隣接候補から得られます。異なる位置の同値は隣り合って0を作り、これは削除すべき冗長性でなく合法な答えです。負数も同じ方法で扱えます。整列O(NlogN)、走査O(N)、入力と整列作業領域を含めO(N)です。元添字が必要なら保存しますが、本課題の出力は差だけです。",
          "objectives": [
            "sortedとsortを使い分ける",
            "隣接差への帰着を証明する",
            "重複と必要な位置情報を保持する"
          ],
          "checkpoints": [
            {
              "question": "set化で答えが変わる理由は？",
              "answer": "異なる位置の同値による差0のペアが消えるためです。"
            },
            {
              "question": "昇順後にabsが不要なのは？",
              "answer": "a[i+1]≥a[i]なので差が非負だからです。"
            }
          ]
        }
      },
      "starter": "n = int(input())\na = list(map(int, input().split()))\n# TODO\n",
      "solution": "n = int(input())\na = list(map(int, input().split()))\na.sort()\nanswer = a[1] - a[0]\nfor i in range(1, n - 1):\n    answer = min(answer, a[i + 1] - a[i])\nprint(answer)\n",
      "tests": [
        {
          "input": "2\n-1000000000 1000000000\n",
          "expected": "2000000000\n"
        },
        {
          "input": "4\n8 3 8 20\n",
          "expected": "0\n"
        },
        {
          "input": "4\n10 2 5 15\n",
          "expected": "3\n"
        },
        {
          "input": "3\n-8 -3 -7\n",
          "expected": "1\n"
        }
      ]
    },
    {
      "id": "sets-and-dictionaries",
      "order": 13,
      "stage": "sequences",
      "minutes": 50,
      "prerequisiteIds": [
        "sorting-and-complexity"
      ],
      "relatedProblems": [
        "ABC085B",
        "ABC338B",
        "APG4bPython EX20"
      ],
      "content": {
        "zh": {
          "title": "集合与字典：把历史压缩成状态",
          "summary": "根据是否需要次数选择数据结构，建立一遍扫描的统计方法。",
          "sections": [
            {
              "title": "从重复查询中发现需求",
              "body": "假设要统计十万个整数的种类数，每读入一个数就重新扫描之前所有元素，最坏会产生二次工作量。真正需要记住的不是出现过程的所有细节，而是“这个值以前是否出现过”。集合保存这一信息。若还要输出最高出现次数，仅有集合就不够，因为集合不会保留重复次数；应改用字典，把每个数映射到一个计数。这是先确定信息需求，再选择容器，而不是记住“看到去重就set”的口号。序列位置、首次出现位置、总次数是不同信息；丢掉以后不一定能恢复。先用一句话定义每个键和值的含义，能让更新规则和正确性更容易检查。"
            },
            {
              "title": "集合保存有无，不保存次数",
              "body": "空集合要写set()，而不是{}，后者创建空字典。seen.add(x)把值记录到集合，再添加同一个值不会增加大小；x in seen判断成员关系；len(seen)给出不同元素数量。集合的遍历顺序不应当用来表示最小值、排名或首次出现顺序，如果需要有序输出，应显式sorted(seen)。值必须可哈希，整数和字符串常用，普通列表不能直接当集合元素。本课输入是整数，不必处理复杂对象。实践中可以用len(set(a))快速求种类数，但这只能回答有无问题，不能从set反推出某个值在原列表出现了多少次。",
              "code": "seen = set()\nfor x in [4, 2, 4]:\n    seen.add(x)\n    print(len(seen), x in seen)\nprint(sorted(seen))",
              "output": "1 True\n2 True\n2 True\n[2, 4]\n"
            },
            {
              "title": "字典更新的精确含义",
              "body": "令freq[x]表示已经处理的前缀中x出现的次数。处理一个新值x时，应把旧次数加1。若x还没有出现，旧次数视为0，所以写freq[x]=freq.get(x,0)+1。直接freq[x]+=1会在第一次遇到新键时抛KeyError。另一种显式写法是先判断x是否在字典中，不在就设为0，然后再加1。两种写法语义相同，先理解再选简洁写法。遍历字典得到的是键，freq.values()得到次数，freq.items()得到键与次数配对；不要把max(freq)误当最高频率，它返回的是最大的键。键可以为负，字典不会要求数值从0开始连续排列。"
            },
            {
              "title": "逐步追踪一份频率表",
              "body": "用[3,-1,3,2,-1,3,2]构表。第一项后有3→1；第二项新增-1→1；第三项只把3改为2；第四项新增2→1；随后-1改为2、3改为3、2改为2。最终三个键对应次数3、2、2，因此种类数3、最高频率3。每步只改变当前值对应的一个格子，其余键的次数保持不变。这说明为什么不需要每次重新数完整列表。下方为了固定输出顺序，打印sorted(freq.items())；正式求答案不需要排序。观察所有计数之和应等于已经读过的元素数，这是很有用的调试检查，但不要每轮真的sum全部字典值，否则会重新引入不必要的扫描。",
              "code": "freq = {}\nfor x in [3, -1, 3, 2, -1, 3, 2]:\n    freq[x] = freq.get(x, 0) + 1\n    print(x, freq[x], len(freq))\nprint(sorted(freq.items()))\nprint(len(freq), max(freq.values()))",
              "output": "3 1 1\n-1 1 2\n3 2 2\n2 1 3\n-1 2 3\n3 3 3\n2 2 3\n[(-1, 2), (2, 2), (3, 3)]\n3 3\n"
            },
            {
              "title": "用状态压缩优化数对计数",
              "body": "回想枚举课的和为K的数对。如果从左到右扫描，把此前数值的出现次数放入freq，那么读到当前x时，能与它配对的旧元素共有freq.get(K-x,0)个。先把这个次数加到答案，再将当前x计入字典，就不会配对自己；顺序反过来时，当2x=K便可能多算自己。重复值依然正确，因为字典保存次数而不是仅保存有无。这不是本课练习要求的额外输出，而是展示如何把“与所有旧元素比较”压缩成一次查询。正确性仍然依赖此前前缀的精确定义，不能把整个输入先统计好后直接同样求和，否则每对会被两端分别计算。"
            },
            {
              "title": "复杂度与容器选择的边界",
              "body": "对N个输入每次做一次字典查询和更新，通常平均时间O(N)，不同值数量D决定字典占用O(D)空间。这里的O(1)查询是哈希表平均性质，不是每种操作在每种输入下的绝对上界。若值域很小而且非负，也可以用固定长度列表作计数表，此时下标就是值；若值很大或负数很多，字典更自然。最高频率用max(freq.values())需要扫描D个计数，总体仍线性。因为题目保证N≥1，字典不会为空；如果扩展允许空输入，就必须单独定义答案，不能对空values直接max。测试全相同、全不同、负数、0和不同值并列最高频率，确认输出要的是次数而非对应数值。"
            },
            {
              "title": "工作坊：频率、最频值与首次出现",
              "body": "本练习输出“最高频率”，而不是“最频繁的那个整数”。例如[9,9,-2,-2]的答案是种类数2和最高频率2，不需要在9与-2之间选择。若题目改成返回最频值，便必须规定并列规则：取最小值、取最先出现者、或允许任意一个。这个规则决定需要额外保存位置、排序键，还是只扫描频率表。不要在没有题目依据时依赖字典的插入顺序来代替规则。即使Python保留插入顺序，它表达的也只是键第一次被插入的顺序，不自动等于大小顺序。\n\n还可以从频率表推出其他统计：所有频率相加是N，频率等于1的键数量是只出现一次的值种类数，各键的c(c-1)//2之和是“数值相等的下标对”数量。这些是不同的问题，不应把种类数、元素数和配对数混在一起。对于x=[4,4,4,7]，三者分别会得到2、4和3。你可以先手算这些结果，再写几行循环验证。需要删除键时，也应区分计数降为0和键仍留在字典中的情况：len(freq)只数键，不理解你赋给它的0意味着“不存在”。本课只增加计数，所以不会出现零频率键；以后滑动窗口中删除元素时，这个细节就十分重要。"
            }
          ],
          "exerciseTitle": "种类与最高频率",
          "task": "给定 N 个整数，输出不同整数的数量和任意一个整数出现次数的最大值。1 ≤ N ≤ 100000，−10⁹ ≤ Aᵢ ≤ 10⁹。",
          "input": "第一行 N；第二行 N 个整数。",
          "output": "一行输出种类数和最高出现次数，以空格分隔。",
          "hint": "字典的键就是不同值；字典的值就是对应次数。可用 len(freq) 和 max(freq.values())。",
          "explanation": "建立空字典freq，并按输入顺序处理每个整数x。freq.get(x,0)取出旧次数，未出现时视为0，加1后写回。由归纳可知，每个键对应已处理前缀中该值的真实出现次数。所有元素处理完后，字典键数len(freq)就是不同整数的种类数，max(freq.values())就是任意一个整数出现次数的最大值。不要用max(freq)，它比较的是键本身。题目保证N≥1，因而频率集合非空；并列最高频率不需要额外处理，因为只输出次数，不输出对应整数。全相同输入得到1与N，全不同输入得到N与1，可用于检查。平均时间O(N)，若有D个不同值，字典空间O(D)；参考实现保存输入列表，整体空间O(N)。",
          "objectives": [
            "区分成员关系与频率",
            "维护前缀频率的不变式",
            "正确使用get、values与items"
          ],
          "checkpoints": [
            {
              "question": "max(freq)得到最高次数吗？",
              "answer": "不是，得到最大键；最高次数应看freq.values()。"
            },
            {
              "question": "优化数对计数时为何先查询后加入当前元素？",
              "answer": "字典必须只表示旧位置，才能避免把元素与自己配对。"
            }
          ]
        },
        "en": {
          "title": "Sets and dictionaries as compact history",
          "summary": "Choose membership or frequency storage and build a one-pass summary.",
          "sections": [
            {
              "title": "Find the information that repeated queries need",
              "body": "Suppose you need the distinct count of one hundred thousand integers. Scanning all earlier values after every input can create quadratic work. The relevant history is not every event in order, but whether each value has appeared. A set records that fact. If the task also asks for the largest occurrence count, membership alone is insufficient because a set discards multiplicity. Use a dictionary mapping each value to its frequency. Choose the information model before the container. Position, first occurrence, and total frequency are different facts; once discarded, they may be impossible to reconstruct. State the meaning of each key and value explicitly."
            },
            {
              "title": "A set stores presence, not multiplicity",
              "body": "Write set() for an empty set; {} creates a dictionary. Adding an existing element does not increase the set size. Membership uses x in seen, and len(seen) returns the number of distinct elements. Do not interpret set iteration order as numerical rank or first occurrence; request sorted(seen) when ordered output is required. Elements must be hashable, so integers and strings work while ordinary lists cannot be inserted directly. Our input consists only of integers. The compact expression len(set(a)) solves distinct counting, but it cannot recover how many times an element occurred in the original sequence.",
              "code": "seen = set()\nfor x in [4, 2, 4]:\n    seen.add(x)\n    print(len(seen), x in seen)\nprint(sorted(seen))",
              "output": "1 True\n2 True\n2 True\n[2, 4]\n"
            },
            {
              "title": "Define the update precisely",
              "body": "Let freq[x] mean the number of occurrences of x in the prefix already processed. A new x increases its old count by one. For an absent key, the old count is zero, giving freq[x]=freq.get(x,0)+1. Directly using freq[x]+=1 raises KeyError on the first occurrence. You can equivalently initialize absent keys explicitly before incrementing. Iterating over a dictionary yields keys; values() yields counts, and items() yields key-count pairs. In particular, max(freq) returns the largest key, not the highest frequency. Negative and widely separated integers are valid keys; dictionary storage does not require a dense zero-based numerical range."
            },
            {
              "title": "Trace a frequency table",
              "body": "Process [3,-1,3,2,-1,3,2]. The first two items create counts for three and minus one. The next three updates increase three, create two, and increase minus one. Finally three reaches three occurrences and two reaches two. The finished table has three keys with counts 3,2,2. Each input changes exactly one cell, leaving every other count intact, which explains why rescanning the entire list is unnecessary. The demonstration sorts items only to make its printed trace deterministic. The sum of all counts should equal the processed length, a useful diagnostic invariant, but recomputing that sum every iteration would add avoidable work.",
              "code": "freq = {}\nfor x in [3, -1, 3, 2, -1, 3, 2]:\n    freq[x] = freq.get(x, 0) + 1\n    print(x, freq[x], len(freq))\nprint(sorted(freq.items()))\nprint(len(freq), max(freq.values()))",
              "output": "3 1 1\n-1 1 2\n3 2 2\n2 1 3\n-1 2 3\n3 3 3\n2 2 3\n[(-1, 2), (2, 2), (3, 3)]\n3 3\n"
            },
            {
              "title": "Compress the history used by pair counting",
              "body": "Recall the target-sum pair task. While scanning left to right, store frequencies of earlier values. When the current value is x, exactly freq.get(K−x,0) earlier positions can pair with it. Add that count before inserting the current x, otherwise an element with 2x=K may pair with itself. Repeated values remain correct because the dictionary retains multiplicity. This is an application of the data structure, not an extra output required by this exercise. Its correctness depends on the meaning “earlier prefix”; building a table for the entire input and summing the same formula would count pairs from both ends."
            },
            {
              "title": "Complexity and the boundary of the representation",
              "body": "One dictionary lookup and update per input gives average O(N) time, with O(D) storage for D distinct values. The constant-time lookup claim is an average hash-table property, not an absolute guarantee for every operation on every possible input. A small nonnegative value range may instead use a fixed counting list; large or negative keys make a dictionary more natural. Finding max(freq.values()) scans D counts and still leaves total time linear. N is at least one here, so the table is nonempty. An extension allowing empty input needs a defined answer instead of max on an empty collection. Test equal frequencies carefully: the required output is a frequency, not its associated key."
            },
            {
              "title": "Workshop: frequency, mode, and first occurrence",
              "body": "This exercise returns the highest frequency, not the integer that occurs most often. For [9,9,−2,−2], the requested output is distinct count two and frequency two; no tie between nine and minus two needs resolving. A task asking for a mode must state whether ties choose the smallest value, the earliest occurrence, or any answer. That determines whether positions, sorted keys, or a simple scan are needed. Dictionary insertion order represents first insertion, not numerical order or every possible tie policy.\n\nOther summaries follow from the same table. Frequencies sum to N; keys with count one identify values appearing once; summing c(c−1)//2 over keys counts equal-value index pairs. These are different questions. For [4,4,4,7], distinct count, element count, and equal-value pair count are two, four, and three. Predict them before writing code. When later decrementing counts, distinguish a key with zero frequency from a removed key: len(freq) counts stored keys, regardless of your intended interpretation of zero. Our insertion-only exercise avoids this issue, but sliding-window frequency tables will need explicit handling."
            }
          ],
          "exerciseTitle": "Distinct values and peak frequency",
          "task": "Given N integers, print the number of distinct integers and the largest number of occurrences of any integer. 1 ≤ N ≤ 100000 and −10⁹ ≤ Aᵢ ≤ 10⁹.",
          "input": "N on the first line; N integers on the second.",
          "output": "Print the distinct count and maximum frequency on one line, separated by a space.",
          "hint": "Dictionary keys are distinct values; dictionary values are their counts. Use len(freq) and max(freq.values()).",
          "explanation": "Create an empty frequency dictionary and process each integer x in input order. Read its previous count with freq.get(x,0), add one, and store it back. Inductively every entry now equals the true occurrence count in the processed prefix. After all inputs, len(freq) counts distinct keys and max(freq.values()) gives the largest frequency. max(freq) would compare keys instead. N≥1 guarantees a nonempty collection; tied peak frequencies need no selection rule because only the count is requested, not the associated integer. All-equal data yields 1 and N; all-distinct data yields N and 1. Time is average O(N), dictionary space O(D) for D distinct values, and total space O(N) because the reference retains the input list.",
          "objectives": [
            "Distinguish membership from frequency",
            "Maintain a prefix-frequency invariant",
            "Use get, values, and items correctly"
          ],
          "checkpoints": [
            {
              "question": "Does max(freq) return the highest frequency?",
              "answer": "No. It returns the largest key. Inspect freq.values() for frequencies."
            },
            {
              "question": "Why query before inserting x in pair counting?",
              "answer": "The table must contain only earlier positions to exclude self-pairing."
            }
          ]
        },
        "ja": {
          "title": "集合と辞書で履歴を状態にまとめる",
          "summary": "出現の有無か回数かを区別し、一回の走査で集計します。",
          "sections": [
            {
              "title": "繰り返す質問から必要な情報を見つける",
              "body": "十万個の整数の種類数を求めるとき、各入力のたびに過去の全要素を走査すると二次時間になり得ます。必要な履歴は出現過程の全詳細ではなく、その値が以前に現れたかどうかです。集合はその情報を保存します。さらに最大出現回数も必要なら、集合は重複回数を捨てるため不十分で、値から頻度への辞書を使います。容器を先に選ぶのではなく、保存すべき情報を先に決めましょう。位置、初出位置、総出現回数は異なる情報です。捨てた後で復元できるとは限りません。キーと値の意味を一文で定義してから更新規則を書くと、正しさを確認しやすくなります。"
            },
            {
              "title": "集合は有無を保存し、回数を保存しない",
              "body": "空集合はset()と書きます。{}は空辞書なので区別してください。seen.add(x)で記録し、同じ値を再び追加しても要素数は増えません。x in seenで存在を確認し、len(seen)で異なる値の数を得ます。集合の列挙順を最小値、順位、初出順として扱ってはいけません。整列が必要ならsorted(seen)を明示します。要素にはハッシュ可能性が必要で、整数や文字列は利用できますが、普通のリストをそのまま要素にはできません。本課題の入力は整数なので複雑な対象を考える必要はありません。len(set(a))は種類数を簡潔に計算できますが、元の列に各値が何回あったかを集合から復元することはできません。",
              "code": "seen = set()\nfor x in [4, 2, 4]:\n    seen.add(x)\n    print(len(seen), x in seen)\nprint(sorted(seen))",
              "output": "1 True\n2 True\n2 True\n[2, 4]\n"
            },
            {
              "title": "更新式の意味を正確に定義する",
              "body": "freq[x]を「処理済みの接頭部分でxが出現した回数」と定義します。新しいxを読んだら以前の回数を1増やします。未登録なら以前の回数は0なので、freq[x]=freq.get(x,0)+1と書けます。直接freq[x]+=1を使うと、新しいキーの初回にKeyErrorになります。存在を確認して未登録なら0を代入し、その後加算する明示的な書き方でも同じです。意味を理解してから短い形を選びましょう。辞書の走査はキー、values()は頻度、items()はキーと頻度の組を返します。max(freq)は最大頻度でなく最大キーです。負数や離れた整数もキーにでき、値が0から連続している必要はありません。"
            },
            {
              "title": "頻度表の変化を追跡する",
              "body": "[3,-1,3,2,-1,3,2]で表を作ります。最初は3→1、次に−1→1を追加し、三番目では3の回数だけを2にします。四番目に2→1を追加した後、−1を2、3を3、2を2へ更新します。最終的に三キーの頻度は3、2、2なので、種類数3、最大頻度3です。各入力で変化するのはその値の一か所だけで、他の回数は変わりません。全リストを毎回数え直す必要がない理由がここにあります。追跡例では表示順を一定にするためsorted(freq.items())を使いますが、解答計算にソートは不要です。回数の合計が処理済み要素数になることは診断に使えますが、毎回本当に全値をsumすると余分な走査を再導入してしまいます。",
              "code": "freq = {}\nfor x in [3, -1, 3, 2, -1, 3, 2]:\n    freq[x] = freq.get(x, 0) + 1\n    print(x, freq[x], len(freq))\nprint(sorted(freq.items()))\nprint(len(freq), max(freq.values()))",
              "output": "3 1 1\n-1 1 2\n3 2 2\n2 1 3\n-1 2 3\n3 3 3\n2 2 3\n[(-1, 2), (2, 2), (3, 3)]\n3 3\n"
            },
            {
              "title": "数対計数の履歴を圧縮する",
              "body": "全探索の「和がKになるペア」を振り返ります。左から読み、以前に現れた値の頻度を保存すれば、現在値xと組める過去の位置はfreq.get(K−x,0)個です。この回数を答えに加えてから現在のxを辞書へ登録します。逆順では2x=Kのとき自分自身を数えてしまう場合があります。集合と違って回数を保持するため、重複値も正しく扱えます。これは今回の課題で追加出力を求める話ではなく、過去の全要素との比較を一度の検索に圧縮する応用です。正しさは「以前の接頭部分」という定義に依存します。先に入力全体を集計して同じ式を各要素へ適用すると、各ペアを両端から数えるので、そのまま置き換えることはできません。"
            },
            {
              "title": "計算量と表現の適用範囲",
              "body": "N個の入力ごとに辞書の検索と更新を行うので、通常は平均O(N)時間、異なる値の数Dに対してO(D)領域です。O(1)検索はハッシュ表の平均的性質であり、あらゆる操作と入力に対する絶対上界ではありません。値域が狭く非負なら固定長リストで数え、添字を値として使う方法もあります。巨大な値や負数があるなら辞書が自然です。max(freq.values())はD個の回数を走査しますが、全体は依然線形です。今回はN≥1なので辞書は空になりません。空入力を許す拡張では答えを別途定義し、空のvaluesへmaxを呼ばないようにします。全同値、全異値、負数、0、最高頻度が並ぶ場合を試し、必要なのが頻度であって対応するキーではないことを確認します。"
            },
            {
              "title": "実習：最大頻度と最頻値を区別する",
              "body": "本演習が返すのは最高頻度であり、最も頻繁な整数そのものではありません。[9,9,-2,-2]なら種類数2と頻度2を出し、9と−2のどちらかを選ぶ必要はありません。最頻値を返す問題なら、同率で最小値を取るか、最初の出現を取るか、任意でよいかを確認します。それにより位置の保存、キーの整列、単純走査のどれが必要か変わります。辞書の挿入順はキーを初めて登録した順であり、大小順や任意の並列規則そのものではありません。\n\n同じ表から別の統計も得られます。頻度の総和はN、頻度1のキー数は一度しか現れない値の種類数、各キーのc(c−1)//2の和は同値の添字ペア数です。[4,4,4,7]なら種類数、要素数、同値ペア数は2、4、3で、それぞれ異なります。先に手計算してからコードで確認しましょう。回数を減らす場合は、0になったキーを残すことと削除することも違います。len(freq)は保存したキーを数え、0を「存在しない」と解釈しません。本課は加算だけなので問題ありませんが、後の窓内頻度では明示的な処理が必要です。"
            }
          ],
          "exerciseTitle": "種類数と最大頻度",
          "task": "N 個の整数が与えられます。異なる整数の種類数と、同じ整数の出現回数の最大値を求めてください。1 ≤ N ≤ 100000、−10⁹ ≤ Aᵢ ≤ 10⁹ です。",
          "input": "1 行目に N、2 行目に N 個の整数が与えられます。",
          "output": "種類数と最大出現回数を空白区切りで 1 行に出力してください。",
          "hint": "辞書のキーが異なる値、辞書の値が回数です。len(freq) と max(freq.values()) が使えます。",
          "explanation": "空のfreqを作り、各整数xについてfreq.get(x,0)で以前の回数を取り、1を加えて保存します。未登録なら0です。帰納的に各キーの値は処理済み接頭部分の実際の頻度になります。全入力後、len(freq)が種類数、max(freq.values())が最高頻度です。max(freq)はキーを比較するので使いません。N≥1により空の集合にはならず、最高頻度が並んでも出力は回数だけなので値の選択規則は不要です。全同値なら1とN、全異値ならNと1となり検査できます。平均時間O(N)、D種類の辞書領域O(D)、入力リストも含む参考実装全体ではO(N)領域です。",
          "objectives": [
            "存在と頻度を区別する",
            "接頭部分の頻度を不変条件として保つ",
            "get・values・itemsを使い分ける"
          ],
          "checkpoints": [
            {
              "question": "max(freq)は最大頻度ですか。",
              "answer": "いいえ、最大キーです。頻度はvalues()で見ます。"
            },
            {
              "question": "数対計数で登録前に検索する理由は？",
              "answer": "過去の位置だけを表し、自己ペアを除くためです。"
            }
          ]
        }
      },
      "starter": "n = int(input())\na = list(map(int, input().split()))\n# TODO\n",
      "solution": "n = int(input())\na = list(map(int, input().split()))\nfreq = {}\nfor x in a:\n    freq[x] = freq.get(x, 0) + 1\nprint(len(freq), max(freq.values()))\n",
      "tests": [
        {
          "input": "1\n9\n",
          "expected": "1 1\n"
        },
        {
          "input": "5\n4 4 4 4 4\n",
          "expected": "1 5\n"
        },
        {
          "input": "4\n-1 0 1 2\n",
          "expected": "4 1\n"
        },
        {
          "input": "7\n3 -1 3 2 -1 3 2\n",
          "expected": "3 3\n"
        }
      ]
    },
    {
      "id": "prefix-sums",
      "order": 14,
      "stage": "sequences",
      "minutes": 50,
      "prerequisiteIds": [
        "sets-and-dictionaries"
      ],
      "relatedProblems": [
        "ABC172C",
        "ABC233D"
      ],
      "content": {
        "zh": {
          "title": "前缀和：用边界表示区间",
          "summary": "从重复求和到一次预处理，统一下标含义并证明相减公式。",
          "sections": [
            {
              "title": "多次区间查询的重复工作",
              "body": "给定固定数组，每次问一段连续元素的和。如果直接sum(a[l:r])，一次查询可能扫描N项，Q次就可能达到O(NQ)。这些区间之间大量重叠，同一个元素可能被加很多遍。前缀和提前保存从数组开头到每一个边界的总和，使任意区间都能通过两次读取和一次相减得到。这需要额外O(N)空间，换来每次查询O(1)。如果只问整段总和一次，直接sum更简单，建立全部前缀并没有明显必要。先辨认“数组固定、查询很多、区间聚合”这组条件，再选择前缀和，而不是遇到数组就机械预处理。"
            },
            {
              "title": "prefix[k]是前k项，不是第k项",
              "body": "定义prefix[0]=0，prefix[k]表示a[0]到a[k-1]的和，即已经包含k个元素。长度N的数组需要N+1个前缀值，因为元素之间及两端一共有N+1条边界。递推式prefix[i+1]=prefix[i]+a[i]只是在旧前缀后加入一个新元素。开头的0不是为了凑长度，而是空前缀的数学定义；它使从第一个元素开始的查询也能用同一公式。可以把数组画成几个盒子、把prefix写在盒子之间的边界上，避免把“第k个数”和“前k个数”混淆。每个变量的含义一旦确定，后面所有下标都应从含义推导。"
            },
            {
              "title": "把构建过程逐项写出来",
              "body": "对a=[3,-1,4,2]，初始prefix=[0]。加入3得到[0,3]，加入-1得到[0,3,2]，加入4得到[0,3,2,6]，最后得到[0,3,2,6,8]。注意前缀和并不一定递增，因为原数组允许负数；前缀和方法仍然正确，但不能因此直接对prefix使用二分查找。构建不变式是：处理完前i个输入后，prefix具有i+1项，最后一项等于它们的总和。新一项由旧总和加当前值得到，所以这个性质逐步保持。若写成prefix.append(x)则保存的是原值而不是累积值；若漏了初始0，查询下标就需要重新推导，不能继续套同一个公式。",
              "code": "a = [3, -1, 4, 2]\nprefix = [0]\nfor x in a:\n    prefix.append(prefix[-1] + x)\n    print(prefix)\nprint(prefix[3] - prefix[1])",
              "output": "[0, 3]\n[0, 3, 2]\n[0, 3, 2, 6]\n[0, 3, 2, 6, 8]\n3\n"
            },
            {
              "title": "两个前缀相减为什么得到区间",
              "body": "对0起点半开区间[l,r)，prefix[r]包含从0到r-1的全部元素，prefix[l]恰好包含不需要的0到l-1部分。相减后公共部分抵消，剩下a[l]到a[r-1]。若题目使用从1开始、两端都包含的[L,R]，左侧不需要的是前L-1项，右边要保留到第R项，所以答案为prefix[R]-prefix[L-1]。以第二项到第三项为例，6-3=3，对应-1+4。单项查询L=R也适用；整段L=1、R=N也适用，不必写特殊分支。最常见错误是两端都减1或都不减，解决方法是重新说清“要删去前多少项”，而不是死记符号。"
            },
            {
              "title": "前缀方法不能无条件推广",
              "body": "加法之所以适合相减，是因为多算的前缀可以被减去。区间最小值不能通过“右侧前缀最小值减左侧前缀最小值”恢复：最小值没有这样的逆运算。原数组如果在查询间被更新，普通prefix中后续很多项都会过时，不能继续声称每次更新也是O(1)。这时可能需要重新构建或使用树状数组等更进一步的数据结构，本课先明确只处理固定数组。前缀计数是另一种直接可用的扩展，例如每个元素是否满足条件转成0或1，再求区间里满足条件的数量。始终检查聚合运算是否能撤掉前面那一段，而不是见到区间查询就套前缀差。"
            },
            {
              "title": "实现成本与测试清单",
              "body": "建表一次O(N)，回答Q个查询O(Q)，总时间O(N+Q)。保存prefix需要O(N)，参考实现还把答案放进字符串列表再统一输出，因而额外有O(Q)缓冲。逐行print也可保持正确，输出较多时缓冲通常更方便。最大总和可能远超单个元素上限，例如二十万个10⁹相加达到2×10¹⁴；Python整数可精确表示，不要为了输出而转float。测试N=1、负数、全0、整段、最后单项、左端为1以及重复查询。独立校验器在小数组上直接sum(a[L-1:R])即可；这里切片慢但规模小，适合验证前缀版本的下标，而非用于正式最大输入。\n\n参考解中的 str(value) 把整数 value 转成用于输出的字符串，例如 str(-3) 得到 \"-3\"；数值计算应在转换前完成。answers.append(str(...)) 因而保存的是字符串，不是整数。\"\\n\".join(answers) 以换行符 \"\\n\" 为分隔符，把这些字符串按原顺序连接：如果 answers 是 [\"5\", \"-3\"]，连接结果就是第一行 5、第二行 -3。分隔符只插在相邻元素之间，最后的 print 再补上末尾换行。join 要求所有元素都是字符串，直接对 [5, -3] 使用它会产生 TypeError；这正是前面需要 str 的原因。初写程序时也可以在查询循环内直接 print(prefix[r] - prefix[l - 1])，两种写法的答案顺序相同。"
            },
            {
              "title": "工作坊：先画边界，再写查询",
              "body": "在四个元素[3,-1,4,2]下面画出五条边界，按0、1、2、3、4编号。要取第三个元素4，就选择它左侧的边界2和右侧的边界3，计算prefix[3]-prefix[2]=6-2=4。要取最后两个元素，就选边界2与4，得到8-2=6。这种画法把元素编号和边界编号分开，也能解释空半开区间[l,l)为什么和为0。题目不一定允许空查询，但数学定义仍然一致，帮助你检查公式是否自洽。\n\n除了固定样例，可以检验两个关系。若相邻区间[L,M]与[M+1,R]拼成[L,R]，两段查询和相加应该等于整段查询；若给每个元素加常数c，长度为R-L+1的查询结果应该增加c×(R-L+1)。这些关系尤其适合发现少加或多加一个端点的错误。测试时选不同长度、正负混合和接近数组两端的区间，不要只测试长度为2的区间。输出顺序必须保持查询输入顺序，不能为了方便把查询按左端排序后忘记恢复顺序。参考实现把答案依次追加到列表，恰好保留了这种顺序。若允许在线到达的查询，也只需要保存同一份prefix，不需要预先知道所有问题。"
            }
          ],
          "exerciseTitle": "多次区间求和",
          "task": "给定 N 个整数和 Q 个查询。每次给出 L、R，求 A_L + … + A_R，位置从 1 开始，两端都包含。1 ≤ N,Q ≤ 200000，−10⁹ ≤ Aᵢ ≤ 10⁹，1 ≤ L ≤ R ≤ N。",
          "input": "第一行 N Q；第二行 N 个整数；接下来 Q 行，每行 L R。",
          "output": "每个查询输出一行区间和，按输入顺序输出。",
          "hint": "先构建 prefix，再对每个查询计算 prefix[r] - prefix[l - 1]。",
          "explanation": "从prefix=[0]开始，依次把prefix[-1]+x追加进去，得到N+1个边界累积值。输入查询L、R时，前R项总和是prefix[R]，区间左边不需要的前L-1项是prefix[L-1]，两者相减恰好留下第L项到第R项。L=1用到空前缀0，L=R得到单项值，R=N也合法，三个边界都无需特殊分支。负数只改变累积值的增减，不影响抵消公式。按查询原顺序将结果转成字符串追加到answers，最后换行连接输出，确保每问一行。预处理O(N)，每问O(1)，总体O(N+Q)；参考实现保存输入、前缀和与输出缓冲，总空间O(N+Q)。数组若中途变化则这份prefix不再有效，本题没有这种更新。",
          "objectives": [
            "定义N+1个边界累积值",
            "推导闭区间与半开区间公式",
            "识别静态查询及可逆聚合的条件"
          ],
          "checkpoints": [
            {
              "question": "为什么prefix需要N+1项？",
              "answer": "包括空前缀和处理全部N项后的边界，共有N+1条边界。"
            },
            {
              "question": "有负数时前缀和还有效吗？",
              "answer": "相减仍正确，但prefix不再必然单调，不能因此直接二分。"
            }
          ]
        },
        "en": {
          "title": "Prefix sums and interval boundaries",
          "summary": "Replace repeated summation with preprocessing and precise endpoint conventions.",
          "sections": [
            {
              "title": "Recognize repeated work in range queries",
              "body": "For a fixed array, summing each requested segment directly may inspect N elements per query, producing O(NQ) work across Q queries. Overlapping segments repeatedly add the same values. Prefix sums store totals from the beginning to every boundary so any segment can be obtained by two reads and a subtraction. This spends O(N) extra memory to make each query constant time. If only the total of the entire array is requested once, a direct sum is simpler and building every prefix may be unnecessary. Look for the combination of fixed data, many queries, and a suitable range aggregate rather than preprocessing every array automatically."
            },
            {
              "title": "prefix[k] means the first k elements",
              "body": "Define prefix[0]=0 and let prefix[k] sum a[0] through a[k−1], exactly k elements. An N-element array needs N+1 prefix totals because there are N+1 boundaries, including both ends. The recurrence prefix[i+1]=prefix[i]+a[i] simply extends the previous prefix by one element. The initial zero is the sum of an empty prefix, not padding added to satisfy a template. It lets queries beginning at the first element use the same formula. Draw elements as boxes and prefix indices on their boundaries. Distinguishing “element k” from “the first k elements” is the key to deriving all later indices consistently."
            },
            {
              "title": "Trace construction one element at a time",
              "body": "For a=[3,−1,4,2], begin with [0], then append totals three, two, six, and eight. The completed prefix list is [0,3,2,6,8]. It is not necessarily increasing because input values may be negative. Prefix subtraction remains correct, but binary search on these totals is not automatically valid. After processing i values, the list has i+1 entries and its final entry is their sum. Adding the next input preserves that invariant. Appending x instead of the previous total plus x stores original values rather than sums. Omitting the initial zero changes the indexing convention, so the same query formula cannot be copied unchanged.",
              "code": "a = [3, -1, 4, 2]\nprefix = [0]\nfor x in a:\n    prefix.append(prefix[-1] + x)\n    print(prefix)\nprint(prefix[3] - prefix[1])",
              "output": "[0, 3]\n[0, 3, 2]\n[0, 3, 2, 6]\n[0, 3, 2, 6, 8]\n3\n"
            },
            {
              "title": "Derive subtraction from cancellation",
              "body": "For a zero-based half-open range [l,r), prefix[r] contains elements zero through r−1, while prefix[l] contains exactly the unwanted part before l. Subtraction cancels the shared prefix and leaves the desired segment. For one-based inclusive [L,R], remove the first L−1 elements from the first R, giving prefix[R]−prefix[L−1]. In the example, positions two through three sum to six minus three, or three. Single-element and whole-array queries use the same formula. Common mistakes adjust both endpoints identically. Repair them by asking how many elements must be removed, rather than memorizing where a minus one usually appears."
            },
            {
              "title": "Know where the technique stops",
              "body": "Addition supports subtraction: an unwanted prefix can be removed exactly. Range minima do not obey “right prefix minimum minus left prefix minimum,” because minimum has no corresponding inverse operation. If array values change between queries, many later prefix totals become stale; updates are not automatically constant time. Such tasks may require rebuilding or a more advanced structure such as a Fenwick tree. This lesson deliberately uses a fixed array. A useful direct extension is prefix counts: map a predicate to zero or one and answer how many matching elements lie in a range. Always check whether the aggregate permits removing the earlier prefix."
            },
            {
              "title": "Implementation cost and a test checklist",
              "body": "Build the table in O(N), answer Q queries in O(Q), and obtain O(N+Q) total time. Prefix storage is O(N); the reference also buffers Q output strings, giving O(N+Q) stored data. Printing each answer directly can be correct, while buffering is convenient for large output. Totals can greatly exceed individual values: two hundred thousand values of one billion sum to 2×10¹⁴. Python integers remain exact; do not convert to float. Test one element, negatives, all zeros, the whole range, the final singleton, ranges starting at one, and repeated questions. On small arrays, direct slicing and sum provide an independent indexing oracle.\n\nIn the reference solution, str(value) converts an integer into output text: str(-3) produces the string \"-3\". Finish the arithmetic before converting. Thus answers.append(str(...)) stores strings, not integers. The expression \"\\n\".join(answers) joins these strings in their existing order, placing the newline character \"\\n\" between adjacent entries. For answers = [\"5\", \"-3\"], the result contains 5 on the first line and -3 on the second. join adds separators between entries only; the final print adds the terminating newline. Every entry must be a string: joining [5, -3] directly raises TypeError, which explains the preceding str conversion. When first implementing the algorithm, you may instead use print(prefix[r] - prefix[l - 1]) inside the query loop. Both versions preserve the query order."
            },
            {
              "title": "Workshop: draw boundaries before queries",
              "body": "Draw five boundaries numbered zero through four around [3,−1,4,2]. The third element, four, lies between boundaries two and three, so its sum is prefix[3]−prefix[2]=6−2=4. The final two elements lie between boundaries two and four and sum to eight minus two. This drawing separates element labels from boundary labels and explains why an empty half-open range [l,l) sums to zero, even if empty queries are not allowed by the task.\n\nCheck two algebraic relationships. Queries [L,M] and [M+1,R] should add to query [L,R]. Adding a constant c to every element should increase a query by c×(R−L+1). Both expose missing or extra endpoints. Use mixed signs, different lengths, and endpoints near array edges rather than testing only length two. Preserve the input order of queries in the output; sorting queries for convenience without restoring order is incorrect. The reference appends answers sequentially, and the same prefix table also supports queries arriving one at a time."
            }
          ],
          "exerciseTitle": "Range-sum queries",
          "task": "Given N integers and Q queries, each query provides L and R. Find A_L + … + A_R, using one-based positions and including both ends. 1 ≤ N,Q ≤ 200000, −10⁹ ≤ Aᵢ ≤ 10⁹, and 1 ≤ L ≤ R ≤ N.",
          "input": "N Q on the first line; N integers on the second; then Q lines, each containing L R.",
          "output": "Print one sum per query, in input order.",
          "hint": "Build prefix once, then calculate prefix[r] - prefix[l - 1] for each query.",
          "explanation": "Begin with prefix=[0] and append prefix[-1]+x for every input, obtaining N+1 boundary totals. For a one-based inclusive query L,R, prefix[R] contains the first R values and prefix[L−1] contains the unwanted values before L. Subtraction leaves exactly positions L through R. L=1 uses the empty prefix, L=R yields one element, and R=N is valid without special handling. Negative entries affect the totals but not cancellation. Append string answers in query order and join with newlines so each query receives one output line. Preprocessing takes O(N), each query O(1), and total time O(N+Q). Input, prefixes, and output buffering use O(N+Q) space. Updates would invalidate the stored prefixes, but this task keeps the array fixed.",
          "objectives": [
            "Define N+1 boundary totals",
            "Derive inclusive and half-open formulas",
            "Recognize static data and invertible aggregates"
          ],
          "checkpoints": [
            {
              "question": "Why are N+1 prefix entries needed?",
              "answer": "There is a boundary before all elements and after each processed element."
            },
            {
              "question": "Do negative values invalidate prefix sums?",
              "answer": "No; subtraction works, but the prefix values need not be monotone."
            }
          ]
        },
        "ja": {
          "title": "累積和で区間を境界として表す",
          "summary": "繰り返す加算を前計算に置き換え、端点の意味を統一します。",
          "sections": [
            {
              "title": "区間質問で重複する仕事を見つける",
              "body": "固定された配列の連続部分の和を何度も聞かれるとします。毎回sum(a[l:r])で求めると、一質問でN要素を調べる可能性があり、Q回ではO(NQ)になります。区間が重なるたびに同じ値を加え直しています。累積和は配列先頭から各境界までの合計を保存し、任意区間を二度の参照と一度の減算で求めます。O(N)の追加領域を使い、一質問をO(1)にする交換です。一度だけ全体の和を求めるなら直接sumが簡潔で、全前計算は必須ではありません。「配列は固定、質問は多数、区間の集約」という条件の組合せを見つけてから選び、配列を見たら常に作る習慣にしないようにしましょう。"
            },
            {
              "title": "prefix[k]は第k要素ではなく先頭k個",
              "body": "prefix[0]=0とし、prefix[k]をa[0]からa[k−1]まで、ちょうどk個の和と定義します。N要素の配列には両端を含めN+1個の境界があるので、累積値もN+1個必要です。prefix[i+1]=prefix[i]+a[i]は、既存の接頭部分に一つ加えるだけの漸化式です。先頭の0は長さを合わせる飾りではなく、空の接頭部分の和という定義です。これにより先頭要素から始まる区間も同じ式で処理できます。要素を箱として描き、その間の境界へprefixの添字を書くと、第k要素と先頭k個を混同しにくくなります。変数の意味を決めたら、その意味から以降の添字を導きます。"
            },
            {
              "title": "構築を一要素ずつ追う",
              "body": "a=[3,-1,4,2]なら、初めはprefix=[0]です。3を加えて[0,3]、−1を加えて[0,3,2]、4で[0,3,2,6]、最後に[0,3,2,6,8]となります。負数があるので累積和が増え続けるとは限りません。差による区間和は正しくても、このprefixに二分探索をそのまま適用してよいとは言えません。構築中の不変条件は、先頭i要素の処理後にi+1個の累積値があり、最後が処理済み総和であることです。旧総和に次の値を加えるので性質が保たれます。prefix.append(x)では元値を保存するだけです。また先頭0を省略したら添字の定義が変わるため、同じ質問式を無条件に使うことはできません。",
              "code": "a = [3, -1, 4, 2]\nprefix = [0]\nfor x in a:\n    prefix.append(prefix[-1] + x)\n    print(prefix)\nprint(prefix[3] - prefix[1])",
              "output": "[0, 3]\n[0, 3, 2]\n[0, 3, 2, 6]\n[0, 3, 2, 6, 8]\n3\n"
            },
            {
              "title": "二つの接頭部分の差を導く",
              "body": "0始まり半開区間[l,r)では、prefix[r]が0からr−1までを含み、prefix[l]が不要な0からl−1までを含みます。共通部分を引けばa[l]からa[r−1]だけが残ります。問題が1始まり両端込みの[L,R]なら、先頭R個から不要な先頭L−1個を引くのでprefix[R]−prefix[L−1]です。例の二番目から三番目なら6−3=3で、−1+4と一致します。L=Rの単要素もL=1、R=Nの全体も同じ式で処理でき、特別分岐は不要です。両端とも1を引いたり、両方引かなかったりするのが典型的誤りです。「前から何個を除くのか」を言葉に戻して考え、記号の位置だけを暗記しないようにしてください。"
            },
            {
              "title": "無条件に他の集約へ広げない",
              "body": "加算では余計な接頭部分を減算で取り除けるため、この方法が成立します。区間最小値は「右の接頭最小値から左の接頭最小値を引く」式では復元できません。最小値には同様の逆操作がないためです。質問の間で元配列を変更すると、その後の多くの累積値が古くなり、更新までO(1)になるわけでもありません。再構築やFenwick木などの発展的構造が必要な場合があります。本課では配列が固定という条件を明確にします。一方、各要素が条件を満たすかを0か1へ変換すれば、区間内の該当数を求める累積個数に直接応用できます。区間が出てきたというだけで差を使わず、前方部分を取り除ける演算かを確認します。"
            },
            {
              "title": "実装費用とテスト項目",
              "body": "前計算はO(N)、Q質問への回答はO(Q)で、合計O(N+Q)時間です。prefixはO(N)領域、参考実装は答えの文字列をまとめて出力するのでO(Q)のバッファも持ちます。逐次printでも正しく、出力が多いときには一括出力が便利です。合計は一要素の上限を大幅に超えます。例えば10⁹を20万個加えると2×10¹⁴ですが、Python整数なら正確に扱えます。floatへの変換は不要です。N=1、負数、全0、全体区間、末尾の一要素、左端1、同じ質問の繰り返しを試しましょう。小入力の独立正解器はsum(a[L−1:R])で十分です。切り出しは大入力で遅くても、添字の検証用には役立ちます。\n\n参考解の str(value) は整数 value を出力用の文字列へ変換します。例えば str(-3) の結果は文字列 \"-3\" です。計算は変換する前に済ませます。そのため answers.append(str(...)) が保存するのは整数ではなく文字列です。\"\\n\".join(answers) は改行文字 \"\\n\" を区切りとして、各文字列を元の順に連結します。answers が [\"5\", \"-3\"] なら、結果は一行目が 5、二行目が -3 の文字列です。区切りは要素の間だけに入り、末尾の改行は最後の print が加えます。join の要素はすべて文字列である必要があり、[5, -3] を直接連結すると TypeError になります。先に str を使う理由はここにあります。最初の実装では質問のループ内で print(prefix[r] - prefix[l - 1]) と逐次出力しても構いません。どちらも質問の順番を保ちます。"
            },
            {
              "title": "実習：質問の前に境界を描く",
              "body": "[3,-1,4,2]の周囲へ0から4まで五つの境界を描きます。三番目の要素4は境界2と3の間なので、prefix[3]−prefix[2]=6−2=4です。最後の二要素なら境界2と4を選び、8−2=6になります。要素番号と境界番号を分けると、空半開区間[l,l)の和が0になる理由も分かります。問題が空質問を許さなくても数学的定義は一貫しており、式の整合性を調べる助けになります。\n\n二つの関係も試せます。[L,M]と[M+1,R]の答えを足すと[L,R]の答えになり、全要素に定数cを足すと質問結果はc×(R−L+1)増えるはずです。端点を一つ余分に含めたり落としたりする誤りを見つけやすくなります。長さ2だけでなく、長短、正負混合、両端に近い範囲を選びます。出力は質問の入力順を守る必要があり、便宜的に質問を整列したら元の順へ戻さなければなりません。参考実装は答えを順番に追加して順序を保ちます。質問が逐次到着する場合でも、同じprefixを保存すれば事前に全質問を知る必要はありません。"
            }
          ],
          "exerciseTitle": "区間和の問い合わせ",
          "task": "N 個の整数と Q 個の質問が与えられます。各質問の L、R に対し A_L + … + A_R を求めてください。位置は 1 始まりで、両端を含みます。1 ≤ N,Q ≤ 200000、−10⁹ ≤ Aᵢ ≤ 10⁹、1 ≤ L ≤ R ≤ N です。",
          "input": "1 行目に N Q、2 行目に N 個の整数、その後の Q 行にそれぞれ L R が与えられます。",
          "output": "各質問の答えを入力順に 1 行ずつ出力してください。",
          "hint": "最初に prefix を構築し、各質問には prefix[r] - prefix[l - 1] で答えます。",
          "explanation": "prefix=[0]から始め、各xについてprefix[-1]+xを追加し、N+1個の境界累積値を作ります。1始まり両端込みのL,Rに対し、prefix[R]が先頭R個、prefix[L−1]が不要な左側のL−1個の和なので、その差だけが目的区間です。L=1は空の接頭部分0、L=Rは一要素、R=Nも特別扱いせず処理できます。負数でも打消し式は変わりません。質問順に文字列答えを追加して改行で連結し、一質問一行を保ちます。前計算O(N)、一質問O(1)、合計O(N+Q)時間です。入力、累積値、出力バッファでO(N+Q)領域を使います。途中更新があれば無効になりますが、この問題の配列は固定です。",
          "objectives": [
            "N+1個の境界和を定義する",
            "閉区間と半開区間の式を導く",
            "静的データと逆操作の条件を見抜く"
          ],
          "checkpoints": [
            {
              "question": "N+1個必要なのはなぜですか。",
              "answer": "先頭前の空境界と各要素の後の境界があるためです。"
            },
            {
              "question": "負数があっても使えますか。",
              "answer": "減算は有効ですが、累積値の単調性は失われることがあります。"
            }
          ]
        }
      },
      "starter": "n, q = map(int, input().split())\na = list(map(int, input().split()))\n# TODO\n",
      "solution": "n, q = map(int, input().split())\na = list(map(int, input().split()))\nprefix = [0]\nfor x in a:\n    prefix.append(prefix[-1] + x)\nanswers = []\nfor _ in range(q):\n    l, r = map(int, input().split())\n    answers.append(str(prefix[r] - prefix[l - 1]))\nprint(\"\\n\".join(answers))\n",
      "tests": [
        {
          "input": "1 1\n-5\n1 1\n",
          "expected": "-5\n"
        },
        {
          "input": "4 3\n3 -1 4 2\n1 4\n2 3\n4 4\n",
          "expected": "8\n3\n2\n"
        },
        {
          "input": "3 2\n0 0 0\n1 3\n2 2\n",
          "expected": "0\n0\n"
        },
        {
          "input": "3 2\n1000000000 1000000000 1000000000\n1 3\n1 2\n",
          "expected": "3000000000\n2000000000\n"
        }
      ]
    },
    {
      "id": "binary-search",
      "order": 15,
      "stage": "sequences",
      "minutes": 50,
      "prerequisiteIds": [
        "prefix-sums"
      ],
      "relatedProblems": [
        "ABC312C",
        "ABC248D"
      ],
      "content": {
        "zh": {
          "title": "二分查找：寻找真假分界线",
          "summary": "用不变式管理左右边界，明确重复值、无解位置和终止条件。",
          "sections": [
            {
              "title": "要找的是边界，而不是随便一个相等项",
              "body": "在有序数组中查找X，最常见的误解是只在a[mid]==X时返回。那样可以找到某个相等元素，却不能保证返回第一次出现的位置，也无法直接回答“第一个不小于X”的位置。本课把问题改写成条件a[i]≥X的真假序列：排序保证它只能先假后真，例如[2,4,4,9]对X=4对应假、真、真、真。我们寻找第一个真；如果全部是假，答案定义为数组后面的边界N。这个定义统一了有解和无解，不必先写“是否存在”的完整扫描。二分真正利用的是单调条件，而不是数值恰好相等。"
            },
            {
              "title": "左右两侧分别已经知道什么",
              "body": "维护lo、hi，初始为0、N。lo左边的元素已经确认小于X；hi及其右边的有效元素已经确认不小于X；中间[lo,hi)还未归类。答案这个边界一定在闭区间[lo,hi]之中，注意它可以等于hi，甚至等于N。取mid=(lo+hi)//2。若a[mid]<X，单调性说明mid及左边都不可能是答案，所以lo=mid+1。否则mid可能就是第一个真，必须保留这个边界，令hi=mid，而不是mid-1。这里用的是半开区间模板，不要混入另一个闭区间模板的更新规则。每次赋值都应能对应到“哪些候选已经有证据被排除”。"
            },
            {
              "title": "逐轮追踪重复值与不存在的答案",
              "body": "对[2,4,4,9]、X=4，开始(lo,hi)=(0,4)，mid=2且值为4，于是hi=2。接着mid=1仍为4，hi=1；最后mid=0值为2，所以lo=1。两边相遇在1，转换为从1开始的位置2。若X=10，第一次mid=2值4使lo=3，第二次mid=3值9使lo=4，结束在N。此时不存在a[4]，但边界4本身是合法答案，最终输出N+1=5。不要在结束后无条件访问a[lo]；若需要判断是否相等，必须先确认lo<N，再检查a[lo]==X。",
              "code": "a = [2, 4, 4, 9]\nfor x in [4, 10]:\n    lo, hi = 0, len(a)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        print(x, lo, hi, mid, a[mid])\n        if a[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid\n    print(\"position\", lo + 1)",
              "output": "4 0 4 2 4\n4 0 2 1 4\n4 0 1 0 2\nposition 2\n10 0 4 2 4\n10 3 4 3 9\nposition 5\n"
            },
            {
              "title": "为什么一定结束且不会跳过答案",
              "body": "当lo<hi时，mid总满足lo≤mid<hi。若更新lo=mid+1，新lo严格大于旧lo；若更新hi=mid，新hi严格小于旧hi。因此非负整数长度hi-lo严格减小，循环一定终止。结合左右不变式，结束时lo==hi，左边全部不合格，当前位置以及后面合格或处于数组尾边界，所以这里正是第一个可能合格的位置。写lo=mid会在长度为1且条件为假时停滞，因为mid==lo；这是常见死循环。证明终止与证明结果正确是两件事，两个都要检查。把仅剩一个元素的区间单独手算一次，通常能发现边界更新问题。"
            },
            {
              "title": "库函数与复杂度的适当表达",
              "body": "bisect_left(a,x)返回第一个不小于x的0起点位置；bisect_right返回第一个严格大于x的位置。二者相减可得到有序数组中x的个数。库函数减少重复实现，但不会检查你的输入是否已经排序，也不会自动把原数组变成有序；前置条件仍由你负责。查找本身需要O(logN)次比较，额外变量O(1)。本练习先读N个整数，所以整体读入加查找仍是O(N)时间和O(N)列表空间；若已有列表上执行Q次查找，查找部分是O(QlogN)。不要把在列表中插入一个元素的移动成本也当成对数，找到插入点与实际搬移元素是不同操作。"
            },
            {
              "title": "单调条件不是“差不多有序”",
              "body": "二分要求真假条件沿候选方向只改变一次。未排序数组中的a[i]≥X可能真假交替，保留一半就可能丢掉答案；含负数数组的前缀和也未必单调。不要为了套二分把需要保留位置含义的数组任意排序。更一般的“答案二分”是在答案范围上定义可行性，例如能力提高后始终可行的条件，但必须先证明这种单调关系，再设计判定算法。本课先把索引二分练熟：N=1、X比最小值小、等于最小值、等于多个重复值、大于最大值，以及全相同数组都要测试。用一个简单线性扫描找第一个≥X作为小数据正解器，能直接检测off-by-one和重复值错误。"
            },
            {
              "title": "工作坊：用边界性质检验答案",
              "body": "查找结束得到p之后，不一定要再写一套复杂算法才能验证结果。应同时满足0≤p≤N；若p>0，则a[p-1]<X；若p<N，则a[p]≥X。排序前提成立时，这三条局部边界性质足以说明p是分界线。如果只检查a[p]≥X，就可能接受重复值中的第二个位置，因此左侧条件也必不可少。p=0时没有左邻居，p=N时没有右邻居，要先判断边界再访问。这些检查适合放在小规模调试代码里，帮助你理解返回结果，而不是在正式程序里盲目输出附近元素。\n\n再比较两种问题：“第一个≥X”与“第一个>X”。后一种需要把左半部分定义为≤X，更新条件也相应变成a[mid]≤X时lo=mid+1。对[2,4,4,9]和X=4，两者分别返回下标1和3，差值2正是4的出现次数。不要只修改最终输出加减1来改变比较语义，分界线的定义改变后，循环判定也必须改变。最后用目标恰好落在两值之间、等于多个值、低于全部值、高于全部值这四类输入，重新检查左右不变式。掌握这些边界后，库函数就成为可靠工具，而不再是一个难以解释的黑箱。"
            }
          ],
          "exerciseTitle": "第一个不小于目标值的位置",
          "task": "给定已按非递减顺序排列的 N 个整数及目标 X。输出第一个满足 Aᵢ ≥ X 的位置（从 1 开始）；若不存在则输出 N + 1。1 ≤ N ≤ 200000，−10⁹ ≤ X,Aᵢ ≤ 10⁹。尝试手写二分。",
          "input": "第一行 N X；第二行 N 个有序整数。",
          "output": "输出一个位置，范围为 1 到 N + 1。",
          "hint": "维护 [lo, hi)，令 hi 初始为 n，最终输出 lo + 1。",
          "explanation": "初始化lo=0、hi=N，把尚未归类的元素放在半开区间[lo,hi)。每轮取mid，若a[mid]<X，mid及其左侧都不可能成为第一个不小于X的位置，令lo=mid+1；否则mid仍可能是答案，令hi=mid保留该边界。每轮区间严格缩小，结束时lo==hi，左边全都小于X，右边都是不小于X的值，或已经来到数组结尾。返回lo+1完成从0起点边界到题目1起点位置的转换。若所有值都小于X，lo=N并输出N+1，无需访问a[N]。遇到重复X仍向左保留候选，所以找到最左位置。查找O(logN)，额外状态O(1)；包含读入和保存N项后，整个程序时间与空间都是O(N)。",
          "objectives": [
            "把查找改写为单调真假边界",
            "证明更新不丢答案且必定终止",
            "区分0起点插入位置与1起点输出"
          ],
          "checkpoints": [
            {
              "question": "a[mid]==X时为何不立即返回？",
              "answer": "还可能有更靠左的相同值，应该保留mid并继续向左搜索。"
            },
            {
              "question": "lo最终等于N是越界错误吗？",
              "answer": "作为边界结果合法；只有再访问a[N]才越界。"
            }
          ]
        },
        "en": {
          "title": "Binary search as a boundary search",
          "summary": "Maintain a boundary invariant that handles duplicates and missing answers.",
          "sections": [
            {
              "title": "Search for a boundary rather than any equality",
              "body": "Returning immediately when a[mid]==X may find an equal value, but it does not guarantee the first occurrence or answer the broader question “first value at least X.” Rewrite the task as a sequence of truth values for a[i]≥X. Sorted input makes it false and then true, as [2,4,4,9] does for X=4. We want the first true position. If every element is false, define the answer as boundary N after the array. This unifies existing and missing answers without an additional full scan. Binary search exploits a monotone condition, not merely the possibility of finding an equal number."
            },
            {
              "title": "State exactly what each side means",
              "body": "Initialize lo=0 and hi=N. Elements before lo are known to be smaller than X; valid elements at or beyond hi are known to be at least X. Elements in [lo,hi) remain unclassified. The answer boundary belongs to the closed interval [lo,hi], including hi and possibly N. Set mid=(lo+hi)//2. If a[mid]<X, monotonicity excludes mid and everything earlier, so lo=mid+1. Otherwise mid may be the first true position, so preserve that boundary with hi=mid. Do not import hi=mid−1 from a different closed-range template. Every update should correspond to candidates excluded by evidence."
            },
            {
              "title": "Trace duplicates and a missing answer",
              "body": "For [2,4,4,9] with X=4, start at (lo,hi)=(0,4). Midpoint two has value four, so hi becomes two. Midpoint one also has four, so hi becomes one. Midpoint zero has two, so lo becomes one and the search ends at zero-based index one, output position two. With X=10, midpoints two and three are both too small, leaving lo=N. There is no a[4], but boundary four is a valid result and translates to output five. If you want to test equality after the search, first check lo<N and only then access a[lo].",
              "code": "a = [2, 4, 4, 9]\nfor x in [4, 10]:\n    lo, hi = 0, len(a)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        print(x, lo, hi, mid, a[mid])\n        if a[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid\n    print(\"position\", lo + 1)",
              "output": "4 0 4 2 4\n4 0 2 1 4\n4 0 1 0 2\nposition 2\n10 0 4 2 4\n10 3 4 3 9\nposition 5\n"
            },
            {
              "title": "Prove termination as well as correctness",
              "body": "When lo<hi, the midpoint satisfies lo≤mid<hi. Updating lo to mid+1 strictly increases lo; updating hi to mid strictly decreases hi. Thus the nonnegative integer length hi−lo strictly decreases and the loop must terminate. At lo==hi, the invariant says everything earlier is false and everything from the boundary onward is true, or the boundary is at the array end. This identifies the first possible valid position. Updating lo=mid can stall on a one-element range because mid equals lo. Termination and answer correctness are separate obligations; manually trace the one-element state to check both."
            },
            {
              "title": "Use library functions without losing the contract",
              "body": "bisect_left(a,x) returns the first zero-based position whose value is at least x; bisect_right returns the first position strictly greater than x. Their difference counts equal values in a sorted list. These functions remove repetitive implementation, but they do not verify sortedness or sort the input for you. The search itself takes O(log N) comparisons and constant auxiliary state. This exercise first reads N values, so total input-plus-search time and storage are O(N). Q searches on an existing list cost O(Q log N). Finding an insertion position is distinct from inserting into a Python list, which may require shifting many elements."
            },
            {
              "title": "Monotonicity is not approximate sortedness",
              "body": "Binary search requires the predicate to change truth value at most once in the searched direction. On an unsorted array, a[i]≥X may alternate, so discarding half can discard the answer. Prefix totals with negative entries are not necessarily monotone either. Do not sort away positional meaning just to force a search template. A broader answer-search method defines feasibility over candidate answers, but its monotonicity needs a separate proof. First master index search with N=1, targets below the minimum, equal to repeated values, above the maximum, and all-equal lists. A simple linear first-match scan is an independent oracle for small tests."
            },
            {
              "title": "Workshop: validate the returned boundary",
              "body": "After obtaining p, check three properties: 0≤p≤N; if p>0 then a[p−1]<X; if p<N then a[p]≥X. Under the sorted-input assumption, these local boundary conditions identify the transition. Checking only a[p]≥X could accept the second of several equal values, so the left condition matters too. At p=0 there is no left neighbor, and at p=N no right neighbor; guard accesses before reading them. Such checks are useful in small debugging programs, not as unexplained extra submission output.\n\nCompare “first at least X” with “first strictly greater than X.” The latter treats values equal to X as belonging to the left side, so the lo-update condition becomes a[mid]≤X. For [2,4,4,9] and X=4, the boundaries are one and three, and their difference two counts the occurrences. Changing output by one cannot change the search semantics; the predicate must change. Retest targets between values, on repeated values, below everything, and above everything. Then the library functions become tools whose contract you can explain."
            }
          ],
          "exerciseTitle": "First value at least the target",
          "task": "Given N integers already sorted in nondecreasing order and target X, print the first position with Aᵢ ≥ X, counting from 1. If there is none, print N + 1. 1 ≤ N ≤ 200000 and −10⁹ ≤ X,Aᵢ ≤ 10⁹. Try implementing the binary search directly.",
          "input": "N X on the first line; N sorted integers on the second.",
          "output": "Print one position from 1 through N + 1.",
          "hint": "Maintain [lo, hi) with hi initially n, then print lo + 1.",
          "explanation": "Initialize lo=0 and hi=N around the unclassified half-open element range. At each midpoint, a[mid]<X excludes mid and all earlier indices, so assign lo=mid+1. Otherwise mid can still be the answer; assign hi=mid to preserve that boundary. The range strictly shrinks. At equality, every earlier element is smaller than X and every later valid element is at least X, identifying the first boundary. Print lo+1 to convert it to the requested one-based position. If every value is smaller, lo=N and N+1 is printed without accessing a[N]. Equality continues searching left, preserving the earliest duplicate. Search time is O(log N) with O(1) extra state; reading and storing the full list makes the complete program O(N) time and space.",
          "objectives": [
            "Model search as a monotone truth boundary",
            "Prove updates preserve the answer and terminate",
            "Separate zero-based boundaries from one-based outputs"
          ],
          "checkpoints": [
            {
              "question": "Why not return immediately on equality?",
              "answer": "An earlier equal value may exist, so retain mid and search left."
            },
            {
              "question": "Is a final lo=N an error?",
              "answer": "It is a valid boundary result; accessing a[N] would be the error."
            }
          ]
        },
        "ja": {
          "title": "真偽の境界を探す二分探索",
          "summary": "重複値と未発見を扱う境界の不変条件を保ちます。",
          "sections": [
            {
              "title": "同値を一つ見つけるのではなく境界を探す",
              "body": "a[mid]==Xで直ちに返す方法は同じ値を一つ見つけられますが、最初の出現位置や「X以上になる最初」の位置を保証しません。条件a[i]≥Xの真偽列として考え直します。整列済みなので偽の後に真が続き、[2,4,4,9]とX=4なら偽・真・真・真です。求めるのは最初の真です。すべて偽なら配列直後の境界Nを答えと定義します。これで存在する場合と存在しない場合を統一でき、先に存在確認の全走査をする必要がありません。二分探索が利用するのは数値の一致そのものではなく、条件の単調性です。"
            },
            {
              "title": "左右に何が分かっているかを定義する",
              "body": "lo=0、hi=Nから始めます。loより左はX未満、hi以降の有効要素はX以上と判明しており、[lo,hi)は未分類です。答えとなる境界は閉区間[lo,hi]にあり、hiそのもの、場合によってはNにもなります。mid=(lo+hi)//2を取り、a[mid]<Xなら単調性によってmid以下は答えでないのでlo=mid+1です。それ以外ではmidが最初の真である可能性を残し、hi=midとします。別の閉区間テンプレートで使うhi=mid−1を混ぜてはいけません。各更新について、証拠によってどの候補を除外したかを説明できることが重要です。"
            },
            {
              "title": "重複と未発見を反復ごとに追う",
              "body": "[2,4,4,9]、X=4なら(lo,hi)=(0,4)からmid=2を調べ、値4なのでhi=2です。次にmid=1も4でhi=1、最後のmid=0は2なのでlo=1になります。両端が1で一致し、1始まりの位置2を出します。X=10ならmid=2の4でlo=3、mid=3の9でlo=4となり、Nで終了します。a[4]は存在しませんが、境界4は合法な結果で、出力はN+1=5です。終了後に無条件でa[lo]へアクセスしないでください。厳密な一致を調べたいなら、まずlo<Nを確認してからa[lo]==Xを判定します。",
              "code": "a = [2, 4, 4, 9]\nfor x in [4, 10]:\n    lo, hi = 0, len(a)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        print(x, lo, hi, mid, a[mid])\n        if a[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid\n    print(\"position\", lo + 1)",
              "output": "4 0 4 2 4\n4 0 2 1 4\n4 0 1 0 2\nposition 2\n10 0 4 2 4\n10 3 4 3 9\nposition 5\n"
            },
            {
              "title": "停止と正しさを別々に証明する",
              "body": "lo<hiなら必ずlo≤mid<hiです。lo=mid+1はloを厳密に増やし、hi=midはhiを厳密に減らします。したがって非負整数の長さhi−loが毎回小さくなり、必ず停止します。lo==hiでは不変条件によって左側はすべて不合格、境界以降は合格または配列終端です。よってそこが最初に合格し得る位置です。lo=midにすると、長さ1で条件が偽の場合にmid==loとなって進まず、無限ループになります。停止することと正しい位置を返すことは別の証明項目です。候補が一つだけ残った状態を手で追うと、更新規則の多くの誤りを発見できます。"
            },
            {
              "title": "ライブラリでも契約を忘れない",
              "body": "bisect_left(a,x)はx以上の最初の0始まり位置、bisect_rightはxより厳密に大きい最初の位置を返します。二つの差は整列列にあるxの個数です。ライブラリは反復実装を省けますが、入力が整列済みか検査したり、自動でソートしたりはしません。前提条件を満たす責任は利用側に残ります。探索自体はO(logN)回の比較とO(1)追加状態です。本演習はN個を先に読むので、全体の時間と入力領域はO(N)です。既存リストへQ回探索するなら探索部分はO(QlogN)です。挿入位置を探す操作と、リスト内で後続要素を実際にずらして挿入する操作を区別し、後者まで対数時間だと思わないようにします。"
            },
            {
              "title": "「だいたい整列」は単調性ではない",
              "body": "二分探索では探索方向に沿って真偽が高々一回しか切り替わらない必要があります。未整列列のa[i]≥Xは真偽が交互になるかもしれず、半分を捨てると答えを失います。負数を含む配列の累積和も単調とは限りません。位置の意味が必要な配列を、テンプレートに合わせるだけで勝手に整列しないでください。発展的な答えの二分探索では候補答えに対して実現可能性を定義しますが、その単調性を別に証明する必要があります。まずN=1、最小値より小さい目標、最小値と同じ、重複値と同じ、最大値より大きい、全値同一を試しましょう。小入力では最初の≥Xを線形走査する正解器で境界のずれを確認できます。"
            },
            {
              "title": "実習：返された境界の性質を検証する",
              "body": "結果pには三条件を確認できます。0≤p≤N、p>0ならa[p−1]<X、p<Nならa[p]≥Xです。入力が整列済みなら、この局所条件で真偽の境界だと分かります。a[p]≥Xだけでは重複の二番目を誤って受け入れるので、左側も必要です。p=0に左隣、p=Nに右隣はありません。条件分岐してから参照します。小さいデバッグ用コードの検査として使い、正式出力へ理由なく近傍値を追加しないようにします。\n\n「最初の≥X」と「最初の>X」を比べると、後者はXと同値を左側に含めるため、loを進める条件がa[mid]≤Xになります。[2,4,4,9]とX=4では境界は1と3で、その差2が出現回数です。最後の出力に1を足し引きするだけで探索の意味は変えられません。境界の定義が変われば条件式も変える必要があります。値の間、重複値と同じ、全値より小さい、全値より大きいという四種類で不変条件を再確認します。こうして契約を理解すれば、ライブラリ関数も説明できない黒箱ではなく確実な道具になります。"
            }
          ],
          "exerciseTitle": "指定値以上になる最初の位置",
          "task": "非減少順に並んだ N 個の整数と目標値 X が与えられます。Aᵢ ≥ X を満たす最初の位置を 1 始まりで出力してください。存在しなければ N + 1 を出力してください。1 ≤ N ≤ 200000、−10⁹ ≤ X,Aᵢ ≤ 10⁹ です。まず二分探索を自分で実装してください。",
          "input": "1 行目に N X、2 行目に整列済みの N 個の整数が与えられます。",
          "output": "1 以上 N + 1 以下の位置を 1 個出力してください。",
          "hint": "[lo, hi) を管理し、hi の初期値を n にして、最後に lo + 1 を出力します。",
          "explanation": "lo=0、hi=Nで未分類の半開区間を管理します。a[mid]<Xならmid以下は最初のX以上になれないのでlo=mid+1、それ以外ならmidも答えになり得るためhi=midとして境界を残します。区間は厳密に縮小し、lo==hiで終了します。その左はすべてX未満、右の有効要素はX以上なので最初の境界が得られます。lo+1を出して1始まりへ変換します。すべて小さければlo=NでN+1を出し、a[N]には触れません。同値でも左側を探索し続けるので最左の重複値です。探索O(logN)、追加状態O(1)、全入力の読み込みと保存を含め全体は時間・領域O(N)です。",
          "objectives": [
            "探索を単調な真偽境界に変える",
            "答え保持と停止を証明する",
            "0始まり境界と1始まり出力を分ける"
          ],
          "checkpoints": [
            {
              "question": "等しいとき即時終了しないのは？",
              "answer": "さらに左に同値があり得るのでmidを残して左を探します。"
            },
            {
              "question": "終了時lo=Nは誤りですか。",
              "answer": "境界として合法です。a[N]を参照すると範囲外になります。"
            }
          ]
        }
      },
      "starter": "n, x = map(int, input().split())\na = list(map(int, input().split()))\n# TODO\n",
      "solution": "n, x = map(int, input().split())\na = list(map(int, input().split()))\nlo, hi = 0, n\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if a[mid] < x:\n        lo = mid + 1\n    else:\n        hi = mid\nprint(lo + 1)\n",
      "tests": [
        {
          "input": "1 5\n5\n",
          "expected": "1\n"
        },
        {
          "input": "4 4\n2 4 4 9\n",
          "expected": "2\n"
        },
        {
          "input": "3 -9\n-3 0 8\n",
          "expected": "1\n"
        },
        {
          "input": "3 10\n1 4 9\n",
          "expected": "4\n"
        }
      ]
    },
    {
      "relatedProblems": [
        "ABC172C",
        "ABC229D"
      ],
      "starter": "n, k = map(int, input().split())\na = list(map(int, input().split()))\n# Find the longest contiguous segment with sum at most k.\n",
      "solution": "n, k = map(int, input().split())\na = list(map(int, input().split()))\nleft, total, answer = 0, 0, 0\nfor right, x in enumerate(a):\n    total += x\n    while total > k:\n        total -= a[left]\n        left += 1\n    answer = max(answer, right - left + 1)\nprint(answer)\n",
      "tests": [
        {
          "input": "1 0\n1\n",
          "expected": "0\n"
        },
        {
          "input": "1 3\n3\n",
          "expected": "1\n"
        },
        {
          "input": "5 3\n1 1 1 1 1\n",
          "expected": "3\n"
        },
        {
          "input": "5 4\n2 1 1 3 1\n",
          "expected": "3\n"
        },
        {
          "input": "3 2\n3 4 5\n",
          "expected": "0\n"
        },
        {
          "input": "4 10\n1 2 3 4\n",
          "expected": "4\n"
        }
      ],
      "content": {
        "zh": {
          "exerciseTitle": "总和受限的最长区间",
          "task": "给定N个严格正整数和非负整数K，求元素和不超过K的最长连续区间长度。如果没有非空合法区间，输出0。1≤N≤200000，1≤Aᵢ≤10⁹，0≤K≤10¹⁸。",
          "input": "第一行N K；第二行N个正整数。",
          "output": "输出最长长度。",
          "hint": "扩展右端，和超限时重复收缩左端，再更新长度。",
          "explanation": "total维护当前[left,right]窗口的和。每次加入右端后，反复移除左端直到total≤K。正数保证已删除的更早起点不会重新合法，所以保留的窗口是该右端下最长的合法窗口。遍历所有右端后取最大长度。left和right各前进至多N次，时间O(N)，输入空间O(N)，额外状态O(1)。",
          "title": "双指针：只向前移动的区间",
          "summary": "利用正数区间和的单调性维护窗口，并用总移动次数分析复杂度。",
          "sections": [
            {
              "title": "连续区间不能随意重排",
              "body": "给定正整数数组，要找总和不超过K的最长连续区间。直接枚举左右端点有O(N²)个区间；若每次重新求和还会更慢。这里的连续性由原始位置决定，排序会改变哪些元素能够相邻，因此不能像最小差问题那样先排序。用left和right表示当前区间的左右端点，维护区间总和total。每次只把右端推进一个位置，再根据总和调整左端，尽量复用上一步已经计算的内容。这种思路称为滑动窗口或双指针，但名称不能代替正确性证明。首先要明确为什么一个端点移动以后，另一个端点不需要往回走。"
            },
            {
              "title": "正数前提提供了什么保证",
              "body": "所有元素严格大于0，所以右端扩展会增加总和，移除左端元素会减少总和。如果当前区间和已经超过K，继续向右加入正数不可能把它变合法，必须丢掉左侧的一些元素。某个更早的left在上一步就因总和过大被排除，那么加入新的正数之后，它仍不可能重新变合法，因此left只需向前。这是算法线性的关键。若允许负数，例如[5,-4]且K=2，第一步会删掉5，但完整区间和为1其实合法，删除后就再也找不到长度2。负数让被排除的起点有机会恢复，破坏本模板的推理。不要只因为题目出现“子数组”就使用双指针。"
            },
            {
              "title": "先恢复合法窗口，再更新答案",
              "body": "初始化left=0、total=0、answer=0。外层枚举right，把a[right]加入total。只要total>K，就减去a[left]并把left加1。循环结束后，当前窗口和不超过K，它的长度是right-left+1，再用它更新answer。更新答案必须放在缩小完成之后，否则会把不合法的长窗口计入。如果当前单个元素都大于K，while会删掉它，使left=right+1，长度变成0；answer保留0或此前更好的长度。这不是越界错误，而是空窗口的合法表示。因为K≥0，空窗口总和0满足条件，收缩循环到这里必定停止。"
            },
            {
              "title": "用一张窗口轨迹理解执行顺序",
              "body": "取a=[2,1,1,3,1]、K=4。right=0、1、2时没有超限，窗口依次是[2]、[2,1]、[2,1,1]，长度达到3。right=3加入3后总和变7，先删2得到5，仍超限，再删1得到4，left来到2，窗口是[1,3]。right=4加入1得到5，再删一个1得到4，窗口为[3,1]。最后答案仍为3。注意一次right推进可能导致left连续推进两次，所以需要while而不是单个if。每次删除前total都对应当前窗口；先减a[left]再left+=1，若反过来会减错元素。追踪时把left、right、total和answer四个值都写出。",
              "code": "a, k = [2, 1, 1, 3, 1], 4\nleft, total, answer = 0, 0, 0\nfor right, x in enumerate(a):\n    total += x\n    while total > k:\n        total -= a[left]\n        left += 1\n    answer = max(answer, right - left + 1)\n    print(left, right, total, answer)\nprint(answer)",
              "output": "0 0 2 1\n0 1 3 2\n0 2 4 3\n2 3 4 3\n3 4 4 3\n3\n"
            },
            {
              "title": "为何没有漏掉更长的合法区间",
              "body": "固定某个right时，while停止后的left是当前可以保留的最早起点：更早的起点已经因和过大被移除，而继续向右扩展不会使它们重新有效；更晚的起点可能有效，但长度只会更短。因此当前窗口就是以right结束的最长合法窗口。外层枚举了每一个right，取这些最长窗口的最大值，便覆盖了全局最优解。这个论证同时说明为什么不需要枚举所有合法left。若目标换成最短区间且和至少K，扩展和收缩的时机就不同，不能简单把比较号反过来。每种窗口问题都要重新说清楚“收缩结束时保留的是哪一个最优候选”。"
            },
            {
              "title": "两层循环为什么仍是线性",
              "body": "外层right从0到N-1，一共前进N次。left只会增加，从0最多到N，所以所有while执行次数合起来至多N，而不是每次right都重新从0开始。因此总加法N次、总减法最多N次，时间O(N)。这是一种按总操作次数的分析，不能看到for里面有while就说O(N²)。保存输入列表占O(N)，窗口本身只有几个变量。测试K=0、所有元素都超限、总和恰好K、全部可取、连续多个相同正数，以及一次需要删除多项的情况。对小数组可枚举所有区间并直接求和，作为独立校验器；额外用负数反例提醒自己该算法的前提，不能把超出题目约束的正确性当作承诺。"
            },
            {
              "title": "工作坊：窗口模板不是万能公式",
              "body": "在本题中，窗口太大是指“和超过K”，合法候选中希望长度尽量长，所以先缩到合法，再记录长度。若换成“和至少K的最短区间”，在窗口已经满足条件时应记录候选并尝试收缩，直到不满足为止；若换成“最多K种不同值”，total就不足以表达状态，要维护频率表及非零频率种类数。三类问题都可能使用双指针，但合法条件、更新时机和状态含义不同。照抄同一段代码只改比较号，极容易把这些差别掩盖。\n\n可以用一个小的朴素检验程序比较：固定左端l，令sum=0，依次向右加入元素，遇到sum≤K时更新最大长度。这个版本是O(N²)，但在N≤8时很适合列出全部候选，并与线性版本核对。选择多个合法的正数数组和不同K，把每一个right对应的最长长度都对比，而不只是最后答案。还要观察left不会回退，total始终等于当前窗口直接求和，answer不会减小。这三条是不同层面的检查，能分别发现端点更新、和的维护、最优值汇总方面的错误。正式大输入不应每轮重新求和；这些额外工作只用于小数据调试。"
            }
          ],
          "objectives": [
            "证明正数窗口的单调性",
            "维护合法窗口并处理空窗口",
            "用双端点总移动次数证明线性"
          ],
          "checkpoints": [
            {
              "question": "为什么收缩必须用while？",
              "answer": "一次新增元素可能需要移除多个旧元素才能恢复合法。"
            },
            {
              "question": "负数会在哪里破坏推理？",
              "answer": "被舍弃的早起点可能在加入负数后重新合法，left便不能保证只前进。"
            }
          ]
        },
        "en": {
          "exerciseTitle": "Longest bounded-sum segment",
          "task": "Given N strictly positive integers and nonnegative K, find the longest contiguous segment whose sum is at most K. Output 0 if no nonempty segment qualifies. 1≤N≤200000, 1≤Aᵢ≤10⁹, 0≤K≤10¹⁸.",
          "input": "N K, then N positive integers.",
          "output": "Print the maximum length.",
          "hint": "Extend right, repeatedly shrink left while over the limit, then update the length.",
          "explanation": "Maintain the sum of [left,right]. After adding the rightmost value, remove leftmost values until the sum is at most K. Positivity guarantees earlier discarded starts never become valid again, so this is the longest valid segment ending at right. Maximize over all endpoints. Each pointer advances at most N times: O(N) time, O(N) input storage, O(1) additional state.",
          "title": "Two pointers and a forward-moving window",
          "summary": "Use positive-sum monotonicity and count total movements rather than nested loops.",
          "sections": [
            {
              "title": "Contiguity belongs to the original order",
              "body": "Given a positive-integer array, seek the longest contiguous segment with sum at most K. Enumerating both endpoints gives O(N²) intervals, and resumming each interval costs even more. Contiguity is defined by the original positions: sorting changes which elements are neighbors, so the minimum-difference trick does not apply. Maintain left and right endpoints and a running total. Extend the right endpoint by one item, then adjust the left endpoint while reusing previous work. This is called a sliding window or two-pointer method, but its name is not a proof. Explain why neither endpoint ever needs to move backward."
            },
            {
              "title": "What positivity guarantees",
              "body": "Every element is strictly positive. Extending right increases the sum; removing the leftmost item decreases it. If the current sum exceeds K, adding further positive values cannot repair it, so some leftmost items must be removed. A start discarded earlier for excessive sum remains invalid after another positive value is added. Hence left never needs to retreat. Negative values break this reasoning: with [5,−4] and K=2, the method discards five immediately even though the full sum is one and length two is valid. A rejected start can become useful again when negatives arrive. The word “subarray” alone does not justify this template."
            },
            {
              "title": "Restore validity before updating the answer",
              "body": "Initialize left=0, total=0, and answer=0. For each right, add a[right]. While total>K, subtract a[left] and increment left. Only after the loop restores a legal window should you maximize answer with right−left+1. Updating earlier would count an invalid oversized segment. If one element alone exceeds K, the loop removes it and leaves left=right+1, representing an empty window of length zero. That is intentional, not an indexing error. Since K is nonnegative, the empty sum zero is valid and contraction must stop there. The stored best length remains zero or a better value from an earlier endpoint."
            },
            {
              "title": "Read the window trace in execution order",
              "body": "Use a=[2,1,1,3,1], K=4. At right=0,1,2, the windows are [2], [2,1], and [2,1,1], reaching length three. Adding the next three makes total seven: remove two to get five, then remove one to get four, leaving [1,3]. Adding the final one again exceeds the limit, so remove the first one and keep [3,1]. The best length stays three. One right step can require several left steps, so contraction needs while rather than if. Subtract a[left] before incrementing left; reversing those statements removes the wrong element. Trace all four state variables.",
              "code": "a, k = [2, 1, 1, 3, 1], 4\nleft, total, answer = 0, 0, 0\nfor right, x in enumerate(a):\n    total += x\n    while total > k:\n        total -= a[left]\n        left += 1\n    answer = max(answer, right - left + 1)\n    print(left, right, total, answer)\nprint(answer)",
              "output": "0 0 2 1\n0 1 3 2\n0 2 4 3\n2 3 4 3\n3 4 4 3\n3\n"
            },
            {
              "title": "Explain why a longer valid segment is not missed",
              "body": "For a fixed right endpoint, the left value after contraction is the earliest start that can remain. Earlier starts were removed because their sums were excessive and cannot become valid after further positive additions. Later starts may also be valid, but they yield shorter intervals. The current window is therefore the longest legal interval ending at right. The outer loop visits every right endpoint, so maximizing these candidates finds the global optimum without enumerating all starts. A shortest-segment problem with sum at least K has different expansion and contraction timing; simply reversing the comparison is not a justified adaptation. Re-establish what optimum the maintained window represents."
            },
            {
              "title": "Nested loops can still perform linear total work",
              "body": "Right advances N times. Left only increases, from zero to at most N, so all while-loop iterations together total at most N. Left does not restart at zero for every right. There are N additions and at most N subtractions, giving O(N) time despite nested syntax. Input storage is O(N), while the window state uses only a few variables. Test K=0, every element exceeding the bound, an exact-limit sum, an entirely valid array, repeated positive values, and a step requiring multiple removals. On short arrays, enumerate all intervals as an independent oracle. Keep a negative-value counterexample to remember the assumptions, not to promise unsupported behavior."
            },
            {
              "title": "Workshop: a window is not a universal formula",
              "body": "In this task, an oversized window means its sum exceeds K, and we want maximum length among valid candidates. Shrink until valid, then record the length. For a shortest segment with sum at least K, record while the condition is satisfied and try shrinking until it fails. For at most K distinct values, a total is insufficient; maintain frequencies and the number of nonzero-frequency keys. All may use two pointers, but their legality conditions, state, and update timing differ. Copying one template and changing only a comparison hides these distinctions.\n\nBuild a small oracle by fixing each left endpoint and accumulating sums while extending right. It is quadratic but practical for arrays of length at most eight. Compare the longest valid length at every right endpoint, not only the final optimum. Also verify that left never retreats, total equals a direct sum of the maintained window, and answer never decreases. These checks isolate endpoint, sum-maintenance, and aggregation errors respectively. Recomputing window sums is diagnostic work for tiny tests, not part of the final linear implementation."
            }
          ],
          "objectives": [
            "Prove the positive-window monotonicity",
            "Maintain validity including the empty window",
            "Bound total pointer movements linearly"
          ],
          "checkpoints": [
            {
              "question": "Why use while for contraction?",
              "answer": "One new element may require removing several old elements."
            },
            {
              "question": "Where do negative values break the proof?",
              "answer": "An earlier discarded start may become valid after a negative addition."
            }
          ]
        },
        "ja": {
          "exerciseTitle": "和が上限以下の最長区間",
          "task": "N個の正整数と非負整数Kから、和がK以下の最長連続区間の長さを求めます。非空の合法区間がなければ0。1≤N≤200000、1≤Aᵢ≤10⁹、0≤K≤10¹⁸。",
          "input": "1行目N K、2行目N個の正整数。",
          "output": "最大の長さを出力。",
          "hint": "右端を広げ、上限超過中は左端を縮め、その後で長さを更新。",
          "explanation": "totalは[left,right]の和です。右端を追加後、K以下になるまで左端を除きます。正数なので捨てた古い開始位置は復活せず、残る窓がその右端で最長です。全右端で最大を取ります。両ポインタは各最大N回進むため、時間O(N)、入力領域O(N)、追加状態O(1)です。",
          "title": "前へだけ動く二つのポインタ",
          "summary": "正の数の和の単調性を使い、全移動回数で計算量を評価します。",
          "sections": [
            {
              "title": "連続性は元の順番で決まる",
              "body": "正整数配列で、合計がK以下となる最長の連続部分を求めます。両端を列挙するとO(N²)区間になり、毎回和を計算し直せばさらに遅くなります。連続性は元の位置関係で決まるため、最小差問題のように先にソートすると、隣接できる要素を変えてしまいます。leftとrightで現在の区間を表し、その和totalを保存します。右端を一つ進めてから必要に応じて左端を調整し、以前の計算を再利用します。スライディングウィンドウや尺取り法という名前だけでは正しさを説明できません。一方の端を動かしたとき、もう一方を後ろへ戻す必要がない理由をまず明らかにします。"
            },
            {
              "title": "正数という前提が与える保証",
              "body": "すべての要素が厳密に正なので、右へ拡張すると和が増え、左端を取り除くと和が減ります。現在の和がKを超えたら、さらに正数を足しても合法には戻らず、左側の要素を除く必要があります。以前に和が大きすぎて捨てた開始位置は、新しい正数を足した後でも合法になりません。したがってleftを戻す必要がないことが線形性の鍵です。負数を許すと、[5,-4]、K=2では最初に5を捨てる一方、全体の和1は合法で長さ2が答えです。一度捨てた開始位置が後から復活し得るため、このテンプレートの根拠が壊れます。「部分配列」という言葉だけで尺取り法を選んではいけません。"
            },
            {
              "title": "合法な窓へ戻してから答えを更新する",
              "body": "left=0、total=0、answer=0で始めます。rightを一つ進めてa[right]を足し、total>Kの間はa[left]を引いてleftを1増やします。この縮小が終わって初めてright−left+1でanswerを更新します。先に更新すると、長いが不合法な区間を答えに含めてしまいます。単独の要素でもKを超える場合はその要素まで削除し、left=right+1、長さ0の空窓になります。これは意図した表現で、添字の誤りではありません。K≥0なので空の和0は必ず合法となり、縮小はそこで停止します。過去により良い区間があればanswerはそれを保持し、なければ0のままです。"
            },
            {
              "title": "窓の軌跡を実行順に読む",
              "body": "a=[2,1,1,3,1]、K=4で追います。right=0、1、2の窓は[2]、[2,1]、[2,1,1]で、長さ3まで伸びます。次の3を足すと和7なので、2を除いて5、さらに1を除いて4となり、left=2の[1,3]を残します。最後の1を足すと5なので先頭の1を除き、[3,1]で和4です。最良の長さは3のままです。rightの一回の前進でleftが二回以上動く場合があるため、ifではなくwhileが必要です。減算時のtotalは現在窓に対応します。a[left]を引いてからleftを進め、逆順で別の要素を引かないようにします。left、right、total、answerの四変数を表に書くと理解できます。",
              "code": "a, k = [2, 1, 1, 3, 1], 4\nleft, total, answer = 0, 0, 0\nfor right, x in enumerate(a):\n    total += x\n    while total > k:\n        total -= a[left]\n        left += 1\n    answer = max(answer, right - left + 1)\n    print(left, right, total, answer)\nprint(answer)",
              "output": "0 0 2 1\n0 1 3 2\n0 2 4 3\n2 3 4 3\n3 4 4 3\n3\n"
            },
            {
              "title": "より長い合法区間を落としていない理由",
              "body": "rightを固定すると、縮小後のleftは残せる最も早い開始位置です。それ以前の開始位置は和が大きすぎて削除され、正数をさらに足しても復活しません。それ以降の開始位置も合法かもしれませんが、長さは短くなります。つまり現在窓はrightで終わる最長の合法区間です。外側で全rightを調べてその最大を取れば、全体の最適解を覆えます。この説明により全leftを列挙しなくてよいことが分かります。和がK以上の最短区間を求める問題では拡張と縮小のタイミングが異なり、比較記号を逆にするだけでは正当化できません。窓がどの最適候補を代表するのかを問題ごとに説明し直す必要があります。"
            },
            {
              "title": "二重の構文でも総計は線形",
              "body": "rightは0からN−1へN回進みます。leftは増えるだけで、0から最大Nまでなので、すべてのwhile反復を合計しても高々N回です。rightが変わるたびにleftを0へ戻すのではありません。加算N回、減算最大N回となり、時間はO(N)です。forの中にwhileがあるという構文だけでO(N²)と判断せず、総操作数で評価します。入力リストはO(N)領域、窓の状態は少数変数です。K=0、全要素が上限超過、ちょうどK、全体を取れる、同じ正数が連続、一度に複数削除する場合を確認します。小配列では全区間を列挙して独立に検証できます。負数の反例は前提を忘れないために残し、制約外まで正しいという保証にはしません。"
            },
            {
              "title": "実習：窓の型は万能な公式ではない",
              "body": "本課題では和がKを超えたら不合法で、合法候補の長さを最大にしたいので、合法になるまで縮めてから記録します。和がK以上の最短区間なら、満たしている間に候補を記録し、さらに縮めて満たさなくなるまで試します。異なる値が高々K種類なら、totalだけでは状態を表せず、頻度と正の頻度を持つ種類数を管理します。どれも二ポインタを使える場合がありますが、合法条件、状態の意味、更新順は違います。同じテンプレートで比較だけ変えると、この相違を見失います。\n\n小さい正解器として左端を固定し、右へ加算しながら全区間を調べます。O(N²)でもN≤8なら全候補を確認できます。最終答えだけでなく、各rightに対する最長長さを線形版と比較しましょう。leftが戻らないこと、totalが現在窓の直接和と一致すること、answerが減らないことも別々に確認します。それぞれ端点、和の維持、最良値の集計の誤りを分けて見つけられます。直接和の再計算は小入力での診断に限り、正式な線形実装へ残さないようにします。"
            }
          ],
          "objectives": [
            "正数窓の単調性を証明する",
            "空窓を含め合法性を保つ",
            "両端の総移動で線形性を示す"
          ],
          "checkpoints": [
            {
              "question": "縮小にwhileが必要なのは？",
              "answer": "新要素一つで複数の旧要素を取り除く必要があるためです。"
            },
            {
              "question": "負数はどこで根拠を壊しますか。",
              "answer": "捨てた開始位置が負数の追加で再び合法になり得ます。"
            }
          ]
        }
      },
      "id": "two-pointers",
      "order": 16,
      "stage": "sequences",
      "minutes": 50,
      "prerequisiteIds": [
        "binary-search"
      ]
    },
    {
      "id": "stacks-and-queues",
      "content": {
        "zh": {
          "title": "栈与队列",
          "summary": "用明确的取出顺序管理尚未完成的工作。",
          "objectives": [
            "区分后进先出与先进先出",
            "使用列表栈与 deque 队列",
            "用不变量证明括号匹配"
          ],
          "sections": [
            {
              "title": "为什么需要等待处理的容器",
              "body": "程序经常遇到“现在发现，但稍后才能处理”的工作。读取左括号时，还不知道它对应的右括号在哪里；搜索一个地点时，也会发现以后才要访问的邻居。此时除了保存数据，还必须决定下一次先处理谁。栈采取后进先出，像把盘子叠起来，只能先拿走最上面一只；队列采取先进先出，像依次接受服务的人。两者都能存相同元素，但取出顺序改变算法的含义，不能只因某个容器写起来方便就随意替换。先在纸上写出加入顺序与预期取出顺序，再选结构。本课用括号匹配理解栈，用任务排队理解队列，为之后两种搜索建立共同基础。"
            },
            {
              "title": "Python 中的栈与队列",
              "body": "Python 列表末尾的 append(x) 与 pop() 可以组成栈。append 没有返回新列表，而是修改原列表；pop 会删除并返回最后一个元素。空栈执行 pop 会报 IndexError，因此先检查 if stack。队列则用 collections.deque，末尾 append，开头 popleft。不要把列表的 pop(0) 当作大规模队列：删除首项后，其余元素要整体移动，反复操作可能累计成平方级时间。两种结构都可保存数字、字符串或坐标元组。容器保存的是尚未处理的工作，不应把它与保存所有访问结果的数组混为一谈。队列为空表示没有等待的任务，并不表示从未处理过任何任务。",
              "code": "from collections import deque\nstack = []\nqueue = deque()\nfor value in [10, 20, 30]:\n    stack.append(value)\n    queue.append(value)\nprint(stack.pop(), stack.pop())\nprint(queue.popleft(), queue.popleft())\n",
              "output": "30 20\n10 20\n"
            },
            {
              "title": "手算一次嵌套匹配",
              "body": "考虑字符串 (()())。第一个左括号入栈，栈长变成一；第二个左括号入栈，长度变成二；第三个字符是右括号，必须与最近尚未匹配的左括号配对，所以弹出一个，长度回到一。之后的左右括号使长度依次变成二、一、零。观察的关键不是左右括号总数，而是每个前缀是否仍有可配对的左括号。例如 )( 的总数相等，却在第一个字符就失败。再看 (()：扫描中从未缺少左括号，但结束时还剩一个，因此同样失败。请遮住代码，逐字符写出栈内容；如果无法解释某一次弹出对应哪个开括号，就先不要跳到完整程序。",
              "code": "stack = []\nfor ch in \"(()())\":\n    if ch == \"(\":\n        stack.append(ch)\n    else:\n        stack.pop()\n    print(ch, len(stack))\n",
              "output": "( 1\n( 2\n) 1\n( 2\n) 1\n) 0\n"
            },
            {
              "title": "把两种失败写进程序",
              "body": "完整解法需要一个容器和一个失败标记。遇到左括号就压栈；遇到右括号时，如果栈非空就弹出，否则将 ok 设为 False 并停止扫描。这里停止是安全的：已经出现没有左括号可匹配的前缀，后面的字符无法回到过去修复它。循环结束后，只有 ok 为真并且栈为空才能输出 Yes。不要在循环内部仅因为栈暂时为空就宣布成功，后面仍可能出现多余右括号。输入只含圆括号，所以 else 分支确实代表右括号；若题目允许其他字符，应重新规定过滤或报错规则。输出必须保持指定大小写，不要附加“结果是”等解释文本。",
              "code": "s = input().strip()\nstack = []\nok = True\nfor ch in s:\n    if ch == \"(\":\n        stack.append(ch)\n    elif stack:\n        stack.pop()\n    else:\n        ok = False\n        break\nprint(\"Yes\" if ok and not stack else \"No\")\n",
              "exampleInput": "(()())\n",
              "output": "Yes\n"
            },
            {
              "title": "为什么正确，为什么快",
              "body": "循环不变量是：若到目前为止没有失败，栈中恰好保存已读前缀里尚未匹配的左括号，顺序与它们出现的顺序一致。开始时前缀为空，空栈满足定义。加入左括号扩展未匹配集合；读入右括号并弹出最近的左括号，恰好完成一组合法嵌套。无法弹出就证明前缀不合法。结束时，栈为空排除了未闭合的左括号，因而全部字符匹配完成。每个字符最多入栈或出栈一次，列表末尾操作的摊还代价为常数，总时间为 O(L)，L 是字符串长度。全部是左括号时栈可能长到 L，因此最坏空间是 O(L)，不是因为只有一种字符就自动成为常数。"
            },
            {
              "title": "边界与可定位的错误",
              "body": "测试至少覆盖单个左括号、单个右括号、恰好一对、连续多组、深层嵌套和先合法后多出右括号六种形状。单个右括号能发现空栈弹出错误，单个左括号能发现忘记检查最终空栈，()() 能检查是否错误地在第一次闭合后停止。深层嵌套帮助检查是否真的按照后进先出处理。调试时可临时打印当前位置、字符和栈长，但提交前必须移除这些额外输出。若程序报错，先寻找第一次与手算状态不同的位置，而不是从最后结果盲目修改条件。本练习保证输入非空，所以空串不在输入范围内；算法能自然处理空串，并不等于可以擅自改变题目格式。"
            },
            {
              "title": "从括号推广到搜索",
              "body": "一个括号类型也可以只用整数余额解决：左括号加一，右括号减一，任何前缀不能为负，结束必须为零。但当同时出现 ()、[] 等类型时，仅保存数量就不够，因为最近的未匹配类型也要相同，栈更能体现结构。撤销操作、表达式解析、显式模拟递归也会用到栈。队列则适合按发现先后处理工作；下一课的 BFS 用它保持距离层次。DFS 用栈优先深入最近发现的分支，但它的首次到达距离通常不是最短路。选择时分别问：我需要最近的工作、最早的工作，还是最小优先级的工作？最后一种通常需要堆，而不是强行改动栈或队列。"
            },
            {
              "title": "独立完成本课练习",
              "body": "开始编码前，先写三行计划：容器保存未匹配左括号；右括号在空容器出现时立即失败；扫描结束后容器必须为空。再将每行计划对应到一个代码位置，避免记住代码顺序却忘了条件来源。完成后先运行自己设计的小例子，再运行课程检查。若所有样例通过，试着口头解释为什么很长的全左括号输入不会被接受，以及为什么总数相同不能保证正确。最后可以把栈替换成余额写第二个版本，对所有长度较小的括号串枚举比较两种实现。这个练习不是要求背会 append 与 pop，而是练会为“还有什么未处理”给出明确表示，并用不变量检查每一次更新。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么 )( 不合法？",
              "answer": "第一步出现右括号，当前没有可以匹配的左括号。"
            },
            {
              "question": "为什么不能用反复 pop(0) 实现大队列？",
              "answer": "每次删除首项都可能移动剩余元素，累计可达平方级时间。"
            }
          ],
          "exerciseTitle": "括号是否匹配",
          "task": "给定仅含 ( 和 ) 的非空字符串 S，长度不超过 200000。判断它能否按照正确的嵌套规则完全匹配。正确输出 Yes，否则输出 No。",
          "input": "一行字符串 S。",
          "output": "输出 Yes 或 No。",
          "hint": "右括号出现时需要一个尚未匹配的左括号；最后不能有剩余。",
          "explanation": "用空列表开始。读到左括号就添加；读到右括号则弹出最近尚未匹配的左括号，空栈时直接失败。最后同时检查没有中途失败且列表为空。每个字符只处理一次，时间 O(L)，最坏空间 O(L)。可分别用单个左右括号检验两种失败分支。"
        },
        "en": {
          "title": "Stacks and queues",
          "summary": "Manage unfinished work with an explicit removal order.",
          "objectives": [
            "Distinguish LIFO from FIFO",
            "Use list stacks and deque queues",
            "Prove bracket matching with an invariant"
          ],
          "sections": [
            {
              "title": "Why pending work needs an order",
              "body": "Programs often discover work that cannot be completed immediately. An opening parenthesis must wait for a later closing parenthesis; a discovered neighbor may wait until the current vertex has been processed. Keeping these pending items is only half the problem: you must also decide which item is handled next. A stack chooses the most recently added item, whereas a queue chooses the oldest. The contents can be identical while the resulting algorithm behaves differently. Write down the required removal order before choosing a container. Parentheses provide a concrete reason for a stack; scheduled visits provide a reason for a queue."
            },
            {
              "title": "Stack and queue operations in Python",
              "body": "Use a Python list as a stack: append adds at the end and pop removes and returns the last item. Neither operation creates a new list. Calling pop on an empty list raises IndexError, so test the container first. For a queue, import deque from collections and combine append with popleft. Repeated list.pop(0) shifts the remaining elements and can turn a linear process into a quadratic one. A pending-work container can hold integers, strings, or coordinate tuples. It is distinct from an array that remembers results: an empty queue means no work remains, not that no work has ever been done.",
              "code": "from collections import deque\nstack = []\nqueue = deque()\nfor value in [10, 20, 30]:\n    stack.append(value)\n    queue.append(value)\nprint(stack.pop(), stack.pop())\nprint(queue.popleft(), queue.popleft())\n",
              "output": "30 20\n10 20\n"
            },
            {
              "title": "Trace a nested pair by hand",
              "body": "Trace (()()) from left to right. The stack sizes become one, two, one, two, one, zero. At the first closing parenthesis, the most recent unmatched opening parenthesis is removed, which explains the last-in, first-out rule. Total counts alone are insufficient: )( contains one of each character but fails immediately because its first prefix has no opening parenthesis available. Conversely, (() never tries to remove from an empty stack, yet finishes with an unmatched opening parenthesis. Cover the code and record the stack after every character. Explain the particular opening parenthesis that each removal matches before moving on.",
              "code": "stack = []\nfor ch in \"(()())\":\n    if ch == \"(\":\n        stack.append(ch)\n    else:\n        stack.pop()\n    print(ch, len(stack))\n",
              "output": "( 1\n( 2\n) 1\n( 2\n) 1\n) 0\n"
            },
            {
              "title": "Encode both ways to fail",
              "body": "The complete solution stores pending opening parentheses and a failure flag. Push on an opening character. On a closing character, pop if possible; otherwise mark failure and stop. Stopping is safe because a prefix with too many closing parentheses cannot be repaired by characters that occur later. After the loop, require both a true flag and an empty stack. Do not announce success merely because the stack becomes empty midway through the string. The input contract contains only round parentheses, making the final branch unambiguous. With other characters, the validation rules would need to change. Print exactly the requested capitalization.",
              "code": "s = input().strip()\nstack = []\nok = True\nfor ch in s:\n    if ch == \"(\":\n        stack.append(ch)\n    elif stack:\n        stack.pop()\n    else:\n        ok = False\n        break\nprint(\"Yes\" if ok and not stack else \"No\")\n",
              "exampleInput": "(()())\n",
              "output": "Yes\n"
            },
            {
              "title": "Correctness and running time",
              "body": "Use this invariant: before failure, the stack contains exactly the unmatched opening parentheses of the processed prefix, in their original order. The empty prefix satisfies it. An opening character extends that set; a closing character removes precisely the latest unmatched opening character. An impossible removal proves invalidity, and an empty final stack proves that no opening characters remain. Each character causes at most one insertion or removal. End operations on a list have amortized constant cost, so total time is O(L). A string consisting entirely of opening parentheses stores L items, giving O(L) worst-case space rather than constant space."
            },
            {
              "title": "Boundaries that reveal mistakes",
              "body": "Choose tests for distinct failure modes: one opening character, one closing character, a single pair, consecutive pairs, deep nesting, and a valid prefix followed by an extra closing character. A lone closing character catches an unchecked pop; a lone opening character catches a missing final emptiness check. Consecutive pairs reveal premature success after the first pair. While debugging, temporarily print the index, character, and stack size, then remove these diagnostics before submission. Find the first state that differs from your hand trace instead of randomly changing the final condition. The exercise excludes an empty input string, even though the algorithm naturally generalizes to it."
            },
            {
              "title": "From matching to graph search",
              "body": "For one bracket type, an integer balance can replace the stack: add one for opening, subtract one for closing, forbid negative prefixes, and finish at zero. Multiple bracket types need more information because the most recent type must also match. Stacks also support undo, expression parsing, and explicit recursion simulation. Queues suit work processed in discovery order; BFS uses that order to preserve distance layers. DFS uses a stack to pursue a recent branch but does not generally find shortest paths on first arrival. Ask whether the next item should be the newest, oldest, or smallest-priority item; the third requirement usually calls for a heap."
            },
            {
              "title": "Complete the exercise independently",
              "body": "Before coding, write three commitments: the container stores unmatched openings; a closing character with no available opening fails immediately; the final container must be empty. Point to the code that enforces each commitment. Run your own small examples before the course checks. Then explain aloud why a long sequence of openings is rejected and why equal totals are not enough. As an extension, write the balance-counter version and compare the two on every short bracket string. The goal is not to memorize method names. It is to represent unfinished work precisely and justify how every update preserves that representation."
            }
          ],
          "checkpoints": [
            {
              "question": "Why is )( invalid?",
              "answer": "Its first closing parenthesis has no preceding unmatched opening."
            },
            {
              "question": "Why avoid repeated list.pop(0) for a large queue?",
              "answer": "Each removal may shift all remaining items, producing quadratic total work."
            }
          ],
          "exerciseTitle": "Balanced parentheses",
          "task": "Given a nonempty string S containing only ( and ), with length at most 200000, determine whether all parentheses form a valid nested sequence. Print Yes if valid and No otherwise.",
          "input": "One line containing S.",
          "output": "Print Yes or No.",
          "hint": "Every closing parenthesis needs an unmatched opening; none may remain at the end.",
          "explanation": "Start with an empty list. Push opening parentheses and remove the most recent unmatched opening for each closing one. An empty stack at removal means failure. Finish by requiring both no earlier failure and an empty stack. Each character is processed once: O(L) time and O(L) worst-case space. Lone opening and closing characters test the two different failure branches."
        },
        "ja": {
          "title": "スタックとキュー",
          "summary": "未処理の仕事を取り出す順序を決める。",
          "objectives": [
            "後入れ先出しと先入れ先出しを区別する",
            "リストと deque を使い分ける",
            "不変条件で括弧判定を説明する"
          ],
          "sections": [
            {
              "title": "保留中の仕事に順序を与える",
              "body": "プログラムでは、見つけた瞬間には終えられず、後で処理する仕事がよく現れます。開き括弧を読んでも、対応する閉じ括弧はまだ先にあります。探索中に隣接点を発見しても、現在の点を処理してから訪問したい場合があります。このとき必要なのは保存場所だけでなく、次にどの仕事を取り出すかという規則です。スタックは最後に入れた物から取り出し、積んだ皿の一番上を取る操作に似ています。キューは最初に入れた物から取り出し、受付の順番待ちに似ています。同じ要素を保存していても取り出す順序が違えば計算の意味が変わります。書きやすさだけで選ばず、追加と取り出しの順序を紙に書き、問題に合う構造を選びましょう。"
            },
            {
              "title": "Python での基本操作",
              "body": "Python のリストでは末尾への append(x) と末尾からの pop() を使えばスタックになります。append は新しいリストを返す操作ではなく、元のリストを変更します。pop は最後の要素を削除すると同時に、その値を返します。空のリストから取り出すと IndexError になるので、先に if stack などで確認します。キューには collections の deque を用い、append と popleft を組み合わせます。リストの pop(0) は残りの要素をずらすため、大量に繰り返すと二乗程度の処理になります。要素には整数だけでなく文字や座標の組も保存できます。また、処理待ちの容器と結果を記録する配列は別物です。キューが空でも、過去に訪問した記録まで消えるわけではありません。",
              "code": "from collections import deque\nstack = []\nqueue = deque()\nfor value in [10, 20, 30]:\n    stack.append(value)\n    queue.append(value)\nprint(stack.pop(), stack.pop())\nprint(queue.popleft(), queue.popleft())\n",
              "output": "30 20\n10 20\n"
            },
            {
              "title": "入れ子の括弧を手で追う",
              "body": "文字列 (()()) を左から追います。最初の開き括弧を追加すると個数は一、次の開き括弧で二になります。三文字目は閉じ括弧なので、まだ対応していない中で最も新しい開き括弧を取り除き、個数は一に戻ります。その後は二、一、零と変化します。ここで見るべきなのは最終的な左右の個数だけではなく、途中の各接頭辞で閉じる相手が残っているかです。例えば )( は左右の個数が等しくても最初の文字で失敗します。一方 (() は途中で取り出せなくなることはありませんが、最後に開き括弧が残るので失敗です。コードを隠し、各文字の後のスタックを書いてください。どの開き括弧を取り除いたか説明できると、規則を理解したことになります。",
              "code": "stack = []\nfor ch in \"(()())\":\n    if ch == \"(\":\n        stack.append(ch)\n    else:\n        stack.pop()\n    print(ch, len(stack))\n",
              "output": "( 1\n( 2\n) 1\n( 2\n) 1\n) 0\n"
            },
            {
              "title": "二種類の失敗をコードにする",
              "body": "完成版では、未対応の開き括弧を保存する容器と、失敗したかを表す変数を用います。開き括弧なら追加し、閉じ括弧なら取り出します。ただし空なら ok を False にして走査を終えます。閉じ括弧が先行した接頭辞は、後から文字を足しても過去の対応を修復できないため、ここで終了して構いません。ループ終了後は、ok が真で、さらにスタックが空のときだけ Yes です。途中で空になった瞬間に成功としないでください。後ろに余分な閉じ括弧が来る可能性があります。入力は丸括弧だけという条件なので、else を閉じ括弧として扱えます。別の文字も許される問題なら、その扱いを定義し直す必要があります。出力には説明文を加えず、指定の大文字と小文字を守ります。",
              "code": "s = input().strip()\nstack = []\nok = True\nfor ch in s:\n    if ch == \"(\":\n        stack.append(ch)\n    elif stack:\n        stack.pop()\n    else:\n        ok = False\n        break\nprint(\"Yes\" if ok and not stack else \"No\")\n",
              "exampleInput": "(()())\n",
              "output": "Yes\n"
            },
            {
              "title": "正しさと計算量を説明する",
              "body": "不変条件を言葉にすると、「失敗していない限り、スタックには読み終えた接頭辞の未対応の開き括弧だけが、出現順に入っている」となります。最初は空の接頭辞と空のスタックなので成り立ちます。開き括弧を追加すると未対応の集合が増え、閉じ括弧で最後の要素を取り除くと最も内側の組が完成します。取り出せなければ、その接頭辞が不正だと分かります。最後に空なら閉じ忘れもありません。各文字に対して追加か削除を高々一回行い、リスト末尾の操作は償却定数時間なので全体は O(L) 時間です。開き括弧が並ぶ入力では L 個まで保存するため、最悪の使用領域は O(L) です。文字の種類が一種類でも領域が定数になるわけではありません。"
            },
            {
              "title": "間違いを切り分ける境界例",
              "body": "境界テストは、開き括弧一個、閉じ括弧一個、一組だけ、複数組の連続、深い入れ子、正しい列の後ろに余分な閉じ括弧を付けたものを用意します。閉じ括弧一個は空からの pop を、開き括弧一個は最後の空判定忘れを検出します。()() は最初の一組が閉じた時点で誤って終了するコードを見つけられます。入れ子の例は最後に入れたものを取り出しているかを確認できます。調査中は位置、文字、スタックの長さを一時的に出力してもよいですが、提出前には取り除きます。最後の答えを見て条件を適当に変えるより、手計算と初めて異なる状態を探す方が原因に近づけます。この課題では空文字列は入力されません。自然に扱えることと、問題の入力条件を変更してよいことは別です。"
            },
            {
              "title": "括弧から探索へつなげる",
              "body": "括弧が一種類だけなら整数の残高でも解けます。開くと一を足し、閉じると一を引き、途中で負にならず最後に零なら正しいという判定です。しかし () と [] など複数種類が混ざると、数だけでは直近の種類が一致するか分かりません。スタックが保存する情報の意味が重要になります。取り消し操作、式の解析、再帰を明示的に置き換える処理にも使われます。一方、発見順に処理したいならキューが適しています。次の BFS では距離の層を保つために使います。DFS はスタックで新しく見つけた枝を先に進みますが、最初の到着が最短とは限りません。次に必要なのが最新、最古、最小優先度のどれかを問いましょう。最小優先度なら通常はヒープという別の構造を検討します。"
            },
            {
              "title": "自分で実装する手順",
              "body": "実装前に、未対応の開き括弧を保存する、空の状態で閉じ括弧が来たら失敗する、最後に空でなければ失敗する、という三つの約束を書きます。その後、それぞれを保証するコードの場所を指してください。コードの順番だけを覚え、条件の理由を忘れることを防げます。自分で作った小例を試してからコースのテストを実行します。通過したら、非常に長い開き括弧だけの入力がなぜ不正になるか、左右の総数が等しいだけではなぜ不十分かを説明します。発展として残高だけを使う版を書き、短い括弧列を全列挙して両者の結果を比較してもよいでしょう。目的はメソッド名の暗記ではありません。何が未処理なのかを正確に表し、更新のたびにその意味が保たれると説明する練習です。"
            }
          ],
          "checkpoints": [
            {
              "question": ")( はなぜ不正ですか。",
              "answer": "最初の閉じ括弧に対応する開き括弧がありません。"
            },
            {
              "question": "大きなキューで pop(0) を避ける理由は。",
              "answer": "先頭削除のたびに残りの要素をずらし、合計が二乗程度になり得るためです。"
            }
          ],
          "exerciseTitle": "括弧の対応",
          "task": "( と ) のみからなる空でない文字列 S が与えられます。長さは 200000 以下です。すべての括弧が正しい入れ子で対応するなら Yes、そうでなければ No を出力してください。",
          "input": "一行に文字列 S。",
          "output": "Yes または No を出力してください。",
          "hint": "閉じ括弧には未対応の開き括弧が必要です。最後に残ってもいけません。",
          "explanation": "空のリストから始め、開き括弧を追加し、閉じ括弧では直近の未対応要素を取り除きます。空から取り出そうとしたら失敗です。最後に途中の失敗がなく、リストが空であることを確認します。各文字を一度処理するので O(L) 時間、最悪 O(L) 領域です。左右一個ずつの例で二種類の失敗を確認できます。"
        }
      },
      "order": 17,
      "stage": "graphs",
      "minutes": 40,
      "prerequisiteIds": [
        "two-pointers"
      ],
      "relatedProblems": [
        "ABC340B",
        "ABC216D",
        "ABC335C"
      ],
      "solution": "s = input().strip()\nstack = []\nok = True\nfor ch in s:\n    if ch == \"(\":\n        stack.append(ch)\n    elif stack:\n        stack.pop()\n    else:\n        ok = False\n        break\nprint(\"Yes\" if ok and not stack else \"No\")\n",
      "starter": "s = input().strip()\n# TODO\n",
      "tests": [
        {
          "input": "()\n",
          "expected": "Yes\n"
        },
        {
          "input": ")\n",
          "expected": "No\n"
        },
        {
          "input": "(\n",
          "expected": "No\n"
        },
        {
          "input": "(()())\n",
          "expected": "Yes\n"
        },
        {
          "input": "()()\n",
          "expected": "Yes\n"
        },
        {
          "input": "())(\n",
          "expected": "No\n"
        }
      ]
    },
    {
      "id": "breadth-first-search",
      "order": 18,
      "stage": "graphs",
      "minutes": 50,
      "prerequisiteIds": [
        "stacks-and-queues"
      ],
      "relatedProblems": [
        "ABC325C",
        "ABC304C",
        "ABC272D"
      ],
      "content": {
        "zh": {
          "title": "广度优先搜索",
          "summary": "用距离层次求等代价移动的最短路。",
          "sections": [
            {
              "title": "先把移动问题变成图",
              "body": "地图上的最短路问题可以先去掉画面，保留“状态”和“允许的移动”。每个可通行格子是一个状态，也叫顶点；一次合法移动是连接两个状态的边。本课的状态只需行号与列号，因为之后能走哪里仅由位置和固定地图决定。如果题目还含钥匙、剩余体力或时间，就必须判断这些信息是否也要进入状态，不能照搬二维距离表。这里四个方向每走一步代价都是一，所以答案就是边的最少条数。坐标使用零下标，左上角为 (0,0)，右下角为 (H-1,W-1)。开始写搜索前，先确定墙不是可访问状态，斜向移动也不是允许的边。模型一旦错了，队列写得再熟练也会求出另一个问题的答案。"
            },
            {
              "title": "距离表与队列各自负责什么",
              "body": "建立 H 行 W 列的 dist 表，初始全部为 -1，表示尚未发现；起点设为 0，表示不用移动就已站在那里。队列只保存已发现但尚未展开邻居的格子。dist 同时承担访问标记：值不是 -1，就不应再次入队。务必在入队时而不是出队时写入距离，否则两个父节点可能把同一个格子重复加入，队列膨胀，路径计数也容易错。二维列表必须逐行新建，写成 [[-1]*W for _ in range(H)]。若用 [[-1]*W]*H，多行实际共享同一个列表，修改一格会让多个位置一起改变。保存访问结果和保存待办工作是两种职责；理解这一点比背下一行 deque 初始化更重要。",
              "code": "dist = [[-1] * 3 for _ in range(2)]\ndist[0][1] = 0\nprint(dist[0])\nprint(dist[1])\n",
              "output": "[-1, 0, -1]\n[-1, -1, -1]\n"
            },
            {
              "title": "用小地图观察距离层",
              "body": "手画两行三列地图，第一行 ...，第二行 .#.。初始队列只有左上角，距离零。展开它时发现下方和右方，距离都是一，按方向顺序入队。先处理下方时，它的右侧是墙，其余方向越界或已访问，所以不会增加新点。处理第一行中间时，发现右上角，距离二；随后右上角发现右下角，距离三。队列中较早的距离一全部处理完，才轮到距离二；这就是先进先出的作用。请逐轮列出“弹出的格子、它的距离、刚入队的格子”，不要只画最终路线。无路可走的格子仍会被正常取出并结束处理，不需要额外制造一个失败状态。只有整个队列耗尽后终点仍未发现，才说明不可到达。"
            },
            {
              "title": "完整程序的四个邻居检查",
              "body": "每次 popleft 取出坐标 (r,c)，对四组方向差计算 (nr,nc)。检查顺序先是行列范围，然后才读取地图，最后判断是否尚未发现。Python 负下标不会总是报错，例如 grid[-1] 会读最后一行，因此漏掉 nr>=0 会产生悄悄穿越地图的错误。满足条件后，把新距离设为当前距离加一，并将坐标元组入队。程序无需保存整条路径，因为题目只问最少步数；若要求输出路线，可另存每个格子的父坐标并从终点倒推。这个版本完整遍历所有能到达的格子，便于理解未到达位置仍为 -1 的含义。读行使用 input()，不要 split 成单词，否则字符坐标将不再对应格子。",
              "code": "from collections import deque\n\nh, w = map(int, input().split())\ngrid = [input() for _ in range(h)]\ndist = [[-1] * w for _ in range(h)]\ndist[0][0] = 0\nqueue = deque([(0, 0)])\nwhile queue:\n    r, c = queue.popleft()\n    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < h and 0 <= nc < w:\n            if grid[nr][nc] == \".\" and dist[nr][nc] == -1:\n                dist[nr][nc] = dist[r][c] + 1\n                queue.append((nr, nc))\nprint(dist[h - 1][w - 1])\n",
              "exampleInput": "2 3\n...\n.#.\n",
              "output": "3\n"
            },
            {
              "title": "首次发现为何是最短距离",
              "body": "证明依赖“层”的顺序。起点的距离零显然最短。假设正在处理所有距离为 d 的格子，它们加入的未访问邻居被标为 d+1。任何到这个邻居更短的路径，其倒数第二格距离至多 d-1，应当在更早的层处理过，并已经发现它，这与现在仍未访问矛盾。因此首次赋值就是最短距离，不需要反复更新。此证明要求每条边代价相同；如果有零代价和一代价混合、或者任意不同权重，普通队列规则不能直接保证结论。每个格子最多入队一次，每次最多检查四个邻居，时间 O(HW)。距离表和队列最坏都可容纳与格子数同阶的数据，空间也是 O(HW)，不是按最短路线长度来计算。"
            },
            {
              "title": "检查起点、墙与不可达",
              "body": "一格地图中起点就是终点，答案应为零，不能因为没有移动就输出 -1。两格之间有墙、终点被隔离、只有一行或只有一列，也都要单独检查。题目保证起终点可通行，所以代码可直接初始化起点；若换题后没有这个保证，就必须补充判断。很窄的通道能检查方向和边界，多条同长路线能检查是否重复访问。不要把格子个数与移动次数混淆：经过 k 个格子的路线只走了 k-1 步。也不要把 dist 为零当成未访问，零是起点的有效距离。本课的 -1 同时表达“未访问”和最终“不可达”，只有搜索结束之后才能把这个值作为到达性的结论。调试可以打印距离表，但正式输出只留终点距离。"
            },
            {
              "title": "选择 BFS，而不是记住地图模板",
              "body": "看到网格不一定使用 BFS：求连通区域数量时 DFS 也能完成；只按给定指令移动时，普通循环就足够。BFS 的核心需求是“所有转移代价相等，并且需要最少转移次数或按层扩展”。图也不一定有二维外观，字符串变换、整数操作、棋盘状态都可能形成图。先估计状态数，再估计每个状态的邻居数，确认枚举是否可承受。本题最多二千五百格，每格四邻居，非常适合直接搜索。做练习时，独立写出状态含义、初始化、邻居生成和访问条件四项，然后才拼成程序。若可以解释队列顺序为什么构成距离层，便具备将方法迁移到普通邻接表图的基础，而不是仅会复制网格代码。"
            }
          ],
          "exerciseTitle": "网格最短路",
          "task": "给定 H 行 W 列网格，. 可以通行，# 是墙。起点是左上角，终点是右下角，两者保证可通行。每次可上下左右移动一格，求最少步数；无法到达时输出 -1。1 ≤ H,W ≤ 50。",
          "input": "第一行 H W；接下来 H 行，每行 W 个字符，仅含 . 和 #。",
          "output": "输出最少移动步数，或 -1。",
          "hint": "从 (0, 0) 开始 BFS；邻居必须在边界内、不是墙且距离为 -1。",
          "explanation": "先把每个可通行格子视为顶点。距离表初始化为 -1，起点为 0。队列按先入先出展开邻居；范围内、非墙、未访问三个条件都满足时立即记录父距离加一并入队。每个点只会入队一次，距离按层递增，所以首次发现是最短。最后直接输出终点距离，单格为 0，不可达仍为 -1。时间与空间均为 O(HW)。",
          "objectives": [
            "建立状态、边和距离表",
            "在入队时标记并避免重复",
            "证明首次发现距离最短"
          ],
          "checkpoints": [
            {
              "question": "为什么不能出队时才标记？",
              "answer": "同一格子可能被多个父节点重复入队，破坏每格一次的保证。"
            },
            {
              "question": "权重不同还能直接使用普通BFS吗？",
              "answer": "不能；按边数的层次不再对应总代价，需要选择适合权重的算法。"
            }
          ]
        },
        "en": {
          "title": "Breadth-first search",
          "summary": "Use distance layers for shortest paths with equal-cost moves.",
          "sections": [
            {
              "title": "Turn movement into a graph",
              "body": "Remove the drawing from a movement problem and keep its states and legal transitions. An open cell is a vertex, and one permitted move is an edge. Here a state needs only a row and column because future moves depend on position and a fixed map. Keys, remaining energy, or time would require reconsidering that state definition. Every legal move costs one, so the shortest path minimizes the number of edges. Coordinates start at zero. Before writing a queue, establish that walls are not usable vertices and diagonal moves are not edges. A correct search over an incorrect model still solves the wrong problem."
            },
            {
              "title": "Separate distances from pending visits",
              "body": "Create a distance table initialized to minus one, meaning undiscovered. Set the starting distance to zero. The queue contains discovered cells whose neighbors have not yet been expanded. These roles differ: the table remembers knowledge while the queue stores pending work. Distance also acts as the visited flag, so record it when enqueuing, not when removing. Otherwise several parents can enqueue the same cell. Build independent row lists with a comprehension. Multiplying one inner list repeats references rather than copying rows, and updating one cell can silently change several rows. Know what each structure represents before memorizing its initialization.",
              "code": "dist = [[-1] * 3 for _ in range(2)]\ndist[0][1] = 0\nprint(dist[0])\nprint(dist[1])\n",
              "output": "[-1, 0, -1]\n[-1, -1, -1]\n"
            },
            {
              "title": "Trace distance layers on a small map",
              "body": "Draw a two-row map whose row strings are \"...\" and \".#.\". Start with the top-left cell at distance zero. Its lower and right neighbors enter at distance one. The lower cell adds nothing because its other neighbors are blocked, outside the map, or already known. The top-middle cell discovers the top-right at distance two, which later discovers the bottom-right at distance three. All distance-one work is processed before distance-two work. For each round, write the removed cell, its distance, and newly enqueued cells. A dead end is simply a cell that adds nothing. Unreachability follows only when all pending work is exhausted without discovering the destination."
            },
            {
              "title": "Implement the four neighbor checks",
              "body": "Remove a coordinate with popleft and try four direction offsets. Check row and column bounds before indexing the grid, then check openness and the undiscovered marker. Negative Python indices are valid in many cases, so omitting a lower bound can create an accidental connection to the opposite edge instead of an exception. Assign the neighbor distance before appending its coordinate. The task asks only for length, so storing whole paths is unnecessary. If an actual route were required, store a parent coordinate and reconstruct backward. Read each grid row as a string; splitting it into words would destroy the intended character indexing.",
              "code": "from collections import deque\n\nh, w = map(int, input().split())\ngrid = [input() for _ in range(h)]\ndist = [[-1] * w for _ in range(h)]\ndist[0][0] = 0\nqueue = deque([(0, 0)])\nwhile queue:\n    r, c = queue.popleft()\n    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < h and 0 <= nc < w:\n            if grid[nr][nc] == \".\" and dist[nr][nc] == -1:\n                dist[nr][nc] = dist[r][c] + 1\n                queue.append((nr, nc))\nprint(dist[h - 1][w - 1])\n",
              "exampleInput": "2 3\n...\n.#.\n",
              "output": "3\n"
            },
            {
              "title": "Why first discovery is shortest",
              "body": "The proof relies on layers. Distance zero is correct at the start. When processing distance-d cells, their undiscovered neighbors receive d plus one. If such a neighbor had a shorter route, its predecessor on that route would belong to an earlier layer and would already have discovered it. This contradicts the undiscovered marker. First assignment is therefore final. Equal edge cost is essential: arbitrary weights do not obey this queue argument. Each cell enters once and checks at most four directions, giving O(HW) time. The distance table and queue can both contain a number of entries proportional to the grid size, giving O(HW) space."
            },
            {
              "title": "Check start, walls, and unreachable cases",
              "body": "A one-cell grid has answer zero because start and finish coincide. Also test a blocked destination region, a single row, a single column, a narrow corridor, and several equally short routes. The exercise guarantees open endpoints; another task without that guarantee needs an explicit check. A route containing k cells uses k minus one moves, so do not count vertices as steps. Zero is a valid distance, not an unvisited marker. Minus one means undiscovered during the search and unreachable only after exploration ends. Printing the whole distance table is useful for debugging, but the submitted output must contain only the destination value."
            },
            {
              "title": "Choose BFS for the right reason",
              "body": "A grid alone does not imply BFS. Counting connected regions can use DFS, and following prescribed moves may require only a loop. Choose BFS because transitions have equal cost and you need the fewest transitions or a layered exploration. The states could also be strings, integers, or board configurations. Estimate the number of states and neighbors before assuming the search is feasible. This exercise has at most 2,500 cells with four neighbors each. Independently specify the state, initialization, neighbor generation, and visited condition before assembling the program. Understanding why queue order creates distance layers lets you transfer the method to adjacency-list graphs."
            }
          ],
          "exerciseTitle": "Shortest grid path",
          "task": "Given an H-by-W grid, . is open and # is a wall. Start at the top-left and finish at the bottom-right; both are open. A move goes one cell up, down, left, or right. Find the minimum moves, or print -1 if unreachable. 1 ≤ H,W ≤ 50.",
          "input": "H W on the first line; then H rows of W characters, each either . or #.",
          "output": "Print the minimum number of moves, or -1.",
          "hint": "Start BFS at (0, 0). A neighbor must be in bounds, open, and have distance -1.",
          "explanation": "Treat each open cell as a vertex. Initialize distances to minus one and the start to zero. Expand the queue in FIFO order. A neighbor must be in bounds, open, and undiscovered; immediately assign its parent distance plus one before enqueuing. Each cell enters once, and increasing distance layers make first discovery shortest. Print the destination value directly: zero for a single cell, minus one if unreachable. Time and space are O(HW).",
          "objectives": [
            "Model states, edges, and distances",
            "Mark on enqueue to avoid duplicates",
            "Justify shortest first-discovery distances"
          ],
          "checkpoints": [
            {
              "question": "Why mark on enqueue rather than removal?",
              "answer": "Several parents could enqueue the same cell before its first removal."
            },
            {
              "question": "Does ordinary BFS handle unequal edge costs?",
              "answer": "No. Layers count edges, which no longer equal total cost."
            }
          ]
        },
        "ja": {
          "title": "幅優先探索",
          "summary": "同じコストの移動を距離の層で調べる。",
          "sections": [
            {
              "title": "移動をグラフで表す",
              "body": "地図の見た目を離れ、状態と許される移動だけを残して考えます。通行可能なマスが頂点で、一回の合法な移動が辺です。この課題では、以後の移動が現在位置と固定された地図だけで決まるので、状態は行と列で十分です。鍵の所持、残り体力、時刻などが条件に入るなら、それらも状態として区別すべきかを考え直します。上下左右の移動はどれも一回なので、最短路は辺の本数が最少の道です。座標は零から始め、左上は (0,0)、右下は (H-1,W-1) です。探索を書く前に、壁は訪問できず、斜め移動も辺ではないことを確認します。モデルを間違えると、キューを正しく操作しても別の問題の答えを求めてしまいます。"
            },
            {
              "title": "距離表とキューの役割を分ける",
              "body": "距離表 dist を H 行 W 列で作り、未発見を表す -1 で埋めます。始点は移動せず立っているので零です。キューには、発見済みだが隣接マスをまだ展開していない場所を入れます。dist は知っている結果を残し、キューはこれから処理する仕事を保存する、という役割の違いがあります。距離が -1 でなければ訪問済みと判断できます。距離は取り出す時ではなく、追加する時に記録してください。遅らせると複数の親から同じマスが重複して追加されます。二次元リストは [[-1]*W for _ in range(H)] のように各行を別に作ります。一つの行を H 倍すると参照が共有され、一マスの変更が他の行まで変えてしまいます。",
              "code": "dist = [[-1] * 3 for _ in range(2)]\ndist[0][1] = 0\nprint(dist[0])\nprint(dist[1])\n",
              "output": "[-1, 0, -1]\n[-1, -1, -1]\n"
            },
            {
              "title": "小さな地図で距離の層を見る",
              "body": "二行三列の地図を描き、一行目を ...、二行目を .#. とします。最初のキューには距離零の左上だけが入っています。そこから下と右を距離一で追加します。下のマスを取り出しても、ほかの方向は壁、範囲外、訪問済みなので増えません。一行目の中央を処理すると右上が距離二で見つかり、さらに右下が距離三になります。先入れ先出しにより、距離一の仕事がすべて終わってから距離二を処理することが分かります。各回について、取り出したマス、その距離、新たに追加したマスを書いてください。行き止まりは何も追加しないだけで、特別な失敗状態は不要です。すべての仕事が終わっても目的地が未発見なら、初めて到達不能と判断します。"
            },
            {
              "title": "隣接マスの条件を実装する",
              "body": "popleft で座標 (r,c) を取り出し、四種類の方向差から (nr,nc) を計算します。まず行と列が範囲内かを確認し、その後で地図を参照して、通れることと未発見であることを調べます。Python では負の添字が必ずしもエラーにならず、grid[-1] は最後の行を読みます。下限の確認を忘れると地図の反対側へつながったような誤答になります。条件を満たしたら距離に一を足して記録し、座標の組を追加します。求めるのは長さだけなので、経路全体を保存する必要はありません。道順が必要なら親の座標を別に保存して終点から戻ります。この実装は到達可能な場所を最後まで調べ、未到達の -1 をそのまま答えに使います。",
              "code": "from collections import deque\n\nh, w = map(int, input().split())\ngrid = [input() for _ in range(h)]\ndist = [[-1] * w for _ in range(h)]\ndist[0][0] = 0\nqueue = deque([(0, 0)])\nwhile queue:\n    r, c = queue.popleft()\n    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < h and 0 <= nc < w:\n            if grid[nr][nc] == \".\" and dist[nr][nc] == -1:\n                dist[nr][nc] = dist[r][c] + 1\n                queue.append((nr, nc))\nprint(dist[h - 1][w - 1])\n",
              "exampleInput": "2 3\n...\n.#.\n",
              "output": "3\n"
            },
            {
              "title": "最初の発見が最短になる理由",
              "body": "正しさは層の順番から説明します。始点の距離零は明らかに最短です。距離 d のマスを処理して未発見の隣接点を見つけたら、その距離を d+1 とします。もしもっと短い道があるなら、その道の直前のマスは d-1 以下の層にあり、既に処理されて目的のマスを発見したはずです。未発見であることと矛盾するため、最初の値が最短になります。この説明には、すべての辺の代価が等しいという前提があります。零と一が混在したり任意の重みがあったりすると、そのままでは成り立ちません。各マスは一回だけ追加され、四方向だけを確認するので O(HW) 時間です。距離表とキューはいずれもマス数に比例する大きさになり得るため、領域も O(HW) です。"
            },
            {
              "title": "始点と壁と到達不能を確認する",
              "body": "一マスの地図では始点と終点が同じなので答えは零です。移動しなかったことを到達不能と混同しないでください。終点の領域が壁で分離される例、一行、一列、細い通路、同じ長さの道が複数ある例も試します。この課題は始点と終点が通れると保証していますが、別の問題ではその保証を読み直し、必要なら初期チェックを追加します。k 個のマスを通る道の移動は k-1 回です。また、零は始点の正しい距離なので未訪問の印にはできません。-1 は探索途中では未発見、探索完了後には到達不能を意味します。完了する前に不可達だと結論してはいけません。距離表を表示すると調査に役立ちますが、提出時には終点の距離だけを残します。"
            },
            {
              "title": "地図の形ではなく条件で選ぶ",
              "body": "グリッドが出たという理由だけで BFS を選ぶ必要はありません。連結領域の個数なら DFS でもよく、指定された指示どおり動くだけなら普通のループで十分です。BFS を選ぶ理由は、すべての遷移の代価が等しく、最少の遷移回数や層ごとの探索が必要だからです。状態は文字列、整数、盤面全体などでも構いません。状態の数と各状態から出る辺の数を見積もり、探索できる規模かを確認します。本課題は最大二千五百マスで各四方向なので直接探索できます。状態の意味、初期化、隣接点の生成、訪問条件を自分の言葉で先に書き、それからプログラムに組み立てましょう。キューが距離の層を作る理由を説明できれば、二次元コードの暗記を越えて通常のグラフへ応用できます。"
            }
          ],
          "exerciseTitle": "グリッドの最短経路",
          "task": "H 行 W 列のグリッドが与えられます。. は通行可能、# は壁です。左上から右下を目指します。両方のマスは通行可能です。1 回で上下左右のいずれかへ 1 マス移動できます。最小移動回数を求め、到達できなければ -1 を出力してください。1 ≤ H,W ≤ 50 です。",
          "input": "1 行目に H W、その後 H 行に、. または # からなる長さ W の文字列が与えられます。",
          "output": "最小移動回数、または -1 を出力してください。",
          "hint": "(0, 0) から BFS を行います。隣接マスは範囲内、壁でない、距離が -1 の 3 条件を満たす必要があります。",
          "explanation": "通行可能なマスを頂点と考え、距離を -1、始点を零にします。キューを先入れ先出しで処理し、範囲内・壁ではない・未発見という三条件を満たす隣接点に、現在の距離に一を足した値を記録してから追加します。各点は一回だけ追加され、距離の層の順になるため初回の発見が最短です。終点の値を出力すれば、一マスなら零、到達不能なら -1 になります。時間と領域は O(HW) です。",
          "objectives": [
            "状態と辺と距離表を定める",
            "追加時に記録して重複を防ぐ",
            "最初の距離が最短と説明する"
          ],
          "checkpoints": [
            {
              "question": "取り出す時に訪問印を付けると何が起きますか。",
              "answer": "複数の親から同じマスが重複して追加されることがあります。"
            },
            {
              "question": "辺のコストが異なる場合も普通の BFS でよいですか。",
              "answer": "いいえ。辺数の層と総コストが一致しなくなるためです。"
            }
          ]
        }
      },
      "starter": "from collections import deque\n\nh, w = map(int, input().split())\ngrid = [input() for _ in range(h)]\n# TODO\n",
      "solution": "from collections import deque\n\nh, w = map(int, input().split())\ngrid = [input() for _ in range(h)]\ndist = [[-1] * w for _ in range(h)]\ndist[0][0] = 0\nqueue = deque([(0, 0)])\nwhile queue:\n    r, c = queue.popleft()\n    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < h and 0 <= nc < w:\n            if grid[nr][nc] == \".\" and dist[nr][nc] == -1:\n                dist[nr][nc] = dist[r][c] + 1\n                queue.append((nr, nc))\nprint(dist[h - 1][w - 1])\n",
      "tests": [
        {
          "input": "1 1\n.\n",
          "expected": "0\n"
        },
        {
          "input": "2 2\n.#\n#.\n",
          "expected": "-1\n"
        },
        {
          "input": "1 5\n.....\n",
          "expected": "4\n"
        },
        {
          "input": "5 5\n.....\n####.\n.....\n.####\n.....\n",
          "expected": "16\n"
        }
      ]
    },
    {
      "id": "depth-first-search",
      "content": {
        "zh": {
          "title": "深度优先式遍历与连通分量",
          "summary": "用显式栈遍历整张图，并解释每个分量为何只数一次。",
          "objectives": [
            "建立无向邻接表",
            "使用显式栈避免递归深度限制",
            "证明访问集合恰好是一个连通分量"
          ],
          "sections": [
            {
              "title": "先问能否相连，不急着问最短",
              "body": "并非每个图问题都需要距离。有时只问哪些点能通过若干条边互相到达，例如朋友网络被分成几组、线路系统有几个独立区域。一个连通分量就是这样一组顶点：组内任意两点有路径相连，不同组之间没有路径。这里边没有方向，所以“能到达”具有对称性。孤立顶点也单独组成一个分量，不能因为它没有边就忽略它。我们需要从一个未处理点开始，把与它相连的所有点找完，再寻找下一组。本课用显式栈完成深度优先式遍历，不依赖 Python 函数递归，因此长链不会因为调用栈深度上限而失败。先明确求的是分组数量，不是走法数量，也不是最短路线长度。"
            },
            {
              "title": "邻接表如何表示输入的边",
              "body": "顶点编号为一到 N，但 Python 列表下标为零到 N-1，所以读入边后统一减一。graph[v] 保存与 v 直接相连的顶点编号。无向边 (a,b) 必须在 graph[a] 中加入 b，也在 graph[b] 中加入 a；漏掉一边就变成方向不同的另一张图。初始化仍需为每个顶点创建独立列表，不能用 [[]]*N。邻接矩阵需要 N² 个位置，对本课二十万顶点不可行；邻接表只保存真实边，空间为 O(N+M)。重复边和自环可以原样存入，因为后面的访问标记会阻止重复处理。不要急着去重并引入额外集合，先判断输入规模和题目是否需要精确的边重数。本题只关心连通性，所以重复边不会改变答案。"
            },
            {
              "title": "用小图跟踪栈与访问标记",
              "body": "考虑五个点，边为 1-2、2-3、4-5。外层先找到点一，分量计数变成一，标记点一并入栈。弹出点一后发现点二，标记并压栈；接着由点二发现点三。点三没有未访问邻居，栈最终清空，第一组完成。外层继续遇到点二和点三时直接跳过，因为它们已属于第一组；遇到点四才开始第二次搜索，得到第二组。请记录每次外层计数增加的原因，而不是把每次 pop 当成一个分量。访问标记要在压栈时设置，这保证同一点即使被多个邻居发现，也只会压栈一次。邻居枚举顺序可能改变访问次序，却不会改变最终分组，所以不要把某条具体访问序列写死成正确性的依据。",
              "code": "graph = [[1], [0, 2], [1], [4], [3]]\nseen = [False] * 5\nfor start in range(5):\n    if seen[start]:\n        continue\n    group = []\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        group.append(v + 1)\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\n    print(group)\n",
              "output": "[1, 2, 3]\n[4, 5]\n"
            },
            {
              "title": "外层找新组，内层找同组",
              "body": "完整程序有两个不同层次的循环。外层遍历所有顶点，确保不漏掉与第一个点不相连的区域；内层 while stack 负责把当前分量彻底找完。只从顶点一搜索一次，只能得知一所在的分量，不能统计整张图。seen 必须在所有外层轮次之间保留，不能每开始一个分量就重新初始化。每次启动搜索前先标记 start，再放入栈，内层对未访问邻居执行相同的标记和添加步骤。这个版本适合连通性与可达性；若以后需要精确的递归进入、退出时刻或后序顺序，必须在栈里保存更多状态，不能认为简单 pop 顺序等同于所有递归 DFS 的细节。当前目标不需要这些额外信息，保持表示简单即可。",
              "code": "n, m = map(int, input().split())\ngraph = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    a -= 1\n    b -= 1\n    graph[a].append(b)\n    graph[b].append(a)\nseen = [False] * n\ncomponents = 0\nfor start in range(n):\n    if seen[start]:\n        continue\n    components += 1\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\nprint(components)\n",
              "exampleInput": "5 3\n1 2\n2 3\n4 5\n",
              "output": "2\n"
            },
            {
              "title": "可达性证明与线性复杂度",
              "body": "搜索不会越过分量边界：起点属于当前组，每次只沿真实边加入邻居，所以加入的点都与起点相连。搜索也不会漏掉同组顶点：如果某个可达点最终未访问，取一条从起点到它的路径，沿路找到第一条从已访问点走向未访问点的边；已访问点被处理时本应加入那个邻居，产生矛盾。因此一次搜索恰好覆盖一个分量，外层每次从未访问点启动，就恰好多数出一组而不重数。每个点只压栈一次，所有邻接表总长度为 2M，即使含自环与重复边，也仍按输入边数计入工作量。总时间 O(N+M)，空间 O(N+M)。不能把嵌套循环机械地相乘成 N×M，内层各轮处理的是互不重复的顶点集合。"
            },
            {
              "title": "长链、环、孤立点怎样暴露漏洞",
              "body": "没有边时，每个顶点都应该成为独立分量，答案为 N；这能检测只统计有边顶点的错误。所有点构成长链时答案为一，同时提醒你递归调用可能过深。三角形形成环时，也应只处理三个点；若忘记 seen，搜索会沿边来回走而无法结束。重复边不应增加分量，自环也不会把自己变成新组。编号转换常见错误是只给 a 减一却忘了 b，或混用输入编号和数组下标；用包含顶点 N 的边容易发现越界。还要确认 visited 的生命周期：它属于整次图分析，不属于某个局部节点。调试时打印每次新搜索的 start 和该次访问的点，可以明确区分“漏了某组”与“同组重复开始”两类问题。"
            },
            {
              "title": "何时用栈搜索，何时需要别的方法",
              "body": "DFS 式遍历和 BFS 都能找连通分量，选择栈不代表它总比队列更好。若目标改为无权最短路，优先使用前一课有距离层保证的 BFS；若要不断添加边并查询两点是否连通，可以考虑并查集，重新遍历整张图可能太慢。若边有方向，沿出边能到达的集合不等于无向连通分量，更不自动等于强连通分量，必须重新定义问题。练习时先写“图是无向的、我要统计最大互相可达组”的一句话，再建立输入、图、访问表、两层循环四部分。通过测试后，试着把计数扩展为记录每组大小，检查这些大小之和是否等于 N。这一额外不变量能帮助你检验遍历是否遗漏或重复，但不必改变本题规定的输出。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么外层必须扫描所有顶点？",
              "answer": "第一个点所在分量之外可能还有区域或孤立点。"
            },
            {
              "question": "嵌套循环为什么不是 O(NM)？",
              "answer": "每个点只会进入一次搜索，所有邻接表总共只扫描 2M 项。"
            }
          ],
          "exerciseTitle": "数连通分量",
          "task": "给定 N 个顶点、M 条无向边，顶点编号为 1 到 N。允许重复边和自环。输出连通分量数量；孤立顶点也算一个分量。1≤N≤200000，0≤M≤200000。",
          "input": "第一行 N M，之后 M 行每行 a b，表示一条无向边。",
          "output": "输出连通分量数量。",
          "hint": "外层遍历未访问起点，内层用栈访问它所在的全部区域。",
          "explanation": "用双向邻接表存边。seen 在整次算法中保留，每遇到未访问起点就增加分量数，并用栈标记与它相连的所有点。加入邻居时先标记，重复边和环不会重复处理。一次遍历不会越过当前分量，且沿路径不能漏掉可达点，因此计数准确。时间和空间 O(N+M)。"
        },
        "en": {
          "title": "Stack traversal and components",
          "summary": "Traverse a whole graph with an explicit stack and count each component once.",
          "objectives": [
            "Build an undirected adjacency list",
            "Avoid recursion depth with an explicit stack",
            "Prove that each search covers one component"
          ],
          "sections": [
            {
              "title": "Connectivity before shortest paths",
              "body": "Some graph problems ask which vertices are connected, not how far apart they are. A connected component is a maximal group in which every pair is linked by a path. Different components have no path between them. Because this graph is undirected, reachability is symmetric. An isolated vertex still forms a component even though it has no edges. We will start from an unprocessed vertex, discover its whole group, and repeat. The traversal uses an explicit stack instead of recursive Python calls, avoiding recursion-depth failures on a long chain. Keep the objective precise: count groups, not paths or shortest distances."
            },
            {
              "title": "Build an adjacency list",
              "body": "Input labels run from one to N, while list indices run from zero to N minus one. Convert once when reading each edge. graph[v] stores neighbors of v. For an undirected edge, append in both directions; omitting the reverse entry changes the graph. Each vertex needs its own list, not repeated references to one list. An adjacency matrix requires N squared entries and is unsuitable for two hundred thousand vertices. An adjacency list uses O(N+M) space. Repeated edges and self-loops may remain because visited flags prevent repeated processing. Deduplication is unnecessary for connectivity under the stated size limits."
            },
            {
              "title": "Trace the stack and visited flags",
              "body": "Use five vertices with edges 1-2, 2-3, and 4-5. The outer loop reaches vertex one, increments the component count, marks it, and pushes it. Popping one discovers two; popping two discovers three. The stack eventually empties, completing the first group. The outer loop skips two and three because they are already marked, then starts a second search at four. A pop does not represent a new component; only a new outer-loop search does. Mark when pushing so multiple neighbors cannot add the same vertex repeatedly. Neighbor order may change the visiting sequence but not the final partition.",
              "code": "graph = [[1], [0, 2], [1], [4], [3]]\nseen = [False] * 5\nfor start in range(5):\n    if seen[start]:\n        continue\n    group = []\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        group.append(v + 1)\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\n    print(group)\n",
              "output": "[1, 2, 3]\n[4, 5]\n"
            },
            {
              "title": "One loop for groups, one for visits",
              "body": "The complete program has two distinct loop levels. The outer loop covers every vertex, including components disconnected from vertex one. The inner while loop finishes the current component. A single search from vertex one cannot count the whole graph. Keep the same seen array across all searches. Mark the starting vertex before pushing it, then use the same rule for its neighbors. This explicit-stack traversal is sufficient for reachability and components. Algorithms requiring recursive entry/exit times or postorder need additional stack state; a simple pop order does not reproduce every recursive DFS detail. Store only what this task actually requires.",
              "code": "n, m = map(int, input().split())\ngraph = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    a -= 1\n    b -= 1\n    graph[a].append(b)\n    graph[b].append(a)\nseen = [False] * n\ncomponents = 0\nfor start in range(n):\n    if seen[start]:\n        continue\n    components += 1\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\nprint(components)\n",
              "exampleInput": "5 3\n1 2\n2 3\n4 5\n",
              "output": "2\n"
            },
            {
              "title": "Prove reachability and linear work",
              "body": "Every discovered vertex belongs to the starting component because it is reached through a real edge from an already reachable vertex. Conversely, suppose a reachable vertex remains unmarked. On a path to it, consider the first edge from a marked vertex to an unmarked one. Processing the marked endpoint would have discovered the other endpoint, a contradiction. One search therefore covers exactly one component, and the outer loop counts each once. Every vertex is pushed once, and all adjacency lists contain 2M entries. Total time and space are O(N+M). Do not multiply nested loop bounds mechanically: different searches process disjoint vertex sets."
            },
            {
              "title": "Use chains, cycles, and isolated vertices",
              "body": "With no edges, the answer is N; this catches code that ignores isolated vertices. A chain containing all vertices has one component and stresses recursive depth. A triangle still visits only three vertices; missing seen checks cause endless revisits around its cycle. Repeated edges do not add components, and a self-loop does not create a new group. Input conversion often fails when only one endpoint is decremented. Include an edge touching vertex N to expose that mistake. While debugging, print each new search start and its visited vertices. This separates missing groups from incorrectly starting several searches inside the same group."
            },
            {
              "title": "Know the limits of this traversal",
              "body": "Both stack traversal and BFS can find components; a stack is not universally superior. Use BFS for unweighted shortest paths because it has the distance-layer guarantee. If edges are added repeatedly with connectivity queries, a disjoint-set structure may avoid repeated full traversals. Directed reachability is different again and does not automatically identify strongly connected components. Before implementing, state that the graph is undirected and the requested objects are maximal connected groups. Build input conversion, adjacency lists, visited state, and the two loop levels separately. As a debugging extension, record group sizes and verify that their sum is N without changing the required output."
            }
          ],
          "checkpoints": [
            {
              "question": "Why scan every vertex in the outer loop?",
              "answer": "Other components and isolated vertices may be unreachable from the first start."
            },
            {
              "question": "Why is the nested traversal not O(NM)?",
              "answer": "Vertices enter only one search and the adjacency lists contain 2M entries in total."
            }
          ],
          "exerciseTitle": "Count connected components",
          "task": "An undirected graph has N vertices numbered 1 through N and M edges. Repeated edges and self-loops are allowed. Count its connected components, including isolated vertices. 1≤N≤200000 and 0≤M≤200000.",
          "input": "N M, followed by M lines containing endpoints a b.",
          "output": "Print the number of connected components.",
          "hint": "Start a stack traversal at each still-unvisited vertex.",
          "explanation": "Store every edge in both adjacency lists. Keep seen across the whole algorithm. Each unvisited outer-loop start begins one new component, and the stack marks everything reachable from it. Mark before pushing so cycles and repeated edges cannot add duplicate work. A traversal stays inside its component and cannot miss a reachable vertex. Time and space are O(N+M)."
        },
        "ja": {
          "title": "スタック探索と連結成分",
          "summary": "明示的なスタックでグラフ全体を調べ、成分を一度ずつ数える。",
          "objectives": [
            "無向隣接リストを作る",
            "明示的スタックで深さ制限を避ける",
            "一回の探索が一成分を覆うと示す"
          ],
          "sections": [
            {
              "title": "最短距離の前につながりを考える",
              "body": "グラフの問題がすべて距離を求めるとは限りません。友人関係が何グループに分かれるか、路線網がいくつの独立した領域に分かれるかなど、つながりだけを知りたい場合があります。連結成分は、任意の二点が道で結ばれる頂点の最大の集まりです。異なる成分同士には道がありません。ここでは辺に向きがないので到達関係は対称です。辺を持たない孤立点も、一つの成分として数えます。未処理の点からその仲間をすべて探し、残りがあれば次のグループを探します。本課では Python の関数再帰を使わず、明示的なスタックで探索するため、長い鎖でも再帰の深さ制限には達しません。求めるのはグループ数であり、経路数や最短距離ではありません。"
            },
            {
              "title": "隣接リストで辺を保存する",
              "body": "入力の頂点番号は一から N、Python の添字は零から N-1 なので、辺を読むときに一度だけ一を引きます。graph[v] には v と直接つながる相手を保存します。無向辺 (a,b) は graph[a] に b、graph[b] に a の両方を追加します。片方を忘れると別の有向グラフになってしまいます。各頂点には独立したリストが必要で、[[]]*N のような共有参照を避けます。隣接行列は N² 個の場所を使うため、二十万頂点には適しません。隣接リストなら実際の辺だけを保存し、O(N+M) 領域で済みます。重複辺や自己ループを残しても、訪問印が処理の重複を防ぎます。この課題では連結性だけが必要なので、重複を除くための集合を追加する必要はありません。"
            },
            {
              "title": "小さなグラフで状態を追う",
              "body": "五頂点に辺 1-2、2-3、4-5 がある例を追います。外側のループで頂点一を見つけたら成分数を一にし、印を付けてスタックへ入れます。一を取り出すと二が見つかり、二から三が見つかります。三には未訪問の隣接点がなく、やがてスタックが空になり、一つ目のグループが終わります。外側のループで二や三に来ても既に印があるので飛ばし、四で二回目の探索を始めます。取り出すたびに成分を増やすのではなく、新しい探索を開始する時だけ増やす点が重要です。印は追加時に付け、複数の隣接点から同じ頂点を重ねて追加しないようにします。隣接点の列挙順で訪問順は変わり得ますが、最終的な分割は変わりません。",
              "code": "graph = [[1], [0, 2], [1], [4], [3]]\nseen = [False] * 5\nfor start in range(5):\n    if seen[start]:\n        continue\n    group = []\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        group.append(v + 1)\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\n    print(group)\n",
              "output": "[1, 2, 3]\n[4, 5]\n"
            },
            {
              "title": "外側は新しい成分、内側は仲間",
              "body": "完成したプログラムには意味の違う二重のループがあります。外側はすべての頂点を調べ、最初の頂点とつながっていない領域も見逃さないためのものです。内側の while stack は現在の連結成分を最後まで調べます。頂点一から一度だけ探索しても、そこに属する成分しか分かりません。seen はすべての探索で共有し、新しい成分を始めるたびに初期化してはいけません。開始点を追加する前に印を付け、隣接点にも同じ規則を使います。この形は到達可能性や成分数には十分です。ただし再帰の入る時刻・出る時刻や帰りがけ順が必要な別の算法では、スタックに追加の状態を持たせます。単純な取り出し順が、再帰 DFS のすべての動作を再現するわけではないことも覚えておきましょう。",
              "code": "n, m = map(int, input().split())\ngraph = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    a -= 1\n    b -= 1\n    graph[a].append(b)\n    graph[b].append(a)\nseen = [False] * n\ncomponents = 0\nfor start in range(n):\n    if seen[start]:\n        continue\n    components += 1\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\nprint(components)\n",
              "exampleInput": "5 3\n1 2\n2 3\n4 5\n",
              "output": "2\n"
            },
            {
              "title": "到達性と線形時間を証明する",
              "body": "探索で追加される点は、到達済みの点から実在する辺を通って見つかるので、開始点と同じ成分に属します。逆に同じ成分なのに最後まで未訪問の点があると仮定します。開始点からその点への道で、訪問済みから未訪問へ初めて移る辺を選ぶと、前者を処理した時に後者を追加するはずなので矛盾します。したがって一回の探索はちょうど一成分を覆い、外側は各成分を一度ずつ数えます。各頂点は一回だけ追加され、隣接リストの総長は 2M です。重複辺や自己ループも入力された辺数に含めれば同じ評価になります。時間と領域は O(N+M) です。見かけが二重ループでも、異なる探索で処理する頂点は重ならないため、単純に N と M を掛ける評価は誤りです。"
            },
            {
              "title": "鎖・閉路・孤立点で確認する",
              "body": "辺が一本もなければ、すべての頂点が別々の成分なので答えは N です。辺のある頂点だけを数える誤りを見つけられます。全頂点を結ぶ長い鎖は一成分で、再帰の深さに関する問題も意識できます。三角形の閉路でも三頂点を一回ずつ処理するだけです。seen を忘れると辺を何度も往復して終了しなくなります。重複辺で成分は増えず、自己ループでも新しい組はできません。番号変換では片方の端点だけ一を引く間違いがあり、頂点 N を含む辺が確認に役立ちます。訪問配列は頂点一個や探索一回のためではなく、グラフ全体の分析で保持します。調査中に開始点と訪問した点を表示すると、組を漏らしたのか、同じ組から何度も探索を始めたのかを区別できます。"
            },
            {
              "title": "この探索が答えられる範囲",
              "body": "スタックによる探索でも BFS でも連結成分は求められます。スタックが常に優れているわけではありません。重みなし最短路なら距離の層が保証される BFS を選びます。辺の追加と連結判定を何度も行う場合は、毎回全体を探索せず、連結集合を管理する構造を考える余地があります。また辺に向きがあると、出辺で到達できる集合は無向グラフの成分とは違い、強連結成分が自動的に得られるわけでもありません。まず無向グラフの最大の連結グループを数える、と問題を一文にします。番号変換、隣接リスト、訪問表、二段階のループを分けて組み立ててください。発展として各成分の大きさを記録し、合計が N かを確認すると、漏れや重複の調査にも役立ちます。"
            }
          ],
          "checkpoints": [
            {
              "question": "外側で全頂点を見る理由は。",
              "answer": "最初の開始点から到達できない成分や孤立点もあるためです。"
            },
            {
              "question": "二重ループでも O(NM) でない理由は。",
              "answer": "各頂点は一度だけ探索され、隣接リストの総項目数は 2M だからです。"
            }
          ],
          "exerciseTitle": "連結成分を数える",
          "task": "一から N の番号を持つ N 頂点 M 辺の無向グラフがあります。重複辺と自己ループを許します。孤立点も含めて連結成分数を求めてください。1≤N≤200000、0≤M≤200000 です。",
          "input": "最初に N M、その後 M 行に端点 a b。",
          "output": "連結成分数を出力してください。",
          "hint": "未訪問の開始点ごとにスタックで同じ領域を訪問します。",
          "explanation": "各辺を両方向に保存し、seen を全探索で保持します。外側で未訪問点を見つけるたび成分数を増やし、スタックでそこから到達する点を調べます。追加前の印により、閉路や重複辺でも重ねて処理しません。一回の探索は成分から出ず、到達可能な点を漏らさないので正しく数えられます。時間と領域は O(N+M) です。"
        }
      },
      "order": 19,
      "stage": "graphs",
      "minutes": 50,
      "prerequisiteIds": [
        "breadth-first-search"
      ],
      "relatedProblems": [
        "ABC177D",
        "ABC287C",
        "ABC270C"
      ],
      "solution": "n, m = map(int, input().split())\ngraph = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    a -= 1\n    b -= 1\n    graph[a].append(b)\n    graph[b].append(a)\nseen = [False] * n\ncomponents = 0\nfor start in range(n):\n    if seen[start]:\n        continue\n    components += 1\n    seen[start] = True\n    stack = [start]\n    while stack:\n        v = stack.pop()\n        for to in graph[v]:\n            if not seen[to]:\n                seen[to] = True\n                stack.append(to)\nprint(components)\n",
      "starter": "n, m = map(int, input().split())\n# Read edges and build the graph.\n",
      "tests": [
        {
          "input": "1 0\n",
          "expected": "1\n"
        },
        {
          "input": "4 0\n",
          "expected": "4\n"
        },
        {
          "input": "4 3\n1 2\n2 3\n3 4\n",
          "expected": "1\n"
        },
        {
          "input": "5 3\n1 2\n2 3\n4 5\n",
          "expected": "2\n"
        },
        {
          "input": "4 5\n1 2\n2 3\n3 1\n1 2\n4 4\n",
          "expected": "2\n"
        }
      ]
    },
    {
      "id": "grid-search",
      "content": {
        "zh": {
          "title": "网格搜索与区域计数",
          "summary": "用坐标、邻接规则和访问状态精确描述地图。",
          "objectives": [
            "区分四邻域与八邻域",
            "对长方形地图安全生成邻居",
            "统计区域并说明总复杂度"
          ],
          "sections": [
            {
              "title": "网格是图的一种紧凑表示",
              "body": "网格题通常不给出一条条边，而是用地图字符和移动规则隐式定义边。既然邻居能由坐标计算，就不必为每个格子额外建立邻接表。本课问可通行区域数量，不问距离，因此沿用上一课的分量思路，把顶点编号换成坐标元组即可。需要先重新读懂字符含义：这里 . 是可通行格子，# 是墙；有些题刚好相反，不能按视觉直觉假定。还要重新读取相邻规则，四邻域只有上下左右，八邻域还包括斜向。这两种定义会改变分量数量。本课专门把“格子是否存在、是否可走、是否已经处理”拆开，训练你在看似相同的地图题之间准确调整模型，而不是复制一个固定的方向数组。"
            },
            {
              "title": "行列与方向的约定",
              "body": "统一使用 (r,c)：r 是行，从上往下增大；c 是列，从左往右增大。向下对应 (1,0)，向上是 (-1,0)，向右是 (0,1)，向左是 (0,-1)。如果在变量命名中使用 x、y，也必须始终保持第一个量对应行，不能一会儿按数学坐标一会儿按列表下标。H 控制行的上界，W 控制列的上界。方形地图会掩盖把 H 与 W 写反的错误，所以测试一定包含长方形。字符串适合只读地图，访问 grid[r][c] 返回一个字符；若想修改格子，需要列表化，但本课使用独立 seen 表，避免覆盖原始地图。这样调试时仍能看到输入，也能区分墙与已访问通路，两者虽然都不再入栈，原因却不同。"
            },
            {
              "title": "对角接触为什么不是相连",
              "body": "看两行两列的地图：第一行 .#，第二行 #.。虽然两个点在图形上角对角接触，但四方向移动都被墙挡住，因此有两个区域。若改成八方向，才会变成一个区域。再看三行三列，只有正中间是墙，其余是点；点可以绕着墙相连，所以仍是一个区域，不是根据每行的连续段分别计数。手算时给一个点涂色，并反复给与已涂色点四邻接的点涂同色，直到不能继续；再换颜色找下一个点。这个“染色过程”就是 flood fill，栈只是安排下一次染色的位置。不要通过比较相邻行有多少相同列来猜分量数，连接可能绕行多步，必须把传递到达的关系考虑完整。",
              "code": "grid = [\".#\", \"#.\"]\nh, w = 2, 2\nneighbors = []\nfor dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n    nr, nc = dr, dc\n    if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] == \".\":\n        neighbors.append((nr, nc))\nprint(neighbors)\n",
              "output": "[]\n"
            },
            {
              "title": "把染色流程变成两层扫描",
              "body": "外层两个 for 按行列扫描地图，遇到墙或已访问格就跳过。每次发现新的通路，答案加一，标记它并启动一次栈搜索。内层取出坐标，检查四邻居，只有范围内、为点、未访问三个条件都满足，才标记并加入栈。这里虽然写了双重外层扫描，再嵌套一个 while 和方向循环，但并不会为每个起点重新搜索整张图：第一次塗色已将整个区域标记，之后外层会跳过它。请注意变量作用域，外层 r,c 是扫描位置，内层 x,y 是当前展开位置，不能误用外层位置生成所有邻居。每次生成新坐标应基于刚从栈中取出的点，否则搜索只会围绕起点打转，无法穿过长通道。",
              "code": "h, w = map(int, input().split())\ngrid = [input().strip() for _ in range(h)]\nseen = [[False] * w for _ in range(h)]\nanswer = 0\nfor r in range(h):\n    for c in range(w):\n        if grid[r][c] == \"#\" or seen[r][c]:\n            continue\n        answer += 1\n        seen[r][c] = True\n        stack = [(r, c)]\n        while stack:\n            x, y = stack.pop()\n            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n                nx, ny = x + dx, y + dy\n                if 0 <= nx < h and 0 <= ny < w:\n                    if grid[nx][ny] == \".\" and not seen[nx][ny]:\n                        seen[nx][ny] = True\n                        stack.append((nx, ny))\nprint(answer)\n",
              "exampleInput": "2 2\n.#\n#.\n",
              "output": "2\n"
            },
            {
              "title": "区域不会漏掉，也不会重复",
              "body": "一次染色只沿合法的四方向通路扩展，所以不会跨墙进入另一个区域。对当前区域里的任意点，都存在一条由起点通向它的合法路径，沿路径逐点推理，每个后继都会在前驱展开时被发现，因此不会漏掉。于是每次答案增加恰好对应一个完整区域；已经标记的区域再也不会触发增加，计数既不漏也不重。地图读取和外层扫描需要 O(HW)，内层每个通路最多出栈一次，每次检查四个方向，也是 O(HW)，不是 O((HW)²)。seen 和栈最坏占 O(HW) 空间。墙虽然不入栈，也仍会被扫描，所以复杂度不能只看通路数量。若 H、W 都较大，应先用乘积估计内存，而不是只看单个维度。"
            },
            {
              "title": "专门检查地图边缘与形状",
              "body": "全是墙时答案是零，不应无条件从左上角启动搜索。全是点时，只要地图非空，答案就是一；这能检测外层是否忘记跳过已访问点。一格、一行、一列分别检查循环上下界，棋盘状点墙交错能检测误加斜向邻居。用带弯曲通道的地图检查坐标更新是否基于当前点。读入的每一行应保留 W 个字符，不要把空格分词当成地图字符，也不要把字符 . 当成布尔真假判断：非空字符串 '.' 和 '#' 都为真。判断通路必须显式比较字符。若想节省一张 seen 表而把访问后的点改成墙，应先将每行转为列表，并清楚记录这会丢失原图；初学阶段建议先保留分开的状态，降低调试成本。"
            },
            {
              "title": "把同一模型迁移到别的地图题",
              "body": "做其他网格题时，把需要修改的地方列成清单：哪些字符允许进入、邻接是四方向还是八方向、是否有传送或单行边、状态是否还需方向或钥匙、目标是距离还是区域数量。例如题库 ABC325C 的邻接包含斜向，不能直接使用本课四方向数组而不修改；关联题是迁移练习，不表示规则完全相同。若题目要求最少移动，改用队列并记录距离；若只求面积，可在每次出栈时累计当前区域大小。若要求边界长度，则对四邻居中越界或为墙的方向计数，而不是累计访问点数。通过辨认“状态、边、所求信息”这三个层次，你可以保留正确的通用部分，只替换确实变化的规则，避免把看起来像的题误当成同一道题。"
            }
          ],
          "checkpoints": [
            {
              "question": "两个点只在角上接触，本课算几个区域？",
              "answer": "两个；本课只允许上下左右移动，不能沿斜对角直接连接。两点之间必须存在仅经过开放格子的合法路径才属于同一区域。"
            },
            {
              "question": "为什么 if grid[r][c] 不能判断通路？",
              "answer": "点和井号都是非空字符串，都被判断为真，必须显式比较字符。"
            }
          ],
          "exerciseTitle": "数通路区域",
          "task": "给定 H 行 W 列地图，. 是通路，# 是墙。两个通路格若能仅经通路上下左右移动到达，则属于同一区域。斜向不相邻。输出通路区域数量。1≤H,W≤200。",
          "input": "第一行 H W，之后 H 行各 W 个 . 或 # 字符。",
          "output": "输出区域数量，全是墙时输出 0。",
          "hint": "每遇到未访问通路就加一，再完整标记它所在的区域。",
          "explanation": "逐格扫描，跳过墙与已访问格。新的通路代表一个还未统计的区域，先加一，再用显式栈标记所有四方向可达通路。入栈时标记防止重复。外层扫描和内层搜索合计每格常数次工作，所以时间、空间均为 O(HW)。斜向点不会被方向数组连接，全墙时没有搜索开始，答案自然为零。"
        },
        "en": {
          "title": "Grid search and flood fill",
          "summary": "Model a map precisely with coordinates, adjacency, and visited state.",
          "objectives": [
            "Distinguish four and eight neighbors",
            "Generate safe neighbors on rectangles",
            "Count regions and bound total work"
          ],
          "sections": [
            {
              "title": "A grid is a compact graph representation",
              "body": "Grid tasks usually define edges implicitly through characters and movement rules instead of listing them. Compute neighbors from coordinates rather than building an unnecessary adjacency list. This exercise asks for the number of open regions, so reuse the component idea with coordinate tuples instead of numbered vertices. Read character meanings carefully: here a dot is open and a hash is a wall, while other tasks may reverse that interpretation. Also distinguish four-neighbor and eight-neighbor adjacency. Diagonal connections change the answer. Separate whether a coordinate exists, whether it is traversable, and whether it has already been processed before assembling the search."
            },
            {
              "title": "Fix row, column, and direction conventions",
              "body": "Use the pair (r,c) consistently: row increases downward and column increases to the right. The four offsets are (1,0), (-1,0), (0,1), and (0,-1). If you prefer x and y, still keep the first coordinate tied to the row index; mixing mathematical axes with list indexing causes subtle errors. H bounds rows and W bounds columns. Square examples hide swapped dimensions, so include a rectangle. Strings are suitable for a read-only map. A separate seen table preserves the original characters and distinguishes blocked cells from already explored open cells, even though neither should be pushed again."
            },
            {
              "title": "Why touching diagonally is not enough",
              "body": "Consider a two-row map whose row strings are \".#\" and \"#.\". The two dots touch only at a corner, so four-neighbor movement leaves two regions. Eight-neighbor movement would give one. Now consider a three-by-three map with only the center blocked: all remaining dots connect around the obstacle, forming one region rather than separate row segments. By hand, color one dot, repeatedly color every open four-neighbor of a colored cell, and stop when no additions remain. Repeat with a new color. This is flood fill; the stack merely schedules the next expansion. Local counts of matching columns cannot replace transitive reachability through paths of many moves.",
              "code": "grid = [\".#\", \"#.\"]\nh, w = 2, 2\nneighbors = []\nfor dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n    nr, nc = dr, dc\n    if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] == \".\":\n        neighbors.append((nr, nc))\nprint(neighbors)\n",
              "output": "[]\n"
            },
            {
              "title": "Implement scanning plus flood fill",
              "body": "Two outer loops scan every row and column. Skip walls and seen cells. Each remaining dot starts one new region: increment the answer, mark it, and run the stack search. Inside, generate neighbors from the coordinate just removed, not from the fixed outer-loop starting cell. A neighbor must be in bounds, open, and unseen before being marked and pushed. The nested loops do not launch a full search from every dot because the first flood fill marks its entire region. Later scans skip those cells. Distinguish the scan variables from the expansion variables to avoid accidentally exploring only the starting cell’s immediate neighborhood.",
              "code": "h, w = map(int, input().split())\ngrid = [input().strip() for _ in range(h)]\nseen = [[False] * w for _ in range(h)]\nanswer = 0\nfor r in range(h):\n    for c in range(w):\n        if grid[r][c] == \"#\" or seen[r][c]:\n            continue\n        answer += 1\n        seen[r][c] = True\n        stack = [(r, c)]\n        while stack:\n            x, y = stack.pop()\n            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n                nx, ny = x + dx, y + dy\n                if 0 <= nx < h and 0 <= ny < w:\n                    if grid[nx][ny] == \".\" and not seen[nx][ny]:\n                        seen[nx][ny] = True\n                        stack.append((nx, ny))\nprint(answer)\n",
              "exampleInput": "2 2\n.#\n#.\n",
              "output": "2\n"
            },
            {
              "title": "Why every region is counted once",
              "body": "A flood fill cannot cross into another region because every expansion follows a legal open adjacency. It cannot miss a cell in its own region either: along a path from the start, each successor is discovered when its predecessor is expanded. Thus each increment corresponds to one entire region, and marked regions cannot trigger another increment. Reading and scanning cost O(HW). Each open cell is popped once and checks four directions, also O(HW), not the square of the cell count. The table and stack require O(HW) space. Walls still participate in the scan, so complexity should include the whole grid rather than only its open cells."
            },
            {
              "title": "Test borders and shapes deliberately",
              "body": "An all-wall map has zero regions, so never start unconditionally at the top-left. An all-open nonempty map has one region, exposing a missing seen check in the outer scan. Test a single cell, row, column, checkerboard, and a turning corridor. The checkerboard detects accidental diagonal adjacency; the corridor detects expansion from the wrong coordinate. Compare characters explicitly: both dot and hash are nonempty strings and therefore truthy in Python. Mutating visited dots into walls can save a separate table, but requires mutable rows and loses the original map. Keep the representations separate while learning so mistakes remain easier to inspect."
            },
            {
              "title": "Transfer the model carefully",
              "body": "When transferring this code, list the rules that may change: traversable characters, four versus eight directions, teleportation, one-way edges, additional state such as keys, and whether the goal is distance or region count. ABC325C includes diagonal adjacency, so its linked practice requires a deliberate change rather than blind copying. To obtain area, count popped cells within each fill. For a perimeter, count sides facing a wall or outside the map instead of counting cells. For minimum moves, restore the BFS queue and distance table. Separate state, transitions, and requested information so you can reuse the valid structure while changing the actual rules."
            }
          ],
          "checkpoints": [
            {
              "question": "Do corner-touching dots form one region here?",
              "answer": "No. Only horizontal and vertical moves connect cells."
            },
            {
              "question": "Why is if grid[r][c] not an openness test?",
              "answer": "Both dot and hash are nonempty strings and therefore truthy."
            }
          ],
          "exerciseTitle": "Count open regions",
          "task": "An H-by-W map contains open cells . and walls #. Open cells belong to the same region if connected by up/down/left/right moves through open cells. Diagonal contact does not connect regions. Count the open regions. 1≤H,W≤200.",
          "input": "H W, followed by H rows of W dot/hash characters.",
          "output": "Print the region count, or 0 if every cell is a wall.",
          "hint": "Each unseen open cell starts one flood fill and one new region.",
          "explanation": "Scan all cells, skipping walls and seen cells. A new dot starts one uncounted region; increment the answer and mark every four-neighbor-reachable dot with an explicit stack. Mark on insertion to prevent duplicates. Scanning and expansion perform constant work per cell, so time and space are O(HW). Diagonal dots remain separate; an all-wall map starts no search and naturally returns zero."
        },
        "ja": {
          "title": "グリッド探索と塗りつぶし",
          "summary": "座標・隣接規則・訪問状態で地図を正確に表す。",
          "objectives": [
            "四近傍と八近傍を区別する",
            "長方形で安全に隣接点を作る",
            "領域数と計算量を説明する"
          ],
          "sections": [
            {
              "title": "グリッドはグラフの省略表現",
              "body": "グリッド問題は辺を一本ずつ列挙せず、文字と移動規則によって暗黙に定義することが多いです。隣接点を座標から計算できるなら、全マス分の隣接リストを別に作る必要はありません。今回は距離ではなく通行可能な領域の数を求めるので、前課の成分探索を座標の組に置き換えます。文字の意味は毎回読み直します。ここでは . が通路で # が壁ですが、別の問題では逆かもしれません。また上下左右の四近傍と、斜めも含む八近傍は異なり、成分数そのものが変わります。この課では、その座標が存在するか、通れるか、処理済みかを分けて考えます。似た地図問題でも規則を正確に変更できるようにし、固定の方向配列を無条件にコピーしない練習です。"
            },
            {
              "title": "行・列・方向をそろえる",
              "body": "座標は (r,c) に統一し、r は上から下へ増える行、c は左から右へ増える列とします。下は (1,0)、上は (-1,0)、右は (0,1)、左は (0,-1) です。x と y という名前を使う場合も、最初の座標が行であることを途中で変えないでください。数学の座標軸とリストの添字を混ぜると誤りになります。行の上限は H、列の上限は W です。正方形だけでは両者を取り違えても気づかないので、長方形を必ず試します。地図を読むだけなら文字列で十分です。変更したい場合は別の表現が必要ですが、本課では独立した seen を使って入力の地図を保存します。壁と訪問済み通路はどちらも追加しませんが、理由が違うことを保つと調査しやすくなります。"
            },
            {
              "title": "斜めの接触をつながりとしない",
              "body": "二行二列で、一行目が .#、二行目が #. の地図を考えます。二つの通路は角で触れますが、上下左右には壁しかないので二領域です。八方向を許した場合にだけ一領域になります。次に三行三列で中央だけが壁なら、周囲の通路は壁を回ってつながり、一領域です。行ごとの連続した区間を別々に数えてはいけません。手作業では一点に色を付け、同じ色の点から上下左右に隣接する通路へ色を広げ、もう増えなくなるまで繰り返します。残りがあれば別の色で始めます。この塗りつぶしが flood fill で、スタックは次に調べる場所を決めるだけです。上下の行で同じ列に通路がある数だけでは、何歩も迂回して届く関係まで捉えられません。",
              "code": "grid = [\".#\", \"#.\"]\nh, w = 2, 2\nneighbors = []\nfor dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n    nr, nc = dr, dc\n    if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] == \".\":\n        neighbors.append((nr, nc))\nprint(neighbors)\n",
              "output": "[]\n"
            },
            {
              "title": "全体走査と塗りつぶしを組み合わせる",
              "body": "外側の二つの for で行と列を走査し、壁または訪問済みなら飛ばします。新しい通路を見つけるたび答えを一増やし、印を付けてスタック探索を始めます。内側では取り出した座標から四方向を作り、範囲内、通路、未訪問の三条件を満たすときだけ追加します。外側の二重走査の中に while と方向のループがありますが、すべての開始点から全地図を調べ直すわけではありません。最初の塗りつぶしで領域全体に印が付き、以後は飛ばされます。外側の r,c は走査位置、内側の x,y は今展開している場所です。隣接座標を間違って外側の開始位置から作り続けると、その周囲だけを調べて長い通路を進めません。必ず直前に取り出した点を基準にします。",
              "code": "h, w = map(int, input().split())\ngrid = [input().strip() for _ in range(h)]\nseen = [[False] * w for _ in range(h)]\nanswer = 0\nfor r in range(h):\n    for c in range(w):\n        if grid[r][c] == \"#\" or seen[r][c]:\n            continue\n        answer += 1\n        seen[r][c] = True\n        stack = [(r, c)]\n        while stack:\n            x, y = stack.pop()\n            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n                nx, ny = x + dx, y + dy\n                if 0 <= nx < h and 0 <= ny < w:\n                    if grid[nx][ny] == \".\" and not seen[nx][ny]:\n                        seen[nx][ny] = True\n                        stack.append((nx, ny))\nprint(answer)\n",
              "exampleInput": "2 2\n.#\n#.\n",
              "output": "2\n"
            },
            {
              "title": "各領域を一度だけ数える理由",
              "body": "一回の塗りつぶしは合法な四方向の通路だけを進むので、壁を越えて別領域へ出ません。同じ領域の点には開始点から道があり、その道を順に見ると、前の点を展開したときに次の点が見つかるため、漏れもありません。したがって答えを増やす一回が、ちょうど一つの領域に対応します。印のある領域からは探索を始めないので重複もしません。入力と外側の走査は O(HW)、内側も各通路を一回取り出して四方向を見るだけなので O(HW) です。マス数を二乗した時間にはなりません。seen とスタックの領域も O(HW) です。壁はスタックに入らなくても走査されるため、通路だけの個数で全体の計算量を評価しないでください。大きい地図では各寸法より、その積で必要メモリを考えます。"
            },
            {
              "title": "端と形を意識してテストする",
              "body": "壁だけの地図なら答えは零です。左上から無条件に探索してはいけません。空でない地図がすべて通路なら一領域で、外側で訪問印を確認し忘れた誤りを発見できます。一マス、一行、一列で境界を、点と壁が交互の模様で斜め移動の混入を、曲がった通路で座標更新を確認します。行は W 個の文字として読みます。また Python では '.' も '#' も空でない文字列なので真です。if grid[r][c] だけでは通路判定にならず、文字を明示的に比較します。訪問済みの点を壁に書き換えれば別表を省けますが、行を変更可能なリストにして原図が失われることを理解する必要があります。初学段階では地図と訪問状態を分けた方が、どこで誤ったかを調べやすくなります。"
            },
            {
              "title": "別の地図へモデルを移す",
              "body": "他の地図問題へ移るときは、入れる文字、四方向か八方向か、転送や一方通行の有無、鍵や向きなど追加状態の必要性、目的が距離か領域数かを一覧にします。関連問題の ABC325C は斜めも隣接するため、本課の四方向をそのまま使ってはいけません。関連していることは、条件が同一という意味ではありません。面積が欲しければ取り出した点を成分ごとに数えます。周囲の長さなら、各点から見て壁や範囲外に接する方向を数え、単に点数を足す方法とは区別します。最少移動回数ならキューと距離表を戻します。状態、遷移、求める情報という三層に分けると、共通部分を保ちながら本当に変わった規則だけを正確に置き換えられます。"
            }
          ],
          "checkpoints": [
            {
              "question": "角だけで触れる点は一領域ですか。",
              "answer": "いいえ。上下左右の移動だけを許すため別領域です。"
            },
            {
              "question": "if grid[r][c] で通路を判定できない理由は。",
              "answer": "点も井号も空でない文字列で、どちらも真になるためです。"
            }
          ],
          "exerciseTitle": "通路の領域数",
          "task": "H 行 W 列の地図で . は通路、# は壁です。通路だけを上下左右に移動して到達できるマスは同じ領域に属します。斜めは隣接しません。領域数を求めてください。1≤H,W≤200 です。",
          "input": "H W、その後 H 行に長さ W の . または # の列。",
          "output": "領域数を出力します。すべて壁なら 0 です。",
          "hint": "未訪問の通路から一回塗りつぶすたび、領域数を一増やします。",
          "explanation": "壁と訪問済みを飛ばして全マスを走査します。新しい通路を見つけたら一領域を数え、明示的なスタックで四方向に届く通路をすべて記録します。追加時に印を付けて重複を防ぎます。全体で各マスに定数回の処理を行うため、時間と領域は O(HW) です。斜めの点は接続せず、壁だけなら探索が始まらず零になります。"
        }
      },
      "order": 20,
      "stage": "graphs",
      "minutes": 45,
      "prerequisiteIds": [
        "depth-first-search"
      ],
      "relatedProblems": [
        "ABC325C",
        "ABC075B",
        "ABC341C"
      ],
      "solution": "h, w = map(int, input().split())\ngrid = [input().strip() for _ in range(h)]\nseen = [[False] * w for _ in range(h)]\nanswer = 0\nfor r in range(h):\n    for c in range(w):\n        if grid[r][c] == \"#\" or seen[r][c]:\n            continue\n        answer += 1\n        seen[r][c] = True\n        stack = [(r, c)]\n        while stack:\n            x, y = stack.pop()\n            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:\n                nx, ny = x + dx, y + dy\n                if 0 <= nx < h and 0 <= ny < w:\n                    if grid[nx][ny] == \".\" and not seen[nx][ny]:\n                        seen[nx][ny] = True\n                        stack.append((nx, ny))\nprint(answer)\n",
      "starter": "h, w = map(int, input().split())\ngrid = [input().strip() for _ in range(h)]\n# TODO\n",
      "tests": [
        {
          "input": "1 1\n#\n",
          "expected": "0\n"
        },
        {
          "input": "1 1\n.\n",
          "expected": "1\n"
        },
        {
          "input": "2 2\n.#\n#.\n",
          "expected": "2\n"
        },
        {
          "input": "1 7\n..#.#..\n",
          "expected": "3\n"
        },
        {
          "input": "3 3\n...\n.#.\n...\n",
          "expected": "1\n"
        },
        {
          "input": "3 5\n..#..\n#####\n.#.#.\n",
          "expected": "5\n"
        }
      ]
    },
    {
      "id": "dynamic-programming",
      "order": 21,
      "stage": "synthesis",
      "minutes": 55,
      "prerequisiteIds": [
        "grid-search"
      ],
      "relatedProblems": [
        "ABC291D",
        "ABC266D",
        "ABC286D"
      ],
      "content": {
        "zh": {
          "title": "动态规划：从定义到转移",
          "summary": "从重复子问题出发，完整推导一个计数DP。",
          "sections": [
            {
              "title": "为什么枚举会反复计算同一问题",
              "body": "楼梯每次走一级或两级，若把所有步长序列逐条枚举，随着 N 增大，分支会快速增加。观察“还剩三级需要走”这个局面：不管之前经过哪条路线，后面的合法走法集合都一样。如果每条前缀都重新求一次同样的剩余问题，就在浪费计算。动态规划的做法是为可重复的小问题命名，并保存它的答案，让后续计算直接使用。它不是看到递归就加一个数组，也不是固定的一条公式。最重要的是状态必须保存足够的信息，使不同历史只要落到同一状态，就具有相同的后续选择。本课先选择一个没有额外限制的计数问题，把状态、初值、转移、顺序、答案位置这五个部分完整推导出来，再将这个流程迁移到其他题。"
            },
            {
              "title": "状态的句子必须精确",
              "body": "定义 dp[i] 为“恰好到达第 i 级的不同步长序列数量”。这里“恰好”“序列”“数量”都不能省略：不超过 i 的走法是另一个状态；不区分顺序的组合也是另一个问题；最少步数则需要另一种运算。先写含义，再决定数组长度为 N+1，因为必须包含第零级。dp[0]=1 表示不走任何一步这一种空序列，不是说发生了一次移动。其他位置先设零，表示还没有累计出合法走法。初始化不能凭直觉把所有位置设为一，否则在更复杂的题中会把不存在的方案算进去。若题目加入“不能连续走两次两级”，仅有 i 就不足以决定后续选择，还必须区分上一步的类型；这说明状态应由限制推导，而不是由喜欢的数组形状决定。"
            },
            {
              "title": "按最后一步分组，避免重数",
              "body": "任何到达 i 的合法序列，最后一步不是一级就是两级。若最后走一级，删掉它后得到一个到达 i-1 的序列；反过来，为任意到达 i-1 的序列加上一级，都得到一个合法结果，两者一一对应，因此有 dp[i-1] 个。最后走两级的情况同理有 dp[i-2] 个。这两类最后一步不同，互不重叠，而且已经覆盖所有允许步长，所以可以相加。i=1 时不存在来自 -1 级的走法，只取第一项。必须显式检查 i>=2，因为 Python 的 dp[-1] 会访问数组末尾而不是自动表示“不存在”。这个划分方法也说明，1,2 与 2,1 分在不同历史里，本题确实区分顺序，不应把它误解成用多少个一和多少个二的组合数量。"
            },
            {
              "title": "跟踪整张表，再写完整程序",
              "body": "手算 N=4：dp[0]=1；dp[1]=1；dp[2]=dp[1]+dp[0]=2；dp[3]=2+1=3；dp[4]=3+2=5。可列出五条序列：1111、112、121、211、22，检查计数是否吻合。计算顺序从小到大，读取的两项总是已完成的结果。暂时不要急于把数组压缩成两个变量，完整表更容易看出状态含义、依赖和边界。写成程序时先复制前一项，在 i>=2 时再加上前两项，正好对应推导的两类。N=0 时循环根本不执行，直接输出初始状态一，程序无需特殊补丁。调试可以输出整张表与手算比较，发现第一个错误位置；正式练习输出只保留 dp[N]。",
              "code": "n = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1]\n    if i >= 2:\n        dp[i] += dp[i - 2]\nprint(dp[n])\n",
              "exampleInput": "4\n",
              "output": "5\n"
            },
            {
              "title": "归纳证明与数字大小",
              "body": "正确性可以用递增归纳说明：零级的空序列定义正确；假设所有较小状态都准确，到 i 时，最后一步划分既没有遗漏也没有重叠，使用已正确的前状态相加就得到正确答案。循环顺序保证归纳所需的值已计算。每个位置只做常数次加法，因此按整数运算次数计为 O(N)，保存 N+1 个整数需要 O(N) 个存储项。本题 N≤60，结果虽超过某些语言的三十二位范围，但 Python 整数能精确保存，不需要随意取模。严格讨论超大 N 时，大整数加法的成本也会随位数增长；竞赛里通常在题目范围下说明常用模型即可。是否取模是题目输出要求，不是看到数量很大就可以自行添加的优化。"
            },
            {
              "title": "把错误状态与错误初值分开检查",
              "body": "若所有答案都是零，先检查是否忘了 dp[0]=1；没有有效起点，后面再正确的转移也只会加出零。若 N=1 或 N=0 错，优先看数组长度、循环端点和负下标。若小值正确但大值不对，在 Python 中先检查是否无意取模或改变了转移，而不要马上归咎于溢出。还要区分“列举序列”与“数序列”：DP 保存的是数量，没有保存所有具体方案，所以内存不会像枚举树那样按方案数增长。为了独立验证，可以对 N≤8 写一个简单枚举器，与 DP 对照；小规模穷举虽然不适合最终大输入，却非常适合当正确性检查工具。测试应包括零、一、二、四和上界，分别覆盖空方案、单一前驱、双前驱、可手算值和大整数结果。"
            },
            {
              "title": "识别 DP 的五个设计问题",
              "body": "遇到新题时依次回答：状态表示什么，哪些历史可以合并；最小的确定状态是什么；最后一次选择有哪些互斥且完整的情况；依赖关系要求什么计算顺序；答案位于哪个状态。计数常把互斥方案相加，最小代价常取 min，最大价值常取 max，但运算符本身不是算法，必须配合状态含义。例如下一课背包的状态还会涉及已经考虑的物品，若忽略这一维，会把“一件只能用一次”变成“可重复使用”。不要为了套 dp[i]=dp[i-1]+dp[i-2] 而强行修改题意。先用一个小例子画依赖，再写状态句子和初值，最后写循环。能指出某个新增限制为什么需要新增状态信息，比记住更多公式更能帮助你独立解题。"
            }
          ],
          "exerciseTitle": "登上楼梯",
          "task": "有 N 级楼梯，每次可以上 1 级或 2 级。不同的步长顺序视为不同走法，例如 1,2 和 2,1 不同。输出恰好到达第 N 级的走法数。N = 0 时定义为 1。0 ≤ N ≤ 60，不取模。",
          "input": "一个整数 N。",
          "output": "输出走法数，一个整数。",
          "hint": "定义 dp[i] 为到达第 i 级的走法数，从 dp[0] = 1 开始，按 i 递增计算。",
          "explanation": "定义 dp[i] 为恰好到达 i 的步长序列数，空序列给出 dp[0]=1。按最后一步分为从 i-1 走一级与从 i-2 走两级，两类互斥且覆盖所有走法。按 i 递增计算，i=1 时只使用第一类，避免负下标。N=0 不进入循环，答案仍是一。每步常数次加法，使用 O(N) 个整数；本题要求精确结果，不取模。",
          "objectives": [
            "准确写出状态含义和初值",
            "按互斥完整分类推导转移",
            "用归纳与小规模枚举核对"
          ],
          "checkpoints": [
            {
              "question": "dp[0] 为什么是一而不是零？",
              "answer": "不移动的空步长序列恰好有一种，它是构造后续走法的起点。"
            },
            {
              "question": "若禁止连续两次走两级，状态需要什么变化？",
              "answer": "还要保存上一步是否走两级，因为它会改变下一步允许的选择。"
            }
          ]
        },
        "en": {
          "title": "Dynamic programming: states and transitions",
          "summary": "Derive a counting DP from repeated subproblems.",
          "sections": [
            {
              "title": "Recognize repeated subproblems",
              "body": "Enumerating every sequence of one-step and two-step moves branches rapidly as N grows. Yet a situation with three stairs remaining has the same possible continuations regardless of how it was reached. Recomputing that subproblem for every prefix wastes work. Dynamic programming gives repeated subproblems explicit names, stores their answers, and reuses them. It is not simply adding an array to recursion or applying a universal formula. A state must retain enough information that histories assigned to it have equivalent relevant futures. We will derive the state, base case, transition, evaluation order, and answer location separately before attempting more complicated problems."
            },
            {
              "title": "Write an exact state sentence",
              "body": "Define dp[i] as the number of distinct move sequences that reach stair i exactly. Every word matters. Counting ways to reach at most i is different; ignoring move order is different; minimizing the number of moves is different. Allocate N plus one entries to include stair zero. Set dp[0] to one for the single empty sequence, not for an actual move. Other entries begin at zero before their valid ways are accumulated. If a new rule forbids consecutive two-step moves, position alone no longer describes future choices; the previous move type must also be retained. Derive state from restrictions, not from a preferred array shape."
            },
            {
              "title": "Partition by the final move",
              "body": "Every sequence reaching i ends with either a one-step or two-step move. Removing a final one-step move gives a sequence reaching i minus one; appending one reverses that operation, establishing a bijection. Therefore this class has dp[i-1] members. The other class similarly has dp[i-2] members. The classes are disjoint because their last moves differ, and exhaustive because no other moves are allowed. Add their counts. At i equal to one, only the first class exists. Check the boundary explicitly: Python’s negative index accesses the end of the array rather than representing an impossible predecessor."
            },
            {
              "title": "Trace the table before compressing it",
              "body": "For N equal to four, the table is 1, 1, 2, 3, 5. The five sequences are 1111, 112, 121, 211, and 22, providing an independent small check. Compute increasing indices so both predecessors are already finished. Keep the full table while learning rather than immediately compressing it into two variables; the table exposes dependencies and boundary meanings. Copy the previous count, then add the second predecessor only when it exists. With N equal to zero, the loop performs no iterations and the initial one is already the answer. Compare intermediate values with your hand calculation when debugging.",
              "code": "n = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1]\n    if i >= 2:\n        dp[i] += dp[i - 2]\nprint(dp[n])\n",
              "exampleInput": "4\n",
              "output": "5\n"
            },
            {
              "title": "Induction and the size of numbers",
              "body": "Prove the algorithm by induction on the stair index. The empty sequence gives the correct base case. Assuming smaller entries are correct, the disjoint and exhaustive final-move partition combines correct counts into the correct next count. Increasing evaluation order supplies those predecessors. There are O(N) integer additions and O(N) stored integers. For N at most sixty, Python represents the exact answer even when it exceeds a signed thirty-two-bit range. Do not invent a modulus. For extremely large N, integer bit length would also affect arithmetic cost; distinguish that stricter analysis from the usual operation-count model under this task’s limits."
            },
            {
              "title": "Diagnose state and initialization errors",
              "body": "If every answer is zero, inspect dp[0] first: without a valid seed, correct additions still produce zero. Failures at zero or one often indicate array length, loop endpoints, or negative indexing. If only larger values fail in Python, check accidental modulo operations or altered transitions before blaming overflow. Counting sequences is different from storing every sequence; the DP table retains counts, so its memory does not grow with the enumeration tree. For small N, an independent exhaustive generator is an excellent oracle even though it is unsuitable for the largest inputs. Include zero, one, two, four, and the maximum supported value."
            },
            {
              "title": "Five questions for designing a DP",
              "body": "For a new DP, answer five questions: what does a state mean; which histories can merge; what base facts are known; how do choices form complete, nonoverlapping transitions; and in what order are dependencies available? Also locate the final answer explicitly. Counting often adds, minimization often uses min, and maximization often uses max, but an operator alone is not an algorithm. Knapsack will additionally track which items have been considered; ignoring that information can allow an item to be reused. Draw a small dependency example before writing loops. Explaining why a new restriction requires additional state is more useful than memorizing another recurrence."
            }
          ],
          "exerciseTitle": "Climbing stairs",
          "task": "A staircase has N steps. Each move climbs 1 or 2 steps. Different move orders are different ways: 1,2 and 2,1 are distinct. Count ways to reach step N exactly. Define the answer for N = 0 as 1. 0 ≤ N ≤ 60; do not take a modulus.",
          "input": "One integer N.",
          "output": "Print the number of ways as an integer.",
          "hint": "Let dp[i] count ways to reach stair i. Begin with dp[0] = 1 and evaluate increasing i.",
          "explanation": "Let dp[i] count sequences reaching i exactly, with the single empty sequence giving dp[0]=1. Partition by the final move: one from i-1 or two from i-2. The classes are disjoint and exhaustive. Evaluate increasing i; at i=1 use only the first class, avoiding negative indexing. For N=0 no loop runs and the answer remains one. There are O(N) additions and stored integers. The task asks for the exact result without a modulus.",
          "objectives": [
            "Define precise states and base cases",
            "Derive disjoint, exhaustive transitions",
            "Check with induction and small enumeration"
          ],
          "checkpoints": [
            {
              "question": "Why is dp[0] one?",
              "answer": "There is exactly one empty sequence; it seeds later constructions."
            },
            {
              "question": "What changes if consecutive two-step moves are forbidden?",
              "answer": "The state must also retain whether the previous move used two steps."
            }
          ]
        },
        "ja": {
          "title": "動的計画法の状態と遷移",
          "summary": "重なる小問題から数え上げ DP を導く。",
          "sections": [
            {
              "title": "同じ小問題の繰り返しに気づく",
              "body": "一段または二段ずつ上るすべての順序を列挙すると、N が大きくなるにつれて分岐が急増します。しかし、あと三段残っている状態では、そこまでどの道で来たかによらず、残りの合法な上り方は同じです。同じ残りの問題を各接頭辞から解き直すのは無駄になります。動的計画法は、小問題に明確な名前を付けて答えを保存し、後の計算で利用する方法です。再帰に配列を足すだけでも、固定の公式を使うだけでもありません。同じ状態へまとめた履歴が、今後の選択について同じ情報を持つよう、必要な状態を残すことが重要です。本課では余分な制約のない数え上げを使い、状態、初期値、遷移、計算順序、答えの位置という五つを別々に導きます。"
            },
            {
              "title": "状態の意味を一文にする",
              "body": "dp[i] を「ちょうど i 段目に到達する、異なる移動順序の個数」と定義します。ちょうど、順序、個数という語にはそれぞれ意味があります。i 以下まで到達する数、順序を区別しない組合せ、最少移動回数は別の状態または別の問題です。零段目を含むので配列長は N+1 です。dp[0]=1 は何もしない空の手順が一通りあることを表し、一回移動したという意味ではありません。他の値はまだ合法な方法を加えていないので零にします。直感で全部一にすると、存在しない方法を数える原因になります。また、二段移動の連続を禁止するなら、位置だけでは今後の選択が決まらず、前の移動の種類も必要です。状態は制限から決めるもので、好きな配列の形から決めるものではありません。"
            },
            {
              "title": "最後の一歩で重ならずに分ける",
              "body": "i 段目に到達する手順の最後の移動は、一段か二段のどちらかです。一段で終わる手順から最後を取り除けば i-1 段目への手順になり、逆にそこへの任意の手順に一段を付ければ元の種類を作れます。一対一に対応するので、この種類は dp[i-1] 個です。二段で終わる種類も同様に dp[i-2] 個です。最後の移動が異なるため二種類は重ならず、許された移動をすべて含むので足し合わせられます。i=1 のときは負の段から来る方法はなく、最初の項だけを使います。Python の dp[-1] は存在しない状態ではなく配列末尾を参照するため、i>=2 の確認を省けません。この分類は 1,2 と 2,1 を区別しており、一と二の個数だけを選ぶ組合せ問題ではないことも分かります。"
            },
            {
              "title": "表全体を追ってから実装する",
              "body": "N=4 を手で計算すると表は 1,1,2,3,5 です。五つの手順は 1111、112、121、211、22 なので、別の方法でも確認できます。小さい添字から進めれば、参照する二つの前状態は計算済みです。最初から二変数に圧縮せず、全体の表を使って状態の意味と依存関係を見えるようにしましょう。プログラムでは前の値をコピーし、i>=2 の場合にだけ二つ前を加えると、導いた二種類にそのまま対応します。N=0 ならループが一度も動かず、初期値一が答えになるため、特別な修正は不要です。途中の表を手計算と比べれば、最初に間違う位置を探せます。ただし提出するときは dp[N] だけを出力します。圧縮は正しさを理解してから取り組む別の改善です。",
              "code": "n = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1]\n    if i >= 2:\n        dp[i] += dp[i - 2]\nprint(dp[n])\n",
              "exampleInput": "4\n",
              "output": "5\n"
            },
            {
              "title": "帰納法と数の大きさ",
              "body": "正しさは段数についての帰納法で説明できます。零段目の空手順という初期値は正しいとします。より小さい状態が正しいなら、最後の一歩による重複も漏れもない分類に従って加えることで、次の値も正しくなります。添字の昇順という計算順序が、参照値が準備済みであることを保証します。各位置で定数回の加算なので、整数演算の回数は O(N)、保存する整数の個数も O(N) です。N≤60 では三十二ビットの範囲を超える結果がありますが、Python の整数は正確に保持できます。問題が要求しない剰余を勝手に取ってはいけません。非常に大きな N を厳密に扱えば桁数による加算コストも必要ですが、本課の範囲では、用いている計算モデルを明らかにして基本の評価を理解します。"
            },
            {
              "title": "状態と初期値の誤りを切り分ける",
              "body": "すべての答えが零なら、まず dp[0]=1 を忘れていないかを見ます。有効な出発点がなければ、正しい足し算でも零しか生まれません。N=0 や一で失敗する場合は、配列長、ループの端、負の添字を調べます。Python で大きい値だけ違うなら、すぐに桁あふれを疑うのではなく、不要な剰余や遷移の変更を確認してください。また、手順をすべて保存することと、その個数だけを保存することは違います。DP は個数を残すため、列挙木と同じだけの領域を使いません。N≤8 程度では独立した全列挙と比較すると有効です。最終入力には遅い方法でも、小さい入力の検算には使えます。零、一、二、四、上限を試し、空手順、前状態一つ、前状態二つ、手計算できる値、大きい整数をそれぞれ確認します。"
            },
            {
              "title": "DP を設計する五つの問い",
              "body": "新しい問題では、状態の意味、まとめてよい履歴、確定している初期状態、重複と漏れのない選択の分類、依存関係に従う計算順序を順に考えます。最後に答えがどこにあるかも確認します。数え上げなら足し算、最小化なら min、最大化なら max を使うことが多いですが、演算子だけで算法は決まりません。次のナップサックでは、どの品物まで検討したかという情報も必要で、無視すると一個だけ使える物を何度も使ってしまいます。階段の式を使うために問題を変えてはいけません。小例で依存関係を描き、状態の一文と初期値を決めてからループにします。新しい制約によってなぜ追加の状態が要るかを説明できることが、式を多く暗記する以上に自力で解く力になります。"
            }
          ],
          "exerciseTitle": "階段の上り方",
          "task": "N 段の階段があります。1 回に 1 段または 2 段上れます。順序が異なる移動は別の行き方とし、例えば 1,2 と 2,1 は区別します。ちょうど N 段目に到達する行き方の数を求めてください。N = 0 の答えは 1 とします。0 ≤ N ≤ 60 です。剰余は取りません。",
          "input": "整数 N が 1 個与えられます。",
          "output": "行き方の数を整数で出力してください。",
          "hint": "dp[i] を i 段目への行き方の数とし、dp[0] = 1 から i の昇順に計算します。",
          "explanation": "dp[i] をちょうど i に到達する手順数とし、空手順により dp[0]=1 とします。最後の移動で i-1 から一段、i-2 から二段の二種類に分けると重複も漏れもありません。昇順に計算し、一段目では前者だけを使って負の添字を避けます。N=0 ではループせず一を返します。加算回数と保存する整数数は O(N) で、答えは剰余を取らず正確に出力します。",
          "objectives": [
            "状態と初期値を正確に定義する",
            "重複と漏れのない遷移を導く",
            "帰納法と小規模列挙で確認する"
          ],
          "checkpoints": [
            {
              "question": "dp[0] が一である理由は。",
              "answer": "何も動かない空の手順が一つあり、後の構成の出発点になるためです。"
            },
            {
              "question": "二段移動の連続を禁止すると何が必要ですか。",
              "answer": "前の移動が二段かどうかを状態に保存する必要があります。"
            }
          ]
        }
      },
      "starter": "n = int(input())\n# TODO\n",
      "solution": "n = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1]\n    if i >= 2:\n        dp[i] += dp[i - 2]\nprint(dp[n])\n",
      "tests": [
        {
          "input": "0\n",
          "expected": "1\n"
        },
        {
          "input": "1\n",
          "expected": "1\n"
        },
        {
          "input": "4\n",
          "expected": "5\n"
        },
        {
          "input": "60\n",
          "expected": "2504730781961\n"
        }
      ]
    },
    {
      "id": "knapsack",
      "content": {
        "zh": {
          "title": "0/1 背包与状态压缩",
          "summary": "推导选与不选，并解释倒序更新为什么只能使用一次。",
          "objectives": [
            "定义物品数与容量状态",
            "推导倒序更新的依赖关系",
            "用子集枚举核对小规模结果"
          ],
          "sections": [
            {
              "title": "为何选择性问题不能只看单件物品",
              "body": "背包有容量限制，每件物品有重量和价值，并且最多选一次。目标不是选最多件，而是在总重量不超容量时使总价值最大。直觉可能建议先选价值最高、重量最轻或价值重量比最高的物品，但这些局部标准都可能错过更好的组合。一个明确的比值反例是容量四，物品为 (重量三,价值五)、(重量二,价值三)、(重量二,价值三)：先取比值最高的第一件只能得到五，后两件却可以一起放入，价值六。选择第一件之后，剩余空间不足以容纳另一个物品，无法通过继续贪心弥补。这里每件不能切开，所以不能把剩余空间换算成部分物品的价值。组合之间会互相挤占容量，我们需要系统比较每件物品“选或不选”的两种可能，并保留不同容量下真正需要的信息。"
            },
            {
              "title": "先理解二维状态，不直接背倒序",
              "body": "先定义 D[i][c] 为“只考虑前 i 件物品，在总重量不超过 c 时的最大价值”。i 记录哪些物品已经使用过决策机会，c 记录可用容量，这两种信息都不能遗漏。考虑第 i 件，若不选，价值仍是 D[i-1][c]；若重量 w≤c 且选择它，之前只能使用前 i-1 件且容量剩 c-w，价值是 D[i-1][c-w]+v，取两者最大值。初始没有物品，无论容量多大，最大价值都是零。注意这里表示不超过容量，不是恰好装满，因此全部初始化零是正确的；若状态改成恰好重量，可达性就需要负无穷等标记，不能照搬初值。先把含义写清楚，再讨论为什么可以只保留一行。"
            },
            {
              "title": "用一行数组时为什么必须倒序",
              "body": "二维转移只读取上一行，所以可以把数组压成 dp[c]，但必须保证读取的 dp[c-w] 仍代表上一轮物品。按 c 从大到小更新时，c-w 小于 c，尚未被当前物品更新，因此满足要求。反过来按小到大更新，就可能读取本轮刚更新的值，相当于同一件再次加入。例如只有一件重量二价值三，容量四：正序先令 dp[2]=3，随后 dp[4] 读取这个三又加三，错误得到六；倒序先计算 dp[4] 时 dp[2] 还为零，所以结果三，符合只能用一次。倒序不是神秘的背包口诀，而是保护“上一行”依赖的办法。本课保证重量至少一，确保依赖位置严格更小；不要在未分析前把这个证明推广到零重量或别的转移。"
            },
            {
              "title": "逐件跟踪容量表",
              "body": "容量五，先放入候选物品 (二,三)。处理后，容量零与一的最优值仍为零，容量二到五都可以只选这一件，值为三，得到 [0,0,3,3,3,3]。再考虑 (三,四)，容量五可以把前一轮容量二的三与当前价值四相加，得到七；容量四只能选择第二件得到四，不能凭空复制第一件；容量三也变四，容量二保持三。最终为 [0,0,3,4,4,7]。请按照倒序逐项写出“旧值、不选值、选择值”，看清哪些格子已更新、哪些仍代表前一轮。数组中的每个容量都是独立的最优值，不是某一个实际背包沿途剩余容量的记录；不要在选一件后全局减少 capacity，这会错误地只保留一条选择路径。",
              "code": "dp = [0] * 6\nfor weight, value in [(2, 3), (3, 4)]:\n    for c in range(5, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\n    print(dp)\n",
              "output": "[0, 0, 3, 3, 3, 3]\n[0, 0, 3, 4, 4, 7]\n"
            },
            {
              "title": "完整实现与输入规模评估",
              "body": "完整程序读取一件物品就处理一轮，不必保存所有物品。range(capacity, weight-1, -1) 包含恰好容量等于重量的最后一格，因为 Python 的结束端点不包含在循环里。若物品重于总容量，范围自然为空，相当于不能选它。最终 dp[capacity] 已表示重量不超过总容量的最佳价值，不需要强制装满，也不必输出选择明细。N≤100、容量≤10000，最多约一百万次状态更新，适合这个伪多项式方法。时间 O(NW)，空间 O(W)。这里 W 是容量的数值而非输入字符串位数，如果容量改成十的十八次方，数组就不可行，必须重新设计状态或方法。读到大上限后不能只看到 N 小就机械套背包。",
              "code": "n, capacity = map(int, input().split())\ndp = [0] * (capacity + 1)\nfor _ in range(n):\n    weight, value = map(int, input().split())\n    for c in range(capacity, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\nprint(dp[capacity])\n",
              "exampleInput": "3 4\n3 5\n2 3\n2 3\n",
              "output": "6\n"
            },
            {
              "title": "正确性来自选与不选的穷尽",
              "body": "对考虑的物品数归纳。零件物品时，容量以下选择空集获得零，是正确初值。假设上一轮所有容量最优值正确，当前最优方案要么不含新物品，要么含它一次；前者由旧 dp[c] 覆盖，后者删去新物品后必须是容量 c-w 内的旧物品方案，其最好价值由旧 dp[c-w] 给出。两种候选取最大就得到新最优值。倒序更新保证读取的确实是旧状态，因此压缩不破坏这个证明。若改成每件可无限使用，依赖含义会变化，正序更新反而可能成为所需算法；如果每件数量有限但不止一，也要另外处理数量限制。循环方向必须从“此刻读取哪一轮”的语义推导，不能只根据题目出现背包两个字来决定。"
            },
            {
              "title": "用反例检查一次性约束",
              "body": "最关键的回归例是“只有一件物品，但容量足够装两件”：正确答案只能取一次价值，它能直接识别错误的正序更新。还要测试容量为零、没有物品、所有物品过重、恰好装满、价值为零、两件参数相同但确实是不同物品。相同参数不代表同一件，不能擅自去重，否则会少算可用数量。小 N 时枚举所有子集，把总重量不超容量的最大价值与 DP 比较，能够独立验证转移。完成后问自己：初值表示什么，为什么不是负无穷，为什么答案可能不把容量用完，为什么同样的比值贪心在允许物品可切分时又可能正确？这些区别决定算法能否迁移。背包课的重点是学会保护状态所表达的使用次数，而不只是把 for 写成倒着走。"
            }
          ],
          "checkpoints": [
            {
              "question": "只有重量二价值三的一件，容量四，为什么正序会错？",
              "answer": "它会读取本轮 dp[2]=3，再算出 dp[4]=6，相当于使用两次。"
            },
            {
              "question": "本课全部初值为零代表什么？",
              "answer": "容量是上限，可以不装任何物品，空集价值零合法。"
            }
          ],
          "exerciseTitle": "容量内最大价值",
          "task": "有 N 件物品，第 i 件重量 w_i、价值 v_i，每件最多选择一次。总重量不能超过 W，求最大总价值，允许不选任何物品。0≤N≤100，0≤W≤10000，1≤w_i≤10000，0≤v_i≤10^9。",
          "input": "第一行 N W，之后 N 行每行重量和价值。",
          "output": "输出最大总价值。",
          "hint": "先想前 i 件与容量 c 的二维状态，再用容量倒序压缩一行。",
          "explanation": "dp[c] 记录已读物品在容量 c 以下的最大价值。每件物品从大容量往小容量更新，候选为不选的 dp[c] 与选择的旧 dp[c-w]+v。因为 c-w 尚未在本轮更新，同一件不会重复使用。重量超过容量时循环为空。允许空集使初值零正确，最后输出总容量位置。时间 O(NW)，空间 O(W)。"
        },
        "en": {
          "title": "0/1 knapsack and state compression",
          "summary": "Derive take-or-skip transitions and preserve single use with descending updates.",
          "objectives": [
            "Define item-prefix and capacity states",
            "Derive backward update dependencies",
            "Check small instances by subset enumeration"
          ],
          "sections": [
            {
              "title": "Why local item rankings can fail",
              "body": "A knapsack has limited capacity, and each item has a weight and value and may be selected at most once. The goal is maximum total value, not maximum item count. Ranking items by value, weight, or value-to-weight ratio is not generally sufficient. With capacity four and items (3,5), (2,3), and (2,3), the highest ratio belongs to the first item. Taking it yields five because nothing else fits, while the two remaining items yield six. Check counterexamples numerically rather than trusting a plausible story. Capacity creates interactions between choices, so systematically compare selecting and skipping each item."
            },
            {
              "title": "Understand the two-dimensional state first",
              "body": "First define D[i][c] as the maximum value using only the first i items with total weight at most c. The item index records which decisions have already been made; capacity records the remaining resource constraint. Skipping the current item gives D[i-1][c]. Selecting an item of weight w and value v gives D[i-1][c-w]+v when it fits. Take the maximum. With no items, every capacity has value zero. This state means at most a capacity, not exactly a weight. An exact-weight state would need unreachable markers rather than zero everywhere. Explain the state before compressing its storage."
            },
            {
              "title": "Why one-row updates run backward",
              "body": "The transition reads only the previous item row, so storage can be compressed to dp[c]. However, dp[c-w] must still represent that previous row. Updating capacities downward guarantees this because c-w is smaller and has not yet been updated for the current item. Updating upward can reuse a newly written value and select the same item twice. For one item of weight two and value three with capacity four, ascending updates produce dp[2]=3 and then an incorrect dp[4]=6. Descending updates give three. The direction preserves dependencies; it is not an arbitrary mnemonic. Positive item weights make the predecessor strictly smaller."
            },
            {
              "title": "Trace the capacity row item by item",
              "body": "With capacity five, process item (2,3). Capacities zero and one remain zero, while capacities two through five can take that item, giving [0,0,3,3,3,3]. Next process (3,4). Capacity five combines the previous capacity-two value with four, reaching seven. Capacity four can take the second item alone for four; capacity three also becomes four, and capacity two remains three. The row becomes [0,0,3,4,4,7]. Trace skip and take candidates in descending order. Each capacity stores its own optimum, not the remaining capacity of one chosen bag. Do not globally subtract weight after a selection.",
              "code": "dp = [0] * 6\nfor weight, value in [(2, 3), (3, 4)]:\n    for c in range(5, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\n    print(dp)\n",
              "output": "[0, 0, 3, 3, 3, 3]\n[0, 0, 3, 4, 4, 7]\n"
            },
            {
              "title": "Implement and check the size limits",
              "body": "The implementation can process each item as it is read. The descending range ends at weight minus one because Python excludes the endpoint, thereby including capacity exactly equal to weight. An overweight item produces an empty range and is automatically skipped. dp[capacity] already represents weight at most the limit; filling the bag exactly is unnecessary. With at most one hundred items and capacity ten thousand, there are roughly one million updates. Time is O(NW), space O(W). W is the numeric capacity, not the number of digits used to write it. A capacity of ten to the eighteenth would require a different formulation.",
              "code": "n, capacity = map(int, input().split())\ndp = [0] * (capacity + 1)\nfor _ in range(n):\n    weight, value = map(int, input().split())\n    for c in range(capacity, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\nprint(dp[capacity])\n",
              "exampleInput": "3 4\n3 5\n2 3\n2 3\n",
              "output": "6\n"
            },
            {
              "title": "Correctness comes from exhaustive alternatives",
              "body": "Induct on the number of considered items. With none, the empty set gives value zero. Suppose all previous capacities are optimal. An optimal new solution either omits the new item or includes it once. Omission is covered by the old dp[c]. For inclusion, remove that item: the remainder is a previous-item solution within c-w, whose best value is the old dp[c-w]. Taking the larger candidate is therefore optimal. Descending updates preserve those old values. Unlimited reuse changes the dependency meaning and may require ascending updates; bounded quantities require another treatment. Derive direction from state semantics, not the word knapsack alone."
            },
            {
              "title": "Test the at-most-once restriction",
              "body": "The most revealing regression has one item and enough capacity for two copies: the answer must still use its value only once. Also test zero capacity, no items, all items overweight, exact filling, zero values, and separate items with identical parameters. Identical parameters do not make items duplicates that can be discarded. For small N, enumerate every subset and compare its best feasible value with DP as an independent oracle. Explain why initialization is zero, why unused capacity is allowed, and why divisible items would change the problem. Protecting the meaning of item usage is the lesson, not merely writing a backward loop."
            }
          ],
          "checkpoints": [
            {
              "question": "Why does ascending order fail for one item (2,3) and capacity four?",
              "answer": "It reuses the new dp[2]=3 to produce six, selecting the item twice."
            },
            {
              "question": "Why may every initial capacity contain zero?",
              "answer": "Capacity is an upper bound and selecting the empty set is feasible."
            }
          ],
          "exerciseTitle": "Maximum value within capacity",
          "task": "There are N items, each with weight w_i and value v_i. Select each at most once with total weight at most W; selecting none is allowed. Maximize total value. 0≤N≤100, 0≤W≤10000, 1≤w_i≤10000, 0≤v_i≤10^9.",
          "input": "N W, followed by N lines of weight and value.",
          "output": "Print the maximum total value.",
          "hint": "Start with an item-prefix/capacity DP, then compress with descending capacities.",
          "explanation": "dp[c] stores the best value from processed items within capacity c. For each item, descend through capacities and compare skipping with the old dp[c-w]+v. The smaller predecessor has not been updated in this round, preventing reuse. An overweight item yields no updates. The empty set justifies zero initialization; return the full-capacity entry. Time O(NW), space O(W)."
        },
        "ja": {
          "title": "0/1 ナップサックと状態圧縮",
          "summary": "選ぶ・選ばないを導き、逆順更新で一回使用を守る。",
          "objectives": [
            "品物の接頭辞と容量で状態を定義する",
            "逆順更新の依存関係を導く",
            "小例を部分集合列挙で確認する"
          ],
          "sections": [
            {
              "title": "品物ごとの順位だけでは決まらない",
              "body": "容量に上限がある袋へ、重さと価値を持つ品物を各一個まで入れます。目的は品物の個数ではなく、総重量が容量以下という条件で価値の合計を最大にすることです。価値が最大、最も軽い、価値を重さで割った比率が最大、といった順序だけでは一般に正しく選べません。容量四で、品物が (重さ三,価値五)、(二,三)、(二,三) なら、比率が最大の最初の品物を選ぶと五にしかなりませんが、後ろの二つを選べば六になります。もっともらしい説明だけでなく、反例は実際に合計を計算して確かめます。各選択が残り容量を奪い合うので、品物ごとの単純な順位ではなく、選ぶ場合と選ばない場合を系統的に比較する必要があります。"
            },
            {
              "title": "まず二次元の状態を理解する",
              "body": "最初は D[i][c] を「前から i 個の品物だけを考え、重量合計が c 以下のときの最大価値」と定義します。i はどの品物の決定を終えたか、c は容量の制限を表し、両方に役割があります。現在の品物を選ばないなら D[i-1][c] のままです。重さ w が入る場合に選ぶなら、残りは前の品物だけで容量 c-w を使い、D[i-1][c-w]+v になります。この二つの最大を取ります。品物がなければ、どの容量でも最大価値は零です。ここは容量以下という状態であり、ちょうどその重量を作る状態ではありません。後者なら到達不能の印が必要で、全て零という初期値は使えません。まず意味を明確にし、それから一行に圧縮できる理由を考えます。"
            },
            {
              "title": "一行に圧縮すると逆順が必要な理由",
              "body": "遷移は前の品物までの行だけを読むので、dp[c] の一行へ圧縮できます。ただし dp[c-w] はまだ前の行の意味を持っていなければなりません。c を大きい方から更新すれば c-w は小さい側にあり、現在の品物では未更新なので条件を守れます。小さい方から更新すると、今回書いた値を再利用し、同じ品物を二回選ぶことがあります。重さ二、価値三の品物が一個だけで容量四なら、昇順では dp[2]=3 の後に dp[4]=6 となって誤りです。降順なら dp[4] を計算する時点で dp[2] は零なので三になります。逆順は暗記する呪文ではなく、前の行への依存を保つための手段です。本課の重さは正なので参照位置は必ず小さくなります。"
            },
            {
              "title": "品物ごとに容量の表を追う",
              "body": "容量五で最初に (重さ二,価値三) を考えると、容量零と一は零、二から五はその一個を選べるので三となり、[0,0,3,3,3,3] です。次に (三,四) を考えると、容量五では前の容量二の三に四を加えて七になります。容量四は第二の品物だけで四、容量三も四、容量二は三のままなので、[0,0,3,4,4,7] となります。降順で各場所について、選ばない候補と選ぶ候補、どちらの値が前の行なのかを書き出してください。配列の各容量はそれぞれ独立した最適値であり、一つの袋の残り容量を順に記録したものではありません。一個選んだつもりで capacity 全体から重さを引くと、一通りの経路しか残らず DP の意味が壊れます。",
              "code": "dp = [0] * 6\nfor weight, value in [(2, 3), (3, 4)]:\n    for c in range(5, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\n    print(dp)\n",
              "output": "[0, 0, 3, 3, 3, 3]\n[0, 0, 3, 4, 4, 7]\n"
            },
            {
              "title": "実装と制約の見積もり",
              "body": "完成版は品物を一個読むたび一行を更新でき、全品物を保存する必要はありません。range(capacity, weight-1, -1) の終点は含まれないため、容量と重さがちょうど等しい場所まで処理できます。品物が全容量より重ければ範囲は空で、自然に選ばないことになります。dp[capacity] は容量以下の最大値なので、ぴったり詰める必要も、選択内容を出力する必要もありません。N≤100、容量≤10000 なら更新はおよそ百万回までで、O(NW) 時間、O(W) 領域です。この W は入力表記の桁数ではなく容量の数値です。容量が十の十八乗なら配列は作れず、別の状態や方法を考え直します。N が小さいという理由だけで、容量の大きさを読まずに適用してはいけません。",
              "code": "n, capacity = map(int, input().split())\ndp = [0] * (capacity + 1)\nfor _ in range(n):\n    weight, value = map(int, input().split())\n    for c in range(capacity, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\nprint(dp[capacity])\n",
              "exampleInput": "3 4\n3 5\n2 3\n2 3\n",
              "output": "6\n"
            },
            {
              "title": "選ぶ・選ばないの尽くし方で証明する",
              "body": "検討した品物の個数について帰納します。品物が零個なら空集合で価値零が最適です。前の行の各容量が正しいと仮定すると、新しい最適解は新しい品物を含まないか、一個含むかのどちらかです。含まない場合は旧 dp[c] にあり、含む場合はそれを取り除くと容量 c-w 内の旧品物の解になり、その最良値は旧 dp[c-w] です。二候補の大きい方を取れば最適になります。降順更新は参照する値を旧状態に保つため、圧縮してもこの証明が成り立ちます。無制限に使える問題なら依存の意味が変わり、昇順が必要になることがあります。個数制限が一以外なら別の処理が必要です。背包という言葉だけで方向を覚えず、今読んでいる値が何巡目の状態なのかから導いてください。"
            },
            {
              "title": "一回だけという制約をテストする",
              "body": "最も重要な検査例は、品物が一個だけなのに容量は二個分ある場合です。価値は一回分しか得られず、誤った昇順更新を直接見つけられます。容量零、品物なし、全部重すぎる、ちょうど入る、価値零、重さと価値が同じ別々の二個も試します。同じ数値でも別の品物なので、勝手に重複除去すると使える個数が減ってしまいます。小さい N では全部の部分集合を列挙し、容量以内の最大値を独立に求めて DP と比較できます。初期値がなぜ零か、なぜ負の無限大ではないか、容量を余らせてもよい理由、品物を切り分けられると何が変わるかを説明してください。大切なのは逆向きループそのものではなく、状態が表す使用回数の制約を守ることです。"
            }
          ],
          "checkpoints": [
            {
              "question": "重さ二価値三が一個、容量四で昇順が誤る理由は。",
              "answer": "今回更新した dp[2]=3 を使って六を作り、二回選んでしまいます。"
            },
            {
              "question": "初期値を全て零にできる理由は。",
              "answer": "容量は上限であり、何も選ばない空集合が常に合法だからです。"
            }
          ],
          "exerciseTitle": "容量内の最大価値",
          "task": "N 個の品物に重さ w_i と価値 v_i があり、各品物は一回まで選べます。総重量を W 以下にして価値合計を最大化してください。何も選ばなくても構いません。0≤N≤100、0≤W≤10000、1≤w_i≤10000、0≤v_i≤10^9 です。",
          "input": "N W、その後 N 行に重さと価値。",
          "output": "最大価値を出力してください。",
          "hint": "前 i 個と容量 c の表から考え、容量を降順にして一行へ圧縮します。",
          "explanation": "dp[c] は処理済み品物で重量 c 以下の最大価値です。各品物について容量を降順にし、選ばない値と旧 dp[c-w]+v を比較します。小さい参照先は今の巡回で未更新なので同じ品物を再利用しません。重すぎる品物の更新範囲は空です。空集合が使えるため初期値は零で、最後に全容量の位置を出力します。時間 O(NW)、領域 O(W) です。"
        }
      },
      "order": 22,
      "stage": "synthesis",
      "minutes": 60,
      "prerequisiteIds": [
        "dynamic-programming"
      ],
      "relatedProblems": [
        "ABC286D",
        "ABC219D",
        "ABC281D"
      ],
      "solution": "n, capacity = map(int, input().split())\ndp = [0] * (capacity + 1)\nfor _ in range(n):\n    weight, value = map(int, input().split())\n    for c in range(capacity, weight - 1, -1):\n        dp[c] = max(dp[c], dp[c - weight] + value)\nprint(dp[capacity])\n",
      "starter": "n, capacity = map(int, input().split())\n# TODO: process each item once.\n",
      "tests": [
        {
          "input": "0 8\n",
          "expected": "0\n"
        },
        {
          "input": "2 0\n1 5\n2 8\n",
          "expected": "0\n"
        },
        {
          "input": "1 4\n2 3\n",
          "expected": "3\n"
        },
        {
          "input": "3 4\n3 5\n2 3\n2 3\n",
          "expected": "6\n"
        },
        {
          "input": "2 3\n4 9\n5 20\n",
          "expected": "0\n"
        },
        {
          "input": "3 5\n2 3\n3 4\n5 0\n",
          "expected": "7\n"
        }
      ]
    },
    {
      "id": "greedy",
      "content": {
        "zh": {
          "title": "贪心选择、反例与交换证明",
          "summary": "先检验局部规则，再证明它不会损失最优解。",
          "objectives": [
            "构造反驳错误规则的小例子",
            "用交换论证证明最早结束选择",
            "实现端点兼容的排序扫描"
          ],
          "sections": [
            {
              "title": "贪心不是“看起来最好就选”",
              "body": "贪心算法每次做一个局部决定，并且之后不撤销它。这样通常比保存很多状态的 DP 简洁，但代价是必须证明这次不可撤销的选择不会损失最优解。不能因为样例通过就断言正确，也不能把“优先某个最大值或最小值”当成普遍规则。本课的会议安排问题有一个可靠选择：在当前能参加的会议中，先选结束最早的一场。它的依据不是这场持续最短，而是结束得早为后面留下的可用时间不少于其他选择。我们会先找出其他直觉规则的反例，再用交换论证说明这个规则为何成立。学习贪心时，反例搜索与证明同样重要；找到一个小反例，就足以否定一个无论运行多快的错误规则。"
            },
            {
              "title": "把不重叠的含义写进状态",
              "body": "每场会议用开始 s 与结束 t 表示，保证 s<t。若上一场在时间 e 结束，下一场只需 s≥e 就可参加，也就是说结束点与下一场开始点相同是允许的。可以理解为会议占用半开区间 [s,t)，不要把相邻端点误判为冲突。选择过程只需保存上一场已选会议的结束时间 last_end，以及已选数量；历史中的更早会议不会额外限制未来，因为它们都在 last_end 之前结束。先按结束时间排序，依次扫描就能在每个阶段首先遇到最早结束的可行候选。排序相同结束时间的会议时不需要特殊偏好，任何可行者留下的未来起点相同。初始 last_end=-1 是因为本题所有开始时间非负，不是任何区间题都可以随意采用这个哨兵。"
            },
            {
              "title": "先否定两个常见直觉",
              "body": "“开始最早优先”会在会议 (0,10)、(1,2)、(2,3) 上失败：先选第一场只能参加一场，后两场却可连续参加两场。“持续时间最短优先”也不可靠：会议 (0,3)、(3,6)、(2,4) 中，最短的是第三场，选它会同时挡住前两场，而前两场本来能组成两场安排。这些反例都很小，可以在纸上画时间轴检查，不需要写随机程序才能发现。注意反例必须符合正在讨论的规则和输入约束，还要明确比较的目标是会议数量；如果目标改成总收益，上述数量比较不能直接证明收益规则错误。对新贪心思路，先主动寻找“局部便宜但阻挡了两个选择”的结构，比只生成很多互不冲突的随机数据更容易暴露问题。"
            },
            {
              "title": "交换论证如何保护最优解",
              "body": "设当前可参加会议中结束最早的是 g，任取一个最优安排，它的第一场为 o。因为 g 的结束时间不晚于 o，把最优安排的第一场换成 g 后，原来在 o 之后的所有会议仍然能参加：它们开始时间至少为 o 的结束，也就至少为 g 的结束。场次数量没有减少，因此存在一个以 g 开头的最优安排。这证明做出贪心选择是安全的，而不是声称所有最优安排都必须以 g 开头。选完 g 后，对开始不早于 g 结束的剩余会议，面对的是同样形式的子问题，重复论证即可。若会议有不同价值，替换第一场可能改变总价值，这个证明就失效；这也是使用贪心前必须检查目标函数的原因。"
            },
            {
              "title": "从证明得到排序扫描代码",
              "body": "按结束时间排序后，扫描每个区间。如果开始时间小于 last_end，就与已经选定的最后一场冲突，跳过；否则选择它，将计数加一并更新 last_end。无需把不相容会议从列表中删除，也无需每轮重新排序，整体顺序一次确定就够了。例如 (0,3)、(1,2)、(2,4)、(3,5)、(4,6) 排序后，依次可选 (1,2)、(2,4)、(4,6)，结果三。代码里使用 sort(key=lambda interval: interval[1])，明确按第二项排序，不要误用默认按开始时间优先的元组排序。最后输出计数，输入为零场会议时循环为空，自然输出零。保持选择规则与证明中的结束时间一致，是实现正确的关键。\n\n这里把每个区间保存为元组，例如 (2, 4)。元组和列表一样可以用下标访问，interval[0] 是开始时间，interval[1] 是结束时间；区别是元组建好后不能替换其中的元素，适合保存本题中不会修改的一对值。tuple(map(int, input().split())) 先把一行拆成文本片段，再逐个转为整数，最后用 tuple 把两个整数收集成一个元组。最外层的列表推导式只是将这个读入过程重复 N 次，得到区间列表。\n\n排序键也可以先用已学过的 def 写清楚：定义函数时，函数头是 def end_time(interval):，缩进的函数体是 return interval[1]，随后调用 intervals.sort(key=end_time)。key 接收的是函数本身，所以这里写 end_time，不写 end_time()；排序会把每个区间交给该函数，比较函数返回的结束时间，原列表中保存的仍是完整区间。lambda interval: interval[1] 是这个简单函数的简写：冒号前的 interval 是参数，冒号后的 interval[1] 是自动返回的表达式。它没有改变排序规则，也不表示比较下标本身。",
              "code": "n = int(input())\nintervals = [tuple(map(int, input().split())) for _ in range(n)]\nintervals.sort(key=lambda interval: interval[1])\nlast_end = -1\nanswer = 0\nfor start, end in intervals:\n    if start >= last_end:\n        answer += 1\n        last_end = end\nprint(answer)\n",
              "exampleInput": "5\n0 3\n1 2\n2 4\n3 5\n4 6\n",
              "output": "3\n"
            },
            {
              "title": "端点、相同区间与复杂度",
              "body": "测试两场 (0,1)、(1,2)，正确应选两场，能发现把 >= 写成 > 的错误。所有会议互相重叠时只能选一场；完全相同的区间即使作为不同会议重复出现，也不能同时选择，因为它们有正长度并占同一段时间。多个会议结束时刻相同，排序稳定性不会影响最大数量。没有会议与只有一场分别检查初值和第一轮更新。排序耗时 O(N log N)，扫描 O(N)，存储区间需要 O(N) 空间；不能只看到一次 for 就写成线性时间。若时间坐标很大，也不需要建立覆盖每个时间单位的数组，因为算法只比较端点，复杂度由会议数量而不是最大时间值决定。代码中的整数运算可以直接处理本题十亿级端点。"
            },
            {
              "title": "如何判断下一道题能否贪心",
              "body": "独立解题时先提出候选规则，再执行两个检查：寻找小反例；尝试把任意最优解的第一步交换成你的选择而不变差。如果不能解释交换后为何仍然合法或目标值为何不下降，就还没有完成证明。必要时退回 DP、搜索或其他结构，不必强求所有题都能贪心。小规模可以枚举所有会议子集，检查不重叠并求最大个数，与贪心结果比较；这能发现实现问题，但有限测试仍不能替代一般证明。请把本课与背包比较：区间调度的最早结束能保护所有后续选择，0/1背包的最高比值却没有这种交换保证。两个题都在“选择一些对象”，不代表可以共享同一个优先规则。真正可迁移的是证明局部选择安全的思考方式。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么最早结束优于最早开始作为本题规则？",
              "answer": "结束更早不会减少可接在后面的会议，最早开始却可能占据很长时间。"
            },
            {
              "question": "会议带不同收益时这个证明还成立吗？",
              "answer": "不一定，交换第一场可能降低收益，需重新设计算法。"
            }
          ],
          "exerciseTitle": "最多参加几场会议",
          "task": "给定 N 场会议，每场开始 s、结束 t，0≤s<t≤10^9。选择最多场互不重叠会议；一场结束时可立即开始下一场，即相邻端点相等允许。0≤N≤200000。每场收益都按一场计。",
          "input": "第一行 N，之后 N 行每行 s t。",
          "output": "输出最多可参加场数。",
          "hint": "按结束时间排序，只选择开始时间不早于已选最后结束时间的会议。",
          "explanation": "结束最早的可行会议可以替换任意最优安排的第一场，而不影响其余会议可行性，所以总存在包含它的最优解。依次重复该选择，用结束排序后的一次扫描实现。开始等于 last_end 时允许加入。时间 O(N log N)，额外保存区间 O(N)；本结论依赖目标是场次数量、会议收益相同。"
        },
        "en": {
          "title": "Greedy choices, counterexamples, and exchange",
          "summary": "Challenge a local rule, then prove it preserves an optimum.",
          "objectives": [
            "Construct small counterexamples",
            "Prove earliest finish by exchange",
            "Implement sorting with compatible endpoints"
          ],
          "sections": [
            {
              "title": "Greedy needs more than a plausible choice",
              "body": "A greedy algorithm makes a local decision and does not undo it later. This can be simpler than retaining many DP states, but you must show that committing to the choice does not lose an optimum. Passing samples is not a proof, and choosing a largest or smallest quantity is not a universal rule. For interval scheduling, a reliable choice is the currently compatible meeting that finishes earliest. The reason concerns remaining availability, not shortest duration. We will refute tempting alternatives with small examples and justify the valid choice by an exchange argument. One counterexample is enough to reject an otherwise fast rule."
            },
            {
              "title": "Encode the meaning of compatibility",
              "body": "Represent a meeting by start s and finish t, with s less than t. A meeting is compatible after the last selected finish e when s is at least e. Equal endpoints are allowed: think of occupied time as the half-open interval [s,t). Store only the latest selected finish and the count; earlier selected meetings impose no additional future restriction. Sorting by finish makes the first compatible candidate the earliest finishing one. Equal finishes require no special preference among feasible candidates. The initial sentinel minus one is valid because this task guarantees nonnegative start times; it is not a universal sentinel for every interval problem."
            },
            {
              "title": "Refute two tempting rules first",
              "body": "Earliest start fails on meetings (0,10), (1,2), and (2,3): it chooses one instead of the last two. Shortest duration fails on (0,3), (3,6), and (2,4): the shortest meeting blocks both of the others, although those two are compatible. Draw these examples on a time line. A counterexample must obey the proposed rule, input constraints, and actual optimization objective. If meetings had different rewards, a count comparison would not establish a reward comparison. When testing a new greedy idea, deliberately seek a locally attractive choice that blocks two useful alternatives instead of generating only easy nonoverlapping examples."
            },
            {
              "title": "Use an exchange argument",
              "body": "Let g be the earliest-finishing feasible meeting, and take any optimal schedule whose first meeting is o. Replace o with g. Since g finishes no later, every meeting that could follow o can still follow g. The number of selected meetings does not decrease, so there exists an optimal schedule beginning with g. This does not claim that every optimum starts with g. After committing to g, the remaining compatible meetings form the same kind of subproblem, allowing the argument to repeat. With unequal rewards, replacing o could change total value, so the proof would no longer support the new objective."
            },
            {
              "title": "Translate the proof into a scan",
              "body": "Sort once by finish time. During the scan, skip an interval whose start is smaller than last_end; otherwise select it, increment the count, and replace last_end. There is no need to delete incompatible intervals or sort again after each selection. For (0,3), (1,2), (2,4), (3,5), and (4,6), the selected sequence is (1,2), (2,4), (4,6). Use a key selecting the second tuple entry. Default tuple ordering would prioritize starts and implement the wrong rule. With zero meetings, the loop is empty and the count remains zero. Keep the code’s ordering aligned with the quantity used in the proof.\n\nEach interval is stored as a tuple, such as (2, 4). Like a list, a tuple supports indexing: interval[0] is the start and interval[1] is the finish. Unlike a list, its entries cannot be replaced after creation, which suits a pair of values that this algorithm never changes. In tuple(map(int, input().split())), split first separates one input line into text tokens, map converts each token to an integer, and tuple collects the two integers into a tuple. The outer list comprehension repeats this reading step N times to build the interval list.\n\nYou can write the sorting key with the def syntax already studied. Use the function header def end_time(interval): and an indented body containing return interval[1], then call intervals.sort(key=end_time). The key argument receives the function itself, so write end_time, not end_time(). Sorting passes each interval to this function and compares its returned finish time; the list still contains complete intervals. The expression lambda interval: interval[1] is a short form of this simple function. Before the colon, interval names the parameter; after it, interval[1] is the expression whose value is returned automatically. This abbreviation does not change the ordering rule, and it does not sort by the index number itself.",
              "code": "n = int(input())\nintervals = [tuple(map(int, input().split())) for _ in range(n)]\nintervals.sort(key=lambda interval: interval[1])\nlast_end = -1\nanswer = 0\nfor start, end in intervals:\n    if start >= last_end:\n        answer += 1\n        last_end = end\nprint(answer)\n",
              "exampleInput": "5\n0 3\n1 2\n2 4\n3 5\n4 6\n",
              "output": "3\n"
            },
            {
              "title": "Endpoints, ties, and complexity",
              "body": "Meetings (0,1) and (1,2) should both be selected, catching a mistaken strict comparison. If every meeting overlaps every other, choose one. Identical positive-length intervals may represent distinct meetings but cannot both be attended. Equal finish times do not require stable sorting for the maximum count. Test no meetings and one meeting to inspect initialization. Sorting costs O(N log N), scanning O(N), and storing intervals O(N) space. Do not report linear total time merely because the final scan has one loop. Large time coordinates need no per-time-unit array because only endpoint comparisons matter."
            },
            {
              "title": "Decide whether a new greedy rule is justified",
              "body": "For a new rule, perform two checks: search for a small counterexample, then try to transform an arbitrary optimum so it begins with your choice without worsening the objective. If legality or value after the exchange is unclear, the proof is incomplete. Use DP, search, or another structure when needed rather than forcing greediness. Exhaustively enumerating small subsets can catch implementation mistakes, but finite tests do not replace a general argument. Compare this problem with 0/1 knapsack: earliest finish preserves all later opportunities, while highest value-to-weight ratio lacks that guarantee. The transferable skill is proving a safe choice, not reusing one ranking everywhere."
            }
          ],
          "checkpoints": [
            {
              "question": "Why use earliest finish rather than earliest start?",
              "answer": "An earlier finish preserves later opportunities; an early start may occupy a long interval."
            },
            {
              "question": "Does the same proof handle unequal rewards?",
              "answer": "Not necessarily: exchanging the first meeting may reduce reward."
            }
          ],
          "exerciseTitle": "Attend the most meetings",
          "task": "Given N meetings with 0≤s<t≤10^9, select the maximum number of nonoverlapping meetings. A meeting may start exactly when the previous one finishes. Every meeting counts equally. 0≤N≤200000.",
          "input": "N, followed by N lines s t.",
          "output": "Print the maximum meeting count.",
          "hint": "Sort by finish and accept a start at least the last selected finish.",
          "explanation": "The earliest-finishing feasible meeting can replace the first meeting of an optimum without making any later meeting infeasible. Thus an optimum containing the greedy choice always exists. Repeat this choice using a single finish-sorted scan. Equality with last_end is compatible. Time O(N log N), interval storage O(N). The conclusion relies on maximizing count with equal reward per meeting."
        },
        "ja": {
          "title": "貪欲選択・反例・交換論証",
          "summary": "局所規則を疑い、最適解を保つことを証明する。",
          "objectives": [
            "誤った規則の小反例を作る",
            "最早終了を交換論証で示す",
            "端点が接する場合も正しく走査する"
          ],
          "sections": [
            {
              "title": "貪欲法は直感だけで選ばない",
              "body": "貪欲法は局所的な選択を一つ行い、後から取り消さずに進みます。多くの状態を保存する DP より簡潔になることがありますが、その選択で最適解を失わないと証明する必要があります。サンプルを通っただけでは証明にならず、最大や最小を優先するというだけの普遍的な規則もありません。本課の会議選択では、今参加可能な中で終了が最も早い会議を選ぶ規則が成立します。理由は会議時間の短さではなく、後に残る利用可能時間が他の選択より悪くならないことです。まず他の直感的な規則の反例を作り、その後で正しい規則を交換論証により確かめます。貪欲法では反例を探すことも証明することも重要です。どれだけ速いコードでも、小さな反例一つで規則が誤りだと分かります。"
            },
            {
              "title": "重ならない条件を状態にする",
              "body": "会議は開始 s と終了 t で表し、s<t とします。直前の選択が e に終わるなら、次は s≥e で参加できます。終了と次の開始が等しい場合も許され、占有時間を半開区間 [s,t) と考えると理解できます。接する端点を誤って重なりとしないでください。保持する状態は、最後に選んだ終了時刻 last_end と選択数だけです。以前の会議はすべてその時刻までに終わっており、未来に追加の制約を与えません。終了時刻で並べると、各段階で最も早く終わる実行可能な候補から検討できます。同じ終了の候補は、参加できるものなら未来に残す条件も同じです。初期値 -1 は開始が非負という本課の保証によるもので、すべての区間問題で使える値ではありません。"
            },
            {
              "title": "よくある二つの直感を反証する",
              "body": "開始が最も早いものを優先する規則は、(0,10)、(1,2)、(2,3) で失敗します。最初を選ぶと一場だけですが、後ろの二つは連続して参加できます。所要時間が最短という規則も、(0,3)、(3,6)、(2,4) で失敗します。最短の三番目を選ぶと他の二つを妨げますが、最初の二つは両方参加できます。小さい例なので時間軸に描いて確認できます。反例は規則と入力条件に従い、何を最大化するかも一致していなければなりません。報酬が異なる場合に、個数だけの比較をそのまま利益の比較へ使うことはできません。新しい規則を考えたら、局所的に魅力的な一つが二つの有用な選択を阻む形を探すと、衝突のない簡単な乱数例より問題を見つけやすくなります。"
            },
            {
              "title": "交換論証で最適解を保つ",
              "body": "今参加できる中で最も早く終わる会議を g、任意の最適な予定の最初の会議を o とします。o を g に交換しても、g は o より遅く終わらないため、その後の会議はすべて参加可能です。元の後続会議は o の終了以降に始まるので、g の終了以降にも始まります。選択数は減らず、g から始まる最適解が少なくとも一つ存在すると分かります。すべての最適解が必ず g から始まる、という主張ではありません。g を決めた後は、その終了以降に始まる会議について同じ形の問題が残るため、同じ論証を繰り返せます。報酬が異なる場合には最初の交換で総利益が変わり得るので、この証明は使えません。目的関数を読み直すことが必要な理由です。"
            },
            {
              "title": "証明をソートと走査へ移す",
              "body": "終了時刻で一度だけ並べ、各区間を順に見ます。開始が last_end より小さければ直前に選んだ会議と衝突するので飛ばし、そうでなければ選択数を増やして last_end を更新します。不適合な区間をリストから消したり、選ぶたびに並べ直したりする必要はありません。(0,3)、(1,2)、(2,4)、(3,5)、(4,6) なら、選ぶ順序は (1,2)、(2,4)、(4,6) で3 件です。sort の key でタプルの第二要素を明示してください。通常のタプル順では開始時刻が優先され、別の誤った規則になります。0 件ならループが空で自然に零を返します。証明で使った終了時刻と、実装が比較する値を一致させることが大切です。\n\n各区間は (2, 4) のようなタプルに保存します。タプルもリストと同様に添字で参照でき、interval[0] が開始、interval[1] が終了時刻です。ただしリストと異なり、作成後に要素を別の値へ置き換えることはできません。本問のように変更しない二つの値を組にする用途に適しています。tuple(map(int, input().split())) は、一行を split で文字列へ分割し、map でそれぞれを整数に変え、tuple で二つの整数をタプルにまとめます。外側のリスト内包表記はこの読み取りを N 回繰り返し、区間のリストを作っています。\n\nソートのキーは、既習の def で先に書くこともできます。関数の先頭を def end_time(interval): とし、インデントした本体に return interval[1] を書いてから、intervals.sort(key=end_time) と呼び出します。key に渡すのは関数そのものなので、end_time() ではなく end_time と書きます。ソートは各区間をこの関数へ渡し、返された終了時刻を比較します。リストに残るのは終了時刻だけではなく区間全体です。lambda interval: interval[1] は、この単純な関数の短い書き方です。コロンの前の interval が引数名で、後ろの interval[1] が自動的に返される式になります。短縮しても並べ方は変わらず、添字の数値そのものを比較するわけではありません。",
              "code": "n = int(input())\nintervals = [tuple(map(int, input().split())) for _ in range(n)]\nintervals.sort(key=lambda interval: interval[1])\nlast_end = -1\nanswer = 0\nfor start, end in intervals:\n    if start >= last_end:\n        answer += 1\n        last_end = end\nprint(answer)\n",
              "exampleInput": "5\n0 3\n1 2\n2 4\n3 5\n4 6\n",
              "output": "3\n"
            },
            {
              "title": "端点・同値・計算量を確認する",
              "body": "(0,1) と (1,2) は両方参加できるので、>= を > にした誤りを見つけられます。全会議が互いに重なるなら一場だけです。同じ区間が別々の会議として現れても、正の長さで同じ時間を使うため両方は選べません。終了が同じ場合の並びの安定性は最大個数に影響しません。会議なしと一場だけで初期値と最初の更新を確認します。ソートは O(N log N)、走査は O(N)、区間保存は O(N) 領域です。最後に一つの for しか見えなくても、全体を線形時間としてはいけません。時刻が大きくても各時刻単位を表す配列は不要で、端点の比較だけを行います。計算量は最大時刻ではなく会議数に依存し、本課の十億程度の端点も整数のまま扱えます。"
            },
            {
              "title": "次の問題で使えるかを判断する",
              "body": "新しい規則を考えたら、小さな反例を探し、さらに任意の最適解の最初を自分の選択へ交換しても悪化しないかを確認します。交換後も合法な理由や目的値が減らない理由を説明できなければ、証明は未完成です。必要なら DP、探索、別の構造へ戻り、すべてを貪欲法で解こうとしないでください。小規模の全部分集合を列挙して不重複と最大個数を調べ、結果を比較する方法は実装ミスの発見に役立ちます。ただし有限個の検査は一般の証明の代わりではありません。区間選択では最早終了が後続の可能性を保ちますが、0/1 背包の最高比率には同じ保証がありません。どちらも物を選ぶ問題という見た目ではなく、局所選択の安全性を証明する考え方を移してください。"
            }
          ],
          "checkpoints": [
            {
              "question": "開始順でなく終了順を使う理由は。",
              "answer": "早い終了は後続の可能性を減らさず、早い開始は長時間を占めることがあるためです。"
            },
            {
              "question": "報酬が異なっても同じ証明でよいですか。",
              "answer": "最初の交換で利益が減る可能性があり、再検討が必要です。"
            }
          ],
          "exerciseTitle": "最大何場に参加できるか",
          "task": "N 件の会議があり、0≤s<t≤10^9 の開始 s と終了 t を持ちます。重ならない会議を最大何件選べるか求めてください。前の終了と次の開始が等しくても構いません。各会議は同じ 1 件分です。0≤N≤200000。",
          "input": "N、その後 N 行に s t。",
          "output": "選べる会議の最大件数を出力してください。",
          "hint": "終了順に並べ、開始が直前の終了以上なら選びます。",
          "explanation": "参加可能な最早終了の会議は、最適予定の最初と交換しても後続を不可能にしません。その選択を含む最適解が存在するため、同じ選択を繰り返せます。終了順の一回の走査で実装し、開始と last_end の等号も許します。時間 O(N log N)、保存領域 O(N) です。各会議が同じ一場分という目的に依存する結論です。"
        }
      },
      "order": 23,
      "stage": "synthesis",
      "minutes": 55,
      "prerequisiteIds": [
        "knapsack"
      ],
      "relatedProblems": [
        "ABC203C",
        "ABC229C",
        "ABC185D"
      ],
      "solution": "n = int(input())\nintervals = [tuple(map(int, input().split())) for _ in range(n)]\nintervals.sort(key=lambda interval: interval[1])\nlast_end = -1\nanswer = 0\nfor start, end in intervals:\n    if start >= last_end:\n        answer += 1\n        last_end = end\nprint(answer)\n",
      "starter": "n = int(input())\nintervals = [tuple(map(int, input().split())) for _ in range(n)]\n# TODO\n",
      "tests": [
        {
          "input": "0\n",
          "expected": "0\n"
        },
        {
          "input": "1\n0 1\n",
          "expected": "1\n"
        },
        {
          "input": "2\n0 1\n1 2\n",
          "expected": "2\n"
        },
        {
          "input": "3\n0 10\n1 2\n2 3\n",
          "expected": "2\n"
        },
        {
          "input": "3\n0 3\n3 6\n2 4\n",
          "expected": "2\n"
        },
        {
          "input": "4\n1 5\n1 5\n2 5\n5 8\n",
          "expected": "2\n"
        }
      ]
    },
    {
      "id": "exam-workflow",
      "content": {
        "zh": {
          "title": "综合实战：从读题到验证",
          "summary": "把贪心、排序、前缀和与二分连接成一个有证明的方案。",
          "objectives": [
            "从限制选择可承受的复杂度",
            "证明最短前缀与原问题等价",
            "用慢解和边界独立核对优化实现"
          ],
          "sections": [
            {
              "title": "先把故事改写成可检验的任务",
              "body": "综合练习给出一组互相独立的任务，每项只需完成一次，有正整数耗时；每个询问给出一个时间预算，要求最多完成多少项。不同询问彼此独立，可以重新选择任务，不会共享已消耗时间。没有先修关系、固定执行顺序、不同收益，也没有切分任务后获得部分分数。这些条件比“任务安排”这个故事名称更重要，因为它们决定能否优先选耗时短的项目。阅读时把输入、输出、选择权限和限制写成四句话，再用一个两任务小例子确认自己理解。此处题目是算法训练模型，并不是现实考试中题目耗时已知或每题收益相同的保证；不能把算法结论机械地当成考试策略，更不能据此承诺取得某个分数。"
            },
            {
              "title": "从约束排除明显过慢的方案",
              "body": "N 与 Q 都最多二十万。如果每个预算重新扫描所有任务，即使每次只做简单加法，最坏也要四百亿次操作，不适合直接实现。如果枚举每个任务选或不选，则有 2^N 种组合，更不可能。注意所有询问共享同一组耗时，只有预算改变，因此可以把与预算无关的部分预处理一次。先把任务从短到长排序，再计算前 k 项总耗时，就能把“组合选择”压缩成“找最长可行前缀”。排序 O(N log N)，前缀和 O(N)，每个询问二分 O(log N)，总共 O(N log N+Q log N)。这里预算可达十的十八次方，不适合建立以预算为下标的 DP；数组规模应由 N 决定，而不是由最大预算决定。"
            },
            {
              "title": "证明短任务前缀已经覆盖最优数量",
              "body": "把耗时排序为 a[0]≤a[1]≤…≤a[N-1]。对任何恰好选择 k 项的集合，若包含一个较长任务却没有包含某个更短任务，可以交换二者，数量保持 k，总耗时不增加。反复交换后得到最短的 k 项，所以前 k 项总耗时是完成 k 项所需的最小时间。因此若这个前缀都超过预算，任何其他 k 项选择也不可能；若前缀没超预算，就确实存在可行选择。这样将原来的最优化问题转成一个等价判定，而不是只给出看起来不错的方案。这个证明依赖每项价值都按一项计、任务可以自由选择；若存在前置任务或不同价值，交换可能违法或损失目标值，应回到模型重新分析，不能继续使用这个前缀结论。"
            },
            {
              "title": "前缀和怎样变成二分条件",
              "body": "令 prefix[0]=0，prefix[k] 表示最短 k 项的总耗时，长度必须是 N+1。所有耗时为正，所以前缀和严格递增；即使题目允许零耗时，也至少不递减，但边界处理需继续使用正确的插入方向。预算 T 下，要找最大的 k 满足 prefix[k]≤T。bisect_right(prefix,T) 返回第一个大于 T 的位置，减一正好是最后一个不大于 T 的下标，也就是任务数量。这里输出下标而不是该位置的和值。若恰好相等，应保留那 k 项，所以不能用 bisect_left 再机械减一。prefix[0]=0 保证预算为零时至少存在零项方案，预算超过全部总和时返回 N，两个边界都可以由同一个表达式处理。",
              "code": "from bisect import bisect_right\nprefix = [0, 2, 4, 8, 13]\nfor budget in [0, 2, 4, 7, 8, 13, 100]:\n    print(budget, bisect_right(prefix, budget) - 1)\n",
              "output": "0 0\n2 1\n4 2\n7 2\n8 3\n13 4\n100 4\n"
            },
            {
              "title": "用完整输入走通一次程序",
              "body": "例如四项耗时按输入顺序为 5、2、4、2，排序后是 2、2、4、5，前缀表为 0、2、4、8、13。预算七时，最多两项，因为三项最少也需八；预算八时可以三项；预算十三时可以全部四项。输入顺序不影响可选集合，但它能帮助检测是否忘记排序。完整实现先读取 N、Q，再读 N 个耗时，构造前缀后逐条处理 Q 行预算，每次输出一个整数。请严格区分 N 项数据与 Q 个询问，不要把 Q 当成数组长度。所有查询使用同一份只读 prefix，不能因为前一个预算用掉了某些任务而删除数组元素。本题询问独立，这一输入契约已经决定了状态不应在查询之间被消耗。",
              "code": "from bisect import bisect_right\n\nn, q = map(int, input().split())\ndurations = sorted(map(int, input().split()))\nprefix = [0]\nfor duration in durations:\n    prefix.append(prefix[-1] + duration)\nfor _ in range(q):\n    budget = int(input())\n    print(bisect_right(prefix, budget) - 1)\n",
              "exampleInput": "4 7\n5 2 4 2\n0\n2\n4\n7\n8\n13\n100\n",
              "output": "0\n1\n2\n2\n3\n4\n4\n"
            },
            {
              "title": "像审核者一样设计边界测试",
              "body": "不要只复制给出的样例。针对每个容易错的决策设计一个小测试：预算零检验空前缀；预算恰好等于某个前缀检验等号；预算比该前缀小一检验二分边界；重复耗时检验是否错误去重；原数据逆序检验排序；预算大于总和检验最后位置；十亿级耗时与巨大预算检验是否错误按预算建表。小规模还可枚举全部子集，对每个预算计算最多可选件数，再与优化解对比，这个慢解不依赖排序结论，是更独立的验证。若出现差异，依次检查读入值、排序结果、prefix、二分返回位置，不要直接修改最后的减一。把第一次产生不一致的中间状态找到，通常能比反复尝试 >= 与 > 更快定位根因。"
            },
            {
              "title": "把一次解题整理为可重复的流程",
              "body": "完成这道综合题后，把解题过程压缩成可复用的七步：用自己的话复述任务；从约束估算可承受的运算量；先想正确的慢方法；找到可以预处理或合并的信息；证明优化保留答案；实现并用针对性边界测试；最后核对输入输出与复杂度。考试中遇到陌生题，先完成其中最确定的部分，不要在未理解状态时长时间盲写。保留一个能运行的小版本，比同时修改读入、算法和输出更容易检查。事后复盘应记录实际误解与反例，例如“把独立询问当成连续操作”，而不是只抄下“使用二分”这样的标签。课程提供的是从概念到实现与自证的训练路径；是否真正掌握，需要在不同题目中独立重建推理，并持续检验结果，而不是依赖完成课数或某个训练分。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么用 bisect_right 而不是 bisect_left？",
              "answer": "预算恰好等于某个前缀时该方案合法，需要找到第一个严格大于预算的位置后减一。"
            },
            {
              "question": "若任务有先修关系，最短前缀一定仍最优吗？",
              "answer": "不一定，交换为更短任务可能违反依赖，原证明的自由选择条件被破坏。"
            }
          ],
          "exerciseTitle": "多个预算下最多完成多少任务",
          "task": "有 N 个独立任务，耗时为正整数 a_i。每项最多做一次，所有任务都按完成一项计，顺序不限，无先修关系。给出 Q 个彼此独立的预算 T；对每个预算，输出总耗时不超过 T 时最多能完成的任务数。每次询问可重新选择全部任务。1≤N,Q≤200000，1≤a_i≤10^9，0≤T≤10^18。",
          "input": "第一行 N Q；第二行 N 个耗时；接下来 Q 行每行一个预算 T。",
          "output": "对每个预算输出一行最大任务数。",
          "hint": "最短 k 项是完成 k 项的最小耗时；排序前缀和后寻找最后一个不超过预算的位置。",
          "explanation": "排序后前 k 项通过交换论证具有所有 k 项选择中的最小总耗时。构造含零项的 prefix 表，单调递增。每个独立预算使用 bisect_right 找第一个超预算的位置，再减一得到可行的最大任务数。排序与预处理只做一次，询问不修改表。总时间 O(N log N+Q log N)，空间 O(N)；这不是对真实考试得分的预测。"
        },
        "en": {
          "title": "Integrated practice: from statement to verification",
          "summary": "Connect greedy reasoning, sorting, prefix sums, and binary search into a proved solution.",
          "objectives": [
            "Choose feasible complexity from constraints",
            "Prove equivalence to shortest prefixes",
            "Check the optimized solution with boundaries and a slow oracle"
          ],
          "sections": [
            {
              "title": "Translate the story into a precise contract",
              "body": "The integrated exercise gives independent tasks with positive integer durations. Each can be completed once, and each query asks for the largest number finishable within its own time budget. Queries are independent: they do not share consumed time or completed tasks. There are no prerequisites, fixed order, unequal rewards, or partial completion. These conditions matter more than the scheduling story because they determine whether shortest tasks can be preferred. Write down inputs, outputs, selection freedom, and restrictions before coding. This is an algorithmic model, not a claim that real exam problems have known durations or equal value, and it cannot promise an exam score."
            },
            {
              "title": "Let constraints eliminate slow approaches",
              "body": "Both N and Q can reach two hundred thousand. Scanning every task for every query can require forty billion operations, while subset enumeration is exponentially worse. All queries share the same durations, so preprocess the budget-independent work once. Sort durations and compute the total time of the first k tasks, reducing selection to finding the longest feasible prefix. Sorting costs O(N log N), prefix construction O(N), and each binary search O(log N). Budgets may be as large as ten to the eighteenth, ruling out a table indexed by budget. The data structure should scale with the task count, not with the largest numeric time value."
            },
            {
              "title": "Prove that shortest prefixes are sufficient",
              "body": "Sort durations in nondecreasing order. For any set of k tasks, if it contains a longer task while excluding a shorter one, exchange them. The count remains k and total time cannot increase. Repeating exchanges produces the shortest k tasks, so their prefix sum is the minimum time needed for k completions. If that minimum exceeds the budget, no other k-task selection can work; if it fits, a feasible selection exists. This proves equivalence, not merely a reasonable heuristic. Prerequisites or unequal rewards would invalidate the exchange because replacement could become illegal or worsen the actual objective."
            },
            {
              "title": "Connect prefix sums to binary search",
              "body": "Set prefix[0] to zero and let prefix[k] be the total duration of the shortest k tasks. There are N plus one entries. Positive durations make the sequence strictly increasing. For budget T, find the largest index k with prefix[k] at most T. bisect_right returns the first position whose value is greater than T, so subtracting one yields the desired index. Return that index, not the sum stored there. Equality must count as feasible, making bisect_left minus one incorrect. The zero prefix handles a zero budget, and a budget beyond the total yields N using the same expression.",
              "code": "from bisect import bisect_right\nprefix = [0, 2, 4, 8, 13]\nfor budget in [0, 2, 4, 7, 8, 13, 100]:\n    print(budget, bisect_right(prefix, budget) - 1)\n",
              "output": "0 0\n2 1\n4 2\n7 2\n8 3\n13 4\n100 4\n"
            },
            {
              "title": "Walk through one complete input",
              "body": "For input durations 5,2,4,2, sorting gives 2,2,4,5 and prefixes 0,2,4,8,13. Budget seven allows two tasks because even the cheapest three need eight; budget eight allows three; thirteen allows all four. Unsorted input catches a missing sort. Read N and Q, then N durations, build the prefixes once, and process Q budget lines with one integer output each. Do not confuse task count with query count. Every query uses the same read-only prefix table. Removing tasks after a query would incorrectly share state between independent scenarios, contradicting the input contract established before coding.",
              "code": "from bisect import bisect_right\n\nn, q = map(int, input().split())\ndurations = sorted(map(int, input().split()))\nprefix = [0]\nfor duration in durations:\n    prefix.append(prefix[-1] + duration)\nfor _ in range(q):\n    budget = int(input())\n    print(bisect_right(prefix, budget) - 1)\n",
              "exampleInput": "4 7\n5 2 4 2\n0\n2\n4\n7\n8\n13\n100\n",
              "output": "0\n1\n2\n2\n3\n4\n4\n"
            },
            {
              "title": "Design tests as a reviewer would",
              "body": "Build tests around decisions, not just around the published sample. Zero budget checks the empty prefix. Exact equality checks the comparison. One less than a prefix tests the binary-search boundary. Duplicate durations catch accidental deduplication; reversed input catches missing sorting; an oversized budget checks the final index. Large numeric values expose attempts to allocate by budget. For small N, enumerate all subsets and independently maximize feasible count for each budget. If results differ, inspect parsed input, sorted durations, prefix sums, and the insertion index in that order. Find the first inconsistent intermediate state rather than randomly changing comparison operators."
            },
            {
              "title": "Turn one solution into a repeatable workflow",
              "body": "Summarize the process into a repeatable sequence: restate the task, estimate feasible work from constraints, invent a correct slow approach, identify reusable information, prove the optimization, implement with targeted tests, and verify formatting and complexity. For an unfamiliar problem, finish the parts you understand rather than writing blindly before the state is clear. A small runnable version is easier to inspect than simultaneous changes to parsing, algorithm, and output. In review notes, record the actual misconception and counterexample, such as treating independent queries as cumulative actions, rather than only a technique label. Mastery requires rebuilding the reasoning on new problems, not accumulating lesson counts or training points."
            }
          ],
          "checkpoints": [
            {
              "question": "Why use bisect_right instead of bisect_left?",
              "answer": "Equality is feasible, so search for the first strictly greater prefix and subtract one."
            },
            {
              "question": "Do shortest prefixes remain valid with prerequisites?",
              "answer": "Not necessarily. Exchanging tasks may violate dependencies and invalidate the proof."
            }
          ],
          "exerciseTitle": "Maximum tasks for many budgets",
          "task": "There are N independent tasks with positive durations a_i. Each may be completed once, all count equally, and order is unrestricted with no prerequisites. For each of Q independent budgets T, find the maximum number whose total duration is at most T. All tasks are available anew in every query. 1≤N,Q≤200000, 1≤a_i≤10^9, 0≤T≤10^18.",
          "input": "N Q; then N durations on one line; then Q lines each containing T.",
          "output": "Print the maximum task count for each budget on its own line.",
          "hint": "The shortest k tasks minimize the time for k completions. Search their prefix sums for the last value within budget.",
          "explanation": "An exchange argument shows that the shortest k tasks have minimum total duration among all k-task sets. Build increasing prefix sums including zero tasks. For each independent budget, bisect_right finds the first sum exceeding it; subtract one to obtain the largest feasible count. Preprocess once and do not modify the table between queries. Time O(N log N+Q log N), space O(N). This model does not predict real examination scores."
        },
        "ja": {
          "title": "総合演習：読解から検証まで",
          "summary": "貪欲の根拠・ソート・累積和・二分を証明つきの解法へ結ぶ。",
          "objectives": [
            "制約から可能な計算量を選ぶ",
            "最短接頭辞との同値性を示す",
            "境界と遅い解法で独立に検証する"
          ],
          "sections": [
            {
              "title": "文章を検査できる仕様にする",
              "body": "総合演習では、互いに独立した仕事に正の整数の所要時間があり、各仕事は一回だけ完了できます。各問い合わせは独立した時間予算を与え、その範囲で最大何個できるかを尋ねます。別の問い合わせでは最初から選び直し、消費時間や完了済みの仕事を共有しません。先行条件、固定順序、異なる報酬、途中までの完了による得点はありません。この条件こそが、短い仕事を先に選んでよいかを決めます。物語の題名だけで判断せず、入力、出力、選択の自由、制限を四つの文で書きます。これは算法の練習モデルであり、現実の試験の所要時間が既知で配点も同じという保証ではありません。結論を試験戦略へ無条件に移したり、特定の得点を約束したりしないでください。"
            },
            {
              "title": "制約から遅すぎる方法を除く",
              "body": "N と Q はどちらも最大二十万です。問い合わせごとに全仕事を走査すると、単純な加算だけでも最悪四百億回になり、直接実装する方法には向きません。各仕事を選ぶかどうか全列挙すれば 2^N 通りで、さらに不可能です。全問い合わせは同じ所要時間を共有し、違うのは予算だけなので、予算に依存しない計算を一度だけ行います。短い順に並べて先頭 k 個の合計を作れば、組合せ選択を最長の実行可能な接頭辞へ変換できます。ソート O(N log N)、前計算 O(N)、各検索 O(log N) です。予算は十の十八乗まであるため、予算を添字とする DP 表は作れません。配列の大きさは最大時間でなく仕事数に依存させるべきです。"
            },
            {
              "title": "短い仕事の接頭辞で十分と証明する",
              "body": "所要時間を小さい順に a[0]≤a[1]≤…≤a[N-1] と並べます。任意の k 個の選択に、選ばれていない短い仕事より長い仕事が含まれるなら交換します。個数は k のままで合計時間は増えません。交換を繰り返すと最短の k 個になり、その接頭辞和が k 個完了するための最小時間だと分かります。この最小値さえ予算を超えれば他のどの k 個も不可能で、超えなければ実際にその選択が使えます。単に良さそうな案ではなく、元の最適化と同値な判定へ変えたことになります。各仕事が一個分という同じ価値を持ち、自由に選べることが前提です。先行条件や異なる価値があれば交換が違法になったり目的値を減らしたりするため、モデルから考え直します。"
            },
            {
              "title": "累積和から二分探索の条件を作る",
              "body": "prefix[0]=0 とし、prefix[k] を最短 k 個の時間合計にします。長さは N+1 です。所要時間が正なので累積和は厳密に増加します。もし零時間を許す別問題でも非減少にはなりますが、境界でどちら側へ挿入するかを引き続き正しく選ぶ必要があります。予算 T に対し prefix[k]≤T を満たす最大の k が欲しいので、T より大きい最初の位置を返す bisect_right から一を引きます。その添字が仕事数であり、保存されている合計値を答えるのではありません。ちょうど等しいときも選べるため、bisect_left から一を引く形は誤りです。零の接頭辞により予算零では零個、全合計を超える予算では N 個となり、一つの式で両端も扱えます。",
              "code": "from bisect import bisect_right\nprefix = [0, 2, 4, 8, 13]\nfor budget in [0, 2, 4, 7, 8, 13, 100]:\n    print(budget, bisect_right(prefix, budget) - 1)\n",
              "output": "0 0\n2 1\n4 2\n7 2\n8 3\n13 4\n100 4\n"
            },
            {
              "title": "完全な入力を最後まで処理する",
              "body": "所要時間が入力順に 5,2,4,2 なら、ソート後は 2,2,4,5、累積和は 0,2,4,8,13 です。予算七では三個に最低八かかるので二個、予算八なら三個、十三なら全部の四個を選べます。順不同の入力はソート忘れを見つけるのにも役立ちます。完成版は N と Q、続いて N 個の時間を読み、累積和を一度だけ作ってから Q 行の予算を処理し、各行に整数一つを出力します。仕事数 N と問い合わせ数 Q を混同して配列長を決めないでください。すべての問い合わせは同じ読み取り専用の prefix を使います。前の問い合わせで使った仕事を消すと、独立な場面の間で状態を共有してしまいます。何を使い回してよいかは、最初に確認した入力の約束から決まります。",
              "code": "from bisect import bisect_right\n\nn, q = map(int, input().split())\ndurations = sorted(map(int, input().split()))\nprefix = [0]\nfor duration in durations:\n    prefix.append(prefix[-1] + duration)\nfor _ in range(q):\n    budget = int(input())\n    print(bisect_right(prefix, budget) - 1)\n",
              "exampleInput": "4 7\n5 2 4 2\n0\n2\n4\n7\n8\n13\n100\n",
              "output": "0\n1\n2\n2\n3\n4\n4\n"
            },
            {
              "title": "検査する側の目で境界例を作る",
              "body": "提示された例を写すだけでなく、判断ごとに小さな検査を作ります。予算零は空の接頭辞、累積和と同額の予算は等号、一だけ小さい予算は二分の境界、同じ所要時間は誤った重複除去、逆順の入力はソート忘れ、全合計より大きい予算は末尾位置を確認します。十億程度の所要時間と巨大な予算は、予算サイズの配列を作っていないかも確認できます。小さい N なら全部分集合を列挙し、各予算で可能な最大個数を独立に求めて比較します。この遅い解法はソートの結論に依存しない検算です。不一致が出たら、読み取り値、ソート結果、prefix、挿入位置の順に見てください。最後の一を引く操作や不等号を無作為に変えるより、初めて違った中間状態を探す方が原因へ近づきます。"
            },
            {
              "title": "一問の経験を繰り返せる手順にする",
              "body": "この総合問題の過程を、課題を言い換える、制約から可能な演算量を見積もる、正しい遅い方法を考える、再利用できる情報を探す、最適化で答えが変わらないと証明する、実装して狙った境界を試す、入出力と計算量を確認する、という手順へ整理します。未知の問題では状態が不明なまま長時間書くより、確実に理解した部分を先に完成させます。小さく動く版を保つと、読み取り・算法・出力を同時に変えるより確認しやすくなります。復習には単に二分探索と記すのでなく、独立な質問を連続操作と誤解した、という実際の誤解と反例を残してください。理解の確認は別の問題で推論を自力で組み直すことです。受講数や練習点数だけで身についたと判断しないようにします。"
            }
          ],
          "checkpoints": [
            {
              "question": "bisect_left ではなく bisect_right を使う理由は。",
              "answer": "予算と等しい累積和も合法なので、厳密に大きい最初の位置から一を引きます。"
            },
            {
              "question": "先行条件があっても最短接頭辞でよいですか。",
              "answer": "交換が依存関係を破る可能性があり、同じ証明は使えません。"
            }
          ],
          "exerciseTitle": "複数予算で完了できる最大仕事数",
          "task": "N 個の独立した仕事に正の所要時間 a_i があります。各仕事は一回まで、どれも一個分で、順序と先行条件はありません。独立した Q 個の予算 T ごとに、合計時間が T 以下となる最大仕事数を求めます。各問い合わせでは全仕事から選び直せます。1≤N,Q≤200000、1≤a_i≤10^9、0≤T≤10^18 です。",
          "input": "N Q、次の行に N 個の時間、その後 Q 行に予算 T。",
          "output": "各予算の最大仕事数を一行ずつ出力してください。",
          "hint": "最短 k 個が k 個に必要な最小時間です。ソート後の累積和で予算以下の最後の位置を探します。",
          "explanation": "交換論証により、最短 k 個は k 個の集合の中で合計時間が最小です。零個を含む単調増加の累積和を作り、独立した各予算について bisect_right で超過する最初の位置を探し、一を引いて最大個数にします。前処理は一回で、問い合わせ間で表を変更しません。時間 O(N log N+Q log N)、領域 O(N) です。現実の試験得点を予測するモデルではありません。"
        }
      },
      "order": 24,
      "stage": "synthesis",
      "minutes": 60,
      "prerequisiteIds": [
        "greedy"
      ],
      "relatedProblems": [
        "ABC312C",
        "ABC172C",
        "ABC228C"
      ],
      "solution": "from bisect import bisect_right\n\nn, q = map(int, input().split())\ndurations = sorted(map(int, input().split()))\nprefix = [0]\nfor duration in durations:\n    prefix.append(prefix[-1] + duration)\nfor _ in range(q):\n    budget = int(input())\n    print(bisect_right(prefix, budget) - 1)\n",
      "starter": "from bisect import bisect_right\n\nn, q = map(int, input().split())\ndurations = list(map(int, input().split()))\n# TODO\n",
      "tests": [
        {
          "input": "1 4\n5\n0\n4\n5\n6\n",
          "expected": "0\n0\n1\n1\n"
        },
        {
          "input": "4 7\n5 2 4 2\n0\n2\n4\n7\n8\n13\n100\n",
          "expected": "0\n1\n2\n2\n3\n4\n4\n"
        },
        {
          "input": "3 3\n1 1 1\n1\n2\n3\n",
          "expected": "1\n2\n3\n"
        },
        {
          "input": "2 5\n1000000000 1000000000\n999999999\n1000000000\n1999999999\n2000000000\n1000000000000000000\n",
          "expected": "0\n1\n1\n2\n2\n"
        },
        {
          "input": "5 4\n9 7 5 3 1\n1\n4\n8\n9\n",
          "expected": "1\n2\n2\n3\n"
        }
      ]
    },
    {
      "id": "files-and-parsing",
      "content": {
        "zh": {
          "title": "读取数据文件",
          "summary": "打开考试提供的数据文件，把每一行变成记录，再按要求的格式输出结果。",
          "objectives": [
            "用 with 和明确的编码打开文件，并逐行读取",
            "把行拆成有类型的字段，跳过空行和注释，用字典分组汇总",
            "一次性组织输出，并检查末行没有换行等边界情况"
          ],
          "sections": [
            {
              "title": "数据从哪里来",
              "body": "上机考试中，输入常常不是逐行键入的，而是一个文件：题目给出 data.txt 这样的文件名，程序从当前目录打开它。读文件和读标准输入是同一种能力，只是来源不同。open('data.txt', encoding='utf-8') 返回一个文件对象；with 语句在代码块结束时自动关闭文件，即使中途出错也一样。务必写明编码：默认编码取决于操作系统，含日文的文件可能在一台机器上正常、在另一台上解码失败。\n\ndata.txt 这样的相对路径是相对于工作目录，而不是脚本所在的文件夹，所以考试会说明在哪里运行程序。在本课程和题目工作区中，数据文件会在代码运行之前放进工作目录，open('data.txt') 的行为与在终端里完全相同。",
              "code": "with open('data.txt', encoding='utf-8') as f:\n    text = f.read()\nprint(len(text))\nprint(repr(text[:12]))\n",
              "exampleFiles": {
                "data.txt": "alice 82\nbob 75\n"
              },
              "output": "16\n'alice 82\\nbob'\n"
            },
            {
              "title": "每一行都带着换行符",
              "body": "遍历文件对象时每次得到一行，除最后一行可能例外，每行末尾都带有 '\\n'。直接 print 这一行会多出一个空行，拿它和单词比较也会失败。line.rstrip('\\n') 只去掉换行；line.strip() 还会去掉两端的空格以及 Windows 的 '\\r'；line.split() 去掉所有空白，返回各个字段。要有意识地选择：行内空格有意义时（例如句子）只去掉末尾；一行由若干字段组成时，split() 最稳妥。\n\n逐行遍历对大文件也省内存，而 f.read() 一次读入全部内容，对考试中的数据规模没有问题。一个常见错误是在循环里调用 f.readline()，却不检查表示文件结束的空字符串；for 循环会替你处理这件事。",
              "code": "with open('data.txt', encoding='utf-8') as f:\n    for line in f:\n        print(repr(line), line.split())\n",
              "exampleFiles": {
                "data.txt": "alice 82\n  bob   75 \n"
              },
              "output": "'alice 82\\n' ['alice', '82']\n'  bob   75 \\n' ['bob', '75']\n"
            },
            {
              "title": "从字段到有类型的记录",
              "body": "split() 返回的是字符串，数字需要转换：name, score = line.split() 之后再 int(score)。解包到具名变量同时检查了字段个数：多一个字段的行会立即引发 ValueError，而不是悄悄错位。字段个数不定时，用切片 words[1:]，或者带星号的写法 name, *values = line.split()。逗号分隔的数据用 line.split(',') 会保留字段两侧的空格，需要逐个 strip，或者使用 csv 模块。\n\n读入时就完成转换，把记录存成元组，例如 (name, subject, score)；之后的代码只处理干净的值，不必再次解析文本。时间和日期的表示也要尽早决定：把 09:05:30 换算成 32730 秒，比较和求差都变成简单的整数运算。",
              "code": "def seconds(clock):\n    h, m, s = map(int, clock.split(':'))\n    return h * 3600 + m * 60 + s\n\nrecords = []\nwith open('log.txt', encoding='utf-8') as f:\n    for line in f:\n        clock, user, status = line.split()\n        records.append((seconds(clock), user, int(status)))\nprint(records)\n",
              "exampleFiles": {
                "log.txt": "09:00:00 alice 200\n09:05:30 bob 500\n"
              },
              "output": "[(32400, 'alice', 200), (32730, 'bob', 500)]\n"
            },
            {
              "title": "跳过不是数据的行",
              "body": "真实的文件里有空行、注释和表头。先判断出它们再 continue：if not line.strip() or line.lstrip().startswith('#'): continue。表示个数的表头（例如第一行是 N）可以在循环之前用 next(f) 或 f.readline() 读出，调试时再核对记录数是否与它一致。\n\n另一种写法是用 open(...).read().split() 一次读出全部记号。它完全忽略行结构，适合整个文件就是一串数字的情形：第一个记号是个数，其余是数值。只在行的边界没有意义时才这样做，因为字段个数不固定时，它分不清一条记录在哪里结束。无论哪种写法，都把解析集中在一处——一个函数或者程序的开头——让其余代码只面对记录，而不是原始文本。",
              "code": "tokens = open('grid.txt', encoding='utf-8').read().split()\nh, w = int(tokens[0]), int(tokens[1])\nrows = tokens[2:2 + h]\nprint(h, w, rows)\n",
              "exampleFiles": {
                "grid.txt": "3 4\n#..#\n....\n##.#\n"
              },
              "output": "3 4 ['#..#', '....', '##.#']\n"
            },
            {
              "title": "用字典分组",
              "body": "关于数据文件的问题，问的通常是每个键的总和、每个类别的个数，或者每组包含哪些元素。从键到累计值的字典能直接表达这些：totals[name] = totals.get(name, 0) + score 维护累加和；groups.setdefault(key, []).append(item) 建立列表；collections.Counter 统计出现次数；collections.defaultdict(int) 或 defaultdict(list) 则省去了 get 和 setdefault。\n\n分组之后再排序，得到最终顺序：sorted(totals.items(), key=lambda kv: (-kv[1], kv[0])) 让总和大的在前，相同时按名字排列。次序规则必须与题目完全一致；题目说按名字的字典序时，对 ASCII 名字直接比较字符串就是对的。字典会保持插入顺序，但题目规定了别的顺序时，依赖它来输出是靠不住的。",
              "code": "from collections import defaultdict\n\ntotals = defaultdict(int)\nwith open('scores.txt', encoding='utf-8') as f:\n    for line in f:\n        name, subject, score = line.split()\n        totals[name] += int(score)\nfor name, total in sorted(totals.items(), key=lambda kv: (-kv[1], kv[0])):\n    print(name, total)\n",
              "exampleFiles": {
                "scores.txt": "bob math 70\nalice math 82\nbob english 90\nalice english 78\ncarol math 95\n"
              },
              "output": "alice 160\nbob 160\ncarol 95\n"
            },
            {
              "title": "一次性写出输出",
              "body": "输出格式是逐个字符核对的，所以要严格按规定构造每一行：分隔符、小数位数和大小写都不能错。f 字符串能满足大部分需要：f'{name} {total}'，或者用 f'{ratio:.3f}' 保留三位小数。行数很多时，把字符串收集到列表里，最后用 print('\\n'.join(lines)) 一次输出；这比成千上万次 print 更快，也方便在输出前检查结果。\n\nprint 本身会加换行，所以 join 的结果末尾不要再加一个。没有内容可输出时（例如某一组为空），要确认题目要求的是空行、占位符，还是什么都不输出。如果考试要求写入文件而不是打印，就用 'w' 模式打开，写入同样拼好的文本，并在末尾加一个换行。",
              "code": "rows = [('alice', 160), ('bob', 160), ('carol', 95)]\nlines = [f'{name:<6}{total:>4}' for name, total in rows]\nprint('\\n'.join(lines))\naverage = sum(total for _, total in rows) / len(rows)\nprint(f'average {average:.2f}')\n",
              "output": "alice  160\nbob    160\ncarol   95\naverage 138.33\n"
            },
            {
              "title": "用小文件测试",
              "body": "不要只拿考试给的大文件运行，而要自己做几个小文件，每个只针对一条规则：只有一条记录的文件检查最基本的情况；含空行和注释的文件检查跳过逻辑；最后一行没有换行的文件检查末条记录有没有丢；键重复的文件检查分组；同分的文件检查排序。运行之前先手算出答案，再与程序的输出比较。\n\n对大文件，打印中间的计数，例如读到的记录数、不同键的个数，再用文本编辑器或终端里的 wc -l 粗略核对。答案错了时，找出第一个不一致的阶段——读入、解析、分组还是输出——而不是同时改动好几处。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么在 for line in f 中直接 print(line) 通常是错的？",
              "answer": "每行末尾已经有换行，print 又加了一个，于是出现空行。应先 strip 或 split。"
            },
            {
              "question": "什么时候不适合用 open(...).read().split()？",
              "answer": "行的边界有意义时，例如每条记录的字段数不固定；不同行的记号会混在一起，无法区分。"
            }
          ],
          "exerciseTitle": "成绩汇总",
          "task": "文件 scores.txt 每行一条记录，格式为“姓名 科目 分数”，分数是 0 到 100 的整数。空行和以 # 开头的行是注释。对每个学生，求其分数总和与记录条数，并按总分从高到低输出所有学生；总分相同时按姓名的字典序。",
          "input": "没有标准输入。从当前目录读取 scores.txt。至少有一条记录；姓名和科目都由小写英文字母组成。",
          "output": "每个学生输出一行：姓名、总分、记录条数，以空格分隔。",
          "hint": "先跳过空行和注释行，再把每条记录拆成三个字段。用两个字典累计总分和条数，排序时用键 (-总分, 姓名)。",
          "explanation": "逐行读取文件，跳过 strip() 之后为空的行，以及第一个非空白字符是 # 的行。其余每行恰好拆成三个字段，分数用 int 转换。以姓名为键，用字典累计总分和条数。按键 (-总分, 姓名) 排序，总分大的在前，总分相同时按字母顺序。R 条记录的时间为 O(R log R)。最后一行没有换行、或者使用 Windows 换行的文件也能正确处理，因为 split() 不依赖换行符。"
        },
        "en": {
          "title": "Reading data files",
          "summary": "Open the files an exam provides, turn each line into a record, and print the results in exactly the required format.",
          "objectives": [
            "Open a file by name with with and an explicit encoding, and read it line by line",
            "Split lines into typed fields, skip blank and comment lines, and group records in dictionaries",
            "Assemble the output in one pass and check edge cases such as a missing final newline"
          ],
          "sections": [
            {
              "title": "Where the data comes from",
              "body": "In the programming exam, input often arrives as a file rather than as typed lines: the statement names a file such as data.txt, and your program opens it from the current directory. Reading a file and reading standard input are the same skill with a different source. open('data.txt', encoding='utf-8') returns a file object, and the with statement closes it when the block ends, even if an error occurs. Always state the encoding: the default depends on the operating system, and a file containing Japanese text may decode on one machine and fail on another.\n\nA relative name such as data.txt is resolved against the working directory, not the folder that contains your script, which is why the exam says where to run the program. In this course and in the problem workspace, data files are placed in the working directory before your code runs, so open('data.txt') behaves exactly as it does in a terminal.",
              "code": "with open('data.txt', encoding='utf-8') as f:\n    text = f.read()\nprint(len(text))\nprint(repr(text[:12]))\n",
              "exampleFiles": {
                "data.txt": "alice 82\nbob 75\n"
              },
              "output": "16\n'alice 82\\nbob'\n"
            },
            {
              "title": "Lines keep their newline",
              "body": "Iterating over a file yields one line at a time, and every line except possibly the last still ends with '\\n'. Printing such a line produces an extra blank line, and comparing it with a word fails. line.rstrip('\\n') removes only the newline; line.strip() also removes surrounding spaces and a Windows '\\r'; line.split() discards all whitespace and returns the fields. Choose deliberately: when spaces inside the line matter, as in a sentence, strip only the end; when a line is a list of fields, split() is the safest choice.\n\nIterating line by line also keeps memory small for large files, while f.read() loads everything at once, which is fine at exam sizes. A common bug is calling f.readline() in a loop without checking for the empty string that marks the end of the file; a for loop handles that for you.",
              "code": "with open('data.txt', encoding='utf-8') as f:\n    for line in f:\n        print(repr(line), line.split())\n",
              "exampleFiles": {
                "data.txt": "alice 82\n  bob   75 \n"
              },
              "output": "'alice 82\\n' ['alice', '82']\n'  bob   75 \\n' ['bob', '75']\n"
            },
            {
              "title": "From fields to typed records",
              "body": "split() returns strings, so numbers must be converted: name, score = line.split() followed by int(score). Unpacking into named variables also checks the field count: a line with an extra field raises ValueError at once instead of silently shifting the columns. When the number of fields varies, use a slice such as words[1:] or the starred form name, *values = line.split(). For comma-separated data, line.split(',') keeps the spaces around fields, so strip each part or use the csv module.\n\nConvert once, while reading, and store records as tuples such as (name, subject, score); the rest of the program then works with clean values and never parses text twice. Decide early how to represent times and dates: converting 09:05:30 to 32730 seconds turns comparisons and differences into plain integer arithmetic.",
              "code": "def seconds(clock):\n    h, m, s = map(int, clock.split(':'))\n    return h * 3600 + m * 60 + s\n\nrecords = []\nwith open('log.txt', encoding='utf-8') as f:\n    for line in f:\n        clock, user, status = line.split()\n        records.append((seconds(clock), user, int(status)))\nprint(records)\n",
              "exampleFiles": {
                "log.txt": "09:00:00 alice 200\n09:05:30 bob 500\n"
              },
              "output": "[(32400, 'alice', 200), (32730, 'bob', 500)]\n"
            },
            {
              "title": "Skipping what is not data",
              "body": "Real files contain blank lines, comments and headers. Test for them first and continue: if not line.strip() or line.lstrip().startswith('#'): continue. A header that gives a count, such as a first line N, can be read with next(f) or f.readline() before the loop; while debugging, check that the number of records agrees with it.\n\nAnother style reads every token at once with open(...).read().split(). It ignores line structure entirely and suits a file that is just a stream of numbers: the first token is the count and the rest are values. Use it only when line boundaries carry no meaning, because with a varying number of fields it cannot tell where one record ends. Whichever style you choose, keep the parsing in one place, a function or the top of the program, so that the rest of the code sees records and never raw text.",
              "code": "tokens = open('grid.txt', encoding='utf-8').read().split()\nh, w = int(tokens[0]), int(tokens[1])\nrows = tokens[2:2 + h]\nprint(h, w, rows)\n",
              "exampleFiles": {
                "grid.txt": "3 4\n#..#\n....\n##.#\n"
              },
              "output": "3 4 ['#..#', '....', '##.#']\n"
            },
            {
              "title": "Grouping with dictionaries",
              "body": "Questions about data files usually ask for a total per key, a count per category or the members of each group. A dictionary from key to accumulated value expresses this directly. totals[name] = totals.get(name, 0) + score keeps a running sum; groups.setdefault(key, []).append(item) builds lists; collections.Counter counts occurrences; and collections.defaultdict(int) or defaultdict(list) removes the need for get and setdefault.\n\nAfter grouping, sorting produces the final order: sorted(totals.items(), key=lambda kv: (-kv[1], kv[0])) puts the largest totals first and breaks ties by name. The tie-break must match the statement exactly; when it says lexicographic order of names, plain string comparison is correct for ASCII names. Dictionaries keep insertion order, but relying on it for output is fragile when the statement asks for a different order.",
              "code": "from collections import defaultdict\n\ntotals = defaultdict(int)\nwith open('scores.txt', encoding='utf-8') as f:\n    for line in f:\n        name, subject, score = line.split()\n        totals[name] += int(score)\nfor name, total in sorted(totals.items(), key=lambda kv: (-kv[1], kv[0])):\n    print(name, total)\n",
              "exampleFiles": {
                "scores.txt": "bob math 70\nalice math 82\nbob english 90\nalice english 78\ncarol math 95\n"
              },
              "output": "alice 160\nbob 160\ncarol 95\n"
            },
            {
              "title": "Writing output in one pass",
              "body": "Output is checked character by character, so build each line exactly as specified: separators, decimal places and capitalisation all count. f-strings cover most needs: f'{name} {total}', or f'{ratio:.3f}' for three decimals. For many lines, collect strings in a list and print '\\n'.join(lines) once at the end; this is faster than thousands of separate print calls and lets you inspect the result before printing.\n\nprint already adds a newline, so the joined text must not end with another. When there is nothing to print, such as an empty group, check whether the statement wants an empty line, a placeholder or no line at all. If the exam asks you to write a file instead, open it with 'w' and write the same joined text followed by one final newline.",
              "code": "rows = [('alice', 160), ('bob', 160), ('carol', 95)]\nlines = [f'{name:<6}{total:>4}' for name, total in rows]\nprint('\\n'.join(lines))\naverage = sum(total for _, total in rows) / len(rows)\nprint(f'average {average:.2f}')\n",
              "output": "alice  160\nbob    160\ncarol   95\naverage 138.33\n"
            },
            {
              "title": "Testing with small files",
              "body": "Do not only run the large file from the exam; make tiny files of your own that each target one rule. A file with a single record checks the base case; one with a blank line and a comment checks skipping; one whose last line has no newline checks that the final record is not lost; duplicate keys check grouping; ties check the order. Work out the expected answers by hand before you run the program and compare.\n\nFor large files, print intermediate counts such as the number of records read and the number of distinct keys, and compare them with a quick look in a text editor or with wc -l in a terminal. When an answer is wrong, find the first stage that disagrees, reading, parsing, grouping or printing, instead of changing several things at once."
            }
          ],
          "checkpoints": [
            {
              "question": "Why is print(line) inside for line in f usually wrong?",
              "answer": "Each line already ends with a newline and print adds another, producing blank lines. Strip or split the line first."
            },
            {
              "question": "When is open(...).read().split() a poor choice?",
              "answer": "When line boundaries matter, for example when records have different numbers of fields; tokens from different lines become indistinguishable."
            }
          ],
          "exerciseTitle": "Score report",
          "task": "The file scores.txt holds one record per line in the form “name subject score”, where the score is an integer from 0 to 100. Blank lines and lines starting with # are comments. For every student, compute the total of their scores and the number of their records, and print all students in decreasing order of total, breaking ties by name in lexicographic order.",
          "input": "There is no standard input. Read scores.txt from the current directory. There is at least one record, and names and subjects consist of lowercase letters.",
          "output": "For each student, print the name, the total and the number of records on one line, separated by spaces.",
          "hint": "Skip blank and comment lines first, then split each record into three fields. Keep the totals and counts in two dictionaries and sort with the key (-total, name).",
          "explanation": "Read the file line by line, skipping lines that are empty after strip() and lines whose first non-space character is #. Every remaining line splits into exactly three fields; convert the score with int. Accumulate totals and counts in dictionaries keyed by name. Sorting with the key (-total, name) puts larger totals first and orders equal totals alphabetically. The work is O(R log R) for R records. Files whose last line has no newline, or that use Windows line endings, work too, because split() does not depend on the newline characters."
        },
        "ja": {
          "title": "データファイルを読む",
          "summary": "試験で与えられるファイルを開き、各行をレコードに変換し、指定どおりの形式で結果を出力します。",
          "objectives": [
            "with と明示的なエンコーディングでファイルを開き、行ごとに読む",
            "行を型のあるフィールドに分け、空行やコメントを飛ばし、辞書で集計する",
            "出力をまとめて書き出し、最終行に改行がない場合などの境界を確かめる"
          ],
          "sections": [
            {
              "title": "データはどこから来るか",
              "body": "プログラミング試験では、入力が 1 行ずつ打ち込まれるのではなく、ファイルとして与えられることがよくあります。問題文が data.txt のようなファイル名を示し、プログラムはカレントディレクトリからそれを開きます。ファイルを読むことと標準入力を読むことは、入力元が違うだけの同じ技術です。open('data.txt', encoding='utf-8') はファイルオブジェクトを返し、with 文はブロックの終わりで、途中でエラーが起きた場合も含めて、自動的にファイルを閉じます。エンコーディングは必ず明示します。既定値は OS によって異なり、日本語を含むファイルがあるマシンでは読めても、別のマシンでは失敗することがあります。\n\ndata.txt のような相対パスは、スクリプトのあるフォルダーではなく作業ディレクトリを基準に解決されます。そのため試験では、どこでプログラムを実行するかが指定されます。このコースと問題のワークスペースでは、コードの実行前にデータファイルが作業ディレクトリに置かれるので、open('data.txt') は端末で実行したときとまったく同じように動きます。",
              "code": "with open('data.txt', encoding='utf-8') as f:\n    text = f.read()\nprint(len(text))\nprint(repr(text[:12]))\n",
              "exampleFiles": {
                "data.txt": "alice 82\nbob 75\n"
              },
              "output": "16\n'alice 82\\nbob'\n"
            },
            {
              "title": "行には改行が残っている",
              "body": "ファイルを反復すると 1 行ずつ得られ、最後の行を除いて、各行の末尾には '\\n' が付いています。そのまま print すると空行が余分に出力され、単語と比較しても一致しません。line.rstrip('\\n') は改行だけを取り除き、line.strip() は前後の空白と Windows の '\\r' も取り除き、line.split() はすべての空白を捨ててフィールドのリストを返します。意識して使い分けましょう。文のように行内の空白に意味があるなら末尾だけを除き、行がフィールドの並びなら split() が最も安全です。\n\n行ごとの反復は大きなファイルでもメモリを節約できます。f.read() は全体を一度に読み込みますが、試験の規模なら問題ありません。よくある誤りは、ループで f.readline() を呼びながら、ファイルの終わりを示す空文字列を確かめないことです。for 文なら、その処理を任せられます。",
              "code": "with open('data.txt', encoding='utf-8') as f:\n    for line in f:\n        print(repr(line), line.split())\n",
              "exampleFiles": {
                "data.txt": "alice 82\n  bob   75 \n"
              },
              "output": "'alice 82\\n' ['alice', '82']\n'  bob   75 \\n' ['bob', '75']\n"
            },
            {
              "title": "フィールドから型のあるレコードへ",
              "body": "split() が返すのは文字列なので、数値は変換が必要です。name, score = line.split() のあとで int(score) とします。名前付きの変数へのアンパックは、フィールド数の検査も兼ねます。フィールドが 1 つ多い行があれば、列が黙ってずれるのではなく、すぐに ValueError になります。フィールド数が一定でないときは、words[1:] のようなスライスや、name, *values = line.split() という星付きの形を使います。カンマ区切りのデータでは line.split(',') がフィールドの前後の空白を残すので、各部分を strip するか、csv モジュールを使います。\n\n変換は読み込むときに一度だけ行い、(name, subject, score) のようなタプルとして保存します。以降のコードはきれいな値だけを扱い、文字列を二度解析せずに済みます。時刻や日付の表し方も早めに決めます。09:05:30 を 32730 秒に変換すれば、比較も差も単純な整数演算になります。",
              "code": "def seconds(clock):\n    h, m, s = map(int, clock.split(':'))\n    return h * 3600 + m * 60 + s\n\nrecords = []\nwith open('log.txt', encoding='utf-8') as f:\n    for line in f:\n        clock, user, status = line.split()\n        records.append((seconds(clock), user, int(status)))\nprint(records)\n",
              "exampleFiles": {
                "log.txt": "09:00:00 alice 200\n09:05:30 bob 500\n"
              },
              "output": "[(32400, 'alice', 200), (32730, 'bob', 500)]\n"
            },
            {
              "title": "データでない行を飛ばす",
              "body": "実際のファイルには空行・コメント・見出し行が含まれます。最初にそれらを判定して continue します：if not line.strip() or line.lstrip().startswith('#'): continue。1 行目が件数 N であるような見出しは、ループの前に next(f) や f.readline() で読み、デバッグ中はレコード数がそれと一致するかを確かめます。\n\n別の書き方として、open(...).read().split() で全トークンを一度に読む方法があります。行の構造を完全に無視するので、ファイル全体が数の列であるときに便利です。先頭のトークンが個数、残りが値になります。ただし、行の区切りに意味がない場合に限って使います。フィールド数がまちまちだと、どこでレコードが終わるのかが分からなくなるからです。どちらの書き方でも、解析は関数やプログラムの冒頭など 1 か所にまとめ、残りのコードが生の文字列ではなくレコードだけを扱うようにします。",
              "code": "tokens = open('grid.txt', encoding='utf-8').read().split()\nh, w = int(tokens[0]), int(tokens[1])\nrows = tokens[2:2 + h]\nprint(h, w, rows)\n",
              "exampleFiles": {
                "grid.txt": "3 4\n#..#\n....\n##.#\n"
              },
              "output": "3 4 ['#..#', '....', '##.#']\n"
            },
            {
              "title": "辞書でグループ化する",
              "body": "データファイルに関する問題では、キーごとの合計、分類ごとの個数、各グループに属する要素などが問われます。キーから累積値への辞書が、それを素直に表します。totals[name] = totals.get(name, 0) + score で合計を更新し、groups.setdefault(key, []).append(item) でリストを作ります。collections.Counter は出現回数を数え、collections.defaultdict(int) や defaultdict(list) を使えば get や setdefault も不要です。\n\nグループ化のあとで並べ替えて、最終的な順序を作ります。sorted(totals.items(), key=lambda kv: (-kv[1], kv[0])) は合計の大きい順に並べ、等しいときは名前順にします。同順位の扱いは問題文と完全に一致させる必要があります。名前の辞書順と書かれていれば、ASCII の名前なら文字列をそのまま比べれば正しくなります。辞書は挿入順を保ちますが、問題が別の順序を指定しているときにそれに頼るのは危険です。",
              "code": "from collections import defaultdict\n\ntotals = defaultdict(int)\nwith open('scores.txt', encoding='utf-8') as f:\n    for line in f:\n        name, subject, score = line.split()\n        totals[name] += int(score)\nfor name, total in sorted(totals.items(), key=lambda kv: (-kv[1], kv[0])):\n    print(name, total)\n",
              "exampleFiles": {
                "scores.txt": "bob math 70\nalice math 82\nbob english 90\nalice english 78\ncarol math 95\n"
              },
              "output": "alice 160\nbob 160\ncarol 95\n"
            },
            {
              "title": "出力はまとめて書き出す",
              "body": "出力形式は 1 文字ずつ照合されるので、区切り文字、小数の桁数、大文字・小文字まで指定どおりに各行を組み立てます。ほとんどは f 文字列で足ります。f'{name} {total}' や、小数点以下 3 桁なら f'{ratio:.3f}' です。行数が多いときは文字列をリストに集め、最後に print('\\n'.join(lines)) で一度に出力します。何千回も print を呼ぶより速く、出力前に結果を確かめるのも簡単です。\n\nprint は改行を付けるので、join の結果の末尾にさらに改行を足してはいけません。空のグループのように出力するものがないときは、空行、代わりの記号、何も出さない、のどれが求められているかを確認します。画面への出力ではなくファイルへの書き込みを求められたら、'w' モードで開いて同じ文字列を書き、最後に改行を 1 つ加えます。",
              "code": "rows = [('alice', 160), ('bob', 160), ('carol', 95)]\nlines = [f'{name:<6}{total:>4}' for name, total in rows]\nprint('\\n'.join(lines))\naverage = sum(total for _, total in rows) / len(rows)\nprint(f'average {average:.2f}')\n",
              "output": "alice  160\nbob    160\ncarol   95\naverage 138.33\n"
            },
            {
              "title": "小さなファイルで試す",
              "body": "試験の大きなファイルを実行するだけでなく、規則を 1 つずつ狙った小さなファイルを自分で作りましょう。レコードが 1 件だけのファイルで基本の場合を、空行とコメントを含むファイルで読み飛ばしを、最終行に改行がないファイルで最後のレコードが失われないことを、キーが重複するファイルでグループ化を、同点のあるファイルで並び順を確かめます。実行する前に手で答えを求めておき、プログラムの出力と比べます。\n\n大きなファイルでは、読み込んだレコード数や異なるキーの数などの途中経過を出力し、テキストエディタや端末の wc -l でおおまかに照合します。答えが違ったら、読み込み・解析・集計・出力のどの段階で最初に食い違うかを探し、複数の箇所を同時に変えないようにします。"
            }
          ],
          "checkpoints": [
            {
              "question": "for line in f の中で print(line) とするのが、たいてい誤りなのはなぜですか。",
              "answer": "各行の末尾にはすでに改行があり、print がもう 1 つ加えるので空行が出ます。先に strip か split をします。"
            },
            {
              "question": "open(...).read().split() が向かないのはどんなときですか。",
              "answer": "レコードごとにフィールド数が違うなど、行の区切りに意味があるときです。別の行のトークンが混ざり、区別できなくなります。"
            }
          ],
          "exerciseTitle": "成績の集計",
          "task": "ファイル scores.txt には 1 行に 1 件ずつ、「名前 科目 点数」の形式でレコードが書かれています。点数は 0 以上 100 以下の整数です。空行と # で始まる行はコメントです。学生ごとに点数の合計とレコード数を求め、合計の大きい順にすべての学生を出力してください。合計が等しい場合は名前の辞書順とします。",
          "input": "標準入力はありません。カレントディレクトリの scores.txt を読み込みます。レコードは 1 件以上あり、名前と科目は英小文字からなります。",
          "output": "学生ごとに、名前、合計、レコード数を空白で区切って 1 行に出力してください。",
          "hint": "まず空行とコメント行を飛ばし、各レコードを 3 つのフィールドに分けます。2 つの辞書で合計と件数を数え、キー (-合計, 名前) で並べ替えます。",
          "explanation": "ファイルを 1 行ずつ読み、strip() すると空になる行と、最初の空白でない文字が # の行を飛ばします。残りの各行はちょうど 3 つのフィールドに分かれるので、点数を int で変換します。名前をキーとする辞書に合計と件数を加えていきます。キー (-合計, 名前) で並べ替えると、合計の大きい順、等しければアルファベット順になります。R 件のレコードに対して O(R log R) です。最終行に改行がないファイルや Windows の改行を使うファイルも、split() は改行文字に依存しないので正しく処理できます。"
        }
      },
      "order": 25,
      "stage": "exam",
      "minutes": 50,
      "prerequisiteIds": [
        "exam-workflow"
      ],
      "relatedProblems": [
        "CI-LOG-1",
        "CI-LOG-2",
        "CI-MAP-1"
      ],
      "solution": "totals = {}\ncounts = {}\nwith open('scores.txt', encoding='utf-8') as f:\n    for line in f:\n        if not line.strip() or line.lstrip().startswith('#'):\n            continue\n        name, subject, score = line.split()\n        totals[name] = totals.get(name, 0) + int(score)\n        counts[name] = counts.get(name, 0) + 1\nfor name in sorted(totals, key=lambda name: (-totals[name], name)):\n    print(name, totals[name], counts[name])\n",
      "starter": "totals = {}\ncounts = {}\nwith open('scores.txt', encoding='utf-8') as f:\n    for line in f:\n        # TODO: skip blank and comment lines, then read name, subject and score\n        pass\n",
      "tests": [
        {
          "input": "",
          "expected": "alice 160 2\nbob 160 2\ncarol 95 1\n",
          "files": {
            "scores.txt": "alice math 82\nbob math 70\nalice english 78\nbob english 90\ncarol math 95\n"
          }
        },
        {
          "input": "",
          "expected": "kenta 50 2\nmei 50 1\n",
          "files": {
            "scores.txt": "# term 1\n\nkenta math 50\n   # an indented comment\nmei math 50\n\nkenta art 0\n"
          }
        },
        {
          "input": "",
          "expected": "zoe 100 1\n",
          "files": {
            "scores.txt": "zoe music 100"
          }
        },
        {
          "input": "",
          "expected": "a 6 3\n",
          "files": {
            "scores.txt": "a x 1\na y 2\na z 3\n"
          }
        },
        {
          "input": "",
          "expected": "cat 1 1\namy 0 1\nbob 0 1\n",
          "files": {
            "scores.txt": "bob a 0\namy b 0\ncat c 1\n"
          }
        },
        {
          "input": "",
          "expected": "eve 41 1\ndan 40 1\n",
          "files": {
            "scores.txt": "dan math 40\r\neve math 41\r\n"
          }
        }
      ]
    },
    {
      "id": "recursion-and-memoization",
      "content": {
        "zh": {
          "title": "递归与记忆化",
          "summary": "编写调用自身的函数，缓存重复的子问题，并知道递归深度什么时候会成为问题。",
          "objectives": [
            "写出带有正确基本情形的递归函数，并说明它的调用栈",
            "用 functools.cache 把指数时间的递归变成多项式时间",
            "认识递归深度的上限，必要时用显式栈或循环代替深递归"
          ],
          "sections": [
            {
              "title": "调用自身的函数",
              "body": "递归函数通过解决同一问题的更小实例来解决问题。它需要两部分：可以直接给出答案的基本情形，以及缩小输入、再组合结果的递归情形。例如 n 的各位数字之和：n < 10 时就是 n 本身，否则是末位 n % 10 加上 n // 10 的各位数字之和。每次调用都在调用栈上等待更小的调用返回，所以调用结束的顺序与开始的顺序相反。\n\n如果缩小没有朝着基本情形推进——例如在 f(n) 中又调用 f(n)——程序会一直递归下去，直到 Python 以 RecursionError 终止它。写递归之前，先用一句话说清楚函数对任意参数返回什么；代码就是基本情形，加上把这句话用在更小的参数上。",
              "code": "def digit_sum(n):\n    if n < 10:\n        return n\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(2026))\nprint(digit_sum(7))\n",
              "output": "10\n7\n"
            },
            {
              "title": "递归顺着嵌套结构走",
              "body": "数据本身是嵌套结构时，递归最自然：可能包含列表的列表、包含目录的目录、包含括号表达式的表达式、由员工及其下属构成的树。函数只处理一层，把每个嵌套的部分交给递归调用。求嵌套列表中所有数之和：遍历各元素，数字直接相加，内层列表则加上递归求出的总和。基本情形是隐含的：不含内层列表的列表不会再发起调用。\n\n用循环写同样的计算，就得自己管理一个“待处理列表”的栈。只要题目用自身来定义某个东西——例如表达式的文法，或者从文件读入的树——考试中就会出现这种结构。",
              "code": "def total(items):\n    result = 0\n    for item in items:\n        if isinstance(item, list):\n            result += total(item)\n        else:\n            result += item\n    return result\n\nprint(total([1, [2, 3], [[4], 5], []]))\n",
              "output": "15\n"
            },
            {
              "title": "重复的子问题会爆炸",
              "body": "递归定义可以是正确的，却仍然毫无希望。每次走 1 级或 2 级台阶，走完 n 级的方法数是 ways(n − 1) + ways(n − 2)，其中 ways(0) = ways(1) = 1。照这个定义直接写，ways(n − 2) 会在 ways(n − 1) 内部计算一次，又被调用者再计算一次，而这种重复在每一层都会发生：调用次数像斐波那契数本身一样增长，大约是 1.6 的 n 次方。\n\nn = 40 时要调用数亿次，而答案只依赖 41 个不同的参数。像示例那样数一数调用次数，是发现问题的快捷实验。解决办法不是更聪明的公式，而是在第一次算出每个答案时把它记下来。",
              "code": "calls = 0\n\ndef ways(n):\n    global calls\n    calls += 1\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nprint(ways(20), calls)\n",
              "output": "10946 21891\n"
            },
            {
              "title": "用 functools.cache 记忆化",
              "body": "记忆化把每个结果存进以参数为键的表中，之后的调用直接返回存好的值。装饰器 @functools.cache（较旧的 Python 用 @functools.lru_cache(maxsize=None)）可以对参数可哈希的任何函数做到这一点。加上它之后，ways(n) 对每个不同的参数只计算一次，时间就变成“状态数 × 每个状态的工作量”，这里是 O(n)。也可以用字典手写同样的效果：若 n 已在 memo 中就返回 memo[n]，否则算出结果、存入 memo 后再返回。\n\n参数必须是不可变的：用元组或字符串代替列表，或者把数据放在函数外面、只传递下标。被缓存的函数还必须是纯函数，只依赖参数；如果它读取的全局变量在两次调用之间发生变化，缓存会返回过时的答案。记忆化递归与自底向上的动态规划计算的是同一张表；递归照着定义走，往往更容易先写出来，而且只访问真正需要的状态。",
              "code": "from functools import cache\n\n@cache\ndef ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nprint(ways(90))\n",
              "output": "4660046610375530309\n"
            },
            {
              "title": "递归深度的上限",
              "body": "Python 限制嵌套调用的深度，默认是 1000 层，超过就引发 RecursionError。对长度为 n 的列表递归会达到 n 层，所以即使算法没有问题，对 10⁴ 个下标做记忆化递归也会在默认上限下失败。sys.setrecursionlimit(10**6) 可以提高上限。从 Python 3.11 起（包括这里使用的 3.12），普通的 Python 函数互相调用不再消耗 C 栈，提高上限之后，深度达到 10⁵ 也能运行。\n\n经过 C 代码的调用则不同。@cache 生成的包装器就是用 C 写的，所以带缓存的递归另有上限：在 CPython 3.12 及以后的版本中，无论 setrecursionlimit 设成多少都只有几千层；在本应用的浏览器运行环境中只有几百层，再深程序就会因错误而停止。较旧的版本和其他环境遇到深递归，甚至可能直接崩溃。深度可能达到输入规模时，改用以字典作备忘录的普通函数，或者用循环自底向上填表，或者像在大网格上做深度优先搜索那样维护一个显式的栈。",
              "code": "import sys\nsys.setrecursionlimit(10**6)\n\ndef length(items, i=0):\n    return 0 if i == len(items) else 1 + length(items, i + 1)\n\nprint(length(list(range(50000))))\n",
              "output": "50000\n"
            },
            {
              "title": "从递归到循环",
              "body": "每个记忆化递归都有一个自底向上的孪生版本。找出所有状态以及它们之间的依赖顺序：ways(n) 需要更小的 n，所以从 0 往上循环，依次填好 dp[0]、dp[1]……，每一项都由已经算好的项得到。循环没有深度限制，也没有函数调用的开销，这在 Python 中很重要。\n\n递归形式仍然有用：它可以作为规格说明，也适合难以排定顺序的状态，例如字符串的区间或游戏中的局面。这时先写记忆化版本，在小输入上测试，只在深度或速度需要时再改写。在随机输入上比较两个版本，也是测试其中任何一个的好办法。",
              "code": "n = 90\ndp = [1, 1] + [0] * (n - 1)\nfor i in range(2, n + 1):\n    dp[i] = dp[i - 1] + dp[i - 2]\nprint(dp[n])\n",
              "output": "4660046610375530309\n"
            },
            {
              "title": "设计状态",
              "body": "最难的一步是决定参数代表什么。参数必须包含影响后续的一切，而且不多于此。对数字串的解码来说，状态只需位置 i：s[i:] 的解码方法数与 s[:i] 是怎样解码的无关。对于可能还剩一次捷径可用的网格路径，状态需要位置，以及捷径是否已经用过。信息太少会得到错误的答案；太多则会让状态数和运行时间成倍增加。\n\n写代码之前，数一数状态数和每个状态的工作量：n 个位置、每个两种选择是 O(n)，而 n 个物品的全部子集是 2ⁿ。最后，明确写出最小状态的基本情形，包括空后缀——它通常算作一种方法，而不是零种。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么用 @cache 装饰的函数，参数必须可哈希？",
              "answer": "缓存是以参数为键的字典；列表不能作字典的键，所以要用元组或下标。"
            },
            {
              "question": "对 n = 20000 个位置使用 @cache 的递归，因为太深而出错。有哪两种改法？",
              "answer": "改用以字典作备忘录的普通函数，并用 sys.setrecursionlimit 提高上限；或者改写成自底向上的循环，不经递归地填同一张表。"
            }
          ],
          "exerciseTitle": "数字串的解码",
          "task": "一条由大写字母组成的消息，按 A→1、B→2、……、Z→26 的规则编码后把数字连在一起，例如 ABZ 编码为 1226。给定数字串 s，求有多少条消息恰好编码为 s，答案对 1000000007 取模。例如 1226 可以解码为 1 2 2 6、1 22 6、1 2 26、12 2 6 和 12 26，答案为 5。编码没有前导零，所以 06 不是合法的编码；30 这样的串没有任何解码方法。",
          "input": "一行，数字串 s，长度为 1 到 2000。",
          "output": "输出解码方法数对 1000000007 取模的结果。",
          "hint": "设 f(i) 为后缀 s[i:] 的解码方法数。则 f(len(s)) = 1；s[i] 为 0 时 f(i) = 0；否则 f(i) = f(i + 1)，若 s[i:i + 2] 在 10 到 26 之间，再加上 f(i + 2)。每个 f(i) 算出后存进字典。",
          "explanation": "状态是位置 i，因为前缀怎样解码不影响后缀。从 i 出发，s[i] 不为 0 时可以取一位数；s[i] 不为 0 且 s[i:i+2] 不超过 26 时，还可以取两位数。空后缀恰有一种解码方法。记忆化之后每个位置只计算一次，时间为 O(n)；每一步都对 1000000007 取模。递归深度达到 n = 2000：这超过了默认上限，所以参考答案提高了上限；也超过了浏览器中经由 @cache 的递归所能达到的深度，所以备忘录用的是普通函数里的字典。从末尾开始用循环填数组，可以完全不用递归。"
        },
        "en": {
          "title": "Recursion and memoization",
          "summary": "Write functions that call themselves, cache repeated subproblems, and recognise when recursion depth becomes a problem.",
          "objectives": [
            "Write a recursive function with a correct base case and explain its call stack",
            "Turn exponential recursion into polynomial time with functools.cache",
            "Recognise the recursion limit and replace deep recursion with an explicit stack or a loop"
          ],
          "sections": [
            {
              "title": "A function that calls itself",
              "body": "A recursive function solves a problem by solving smaller instances of the same problem. It needs two parts: a base case answered directly, and a recursive case that shrinks the input and combines the results. The digit sum of n, for example, is n itself when n < 10, and otherwise the last digit n % 10 plus the digit sum of n // 10. Each call waits on the call stack until the smaller call returns, so calls finish in the reverse of the order in which they started.\n\nIf the input does not shrink toward the base case, as when f(n) calls f(n), the program recurses until Python stops it with RecursionError. Before writing any recursion, state in one sentence what the function returns for an arbitrary argument; the code is then the base case plus that sentence applied to smaller arguments.",
              "code": "def digit_sum(n):\n    if n < 10:\n        return n\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(2026))\nprint(digit_sum(7))\n",
              "output": "10\n7\n"
            },
            {
              "title": "Recursion follows nested structure",
              "body": "Recursion is most natural when the data itself is nested: a list that may contain lists, a directory containing directories, an expression containing parenthesised expressions, or a tree of employees and their reports. The function handles one level and hands each nested part to a recursive call. To total the numbers in a nested list, go through its items, add numbers directly, and add the total of each inner list computed recursively. The base case is implicit: a list without inner lists makes no further calls.\n\nWriting the same computation with loops would mean managing your own stack of pending lists. This shape appears in the exam whenever a statement defines something in terms of itself, such as an expression grammar or a tree read from a file.",
              "code": "def total(items):\n    result = 0\n    for item in items:\n        if isinstance(item, list):\n            result += total(item)\n        else:\n            result += item\n    return result\n\nprint(total([1, [2, 3], [[4], 5], []]))\n",
              "output": "15\n"
            },
            {
              "title": "Repeated subproblems explode",
              "body": "A recursive definition can be correct and still hopeless. The number of ways to climb n stairs taking 1 or 2 steps at a time is ways(n − 1) + ways(n − 2), with ways(0) = ways(1) = 1. Written directly, ways(n − 2) is computed inside ways(n − 1) and again by the caller, and this duplication repeats at every level: the number of calls grows like the Fibonacci numbers themselves, roughly 1.6 to the power n.\n\nFor n = 40 that is hundreds of millions of calls, for an answer that depends on only 41 distinct arguments. Counting calls, as the example does, is a quick experiment that exposes the problem. The cure is not a cleverer formula but remembering each answer the first time it is computed.",
              "code": "calls = 0\n\ndef ways(n):\n    global calls\n    calls += 1\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nprint(ways(20), calls)\n",
              "output": "10946 21891\n"
            },
            {
              "title": "Memoization with functools.cache",
              "body": "Memoization stores each result in a table keyed by the arguments and returns the stored value on later calls. The decorator @functools.cache, or @functools.lru_cache(maxsize=None) on older Pythons, does this for any function whose arguments are hashable. With it, ways(n) computes each distinct argument once, so the time becomes the number of states times the work per state, O(n) here. The same effect can be written by hand with a dictionary: return memo[n] if n is already in memo, and otherwise compute the result and store it before returning.\n\nArguments must be immutable: pass tuples or strings instead of lists, or keep the data outside the function and pass indices. A cached function must also be pure, depending only on its arguments; if it reads a global that changes between calls, the cache returns stale answers. Memoized recursion and bottom-up dynamic programming compute the same table. Recursion follows the definition, so it is often easier to write first, and it visits only the states that are actually needed.",
              "code": "from functools import cache\n\n@cache\ndef ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nprint(ways(90))\n",
              "output": "4660046610375530309\n"
            },
            {
              "title": "The recursion limit",
              "body": "Python limits the depth of nested calls, by default to 1000, and raises RecursionError beyond it. Recursion over a list of length n reaches depth n, so a memoized function over 10⁴ indices fails under the default limit even though the algorithm is fine. sys.setrecursionlimit(10**6) raises the limit. Since Python 3.11, including the 3.12 runtime used here, ordinary Python-to-Python calls no longer consume the C stack, and a depth of 10⁵ works once the limit is raised.\n\nCalls that pass through code written in C are different. The wrapper created by @cache is such code, so cached recursion has a separate cap: a few thousand levels in CPython 3.12 and later, whatever setrecursionlimit says, and a few hundred in this app’s browser runtime, where going deeper stops the program with an error. Older versions and other environments may simply crash on deep recursion. When the depth can reach the size of the input, use a plain function with a dictionary as the memo, fill the table bottom-up in a loop, or keep an explicit stack, as in a depth-first search on a large grid.",
              "code": "import sys\nsys.setrecursionlimit(10**6)\n\ndef length(items, i=0):\n    return 0 if i == len(items) else 1 + length(items, i + 1)\n\nprint(length(list(range(50000))))\n",
              "output": "50000\n"
            },
            {
              "title": "From recursion to a loop",
              "body": "Every memoized recursion has a bottom-up twin. Identify the states and the order in which they depend on one another: ways(n) needs smaller n, so a loop from 0 upward fills dp[0], dp[1] and so on, each from entries already computed. The loop has no depth limit and no call overhead, which matters in Python.\n\nThe recursive form remains useful as a specification and for states that are hard to order, such as intervals of a string or positions in a game. There, write the memoized version first, test it on small inputs, and convert it only if depth or speed requires. Comparing the two versions on random inputs is also a good way to test either of them.",
              "code": "n = 90\ndp = [1, 1] + [0] * (n - 1)\nfor i in range(2, n + 1):\n    dp[i] = dp[i - 1] + dp[i - 2]\nprint(dp[n])\n",
              "output": "4660046610375530309\n"
            },
            {
              "title": "Designing the state",
              "body": "The hardest step is deciding what the arguments represent. They must contain everything that affects the future, and nothing more. For decoding a string of digits, the state is just the position i: the number of ways to decode s[i:] does not depend on how s[:i] was decoded. For a grid path that may still use one shortcut, the state needs the position and whether the shortcut has been used. Too little information gives wrong answers; too much multiplies the number of states and the running time.\n\nCount the states and the work per state before coding: n positions with two choices each is O(n), while all subsets of n items is 2ⁿ. Finally, write the base cases for the smallest states explicitly, including the empty suffix, which usually counts as one way rather than zero."
            }
          ],
          "checkpoints": [
            {
              "question": "Why must the arguments of a function decorated with @cache be hashable?",
              "answer": "The cache is a dictionary keyed by the arguments, and lists cannot be dictionary keys; use tuples or indices instead."
            },
            {
              "question": "A function decorated with @cache over n = 20000 positions fails because the recursion is too deep. Name two fixes.",
              "answer": "Replace @cache with a dictionary memo in a plain function and raise the limit with sys.setrecursionlimit, or rewrite it as a bottom-up loop that fills the same table without recursion."
            }
          ],
          "exerciseTitle": "Decoding digits",
          "task": "A message of capital letters is encoded by replacing A with 1, B with 2, …, Z with 26 and joining the numbers, so ABZ becomes 1226. Given a digit string s, count the messages whose encoding is exactly s, modulo 1000000007. For example, 1226 can be decoded as 1 2 2 6, 1 22 6, 1 2 26, 12 2 6 and 12 26, so the answer is 5. Codes never have a leading zero, so 06 is not a valid code, and a string such as 30 has no decoding at all.",
          "input": "One line containing s, a string of 1 to 2000 digits.",
          "output": "Print the number of decodings modulo 1000000007.",
          "hint": "Let f(i) be the number of ways to decode the suffix s[i:]. Then f(len(s)) = 1; f(i) = 0 if s[i] is 0; otherwise f(i) = f(i + 1), plus f(i + 2) when s[i:i + 2] is between 10 and 26. Keep each f(i) in a dictionary once it is computed.",
          "explanation": "The state is the position i, because how the prefix was decoded does not affect the suffix. From i, a one-digit code is possible when s[i] is not 0, and a two-digit code when s[i] is not 0 and s[i:i+2] is at most 26. The empty suffix has exactly one decoding. With memoization each position is computed once, so the time is O(n); take the remainder modulo 1000000007 at every step. The recursion depth reaches n = 2000. That exceeds the default limit, so the reference solution raises it, and it is deeper than recursion through @cache can go in the browser, so the memo is a dictionary in a plain function. Filling an array from the end in a loop avoids recursion altogether."
        },
        "ja": {
          "title": "再帰とメモ化",
          "summary": "自分自身を呼び出す関数を書き、重複する部分問題をキャッシュし、再帰の深さが問題になる場面を見極めます。",
          "objectives": [
            "正しい基底を持つ再帰関数を書き、その呼び出しスタックを説明する",
            "functools.cache で指数時間の再帰を多項式時間にする",
            "再帰の深さの上限を理解し、必要なら明示的なスタックやループに置き換える"
          ],
          "sections": [
            {
              "title": "自分を呼び出す関数",
              "body": "再帰関数は、同じ問題のより小さな場合を解くことで問題を解きます。必要なのは 2 つです。直接答えを返す基底と、入力を小さくして結果を組み合わせる再帰の場合です。例えば n の各桁の和は、n < 10 なら n 自身、そうでなければ末尾の桁 n % 10 と、n // 10 の各桁の和との和です。各呼び出しは、より小さな呼び出しが戻るまで呼び出しスタック上で待つので、呼び出しは始まった順と逆の順に終わります。\n\nf(n) の中で f(n) を呼ぶように、入力が基底に向かって小さくならないと、Python が RecursionError で止めるまで再帰が続きます。再帰を書く前に、任意の引数に対して関数が何を返すのかを一文で言えるようにしましょう。コードは、基底と、その一文をより小さな引数に適用したものになります。",
              "code": "def digit_sum(n):\n    if n < 10:\n        return n\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(2026))\nprint(digit_sum(7))\n",
              "output": "10\n7\n"
            },
            {
              "title": "再帰は入れ子の構造に沿う",
              "body": "データ自体が入れ子になっているとき、再帰は最も自然です。リストを含みうるリスト、ディレクトリを含むディレクトリ、括弧で囲まれた式を含む式、社員と部下からなる木などです。関数は 1 段だけを処理し、入れ子の部分はそれぞれ再帰呼び出しに任せます。入れ子のリストに含まれる数の総和なら、要素を順に見て、数はそのまま足し、内側のリストは再帰で求めた総和を足します。基底は暗黙的で、内側のリストを含まないリストはそれ以上呼び出しをしません。\n\n同じ計算をループで書くと、未処理のリストを積むスタックを自分で管理しなければなりません。式の文法やファイルから読む木のように、問題文が何かをそれ自身で定義しているとき、試験でもこの形が現れます。",
              "code": "def total(items):\n    result = 0\n    for item in items:\n        if isinstance(item, list):\n            result += total(item)\n        else:\n            result += item\n    return result\n\nprint(total([1, [2, 3], [[4], 5], []]))\n",
              "output": "15\n"
            },
            {
              "title": "重複する部分問題は爆発する",
              "body": "再帰的な定義は、正しくても役に立たないことがあります。1 段か 2 段ずつ上るとき、n 段の階段の上り方は ways(n − 1) + ways(n − 2) 通りで、ways(0) = ways(1) = 1 です。これをそのまま書くと、ways(n − 2) は ways(n − 1) の中で一度、呼び出し元でもう一度計算され、この重複があらゆる段で起こります。呼び出し回数はフィボナッチ数そのもののように、およそ 1.6 の n 乗で増えます。\n\nn = 40 では何億回もの呼び出しになりますが、答えが依存する引数は 41 通りしかありません。例のように呼び出し回数を数えるのは、問題を見つける手軽な実験です。解決策は賢い公式ではなく、それぞれの答えを最初に計算したときに覚えておくことです。",
              "code": "calls = 0\n\ndef ways(n):\n    global calls\n    calls += 1\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nprint(ways(20), calls)\n",
              "output": "10946 21891\n"
            },
            {
              "title": "functools.cache によるメモ化",
              "body": "メモ化は、各結果を引数をキーとする表に保存し、次からは保存した値を返す手法です。デコレータ @functools.cache（古い Python では @functools.lru_cache(maxsize=None)）は、引数がハッシュ可能な任意の関数にこれを施します。これを付けると ways(n) は異なる引数ごとに 1 回だけ計算されるので、時間は「状態数 × 状態あたりの仕事量」になり、ここでは O(n) です。辞書を使って同じことを手で書くこともできます。n がすでに memo にあれば memo[n] を返し、なければ結果を計算して memo に保存してから返します。\n\n引数は不変でなければなりません。リストの代わりにタプルや文字列を渡すか、データは関数の外に置いて添字だけを渡します。キャッシュする関数は純粋で、引数だけに依存する必要もあります。呼び出しの合間に変わるグローバル変数を読むと、キャッシュは古い答えを返します。メモ化再帰とボトムアップの動的計画法は同じ表を計算します。再帰は定義をそのままたどるので先に書きやすく、実際に必要な状態だけを訪れるという利点もあります。",
              "code": "from functools import cache\n\n@cache\ndef ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nprint(ways(90))\n",
              "output": "4660046610375530309\n"
            },
            {
              "title": "再帰の深さの上限",
              "body": "Python は入れ子の呼び出しの深さを制限しており、既定では 1000 段を超えると RecursionError になります。長さ n のリストに対する再帰は深さ n に達するので、アルゴリズムが正しくても、10⁴ 個の添字に対するメモ化再帰は既定の上限で失敗します。sys.setrecursionlimit(10**6) で上限を上げられます。Python 3.11 以降（ここで使う 3.12 を含む）では、通常の Python 関数どうしの呼び出しは C のスタックを消費しないので、上限を上げれば深さ 10⁵ でも動きます。\n\nC で書かれたコードを経由する呼び出しは事情が違います。@cache が作るラッパーはまさにそのようなコードなので、キャッシュ付きの再帰には別の上限があります。CPython 3.12 以降では setrecursionlimit の値にかかわらず数千段まで、このアプリのブラウザー実行環境では数百段までで、それより深いとプログラムはエラーで止まります。古いバージョンや別の環境では、深い再帰でそのまま異常終了することもあります。深さが入力の大きさに達しうるときは、辞書をメモとして使う普通の関数にするか、ループでボトムアップに表を埋めるか、大きなグリッドでの深さ優先探索のように明示的なスタックを使います。",
              "code": "import sys\nsys.setrecursionlimit(10**6)\n\ndef length(items, i=0):\n    return 0 if i == len(items) else 1 + length(items, i + 1)\n\nprint(length(list(range(50000))))\n",
              "output": "50000\n"
            },
            {
              "title": "再帰からループへ",
              "body": "どのメモ化再帰にも、ボトムアップの双子があります。状態と、それらが互いに依存する順序を見つけます。ways(n) はより小さい n を必要とするので、0 から上へ向かうループで dp[0]、dp[1]、… を、すでに計算した項から順に埋めます。ループには深さの制限も関数呼び出しのオーバーヘッドもなく、これは Python では重要です。\n\nそれでも再帰の形は役に立ちます。仕様として読みやすく、文字列の区間やゲームの局面のように順序を決めにくい状態にも向いています。その場合はまずメモ化版を書いて小さな入力で試し、深さや速度が問題になったときだけ書き換えます。2 つの版をランダムな入力で比べることは、どちらのテストとしても有効です。",
              "code": "n = 90\ndp = [1, 1] + [0] * (n - 1)\nfor i in range(2, n + 1):\n    dp[i] = dp[i - 1] + dp[i - 2]\nprint(dp[n])\n",
              "output": "4660046610375530309\n"
            },
            {
              "title": "状態を設計する",
              "body": "最も難しいのは、引数が何を表すかを決める段階です。引数には将来に影響するすべてが含まれ、それ以上は含まれてはいけません。数字列の復号では、状態は位置 i だけで十分です。s[i:] の復号の仕方の数は、s[:i] がどう復号されたかに依存しないからです。近道をあと 1 回使えるかもしれないグリッドの経路なら、状態には位置と、近道を使ったかどうかが必要です。情報が少なすぎると答えが誤り、多すぎると状態数と実行時間が何倍にも膨らみます。\n\nコードを書く前に、状態数と状態あたりの仕事量を見積もりましょう。n 個の位置にそれぞれ 2 通りの選択なら O(n) ですが、n 個の品物のすべての部分集合なら 2ⁿ です。最後に、最小の状態の基底を明示的に書きます。空の接尾辞は、たいてい 0 通りではなく 1 通りと数えます。"
            }
          ],
          "checkpoints": [
            {
              "question": "@cache を付けた関数の引数が、ハッシュ可能でなければならないのはなぜですか。",
              "answer": "キャッシュは引数をキーとする辞書だからです。リストは辞書のキーにできないので、タプルや添字を使います。"
            },
            {
              "question": "n = 20000 個の位置に対する @cache 付きの再帰が、深すぎるためにエラーになりました。直し方を 2 つ挙げてください。",
              "answer": "@cache の代わりに辞書をメモとする普通の関数にして sys.setrecursionlimit で上限を上げるか、再帰を使わずに同じ表を埋めるボトムアップのループに書き換えます。"
            }
          ],
          "exerciseTitle": "数字列の復号",
          "task": "英大文字からなるメッセージを、A を 1、B を 2、…、Z を 26 に置き換えて数字を連結することで符号化します。例えば ABZ は 1226 になります。数字列 s が与えられたとき、ちょうど s に符号化されるメッセージの個数を 1000000007 で割った余りを求めてください。例えば 1226 は 1 2 2 6、1 22 6、1 2 26、12 2 6、12 26 と復号できるので、答えは 5 です。符号に先頭の 0 はないので 06 は正しい符号ではなく、30 のような列には復号の仕方がありません。",
          "input": "1 行に、長さ 1 以上 2000 以下の数字列 s が与えられます。",
          "output": "復号の仕方の数を 1000000007 で割った余りを出力してください。",
          "hint": "f(i) を接尾辞 s[i:] の復号の仕方の数とします。f(len(s)) = 1、s[i] が 0 なら f(i) = 0、そうでなければ f(i) = f(i + 1) で、s[i:i + 2] が 10 以上 26 以下なら f(i + 2) を加えます。求めた f(i) は辞書に保存します。",
          "explanation": "接頭辞の復号の仕方は接尾辞に影響しないので、状態は位置 i です。i からは、s[i] が 0 でなければ 1 桁の符号を、s[i] が 0 でなく s[i:i+2] が 26 以下なら 2 桁の符号を取れます。空の接尾辞の復号はちょうど 1 通りです。メモ化により各位置は 1 回だけ計算され、時間は O(n) です。各段階で 1000000007 の余りを取ります。再帰の深さは n = 2000 に達します。既定の上限を超えるので模範解答では上限を上げており、ブラウザーで @cache を経由する再帰が届く深さも超えるので、メモには普通の関数と辞書を使っています。末尾から配列をループで埋めれば、再帰をまったく使わずに済みます。"
        }
      },
      "order": 26,
      "stage": "exam",
      "minutes": 55,
      "prerequisiteIds": [
        "files-and-parsing"
      ],
      "relatedProblems": [
        "CI-RLE-4",
        "CI-VM-4",
        "ABC291D"
      ],
      "solution": "import sys\n\nsys.setrecursionlimit(10000)\ns = input().strip()\nMOD = 1_000_000_007\nmemo = {}\n\n\ndef ways(i):\n    \"\"\"The number of ways to decode s[i:].\"\"\"\n    if i == len(s):\n        return 1                  # the empty suffix\n    if i in memo:\n        return memo[i]\n    result = 0\n    if s[i] != '0':               # no code starts with 0\n        result = ways(i + 1)\n        if i + 1 < len(s) and int(s[i:i + 2]) <= 26:\n            result += ways(i + 2)\n    memo[i] = result % MOD\n    return memo[i]\n\n\nprint(ways(0))\n",
      "starter": "import sys\n\nsys.setrecursionlimit(10000)\ns = input().strip()\nMOD = 1_000_000_007\nmemo = {}\n\n\ndef ways(i):\n    # the number of ways to decode s[i:]; keep each result in memo\n    pass\n\n\nprint(ways(0))\n",
      "tests": [
        {
          "input": "1226\n",
          "expected": "5\n"
        },
        {
          "input": "30\n",
          "expected": "0\n"
        },
        {
          "input": "101\n",
          "expected": "1\n"
        },
        {
          "input": "2626\n",
          "expected": "4\n"
        },
        {
          "input": "1111111111\n",
          "expected": "89\n"
        },
        {
          "input": "27\n",
          "expected": "1\n"
        },
        {
          "input": "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111\n",
          "expected": "276439883\n"
        }
      ]
    },
    {
      "id": "heaps-and-shortest-paths",
      "content": {
        "zh": {
          "title": "优先队列与最短路",
          "summary": "用 heapq 每次取出最小的元素，并在此基础上实现带权图的 Dijkstra 算法。",
          "objectives": [
            "用 heapq 压入和弹出元素，包括元组，以及用取负实现的最大堆",
            "实现带惰性删除的 Dijkstra 算法，并说明它为什么正确",
            "把附加条件建模为更大的状态，并识别 Dijkstra 不适用的情形"
          ],
          "sections": [
            {
              "title": "一次又一次地取最小值",
              "body": "许多算法反复取出剩余元素中最小的一个，同时又不断有新元素加入：模拟中的下一个事件、最便宜的未探索选项、最早的截止时间。只排序一次是不够的，因为集合在变化。二叉堆能以 O(log n) 完成这两种操作。\n\nPython 的 heapq 模块把普通列表维护成堆的顺序：heappush(h, x) 加入元素，heappop(h) 删除并返回最小值，h[0] 只查看最小值而不删除。heapify(h) 以 O(n) 把已有列表变成堆。这个列表并不是有序的，只保证最小值在最前；不要指望列表中间的元素有什么顺序。",
              "code": "import heapq\n\nh = []\nfor x in [5, 1, 8, 3, 2]:\n    heapq.heappush(h, x)\nprint(h[0])\nprint([heapq.heappop(h) for _ in range(3)])\nprint(h)\n",
              "output": "1\n[1, 2, 3]\n[5, 8]\n"
            },
            {
              "title": "元组、平局与最大优先",
              "body": "元素之间用 < 比较，所以可以自然地使用元组：heappush(h, (priority, name)) 按优先级排序，优先级相同时比较名字。如果第二个元素可能无法比较（例如字典），就在中间插入一个计数器：(priority, sequence_number, item)。heapq 只提供最小堆；要让大的先出，就压入取负的优先级，弹出时再取负。\n\n一个典型的用法是用大小为 k 的堆保留数据流中最大的 k 个值：每压入一个值，若堆的大小超过 k 就弹出最小值。这样只需 O(n log k)，而不必把全部数据排序。",
              "code": "import heapq\n\ndef largest(values, k):\n    h = []\n    for v in values:\n        heapq.heappush(h, v)\n        if len(h) > k:\n            heapq.heappop(h)\n    return sorted(h, reverse=True)\n\nprint(largest([7, 2, 9, 4, 9, 1, 6], 3))\ntasks = [(3, 'write'), (1, 'read'), (3, 'test')]\nheapq.heapify(tasks)\nprint([heapq.heappop(tasks)[1] for _ in range(3)])\n",
              "output": "[9, 9, 7]\n['read', 'test', 'write']\n"
            },
            {
              "title": "有权时 BFS 不够用",
              "body": "所有边的代价相同时，广度优先搜索能求出最短路，因为它按边数的顺序确定各个顶点。代价不同时，边数多的路径反而可能更短：两条长度为 1 的边胜过一条长度为 5 的边。\n\nDijkstra 算法把 BFS 的队列换成以暂定距离为键的优先队列。每一步取出暂定距离最小的未确定顶点，这个距离就是最终的答案：任何别的路线都必须先经过某个距离不小于它的顶点才能离开已确定的区域，而边权非负，此后只会更长。然后松弛这个顶点的边：如果经过它能让某个邻居的距离变小，就更新这个距离并压入堆中。"
            },
            {
              "title": "带惰性删除的 Dijkstra",
              "body": "heapq 无法减小已在堆中的元素的键，所以改为：每当距离变小，就压入一个新元素，旧的留在堆里。弹出元素时把它与记录的距离比较：如果比记录的大，它就是过期的元素，直接跳过。这种惰性删除让代码很短，每次松弛至多增加一个元素，堆中共有 O(E) 个元素，总时间为 O((V + E) log V)。\n\n把距离初始化为无穷大，起点设为 0，并压入 (0, 起点)。图用邻接表表示，每一项是 (邻居, 权)；无向图要把每条边按两个方向各加一次。",
              "code": "import heapq\n\ndef dijkstra(graph, source):\n    dist = [float('inf')] * len(graph)\n    dist[source] = 0\n    heap = [(0, source)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]:\n            continue                      # a stale entry\n        for v, w in graph[u]:\n            if d + w < dist[v]:\n                dist[v] = d + w\n                heapq.heappush(heap, (d + w, v))\n    return dist\n\ngraph = [[(1, 5), (2, 1)], [(3, 1)], [(1, 1), (3, 6)], []]\nprint(dijkstra(graph, 0))\n",
              "output": "[0, 2, 1, 3]\n"
            },
            {
              "title": "还原路径",
              "body": "距离只回答“有多远”，不回答“怎么走”。每当某条边改进了 dist[v]，就记录 v 的最佳路径上的前一个顶点 prev[v] = u。算法结束后，从终点沿 prev 回溯到起点，再把列表反转。如果终点从未到达，它的距离仍是无穷大，也就没有路径；回溯之前要先检查这一点。\n\n存在多条最短路时，还原出哪一条取决于松弛的顺序。如果题目要求特定的一条，例如字典序最小的，这个要求必须写进比较之中，或者另做一遍处理。",
              "code": "import heapq\n\ngraph = [[(1, 5), (2, 1)], [(3, 1)], [(1, 1), (3, 6)], []]\ndist = [float('inf')] * 4\nprev = [None] * 4\ndist[0] = 0\nheap = [(0, 0)]\nwhile heap:\n    d, u = heapq.heappop(heap)\n    if d > dist[u]:\n        continue\n    for v, w in graph[u]:\n        if d + w < dist[v]:\n            dist[v], prev[v] = d + w, u\n            heapq.heappush(heap, (d + w, v))\n\npath, v = [], 3\nwhile v is not None:\n    path.append(v)\n    v = prev[v]\nprint(path[::-1], dist[3])\n",
              "output": "[0, 2, 1, 3] 3\n"
            },
            {
              "title": "状态更大，算法不变",
              "body": "考试题常常加上一个条件：换乘要额外花时间、钥匙能打开门、可以打破一堵墙。只要状态包含了这个条件，算法就不变。如果换乘要花 T，状态就是 (车站, 线路)：乘车是同一线路上两个状态之间的边，换乘是同一车站上两个状态之间权为 T 的边。如果代价是一对数，例如 (打破的墙数, 步数)，Python 的元组按字典序比较，可以直接当作距离使用，只要加上一条边永远不会让代价变小。\n\n写代码之前先数状态数：车站数 × 线路数，或格子数 × 钥匙状态数，在 Python 中应控制在几百万以内。边权只有 0 和 1 的网格问题可以用双端队列代替堆（0-1 BFS），但 Dijkstra 总是正确的后备方案。"
            },
            {
              "title": "Dijkstra 失效的时候，以及如何测试",
              "body": "证明需要边权非负。有负权边时，一个早早确定的顶点之后可能以更低的代价到达，答案会悄无声息地出错；这类问题需要 Bellman–Ford 算法，或者换一种建模方式。权为 0 没有问题。\n\n常见的错误有：忘记检查过期元素（算法变慢，但仍然正确）；在压入时而不是弹出时把顶点标为已访问（结果错误）；没有事先一次建好邻接表。测试时，在随机的小图上与 Floyd–Warshall 算法比较：三重循环以 O(V³) 求出所有点对之间的距离，很容易写对，能抓住快速版本中的错误。",
              "code": "INF = float('inf')\nn = 4\nd = [[0 if i == j else INF for j in range(n)] for i in range(n)]\nfor u, v, w in [(0, 1, 5), (0, 2, 1), (1, 3, 1), (2, 1, 1), (2, 3, 6)]:\n    d[u][v] = min(d[u][v], w)\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            d[i][j] = min(d[i][j], d[i][k] + d[k][j])\nprint(d[0])\n",
              "output": "[0, 2, 1, 3]\n"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么从堆中弹出的元素有时可以直接跳过？",
              "answer": "它被压入之后又找到了更短的距离，所以它的值大于 dist[u]，这个顶点已经用更好的距离处理过了。"
            },
            {
              "question": "Dijkstra 能处理权为 −2 的边吗？",
              "answer": "不能。证明依赖于边权非负；负权边可能在某个顶点确定之后又改进它的距离。"
            }
          ],
          "exerciseTitle": "最短距离",
          "task": "某城市有 N 个路口，编号为 1 到 N，有 M 条双向道路；第 i 条道路连接 u_i 和 v_i，通行需要 w_i 分钟。同一对路口之间可能有多条道路，道路也可能连接一个路口和它自身。对每个路口，求从路口 1 出发的最短时间；无法到达时输出 -1。",
          "input": "第一行是 N M，接下来 M 行，每行是 u v w。1 ≤ N ≤ 100000，0 ≤ M ≤ 200000，0 ≤ w ≤ 10^9。",
          "output": "输出 N 行，第 k 行是从 1 到 k 的最短时间，或者 -1。",
          "hint": "建立双向的邻接表，从顶点 1 运行带惰性删除的 Dijkstra，距离仍为无穷大的顶点输出 -1。",
          "explanation": "边权非负，可以使用 Dijkstra。用 adj[u] = [(v, w), …] 存图，每条道路按两个方向各加一次；平行的道路和自环都不需要特殊处理。从 dist[1] = 0 开始，弹出最小的元素，过期的跳过，否则松弛它的边。每条道路至多引起两次压入，堆中有 O(M) 个元素，时间为 O((N + M) log N)。距离可能达到约 10^14，Python 的整数可以精确表示。最后把各行收集起来一次输出。"
        },
        "en": {
          "title": "Priority queues and shortest paths",
          "summary": "Use heapq to take the smallest item every time, and build Dijkstra’s algorithm for weighted graphs on top of it.",
          "objectives": [
            "Push and pop with heapq, including tuples and a max-heap by negation",
            "Implement Dijkstra’s algorithm with lazy deletion and explain why it is correct",
            "Model extra conditions as larger states and recognise when Dijkstra does not apply"
          ],
          "sections": [
            {
              "title": "The smallest item, again and again",
              "body": "Many algorithms repeatedly take the smallest remaining item while new items keep arriving: the next event in a simulation, the cheapest unexplored option, the earliest deadline. Sorting once is not enough, because the set keeps changing. A binary heap supports both operations in O(log n).\n\nPython’s heapq module keeps a plain list in heap order: heappush(h, x) adds an item, heappop(h) removes and returns the smallest, and h[0] looks at the smallest without removing it. heapify(h) turns an existing list into a heap in O(n). The list is not sorted; it only guarantees that the smallest item comes first, so never expect the items in the middle to be in any order.",
              "code": "import heapq\n\nh = []\nfor x in [5, 1, 8, 3, 2]:\n    heapq.heappush(h, x)\nprint(h[0])\nprint([heapq.heappop(h) for _ in range(3)])\nprint(h)\n",
              "output": "1\n[1, 2, 3]\n[5, 8]\n"
            },
            {
              "title": "Tuples, ties and largest-first",
              "body": "Items are compared with <, so tuples work naturally: heappush(h, (priority, name)) orders by priority and breaks ties by name. If the second element might not be comparable, such as a dictionary, put a counter between them: (priority, sequence_number, item). heapq only provides a min-heap; for largest-first, push the negated priority and negate it again when popping.\n\nA typical use is keeping the k largest values of a stream in a heap of size k: push each value and pop the smallest whenever the size exceeds k. This costs O(n log k) instead of sorting everything.",
              "code": "import heapq\n\ndef largest(values, k):\n    h = []\n    for v in values:\n        heapq.heappush(h, v)\n        if len(h) > k:\n            heapq.heappop(h)\n    return sorted(h, reverse=True)\n\nprint(largest([7, 2, 9, 4, 9, 1, 6], 3))\ntasks = [(3, 'write'), (1, 'read'), (3, 'test')]\nheapq.heapify(tasks)\nprint([heapq.heappop(tasks)[1] for _ in range(3)])\n",
              "output": "[9, 9, 7]\n['read', 'test', 'write']\n"
            },
            {
              "title": "Why BFS is not enough with weights",
              "body": "Breadth-first search finds shortest paths when every edge costs the same, because it settles vertices in order of the number of edges. With different weights, a path with more edges can be shorter: two edges of length 1 beat one edge of length 5.\n\nDijkstra’s algorithm replaces the BFS queue with a priority queue keyed by tentative distance. Each step takes the unsettled vertex with the smallest tentative distance, and that distance is final: any other route must leave the settled region through some vertex at least as far away, and with non-negative weights it can only grow from there. The vertex’s edges are then relaxed: if going through it gives a neighbour a smaller distance, that distance is updated and pushed."
            },
            {
              "title": "Dijkstra with lazy deletion",
              "body": "heapq cannot decrease the key of an item already in the heap, so push a new entry whenever a distance improves and leave the old one inside. When an entry is popped, compare it with the recorded distance: if it is larger, the entry is stale and is skipped. This lazy deletion keeps the code short and adds at most one entry per relaxation, so the heap holds O(E) entries and the total time is O((V + E) log V).\n\nInitialise every distance to infinity, set the source to 0 and push (0, source). Represent the graph as an adjacency list of (neighbour, weight) pairs; for an undirected graph, add each edge in both directions.",
              "code": "import heapq\n\ndef dijkstra(graph, source):\n    dist = [float('inf')] * len(graph)\n    dist[source] = 0\n    heap = [(0, source)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]:\n            continue                      # a stale entry\n        for v, w in graph[u]:\n            if d + w < dist[v]:\n                dist[v] = d + w\n                heapq.heappush(heap, (d + w, v))\n    return dist\n\ngraph = [[(1, 5), (2, 1)], [(3, 1)], [(1, 1), (3, 6)], []]\nprint(dijkstra(graph, 0))\n",
              "output": "[0, 2, 1, 3]\n"
            },
            {
              "title": "Recovering the path",
              "body": "Distances say how far, not which way. Whenever an edge improves dist[v], record the previous vertex on its best known path, prev[v] = u. When the algorithm finishes, follow prev from the target back to the source and reverse the list. If the target was never reached, its distance is still infinite and there is no path, so check that before following pointers.\n\nWhen several shortest paths exist, the one recovered depends on the order of relaxations. If a statement asks for a particular one, such as the lexicographically smallest, that requirement must be built into the comparison or handled in a second pass.",
              "code": "import heapq\n\ngraph = [[(1, 5), (2, 1)], [(3, 1)], [(1, 1), (3, 6)], []]\ndist = [float('inf')] * 4\nprev = [None] * 4\ndist[0] = 0\nheap = [(0, 0)]\nwhile heap:\n    d, u = heapq.heappop(heap)\n    if d > dist[u]:\n        continue\n    for v, w in graph[u]:\n        if d + w < dist[v]:\n            dist[v], prev[v] = d + w, u\n            heapq.heappush(heap, (d + w, v))\n\npath, v = [], 3\nwhile v is not None:\n    path.append(v)\n    v = prev[v]\nprint(path[::-1], dist[3])\n",
              "output": "[0, 2, 1, 3] 3\n"
            },
            {
              "title": "Bigger states, same algorithm",
              "body": "Exam problems often add a condition: changing lines costs extra, a key opens doors, or one wall may be broken. Once the state includes the condition, the algorithm stays the same. If changing trains costs T, a state is (station, line): riding is an edge between states on the same line, and changing is an edge of weight T between states at the same station. If the cost is a pair, such as (walls broken, steps), Python tuples compare lexicographically and can serve as distances directly, as long as adding an edge never makes a cost smaller.\n\nCount the states before coding: stations times lines, or cells times key combinations, must stay within a few million in Python. Grid problems whose weights are only 0 and 1 can use a deque instead of a heap (0-1 BFS), but Dijkstra is always a correct fallback."
            },
            {
              "title": "When Dijkstra fails, and how to test it",
              "body": "The proof needs non-negative edge weights. With a negative edge, a vertex settled early could later be reached more cheaply, and the answer silently goes wrong; such problems need Bellman–Ford or a different model. Zero weights are fine.\n\nCommon bugs are forgetting the stale-entry check, which makes the algorithm slower but still correct; marking a vertex visited when it is pushed rather than when it is popped, which makes it wrong; and not building the adjacency list once, up front. To test, compare with Floyd–Warshall on random small graphs: three nested loops computing every pair in O(V³) are easy to get right and catch errors in the faster code.",
              "code": "INF = float('inf')\nn = 4\nd = [[0 if i == j else INF for j in range(n)] for i in range(n)]\nfor u, v, w in [(0, 1, 5), (0, 2, 1), (1, 3, 1), (2, 1, 1), (2, 3, 6)]:\n    d[u][v] = min(d[u][v], w)\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            d[i][j] = min(d[i][j], d[i][k] + d[k][j])\nprint(d[0])\n",
              "output": "[0, 2, 1, 3]\n"
            }
          ],
          "checkpoints": [
            {
              "question": "Why may an entry popped from the heap be skipped?",
              "answer": "A shorter distance was found after it was pushed, so its value is larger than dist[u] and the vertex has already been processed with the better distance."
            },
            {
              "question": "Can Dijkstra handle an edge of weight −2?",
              "answer": "No. The proof relies on non-negative weights; a negative edge can improve a vertex after its distance has been finalised."
            }
          ],
          "exerciseTitle": "Shortest distances",
          "task": "A city has N intersections numbered 1 to N and M two-way roads; road i joins u_i and v_i and takes w_i minutes. Several roads may join the same pair, and a road may join an intersection to itself. For every intersection, find the shortest travel time from intersection 1, or print -1 if it cannot be reached.",
          "input": "N M on the first line, then M lines u v w. 1 ≤ N ≤ 100000, 0 ≤ M ≤ 200000 and 0 ≤ w ≤ 10^9.",
          "output": "Print N lines; line k is the shortest time from 1 to k, or -1.",
          "hint": "Build an adjacency list with both directions, run Dijkstra with lazy deletion from vertex 1, and print -1 for distances that are still infinite.",
          "explanation": "The weights are non-negative, so Dijkstra applies. Store the graph as adj[u] = [(v, w), …] with each road added in both directions; parallel roads and self-loops need no special handling. Start from dist[1] = 0, pop the smallest entry, skip it if it is stale, and otherwise relax its edges. Each road causes at most two pushes, so the heap holds O(M) entries and the time is O((N + M) log N). Distances can reach about 10^14, which Python integers represent exactly. Collect the lines and print them at once."
        },
        "ja": {
          "title": "優先度付きキューと最短経路",
          "summary": "heapq で常に最小の要素を取り出し、その上に重み付きグラフのダイクストラ法を組み立てます。",
          "objectives": [
            "heapq でのプッシュとポップ、タプルの利用、符号反転による最大ヒープを使いこなす",
            "遅延削除を用いたダイクストラ法を実装し、それが正しい理由を説明する",
            "追加の条件をより大きな状態として表し、ダイクストラ法が使えない場合を見分ける"
          ],
          "sections": [
            {
              "title": "最小の要素を何度も取り出す",
              "body": "多くのアルゴリズムは、新しい要素が加わり続ける中で、残りの要素のうち最小のものを繰り返し取り出します。シミュレーションの次のイベント、最も安い未探索の選択肢、最も早い締め切りなどです。集合が変化するので、一度ソートするだけでは足りません。二分ヒープはどちらの操作も O(log n) で行えます。\n\nPython の heapq モジュールは、普通のリストをヒープの順序に保ちます。heappush(h, x) で要素を加え、heappop(h) で最小の要素を取り除いて返し、h[0] で取り除かずに最小値を見ます。heapify(h) は既存のリストを O(n) でヒープにします。リストはソートされているわけではなく、最小の要素が先頭にあることだけが保証されます。途中の要素に順序を期待してはいけません。",
              "code": "import heapq\n\nh = []\nfor x in [5, 1, 8, 3, 2]:\n    heapq.heappush(h, x)\nprint(h[0])\nprint([heapq.heappop(h) for _ in range(3)])\nprint(h)\n",
              "output": "1\n[1, 2, 3]\n[5, 8]\n"
            },
            {
              "title": "タプル、同点、大きい順",
              "body": "要素は < で比較されるので、タプルが自然に使えます。heappush(h, (priority, name)) は優先度の順に並び、等しければ名前で比べます。2 番目の要素が辞書のように比較できない可能性があるなら、間にカウンタを挟んで (priority, sequence_number, item) とします。heapq は最小ヒープしか提供しないので、大きい順に取り出したいときは優先度の符号を反転して入れ、取り出すときに戻します。\n\n典型的な使い方は、大きさ k のヒープでデータ列の上位 k 個を保つことです。値を入れるたびに、大きさが k を超えたら最小値を取り出します。全体をソートせずに O(n log k) で済みます。",
              "code": "import heapq\n\ndef largest(values, k):\n    h = []\n    for v in values:\n        heapq.heappush(h, v)\n        if len(h) > k:\n            heapq.heappop(h)\n    return sorted(h, reverse=True)\n\nprint(largest([7, 2, 9, 4, 9, 1, 6], 3))\ntasks = [(3, 'write'), (1, 'read'), (3, 'test')]\nheapq.heapify(tasks)\nprint([heapq.heappop(tasks)[1] for _ in range(3)])\n",
              "output": "[9, 9, 7]\n['read', 'test', 'write']\n"
            },
            {
              "title": "重みがあると BFS では足りない",
              "body": "すべての辺のコストが等しいとき、幅優先探索は辺の数の順に頂点を確定させるので、最短経路が求まります。コストが異なると、辺の多い経路のほうが短いことがあります。長さ 1 の辺 2 本は、長さ 5 の辺 1 本より短いのです。\n\nダイクストラ法は、BFS のキューを暫定距離をキーとする優先度付きキューに置き換えます。各段階で暫定距離が最小の未確定の頂点を取り出すと、その距離は確定します。他の経路は、確定した領域から距離がそれ以上の頂点を通って出ていくしかなく、重みが非負ならそこから長くなる一方だからです。そのあと、その頂点の辺を緩和します。それを経由すると隣の頂点の距離が小さくなるなら、距離を更新してヒープに入れます。"
            },
            {
              "title": "遅延削除によるダイクストラ法",
              "body": "heapq では、ヒープにすでにある要素のキーを小さくすることができません。代わりに、距離が改善するたびに新しい要素を入れ、古い要素はそのまま残します。取り出した要素は記録された距離と比べ、それより大きければ古い要素なので飛ばします。この遅延削除によってコードは短くなり、緩和 1 回につき要素は高々 1 つ増えるだけなので、ヒープの要素数は O(E)、全体の時間は O((V + E) log V) です。\n\n距離を無限大で初期化し、始点を 0 にして (0, 始点) を入れます。グラフは (隣接頂点, 重み) の組の隣接リストで表し、無向グラフなら各辺を両方向に加えます。",
              "code": "import heapq\n\ndef dijkstra(graph, source):\n    dist = [float('inf')] * len(graph)\n    dist[source] = 0\n    heap = [(0, source)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]:\n            continue                      # a stale entry\n        for v, w in graph[u]:\n            if d + w < dist[v]:\n                dist[v] = d + w\n                heapq.heappush(heap, (d + w, v))\n    return dist\n\ngraph = [[(1, 5), (2, 1)], [(3, 1)], [(1, 1), (3, 6)], []]\nprint(dijkstra(graph, 0))\n",
              "output": "[0, 2, 1, 3]\n"
            },
            {
              "title": "経路を復元する",
              "body": "距離は「どれだけ遠いか」には答えますが、「どう行くか」には答えません。辺によって dist[v] が改善されるたびに、v への最良の経路における直前の頂点 prev[v] = u を記録します。アルゴリズムが終わったら、終点から prev をたどって始点まで戻り、リストを反転します。終点に一度も到達していなければ距離は無限大のままで、経路はありません。たどる前に確認しましょう。\n\n最短経路が複数あるとき、どれが復元されるかは緩和の順序に依存します。辞書順最小のように特定の経路が求められているなら、その要求を比較に組み込むか、別の処理を加える必要があります。",
              "code": "import heapq\n\ngraph = [[(1, 5), (2, 1)], [(3, 1)], [(1, 1), (3, 6)], []]\ndist = [float('inf')] * 4\nprev = [None] * 4\ndist[0] = 0\nheap = [(0, 0)]\nwhile heap:\n    d, u = heapq.heappop(heap)\n    if d > dist[u]:\n        continue\n    for v, w in graph[u]:\n        if d + w < dist[v]:\n            dist[v], prev[v] = d + w, u\n            heapq.heappush(heap, (d + w, v))\n\npath, v = [], 3\nwhile v is not None:\n    path.append(v)\n    v = prev[v]\nprint(path[::-1], dist[3])\n",
              "output": "[0, 2, 1, 3] 3\n"
            },
            {
              "title": "状態を大きくしてもアルゴリズムは同じ",
              "body": "試験の問題には、乗り換えに余分な時間がかかる、鍵で扉が開く、壁を 1 つ壊せる、といった条件がよく加わります。状態がその条件を含めば、アルゴリズムは変わりません。乗り換えに T かかるなら、状態は (駅, 路線) です。乗車は同じ路線上の状態どうしの辺、乗り換えは同じ駅の状態どうしを結ぶ重み T の辺になります。コストが (壊した壁の数, 歩数) のような組なら、Python のタプルは辞書式に比較されるので、辺を加えてコストが小さくなることがない限り、そのまま距離として使えます。\n\nコードを書く前に状態数を数えましょう。駅の数 × 路線の数、あるいはマスの数 × 鍵の状態の数が、Python では数百万程度に収まる必要があります。重みが 0 と 1 だけのグリッドなら、ヒープの代わりに両端キューを使う 0-1 BFS も使えますが、ダイクストラ法は常に正しい代替手段です。"
            },
            {
              "title": "ダイクストラ法が使えないとき、そして試し方",
              "body": "証明には、辺の重みが非負であることが必要です。負の辺があると、早く確定した頂点に、あとからもっと安く到達できることがあり、答えが知らないうちに誤ります。そのような問題には、ベルマン–フォード法か別の定式化が必要です。重み 0 は問題ありません。\n\nよくある誤りは、古い要素の検査を忘れる（遅くなるが正しい）、頂点を取り出したときではなく入れたときに訪問済みにする（誤った答えになる）、隣接リストを最初に一度で作らない、などです。テストには、ランダムな小さいグラフでワーシャル–フロイド法と比べます。O(V³) の三重ループですべての組の距離を求めるコードは正しく書きやすく、速い版の誤りを見つけてくれます。",
              "code": "INF = float('inf')\nn = 4\nd = [[0 if i == j else INF for j in range(n)] for i in range(n)]\nfor u, v, w in [(0, 1, 5), (0, 2, 1), (1, 3, 1), (2, 1, 1), (2, 3, 6)]:\n    d[u][v] = min(d[u][v], w)\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            d[i][j] = min(d[i][j], d[i][k] + d[k][j])\nprint(d[0])\n",
              "output": "[0, 2, 1, 3]\n"
            }
          ],
          "checkpoints": [
            {
              "question": "ヒープから取り出した要素を飛ばしてよいのはなぜですか。",
              "answer": "入れたあとに、もっと短い距離が見つかったからです。その値は dist[u] より大きく、頂点はすでにより良い距離で処理されています。"
            },
            {
              "question": "重み −2 の辺をダイクストラ法で扱えますか。",
              "answer": "扱えません。証明は重みが非負であることに依存しており、負の辺は確定後の頂点の距離を改善しうるからです。"
            }
          ],
          "exerciseTitle": "最短距離",
          "task": "ある都市には、1 から N の番号が付いた N 個の交差点と、M 本の双方向の道路があります。道路 i は u_i と v_i を結び、通るのに w_i 分かかります。同じ 2 つの交差点を結ぶ道路が複数あることも、交差点とそれ自身を結ぶ道路があることもあります。各交差点について、交差点 1 からの最短の所要時間を求めてください。到達できない場合は -1 を出力します。",
          "input": "1 行目に N M、続く M 行に u v w が与えられます。1 ≤ N ≤ 100000、0 ≤ M ≤ 200000、0 ≤ w ≤ 10^9 です。",
          "output": "N 行出力してください。k 行目は 1 から k への最短の所要時間、または -1 です。",
          "hint": "双方向の隣接リストを作り、頂点 1 から遅延削除を用いたダイクストラ法を実行して、距離が無限大のままの頂点には -1 を出力します。",
          "explanation": "重みは非負なので、ダイクストラ法が使えます。グラフは adj[u] = [(v, w), …] として持ち、各道路を両方向に加えます。平行な道路や自己ループに特別な処理は要りません。dist[1] = 0 から始め、最小の要素を取り出し、古ければ飛ばし、そうでなければその辺を緩和します。各道路が引き起こすプッシュは高々 2 回なので、ヒープの要素数は O(M)、時間は O((N + M) log N) です。距離は約 10^14 に達しますが、Python の整数で正確に扱えます。出力の各行は集めてから、まとめて出力します。"
        }
      },
      "order": 27,
      "stage": "exam",
      "minutes": 55,
      "prerequisiteIds": [
        "recursion-and-memoization"
      ],
      "relatedProblems": [
        "ABC340D",
        "CI-RAIL-2",
        "CI-MAP-4"
      ],
      "solution": "import heapq\nimport sys\n\ndata = sys.stdin.read().split()\nn, m = int(data[0]), int(data[1])\nadj = [[] for _ in range(n + 1)]\nfor i in range(m):\n    u, v, w = int(data[2 + 3 * i]), int(data[3 + 3 * i]), int(data[4 + 3 * i])\n    adj[u].append((v, w))\n    adj[v].append((u, w))\n\nINF = float('inf')\ndist = [INF] * (n + 1)\ndist[1] = 0\nheap = [(0, 1)]\nwhile heap:\n    d, u = heapq.heappop(heap)\n    if d > dist[u]:\n        continue\n    for v, w in adj[u]:\n        if d + w < dist[v]:\n            dist[v] = d + w\n            heapq.heappush(heap, (d + w, v))\n\nprint('\\n'.join(str(d) if d < INF else '-1' for d in dist[1:]))\n",
      "starter": "import heapq\nimport sys\n\ndata = sys.stdin.read().split()\nn, m = int(data[0]), int(data[1])\nadj = [[] for _ in range(n + 1)]\n# TODO: read the roads, run Dijkstra from 1 and print the distances\n",
      "tests": [
        {
          "input": "4 5\n1 2 5\n1 3 1\n3 2 1\n2 4 1\n3 4 6\n",
          "expected": "0\n2\n1\n3\n"
        },
        {
          "input": "3 1\n1 2 7\n",
          "expected": "0\n7\n-1\n"
        },
        {
          "input": "1 0\n",
          "expected": "0\n"
        },
        {
          "input": "3 4\n1 2 10\n1 2 3\n2 2 1\n2 3 0\n",
          "expected": "0\n3\n3\n"
        },
        {
          "input": "3 2\n1 2 1000000000\n2 3 1000000000\n",
          "expected": "0\n1000000000\n2000000000\n"
        },
        {
          "input": "5 6\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n1 5 10\n1 3 5\n",
          "expected": "0\n1\n2\n3\n4\n"
        }
      ]
    },
    {
      "id": "simulation-and-parsing",
      "content": {
        "zh": {
          "title": "模拟与解析",
          "summary": "把规则写成逐步执行的代码：先把输入解析成数据，让状态一目了然，状态重复时跳过剩余的周期。",
          "objectives": [
            "在执行之前把命令解析成结构化的数据",
            "写出状态明确、步数清楚的模拟循环",
            "用字典检测重复的状态，并跳过剩余的周期"
          ],
          "sections": [
            {
              "title": "状态、规则与终止",
              "body": "模拟题描述一个系统以及它变化的规则：按命令移动的机器人、运行程序的机器、排队的顾客。写代码之前，先写下三件事。状态：下一步所依赖的每一个值，例如位置和方向，或者程序计数器和栈。规则：一步如何改变状态。终止条件：最后一条指令、步数上限或者某个事件。\n\n如果两种情况今后的表现不同，而你的状态却无法区分它们，状态就不完整。模拟中的许多错误答案，源于状态散落在一堆命名随意的变量里；把它们归在一起，哪怕只是一个元组，也会让每一步更容易检查。",
              "code": "moves = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}\nright = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}\nleft = {after: before for before, after in right.items()}\n\nx, y, facing = 0, 0, 'N'\nfor command in 'FFRFFRFLF':\n    if command == 'F':\n        dx, dy = moves[facing]\n        x, y = x + dx, y + dy\n    elif command == 'R':\n        facing = right[facing]\n    else:\n        facing = left[facing]\nprint(x, y, facing)\n",
              "output": "3 1 E\n"
            },
            {
              "title": "先解析，再执行",
              "body": "把读入和运行分开。把输入的每一行变成一条小记录，例如 ('PUSH', 5) 或 ('JMP', 'loop')，解析时顺便把标签或名字存进字典。之后的执行循环只处理干净的数据：最内层的循环里不再拆分字符串，也不会被多余的空格坑到。\n\n解析也是做检查的地方：未知的指令或缺少的参数，在还知道行号的时候报告最容易。对文本形式的指令，用 line.split() 拆出名字和参数通常就够了；maxsplit=1 能完整保留一个自由文本的参数。错误信息需要引用行号时，让每条记录都带上原来的行号。",
              "code": "source = \"\"\"PUSH 3\nPUSH 4\nADD\nPRINT\"\"\"\nprogram = []\nfor number, line in enumerate(source.splitlines(), 1):\n    name, *args = line.split()\n    program.append((number, name, [int(a) for a in args]))\nprint(program)\n",
              "output": "[(1, 'PUSH', [3]), (2, 'PUSH', [4]), (3, 'ADD', []), (4, 'PRINT', [])]\n"
            },
            {
              "title": "表达式的记号",
              "body": "像 12*(3+4) 这样的表达式分两步解析。记号化把文本切成数字、运算符和括号；re.findall(r'\\d+|[-+*/()]', text) 一行就能完成，并且自动跳过空格。然后由解析器按照文法处理。\n\n对于通常的优先级，每一层写一个函数：表达式是用 + 和 - 连接的项，项是用 * 连接的因子，因子是一个数或者括号里的表达式。各函数从共享的位置读取记号，返回一个值，或者在编译器中生成指令。这种递归下降与文法的对应如此紧密，可以逐行对照文法检查代码。",
              "code": "import re\n\ndef evaluate(text):\n    tokens = re.findall(r'\\d+|[-+*()]', text)\n    pos = 0\n\n    def expression():\n        nonlocal pos\n        value = term()\n        while pos < len(tokens) and tokens[pos] in ('+', '-'):\n            op = tokens[pos]\n            pos += 1\n            value = value + term() if op == '+' else value - term()\n        return value\n\n    def term():\n        nonlocal pos\n        value = factor()\n        while pos < len(tokens) and tokens[pos] == '*':\n            pos += 1\n            value *= factor()\n        return value\n\n    def factor():\n        nonlocal pos\n        token = tokens[pos]\n        pos += 1\n        if token == '(':\n            value = expression()\n            pos += 1                      # skip ')'\n            return value\n        return int(token)\n\n    return expression()\n\nprint(evaluate('12 * (3 + 4) - 5'))\nprint(evaluate('2 - 3 - 4'))\n",
              "output": "79\n-5\n"
            },
            {
              "title": "步进循环",
              "body": "写主循环时，让每次迭代恰好对应规则中的一步：取出当前的指令或事件，检查终止条件，应用规则，更新计数器，并且始终保持同样的顺序。要精确决定计数的对象：最后的 HALT 算不算一步，转向是否耗时，上限是在一步之前还是之后检查。\n\n步数上的差一错误是这类题中最常见的错误，所以要用一个能手工数清的小例子来测试。有步数上限时，把检查放在循环的开头，这样恰好在上限处停止的程序不会被误判。用字典把每个指令名映射到一个小函数，可以让一长串 if 语句保持可读。",
              "code": "program = [('PUSH', 3), ('PUSH', 4), ('ADD', None), ('PRINT', None), ('HALT', None), ('PUSH', 9)]\nstack, pc, steps = [], 0, 0\nwhile pc < len(program):\n    op, arg = program[pc]\n    pc += 1\n    steps += 1\n    if op == 'PUSH':\n        stack.append(arg)\n    elif op == 'ADD':\n        b, a = stack.pop(), stack.pop()\n        stack.append(a + b)\n    elif op == 'PRINT':\n        print(stack.pop())\n    elif op == 'HALT':\n        break\nprint('steps', steps)\n",
              "output": "7\nsteps 5\n"
            },
            {
              "title": "当状态重复时",
              "body": "有的问题要求经过极多步——例如 10^18 步——之后的状态，无法一步一步模拟。如果状态空间是有限的，状态序列终究会重复，此后便进入循环。用字典记录每个状态第一次出现时的步数；当前状态已经在字典里时，两个步数之差就是周期的长度。剩余的步数对周期长度取模，只需再模拟余下的那几步。\n\n用作键的状态必须完整：如果只存了位置，而方向同样重要，那么两次到达同一位置并不是同一个状态，跳跃就会出错。",
              "code": "def state_after(start, step, k):\n    seen = {}\n    x, t = start, 0\n    while t < k:\n        if x in seen:\n            cycle = t - seen[x]\n            for _ in range((k - t) % cycle):\n                x = step(x)\n            return x\n        seen[x] = t\n        x = step(x)\n        t += 1\n    return x\n\nf = lambda x: (x * x + 1) % 100\nprint([state_after(3, f, k) for k in range(8)])\nprint(state_after(3, f, 10**18))\n",
              "output": "[3, 10, 1, 2, 5, 26, 77, 30]\n5\n"
            },
            {
              "title": "让模拟可以检查",
              "body": "模拟是由许多小规则组成的长代码，所以要准备好观察内部的手段。用一个开关控制的跟踪模式在每一步之后打印状态，就能把错误的答案变成一串可以与手算比较的状态。断言写出必须成立的不变量，例如栈为空时不能弹出、位置必须在网格之内；它们抓住的是第一次违规，而不是最后的症状。\n\n用只包含某一条规则的程序或命令串，单独测试每条规则。涉及周期跳跃时，对几百以内的每个 k，把快速版本与朴素的模拟比较：任何不一致，都说明周期的计算有差一错误。"
            },
            {
              "title": "读长题目",
              "body": "模拟题的题面很长，因为每条规则都必须说清楚。拿着笔读：划出每条规则，记下每个数字及其单位，写下题面已经说明的边界情况，例如到达边界或出现平局时会怎样。动手写代码之前，先手工复现样例；如果手算的结果与样例输出不一致，误解出在阅读上，再怎么调试也修不好。\n\n在多小问的考题中，后面的小问通常会扩展同一个模拟，所以第一问的代码就要考虑到这一点：解析函数、状态和单步函数容易扩展，一整块嵌套循环则不然。"
            }
          ],
          "checkpoints": [
            {
              "question": "为什么在执行带跳转的程序之前，要先解析所有的行？",
              "answer": "跳转的目标标签可能在后面；先解析能记下每个标签，执行时处理的是干净的记录及其行号。"
            },
            {
              "question": "机器人的位置出现了重复，但跳过周期之后的答案是错的。可能的原因是什么？",
              "answer": "状态不完整：方向或命令的下标也决定今后的行为，必须作为字典键的一部分。"
            }
          ],
          "exerciseTitle": "传送门",
          "task": "有 N 个城镇，编号为 1 到 N。城镇 i 有一个传送门，会把人送到城镇 A_i。你从城镇 1 出发，恰好使用传送门 K 次。最后你在哪个城镇？",
          "input": "第一行是 N K，第二行是 A_1 … A_N。1 ≤ N ≤ 200000，1 ≤ A_i ≤ N，1 ≤ K ≤ 10^18。",
          "output": "输出最后所在的城镇。",
          "hint": "模拟的同时，记录第一次到达每个城镇时的步数。某个城镇再次出现时，把剩余的步数对周期长度取模。",
          "explanation": "状态就是当前所在的城镇，至多有 N 种，所以 N + 1 步之内必有城镇重复。记录 first[v] = t，表示第 t 步时第一次到达 v。当前城镇 v 在第 t 步时已经出现过，那么此后的行程以长度 t − first[v] 循环。把剩余的 K − t 步对周期长度取模后直接模拟，至多再走 N 步。如果在出现重复之前就已走完 K 步，模拟本身就给出了答案。总时间为 O(N)。同样的思路适用于任何状态空间小、步数巨大的确定性过程。"
        },
        "en": {
          "title": "Simulation and parsing",
          "summary": "Turn rules into code that executes them step by step: parse the input into data first, keep the state explicit, and skip ahead when the state repeats.",
          "objectives": [
            "Parse commands into structured data before executing them",
            "Write a simulation loop with an explicit state and a clear step count",
            "Detect a repeated state with a dictionary and jump over the remaining cycles"
          ],
          "sections": [
            {
              "title": "State, rules, stopping",
              "body": "A simulation problem describes a system and the rules by which it changes: a robot following commands, a machine running a program, a queue of customers. Before coding, write down three things. The state: every value the next step depends on, such as a position and a direction, or a program counter and a stack. The rules: how one step transforms the state. The stopping condition: a final instruction, a step limit or some event.\n\nIf two situations would behave differently later but your state cannot tell them apart, the state is incomplete. Many wrong answers in simulations come from state spread across loosely named variables; grouping it, even in a tuple, makes each step easier to check.",
              "code": "moves = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}\nright = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}\nleft = {after: before for before, after in right.items()}\n\nx, y, facing = 0, 0, 'N'\nfor command in 'FFRFFRFLF':\n    if command == 'F':\n        dx, dy = moves[facing]\n        x, y = x + dx, y + dy\n    elif command == 'R':\n        facing = right[facing]\n    else:\n        facing = left[facing]\nprint(x, y, facing)\n",
              "output": "3 1 E\n"
            },
            {
              "title": "Parse first, then execute",
              "body": "Separate reading from running. Turn each input line into a small record, such as ('PUSH', 5) or ('JMP', 'loop'), and store labels or names in a dictionary while parsing. The execution loop then works with clean data: no string splitting inside the innermost loop, and no surprises from stray spaces.\n\nParsing is also the place to validate: an unknown instruction or a missing argument is easiest to report while you still know the line number. For instructions written as text, line.split() into a name and arguments is usually enough, and maxsplit=1 keeps a free-text argument intact. Keep the original line number in each record when error messages must refer to it.",
              "code": "source = \"\"\"PUSH 3\nPUSH 4\nADD\nPRINT\"\"\"\nprogram = []\nfor number, line in enumerate(source.splitlines(), 1):\n    name, *args = line.split()\n    program.append((number, name, [int(a) for a in args]))\nprint(program)\n",
              "output": "[(1, 'PUSH', [3]), (2, 'PUSH', [4]), (3, 'ADD', []), (4, 'PRINT', [])]\n"
            },
            {
              "title": "Tokens for expressions",
              "body": "An expression such as 12*(3+4) is parsed in two steps. A tokenizer splits the text into numbers, operators and parentheses; re.findall(r'\\d+|[-+*/()]', text) does it in one line and skips the spaces. A parser then follows the grammar.\n\nFor the usual precedence, write one function per level: an expression is terms joined by + and -, a term is factors joined by *, and a factor is a number or a parenthesised expression. Each function consumes tokens from a shared position and returns a value, or emits instructions in a compiler. This recursive descent mirrors the grammar so closely that the code can be checked against it line by line.",
              "code": "import re\n\ndef evaluate(text):\n    tokens = re.findall(r'\\d+|[-+*()]', text)\n    pos = 0\n\n    def expression():\n        nonlocal pos\n        value = term()\n        while pos < len(tokens) and tokens[pos] in ('+', '-'):\n            op = tokens[pos]\n            pos += 1\n            value = value + term() if op == '+' else value - term()\n        return value\n\n    def term():\n        nonlocal pos\n        value = factor()\n        while pos < len(tokens) and tokens[pos] == '*':\n            pos += 1\n            value *= factor()\n        return value\n\n    def factor():\n        nonlocal pos\n        token = tokens[pos]\n        pos += 1\n        if token == '(':\n            value = expression()\n            pos += 1                      # skip ')'\n            return value\n        return int(token)\n\n    return expression()\n\nprint(evaluate('12 * (3 + 4) - 5'))\nprint(evaluate('2 - 3 - 4'))\n",
              "output": "79\n-5\n"
            },
            {
              "title": "The step loop",
              "body": "Write the main loop so that one iteration is exactly one step of the rules: fetch the current instruction or event, check the stopping conditions, apply the rule and update the counters, always in the same order. Decide precisely what is counted: whether the final HALT is a step, whether turning takes time, and whether a limit is checked before or after a step.\n\nOff-by-one errors in step counts are the most common mistake in these problems, so test on a tiny case you can count by hand. When a step limit applies, put the check at the top of the loop, so that a program stopping exactly at the limit is not misreported. A dictionary that maps each instruction name to a small function keeps a long chain of if statements readable.",
              "code": "program = [('PUSH', 3), ('PUSH', 4), ('ADD', None), ('PRINT', None), ('HALT', None), ('PUSH', 9)]\nstack, pc, steps = [], 0, 0\nwhile pc < len(program):\n    op, arg = program[pc]\n    pc += 1\n    steps += 1\n    if op == 'PUSH':\n        stack.append(arg)\n    elif op == 'ADD':\n        b, a = stack.pop(), stack.pop()\n        stack.append(a + b)\n    elif op == 'PRINT':\n        print(stack.pop())\n    elif op == 'HALT':\n        break\nprint('steps', steps)\n",
              "output": "7\nsteps 5\n"
            },
            {
              "title": "When the state repeats",
              "body": "Some problems ask for the state after an enormous number of steps, such as 10^18 moves, which cannot be simulated one by one. If the state space is finite, the sequence of states must eventually repeat, and from then on it cycles. Store the step at which each state was first seen in a dictionary; when the current state is already there, the difference between the two steps is the cycle length. Reduce the remaining steps modulo that length and simulate only the remainder.\n\nThe state used as the key must be complete: if only the position is stored but the direction matters too, two visits to the same position are not the same state, and the jump goes wrong.",
              "code": "def state_after(start, step, k):\n    seen = {}\n    x, t = start, 0\n    while t < k:\n        if x in seen:\n            cycle = t - seen[x]\n            for _ in range((k - t) % cycle):\n                x = step(x)\n            return x\n        seen[x] = t\n        x = step(x)\n        t += 1\n    return x\n\nf = lambda x: (x * x + 1) % 100\nprint([state_after(3, f, k) for k in range(8)])\nprint(state_after(3, f, 10**18))\n",
              "output": "[3, 10, 1, 2, 5, 26, 77, 30]\n5\n"
            },
            {
              "title": "Make the simulation checkable",
              "body": "A simulation is long code made of many small rules, so build ways to look inside it. A trace mode, switched on by a flag, that prints the state after every step turns a wrong answer into a list of states you can compare with a hand calculation. Assertions state invariants that must hold, such as never popping an empty stack or a position staying inside the grid; they catch the first violation instead of the final symptom.\n\nTest each rule with a program or command string that uses only that rule. When cycle skipping is involved, compare the fast version with plain simulation for every k up to a few hundred: any mismatch points to an off-by-one in the cycle arithmetic."
            },
            {
              "title": "Reading a long statement",
              "body": "Simulation statements are long because every rule has to be specified. Read them with a pencil: underline each rule, note every number with its unit, and write down the edge cases the statement settles, such as what happens at a border or on a tie. Then reproduce the sample by hand before coding; if your hand calculation disagrees with the sample output, the misunderstanding is in the reading, and no amount of debugging will fix it.\n\nIn a multi-part exam question, later parts usually extend the same simulation, so structure the code for the first part with that in mind: a parsing function, a state and a step function are easy to extend; one block of nested loops is not."
            }
          ],
          "checkpoints": [
            {
              "question": "Why parse every line before executing a program with jumps?",
              "answer": "A jump may target a label further down. Parsing first records every label, and execution then works with clean records and their line numbers."
            },
            {
              "question": "A robot’s position repeats, but the answer after skipping cycles is wrong. What is a likely cause?",
              "answer": "The state is incomplete: the direction or the command index also determines the future and must be part of the dictionary key."
            }
          ],
          "exerciseTitle": "Teleporters",
          "task": "There are N towns numbered 1 to N. Town i has a teleporter that sends you to town A_i. You start in town 1 and use a teleporter exactly K times. In which town do you end up?",
          "input": "N K on the first line and A_1 … A_N on the second. 1 ≤ N ≤ 200000, 1 ≤ A_i ≤ N and 1 ≤ K ≤ 10^18.",
          "output": "Print the final town.",
          "hint": "Simulate while recording the step at which each town is first reached. When a town repeats, reduce the remaining steps modulo the cycle length.",
          "explanation": "The state is the current town, so there are at most N states, and some town repeats within N + 1 steps. Record first[v] = t, the step at which v was first reached. When the current town v at step t has been seen before, the walk from then on repeats with cycle length t − first[v]. Reduce the remaining K − t steps modulo that length and simulate the rest directly, at most N more steps. If K steps are completed before anything repeats, the simulation itself gives the answer. The total time is O(N), and the same idea works for any deterministic process with a small state space and a huge number of steps."
        },
        "ja": {
          "title": "シミュレーションと構文解析",
          "summary": "規則を 1 ステップずつ実行するコードにします。入力を先にデータへ解析し、状態をはっきり持ち、状態が繰り返したら残りの周期を飛ばします。",
          "objectives": [
            "実行の前に命令を構造化されたデータへ解析する",
            "状態が明確で、ステップ数のはっきりしたシミュレーションのループを書く",
            "辞書で状態の繰り返しを検出し、残りの周期を飛ばす"
          ],
          "sections": [
            {
              "title": "状態、規則、停止",
              "body": "シミュレーションの問題は、ある系と、それが変化する規則を記述します。命令に従って動くロボット、プログラムを実行する機械、列に並ぶ客などです。コードを書く前に 3 つのことを書き出します。状態は、次のステップが依存するすべての値で、位置と向き、あるいはプログラムカウンタとスタックなどです。規則は、1 ステップで状態がどう変わるかです。停止条件は、最後の命令、ステップ数の上限、何らかの出来事です。\n\n今後のふるまいが異なる 2 つの状況を、あなたの状態が区別できないなら、状態は不完全です。シミュレーションの誤答の多くは、状態がいい加減な名前の変数に散らばっていることから生じます。タプルでもよいのでまとめておくと、各ステップを確かめやすくなります。",
              "code": "moves = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}\nright = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}\nleft = {after: before for before, after in right.items()}\n\nx, y, facing = 0, 0, 'N'\nfor command in 'FFRFFRFLF':\n    if command == 'F':\n        dx, dy = moves[facing]\n        x, y = x + dx, y + dy\n    elif command == 'R':\n        facing = right[facing]\n    else:\n        facing = left[facing]\nprint(x, y, facing)\n",
              "output": "3 1 E\n"
            },
            {
              "title": "先に解析し、それから実行する",
              "body": "読み込みと実行を分けます。入力の各行を ('PUSH', 5) や ('JMP', 'loop') のような小さなレコードに変換し、解析の途中でラベルや名前を辞書に記録します。実行ループはきれいなデータだけを扱うので、内側のループで文字列を分割することも、余分な空白に悩まされることもありません。\n\n解析は検査の場でもあります。未知の命令や引数の不足は、行番号が分かっているうちに報告するのが最も簡単です。テキストで書かれた命令なら、line.split() で名前と引数に分ければたいてい十分で、maxsplit=1 を使えば自由な文字列の引数をそのまま残せます。エラーで行番号を示す必要があるなら、各レコードに元の行番号を持たせます。",
              "code": "source = \"\"\"PUSH 3\nPUSH 4\nADD\nPRINT\"\"\"\nprogram = []\nfor number, line in enumerate(source.splitlines(), 1):\n    name, *args = line.split()\n    program.append((number, name, [int(a) for a in args]))\nprint(program)\n",
              "output": "[(1, 'PUSH', [3]), (2, 'PUSH', [4]), (3, 'ADD', []), (4, 'PRINT', [])]\n"
            },
            {
              "title": "式のトークン",
              "body": "12*(3+4) のような式は 2 段階で解析します。字句解析で文字列を数・演算子・括弧に分けます。re.findall(r'\\d+|[-+*/()]', text) なら 1 行で済み、空白も読み飛ばされます。次に、構文解析器が文法に従って処理します。\n\n通常の優先順位なら、段階ごとに 1 つの関数を書きます。式は + と - で結ばれた項、項は * で結ばれた因子、因子は数か括弧で囲まれた式です。各関数は共有の位置からトークンを読み、値を返すか、コンパイラなら命令を出力します。この再帰下降は文法と非常によく対応するので、コードを文法と 1 行ずつ照らし合わせて確かめられます。",
              "code": "import re\n\ndef evaluate(text):\n    tokens = re.findall(r'\\d+|[-+*()]', text)\n    pos = 0\n\n    def expression():\n        nonlocal pos\n        value = term()\n        while pos < len(tokens) and tokens[pos] in ('+', '-'):\n            op = tokens[pos]\n            pos += 1\n            value = value + term() if op == '+' else value - term()\n        return value\n\n    def term():\n        nonlocal pos\n        value = factor()\n        while pos < len(tokens) and tokens[pos] == '*':\n            pos += 1\n            value *= factor()\n        return value\n\n    def factor():\n        nonlocal pos\n        token = tokens[pos]\n        pos += 1\n        if token == '(':\n            value = expression()\n            pos += 1                      # skip ')'\n            return value\n        return int(token)\n\n    return expression()\n\nprint(evaluate('12 * (3 + 4) - 5'))\nprint(evaluate('2 - 3 - 4'))\n",
              "output": "79\n-5\n"
            },
            {
              "title": "ステップのループ",
              "body": "メインループは、1 回の反復がちょうど規則の 1 ステップになるように書きます。現在の命令や出来事を取り出し、停止条件を調べ、規則を適用し、カウンタを更新します。順序は常に同じにします。何を数えるかを正確に決めましょう。最後の HALT を 1 ステップと数えるか、向きを変えるのに時間がかかるか、上限をステップの前と後のどちらで調べるか、などです。\n\nステップ数の 1 ずれは、この種の問題で最もよくある誤りなので、手で数えられる小さな例で試します。ステップ数に上限があるなら、検査をループの先頭に置けば、ちょうど上限で止まるプログラムを誤って判定しません。命令名から小さな関数への辞書を使うと、長い if の連鎖も読みやすく保てます。",
              "code": "program = [('PUSH', 3), ('PUSH', 4), ('ADD', None), ('PRINT', None), ('HALT', None), ('PUSH', 9)]\nstack, pc, steps = [], 0, 0\nwhile pc < len(program):\n    op, arg = program[pc]\n    pc += 1\n    steps += 1\n    if op == 'PUSH':\n        stack.append(arg)\n    elif op == 'ADD':\n        b, a = stack.pop(), stack.pop()\n        stack.append(a + b)\n    elif op == 'PRINT':\n        print(stack.pop())\n    elif op == 'HALT':\n        break\nprint('steps', steps)\n",
              "output": "7\nsteps 5\n"
            },
            {
              "title": "状態が繰り返すとき",
              "body": "10^18 回の移動のように、とてつもない数のステップのあとの状態を問う問題があります。1 ステップずつシミュレーションすることはできません。状態空間が有限なら、状態の列はいつか必ず繰り返し、それ以降は周期的になります。各状態が最初に現れたステップを辞書に記録し、現在の状態がすでに辞書にあれば、2 つのステップの差が周期の長さです。残りのステップ数を周期の長さで割った余りを求め、その分だけシミュレーションすれば済みます。\n\nキーとして使う状態は完全でなければなりません。位置だけを記録していても向きが重要なら、同じ位置に 2 度来ても同じ状態ではなく、飛ばし方が誤ります。",
              "code": "def state_after(start, step, k):\n    seen = {}\n    x, t = start, 0\n    while t < k:\n        if x in seen:\n            cycle = t - seen[x]\n            for _ in range((k - t) % cycle):\n                x = step(x)\n            return x\n        seen[x] = t\n        x = step(x)\n        t += 1\n    return x\n\nf = lambda x: (x * x + 1) % 100\nprint([state_after(3, f, k) for k in range(8)])\nprint(state_after(3, f, 10**18))\n",
              "output": "[3, 10, 1, 2, 5, 26, 77, 30]\n5\n"
            },
            {
              "title": "シミュレーションを確かめられるようにする",
              "body": "シミュレーションは小さな規則がたくさん集まった長いコードなので、中を観察する手段を用意します。フラグで切り替えるトレース表示で各ステップのあとの状態を出力すれば、誤った答えを、手計算と比べられる状態の列に変えられます。アサーションは、空のスタックから取り出さない、位置がグリッドの中にある、といった成り立つべき不変条件を書くもので、最後の症状ではなく最初の違反を捉えます。\n\n各規則は、その規則だけを使うプログラムや命令列で個別に試します。周期の飛ばしを含むときは、数百までの各 k について、速い版と素朴なシミュレーションを比べます。食い違いがあれば、周期の計算に 1 ずれがあります。"
            },
            {
              "title": "長い問題文を読む",
              "body": "シミュレーションの問題文は、すべての規則を明記する必要があるので長くなります。鉛筆を持って読みましょう。各規則に線を引き、数値は単位とともに書き留め、境界に達したときや同点のときにどうなるかなど、問題文が定めている境界の場合を例として書き出します。そしてコードを書く前に、入力例を手で再現します。手計算が出力例と合わないなら、誤解は読解にあり、いくらデバッグしても直りません。\n\n複数の小問からなる試験問題では、後の小問がたいてい同じシミュレーションを拡張するので、最初の小問のコードからそれを意識した構成にします。解析の関数、状態、1 ステップの関数は拡張しやすく、ひとかたまりの入れ子のループはそうではありません。"
            }
          ],
          "checkpoints": [
            {
              "question": "ジャンプを含むプログラムを実行する前に、すべての行を解析するのはなぜですか。",
              "answer": "ジャンプ先のラベルが後ろにあることがあるからです。先に解析すればすべてのラベルが記録され、実行時はきれいなレコードとその行番号だけを扱えます。"
            },
            {
              "question": "ロボットの位置が繰り返したのに、周期を飛ばしたあとの答えが誤っています。考えられる原因は何ですか。",
              "answer": "状態が不完全です。向きや命令の添字も今後のふるまいを決めるので、辞書のキーに含める必要があります。"
            }
          ],
          "exerciseTitle": "テレポーター",
          "task": "1 から N の番号が付いた N 個の町があります。町 i にはテレポーターがあり、町 A_i へ送られます。町 1 から出発し、テレポーターをちょうど K 回使います。最後にいる町はどこですか。",
          "input": "1 行目に N K、2 行目に A_1 … A_N が与えられます。1 ≤ N ≤ 200000、1 ≤ A_i ≤ N、1 ≤ K ≤ 10^18 です。",
          "output": "最後にいる町を出力してください。",
          "hint": "シミュレーションしながら、各町に最初に着いたステップを記録します。町が再び現れたら、残りのステップ数を周期の長さで割った余りにします。",
          "explanation": "状態は現在いる町なので高々 N 通りで、N + 1 ステップ以内に必ずどこかの町が繰り返します。first[v] = t として、町 v に最初に着いたステップを記録します。ステップ t で現在の町 v がすでに現れていれば、そこから先の移動は長さ t − first[v] の周期で繰り返します。残りの K − t ステップを周期の長さで割った余りの分だけ直接シミュレーションすれば、多くても N ステップで済みます。繰り返しが起きる前に K ステップに達したら、シミュレーションそのものが答えです。全体で O(N) です。同じ考え方は、状態空間が小さくステップ数が巨大な決定的な過程なら、何にでも使えます。"
        }
      },
      "order": 28,
      "stage": "exam",
      "minutes": 55,
      "prerequisiteIds": [
        "heaps-and-shortest-paths"
      ],
      "relatedProblems": [
        "CI-VM-3",
        "CI-LOG-3",
        "ABC344E"
      ],
      "solution": "n, k = map(int, input().split())\na = [0] + list(map(int, input().split()))\nfirst = {}                  # town -> the step at which it was first reached\ntown, t = 1, 0\nwhile t < k:\n    if town in first:\n        cycle = t - first[town]\n        for _ in range((k - t) % cycle):\n            town = a[town]\n        break\n    first[town] = t\n    town = a[town]\n    t += 1\nprint(town)\n",
      "starter": "n, k = map(int, input().split())\na = [0] + list(map(int, input().split()))\n# TODO: walk from town 1, remember when each town was first reached, and skip the cycle\n",
      "tests": [
        {
          "input": "4 5\n2 4 1 3\n",
          "expected": "2\n"
        },
        {
          "input": "6 999999999999999999\n4 1 6 5 6 3\n",
          "expected": "6\n"
        },
        {
          "input": "1 1000000000000000000\n1\n",
          "expected": "1\n"
        },
        {
          "input": "5 2\n2 3 4 5 5\n",
          "expected": "3\n"
        },
        {
          "input": "5 10\n2 3 4 5 3\n",
          "expected": "5\n"
        },
        {
          "input": "3 3\n2 3 1\n",
          "expected": "1\n"
        }
      ]
    }
  ]
};
