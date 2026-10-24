const DATA_SCHEMA=4;
const PRODUCT_NAME='Plume';
const PRODUCT_VERSION='1.1.0';
const STORAGE_KEY='ciPracticeHubState.v2';
const LEGACY_KEY='ciPracticeHubState.v1';
const META_TTL=24*60*60*1000;
const VALID_RESULTS=new Set(['AC','WA','TLE','CE','RE','MLE','OLE','QLE','IE','NG']);
const PENALTY_RESULTS=new Set(['WA','TLE','RE','MLE','OLE','QLE','NG']);
const LEVEL_NAMES={
  zh:['入门','基础','基础实现','CI 核心','进阶实现','综合算法'],
  ja:['入門','基礎','基礎実装','CI コア','発展実装','総合アルゴリズム'],
  en:['Prerequisite','Fundamentals','Basic Implementation','CI Core','Advanced Implementation','Advanced algorithms']
};
const I18N={
  zh:{
    dashboard:'概览',problems:'题库',study:'学习计划',mock:'150 分钟模拟',review:'错题与复习',settings:'设置',localMode:'本地模式',tasks:'题',
    overview:'练习概览',overviewSub:'221 道题，按 0–5 级组织。进度、提交与复习记录保存在本机。',sync:'同步 AtCoder',connect:'连接 AtCoder',
    solved:'已完成',verified:'AtCoder 已验证',officialPoints:'AtCoder 已验证分值',attempted:'已尝试',errors:'错误提交',firstTry:'首投 AC',coverage:'题目数据',complete:'完成',withErrors:'有错误记录',
    last42:'最近 42 天',recent:'最近活动',noActivity:'暂无提交记录',problemList:'题库',problemListSub:'按等级、状态与难度筛选。',
    search:'搜索题号 / 标题 / 题意',allLevels:'全部等级',allStatus:'全部状态',unsolved:'未完成',solvedStatus:'已完成',withErrorsStatus:'有错误',starred:'已收藏',sortLevel:'排序：等级',sortDiff:'排序：Difficulty',sortPoints:'排序：分值',sortStatus:'排序：状态',status:'状态',problem:'题目',title:'标题',level:'等级',difficulty:'Difficulty',points:'分值',errorCount:'错误',none:'—',
    verifiedAC:'已验证 AC',manualAC:'手动 AC',attemptedStatus:'尝试过',reviewBtn:'复习',unstar:'取消收藏',official:'官方题面',submit:'去 AtCoder 提交',statement:'题面',code:'代码',tests:'测试',notes:'笔记',history:'记录',
    chinese:'中文',english:'English',japanese:'日本語',statementSummary:'训练用题意摘要',sourceNote:'中文题意用于快速阅读；正式约束、输入输出和样例以 AtCoder 原题为准。',jpExact:'日文官方题面',jpExactBody:'为避免翻译误差，日本语模式直接以 AtCoder 官方日文题面作为权威来源。',openOfficialJP:'打开官方日文题面',
    python:'Python 3（浏览器）',runtimeIdle:'未加载',runtimeLoading:'正在加载 Python…',runtimeReady:'Python 已就绪',runtimeError:'Python 运行环境不可用',reset:'重置',run:'运行',runAll:'运行全部',addCase:'新增测试',case:'测试',input:'输入',expected:'期望输出（可选）',actual:'实际输出',remove:'删除',timeout:'超时',noExpected:'未设置期望输出',
    recordWA:'记录 WA',recordAC:'记录 AC',manualTrack:'手动记录',manualTrackHelp:'手动记录只是给自己留个标记；从 AtCoder 同步到的 AC 会单独标为“已验证”。',
    studyPlan:'学习计划',studyPlanSub:'根据当前进度、错误记录与收藏生成下一组练习。',today:'今日',dailyGoal:'每日目标',streak:'连续练习',days:'天',nextProblems:'下一组建议',levelProgress:'等级进度',saveGoal:'保存',
    mockTitle:'150 分钟模拟',mockSub:'三题，150 分钟。默认每题 100 分；罚时按 AtCoder 的比赛规则计算。',
    mockPool:'题目范围',mockCore:'CI 核心（L2–L4）',mockFoundation:'基础（L1–L3）',mockHard:'较难（L3–L5）',mockMixed:'混合（L1–L5）',mockScoreMode:'计分方式',ci300:'CI 训练 300 分制',officialScore:'原题官方分值',officialUnavailable:'这组三题的官方分值还没有全部取到。刷新题目数据，或继续使用 300 分训练制。',startMock:'开始模拟',endMock:'结束模拟',syncVerdicts:'同步 AtCoder 判定',score:'得分',penaltyTime:'罚时后用时',elapsed:'实际经过',wrongPenalty:'计罚错误',mockResult:'模拟结果',newMock:'新模拟',open:'打开',
    reviewTitle:'错题与复习',reviewSub:'做错过的、想再看的，都留在这里。',nothingReview:'目前没有需要复习的题。',solvedLater:'已补 AC',stillUnsolved:'尚未 AC',attempts:'提交',
    settingsTitle:'设置',settingsSub:'本地保存练习数据。可随时导出或恢复备份。',atcoderSync:'AtCoder 同步',atcoderSyncBody:'填用户名就行，不要密码。这里只读取公开提交记录。',handle:'AtCoder 用户名',autoSync:'启动时自动同步',lastSync:'上次同步',never:'从未',saveSync:'保存并同步',appearance:'外观与语言',theme:'主题',light:'浅色',dark:'深色',uiLanguage:'界面语言',statementLanguage:'默认题面语言',data:'数据',export:'导出 JSON',import:'导入 JSON',resetAll:'清空本地数据',dailyGoalSetting:'每日目标题数',
    metadata:'AtCoder 数据',refreshMetadata:'刷新题目数据',metadataBody:'分值与 Difficulty 来自 AtCoder Problems。断网时也不影响本地做题。',
    syncDone:'同步完成',syncFailed:'同步失败',newMatching:'条新匹配提交',metadataUpdated:'题目数据已更新',metadataFailed:'题目数据暂时没刷新成功，继续使用已有数据',backupImported:'备份已导入',invalidBackup:'备份文件无效',resetConfirm:'确定清空全部本地进度、代码、笔记与模拟记录吗？',resetDone:'本地数据已清空',
    runnerFirst:'第一次运行 Python 需要联网加载，之后通常会快很多。',compileError:'运行错误',passed:'通过',wrongAnswer:'答案不一致',finished:'已结束',inProgress:'进行中',officialRef:'官方参考',
    noProblems:'没有符合筛选条件的题。',notFound:'未找到题目。',goalSaved:'每日目标已保存',manualRecorded:'已记录',starAdded:'已加入复习',starRemoved:'已取消复习',
    sourceAtCoder:'AtCoder',sourceManual:'手动',sourceMock:'Mock',date:'时间',result:'结果',source:'来源',language:'语言',runtime:'运行时间',noHistory:'暂无正式提交记录。',
    verifiedHint:'来自 AtCoder 的 AC。',pointsHint:'跨比赛求和仅作为练习量参考，不等于 AtCoder Rating。',accuracyHint:'已 AC 题 / 已尝试题。',firstTryHint:'AtCoder 上第一次提交就 AC 的比例。'
  },
  ja:{
    dashboard:'概要',problems:'問題一覧',study:'学習計画',mock:'150分模擬',review:'復習',settings:'設定',localMode:'ローカル',tasks:'問',
    overview:'練習概要',overviewSub:'221問をLevel 0–5に整理。まずは正確に。速さはあとからついてきます。',sync:'AtCoder 同期',connect:'AtCoder 接続',
    solved:'完了',verified:'AtCoder 確認済み',officialPoints:'AtCoder 確認済み配点',attempted:'挑戦済み',errors:'誤提出',firstTry:'初回 AC',coverage:'問題データ',complete:'完了',withErrors:'誤りあり',
    last42:'直近42日',recent:'最近の活動',noActivity:'提出記録はありません',problemList:'問題一覧',problemListSub:'レベル・状態・Difficultyで絞り込み。気になる一問から始めましょう。',
    search:'問題番号 / タイトルを検索',allLevels:'全レベル',allStatus:'全状態',unsolved:'未完了',solvedStatus:'完了',withErrorsStatus:'誤りあり',starred:'復習指定',sortLevel:'並び順：レベル',sortDiff:'並び順：Difficulty',sortPoints:'並び順：配点',sortStatus:'並び順：状態',status:'状態',problem:'問題',title:'タイトル',level:'レベル',difficulty:'Difficulty',points:'配点',errorCount:'誤り',none:'—',
    verifiedAC:'確認済み AC',manualAC:'手動 AC',attemptedStatus:'挑戦済み',reviewBtn:'復習',unstar:'解除',official:'公式問題文',submit:'AtCoder へ提出',statement:'問題文',code:'コード',tests:'テスト',notes:'メモ',history:'履歴',
    chinese:'中文',english:'English',japanese:'日本語',statementSummary:'練習用要約',sourceNote:'中国語は練習用の要約です。制約・入出力・サンプルは AtCoder 公式を確認してください。',jpExact:'公式日本語問題文',jpExactBody:'誤訳を避けるため、日本語では AtCoder の公式日本語問題文を権威ある参照先とします。',openOfficialJP:'公式日本語問題文を開く',
    python:'Python 3（ブラウザ）',runtimeIdle:'未読込',runtimeLoading:'Python を読み込み中…',runtimeReady:'Python 準備完了',runtimeError:'Python 実行環境を利用できません',reset:'リセット',run:'実行',runAll:'全て実行',addCase:'テスト追加',case:'ケース',input:'入力',expected:'期待出力（任意）',actual:'実出力',remove:'削除',timeout:'タイムアウト',noExpected:'期待出力なし',
    recordWA:'WA を記録',recordAC:'AC を記録',manualTrack:'手動記録',manualTrackHelp:'手動記録はローカル進捗用です。AtCoder 同期で得た AC は「確認済み」と表示されます。',
    studyPlan:'学習計画',studyPlanSub:'今の続きから。間違えた問題は、ちゃんとまた顔を出します。',today:'今日',dailyGoal:'1日の目標',streak:'連続日数',days:'日',nextProblems:'次の推奨問題',levelProgress:'レベル進捗',saveGoal:'保存',
    mockTitle:'150分模擬',mockSub:'3 問・150 分。標準は各 100 点、ペナルティは AtCoder のルールで計算します。',
    mockPool:'出題範囲',mockCore:'CI コア（L2–L4）',mockFoundation:'基礎（L1–L3）',mockHard:'難しめ（L3–L5）',mockMixed:'混合（L1–L5）',mockScoreMode:'採点方式',ci300:'CI 練習 300点',officialScore:'元問題の公式配点',officialUnavailable:'選ばれた問題の公式配点をすべて取得できていません。AtCoder メタデータを更新するか、CI 練習 300点を使用してください。',startMock:'模擬開始',endMock:'終了',syncVerdicts:'AtCoder 判定を同期',score:'得点',penaltyTime:'ペナルティ込み',elapsed:'経過時間',wrongPenalty:'計上誤答',mockResult:'模擬結果',newMock:'新しい模擬',open:'開く',
    reviewTitle:'復習',reviewSub:'間違えた問題と、もう一度見たい問題をここに集めます。',nothingReview:'復習対象はありません。',solvedLater:'後で AC',stillUnsolved:'未 AC',attempts:'提出',
    settingsTitle:'設定',settingsSub:'進捗はこの端末だけに保存されます。たまにバックアップしておくと、ブラウザと一緒に記憶喪失せずに済みます。',atcoderSync:'AtCoder 同期',atcoderSyncBody:'ユーザー名だけで大丈夫です。公開されている提出履歴だけを読み込みます。',handle:'AtCoder ユーザー名',autoSync:'起動時に自動同期',lastSync:'最終同期',never:'未同期',saveSync:'保存して同期',appearance:'表示と言語',theme:'テーマ',light:'ライト',dark:'ダーク',uiLanguage:'UI 言語',statementLanguage:'既定の問題文言語',data:'データ',export:'JSON 書き出し',import:'JSON 読み込み',resetAll:'ローカルデータ削除',dailyGoalSetting:'1日の目標問題数',
    metadata:'AtCoder データ',refreshMetadata:'問題データを更新',metadataBody:'配点と Difficulty は AtCoder Problems から取得します。オフラインでもローカル練習は続けられます。',
    syncDone:'同期完了',syncFailed:'同期失敗',newMatching:'件の新規該当提出',metadataUpdated:'問題データを更新しました',metadataFailed:'今回は更新できませんでした。手元のデータをそのまま使います',backupImported:'バックアップを読み込みました',invalidBackup:'無効なバックアップです',resetConfirm:'進捗・コード・メモ・模擬記録を全て削除しますか？',resetDone:'ローカルデータを削除しました',
    runnerFirst:'Python の初回起動だけネット接続が必要です。次からはだいたい速くなります。',compileError:'実行エラー',passed:'一致',wrongAnswer:'不一致',finished:'終了',inProgress:'進行中',officialRef:'公式参照',
    noProblems:'条件に一致する問題がありません。',notFound:'問題が見つかりません。',goalSaved:'目標を保存しました',manualRecorded:'記録しました',starAdded:'復習対象に追加しました',starRemoved:'復習対象から外しました',
    sourceAtCoder:'AtCoder',sourceManual:'手動',sourceMock:'Mock',date:'時刻',result:'結果',source:'出典',language:'言語',runtime:'実行時間',noHistory:'正式な提出履歴はありません。',
    verifiedHint:'AtCoder で確認できた AC。',pointsHint:'大会を跨いだ合計は練習量の参考であり Rating ではありません。',accuracyHint:'AC 済み問題 / 挑戦済み問題。',firstTryHint:'AtCoder で最初の提出が AC だった割合。'
  },
  en:{
    dashboard:'Overview',problems:'Problems',study:'Study Plan',mock:'150-min Mock',review:'Review',settings:'Settings',localMode:'Local',tasks:'tasks',
    overview:'Practice overview',overviewSub:'221 problems from Level 0 to 5. Get them right first; speed can come later.',sync:'Sync AtCoder',connect:'Connect AtCoder',
    solved:'Solved',verified:'Verified on AtCoder',officialPoints:'Verified point sum',attempted:'Attempted',errors:'Error submissions',firstTry:'First-submission AC',coverage:'Problem data',complete:'complete',withErrors:'with errors',
    last42:'Last 42 days',recent:'Recent activity',noActivity:'No submission activity yet',problemList:'Problems',problemListSub:'Filter by level, status, or Difficulty. Pick one and start typing.',
    search:'Search ID / title / statement',allLevels:'All levels',allStatus:'All status',unsolved:'Unsolved',solvedStatus:'Solved',withErrorsStatus:'With errors',starred:'Starred',sortLevel:'Sort: level',sortDiff:'Sort: Difficulty',sortPoints:'Sort: points',sortStatus:'Sort: status',status:'Status',problem:'Problem',title:'Title',level:'Level',difficulty:'Difficulty',points:'Points',errorCount:'Errors',none:'—',
    verifiedAC:'Verified AC',manualAC:'Manual AC',attemptedStatus:'Attempted',reviewBtn:'Review',unstar:'Unstar',official:'Official statement',submit:'Submit on AtCoder',statement:'Statement',code:'Code',tests:'Tests',notes:'Notes',history:'History',
    chinese:'中文',english:'English',japanese:'日本語',statementSummary:'Practice statement',sourceNote:'Chinese is a practice summary. Use the AtCoder original for exact constraints, I/O, and samples.',jpExact:'Official Japanese statement',jpExactBody:'To avoid mistranslation, Japanese mode uses the official AtCoder Japanese statement as the authoritative reference.',openOfficialJP:'Open official Japanese statement',
    python:'Python 3 (browser)',runtimeIdle:'Not loaded',runtimeLoading:'Loading Python…',runtimeReady:'Python ready',runtimeError:'Python runtime unavailable',reset:'Reset',run:'Run',runAll:'Run all',addCase:'Add test',case:'Case',input:'Input',expected:'Expected output (optional)',actual:'Actual output',remove:'Remove',timeout:'Timeout',noExpected:'No expected output',
    recordWA:'Record WA',recordAC:'Record AC',manualTrack:'Manual tracking',manualTrackHelp:'Manual marks are just for you. ACs synced from AtCoder are shown separately as verified.',
    studyPlan:'Study plan',studyPlanSub:'Continue from where you are. Missed and starred problems come back a little sooner.',today:'Today',dailyGoal:'Daily goal',streak:'Study streak',days:'days',nextProblems:'Next recommended',levelProgress:'Level progress',saveGoal:'Save',
    mockTitle:'150-minute mock',mockSub:'Three problems, 150 minutes. Default score is 100 each; penalties follow AtCoder contest rules.',
    mockPool:'Problem pool',mockCore:'CI Core (L2–L4)',mockFoundation:'Foundation (L1–L3)',mockHard:'Hard (L3–L5)',mockMixed:'Mixed (L1–L5)',mockScoreMode:'Scoring',ci300:'CI training / 300',officialScore:'Original official points',officialUnavailable:'Official points are still missing for one or more of these problems. Refresh problem data, or keep the 300-point training score.',startMock:'Start mock',endMock:'Finish',syncVerdicts:'Sync AtCoder verdicts',score:'Score',penaltyTime:'Penalty time',elapsed:'Elapsed',wrongPenalty:'Counted wrongs',mockResult:'Mock result',newMock:'New mock',open:'Open',
    reviewTitle:'Review book',reviewSub:'Things you missed, and things worth seeing again, stay here.',nothingReview:'Nothing to review yet.',solvedLater:'Solved later',stillUnsolved:'Not yet AC',attempts:'submissions',
    settingsTitle:'Settings',settingsSub:'Practice data is stored on this device. Export or restore a backup at any time.',atcoderSync:'AtCoder sync',atcoderSyncBody:'Your handle is enough. No password — only public submission history is read.',handle:'AtCoder handle',autoSync:'Auto-sync on launch',lastSync:'Last sync',never:'Never',saveSync:'Save & sync',appearance:'Appearance & language',theme:'Theme',light:'Light',dark:'Dark',uiLanguage:'Interface language',statementLanguage:'Default statement language',data:'Data',export:'Export JSON',import:'Import JSON',resetAll:'Reset local data',dailyGoalSetting:'Daily problem goal',
    metadata:'AtCoder data',refreshMetadata:'Refresh problem data',metadataBody:'Points and Difficulty come from AtCoder Problems. Local practice still works offline.',
    syncDone:'Sync complete',syncFailed:'Sync failed',newMatching:'new matching submissions',metadataUpdated:'Problem data updated',metadataFailed:'Could not refresh just now; keeping the data already on this device',backupImported:'Backup imported',invalidBackup:'Invalid backup file',resetConfirm:'Delete all local progress, code, notes, and mock records?',resetDone:'Local data reset',
    runnerFirst:'The first Python run needs a network connection. After that, it is usually much quicker.',compileError:'Runtime error',passed:'Passed',wrongAnswer:'Output differs',finished:'Finished',inProgress:'In progress',officialRef:'Official reference',
    noProblems:'No problems match the current filters.',notFound:'Problem not found.',goalSaved:'Daily goal saved',manualRecorded:'Recorded',starAdded:'Added to review',starRemoved:'Removed from review',
    sourceAtCoder:'AtCoder',sourceManual:'Manual',sourceMock:'Mock',date:'Time',result:'Result',source:'Source',language:'Language',runtime:'Runtime',noHistory:'No formal submissions recorded.',
    verifiedHint:'ACs confirmed on AtCoder.',pointsHint:'A cross-contest sum is a practice-volume reference, not an AtCoder Rating.',accuracyHint:'Solved problems / attempted problems.',firstTryHint:'Share of AtCoder problems solved on the first submission.'
  }
};

const EXTRA_I18N={
  zh:{
    back:'后退',forward:'前进',previousProblem:'上一题',nextProblem:'下一题',solution:'答案',solutionLocked:'答案暂未展开',solutionLockedBody:'解答默认隐藏。AC 后自动解锁，也可以手动展开。',revealSolution:'展开答案',revealConfirm:'确定展开解答与参考资料？',officialEditorial:'官方解答',acceptedSolutions:'AC 提交',mySubmissions:'我的提交',solutionResources:'答案与参考',solutionHint:'提供官方解说、AC 提交与个人提交记录。',currentCode:'当前保存代码',copyCode:'复制代码',copied:'已复制',loadSamples:'导入官方样例',loadingSamples:'正在读取官方样例…',samplesLoaded:'官方样例已导入',samplesFailed:'样例读取失败',samplesLocalOnly:'自动导入样例需要使用完整本地服务器版。已打开官方题面。',noSamples:'未找到可导入的官方样例。',workspace:'工作区',officialJudgeNote:'本地运行仅用于调试；最终结果以 AtCoder 判题为准。',navigation:'导航',officialOriginal:'AtCoder 原题',officialLoading:'正在载入原题…',officialFailed:'暂时无法载入完整题面。请检查网络连接，或打开 AtCoder 原题。',openOriginal:'打开原题',practiceSummary:'完整题面',officialCached:'AtCoder原题 · 已载入',storageFull:'本地存储已满。先导出备份，再清理一些旧代码或测试。'
  },
  ja:{
    back:'戻る',forward:'進む',previousProblem:'前の問題',nextProblem:'次の問題',solution:'解答',solutionLocked:'解答は未表示です',solutionLockedBody:'解答は初期状態で非表示です。AC後に自動で開き、手動でも表示できます。',revealSolution:'解答を表示',revealConfirm:'解答と参考資料を表示しますか？',officialEditorial:'公式解説',acceptedSolutions:'AC 提出',mySubmissions:'自分の提出',solutionResources:'解答・参考',solutionHint:'公式解説、AC提出、自分の提出履歴を参照できます。',currentCode:'保存中のコード',copyCode:'コードをコピー',copied:'コピーしました',loadSamples:'公式サンプルを読込',loadingSamples:'公式サンプルを取得中…',samplesLoaded:'公式サンプルを読み込みました',samplesFailed:'サンプル取得に失敗しました',samplesLocalOnly:'サンプル自動読込はローカルサーバー版で利用できます。公式問題文を開きました。',noSamples:'読み込める公式サンプルが見つかりません。',workspace:'ワークスペース',officialJudgeNote:'ローカル実行はデバッグ用です。最終判定は AtCoder を基準にします。',navigation:'ナビゲーション',officialOriginal:'AtCoder 公式問題文',officialLoading:'公式問題文を読み込み中…',officialFailed:'完全な問題文を読み込めませんでした。ネットワークを確認するか、AtCoder を開いてください。',openOriginal:'公式問題文を開く',practiceSummary:'練習用要約',officialCached:'AtCoder公式 · 読込済み',storageFull:'ローカル保存領域がいっぱいです。先にバックアップを書き出して、古いコードやテストを少し整理してください。'
  },
  en:{
    back:'Back',forward:'Forward',previousProblem:'Previous problem',nextProblem:'Next problem',solution:'Solution',solutionLocked:'Solution is hidden',solutionLockedBody:'Solutions are hidden by default. They unlock after AC and can also be revealed manually.',revealSolution:'Reveal solution',revealConfirm:'Reveal the solution and reference material?',officialEditorial:'Official editorial',acceptedSolutions:'Accepted submissions',mySubmissions:'My submissions',solutionResources:'Solution & references',solutionHint:'Open the official editorial, accepted submissions, or your own submission history.',currentCode:'Current saved code',copyCode:'Copy code',copied:'Copied',loadSamples:'Load official samples',loadingSamples:'Loading official samples…',samplesLoaded:'Official samples loaded',samplesFailed:'Could not load samples',samplesLocalOnly:'Automatic sample import requires the full local-server version. The official task page has been opened.',noSamples:'No official samples were found.',workspace:'Workspace',officialJudgeNote:'Local runs are for debugging. AtCoder remains the final judge.',navigation:'Navigation',officialOriginal:'AtCoder original',officialLoading:'Loading the original statement…',officialFailed:'The complete statement could not be loaded. Check the network connection or open the task on AtCoder.',openOriginal:'Open original',practiceSummary:'Chinese note',officialCached:'AtCoder original · loaded',storageFull:'Local storage is full. Export a backup, then clear a little old code or test data.'
  }
};

const DEFAULT_STATE={
  theme:'system',uiLang:'zh',statementLang:'zh',atcoderUser:'',autoSync:false,lastSync:0,syncCursor:0,dailyGoal:5,
  profile:{displayName:''},preferences:{homePage:'dashboard',editorFontSize:14,tabSize:4,lineWrapping:false,statementFontSize:16,reduceMotion:false},academy:{codes:{},completed:{},attempts:{},hints:{},solutions:{},lastLessonId:''},
  attempts:[],notes:{},stars:{},codes:{},testCases:{},solutionUnlocked:{},mock:null,mockHistory:[],metadataCache:{},metadataUpdated:0,workTab:'code',splitRatio:47,lastProblem:'',recentProblems:[],sidebarCollapsed:false
};
for(const [lang,copy] of Object.entries({
  zh:{errorProblemCount:'涉及 {count} 道题',invalidHandle:'用户名只能包含英文字母、数字与下划线。',overviewSub:'221 道题，按 0–5 级组织。代码与练习记录保存在本机。',coverage:'竞赛元数据',statementMissing:'此题的当前语言文件缺失。请检查题库安装文件。',localStatement:'本地题面',localLibraryNote:'三种语言分别保存为本地文件。切换语言无需联网。',metadataCoverageNote:'竞赛元数据用于显示配点与 Difficulty，其覆盖数与题面数量分别统计。部分教程题没有这些指标。',mockSub:'3 题，150 分钟。训练制每题 100 分；手动记录与官方同步均计入训练分。已完成题的计罚错误每次加 5 分钟，CE、IE 不计罚。训练分不等于东大考试成绩。',officialJudgeNote:'本地测试比较样例或自定义输出。完整判定请提交 AtCoder。',compareOutput:'比较期望输出',runtimeBusy:'正在运行，请等待当前测试结束。',resetFailed:'无法清空存储，请检查存储权限。',importConfirm:'导入会替换本机的进度、代码、笔记与模拟记录。是否继续？',manualAC:'手动完成',manualTrackHelp:'手动记录用于个人进度。只有从 AtCoder 同步的结果标为已验证。',atcoderSyncBody:'填写 AtCoder 用户名以读取公开提交记录，无需密码。',reviewSub:'包含错误提交或已收藏的题目。',sourceNote:'完整题面保存在本地。',runnerFirst:'Python 与题库均随应用提供。',passed:'输出一致',wrongAnswer:'输出不一致'},
  ja:{errorProblemCount:'対象 {count} 問',invalidHandle:'ユーザー名には英数字とアンダースコアのみ使用できます。',overviewSub:'221 問を Level 0–5 に整理。コードと練習記録はこの端末に保存されます。',coverage:'競技メタデータ',statementMissing:'この言語の問題文ファイルがありません。問題ライブラリのインストールを確認してください。',localStatement:'ローカル問題文',localLibraryNote:'3言語を別々のローカルファイルに保存。言語切替に通信は不要です。',metadataCoverageNote:'配点と Difficulty のメタデータ件数は、問題文の件数とは別です。一部の入門課題にはこれらの指標がありません。',mockSub:'3 問・150 分。練習方式は各 100 点。手動記録と公式同期を練習点に反映します。完了した問題の誤答は 1 回 5 分加算（CE・IE 除外）。東大入試の点数とは異なります。',officialJudgeNote:'ローカル実行はサンプル・任意テストの比較です。正式な判定は AtCoder へ提出してください。',compareOutput:'期待出力と比較',runtimeBusy:'実行中です。現在のテストの終了をお待ちください。',resetFailed:'保存データを削除できません。保存権限を確認してください。',importConfirm:'この端末の進捗・コード・メモ・模擬記録を置き換えます。続行しますか？',manualAC:'手動完了',problemListSub:'レベル・状態・Difficultyで絞り込み。',studyPlanSub:'現在の進捗・誤答・復習指定に基づく練習候補です。',settingsSub:'練習記録は端末に保存されます。JSON でバックアップ・復元できます。',atcoderSyncBody:'AtCoder のユーザー名から公開提出履歴を取得します。パスワードは不要です。',runnerFirst:'Python と問題ライブラリはアプリに同梱されています。',passed:'出力一致',wrongAnswer:'出力不一致'},
  en:{errorProblemCount:'Across {count} problems',invalidHandle:'Use only letters, numbers and underscores in the handle.',overviewSub:'221 problems across Levels 0–5. Code and practice records stay on this device.',coverage:'Contest metadata',statementMissing:'The local statement file for this language is missing. Check the problem library installation.',localStatement:'Local statement',localLibraryNote:'Each language is stored locally. Switching languages requires no connection.',metadataCoverageNote:'Points and Difficulty metadata coverage is separate from statement coverage. Some introductory exercises have no such metrics.',mockSub:'3 problems, 150 minutes. Training mode awards 100 points each, using manual records and synced verdicts. Each counted error on a completed problem adds 5 minutes; CE and IE are excluded. Training scores are not UTokyo exam scores.',officialJudgeNote:'Local tests compare samples or custom output. Submit to AtCoder for a complete verdict.',compareOutput:'Compare expected output',runtimeBusy:'A test is running. Wait for it to finish.',resetFailed:'Unable to clear storage. Check storage permissions.',importConfirm:'Importing replaces this device’s progress, code, notes and mock records. Continue?',manualAC:'Manually completed',problemListSub:'Filter by level, status, and Difficulty.',studyPlanSub:'Practice suggestions based on progress, errors, and saved problems.',reviewSub:'Problems with incorrect submissions or saved for review.',atcoderSyncBody:'Enter your AtCoder handle to read public submissions. No password is required.',runnerFirst:'Python and the problem library are bundled with the app.',passed:'Output matches',wrongAnswer:'Output differs'}
}))Object.assign(I18N[lang],copy);
EXTRA_I18N.zh.officialJudgeNote='本地仅比较测试输出。多解或浮点题可能与样例不同；完整判定请提交 AtCoder。';
EXTRA_I18N.ja.officialJudgeNote='ローカルでは出力を比較します。複数解・小数の問題はサンプルと異なる場合があります。正式判定は AtCoder で行います。';
EXTRA_I18N.en.officialJudgeNote='Local tests compare output. Valid alternate or floating-point answers may differ from samples. Submit to AtCoder for a full verdict.';
for(const [lang,copy] of Object.entries({
  zh:{dashboard:'工作台',study:'学习路线',mock:'模拟考试',review:'复习',practiceSection:'练习',practiceWorkspace:'编程训练',homeTitle:'今日练习',homeSubtitle:'东京大学 · 创造信息学',continuePractice:'继续练习',startPractice:'开始练习',lastOpened:'上次打开',nextUp:'下一题',recommendedForYou:'建议练习',viewLibrary:'浏览题库',randomUnsolved:'随机未完成题',dailyTarget:'今日目标',goalProgress:'已完成 {done} / {goal} 题',editGoal:'调整目标',yourProgress:'练习进度',libraryTotal:'全部练习',libraryIntro:'六个等级，从 Python 入门到综合算法。',resultsCount:'显示 {shown} / {total} 题',noMatchTitle:'没有匹配的题目',clearFilters:'清除筛选',searchProblems:'搜索题号或标题',quickSearch:'快速搜索',recentProblems:'最近打开',searchHint:'输入题号或标题',searchNavigate:'选择',searchOpen:'打开',searchClose:'关闭',noSearchResults:'未找到匹配的题目',collapseSidebar:'收起侧栏',expandSidebar:'展开侧栏',savedLocally:'保存在本机',allCompleted:'当前范围内的题目已全部完成',allCompletedTitle:'本阶段已完成',allCompletedBody:'可以从复习列表开始，或选择其他等级。',planIntro:'按当前进度安排下一组练习。',practiceCount:'{count} 道题',reviewCount:'{count} 道题待复习',progressFraction:'{done} / {total} 已完成',settingsIntro:'管理偏好、AtCoder 连接与本地数据。',accountSection:'账户',interfaceSection:'工作区',backupSection:'备份与恢复',librarySection:'本地题库',backupDescription:'导出完整练习记录，或从已有备份恢复。',backup:'备份',restart:'重置工作区',emptyActivity:'提交记录会显示在这里。',reviewEmptyTitle:'复习列表为空',reviewEmptyBody:'收藏的题目和错误提交会自动汇总到这里。',studyEmptyTitle:'全部题目已完成',studyEmptyBody:'可继续复习，或重新练习任意题目。',problemActions:'题目操作',backToLibrary:'返回题库',savedCode:'代码已保存',taskDetails:'题目详情',estimatedDifficulty:'参考难度',localTests:'本地测试'},
  ja:{dashboard:'ワークスペース',study:'学習ルート',mock:'模擬試験',review:'復習',practiceSection:'練習',practiceWorkspace:'プログラミング演習',homeTitle:'今日の練習',homeSubtitle:'東京大学 · 創造情報学',continuePractice:'練習を再開',startPractice:'練習を始める',lastOpened:'前回開いた問題',nextUp:'次の問題',recommendedForYou:'おすすめの問題',viewLibrary:'問題一覧を見る',randomUnsolved:'未完了からランダム',dailyTarget:'今日の目標',goalProgress:'{goal} 問中 {done} 問完了',editGoal:'目標を変更',yourProgress:'練習の進捗',libraryTotal:'すべての問題',libraryIntro:'Python 入門から総合アルゴリズムまで、6つのレベル。',resultsCount:'{total} 問中 {shown} 問を表示',noMatchTitle:'一致する問題がありません',clearFilters:'絞り込みを解除',searchProblems:'問題番号・タイトルを検索',quickSearch:'クイック検索',recentProblems:'最近開いた問題',searchHint:'問題番号やタイトルを入力',searchNavigate:'選択',searchOpen:'開く',searchClose:'閉じる',noSearchResults:'一致する問題がありません',collapseSidebar:'サイドバーを閉じる',expandSidebar:'サイドバーを開く',savedLocally:'この端末に保存',allCompleted:'この範囲の問題はすべて完了しています',allCompletedTitle:'この段階は完了しました',allCompletedBody:'復習リストを開くか、別のレベルを選択できます。',planIntro:'現在の進捗に合わせた次の練習候補です。',practiceCount:'{count} 問',reviewCount:'復習対象 {count} 問',progressFraction:'{total} 問中 {done} 問完了',settingsIntro:'表示、AtCoder 接続、ローカルデータを管理します。',accountSection:'アカウント',interfaceSection:'ワークスペース',backupSection:'バックアップと復元',librarySection:'ローカル問題集',backupDescription:'練習記録を書き出し、保存済みのバックアップから復元できます。',backup:'バックアップ',restart:'ワークスペースをリセット',emptyActivity:'提出記録がここに表示されます。',reviewEmptyTitle:'復習リストは空です',reviewEmptyBody:'保存した問題と誤提出のある問題がここに集まります。',studyEmptyTitle:'すべての問題が完了しました',studyEmptyBody:'復習するか、任意の問題にもう一度取り組めます。',problemActions:'問題の操作',backToLibrary:'問題一覧に戻る',savedCode:'コードを保存済み',taskDetails:'問題の詳細',estimatedDifficulty:'参考難易度',localTests:'ローカルテスト'},
  en:{dashboard:'Workspace',study:'Learning path',mock:'Mock exam',review:'Review',practiceSection:'Practice',practiceWorkspace:'Programming practice',homeTitle:'Today’s practice',homeSubtitle:'University of Tokyo · Creative Informatics',continuePractice:'Continue practice',startPractice:'Start practice',lastOpened:'Last opened',nextUp:'Up next',recommendedForYou:'Recommended practice',viewLibrary:'Browse problems',randomUnsolved:'Random unsolved',dailyTarget:'Daily target',goalProgress:'{done} of {goal} problems completed',editGoal:'Edit target',yourProgress:'Your progress',libraryTotal:'All problems',libraryIntro:'Six levels, from Python fundamentals to advanced algorithms.',resultsCount:'Showing {shown} of {total} problems',noMatchTitle:'No matching problems',clearFilters:'Clear filters',searchProblems:'Search problem ID or title',quickSearch:'Quick search',recentProblems:'Recently opened',searchHint:'Enter a problem ID or title',searchNavigate:'Navigate',searchOpen:'Open',searchClose:'Close',noSearchResults:'No matching problems',collapseSidebar:'Collapse sidebar',expandSidebar:'Expand sidebar',savedLocally:'Saved on this device',allCompleted:'All problems in this selection are complete',allCompletedTitle:'This stage is complete',allCompletedBody:'Open your review list or choose another level.',planIntro:'Your next practice problems, based on current progress.',practiceCount:'{count} problems',reviewCount:'{count} problems to review',progressFraction:'{done} of {total} completed',settingsIntro:'Manage preferences, your AtCoder connection, and local data.',accountSection:'Account',interfaceSection:'Workspace',backupSection:'Backup and restore',librarySection:'Local library',backupDescription:'Export your practice records or restore an existing backup.',backup:'Backup',restart:'Reset workspace',emptyActivity:'Your submissions will appear here.',reviewEmptyTitle:'Your review list is empty',reviewEmptyBody:'Saved problems and incorrect submissions are collected here.',studyEmptyTitle:'All problems completed',studyEmptyBody:'Review your work or revisit any problem.',problemActions:'Problem actions',backToLibrary:'Back to problems',savedCode:'Code saved',taskDetails:'Problem details',estimatedDifficulty:'Reference difficulty',localTests:'Local tests'}
}))Object.assign(I18N[lang],copy);
for(const [lang,copy] of Object.entries({
  zh:{mockHistory:'模拟记录',mockHistoryIntro:'查看已结束的模拟与各题结果。',mockHistoryEmpty:'暂无模拟记录',mockHistoryEmptyBody:'结束一次模拟后，结果会保存在这里。',viewMockHistory:'查看模拟记录',returnCurrentMock:'返回当前模拟',returnMockSetup:'返回模拟设置',backToMockHistory:'返回模拟记录',archivedMock:'历史模拟',mockHistoryMissing:'未找到这次模拟记录',mockHistoryMissingBody:'这条记录可能已被重置，或不在当前备份中。',mockCompleted:'完成 {done} / {total} 题',practiceAgain:'返回练习',viewAllRecords:'查看全部',mockNotCompleted:'未完成'},
  ja:{mockHistory:'模擬の履歴',mockHistoryIntro:'終了した模擬試験と各問題の結果を確認できます。',mockHistoryEmpty:'模擬の記録はありません',mockHistoryEmptyBody:'模擬試験を終了すると、結果がここに保存されます。',viewMockHistory:'模擬の履歴を見る',returnCurrentMock:'現在の模擬に戻る',returnMockSetup:'模擬の設定に戻る',backToMockHistory:'履歴一覧に戻る',archivedMock:'過去の模擬',mockHistoryMissing:'この模擬記録が見つかりません',mockHistoryMissingBody:'記録がリセットされたか、現在のバックアップには含まれていません。',mockCompleted:'{total} 問中 {done} 問完了',practiceAgain:'練習に戻る',viewAllRecords:'すべて見る',mockNotCompleted:'未完了'},
  en:{mockHistory:'Mock history',mockHistoryIntro:'Review completed sessions and individual problem results.',mockHistoryEmpty:'No mock sessions yet',mockHistoryEmptyBody:'Completed mock sessions will be saved here.',viewMockHistory:'View mock history',returnCurrentMock:'Return to current mock',returnMockSetup:'Return to mock setup',backToMockHistory:'Back to mock history',archivedMock:'Past session',mockHistoryMissing:'Mock session not found',mockHistoryMissingBody:'This record may have been reset or is not included in the current backup.',mockCompleted:'{done} of {total} completed',practiceAgain:'Open for practice',viewAllRecords:'View all',mockNotCompleted:'Not completed'}
}))Object.assign(I18N[lang],copy);
for(const [lang,copy] of Object.entries({
  zh:{learn:'入门课程',courseInvitation:'从概念、短练习到真实题目，逐步建立 Python 与算法基础。',viewCourse:'查看课程',preferencesRestored:'已恢复默认偏好',saveFailed:'无法保存。请导出备份，并检查存储空间与权限。',signatureTitle:'Aquila',signatureLine:'CI Programming Practice'},
  en:{learn:'Foundations',courseInvitation:'Build a Python and algorithms foundation through concepts, short exercises and real problems.',viewCourse:'View course',preferencesRestored:'Default preferences restored',saveFailed:'Unable to save. Export a backup and check storage space and permissions.',signatureTitle:'Aquila',signatureLine:'CI Programming Practice'},
  ja:{learn:'入門コース',courseInvitation:'概念、短い演習、実際の問題を通して Python とアルゴリズムの基礎を学びます。',viewCourse:'コースを見る',preferencesRestored:'既定の設定に戻しました',saveFailed:'保存できません。バックアップを書き出し、空き容量と保存権限を確認してください。',signatureTitle:'Aquila',signatureLine:'CI Programming Practice'}
}))Object.assign(I18N[lang],copy);
let state=loadState();
let problems=[];let problemMap=new Map();let route=parseRoute();
let runnerWorker=null,runnerReadyPromise=null,runnerReadyResolve=null,runnerReadyReject=null,runnerSeq=0,runnerPending=new Map();
const statementHTMLCache=new Map();
let runnerBusy=false;
let runBatchGeneration=0;
let codeEditorInstance=null;
let atcoderSyncGeneration=0,atcoderSyncFlight=null,atcoderLastRequestAt=0;
function invalidateAtCoderSync(){
  atcoderSyncGeneration++;
  atcoderSyncFlight?.controller?.abort();
  atcoderSyncFlight=null;
}
function retainMockAccount(account){
  if(!account)return;
  for(const m of [state.mock,...state.mockHistory])if(m&&!m.atcoderUser)m.atcoderUser=account;
}

function t(key,vars={}){let s=(EXTRA_I18N[state.uiLang]||EXTRA_I18N.zh)[key]??(I18N[state.uiLang]||I18N.zh)[key]??EXTRA_I18N.en[key]??I18N.en[key]??key;for(const [k,v] of Object.entries(vars))s=s.replaceAll(`{${k}}`,String(v));return state.uiLang==='en'?s:normalizeCjkText(s)}
function langLocale(){return state.uiLang==='zh'?'zh-CN':state.uiLang==='ja'?'ja-JP':'en-US'}
function fmt(n){return new Intl.NumberFormat(langLocale()).format(Math.round(Number(n)||0))}
function fmtDate(ms){return new Intl.DateTimeFormat(langLocale(),{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(ms))}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function normalizeCjkText(value){
  return String(value??'').replace(/\s+/g,' ').replace(/([\u3000-\u30ff\u3400-\u9fff\uff00-\uffef]) +/g,'$1').replace(/ +([\u3000-\u30ff\u3400-\u9fff\uff00-\uffef])/g,'$1').trim();
}
function statementText(value,lang){const s=String(value??'').replace(/\s+/g,' ').trim();return (lang==='zh'||lang==='ja')?normalizeCjkText(s):s}
function localDay(ms=Date.now()){const d=new Date(ms);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
function isLocalServer(){return location.protocol.startsWith('http')&&['127.0.0.1','localhost'].includes(location.hostname)}
async function apiFetch(url,options={}){if(isLocalServer()){const u='/__proxy?url='+encodeURIComponent(url);return fetch(u,{...options,cache:'no-store'})}return fetch(url,options)}
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
// Backups are data, never executable HTML or URLs. Keep only supported fields.
function normalizeState(input){
  if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Invalid state');
  const out=structuredClone(DEFAULT_STATE),validLabels=new Set((window.CI_PROBLEMS||[]).map(p=>p.label));
  const labelOK=label=>typeof label==='string'&&/^[A-Za-z0-9_. -]{1,80}$/.test(label)&&(!validLabels.size||validLabels.has(label));
  const record=value=>value&&typeof value==='object'&&!Array.isArray(value);
  const number=(value,fallback,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isFinite(value)?clamp(value,min,max):fallback;
  for(const key of ['uiLang','statementLang'])if(['zh','ja','en'].includes(input[key]))out[key]=input[key];
  if(['system','light','dark'].includes(input.theme))out.theme=input.theme;
  if(window.AquilaSettings){const settings=window.AquilaSettings.normalize(input);out.preferences=settings.preferences;out.profile=settings.profile;}
  if(window.PlumeAcademy)out.academy=window.PlumeAcademy.normalize(input.academy);
  if(['code','tests','notes','history','solution'].includes(input.workTab))out.workTab=input.workTab;
  if(typeof input.atcoderUser==='string'&&/^[A-Za-z0-9_]{0,40}$/.test(input.atcoderUser))out.atcoderUser=input.atcoderUser;
  out.sidebarCollapsed=input.sidebarCollapsed===true;out.lastProblem=labelOK(input.lastProblem)?input.lastProblem:'';out.recentProblems=Array.isArray(input.recentProblems)?[...new Set(input.recentProblems.filter(labelOK))].slice(0,12):[];
  out.autoSync=input.autoSync===true;out.dailyGoal=Math.round(number(input.dailyGoal,5,1,50));out.splitRatio=number(input.splitRatio,47,34,66);
  for(const key of ['lastSync','syncCursor','metadataUpdated'])out[key]=number(input[key],0);
  const attempts=(items,account=out.atcoderUser)=>Array.isArray(items)?items.filter(a=>record(a)&&labelOK(a.problemKey)&&VALID_RESULTS.has(a.result)&&['manual','atcoder','mock'].includes(a.source)&&Number.isFinite(a.time)&&a.time>0).slice(-100000).map(a=>({id:String(a.id??'').slice(0,100),problemKey:a.problemKey,result:a.result,source:a.source,atcoderUser:a.source==='atcoder'&&typeof a.atcoderUser==='string'&&/^[A-Za-z0-9_]{1,40}$/.test(a.atcoderUser)?a.atcoderUser:(a.source==='atcoder'?account:undefined),time:a.time,language:String(a.language??'').slice(0,120),executionTime:Number.isFinite(a.executionTime)?a.executionTime:null})):[];
  if(input.attempts!==undefined&&!Array.isArray(input.attempts))throw new Error('Invalid attempts');
  out.attempts=attempts(input.attempts).filter(a=>a.source!=='atcoder'||!out.atcoderUser||a.atcoderUser===out.atcoderUser);
  const officialIds=new Set();out.attempts=out.attempts.slice().reverse().filter(a=>{if(a.source!=='atcoder'||!a.id)return true;const key=a.atcoderUser+'::'+a.id;if(officialIds.has(key))return false;officialIds.add(key);return true}).reverse();
  for(const key of ['notes','codes','stars','solutionUnlocked','testCases','metadataCache']){
    if(input[key]!==undefined&&!record(input[key]))throw new Error(`Invalid ${key}`);
    for(const [label,value] of Object.entries(input[key]||{})){
      if(!labelOK(label))continue;
      if(['notes','codes'].includes(key)&&typeof value==='string')out[key][label]=value.slice(0,2000000);
      if(['stars','solutionUnlocked'].includes(key)&&value===true)out[key][label]=true;
      if(key==='metadataCache'&&record(value))out[key][label]={id:/^[A-Za-z0-9_-]+$/.test(value.id||'')?value.id:undefined,name:typeof value.name==='string'?value.name.slice(0,300):'',point:Number.isFinite(value.point)&&value.point>=0?value.point:null,difficulty:Number.isFinite(value.difficulty)?value.difficulty:null};
      if(key==='testCases'&&Array.isArray(value))out[key][label]=value.slice(0,100).filter(record).map((c,i)=>({id:`case-${i}-${String(c.id||'').replace(/[^A-Za-z0-9_-]/g,'').slice(0,80)}`,input:String(c.input??'').slice(0,1000000),expected:String(c.expected??'').slice(0,1000000),hasExpected:c.hasExpected===true||(c.hasExpected===undefined&&String(c.expected??'').length>0)}));
    }
  }
  const mock=value=>{
    if(!record(value)||!Array.isArray(value.labels)||value.labels.length!==3||!value.labels.every(labelOK)||new Set(value.labels).size!==3||!Number.isFinite(value.startedAt)||value.startedAt<=0)return null;
    const m={id:String(value.id||'').slice(0,100),startedAt:value.startedAt,durationMs:number(value.durationMs,9000000,60000,86400000),labels:[...value.labels],pool:['core','foundation','hard','mixed'].includes(value.pool)?value.pool:'core',scoreMode:value.scoreMode==='official'?'official':'ci300',finished:value.finished===true,finishedAt:number(value.finishedAt,0),attempts:[],points:{}};
    m.atcoderUser=typeof value.atcoderUser==='string'&&/^[A-Za-z0-9_]{0,40}$/.test(value.atcoderUser)?value.atcoderUser:out.atcoderUser;
    m.finishedAt=m.finished?clamp(m.finishedAt||m.startedAt+m.durationMs,m.startedAt,m.startedAt+m.durationMs):0;
    m.attempts=attempts(value.attempts,m.atcoderUser).filter(a=>(a.source!=='atcoder'||a.atcoderUser===m.atcoderUser)&&m.labels.includes(a.problemKey)&&a.time>=m.startedAt&&a.time<=Math.min(m.startedAt+m.durationMs,m.finishedAt||Infinity));
    const ids=new Set();m.attempts=m.attempts.slice().reverse().filter(a=>{if(a.source!=='atcoder'||!a.id)return true;if(ids.has(a.id))return false;ids.add(a.id);return true}).reverse();
    for(const label of m.labels){const official=(window.CI_PROBLEMS||[]).find(p=>p.label===label)?.officialPoint;const fallback=Number.isFinite(official)?official:(out.metadataCache[label]?.point??window.CI_METADATA?.[label]?.point??0);m.points[label]=m.scoreMode==='official'?number(value.points?.[label],fallback):100;}
    return m;
  };
  out.mock=mock(input.mock);out.mockHistory=Array.isArray(input.mockHistory)?input.mockHistory.map(mock).filter(Boolean).slice(0,30):[];
  return out;
}
function loadState(){
  try{const cur=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(cur)return normalizeState(cur);}catch{}
  try{const old=JSON.parse(localStorage.getItem(LEGACY_KEY)||'null');if(old){return normalizeState({...old,uiLang:'zh',statementLang:old.language==='en'?'en':'zh',mock:null,metadataCache:{}})}}catch{}
  return structuredClone(DEFAULT_STATE);
}
function saveState(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}
  catch(e){toast(t('saveFailed'));console.warn(e);return false}
}
function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)}
const NAV_KEY='ciPracticeNavigation.v1';
let navMeta={idx:0,max:0};
function decodeRouteLabel(value){try{return decodeURIComponent(value)}catch{return ''}}
function parseRoute(){const h=location.hash.slice(1)||'/dashboard';const [path,q='']=h.split('?');return {path,params:new URLSearchParams(q)}}
function saveNavMeta(){try{sessionStorage.setItem(NAV_KEY,JSON.stringify(navMeta))}catch{}}
function initNavigation(){
  try{const v=JSON.parse(sessionStorage.getItem(NAV_KEY)||'null');if(v&&Number.isInteger(v.idx)&&Number.isInteger(v.max))navMeta=v}catch{}
  if(!location.hash){const base=location.href.split('#')[0],home=homeRoute();try{history.replaceState({ci:true,idx:0},'',base+'#'+home)}catch{location.hash=home}navMeta={idx:0,max:0}}
  else if(history.state&&history.state.ci&&Number.isInteger(history.state.idx)){navMeta.idx=history.state.idx;navMeta.max=Math.max(navMeta.max,navMeta.idx)}
  else{navMeta={idx:0,max:0};try{history.replaceState({ci:true,idx:0},'',location.href)}catch{}}
  saveNavMeta();
  window.addEventListener('popstate',e=>{if(e.state&&e.state.ci&&Number.isInteger(e.state.idx)){navMeta.idx=e.state.idx;navMeta.max=Math.max(navMeta.max,navMeta.idx);saveNavMeta()}route=parseRoute();render()});
}
function go(path){closeCommandPalette();const hash='#'+path;if(location.hash===hash)return;if(path.startsWith('/problem/')&&route.path!==path){state.workTab='code';saveState()}const idx=navMeta.idx+1;navMeta={idx,max:idx};saveNavMeta();try{history.pushState({ci:true,idx},'',hash)}catch{location.hash=path}route=parseRoute();render();window.scrollTo?.(0,0)}
function replaceRoute(path){try{history.replaceState({ci:true,idx:navMeta.idx},'','#'+path)}catch{location.hash=path}route=parseRoute()}
function navBack(){if(navMeta.idx>0)history.back()}
function navForward(){if(navMeta.idx<navMeta.max)history.forward()}

function homeRoute(){return state.preferences.homePage==='library'?'/problems':state.preferences.homePage==='learn'?'/learn':'/dashboard'}
function effectiveTheme(){return state.theme==='system'?(window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light'):state.theme}
function editorOptions(){return {...state.preferences,dark:effectiveTheme()==='dark'};}
function applyAppearance(){
  const root=document.documentElement;root.dataset.theme=effectiveTheme();root.dataset.motion=state.preferences.reduceMotion?'reduced':'normal';root.lang=state.uiLang==='zh'?'zh-CN':state.uiLang==='ja'?'ja':'en';
  root.style?.setProperty('--statement-size',state.preferences.statementFontSize+'px');root.style?.setProperty('--editor-size',state.preferences.editorFontSize+'px');
}
function formalAttempts(label){return state.attempts.filter(a=>a.problemKey===label&&(a.source==='atcoder'||a.source==='manual')).sort((a,b)=>a.time-b.time)}
function statusOf(p){
  const a=formalAttempts(p.label),atcoder=a.filter(x=>x.source==='atcoder'),verified=atcoder.find(x=>x.result==='AC'),anyAC=a.find(x=>x.result==='AC');
  const failed=a.filter(x=>x.result!=='AC'&&x.result!=='IE'&&VALID_RESULTS.has(x.result));
  return {verified:!!verified,solved:!!anyAC,manualSolved:!!anyAC&&!verified,attempted:a.length>0,errors:failed.length,attempts:a.length,firstTry:!!verified&&atcoder[0]?.result==='AC',last:a.at(-1),ac:anyAC};
}
function metaOf(p){return state.metadataCache[p.label]||window.CI_METADATA?.[p.label]||{}}
function pointOf(p){if(!p)return null;if(Number.isFinite(p.officialPoint))return p.officialPoint;const v=metaOf(p).point;return Number.isFinite(v)?v:null}
function rawDifficultyOf(p){const v=metaOf(p).difficulty;return Number.isFinite(v)?v:null}
function clipDifficulty(d){return d>=400?Math.round(d):Math.round(400/Math.exp(1-d/400))}
function difficultyOf(p){const d=rawDifficultyOf(p);return d==null?null:clipDifficulty(d)}
function titleOf(p){return String(metaOf(p).name||p.title||'').replace(/<\/?[a-z][^>]*>/gi,'')}
function urlOf(p,lang=''){const url=new URL(p.url);if(url.protocol!=='https:'||url.hostname!=='atcoder.jp')return 'https://atcoder.jp/';if(lang)url.searchParams.set('lang',lang);return url.href.replaceAll("'",'%27')}
function submitUrlOf(p){return `https://atcoder.jp/contests/${encodeURIComponent(contestSlugOf(p))}/submit?taskScreenName=${encodeURIComponent(p.problemId)}`}
function officialPointStats(){let known=0,pointTotal=0,pointSolved=0;for(const p of problems){const pt=pointOf(p);if(pt!=null){known++;pointTotal+=pt;if(statusOf(p).verified)pointSolved+=pt}}return {known,pointTotal,pointSolved}}
function aggregateStats(){
  let solved=0,verified=0,attempted=0,errors=0,first=0;
  for(const p of problems){const s=statusOf(p);if(s.solved)solved++;if(s.verified){verified++;if(s.firstTry)first++}if(s.attempted)attempted++;errors+=s.errors}
  const pts=officialPointStats();return {solved,verified,attempted,errors,firstTry:verified?first/verified:0,problemAccuracy:attempted?solved/attempted:0,...pts};
}
function currentStreak(){const days=new Set(state.attempts.filter(a=>a.source!=='mock').map(a=>localDay(a.time)));let n=0;let d=new Date();while(days.has(localDay(d.getTime()))){n++;d.setDate(d.getDate()-1)}return n}
function solvedToday(){const k=localDay();return new Set(state.attempts.filter(a=>a.source!=='mock'&&a.result==='AC'&&localDay(a.time)===k).map(a=>a.problemKey)).size}
function sourceName(x){return x==='atcoder'?t('sourceAtCoder'):x==='manual'?t('sourceManual'):t('sourceMock')}

async function init(){
  problems=(window.CI_PROBLEMS||[]).slice().sort((a,b)=>a.level-b.level||a.order-b.order);
  problemMap=new Map(problems.map(p=>[p.label,p]));
  initNavigation();route=parseRoute();
  applyAppearance();render();
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.theme==='system'){applyAppearance();render()}});
  // Metadata refresh is explicit; opening a problem never requires a network request.
  if(state.autoSync&&state.atcoderUser)setTimeout(()=>syncAtCoder(false,false),900);
  
}

async function refreshMetadata(userInitiated=true){
  try{
    const [merged,models]=await Promise.all([
      apiFetch('https://kenkoooo.com/atcoder/resources/merged-problems.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(`metadata ${r.status}`);return r.json()}),
      apiFetch('https://kenkoooo.com/atcoder/resources/problem-models.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(`difficulty ${r.status}`);return r.json()})
    ]);
    const byKey=new Map(merged.map(m=>[`${m.contest_id}::${m.problem_index}`,m]));
    const byId=new Map(merged.map(m=>[m.id,m]));
    const cache={...state.metadataCache};
    for(const p of problems){
      const m=byKey.get(`${p.contestId}::${p.index}`)||byId.get(p.problemId);
      if(!m)continue;
      const model=models[m.id]||{};
      cache[p.label]={id:m.id,name:m.name||p.label,point:Number.isFinite(m.point)?m.point:null,difficulty:Number.isFinite(model.difficulty)?model.difficulty:null,
        url:`https://atcoder.jp/contests/${m.contest_id}/tasks/${m.id}`,submitUrl:`https://atcoder.jp/contests/${m.contest_id}/submit?taskScreenName=${m.id}`};
    }
    state.metadataCache=cache;state.metadataUpdated=Date.now();saveState();render();if(userInitiated)toast(t('metadataUpdated'));
  }catch(e){console.warn(e);if(userInitiated)toast(t('metadataFailed'))}
}

function icon(name,extra=''){
  const paths={
    feather:'<path d="M20 3C11 2 5 8 5 15c0 2 1 3 3 3 7 0 13-8 12-15ZM3 22L15 9M8 16l5-1M11 12h5"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    book:'<path d="M4 4.5h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4zM12 5.5v15"/>',
    route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v5a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V5M15 8l3-3 3 3"/>',
    timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3M18 5l2-2"/>',
    bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4z"/>',
    settings:'<path d="M12 3l2 .5.6 2 2.1 1.2 2-.5 1.5 2.6-1.4 1.5v2.4l1.4 1.5-1.5 2.6-2-.5-2.1 1.2-.6 2L12 21l-2-.5-.6-2-2.1-1.2-2 .5-1.5-2.6 1.4-1.5v-2.4L3.8 9.8l1.5-2.6 2 .5 2.1-1.2.6-2z"/><circle cx="12" cy="12" r="3"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/>',
    left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',
    external:'<path d="M14 3h7v7M21 3L11 13M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
    panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
    play:'<path d="M8 5l11 7-11 7z"/>',shuffle:'<path d="M3 5h3c5 0 7 14 12 14h3M18 16l3 3-3 3M3 19h3c2.2 0 3.9-2.8 5.5-6M13 8c1.5-2 3-3 5-3h3M18 2l3 3-3 3"/>',
    check:'<path d="M5 12l4 4L19 6"/>',code:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    moon:'<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    download:'<path d="M12 3v12M7 10l5 5 5-5M4 16v4h16v-4"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M12 14h2M7 17h2"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M5 8a8 8 0 0 1 13-3l2 2M4 17l2 2a8 8 0 0 0 13-3"/>'
  };
  return `<svg class="ui-icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]||paths.book}</svg>`;
}
function toggleSidebar(){state.sidebarCollapsed=!state.sidebarCollapsed;saveState();render()}
function reviewProblems(){return problems.filter(p=>state.stars[p.label]||statusOf(p).errors>0)}
function shell(content,active){
  const stats=aggregateStats(),isProblem=route.path.startsWith('/problem/'),current=isProblem?problemMap.get(decodeRouteLabel(route.path.split('/').pop())):null;
  const nav=[['dashboard','grid'],['learn','feather'],['problems','book'],['study','route'],['mock','timer'],['review','bookmark']];
  return `<div class="app-shell ${isProblem?'is-problem':''} ${state.sidebarCollapsed?'sidebar-collapsed':''}">
    <aside id="appSidebar" class="sidebar" aria-label="${t('navigation')}">
      <button class="sidebar-brand" onclick="go('/dashboard')" aria-label="Plume"><span class="brand-mark"><img src="assets/plume.svg" alt=""></span><span class="brand-text"><strong>Plume</strong><small>CI Programming Practice</small></span></button>
      <button class="sidebar-search" onclick="openCommandPalette()" title="${t('quickSearch')}" aria-label="${t('quickSearch')}">${icon('search')}<span>${t('quickSearch')}</span><kbd>${shortcutLabel()}</kbd></button>
      <div class="sidebar-section-label">${t('practiceSection')}</div>
      <nav class="sidebar-nav">${nav.map(([key,glyph])=>`<button class="nav-item ${active===key?'active':''}" ${active===key?'aria-current="page"':''} onclick="go('/${key}')" title="${t(key)}" aria-label="${t(key)}">${icon(glyph)}<span class="nav-label">${t(key)}</span>${key==='problems'?`<span class="nav-count">${problems.length}</span>`:key==='review'&&reviewProblems().length?`<span class="nav-count">${reviewProblems().length}</span>`:''}</button>`).join('')}</nav>
      <div class="sidebar-footer"><div class="sidebar-progress"><div><span>${t('yourProgress')}</span><strong>${stats.solved}/${problems.length}</strong></div><div class="progress"><i style="width:${stats.solved/problems.length*100}%"></i></div></div><button class="nav-item ${active==='settings'?'active':''}" onclick="go('/settings')" title="${t('settings')}" aria-label="${t('settings')}">${icon('settings')}<span class="nav-label">${t('settings')}</span></button><div class="sidebar-account"><span class="connection-dot"></span><span>${state.atcoderUser?`@${esc(state.atcoderUser)}`:t('savedLocally')}</span></div></div>
    </aside>
    <div class="workspace"><header class="window-toolbar">
      <div class="toolbar-navigation"><button class="sidebar-toggle icon-button" onclick="toggleSidebar()" aria-controls="appSidebar" aria-expanded="${!state.sidebarCollapsed}" title="${t(state.sidebarCollapsed?'expandSidebar':'collapseSidebar')}" aria-label="${t(state.sidebarCollapsed?'expandSidebar':'collapseSidebar')}">${icon('panel')}</button><span class="toolbar-divider"></span><button class="icon-button" onclick="navBack()" title="${t('back')}" aria-label="${t('back')}" ${navMeta.idx<=0?'disabled':''}>${icon('left')}</button><button class="icon-button" onclick="navForward()" title="${t('forward')}" aria-label="${t('forward')}" ${navMeta.idx>=navMeta.max?'disabled':''}>${icon('right')}</button></div>
      <div class="toolbar-title">${current?`<button class="toolbar-breadcrumb" onclick="go('/problems')">${t('problems')}</button>${icon('right')}<span>${esc(current.label)}</span>`:`<span>${t(active)}</span>`}</div>
      <div class="toolbar-actions">${state.mock&&!state.mock.finished?`<button class="toolbar-mock" onclick="go('/mock')">${icon('timer')}<span id="globalMockTimer">${formatTime(Math.max(0,state.mock.durationMs-(Date.now()-state.mock.startedAt)))}</span></button>`:''}<button class="global-search-trigger icon-button" onclick="openCommandPalette()" title="${t('quickSearch')}" aria-label="${t('quickSearch')}">${icon('search')}</button><select class="language-select" aria-label="${t('uiLanguage')}" onchange="setUiLang(this.value)"><option value="zh" ${state.uiLang==='zh'?'selected':''}>中文</option><option value="ja" ${state.uiLang==='ja'?'selected':''}>日本語</option><option value="en" ${state.uiLang==='en'?'selected':''}>English</option></select><button class="icon-button" onclick="toggleTheme()" title="${t('theme')}" aria-label="${t('theme')}">${icon(effectiveTheme()==='dark'?'sun':'moon')}</button></div>
    </header><main class="page-content ${isProblem?'problem-page':''}" id="mainContent">${content}</main></div></div>`;
}
function render(){clearTimeout(setProblemQuery.timer);if(!problems.length)return;const p=route.path;let html,active;
  if(p==='/dashboard'){html=renderDashboard();active='dashboard'}
  else if(p==='/problems'){html=renderProblems();active='problems'}
  else if(p.startsWith('/problem/')){html=renderProblem(decodeRouteLabel(p.split('/').pop()));active='problems'}
  else if(p==='/learn'){html=window.PlumeAcademy.renderIndex({uiLang:state.uiLang,progress:state.academy});active='learn'}
  else if(p.startsWith('/learn/')){html=window.PlumeAcademy.renderLesson({id:decodeRouteLabel(p.slice(7)),uiLang:state.uiLang,progress:state.academy});active='learn'}
  else if(p==='/study'){html=renderStudy();active='study'}
  else if(p==='/mock'){html=renderMock();active='mock'}
  else if(p==='/review'){html=renderReview();active='review'}
  else if(p==='/settings'){html=renderSettings();active='settings'}
  else{go('/dashboard');return}
  window.PlumeAcademy?.destroy();codeEditorInstance?.destroy?.();codeEditorInstance=null;window.MathJax?.typesetClear?.();document.getElementById('app').innerHTML=shell(html,active);const label=p.startsWith('/problem/')?decodeRouteLabel(p.split('/').pop()):t(active||'dashboard');if(p.startsWith('/problem/')&&problemMap.has(label))rememberProblem(label);document.title=`${label} — ${PRODUCT_NAME}`;bindAfterRender();
}
function setUiLang(v){state.uiLang=['zh','ja','en'].includes(v)?v:'zh';saveState();applyAppearance();render()}
function toggleTheme(){state.theme=effectiveTheme()==='dark'?'light':'dark';saveState();applyAppearance();render()}

function statCard(label,value,detail,cls=''){return `<div class="card stat"><div class="label">${label}</div><div class="value ${cls}">${value}</div><div class="detail">${detail}</div></div>`}
function renderHeatmap(){const out=[];const now=new Date();for(let i=41;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);const key=localDay(d.getTime()),n=state.attempts.filter(a=>a.source!=='mock'&&localDay(a.time)===key).length;out.push(`<span class="day" data-n="${Math.min(4,n)}" title="${key} · ${n}"></span>`)}return `<div class="heatmap">${out.join('')}</div>`}
function renderRecent(){const a=state.attempts.filter(x=>x.source!=='mock').slice().sort((x,y)=>y.time-x.time).slice(0,7);if(!a.length)return `<div class="activity-empty">${t('emptyActivity')}</div>`;return a.map(x=>`<div class="recent-row" onclick="go('/problem/${encodeURIComponent(x.problemKey)}')"><i class="dot ${x.result==='AC'?'ac':'err'}"></i><div class="recent-main"><b>${esc(x.problemKey)}</b><span>${esc(x.result)} · ${sourceName(x.source)}</span></div><div class="recent-time">${fmtDate(x.time)}</div></div>`).join('')}

function filteredProblems(){
  const level=route.params.get('level')??'all',status=route.params.get('status')??'all',sort=route.params.get('sort')??'level',query=(route.params.get('q')||'').trim().toLowerCase();
  let items=problems.filter(p=>level==='all'||p.level===+level);
  items=items.filter(p=>{const result=statusOf(p);if(status==='todo')return !result.solved;if(status==='ac')return result.solved;if(status==='wrong')return result.errors>0;if(status==='star')return !!state.stars[p.label];return true});
  if(query)items=items.filter(p=>(`${p.label} ${titleOf(p)} ${p.cn||''} ${p.en||''}`).toLowerCase().includes(query));
  const value=x=>x===null?Infinity:x;
  return items.sort((a,b)=>sort==='difficulty'?value(difficultyOf(a))-value(difficultyOf(b)):sort==='points'?value(pointOf(a))-value(pointOf(b)):sort==='status'?(+statusOf(b).solved-+statusOf(a).solved||statusOf(b).errors-statusOf(a).errors):(a.level-b.level||a.order-b.order));
}
function setLibraryStatus(status){const params=new URLSearchParams(route.params);if(status==='all')params.delete('status');else params.set('status',status);replaceRoute('/problems'+(params.size?'?'+params:''));render()}
function renderProblems(){
  const level=route.params.get('level')??'all',status=route.params.get('status')??'all',sort=route.params.get('sort')??'level',items=filteredProblems();
  return `<div class="library-header page-head"><div><h1>${level==='all'?t('libraryTotal'):`L${level} · ${LEVEL_NAMES[state.uiLang][+level]||t('libraryTotal')}`}</h1><p>${t('libraryIntro')}</p></div><span class="library-total">${t('practiceCount',{count:problems.length})}</span></div>
  <div class="library-segments" role="group" aria-label="${t('status')}">${[['all','allStatus'],['todo','unsolved'],['ac','solvedStatus'],['star','starred'],['wrong','withErrorsStatus']].map(([key,label])=>`<button class="${status===key?'active':''}" aria-pressed="${status===key}" onclick="setLibraryStatus('${key}')">${key==='star'?icon('bookmark'):''}${t(label)}</button>`).join('')}</div>
  <div class="library-controls toolbar"><label class="search-field">${icon('search')}<input id="problemSearch" type="search" class="search" aria-label="${t('search')}" placeholder="${t('searchProblems')}" value="${esc(route.params.get('q')||'')}"></label>
  <select id="levelFilter" class="select" aria-label="${t('level')}"><option value="all">${t('allLevels')}</option>${[0,1,2,3,4,5].map(i=>`<option value="${i}" ${String(i)===level?'selected':''}>L${i} · ${LEVEL_NAMES[state.uiLang][i]}</option>`).join('')}</select>
  <select id="sortFilter" class="select" aria-label="${t('sortLevel')}"><option value="level" ${sort==='level'?'selected':''}>${t('sortLevel')}</option><option value="difficulty" ${sort==='difficulty'?'selected':''}>${t('sortDiff')}</option><option value="points" ${sort==='points'?'selected':''}>${t('sortPoints')}</option><option value="status" ${sort==='status'?'selected':''}>${t('sortStatus')}</option></select><button class="icon-button library-random" onclick="randomUnsolved()" title="${t('randomUnsolved')}" aria-label="${t('randomUnsolved')}">${icon('shuffle')}</button></div>
  <div class="table-wrap"><table class="ptable"><thead><tr><th>${t('problem')}</th><th>${t('level')}</th><th class="num hide-sm">${t('difficulty')}</th><th class="num hide-sm">${t('points')}</th><th>${t('status')}</th><th class="table-arrow"></th></tr></thead><tbody>${items.map(problemRow).join('')}</tbody></table>${items.length?'':`<div class="empty-state">${icon('search')}<h2>${t('noMatchTitle')}</h2><button class="btn" onclick="go('/problems')">${t('clearFilters')}</button></div>`}</div><div class="library-footer">${t('resultsCount',{shown:items.length,total:problems.length})}</div>`;
}
function problemRow(p){
  const status=statusOf(p),difficulty=difficultyOf(p),point=pointOf(p),stateKey=status.verified?'verifiedAC':status.manualSolved?'manualAC':status.attempted?'attemptedStatus':'unsolved';
  const badge=status.verified?'ac':status.manualSolved?'manual':status.attempted?'try':'idle';
  return `<tr tabindex="0" role="link" aria-label="${esc(p.label)} ${esc(titleOf(p))}" onkeydown="if(event.key==='Enter')go('/problem/${encodeURIComponent(p.label)}')" onclick="go('/problem/${encodeURIComponent(p.label)}')"><td class="problem-cell"><span class="problem-label">${esc(p.label)}${state.stars[p.label]?icon('bookmark','saved-icon'):''}</span><span class="problem-name">${esc(titleOf(p))}</span></td><td><span class="level-badge">L${p.level}</span></td><td class="num hide-sm">${difficulty??'—'}</td><td class="num hide-sm">${point??'—'}</td><td><span class="status ${badge}">${status.solved?icon('check'):'<i></i>'}<span>${t(stateKey)}</span></span></td><td class="table-arrow">${icon('right')}</td></tr>`;
}
function setProblemQuery(){const focused=document.activeElement?.id==='problemSearch',cursor=document.getElementById('problemSearch')?.selectionStart;const sp=new URLSearchParams();const q=document.getElementById('problemSearch')?.value.trim()||'',lv=document.getElementById('levelFilter')?.value||'all',st=document.getElementById('statusFilter')?.value||route.params.get('status')||'all',so=document.getElementById('sortFilter')?.value||'level';if(q)sp.set('q',q);if(lv!=='all')sp.set('level',lv);if(st!=='all')sp.set('status',st);if(so!=='level')sp.set('sort',so);replaceRoute('/problems'+(sp.size?'?'+sp:''));render();if(focused){const search=document.getElementById('problemSearch');search?.focus();if(Number.isInteger(cursor)){try{search?.setSelectionRange(cursor,cursor)}catch{}}}}

function problemIndex(label){return problems.findIndex(p=>p.label===label)}
function adjacentProblem(label,delta){const i=problemIndex(label),j=i+delta;return j>=0&&j<problems.length?problems[j]:null}
function contestSlugOf(p){try{const m=new URL(urlOf(p)).pathname.match(/^\/contests\/([^/]+)\/tasks\//);return m?m[1]:p.contestId}catch{return p.contestId}}
function editorialUrlOf(p){const c=contestSlugOf(p),lang=state.statementLang==='ja'?'ja':'en';if(c==='APG4bPython')return urlOf(p,lang);return `${urlOf(p).split('?')[0]}/editorial?lang=${lang}`}
function acceptedSubmissionsUrlOf(p){const c=contestSlugOf(p);return `https://atcoder.jp/contests/${encodeURIComponent(c)}/submissions?f.Task=${encodeURIComponent(p.problemId)}&f.Status=AC&f.User=&orderBy=created`}
function mySubmissionsUrlOf(p){const c=contestSlugOf(p);return `https://atcoder.jp/contests/${encodeURIComponent(c)}/submissions?f.Task=${encodeURIComponent(p.problemId)}&f.Status=&f.User=${encodeURIComponent(state.atcoderUser||'')}&orderBy=created`}
function renderProblem(label){
  const p=problemMap.get(label);if(!p)return `<div class="empty-state"><h2>${t('notFound')}</h2><button class="btn" onclick="go('/problems')">${t('viewLibrary')}</button></div>`;
  const status=statusOf(p),point=pointOf(p),difficulty=difficultyOf(p),tab=state.workTab||'code',previous=adjacentProblem(label,-1),next=adjacentProblem(label,1),inMock=state.mock&&!state.mock.finished&&state.mock.labels.includes(label);
  const badge=status.verified?`<span class="status ac">${icon('check')}${t('verifiedAC')}</span>`:status.manualSolved?`<span class="status manual">${icon('check')}${t('manualAC')}</span>`:'';
  return `<div class="problem-shell" style="--split:${clamp(+state.splitRatio||47,34,66)}%"><section class="pane statement-pane" aria-label="${t('statement')}">
    <div class="problem-head"><div class="problem-head-top"><span class="problem-label">${esc(p.label)}</span><div class="problem-nav-buttons"><button class="icon-button" aria-label="${t('previousProblem')}" title="${t('previousProblem')}" ${previous?`onclick="go('/problem/${encodeURIComponent(previous.label)}')"`:'disabled'}>${icon('left')}</button><button class="icon-button" aria-label="${t('nextProblem')}" title="${t('nextProblem')}" ${next?`onclick="go('/problem/${encodeURIComponent(next.label)}')"`:'disabled'}>${icon('right')}</button></div></div>
    <h1 class="problem-title-name">${esc(titleOf(p)||p.label)}</h1><div class="problem-meta"><span class="level-badge">L${p.level}</span>${point!==null?`<span>${point} pts</span>`:''}${difficulty!==null?`<span>Difficulty ${difficulty}</span>`:''}${badge}</div>
    <div class="problem-actions" aria-label="${t('problemActions')}"><button class="icon-button bookmark-button ${state.stars[p.label]?'selected':''}" onclick="toggleStar('${esc(p.label)}')" title="${state.stars[p.label]?t('unstar'):t('reviewBtn')}" aria-label="${state.stars[p.label]?t('unstar'):t('reviewBtn')}" aria-pressed="${!!state.stars[p.label]}">${icon('bookmark')}</button><button class="btn compact" onclick="openOfficial('${esc(p.label)}')">${t('official')}${icon('external')}</button><button class="btn compact" onclick="window.open('${esc(submitUrlOf(p))}','_blank','noopener')">${t('submit')}${icon('external')}</button></div>
    <div class="problem-head-lower"><div class="subtabs" role="group" aria-label="${t('statementLanguage')}">${[['zh','中文'],['ja','日本語'],['en','English']].map(([lang,title])=>`<button data-language="${lang}" class="${state.statementLang===lang?'active':''}" aria-pressed="${state.statementLang===lang}" onclick="setStatementLang('${lang}')">${title}</button>`).join('')}</div>${inMock?`<div class="mock-inline"><span>${t('manualTrack')}</span><button onclick="mockAttempt('${esc(label)}','WA')">WA</button><button onclick="mockAttempt('${esc(label)}','CE')">CE</button><button class="ac" onclick="mockAttempt('${esc(label)}','AC')">AC</button></div>`:''}</div></div>
    ${renderStatement(p)}</section><div id="problemSplitter" class="splitter" role="separator" aria-label="${t('workspace')}" aria-orientation="vertical" aria-valuemin="34" aria-valuemax="66" aria-valuenow="${state.splitRatio}" tabindex="0"></div>
    <section class="pane editor-pane" aria-label="${t('workspace')}"><div class="work-tabs" role="group" aria-label="${t('workspace')}">${[['code','code'],['tests','tests'],['notes','notes'],['history','history'],['solution','solution']].map(([key,text])=>`<button class="${tab===key?'active':''}" aria-pressed="${tab===key}" onclick="setWorkTab('${key}')">${key==='code'?icon('code'):''}${t(text)}</button>`).join('')}</div><div class="editor-language"><span>Python 3</span><span id="runtimeState" class="runtime-state">${t('runtimeIdle')}</span></div>${renderWorkPane(p,tab)}</section></div>`;
}
function statementFor(label,lang=state.statementLang){return window.CI_STATEMENTS?.[label]?.[lang]||null}
function localStatementCount(lang){return problems.filter(p=>!!statementFor(p.label,lang)?.html?.trim()).length}
function renderStatement(p){
  const lang=state.statementLang,entry=statementFor(p.label,lang);
  const title=lang==='zh'?'中文':lang==='ja'?'日本語':'English';
  let body;
  if(entry?.html){
    const key=`${p.label}:${lang}`;
    if(!statementHTMLCache.has(key))statementHTMLCache.set(key,sanitizeStatementHTML(entry.html));
    body=statementHTMLCache.get(key);
  }else body=`<div class="statement-empty" role="alert"><p>${t('statementMissing')}</p></div>`;
  return `<article class="statement"><div class="statement-label">${title} · ${t('localStatement')}</div><div id="officialStatement" class="official-statement lang-${lang}" lang="${lang==='zh'?'zh-CN':lang}" data-label="${esc(p.label)}" data-lang="${lang}">${body}</div><div class="source-note"><span>AtCoder</span><span>·</span><button class="text-link" onclick="openOfficial('${esc(p.label)}')">${t('openOriginal')}${icon('external')}</button></div></article>`;
}
function sanitizeStatementHTML(html){
  const root=new DOMParser().parseFromString(String(html),'text/html').body;
  const allowed=new Set('DIV SECTION ARTICLE P SPAN H1 H2 H3 H4 H5 H6 UL OL LI PRE CODE VAR EM STRONG B I U S SMALL SUP SUB BR HR TABLE THEAD TBODY TFOOT TR TH TD CAPTION BLOCKQUOTE A IMG DETAILS SUMMARY'.split(' '));
  root.querySelectorAll('script,style,iframe,object,embed,form,input,button,select,textarea,svg,math,noscript').forEach(el=>el.remove());
  root.querySelectorAll('*').forEach(el=>{
    if(!allowed.has(el.tagName)){el.replaceWith(...el.childNodes);return}
    for(const attr of [...el.attributes])if(!['href','src','alt','title','colspan','rowspan','open'].includes(attr.name))el.removeAttribute(attr.name);
    if(el.hasAttribute('href')){try{const url=new URL(el.getAttribute('href'),location.href);if(!['https:','http:'].includes(url.protocol))throw Error();el.href=url.href;el.target='_blank';el.rel='noopener noreferrer'}catch{el.removeAttribute('href')}}
    if(el.hasAttribute('src')){const src=el.getAttribute('src');if(!/^(?:\.\/)?(?:data\/(?:assets|media)\/|assets\/)[a-zA-Z0-9_./-]+$/.test(src)&&!/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(src))el.removeAttribute('src')}
  });
  root.querySelectorAll('pre').forEach(el=>{if(!el.querySelector('var'))el.classList.add('ci-no-math')});
  root.querySelectorAll('var').forEach(el=>{el.textContent='\\('+el.textContent+'\\)'});
  return root.innerHTML;
}
function ensureMathJax(){
  if(window.MathJax?.typesetPromise)return Promise.resolve();
  if(window.__ciMathJaxLoading)return window.__ciMathJaxLoading;
  window.MathJax={tex:{inlineMath:[['\\(','\\)'],['$','$']],displayMath:[['\\[','\\]']]},options:{skipHtmlTags:['script','noscript','style','textarea','code'],ignoreHtmlClass:'ci-no-math'}};
  window.__ciMathJaxLoading=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='vendor/mathjax/tex-chtml.js';script.async=true;script.onload=resolve;script.onerror=()=>{window.__ciMathJaxLoading=null;reject(new Error('Math renderer unavailable'))};document.head.appendChild(script)});
  return window.__ciMathJaxLoading;
}
async function typesetStatement(){
  const host=document.getElementById('officialStatement');if(!host)return;
  try{await ensureMathJax();if(host.isConnected)await window.MathJax.typesetPromise([host])}catch(error){console.warn(error)}
}
function renderWorkPane(p,tab){if(tab==='tests')return renderTests(p);if(tab==='notes')return `<div class="notes-pane"><textarea id="problemNote" placeholder="${t('notes')}">${esc(state.notes[p.label]||'')}</textarea><div class="notice">${t('manualTrackHelp')}</div><div class="inline-actions"><button class="btn danger" onclick="recordManual('${esc(p.label)}','WA')">${t('recordWA')}</button><button class="btn good" onclick="recordManual('${esc(p.label)}','AC')">${t('recordAC')}</button></div></div>`;if(tab==='history')return renderHistory(p);if(tab==='solution')return renderSolution(p);return renderCode(p)}
function renderSolution(p){const solved=statusOf(p).solved,unlocked=solved||!!state.solutionUnlocked[p.label];if(!unlocked)return `<div class="solution-pane"><div class="solution-lock"><div class="solution-icon">${icon('book')}</div><h2>${t('solutionLocked')}</h2><p>${t('solutionLockedBody')}</p><button class="btn primary" onclick="unlockSolution('${esc(p.label)}')">${t('revealSolution')}</button></div></div>`;const code=state.codes[p.label]??defaultCode();return `<div class="solution-pane"><div class="solution-head"><div><h2>${t('solutionResources')}</h2><p>${t('solutionHint')}</p></div></div><div class="solution-links"><button class="solution-link" onclick="window.open('${esc(editorialUrlOf(p))}','_blank','noopener')"><strong>${t('officialEditorial')}</strong><span>AtCoder ${icon('external')}</span></button><button class="solution-link" onclick="window.open('${esc(acceptedSubmissionsUrlOf(p))}','_blank','noopener')"><strong>${t('acceptedSolutions')}</strong><span>AtCoder ${icon('external')}</span></button>${state.atcoderUser?`<button class="solution-link" onclick="window.open('${esc(mySubmissionsUrlOf(p))}','_blank','noopener')"><strong>${t('mySubmissions')}</strong><span>@${esc(state.atcoderUser)} ${icon('external')}</span></button>`:''}</div><div class="solution-code-head"><strong>${t('currentCode')}</strong><button class="btn compact" onclick="copyCurrentCode('${esc(p.label)}')">${t('copyCode')}</button></div><pre class="solution-code">${esc(code)}</pre></div>`}
function unlockSolution(label){if(!confirm(t('revealConfirm')))return;state.solutionUnlocked[label]=true;saveState();render()}
async function copyCurrentCode(label){try{await navigator.clipboard.writeText(state.codes[label]??defaultCode());toast(t('copied'))}catch{const ta=document.createElement('textarea');ta.value=state.codes[label]??defaultCode();document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast(t('copied'))}}

function defaultCode(){return ''}
function renderCode(p){return `<textarea id="codeEditor" class="editor" spellcheck="false" aria-label="${t('code')} · Python 3">${esc(state.codes[p.label]??defaultCode())}</textarea><div class="editor-foot"><div class="editor-foot-main"><button class="btn compact" onclick="resetCode('${esc(p.label)}')">${t('reset')}</button><button class="btn compact primary" onclick="runActiveCase('${esc(p.label)}')">${icon('play')}${t('run')} <span class="kbd">⌘↵</span></button></div><span class="hint">${t('officialJudgeNote')}</span></div>`}
function casesFor(label){
  if(!Array.isArray(state.testCases[label])||!state.testCases[label].length){
    const samples=statementFor(label,state.statementLang)?.samples||statementFor(label,'ja')?.samples||[];
    state.testCases[label]=samples.length?samples.map((sample,i)=>({id:`sample-${Date.now()}-${i}`,input:String(sample.input??''),expected:String(sample.expected??sample.output??''),hasExpected:true})):[{id:crypto.randomUUID?.()||String(Date.now()),input:'',expected:'',hasExpected:false}];
  }
  return state.testCases[label];
}
function renderTests(p){const cs=casesFor(p.label);return `<div class="test-area"><div class="test-toolbar"><b>${t('tests')} · ${cs.length}</b><div class="inline-actions"><button class="btn compact" onclick="loadOfficialSamples('${esc(p.label)}')">${t('loadSamples')}</button><button class="btn compact" onclick="addTestCase('${esc(p.label)}')">+ ${t('addCase')}</button><button class="btn compact primary" onclick="runAllCases('${esc(p.label)}')">${t('runAll')}</button></div></div>${cs.map((c,i)=>renderCase(p.label,c,i)).join('')}</div>`}
function loadOfficialSamples(label){
  const entry=statementFor(label,state.statementLang)||statementFor(label,'ja');
  const samples=entry?.samples||[];
  if(!samples.length){toast(t('noSamples'));return}
  const imported=samples.map((x,i)=>({id:`sample-${Date.now()}-${i}`,input:String(x.input??''),expected:String(x.expected??x.output??''),hasExpected:true}));
  const existing=casesFor(label),blank=existing.length===1&&!existing[0].input&&!existing[0].expected;
  if(blank)state.testCases[label]=imported;
  else{const seen=new Set(existing.map(c=>JSON.stringify([c.input,c.expected])));state.testCases[label]=[...existing,...imported.filter(c=>!seen.has(JSON.stringify([c.input,c.expected])))];}
  saveState();render();toast(`${t('samplesLoaded')} · ${samples.length}`);
}
function renderCase(label,c,i){return `<div class="case" data-case="${esc(c.id)}"><div class="case-head"><strong>${t('case')} ${i+1}</strong><span id="verdict-${esc(c.id)}" class="verdict"></span><span class="spacer"></span><button class="btn sm ghost" onclick="runCase('${esc(label)}','${esc(c.id)}')">${t('run')}</button>${i?`<button class="btn sm ghost danger" onclick="removeTestCase('${esc(label)}','${esc(c.id)}')">${t('remove')}</button>`:''}</div><div class="case-grid"><div class="case-field"><label>${t('input')}</label><textarea data-role="input" data-id="${esc(c.id)}">${esc(c.input||'')}</textarea></div><div class="case-field"><label class="expected-label"><input type="checkbox" data-role="hasExpected" data-id="${esc(c.id)}" ${c.hasExpected?'checked':''}> ${t('compareOutput')}</label><textarea data-role="expected" data-id="${esc(c.id)}">${esc(c.expected||'')}</textarea></div></div><div class="case-output"><label class="muted" style="font-size:9.5px">${t('actual')}</label><pre id="out-${esc(c.id)}"></pre></div></div>`}
function renderHistory(p){const a=formalAttempts(p.label).slice().sort((x,y)=>y.time-x.time);if(!a.length)return `<div class="empty">${t('noHistory')}</div>`;return `<div class="history-pane"><table class="history-table"><thead><tr><th>${t('result')}</th><th>${t('date')}</th><th>${t('source')}</th><th>${t('language')}</th><th>${t('runtime')}</th></tr></thead><tbody>${a.map(x=>`<tr><td><span class="history-result ${esc(x.result)}">${esc(x.result)}</span></td><td>${fmtDate(x.time)}</td><td>${sourceName(x.source)}</td><td>${esc(x.language||'—')}</td><td>${x.executionTime!=null?esc(String(x.executionTime))+' ms':'—'}</td></tr>`).join('')}</tbody></table></div>`}
function setStatementLang(value){
  state.statementLang=['zh','ja','en'].includes(value)?value:'zh';saveState();
  const problem=route.path.startsWith('/problem/')?problemMap.get(decodeRouteLabel(route.path.split('/').pop())):null,article=document.querySelector('.statement-pane .statement');
  if(!problem||!article){render();return}
  const old=document.getElementById('officialStatement');if(old)window.MathJax?.typesetClear?.([old]);article.outerHTML=renderStatement(problem);
  document.querySelectorAll('.subtabs [data-language]').forEach(button=>{const selected=button.dataset.language===state.statementLang;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected))});
  typesetStatement();
}
function setWorkTab(v){state.workTab=v;saveState();render()}
function openOfficial(label){const p=problemMap.get(label);if(p)window.open(urlOf(p,state.statementLang==='en'?'en':'ja'),'_blank','noopener')}
function toggleStar(label){state.stars[label]=!state.stars[label];if(!state.stars[label])delete state.stars[label];saveState();toast(state.stars[label]?t('starAdded'):t('starRemoved'));render()}
function resetCode(label){if(!confirm(t('reset')+'?'))return;state.codes[label]=defaultCode();saveState();render()}
function recordManual(label,result){state.attempts.push({id:`manual-${Date.now()}-${Math.random().toString(36).slice(2)}`,problemKey:label,result,time:Date.now(),source:'manual'});saveState();toast(`${t('manualRecorded')} · ${result}`);render()}
function addTestCase(label){const a=casesFor(label);a.push({id:crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`,input:'',expected:'',hasExpected:false});saveState();render()}
function removeTestCase(label,id){const a=casesFor(label);state.testCases[label]=a.filter(x=>x.id!==id);saveState();render()}
function persistCaseEditors(label){document.querySelectorAll('[data-role="input"],[data-role="expected"],[data-role="hasExpected"]').forEach(el=>{const c=casesFor(label).find(x=>x.id===el.dataset.id);if(c)c[el.dataset.role]=el.dataset.role==='hasExpected'?el.checked:el.value});saveState()}
function normalizeOutput(s){return String(s??'').replace(/\r\n/g,'\n').replace(/[ \t]+$/gm,'').replace(/\n+$/,'')}

function makeRunnerWorker(){if(window.CI_WORKER_SOURCE){const u=URL.createObjectURL(new Blob([window.CI_WORKER_SOURCE],{type:'text/javascript'}));const w=new Worker(u);setTimeout(()=>URL.revokeObjectURL(u),1000);return w}return new Worker('./pyworker.js')}
function ensureRunner(){
  if(runnerWorker&&runnerReadyPromise)return runnerReadyPromise;
  const stateEl=document.getElementById('runtimeState');if(stateEl)stateEl.textContent=t('runtimeLoading');
  runnerWorker=makeRunnerWorker();
  runnerReadyPromise=new Promise((resolve,reject)=>{runnerReadyResolve=resolve;runnerReadyReject=reject});
  runnerWorker.onmessage=e=>{const d=e.data||{};if(d.type==='ready'){runnerReadyResolve?.();const el=document.getElementById('runtimeState');if(el)el.textContent=t('runtimeReady');return}if(d.type==='initError'){runnerReadyReject?.(new Error(d.error));resetRunner();return}if(d.type==='result'){const p=runnerPending.get(d.id);if(p){clearTimeout(p.timer);runnerPending.delete(d.id);p.resolve(d)}}};
  runnerWorker.onerror=e=>{runnerReadyReject?.(new Error(e.message||'Worker error'));for(const p of runnerPending.values()){clearTimeout(p.timer);p.reject(new Error(e.message||'Worker error'))}runnerPending.clear();resetRunner()};
  runnerWorker.postMessage({type:'init'});
  const initTimeout=setTimeout(()=>{runnerReadyReject?.(new Error('Python runtime load timeout'));resetRunner()},60000);
  runnerReadyPromise=runnerReadyPromise.finally(()=>clearTimeout(initTimeout));
  return runnerReadyPromise;
}
function resetRunner(){runnerReadyReject?.(new Error('Runtime reset'));try{runnerWorker?.terminate()}catch{}for(const pending of runnerPending.values()){clearTimeout(pending.timer);pending.reject(new Error('Runtime reset'))}runnerPending.clear();runnerWorker=null;runnerReadyPromise=null;runnerReadyResolve=null;runnerReadyReject=null}
function cancelPythonRuns(){window.PlumeAcademy?.cancel();runBatchGeneration++;runnerBusy=false;resetRunner()}
async function executePython(code,input,timeoutMs=6000){resetRunner();await ensureRunner();if(!runnerWorker)throw new Error('runtime unavailable');const id=++runnerSeq;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{runnerPending.delete(id);resetRunner();reject(Object.assign(new Error('TLE'),{code:'TLE'}))},timeoutMs);runnerPending.set(id,{resolve,reject,timer});runnerWorker.postMessage({type:'run',id,code,input})})}
function currentCode(label){const el=document.getElementById('codeEditor');if(el){state.codes[label]=el.value;saveState();return el.value}return state.codes[label]??defaultCode()}
async function runActiveCase(label){const p=problemMap.get(label);if(!p)return;if(runnerBusy){toast(t('runtimeBusy'));return}const generation=runBatchGeneration;state.workTab='tests';saveState();render();setTimeout(()=>{if(generation===runBatchGeneration&&route.path===`/problem/${encodeURIComponent(label)}`)runCase(label,casesFor(label)[0].id)},0)}
async function runCase(label,id,inBatch=false,snapshot=null){
  if(runnerBusy&&!inBatch){toast(t('runtimeBusy'));return}
  if(!inBatch)runnerBusy=true;
  const generation=snapshot?.generation??runBatchGeneration;
  if(!snapshot)persistCaseEditors(label);const c=snapshot?.test||casesFor(label).find(x=>x.id===id);
  if(!c){if(!inBatch)runnerBusy=false;return}
  const visible=route.path===`/problem/${encodeURIComponent(label)}`,verdict=visible?document.getElementById(`verdict-${id}`):null,out=visible?document.getElementById(`out-${id}`):null;
  if(verdict){verdict.className='verdict';verdict.textContent='…'}if(out){out.className='';out.textContent=''}
  try{
    const result=await executePython(snapshot?.code??state.codes[label]??defaultCode(),c.input||'');
    if(generation!==runBatchGeneration)return;
    if(result.status!=='OK'){if(verdict){verdict.className='verdict re';verdict.textContent=result.status==='OLE'?'OLE':'RE'}if(out){out.className='err';out.textContent=(result.stderr||result.stdout||t('compileError')).trim()}return}
    const actual=result.stdout??'';if(out)out.textContent=actual;
    if(c.hasExpected){const ok=normalizeOutput(actual)===normalizeOutput(c.expected);if(verdict){verdict.className=`verdict ${ok?'ac':'wa'}`;verdict.textContent=t(ok?'passed':'wrongAnswer')}}else if(verdict){verdict.className='verdict';verdict.textContent=t('noExpected')}
  }catch(error){if(generation!==runBatchGeneration)return;if(verdict){verdict.className='verdict tle';verdict.textContent=error.code==='TLE'?'TLE':'ERR'}if(out){out.className='err';out.textContent=error.code==='TLE'?t('timeout'):String(error.message||error)}const el=document.getElementById('runtimeState');if(el&&error.code!=='TLE')el.textContent=t('runtimeError')}
  finally{if(!inBatch&&generation===runBatchGeneration)runnerBusy=false}
}
async function runAllCases(label){
  if(runnerBusy){toast(t('runtimeBusy'));return}
  runnerBusy=true;const generation=runBatchGeneration;
  try{persistCaseEditors(label);const code=state.codes[label]??defaultCode(),cases=casesFor(label).map(test=>({...test}));for(const test of cases){if(generation!==runBatchGeneration)break;await runCase(label,test.id,true,{code,test,generation})}}finally{if(generation===runBatchGeneration)runnerBusy=false}
}

function studyRecommendations(){
  const uns=problems.filter(p=>!statusOf(p).solved);if(!uns.length)return [];
  return uns.slice().sort((a,b)=>{
    // Keep prerequisites ahead of harder reviews; prioritize saved/failed tasks within a level.
    const sa=statusOf(a),sb=statusOf(b),priA=state.stars[a.label]?0:sa.errors?1:2,priB=state.stars[b.label]?0:sb.errors?1:2;
    return a.level-b.level||priA-priB||a.order-b.order;
  }).slice(0,10);
}
function renderStudy(){
  const recommended=studyRecommendations(),today=solvedToday(),goal=state.dailyGoal;
  return `<div class="page-head"><div><h1>${t('study')}</h1><p>${t('planIntro')}</p></div></div><div class="study-grid"><section class="recommendations-panel"><div class="section-heading"><h2>${t('nextProblems')}</h2><span>${t('practiceCount',{count:recommended.length})}</span></div><div class="recommendation-list">${recommended.length?recommended.map(recommendationRow).join(''):`<div class="empty-state"><h2>${t('studyEmptyTitle')}</h2><p>${t('studyEmptyBody')}</p><button class="btn" onclick="go('/problems')">${t('viewLibrary')}</button></div>`}</div></section><div class="study-aside"><section class="goal-card"><div class="section-heading"><h2>${t('dailyTarget')}</h2></div><div class="goal-value">${today}<span>/ ${goal}</span></div><div class="goal-progress progress"><i style="width:${Math.min(100,today/goal*100)}%"></i></div><div class="goal-row"><label for="dailyGoal">${t('dailyGoal')}</label><input id="dailyGoal" type="number" min="1" max="50" value="${goal}"><button class="btn compact" onclick="saveDailyGoal()">${t('saveGoal')}</button></div></section><section class="learning-path"><div class="section-heading"><h2>${t('levelProgress')}</h2></div>${renderLearningPath()}</section></div></div>`;
}
function saveDailyGoal(){state.dailyGoal=clamp(parseInt(document.getElementById('dailyGoal')?.value||'5',10),1,50);saveState();toast(t('goalSaved'));render()}

function poolLevels(mode){if(mode==='foundation')return [1,2,3];if(mode==='hard')return [3,4,5];if(mode==='mixed')return [1,2,3,4,5];return [2,3,4]}
function randomPick(arr,n){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)}
function mockHistoryKey(m){return m.id||`legacy-${m.startedAt}`}
function mockHistoryEntries(){const seen=new Set();return [...state.mockHistory,...(state.mock?.finished?[state.mock]:[])].filter(m=>m.finished).sort((a,b)=>b.startedAt-a.startedAt).filter(m=>{const key=mockHistoryKey(m);if(seen.has(key))return false;seen.add(key);return true})}
function mockHistoryPath(m){return '/mock?'+new URLSearchParams({history:mockHistoryKey(m)}).toString()}
function mockDate(m){return new Intl.DateTimeFormat(langLocale(),{dateStyle:'medium',timeStyle:'short'}).format(new Date(m.startedAt))}
function mockHistoryButton(){return `<button class="btn" onclick="go('/mock?history')">${icon('calendar')}${t('viewMockHistory')}</button>`}
function mockReturnButton(){return `<button class="btn" onclick="go('/mock')">${icon('left')}${t(state.mock?'returnCurrentMock':'returnMockSetup')}</button>`}
function renderMockHistory(limit=0,heading=true){const entries=mockHistoryEntries(),visible=limit?entries.slice(0,limit):entries;return `<section class="mock-history-panel">${heading?`<div class="section-heading"><h2>${t('mockHistory')}</h2>${limit&&entries.length>limit?`<button class="text-button" onclick="go('/mock?history')">${t('viewAllRecords')}${icon('right')}</button>`:''}</div>`:''}${visible.length?`<div class="mock-history-list">${visible.map(m=>`<button class="mock-history-row" onclick="go('${esc(mockHistoryPath(m))}')"><span class="mock-history-date"><strong>${esc(mockDate(m))}</strong><small>${t(m.scoreMode==='official'?'officialScore':'ci300')}</small></span><span class="mock-history-score">${mockScore(m)}<small> / ${mockMax(m)}</small></span><span class="mock-history-completed">${t('mockCompleted',{done:m.labels.filter(l=>mockSolved(m,l)).length,total:m.labels.length})}${icon('right')}</span></button>`).join('')}</div>`:`<div class="empty-state"><h3>${t('mockHistoryEmpty')}</h3><p>${t('mockHistoryEmptyBody')}</p></div>`}</section>`}
function renderMock(){
  if(route.params.has('history')){const id=route.params.get('history');if(id){const archived=mockHistoryEntries().find(m=>mockHistoryKey(m)===id);if(archived)return renderMockSummary(archived,true);return `<div class="page-head"><div><h1>${t('mockHistoryMissing')}</h1><p>${t('mockHistoryMissingBody')}</p></div></div><div class="mock-history-actions inline-actions">${mockHistoryButton()}${mockReturnButton()}</div>`}return `<div class="page-head"><div><h1>${t('mockHistory')}</h1><p>${t('mockHistoryIntro')}</p></div>${mockReturnButton()}</div>${renderMockHistory(0,false)}`}
  const m=state.mock;if(!m)return renderMockSetup()+renderMockHistory(3);if(m.finished)return renderMockSummary(m);return renderMockActive(m)
}
function renderMockSetup(){return `<div class="page-head"><div><h1>${t('mockTitle')}</h1></div></div><div class="card mock-setup"><div class="form-row"><div><label>${t('mockPool')}</label></div><div><select id="mockPool" class="select"><option value="core">${t('mockCore')}</option><option value="foundation">${t('mockFoundation')}</option><option value="hard">${t('mockHard')}</option><option value="mixed">${t('mockMixed')}</option></select></div></div><div class="form-row"><div><label>${t('mockScoreMode')}</label></div><div><select id="mockScoreMode" class="select"><option value="ci300">${t('ci300')}</option><option value="official">${t('officialScore')}</option></select><div class="help">${t('mockSub')}</div></div></div><div style="padding-top:15px"><button class="btn primary" onclick="startMock()">${t('startMock')}</button></div></div>`}
function startMock(){const mode=document.getElementById('mockPool')?.value||'core',scoreMode=document.getElementById('mockScoreMode')?.value||'ci300',levels=poolLevels(mode);let pool=problems.filter(p=>levels.includes(p.level)&&!statusOf(p).solved);if(pool.length<3)pool=problems.filter(p=>levels.includes(p.level));const picked=randomPick(pool,3);if(picked.length<3){toast(t('noProblems'));return}if(scoreMode==='official'&&picked.some(p=>pointOf(p)==null)){toast(t('officialUnavailable'));return}state.mock={id:`mock-${Date.now()}`,atcoderUser:state.atcoderUser,startedAt:Date.now(),durationMs:150*60*1000,labels:picked.map(p=>p.label),pool:mode,scoreMode,points:Object.fromEntries(picked.map(p=>[p.label,scoreMode==='official'?pointOf(p):100])),attempts:[],finished:false,finishedAt:0};saveState();render();startMockTimer()}
function eligibleMockAttempts(m){const end=Math.min(m.startedAt+m.durationMs,m.finishedAt||Infinity);return m.attempts.filter(a=>m.labels.includes(a.problemKey)&&a.time>=m.startedAt&&a.time<=end)}
function mockSolved(m,label){return eligibleMockAttempts(m).some(a=>a.problemKey===label&&a.result==='AC')}
function mockPoint(m,label){return m.scoreMode==='official'?(m.points?.[label]??0):100}
function mockScore(m){return m.labels.reduce((sum,label)=>sum+(mockSolved(m,label)?mockPoint(m,label):0),0)}
function mockMax(m){return m.labels.reduce((sum,label)=>sum+mockPoint(m,label),0)}
function mockPenalty(m){
  let lastAcMs=0,wrongs=0;
  for(const label of m.labels){
    const attempts=eligibleMockAttempts(m).filter(a=>a.problemKey===label).sort((a,b)=>a.time-b.time),acIndex=attempts.findIndex(a=>a.result==='AC');
    if(acIndex<0)continue;lastAcMs=Math.max(lastAcMs,attempts[acIndex].time-m.startedAt);
    wrongs+=attempts.slice(0,acIndex).filter(a=>PENALTY_RESULTS.has(a.result)).length;
  }
  return {penaltyMs:lastAcMs+wrongs*300000,lastAcMs,wrongs};
}
function renderMockActive(m){const left=Math.max(0,m.durationMs-(Date.now()-m.startedAt)),pen=mockPenalty(m);return `<div class="page-head"><div><h1>${t('mockTitle')}</h1><p>${t('mockSub')}</p></div>${mockHistoryButton()}</div><div class="card mock-top"><div id="mockTimer" class="timer">${formatTime(left)}</div><div class="mock-score"><b>${mockScore(m)} / ${mockMax(m)}</b>${t('score')} · ${pen.wrongs} ${t('wrongPenalty')}</div><span class="spacer"></span>${state.atcoderUser?`<button class="btn sm" onclick="syncAtCoder(false,true,true)">${t('syncVerdicts')}</button>`:''}<button class="btn sm danger" onclick="finishMock()">${t('endMock')}</button></div><div class="mock-list">${m.labels.map((l,i)=>{const p=problemMap.get(l),sol=mockSolved(m,l),pt=mockPoint(m,l);return `<div class="card mock-problem"><div class="letter">${String.fromCharCode(65+i)}</div><div><b>${esc(l)}${titleOf(p)?` · ${esc(titleOf(p))}`:''}</b><small>L${p.level}${pt!=null?` · ${pt} pts`:''}</small></div><div class="mock-controls">${sol?`<span class="status ac"><i></i>AC</span>`:`<button class="btn sm" onclick="go('/problem/${encodeURIComponent(l)}')">${t('open')}</button><button class="btn sm danger" onclick="mockAttempt('${esc(l)}','WA')">WA</button><button class="btn sm" onclick="mockAttempt('${esc(l)}','CE')">CE</button><button class="btn sm good" onclick="mockAttempt('${esc(l)}','AC')">AC</button>`}</div></div>`}).join('')}</div>`}
function mockAttempt(label,result,source='manual',time=Date.now(),id=''){
  const m=state.mock;if(!m||m.finished||!m.labels.includes(label)||!VALID_RESULTS.has(result)||!Number.isFinite(time))return;
  if(time<m.startedAt||time>m.startedAt+m.durationMs){if(Date.now()>=m.startedAt+m.durationMs)finishMock();return}
  if(source==='manual'&&Date.now()>=m.startedAt+m.durationMs){finishMock();return}
  if(mockSolved(m,label))return;
  m.attempts.push({id:id||`mock-${Date.now()}-${Math.random()}`,problemKey:label,result,time,source});saveState();render();startMockTimer();
}
function hydrateMockFromAtCoder(){
  const account=state.atcoderUser;
  const official=state.attempts.filter(a=>a.source==='atcoder'&&(!a.atcoderUser||a.atcoderUser===account));
  const reconcile=m=>{
    if(!m)return;
    if(!m.atcoderUser)m.atcoderUser=account;
    if(m.atcoderUser!==account)return;
    const end=Math.min(m.startedAt+m.durationMs,m.finishedAt||Infinity);
    const byId=new Map(m.attempts.filter(a=>a.source==='atcoder').map(a=>[String(a.id),a]));
    for(const a of official){
      if(a.time<m.startedAt||a.time>end||!m.labels.includes(a.problemKey))continue;
      byId.set(String(a.id),{...a,atcoderUser:account});
    }
    m.attempts=[...m.attempts.filter(a=>a.source!=='atcoder'),...byId.values()].sort((a,b)=>a.time-b.time);
  };
  reconcile(state.mock);
  for(const old of state.mockHistory)reconcile(old);
  if(state.mock?.finished){const index=state.mockHistory.findIndex(old=>old.id===state.mock.id);if(index>=0)state.mockHistory[index]=structuredClone(state.mock)}
  saveState();render();if(state.mock&&!state.mock.finished)startMockTimer();
}
function startMockTimer(){if(!state.mock||state.mock.finished)return;clearInterval(startMockTimer.i);const tick=()=>{if(!state.mock||state.mock.finished){clearInterval(startMockTimer.i);return}const left=Math.max(0,state.mock.durationMs-(Date.now()-state.mock.startedAt));const a=document.getElementById('mockTimer'),b=document.getElementById('globalMockTimer');if(a)a.textContent=formatTime(left);if(b)b.textContent=formatTime(left);if(left<=0)finishMock()};tick();startMockTimer.i=setInterval(tick,1000)}
function finishMock(){const m=state.mock;if(!m||m.finished)return;m.finished=true;m.finishedAt=Math.min(Date.now(),m.startedAt+m.durationMs);state.mockHistory.unshift(structuredClone(m));state.mockHistory=state.mockHistory.slice(0,30);saveState();clearInterval(startMockTimer.i);render()}
function renderMockResultProblems(m){return `<div class="mock-list">${m.labels.map((label,index)=>{const p=problemMap.get(label),solved=mockSolved(m,label);return `<div class="card mock-problem"><div class="letter">${String.fromCharCode(65+index)}</div><div class="mock-result-info"><b>${esc(label)}${titleOf(p)?` · ${esc(titleOf(p))}`:''}</b><small>${solved?'AC':t('mockNotCompleted')} · ${t('score')}: <span class="mock-result-points">${solved?mockPoint(m,label):0} / ${mockPoint(m,label)}</span></small></div><button class="btn sm" onclick="go('/problem/${encodeURIComponent(label)}')">${t('practiceAgain')}${icon('right')}</button></div>`}).join('')}</div>`}
function renderMockSummary(m,archived=false){const pen=mockPenalty(m),elapsed=Math.min(m.durationMs,(m.finishedAt||Date.now())-m.startedAt);return `<div class="page-head"><div><h1>${t('mockResult')}</h1><p>${archived?t('archivedMock')+' · ':''}${esc(mockDate(m))} · ${t(m.scoreMode==='official'?'officialScore':'ci300')}</p></div>${archived?mockReturnButton():mockHistoryButton()}</div>${archived?`<div class="mock-history-actions inline-actions"><button class="text-button" onclick="go('/mock?history')">${icon('left')}${t('backToMockHistory')}</button></div>`:''}<div class="card mock-summary"><div class="score">${mockScore(m)} <span class="muted" style="font-size:19px">/ ${mockMax(m)}</span></div><div class="meta">${t('mockCompleted',{done:m.labels.filter(l=>mockSolved(m,l)).length,total:m.labels.length})} · ${pen.wrongs} ${t('wrongPenalty')}<br>${t('elapsed')}: ${formatTime(elapsed)} · ${t('penaltyTime')}: ${formatTime(pen.penaltyMs)}</div>${archived?'':`<div class="inline-actions" style="margin-top:17px">${state.atcoderUser?`<button class="btn" onclick="syncAtCoder(false,true,true)">${t('syncVerdicts')}</button>`:''}<button class="btn" onclick="resetMock()">${t('newMock')}</button></div>`}</div>${renderMockResultProblems(m)}`}

function resetMock(){state.mock=null;saveState();render()}
function formatTime(ms){const s=Math.max(0,Math.ceil(ms/1000)),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=s%60;return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`}

function reviewExcerpt(p){if(state.notes[p.label])return state.notes[p.label];const html=statementFor(p.label,state.uiLang)?.html;if(!html)return titleOf(p);const doc=new DOMParser().parseFromString(html,'text/html');return (doc.querySelector('section p')?.textContent||titleOf(p)).replace(/\s+/g,' ').trim()}
function renderReview(){
  const items=reviewProblems().sort((a,b)=>{const aa=statusOf(a),bb=statusOf(b);return (+aa.solved-+bb.solved)||bb.errors-aa.errors||a.level-b.level||a.order-b.order});
  return `<div class="page-head"><div><h1>${t('reviewTitle')}</h1><p>${t('reviewSub')}</p></div><span class="library-total">${t('practiceCount',{count:items.length})}</span></div>${items.length?`<div class="review-list">${items.map(p=>{const status=statusOf(p);return `<button class="review-row" onclick="go('/problem/${encodeURIComponent(p.label)}')"><span class="review-marker ${status.solved?'solved':''}">${icon(status.solved?'check':'bookmark')}</span><span class="review-copy"><span class="review-heading"><strong>${esc(p.label)}</strong><span>${esc(titleOf(p))}</span></span><span class="review-excerpt">${esc(reviewExcerpt(p).slice(0,130))}${reviewExcerpt(p).length>130?'…':''}</span><span class="review-meta"><span>L${p.level}</span><span>${status.errors} ${t('errors')}</span><span>${t(status.solved?'solvedLater':'stillUnsolved')}</span></span></span>${icon('right','row-chevron')}</button>`}).join('')}</div>`:`<div class="empty-state review-empty">${icon('bookmark')}<h2>${t('reviewEmptyTitle')}</h2><p>${t('reviewEmptyBody')}</p><button class="btn" onclick="go('/problems')">${t('viewLibrary')}</button></div>`}`;
}

function saveUserAndSync(){
  const next=((document.getElementById('setting-atcoderUser')||document.getElementById('atcoderUser'))?.value||'').trim();
  if(!/^[A-Za-z0-9_]{0,40}$/.test(next)){toast(t('invalidHandle'));return}
  const changed=next!==state.atcoderUser,oldAccount=state.atcoderUser;
  const patch={atcoderUser:next,autoSync:!!(document.getElementById('setting-autoSync')||document.getElementById('autoSync'))?.checked,dailyGoal:clamp(parseInt(document.getElementById('dailyGoalSetting')?.value||String(state.dailyGoal),10),1,50)};
  if(changed){
    const keepAccount=mock=>{if(!mock)return mock;const copy=structuredClone(mock);if(oldAccount&&!copy.atcoderUser)copy.atcoderUser=oldAccount;return copy};
    Object.assign(patch,{attempts:state.attempts.filter(a=>a.source!=='atcoder'),syncCursor:0,lastSync:0,mock:keepAccount(state.mock),mockHistory:state.mockHistory.map(keepAccount)});
  }
  if(!storeSettings(patch))return;
  if(changed)invalidateAtCoderSync();
  accountHandleDraft=null;render();if(state.atcoderUser)syncAtCoder(false,true);
}
function exportData(){
  const content=JSON.stringify({app:PRODUCT_NAME,schema:DATA_SCHEMA,exportedAt:new Date().toISOString(),state},null,2),filename=`plume-backup-${localDay()}.json`;
  if(window.webkit?.messageHandlers?.saveFile){window.webkit.messageHandlers.saveFile.postMessage({filename,content,mime:'application/json'});return}
  const url=URL.createObjectURL(new Blob([content],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
async function importData(file){
  if(!file)return;
  try{
    if(file.size>25*1024*1024)throw new Error('Backup too large');
    const payload=JSON.parse(await file.text());
    if(payload?.schema>DATA_SCHEMA||payload?.app&&!['CI Practice',PRODUCT_NAME].includes(payload.app))throw new Error('Unsupported backup');
    const incoming=payload.state||payload;
    if(!incoming||typeof incoming!=='object'||!Array.isArray(incoming.attempts))throw new Error('Not a practice backup');
    const next=normalizeState(incoming);
    if(!confirm(t('importConfirm')))return;
    localStorage.setItem(STORAGE_KEY,JSON.stringify(next));
    window.CIEditor?.clearSessions?.();
    invalidateAtCoderSync();cancelPythonRuns();accountHandleDraft=null;state=next;clearInterval(startMockTimer.i);applyAppearance();render();toast(t('backupImported'));
  }catch(error){console.warn(error);toast(t('invalidBackup'))}
}
function resetAll(){
  if(!confirm(t('resetConfirm')))return;
  // Remove the fallback first so a failed current-key deletion cannot revive old progress.
  try{localStorage.removeItem(LEGACY_KEY);localStorage.removeItem(STORAGE_KEY)}catch{toast(t('resetFailed'));return}
  window.CIEditor?.clearSessions?.();
  invalidateAtCoderSync();accountHandleDraft=null;state=structuredClone(DEFAULT_STATE);clearInterval(startMockTimer.i);cancelPythonRuns();applyAppearance();render();toast(t('resetDone'));
}

async function syncAtCoder(full=false,userInitiated=true,forMock=false){
  if(!state.atcoderUser){go('/settings?section=account');return}
  const owner=state,account=state.atcoderUser,generation=atcoderSyncGeneration;
  const current=()=>state===owner&&state.atcoderUser===account&&atcoderSyncGeneration===generation;
  if(atcoderSyncFlight&&atcoderSyncFlight.owner===owner&&atcoderSyncFlight.account===account&&atcoderSyncFlight.generation===generation){
    const flight=atcoderSyncFlight;
    await flight.promise;
    if(full&&!flight.full&&current())return syncAtCoder(true,userInitiated,forMock);
    return;
  }
  const controller=typeof AbortController==='function'?new AbortController():null;
  const flight={owner,account,generation,full,controller,promise:null};
  atcoderSyncFlight=flight;
  flight.promise=(async()=>{
    try{
      // Revisit a recent interval so a delayed index entry or a recent rejudge can be updated.
      let from=full?0:Math.max(0,(owner.syncCursor||0)-3600),newCount=0,maxEpoch=Math.max(0,from-1),pages=0;
      while(pages<100){
        const url=`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${encodeURIComponent(account)}&from_second=${from}`;
        const cooldown=1100-(Date.now()-atcoderLastRequestAt);
        if(cooldown>0){await sleep(cooldown);if(!current())return}
        atcoderLastRequestAt=Date.now();
        const r=await apiFetch(url,{cache:'no-store',...(controller?{signal:controller.signal}:{})});
        if(!current())return;
        if(!r.ok)throw new Error(`HTTP ${r.status}`);
        const arr=await r.json();if(!current())return;
        if(!Array.isArray(arr))throw new Error('Unexpected API response');if(!arr.length)break;
        // Use current data, not a snapshot taken before the network request.
        const stored=new Map(owner.attempts.filter(a=>a.source==='atcoder').map(a=>[String(a.id),a]));
        for(const sub of arr){
          const epoch=Number(sub.epoch_second);if(!Number.isFinite(epoch)||epoch<0)continue;
          maxEpoch=Math.max(maxEpoch,epoch);
          if(!VALID_RESULTS.has(sub.result))continue;
          const p=matchSubmission(sub);if(!p)continue;
          const record={id:String(sub.id),problemKey:p.label,result:sub.result,time:epoch*1000,source:'atcoder',atcoderUser:account,language:sub.language||'',executionTime:sub.execution_time??null};
          const existing=stored.get(record.id);
          if(existing)Object.assign(existing,record);
          else{owner.attempts.push(record);stored.set(record.id,record);newCount++}
        }
        pages++;if(arr.length<500)break;
        const next=maxEpoch+1;if(next<=from)throw new Error('Submission cursor did not advance');
        from=next;await sleep(1100);if(!current())return;
      }
      if(!current())return;
      owner.syncCursor=Math.max(owner.syncCursor||0,maxEpoch+1);owner.lastSync=Date.now();
      saveState();hydrateMockFromAtCoder();
      if(userInitiated)toast(`${t('syncDone')} · ${newCount} ${t('newMatching')}`);
    }catch(e){
      if(!current()||e.name==='AbortError')return;
      console.warn(e);if(userInitiated)toast(`${t('syncFailed')} · ${e.message||e}`);render();
    }finally{if(atcoderSyncFlight===flight)atcoderSyncFlight=null}
  })();
  return flight.promise;
}
function matchSubmission(sub){for(const p of problems){const id=p.problemId;if(id&&sub.problem_id===id)return p}return null}

function bindProblemSplitter(){
  const el=document.getElementById('problemSplitter'),shell=document.querySelector('.problem-shell');if(!el||!shell||el.dataset.bound==='1')return;
  el.dataset.bound='1';
  const apply=x=>{const r=shell.getBoundingClientRect(),pct=clamp((x-r.left)/r.width*100,34,66);state.splitRatio=Math.round(pct*10)/10;shell.style.setProperty('--split',state.splitRatio+'%')};
  el.addEventListener('pointerdown',e=>{if(innerWidth<=900)return;el.setPointerCapture?.(e.pointerId);document.body.classList.add('resizing');apply(e.clientX)});
  el.addEventListener('pointermove',e=>{if(!el.hasPointerCapture?.(e.pointerId))return;apply(e.clientX)});
  const done=e=>{if(el.hasPointerCapture?.(e.pointerId))el.releasePointerCapture?.(e.pointerId);document.body.classList.remove('resizing');saveState()};el.addEventListener('pointerup',done);el.addEventListener('pointercancel',done);
  el.addEventListener('keydown',e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;e.preventDefault();state.splitRatio=clamp((+state.splitRatio||47)+(e.key==='ArrowRight'?2:-2),34,66);shell.style.setProperty('--split',state.splitRatio+'%');saveState()});
}

function bindAfterRender(){
  if(route.path==='/problems'){
    document.getElementById('problemSearch')?.addEventListener('input',()=>{clearTimeout(setProblemQuery.timer);setProblemQuery.timer=setTimeout(setProblemQuery,180)});['levelFilter','statusFilter','sortFilter'].forEach(id=>document.getElementById(id)?.addEventListener('change',setProblemQuery));
  }
  if(route.path.startsWith('/problem/')){
    const label=decodeRouteLabel(route.path.split('/').pop()),code=document.getElementById('codeEditor'),note=document.getElementById('problemNote');
    code?.addEventListener('input',()=>{state.codes[label]=code.value;saveState()});
    code?.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();runActiveCase(label)}if(e.key==='Tab'){e.preventDefault();const s=code.selectionStart,en=code.selectionEnd;code.setRangeText(' '.repeat(state.preferences.tabSize),s,en,'end');state.codes[label]=code.value;saveState()}});
    if(code&&window.CIEditor){try{codeEditorInstance=window.CIEditor.mount(code,{onChange:value=>{state.codes[label]=value;saveState()},onRun:()=>runActiveCase(label),problemKey:label,...editorOptions()})}catch(error){code.hidden=false;console.warn('Editor initialization:',error)}}
    note?.addEventListener('input',()=>{state.notes[label]=note.value;saveState()});
    document.querySelectorAll('[data-role="input"],[data-role="expected"],[data-role="hasExpected"]').forEach(el=>el.addEventListener('input',()=>persistCaseEditors(label)));
    bindProblemSplitter();
    typesetStatement();
  }
  if(state.mock&&!state.mock.finished)startMockTimer();
  if(route.path==='/settings')bindSettings();
  if(route.path==='/learn'||route.path.startsWith('/learn/')){
    const owner=state;window.PlumeAcademy.bind({id:decodeRouteLabel(route.path.slice(7)),uiLang:state.uiLang,progress:state.academy,editorOptions:editorOptions(),navigate:go,rerender:render,toast,executePython,save:()=>state===owner&&saveState(),acquireRun:()=>{if(runnerBusy)return false;runnerBusy=true;return true},releaseRun:()=>{runnerBusy=false},stopRun:()=>{runBatchGeneration++;resetRunner()}});
  }
}

const commandState={open:false,query:'',results:[],selected:0,returnFocus:null};
function commandSearch(query=''){
  const text=query.toLowerCase().replace(/\s+/g,'').trim();
  if(!text){const recent=(state.recentProblems||[]).map(label=>problemMap.get(label)).filter(Boolean),seen=new Set(recent.map(p=>p.label));return [...recent,...studyRecommendations().filter(p=>!seen.has(p.label))].slice(0,9)}
  return problems.filter(p=>`${p.label}${titleOf(p)}`.toLowerCase().replace(/\s+/g,'').includes(text)).sort((a,b)=>Number(!a.label.toLowerCase().startsWith(text))-Number(!b.label.toLowerCase().startsWith(text))||a.level-b.level||a.order-b.order).slice(0,12);
}
function shortcutLabel(){return /Mac|iPhone|iPad/.test(navigator.platform||'')?'⌘ K':'Ctrl K'}
function openCommandPalette(){
  const dialog=document.getElementById('commandPalette');if(!dialog)return;
  dialog.setAttribute('aria-label',t('quickSearch'));commandState.returnFocus=document.activeElement;commandState.open=true;commandState.query='';commandState.selected=0;
  dialog.innerHTML=`<div class="command-search">${icon('search')}<input id="commandInput" type="search" autocomplete="off" spellcheck="false" placeholder="${t('searchHint')}" aria-label="${t('quickSearch')}" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="commandResults"><button class="icon-button" onclick="closeCommandPalette()" aria-label="${t('searchClose')}">${icon('close')}</button></div><div id="commandResults" class="command-results" role="listbox" aria-label="${t('problems')}"></div><div class="command-footer"><span><kbd>↑ ↓</kbd> ${t('searchNavigate')}</span><span><kbd>↵</kbd> ${t('searchOpen')}</span><span><kbd>esc</kbd> ${t('searchClose')}</span></div>`;
  if(!dialog.open)dialog.showModal();
  renderCommandResults();
  const input=document.getElementById('commandInput');input.addEventListener('input',()=>{commandState.query=input.value;commandState.selected=0;renderCommandResults()});
  input.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();const n=commandState.results.length;commandState.selected=n?(commandState.selected+(event.key==='ArrowDown'?1:-1)+n)%n:0;renderCommandResults();document.getElementById(`command-result-${commandState.selected}`)?.scrollIntoView({block:'nearest'})}else if(event.key==='Enter'){event.preventDefault();const chosen=commandState.results[commandState.selected];if(chosen)chooseCommand(chosen.label)}});
  if(!dialog.dataset.bound){dialog.dataset.bound='1';dialog.addEventListener('cancel',()=>{commandState.open=false});dialog.addEventListener('close',()=>{commandState.open=false;if(commandState.returnFocus?.isConnected)commandState.returnFocus.focus()});dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeCommandPalette()}})}
  input.focus();
}
function renderCommandResults(){
  commandState.results=commandSearch(commandState.query);
  const container=document.getElementById('commandResults');if(!container)return;
  container.innerHTML=commandState.results.length?commandState.results.map((p,index)=>`<button id="command-result-${index}" class="command-result ${index===commandState.selected?'active':''}" role="option" aria-selected="${index===commandState.selected}" tabindex="-1" onclick="chooseCommand('${esc(p.label)}')">${icon('book')}<div><strong>${esc(p.label)}</strong><small>${esc(titleOf(p))}</small></div><span>L${p.level}</span>${icon('right')}</button>`).join(''):`<div class="command-empty">${t('noSearchResults')}</div>`;
  const input=document.getElementById('commandInput');if(commandState.results.length)input?.setAttribute('aria-activedescendant',`command-result-${commandState.selected}`);else input?.removeAttribute('aria-activedescendant');
}
function closeCommandPalette(){const dialog=document.getElementById('commandPalette');commandState.open=false;if(dialog?.open)dialog.close()}
function chooseCommand(label){if(!problemMap.has(label))return;closeCommandPalette();go('/problem/'+encodeURIComponent(label))}

window.addEventListener('hashchange',()=>{const next=parseRoute();if(next.path!==route.path||String(next.params)!==String(route.params)){route=next;render();window.scrollTo?.(0,0)}});

window.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key===','){e.preventDefault();go('/settings');return}
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();commandState.open?closeCommandPalette():openCommandPalette();return}
  const tag=(document.activeElement?.tagName||'').toLowerCase();if(['input','textarea','select'].includes(tag))return;
  if(e.altKey&&e.key==='ArrowLeft'){e.preventDefault();navBack()}
  if(e.altKey&&e.key==='ArrowRight'){e.preventDefault();navForward()}
});



// Overview and settings
function dashboardMetric(label,value,detail,cls=''){
  return `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value ${cls}">${value}</div><div class="metric-detail">${detail}</div></div>`;
}
function rememberProblem(label){if(!problemMap.has(label))return;if(state.lastProblem!==label){state.lastProblem=label;state.recentProblems=[label,...(state.recentProblems||[]).filter(key=>key!==label)].slice(0,12);saveState()}}
function continuationProblem(){
  const previous=problemMap.get(state.lastProblem);
  if(previous&&!statusOf(previous).solved)return previous;
  const recent=(state.recentProblems||[]).map(label=>problemMap.get(label)).find(p=>p&&!statusOf(p).solved);
  return recent||studyRecommendations()[0]||previous||problems[0];
}
function randomUnsolved(){
  const level=route.path==='/problems'?route.params.get('level'):null;
  const pool=problems.filter(p=>!statusOf(p).solved&&(level===null||level==='all'||p.level===Number(level)));
  if(!pool.length){toast(t('allCompleted'));return}
  go('/problem/'+encodeURIComponent(pool[Math.floor(Math.random()*pool.length)].label));
}
function recommendationRow(p,index=0){const status=statusOf(p);return `<button class="recommendation-row" onclick="go('/problem/${encodeURIComponent(p.label)}')"><span class="recommendation-number">${String(index+1).padStart(2,'0')}</span><span class="recommendation-copy"><strong>${esc(p.label)}</strong><span>${esc(titleOf(p))}</span></span><span class="recommendation-level">L${p.level}</span>${status.errors?`<span class="recommendation-error">${status.errors} ${t('errors')}</span>`:''}${icon('right','row-chevron')}</button>`}
function renderLearningPath(){return `<div class="path-list">${[0,1,2,3,4,5].map(level=>{const items=problems.filter(p=>p.level===level),done=items.filter(p=>statusOf(p).solved).length,pct=items.length?done/items.length*100:0;return `<button class="path-row ${done===items.length?'completed':''}" onclick="go('/problems?level=${level}')"><span class="path-number">${done===items.length?icon('check'):`${level}`}</span><span class="path-copy"><strong>${LEVEL_NAMES[state.uiLang][level]}</strong><span class="path-bar"><i style="width:${pct}%"></i></span></span><span class="path-count">${done}/${items.length}</span></button>`}).join('')}</div>`}
function renderDashboard(){
  const stats=aggregateStats(),next=continuationProblem(),today=solvedToday(),goal=state.dailyGoal,progress=Math.min(100,today/goal*100),resume=next&&state.lastProblem===next.label;
  const recommended=studyRecommendations().filter(p=>p.label!==next?.label).slice(0,4);
  const date=new Intl.DateTimeFormat(langLocale(),{month:'long',day:'numeric',weekday:'long'}).format(new Date());
  return `<div class="home-header"><div><div class="eyebrow home-owner">${state.profile.displayName?esc(state.profile.displayName)+' <span>·</span> ':''}${t('practiceWorkspace')}</div><h1>${t('homeTitle')}</h1></div><div class="home-date">${icon('calendar')}<span>${date}</span></div></div>
  <div class="home-grid"><div class="home-primary"><section class="focus-card"><div class="focus-heading"><span>${icon(resume?'play':'book')}${t(resume?'lastOpened':'nextUp')}</span><span class="focus-language">Python 3</span></div>${next?`<div class="continue-problem"><span class="continue-label">${esc(next.label)}</span><h2 class="continue-title">${esc(titleOf(next))}</h2><div class="continue-meta"><span>L${next.level} · ${LEVEL_NAMES[state.uiLang][next.level]}</span>${difficultyOf(next)!==null?`<span>Difficulty ${difficultyOf(next)}</span>`:''}</div></div><div class="focus-actions"><button class="btn primary" onclick="go('/problem/${encodeURIComponent(next.label)}')">${icon('play')}${t(resume?'continuePractice':'startPractice')}</button><button class="btn ghost" onclick="randomUnsolved()">${icon('shuffle')}${t('randomUnsolved')}</button></div>`:''}</section>
  <section class="recommendations-panel"><div class="section-heading"><h2>${t('recommendedForYou')}</h2><button class="text-button" onclick="go('/problems')">${t('viewLibrary')}${icon('right')}</button></div><div class="recommendation-list">${recommended.length?recommended.map(recommendationRow).join(''):`<div class="empty-state"><h3>${t('allCompletedTitle')}</h3><p>${t('allCompletedBody')}</p><button class="btn" onclick="go('/review')">${t('review')}</button></div>`}</div></section></div>
  <div class="home-secondary"><section class="goal-card"><div class="section-heading"><h2>${t('dailyTarget')}</h2><button class="icon-button" title="${t('editGoal')}" aria-label="${t('editGoal')}" onclick="go('/settings?section=practice')">${icon('target')}</button></div><div class="goal-value">${today}<span>/ ${goal}</span></div><div class="goal-progress progress"><i style="width:${progress}%"></i></div><div class="goal-caption">${t('goalProgress',{done:today,goal})}</div></section><section class="learning-path"><div class="section-heading"><h2>${t('study')}</h2><button class="icon-button" title="${t('study')}" aria-label="${t('study')}" onclick="go('/study')">${icon('right')}</button></div>${renderLearningPath()}</section></div></div>
  <section class="progress-strip" aria-label="${t('yourProgress')}">${[[t('solved'),`${stats.solved}<small> / ${problems.length}</small>`],[t('verified'),stats.verified],[t('attempted'),stats.attempted],[t('streak'),`${currentStreak()}<small> ${t('days')}</small>`]].map(([label,value])=>`<div class="progress-metric"><span>${label}</span><strong>${value}</strong></div>`).join('')}</section>
  ${renderCourseInvitation()}<section class="activity-panel"><div class="section-heading"><h2>${t('recent')}</h2><span>${t('last42')}</span></div><div class="activity-content"><div class="activity-heatmap">${renderHeatmap()}</div><div class="recent">${renderRecent()}</div></div></section>`;
}

let accountHandleDraft=null;
function renderSettings(){
  let storageBytes=0;try{storageBytes=new Blob([JSON.stringify(state)]).size}catch{}
  return window.AquilaSettings.render({section:route.params.get('section'),article:route.params.get('article'),productName:PRODUCT_NAME,uiLang:state.uiLang,state:accountHandleDraft===null?state:{...state,atcoderUser:accountHandleDraft},counts:{total:problems.length,statements:['zh','ja','en'].reduce((n,lang)=>n+localStatementCount(lang),0),samples:Object.values(window.CI_STATEMENTS||{}).reduce((n,p)=>n+(p.ja?.samples?.length||0),0)||630,metadata:problems.filter(p=>Object.keys(metaOf(p)).length>0).length},environment:{storageBytes,lastSync:state.lastSync,isNative:!!window.webkit?.messageHandlers?.saveFile}});
}
function storeSettings(patch){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify({...state,...patch}));Object.assign(state,patch);return true}catch(error){toast(t('saveFailed'));console.warn(error);return false}
}
function updateSetting(path,value,renderView=true){
  const top=['theme','uiLang','statementLang','dailyGoal','autoSync'];
  const prefs=['homePage','editorFontSize','tabSize','lineWrapping','statementFontSize','reduceMotion'];
  const candidate={...state,preferences:{...state.preferences},profile:{...state.profile}};
  if(top.includes(path))candidate[path]=value;
  else if(path==='profile.displayName')candidate.profile.displayName=value;
  else if(path.startsWith('preferences.')&&prefs.includes(path.slice(12)))candidate.preferences[path.slice(12)]=value;
  else return false;
  const normalized=window.AquilaSettings.normalize(candidate);
  const patch={theme:normalized.theme,uiLang:normalized.uiLang,statementLang:normalized.statementLang,dailyGoal:normalized.dailyGoal,autoSync:normalized.autoSync,preferences:normalized.preferences,profile:normalized.profile};
  if(!storeSettings(patch))return false;
  applyAppearance();if(renderView)render();return true;
}
function restorePreferences(){
  const defaults=window.AquilaSettings.defaults;
  if(!storeSettings({theme:defaults.theme,uiLang:defaults.uiLang,statementLang:defaults.statementLang,dailyGoal:defaults.dailyGoal,preferences:{...defaults.preferences}}))return;
  applyAppearance();render();toast(t('preferencesRestored'));
}
function bindSettings(){
  document.getElementById('setting-atcoderUser')?.addEventListener('input',event=>{accountHandleDraft=event.target.value});
  document.querySelectorAll('[data-setting]').forEach(el=>el.addEventListener('input',()=>{
    if(el.type==='number'){
      const value=Number(el.value);if(el.value!==''&&Number.isInteger(value)&&value>=Number(el.min)&&value<=Number(el.max))updateSetting(el.dataset.setting,value,false);
    }else if(el.dataset.setting==='profile.displayName')updateSetting(el.dataset.setting,el.value,false);
  }));
  document.querySelectorAll('[data-settings-section]').forEach(el=>el.addEventListener('click',()=>go('/settings?section='+el.dataset.settingsSection)));
  document.querySelectorAll('[data-help-article]').forEach(el=>el.addEventListener('click',()=>go('/settings?section=guide&article='+el.dataset.helpArticle)));
  document.querySelectorAll('[data-settings-route]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.settingsRoute)));
  document.querySelectorAll('[data-setting]').forEach(el=>el.addEventListener('change',()=>{
    const path=el.dataset.setting;if(path==='atcoderUser')return;
    const preserveField=el.type==='number'||path==='profile.displayName',focused=el.id;
    const saved=updateSetting(path,el.type==='checkbox'?el.checked:el.type==='number'?Number(el.value):el.value,!preserveField);
    if(preserveField&&saved){el.value=path==='profile.displayName'?state.profile.displayName:path.startsWith('preferences.')?state.preferences[path.slice(12)]:state[path];}
    else if(!preserveField)document.getElementById(focused)?.focus();
  }));
  const actions={sync:saveUserAndSync,export:exportData,import:()=>document.getElementById('settingsImportFile').click(),reset:resetAll,'refresh-metadata':()=>refreshMetadata(true),'restore-preferences':restorePreferences,signature:openSignature};
  document.querySelectorAll('[data-settings-action]').forEach(el=>el.addEventListener('click',()=>actions[el.dataset.settingsAction]?.()));
  document.getElementById('settingsImportFile')?.addEventListener('change',event=>{importData(event.target.files[0]);event.target.value=''});
}
function renderCourseInvitation(){
  if(!window.PlumeAcademy||!window.AQUILA_ACADEMY?.lessons?.length)return '';
  const course=window.PlumeAcademy,next=course.nextLesson(state.academy),done=course.progressCount(state.academy),total=window.AQUILA_ACADEMY.lessons.length;
  return `<section class="home-course"><span class="home-course-mark">${icon('feather')}</span><div><span class="eyebrow">${t('learn')} · ${done}/${total}</span><h2>${done===total?esc({zh:'基础课程已完成',ja:'基礎コースを完了',en:'Foundations complete'}[state.uiLang]):esc(next.content[state.uiLang].title)}</h2><p>${t('courseInvitation')}</p></div><button class="text-button" onclick="go('/learn')">${t('viewCourse')}${icon('right')}</button></section>`;
}
function openSignature(){
  const dialog=document.getElementById('signatureDialog');if(!dialog)return;
  dialog.innerHTML=`<button class="icon-button signature-close" aria-label="${t('searchClose')}" onclick="document.getElementById('signatureDialog').close()">${icon('close')}</button><svg class="signature-sky" viewBox="0 0 340 210" aria-hidden="true"><path d="M38 123L105 72L163 93L194 120L288 55M105 72L137 35M163 93L153 174L265 153"/><g>${[[38,123,2],[105,72,3],[163,93,4.5],[194,120,2.5],[288,55,2],[137,35,2],[153,174,2],[265,153,2]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><text x="174" y="83">Altair</text></svg><div class="signature-copy"><h2>${t('signatureTitle')}</h2><p>Plume · ${t('signatureLine')}</p><small>2026</small></div>`;
  dialog.setAttribute('aria-label','Aquila');dialog.showModal();
  if(!dialog.dataset.bound){dialog.dataset.bound='1';dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});}
}

init();
