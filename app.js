/* Plume · CI Programming Practice
 * Application state, routing and views. Rendering is plain HTML strings; every interpolated
 * value passes through esc(). Behaviour is attached by delegation (data-go / data-action). */
'use strict';

const PRODUCT_NAME = 'Plume';
const PRODUCT_VERSION = '1.2.0';
const DATA_SCHEMA = 5;
const STORAGE_KEY = 'ciPracticeHubState.v2';
const LEGACY_KEY = 'ciPracticeHubState.v1';
const NAV_KEY = 'ciPracticeNavigation.v1';
const VALID_RESULTS = new Set(['AC', 'WA', 'TLE', 'CE', 'RE', 'MLE', 'OLE', 'QLE', 'IE', 'NG']);
const PENALTY_RESULTS = new Set(['WA', 'TLE', 'RE', 'MLE', 'OLE', 'QLE', 'NG']);
const ATTEMPT_SOURCES = ['manual', 'atcoder', 'mock', 'judge'];
const FORMAL_SOURCES = new Set(['manual', 'atcoder', 'judge']);
const LANGS = ['zh', 'ja', 'en'];
const LANG_NAMES = {zh: '中文', ja: '日本語', en: 'English'};
const PYTHON_LABEL = 'Python 3.12';
const MOCK_DURATIONS = [60, 90, 120, 150, 180];

const LEVEL_NAMES = {
  zh: ['入门', '基础', '基础实现', 'CI 核心', '进阶实现', '综合算法'],
  ja: ['入門', '基礎', '基礎実装', 'CI コア', '発展実装', '総合アルゴリズム'],
  en: ['Introduction', 'Fundamentals', 'Basic Implementation', 'CI Core', 'Advanced Implementation', 'Advanced Algorithms']
};

const COPY = {
  zh: {
    today: '今日', learn: '课程', problems: '题库', study: '学习路线', mock: '模拟考试', review: '复习', settings: '设置',
    search: '搜索', back: '后退', forward: '前进', navigation: '导航', hideSidebar: '隐藏边栏', showSidebar: '显示边栏',
    solvedOf: '已完成 {done} / {total}', savedLocally: '记录保存在本机',
    runtimeLoading: '准备中', runtimeReady: '就绪', runtimeRunning: '运行中', runtimeError: '无法启动',
    todayTitle: '今日练习', continueLabel: '继续', upNext: '下一题', startPractice: '开始练习', continuePractice: '继续练习',
    randomProblem: '随机一题', recommended: '推荐练习', allProblems: '查看题库', dailyGoal: '今日目标',
    goalCaption: '今天完成 {done} 题，目标 {goal} 题', editGoal: '调整目标', levels: '等级进度',
    statSolved: '已完成', statVerified: 'AtCoder 已验证', statAttempted: '已尝试', statStreak: '连续练习', streakDays: '{count} 天',
    activity: '练习记录', activityRange: '最近 18 周', noActivity: '提交与评测记录会显示在这里。', fewer: '少', more: '多',
    activityDay: '{date} · {count} 条记录',
    courseEyebrow: '课程 · {done} / {total}', courseDone: '课程已全部完成', courseInvite: '从 Python 基础到上机常用的算法，每课都配有可运行的练习。',
    openCourse: '打开课程', allDoneTitle: '这一阶段已全部完成', allDoneBody: '可以回顾复习列表，或进入更高的等级。',
    libraryIntro: '{count} 道题，按 L0–L5 由浅入深排列。', filterAll: '全部', filterTodo: '未完成', filterSolved: '已完成',
    filterStarred: '已收藏', filterErrors: '有错误', searchPlaceholder: '搜索题号、标题或题面', allLevels: '全部等级',
    allSources: '全部来源', sortLevel: '按等级', sortDifficulty: '按难度', sortPoints: '按分值', sortStatus: '按状态',
    colProblem: '题目', colLevel: '等级', colDifficulty: '难度', colPoints: '分值', colStatus: '状态',
    statusVerified: '已验证', statusJudged: '评测通过', statusManual: '已完成', statusTried: '尝试过', statusNew: '未开始',
    shownOf: '显示 {shown} / {total} 题', noMatch: '没有符合条件的题目', clearFilters: '清除筛选',
    original: '原题', submit: '提交', save: '收藏', unsave: '取消收藏', previousProblem: '上一题', nextProblem: '下一题',
    pointsValue: '{points} 分', difficultyValue: '难度 {value}', partLabel: '小问 {n}', fromPack: '来自「{title}」',
    statementMissing: '找不到这道题的本地题面文件。请重新安装应用，或检查 data 目录是否完整。',
    langUnavailable: '这道题没有{lang}题面，下面显示的是{shown}。', statementSource: '题面来源：AtCoder', openOnAtCoder: '在 AtCoder 打开',
    dataFiles: '数据文件', fileLines: '{count} 行', filePreview: '只显示前 {count} 行；运行时程序可以读取完整文件。',
    sampleInput: '输入样例 {n}', sampleOutput: '输出样例 {n}', noStdin: '没有标准输入。',
    tabCode: '代码', tabNotes: '笔记', tabHistory: '记录', tabSolution: '题解',
    runAll: '运行', judge: '评测', clearCode: '清空', clearCodeConfirm: '清空这道题的代码？此操作无法撤销。',
    caseSample: '样例 {n}', caseCustom: '用例 {n}', addCase: '添加用例', removeCase: '删除此用例',
    input: '输入', expected: '期望输出', output: '输出', compare: '比较输出', runThisCase: '只运行此用例', notRunYet: '尚未运行',
    verdictPass: '一致', verdictFail: '不一致', verdictRE: '运行错误', verdictTLE: '超时', verdictOLE: '输出过多',
    verdictRan: '已运行', verdictStale: '代码已修改，结果来自旧代码', verdictEngine: 'Python 未能启动', emptyOutput: '（无输出）',
    consoleNote: '本地运行只比较输出；正式结果以 AtCoder 判题为准。', consoleNotePack: '「运行」依次执行下方的全部用例；「评测」会跑完全部样例与隐藏用例，并计入记录。',
    checkerFloat: '本题按 {tolerance} 的误差比较数值。', checkerTokens: '比较时忽略空白差异。',
    checkerSpecial: '本题允许多种正确输出，本地使用专用检查器判断。',
    judgeRunning: '评测中 {done} / {total}', judgeAccepted: '全部通过', judgeRejected: '未通过',
    judgeSummary: '{passed} / {total} 个用例通过', judgeFirstFailure: '首个未通过：{name}', hiddenCase: '隐藏用例 {n}',
    runtimeBusy: '另一项运行尚未结束。', runtimeFailed: 'Python 无法启动：{error}',
    notesPlaceholder: '写下思路、易错点或复杂度分析……', notesSaved: '笔记会自动保存',
    historyTitle: '提交记录', noHistory: '还没有记录。', recordManually: '手动记录',
    recordHelp: '在其他环境提交后，可以在这里记录结果。手动记录与 AtCoder 已验证的结果分开统计。',
    recordAC: '记为 AC', recordWA: '记为 WA', recorded: '已记录 {result}',
    colResult: '结果', colTime: '时间', colSource: '来源', colLanguage: '语言', colRuntime: '耗时',
    sourceAtCoder: 'AtCoder', sourceManual: '手动', sourceJudge: '本地评测', sourceMock: '模拟',
    solutionHidden: '题解暂时隐藏', solutionHiddenBody: '先独立思考。通过后题解会自动显示，也可以现在展开。',
    showSolution: '显示题解', showSolutionConfirm: '现在显示题解与参考资料？', editorial: '官方题解', acceptedSubmissions: '其他人的 AC 代码',
    mySubmissions: '我的提交', referenceSolution: '参考解答', explanation: '思路', yourCode: '你的代码', copy: '复制', copied: '已复制',
    copyFailed: '无法复制，请手动选择文本。', noReference: '这道题没有提供参考解答。',
    studyIntro: '按先修顺序安排的下一组练习；收藏的题和出过错的题会排在前面。', nextUp: '接下来', practiceCount: '{count} 题',
    goalLabel: '每日目标', saveGoal: '保存', goalSaved: '已保存每日目标',
    mockTitle: '模拟考试', mockIntro: '在限时条件下完成一组题。点击开始后才会抽取题目。', mockPool: '题目', mockDuration: '时长', mockScoring: '计分',
    poolCore: 'AtCoder · CI 核心（L2–L4）', poolFoundation: 'AtCoder · 基础（L1–L3）', poolHard: 'AtCoder · 较难（L3–L5）',
    poolMixed: 'AtCoder · 综合（L1–L5）', poolSet: '原创套题 · {title}', poolRandomSet: '原创套题 · 随机一套', minutes: '{count} 分钟',
    scoreFlat: '每题 100 分', scoreOfficial: '原题配点', scoreParts: '按小问配分',
    mockRules: '最终通过的题目中，首次通过前的每次计罚错误加 5 分钟；CE 与 IE 不计。训练分数不代表正式考试成绩。',
    mockRulesSet: '每个小问按配分计分，在问题页点击「评测」即自动计入。训练分数不代表正式考试成绩。',
    startMock: '开始', finishMock: '结束', finishMockConfirm: '现在结束这次模拟？', remaining: '剩余时间', score: '得分',
    penalties: '计罚 {count} 次', open: '打开', syncVerdicts: '同步 AtCoder 结果', mockResult: '模拟结果', timeUsed: '用时',
    penaltyTime: '含罚时', newMock: '新的模拟', mockHistory: '历史记录', mockHistoryEmpty: '结束一次模拟后，成绩会保存在这里。',
    viewAll: '全部', notSolved: '未完成', pastSession: '历史模拟', sessionMissing: '找不到这次模拟',
    sessionMissingBody: '这条记录可能已被重置，或不在当前备份中。', backToHistory: '返回历史记录', backToMock: '返回模拟考试',
    solvedCount: '完成 {done} / {total}', practiceAgain: '再练一次', judgedThere: '在问题页评测', noPoolProblems: '这个范围内的题目不足。',
    officialUnavailable: '部分题目缺少原题配点。请先在设置中刷新题目数据，或改用每题 100 分。', currentMock: '进行中的模拟',
    reviewIntro: '出过错的题和收藏的题都在这里。', reviewEmptyTitle: '暂无需要复习的题目', reviewEmptyBody: '收藏的题目与出过错的题目会自动出现在这里。',
    solvedSince: '已补上 AC', stillOpen: '尚未 AC', errorsCount: '{count} 次错误',
    searchHint: '输入题号、标题或题面关键词', searchRecent: '最近与推荐', searchNavigate: '选择', searchOpen: '打开', searchClose: '关闭',
    noSearchResults: '没有找到匹配的题目', notFound: '找不到这道题', backToLibrary: '返回题库',
    syncDone: '同步完成，新增 {count} 条记录', syncFailed: '同步失败：{error}', metadataUpdated: '题目数据已更新',
    metadataFailed: '暂时无法更新题目数据，将继续使用本机数据', backupImported: '已导入备份', invalidBackup: '无法读取这个备份文件',
    importConfirm: '导入会替换本机的全部记录（代码、笔记、进度、模拟与课程）。继续吗？',
    resetConfirm: '删除本机的全部练习记录？题库与课程内容会保留。此操作无法撤销。', resetDone: '已清空本机记录',
    resetFailed: '无法清空存储，请检查存储权限。', saveFailed: '无法保存。请先导出备份，再检查存储空间与权限。',
    saved: '已收藏', unsaved: '已取消收藏', invalidHandle: '用户名只能包含英文字母、数字和下划线。', preferencesRestored: '已恢复默认偏好',
    allCompleted: '当前范围内的题目已全部完成', otherTabChanged: '已载入另一个窗口中的更改',
    packImported: '已导入「{title}」，共 {count} 题', packUpdated: '已更新「{title}」，共 {count} 题', packRemoved: '已移除「{title}」',
    packInvalid: '题库文件无效', packRemoveConfirm: '移除「{title}」？其中题目的代码、笔记与记录也会一并删除。',
    templateSaved: '已导出题库模板', signatureLine: 'CI Programming Practice'
  },
  ja: {
    today: '今日', learn: 'コース', problems: '問題', study: '学習ルート', mock: '模擬試験', review: '復習', settings: '設定',
    search: '検索', back: '戻る', forward: '進む', navigation: 'ナビゲーション', hideSidebar: 'サイドバーを隠す', showSidebar: 'サイドバーを表示',
    solvedOf: '{total} 問中 {done} 問完了', savedLocally: '記録はこの端末に保存',
    runtimeLoading: '準備中', runtimeReady: '準備完了', runtimeRunning: '実行中', runtimeError: '起動できません',
    todayTitle: '今日の練習', continueLabel: '続きから', upNext: '次の問題', startPractice: '練習を始める', continuePractice: '練習を再開',
    randomProblem: 'ランダムに選ぶ', recommended: 'おすすめの問題', allProblems: '問題一覧へ', dailyGoal: '今日の目標',
    goalCaption: '今日は {done} 問完了 · 目標 {goal} 問', editGoal: '目標を変更', levels: 'レベル別の進捗',
    statSolved: '完了', statVerified: 'AtCoder で確認済み', statAttempted: '挑戦済み', statStreak: '連続日数', streakDays: '{count} 日',
    activity: '練習の記録', activityRange: '直近 18 週間', noActivity: '提出や採点の記録がここに表示されます。', fewer: '少', more: '多',
    activityDay: '{date} · {count} 件',
    courseEyebrow: 'コース · {done} / {total}', courseDone: 'コースをすべて修了しました', courseInvite: 'Python の基礎から試験でよく使うアルゴリズムまで。各レッスンに実行できる演習があります。',
    openCourse: 'コースを開く', allDoneTitle: 'この段階はすべて完了しました', allDoneBody: '復習リストを見直すか、上のレベルに進みましょう。',
    libraryIntro: '{count} 問を L0–L5 の順に並べています。', filterAll: 'すべて', filterTodo: '未完了', filterSolved: '完了',
    filterStarred: '保存済み', filterErrors: '誤答あり', searchPlaceholder: '問題番号・タイトル・本文で検索', allLevels: 'すべてのレベル',
    allSources: 'すべての出典', sortLevel: 'レベル順', sortDifficulty: '難易度順', sortPoints: '配点順', sortStatus: '状態順',
    colProblem: '問題', colLevel: 'レベル', colDifficulty: '難易度', colPoints: '配点', colStatus: '状態',
    statusVerified: '確認済み', statusJudged: '採点で正解', statusManual: '完了', statusTried: '挑戦中', statusNew: '未着手',
    shownOf: '{total} 問中 {shown} 問を表示', noMatch: '条件に合う問題はありません', clearFilters: '絞り込みを解除',
    original: '原題', submit: '提出', save: '保存', unsave: '保存を解除', previousProblem: '前の問題', nextProblem: '次の問題',
    pointsValue: '{points} 点', difficultyValue: '難易度 {value}', partLabel: '小問 {n}', fromPack: '「{title}」より',
    statementMissing: 'この問題のローカル問題文が見つかりません。アプリを再インストールするか、data フォルダを確認してください。',
    langUnavailable: 'この問題には{lang}の問題文がないため、{shown}で表示しています。', statementSource: '出典：AtCoder', openOnAtCoder: 'AtCoder で開く',
    dataFiles: 'データファイル', fileLines: '{count} 行', filePreview: '先頭 {count} 行のみ表示しています。実行時はファイル全体を読み込めます。',
    sampleInput: '入力例 {n}', sampleOutput: '出力例 {n}', noStdin: '標準入力はない。',
    tabCode: 'コード', tabNotes: 'メモ', tabHistory: '履歴', tabSolution: '解説',
    runAll: '実行', judge: '採点', clearCode: '消去', clearCodeConfirm: 'この問題のコードを消去しますか？元に戻せません。',
    caseSample: '例 {n}', caseCustom: 'ケース {n}', addCase: 'ケースを追加', removeCase: 'このケースを削除',
    input: '入力', expected: '期待される出力', output: '出力', compare: '出力を比較', runThisCase: 'このケースだけ実行', notRunYet: '未実行',
    verdictPass: '一致', verdictFail: '不一致', verdictRE: '実行時エラー', verdictTLE: '時間超過', verdictOLE: '出力超過',
    verdictRan: '実行済み', verdictStale: 'コード変更前の結果です', verdictEngine: 'Python を起動できません', emptyOutput: '（出力なし）',
    consoleNote: 'ローカル実行は出力の比較のみです。正式な判定は AtCoder で行われます。', consoleNotePack: '「実行」は下のすべてのケースを順に実行します。「採点」はすべての例と非公開ケースを実行し、結果を記録します。',
    checkerFloat: 'この問題は誤差 {tolerance} 以内で数値を比較します。', checkerTokens: '空白の違いは無視して比較します。',
    checkerSpecial: 'この問題は正解が複数あるため、専用のチェッカーで判定します。',
    judgeRunning: '採点中 {done} / {total}', judgeAccepted: 'すべて正解', judgeRejected: '不正解あり',
    judgeSummary: '{total} ケース中 {passed} ケース正解', judgeFirstFailure: '最初の不正解：{name}', hiddenCase: '非公開ケース {n}',
    runtimeBusy: '別の実行が終わるまでお待ちください。', runtimeFailed: 'Python を起動できません：{error}',
    notesPlaceholder: '考え方、間違えやすい点、計算量などを書き留めておきましょう…', notesSaved: 'メモは自動保存されます',
    historyTitle: '提出履歴', noHistory: 'まだ記録がありません。', recordManually: '手動で記録',
    recordHelp: '他の環境で提出した結果をここに記録できます。手動の記録は AtCoder で確認された結果とは区別されます。',
    recordAC: 'AC を記録', recordWA: 'WA を記録', recorded: '{result} を記録しました',
    colResult: '結果', colTime: '日時', colSource: '出典', colLanguage: '言語', colRuntime: '実行時間',
    sourceAtCoder: 'AtCoder', sourceManual: '手動', sourceJudge: 'ローカル採点', sourceMock: '模擬',
    solutionHidden: '解説は非表示です', solutionHiddenBody: 'まずは自分で考えてみましょう。正解すると自動で表示されます。今すぐ開くこともできます。',
    showSolution: '解説を表示', showSolutionConfirm: '解説と参考資料を表示しますか？', editorial: '公式解説', acceptedSubmissions: '他の人の AC 提出',
    mySubmissions: '自分の提出', referenceSolution: '解答例', explanation: '考え方', yourCode: 'あなたのコード', copy: 'コピー', copied: 'コピーしました',
    copyFailed: 'コピーできませんでした。テキストを選択してコピーしてください。', noReference: 'この問題には解答例がありません。',
    studyIntro: '前提の順に並べた次の練習です。保存した問題と間違えた問題が優先されます。', nextUp: '次に解く問題', practiceCount: '{count} 問',
    goalLabel: '1 日の目標', saveGoal: '保存', goalSaved: '目標を保存しました',
    mockTitle: '模擬試験', mockIntro: '制限時間内に一連の問題を解きます。開始するまで問題は選ばれません。', mockPool: '出題', mockDuration: '制限時間', mockScoring: '採点',
    poolCore: 'AtCoder · CI コア（L2–L4）', poolFoundation: 'AtCoder · 基礎（L1–L3）', poolHard: 'AtCoder · 難しめ（L3–L5）',
    poolMixed: 'AtCoder · 総合（L1–L5）', poolSet: 'オリジナル問題 · {title}', poolRandomSet: 'オリジナル問題 · ランダム', minutes: '{count} 分',
    scoreFlat: '各 100 点', scoreOfficial: '元問題の配点', scoreParts: '小問ごとの配点',
    mockRules: '最終的に正解した問題について、最初の正解より前の対象となる誤答 1 回につき 5 分を加算します（CE・IE は除く）。練習の得点は入試の得点を示すものではありません。',
    mockRulesSet: '小問ごとの配点で採点します。問題ページで「採点」すると自動的に反映されます。練習の得点は入試の得点を示すものではありません。',
    startMock: '開始', finishMock: '終了', finishMockConfirm: '模擬試験を終了しますか？', remaining: '残り時間', score: '得点',
    penalties: 'ペナルティ {count} 回', open: '開く', syncVerdicts: 'AtCoder の結果を同期', mockResult: '模擬試験の結果', timeUsed: '経過時間',
    penaltyTime: 'ペナルティ込み', newMock: '新しい模擬試験', mockHistory: '履歴', mockHistoryEmpty: '模擬試験を終えると、結果がここに保存されます。',
    viewAll: 'すべて表示', notSolved: '未正解', pastSession: '過去の模擬試験', sessionMissing: 'この模擬試験が見つかりません',
    sessionMissingBody: '記録がリセットされたか、現在のバックアップに含まれていない可能性があります。', backToHistory: '履歴に戻る', backToMock: '模擬試験に戻る',
    solvedCount: '{total} 問中 {done} 問正解', practiceAgain: 'もう一度解く', judgedThere: '問題ページで採点', noPoolProblems: 'この範囲の問題が足りません。',
    officialUnavailable: '一部の問題に元の配点がありません。設定で問題データを更新するか、各 100 点を選んでください。', currentMock: '実施中の模擬試験',
    reviewIntro: '間違えた問題と保存した問題をまとめています。', reviewEmptyTitle: '復習する問題はありません', reviewEmptyBody: '保存した問題と間違えた問題が、ここに自動で集まります。',
    solvedSince: 'その後 AC', stillOpen: '未 AC', errorsCount: '誤答 {count} 回',
    searchHint: '問題番号・タイトル・本文の語句を入力', searchRecent: '最近の問題とおすすめ', searchNavigate: '選択', searchOpen: '開く', searchClose: '閉じる',
    noSearchResults: '一致する問題はありません', notFound: '問題が見つかりません', backToLibrary: '問題一覧に戻る',
    syncDone: '同期しました（新規 {count} 件）', syncFailed: '同期できませんでした：{error}', metadataUpdated: '問題データを更新しました',
    metadataFailed: '問題データを更新できませんでした。端末内のデータを引き続き使用します', backupImported: 'バックアップを読み込みました', invalidBackup: 'このバックアップファイルは読み込めません',
    importConfirm: 'この端末のすべての記録（コード、メモ、進捗、模擬試験、コース）を置き換えます。続けますか？',
    resetConfirm: 'この端末の練習記録をすべて削除しますか？問題集とコースの内容は残ります。この操作は元に戻せません。', resetDone: '端末内の記録を削除しました',
    resetFailed: '保存データを削除できません。保存の権限を確認してください。', saveFailed: '保存できません。バックアップを書き出してから、空き容量と権限を確認してください。',
    saved: '保存しました', unsaved: '保存を解除しました', invalidHandle: 'ユーザー名には英数字とアンダースコアのみ使用できます。', preferencesRestored: '既定の設定に戻しました',
    allCompleted: 'この範囲の問題はすべて完了しています', otherTabChanged: '別のウィンドウでの変更を読み込みました',
    packImported: '「{title}」を読み込みました（{count} 問）', packUpdated: '「{title}」を更新しました（{count} 問）', packRemoved: '「{title}」を削除しました',
    packInvalid: '問題集ファイルが無効です', packRemoveConfirm: '「{title}」を削除しますか？含まれる問題のコード、メモ、記録も削除されます。',
    templateSaved: '問題集のテンプレートを書き出しました', signatureLine: 'CI Programming Practice'
  },
  en: {
    today: 'Today', learn: 'Learn', problems: 'Problems', study: 'Study Path', mock: 'Mock Exam', review: 'Review', settings: 'Settings',
    search: 'Search', back: 'Back', forward: 'Forward', navigation: 'Navigation', hideSidebar: 'Hide Sidebar', showSidebar: 'Show Sidebar',
    solvedOf: '{done} of {total} solved', savedLocally: 'Saved on this device',
    runtimeLoading: 'Preparing', runtimeReady: 'Ready', runtimeRunning: 'Running', runtimeError: 'Unavailable',
    todayTitle: 'Today', continueLabel: 'Continue', upNext: 'Up Next', startPractice: 'Start', continuePractice: 'Continue',
    randomProblem: 'Random Problem', recommended: 'Recommended', allProblems: 'All Problems', dailyGoal: 'Daily Goal',
    goalCaption: '{done} of {goal} problems today', editGoal: 'Edit Goal', levels: 'Levels',
    statSolved: 'Solved', statVerified: 'Verified on AtCoder', statAttempted: 'Attempted', statStreak: 'Streak', streakDays: '{count} days', streakDaysOne: '1 day',
    activity: 'Activity', activityRange: 'Last 18 weeks', noActivity: 'Submissions and judged runs will appear here.', fewer: 'Less', more: 'More',
    activityDay: '{date} · {count} records', activityDayOne: '{date} · 1 record',
    courseEyebrow: 'Learn · {done} of {total}', courseDone: 'Course complete', courseInvite: 'From Python basics to the algorithms the exam relies on, with an exercise you can run in every lesson.',
    openCourse: 'Open Course', allDoneTitle: 'Everything here is done', allDoneBody: 'Revisit your review list or move up a level.',
    libraryIntro: '{count} problems, arranged from L0 to L5.', filterAll: 'All', filterTodo: 'Unsolved', filterSolved: 'Solved',
    filterStarred: 'Saved', filterErrors: 'With Errors', searchPlaceholder: 'Search by ID, title or statement', allLevels: 'All Levels',
    allSources: 'All Sources', sortLevel: 'By Level', sortDifficulty: 'By Difficulty', sortPoints: 'By Points', sortStatus: 'By Status',
    colProblem: 'Problem', colLevel: 'Level', colDifficulty: 'Difficulty', colPoints: 'Points', colStatus: 'Status',
    statusVerified: 'Verified', statusJudged: 'Judged', statusManual: 'Solved', statusTried: 'Attempted', statusNew: 'Not Started',
    shownOf: '{shown} of {total} problems', noMatch: 'No problems match', clearFilters: 'Clear Filters',
    original: 'Original', submit: 'Submit', save: 'Save', unsave: 'Remove from Saved', previousProblem: 'Previous Problem', nextProblem: 'Next Problem',
    pointsValue: '{points} pts', difficultyValue: 'Difficulty {value}', partLabel: 'Part {n}', fromPack: 'From “{title}”',
    statementMissing: 'The local statement for this problem is missing. Reinstall the app or check that the data folder is complete.',
    langUnavailable: 'This problem has no {lang} statement; showing {shown}.', statementSource: 'Source: AtCoder', openOnAtCoder: 'Open on AtCoder',
    dataFiles: 'Data Files', fileLines: '{count} lines', fileLinesOne: '1 line', filePreview: 'Showing the first {count} lines. Your program can read the whole file.',
    sampleInput: 'Sample Input {n}', sampleOutput: 'Sample Output {n}', noStdin: 'No standard input.',
    tabCode: 'Code', tabNotes: 'Notes', tabHistory: 'History', tabSolution: 'Solution',
    runAll: 'Run', judge: 'Judge', clearCode: 'Clear', clearCodeConfirm: 'Clear the code for this problem? This cannot be undone.',
    caseSample: 'Sample {n}', caseCustom: 'Case {n}', addCase: 'Add Case', removeCase: 'Delete This Case',
    input: 'Input', expected: 'Expected Output', output: 'Output', compare: 'Compare Output', runThisCase: 'Run This Case Only', notRunYet: 'Not run yet',
    verdictPass: 'Matches', verdictFail: 'Differs', verdictRE: 'Runtime Error', verdictTLE: 'Time Limit', verdictOLE: 'Output Limit',
    verdictRan: 'Finished', verdictStale: 'Result from earlier code', verdictEngine: 'Python could not start', emptyOutput: '(no output)',
    consoleNote: 'Local runs compare output only. AtCoder gives the official verdict.', consoleNotePack: 'Run executes every case below. Judge runs every sample and hidden test and records the result.',
    checkerFloat: 'Numbers are compared within a tolerance of {tolerance}.', checkerTokens: 'Whitespace differences are ignored.',
    checkerSpecial: 'Several outputs are valid; a task-specific checker verifies yours.',
    judgeRunning: 'Judging {done} of {total}', judgeAccepted: 'Accepted', judgeRejected: 'Not Accepted',
    judgeSummary: '{passed} of {total} tests passed', judgeFirstFailure: 'First failure: {name}', hiddenCase: 'Hidden Test {n}',
    runtimeBusy: 'Another run is still in progress.', runtimeFailed: 'Python could not start: {error}',
    notesPlaceholder: 'Write down your approach, pitfalls, or complexity…', notesSaved: 'Notes save automatically',
    historyTitle: 'Submissions', noHistory: 'No records yet.', recordManually: 'Record Manually',
    recordHelp: 'Record results from elsewhere. Manual records are kept separate from results verified on AtCoder.',
    recordAC: 'Record AC', recordWA: 'Record WA', recorded: 'Recorded {result}',
    colResult: 'Result', colTime: 'Time', colSource: 'Source', colLanguage: 'Language', colRuntime: 'Runtime',
    sourceAtCoder: 'AtCoder', sourceManual: 'Manual', sourceJudge: 'Local Judge', sourceMock: 'Mock',
    solutionHidden: 'Solution Hidden', solutionHiddenBody: 'Try it on your own first. The solution opens once you solve the problem, or you can open it now.',
    showSolution: 'Show Solution', showSolutionConfirm: 'Show the solution and references now?', editorial: 'Official Editorial', acceptedSubmissions: 'Accepted Submissions',
    mySubmissions: 'My Submissions', referenceSolution: 'Reference Solution', explanation: 'Approach', yourCode: 'Your Code', copy: 'Copy', copied: 'Copied',
    copyFailed: 'Could not copy. Select the text and copy it manually.', noReference: 'This problem has no reference solution.',
    studyIntro: 'Your next problems in prerequisite order. Saved and missed problems come first.', nextUp: 'Next Up', practiceCount: '{count} problems', practiceCountOne: '1 problem',
    goalLabel: 'Daily goal', saveGoal: 'Save', goalSaved: 'Daily goal saved',
    mockTitle: 'Mock Exam', mockIntro: 'Solve a set of problems against the clock. Problems are drawn when you start.', mockPool: 'Problems', mockDuration: 'Duration', mockScoring: 'Scoring',
    poolCore: 'AtCoder · CI Core (L2–L4)', poolFoundation: 'AtCoder · Fundamentals (L1–L3)', poolHard: 'AtCoder · Harder (L3–L5)',
    poolMixed: 'AtCoder · Mixed (L1–L5)', poolSet: 'Original Set · {title}', poolRandomSet: 'Original Set · Random', minutes: '{count} min',
    scoreFlat: '100 points each', scoreOfficial: 'Original points', scoreParts: 'Points per part',
    mockRules: 'For each solved problem, every penalized submission before the first AC adds 5 minutes; CE and IE are not penalized. Practice scores are not exam scores.',
    mockRulesSet: 'Each part is scored by its points. Judging on the problem page updates the score automatically. Practice scores are not exam scores.',
    startMock: 'Start', finishMock: 'Finish', finishMockConfirm: 'Finish this mock exam now?', remaining: 'Time Remaining', score: 'Score',
    penalties: '{count} penalties', penaltiesOne: '1 penalty', open: 'Open', syncVerdicts: 'Sync AtCoder Results', mockResult: 'Mock Exam Results', timeUsed: 'Time Used',
    penaltyTime: 'With Penalties', newMock: 'New Mock Exam', mockHistory: 'History', mockHistoryEmpty: 'Finished mock exams are saved here.',
    viewAll: 'View All', notSolved: 'Not solved', pastSession: 'Past Session', sessionMissing: 'Session not found',
    sessionMissingBody: 'This record may have been reset or is not included in the current backup.', backToHistory: 'Back to History', backToMock: 'Back to Mock Exam',
    solvedCount: '{done} of {total} solved', practiceAgain: 'Practice Again', judgedThere: 'Judge on the problem page', noPoolProblems: 'Not enough problems in this range.',
    officialUnavailable: 'Some problems have no original points yet. Refresh problem data in Settings, or use 100 points each.', currentMock: 'Mock in progress',
    reviewIntro: 'Problems you missed or saved.', reviewEmptyTitle: 'Nothing to Review', reviewEmptyBody: 'Saved problems and problems with wrong submissions appear here automatically.',
    solvedSince: 'Solved since', stillOpen: 'Not yet solved', errorsCount: '{count} errors', errorsCountOne: '1 error',
    searchHint: 'Type an ID, title or words from a statement', searchRecent: 'Recent and recommended', searchNavigate: 'Select', searchOpen: 'Open', searchClose: 'Close',
    noSearchResults: 'No matching problems', notFound: 'Problem not found', backToLibrary: 'Back to Problems',
    syncDone: 'Synced {count} new submissions', syncDoneOne: 'Synced 1 new submission', syncFailed: 'Sync failed: {error}', metadataUpdated: 'Problem data updated',
    metadataFailed: 'Could not update problem data; keeping the data on this device', backupImported: 'Backup imported', invalidBackup: 'This backup file could not be read',
    importConfirm: 'Importing replaces every record on this device (code, notes, progress, mock exams and course). Continue?',
    resetConfirm: 'Delete all practice records on this device? Problems and lessons stay. This cannot be undone.', resetDone: 'Local records deleted',
    resetFailed: 'Unable to clear storage. Check storage permissions.', saveFailed: 'Unable to save. Export a backup, then check storage space and permissions.',
    saved: 'Saved', unsaved: 'Removed from Saved', invalidHandle: 'Use only letters, digits and underscores in the handle.', preferencesRestored: 'Default preferences restored',
    allCompleted: 'Every problem in this selection is solved', otherTabChanged: 'Loaded changes from another window',
    packImported: 'Imported “{title}” ({count} problems)', packImportedOne: 'Imported “{title}” (1 problem)', packUpdated: 'Updated “{title}” ({count} problems)', packUpdatedOne: 'Updated “{title}” (1 problem)', packRemoved: 'Removed “{title}”',
    packInvalid: 'This problem pack is not valid', packRemoveConfirm: 'Remove “{title}”? Code, notes and records for its problems are deleted too.',
    templateSaved: 'Pack template exported', signatureLine: 'CI Programming Practice'
  }
};

const DEFAULT_STATE = {
  theme: 'system',
  uiLang: 'zh',
  statementLang: 'zh',
  atcoderUser: '',
  autoSync: false,
  lastSync: 0,
  syncCursor: 0,
  dailyGoal: 5,
  profile: {displayName: ''},
  preferences: {homePage: 'dashboard', editorFontSize: 14, tabSize: 4, lineWrapping: false, statementFontSize: 16, reduceMotion: false},
  academy: {codes: {}, completed: {}, attempts: {}, hints: {}, solutions: {}, lastLessonId: ''},
  attempts: [],
  notes: {},
  stars: {},
  codes: {},
  testCases: {},
  solutionUnlocked: {},
  mock: null,
  mockHistory: [],
  metadataCache: {},
  metadataUpdated: 0,
  workTab: 'code',
  splitRatio: 47,
  consoleRatio: 42,
  lastProblem: '',
  recentProblems: [],
  sidebarCollapsed: false,
  lastBackupAt: 0
};

// ------------------------------------------------------------------------------------------ utilities

function t(key, vars = {}) {
  const words = COPY[state.uiLang] || COPY.zh;
  // English needs a singular form for some counts; the other languages do not inflect.
  if (vars.count === 1 && words[key + 'One'] !== undefined) key += 'One';
  let value = words[key] ?? COPY.en[key] ?? key;
  for (const [name, replacement] of Object.entries(vars)) value = value.replaceAll(`{${name}}`, String(replacement));
  return value;
}
function langLocale() {
  return state.uiLang === 'zh' ? 'zh-CN' : state.uiLang === 'ja' ? 'ja-JP' : 'en-US';
}
function fmt(n) {
  return new Intl.NumberFormat(langLocale()).format(Math.round(Number(n) || 0));
}
function fmtDate(ms) {
  return new Intl.DateTimeFormat(langLocale(), {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}).format(new Date(ms));
}
function esc(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
}
function localDay(ms = Date.now()) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function isNativeApp() {
  return !!window.webkit?.messageHandlers?.saveFile;
}
function isLocalServer() {
  return location.protocol.startsWith('http') && ['127.0.0.1', 'localhost'].includes(location.hostname);
}
async function apiFetch(url, options = {}) {
  if (isLocalServer()) return fetch('/__proxy?url=' + encodeURIComponent(url), {...options, cache: 'no-store'});
  return fetch(url, options);
}
function shortcut(key, shift = false) {
  const mac = /Mac|iPhone|iPad/.test(globalThis.navigator?.platform || '');
  return mac ? `${shift ? '⇧' : ''}⌘${key}` : `Ctrl+${shift ? 'Shift+' : ''}${key}`;
}

function icon(name, extra = '') {
  const paths = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/>',
    feather: '<path d="M20 3C11 2 5 8 5 15c0 2 1 3 3 3 7 0 13-8 12-15ZM3 22 15 9M8 16l5-1M11 12h5"/>',
    book: '<path d="M4 4.5h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4zM12 5.5v15"/>',
    route: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v5a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V5M15 8l3-3 3 3"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3"/>',
    bookmark: '<path d="M6.5 4h11a1 1 0 0 1 1 1v16l-6.5-4.5L5.5 21V5a1 1 0 0 1 1-1z"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    left: '<path d="m15 5-7 7 7 7"/>',
    right: '<path d="m9 5 7 7-7 7"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    sidebar: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M9 4.5v15"/>',
    play: '<path d="M7.5 5.2v13.6a.6.6 0 0 0 .9.5l11-6.8a.6.6 0 0 0 0-1L8.4 4.7a.6.6 0 0 0-.9.5z"/>',
    shuffle: '<path d="M3 6h3c5 0 7 12 12 12h3M18 15l3 3-3 3M3 18h3c2 0 3.6-2 5-5M13 9c1.5-2 3-3 5-3h3M18 3l3 3-3 3"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    cross: '<path d="M7 7l10 10M17 7 7 17"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/>',
    file: '<path d="M6 3h8l4 4v14H6zM14 3v4h4"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>'
  };
  return `<svg class="ui-icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.book}</svg>`;
}

// ---------------------------------------------------------------------------------------------- state

let problems = [];
let problemMap = new Map();
let problemById = new Map();

function knownLabels() {
  const labels = new Set((window.CI_PROBLEMS || []).map(p => p.label));
  for (const p of window.PlumeLibrary?.problems() || []) labels.add(p.label);
  return labels;
}

// Backups are data, never executable HTML or URLs. Keep only supported fields.
function normalizeState(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid state');
  const out = structuredClone(DEFAULT_STATE);
  const validLabels = knownLabels();
  const labelOK = label =>
    typeof label === 'string' && /^[A-Za-z0-9_. -]{1,80}$/.test(label) && (!validLabels.size || validLabels.has(label));
  const record = value => value && typeof value === 'object' && !Array.isArray(value);
  const number = (value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) => (Number.isFinite(value) ? clamp(value, min, max) : fallback);
  for (const key of ['uiLang', 'statementLang']) if (LANGS.includes(input[key])) out[key] = input[key];
  if (['system', 'light', 'dark'].includes(input.theme)) out.theme = input.theme;
  if (window.PlumeSettings) {
    const settings = window.PlumeSettings.normalize(input);
    out.preferences = settings.preferences;
    out.profile = settings.profile;
  }
  if (window.PlumeAcademy) out.academy = window.PlumeAcademy.normalize(input.academy);
  if (['code', 'notes', 'history', 'solution'].includes(input.workTab)) out.workTab = input.workTab;
  if (typeof input.atcoderUser === 'string' && /^[A-Za-z0-9_]{0,40}$/.test(input.atcoderUser)) out.atcoderUser = input.atcoderUser;
  out.sidebarCollapsed = input.sidebarCollapsed === true;
  out.lastProblem = labelOK(input.lastProblem) ? input.lastProblem : '';
  out.recentProblems = Array.isArray(input.recentProblems) ? [...new Set(input.recentProblems.filter(labelOK))].slice(0, 12) : [];
  out.autoSync = input.autoSync === true;
  out.dailyGoal = Math.round(number(input.dailyGoal, 5, 1, 50));
  out.splitRatio = number(input.splitRatio, 47, 34, 66);
  out.consoleRatio = number(input.consoleRatio, 42, 20, 75);
  for (const key of ['lastSync', 'syncCursor', 'metadataUpdated', 'lastBackupAt']) out[key] = number(input[key], 0);
  const attempts = (items, account = out.atcoderUser) =>
    Array.isArray(items)
      ? items
          .filter(
            a =>
              record(a) &&
              labelOK(a.problemKey) &&
              VALID_RESULTS.has(a.result) &&
              ATTEMPT_SOURCES.includes(a.source) &&
              Number.isFinite(a.time) &&
              a.time > 0
          )
          .slice(-100000)
          .map(a => ({
            id: String(a.id ?? '').slice(0, 100),
            problemKey: a.problemKey,
            result: a.result,
            source: a.source,
            atcoderUser:
              a.source === 'atcoder' && typeof a.atcoderUser === 'string' && /^[A-Za-z0-9_]{1,40}$/.test(a.atcoderUser)
                ? a.atcoderUser
                : a.source === 'atcoder'
                  ? account
                  : undefined,
            time: a.time,
            language: String(a.language ?? '').slice(0, 120),
            executionTime: Number.isFinite(a.executionTime) ? a.executionTime : null
          }))
      : [];
  if (input.attempts !== undefined && !Array.isArray(input.attempts)) throw new Error('Invalid attempts');
  out.attempts = attempts(input.attempts).filter(a => a.source !== 'atcoder' || !out.atcoderUser || a.atcoderUser === out.atcoderUser);
  const officialIds = new Set();
  out.attempts = out.attempts
    .slice()
    .reverse()
    .filter(a => {
      if (a.source !== 'atcoder' || !a.id) return true;
      const key = a.atcoderUser + '::' + a.id;
      if (officialIds.has(key)) return false;
      officialIds.add(key);
      return true;
    })
    .reverse();
  for (const key of ['notes', 'codes', 'stars', 'solutionUnlocked', 'testCases', 'metadataCache']) {
    if (input[key] !== undefined && !record(input[key])) throw new Error(`Invalid ${key}`);
    for (const [label, value] of Object.entries(input[key] || {})) {
      if (!labelOK(label)) continue;
      if (['notes', 'codes'].includes(key) && typeof value === 'string') out[key][label] = value.slice(0, 2000000);
      if (['stars', 'solutionUnlocked'].includes(key) && value === true) out[key][label] = true;
      if (key === 'metadataCache' && record(value))
        out[key][label] = {
          id: /^[A-Za-z0-9_-]+$/.test(value.id || '') ? value.id : undefined,
          name: typeof value.name === 'string' ? value.name.slice(0, 300) : '',
          point: Number.isFinite(value.point) && value.point >= 0 ? value.point : null,
          difficulty: Number.isFinite(value.difficulty) ? value.difficulty : null
        };
      if (key === 'testCases' && Array.isArray(value)) {
        const seen = new Set();
        out[key][label] = value
          .slice(0, 100)
          .filter(record)
          .map((c, i) => {
            let id = String(c.id || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
            if (!id || seen.has(id)) id = `case-${i}-${Date.now().toString(36)}`;
            seen.add(id);
            return {
              id,
              sample: c.sample === true || (c.sample === undefined && id.startsWith('sample-')),
              input: String(c.input ?? '').slice(0, 1000000),
              expected: String(c.expected ?? '').slice(0, 1000000),
              hasExpected: c.hasExpected === true || (c.hasExpected === undefined && String(c.expected ?? '').length > 0)
            };
          });
      }
    }
  }
  const packPoints = new Map((window.PlumeLibrary?.problems() || []).map(p => [p.label, p.points]));
  const mock = value => {
    if (
      !record(value) ||
      !Array.isArray(value.labels) ||
      value.labels.length < 1 ||
      value.labels.length > 12 ||
      !value.labels.every(labelOK) ||
      new Set(value.labels).size !== value.labels.length ||
      !Number.isFinite(value.startedAt) ||
      value.startedAt <= 0
    )
      return null;
    const m = {
      id: String(value.id || '').slice(0, 100),
      startedAt: value.startedAt,
      durationMs: number(value.durationMs, 9000000, 60000, 86400000),
      labels: [...value.labels],
      pool: typeof value.pool === 'string' && /^[A-Za-z0-9:_.-]{1,120}$/.test(value.pool) ? value.pool : 'core',
      scoreMode: ['official', 'parts'].includes(value.scoreMode) ? value.scoreMode : 'ci300',
      finished: value.finished === true,
      finishedAt: number(value.finishedAt, 0),
      attempts: [],
      points: {}
    };
    m.atcoderUser = typeof value.atcoderUser === 'string' && /^[A-Za-z0-9_]{0,40}$/.test(value.atcoderUser) ? value.atcoderUser : out.atcoderUser;
    m.finishedAt = m.finished ? clamp(m.finishedAt || m.startedAt + m.durationMs, m.startedAt, m.startedAt + m.durationMs) : 0;
    m.attempts = attempts(value.attempts, m.atcoderUser).filter(
      a =>
        (a.source !== 'atcoder' || a.atcoderUser === m.atcoderUser) &&
        m.labels.includes(a.problemKey) &&
        a.time >= m.startedAt &&
        a.time <= Math.min(m.startedAt + m.durationMs, m.finishedAt || Infinity)
    );
    const ids = new Set();
    m.attempts = m.attempts
      .slice()
      .reverse()
      .filter(a => {
        if (a.source !== 'atcoder' || !a.id) return true;
        if (ids.has(a.id)) return false;
        ids.add(a.id);
        return true;
      })
      .reverse();
    for (const label of m.labels) {
      if (m.scoreMode === 'ci300') {
        m.points[label] = 100;
        continue;
      }
      const official = (window.CI_PROBLEMS || []).find(p => p.label === label)?.officialPoint;
      const fallback =
        m.scoreMode === 'parts'
          ? (packPoints.get(label) ?? 100)
          : Number.isFinite(official)
            ? official
            : (out.metadataCache[label]?.point ?? window.CI_METADATA?.[label]?.point ?? 0);
      m.points[label] = number(value.points?.[label], fallback);
    }
    return m;
  };
  out.mock = mock(input.mock);
  out.mockHistory = Array.isArray(input.mockHistory) ? input.mockHistory.map(mock).filter(Boolean).slice(0, 30) : [];
  return out;
}

function initialState() {
  const fresh = structuredClone(DEFAULT_STATE);
  const preferred = String(globalThis.navigator?.language || '').toLowerCase();
  const lang = preferred.startsWith('ja') ? 'ja' : preferred.startsWith('zh') || !preferred ? 'zh' : 'en';
  fresh.uiLang = lang;
  fresh.statementLang = lang;
  return fresh;
}
function loadState() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (current) return normalizeState(current);
  } catch {}
  try {
    const old = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null');
    if (old) return normalizeState({...old, uiLang: 'zh', statementLang: old.language === 'en' ? 'en' : 'zh', mock: null, metadataCache: {}});
  } catch {}
  return initialState();
}

let persistenceRequested = false;
// Ask the browser not to evict this site's storage under pressure.
function requestPersistentStorage() {
  if (persistenceRequested || isNativeApp() || !globalThis.navigator?.storage?.persist) return;
  persistenceRequested = true;
  navigator.storage
    .persisted()
    .then(already => already || navigator.storage.persist())
    .catch(() => {});
}
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    requestPersistentStorage();
    return true;
  } catch (error) {
    toast(t('saveFailed'));
    console.warn(error);
    return false;
  }
}
function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2800);
}

let state = loadState();

// --------------------------------------------------------------------------------------------- library

function loadLibrary() {
  const builtins = (window.CI_PROBLEMS || []).map(p => ({...p, source: 'atcoder'}));
  const packed = window.PlumeLibrary ? window.PlumeLibrary.problems() : [];
  problems = [...builtins, ...packed].sort((a, b) => a.level - b.level || a.order - b.order);
  problemMap = new Map(problems.map(p => [p.label, p]));
  problemById = new Map(builtins.filter(p => p.problemId).map(p => [p.problemId, p]));
  searchIndex.clear();
}
function isPack(p) {
  return p?.source === 'pack';
}
function decodeRouteLabel(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return '';
  }
}
function routeLabel() {
  return decodeRouteLabel(route.path.split('/').pop());
}

function formalAttempts(label) {
  return state.attempts.filter(a => a.problemKey === label && FORMAL_SOURCES.has(a.source)).sort((a, b) => a.time - b.time);
}
function statusOf(p) {
  const a = formalAttempts(p.label);
  const atcoder = a.filter(x => x.source === 'atcoder');
  const verified = atcoder.find(x => x.result === 'AC');
  const judged = a.find(x => x.source === 'judge' && x.result === 'AC');
  const anyAC = a.find(x => x.result === 'AC');
  const failed = a.filter(x => x.result !== 'AC' && x.result !== 'IE' && VALID_RESULTS.has(x.result));
  return {
    verified: !!verified,
    judged: !!judged && !verified,
    solved: !!anyAC,
    manualSolved: !!anyAC && !verified && !judged,
    attempted: a.length > 0,
    errors: failed.length,
    attempts: a.length,
    firstTry: !!verified && atcoder[0]?.result === 'AC',
    last: a.at(-1),
    ac: anyAC
  };
}
function metaOf(p) {
  return state.metadataCache[p.label] || window.CI_METADATA?.[p.label] || {};
}
function pointOf(p) {
  if (!p) return null;
  if (isPack(p)) return p.points;
  if (Number.isFinite(p.officialPoint)) return p.officialPoint;
  const value = metaOf(p).point;
  return Number.isFinite(value) ? value : null;
}
function rawDifficultyOf(p) {
  if (isPack(p)) return null;
  const value = metaOf(p).difficulty;
  return Number.isFinite(value) ? value : null;
}
function clipDifficulty(d) {
  return d >= 400 ? Math.round(d) : Math.round(400 / Math.exp(1 - d / 400));
}
function difficultyOf(p) {
  const d = rawDifficultyOf(p);
  return d == null ? null : clipDifficulty(d);
}
function titleOf(p) {
  if (!p) return '';
  if (isPack(p)) return window.PlumeLibrary.pick(p.title, state.uiLang).text;
  return String(metaOf(p).name || p.title || '').replace(/<\/?[a-z][^>]*>/gi, '');
}
function packTitleOf(p) {
  return isPack(p) ? window.PlumeLibrary.pick(p.packTitle, state.uiLang).text : 'AtCoder';
}
function urlOf(p, lang = '') {
  if (isPack(p)) return p.url || '';
  const url = new URL(p.url);
  if (url.protocol !== 'https:' || url.hostname !== 'atcoder.jp') return 'https://atcoder.jp/';
  if (lang) url.searchParams.set('lang', lang);
  return url.href.replaceAll("'", '%27');
}
function contestSlugOf(p) {
  try {
    const match = new URL(urlOf(p)).pathname.match(/^\/contests\/([^/]+)\/tasks\//);
    return match ? match[1] : p.contestId;
  } catch {
    return p.contestId;
  }
}
function submitUrlOf(p) {
  return `https://atcoder.jp/contests/${encodeURIComponent(contestSlugOf(p))}/submit?taskScreenName=${encodeURIComponent(p.problemId)}`;
}
function editorialUrlOf(p) {
  const contest = contestSlugOf(p);
  const lang = state.statementLang === 'ja' ? 'ja' : 'en';
  if (contest === 'APG4bPython') return urlOf(p, lang);
  return `${urlOf(p).split('?')[0]}/editorial?lang=${lang}`;
}
function acceptedSubmissionsUrlOf(p) {
  return `https://atcoder.jp/contests/${encodeURIComponent(contestSlugOf(p))}/submissions?f.Task=${encodeURIComponent(p.problemId)}&f.Status=AC&f.User=&orderBy=created`;
}
function mySubmissionsUrlOf(p) {
  return `https://atcoder.jp/contests/${encodeURIComponent(contestSlugOf(p))}/submissions?f.Task=${encodeURIComponent(p.problemId)}&f.Status=&f.User=${encodeURIComponent(state.atcoderUser || '')}&orderBy=created`;
}

function aggregateStats() {
  let solved = 0;
  let verified = 0;
  let attempted = 0;
  let errors = 0;
  let first = 0;
  for (const p of problems) {
    const s = statusOf(p);
    if (s.solved) solved++;
    if (s.verified) {
      verified++;
      if (s.firstTry) first++;
    }
    if (s.attempted) attempted++;
    errors += s.errors;
  }
  return {solved, verified, attempted, errors, firstTry: verified ? first / verified : 0};
}
function activityAttempts() {
  return state.attempts.filter(a => a.source !== 'mock');
}
function currentStreak() {
  const days = new Set(activityAttempts().map(a => localDay(a.time)));
  let n = 0;
  const d = new Date();
  // A streak is still alive until the day ends, so an empty today counts from yesterday.
  if (!days.has(localDay(d.getTime()))) d.setDate(d.getDate() - 1);
  while (days.has(localDay(d.getTime()))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function solvedToday() {
  const today = localDay();
  return new Set(activityAttempts().filter(a => a.result === 'AC' && localDay(a.time) === today).map(a => a.problemKey)).size;
}
function sourceName(source) {
  return {atcoder: t('sourceAtCoder'), manual: t('sourceManual'), judge: t('sourceJudge')}[source] || t('sourceMock');
}

// Statements ---------------------------------------------------------------------------------------

const statementHTMLCache = new Map();
const searchIndex = new Map();

function statementFor(label, lang = state.statementLang) {
  const p = problemMap.get(label);
  if (isPack(p)) return packStatement(p, lang);
  return window.CI_STATEMENTS?.[label]?.[lang] || null;
}
function statementLanguages(p) {
  if (!isPack(p)) return LANGS;
  return window.PlumeLibrary.languagesOf(p.statement);
}
function filePreview(name, content) {
  const lines = content.replace(/\n$/, '').split('\n');
  const limit = 30;
  return `<div class="data-file"><div class="data-file-head"><strong>${esc(name)}</strong><span>${esc(t('fileLines', {count: fmt(lines.length)}))}</span></div><pre>${esc(lines.slice(0, limit).join('\n'))}\n</pre>${lines.length > limit ? `<p class="data-file-note">${esc(t('filePreview', {count: limit}))}</p>` : ''}</div>`;
}
function packStatement(p, lang) {
  const library = window.PlumeLibrary;
  const body = library.pick(p.statement, lang);
  if (!body.text) return null;
  const render = value => (p.format === 'html' ? value : library.markdown(value));
  const parts = [];
  if (p.set) {
    const preamble = library.pick(p.set.preamble, lang);
    if (preamble.text) parts.push(`<section class="statement-preamble"><h2>${esc(library.pick(p.set.title, lang).text)}</h2>${render(preamble.text)}</section>`);
  }
  parts.push(`<section class="statement-task">${p.part ? `<h2>${esc(t('partLabel', {n: p.part}))}</h2>` : ''}${render(body.text)}</section>`);
  const files = Object.entries(p.files || {});
  if (files.length) parts.push(`<section class="statement-files"><h3>${esc(t('dataFiles'))}</h3>${files.map(([name, content]) => filePreview(name, content)).join('')}</section>`);
  p.samples.forEach((sample, index) => {
    const n = index + 1;
    parts.push(
      `<section class="statement-sample"><h3>${esc(t('sampleInput', {n}))}</h3>${sample.input ? `<pre>${esc(sample.input)}</pre>` : `<p class="sample-note">${esc(t('noStdin'))}</p>`}${Object.entries(sample.files || {})
        .map(([name, content]) => filePreview(name, content))
        .join('')}<h3>${esc(t('sampleOutput', {n}))}</h3><pre>${esc(sample.expected)}</pre></section>`
    );
  });
  return {html: parts.join(''), samples: p.samples, lang: body.lang};
}
function localStatementCount(lang) {
  return (window.CI_PROBLEMS || []).filter(p => !!window.CI_STATEMENTS?.[p.label]?.[lang]?.html?.trim()).length;
}
function plainStatement(label, lang) {
  const key = `${label}:${lang}`;
  if (!searchIndex.has(key)) {
    const html = statementFor(label, lang)?.html || '';
    searchIndex.set(key, html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').toLowerCase());
  }
  return searchIndex.get(key);
}
function matchesQuery(p, query) {
  if (!query) return true;
  const compact = query.replace(/\s+/g, '');
  const head = `${p.label} ${titleOf(p)}`.toLowerCase();
  if (head.includes(query) || head.replace(/\s+/g, '').includes(compact)) return true;
  return query.length >= 2 && plainStatement(p.label, state.statementLang).includes(query);
}
function sanitizeStatementHTML(html) {
  const root = new DOMParser().parseFromString(String(html), 'text/html').body;
  const allowed = new Set(
    'DIV SECTION ARTICLE P SPAN H1 H2 H3 H4 H5 H6 UL OL LI PRE CODE VAR EM STRONG B I U S SMALL SUP SUB BR HR TABLE THEAD TBODY TFOOT TR TH TD CAPTION BLOCKQUOTE A IMG DETAILS SUMMARY'.split(' ')
  );
  const keepClass = /^(statement-(preamble|task|files|sample)|data-file|data-file-head|data-file-note)$/;
  root.querySelectorAll('script,style,iframe,object,embed,form,input,button,select,textarea,svg,math,noscript').forEach(el => el.remove());
  root.querySelectorAll('*').forEach(el => {
    if (!allowed.has(el.tagName)) {
      el.replaceWith(...el.childNodes);
      return;
    }
    for (const attr of [...el.attributes]) {
      if (attr.name === 'class' && keepClass.test(attr.value)) continue;
      if (!['href', 'src', 'alt', 'title', 'colspan', 'rowspan', 'open'].includes(attr.name)) el.removeAttribute(attr.name);
    }
    if (el.hasAttribute('href')) {
      try {
        const url = new URL(el.getAttribute('href'), location.href);
        if (!['https:', 'http:'].includes(url.protocol)) throw Error();
        el.href = url.href;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      } catch {
        el.removeAttribute('href');
      }
    }
    if (el.hasAttribute('src')) {
      const src = el.getAttribute('src');
      if (!/^(?:\.\/)?(?:data\/(?:assets|media)\/|assets\/)[a-zA-Z0-9_./-]+$/.test(src) && !/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(src))
        el.removeAttribute('src');
    }
  });
  root.querySelectorAll('pre').forEach(el => {
    if (!el.querySelector('var')) el.classList.add('ci-no-math');
  });
  root.querySelectorAll('var').forEach(el => {
    el.textContent = '\\(' + el.textContent + '\\)';
  });
  return root.innerHTML;
}
function ensureMathJax() {
  if (window.MathJax?.typesetPromise) return Promise.resolve();
  if (window.__ciMathJaxLoading) return window.__ciMathJaxLoading;
  window.MathJax = {
    tex: {inlineMath: [['\\(', '\\)'], ['$', '$']], displayMath: [['\\[', '\\]'], ['$$', '$$']]},
    options: {skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'code'], ignoreHtmlClass: 'ci-no-math'}
  };
  window.__ciMathJaxLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'vendor/mathjax/tex-chtml.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      window.__ciMathJaxLoading = null;
      reject(new Error('Math renderer unavailable'));
    };
    document.head.appendChild(script);
  });
  return window.__ciMathJaxLoading;
}
async function typesetStatement() {
  const hosts = [...document.querySelectorAll('#officialStatement, .prose')];
  if (!hosts.length) return;
  try {
    await ensureMathJax();
    const connected = hosts.filter(host => host.isConnected);
    if (connected.length) await window.MathJax.typesetPromise(connected);
  } catch (error) {
    console.warn(error);
  }
}

// ------------------------------------------------------------------------------------------ navigation

let navMeta = {idx: 0, max: 0};
let route = parseRoute();

function parseRoute() {
  const hash = location.hash.slice(1) || '/dashboard';
  const [path, query = ''] = hash.split('?');
  return {path, params: new URLSearchParams(query)};
}
function saveNavMeta() {
  try {
    sessionStorage.setItem(NAV_KEY, JSON.stringify(navMeta));
  } catch {}
}
function initNavigation() {
  try {
    const value = JSON.parse(sessionStorage.getItem(NAV_KEY) || 'null');
    if (value && Number.isInteger(value.idx) && Number.isInteger(value.max)) navMeta = value;
  } catch {}
  if (!location.hash) {
    const base = location.href.split('#')[0];
    const home = homeRoute();
    try {
      history.replaceState({ci: true, idx: 0}, '', base + '#' + home);
    } catch {
      location.hash = home;
    }
    navMeta = {idx: 0, max: 0};
  } else if (history.state && history.state.ci && Number.isInteger(history.state.idx)) {
    navMeta.idx = history.state.idx;
    navMeta.max = Math.max(navMeta.max, navMeta.idx);
  } else {
    navMeta = {idx: 0, max: 0};
    try {
      history.replaceState({ci: true, idx: 0}, '', location.href);
    } catch {}
  }
  saveNavMeta();
  window.addEventListener('popstate', event => {
    if (event.state && event.state.ci && Number.isInteger(event.state.idx)) {
      navMeta.idx = event.state.idx;
      navMeta.max = Math.max(navMeta.max, navMeta.idx);
      saveNavMeta();
    }
    route = parseRoute();
    render();
  });
}
function go(path) {
  closeCommandPalette();
  const hash = '#' + path;
  if (location.hash === hash) return;
  if (path.startsWith('/problem/') && route.path !== path.split('?')[0] && state.workTab !== 'code') {
    state.workTab = 'code';
    saveState();
  }
  const idx = navMeta.idx + 1;
  navMeta = {idx, max: idx};
  saveNavMeta();
  try {
    history.pushState({ci: true, idx}, '', hash);
  } catch {
    location.hash = path;
  }
  route = parseRoute();
  render();
  window.scrollTo?.(0, 0);
}
function replaceRoute(path) {
  try {
    history.replaceState({ci: true, idx: navMeta.idx}, '', '#' + path);
  } catch {
    location.hash = path;
  }
  route = parseRoute();
}
function navBack() {
  if (navMeta.idx > 0) history.back();
}
function navForward() {
  if (navMeta.idx < navMeta.max) history.forward();
}
function homeRoute() {
  return state.preferences.homePage === 'library' ? '/problems' : state.preferences.homePage === 'learn' ? '/learn' : '/dashboard';
}
function effectiveTheme() {
  return state.theme === 'system' ? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : state.theme;
}
function editorOptions() {
  return {...state.preferences, dark: effectiveTheme() === 'dark'};
}
function applyAppearance() {
  const root = document.documentElement;
  root.dataset.theme = effectiveTheme();
  root.dataset.motion = state.preferences.reduceMotion ? 'reduced' : 'normal';
  root.lang = state.uiLang === 'zh' ? 'zh-CN' : state.uiLang;
  root.style?.setProperty('--statement-size', state.preferences.statementFontSize + 'px');
  root.style?.setProperty('--editor-size', state.preferences.editorFontSize + 'px');
  document.querySelector?.('meta[name="theme-color"]')?.setAttribute('content', effectiveTheme() === 'dark' ? '#1c1c1e' : '#f5f5f7');
}

// ---------------------------------------------------------------------------------------- python runner

/* A run takes a fresh Pyodide worker; while a coding page is open, one spare worker is prepared
 * in the background so the next run starts at once. Cases inside one run share that worker,
 * but each case gets a new __main__ module, fresh standard streams and a fresh /work folder. */
const runner = {spare: null, active: new Set(), seq: 0, status: 'idle', error: ''};
let runnerBusy = false;
let runBatchGeneration = 0;
let codeEditorInstance = null;

function makeRunnerWorker() {
  if (window.CI_WORKER_SOURCE) {
    const url = URL.createObjectURL(new Blob([window.CI_WORKER_SOURCE], {type: 'text/javascript'}));
    const worker = new Worker(url);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return worker;
  }
  return new Worker('./pyworker.js');
}
function createWorkerSlot() {
  const worker = makeRunnerWorker();
  const slot = {worker, pending: new Map(), dead: false, ready: null};
  slot.ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Python runtime load timeout')), 60000);
    worker.onmessage = event => {
      const data = event.data || {};
      if (data.type === 'ready') {
        clearTimeout(timer);
        resolve();
      } else if (data.type === 'initError') {
        clearTimeout(timer);
        reject(new Error(data.error));
      } else if (data.type === 'result') {
        const pending = slot.pending.get(data.id);
        if (pending) {
          slot.pending.delete(data.id);
          pending.resolve(data);
        }
        // The interpreter cannot recover from exhausting the browser stack; the next case gets a new one.
        if (data.fatal) disposeWorkerSlot(slot);
      }
    };
    worker.onerror = event => {
      clearTimeout(timer);
      const error = new Error(event.message || 'Worker error');
      reject(error);
      for (const pending of slot.pending.values()) pending.reject(error);
      slot.pending.clear();
    };
  });
  slot.ready.catch(() => {});
  worker.postMessage({type: 'init'});
  return slot;
}
function disposeWorkerSlot(slot) {
  if (!slot || slot.dead) return;
  slot.dead = true;
  try {
    slot.worker.terminate();
  } catch {}
  for (const pending of slot.pending.values()) pending.reject(new Error('Runtime reset'));
  slot.pending.clear();
}
function needsPython() {
  return route.path.startsWith('/problem/') || (route.path.startsWith('/learn/') && route.path.length > 7);
}
function runtimeLabel(status) {
  return status === 'idle' ? '' : t({loading: 'runtimeLoading', ready: 'runtimeReady', running: 'runtimeRunning', error: 'runtimeError'}[status]);
}
function setRuntimeStatus(status, error = '') {
  runner.status = status;
  runner.error = error;
  const el = document.getElementById('runtimeState');
  if (!el) return;
  el.dataset.status = status;
  el.title = error;
  const label = el.querySelector('.runtime-label');
  if (label) label.textContent = runtimeLabel(status);
}
function prewarmRunner() {
  if (!needsPython() || typeof Worker !== 'function') return;
  if (runner.spare && !runner.spare.dead) return;
  const slot = createWorkerSlot();
  runner.spare = slot;
  if (!runner.active.size) setRuntimeStatus('loading');
  slot.ready.then(
    () => {
      if (runner.spare === slot && !runner.active.size) setRuntimeStatus('ready');
    },
    error => {
      if (runner.spare !== slot) return;
      runner.spare = null;
      disposeWorkerSlot(slot);
      setRuntimeStatus('error', String(error.message || error));
    }
  );
}
function disposeSpareRunner() {
  disposeWorkerSlot(runner.spare);
  runner.spare = null;
  if (!runner.active.size) runner.status = 'idle';
}
function takeWorkerSlot() {
  const slot = runner.spare && !runner.spare.dead ? runner.spare : createWorkerSlot();
  runner.spare = null;
  runner.active.add(slot);
  setRuntimeStatus('running');
  return slot;
}
function releaseWorkerSlot(slot) {
  runner.active.delete(slot);
  disposeWorkerSlot(slot);
  if (!runner.active.size) setRuntimeStatus(runner.spare ? 'ready' : 'idle');
  setTimeout(prewarmRunner, 0);
}
function runInSlot(slot, code, input, timeoutMs, files) {
  return slot.ready.then(() => {
    if (slot.dead) throw new Error('Runtime reset');
    const id = ++runner.seq;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        slot.pending.delete(id);
        disposeWorkerSlot(slot);
        reject(Object.assign(new Error('TLE'), {code: 'TLE'}));
      }, timeoutMs);
      slot.pending.set(id, {
        resolve: value => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: error => {
          clearTimeout(timer);
          reject(error);
        }
      });
      slot.worker.postMessage({type: 'run', id, code, input, files});
    });
  });
}
/** One run session: several cases in one fresh interpreter process (see note above). */
function createPythonSession() {
  let slot = null;
  return {
    async run(code, input = '', timeoutMs = 6000, files = {}) {
      if (!slot || slot.dead) {
        if (slot) runner.active.delete(slot);
        slot = takeWorkerSlot();
      }
      return runInSlot(slot, code, input, timeoutMs, files);
    },
    close() {
      if (slot) releaseWorkerSlot(slot);
      slot = null;
    }
  };
}
async function executePython(code, input = '', timeoutMs = 6000, files = {}) {
  const session = createPythonSession();
  try {
    return await session.run(code, input, timeoutMs, files);
  } finally {
    session.close();
  }
}
function stopPythonRuns() {
  runBatchGeneration++;
  for (const slot of runner.active) disposeWorkerSlot(slot);
  runner.active.clear();
  setRuntimeStatus(runner.spare ? 'ready' : 'idle');
}
function cancelPythonRuns() {
  window.PlumeAcademy?.cancel();
  stopPythonRuns();
  runnerBusy = false;
}
function resultOf(error) {
  if (error?.code === 'TLE') return {status: 'TLE', stdout: '', stderr: ''};
  return {status: 'ENGINE_ERROR', stdout: '', stderr: String(error?.message || error)};
}

// ------------------------------------------------------------------------------------------------ shell

function reviewProblems() {
  return problems.filter(p => state.stars[p.label] || statusOf(p).errors > 0);
}
function viewTitle(active) {
  return t(active === 'dashboard' ? 'today' : active);
}
function shell(content, active) {
  const stats = aggregateStats();
  const isProblem = route.path.startsWith('/problem/');
  const current = isProblem ? problemMap.get(routeLabel()) : null;
  const nav = [
    ['dashboard', 'today', 'home'],
    ['learn', 'learn', 'feather'],
    ['problems', 'problems', 'book'],
    ['study', 'study', 'route'],
    ['mock', 'mock', 'timer'],
    ['review', 'review', 'bookmark']
  ];
  const reviewCount = reviewProblems().length;
  const mockRunning = state.mock && !state.mock.finished;
  const crumb = current
    ? `<button class="toolbar-crumb" data-go="/problems">${esc(t('problems'))}</button>${icon('right', 'crumb-separator')}<span>${esc(current.label)}</span>`
    : `<span>${esc(viewTitle(active))}</span>`;
  const navButton = (key, label, glyph, count = 0) =>
    `<button class="nav-item${active === key ? ' active' : ''}" data-go="/${key}"${active === key ? ' aria-current="page"' : ''} title="${esc(label)}">${icon(glyph)}<span class="nav-label">${esc(label)}</span>${count ? `<span class="nav-count">${count}</span>` : ''}</button>`;
  return `<div class="app-shell${isProblem ? ' is-problem' : ''}${state.sidebarCollapsed ? ' sidebar-collapsed' : ''}">
  <aside id="appSidebar" class="sidebar" aria-label="${esc(t('navigation'))}">
    <button class="sidebar-brand" data-go="/dashboard" aria-label="${PRODUCT_NAME}"><img class="brand-mark" src="assets/plume.svg" alt=""><span class="brand-text"><strong>${PRODUCT_NAME}</strong><small>CI Programming Practice</small></span></button>
    <button class="sidebar-search" data-action="search" aria-label="${esc(t('search'))}">${icon('search')}<span>${esc(t('search'))}</span><kbd>${shortcut('K')}</kbd></button>
    <nav class="sidebar-nav">${nav.map(([key, copyKey, glyph]) => navButton(key, t(copyKey), glyph, key === 'problems' ? problems.length : key === 'review' ? reviewCount : 0)).join('')}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-progress"><span>${esc(t('solvedOf', {done: stats.solved, total: problems.length}))}</span><div class="meter"><i style="width:${problems.length ? (stats.solved / problems.length) * 100 : 0}%"></i></div></div>
      ${navButton('settings', t('settings'), 'settings')}
      <div class="sidebar-account"><span class="account-dot${state.atcoderUser ? ' linked' : ''}"></span><span>${state.atcoderUser ? `@${esc(state.atcoderUser)}` : esc(t('savedLocally'))}</span></div>
    </div>
  </aside>
  <div class="workspace">
    <header class="window-toolbar">
      <div class="toolbar-group">
        <button class="icon-button sidebar-toggle" data-action="toggleSidebar" aria-controls="appSidebar" aria-expanded="${!state.sidebarCollapsed}" title="${esc(t(state.sidebarCollapsed ? 'showSidebar' : 'hideSidebar'))}" aria-label="${esc(t(state.sidebarCollapsed ? 'showSidebar' : 'hideSidebar'))}">${icon('sidebar')}</button>
        <button class="icon-button" data-action="navBack" title="${esc(t('back'))}" aria-label="${esc(t('back'))}"${navMeta.idx <= 0 ? ' disabled' : ''}>${icon('left')}</button>
        <button class="icon-button" data-action="navForward" title="${esc(t('forward'))}" aria-label="${esc(t('forward'))}"${navMeta.idx >= navMeta.max ? ' disabled' : ''}>${icon('right')}</button>
      </div>
      <div class="toolbar-title">${crumb}</div>
      <div class="toolbar-group toolbar-end">
        ${mockRunning ? `<button class="toolbar-timer" data-go="/mock" title="${esc(t('currentMock'))}">${icon('timer')}<span id="globalMockTimer">${formatTime(Math.max(0, state.mock.durationMs - (Date.now() - state.mock.startedAt)))}</span></button>` : ''}
        <button class="icon-button toolbar-search" data-action="search" title="${esc(t('search'))} (${shortcut('K')})" aria-label="${esc(t('search'))}">${icon('search')}</button>
      </div>
    </header>
    <main class="page-content${isProblem ? ' problem-page' : ''}" id="mainContent">${content}</main>
  </div>
</div>`;
}

function render() {
  clearTimeout(setProblemQuery.timer);
  if (!problems.length) return;
  const path = route.path;
  let html;
  let active;
  if (path === '/dashboard') [html, active] = [renderDashboard(), 'dashboard'];
  else if (path === '/problems') [html, active] = [renderProblems(), 'problems'];
  else if (path.startsWith('/problem/')) [html, active] = [renderProblem(routeLabel()), 'problems'];
  else if (path === '/learn') [html, active] = [window.PlumeAcademy.renderIndex({uiLang: state.uiLang, progress: state.academy}), 'learn'];
  else if (path.startsWith('/learn/'))
    [html, active] = [window.PlumeAcademy.renderLesson({id: decodeRouteLabel(path.slice(7)), uiLang: state.uiLang, progress: state.academy}), 'learn'];
  else if (path === '/study') [html, active] = [renderStudy(), 'study'];
  else if (path === '/mock') [html, active] = [renderMock(), 'mock'];
  else if (path === '/review') [html, active] = [renderReview(), 'review'];
  else if (path === '/settings') [html, active] = [renderSettings(), 'settings'];
  else {
    go('/dashboard');
    return;
  }
  window.PlumeAcademy?.destroy();
  codeEditorInstance?.destroy?.();
  codeEditorInstance = null;
  window.MathJax?.typesetClear?.();
  document.getElementById('app').innerHTML = shell(html, active);
  const label = path.startsWith('/problem/') ? routeLabel() : '';
  if (label && problemMap.has(label)) rememberProblem(label);
  document.title = `${label || viewTitle(active)} — ${PRODUCT_NAME}`;
  if (needsPython()) prewarmRunner();
  else if (!runner.active.size) disposeSpareRunner();
  bindAfterRender();
}
function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  saveState();
  render();
}

// -------------------------------------------------------------------------------------------- dashboard

function levelName(level) {
  return (LEVEL_NAMES[state.uiLang] || LEVEL_NAMES.en)[level] || '';
}
function rememberProblem(label) {
  if (!problemMap.has(label) || state.lastProblem === label) return;
  state.lastProblem = label;
  state.recentProblems = [label, ...(state.recentProblems || []).filter(key => key !== label)].slice(0, 12);
  saveState();
}
function studyRecommendations() {
  const unsolved = problems.filter(p => !isPack(p) && !statusOf(p).solved);
  // Keep prerequisites ahead of harder reviews; prioritize saved/failed tasks within a level.
  const priority = p => (state.stars[p.label] ? 0 : statusOf(p).errors ? 1 : 2);
  return unsolved
    .slice()
    .sort((a, b) => a.level - b.level || priority(a) - priority(b) || a.order - b.order)
    .slice(0, 10);
}
function continuationProblem() {
  const previous = problemMap.get(state.lastProblem);
  if (previous && !statusOf(previous).solved) return previous;
  const recent = (state.recentProblems || []).map(label => problemMap.get(label)).find(p => p && !statusOf(p).solved);
  return recent || studyRecommendations()[0] || previous || problems[0];
}
function randomUnsolved() {
  const level = route.path === '/problems' ? route.params.get('level') : null;
  const pool = problems.filter(p => !statusOf(p).solved && (level === null || level === 'all' || p.level === Number(level)));
  if (!pool.length) {
    toast(t('allCompleted'));
    return;
  }
  go('/problem/' + encodeURIComponent(pool[Math.floor(Math.random() * pool.length)].label));
}
function problemPath(label) {
  return `/problem/${esc(encodeURIComponent(label))}`;
}
function recommendationRow(p, index = 0) {
  const status = statusOf(p);
  return `<button class="list-row" data-go="${problemPath(p.label)}"><span class="row-index">${String(index + 1).padStart(2, '0')}</span><span class="row-main"><strong>${esc(p.label)}</strong><span>${esc(titleOf(p))}</span></span><span class="row-meta">${status.errors ? `<span class="row-alert">${esc(t('errorsCount', {count: status.errors}))}</span>` : ''}<span class="level-tag">L${p.level}</span></span>${icon('right', 'row-chevron')}</button>`;
}
function renderLevelList() {
  return `<div class="level-list">${[0, 1, 2, 3, 4, 5]
    .map(level => {
      const items = problems.filter(p => p.level === level && !isPack(p));
      const done = items.filter(p => statusOf(p).solved).length;
      const complete = items.length && done === items.length;
      return `<button class="level-row${complete ? ' complete' : ''}" data-go="/problems?level=${level}"><span class="level-number">${complete ? icon('check') : level}</span><span class="level-copy"><strong>${esc(levelName(level))}</strong><span class="meter"><i style="width:${items.length ? (done / items.length) * 100 : 0}%"></i></span></span><span class="level-count">${done}/${items.length}</span></button>`;
    })
    .join('')}</div>`;
}
function goalRing(done, goal) {
  const ratio = Math.min(1, goal ? done / goal : 0);
  const radius = 34;
  const length = 2 * Math.PI * radius;
  return `<svg class="goal-ring" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="${radius}" class="goal-ring-track"/><circle cx="40" cy="40" r="${radius}" class="goal-ring-value" stroke-dasharray="${length.toFixed(1)}" stroke-dashoffset="${(length * (1 - ratio)).toFixed(1)}"/></svg>`;
}
function renderActivity() {
  const weeks = 18;
  const counts = new Map();
  for (const a of activityAttempts()) counts.set(localDay(a.time), (counts.get(localDay(a.time)) || 0) + 1);
  const end = new Date();
  end.setHours(12, 0, 0, 0);
  const start = new Date(end);
  // Columns are Monday-first weeks; the grid ends with the current week.
  start.setDate(start.getDate() - ((end.getDay() + 6) % 7) - (weeks - 1) * 7);
  const dateFormat = new Intl.DateTimeFormat(langLocale(), {month: 'short', day: 'numeric'});
  const cells = [];
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const n = counts.get(localDay(d.getTime())) || 0;
    const level = n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 7 ? 3 : 4;
    cells.push(`<i data-n="${level}" title="${esc(t('activityDay', {date: dateFormat.format(d), count: n}))}"></i>`);
  }
  const recent = activityAttempts()
    .slice()
    .sort((x, y) => y.time - x.time)
    .slice(0, 6);
  return `<section class="panel activity-panel"><div class="section-head"><h2>${esc(t('activity'))}</h2><span>${esc(t('activityRange'))}</span></div>
    <div class="activity-layout"><div class="activity-calendar"><div class="calendar-grid" style="--weeks:${weeks}">${cells.join('')}</div><div class="calendar-legend"><span>${esc(t('fewer'))}</span>${[0, 1, 2, 3, 4].map(n => `<i data-n="${n}"></i>`).join('')}<span>${esc(t('more'))}</span></div></div>
    <div class="activity-recent">${
      recent.length
        ? recent
            .map(
              a =>
                `<button class="recent-row" data-go="${problemPath(a.problemKey)}"><span class="result-dot ${a.result === 'AC' ? 'ac' : 'err'}"></span><span class="recent-main"><strong>${esc(a.problemKey)}</strong><span>${esc(a.result)} · ${esc(sourceName(a.source))}</span></span><time>${esc(fmtDate(a.time))}</time></button>`
            )
            .join('')
        : `<p class="quiet-note">${esc(t('noActivity'))}</p>`
    }</div></div></section>`;
}
function renderCourseCard() {
  if (!window.PlumeAcademy || !window.PLUME_ACADEMY?.lessons?.length) return '';
  const course = window.PlumeAcademy;
  const next = course.nextLesson(state.academy);
  const done = course.progressCount(state.academy);
  const total = window.PLUME_ACADEMY.lessons.length;
  const title = done === total ? t('courseDone') : next.content[state.uiLang].title;
  const target = done === total ? '/learn' : `/learn/${esc(encodeURIComponent(next.id))}`;
  return `<section class="course-banner"><span class="course-banner-mark">${icon('feather')}</span><div class="course-banner-copy"><span class="eyebrow">${esc(t('courseEyebrow', {done, total}))}</span><h2>${esc(title)}</h2><p>${esc(t('courseInvite'))}</p></div><button class="btn" data-go="${target}">${esc(t('openCourse'))}</button></section>`;
}
function renderDashboard() {
  const stats = aggregateStats();
  const next = continuationProblem();
  const today = solvedToday();
  const goal = state.dailyGoal;
  const resume = next && state.lastProblem === next.label;
  const recommended = studyRecommendations()
    .filter(p => p.label !== next?.label)
    .slice(0, 5);
  const date = new Intl.DateTimeFormat(langLocale(), {month: 'long', day: 'numeric', weekday: 'long'}).format(new Date());
  const greeting = state.profile.displayName ? `${esc(state.profile.displayName)} · ` : '';
  const focus = next
    ? `<p class="focus-id">${esc(next.label)}</p><h2 class="focus-title">${esc(titleOf(next) || next.label)}</h2>
      <p class="focus-meta"><span>L${next.level} · ${esc(levelName(next.level))}</span>${difficultyOf(next) !== null ? `<span>${esc(t('difficultyValue', {value: difficultyOf(next)}))}</span>` : ''}${isPack(next) ? `<span>${esc(packTitleOf(next))}</span>` : ''}</p>
      <div class="focus-actions"><button class="btn primary large" data-go="${problemPath(next.label)}">${icon('play')}${esc(t(resume ? 'continuePractice' : 'startPractice'))}</button><button class="btn plain large" data-action="randomUnsolved">${icon('shuffle')}${esc(t('randomProblem'))}</button></div>`
    : '';
  return `<header class="page-header"><p class="page-eyebrow">${greeting}${esc(date)}</p><h1>${esc(t('todayTitle'))}</h1></header>
  <div class="today-grid">
    <section class="focus-card"><div class="focus-label">${icon(resume ? 'play' : 'flag')}<span>${esc(t(resume ? 'continueLabel' : 'upNext'))}</span></div>${focus}</section>
    <section class="panel goal-panel">
      <div class="section-head"><h2>${esc(t('dailyGoal'))}</h2><button class="icon-button" data-go="/settings?section=practice" title="${esc(t('editGoal'))}" aria-label="${esc(t('editGoal'))}">${icon('target')}</button></div>
      <div class="goal-body">${goalRing(today, goal)}<div class="goal-figure"><strong>${today}</strong><span>/ ${goal}</span></div></div>
      <p class="goal-caption">${esc(t('goalCaption', {done: today, goal}))}</p>
      <div class="goal-streak"><span>${esc(t('statStreak'))}</span><strong>${esc(t('streakDays', {count: currentStreak()}))}</strong></div>
    </section>
  </div>
  <section class="stat-strip">
    <div><span>${esc(t('statSolved'))}</span><strong>${stats.solved}<small> / ${problems.length}</small></strong></div>
    <div><span>${esc(t('statVerified'))}</span><strong>${stats.verified}</strong></div>
    <div><span>${esc(t('statAttempted'))}</span><strong>${stats.attempted}</strong></div>
  </section>
  ${renderCourseCard()}
  <div class="two-column">
    <section class="panel"><div class="section-head"><h2>${esc(t('recommended'))}</h2><button class="text-button" data-go="/problems">${esc(t('allProblems'))}${icon('right')}</button></div>
      <div class="list">${recommended.length ? recommended.map(recommendationRow).join('') : `<div class="empty-state compact"><h3>${esc(t('allDoneTitle'))}</h3><p>${esc(t('allDoneBody'))}</p></div>`}</div></section>
    <section class="panel"><div class="section-head"><h2>${esc(t('levels'))}</h2><button class="text-button" data-go="/study">${esc(t('study'))}${icon('right')}</button></div>${renderLevelList()}</section>
  </div>
  ${renderActivity()}`;
}

// ---------------------------------------------------------------------------------------------- library

function packSources() {
  const seen = new Map();
  for (const p of problems) if (isPack(p) && !seen.has(p.packId)) seen.set(p.packId, packTitleOf(p));
  return [...seen.entries()];
}
// An unknown source in the address (for example a removed pack) falls back to every source.
function currentSource() {
  const source = route.params.get('source') ?? 'all';
  return source === 'all' || source === 'atcoder' || packSources().some(([id]) => id === source) ? source : 'all';
}
function filteredProblems() {
  const level = route.params.get('level') ?? 'all';
  const status = route.params.get('status') ?? 'all';
  const sort = route.params.get('sort') ?? 'level';
  const source = currentSource();
  const query = (route.params.get('q') || '').trim().toLowerCase();
  let items = problems.filter(p => level === 'all' || p.level === +level);
  if (source === 'atcoder') items = items.filter(p => !isPack(p));
  else if (source !== 'all') items = items.filter(p => p.packId === source);
  items = items.filter(p => {
    const result = statusOf(p);
    if (status === 'todo') return !result.solved;
    if (status === 'ac') return result.solved;
    if (status === 'wrong') return result.errors > 0;
    if (status === 'star') return !!state.stars[p.label];
    return true;
  });
  if (query) items = items.filter(p => matchesQuery(p, query));
  const value = x => (x === null ? Infinity : x);
  return items.sort((a, b) =>
    sort === 'difficulty'
      ? value(difficultyOf(a)) - value(difficultyOf(b))
      : sort === 'points'
        ? value(pointOf(a)) - value(pointOf(b))
        : sort === 'status'
          ? +statusOf(b).solved - +statusOf(a).solved || statusOf(b).errors - statusOf(a).errors
          : a.level - b.level || a.order - b.order
  );
}
function setLibraryStatus(status) {
  const params = new URLSearchParams(route.params);
  if (status === 'all') params.delete('status');
  else params.set('status', status);
  replaceRoute('/problems' + (params.size ? '?' + params : ''));
  render();
}
function setProblemQuery() {
  const search = document.getElementById('problemSearch');
  const focused = !!search && document.activeElement === search;
  const cursor = search?.selectionStart;
  const params = new URLSearchParams(route.params);
  const query = search?.value.trim() || '';
  if (query) params.set('q', query);
  else params.delete('q');
  for (const [id, name, fallback] of [
    ['levelFilter', 'level', 'all'],
    ['sourceFilter', 'source', 'all'],
    ['sortFilter', 'sort', 'level']
  ]) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.value === fallback) params.delete(name);
    else params.set(name, el.value);
  }
  replaceRoute('/problems' + (params.size ? '?' + params : ''));
  render();
  if (focused) {
    const next = document.getElementById('problemSearch');
    next?.focus();
    if (Number.isInteger(cursor)) {
      try {
        next?.setSelectionRange(cursor, cursor);
      } catch {}
    }
  }
}
function selectControl(id, value, options, label) {
  return `<span class="select-control"><select id="${id}" aria-label="${esc(label)}">${options
    .map(([v, text]) => `<option value="${esc(v)}"${String(v) === String(value) ? ' selected' : ''}>${esc(text)}</option>`)
    .join('')}</select></span>`;
}
function statusBadge(p) {
  const status = statusOf(p);
  if (status.verified) return `<span class="status-badge verified">${icon('check')}${esc(t('statusVerified'))}</span>`;
  if (status.judged) return `<span class="status-badge judged">${icon('check')}${esc(t('statusJudged'))}</span>`;
  if (status.manualSolved) return `<span class="status-badge solved">${icon('check')}${esc(t('statusManual'))}</span>`;
  if (status.attempted) return `<span class="status-badge tried"><i></i>${esc(t('statusTried'))}</span>`;
  return `<span class="status-badge idle"><i></i>${esc(t('statusNew'))}</span>`;
}
function problemRow(p) {
  const difficulty = difficultyOf(p);
  const point = pointOf(p);
  return `<tr tabindex="0" data-go="${problemPath(p.label)}" aria-label="${esc(p.label)} ${esc(titleOf(p))}"><td class="problem-cell"><span class="problem-id">${esc(p.label)}${state.stars[p.label] ? icon('bookmark', 'saved-mark') : ''}</span><span class="problem-name">${esc(titleOf(p))}</span></td><td><span class="level-tag">L${p.level}</span></td><td class="num hide-sm">${difficulty ?? '—'}</td><td class="num hide-sm">${point ?? '—'}</td><td>${statusBadge(p)}</td><td class="row-end">${icon('right')}</td></tr>`;
}
function renderProblems() {
  const level = route.params.get('level') ?? 'all';
  const status = route.params.get('status') ?? 'all';
  const sort = route.params.get('sort') ?? 'level';
  const source = currentSource();
  const items = filteredProblems();
  const sources = packSources();
  const heading = level === 'all' ? t('problems') : `L${level} · ${levelName(+level)}`;
  const segments = [
    ['all', 'filterAll'],
    ['todo', 'filterTodo'],
    ['ac', 'filterSolved'],
    ['star', 'filterStarred'],
    ['wrong', 'filterErrors']
  ];
  return `<header class="page-header"><h1>${esc(heading)}</h1><p>${esc(t('libraryIntro', {count: problems.length}))}</p></header>
  <div class="library-toolbar">
    <div class="segmented" role="group" aria-label="${esc(t('colStatus'))}">${segments
      .map(([key, label]) => `<button class="${status === key ? 'active' : ''}" aria-pressed="${status === key}" data-action="setLibraryStatus" data-arg="${key}">${esc(t(label))}</button>`)
      .join('')}</div>
    <div class="library-filters">
      <label class="search-field">${icon('search')}<input id="problemSearch" type="search" autocomplete="off" spellcheck="false" aria-label="${esc(t('search'))}" placeholder="${esc(t('searchPlaceholder'))}" value="${esc(route.params.get('q') || '')}"></label>
      ${selectControl('levelFilter', level, [['all', t('allLevels')], ...[0, 1, 2, 3, 4, 5].map(i => [i, `L${i} · ${levelName(i)}`])], t('colLevel'))}
      ${sources.length ? selectControl('sourceFilter', source, [['all', t('allSources')], ['atcoder', 'AtCoder'], ...sources], t('allSources')) : ''}
      ${selectControl('sortFilter', sort, [['level', t('sortLevel')], ['difficulty', t('sortDifficulty')], ['points', t('sortPoints')], ['status', t('sortStatus')]], t('sortLevel'))}
      <button class="icon-button bordered" data-action="randomUnsolved" title="${esc(t('randomProblem'))}" aria-label="${esc(t('randomProblem'))}">${icon('shuffle')}</button>
    </div>
  </div>
  <div class="table-card">${
    items.length
      ? `<table class="problem-table"><thead><tr><th>${esc(t('colProblem'))}</th><th>${esc(t('colLevel'))}</th><th class="num hide-sm">${esc(t('colDifficulty'))}</th><th class="num hide-sm">${esc(t('colPoints'))}</th><th>${esc(t('colStatus'))}</th><th class="row-end"></th></tr></thead><tbody>${items.map(problemRow).join('')}</tbody></table>`
      : `<div class="empty-state">${icon('search')}<h2>${esc(t('noMatch'))}</h2><button class="btn" data-go="/problems">${esc(t('clearFilters'))}</button></div>`
  }</div>
  <p class="table-footnote">${esc(t('shownOf', {shown: items.length, total: problems.length}))}</p>`;
}

// ---------------------------------------------------------------------------------------------- problem

function siblingsOf(p) {
  if (isPack(p)) return problems.filter(q => q.packId === p.packId).sort((a, b) => a.order - b.order);
  return problems.filter(q => !isPack(q));
}
function adjacentProblem(label, delta) {
  const p = problemMap.get(label);
  if (!p) return null;
  const list = siblingsOf(p);
  return list[list.findIndex(q => q.label === label) + delta] || null;
}
function statementLanguage(p) {
  const available = statementLanguages(p);
  return available.includes(state.statementLang) ? state.statementLang : available[0] || state.statementLang;
}
function renderProblem(label) {
  const p = problemMap.get(label);
  if (!p) return `<div class="empty-state page-empty"><h2>${esc(t('notFound'))}</h2><button class="btn" data-go="/problems">${esc(t('backToLibrary'))}</button></div>`;
  const point = pointOf(p);
  const difficulty = difficultyOf(p);
  const tab = ['code', 'notes', 'history', 'solution'].includes(state.workTab) ? state.workTab : 'code';
  const previous = adjacentProblem(label, -1);
  const next = adjacentProblem(label, 1);
  const starred = !!state.stars[p.label];
  const languages = statementLanguages(p);
  const shownLang = statementLanguage(p);
  const status = statusOf(p);
  const link = (href, text) => `<a class="btn compact" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(text)}${icon('external')}</a>`;
  const sourceLinks = isPack(p) ? (p.url ? link(p.url, t('original')) : '') : link(urlOf(p, state.statementLang === 'en' ? 'en' : 'ja'), t('original')) + link(submitUrlOf(p), t('submit'));
  const tabs = [
    ['code', 'tabCode'],
    ['notes', 'tabNotes'],
    ['history', 'tabHistory'],
    ['solution', 'tabSolution']
  ];
  return `<div class="problem-shell" style="--split:${clamp(+state.splitRatio || 47, 34, 66)}%">
  <section class="pane statement-pane" aria-label="${esc(titleOf(p) || p.label)}">
    <header class="problem-head">
      <div class="problem-head-row">
        <span class="problem-id">${esc(p.label)}${isPack(p) ? `<span class="problem-source">${esc(packTitleOf(p))}</span>` : ''}</span>
        <div class="problem-head-buttons">
          <button class="icon-button bookmark-button${starred ? ' selected' : ''}" data-action="toggleStar" data-arg="${esc(p.label)}" title="${esc(t(starred ? 'unsave' : 'save'))}" aria-label="${esc(t(starred ? 'unsave' : 'save'))}" aria-pressed="${starred}">${icon('bookmark')}</button>
          <button class="icon-button" title="${esc(t('previousProblem'))}" aria-label="${esc(t('previousProblem'))}" ${previous ? `data-go="${problemPath(previous.label)}"` : 'disabled'}>${icon('left')}</button>
          <button class="icon-button" title="${esc(t('nextProblem'))}" aria-label="${esc(t('nextProblem'))}" ${next ? `data-go="${problemPath(next.label)}"` : 'disabled'}>${icon('right')}</button>
        </div>
      </div>
      <h1 class="problem-title">${esc(titleOf(p) || p.label)}</h1>
      <div class="problem-meta"><span class="level-tag">L${p.level} · ${esc(levelName(p.level))}</span>${point !== null ? `<span>${esc(t('pointsValue', {points: point}))}</span>` : ''}${difficulty !== null ? `<span>${esc(t('difficultyValue', {value: difficulty}))}</span>` : ''}${status.attempted ? statusBadge(p) : ''}</div>
      <div class="problem-toolbar">${
        languages.length > 1
          ? `<div class="segmented small" role="group">${languages
              .map(lang => `<button data-language="${lang}" class="${shownLang === lang ? 'active' : ''}" aria-pressed="${shownLang === lang}" data-action="setStatementLang" data-arg="${lang}">${LANG_NAMES[lang]}</button>`)
              .join('')}</div>`
          : '<span></span>'
      }<div class="problem-links">${sourceLinks}</div></div>
    </header>
    ${renderStatement(p)}
  </section>
  <div id="problemSplitter" class="splitter" role="separator" aria-orientation="vertical" aria-valuemin="34" aria-valuemax="66" aria-valuenow="${Math.round(state.splitRatio)}" tabindex="0"></div>
  <section class="pane work-pane">
    <div class="work-tabs" role="tablist">${tabs
      .map(([key, text]) => `<button role="tab" class="${tab === key ? 'active' : ''}" aria-selected="${tab === key}" data-action="setWorkTab" data-arg="${key}">${esc(t(text))}</button>`)
      .join('')}<span id="runtimeState" class="runtime-state" data-status="${runner.status}" title="${esc(runner.error)}"><i></i><span>${PYTHON_LABEL}</span><span class="runtime-label">${esc(runtimeLabel(runner.status))}</span></span></div>
    ${renderWorkPane(p, tab)}
  </section>
</div>`;
}
function renderStatement(p) {
  const lang = statementLanguage(p);
  const entry = statementFor(p.label, lang);
  let body;
  if (entry?.html) {
    const key = `${p.label}:${lang}:${state.uiLang}`;
    if (!statementHTMLCache.has(key)) statementHTMLCache.set(key, sanitizeStatementHTML(entry.html));
    body = statementHTMLCache.get(key);
  } else body = `<div class="statement-empty" role="alert"><p>${esc(t('statementMissing'))}</p></div>`;
  const notice =
    isPack(p) && entry?.lang && entry.lang !== state.statementLang
      ? `<p class="statement-notice">${esc(t('langUnavailable', {lang: LANG_NAMES[state.statementLang], shown: LANG_NAMES[entry.lang]}))}</p>`
      : '';
  const footer = isPack(p)
    ? `<footer class="statement-footer"><span>${esc(t('fromPack', {title: packTitleOf(p)}))}</span></footer>`
    : `<footer class="statement-footer"><span>${esc(t('statementSource'))}</span><a class="text-button" href="${esc(urlOf(p, lang === 'en' ? 'en' : 'ja'))}" target="_blank" rel="noopener noreferrer">${esc(t('openOnAtCoder'))}${icon('external')}</a></footer>`;
  return `<article class="statement">${notice}<div id="officialStatement" class="official-statement lang-${lang}" lang="${lang === 'zh' ? 'zh-CN' : lang}" data-label="${esc(p.label)}" data-lang="${lang}">${body}</div>${footer}</article>`;
}
function setStatementLang(value) {
  state.statementLang = LANGS.includes(value) ? value : 'zh';
  saveState();
  const p = route.path.startsWith('/problem/') ? problemMap.get(routeLabel()) : null;
  const article = document.querySelector('.statement-pane .statement');
  if (!p || !article) {
    render();
    return;
  }
  const old = document.getElementById('officialStatement');
  if (old) window.MathJax?.typesetClear?.([old]);
  article.outerHTML = renderStatement(p);
  const shown = statementLanguage(p);
  document.querySelectorAll('.problem-toolbar [data-language]').forEach(button => {
    const selected = button.dataset.language === shown;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  typesetStatement();
}
function setWorkTab(value) {
  persistCaseEditors(routeLabel());
  state.workTab = value;
  saveState();
  render();
}
function renderWorkPane(p, tab) {
  if (tab === 'notes')
    return `<div class="notes-pane"><textarea id="problemNote" placeholder="${esc(t('notesPlaceholder'))}" aria-label="${esc(t('tabNotes'))}">${esc(state.notes[p.label] || '')}</textarea><p class="pane-footnote">${esc(t('notesSaved'))}</p></div>`;
  if (tab === 'history') return renderHistory(p);
  if (tab === 'solution') return renderSolution(p);
  return renderCode(p);
}

// Code and console -----------------------------------------------------------------------------------

const caseResults = new Map();
const selectedCases = new Map();
const judgeReports = new Map();

function defaultCode() {
  return '';
}
function samplesOf(label) {
  const p = problemMap.get(label);
  if (isPack(p)) return p.samples;
  return statementFor(label, state.statementLang)?.samples || statementFor(label, 'ja')?.samples || [];
}
function casesFor(label) {
  if (!Array.isArray(state.testCases[label]) || !state.testCases[label].length) {
    const samples = samplesOf(label);
    state.testCases[label] = samples.length
      ? samples.map((sample, i) => ({id: `sample-${i + 1}`, sample: true, input: String(sample.input ?? ''), expected: String(sample.expected ?? sample.output ?? ''), hasExpected: true}))
      : [{id: `case-${Date.now().toString(36)}`, sample: false, input: '', expected: '', hasExpected: false}];
  }
  return state.testCases[label];
}
function caseName(label, c) {
  const list = casesFor(label);
  if (c.sample) return t('caseSample', {n: list.filter(x => x.sample).indexOf(c) + 1});
  return t('caseCustom', {n: list.indexOf(c) + 1});
}
function selectedCase(label) {
  const list = casesFor(label);
  return list.find(c => c.id === selectedCases.get(label)) || list[0];
}
function resultsFor(label) {
  if (!caseResults.has(label)) caseResults.set(label, new Map());
  return caseResults.get(label);
}
function checkerNote(p) {
  const rule = window.PlumeLibrary?.checkerFor(p) || {type: 'exact'};
  if (rule.type === 'float') return t('checkerFloat', {tolerance: rule.tolerance});
  if (rule.type === 'tokens') return t('checkerTokens');
  if (rule.type === 'special') return t('checkerSpecial');
  return '';
}
function canJudge(p) {
  return isPack(p) && p.samples.length + p.tests.length > 0;
}
function renderCode(p) {
  const ratio = clamp(+state.consoleRatio || 42, 20, 75);
  return `<div class="code-area" style="--console:${ratio}%">
    <div class="editor-wrap"><textarea id="codeEditor" class="editor-fallback" spellcheck="false" aria-label="${esc(t('tabCode'))} · Python">${esc(state.codes[p.label] ?? defaultCode())}</textarea></div>
    <div id="consoleSplitter" class="console-splitter" role="separator" aria-orientation="horizontal" tabindex="0" aria-valuemin="20" aria-valuemax="75" aria-valuenow="${Math.round(ratio)}"></div>
    <section class="console" id="console" aria-label="${esc(t('output'))}">${renderConsole(p)}</section>
  </div>`;
}
function renderConsole(p) {
  const list = casesFor(p.label);
  const current = selectedCase(p.label);
  const judge = canJudge(p);
  const notes = [checkerNote(p), judge ? t('consoleNotePack') : isPack(p) ? '' : t('consoleNote')].filter(Boolean);
  const label = esc(p.label);
  return `<div class="console-bar">
      <div class="case-tabs" id="caseTabs" role="tablist">${renderCaseTabs(p)}</div>
      <div class="console-actions">
        <button class="icon-button" data-action="addTestCase" data-arg="${label}" title="${esc(t('addCase'))}" aria-label="${esc(t('addCase'))}">${icon('plus')}</button>
        <button class="btn compact plain" data-action="clearCode" data-arg="${label}">${esc(t('clearCode'))}</button>
        ${judge ? `<button class="btn compact" data-action="judgeProblem" data-arg="${label}" title="${esc(shortcut('↵', true))}">${esc(t('judge'))}</button>` : ''}
        <button class="btn compact primary" data-action="runAllCases" data-arg="${label}" title="${esc(shortcut('↵'))}">${icon('play')}${esc(t('runAll'))}</button>
      </div>
    </div>
    <div class="console-body">
      <div id="judgeReport">${renderJudgeReport(p)}</div>
      <div class="io-grid">
        <label class="io-field"><span class="io-label">${esc(t('input'))}</span><textarea data-role="input" data-id="${esc(current.id)}" spellcheck="false">${esc(current.input || '')}</textarea></label>
        <label class="io-field"><span class="io-label"><input type="checkbox" data-role="hasExpected" data-id="${esc(current.id)}"${current.hasExpected ? ' checked' : ''}>${esc(t('expected'))}</span><textarea data-role="expected" data-id="${esc(current.id)}" spellcheck="false"${current.hasExpected ? '' : ' disabled'}>${esc(current.expected || '')}</textarea></label>
      </div>
      <div class="io-output" id="caseOutput">${renderCaseOutput(p.label, current)}</div>
      <div class="case-footer">${!current.sample && list.length > 1 ? `<button class="text-button danger" data-action="removeTestCase" data-arg="${label}" data-case="${esc(current.id)}">${icon('trash')}${esc(t('removeCase'))}</button>` : '<span></span>'}<button class="text-button" data-action="runCase" data-arg="${label}" data-case="${esc(current.id)}">${icon('play')}${esc(t('runThisCase'))}</button></div>
      ${notes.length ? `<p class="console-note">${notes.map(esc).join(' ')}</p>` : ''}
    </div>`;
}
function verdictOf(result) {
  if (!result) return {key: 'idle', label: t('notRunYet')};
  if (result.pending) return {key: 'pending', label: t('runtimeRunning')};
  if (result.status === 'TLE') return {key: 'bad', label: t('verdictTLE')};
  if (result.status === 'OLE') return {key: 'bad', label: t('verdictOLE')};
  if (result.status === 'ENGINE_ERROR') return {key: 'bad', label: t('verdictEngine')};
  if (result.status !== 'OK') return {key: 'bad', label: t('verdictRE')};
  if (result.passed === true) return {key: 'good', label: t('verdictPass')};
  if (result.passed === false) return {key: 'bad', label: t('verdictFail')};
  return {key: 'neutral', label: t('verdictRan')};
}
function renderCaseTabs(p) {
  const results = resultsFor(p.label);
  const current = selectedCase(p.label);
  return casesFor(p.label)
    .map(c => {
      const verdict = verdictOf(results.get(c.id));
      return `<button role="tab" class="case-tab${c.id === current.id ? ' active' : ''}" aria-selected="${c.id === current.id}" data-action="selectCase" data-arg="${esc(p.label)}" data-case="${esc(c.id)}"><i class="verdict-dot ${verdict.key}"></i>${esc(caseName(p.label, c))}</button>`;
    })
    .join('');
}
function renderCaseOutput(label, c) {
  const result = resultsFor(label).get(c.id);
  const verdict = verdictOf(result);
  const done = result && !result.pending;
  const stale = done && result.code !== (state.codes[label] ?? defaultCode());
  const text = done ? (result.status === 'OK' ? result.stdout : (result.stderr || result.stdout || '').trim() || verdict.label) : '';
  const body = done ? (text ? esc(text) : `<span class="placeholder">${esc(t('emptyOutput'))}</span>`) : '';
  return `<div class="io-label"><span>${esc(t('output'))}</span><span class="verdict ${verdict.key}">${esc(verdict.label)}</span>${done && result.elapsedMs != null ? `<span class="elapsed">${fmt(result.elapsedMs)} ms</span>` : ''}${stale ? `<span class="stale">${esc(t('verdictStale'))}</span>` : ''}</div><pre class="${done && result.status !== 'OK' ? 'error' : ''}">${body}</pre>`;
}
function onProblemPage(label) {
  return route.path === `/problem/${encodeURIComponent(label)}` && state.workTab === 'code';
}
function refreshConsole(label, {full = false} = {}) {
  if (!onProblemPage(label)) return;
  const p = problemMap.get(label);
  if (!p) return;
  if (full) {
    const host = document.getElementById('console');
    if (host) host.innerHTML = renderConsole(p);
    bindConsole(label);
    return;
  }
  const tabs = document.getElementById('caseTabs');
  if (tabs) tabs.innerHTML = renderCaseTabs(p);
  const output = document.getElementById('caseOutput');
  if (output) output.innerHTML = renderCaseOutput(label, selectedCase(label));
  const report = document.getElementById('judgeReport');
  if (report) report.innerHTML = renderJudgeReport(p);
}
function selectCase(label, id) {
  persistCaseEditors(label);
  selectedCases.set(label, id);
  refreshConsole(label, {full: true});
}
function addTestCase(label) {
  persistCaseEditors(label);
  const id = `case-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  casesFor(label).push({id, sample: false, input: '', expected: '', hasExpected: false});
  selectedCases.set(label, id);
  saveState();
  refreshConsole(label, {full: true});
  document.querySelector('#console textarea[data-role="input"]')?.focus();
}
function removeTestCase(label, id) {
  const list = casesFor(label);
  if (list.length <= 1) return;
  state.testCases[label] = list.filter(c => c.id !== id);
  resultsFor(label).delete(id);
  selectedCases.delete(label);
  saveState();
  refreshConsole(label, {full: true});
}
function persistCaseEditors(label) {
  if (!label || !problemMap.has(label)) return;
  const fields = document.querySelectorAll('[data-role="input"],[data-role="expected"],[data-role="hasExpected"]');
  if (!fields.length) return;
  fields.forEach(el => {
    const c = casesFor(label).find(x => x.id === el.dataset.id);
    if (c) c[el.dataset.role] = el.dataset.role === 'hasExpected' ? el.checked : el.value;
  });
  saveState();
}
function clearCode(label) {
  if (!confirm(t('clearCodeConfirm'))) return;
  state.codes[label] = defaultCode();
  saveState();
  render();
}
function normalizeOutput(value) {
  return String(value ?? '').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n+$/, '');
}
function compareOutput(p, input, actual, expected) {
  if (window.PlumeLibrary) return window.PlumeLibrary.check(window.PlumeLibrary.checkerFor(p), {input, actual, expected});
  return normalizeOutput(actual) === normalizeOutput(expected);
}
function editorCode(label) {
  const value = codeEditorInstance?.value?.() ?? document.getElementById('codeEditor')?.value;
  if (typeof value === 'string' && onProblemPage(label)) {
    state.codes[label] = value;
    saveState();
    return value;
  }
  return state.codes[label] ?? defaultCode();
}
function runFiles(p, test) {
  return {...(p?.files || {}), ...(test?.files || {})};
}
// A sample of a pack problem may bring its own data files; custom cases use the problem's files.
function caseFiles(p, c) {
  const index = c.sample ? Number(/^sample-(\d+)$/.exec(c.id)?.[1]) - 1 : -1;
  return runFiles(p, isPack(p) && index >= 0 ? p.samples[index] : null);
}
function timeLimitOf(p) {
  return isPack(p) ? p.timeLimitMs : 6000;
}
async function runCases(label, ids) {
  if (runnerBusy) {
    toast(t('runtimeBusy'));
    return;
  }
  const p = problemMap.get(label);
  if (!p) return;
  runnerBusy = true;
  const generation = runBatchGeneration;
  persistCaseEditors(label);
  // Snapshot the code and inputs: edits during the run must not mix into this batch.
  const code = editorCode(label);
  const cases = casesFor(label)
    .filter(c => !ids || ids.includes(c.id))
    .map(c => ({...c}));
  const results = resultsFor(label);
  for (const c of cases) results.set(c.id, {pending: true});
  refreshConsole(label);
  const session = createPythonSession();
  try {
    for (const c of cases) {
      if (generation !== runBatchGeneration) break;
      let result;
      try {
        result = await session.run(code, c.input || '', timeLimitOf(p), caseFiles(p, c));
      } catch (error) {
        result = resultOf(error);
      }
      if (generation !== runBatchGeneration) break;
      result.code = code;
      if (result.status === 'OK' && c.hasExpected) result.passed = compareOutput(p, c.input || '', result.stdout, c.expected);
      results.set(c.id, result);
      if (result.status === 'ENGINE_ERROR') setRuntimeStatus('error', result.stderr);
      refreshConsole(label);
    }
  } finally {
    session.close();
    if (generation === runBatchGeneration) {
      runnerBusy = false;
      for (const c of cases) if (results.get(c.id)?.pending) results.delete(c.id);
      refreshConsole(label);
    }
  }
}
function runAllCases(label) {
  return runCases(label, null);
}
function runCase(label, id) {
  return runCases(label, [id]);
}

// Local judge for pack problems: every sample and hidden test, recorded as an attempt.
function renderJudgeReport(p) {
  const report = judgeReports.get(p.label);
  if (!report) return '';
  if (report.running) return `<div class="judge-report running"><span class="spinner"></span><strong>${esc(t('judgeRunning', {done: report.done, total: report.total}))}</strong></div>`;
  const ok = report.result === 'AC';
  const failure = report.failure;
  const details =
    failure && !failure.sample
      ? `<details><summary>${esc(t('input'))} · ${esc(t('expected'))} · ${esc(t('output'))}</summary><pre>${esc(failure.input.slice(0, 4000))}</pre><pre>${esc(failure.expected.slice(0, 4000))}</pre><pre>${esc(String(failure.actual ?? '').slice(0, 4000))}</pre></details>`
      : '';
  return `<div class="judge-report ${ok ? 'accepted' : 'rejected'}">${icon(ok ? 'check' : 'cross')}<div><strong>${esc(t(ok ? 'judgeAccepted' : 'judgeRejected'))} · ${esc(report.result)}</strong><span>${esc(t('judgeSummary', {passed: report.passed, total: report.total}))}${failure ? ` · ${esc(t('judgeFirstFailure', {name: failure.name}))}` : ''}</span>${details}</div></div>`;
}
async function judgeProblem(label) {
  const p = problemMap.get(label);
  if (!canJudge(p)) return;
  if (runnerBusy) {
    toast(t('runtimeBusy'));
    return;
  }
  runnerBusy = true;
  const generation = runBatchGeneration;
  persistCaseEditors(label);
  const code = editorCode(label);
  const tests = [
    ...p.samples.map((test, i) => ({...test, name: t('caseSample', {n: i + 1}), sample: true})),
    ...p.tests.map((test, i) => ({...test, name: t('hiddenCase', {n: i + 1}), sample: false}))
  ];
  const report = {running: true, done: 0, total: tests.length, passed: 0, result: 'AC', failure: null};
  judgeReports.set(label, report);
  refreshConsole(label);
  const session = createPythonSession();
  let slowest = 0;
  try {
    for (const test of tests) {
      if (generation !== runBatchGeneration) return;
      let result;
      try {
        result = await session.run(code, test.input, p.timeLimitMs, runFiles(p, test));
      } catch (error) {
        result = resultOf(error);
      }
      if (generation !== runBatchGeneration) return;
      if (result.status === 'ENGINE_ERROR') {
        judgeReports.delete(label);
        refreshConsole(label);
        toast(t('runtimeFailed', {error: result.stderr}));
        return;
      }
      slowest = Math.max(slowest, result.elapsedMs || 0);
      const verdict = result.status === 'OK' ? (compareOutput(p, test.input, result.stdout, test.expected) ? 'AC' : 'WA') : ['TLE', 'OLE'].includes(result.status) ? result.status : 'RE';
      report.done++;
      if (verdict === 'AC') report.passed++;
      else if (!report.failure) {
        report.result = verdict;
        report.failure = {name: test.name, sample: test.sample, input: test.input, expected: test.expected, actual: result.status === 'OK' ? result.stdout : result.stderr};
      }
      refreshConsole(label);
    }
    report.running = false;
    const attempt = {id: `judge-${Date.now().toString(36)}`, problemKey: label, result: report.result, source: 'judge', time: Date.now(), language: PYTHON_LABEL, executionTime: slowest};
    state.attempts.push(attempt);
    if (state.mock && !state.mock.finished && state.mock.labels.includes(label)) mockAttempt(label, report.result, 'judge', attempt.time, attempt.id, false);
    saveState();
    refreshConsole(label);
  } finally {
    session.close();
    if (generation === runBatchGeneration) runnerBusy = false;
  }
}

// History, notes and solution ------------------------------------------------------------------------

function renderHistory(p) {
  const attempts = formalAttempts(p.label)
    .slice()
    .sort((x, y) => y.time - x.time);
  const manual = isPack(p)
    ? ''
    : `<section class="record-card"><div><h3>${esc(t('recordManually'))}</h3><p>${esc(t('recordHelp'))}</p></div><div class="record-actions"><button class="btn compact" data-action="recordManual" data-arg="${esc(p.label)}" data-result="WA">${esc(t('recordWA'))}</button><button class="btn compact" data-action="recordManual" data-arg="${esc(p.label)}" data-result="AC">${esc(t('recordAC'))}</button></div></section>`;
  const table = attempts.length
    ? `<table class="history-table"><thead><tr><th>${esc(t('colResult'))}</th><th>${esc(t('colTime'))}</th><th>${esc(t('colSource'))}</th><th class="hide-sm">${esc(t('colLanguage'))}</th><th class="num">${esc(t('colRuntime'))}</th></tr></thead><tbody>${attempts
        .map(
          a =>
            `<tr><td><span class="result-chip ${a.result === 'AC' ? 'ac' : 'err'}">${esc(a.result)}</span></td><td>${esc(fmtDate(a.time))}</td><td>${esc(sourceName(a.source))}</td><td class="hide-sm">${esc(a.language || '—')}</td><td class="num">${a.executionTime != null ? `${fmt(a.executionTime)} ms` : '—'}</td></tr>`
        )
        .join('')}</tbody></table>`
    : `<p class="quiet-note">${esc(t('noHistory'))}</p>`;
  return `<div class="pane-scroll history-pane"><h2 class="pane-title">${esc(t('historyTitle'))}</h2>${table}${manual}</div>`;
}
function recordManual(label, result) {
  state.attempts.push({id: `manual-${Date.now()}-${Math.random().toString(36).slice(2)}`, problemKey: label, result, time: Date.now(), source: 'manual'});
  saveState();
  toast(t('recorded', {result}));
  render();
}
function renderSolution(p) {
  const unlocked = statusOf(p).solved || !!state.solutionUnlocked[p.label];
  if (!unlocked)
    return `<div class="pane-scroll"><div class="solution-lock"><span class="lock-mark">${icon('lock')}</span><h2>${esc(t('solutionHidden'))}</h2><p>${esc(t('solutionHiddenBody'))}</p><button class="btn" data-action="unlockSolution" data-arg="${esc(p.label)}">${esc(t('showSolution'))}</button></div></div>`;
  const code = state.codes[p.label] ?? defaultCode();
  const yours = `<section class="solution-section"><div class="section-head"><h3>${esc(t('yourCode'))}</h3><button class="text-button" data-action="copyText" data-arg="mine">${esc(t('copy'))}</button></div><pre class="code-block" id="copy-mine">${esc(code)}</pre></section>`;
  if (isPack(p)) {
    const explanation = p.solution ? window.PlumeLibrary.pick(p.solution.explanation, state.uiLang).text : '';
    const reference = p.solution
      ? `${explanation ? `<section class="solution-section"><h3>${esc(t('explanation'))}</h3><div class="prose">${sanitizeStatementHTML(window.PlumeLibrary.markdown(explanation))}</div></section>` : ''}<section class="solution-section"><div class="section-head"><h3>${esc(t('referenceSolution'))}</h3><button class="text-button" data-action="copyText" data-arg="reference">${esc(t('copy'))}</button></div><pre class="code-block" id="copy-reference">${esc(p.solution.code)}</pre></section>`
      : `<p class="quiet-note">${esc(t('noReference'))}</p>`;
    return `<div class="pane-scroll solution-pane">${reference}${yours}</div>`;
  }
  const link = (href, title, detail) => `<a class="link-row" href="${esc(href)}" target="_blank" rel="noopener noreferrer"><strong>${esc(title)}</strong><span>${esc(detail)}${icon('external')}</span></a>`;
  return `<div class="pane-scroll solution-pane"><div class="link-list">${link(editorialUrlOf(p), t('editorial'), 'AtCoder')}${link(acceptedSubmissionsUrlOf(p), t('acceptedSubmissions'), 'AtCoder')}${state.atcoderUser ? link(mySubmissionsUrlOf(p), t('mySubmissions'), '@' + state.atcoderUser) : ''}</div>${yours}</div>`;
}
function unlockSolution(label) {
  if (!confirm(t('showSolutionConfirm'))) return;
  state.solutionUnlocked[label] = true;
  saveState();
  render();
}
async function copyText(which) {
  const text = document.getElementById(`copy-${which}`)?.textContent ?? '';
  try {
    await navigator.clipboard.writeText(text);
    toast(t('copied'));
  } catch {
    toast(t('copyFailed'));
  }
}
function toggleStar(label) {
  if (state.stars[label]) delete state.stars[label];
  else state.stars[label] = true;
  saveState();
  toast(t(state.stars[label] ? 'saved' : 'unsaved'));
  render();
}

// ----------------------------------------------------------------------------------------------- study

function renderStudy() {
  const recommended = studyRecommendations();
  const today = solvedToday();
  const goal = state.dailyGoal;
  return `<header class="page-header"><h1>${esc(t('study'))}</h1><p>${esc(t('studyIntro'))}</p></header>
  <div class="study-layout">
    <section class="panel"><div class="section-head"><h2>${esc(t('nextUp'))}</h2><span>${esc(t('practiceCount', {count: recommended.length}))}</span></div>
      <div class="list">${recommended.length ? recommended.map(recommendationRow).join('') : `<div class="empty-state compact"><h3>${esc(t('allDoneTitle'))}</h3><p>${esc(t('allDoneBody'))}</p></div>`}</div></section>
    <aside class="study-aside">
      <section class="panel goal-panel"><div class="section-head"><h2>${esc(t('dailyGoal'))}</h2></div>
        <div class="goal-body">${goalRing(today, goal)}<div class="goal-figure"><strong>${today}</strong><span>/ ${goal}</span></div></div>
        <form class="goal-form" data-form="saveDailyGoal"><label for="dailyGoal">${esc(t('goalLabel'))}</label><input id="dailyGoal" type="number" inputmode="numeric" min="1" max="50" value="${goal}"><button class="btn compact" type="submit">${esc(t('saveGoal'))}</button></form>
      </section>
      <section class="panel"><div class="section-head"><h2>${esc(t('levels'))}</h2></div>${renderLevelList()}</section>
    </aside>
  </div>`;
}
function saveDailyGoal() {
  state.dailyGoal = clamp(parseInt(document.getElementById('dailyGoal')?.value || '5', 10) || 5, 1, 50);
  saveState();
  toast(t('goalSaved'));
  render();
}

// ------------------------------------------------------------------------------------------------ mock

function poolLevels(mode) {
  if (mode === 'foundation') return [1, 2, 3];
  if (mode === 'hard') return [3, 4, 5];
  if (mode === 'mixed') return [1, 2, 3, 4, 5];
  return [2, 3, 4];
}
function randomPick(list, n) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}
function problemSets() {
  const sets = new Map();
  for (const p of problems) {
    if (!isPack(p) || !p.set) continue;
    const key = `${p.packId}:${p.set.id}`;
    if (!sets.has(key)) sets.set(key, {key, title: window.PlumeLibrary.pick(p.set.title, state.uiLang).text, minutes: p.set.minutes, labels: []});
    sets.get(key).labels.push(p.label);
  }
  return [...sets.values()];
}
function mockHistoryKey(m) {
  return m.id || `legacy-${m.startedAt}`;
}
function mockHistoryEntries() {
  const seen = new Set();
  return [...state.mockHistory, ...(state.mock?.finished ? [state.mock] : [])]
    .filter(m => m.finished)
    .sort((a, b) => b.startedAt - a.startedAt)
    .filter(m => {
      const key = mockHistoryKey(m);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
function mockHistoryPath(m) {
  return '/mock?' + new URLSearchParams({history: mockHistoryKey(m)}).toString();
}
function mockDate(m) {
  return new Intl.DateTimeFormat(langLocale(), {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(m.startedAt));
}
function scoreModeLabel(m) {
  return t(m.scoreMode === 'official' ? 'scoreOfficial' : m.scoreMode === 'parts' ? 'scoreParts' : 'scoreFlat');
}
function renderMockHistory(limit = 0, heading = true) {
  const entries = mockHistoryEntries();
  const visible = limit ? entries.slice(0, limit) : entries;
  const head = heading
    ? `<div class="section-head"><h2>${esc(t('mockHistory'))}</h2>${limit && entries.length > limit ? `<button class="text-button" data-go="/mock?history">${esc(t('viewAll'))}${icon('right')}</button>` : ''}</div>`
    : '';
  const rows = visible
    .map(
      m =>
        `<button class="mock-history-row" data-go="${esc(mockHistoryPath(m))}"><span class="mock-history-date"><strong>${esc(mockDate(m))}</strong><small>${esc(scoreModeLabel(m))} · ${esc(t('minutes', {count: Math.round(m.durationMs / 60000)}))}</small></span><span class="mock-history-score">${mockScore(m)}<small> / ${mockMax(m)}</small></span><span class="mock-history-completed">${esc(t('solvedCount', {done: m.labels.filter(l => mockSolved(m, l)).length, total: m.labels.length}))}${icon('right')}</span></button>`
    )
    .join('');
  return `<section class="mock-history-panel">${head}${visible.length ? `<div class="list grouped">${rows}</div>` : `<div class="empty-state compact"><p>${esc(t('mockHistoryEmpty'))}</p></div>`}</section>`;
}
function renderMock() {
  if (route.params.has('history')) {
    const id = route.params.get('history');
    if (id) {
      const archived = mockHistoryEntries().find(m => mockHistoryKey(m) === id);
      if (archived) return renderMockSummary(archived, true);
      return `<header class="page-header"><h1>${esc(t('sessionMissing'))}</h1><p>${esc(t('sessionMissingBody'))}</p></header><div class="inline-actions"><button class="btn" data-go="/mock?history">${esc(t('backToHistory'))}</button><button class="btn" data-go="/mock">${esc(t('backToMock'))}</button></div>`;
    }
    return `<header class="page-header with-aside"><div><h1>${esc(t('mockHistory'))}</h1></div><button class="btn" data-go="/mock">${icon('left')}${esc(t('backToMock'))}</button></header>${renderMockHistory(0, false)}`;
  }
  const m = state.mock;
  if (!m) return renderMockSetup() + renderMockHistory(3);
  if (m.finished) return renderMockSummary(m);
  return renderMockActive(m);
}
function renderMockSetup() {
  const sets = problemSets();
  const pools = [
    ['core', t('poolCore')],
    ['foundation', t('poolFoundation')],
    ['hard', t('poolHard')],
    ['mixed', t('poolMixed')],
    ...(sets.length ? [['set:random', t('poolRandomSet')], ...sets.map(set => [`set:${set.key}`, t('poolSet', {title: set.title})])] : [])
  ];
  return `<header class="page-header"><h1>${esc(t('mockTitle'))}</h1><p>${esc(t('mockIntro'))}</p></header>
  <section class="form-card mock-setup">
    <div class="form-row"><label for="mockPool">${esc(t('mockPool'))}</label>${selectControl('mockPool', 'core', pools, t('mockPool'))}</div>
    <div class="form-row"><label for="mockDuration">${esc(t('mockDuration'))}</label>${selectControl('mockDuration', 150, MOCK_DURATIONS.map(n => [n, t('minutes', {count: n})]), t('mockDuration'))}</div>
    <div class="form-row" id="mockScoringRow"><label for="mockScoreMode">${esc(t('mockScoring'))}</label>${selectControl('mockScoreMode', 'ci300', [['ci300', t('scoreFlat')], ['official', t('scoreOfficial')]], t('mockScoring'))}</div>
    <p class="form-note" id="mockRules">${esc(t('mockRules'))}</p>
    <div class="form-actions"><button class="btn primary" data-action="startMock">${esc(t('startMock'))}</button></div>
  </section>`;
}
function startMock() {
  const mode = document.getElementById('mockPool')?.value || 'core';
  const duration = clamp(parseInt(document.getElementById('mockDuration')?.value || '150', 10) || 150, 10, 300);
  let scoreMode = document.getElementById('mockScoreMode')?.value || 'ci300';
  let picked;
  if (mode.startsWith('set:')) {
    const sets = problemSets();
    const set = mode === 'set:random' ? randomPick(sets, 1)[0] : sets.find(item => `set:${item.key}` === mode);
    if (!set) {
      toast(t('noPoolProblems'));
      return;
    }
    picked = set.labels.map(label => problemMap.get(label)).filter(Boolean);
    scoreMode = 'parts';
  } else {
    const levels = poolLevels(mode);
    let pool = problems.filter(p => !isPack(p) && levels.includes(p.level) && !statusOf(p).solved);
    if (pool.length < 3) pool = problems.filter(p => !isPack(p) && levels.includes(p.level));
    picked = randomPick(pool, 3);
    if (picked.length < 3) {
      toast(t('noPoolProblems'));
      return;
    }
    if (scoreMode === 'official' && picked.some(p => pointOf(p) == null)) {
      toast(t('officialUnavailable'));
      return;
    }
  }
  state.mock = {
    id: `mock-${Date.now()}`,
    atcoderUser: state.atcoderUser,
    startedAt: Date.now(),
    durationMs: duration * 60000,
    labels: picked.map(p => p.label),
    pool: mode,
    scoreMode,
    points: Object.fromEntries(picked.map(p => [p.label, scoreMode === 'ci300' ? 100 : pointOf(p)])),
    attempts: [],
    finished: false,
    finishedAt: 0
  };
  saveState();
  render();
  startMockTimer();
}
function eligibleMockAttempts(m) {
  const end = Math.min(m.startedAt + m.durationMs, m.finishedAt || Infinity);
  return m.attempts.filter(a => m.labels.includes(a.problemKey) && a.time >= m.startedAt && a.time <= end);
}
function mockSolved(m, label) {
  return eligibleMockAttempts(m).some(a => a.problemKey === label && a.result === 'AC');
}
function mockPoint(m, label) {
  return m.scoreMode === 'ci300' ? 100 : (m.points?.[label] ?? 0);
}
function mockScore(m) {
  return m.labels.reduce((sum, label) => sum + (mockSolved(m, label) ? mockPoint(m, label) : 0), 0);
}
function mockMax(m) {
  return m.labels.reduce((sum, label) => sum + mockPoint(m, label), 0);
}
function mockPenalty(m) {
  let lastAcMs = 0;
  let wrongs = 0;
  for (const label of m.labels) {
    const attempts = eligibleMockAttempts(m)
      .filter(a => a.problemKey === label)
      .sort((a, b) => a.time - b.time);
    const acIndex = attempts.findIndex(a => a.result === 'AC');
    if (acIndex < 0) continue;
    lastAcMs = Math.max(lastAcMs, attempts[acIndex].time - m.startedAt);
    wrongs += attempts.slice(0, acIndex).filter(a => PENALTY_RESULTS.has(a.result)).length;
  }
  return {penaltyMs: lastAcMs + wrongs * 300000, lastAcMs, wrongs};
}
function mockProblemRow(m, label, index, archived) {
  const p = problemMap.get(label);
  const solved = mockSolved(m, label);
  const point = mockPoint(m, label);
  const live = !archived && !m.finished;
  const open = `<button class="btn compact" data-go="${problemPath(label)}">${esc(t(live ? 'open' : 'practiceAgain'))}</button>`;
  const manual =
    live && !solved && !isPack(p)
      ? ['WA', 'CE', 'AC'].map(result => `<button class="btn compact plain" data-action="mockAttempt" data-arg="${esc(label)}" data-result="${result}">${result}</button>`).join('')
      : '';
  const hint = live && isPack(p) && !solved ? ` · ${esc(t('judgedThere'))}` : '';
  return `<div class="mock-problem"><span class="mock-letter${solved ? ' solved' : ''}">${solved ? icon('check') : String.fromCharCode(65 + index)}</span><div class="mock-result-info"><strong>${esc(label)}${titleOf(p) ? ` · ${esc(titleOf(p))}` : ''}</strong><small>L${p?.level ?? '—'} · ${esc(t('score'))} <span class="mock-result-points">${solved ? point : 0} / ${point}</span>${hint}</small></div><div class="mock-controls">${manual}${open}</div></div>`;
}
function renderMockActive(m) {
  const left = Math.max(0, m.durationMs - (Date.now() - m.startedAt));
  const penalty = mockPenalty(m);
  const canSync = state.atcoderUser && m.labels.some(label => !isPack(problemMap.get(label)));
  return `<header class="page-header with-aside"><div><h1>${esc(t('mockTitle'))}</h1><p>${esc(scoreModeLabel(m))} · ${esc(t('minutes', {count: Math.round(m.durationMs / 60000)}))}</p></div><button class="btn" data-go="/mock?history">${icon('calendar')}${esc(t('mockHistory'))}</button></header>
  <section class="mock-clock"><div class="mock-clock-time"><span>${esc(t('remaining'))}</span><strong id="mockTimer">${formatTime(left)}</strong></div><div class="mock-clock-score"><span>${esc(t('score'))}</span><strong>${mockScore(m)}<small> / ${mockMax(m)}</small></strong>${m.scoreMode === 'parts' ? '' : `<small>${esc(t('penalties', {count: penalty.wrongs}))}</small>`}</div><div class="mock-clock-actions">${canSync ? `<button class="btn compact" data-action="syncMock">${esc(t('syncVerdicts'))}</button>` : ''}<button class="btn compact danger" data-action="finishMockConfirm">${esc(t('finishMock'))}</button></div></section>
  <div class="mock-list">${m.labels.map((label, index) => mockProblemRow(m, label, index, false)).join('')}</div>
  <p class="form-note">${esc(t(m.scoreMode === 'parts' ? 'mockRulesSet' : 'mockRules'))}</p>`;
}
function mockAttempt(label, result, source = 'manual', time = Date.now(), id = '', rerender = true) {
  const m = state.mock;
  if (!m || m.finished || !m.labels.includes(label) || !VALID_RESULTS.has(result) || !Number.isFinite(time)) return;
  if (time < m.startedAt || time > m.startedAt + m.durationMs) {
    if (Date.now() >= m.startedAt + m.durationMs) finishMock();
    return;
  }
  if (source === 'manual' && Date.now() >= m.startedAt + m.durationMs) {
    finishMock();
    return;
  }
  if (mockSolved(m, label)) return;
  m.attempts.push({id: id || `mock-${Date.now()}-${Math.random()}`, problemKey: label, result, time, source});
  saveState();
  if (rerender) {
    render();
    startMockTimer();
  }
}
function hydrateMockFromAtCoder() {
  const account = state.atcoderUser;
  const official = state.attempts.filter(a => a.source === 'atcoder' && (!a.atcoderUser || a.atcoderUser === account));
  const reconcile = m => {
    if (!m) return;
    if (!m.atcoderUser) m.atcoderUser = account;
    if (m.atcoderUser !== account) return;
    const end = Math.min(m.startedAt + m.durationMs, m.finishedAt || Infinity);
    const byId = new Map(m.attempts.filter(a => a.source === 'atcoder').map(a => [String(a.id), a]));
    for (const a of official) {
      if (a.time < m.startedAt || a.time > end || !m.labels.includes(a.problemKey)) continue;
      byId.set(String(a.id), {...a, atcoderUser: account});
    }
    m.attempts = [...m.attempts.filter(a => a.source !== 'atcoder'), ...byId.values()].sort((a, b) => a.time - b.time);
  };
  reconcile(state.mock);
  for (const old of state.mockHistory) reconcile(old);
  if (state.mock?.finished) {
    const index = state.mockHistory.findIndex(old => old.id === state.mock.id);
    if (index >= 0) state.mockHistory[index] = structuredClone(state.mock);
  }
  saveState();
  render();
  if (state.mock && !state.mock.finished) startMockTimer();
}
function formatTime(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function startMockTimer() {
  if (!state.mock || state.mock.finished) return;
  clearInterval(startMockTimer.interval);
  const tick = () => {
    if (!state.mock || state.mock.finished) {
      clearInterval(startMockTimer.interval);
      return;
    }
    const left = Math.max(0, state.mock.durationMs - (Date.now() - state.mock.startedAt));
    for (const id of ['mockTimer', 'globalMockTimer']) {
      const el = document.getElementById(id);
      if (el) el.textContent = formatTime(left);
    }
    if (left <= 0) finishMock();
  };
  tick();
  startMockTimer.interval = setInterval(tick, 1000);
}
function finishMock() {
  const m = state.mock;
  if (!m || m.finished) return;
  m.finished = true;
  m.finishedAt = Math.min(Date.now(), m.startedAt + m.durationMs);
  state.mockHistory.unshift(structuredClone(m));
  state.mockHistory = state.mockHistory.slice(0, 30);
  saveState();
  clearInterval(startMockTimer.interval);
  render();
}
function finishMockConfirm() {
  if (confirm(t('finishMockConfirm'))) finishMock();
}
function renderMockSummary(m, archived = false) {
  const penalty = mockPenalty(m);
  const elapsed = Math.min(m.durationMs, (m.finishedAt || Date.now()) - m.startedAt);
  const solved = m.labels.filter(label => mockSolved(m, label)).length;
  const canSync = state.atcoderUser && m.labels.some(label => !isPack(problemMap.get(label)));
  const headerButton = archived
    ? `<button class="btn" data-go="/mock">${icon('left')}${esc(t(state.mock && !state.mock.finished ? 'currentMock' : 'backToMock'))}</button>`
    : `<button class="btn" data-go="/mock?history">${icon('calendar')}${esc(t('mockHistory'))}</button>`;
  const facts = [
    `<div><dt>${esc(t('solvedCount', {done: solved, total: m.labels.length}))}</dt></div>`,
    `<div><dt>${esc(t('timeUsed'))}</dt><dd>${formatTime(elapsed)}</dd></div>`,
    ...(m.scoreMode === 'parts' ? [] : [`<div><dt>${esc(t('penaltyTime'))}</dt><dd>${formatTime(penalty.penaltyMs)}</dd></div>`, `<div><dt>${esc(t('penalties', {count: penalty.wrongs}))}</dt></div>`])
  ];
  return `<header class="page-header with-aside"><div><h1>${esc(t('mockResult'))}</h1><p>${archived ? `${esc(t('pastSession'))} · ` : ''}${esc(mockDate(m))} · ${esc(scoreModeLabel(m))}</p></div>${headerButton}</header>
  ${archived ? `<div class="inline-actions"><button class="text-button" data-go="/mock?history">${icon('left')}${esc(t('backToHistory'))}</button></div>` : ''}
  <section class="mock-score-card"><div class="mock-score-figure">${mockScore(m)}<small> / ${mockMax(m)}</small></div><dl class="mock-score-facts">${facts.join('')}</dl>${
    archived ? '' : `<div class="inline-actions">${canSync ? `<button class="btn" data-action="syncMock">${esc(t('syncVerdicts'))}</button>` : ''}<button class="btn primary" data-action="resetMock">${esc(t('newMock'))}</button></div>`
  }</section>
  <div class="mock-list">${m.labels.map((label, index) => mockProblemRow(m, label, index, archived)).join('')}</div>`;
}
function resetMock() {
  state.mock = null;
  saveState();
  render();
}

// ---------------------------------------------------------------------------------------------- review

function reviewExcerpt(p) {
  if (state.notes[p.label]) return state.notes[p.label];
  const html = statementFor(p.label, state.uiLang)?.html;
  if (!html) return titleOf(p);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const paragraph = [...doc.querySelectorAll('p')].map(el => el.textContent.replace(/\s+/g, ' ').trim()).find(text => text.length > 12 && !/^(配点|Score)/.test(text));
  return paragraph || titleOf(p);
}
function renderReview() {
  const items = reviewProblems().sort((a, b) => {
    const sa = statusOf(a);
    const sb = statusOf(b);
    return +sa.solved - +sb.solved || sb.errors - sa.errors || a.level - b.level || a.order - b.order;
  });
  const rows = items
    .map(p => {
      const status = statusOf(p);
      const excerpt = reviewExcerpt(p);
      const mark = status.solved ? 'check' : state.stars[p.label] ? 'bookmark' : 'flag';
      return `<button class="review-row" data-go="${problemPath(p.label)}"><span class="review-mark${status.solved ? ' solved' : ''}">${icon(mark)}</span><span class="review-copy"><span class="review-title"><strong>${esc(p.label)}</strong><span>${esc(titleOf(p))}</span></span><span class="review-excerpt">${esc(excerpt.slice(0, 140))}${excerpt.length > 140 ? '…' : ''}</span><span class="review-meta"><span>L${p.level}</span>${status.errors ? `<span>${esc(t('errorsCount', {count: status.errors}))}</span>` : ''}<span>${esc(t(status.solved ? 'solvedSince' : 'stillOpen'))}</span></span></span>${icon('right', 'row-chevron')}</button>`;
    })
    .join('');
  return `<header class="page-header with-aside"><div><h1>${esc(t('review'))}</h1><p>${esc(t('reviewIntro'))}</p></div><span class="header-count">${esc(t('practiceCount', {count: items.length}))}</span></header>${
    items.length
      ? `<div class="list grouped">${rows}</div>`
      : `<div class="empty-state page-empty">${icon('bookmark')}<h2>${esc(t('reviewEmptyTitle'))}</h2><p>${esc(t('reviewEmptyBody'))}</p><button class="btn" data-go="/problems">${esc(t('allProblems'))}</button></div>`
  }`;
}

// -------------------------------------------------------------------------------------------- settings

let accountHandleDraft = null;
function renderSettings() {
  let storageBytes = 0;
  try {
    storageBytes = new Blob([JSON.stringify(state)]).size + new Blob([localStorage.getItem(window.PlumeLibrary?.STORAGE_KEY || '') || '']).size;
  } catch {}
  const builtins = window.CI_PROBLEMS || [];
  const library = window.PlumeLibrary;
  const packs = (library?.packs() || []).map(pack => ({
    id: pack.id,
    title: library.pick(pack.title, state.uiLang).text,
    description: library.pick(pack.description, state.uiLang).text,
    author: pack.author,
    problems: pack.problems.length,
    sets: pack.sets.length,
    bundled: !!pack.bundled
  }));
  return window.PlumeSettings.render({
    section: route.params.get('section'),
    article: route.params.get('article'),
    productName: PRODUCT_NAME,
    uiLang: state.uiLang,
    state: accountHandleDraft === null ? state : {...state, atcoderUser: accountHandleDraft},
    counts: {
      library: problems.length,
      total: builtins.length,
      statements: LANGS.reduce((n, lang) => n + localStatementCount(lang), 0),
      samples: Object.values(window.CI_STATEMENTS || {}).reduce((n, p) => n + (p.ja?.samples?.length || 0), 0),
      metadata: builtins.filter(p => Object.keys(metaOf(p)).length > 0).length,
      lessons: window.PLUME_ACADEMY?.lessons?.length || 0
    },
    packs,
    environment: {storageBytes, lastSync: state.lastSync, lastBackupAt: state.lastBackupAt, isNative: isNativeApp()}
  });
}
function storeSettings(patch) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({...state, ...patch}));
    Object.assign(state, patch);
    return true;
  } catch (error) {
    toast(t('saveFailed'));
    console.warn(error);
    return false;
  }
}
function updateSetting(path, value, renderView = true) {
  const top = ['theme', 'uiLang', 'statementLang', 'dailyGoal', 'autoSync'];
  const prefs = ['homePage', 'editorFontSize', 'tabSize', 'lineWrapping', 'statementFontSize', 'reduceMotion'];
  const candidate = {...state, preferences: {...state.preferences}, profile: {...state.profile}};
  if (top.includes(path)) candidate[path] = value;
  else if (path === 'profile.displayName') candidate.profile.displayName = value;
  else if (path.startsWith('preferences.') && prefs.includes(path.slice(12))) candidate.preferences[path.slice(12)] = value;
  else return false;
  const normalized = window.PlumeSettings.normalize(candidate);
  const patch = {
    theme: normalized.theme,
    uiLang: normalized.uiLang,
    statementLang: normalized.statementLang,
    dailyGoal: normalized.dailyGoal,
    autoSync: normalized.autoSync,
    preferences: normalized.preferences,
    profile: normalized.profile
  };
  if (!storeSettings(patch)) return false;
  applyAppearance();
  if (renderView) render();
  return true;
}
// Languages are an identity choice, not a display preference: restoring keeps them.
function restorePreferences() {
  const defaults = window.PlumeSettings.defaults;
  if (!storeSettings({theme: defaults.theme, dailyGoal: defaults.dailyGoal, preferences: {...defaults.preferences}})) return;
  applyAppearance();
  render();
  toast(t('preferencesRestored'));
}
function saveUserAndSync() {
  const next = ((document.getElementById('setting-atcoderUser') || document.getElementById('atcoderUser'))?.value || '').trim();
  if (!/^[A-Za-z0-9_]{0,40}$/.test(next)) {
    toast(t('invalidHandle'));
    return;
  }
  const changed = next !== state.atcoderUser;
  const oldAccount = state.atcoderUser;
  const patch = {
    atcoderUser: next,
    autoSync: !!(document.getElementById('setting-autoSync') || document.getElementById('autoSync'))?.checked,
    dailyGoal: clamp(parseInt(document.getElementById('dailyGoalSetting')?.value || String(state.dailyGoal), 10), 1, 50)
  };
  if (changed) {
    const keepAccount = mock => {
      if (!mock) return mock;
      const copy = structuredClone(mock);
      if (oldAccount && !copy.atcoderUser) copy.atcoderUser = oldAccount;
      return copy;
    };
    Object.assign(patch, {
      attempts: state.attempts.filter(a => a.source !== 'atcoder'),
      syncCursor: 0,
      lastSync: 0,
      mock: keepAccount(state.mock),
      mockHistory: state.mockHistory.map(keepAccount)
    });
  }
  if (!storeSettings(patch)) return;
  if (changed) invalidateAtCoderSync();
  accountHandleDraft = null;
  render();
  if (state.atcoderUser) syncAtCoder(false, true);
}

// Backup, import and reset ---------------------------------------------------------------------------

function downloadFile(filename, content) {
  if (isNativeApp()) {
    window.webkit.messageHandlers.saveFile.postMessage({filename, content, mime: 'application/json'});
    return;
  }
  const url = URL.createObjectURL(new Blob([content], {type: 'application/json'}));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function exportData() {
  state.lastBackupAt = Date.now();
  saveState();
  const packs = window.PlumeLibrary?.exportInstalled() || [];
  const payload = {app: PRODUCT_NAME, schema: DATA_SCHEMA, exportedAt: new Date().toISOString(), state, ...(packs.length ? {packs} : {})};
  downloadFile(`plume-backup-${localDay()}.json`, JSON.stringify(payload, null, 2));
  if (route.path === '/settings') render();
}
async function importData(file) {
  if (!file) return;
  const library = window.PlumeLibrary;
  try {
    if (file.size > 25 * 1024 * 1024) throw new Error('Backup too large');
    const payload = JSON.parse(await file.text());
    if (payload?.schema > DATA_SCHEMA || (payload?.app && !['CI Practice', PRODUCT_NAME].includes(payload.app))) throw new Error('Unsupported backup');
    const incoming = payload.state || payload;
    if (!incoming || typeof incoming !== 'object' || !Array.isArray(incoming.attempts)) throw new Error('Not a practice backup');
    const packs = Array.isArray(payload.packs) && library ? payload.packs.map(raw => library.validate(raw)) : null;
    if (!confirm(t('importConfirm'))) return;
    const previousPacks = packs ? localStorage.getItem(library.STORAGE_KEY) : null;
    if (packs) {
      library.replaceAll(packs.map(library.serialize));
      loadLibrary();
    }
    const next = normalizeState(incoming);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      if (packs) {
        if (previousPacks) localStorage.setItem(library.STORAGE_KEY, previousPacks);
        else localStorage.removeItem(library.STORAGE_KEY);
        library.reload();
        loadLibrary();
      }
      throw error;
    }
    window.CIEditor?.clearSessions?.();
    invalidateAtCoderSync();
    cancelPythonRuns();
    accountHandleDraft = null;
    caseResults.clear();
    judgeReports.clear();
    state = next;
    clearInterval(startMockTimer.interval);
    applyAppearance();
    render();
    toast(t('backupImported'));
  } catch (error) {
    console.warn(error);
    toast(t('invalidBackup'));
  }
}
function resetAll() {
  if (!confirm(t('resetConfirm'))) return;
  // Remove the fallback first so a failed current-key deletion cannot revive old progress.
  try {
    localStorage.removeItem(LEGACY_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    toast(t('resetFailed'));
    return;
  }
  window.CIEditor?.clearSessions?.();
  invalidateAtCoderSync();
  accountHandleDraft = null;
  state = {...structuredClone(DEFAULT_STATE), uiLang: state.uiLang, statementLang: state.statementLang};
  caseResults.clear();
  judgeReports.clear();
  clearInterval(startMockTimer.interval);
  cancelPythonRuns();
  applyAppearance();
  render();
  toast(t('resetDone'));
}

// Problem packs ----------------------------------------------------------------------------------------

async function importPack(file) {
  if (!file) return;
  const library = window.PlumeLibrary;
  try {
    const pack = library.parse(await file.text());
    const {replaced} = library.install(pack, {builtinLabels: new Set((window.CI_PROBLEMS || []).map(p => p.label))});
    loadLibrary();
    toast(t(replaced ? 'packUpdated' : 'packImported', {title: library.pick(pack.title, state.uiLang).text, count: pack.problems.length}));
    render();
  } catch (error) {
    console.warn(error);
    const detail = error?.problems?.slice(0, 2).join(' · ') || '';
    toast(`${t('packInvalid')}${detail ? ' — ' + detail : ''}`);
  }
}
function removePack(id) {
  const library = window.PlumeLibrary;
  const pack = library.packs().find(item => item.id === id && !item.bundled);
  if (!pack) return;
  const title = library.pick(pack.title, state.uiLang).text;
  if (!confirm(t('packRemoveConfirm', {title}))) return;
  const labels = new Set(pack.problems.map(problem => problem.id));
  library.remove(id);
  for (const key of ['codes', 'notes', 'stars', 'testCases', 'solutionUnlocked']) for (const label of labels) delete state[key][label];
  state.attempts = state.attempts.filter(a => !labels.has(a.problemKey));
  state.recentProblems = state.recentProblems.filter(label => !labels.has(label));
  if (labels.has(state.lastProblem)) state.lastProblem = '';
  if (state.mock?.labels.some(label => labels.has(label))) state.mock = null;
  state.mockHistory = state.mockHistory.filter(m => !m.labels.some(label => labels.has(label)));
  loadLibrary();
  saveState();
  toast(t('packRemoved', {title}));
  render();
}
function exportPack(id) {
  const library = window.PlumeLibrary;
  const pack = library.packs().find(item => item.id === id);
  if (pack) downloadFile(`${pack.id}.plume-pack.json`, JSON.stringify(library.serialize(pack), null, 2));
}
function exportPackTemplate() {
  downloadFile('plume-pack-template.json', JSON.stringify(window.PlumeLibrary.template(), null, 2));
  toast(t('templateSaved'));
}

// ---------------------------------------------------------------------------------------- AtCoder sync

async function refreshMetadata(userInitiated = true) {
  try {
    const fetchJson = (url, name) =>
      apiFetch(url, {cache: 'no-cache'}).then(response => {
        if (!response.ok) throw new Error(`${name} ${response.status}`);
        return response.json();
      });
    const [merged, models] = await Promise.all([
      fetchJson('https://kenkoooo.com/atcoder/resources/merged-problems.json', 'metadata'),
      fetchJson('https://kenkoooo.com/atcoder/resources/problem-models.json', 'difficulty')
    ]);
    const byKey = new Map(merged.map(m => [`${m.contest_id}::${m.problem_index}`, m]));
    const byId = new Map(merged.map(m => [m.id, m]));
    const cache = {...state.metadataCache};
    for (const p of problems) {
      if (isPack(p)) continue;
      const m = byKey.get(`${p.contestId}::${p.index}`) || byId.get(p.problemId);
      if (!m) continue;
      const model = models[m.id] || {};
      cache[p.label] = {id: m.id, name: m.name || p.label, point: Number.isFinite(m.point) ? m.point : null, difficulty: Number.isFinite(model.difficulty) ? model.difficulty : null};
    }
    state.metadataCache = cache;
    state.metadataUpdated = Date.now();
    saveState();
    render();
    if (userInitiated) toast(t('metadataUpdated'));
  } catch (error) {
    console.warn(error);
    if (userInitiated) toast(t('metadataFailed'));
  }
}

let atcoderSyncGeneration = 0;
let atcoderSyncFlight = null;
let atcoderLastRequestAt = 0;
function invalidateAtCoderSync() {
  atcoderSyncGeneration++;
  atcoderSyncFlight?.controller?.abort();
  atcoderSyncFlight = null;
}
function matchSubmission(submission) {
  return problemById.get(submission.problem_id) || problems.find(p => !isPack(p) && p.problemId === submission.problem_id) || null;
}
async function syncAtCoder(full = false, userInitiated = true, forMock = false) {
  if (!state.atcoderUser) {
    go('/settings?section=account');
    return;
  }
  const owner = state;
  const account = state.atcoderUser;
  const generation = atcoderSyncGeneration;
  const current = () => state === owner && state.atcoderUser === account && atcoderSyncGeneration === generation;
  if (atcoderSyncFlight && atcoderSyncFlight.owner === owner && atcoderSyncFlight.account === account && atcoderSyncFlight.generation === generation) {
    const flight = atcoderSyncFlight;
    await flight.promise;
    if (full && !flight.full && current()) return syncAtCoder(true, userInitiated, forMock);
    return;
  }
  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  const flight = {owner, account, generation, full, controller, promise: null};
  atcoderSyncFlight = flight;
  flight.promise = (async () => {
    try {
      // Revisit a recent interval so a delayed index entry or a recent rejudge can be updated.
      let from = full ? 0 : Math.max(0, (owner.syncCursor || 0) - 3600);
      let newCount = 0;
      let maxEpoch = Math.max(0, from - 1);
      let pages = 0;
      while (pages < 100) {
        const url = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${encodeURIComponent(account)}&from_second=${from}`;
        const cooldown = 1100 - (Date.now() - atcoderLastRequestAt);
        if (cooldown > 0) {
          await sleep(cooldown);
          if (!current()) return;
        }
        atcoderLastRequestAt = Date.now();
        const response = await apiFetch(url, {cache: 'no-store', ...(controller ? {signal: controller.signal} : {})});
        if (!current()) return;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const items = await response.json();
        if (!current()) return;
        if (!Array.isArray(items)) throw new Error('Unexpected API response');
        if (!items.length) break;
        // Use current data, not a snapshot taken before the network request.
        const stored = new Map(owner.attempts.filter(a => a.source === 'atcoder').map(a => [String(a.id), a]));
        for (const submission of items) {
          const epoch = Number(submission.epoch_second);
          if (!Number.isFinite(epoch) || epoch < 0) continue;
          maxEpoch = Math.max(maxEpoch, epoch);
          if (!VALID_RESULTS.has(submission.result)) continue;
          const p = matchSubmission(submission);
          if (!p) continue;
          const record = {
            id: String(submission.id),
            problemKey: p.label,
            result: submission.result,
            time: epoch * 1000,
            source: 'atcoder',
            atcoderUser: account,
            language: submission.language || '',
            executionTime: submission.execution_time ?? null
          };
          const existing = stored.get(record.id);
          if (existing) Object.assign(existing, record);
          else {
            owner.attempts.push(record);
            stored.set(record.id, record);
            newCount++;
          }
        }
        pages++;
        if (items.length < 500) break;
        const next = maxEpoch + 1;
        if (next <= from) throw new Error('Submission cursor did not advance');
        from = next;
        await sleep(1100);
        if (!current()) return;
      }
      if (!current()) return;
      owner.syncCursor = Math.max(owner.syncCursor || 0, maxEpoch + 1);
      owner.lastSync = Date.now();
      saveState();
      hydrateMockFromAtCoder();
      if (userInitiated) toast(t('syncDone', {count: newCount}));
    } catch (error) {
      if (!current() || error.name === 'AbortError') return;
      console.warn(error);
      if (userInitiated) toast(t('syncFailed', {error: error.message || error}));
      render();
    } finally {
      if (atcoderSyncFlight === flight) atcoderSyncFlight = null;
    }
  })();
  return flight.promise;
}

// --------------------------------------------------------------------------------------- after render

function bindSplitter(el, host, {axis, property, key, min, max}) {
  if (!el || !host || el.dataset.bound === '1') return;
  el.dataset.bound = '1';
  const apply = event => {
    const rect = host.getBoundingClientRect();
    const ratio = axis === 'x' ? ((event.clientX - rect.left) / rect.width) * 100 : ((rect.bottom - event.clientY) / rect.height) * 100;
    state[key] = Math.round(clamp(ratio, min, max) * 10) / 10;
    host.style.setProperty(property, state[key] + '%');
  };
  el.addEventListener('pointerdown', event => {
    if (axis === 'x' && innerWidth <= 900) return;
    el.setPointerCapture?.(event.pointerId);
    document.body.classList.add(axis === 'x' ? 'resizing-x' : 'resizing-y');
    apply(event);
  });
  el.addEventListener('pointermove', event => {
    if (el.hasPointerCapture?.(event.pointerId)) apply(event);
  });
  const done = event => {
    if (el.hasPointerCapture?.(event.pointerId)) el.releasePointerCapture?.(event.pointerId);
    document.body.classList.remove('resizing-x', 'resizing-y');
    el.setAttribute('aria-valuenow', String(Math.round(state[key])));
    saveState();
  };
  el.addEventListener('pointerup', done);
  el.addEventListener('pointercancel', done);
  el.addEventListener('keydown', event => {
    const keys = axis === 'x' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowDown', 'ArrowUp'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    state[key] = clamp((+state[key] || (min + max) / 2) + (event.key === keys[1] ? 2 : -2), min, max);
    host.style.setProperty(property, state[key] + '%');
    el.setAttribute('aria-valuenow', String(Math.round(state[key])));
    saveState();
  });
}
function bindConsole(label) {
  document.querySelectorAll('#console [data-role]').forEach(el =>
    el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
      if (el.dataset.role === 'hasExpected') {
        const expected = document.querySelector('#console textarea[data-role="expected"]');
        if (expected) expected.disabled = !el.checked;
      }
      persistCaseEditors(label);
    })
  );
}
function bindCodeEditor(label) {
  const code = document.getElementById('codeEditor');
  if (!code) return;
  if (window.CIEditor) {
    try {
      codeEditorInstance = window.CIEditor.mount(code, {
        onChange: value => {
          state.codes[label] = value;
          saveState();
        },
        onRun: () => runAllCases(label),
        onJudge: () => judgeProblem(label),
        problemKey: label,
        ...editorOptions()
      });
    } catch (error) {
      code.hidden = false;
      console.warn('Editor initialization:', error);
    }
  }
  if (!codeEditorInstance) {
    code.addEventListener('input', () => {
      state.codes[label] = code.value;
      saveState();
    });
    code.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      event.preventDefault();
      code.setRangeText(' '.repeat(state.preferences.tabSize), code.selectionStart, code.selectionEnd, 'end');
      state.codes[label] = code.value;
      saveState();
    });
  }
  bindConsole(label);
  bindSplitter(document.getElementById('consoleSplitter'), document.querySelector('.code-area'), {axis: 'y', property: '--console', key: 'consoleRatio', min: 20, max: 75});
}
function bindMockSetup() {
  const pool = document.getElementById('mockPool');
  pool?.addEventListener('change', () => {
    const isSet = pool.value.startsWith('set:');
    document.getElementById('mockScoringRow').hidden = isSet;
    document.getElementById('mockRules').textContent = t(isSet ? 'mockRulesSet' : 'mockRules');
    const set = problemSets().find(item => `set:${item.key}` === pool.value);
    const duration = document.getElementById('mockDuration');
    if (duration) duration.value = String(set && MOCK_DURATIONS.includes(set.minutes) ? set.minutes : 150);
  });
}
function bindAfterRender() {
  if (route.path === '/problems') {
    document.getElementById('problemSearch')?.addEventListener('input', () => {
      clearTimeout(setProblemQuery.timer);
      setProblemQuery.timer = setTimeout(setProblemQuery, 160);
    });
    ['levelFilter', 'sourceFilter', 'sortFilter'].forEach(id => document.getElementById(id)?.addEventListener('change', setProblemQuery));
  }
  if (route.path.startsWith('/problem/')) {
    const label = routeLabel();
    bindCodeEditor(label);
    const note = document.getElementById('problemNote');
    note?.addEventListener('input', () => {
      state.notes[label] = note.value;
      saveState();
    });
    bindSplitter(document.getElementById('problemSplitter'), document.querySelector('.problem-shell'), {axis: 'x', property: '--split', key: 'splitRatio', min: 34, max: 66});
    typesetStatement();
  }
  if (route.path === '/mock' && !state.mock) bindMockSetup();
  if (state.mock && !state.mock.finished) startMockTimer();
  if (route.path === '/settings') bindSettings();
  if (route.path === '/learn' || route.path.startsWith('/learn/')) {
    const owner = state;
    window.PlumeAcademy.bind({
      id: decodeRouteLabel(route.path.slice(7)),
      uiLang: state.uiLang,
      progress: state.academy,
      editorOptions: editorOptions(),
      navigate: go,
      rerender: render,
      toast,
      executePython,
      createSession: createPythonSession,
      save: () => state === owner && saveState(),
      acquireRun: () => {
        if (runnerBusy) return false;
        runnerBusy = true;
        return true;
      },
      releaseRun: () => {
        runnerBusy = false;
      },
      stopRun: stopPythonRuns
    });
  }
}
function bindSettings() {
  document.getElementById('setting-atcoderUser')?.addEventListener('input', event => {
    accountHandleDraft = event.target.value;
  });
  document.querySelectorAll('[data-setting]').forEach(el =>
    el.addEventListener('input', () => {
      if (el.type === 'number') {
        const value = Number(el.value);
        if (el.value !== '' && Number.isInteger(value) && value >= Number(el.min) && value <= Number(el.max)) updateSetting(el.dataset.setting, value, false);
      } else if (el.dataset.setting === 'profile.displayName') updateSetting(el.dataset.setting, el.value, false);
    })
  );
  document.querySelectorAll('[data-settings-section]').forEach(el => el.addEventListener('click', () => go('/settings?section=' + el.dataset.settingsSection)));
  document.querySelectorAll('[data-help-article]').forEach(el => el.addEventListener('click', () => go('/settings?section=guide&article=' + el.dataset.helpArticle)));
  document.querySelectorAll('[data-settings-route]').forEach(el => el.addEventListener('click', () => go(el.dataset.settingsRoute)));
  document.querySelectorAll('[data-setting]').forEach(el =>
    el.addEventListener('change', () => {
      const path = el.dataset.setting;
      if (path === 'atcoderUser') return;
      const preserveField = el.type === 'number' || path === 'profile.displayName';
      const focused = el.id;
      const saved = updateSetting(path, el.type === 'checkbox' ? el.checked : el.type === 'number' ? Number(el.value) : el.value, !preserveField);
      if (preserveField && saved) el.value = path === 'profile.displayName' ? state.profile.displayName : path.startsWith('preferences.') ? state.preferences[path.slice(12)] : state[path];
      else if (!preserveField) document.getElementById(focused)?.focus();
    })
  );
  const actions = {
    sync: saveUserAndSync,
    export: exportData,
    import: () => document.getElementById('settingsImportFile').click(),
    reset: resetAll,
    'refresh-metadata': () => refreshMetadata(true),
    'restore-preferences': restorePreferences,
    signature: openSignature,
    'import-pack': () => document.getElementById('packImportFile').click(),
    'pack-template': exportPackTemplate,
    'export-pack': el => exportPack(el.dataset.pack),
    'remove-pack': el => removePack(el.dataset.pack)
  };
  document.querySelectorAll('[data-settings-action]').forEach(el => el.addEventListener('click', () => actions[el.dataset.settingsAction]?.(el)));
  document.getElementById('settingsImportFile')?.addEventListener('change', event => {
    importData(event.target.files[0]);
    event.target.value = '';
  });
  document.getElementById('packImportFile')?.addEventListener('change', event => {
    importPack(event.target.files[0]);
    event.target.value = '';
  });
  const persistence = document.getElementById('storagePersistence');
  if (persistence && globalThis.navigator?.storage?.persisted && !isNativeApp())
    navigator.storage.persisted().then(value => {
      persistence.textContent = window.PlumeSettings.persistenceLabel(state.uiLang, value);
    });
}

// ------------------------------------------------------------------------------------ command palette

const commandState = {open: false, query: '', results: [], selected: 0, returnFocus: null};
function commandSearch(query = '') {
  const text = query.toLowerCase().trim();
  if (!text) {
    const recent = (state.recentProblems || []).map(label => problemMap.get(label)).filter(Boolean);
    const seen = new Set(recent.map(p => p.label));
    return [...recent, ...studyRecommendations().filter(p => !seen.has(p.label))].slice(0, 9);
  }
  const compact = text.replace(/\s+/g, '');
  const scored = [];
  for (const p of problems) {
    const label = p.label.toLowerCase().replace(/\s+/g, '');
    const head = `${label}${titleOf(p).toLowerCase().replace(/\s+/g, '')}`;
    let score = -1;
    if (label.startsWith(compact)) score = 0;
    else if (head.includes(compact)) score = 1;
    else if (text.length >= 2 && plainStatement(p.label, state.statementLang).includes(text)) score = 2;
    if (score >= 0) scored.push([score, p]);
  }
  return scored
    .sort((a, b) => a[0] - b[0] || a[1].level - b[1].level || a[1].order - b[1].order)
    .slice(0, 12)
    .map(([, p]) => p);
}
function openCommandPalette() {
  const dialog = document.getElementById('commandPalette');
  if (!dialog) return;
  dialog.setAttribute('aria-label', t('search'));
  commandState.returnFocus = document.activeElement;
  commandState.open = true;
  commandState.query = '';
  commandState.selected = 0;
  dialog.innerHTML = `<div class="command-search">${icon('search')}<input id="commandInput" type="search" autocomplete="off" spellcheck="false" placeholder="${esc(t('searchHint'))}" aria-label="${esc(t('search'))}" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="commandResults"></div><p class="command-caption" id="commandCaption">${esc(t('searchRecent'))}</p><div id="commandResults" class="command-results" role="listbox" aria-label="${esc(t('problems'))}"></div><div class="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd>${esc(t('searchNavigate'))}</span><span><kbd>↵</kbd>${esc(t('searchOpen'))}</span><span><kbd>esc</kbd>${esc(t('searchClose'))}</span></div>`;
  if (!dialog.open) dialog.showModal();
  renderCommandResults();
  const input = document.getElementById('commandInput');
  input.addEventListener('input', () => {
    commandState.query = input.value;
    commandState.selected = 0;
    renderCommandResults();
  });
  input.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      const n = commandState.results.length;
      commandState.selected = n ? (commandState.selected + (event.key === 'ArrowDown' ? 1 : -1) + n) % n : 0;
      renderCommandResults();
      document.getElementById(`command-result-${commandState.selected}`)?.scrollIntoView({block: 'nearest'});
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const chosen = commandState.results[commandState.selected];
      if (chosen) chooseCommand(chosen.label);
    }
  });
  if (!dialog.dataset.bound) {
    dialog.dataset.bound = '1';
    dialog.addEventListener('cancel', () => {
      commandState.open = false;
    });
    dialog.addEventListener('close', () => {
      commandState.open = false;
      if (commandState.returnFocus?.isConnected) commandState.returnFocus.focus();
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeCommandPalette();
    });
  }
  input.focus();
}
function renderCommandResults() {
  commandState.results = commandSearch(commandState.query);
  const container = document.getElementById('commandResults');
  const caption = document.getElementById('commandCaption');
  if (caption) caption.hidden = !!commandState.query.trim();
  if (!container) return;
  container.innerHTML = commandState.results.length
    ? commandState.results
        .map(
          (p, index) =>
            `<button id="command-result-${index}" class="command-result${index === commandState.selected ? ' active' : ''}" role="option" aria-selected="${index === commandState.selected}" tabindex="-1" data-command="${esc(p.label)}"><span class="command-id">${esc(p.label)}</span><span class="command-title">${esc(titleOf(p))}</span><span class="level-tag">L${p.level}</span></button>`
        )
        .join('')
    : `<div class="command-empty">${esc(t('noSearchResults'))}</div>`;
  const input = document.getElementById('commandInput');
  if (commandState.results.length) input?.setAttribute('aria-activedescendant', `command-result-${commandState.selected}`);
  else input?.removeAttribute('aria-activedescendant');
}
function closeCommandPalette() {
  const dialog = document.getElementById('commandPalette');
  commandState.open = false;
  if (dialog?.open) dialog.close();
}
function chooseCommand(label) {
  if (!problemMap.has(label)) return;
  closeCommandPalette();
  go('/problem/' + encodeURIComponent(label));
}
function openSignature() {
  const dialog = document.getElementById('signatureDialog');
  if (!dialog) return;
  const stars = [
    [38, 123, 2],
    [105, 72, 3],
    [163, 93, 4.5],
    [194, 120, 2.5],
    [288, 55, 2],
    [137, 35, 2],
    [153, 174, 2],
    [265, 153, 2]
  ];
  dialog.innerHTML = `<button class="icon-button signature-close" aria-label="${esc(t('searchClose'))}" data-action="closeSignature">${icon('close')}</button><svg class="signature-sky" viewBox="0 0 340 210" aria-hidden="true"><path d="M38 123L105 72L163 93L194 120L288 55M105 72L137 35M163 93L153 174L265 153"/><g>${stars.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><text x="174" y="83">Altair</text></svg><div class="signature-copy"><h2>Aquila</h2><p>${PRODUCT_NAME} · ${esc(t('signatureLine'))}</p><small>2026</small></div>`;
  dialog.setAttribute('aria-label', 'Aquila');
  dialog.showModal();
  if (!dialog.dataset.bound) {
    dialog.dataset.bound = '1';
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
  }
}

// ------------------------------------------------------------------------------------- delegated input

const ACTIONS = {
  search: () => (commandState.open ? closeCommandPalette() : openCommandPalette()),
  toggleSidebar,
  navBack,
  navForward,
  randomUnsolved,
  setLibraryStatus: arg => setLibraryStatus(arg),
  setStatementLang: arg => setStatementLang(arg),
  setWorkTab: arg => setWorkTab(arg),
  toggleStar: arg => toggleStar(arg),
  selectCase: (arg, el) => selectCase(arg, el.dataset.case),
  addTestCase: arg => addTestCase(arg),
  removeTestCase: (arg, el) => removeTestCase(arg, el.dataset.case),
  runCase: (arg, el) => runCase(arg, el.dataset.case),
  runAllCases: arg => runAllCases(arg),
  judgeProblem: arg => judgeProblem(arg),
  clearCode: arg => clearCode(arg),
  recordManual: (arg, el) => recordManual(arg, el.dataset.result),
  unlockSolution: arg => unlockSolution(arg),
  copyText: arg => copyText(arg),
  startMock,
  mockAttempt: (arg, el) => mockAttempt(arg, el.dataset.result),
  syncMock: () => syncAtCoder(false, true, true),
  finishMockConfirm,
  resetMock,
  closeSignature: () => document.getElementById('signatureDialog')?.close()
};
function handleClick(event) {
  const target = event.target.closest?.('[data-go],[data-action],[data-command]');
  if (!target || target.disabled) return;
  if (target.dataset.command) {
    chooseCommand(target.dataset.command);
    return;
  }
  if (target.dataset.go) {
    event.preventDefault();
    go(target.dataset.go);
    return;
  }
  const action = ACTIONS[target.dataset.action];
  if (!action) return;
  event.preventDefault();
  action(target.dataset.arg, target, event);
}
function handleSubmit(event) {
  const form = event.target.closest?.('[data-form]');
  if (!form) return;
  event.preventDefault();
  if (form.dataset.form === 'saveDailyGoal') saveDailyGoal();
}
function handleKeydown(event) {
  const mod = event.metaKey || event.ctrlKey;
  if (mod && event.key === ',') {
    event.preventDefault();
    go('/settings');
    return;
  }
  if (mod && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    ACTIONS.search();
    return;
  }
  // The editor handles its own shortcut; elsewhere on a problem page the same keys apply.
  if (mod && event.key === 'Enter' && route.path.startsWith('/problem/') && !event.target.closest?.('.cm-editor')) {
    event.preventDefault();
    const label = routeLabel();
    if (event.shiftKey) judgeProblem(label);
    else runAllCases(label);
    return;
  }
  const focused = document.activeElement;
  const tag = (focused?.tagName || '').toLowerCase();
  if (event.key === 'Enter' && tag === 'tr' && focused.dataset.go) {
    event.preventDefault();
    go(focused.dataset.go);
    return;
  }
  if (['input', 'textarea', 'select'].includes(tag) || focused?.isContentEditable) return;
  if (event.altKey && event.key === 'ArrowLeft') {
    event.preventDefault();
    navBack();
  }
  if (event.altKey && event.key === 'ArrowRight') {
    event.preventDefault();
    navForward();
  }
}

// Another window of the same browser saved records: adopt them once this one is idle.
let pendingExternalState = null;
function adoptExternalState() {
  if (!pendingExternalState) return;
  try {
    const next = normalizeState(JSON.parse(pendingExternalState));
    pendingExternalState = null;
    state = next;
    applyAppearance();
    render();
    toast(t('otherTabChanged'));
  } catch (error) {
    console.warn(error);
    pendingExternalState = null;
  }
}
function isEditing() {
  const focused = document.activeElement;
  const tag = (focused?.tagName || '').toLowerCase();
  return ['input', 'textarea'].includes(tag) || !!focused?.closest?.('.cm-editor') || runnerBusy;
}
function handleStorageEvent(event) {
  if (event.storageArea && event.storageArea !== localStorage) return;
  if (window.PlumeLibrary && event.key === window.PlumeLibrary.STORAGE_KEY) {
    window.PlumeLibrary.reload();
    loadLibrary();
    if (!isEditing()) render();
    return;
  }
  if (event.key !== STORAGE_KEY || !event.newValue) return;
  pendingExternalState = event.newValue;
  if (!isEditing()) adoptExternalState();
}

// ------------------------------------------------------------------------------------------------- init

function init() {
  loadLibrary();
  initNavigation();
  route = parseRoute();
  applyAppearance();
  document.addEventListener('click', handleClick);
  document.addEventListener('submit', handleSubmit);
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('storage', handleStorageEvent);
  document.addEventListener('focusout', () => setTimeout(() => !isEditing() && adoptExternalState(), 0));
  window.addEventListener('hashchange', () => {
    const next = parseRoute();
    if (next.path !== route.path || String(next.params) !== String(route.params)) {
      route = next;
      render();
      window.scrollTo?.(0, 0);
    }
  });
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
    if (state.theme !== 'system') return;
    applyAppearance();
    render();
  });
  render();
  // Metadata refresh is explicit; opening a problem never requires a network request.
  if (state.autoSync && state.atcoderUser) setTimeout(() => syncAtCoder(false, false), 900);
}

init();
