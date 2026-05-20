// ========== 单词库 ==========
export const vocabularyData = [
  { id: 1, word: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: 'adj. 重要的；有意义的；显著的', example: 'The study found a significant correlation between exercise and mental health.', exampleTrans: '研究发现锻炼与心理健康之间存在显著的相关性。', root: 'sign（标记）+ i + fic（做）+ ant（形容词后缀）→ 做出标记的 → 显著的', confusing: [{ word: 'insignificant', meaning: 'adj. 不重要的，微不足道的' }, { word: 'significance', meaning: 'n. 重要性，意义' }, { word: 'signify', meaning: 'v. 表示，意味着' }], masterLevel: 0, isNew: false },
  { id: 2, word: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', meaning: 'adj. 不可避免的；必然发生的', example: 'With the rapid development of technology, change is inevitable.', exampleTrans: '随着技术的快速发展，变化是不可避免的。', root: 'in（不）+ evit（避免）+ able（可…的）→ 不可避免的', confusing: [{ word: 'inevitability', meaning: 'n. 必然性，不可避免' }, { word: 'evitable', meaning: 'adj. 可避免的' }, { word: 'unavoidable', meaning: 'adj. 不可避免的（同义词）' }], masterLevel: 1, isNew: false },
  { id: 3, word: 'phenomenon', phonetic: '/fəˈnɒmɪnən/', meaning: 'n. 现象；奇迹', example: 'Globalization is a complex phenomenon that affects every aspect of our lives.', exampleTrans: '全球化是一种复杂的现象，影响着我们生活的方方面面。', root: 'phen（显示）+ omenon → 显示出来的东西 → 现象', confusing: [{ word: 'phenomena', meaning: 'n. phenomenon 的复数形式' }, { word: 'phenomenal', meaning: 'adj. 非凡的，惊人的' }], masterLevel: 1, isNew: false },
  { id: 4, word: 'perspective', phonetic: '/pərˈspektɪv/', meaning: 'n. 视角；观点；透视法', example: 'From an economic perspective, the policy has both advantages and disadvantages.', exampleTrans: '从经济角度来看，这项政策既有优势也有劣势。', root: 'per（贯穿）+ spect（看）+ ive → 看穿 → 透视法；视角', confusing: [{ word: 'prospective', meaning: 'adj. 未来的；预期的' }, { word: 'respect', meaning: 'v./n. 尊重；方面' }, { word: 'inspect', meaning: 'v. 检查，审视' }], masterLevel: 2, isNew: false },
  { id: 5, word: 'substantial', phonetic: '/səbˈstænʃl/', meaning: 'adj. 大量的；实质的；内容充实的', example: 'The company has made substantial progress in reducing carbon emissions.', exampleTrans: '该公司在减少碳排放方面取得了实质性进展。', root: 'sub（在下面）+ stant（站立）+ ial（形容词后缀）→ 站在下面的 → 基础的 → 实质的', confusing: [{ word: 'substance', meaning: 'n. 物质；实质；内容' }, { word: 'substantive', meaning: 'adj. 实质性的；重要的' }, { word: 'insubstantial', meaning: 'adj. 非实质的；脆弱的' }], masterLevel: 0, isNew: false },
  { id: 6, word: 'demonstrate', phonetic: '/ˈdemənstreɪt/', meaning: 'v. 证明；演示；示范', example: 'The experiment demonstrates the importance of early childhood education.', exampleTrans: '该实验证明了幼儿教育的重要性。', root: 'de（完全）+ monstr（展示）+ ate（动词后缀）→ 完全展示出来 → 证明，演示', confusing: [{ word: 'demonstration', meaning: 'n. 证明；示范；游行' }, { word: 'remonstrate', meaning: 'v. 抗议；反对' }], masterLevel: 0, isNew: false },
  { id: 7, word: 'controversial', phonetic: '/ˌkɒntrəˈvɜːʃl/', meaning: 'adj. 有争议的；引起争论的', example: 'The controversial policy has sparked heated debate among scholars.', exampleTrans: '这项有争议的政策在学者中引发了激烈的辩论。', root: 'contro（相反）+ vers（转）+ ial → 转向相反的 → 有争议的', confusing: [{ word: 'controversy', meaning: 'n. 争论，争议' }, { word: 'conversely', meaning: 'adv. 相反地' }, { word: 'diverse', meaning: 'adj. 不同的，多样的' }], masterLevel: 2, isNew: false },
  { id: 8, word: 'implement', phonetic: '/ˈɪmplɪment/', meaning: 'v. 实施；执行；落实 n. 工具；器具', example: 'The government plans to implement new environmental regulations next year.', exampleTrans: '政府计划明年实施新的环保法规。', root: 'im（里面）+ ple（填满）+ ment → 填满进去 → 实施，执行', confusing: [{ word: 'implementation', meaning: 'n. 实施；执行' }, { word: 'compliment', meaning: 'n./v. 赞美，恭维' }, { word: 'supplement', meaning: 'n./v. 补充，增补' }], masterLevel: 1, isNew: false },
  { id: 9, word: 'anticipate', phonetic: '/ænˈtɪsɪpeɪt/', meaning: 'v. 预期；预料；期待', example: 'It is difficult to anticipate all the consequences of the reform.', exampleTrans: '很难预料改革的所有后果。', root: 'anti（先）+ cip（拿）+ ate → 先拿到 → 预期，预料', confusing: [{ word: 'anticipation', meaning: 'n. 预期；期待' }, { word: 'participate', meaning: 'v. 参加，参与' }, { word: 'anticipatory', meaning: 'adj. 预期的，提早发生的' }], masterLevel: 0, isNew: false },
  { id: 10, word: 'appreciate', phonetic: '/əˈpriːʃieɪt/', meaning: 'v. 感激；欣赏；理解；升值', example: 'We fully appreciate the complexity of the situation.', exampleTrans: '我们充分理解局势的复杂性。', root: 'ap（加强）+ preci（价值）+ ate → 看重 → 欣赏；感激', confusing: [{ word: 'appreciation', meaning: 'n. 感激；欣赏；升值' }, { word: 'depreciate', meaning: 'v. 贬值；贬低' }, { word: 'precious', meaning: 'adj. 珍贵的，宝贵的' }], masterLevel: 0, isNew: false },
  { id: 11, word: 'fundamental', phonetic: '/ˌfʌndəˈmentl/', meaning: 'adj. 基本的；根本的；基础的', example: 'Understanding basic grammar is fundamental to learning English.', exampleTrans: '理解基础语法对学习英语至关重要。', root: 'fund（基础）+ a + ment（名词后缀）+ al（形容词后缀）→ 基础的', confusing: [{ word: 'fundamentally', meaning: 'adv. 根本上' }, { word: 'foundation', meaning: 'n. 基础，地基' }], masterLevel: 0, isNew: true },
  { id: 12, word: 'endeavor', phonetic: '/ɪnˈdevər/', meaning: 'n./v. 努力；尝试；尽力', example: 'We must endeavor to improve the quality of education for all students.', exampleTrans: '我们必须努力提升所有学生的教育质量。', root: 'en（使）+ deavor（责任）→ 使承担责任 → 尽力', confusing: [{ word: 'endeavour', meaning: 'n./v. 努力（英式拼写）' }, { word: 'effort', meaning: 'n. 努力（近义词）' }], masterLevel: 0, isNew: true },
  { id: 13, word: 'phenomenal', phonetic: '/fəˈnɒmɪnl/', meaning: 'adj. 非凡的；惊人的；杰出的', example: 'The young pianist gave a phenomenal performance at the concert.', exampleTrans: '这位年轻钢琴家在音乐会上进行了非凡的演奏。', root: 'phenomenon（现象）+ al（形容词后缀）→ 现象级的 → 非凡的', confusing: [{ word: 'phenomenon', meaning: 'n. 现象' }, { word: 'phenomena', meaning: 'n. phenomenon 的复数形式' }], masterLevel: 0, isNew: true },
  { id: 14, word: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', meaning: 'adj. 全面的；综合的；理解的', example: 'The report provides a comprehensive analysis of the current situation.', exampleTrans: '该报告对当前形势进行了全面分析。', root: 'com（共同）+ prehens（抓住）+ ive → 全部抓住的 → 全面的', confusing: [{ word: 'comprehension', meaning: 'n. 理解；理解力' }, { word: 'comprehend', meaning: 'v. 理解，领悟' }], masterLevel: 0, isNew: true },
  { id: 15, word: 'implication', phonetic: '/ˌɪmplɪˈkeɪʃn/', meaning: 'n. 含义；暗示；影响', example: 'The long-term implications of climate change are far-reaching.', exampleTrans: '气候变化的长远影响是深远的。', root: 'im（里面）+ plic（折叠）+ ation（名词后缀）→ 折叠在里面的东西 → 暗示', confusing: [{ word: 'imply', meaning: 'v. 暗示；意味着' }, { word: 'implicit', meaning: 'adj. 含蓄的；不言明的' }], masterLevel: 0, isNew: true },
  { id: 16, word: 'prerequisite', phonetic: '/ˌpriːˈrekwəzɪt/', meaning: 'n. 前提；先决条件 adj. 必须先具备的', example: 'A bachelor degree is a prerequisite for this graduate program.', exampleTrans: '学士学位是攻读这个研究生项目的前提条件。', root: 'pre（先）+ requisite（必需品）→ 先要有的东西 → 前提', confusing: [{ word: 'requisite', meaning: 'n./adj. 必需品；必需的' }, { word: 'requirement', meaning: 'n. 要求，必要条件' }], masterLevel: 0, isNew: true },
  { id: 17, word: 'indispensable', phonetic: '/ˌɪndɪˈspensəbl/', meaning: 'adj. 不可或缺的；必需的', example: 'Critical thinking is an indispensable skill for academic success.', exampleTrans: '批判性思维是学术成功不可或缺的技能。', root: 'in（不）+ dispensable（可分配的）→ 不可分配的 → 不可或缺的', confusing: [{ word: 'dispensable', meaning: 'adj. 可有可无的' }, { word: 'essential', meaning: 'adj. 本质的；必要的（近义词）' }], masterLevel: 0, isNew: true },
  { id: 18, word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaning: 'n. 范式；典范；模式', example: 'The internet has created a new paradigm of communication.', exampleTrans: '互联网创造了一种全新的沟通范式。', root: 'para（在旁边）+ digm（展示）→ 展示在旁边的例子 → 范式', confusing: [{ word: 'paradox', meaning: 'n. 悖论，自相矛盾' }, { word: 'pattern', meaning: 'n. 模式，图案' }], masterLevel: 0, isNew: true },
  { id: 19, word: 'articulate', phonetic: '/ɑːrˈtɪkjuleɪt/', meaning: 'v. 清晰表达 adj. 口齿清晰的；善于表达的', example: 'She was able to articulate her arguments very clearly.', exampleTrans: '她能够非常清晰地阐述自己的论点。', root: 'articul（关节）+ ate → 像关节一样连接好 → 表达连贯', confusing: [{ word: 'articulation', meaning: 'n. 表达；发音' }, { word: 'artificial', meaning: 'adj. 人工的，造作的' }], masterLevel: 0, isNew: true },
  { id: 20, word: 'empirical', phonetic: '/ɪmˈpɪrɪkl/', meaning: 'adj. 经验主义的；以经验为依据的', example: 'The theory is supported by extensive empirical evidence.', exampleTrans: '该理论得到了大量经验证据的支持。', root: 'em（在里面）+ pir（尝试）+ ical → 从尝试中得来的 → 经验的', confusing: [{ word: 'empire', meaning: 'n. 帝国' }, { word: 'empiricism', meaning: 'n. 经验主义' }], masterLevel: 0, isNew: true },
  { id: 21, word: 'hypothesis', phonetic: '/haɪˈpɒθəsɪs/', meaning: 'n. 假说；假设；前提', example: 'The researchers tested their hypothesis through a series of experiments.', exampleTrans: '研究人员通过一系列实验验证了他们的假说。', root: 'hypo（在下面）+ thesis（放置）→ 放在下面的基础 → 假说', confusing: [{ word: 'hypothesize', meaning: 'v. 假设，假定' }, { word: 'thesis', meaning: 'n. 论文；论点' }], masterLevel: 0, isNew: true },
  { id: 22, word: 'sceptical', phonetic: '/ˈskeptɪkl/', meaning: 'adj. 怀疑的；持怀疑态度的', example: 'Many scientists remain sceptical about the new findings.', exampleTrans: '许多科学家对新发现仍持怀疑态度。', root: 'scept（看）+ ical → 仔细看的 → 不轻易相信的 → 怀疑的', confusing: [{ word: 'scepticism', meaning: 'n. 怀疑态度' }, { word: 'suspect', meaning: 'v. 怀疑；猜想' }], masterLevel: 0, isNew: true },
  { id: 23, word: 'prevalent', phonetic: '/ˈprevələnt/', meaning: 'adj. 普遍的；盛行的；流行的', example: 'This view is prevalent among academic researchers.', exampleTrans: '这种观点在学术研究者中普遍存在。', root: 'pre（先）+ val（强大）+ ent → 先强大起来的 → 盛行的', confusing: [{ word: 'prevalence', meaning: 'n. 普遍，流行' }, { word: 'prevail', meaning: 'v. 盛行；占上风' }], masterLevel: 0, isNew: true },
  { id: 24, word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: 'adj. 模糊不清的；模棱两可的', example: 'The wording of the contract is deliberately ambiguous.', exampleTrans: '合同的措辞故意模棱两可。', root: 'ambi（两边）+ guous → 两边都可行的 → 模棱两可的', confusing: [{ word: 'ambiguity', meaning: 'n. 歧义；模糊' }, { word: 'ambitious', meaning: 'adj. 雄心勃勃的' }], masterLevel: 0, isNew: true },
  { id: 25, word: 'hierarchy', phonetic: '/ˈhaɪərɑːrki/', meaning: 'n. 等级制度；层次；层级', example: 'The company has a rigid organizational hierarchy.', exampleTrans: '这家公司有严格的等级组织制度。', root: 'hier（神圣）+ arch（统治）+ y → 神圣的统治 → 等级制度', confusing: [{ word: 'hierarchical', meaning: 'adj. 分层的；等级制的' }, { word: 'monarchy', meaning: 'n. 君主制' }], masterLevel: 0, isNew: true },
  { id: 26, word: 'consensus', phonetic: '/kənˈsensəs/', meaning: 'n. 共识；一致意见', example: 'There is a growing consensus that climate action is urgent.', exampleTrans: '越来越多的人一致认为气候行动刻不容缓。', root: 'con（共同）+ sens（感觉）+ us → 感觉一致 → 共识', confusing: [{ word: 'consent', meaning: 'n./v. 同意，允许' }, { word: 'census', meaning: 'n. 人口普查' }], masterLevel: 0, isNew: true },
  { id: 27, word: 'scrutiny', phonetic: '/ˈskruːtəni/', meaning: 'n. 仔细审查；严密监督', example: 'The proposal came under intense scrutiny from the committee.', exampleTrans: '该提案受到了委员会的严格审查。', root: 'scrutin（检查）+ y → 仔细检查', confusing: [{ word: 'scrutinize', meaning: 'v. 仔细检查，审查' }, { word: 'inspect', meaning: 'v. 检查，检验' }], masterLevel: 0, isNew: true },
  { id: 28, word: 'inherent', phonetic: '/ɪnˈhɪərənt/', meaning: 'adj. 固有的；内在的；与生俱来的', example: 'There are inherent risks in any investment.', exampleTrans: '任何投资都存在固有风险。', root: 'in（在里面）+ her（黏附）+ ent → 黏附在内的 → 固有的', confusing: [{ word: 'inherited', meaning: 'adj. 继承的；遗传的' }, { word: 'coherent', meaning: 'adj. 连贯的；一致的' }], masterLevel: 0, isNew: true },
  { id: 29, word: 'spontaneous', phonetic: '/spɒnˈteɪniəs/', meaning: 'adj. 自发的；自然而然的', example: 'The audience broke into spontaneous applause.', exampleTrans: '观众自发地爆发出掌声。', root: 'spont（自发）+ aneous → 自发的', confusing: [{ word: 'spontaneity', meaning: 'n. 自发性' }, { word: 'simultaneous', meaning: 'adj. 同时发生的' }], masterLevel: 0, isNew: true },
  { id: 30, word: 'deteriorate', phonetic: '/dɪˈtɪəriəreɪt/', meaning: 'v. 恶化；变坏；退化', example: 'The economic situation continued to deteriorate throughout the year.', exampleTrans: '经济形势在整整一年中持续恶化。', root: 'deterior（更糟）+ ate → 变得更糟 → 恶化', confusing: [{ word: 'deterioration', meaning: 'n. 恶化，退化' }, { word: 'deter', meaning: 'v. 阻止，制止' }], masterLevel: 0, isNew: true },
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
      examTips: [
        { tip: '让步状语从句 "While..." 的翻译技巧：译为"虽然…但…"，注意主句与从句的逻辑转折关系', type: '翻译技巧' },
        { tip: '"ranging from... to..." 是现在分词短语作定语，相当于 "which range from... to..."', type: '语法考点' },
        { tip: '"where" 引导定语从句修饰 "developing countries"，注意区分 where 定语从句与地点状语从句', type: '高频考点' },
      ],
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
      examTips: [
        { tip: '非限制性定语从句 "which..." 的翻译：通常译为并列句或独立句，不采用"…的"结构前置', type: '翻译技巧' },
        { tip: '"calls for" 是考研高频动词短语，意为"呼吁，要求"，同义替换：demands, requires', type: '高频考点' },
        { tip: '"recognizing that..." 是现在分词作伴随状语，其逻辑主语为句子的主语 "The concept"', type: '语法考点' },
      ],
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
      examTips: [
        { tip: '"Although it is generally accepted that..." 是考研写作高频句式，可用于引出对立观点', type: '写作应用' },
        { tip: '"whether...or..." 引导的介词宾语从句作 debate 的定语，注意 whether 不可替换为 if', type: '高频考点' },
        { tip: '"with some arguing... while others contend..." 是独立主格结构作伴随状语，考研阅读常见', type: '语法考点' },
      ],
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
