/* Aquila settings and product guide. Pure rendering; persistence belongs to app.js. */
(function (root) {
  'use strict';
  const VERSION = '1.1.0';
  const LANGS = ['zh', 'ja', 'en'];
  const SECTIONS = ['general', 'practice', 'editor', 'account', 'data', 'guide', 'about'];
  const defaults = Object.freeze({
    uiLang: 'zh', statementLang: 'zh', theme: 'system', dailyGoal: 5,
    atcoderUser: '', autoSync: false,
    profile: Object.freeze({displayName: ''}),
    preferences: Object.freeze({homePage: 'dashboard', editorFontSize: 14, tabSize: 4,
      lineWrapping: false, statementFontSize: 16, reduceMotion: false})
  });
  const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const member = (value, allowed, fallback) => allowed.includes(value) ? value : fallback;
  const number = (value, min, max, fallback) => {
    if (value === '' || value === null || typeof value === 'boolean' || (typeof value !== 'number' && typeof value !== 'string')) return fallback;
    const n = Number(value); return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
  };
  function normalize(input) {
    const value = object(input), p = object(value.preferences), profile = object(value.profile);
    const name = typeof profile.displayName === 'string' ? Array.from(profile.displayName.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').trim()).slice(0, 40).join('') : '';
    return {
      uiLang: member(value.uiLang, LANGS, defaults.uiLang),
      statementLang: member(value.statementLang, LANGS, defaults.statementLang),
      theme: member(value.theme, ['system', 'light', 'dark'], defaults.theme),
      dailyGoal: number(value.dailyGoal, 1, 50, defaults.dailyGoal),
      atcoderUser: typeof value.atcoderUser === 'string' && /^[A-Za-z0-9_]{0,40}$/.test(value.atcoderUser.trim()) ? value.atcoderUser.trim() : '',
      autoSync: value.autoSync === true,
      profile: {displayName: name || defaults.profile.displayName},
      preferences: {
        homePage: member(p.homePage, ['dashboard', 'library', 'learn'], defaults.preferences.homePage),
        editorFontSize: number(p.editorFontSize, 12, 22, defaults.preferences.editorFontSize),
        tabSize: member(Number(p.tabSize), [2, 4], defaults.preferences.tabSize),
        lineWrapping: p.lineWrapping === true,
        statementFontSize: number(p.statementFontSize, 14, 20, defaults.preferences.statementFontSize),
        reduceMotion: p.reduceMotion === true
      }
    };
  }
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const copy = {
    zh: {
      title:'设置', subtitle:'你的工作区，按你的习惯。', general:'通用', practice:'练习', editor:'编辑器', account:'Aquila 个人空间', data:'数据与备份', guide:'使用指南', about:'关于 Aquila', saved:'更改会自动保存在本机。',
      appearance:'外观', theme:'显示模式', system:'跟随系统', light:'浅色', dark:'深色', languages:'语言', uiLang:'界面语言', statementLang:'默认题面语言', languageNote:'三种题面均已随题库保存在本机；切换语言无需等待翻译。', reduceMotion:'减少动态效果', reduceMotionNote:'关闭界面过渡与滚动动画；系统的减少动态效果设置同样生效。', on:'开启',
      launch:'启动', homePage:'启动页面', dashboard:'工作台', library:'题库', learn:'入门课程', restore:'恢复显示与练习偏好', restoreNote:'保留代码、笔记、提交记录、个人资料及 AtCoder 连接。', restoreButton:'恢复默认偏好',
      routine:'练习目标', dailyGoal:'每日目标题数', goalNote:'目标用于安排练习，不会改变题目难度或模拟分数。', reading:'题面阅读', statementFontSize:'题面字号', readingPreview:'阅读预览', previewSentence:'输入一个整数 N，输出从 1 到 N 的所有整数之和。', points:'计分说明', scoringNote:'本地样例用于检查程序输出；正式 AC 由 AtCoder 判题确认。模拟可采用 300 分训练制或原题分值。', readScoring:'了解计分方式', history:'模拟记录', openHistory:'查看模拟记录',
      codeAppearance:'代码显示', editorFontSize:'代码字号', tabSize:'缩进宽度', spaces:'个空格', lineWrapping:'自动换行', editorNote:'Tab 插入所选数量的空格。自动换行只改变显示，不修改代码。', editorPreview:'Python 预览', shortcuts:'快捷键', runShortcut:'运行当前测试', searchShortcut:'搜索题目', findShortcut:'在编辑器中查找', undoShortcut:'撤销编辑', editorHelp:'编辑与测试指南',
      profile:'个人资料', displayName:'显示名称', nameNote:'显示在本机工作区，不会修改 AtCoder 用户名。', localProfile:'本地个人空间', localProfileNote:'无需注册 Aquila 账户。资料与练习记录保存在当前设备。', connection:'AtCoder 连接', handle:'AtCoder 用户名', handleNote:'只需公开用户名，无需密码。切换用户名会替换当前账户的同步提交记录。', sync:'保存并同步', autoSync:'启动时自动同步', lastSync:'上次同步', never:'尚未同步', syncGuide:'了解同步范围',
      localLibrary:'本地题库', problems:'道题', statements:'份题面', samples:'组样例', coverage:'元数据覆盖', coverageNote:'221 是完整题库数量。214 是 AtCoder Problems 收录的题目元数据数量；7 道 APG 练习未被该索引收录，题面并未缺失。', metadata:'更新分值与 Difficulty', metadataNote:'元数据更新需要联网；本地题面与 Python 练习可离线使用。', refresh:'刷新元数据', backup:'备份与恢复', backupNote:'备份包含代码、笔记、收藏、提交记录、模拟记录、课程进度和偏好设置。导入会替换当前工作区，请先导出一份备份。', export:'导出 JSON', import:'导入 JSON', storage:'本地练习数据', storageNote:'这是当前工作区 JSON 的估算大小，不包含随软件提供的题库与 Python 运行环境。', backupGuide:'备份与隐私说明', reset:'重置工作区', resetNote:'删除本机练习数据。操作前会再次确认；题库仍会保留。', resetButton:'清空本地数据',
      guidesTitle:'使用 Aquila', guidesIntro:'从第一行 Python 到完整模拟，按实际操作了解工作区。', backGuides:'全部指南', steps:'操作步骤', related:'打开相关页面', aboutTag:'CI Practice · by Aquila', version:'版本', aboutBody:'面向创造情報学备考的独立编程工作区。题库、课程、代码与复习记录在同一处。', offline:'本地优先', offlineBody:'题面与 Python 运行环境随软件提供。Aquila 不包含广告或使用行为追踪。AtCoder 同步与元数据更新会访问公开网络服务。', sources:'来源与许可', sourcesBody:'题面版权归 AtCoder 及原作者所有。中文题面为训练用译文。Aquila 与 AtCoder、东京大学及 Apple 没有隶属关系。', notices:'第三方声明', licenses:'开源许可', github:'GitHub 仓库', docs:'项目说明', countLabel:'本地题目', languageCount:'题面语言', openAcademy:'打开入门课程', openLibrary:'打开题库', openMock:'打开模拟', openAccount:'打开个人空间', openData:'打开数据与备份', openEditor:'开始第一道题', minutes:'分钟'
    },
    ja: {
      title:'設定', subtitle:'使い方に合わせて、ワークスペースを整える。', general:'一般', practice:'練習', editor:'エディタ', account:'Aquila マイスペース', data:'データとバックアップ', guide:'使い方', about:'Aquila について', saved:'変更はこの端末に自動保存されます。',
      appearance:'外観', theme:'表示モード', system:'システムに合わせる', light:'ライト', dark:'ダーク', languages:'言語', uiLang:'インターフェース', statementLang:'既定の問題文言語', languageNote:'3言語の問題文を端末内に保存しています。切り替え時の翻訳待ちはありません。', reduceMotion:'視差効果と動きを減らす', reduceMotionNote:'画面遷移とスクロールのアニメーションを無効にします。システムの設定も反映されます。', on:'有効',
      launch:'起動', homePage:'起動時のページ', dashboard:'ワークスペース', library:'問題一覧', learn:'入門コース', restore:'表示と練習の設定を復元', restoreNote:'コード、メモ、提出履歴、プロフィール、AtCoder 接続は保持されます。', restoreButton:'既定の設定に戻す',
      routine:'練習目標', dailyGoal:'1日の目標問題数', goalNote:'練習の目安です。問題の難易度や模擬試験の配点には影響しません。', reading:'問題文の表示', statementFontSize:'問題文の文字サイズ', readingPreview:'表示プレビュー', previewSentence:'整数 N が与えられます。1 から N までの整数の和を出力してください。', points:'採点について', scoringNote:'ローカルのサンプルは出力の確認用です。正式な AC は AtCoder の判定で確認します。模擬では300点方式または元問題の配点を選べます。', readScoring:'採点方法を読む', history:'模擬の履歴', openHistory:'模擬の履歴を見る',
      codeAppearance:'コードの表示', editorFontSize:'コードの文字サイズ', tabSize:'インデント幅', spaces:'スペース', lineWrapping:'折り返して表示', editorNote:'Tab は指定した数のスペースを挿入します。折り返しは表示だけを変更し、コードは変更しません。', editorPreview:'Python プレビュー', shortcuts:'キーボードショートカット', runShortcut:'現在のテストを実行', searchShortcut:'問題を検索', findShortcut:'エディタ内を検索', undoShortcut:'編集を取り消す', editorHelp:'編集とテストの使い方',
      profile:'プロフィール', displayName:'表示名', nameNote:'この端末の表示に使用します。AtCoder のユーザー名は変更されません。', localProfile:'ローカルのマイスペース', localProfileNote:'Aquila のアカウント登録は不要です。プロフィールと練習記録は現在の端末に保存されます。', connection:'AtCoder 接続', handle:'AtCoder ユーザー名', handleNote:'公開ユーザー名のみを使い、パスワードは不要です。ユーザー名を切り替えると同期した提出履歴が置き換わります。', sync:'保存して同期', autoSync:'起動時に自動同期', lastSync:'最終同期', never:'未同期', syncGuide:'同期の範囲を確認',
      localLibrary:'ローカル問題集', problems:'問', statements:'件の問題文', samples:'組のサンプル', coverage:'メタデータ収録数', coverageNote:'221 は問題集全体の問題数です。214 は AtCoder Problems のメタデータ収録数です。APG の7問は同サービスの索引に含まれませんが、問題文はすべて揃っています。', metadata:'配点と Difficulty の更新', metadataNote:'メタデータの更新には通信が必要です。問題文と Python の練習はオフラインでも利用できます。', refresh:'メタデータを更新', backup:'バックアップと復元', backupNote:'コード、メモ、保存した問題、提出・模擬の履歴、コースの進捗、設定を含みます。読み込みは現在のワークスペースを置き換えます。先にバックアップを書き出してください。', export:'JSON 書き出し', import:'JSON 読み込み', storage:'ローカルの練習データ', storageNote:'現在のワークスペース JSON の推定容量です。同梱の問題集と Python 実行環境は含みません。', backupGuide:'バックアップとプライバシー', reset:'ワークスペースをリセット', resetNote:'端末内の練習データを削除します。実行前に確認が表示されます。問題集は削除されません。', resetButton:'ローカルデータを削除',
      guidesTitle:'Aquila の使い方', guidesIntro:'最初の Python コードから模擬試験まで、操作の流れに沿って説明します。', backGuides:'すべてのガイド', steps:'操作の手順', related:'関連ページを開く', aboutTag:'CI Practice · by Aquila', version:'バージョン', aboutBody:'創造情報学の受験準備に向けた独立したプログラミング環境です。問題集、コース、コード、復習記録を一か所にまとめています。', offline:'ローカル中心', offlineBody:'問題文と Python 実行環境を同梱しています。広告や利用状況の追跡はありません。AtCoder 同期とメタデータ更新では公開サービスにアクセスします。', sources:'出典とライセンス', sourcesBody:'問題文の権利は AtCoder と各著作者に帰属します。中国語版は練習用の翻訳です。Aquila は AtCoder、東京大学、Apple の公式製品ではありません。', notices:'第三者に関する表記', licenses:'オープンソースライセンス', github:'GitHub リポジトリ', docs:'プロジェクトの説明', countLabel:'ローカル問題', languageCount:'問題文の言語', openAcademy:'入門コースを開く', openLibrary:'問題一覧を開く', openMock:'模擬試験を開く', openAccount:'マイスペースを開く', openData:'データとバックアップを開く', openEditor:'最初の問題を開く', minutes:'分'
    },
    en: {
      title:'Settings', subtitle:'A workspace that fits the way you practice.', general:'General', practice:'Practice', editor:'Editor', account:'Aquila profile', data:'Data & backup', guide:'User guide', about:'About Aquila', saved:'Changes are saved automatically on this device.',
      appearance:'Appearance', theme:'Display mode', system:'Use system setting', light:'Light', dark:'Dark', languages:'Language', uiLang:'Interface language', statementLang:'Default statement language', languageNote:'All three statement languages are stored locally. Switching languages does not require translation or a network request.', reduceMotion:'Reduce motion', reduceMotionNote:'Disable interface transitions and animated scrolling. The system preference is also respected.', on:'Enabled',
      launch:'Startup', homePage:'Start page', dashboard:'Workspace', library:'Problems', learn:'Foundations', restore:'Restore display and practice preferences', restoreNote:'Keep code, notes, submissions, your profile, and the AtCoder connection.', restoreButton:'Restore default preferences',
      routine:'Practice goals', dailyGoal:'Daily problem goal', goalNote:'A planning target. It does not change problem difficulty or mock scores.', reading:'Statement reading', statementFontSize:'Statement text size', readingPreview:'Reading preview', previewSentence:'Given an integer N, print the sum of all integers from 1 through N.', points:'Scoring', scoringNote:'Local samples check program output. Official AC is confirmed by AtCoder. Mock exams can use a 300-point practice scale or the original problem scores.', readScoring:'How scoring works', history:'Mock history', openHistory:'View mock history',
      codeAppearance:'Code appearance', editorFontSize:'Code text size', tabSize:'Indentation width', spaces:'spaces', lineWrapping:'Wrap long lines', editorNote:'Tab inserts the selected number of spaces. Line wrapping changes the display without modifying your code.', editorPreview:'Python preview', shortcuts:'Keyboard shortcuts', runShortcut:'Run the current test', searchShortcut:'Search problems', findShortcut:'Find in the editor', undoShortcut:'Undo an edit', editorHelp:'Editing and testing guide',
      profile:'Profile', displayName:'Display name', nameNote:'Used in this local workspace. It does not change your AtCoder handle.', localProfile:'Your local space', localProfileNote:'No Aquila account is required. Your profile and practice records stay on this device.', connection:'AtCoder connection', handle:'AtCoder handle', handleNote:'Only a public handle is needed, never a password. Changing the handle replaces the synced submissions for the current account.', sync:'Save & sync', autoSync:'Sync automatically on launch', lastSync:'Last sync', never:'Not synced yet', syncGuide:'What gets synced',
      localLibrary:'Local library', problems:'problems', statements:'statements', samples:'sample pairs', coverage:'Metadata coverage', coverageNote:'221 is the complete problem count. 214 is the number indexed by AtCoder Problems. Seven APG exercises are not in that metadata index; their statements are included in full.', metadata:'Scores and Difficulty', metadataNote:'Updating metadata requires a connection. Local statements and Python practice remain available offline.', refresh:'Refresh metadata', backup:'Backup and restore', backupNote:'Includes code, notes, saved problems, submissions, mock history, course progress, and preferences. Import replaces the current workspace; export a backup first.', export:'Export JSON', import:'Import JSON', storage:'Local practice data', storageNote:'Estimated size of the current workspace JSON. Excludes the bundled library and Python runtime.', backupGuide:'Backup and privacy guide', reset:'Reset workspace', resetNote:'Delete practice data on this device. You will be asked to confirm. The problem library is retained.', resetButton:'Reset local data',
      guidesTitle:'Using Aquila', guidesIntro:'A practical guide from your first Python program to a complete mock exam.', backGuides:'All guides', steps:'Steps', related:'Open a related page', aboutTag:'CI Practice · by Aquila', version:'Version', aboutBody:'An independent programming workspace for Creative Informatics preparation. Problems, lessons, code, and review records in one place.', offline:'Local first', offlineBody:'Statements and the Python runtime are bundled with the app. Aquila includes no advertising or usage tracking. AtCoder sync and metadata updates access public network services.', sources:'Sources and licenses', sourcesBody:'Problem statements belong to AtCoder and their respective authors. Chinese statements are study translations. Aquila is not affiliated with AtCoder, the University of Tokyo, or Apple.', notices:'Third-party notices', licenses:'Open-source license', github:'GitHub repository', docs:'Project documentation', countLabel:'Local problems', languageCount:'Statement languages', openAcademy:'Open Foundations', openLibrary:'Open problems', openMock:'Open mock exam', openAccount:'Open profile', openData:'Open data & backup', openEditor:'Open the first problem', minutes:'min'
    }
  };
  const helpArticles = {
    start: {
      zh:{title:'从第一道题开始',summary:'认识课程、题库与练习进度。',sections:[
        {title:'选择起点',body:['没有 Python 基础时，先打开入门课程。课程按输入输出、条件、循环、数据结构与基础算法逐步展开。已有基础可以直接进入题库。','题库的 L0–L5 表示本工作区的训练阶段，与 ABC 的 A–D 字母并非一一对应。建议从能独立完成的最低阶段开始。']},
        {title:'完成一次练习',steps:['打开题目，读完题意、约束、输入输出格式和样例。题面语言可单独切换。','在 Python 编辑器中编写程序，运行样例，再补充边界测试。','通过题目页的 AtCoder 提交入口提交代码。在设置中填入用户名并同步，便可获得已验证 AC。','暂时不能联网时，可以手动记录结果。手动 AC 会与已验证 AC 分开显示。']},
        {title:'安排下一次练习',body:['工作台保留最近打开的题目。学习计划根据进度推荐练习，收藏和有错误提交的题目会进入复习列表。每日目标只是练习安排，不是考试分数。']}
      ],actions:[['/learn','openAcademy'],['/problems','openLibrary']]},
      ja:{title:'最初の一問から',summary:'コース、問題一覧、練習記録の使い方。',sections:[
        {title:'始める場所を選ぶ',body:['Python が初めてなら入門コースから始めます。入出力、条件分岐、繰り返し、データ構造、基礎アルゴリズムの順に学べます。基礎を学習済みなら問題一覧へ進めます。','L0–L5 はこのワークスペースの練習段階です。ABC の A–D と一対一には対応しません。自力で取り組める最も低い段階から始めてください。']},
        {title:'一問を練習する',steps:['問題文、制約、入出力形式、サンプルを読みます。問題文の言語は個別に変更できます。','Python エディタでコードを書き、サンプルを実行します。境界条件のテストも追加してください。','問題ページの提出リンクから AtCoder へコードを提出します。設定にユーザー名を登録して同期すると、確認済み AC を取得できます。','オフラインでは結果を手動で記録できます。手動 AC は確認済み AC と区別して表示されます。']},
        {title:'次の練習へ',body:['ワークスペースには最近開いた問題が残ります。学習ルートは進捗に応じて問題を提案し、保存した問題や誤提出のある問題は復習一覧に集まります。1日の目標は練習量の目安であり、試験の点数ではありません。']}
      ],actions:[['/learn','openAcademy'],['/problems','openLibrary']]},
      en:{title:'Start with your first problem',summary:'Find your way through lessons, problems, and progress.',sections:[
        {title:'Choose a starting point',body:['If you are new to Python, begin with Foundations: input and output, conditions, loops, data structures, and basic algorithms. If you know the basics, open the problem library.','L0–L5 are training stages in this workspace. They do not map directly to ABC letters A–D. Start at the lowest stage you can work on independently.']},
        {title:'Complete a practice session',steps:['Read the statement, constraints, input and output formats, and samples. You can change the statement language independently.','Write your program in the Python editor. Run the samples, then add boundary cases.','Use the problem’s AtCoder submission link to submit your code. Add your handle in Settings and sync to retrieve verified AC results.','When offline, record a result manually. Manual AC and verified AC are displayed separately.']},
        {title:'Plan the next session',body:['The workspace keeps your most recently opened problem. The learning path suggests practice based on progress; saved problems and incorrect submissions appear in Review. Your daily target measures practice, not exam points.']}
      ],actions:[['/learn','openAcademy'],['/problems','openLibrary']]}
    },
    editor: {
      zh:{title:'编写代码与本地测试',summary:'运行样例、添加测试并理解输出结果。',sections:[
        {title:'编辑器',body:['代码按题目自动保存在当前工作区。编辑器支持 Python 高亮、行号、缩进、查找和撤销。字号、缩进宽度与自动换行可在编辑器设置中调整。','⌘/Ctrl + Enter 运行当前测试；⌘/Ctrl + F 在编辑器中查找。⌘/Ctrl + K 打开全局题目搜索。']},
        {title:'运行与核对',steps:['选择官方样例或新增自定义测试。将输入填入输入框；需要自动比对时，勾选“比较期望输出”并填写预期内容。','点击运行，或运行全部样例。检查实际输出与期望输出，定位第一处不同。','关闭“比较期望输出”时，仅运行并显示结果。开启比较后，期望输出可以是空字符串，用于检查程序是否没有输出。','出现运行错误时，阅读错误信息并检查输入格式、变量、下标和除数。修改后重新运行。']},
        {title:'查看解答',body:['题目页的解答标签提供官方题解与已通过提交的入口。解答默认隐藏，AC 后解锁，也可手动展开。官方题解页面需要联网，部分题目没有官方讲解。']},
        {title:'本地结果的边界',body:['每次运行使用独立的 Python 环境，不继承上次运行的变量或文件。随软件提供的 Python 可离线使用。','样例一致不代表通过官方测试。浮点容差或允许多种答案的题目，文本比对还可能拒绝合理输出。最终正确性应通过 AtCoder 官方提交确认。']}
      ],actions:[['/problem/PracticeA','openEditor']]},
      ja:{title:'コードの編集とローカルテスト',summary:'サンプルの実行、テストの追加、出力の確認。',sections:[
        {title:'エディタ',body:['コードは問題ごとに現在のワークスペースへ自動保存されます。Python の色分け、行番号、インデント、検索、取り消しに対応しています。文字サイズ、インデント幅、折り返しは設定で変更できます。','⌘/Ctrl + Enter で現在のテストを実行、⌘/Ctrl + F でエディタ内を検索します。⌘/Ctrl + K は問題のクイック検索です。']},
        {title:'実行して確認する',steps:['公式サンプルを選ぶか、独自のテストを追加します。入力を記入し、比較する場合は「期待出力と比較」を有効にし、期待する内容を記入します。','実行、または全サンプル実行を選びます。実際の出力と期待出力を比較し、違いを確認します。','期待出力との比較を無効にした場合は、実行結果だけを表示します。比較を有効にした場合は、空文字列を期待出力にして「何も出力しない」ことも確認できます。','実行エラーが出たら、メッセージを読み、入力形式、変数、添字、除数を確認します。修正後に再実行します。']},
        {title:'解説を確認する',body:['問題ページの解答タブから公式解説や正解提出を開けます。初期状態では非表示で、AC 後に解除されます。手動で表示することもできます。公式解説の閲覧には通信が必要で、解説が用意されていない問題もあります。']},
        {title:'ローカルテストで分かること',body:['実行ごとに独立した Python 環境を使用し、前回の変数やファイルを引き継ぎません。同梱の Python はオフラインで利用できます。','サンプルとの一致は公式テストの通過を意味しません。誤差を許容する問題や複数の正解がある問題では、妥当な出力でも文字列比較で不一致になる場合があります。最終確認は AtCoder への提出で行ってください。']}
      ],actions:[['/problem/PracticeA','openEditor']]},
      en:{title:'Editing and local tests',summary:'Run samples, add cases, and interpret the output.',sections:[
        {title:'The editor',body:['Code is saved automatically per problem in the current workspace. The editor provides Python highlighting, line numbers, indentation, search, and undo. Change text size, indentation width, and wrapping in Editor settings.','Use ⌘/Ctrl + Enter to run the current test and ⌘/Ctrl + F to search the editor. ⌘/Ctrl + K opens global problem search.']},
        {title:'Run and compare',steps:['Select an official sample or add a custom test. Enter input. For a comparison, enable “Compare expected output” and enter the expected content.','Choose Run or run all samples. Compare actual and expected output to locate the first difference.','With output comparison disabled, the program only runs and displays its result. When comparison is enabled, an empty expected string is valid and checks that the program produces no output.','For a runtime error, read the message and check input format, variables, indices, and divisors. Edit and run again.']},
        {title:'Consult a solution',body:['The problem’s Solution tab links to official editorials and accepted submissions. Resources are hidden initially, unlock after AC, and can also be revealed manually. Official editorial pages require a connection, and some problems have no official explanation.']},
        {title:'What local tests establish',body:['Each run uses an independent Python environment and does not inherit variables or files from the previous run. The bundled Python runtime works offline.','Matching the samples does not establish that a solution passes official tests. For floating-point tolerance or multiple valid answers, text comparison may also reject valid output. Confirm correctness by submitting to AtCoder.']}
      ],actions:[['/problem/PracticeA','openEditor']]}
    },
    scoring: {
      zh:{title:'计分与限时模拟',summary:'区分样例结果、练习进度与模拟分数。',sections:[
        {title:'三种记录',rows:[['本地测试','只检查当前测试，不计模拟分。'],['手动 AC','由本人确认的练习记录，不代表官方验证。'],['已验证 AC','从 AtCoder 公开提交记录同步的正式通过结果。']]},
        {title:'一次模拟如何进行',steps:['选择出题范围和计分方式，开始三题、150 分钟的模拟。优先从未完成题目中抽取。','300 分训练制每题 100 分；原题分值模式使用开始时保存的官方分值。','在模拟页面手动记录判定，或同步模拟时段内的 AtCoder 提交。普通样例测试不会自动增加模拟分。','结束后查看逐题结果和罚时。历史记录保存在设置的数据页或模拟记录页面。']},
        {title:'罚时示例',body:['假设 A 题在第 30 分钟 AC，B 题先 WA 一次、在第 80 分钟 AC，C 题未通过。300 分训练制得分为 200 分；罚时后用时为 80 + 5 = 85 分钟。','只有最终 AC 的题目，在首次 AC 之前的计罚错误才计入罚时。每次增加 5 分钟；CE 和 IE 不计罚时。训练分数不是东京大学的官方评分，也不能用于保证考试成绩。']}
      ],actions:[['/mock','openMock'],['/mock?history','openHistory']]},
      ja:{title:'採点と時間制限付き模擬',summary:'サンプル結果、練習進捗、模擬の得点を区別する。',sections:[
        {title:'3種類の記録',rows:[['ローカルテスト','現在のテストだけを確認し、模擬の得点には加算しません。'],['手動 AC','自分で確認した練習記録です。公式の確認済み結果ではありません。'],['確認済み AC','AtCoder の公開提出から同期した正式な正解結果です。']]},
        {title:'模擬試験の流れ',steps:['出題範囲と配点方式を選び、3問・150分の模擬を開始します。未完了の問題を優先して抽選します。','300点方式は各100点です。元問題の配点方式では開始時に保存した公式配点を使用します。','模擬ページで判定を手動記録するか、模擬の時間内に行った AtCoder 提出を同期します。通常のサンプル実行では加点されません。','終了後、各問題の結果とペナルティを確認できます。履歴は設定のデータページや模擬履歴から開けます。']},
        {title:'ペナルティの例',body:['A を30分で AC、B は WA を1回出した後80分で AC、C は未正解だった場合、300点方式の得点は200点です。ペナルティ込みの時間は 80 + 5 = 85分になります。','最終的に AC した問題の、最初の AC より前の対象誤提出だけを加算します。1回につき5分で、CE と IE は含みません。練習得点は東京大学の公式採点ではなく、入試での得点を保証するものでもありません。']}
      ],actions:[['/mock','openMock'],['/mock?history','openHistory']]},
      en:{title:'Scoring and timed mock exams',summary:'Separate sample results, practice progress, and mock scores.',sections:[
        {title:'Three kinds of record',rows:[['Local test','Checks the current case only; adds no mock points.'],['Manual AC','A self-confirmed practice record, without official verification.'],['Verified AC','An accepted result synced from public AtCoder submissions.']]},
        {title:'Run a mock exam',steps:['Choose a problem range and scoring mode, then begin a three-problem, 150-minute session. Unsolved problems are selected first.','The 300-point practice scale awards 100 points per problem. Original-score mode uses official scores saved when the session starts.','Record verdicts on the mock page or sync AtCoder submissions made during the session. Ordinary sample tests do not add mock points.','After finishing, inspect each problem’s result and penalty time. Past sessions are available from Data settings or Mock history.']},
        {title:'A penalty example',body:['Suppose A is accepted at minute 30, B has one WA and is accepted at minute 80, and C remains unsolved. The practice score is 200 out of 300. The time including penalties is 80 + 5 = 85 minutes.','Only penalized submissions before the first AC on a solved problem count. Each adds five minutes; CE and IE add no penalty. Practice points are not the University of Tokyo’s official grading and do not guarantee an exam score.']}
      ],actions:[['/mock','openMock'],['/mock?history','openHistory']]}
    },
    sync: {
      zh:{title:'连接 AtCoder',summary:'同步公开提交，保留清晰的结果来源。',sections:[
        {title:'建立连接',steps:['在个人资料设置中输入 AtCoder 用户名。不要输入邮箱、密码或其他凭据。','点击保存并同步。同步只匹配本题库中的题目；未匹配提交不会变成题库进度。','同步完成后，在题目记录与工作台查看已验证结果。可以开启启动时自动同步。']},
        {title:'同步范围',body:['同步使用 AtCoder Problems 提供的公开提交数据，可能存在更新延迟；它不会替你提交代码。网络不可用时，已有记录与本地练习仍可使用。','更换用户名会替换当前账户同步来的提交；手动记录与代码保留。历史模拟保留开始时的关联账户，避免把不同用户的提交混在一起。']},
        {title:'没有看到最新 AC',body:['先在 AtCoder 确认提交已结束且题号一致，再稍后手动同步。检查当前用户名以及提交是否属于本题库。模拟只计入指定时段内的提交，开始前已取得的 AC 不会自动成为本次成绩。']}
      ],actions:[['/settings?section=account','openAccount']]},
      ja:{title:'AtCoder に接続する',summary:'公開提出を同期し、結果の出所を区別する。',sections:[
        {title:'接続する',steps:['プロフィール設定に AtCoder ユーザー名を入力します。メールアドレス、パスワード、認証情報は入力しないでください。','保存して同期を選びます。この問題集に含まれる問題だけが進捗に反映されます。','同期後、問題の履歴とワークスペースで確認済みの結果を確認します。起動時の自動同期も設定できます。']},
        {title:'同期される内容',body:['AtCoder Problems の公開提出データを使用するため、反映に時間がかかる場合があります。コードを自動提出する機能ではありません。通信できなくても保存済み記録とローカル練習は利用できます。','ユーザー名を変更すると、現在のアカウントから同期した提出を置き換えます。手動記録とコードは保持します。過去の模擬は開始時のアカウントを記録し、他のユーザーの提出と混同しません。']},
        {title:'最新の AC が表示されない場合',body:['AtCoder で判定が終了していることと問題番号を確認し、少し時間を置いて手動同期してください。ユーザー名と問題集への収録も確認します。模擬には対象時間内の提出だけが入り、開始前の AC は加点されません。']}
      ],actions:[['/settings?section=account','openAccount']]},
      en:{title:'Connect AtCoder',summary:'Sync public submissions while keeping result sources clear.',sections:[
        {title:'Connect a handle',steps:['Enter your AtCoder handle in Profile settings. Do not enter an email address, password, or other credentials.','Choose Save & sync. Only submissions matching this library contribute to progress.','After syncing, view verified results in problem history and the workspace. You can enable automatic sync on launch.']},
        {title:'What synchronization does',body:['Sync reads public submission data provided by AtCoder Problems, which may update with a delay. It does not submit code for you. Existing records and local practice remain available without a connection.','Changing the handle replaces submissions synced for the current account, while keeping manual records and code. Past mock sessions retain the account associated when they began to avoid mixing users’ submissions.']},
        {title:'If a recent AC is missing',body:['Confirm on AtCoder that judging has finished and the problem ID matches, then sync again later. Check your handle and whether the problem is included in this library. Mock exams only count submissions within their session window; earlier AC results are not added automatically.']}
      ],actions:[['/settings?section=account','openAccount']]}
    },
    backup: {
      zh:{title:'备份、恢复与隐私',summary:'了解数据存在哪里，以及怎样迁移。',sections:[
        {title:'保存位置',body:['代码、笔记、进度、模拟记录与课程进度保存在当前应用或浏览器的本地工作区。浏览器地址或端口不同，通常属于不同工作区；浏览器与 macOS App 也不会自动共享进度。','清除浏览器网站数据、移除应用数据或重置工作区会丢失这些记录。题库随软件提供，不依赖练习记录。']},
        {title:'迁移到另一台设备',steps:['在数据与备份页面导出 JSON，并保留原文件。','在目标设备打开软件，先导出目标工作区需要保留的数据。','选择导入 JSON，检查确认提示后恢复。导入会替换当前工作区，并非合并。','恢复后检查题目代码、模拟记录和课程进度。']},
        {title:'网络与个人数据',body:['软件没有注册流程，也不上传你的代码或练习备份。同步与元数据更新会访问公开服务；打开 AtCoder 或 GitHub 链接会进入对应网站。','备份包含代码、笔记和 AtCoder 用户名。请按个人文件保存，不要将自己的备份提交到公开 GitHub 仓库。']}
      ],actions:[['/settings?section=data','openData']]},
      ja:{title:'バックアップ、復元、プライバシー',summary:'保存場所と別の端末への移行方法。',sections:[
        {title:'データの保存場所',body:['コード、メモ、進捗、模擬履歴、コースの進捗は、現在のアプリまたはブラウザのローカルワークスペースに保存します。URL やポートが異なるブラウザ画面は通常別のワークスペースです。ブラウザと macOS アプリも自動共有しません。','ブラウザのサイトデータやアプリデータの削除、ワークスペースのリセットで記録は失われます。同梱の問題集は練習記録とは独立しています。']},
        {title:'別の端末に移す',steps:['データとバックアップで JSON を書き出し、元のファイルを保管します。','移行先でアプリを開き、そちらに残したいデータがあれば先に書き出します。','JSON 読み込みを選び、確認を読んで復元します。現在のデータを置き換える操作で、統合ではありません。','復元後、コード、模擬の履歴、コースの進捗を確認します。']},
        {title:'通信と個人データ',body:['登録手続きはなく、コードや練習バックアップをアップロードしません。同期とメタデータ更新は公開サービスへ通信します。AtCoder や GitHub のリンクは各サイトを開きます。','バックアップにはコード、メモ、AtCoder ユーザー名が含まれます。個人用ファイルとして保管し、公開 GitHub リポジトリへ提出しないでください。']}
      ],actions:[['/settings?section=data','openData']]},
      en:{title:'Backup, restore, and privacy',summary:'Know where your records live and how to move them.',sections:[
        {title:'Where data is stored',body:['Code, notes, progress, mock history, and course progress are stored in the current app or browser workspace. Different browser addresses or ports generally have separate workspaces. The browser and macOS app do not share progress automatically.','Clearing site data, removing application data, or resetting the workspace deletes these records. The bundled problem library is independent of practice data.']},
        {title:'Move to another device',steps:['Export JSON from Data & backup and keep the original file.','Open the app on the destination device. Export any existing data you want to retain first.','Choose Import JSON, read the confirmation, and restore. Import replaces the workspace; it does not merge records.','Check your code, mock history, and course progress after restoring.']},
        {title:'Network use and personal data',body:['There is no registration process, and the app does not upload your code or practice backups. Sync and metadata updates connect to public services; opening an AtCoder or GitHub link visits that website.','Backups contain code, notes, and your AtCoder handle. Treat them as personal files and do not commit your backups to a public GitHub repository.']}
      ],actions:[['/settings?section=data','openData']]}
    },
    academy: {
      zh:{title:'用入门课程建立基础',summary:'先理解一个概念，再用程序检验它。',sections:[
        {title:'课程与题库的分工',body:['入门课程解释 Python 与基础算法；题库提供独立练习。课程内的小练习用于检查当前知识点，不会获得 AtCoder 已验证 AC，也不会增加模拟分数。']},
        {title:'读完一课的方式',body:['每课先列出学习目标，再按概念、执行过程、示例和常见错误展开。课内目录可以跳转；代码示例附有输入与输出，可先预测再核对。','自测问题展开后显示推理过程。编程练习先给出要求和样例，运行检查后可展开每个结果查看差异。提示和参考实现可随时打开；通过全部测试才记录完成，阅读答案本身不增加进度。']},
        {title:'建议的学习顺序',steps:['从输入输出、变量和算术开始，确认自己能把题目描述写成程序。','学习条件、循环、字符串和列表，再进入集合、字典与计数。','理解复杂度，接着练习排序、全探索、前缀和与二分等常用方法。','每学完一个主题，完成关联题目；如果无法独立完成，返回课程核对示例，再继续练习。']},
        {title:'从课程进入备考',body:['课程进度与题库进度分别保存。学完课程不代表已经达到目标分数；应结合 L0–L5 题库练习和限时模拟，检查实现是否准确、边界是否覆盖、时间是否充足。','学习路线是训练建议，并非东京大学官方教学大纲。请结合当年的考试要求与历年题调整重点。']}
      ],actions:[['/learn','openAcademy'],['/problems','openLibrary']]},
      ja:{title:'入門コースで基礎を作る',summary:'一つの概念を理解し、プログラムで確かめる。',sections:[
        {title:'コースと問題集の役割',body:['入門コースは Python と基礎アルゴリズムを説明し、問題集は独立した練習を提供します。コース内の小演習は理解の確認用です。AtCoder 確認済み AC や模擬得点には加算されません。']},
        {title:'一つのレッスンの進め方',body:['最初に到達目標を確認し、概念、実行の流れ、具体例、よくある誤りの順に読みます。目次から各節へ移動できます。コード例には入力と出力があるので、まず結果を予測してから照合してください。','理解確認の問いを開くと考え方が表示されます。演習には要件と入出力例があり、実行後は各テストの差分を確認できます。ヒントと解答例はいつでも開けます。全テストの通過で完了を記録し、解答の閲覧だけでは進捗は増えません。']},
        {title:'学ぶ順番',steps:['入出力、変数、計算から始め、問題の説明をコードに変換できることを確認します。','条件分岐、繰り返し、文字列、リストを学び、集合、辞書、数え上げへ進みます。','計算量を理解してから、ソート、全探索、累積和、二分探索などを練習します。','各テーマの後に関連問題を解きます。自力で解けない場合はコースの例に戻り、確認してから続けます。']},
        {title:'受験準備へつなげる',body:['コースと問題集の進捗は別に保存します。コースの修了だけで目標点に達したとは判断できません。L0–L5 の問題と時間制限付き模擬で、実装の正確さ、境界条件、所要時間を確認してください。','学習順は練習の提案であり、東京大学の公式シラバスではありません。その年度の試験要項と過去問に合わせて重点を調整してください。']}
      ],actions:[['/learn','openAcademy'],['/problems','openLibrary']]},
      en:{title:'Build a foundation with lessons',summary:'Understand a concept, then test it with a program.',sections:[
        {title:'Lessons and problems',body:['Foundations explains Python and basic algorithms; the library provides independent practice. Short lesson exercises check the current concept. They do not award verified AtCoder AC or mock-exam points.']},
        {title:'Working through a lesson',body:['Start with the learning objectives, then follow the concept, execution trace, examples, and common mistakes. Use the lesson contents to jump to a section. Each code example includes input and output: predict the result before comparing it.','Open the self-check questions to read the reasoning. Exercises include requirements and sample input/output; after running checks, expand each result to inspect differences. Hints and reference implementations are available whenever needed. Completion requires passing every test; opening a solution does not advance progress.']},
        {title:'A suggested sequence',steps:['Begin with input, output, variables, and arithmetic. Check that you can turn a problem description into a program.','Learn conditions, loops, strings, and lists, then move to sets, dictionaries, and counting.','Understand complexity before practicing sorting, exhaustive search, prefix sums, binary search, and related methods.','After each topic, solve the linked practice problems. If you cannot solve one independently, revisit the lesson examples before continuing.']},
        {title:'Connect lessons to exam preparation',body:['Lesson progress and problem progress are stored separately. Completing lessons does not establish an exam score. Use L0–L5 problems and timed mock exams to check implementation, boundary cases, and time management.','The sequence is a training recommendation, not an official University of Tokyo syllabus. Adjust your priorities using the current exam requirements and past papers.']}
      ],actions:[['/learn','openAcademy'],['/problems','openLibrary']]}
    }
  };
  const navSymbols = {
    general:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/>',
    practice:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 7-7"/>',
    editor:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/>',
    account:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    data:'<path d="M5 3h11l3 3v15H5zM8 3v6h8V3M8 21v-8h8v8"/>',
    guide:'<path d="M3 4h6l3 2 3-2h6v15h-6l-3 2-3-2H3zM12 6v15"/>',
    about:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>'
  };
  function symbol(section) { return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navSymbols[section]}</svg>`; }
  function formatBytes(bytes, lang = 'en') {
    const n = Number(bytes);
    if (!Number.isFinite(n) || n < 0) return '—';
    if (n < 1024) return `${Math.round(n)} B`;
    return `${new Intl.NumberFormat(member(lang, LANGS, 'en'), {maximumFractionDigits:1}).format(n / (n < 1024 ** 2 ? 1024 : 1024 ** 2))} ${n < 1024 ** 2 ? 'KB' : 'MB'}`;
  }
  function render(options = {}) {
    const state = normalize(options.state), lang = member(options.uiLang, LANGS, state.uiLang);
    const productName = typeof options.productName === 'string' && options.productName.trim() ? options.productName.trim().slice(0, 80) : 'Plume';
    const t = key => String(copy[lang][key] ?? key).replace(/Aquila/g, productName);
    const section = member(options.section, SECTIONS, 'general');
    const counts = object(options.counts), env = object(options.environment);
    const count = (key, fallback) => number(counts[key], 0, 100000, fallback);
    const total = count('total', 221), statements = count('statements', total * 3), samples = count('samples', 630), metadata = count('metadata', 214);
    const fieldId = path => `setting-${path.replace(/\./g, '-')}`;
    const attr = path => `id="${fieldId(path)}" data-setting="${esc(path)}"`;
    const row = (path, label, control, note = '') => `<div class="settings-row"><label${path ? ` for="${fieldId(path)}"` : ''}>${esc(label)}</label><div class="settings-control">${control}${note ? `<p class="settings-field-note"${path ? ` id="${fieldId(path)}-note"` : ''}>${esc(note)}</p>` : ''}</div></div>`;
    const described = (path, note) => note ? `aria-describedby="${fieldId(path)}-note"` : '';
    const select = (path, value, items, note = '') => `<select ${attr(path)} ${described(path,note)}>${items.map(([v,label]) => `<option value="${esc(v)}"${String(v) === String(value) ? ' selected' : ''}>${esc(label)}</option>`).join('')}</select>`;
    const toggle = (path, value, note = '') => `<span class="settings-switch"><input type="checkbox" role="switch" ${attr(path)} ${described(path,note)}${value ? ' checked' : ''}><span class="settings-switch-track" aria-hidden="true"></span></span>`;
    const input = (path, value, min, max) => `<input type="number" inputmode="numeric" min="${min}" max="${max}" step="1" ${attr(path)} value="${value}">`;
    const button = (action, label, classes = '') => `<button type="button" class="btn ${classes}" data-settings-action="${action}">${esc(label)}</button>`;
    const route = (path, label, classes = '') => `<button type="button" class="btn ${classes}" data-settings-route="${esc(path)}">${esc(label)}</button>`;
    const articleButton = (article, label) => `<button type="button" class="text-button" data-help-article="${article}">${esc(label)} <span aria-hidden="true">↗</span></button>`;
    const card = (title, content, note = '') => `<section class="settings-section settings-card"><div class="settings-section-head"><h2>${esc(title)}</h2>${note ? `<p>${esc(note)}</p>` : ''}</div>${content}</section>`;
    const note = html => `<div class="settings-note">${html}</div>`;
    const languages = [['zh','中文'],['ja','日本語'],['en','English']];
    const sectionNames = {...copy[lang], account: {zh:'个人资料',ja:'プロフィール',en:'Profile'}[lang], data: lang==='ja'?'データ管理':copy[lang].data};
    let content = '';
    if (section === 'general') {
      content = card(t('appearance'),
        row('theme',t('theme'),select('theme',state.theme,['system','light','dark'].map(x => [x,t(x)]))) +
        row('preferences.reduceMotion',t('reduceMotion'),toggle('preferences.reduceMotion',state.preferences.reduceMotion,t('reduceMotionNote')),t('reduceMotionNote'))) +
        card(t('languages'), row('uiLang',t('uiLang'),select('uiLang',state.uiLang,languages)) +
          row('statementLang',t('statementLang'),select('statementLang',state.statementLang,languages,t('languageNote')),t('languageNote'))) +
        card(t('launch'),row('preferences.homePage',t('homePage'),select('preferences.homePage',state.preferences.homePage,['dashboard','library','learn'].map(x => [x,t(x)])))) +
        card(t('restore'),note(button('restore-preferences',t('restoreButton'))),t('restoreNote'));
    } else if (section === 'practice') {
      content = card(t('routine'),row('dailyGoal',t('dailyGoal'),input('dailyGoal',state.dailyGoal,1,50),t('goalNote'))) +
        card(t('reading'),row('preferences.statementFontSize',t('statementFontSize'),input('preferences.statementFontSize',state.preferences.statementFontSize,14,20)) +
          `<div class="settings-reading-preview" aria-label="${esc(t('readingPreview'))}" style="font-size:var(--statement-size,${state.preferences.statementFontSize}px)">${esc(t('previewSentence'))}</div>`) +
        card(t('points'),note(articleButton('scoring',t('readScoring'))),t('scoringNote')) +
        card(t('history'),note(route('/mock?history',t('openHistory'))));
    } else if (section === 'editor') {
      content = card(t('codeAppearance'),
        row('preferences.editorFontSize',t('editorFontSize'),input('preferences.editorFontSize',state.preferences.editorFontSize,12,22)) +
        row('preferences.tabSize',t('tabSize'),select('preferences.tabSize',state.preferences.tabSize,[2,4].map(n => [n,`${n} ${t('spaces')}`]))) +
        row('preferences.lineWrapping',t('lineWrapping'),toggle('preferences.lineWrapping',state.preferences.lineWrapping)) +
        `<pre class="settings-code-preview" aria-label="${esc(t('editorPreview'))}" style="font-size:var(--editor-size,${state.preferences.editorFontSize}px);tab-size:${state.preferences.tabSize};white-space:${state.preferences.lineWrapping?'pre-wrap':'pre'}"><code><span class="code-comment"># Python 3</span>\nn = int(input())\n<span class="code-keyword">for</span> i <span class="code-keyword">in</span> range(n):\n${' '.repeat(state.preferences.tabSize)}print(i + 1)</code></pre>` + note(esc(t('editorNote')))) +
        card(t('shortcuts'),[['⌘ / Ctrl + Enter','runShortcut'],['⌘ / Ctrl + K','searchShortcut'],['⌘ / Ctrl + F','findShortcut'],['⌘ / Ctrl + Z','undoShortcut']].map(([keys,label]) => row('',t(label),`<kbd>${esc(keys)}</kbd>`)).join('') + note(articleButton('editor',t('editorHelp'))));
    } else if (section === 'account') {
      const stamp = Number(env.lastSync ?? options.state?.lastSync);
      const lastSync = Number.isFinite(stamp) && stamp > 0 && stamp < 8640000000000000 ? new Intl.DateTimeFormat(lang,{dateStyle:'medium',timeStyle:'short'}).format(new Date(stamp)) : t('never');
      content = card(t('profile'),
        row('profile.displayName',t('displayName'),`<input type="text" ${attr('profile.displayName')} value="${esc(state.profile.displayName)}" maxlength="80" autocomplete="nickname" ${described('profile.displayName',true)}>`,t('nameNote')) + note(esc(t('localProfileNote')))) +
        card(t('connection'),
        row('atcoderUser',t('handle'),`<div class="settings-control-action"><input type="text" ${attr('atcoderUser')} value="${esc(typeof options.state?.atcoderUser==='string'?options.state.atcoderUser.slice(0,80):state.atcoderUser)}" maxlength="40" pattern="[A-Za-z0-9_]*" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="AtCoder ID" ${described('atcoderUser',true)}>${button('sync',t('sync'))}</div>`,t('handleNote')) +
        row('autoSync',t('autoSync'),toggle('autoSync',state.autoSync)) +
        row('',t('lastSync'),`<span>${esc(lastSync)}</span>`) + note(articleButton('sync',t('syncGuide'))));
    } else if (section === 'data') {
      content = card(t('localLibrary'),`<div class="settings-library-summary">${[[total,t('problems')],[statements,t('statements')],[samples,t('samples')]].map(([n,label]) => `<div><strong>${n}</strong><span>${esc(label)}</span></div>`).join('')}</div>` +
        row('',t('coverage'),`<span>${metadata} / ${total}</span>`,t('coverageNote')) +
        row('',t('metadata'),button('refresh-metadata',t('refresh')),t('metadataNote'))) +
        card(t('backup'),row('',t('backup'),`<div class="settings-buttons">${button('export',t('export'))}${button('import',t('import'))}<input id="settingsImportFile" type="file" accept="application/json,.json" hidden aria-label="${esc(t('import'))}"></div>`) +
        row('',t('storage'),`<span>${esc(formatBytes(env.storageBytes,lang))}</span>`,t('storageNote')) + note(articleButton('backup',t('backupGuide'))),t('backupNote')) +
        card(t('reset'),note(button('reset',t('resetButton'),'danger')),t('resetNote'));
    } else if (section === 'guide') {
      const article = Object.hasOwn(helpArticles,options.article) ? helpArticles[options.article][lang] : null;
      content = article ? `<article class="settings-help-article"><button type="button" class="text-button settings-help-back" data-settings-section="guide"><span aria-hidden="true">←</span> ${esc(t('backGuides'))}</button><header><h2>${esc(article.title)}</h2><p>${esc(article.summary)}</p></header>${article.sections.map(s => `<section><h3>${esc(s.title)}</h3>${(s.body || []).map(p => `<p>${esc(p)}</p>`).join('')}${s.steps ? `<ol>${s.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>` : ''}${s.rows ? `<table><tbody>${s.rows.map(([a,b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table>` : ''}</section>`).join('')}<footer><h3>${esc(t('related'))}</h3><div class="settings-buttons">${article.actions.map(([path,key]) => route(path,t(key))).join('')}</div></footer></article>` :
        `<div class="settings-guide-intro"><h2>${esc(t('guidesTitle'))}</h2><p>${esc(t('guidesIntro'))}</p></div><div class="settings-guide-list">${Object.entries(helpArticles).map(([id,entry],i) => `<button type="button" class="settings-guide-link" data-help-article="${id}"><span class="settings-guide-number">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(entry[lang].title)}</strong><small>${esc(entry[lang].summary)}</small></span><span aria-hidden="true">›</span></button>`).join('')}</div>`;
    } else {
      const link = (url,label) => `<a class="text-button" href="${url}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
      const signature = `<button type="button" class="signature-link" data-settings-action="signature">Aquila</button>`;
      content = `<section class="settings-about-identity"><div class="settings-about-mark" aria-hidden="true"><img src="assets/plume.svg" alt="" width="72" height="72"></div><h2>${esc(productName)}</h2><p>CI Programming Practice</p><p class="settings-developer">${esc({zh:"开发者",en:"Developer",ja:"開発者"}[lang])} · ${signature}</p><span class="settings-version">${esc(t('version'))} ${VERSION}</span><p class="settings-about-description">${esc(t('aboutBody'))}</p></section>` +
        card(t('localLibrary'),`<div class="settings-library-summary"><div><strong>${total}</strong><span>${esc(t('countLabel'))}</span></div><div><strong>3</strong><span>${esc(t('languageCount'))}</span></div><div><strong>0–5</strong><span>Level</span></div></div>`) +
        card(t('offline'),note(esc(t('offlineBody')))) +
        card(t('sources'),note(esc(t('sourcesBody'))) + `<div class="settings-about-links">${link('https://github.com/AquilaTvT/CIP/blob/main/THIRD_PARTY_NOTICES.md',t('notices'))}${link('https://github.com/AquilaTvT/CIP/blob/main/LICENSE',t('licenses'))}</div>`) +
        `<div class="settings-about-links">${link('https://github.com/AquilaTvT/CIP',t('github'))}${link('https://github.com/AquilaTvT/CIP#readme',t('docs'))}</div>`;
    }
    const sectionTitle = section === 'about' ? t('about') : sectionNames[section];
    return `<div class="settings-page"><header class="settings-page-head"><h1>${esc(t('title'))}</h1><p>${esc(t('subtitle'))}</p></header><div class="settings-layout"><nav class="settings-navigation" aria-label="${esc(t('title'))}">${SECTIONS.map(id => `<button type="button" class="settings-nav-item${section===id?' active':''}" data-settings-section="${id}"${section===id?' aria-current="page"':''}>${symbol(id)}<span>${esc(id==='about'?t('about'):sectionNames[id])}</span></button>`).join('')}</nav><div class="settings-content"><div class="settings-content-head"><h2>${esc(sectionTitle)}</h2>${!['guide','about','data'].includes(section)?`<p>${esc(t('saved'))}</p>`:''}</div>${content}</div></div></div>`;
  }
  root.AquilaSettings = Object.freeze({defaults,normalize,render,helpArticles,sections:SECTIONS.slice(),version:VERSION,formatBytes});
})(typeof window !== 'undefined' ? window : globalThis);
