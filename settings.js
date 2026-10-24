/* Plume settings and user guide. Pure rendering and validation; persistence belongs to app.js. */
(function (root) {
  'use strict';
  const VERSION = '1.2.0';
  const LANGS = ['zh', 'ja', 'en'];
  const SECTIONS = ['general', 'practice', 'editor', 'account', 'library', 'data', 'guide', 'about'];
  const defaults = Object.freeze({
    uiLang: 'zh',
    statementLang: 'zh',
    theme: 'system',
    dailyGoal: 5,
    atcoderUser: '',
    autoSync: false,
    profile: Object.freeze({displayName: ''}),
    preferences: Object.freeze({homePage: 'dashboard', editorFontSize: 14, tabSize: 4, lineWrapping: false, statementFontSize: 16, reduceMotion: false})
  });
  const object = value => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});
  const member = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
  const number = (value, min, max, fallback) => {
    if (value === '' || value === null || typeof value === 'boolean' || (typeof value !== 'number' && typeof value !== 'string')) return fallback;
    const n = Number(value);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
  };
  function normalize(input) {
    const value = object(input);
    const p = object(value.preferences);
    const profile = object(value.profile);
    const name =
      typeof profile.displayName === 'string'
        ? Array.from(profile.displayName.replace(/[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/g, '').trim())
            .slice(0, 40)
            .join('')
        : '';
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
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);

  const copy = {
    zh: {
      title: '设置', general: '通用', practice: '练习', editor: '编辑器', account: '个人资料', library: '题库', data: '数据与备份', guide: '使用指南', about: '关于 Plume',
      saved: '更改会自动保存在本机。',
      appearance: '外观', theme: '外观', system: '自动', light: '浅色', dark: '深色', reduceMotion: '减少动态效果', reduceMotionNote: '关闭界面过渡动画。系统的“减少动态效果”设置同样生效。',
      languages: '语言', uiLang: '界面语言', statementLang: '默认题面语言', languageNote: '三种语言的题面都保存在本机，切换时无需联网。',
      launch: '启动', homePage: '打开时显示', dashboard: '今日', library: '题库', learn: '课程',
      restore: '默认设置', restoreNote: '恢复外观、每日目标、阅读与编辑器设置。语言、代码、笔记、记录与 AtCoder 连接都会保留。', restoreButton: '恢复默认',
      routine: '练习目标', dailyGoal: '每日目标', dailyGoalUnit: '题', goalNote: '只用于安排每天的练习量，不影响题目难度或模拟分数。',
      reading: '题面', statementFontSize: '题面字号', readingPreview: '预览', previewSentence: '给定整数 N，输出 1 到 N 的所有整数之和。',
      points: '计分', scoringNote: '本地样例只检查输出；AtCoder 题目的正式 AC 由 AtCoder 判题确认。模拟考试可以使用每题 100 分或原题配点。', readScoring: '计分方式说明',
      history: '模拟记录', openHistory: '查看模拟记录',
      codeAppearance: '代码', editorFontSize: '代码字号', tabSize: '缩进宽度', spaces: '个空格', lineWrapping: '自动换行', editorNote: '按 Tab 插入所选数量的空格。自动换行只影响显示，不改动代码。', editorPreview: 'Python 预览',
      shortcuts: '快捷键', runShortcut: '运行全部用例', judgeShortcut: '评测（原创题与导入的题）', searchShortcut: '搜索题目', findShortcut: '在编辑器中查找', settingsShortcut: '打开设置', editorHelp: '编写与测试指南',
      profile: '个人资料', displayName: '显示名称', nameNote: '只在本机显示，不会改动 AtCoder 用户名。', localProfileNote: '无需注册账户，资料与练习记录只保存在当前设备。',
      connection: 'AtCoder', handle: '用户名', handleNote: '只需公开的用户名，不需要密码。更换用户名会替换已同步的提交记录。', sync: '保存并同步', autoSync: '启动时自动同步', lastSync: '上次同步', never: '尚未同步', syncGuide: '同步说明',
      builtIn: '内置题库', problems: '道题', statements: '份题面', samples: '组样例', coverage: '竞赛数据', coverageNote: '221 是内置题目总数；数据覆盖数来自 AtCoder Problems 的索引，其中 7 道 APG 练习未被收录，但题面完整。',
      metadata: '分值与难度', metadataNote: '刷新需要联网；题面与 Python 练习都可以离线使用。', refresh: '刷新',
      packs: '题库包', packsNote: '题库包是一个 JSON 文件，可以包含题面、样例、隐藏用例、数据文件与参考解答。导入的题目会出现在题库、搜索与模拟考试中。',
      importPack: '导入题库包…', packTemplate: '下载模板', packFormat: '格式说明', bundled: '内置', installed: '已导入', exportPack: '导出', removePack: '移除',
      packCount: '{problems} 题', packSets: '{sets} 套', noPacks: '还没有导入的题库包。',
      backup: '备份与恢复', backupNote: '备份包含代码、笔记、收藏、提交记录、模拟记录、课程进度、偏好设置和导入的题库包。导入备份会替换当前记录。', export: '导出备份…', import: '导入备份…',
      lastBackup: '上次导出', noBackup: '尚未导出', storage: '本机记录', storageNote: '当前记录的大小，不含随应用提供的题库与 Python 运行环境。', persistence: '存储保护', persistenceNative: '记录写入应用支持目录，每次更改都会立即确认。',
      backupGuide: '备份与隐私', reset: '清空记录', resetNote: '删除本机的全部练习记录。题库与课程会保留，操作前会再次确认。', resetButton: '清空本机记录…',
      guidesTitle: '使用指南', guidesIntro: '从第一道题到完整的模拟考试，按实际操作说明每个功能。', backGuides: '全部指南', related: '相关页面',
      version: '版本', aboutBody: '为东京大学创造情报学上机考试准备的编程练习环境。题库、课程、代码与复习记录都在同一处，并且完全在本机运行。',
      offline: '本机优先', offlineBody: '题面、课程与 Python 运行环境随应用提供，可离线使用。应用没有广告，也不收集使用数据；只有 AtCoder 同步与题目数据更新会访问公开服务。',
      sources: '来源与许可', sourcesBody: 'AtCoder 题面的版权归 AtCoder 及原作者所有，中文题面为学习用译文。原创套题与课程随项目发布。Plume 与 AtCoder、东京大学及 Apple 均无隶属关系。',
      notices: '第三方声明', licenses: '开源许可', github: 'GitHub', docs: '项目说明', countLabel: '题目', languageCount: '题面语言', lessonCount: '课程',
      openAcademy: '打开课程', openLibrary: '打开题库', openMock: '打开模拟考试', openAccount: '打开个人资料', openData: '打开数据与备份', openLibrarySettings: '打开题库设置', openEditor: '打开第一道题',
      developer: '开发者', persistent: '已开启：浏览器不会在空间不足时自动清理这些记录。', notPersistent: '未开启：浏览器可能在空间不足时清理记录，请定期导出备份。'
    },
    ja: {
      title: '設定', general: '一般', practice: '練習', editor: 'エディタ', account: 'プロフィール', library: '問題集', data: 'データとバックアップ', guide: '使い方', about: 'Plume について',
      saved: '変更はこの端末に自動で保存されます。',
      appearance: '外観', theme: '外観', system: '自動', light: 'ライト', dark: 'ダーク', reduceMotion: '視差効果を減らす', reduceMotionNote: '画面遷移のアニメーションを止めます。システムの「視差効果を減らす」設定も反映されます。',
      languages: '言語', uiLang: '表示言語', statementLang: '問題文の既定の言語', languageNote: '3 言語の問題文はすべて端末内にあり、切り替えに通信は不要です。',
      launch: '起動', homePage: '起動時に表示', dashboard: '今日', library: '問題', learn: 'コース',
      restore: '既定の設定', restoreNote: '外観、1 日の目標、表示とエディタの設定を元に戻します。言語、コード、メモ、記録、AtCoder の接続は残ります。', restoreButton: '既定に戻す',
      routine: '練習の目標', dailyGoal: '1 日の目標', dailyGoalUnit: '問', goalNote: '毎日の練習量の目安です。問題の難易度や模擬試験の得点には影響しません。',
      reading: '問題文', statementFontSize: '問題文の文字サイズ', readingPreview: 'プレビュー', previewSentence: '整数 N が与えられます。1 から N までの整数の和を出力してください。',
      points: '採点', scoringNote: 'ローカルのサンプルは出力を確認するだけです。AtCoder の問題の正式な AC は AtCoder の判定で確認します。模擬試験では各 100 点か元問題の配点を選べます。', readScoring: '採点方法について',
      history: '模擬試験の履歴', openHistory: '履歴を見る',
      codeAppearance: 'コード', editorFontSize: 'コードの文字サイズ', tabSize: 'インデント幅', spaces: 'スペース', lineWrapping: '行を折り返す', editorNote: 'Tab で指定した数のスペースを入力します。折り返しは表示だけを変え、コードは変更しません。', editorPreview: 'Python のプレビュー',
      shortcuts: 'キーボードショートカット', runShortcut: 'すべてのケースを実行', judgeShortcut: '採点（オリジナル・読み込んだ問題）', searchShortcut: '問題を検索', findShortcut: 'エディタ内を検索', settingsShortcut: '設定を開く', editorHelp: '編集とテストの使い方',
      profile: 'プロフィール', displayName: '表示名', nameNote: 'この端末の表示にだけ使います。AtCoder のユーザー名は変わりません。', localProfileNote: 'アカウント登録は不要です。プロフィールと練習の記録はこの端末にだけ保存されます。',
      connection: 'AtCoder', handle: 'ユーザー名', handleNote: '公開されているユーザー名だけを使い、パスワードは不要です。ユーザー名を変えると、同期済みの提出記録が置き換わります。', sync: '保存して同期', autoSync: '起動時に自動で同期', lastSync: '最終同期', never: '未同期', syncGuide: '同期について',
      builtIn: '内蔵の問題', problems: '問', statements: '件の問題文', samples: '組のサンプル', coverage: 'コンテスト情報', coverageNote: '221 は内蔵の問題数です。情報の収録数は AtCoder Problems の索引によるもので、APG の 7 問は索引にありませんが、問題文はそろっています。',
      metadata: '配点と難易度', metadataNote: '更新には通信が必要です。問題文と Python の練習はオフラインで使えます。', refresh: '更新',
      packs: '問題集ファイル', packsNote: '問題集は 1 つの JSON ファイルで、問題文、サンプル、非公開ケース、データファイル、解答例を含められます。読み込んだ問題は一覧、検索、模擬試験に表示されます。',
      importPack: '問題集を読み込む…', packTemplate: 'テンプレート', packFormat: '形式の説明', bundled: '内蔵', installed: '読み込み済み', exportPack: '書き出す', removePack: '削除',
      packCount: '{problems} 問', packSets: '{sets} セット', noPacks: '読み込んだ問題集はまだありません。',
      backup: 'バックアップと復元', backupNote: 'コード、メモ、保存した問題、提出記録、模擬試験、コースの進捗、設定、読み込んだ問題集を含みます。読み込むと現在の記録は置き換わります。', export: 'バックアップを書き出す…', import: 'バックアップを読み込む…',
      lastBackup: '最終書き出し', noBackup: 'まだ書き出していません', storage: '端末内の記録', storageNote: '現在の記録の容量です。同梱の問題集と Python 実行環境は含みません。', persistence: '保存の保護', persistenceNative: '記録はアプリケーションサポートフォルダに書き込まれ、変更のたびに確定されます。',
      backupGuide: 'バックアップとプライバシー', reset: '記録を消去', resetNote: 'この端末の練習記録をすべて削除します。問題集とコースは残り、実行前に確認があります。', resetButton: '端末内の記録を消去…',
      guidesTitle: '使い方', guidesIntro: '最初の一問から模擬試験まで、実際の操作に沿って説明します。', backGuides: 'すべてのガイド', related: '関連するページ',
      version: 'バージョン', aboutBody: '東京大学 創造情報学専攻のプログラミング試験に向けた練習環境です。問題、コース、コード、復習の記録をひとつにまとめ、すべて端末内で動作します。',
      offline: '端末内で完結', offlineBody: '問題文、コース、Python 実行環境を同梱しており、オフラインで使えます。広告はなく、利用状況も収集しません。公開サービスにアクセスするのは AtCoder の同期と問題データの更新だけです。',
      sources: '出典とライセンス', sourcesBody: 'AtCoder の問題文の権利は AtCoder と各作問者に帰属します。中国語の問題文は学習用の翻訳です。オリジナル問題とコースは本プロジェクトとして公開しています。Plume は AtCoder、東京大学、Apple とは関係ありません。',
      notices: '第三者に関する表記', licenses: 'オープンソースライセンス', github: 'GitHub', docs: 'プロジェクトの説明', countLabel: '問題', languageCount: '問題文の言語', lessonCount: 'レッスン',
      openAcademy: 'コースを開く', openLibrary: '問題一覧を開く', openMock: '模擬試験を開く', openAccount: 'プロフィールを開く', openData: 'データとバックアップを開く', openLibrarySettings: '問題集の設定を開く', openEditor: '最初の問題を開く',
      developer: '開発者', persistent: '有効：容量が不足しても、ブラウザはこの記録を自動で削除しません。', notPersistent: '無効：容量が不足すると記録が削除される場合があります。定期的にバックアップを書き出してください。'
    },
    en: {
      title: 'Settings', general: 'General', practice: 'Practice', editor: 'Editor', account: 'Profile', library: 'Library', data: 'Data & Backup', guide: 'User Guide', about: 'About Plume',
      saved: 'Changes are saved automatically on this device.',
      appearance: 'Appearance', theme: 'Appearance', system: 'Auto', light: 'Light', dark: 'Dark', reduceMotion: 'Reduce Motion', reduceMotionNote: 'Turns off interface transitions. The system Reduce Motion setting is also respected.',
      languages: 'Language', uiLang: 'Interface Language', statementLang: 'Default Statement Language', languageNote: 'Statements in all three languages are stored on this device, so switching never needs a connection.',
      launch: 'Startup', homePage: 'Open With', dashboard: 'Today', library: 'Problems', learn: 'Learn',
      restore: 'Default Settings', restoreNote: 'Resets appearance, the daily goal, and reading and editor settings. Languages, code, notes, records and the AtCoder connection are kept.', restoreButton: 'Restore Defaults',
      routine: 'Practice Goal', dailyGoal: 'Daily Goal', dailyGoalUnit: 'problems', goalNote: 'Only used to plan daily practice. It does not change difficulty or mock scores.',
      reading: 'Statements', statementFontSize: 'Statement Text Size', readingPreview: 'Preview', previewSentence: 'Given an integer N, print the sum of all integers from 1 to N.',
      points: 'Scoring', scoringNote: 'Local samples only check output. For AtCoder problems, AtCoder confirms an official AC. Mock exams can use 100 points per problem or the original points.', readScoring: 'How Scoring Works',
      history: 'Mock History', openHistory: 'View Mock History',
      codeAppearance: 'Code', editorFontSize: 'Code Text Size', tabSize: 'Indentation', spaces: 'spaces', lineWrapping: 'Wrap Lines', editorNote: 'Tab inserts the chosen number of spaces. Wrapping changes the display only, never your code.', editorPreview: 'Python preview',
      shortcuts: 'Keyboard Shortcuts', runShortcut: 'Run all cases', judgeShortcut: 'Judge (original and imported problems)', searchShortcut: 'Search problems', findShortcut: 'Find in the editor', settingsShortcut: 'Open Settings', editorHelp: 'Editing and Testing Guide',
      profile: 'Profile', displayName: 'Display Name', nameNote: 'Shown on this device only. It does not change your AtCoder handle.', localProfileNote: 'No account is needed. Your profile and practice records stay on this device.',
      connection: 'AtCoder', handle: 'Handle', handleNote: 'Only your public handle is needed, never a password. Changing the handle replaces synced submissions.', sync: 'Save & Sync', autoSync: 'Sync on Launch', lastSync: 'Last Sync', never: 'Not synced yet', syncGuide: 'About Sync',
      builtIn: 'Built-in Library', problems: 'problems', statements: 'statements', samples: 'sample pairs', coverage: 'Contest Data', coverageNote: '221 is the built-in problem count. Contest data comes from the AtCoder Problems index; seven APG exercises are not indexed there, but their statements are complete.',
      metadata: 'Points and Difficulty', metadataNote: 'Refreshing needs a connection. Statements and Python practice work offline.', refresh: 'Refresh',
      packs: 'Problem Packs', packsNote: 'A problem pack is one JSON file with statements, samples, hidden tests, data files and reference solutions. Imported problems appear in the library, search and mock exams.',
      importPack: 'Import Pack…', packTemplate: 'Download Template', packFormat: 'Format Reference', bundled: 'Built-in', installed: 'Imported', exportPack: 'Export', removePack: 'Remove',
      packCount: '{problems} problems', packCountOne: '1 problem', packSets: '{sets} sets', packSetsOne: '1 set', noPacks: 'No imported packs yet.',
      backup: 'Backup and Restore', backupNote: 'Includes code, notes, saved problems, submissions, mock exams, course progress, preferences and imported packs. Importing a backup replaces your current records.', export: 'Export Backup…', import: 'Import Backup…',
      lastBackup: 'Last Export', noBackup: 'Not exported yet', storage: 'Records on This Device', storageNote: 'Size of your current records, excluding the bundled library and Python runtime.', persistence: 'Storage Protection', persistenceNative: 'Records are written to the Application Support folder and confirmed on every change.',
      backupGuide: 'Backup and Privacy', reset: 'Erase Records', resetNote: 'Deletes all practice records on this device. Problems and lessons stay. You will be asked to confirm.', resetButton: 'Erase Records on This Device…',
      guidesTitle: 'User Guide', guidesIntro: 'From your first problem to a full mock exam, one feature at a time.', backGuides: 'All Guides', related: 'Related Pages',
      version: 'Version', aboutBody: 'A practice environment for the University of Tokyo Creative Informatics programming exam. Problems, lessons, code and review notes live in one place, and everything runs on your device.',
      offline: 'Local First', offlineBody: 'Statements, lessons and the Python runtime ship with the app and work offline. There are no ads and no usage tracking; only AtCoder sync and problem-data updates contact public services.',
      sources: 'Sources and Licenses', sourcesBody: 'AtCoder statements belong to AtCoder and their authors; Chinese statements are study translations. The original problem sets and lessons are published with this project. Plume is not affiliated with AtCoder, the University of Tokyo or Apple.',
      notices: 'Third-Party Notices', licenses: 'Open-Source License', github: 'GitHub', docs: 'Project Documentation', countLabel: 'Problems', languageCount: 'Statement languages', lessonCount: 'Lessons',
      openAcademy: 'Open Course', openLibrary: 'Open Problems', openMock: 'Open Mock Exam', openAccount: 'Open Profile', openData: 'Open Data & Backup', openLibrarySettings: 'Open Library Settings', openEditor: 'Open the First Problem',
      developer: 'Developer', persistent: 'On: the browser will not clear these records when space runs low.', notPersistent: 'Off: the browser may clear records when space runs low. Export backups regularly.'
    }
  };

  const helpArticles = {
    start: {
      zh: {
        title: '从第一道题开始', summary: '认识课程、题库与练习记录。',
        sections: [
          {title: '选择起点', body: ['没有 Python 基础时，先打开课程。课程从输入输出开始，依次讲到条件、循环、数据结构、常用算法，最后是上机考试特有的文件读取、递归、最短路和模拟。已有基础可以直接进入题库。', '题库的 L0–L5 是本应用的训练阶段，与 ABC 的 A–D 题号并不一一对应。建议从能独立完成的最低阶段开始。']},
          {title: '完成一次练习', steps: ['打开题目，读完题意、约束、输入输出格式和样例。题面语言可以随时切换。', '在右侧编辑器写程序，按 ⌘↵（Windows 为 Ctrl+Enter）运行全部样例，再添加自己的边界用例。', 'AtCoder 题目通过“提交”按钮到 AtCoder 提交；在设置中填写用户名并同步后，通过的题会标为“已验证”。', '原创题和导入的题可以直接点“评测”，在本机运行全部样例与隐藏用例。']},
          {title: '安排下一次练习', body: ['“今日”页面保留上次打开的题目；学习路线按先修顺序推荐题目；收藏的题和出过错的题会进入复习。每日目标只用于安排练习量。']}
        ],
        actions: [['/learn', 'openAcademy'], ['/problems', 'openLibrary']]
      },
      ja: {
        title: '最初の一問から', summary: 'コース、問題一覧、練習記録の使い方。',
        sections: [
          {title: '始める場所を選ぶ', body: ['Python が初めてなら、コースから始めましょう。入出力から始まり、条件分岐、繰り返し、データ構造、代表的なアルゴリズム、そして試験に特有のファイル読み込み、再帰、最短路、シミュレーションへと進みます。基礎があれば問題一覧から始められます。', 'L0–L5 はこのアプリの練習段階で、ABC の A–D とは一対一に対応しません。自力で解ける最も低い段階から始めてください。']},
          {title: '一問を練習する', steps: ['問題文、制約、入出力形式、サンプルを読みます。問題文の言語はいつでも切り替えられます。', '右側のエディタでコードを書き、⌘↵（Windows では Ctrl+Enter）ですべてのサンプルを実行します。境界のケースも自分で追加しましょう。', 'AtCoder の問題は「提出」から AtCoder に提出します。設定でユーザー名を登録して同期すると、正解した問題は「確認済み」になります。', 'オリジナル問題と読み込んだ問題は「採点」で、すべてのサンプルと非公開ケースを端末内で実行できます。']},
          {title: '次の練習へ', body: ['「今日」には前回開いた問題が残ります。学習ルートは前提の順に問題を提案し、保存した問題と間違えた問題は復習に集まります。1 日の目標は練習量の目安です。']}
        ],
        actions: [['/learn', 'openAcademy'], ['/problems', 'openLibrary']]
      },
      en: {
        title: 'Start with Your First Problem', summary: 'Find your way around lessons, problems and records.',
        sections: [
          {title: 'Choose a starting point', body: ['If you are new to Python, open the course. It starts with input and output, moves through conditions, loops, data structures and core algorithms, and ends with the skills the exam adds: reading files, recursion, shortest paths and simulation. If you know the basics, go straight to the problems.', 'L0–L5 are training stages in this app; they do not map one-to-one to ABC letters A–D. Start at the lowest stage you can solve on your own.']},
          {title: 'Work through one problem', steps: ['Read the statement, constraints, input and output formats, and samples. You can switch the statement language at any time.', 'Write your program in the editor on the right and press ⌘↵ (Ctrl+Enter on Windows) to run every sample. Then add boundary cases of your own.', 'Submit AtCoder problems on AtCoder with the Submit button. Add your handle in Settings and sync, and accepted problems are marked Verified.', 'Original and imported problems have a Judge button that runs every sample and hidden test on your device.']},
          {title: 'Plan the next session', body: ['Today keeps the problem you opened last. The study path suggests problems in prerequisite order, and saved or missed problems collect in Review. The daily goal only plans your practice.']}
        ],
        actions: [['/learn', 'openAcademy'], ['/problems', 'openLibrary']]
      }
    },
    editor: {
      zh: {
        title: '编写代码与本地测试', summary: '运行样例、添加用例并读懂结果。',
        sections: [
          {title: '编辑器', body: ['每道题的代码都会自动保存。编辑器支持 Python 高亮、行号、自动缩进、括号补全、查找与撤销；字号、缩进宽度与自动换行可以在“编辑器”设置中调整。']},
          {title: '运行与核对', steps: ['编辑器下方的面板列出全部用例：样例会自动载入，也可以点“+”添加自己的用例。', '按 ⌘↵ 或点“运行”，依次运行全部用例；每个用例标签上的圆点显示结果，点开标签查看输入、期望输出与实际输出。', '取消勾选“期望输出”时，只运行并显示结果；勾选后，期望输出也可以是空字符串，用来确认程序没有任何输出。', '出现运行错误时，错误信息只显示你自己代码中的位置。先看最后一行的错误种类，再检查输入格式、变量名、下标和除数。']},
          {title: '本地结果意味着什么', body: ['一次运行会启动一个全新的 Python 解释器；同一次运行中的每个用例都从全新的 __main__、标准输入输出和工作目录开始。随应用提供的 Python 可以离线使用。', '与样例一致并不代表能通过 AtCoder 的全部测试。少数允许多种答案或有误差范围的题目，本地会使用专用检查器；其余题目按文本比较，行末空格与末尾空行不计。']},
          {title: '查看题解', body: ['“题解”标签默认隐藏，题目通过后自动显示，也可以手动展开。AtCoder 题目提供官方题解与他人的 AC 代码链接；原创题附有思路说明与参考解答。']}
        ],
        actions: [['/problem/PracticeA', 'openEditor']]
      },
      ja: {
        title: 'コードの編集とローカルテスト', summary: 'サンプルの実行、ケースの追加、結果の読み方。',
        sections: [
          {title: 'エディタ', body: ['コードは問題ごとに自動で保存されます。Python の色分け、行番号、自動インデント、括弧の補完、検索、取り消しに対応しています。文字サイズ、インデント幅、折り返しは「エディタ」の設定で変更できます。']},
          {title: '実行して確かめる', steps: ['エディタの下のパネルにすべてのケースが並びます。サンプルは自動で読み込まれ、「+」で自分のケースを追加できます。', '⌘↵ または「実行」で、すべてのケースを順に実行します。タブの点が結果を示し、タブを開くと入力、期待される出力、実際の出力を確認できます。', '「期待される出力」のチェックを外すと、実行して結果を表示するだけになります。チェックした場合は空文字列も指定でき、何も出力しないことを確かめられます。', '実行時エラーでは、自分のコードの位置だけが表示されます。最後の行のエラーの種類を見てから、入力形式、変数名、添字、除数を確認しましょう。']},
          {title: 'ローカルの結果が示すこと', body: ['実行のたびに新しい Python インタプリタが起動し、同じ実行内の各ケースは新しい __main__、標準入出力、作業フォルダから始まります。同梱の Python はオフラインで使えます。', 'サンプルとの一致は、AtCoder のすべてのテストに通ることを意味しません。複数の正解や誤差を認める一部の問題には専用のチェッカーを使い、それ以外は行末の空白と末尾の空行を無視して文字列を比較します。']},
          {title: '解説を見る', body: ['「解説」タブは最初は隠れていて、正解すると自動で表示されます。手動で開くこともできます。AtCoder の問題では公式解説と AC 提出へのリンクを、オリジナル問題では考え方と解答例を確認できます。']}
        ],
        actions: [['/problem/PracticeA', 'openEditor']]
      },
      en: {
        title: 'Editing and Local Tests', summary: 'Run samples, add cases and read the results.',
        sections: [
          {title: 'The editor', body: ['Code is saved automatically for every problem. The editor provides Python highlighting, line numbers, automatic indentation, bracket completion, search and undo. Change text size, indentation width and wrapping in Editor settings.']},
          {title: 'Run and compare', steps: ['The panel below the editor lists every case. Samples are loaded automatically; add your own with the + button.', 'Press ⌘↵ or click Run to run every case in turn. The dot on each case tab shows its result; open a tab to see the input, the expected output and your output.', 'With Expected Output unchecked, the case only runs and shows its output. When checked, the expected output may be empty, which confirms that the program prints nothing.', 'For a runtime error, the traceback shows only lines from your own code. Read the error type on the last line, then check the input format, names, indices and divisors.']},
          {title: 'What a local result means', body: ['Every run starts a fresh Python interpreter; each case within a run starts with a new __main__ module, fresh standard streams and a fresh working folder. The bundled Python works offline.', 'Matching the samples does not mean a solution passes every AtCoder test. The few problems that accept several answers or a numeric tolerance use a task-specific checker; everything else is compared as text, ignoring trailing spaces and trailing blank lines.']},
          {title: 'Consult a solution', body: ['The Solution tab stays hidden until you solve the problem, or until you open it yourself. AtCoder problems link to the official editorial and to accepted submissions; original problems include an explanation and a reference solution.']}
        ],
        actions: [['/problem/PracticeA', 'openEditor']]
      }
    },
    scoring: {
      zh: {
        title: '计分与限时模拟', summary: '区分本地结果、练习进度与模拟分数。',
        sections: [
          {title: '四种记录', rows: [['本地运行', '只检查当前用例，不计入任何记录。'], ['手动记录', '在其他地方提交后自己记下的结果，不代表官方验证。'], ['已验证 AC', '从 AtCoder 公开提交记录同步的正式通过结果。'], ['本地评测', '原创题与导入题跑完全部样例和隐藏用例后的结果。']]},
          {title: '一次模拟如何进行', steps: ['选择题目范围、时长与计分方式后开始。AtCoder 题目每次抽三题，优先抽取未完成的题；原创套题一次做完整套小问。', '每题 100 分模式下三题共 300 分；原题配点模式使用开始时保存的官方分值；原创套题按小问配分。', 'AtCoder 题目可以在模拟页面手动记录判定，或同步模拟期间的 AtCoder 提交；原创题在问题页点“评测”即自动计入。普通的样例运行不会增加模拟分。', '结束后可以查看逐题结果与罚时，历史记录保存在模拟页面。']},
          {title: '罚时示例', body: ['假设 A 题在第 30 分钟 AC，B 题先 WA 一次、在第 80 分钟 AC，C 题未通过。每题 100 分时得分为 200 / 300；含罚时用时为 80 + 5 = 85 分钟。', '只有最终 AC 的题目，在首次 AC 之前的计罚错误才计入罚时，每次加 5 分钟；CE 与 IE 不计罚时。训练分数不是东京大学的评分，也不能保证考试成绩。']}
        ],
        actions: [['/mock', 'openMock'], ['/mock?history', 'openHistory']]
      },
      ja: {
        title: '採点と時間制限付きの模擬試験', summary: 'ローカルの結果、練習の進捗、模擬試験の得点を区別する。',
        sections: [
          {title: '4 種類の記録', rows: [['ローカル実行', '選んだケースを確かめるだけで、記録には残りません。'], ['手動の記録', '他の場所で提出した結果を自分で記録したもので、公式の確認ではありません。'], ['確認済み AC', 'AtCoder の公開提出から同期した正式な正解です。'], ['ローカル採点', 'オリジナル問題と読み込んだ問題で、すべてのサンプルと非公開ケースを実行した結果です。']]},
          {title: '模擬試験の流れ', steps: ['出題範囲、制限時間、採点方式を選んで開始します。AtCoder の問題は未完了のものを優先して 3 問を選び、オリジナル問題は 1 セットの小問をすべて解きます。', '各 100 点の方式では 3 問で 300 点です。元問題の配点方式は開始時に保存した公式の配点を、オリジナル問題は小問ごとの配点を使います。', 'AtCoder の問題は模擬試験のページで判定を手動記録するか、試験中の提出を同期します。オリジナル問題は問題ページで「採点」すると自動で反映されます。通常のサンプル実行では加点されません。', '終了後に問題ごとの結果とペナルティを確認できます。履歴は模擬試験のページに残ります。']},
          {title: 'ペナルティの例', body: ['A を 30 分で AC、B は WA を 1 回出した後 80 分で AC、C は未正解だった場合、各 100 点なら得点は 200 / 300、ペナルティ込みの時間は 80 + 5 = 85 分です。', '最終的に正解した問題について、最初の AC より前の対象となる誤答だけを 1 回 5 分として加算します。CE と IE は含みません。練習の得点は東京大学の採点ではなく、入試の得点を保証するものでもありません。']}
        ],
        actions: [['/mock', 'openMock'], ['/mock?history', 'openHistory']]
      },
      en: {
        title: 'Scoring and Timed Mock Exams', summary: 'Keep local results, practice progress and mock scores apart.',
        sections: [
          {title: 'Four kinds of record', rows: [['Local run', 'Checks the chosen cases only; nothing is recorded.'], ['Manual record', 'A result you note yourself after submitting elsewhere, without official verification.'], ['Verified AC', 'An accepted result synced from your public AtCoder submissions.'], ['Local judge', 'The result of running every sample and hidden test of an original or imported problem.']]},
          {title: 'Run a mock exam', steps: ['Choose the problems, duration and scoring, then start. AtCoder sessions draw three problems, preferring unsolved ones; an original set asks you to finish every part of one set.', 'With 100 points each, three problems are worth 300. Original-points mode uses the official points saved when the session starts; original sets use the points of each part.', 'For AtCoder problems, record verdicts on the mock page or sync submissions made during the session. Original problems update the score when you judge them on the problem page. Ordinary sample tests do not add mock points.', 'When the session ends, review each problem and the penalty time. Past sessions stay on the mock page.']},
          {title: 'A penalty example', body: ['Suppose A is accepted at minute 30, B has one WA and is accepted at minute 80, and C remains unsolved. With 100 points each the score is 200 out of 300, and the time including penalties is 80 + 5 = 85 minutes.', 'Only penalized submissions before the first AC on a solved problem count, five minutes each; CE and IE add no penalty. Practice points are not University of Tokyo grading and do not guarantee an exam score.']}
        ],
        actions: [['/mock', 'openMock'], ['/mock?history', 'openHistory']]
      }
    },
    sync: {
      zh: {
        title: '连接 AtCoder', summary: '同步公开提交，结果来源始终清晰。',
        sections: [
          {title: '建立连接', steps: ['在“个人资料”中输入 AtCoder 用户名。不要输入邮箱、密码或其他凭据。', '点击“保存并同步”。只有本应用题库中的题目会计入进度。', '同步完成后，在题目记录与“今日”页面查看已验证的结果；也可以开启启动时自动同步。']},
          {title: '同步的范围', body: ['同步读取 AtCoder Problems 提供的公开提交数据，可能会有几分钟到几小时的延迟；它不会替你提交代码。没有网络时，已有记录与本地练习照常可用。', '更换用户名会替换当前账户同步来的提交，手动记录与代码会保留。历史模拟保留开始时关联的账户，不会混入其他用户的提交。']},
          {title: '没有看到最新的 AC', body: ['先在 AtCoder 确认判题已经结束、题号一致，稍后再同步一次。再检查用户名是否正确，以及这道题是否在本应用的题库中。模拟只计入模拟期间的提交，开始之前取得的 AC 不会计入。']}
        ],
        actions: [['/settings?section=account', 'openAccount']]
      },
      ja: {
        title: 'AtCoder に接続する', summary: '公開の提出を同期し、結果の出どころを明確に保つ。',
        sections: [
          {title: '接続する', steps: ['「プロフィール」に AtCoder のユーザー名を入力します。メールアドレス、パスワード、その他の認証情報は入力しないでください。', '「保存して同期」を選びます。進捗に反映されるのは、このアプリの問題集にある問題だけです。', '同期が終わると、問題の履歴と「今日」で確認済みの結果を見られます。起動時の自動同期も設定できます。']},
          {title: '同期される内容', body: ['AtCoder Problems が公開している提出データを読み込むため、反映まで数分から数時間かかることがあります。コードを代わりに提出する機能ではありません。通信できなくても、保存済みの記録とローカルの練習は使えます。', 'ユーザー名を変えると、同期済みの提出は新しいアカウントのものに置き換わります。手動の記録とコードは残ります。過去の模擬試験は開始時のアカウントを保持し、他のユーザーの提出と混ざりません。']},
          {title: '最新の AC が表示されない', body: ['AtCoder で判定が終わっていること、問題番号が合っていることを確認し、少し待ってから同期し直してください。ユーザー名と、その問題がこのアプリの問題集に含まれているかも確認しましょう。模擬試験には試験時間内の提出だけが入り、開始前の AC は加算されません。']}
        ],
        actions: [['/settings?section=account', 'openAccount']]
      },
      en: {
        title: 'Connect AtCoder', summary: 'Sync public submissions and keep every result’s source clear.',
        sections: [
          {title: 'Connect a handle', steps: ['Enter your AtCoder handle in Profile. Never enter an email address, password or other credentials.', 'Choose Save & Sync. Only problems in this app’s library count toward progress.', 'After syncing, verified results appear in each problem’s history and on Today. You can also sync automatically on launch.']},
          {title: 'What sync does', body: ['Sync reads public submission data published by AtCoder Problems, which can lag from minutes to hours. It never submits code for you. Without a connection, existing records and local practice keep working.', 'Changing the handle replaces the synced submissions and keeps manual records and code. Past mock exams keep the account they started with, so another user’s submissions never mix in.']},
          {title: 'If a recent AC is missing', body: ['Check on AtCoder that judging has finished and the problem ID matches, then sync again a little later. Also check your handle and whether the problem is in this app’s library. Mock exams count only submissions made during the session; an earlier AC is not added.']}
        ],
        actions: [['/settings?section=account', 'openAccount']]
      }
    },
    backup: {
      zh: {
        title: '备份、恢复与隐私', summary: '记录保存在哪里，以及如何迁移到另一台设备。',
        sections: [
          {title: '保存位置', body: ['macOS 应用把记录写入“应用支持”目录中的 org.cipractice.desktop/state.json，每次更改都会立即确认写入。浏览器版本保存在当前浏览器、当前网址与端口对应的本地存储中；浏览器版本会请求“存储保护”，避免在空间不足时被自动清理。', '浏览器与 macOS 应用的记录互不共享，不同浏览器之间也不共享。清除网站数据或在设置中清空记录都会删除它们，所以请定期导出备份。']},
          {title: '迁移到另一台设备', steps: ['在“数据与备份”中导出备份，保留好这个 JSON 文件。', '在目标设备上打开应用；如果那里已有需要保留的记录，先把它们导出。', '选择“导入备份”，确认后恢复。导入会替换当前记录，而不是合并。', '恢复后检查代码、模拟记录、课程进度与导入的题库包。']},
          {title: '网络与个人数据', body: ['应用没有注册流程，也不会上传你的代码或备份。只有 AtCoder 同步与题目数据更新会访问公开服务；打开 AtCoder 或 GitHub 链接会进入对应网站。', '备份中包含代码、笔记和 AtCoder 用户名，请按个人文件保管，不要提交到公开的 GitHub 仓库。']}
        ],
        actions: [['/settings?section=data', 'openData']]
      },
      ja: {
        title: 'バックアップ、復元、プライバシー', summary: '記録の保存場所と、別の端末への移し方。',
        sections: [
          {title: '保存場所', body: ['macOS アプリは記録を「Application Support」内の org.cipractice.desktop/state.json に書き込み、変更のたびに確定します。ブラウザ版は、使っているブラウザと URL・ポートごとのローカルストレージに保存され、容量不足で自動削除されないよう「保存の保護」を要求します。', 'ブラウザと macOS アプリの記録は共有されず、ブラウザ同士でも共有されません。サイトデータの消去や設定での記録の消去で削除されるため、定期的にバックアップを書き出してください。']},
          {title: '別の端末に移す', steps: ['「データとバックアップ」でバックアップを書き出し、JSON ファイルを保管します。', '移行先でアプリを開きます。残したい記録があれば、先に書き出しておきます。', '「バックアップを読み込む」を選び、確認して復元します。読み込みは現在の記録を置き換え、統合はしません。', '復元後、コード、模擬試験の履歴、コースの進捗、読み込んだ問題集を確認します。']},
          {title: '通信と個人データ', body: ['登録手続きはなく、コードやバックアップをアップロードすることもありません。公開サービスにアクセスするのは AtCoder の同期と問題データの更新だけで、AtCoder や GitHub のリンクを開くと各サイトに移動します。', 'バックアップにはコード、メモ、AtCoder のユーザー名が含まれます。個人のファイルとして保管し、公開の GitHub リポジトリには置かないでください。']}
        ],
        actions: [['/settings?section=data', 'openData']]
      },
      en: {
        title: 'Backup, Restore and Privacy', summary: 'Where your records live and how to move them.',
        sections: [
          {title: 'Where records are stored', body: ['The macOS app writes records to org.cipractice.desktop/state.json in Application Support and confirms every change on disk. The browser version uses local storage for the current browser, address and port, and requests storage protection so that it is not cleared when space runs low.', 'Records are not shared between the browser and the macOS app, or between browsers. Clearing site data or erasing records in Settings deletes them, so export backups regularly.']},
          {title: 'Move to another device', steps: ['Export a backup from Data & Backup and keep the JSON file.', 'Open the app on the other device. If it already has records you want to keep, export them first.', 'Choose Import Backup and confirm. Importing replaces the current records; it does not merge them.', 'Check your code, mock history, course progress and imported packs afterwards.']},
          {title: 'Network use and personal data', body: ['There is no sign-up, and the app never uploads your code or backups. Only AtCoder sync and problem-data updates contact public services; opening an AtCoder or GitHub link visits that site.', 'Backups contain your code, notes and AtCoder handle. Keep them as personal files and do not commit them to a public GitHub repository.']}
        ],
        actions: [['/settings?section=data', 'openData']]
      }
    },
    academy: {
      zh: {
        title: '用课程打好基础', summary: '先理解一个概念，再用程序检验它。',
        sections: [
          {title: '课程与题库的分工', body: ['课程讲解 Python 与算法；题库提供独立练习。课程里的练习用来检查当前知识点，不会计入 AtCoder 记录，也不会增加模拟分数。']},
          {title: '学完一课的方法', body: ['每课先列出学习目标，然后按概念、执行过程、示例和常见错误展开。代码示例附有输入与输出，先自己预测结果，再对照。', '“检查理解”的问题展开后才显示推理过程。练习先给出要求和样例；运行检查后，可以展开每个用例查看差异。提示与参考实现随时可以打开，但只有全部测试通过才会记为完成。']},
          {title: '建议的顺序', steps: ['从输入输出、变量和运算开始，确认自己能把题目描述写成程序。', '学习条件、循环、字符串和列表，再进入集合、字典与计数。', '理解复杂度后，练习排序、全探索、前缀和与二分等常用方法，接着是图搜索与动态规划。', '最后一章针对上机考试：读取数据文件、递归与记忆化、优先队列与最短路、模拟与表达式解析。每学完一课就去做关联题目。']},
          {title: '从课程到考试', body: ['课程进度与题库进度分开保存。学完课程不代表达到目标分数，还需要用 L0–L5 的题目和限时模拟检查实现是否准确、边界是否完整、时间是否够用。', '学习顺序是训练建议，并非东京大学的官方大纲，请结合当年的考试要求与历年题调整重点。']}
        ],
        actions: [['/learn', 'openAcademy'], ['/problems', 'openLibrary']]
      },
      ja: {
        title: 'コースで基礎を固める', summary: 'ひとつの概念を理解し、プログラムで確かめる。',
        sections: [
          {title: 'コースと問題集の役割', body: ['コースは Python とアルゴリズムを説明し、問題集は自分で解く練習を提供します。コース内の演習は理解の確認用で、AtCoder の記録や模擬試験の得点には加算されません。']},
          {title: 'レッスンの進め方', body: ['各レッスンは到達目標から始まり、概念、実行の流れ、例、よくある誤りの順に進みます。コード例には入力と出力があるので、先に結果を予想してから照らし合わせてください。', '「理解を確かめる」の問いは、開くまで考え方が表示されません。演習には要件とサンプルがあり、実行後はケースごとに差分を確認できます。ヒントと解答例はいつでも開けますが、完了になるのはすべてのテストに通ったときだけです。']},
          {title: 'おすすめの順序', steps: ['入出力、変数、計算から始め、問題文をプログラムにできることを確かめます。', '条件分岐、繰り返し、文字列、リストを学び、集合、辞書、数え上げに進みます。', '計算量を理解してから、ソート、全探索、累積和、二分探索などを練習し、グラフ探索と動的計画法に進みます。', '最後の章は試験向けです。データファイルの読み込み、再帰とメモ化、優先度付きキューと最短路、シミュレーションと式の解析を学びます。各レッスンの後に関連問題を解きましょう。']},
          {title: 'コースから試験へ', body: ['コースと問題集の進捗は別に保存されます。コースを終えただけで目標点に届くわけではありません。L0–L5 の問題と時間制限付きの模擬試験で、実装の正確さ、境界条件、時間配分を確かめてください。', '学習順は練習の提案であり、東京大学の公式シラバスではありません。その年度の試験要項と過去問に合わせて重点を調整してください。']}
        ],
        actions: [['/learn', 'openAcademy'], ['/problems', 'openLibrary']]
      },
      en: {
        title: 'Build a Foundation with the Course', summary: 'Understand a concept, then test it with a program.',
        sections: [
          {title: 'Lessons and problems', body: ['The course explains Python and algorithms; the library is for independent practice. Lesson exercises check the concept at hand. They do not count toward AtCoder records or mock scores.']},
          {title: 'Working through a lesson', body: ['Each lesson opens with its objectives, then covers the concept, an execution trace, examples and common mistakes. Every code example shows its input and output: predict the result before you compare.', 'Self-check questions reveal their reasoning only when opened. Exercises give the requirements and samples; after a check, open each case to see the differences. Hints and reference solutions are always available, but a lesson is complete only when every test passes.']},
          {title: 'A suggested sequence', steps: ['Begin with input, output, variables and arithmetic. Make sure you can turn a problem description into a program.', 'Learn conditions, loops, strings and lists, then sets, dictionaries and counting.', 'After complexity, practice sorting, exhaustive search, prefix sums and binary search, then graph search and dynamic programming.', 'The final chapter targets the exam: reading data files, recursion and memoization, priority queues and shortest paths, simulation and expression parsing. Solve the linked problems after each lesson.']},
          {title: 'From lessons to the exam', body: ['Lesson progress and problem progress are stored separately. Finishing the course does not establish an exam score; use L0–L5 problems and timed mock exams to check accuracy, boundary cases and pacing.', 'The sequence is a training suggestion, not an official University of Tokyo syllabus. Adjust your priorities to the current exam requirements and past papers.']}
        ],
        actions: [['/learn', 'openAcademy'], ['/problems', 'openLibrary']]
      }
    },
    packs: {
      zh: {
        title: '导入自己的题库', summary: '用一个 JSON 文件添加题目、样例与隐藏用例。',
        sections: [
          {title: '题库包包含什么', body: ['题库包是一个 JSON 文件：可以包含多道题，每道题有题面（Markdown 或 HTML，可分别提供中文、日文、英文）、样例、隐藏用例、数据文件、时间限制、比较方式与参考解答。几道题也可以组成一套，共用背景说明与数据文件，就像上机考试的一道大题。', '完整的字段说明见项目中的 docs/PROBLEM_PACKS.md；在“题库”设置中下载模板，是最快的起点。']},
          {title: '导入与更新', steps: ['在“题库”设置中点击“下载模板”，按模板填写自己的题目。', '点击“导入题库包”，选择 JSON 文件。应用会先完整校验，有问题时会指出具体字段。', '导入的题目出现在题库（可按来源筛选）、搜索、模拟考试与复习中，并支持“评测”。', '再次导入相同 id 的题库包会更新它；代码与记录会保留。']},
          {title: '数据与安全', body: ['题面会经过与内置题面相同的安全过滤，脚本与外部资源不会执行或加载。题库包保存在本机，并包含在备份中。移除题库包会同时删除其中题目的代码、笔记与记录。']}
        ],
        actions: [['/settings?section=library', 'openLibrarySettings'], ['/problems', 'openLibrary']]
      },
      ja: {
        title: '自分の問題集を読み込む', summary: '1 つの JSON ファイルで、問題、サンプル、非公開ケースを追加する。',
        sections: [
          {title: '問題集の中身', body: ['問題集は 1 つの JSON ファイルです。複数の問題を含められ、各問題に問題文（Markdown または HTML。中国語・日本語・英語を個別に用意できます）、サンプル、非公開ケース、データファイル、実行時間の上限、比較方法、解答例を指定できます。複数の問題を 1 セットにまとめ、試験の大問のように背景説明とデータファイルを共有することもできます。', 'すべての項目の説明はプロジェクトの docs/PROBLEM_PACKS.md にあります。「問題集」の設定からテンプレートをダウンロードするのが一番の近道です。']},
          {title: '読み込みと更新', steps: ['「問題集」の設定で「テンプレート」を選び、それをもとに自分の問題を書きます。', '「問題集を読み込む」で JSON ファイルを選びます。読み込む前にすべて検証され、問題があれば該当する項目が示されます。', '読み込んだ問題は、一覧（出典で絞り込み可能）、検索、模擬試験、復習に表示され、「採点」も使えます。', '同じ id の問題集を読み込み直すと更新されます。コードと記録は残ります。']},
          {title: 'データと安全性', body: ['問題文には内蔵の問題文と同じ安全フィルタがかかり、スクリプトや外部リソースは実行・読み込みされません。問題集は端末内に保存され、バックアップにも含まれます。問題集を削除すると、その問題のコード、メモ、記録も削除されます。']}
        ],
        actions: [['/settings?section=library', 'openLibrarySettings'], ['/problems', 'openLibrary']]
      },
      en: {
        title: 'Import Your Own Problems', summary: 'Add problems, samples and hidden tests with one JSON file.',
        sections: [
          {title: 'What a pack contains', body: ['A problem pack is one JSON file holding any number of problems. Each problem has a statement (Markdown or HTML, optionally in Chinese, Japanese and English), samples, hidden tests, data files, a time limit, a comparison rule and a reference solution. Several problems can form a set that shares background text and data files, like one multi-part exam question.', 'Every field is documented in docs/PROBLEM_PACKS.md in the project. Downloading the template from Library settings is the quickest start.']},
          {title: 'Import and update', steps: ['In Library settings, choose Download Template and write your problems from it.', 'Choose Import Pack and select the JSON file. It is fully validated first; any problem is reported with the field that caused it.', 'Imported problems appear in the library (filterable by source), search, mock exams and review, and support Judge.', 'Importing a pack with the same id again updates it; your code and records are kept.']},
          {title: 'Data and safety', body: ['Statements pass through the same safety filter as built-in statements; scripts and external resources never run or load. Packs are stored on this device and included in backups. Removing a pack also deletes the code, notes and records for its problems.']}
        ],
        actions: [['/settings?section=library', 'openLibrarySettings'], ['/problems', 'openLibrary']]
      }
    }
  };

  const navSymbols = {
    general: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/>',
    practice: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
    editor: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    account: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1.5a8 8 0 0 1 16 0V21"/>',
    library: '<path d="M4 4.5h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4zM12 5.5v15"/>',
    data: '<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
    guide: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4M12 16.8v.2"/>',
    about: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.2"/>'
  };
  function symbol(section) {
    return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navSymbols[section]}</svg>`;
  }
  function formatBytes(bytes, lang = 'en') {
    const n = Number(bytes);
    if (!Number.isFinite(n) || n < 0) return '—';
    if (n < 1024) return `${Math.round(n)} B`;
    const megabytes = n >= 1024 ** 2;
    return `${new Intl.NumberFormat(member(lang, LANGS, 'en'), {maximumFractionDigits: 1}).format(n / (megabytes ? 1024 ** 2 : 1024))} ${megabytes ? 'MB' : 'KB'}`;
  }
  function persistenceLabel(lang, persisted) {
    const words = copy[member(lang, LANGS, 'en')];
    return persisted ? words.persistent : words.notPersistent;
  }
  function formatDate(stamp, lang, fallback) {
    const value = Number(stamp);
    return Number.isFinite(value) && value > 0 && value < 8640000000000000 ? new Intl.DateTimeFormat(lang, {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(value)) : fallback;
  }

  function render(options = {}) {
    const state = normalize(options.state);
    const lang = member(options.uiLang, LANGS, state.uiLang);
    const productName = typeof options.productName === 'string' && options.productName.trim() ? options.productName.trim().slice(0, 80) : 'Plume';
    const t = key => String(copy[lang][key] ?? key);
    // English needs a singular form; the other languages do not inflect.
    const counted = (key, name, value) => {
      const n = number(value, 0, 100000, 0);
      return t(n === 1 && copy[lang][key + 'One'] !== undefined ? key + 'One' : key).replace(`{${name}}`, n);
    };
    const section = member(options.section, SECTIONS, 'general');
    const counts = object(options.counts);
    const env = object(options.environment);
    const count = (key, fallback) => number(counts[key], 0, 100000, fallback);
    const total = count('total', 221);
    const statements = count('statements', total * 3);
    const samples = count('samples', 630);
    const metadata = count('metadata', 214);
    const lessons = count('lessons', 28);
    const fieldId = path => `setting-${path.replace(/\./g, '-')}`;
    const attr = path => `id="${fieldId(path)}" data-setting="${esc(path)}"`;
    // One row: the label (with an optional explanation) on the left, the control on the right.
    const row = (path, label, control, note = '') =>
      `<div class="settings-row"><div class="settings-label">${path ? `<label for="${fieldId(path)}">${esc(label)}</label>` : `<span>${esc(label)}</span>`}${note ? `<p class="settings-field-note"${path ? ` id="${fieldId(path)}-note"` : ''}>${esc(note)}</p>` : ''}</div><div class="settings-control">${control}</div></div>`;
    const described = (path, note) => (note ? ` aria-describedby="${fieldId(path)}-note"` : '');
    const select = (path, value, items, note = '') =>
      `<span class="select-control"><select ${attr(path)}${described(path, note)}>${items.map(([v, label]) => `<option value="${esc(v)}"${String(v) === String(value) ? ' selected' : ''}>${esc(label)}</option>`).join('')}</select></span>`;
    const toggle = (path, value, note = '') =>
      `<span class="switch"><input type="checkbox" role="switch" ${attr(path)}${described(path, note)}${value ? ' checked' : ''}><span class="switch-track" aria-hidden="true"></span></span>`;
    const input = (path, value, min, max, unit = '') =>
      `<span class="number-field"><input type="number" inputmode="numeric" min="${min}" max="${max}" step="1" ${attr(path)} value="${value}">${unit ? `<span>${esc(unit)}</span>` : ''}</span>`;
    const button = (action, label, classes = '', extra = '') => `<button type="button" class="btn ${classes}" data-settings-action="${action}"${extra}>${esc(label)}</button>`;
    const route = (path, label, classes = '') => `<button type="button" class="btn ${classes}" data-settings-route="${esc(path)}">${esc(label)}</button>`;
    const articleButton = (article, label) => `<button type="button" class="text-button" data-help-article="${article}">${esc(label)}<span aria-hidden="true">›</span></button>`;
    const group = (title, content, note = '') =>
      `<section class="settings-group">${title ? `<h3 class="settings-group-title">${esc(title)}</h3>` : ''}<div class="settings-card">${content}</div>${note ? `<p class="settings-group-note">${note}</p>` : ''}</section>`;
    const value = text => `<span class="settings-value">${esc(text)}</span>`;
    const languages = [
      ['zh', '中文'],
      ['ja', '日本語'],
      ['en', 'English']
    ];
    let content = '';
    if (section === 'general') {
      content =
        group('', row('theme', t('theme'), select('theme', state.theme, ['system', 'light', 'dark'].map(x => [x, t(x)]))) + row('preferences.reduceMotion', t('reduceMotion'), toggle('preferences.reduceMotion', state.preferences.reduceMotion, t('reduceMotionNote')), t('reduceMotionNote'))) +
        group(t('languages'), row('uiLang', t('uiLang'), select('uiLang', state.uiLang, languages)) + row('statementLang', t('statementLang'), select('statementLang', state.statementLang, languages, t('languageNote')), t('languageNote'))) +
        group(t('launch'), row('preferences.homePage', t('homePage'), select('preferences.homePage', state.preferences.homePage, ['dashboard', 'library', 'learn'].map(x => [x, t(x)])))) +
        group('', row('', t('restore'), button('restore-preferences', t('restoreButton'), 'compact'), t('restoreNote')));
    } else if (section === 'practice') {
      content =
        group(t('routine'), row('dailyGoal', t('dailyGoal'), input('dailyGoal', state.dailyGoal, 1, 50, t('dailyGoalUnit')), t('goalNote'))) +
        group(
          t('reading'),
          row('preferences.statementFontSize', t('statementFontSize'), input('preferences.statementFontSize', state.preferences.statementFontSize, 14, 20, 'px')) +
            `<div class="settings-preview reading-preview" aria-label="${esc(t('readingPreview'))}" style="font-size:var(--statement-size,${state.preferences.statementFontSize}px)">${esc(t('previewSentence'))}</div>`
        ) +
        group(t('points'), row('', t('readScoring'), articleButton('scoring', t('readScoring')), t('scoringNote')) + row('', t('history'), route('/mock?history', t('openHistory'), 'compact')));
    } else if (section === 'editor') {
      const indent = ' '.repeat(state.preferences.tabSize);
      content =
        group(
          t('codeAppearance'),
          row('preferences.editorFontSize', t('editorFontSize'), input('preferences.editorFontSize', state.preferences.editorFontSize, 12, 22, 'px')) +
            row('preferences.tabSize', t('tabSize'), select('preferences.tabSize', state.preferences.tabSize, [2, 4].map(n => [n, `${n} ${t('spaces')}`]))) +
            row('preferences.lineWrapping', t('lineWrapping'), toggle('preferences.lineWrapping', state.preferences.lineWrapping)) +
            `<pre class="settings-preview code-preview" aria-label="${esc(t('editorPreview'))}" style="font-size:var(--editor-size,${state.preferences.editorFontSize}px);tab-size:${state.preferences.tabSize};white-space:${state.preferences.lineWrapping ? 'pre-wrap' : 'pre'}"><code><span class="code-comment"># Python 3</span>\nn = <span class="code-builtin">int</span>(<span class="code-builtin">input</span>())\n<span class="code-keyword">for</span> i <span class="code-keyword">in</span> <span class="code-builtin">range</span>(n):\n${indent}<span class="code-builtin">print</span>(i + 1)</code></pre>`,
          esc(t('editorNote'))
        ) +
        group(
          t('shortcuts'),
          [
            ['⌘ ↵', 'Ctrl + Enter', 'runShortcut'],
            ['⇧ ⌘ ↵', 'Ctrl + Shift + Enter', 'judgeShortcut'],
            ['⌘ K', 'Ctrl + K', 'searchShortcut'],
            ['⌘ F', 'Ctrl + F', 'findShortcut'],
            ['⌘ ,', 'Ctrl + ,', 'settingsShortcut']
          ]
            .map(([mac, other, label]) => row('', t(label), `<span class="shortcut"><kbd>${esc(mac)}</kbd><small>${esc(other)}</small></span>`))
            .join(''),
          articleButton('editor', t('editorHelp'))
        );
    } else if (section === 'account') {
      const lastSync = formatDate(env.lastSync ?? options.state?.lastSync, lang, t('never'));
      const handle = typeof options.state?.atcoderUser === 'string' ? options.state.atcoderUser.slice(0, 80) : state.atcoderUser;
      content =
        group(
          t('profile'),
          row('profile.displayName', t('displayName'), `<input class="text-field" type="text" ${attr('profile.displayName')} value="${esc(state.profile.displayName)}" maxlength="80" autocomplete="nickname"${described('profile.displayName', true)}>`, t('nameNote')),
          esc(t('localProfileNote'))
        ) +
        group(
          t('connection'),
          row(
            'atcoderUser',
            t('handle'),
            `<div class="field-with-button"><input class="text-field" type="text" ${attr('atcoderUser')} value="${esc(handle)}" maxlength="40" pattern="[A-Za-z0-9_]*" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="AtCoder ID"${described('atcoderUser', true)}>${button('sync', t('sync'), 'compact')}</div>`,
            t('handleNote')
          ) +
            row('autoSync', t('autoSync'), toggle('autoSync', state.autoSync)) +
            row('', t('lastSync'), value(lastSync)),
          articleButton('sync', t('syncGuide'))
        );
    } else if (section === 'library') {
      const packs = (Array.isArray(options.packs) ? options.packs : []).filter(item => item && typeof item === 'object');
      const packRow = pack =>
        `<div class="settings-row pack-row"><div class="settings-label"><span>${esc(pack.title)}<span class="pack-badge">${esc(t(pack.bundled ? 'bundled' : 'installed'))}</span></span><p class="settings-field-note">${esc([counted('packCount', 'problems', pack.problems), pack.sets ? counted('packSets', 'sets', pack.sets) : '', pack.author || '', pack.description || ''].filter(Boolean).join(' · '))}</p></div><div class="settings-control"><div class="button-row">${button('export-pack', t('exportPack'), 'compact', ` data-pack="${esc(pack.id)}"`)}${pack.bundled ? '' : button('remove-pack', t('removePack'), 'compact danger', ` data-pack="${esc(pack.id)}"`)}</div></div></div>`;
      content =
        group(
          t('builtIn'),
          `<div class="settings-stats">${[
            [total, t('problems')],
            [statements, t('statements')],
            [samples, t('samples')]
          ]
            .map(([n, label]) => `<div><strong>${n}</strong><span>${esc(label)}</span></div>`)
            .join('')}</div>` +
            row('', t('coverage'), value(`${metadata} / ${total}`), t('coverageNote')) +
            row('', t('metadata'), button('refresh-metadata', t('refresh'), 'compact'), t('metadataNote'))
        ) +
        group(
          t('packs'),
          (packs.length ? packs.map(packRow).join('') : `<div class="settings-row"><div class="settings-label"><span class="settings-muted">${esc(t('noPacks'))}</span></div></div>`) +
            `<div class="settings-row"><div class="settings-label"><p class="settings-field-note">${esc(t('packsNote'))}</p></div><div class="settings-control"><div class="button-row">${button('pack-template', t('packTemplate'), 'compact')}${button('import-pack', t('importPack'), 'compact primary')}<input id="packImportFile" type="file" accept="application/json,.json" hidden aria-label="${esc(t('importPack'))}"></div></div></div>`,
          articleButton('packs', t('packFormat'))
        );
    } else if (section === 'data') {
      const persistence = env.isNative ? t('persistenceNative') : '—';
      content =
        group(
          t('backup'),
          row('', t('backup'), `<div class="button-row">${button('export', t('export'), 'compact')}${button('import', t('import'), 'compact')}<input id="settingsImportFile" type="file" accept="application/json,.json" hidden aria-label="${esc(t('import'))}"></div>`, t('backupNote')) +
            row('', t('lastBackup'), value(formatDate(env.lastBackupAt, lang, t('noBackup')))) +
            row('', t('storage'), value(formatBytes(env.storageBytes, lang)), t('storageNote')) +
            row('', t('persistence'), `<span class="settings-value wrap" id="storagePersistence">${esc(persistence)}</span>`),
          articleButton('backup', t('backupGuide'))
        ) + group(t('reset'), row('', t('reset'), button('reset', t('resetButton'), 'compact danger'), t('resetNote')));
    } else if (section === 'guide') {
      const article = Object.hasOwn(helpArticles, options.article) ? helpArticles[options.article][lang] : null;
      content = article
        ? `<article class="settings-help-article"><button type="button" class="text-button settings-help-back" data-settings-section="guide"><span aria-hidden="true">‹</span> ${esc(t('backGuides'))}</button><header><h2>${esc(article.title)}</h2><p>${esc(article.summary)}</p></header>${article.sections
            .map(
              s =>
                `<section><h3>${esc(s.title)}</h3>${(s.body || []).map(p => `<p>${esc(p)}</p>`).join('')}${s.steps ? `<ol>${s.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>` : ''}${s.rows ? `<table><tbody>${s.rows.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table>` : ''}</section>`
            )
            .join('')}<footer><h3>${esc(t('related'))}</h3><div class="button-row">${article.actions.map(([path, key]) => route(path, t(key), 'compact')).join('')}</div></footer></article>`
        : `<div class="settings-guide-intro"><p>${esc(t('guidesIntro'))}</p></div><div class="settings-guide-list">${Object.entries(helpArticles)
            .map(
              ([id, entry], i) =>
                `<button type="button" class="settings-guide-link" data-help-article="${id}"><span class="settings-guide-number">${String(i + 1).padStart(2, '0')}</span><span class="settings-guide-copy"><strong>${esc(entry[lang].title)}</strong><small>${esc(entry[lang].summary)}</small></span><span class="settings-guide-chevron" aria-hidden="true">›</span></button>`
            )
            .join('')}</div>`;
    } else {
      const link = (url, label) => `<a class="text-button" href="${url}" target="_blank" rel="noopener noreferrer">${esc(label)}<span aria-hidden="true">↗</span></a>`;
      content =
        `<section class="settings-about"><img class="settings-about-mark" src="assets/plume.svg" alt="" width="80" height="80"><h2>${esc(productName)}</h2><p class="settings-about-tag">CI Programming Practice</p><p class="settings-developer">${esc(t('developer'))} · <button type="button" class="signature-link" data-settings-action="signature">Aquila</button></p><span class="settings-version">${esc(t('version'))} ${VERSION}</span><p class="settings-about-description">${esc(t('aboutBody'))}</p></section>` +
        group('', `<div class="settings-stats">${[[count('library', total), t('countLabel')], [lessons, t('lessonCount')], [3, t('languageCount')]].map(([n, label]) => `<div><strong>${n}</strong><span>${esc(label)}</span></div>`).join('')}</div>`) +
        group(t('offline'), `<div class="settings-prose"><p>${esc(t('offlineBody'))}</p></div>`) +
        group(t('sources'), `<div class="settings-prose"><p>${esc(t('sourcesBody'))}</p><div class="link-row-inline">${link('https://github.com/AquilaTvT/CIP/blob/main/THIRD_PARTY_NOTICES.md', t('notices'))}${link('https://github.com/AquilaTvT/CIP/blob/main/LICENSE', t('licenses'))}${link('https://github.com/AquilaTvT/CIP', t('github'))}${link('https://github.com/AquilaTvT/CIP#readme', t('docs'))}</div></div>`);
    }
    const sectionTitle = t(section);
    const nav = SECTIONS.map(
      id => `<button type="button" class="settings-nav-item${section === id ? ' active' : ''}" data-settings-section="${id}"${section === id ? ' aria-current="page"' : ''}>${symbol(id)}<span>${esc(t(id))}</span></button>`
    ).join('');
    return `<div class="settings-page"><header class="page-header"><h1>${esc(t('title'))}</h1></header><div class="settings-layout"><nav class="settings-navigation" aria-label="${esc(t('title'))}">${nav}</nav><div class="settings-content"><div class="settings-content-head"><h2>${esc(sectionTitle)}</h2>${['general', 'practice', 'editor', 'account'].includes(section) ? `<p>${esc(t('saved'))}</p>` : ''}</div>${content}</div></div></div>`;
  }
  root.PlumeSettings = Object.freeze({defaults, normalize, render, helpArticles, sections: SECTIONS.slice(), version: VERSION, formatBytes, persistenceLabel});
})(typeof window !== 'undefined' ? window : globalThis);
