// ========== 首页仪表盘 ==========
export const dashboardData = {
  userName: '研友小明',
  dailyGoal: '掌握 50 个考研核心高频词汇',
  stats: {
    streak: 15,
    level: 'Lv.6 · 考研达人',
    tasksCompleted: 4,
    tasksTotal: 6,
    studyHours: 128,
    wordsMastered: 342,
    readingAccuracy: 78,
    writingAvgScore: 16.5,
  },
  progress: 68,
  todayTasks: [
    { id: 1, title: '考研核心词汇 50 个', completed: true, category: '词汇' },
    { id: 2, title: '长难句分析 3 句', completed: true, category: '语法' },
    { id: 3, title: '2018 年阅读 Text 2', completed: true, category: '阅读' },
    { id: 4, title: '大作文模板背诵', completed: true, category: '写作' },
    { id: 5, title: '完形填空练习', completed: false, category: '综合' },
    { id: 6, title: '翻译真题练习', completed: false, category: '翻译' },
  ],
  recentRecords: [
    { id: 1, action: '📚 单词学习', detail: '完成 significant, inevitable, phenomenon 等 10 个单词', time: '09:30', duration: '25 分钟' },
    { id: 2, action: '🔍 长难句解析', detail: 'AI 解析 3 个考研长难句', time: '10:00', duration: '15 分钟' },
    { id: 3, action: '📖 阅读训练', detail: '完成 AI and Future of Work 4 道阅读题', time: '14:30', duration: '30 分钟' },
    { id: 4, action: '✍️ 作文练习', detail: '背诵大作文模板', time: '16:00', duration: '20 分钟' },
  ],
  continueLearning: {
    title: '长难句分析：定语从句的识别与翻译',
    subtitle: '让步状语从句 · 插入语 · 定语从句',
    link: '/sentence-analyzer',
  },
  recommendations: [
    {
      id: 1,
      title: 'AI 长难句深度解析',
      desc: '攻克 5 个考研高频难点句式',
      icon: '📖',
      color: 'from-indigo-500 to-blue-600',
      link: '/sentence-analyzer',
    },
    {
      id: 2,
      title: '2024 阅读真题精练',
      desc: 'Text 1-4 全真模拟+逐题精讲',
      icon: '📝',
      color: 'from-emerald-500 to-teal-600',
      link: '/reading',
    },
    {
      id: 3,
      title: '大作文 AI 批改',
      desc: '智能评分+高级表达润色替换',
      icon: '✍️',
      color: 'from-violet-500 to-purple-600',
      link: '/writing',
    },
  ],
}

// ========== 单词库 ==========
export const vocabularyData = [
  {
    id: 1,
    word: 'significant',
    phonetic: '/sɪɡˈnɪfɪkənt/',
    meaning: 'adj. 重要的；有意义的；显著的',
    example:
      'The study found a significant correlation between exercise and mental health.',
    exampleTrans: '研究发现锻炼与心理健康之间存在显著的相关性。',
    root: 'sign（标记）+ i + fic（做）+ ant（形容词后缀）→ 做出标记的 → 显著的',
    confusing: [
      { word: 'insignificant', meaning: 'adj. 不重要的，微不足道的' },
      { word: 'significance', meaning: 'n. 重要性，意义' },
      { word: 'signify', meaning: 'v. 表示，意味着' },
    ],
    masterLevel: 0,
  },
  {
    id: 2,
    word: 'inevitable',
    phonetic: '/ɪnˈevɪtəbl/',
    meaning: 'adj. 不可避免的；必然发生的',
    example:
      'With the rapid development of technology, change is inevitable.',
    exampleTrans: '随着技术的快速发展，变化是不可避免的。',
    root: 'in（不）+ evit（避免）+ able（可…的）→ 不可避免的',
    confusing: [
      { word: 'inevitability', meaning: 'n. 必然性，不可避免' },
      { word: 'evitable', meaning: 'adj. 可避免的' },
      { word: 'unavoidable', meaning: 'adj. 不可避免的（同义词）' },
    ],
    masterLevel: 1,
  },
  {
    id: 3,
    word: 'phenomenon',
    phonetic: '/fəˈnɒmɪnən/',
    meaning: 'n. 现象；奇迹',
    example:
      'Globalization is a complex phenomenon that affects every aspect of our lives.',
    exampleTrans: '全球化是一种复杂的现象，影响着我们生活的方方面面。',
    root: 'phen（显示）+ omenon → 显示出来的东西 → 现象',
    confusing: [
      { word: 'phenomena', meaning: 'n. phenomenon 的复数形式' },
      { word: 'phenomenal', meaning: 'adj. 非凡的，惊人的' },
    ],
    masterLevel: 1,
  },
  {
    id: 4,
    word: 'perspective',
    phonetic: '/pərˈspektɪv/',
    meaning: 'n. 视角；观点；透视法',
    example:
      'From an economic perspective, the policy has both advantages and disadvantages.',
    exampleTrans: '从经济角度来看，这项政策既有优势也有劣势。',
    root: 'per（贯穿）+ spect（看）+ ive → 看穿 → 透视法；视角',
    confusing: [
      { word: 'prospective', meaning: 'adj. 未来的；预期的' },
      { word: 'respect', meaning: 'v./n. 尊重；方面' },
      { word: 'inspect', meaning: 'v. 检查，审视' },
    ],
    masterLevel: 2,
  },
  {
    id: 5,
    word: 'substantial',
    phonetic: '/səbˈstænʃl/',
    meaning: 'adj. 大量的；实质的；内容充实的',
    example:
      'The company has made substantial progress in reducing carbon emissions.',
    exampleTrans: '该公司在减少碳排放方面取得了实质性进展。',
    root: 'sub（在下面）+ stant（站立）+ ial（形容词后缀）→ 站在下面的 → 基础的 → 实质的',
    confusing: [
      { word: 'substance', meaning: 'n. 物质；实质；内容' },
      { word: 'substantive', meaning: 'adj. 实质性的；重要的' },
      { word: 'insubstantial', meaning: 'adj. 非实质的；脆弱的' },
    ],
    masterLevel: 0,
  },
  {
    id: 6,
    word: 'demonstrate',
    phonetic: '/ˈdemənstreɪt/',
    meaning: 'v. 证明；演示；示范',
    example:
      'The experiment demonstrates the importance of early childhood education.',
    exampleTrans: '该实验证明了幼儿教育的重要性。',
    root: 'de（完全）+ monstr（展示）+ ate（动词后缀）→ 完全展示出来 → 证明，演示',
    confusing: [
      { word: 'demonstration', meaning: 'n. 证明；示范；游行' },
      { word: 'remonstrate', meaning: 'v. 抗议；反对' },
    ],
    masterLevel: 0,
  },
  {
    id: 7,
    word: 'controversial',
    phonetic: '/ˌkɒntrəˈvɜːʃl/',
    meaning: 'adj. 有争议的；引起争论的',
    example:
      'The controversial policy has sparked heated debate among scholars.',
    exampleTrans: '这项有争议的政策在学者中引发了激烈的辩论。',
    root: 'contro（相反）+ vers（转）+ ial → 转向相反的 → 有争议的',
    confusing: [
      { word: 'controversy', meaning: 'n. 争论，争议' },
      { word: 'conversely', meaning: 'adv. 相反地' },
      { word: 'diverse', meaning: 'adj. 不同的，多样的' },
    ],
    masterLevel: 2,
  },
  {
    id: 8,
    word: 'implement',
    phonetic: '/ˈɪmplɪment/',
    meaning: 'v. 实施；执行；落实 n. 工具；器具',
    example:
      'The government plans to implement new environmental regulations next year.',
    exampleTrans: '政府计划明年实施新的环保法规。',
    root: 'im（里面）+ ple（填满）+ ment → 填满进去 → 实施，执行',
    confusing: [
      { word: 'implementation', meaning: 'n. 实施；执行' },
      { word: 'compliment', meaning: 'n./v. 赞美，恭维' },
      { word: 'supplement', meaning: 'n./v. 补充，增补' },
    ],
    masterLevel: 1,
  },
  {
    id: 9,
    word: 'anticipate',
    phonetic: '/ænˈtɪsɪpeɪt/',
    meaning: 'v. 预期；预料；期待',
    example:
      'It is difficult to anticipate all the consequences of the reform.',
    exampleTrans: '很难预料改革的所有后果。',
    root: 'anti（先）+ cip（拿）+ ate → 先拿到 → 预期，预料',
    confusing: [
      { word: 'anticipation', meaning: 'n. 预期；期待' },
      { word: 'participate', meaning: 'v. 参加，参与' },
      { word: 'anticipatory', meaning: 'adj. 预期的，提早发生的' },
    ],
    masterLevel: 0,
  },
  {
    id: 10,
    word: 'appreciate',
    phonetic: '/əˈpriːʃieɪt/',
    meaning: 'v. 感激；欣赏；理解；升值',
    example:
      'We fully appreciate the complexity of the situation.',
    exampleTrans: '我们充分理解局势的复杂性。',
    root: 'ap（加强）+ preci（价值）+ ate → 看重 → 欣赏；感激',
    confusing: [
      { word: 'appreciation', meaning: 'n. 感激；欣赏；升值' },
      { word: 'depreciate', meaning: 'v. 贬值；贬低' },
      { word: 'precious', meaning: 'adj. 珍贵的，宝贵的' },
    ],
    masterLevel: 0,
  },
]

// ========== 长难句分析 ==========
export const sentenceLibrary = [
  {
    sentence:
      'While the widespread adoption of artificial intelligence has undoubtedly brought about unprecedented convenience and efficiency in various sectors, ranging from healthcare to finance, concerns about its potential impact on employment and social inequality have become increasingly prominent, particularly in developing countries where the digital divide remains a significant challenge.',
    analysis: {
      main:
        'Concerns about its potential impact on employment and social inequality have become increasingly prominent.',
      clauses: [
        { type: '让步状语从句', text: 'While the widespread adoption of artificial intelligence has undoubtedly brought about unprecedented convenience and efficiency in various sectors', desc: '表示"虽然…"，与主句形成对比关系' },
        { type: '插入语', text: 'ranging from healthcare to finance', desc: '补充说明 sectors 的具体范围' },
        { type: '定语从句', text: 'where the digital divide remains a significant challenge', desc: '修饰 developing countries，限定范围' },
      ],
      modifiers: [
        { text: 'particularly in developing countries', type: '状语', desc: '程度状语，突出强调发展中国家' },
        { text: 'undoubtedly', type: '副词', desc: '修饰 brought about，加强语气' },
        { text: 'increasingly', type: '副词', desc: '修饰 prominent，表示程度递增' },
      ],
      keyWords: [
        { word: 'widespread', meaning: 'adj. 广泛的，普遍的' },
        { word: 'adoption', meaning: 'n. 采用，采纳' },
        { word: 'unprecedented', meaning: 'adj. 前所未有的，空前的' },
        { word: 'prominent', meaning: 'adj. 突出的，显著的' },
      ],
      translation:
        '虽然人工智能的广泛采纳无疑为从医疗到金融等各个领域带来了前所未有的便利和效率，但人们对其对就业和社会不平等的潜在影响的担忧已日益突出，尤其是在数字鸿沟依然严峻的发展中国家。',
    },
  },
  {
    sentence:
      'The concept of sustainable development, which emerged in the late 20th century as a response to growing environmental concerns, calls for a balanced approach that takes into account economic growth, social equity, and environmental protection, recognizing that these three dimensions are inextricably linked and mutually reinforcing.',
    analysis: {
      main:
        'The concept of sustainable development calls for a balanced approach.',
      clauses: [
        { type: '非限制性定语从句', text: 'which emerged in the late 20th century as a response to growing environmental concerns', desc: '补充说明 sustainable development 的起源背景' },
        { type: '定语从句', text: 'that takes into account economic growth, social equity, and environmental protection', desc: '修饰 a balanced approach，说明其包含内容' },
        { type: '宾语从句', text: 'that these three dimensions are inextricably linked and mutually reinforcing', desc: '作 recognizing 的宾语' },
      ],
      modifiers: [
        { text: 'in the late 20th century', type: '时间状语', desc: '修饰 emerged，说明时间' },
        { text: 'as a response to growing environmental concerns', type: '状语', desc: '表示目的' },
        { text: 'recognizing...', type: '伴随状语', desc: '表示伴随主句的动作' },
      ],
      keyWords: [
        { word: 'sustainable', meaning: 'adj. 可持续的' },
        { word: 'equity', meaning: 'n. 公平，公正' },
        { word: 'inextricably', meaning: 'adv. 不可分割地' },
        { word: 'reinforce', meaning: 'v. 加强，强化' },
      ],
      translation:
        '可持续发展理念出现于20世纪末，是对日益增长的环境关切的回应，它呼吁采取一种兼顾经济增长、社会公平和环境保护的平衡方法，认识到这三个方面是密不可分、相互促进的。',
    },
  },
  {
    sentence:
      'Although it is generally accepted that the internet has revolutionized the way we communicate and access information, there remains considerable debate over whether its overall impact on social relationships is beneficial or detrimental, with some arguing that it facilitates meaningful connections while others contend that it undermines face-to-face interaction.',
    analysis: {
      main:
        'There remains considerable debate over whether its overall impact on social relationships is beneficial or detrimental.',
      clauses: [
        { type: '让步状语从句', text: 'Although it is generally accepted that the internet has revolutionized the way we communicate and access information', desc: '表示"尽管…"，引出公认事实作为让步' },
        { type: '主语从句', text: 'that the internet has revolutionized the way we communicate and access information', desc: '作 is generally accepted 的真正主语' },
        { type: '宾语从句', text: 'that it facilitates meaningful connections', desc: '作 arguing 的宾语' },
        { type: '宾语从句', text: 'that it undermines face-to-face interaction', desc: '作 contend 的宾语' },
      ],
      modifiers: [
        { text: 'with some arguing... while others contend...', type: '伴随状语', desc: '补充说明 debate 的具体内容' },
        { text: 'on social relationships', type: '定语', desc: '修饰 impact，限定范围' },
      ],
      keyWords: [
        { word: 'revolutionize', meaning: 'v. 彻底改变，革命化' },
        { word: 'beneficial', meaning: 'adj. 有益的，有利的' },
        { word: 'detrimental', meaning: 'adj. 有害的，不利的' },
        { word: 'undermine', meaning: 'v. 逐渐削弱；破坏' },
      ],
      translation:
        '虽然人们普遍认为互联网彻底改变了我们沟通和获取信息的方式，但关于它对社交关系的整体影响是有益还是有害仍存在相当大的争论——一些人认为它促进了有意义的联系，而另一些人则主张它削弱了面对面的交流。',
    },
  },
]

// ========== 阅读 ==========
export const readingData = {
  passages: [
    {
      id: 1,
      title: 'Artificial Intelligence and the Future of Work',
      source: '改编自 2024 年考研英语一真题',
      difficulty: '中等',
      wordCount: 412,
      paragraphs: [
        'The rapid advancement of artificial intelligence has sparked intense debate about its potential impact on the labor market. While some experts predict that AI will create new job opportunities and enhance productivity, others warn of widespread job displacement and growing inequality.',
        'A recent study by the McKinsey Global Institute estimates that by 2030, up to 375 million workers worldwide may need to switch occupational categories due to automation. However, the same report emphasizes that AI will also generate new roles that we cannot yet imagine, much as the internet created jobs that did not exist a few decades ago.',
        'The key to navigating this transition lies in education and training. Workers must develop skills that complement AI rather than compete with it — creativity, emotional intelligence, critical thinking, and complex problem-solving. These uniquely human capabilities are precisely what AI systems struggle to replicate.',
        'Moreover, the impact of AI will vary significantly across different sectors and regions. High-skilled workers in technology-intensive industries may benefit from AI augmentation, while those in routine-based jobs face greater risks. Policymakers must therefore implement targeted measures to support affected workers, including universal basic income experiments, lifelong learning programs, and portable benefits systems.',
        'Ultimately, the future of work in the age of AI is not predetermined. It will be shaped by the choices we make today — in our classrooms, boardrooms, and legislative chambers. The goal should not be to resist technological progress, but to harness it in ways that promote inclusive and sustainable economic growth.',
      ],
      questions: [
        {
          id: 1,
          type: '细节理解题',
          question: 'According to the McKinsey Global Institute study, what is estimated to happen by 2030?',
          options: [
            'A) AI will completely replace human workers in most industries.',
            'B) Up to 375 million workers may need to change their occupational categories.',
            'C) All routine-based jobs will be automated.',
            'D) The impact of AI will be uniform across all sectors.',
          ],
          correct: 1,
          explanation:
            '文章第二段明确指出："A recent study by the McKinsey Global Institute estimates that by 2030, up to 375 million workers worldwide may need to switch occupational categories due to automation." 选项 B 与此表述一致。',
          errorAnalysis:
            '易错选 A：原文并未说 AI 会"完全取代"人类 workers；易错选 D：第三段明确说明 AI 的影响在不同 sectors 存在显著差异。',
        },
        {
          id: 2,
          type: '推理判断题',
          question: 'What does the author suggest about human capabilities in relation to AI?',
          options: [
            'A) They are becoming less important in the modern economy.',
            'B) They can be easily replicated by AI systems.',
            'C) They are valuable precisely because AI cannot easily replicate them.',
            'D) They should be replaced by technical skills.',
          ],
          correct: 2,
          explanation:
            '文章第三段指出：workers should develop skills that complement AI — such as creativity, emotional intelligence, and critical thinking — which are "uniquely human capabilities" that "AI systems struggle to replicate." 因此选项 C 正确。',
          errorAnalysis:
            '易错选 B：原文明确说 AI 难以复制（struggle to replicate）人类能力，而非容易复制。注意题干中的反向思维。',
        },
        {
          id: 3,
          type: '主旨大意题',
          question: "What is the author's main purpose in writing this passage?",
          options: [
            'A) To argue against the development of artificial intelligence.',
            'B) To describe the challenges and opportunities AI presents for the labor market.',
            'C) To provide a comprehensive history of AI technology.',
            'D) To compare AI with previous technological revolutions.',
          ],
          correct: 1,
          explanation:
            '文章从 AI 对劳动力市场的潜在影响入手，既讨论了失业风险（第一、四段），也提到了新机遇（第二段），并提出应对策略（第三、五段）。整体上是在描述 AI 带来的挑战与机遇，而非单纯反对或支持。',
          errorAnalysis:
            '易错选 A：作者并未反对 AI 发展，最后一段明确指出 "The goal should not be to resist technological progress"。注意区分"描述影响"和"表达反对"的区别。',
        },
        {
          id: 4,
          type: '词义猜测题',
          question: 'The word "harness" in the last paragraph is closest in meaning to:',
          options: [
            'A) ignore',
            'B) control',
            'C) utilize effectively',
            'D) abandon',
          ],
          correct: 2,
          explanation:
            '"Harness" 原意为"给（马等）上挽具"，引申义为"利用（自然资源、能源等）使之产生效用"。根据上下文 "to harness it in ways that promote inclusive and sustainable economic growth"，可知此处意为"有效利用"（utilize effectively）。',
          errorAnalysis:
            '易错选 B（control）：harness 确实有"控制"的含义，但结合上下文 "promote inclusive and sustainable economic growth"，强调的是"利用"而非"控制"。注意根据语境选择最合适的含义。',
        },
      ],
    },
  ],
  currentPassageIdx: 0,
}

// ========== 写作 ==========
export const writingData = {
  prompts: [
    {
      title: '2024 年考研英语一大作文预测',
      description:
        'Write an essay of 160-200 words based on the following picture. In your essay, you should:\n1. Describe the picture briefly\n2. Interpret its intended meaning\n3. Give your comments',
      topic: '科技与传统文化保护',
    },
  ],
  sampleEssay: `As is vividly shown in the picture, a young man is sitting in front of a computer, while his grandmother is standing beside him with a traditional paper-cutting in her hand. The contrast between the modern technology and traditional culture is striking.

The picture intends to convey that while technology brings us convenience, we should not neglect the importance of preserving our traditional cultural heritage. On one hand, technological advancement has made our lives more efficient and connected. On the other hand, many young people are becoming increasingly disconnected from their cultural roots.

In my opinion, it is crucial to strike a balance between embracing technological progress and preserving cultural traditions. We should leverage technology as a tool to promote and revitalize traditional culture, rather than allowing it to replace our cultural identity. Only by doing so can we ensure that our cultural heritage continues to thrive in the digital age.`,
}

export const mockWritingReview = {
  score: 16.5,
  totalScore: 20,
  level: '良好',
  grammarIssues: [
    {
      type: '冠词缺失',
      original: 'while technology brings us convenience',
      suggestion: 'while technology brings us convenience（此处 technology 作为抽象概念可数时建议加冠词：while the advancement of technology...）',
      severity: 'minor',
    },
    {
      type: '主谓一致',
      original: 'many young people is becoming',
      suggestion: 'many young people are becoming',
      severity: 'major',
    },
    {
      type: '用词不当',
      original: 'striking',
      suggestion: 'thought-provoking / compelling（striking 通常指视觉冲击，这里用 thought-provoking 更贴切）',
      severity: 'minor',
    },
  ],
  improvements: [
    {
      original: 'The picture intends to convey that...',
      advanced: 'The picture is intended to convey a profound message that...',
      note: '被动语态使表达更正式',
    },
    {
      original: 'technology brings us convenience',
      advanced: 'technology has revolutionized the way we live, offering unparalleled convenience',
      note: '使用高级词汇和表达替换平淡描述',
    },
    {
      original: 'Many young people are becoming increasingly disconnected from their cultural roots.',
      advanced: 'An increasing number of young individuals are gradually becoming estranged from their cultural heritage.',
      note: '"an increasing number of" 替代 "many"，"estranged from" 比 "disconnected from" 更高级',
    },
    {
      original: 'Only by doing so can we ensure...',
      advanced: 'Only through such endeavors can we ensure...',
      note: '"such endeavors" 指代前文提到的努力，表达更精炼',
    },
  ],
  revisedEssay: `As is vividly shown in the picture, a young man is immersed in the world of his computer, while his grandmother stands beside him, gently holding a piece of traditional paper-cutting in her hand. The stark contrast between modern technology and cultural heritage is both striking and thought-provoking.

The picture is intended to convey a profound message that although technological advancement has revolutionized the way we live, offering unprecedented convenience and connectivity, we must not lose sight of the importance of preserving our traditional cultural identity. In contemporary society, an increasing number of young individuals are gradually becoming estranged from their cultural roots, a trend that deserves serious reflection.

From my perspective, it is imperative to strike a harmonious balance between embracing technological progress and safeguarding cultural traditions. Rather than allowing technology to erode our cultural identity, we should harness it as a powerful tool to revitalize and disseminate our heritage. Only through such concerted efforts can we ensure that our rich cultural legacy continues to flourish in this digital era.`,
}

// ========== 学习等级配置 ==========
export const levelConfig = {
  current: 6,
  title: '考研达人',
  xp: 2840,
  xpNext: 4000,
  milestones: [
    { level: 1, title: '考研萌新' },
    { level: 2, title: '初窥门径' },
    { level: 3, title: '渐入佳境' },
    { level: 4, title: '小有所成' },
    { level: 5, title: '厚积薄发' },
    { level: 6, title: '考研达人' },
    { level: 7, title: '炉火纯青' },
    { level: 8, title: '登峰造极' },
  ],
}
