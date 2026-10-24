# Plume

**CI Programming Practice**

Developed by Aquila.

面向东京大学创造情报学编程备考的练习工作台。221 道分级题目、24 节 Python 与算法课程，以及编写代码、复习和限时模拟所需的工具。界面与学习内容支持中文、English、日本語；题干、样例、图示、公式和 Python 运行环境随软件保存在本地。

![Plume 工作台](docs/preview.png)

## 开始使用

**macOS**：解压发布包，打开 `Plume.app`，也可先拖入“应用程序”。无需运行 `start.command`、安装 Python 或手动打开浏览器。支持 macOS 13.3 及以上；下载与当前 Mac 架构对应的包，M 系列使用 `Plume-macOS-AppleSilicon.zip`。

当前构建采用本机临时签名，尚未经过 Apple Developer ID 公证。在另一台电脑首次打开时，macOS 可能需要在“隐私与安全性”中确认。GitHub Actions 的 macOS 构建产物可在 [Actions](https://github.com/AquilaTvT/CIP/actions) 中下载。

**源码运行（macOS / Windows / Linux）**：安装 Python 3.9+，在项目目录运行：

```sh
python3 start.py
```

Windows 可使用 `py start.py`。服务器只监听本机，默认地址为 `http://127.0.0.1:8765`。端口占用时可使用 `python3 start.py --port 8766`。完整离线使用请采用 App 或本机服务；静态托管时，AtCoder 在线同步仍取决于服务器代理或浏览器跨域策略。

## 学习与练习

入门课程分为 **6 章、24 课**：开始编程、组织数据与程序、分析与验证、序列与查询、图与搜索、状态与策略综合。内容覆盖 Python 基础、调试、复杂度、穷举、排序、哈希、前缀和、二分、双指针、栈队列、BFS、DFS、动态规划、0/1 背包、贪心及综合解题流程。

每课提供完整中英日正文、学习目标、逐步推演、带输入输出的代码示例、常见错误、自测问答、编程练习与详细参考解。课内目录和“查看练习要求”可直接定位内容；示例可以复制。代码与课程进度自动保存在本机，全部练习用例通过后记录课程完成。课程检查和 AtCoder 的正式 AC 分别记录。详细目录与内容验证见 [课程说明](docs/ACADEMY.md)。

![课程阅读与练习](docs/course.png)

题库按 Level 0–5 组织，可按题号、等级、难度和状态查找。工作台提供练习续接、未完成题推荐和每日目标；收藏、笔记及错误记录可用于复习。侧栏可以收起，题目页支持上一题／下一题与浏览历史前进／后退。

离线 CodeMirror 编辑器支持 Python 高亮、行号、缩进、括号补全、查找、撤销重做。每题提供完整官方样例，也可添加自定义输入和期望输出。Python 在 WebAssembly Worker 中运行，每次执行使用独立环境，不在宿主机执行用户代码。

| 快捷键 | 操作 |
| --- | --- |
| `⌘K` / `Ctrl+K` | 搜索题目 |
| `⌘Enter` / `Ctrl+Enter` | 运行当前练习或测试 |
| `⌘F` / `Ctrl+F` | 在编辑器中查找 |
| `⌘Z` / `Ctrl+Z` | 撤销编辑 |
| `⌘,` | macOS App 设置 |

## 设置与使用指南

设置按操作内容分组：

- **通用**：跟随系统／浅色／深色外观、界面与默认题面语言、启动页面、减少动态效果。
- **练习与编辑器**：每日目标、题面字号、代码字号、缩进宽度和自动换行，提供阅读与代码预览。
- **个人资料与 AtCoder**：本机显示名称、公开用户名、启动时同步及最近同步时间。无需提供 AtCoder 密码。
- **数据与备份**：本地题库覆盖、元数据更新、JSON 导出与恢复、本地数据用量、工作区重置。
- **使用指南**：可打开阅读的完整页面，说明第一次练习、代码与测试、模拟计分、AtCoder 同步和数据迁移，并链接到对应功能。
- **关于**：产品版本、来源与许可、项目链接，以及作者 Aquila 的羽翎署名彩蛋。

恢复显示与练习偏好不会删除代码、笔记或提交记录。清空工作区和导入备份均需确认；导入会替换当前数据，不会自动合并两份工作区。

## 结果与计分

本地显示“输出一致”只表示当前测试输出匹配，**不表示官方 AC**。构造题可能允许多种正确输出，浮点题可能采用误差规则，文本比较不能替代官方特殊判题。题目页提供官方提交、题解与已通过提交的链接；这些资源需要联网。

AtCoder 同步结果标为“已验证”，手动完成与本地测试分别记录。150 分钟模拟默认三题、每题 100 分，也可采用原题官方配点；配点与账号在开始时固定。只有最终 AC 的题目，在首次 AC 前的计罚错误才计入罚时，每次增加 5 分钟，CE、IE 不计罚。模拟历史保留成绩、完成情况与逐题回看。

模拟分数是训练指标，不是东京大学考试分数，也不保证某个考试成绩。

## 题库说明

| 内容 | 数量 |
| --- | ---: |
| 题目及日文题干 | 221 |
| 官方英文题干 | 206 |
| APG4bPython 本地英文译文 | 15 |
| 本地中文题干 | 221 |
| AtCoder Problems 索引命中 | 214 |
| 有官方配点及 Difficulty 的题目 | 205 |

**214／221 表示索引覆盖，不是缺少题干。** 未被该索引收录的 7 条是 APG4bPython EX14、EX15、EX16、EX17、EX18、EX20、EX21。索引中另有 9 条教程／入门记录没有常规竞赛配点或难度。本地总计保存 663 份题干。

三语题干分别存储，不使用浏览器翻译，也不静默回退为日文。中文版保留题意、全部约束、输入输出、样例和说明。APG 教学页附加的教程与答案保留在来源文件中，和正式题干分开。配点以 AtCoder 原题为准；Difficulty 是 AtCoder Problems 的估计值。

六个等级是学习路线，与 ABC 的字母题序不一一对应。0 级按先修关系从 `PracticeA` 开始，推荐优先选择最低未完成等级。详见 [学习顺序](docs/CURRICULUM.md) 与 [入门课程说明](docs/ACADEMY.md)。

## 数据与升级

代码、笔记、课程进度与练习记录保存在本机。桌面 App 每次保存会确认写入原生快照，路径为 `~/Library/Application Support/org.cipractice.desktop/state.json`。浏览器版使用当前浏览器与站点的本地存储。在“设置 → 数据与备份”导出 JSON；恢复前先备份目标设备已有的数据。

Plume 沿用旧 CI Practice 的 bundle ID、原生存储目录、进度键和题目 ID。升级桌面 App 会继续读取原有记录；启动新版前请退出旧 App。桌面 App 与浏览器版是不同的工作区，二者迁移仍需导出、导入 JSON。

## 开发与构建

直接运行不需要安装 npm 依赖；编辑器与 Python 运行环境已随仓库保存。开发检查采用 Python 3.12 和 Node.js 22。

```sh
npm ci --ignore-scripts
python3 scripts/assemble_library.py
python3 scripts/assemble_academy.py --check
python3 -m unittest discover -s tests -p '*_test.py'
node --test tests/*.test.cjs
npm run check
```

修改编辑器源码后运行 `npm ci --ignore-scripts` 和 `npm run build:editor`。其余浏览器代码无需框架构建。验证范围与原生测试入口见 [VALIDATION.md](docs/VALIDATION.md)。

```text
app.js / styles.css / index.html   工作台、题库、模拟与持久化
settings.js                       设置与三语使用指南
academy.js / data/academy.js       课程交互与三语教学内容
pyworker.js / vendor/              Python、编辑器和公式运行环境
data/statements.{json,js}          发布用三语完整题干
data/source/ / data/translations/  官方来源与可编辑译文
data/media/ / assets/              题目图示与产品图标
packaging/CIPractice.swift         macOS 外壳及本机服务
scripts/ / tests/                  装配、构建和验证
```

在 macOS 安装 Xcode Command Line Tools 后构建：

```sh
python3 scripts/build_app.py
python3 scripts/package_release.py
```

输出为 `dist/Plume.app`、`release/Plume-source.zip`、对应架构的 `Plume-macOS-*.zip` 与 SHA-256 校验文件。默认针对当前 Mac 架构；`build_app.py --universal` 可构建双架构版本。打包脚本验证题库、最新界面文件与图标，不收集本地练习记录或工作区其他资料。

图标以 `assets/plume.svg` 为源；运行 `swift scripts/build_icon.swift` 重建 PNG 与完整 macOS ICNS。原生集成测试需有已登录桌面会话：

```sh
CI_NATIVE_APP="$PWD/dist/Plume.app" CI_NATIVE_NETWORK=1 python3 -m unittest discover -s tests -p 'runtime_native_test.py' -v
```

测试使用独立的临时存储，不会读取或修改个人练习记录。联网检查可通过省略 `CI_NATIVE_NETWORK=1` 跳过。

应用代码采用 MIT 许可证。题目、图示、元数据和第三方运行环境保留各自权利与许可，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
