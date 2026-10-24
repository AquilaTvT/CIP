# CI Practice

面向东京大学创造情报学编程备考的个人练习工作台。221 道题按六个等级组织，中文、English、日本語题干、样例、图示、公式与 Python 运行环境均保存在本地。

![CI Practice 工作台](docs/preview.png)

## 使用

**macOS Apple Silicon（M 系列）**：打开发布包中的 `CI Practice.app`，也可先拖入“应用程序”。无需点 `start.command`、安装 Python 或手动打开浏览器。支持 macOS 13.3 及以上。

当前构建使用本机临时签名，尚未经过 Apple Developer ID 公证。在另一台电脑下载后，macOS 可能要求通过“隐私与安全性”确认首次打开。这与应用是否封装无关；面向公众免提示分发仍需要开发者签名和公证。

**源码运行（macOS / Windows / Linux）**：安装 Python 3.9+，在项目目录运行：

```sh
python3 start.py
```

Windows 可使用 `py start.py`。服务器仅监听本机。默认地址为 `http://127.0.0.1:8765`，端口占用时可使用 `python3 start.py --port 8766`。也可作为静态网站托管；完整离线使用请采用 App 或本机服务。静态托管的 AtCoder 在线同步取决于服务器代理或浏览器跨域策略。

## 练习与评分

- 支持按题号搜索、等级与状态筛选、上一题／下一题、历史前进／后退、收藏、笔记和进度记录。
- 侧栏可收起；工作台提供继续练习、随机未完成题与今日目标。按 `⌘K` / `Ctrl+K` 可从任意页面搜索题目。
- 离线 CodeMirror 编辑器提供 Python 高亮、行号、自动缩进、括号补全、查找和撤销重做。空白模板不会提前读取输入；切换题干语言会保留编辑位置。
- 每题自带全部官方样例，支持自定义输入与期望输出。Python 运行在 WebAssembly Worker 中，不在宿主机执行用户代码。
- 本地显示“输出一致”只表示当前测试通过，**不表示官方 AC**。构造题允许多种正确答案；浮点题有误差规则，文本比较与官方特殊判题不同。
- 只有 AtCoder 同步结果标为“已验证”；手动完成与本地测试分别记录。官方解说和 AC 提交链接需要联网。
- 150 分钟模拟默认三题、每题 100 分；也可使用原题官方配点。已完成题在首次 AC 前的计罚错误每次加 5 分钟；CE、IE 不计罚，未完成题不计罚。模拟配点在开始时固定。
- 历史模拟列表提供成绩、完成题数与逐题回看；每场模拟的账号和配点在开始时固定。
- 训练分不等于东大考试成绩，也不能保证实际考试取得某个分数。

## 题库说明

| 内容 | 数量 |
| --- | ---: |
| 题目及日文题干 | 221 |
| 官方英文题干 | 206 |
| APG4bPython 本地英文译文 | 15 |
| 本地中文题干 | 221 |
| AtCoder Problems 索引命中 | 214 |
| 有官方配点及 Difficulty 的题目 | 205 |

214／221 表示索引覆盖。缺少的 7 条是 APG4bPython EX14、EX15、EX16、EX17、EX18、EX20、EX21。索引中另有 9 条教程／入门记录没有常规竞赛配点或难度。因此，214 和 205 都不代表本地题干缺失。

三语题干分开存储，不使用浏览器翻译，不静默回退为日文。中文版保留解题要求、全部约束、输入输出、所有样例及说明；APG 教学页附加的教程和答案与正式题干分开保留在来源文件中。官方标题错字的规范化记录在来源元数据中。配点以对应 AtCoder 原题为准；Difficulty 为 AtCoder Problems 的估计值。

六个等级是学习路线，不等于 ABC 字母题序，也不严格等于网站 Difficulty。0 级按先修关系从 PracticeA 开始，最后进入递归；推荐优先选择最低未完成等级。详见 [学习顺序](docs/CURRICULUM.md)。需要纯难度顺序时，可在题库选择“排序：Difficulty”。

## 数据与升级

代码、笔记、练习记录保存在本机。桌面 App 每次保存都会确认写入原生快照，再向页面返回成功；快照位于 `~/Library/Application Support/org.cipractice.desktop/state.json`。浏览器版使用当前浏览器的本地存储。请在“设置 → 导出 JSON”备份，在“导入 JSON”恢复。导入会替换现有数据，并在操作前提示。

桌面 App 与旧浏览器版使用不同存储空间，不会自动读取或覆盖旧记录。迁移时先在旧版导出，再在 App 内导入。题目 ID 和进度键沿用旧版；修正官方页面 ID 不影响题号对应的个人记录。

## 开发与验证

直接运行不需要 npm 安装，编辑器和运行环境均已打包。开发检查使用 Python 3.12 和 Node.js 22。

```sh
python3 scripts/assemble_library.py
python3 -m unittest discover -s tests -p '*_test.py'
node --test tests/*.test.cjs
node --check app.js
```

修改编辑器源码后重建：`npm ci --ignore-scripts && npm run build:editor`。浏览器端其余代码无需框架构建。

源码结构：

```text
app.js / styles.css / index.html   界面与练习逻辑
pyworker.js / vendor/              本地 Python 和公式运行环境
data/statements.{json,js}          发布用三语完整题干
data/source/                      官方来源与解析记录
data/translations/                可编辑译文与生成源
data/media/                       本地图示
packaging/CIPractice.swift         原生 macOS 外壳及本机服务
scripts/                          题库装配、校验和打包
tests/                            数据、计分、备份、服务和运行环境测试
```

在 macOS 安装 Xcode Command Line Tools 后构建 App：

```sh
python3 scripts/build_app.py
```

输出为 `dist/CI Practice.app`，默认针对当前 Mac 架构构建。`--universal` 需要同时提供 arm64、x86_64 的完整 Swift 工具链。发布前应重新构建，以包含最新题干和界面文件。

运行 `python3 scripts/package_release.py` 可生成源码 ZIP、已构建的 App ZIP 和 SHA-256 校验文件。打包脚本只收集项目文件，不收集本地练习记录或工作目录中的其他资料。

运行原生集成检查：

```sh
"dist/CI Practice.app/Contents/MacOS/CI Practice" --runtime-test
```

结果写入标准输出；不会修改练习进度。GitHub Actions 执行题库与行为检查，并构建可下载的 macOS App artifact。原生图形界面测试需在带桌面会话的 macOS 上进行。

应用代码采用 MIT 许可证；题目、图示、元数据和第三方运行环境遵循各自权利与许可，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
