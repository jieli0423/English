// 预设例句提示用户选择
export const SENTENCE_ANALYZER_HINT = '选择一个预设例句或输入自定义句子，点击"开始解析"调用 AI 分析。'

export const WRITING_REVIEW_HINT = '在左侧输入作文或加载示例范文，点击"开始批改"获取 AI 评分和修改建议。'

// 阅读精讲 Mock 降级数据
export const mockReadingAnalysis = {
  structure: '本文是一篇典型的考研英语议论文，采用"提出问题—分析问题—解决问题"的行文结构。首段引出 AI 对劳动力市场影响的话题；第二段引用具体研究数据说明问题严重性；第三段提出教育和培训是应对之策；第四段进一步分析不同行业和地区的差异化影响；末段总结指出未来取决于当下选择。',
  paragraphSummaries: [
    { index: 1, summary: '引出话题：AI 的快速发展引发了对劳动力市场影响的激烈争论，存在机遇（创造就业）和挑战（大规模失业）两种观点。' },
    { index: 2, summary: '引用麦肯锡研究数据：到 2030 年全球 3.75 亿工人需要转换职业类别，但 AI 也会创造全新的工作岗位。' },
    { index: 3, summary: '提出应对之策：关键在于教育和培训，培养创造力、情商、批判性思维等 AI 难以复制的人类能力。' },
    { index: 4, summary: '分析差异化影响：AI 对高科技行业和常规工作岗位的影响不同，政策制定者需采取针对性措施。' },
    { index: 5, summary: '总结观点：未来并非注定，应积极引导 AI 促进包容性可持续经济增长，而非抵制技术进步。' },
  ],
  questionAnalysis: [
    {
      questionIndex: 1,
      type: '细节理解题',
      locatingSentence: '"A recent study by the McKinsey Global Institute estimates that by 2030, up to 375 million workers worldwide may need to switch occupational categories due to automation." (Paragraph 2)',
      correctAnswer: 'B',
      explanation: '这是典型的"细节定位题"。题干问的是 McKinsey 研究的预测内容，关键词是 "by 2030" 和 "McKinsey Global Institute"。原文第二段第一句明确提到 "up to 375 million workers worldwide may need to switch occupational categories"，与选项 B 完全对应。',
      errorAnalysis: 'A 项"完全取代"过于绝对，原文说的是 "may need to switch"（可能需要转换）而非完全取代。D 项"uniform across all sectors"（各行业一致）与第四段 "vary significantly across different sectors" 明显矛盾。C 项"all routine-based jobs"中的 "all" 过于绝对。',
      tips: '细节理解题的关键是找准题干关键词（专有名词、数字、年份等），在原文中定位原句或同义替换句。注意选项中的绝对化词汇（all, completely, every）通常是错误的。',
    },
    {
      questionIndex: 2,
      type: '推理判断题',
      locatingSentence: '"These uniquely human capabilities are precisely what AI systems struggle to replicate." (Paragraph 3)',
      correctAnswer: 'C',
      explanation: '这是一道推理判断题。原文第三段指出人类应该培养 "creativity, emotional intelligence, critical thinking" 等能力，因为这些是 AI "struggle to replicate" 的。由此可以推断：正是由于 AI 难以复制，这些人类能力才显得珍贵。',
      errorAnalysis: 'B 项 "easily replicated" 与原文 "struggle to replicate" 完全相反。A 项 "less important" 与原文肯定人类能力的态度矛盾。D 项 "replaced by technical skills" 与原文 "develop skills that complement AI" 建议不符。',
      tips: '推理判断题要基于原文事实进行合理推断，切忌过度推理或加入个人观点。注意题干中的 "suggest"、"imply"、"infer" 等词暗示需要推理，而非直接照搬原文。',
    },
    {
      questionIndex: 3,
      type: '主旨大意题',
      locatingSentence: '全文行文结构：第一段引出话题 → 第二段数据支撑 → 第三段解决方案 → 第四段深入分析 → 第五段总结展望。',
      correctAnswer: 'B',
      explanation: '主旨大意题需要把握全文脉络。文章从 AI 对劳动力市场的挑战入手（第一、二段），同时指出机遇（第二段），接着提出应对策略（第三、四段），最后总结（第五段）。整体是客观描述 AI 带来的"挑战与机遇"，而非单纯反对或支持。',
      errorAnalysis: 'A 项 "argue against"（反对）与末段 "The goal should not be to resist technological progress" 矛盾。C 项 "comprehensive history" 文章并未追溯 AI 发展史。D 项 "compare with previous revolutions" 只在第二段末稍有提及，并非主旨。',
      tips: '主旨题要把握全文核心论点，而非某一段的细节。重点关注首尾段和各段首句。排除只涉及文章局部信息的选项。',
    },
    {
      questionIndex: 4,
      type: '词义猜测题',
      locatingSentence: '"The goal should not be to resist technological progress, but to harness it in ways that promote inclusive and sustainable economic growth." (Paragraph 5)',
      correctAnswer: 'C',
      explanation: '词义猜测题要根据上下文推断。前半句说"目标不应是抵制（resist）技术进步"，后半句用 "but to" 转折，说明应该是与 "resist" 相反的积极行为。结合 "promote inclusive and sustainable economic growth"（促进包容性可持续经济增长），"harness" 最接近 "utilize effectively"（有效利用）。',
      errorAnalysis: 'A 项 "ignore"（忽视）和 D 项 "abandon"（放弃）都是消极词汇，与 "promote...growth" 的积极语义不匹配。B 项 "control"（控制）虽然有一定合理性，但结合上下文更强调的是"利用"而非"控制"。注意词义猜测题要严格依据语境判断。',
      tips: '词义猜测题不要孤立地背单词意思，而是通过上下文逻辑关系（并列、转折、因果、举例等）推断。关注代词指代、同义复现、反义对比等线索。',
    },
  ],
  generalTips: [
    '先读题目再读文章：建议先快速浏览题目（不看选项），划出题干关键词，带着问题读文章，提高定位效率。',
    '注意段落首尾句：考研阅读中，段落首句通常是 topic sentence（主题句），尾句常有总结或过渡功能。',
    '警惕绝对化词汇：选项中包含 all, never, completely, must, only 等绝对化词汇时，通常为错误选项。',
    '同义替换是核心：正确选项往往是原文内容的同义改写（paraphrase），而非原词照搬。',
    '排除法最实用：先用"无中生有"、"张冠李戴"、"过于绝对"等排除明显错误选项，再在剩余选项中对比。',
  ],
}

// AI 单词精讲 Mock 降级数据
export function mockWordAnalysis(word) {
  const rootMap = {
    'significant': { root: 'sign（标记）+ i + fic（做）+ ant（形容词后缀）→ 做出标记的 → 显著的', mnemonic: 'sign（标记）是核心词根，想想"交通标志"——能让你注意到的就是 significant（重要的）。' },
    'inevitable': { root: 'in（不）+ evit（避免）+ able（可…的）→ 不可避免的', mnemonic: 'in（不）+ evitable（可避免的）→ 不可避免的。想象"不管你怎么躲都躲不掉"的场景。' },
  }
  const match = rootMap[word.toLowerCase()]
  return {
    chineseMeaning: '重要的；有意义的；显著的',
    examMeanings: ['重要的，重大的（考研阅读高频）', '显著的，明显的（图表描述常用）', '有意义的，意味深长的'],
    rootAnalysis: match?.root || '由词根 + 词缀构成，建议参考词根词典',
    exampleSentence: `The ${word} progress made in the field of artificial intelligence has attracted widespread attention from researchers worldwide.`,
    exampleTranslation: `${word.charAt(0).toUpperCase() + word.slice(1)} 领域取得的重大进展引起了全球研究人员的广泛关注。`,
    confusingWords: [
      { word: word + 'ly', meaning: 'adv. 明显地', difference: '副词形式，修饰动词或形容词' },
    ],
    mnemonic: match?.mnemonic || `将「${word}」拆解成你熟悉的部分来记忆，或者联想一个包含该词的生活场景。`,
    collocations: [
      `${word} progress — 重大进步`,
      `${word} impact — 重大影响`,
      `${word} role — 重要作用`,
      `${word} difference — 显著差异`,
    ],
    writingUsage: `在考研写作中，「${word}」常用于强调重要性，如："Play a ${word} role in..."（在…中起重要作用）。图表描述中可用"There was a ${word} increase in..."（在…方面有显著增长）。`,
  }
}

// API 状态消息
export const API_MESSAGES = {
  noKey: '未配置 API Key。请在项目根目录创建 .env 文件并设置 DEEPSEEK_API_KEY=你的密钥，然后重启服务端。',
  networkError: '网络连接失败，请检查服务端是否启动（npm run dev:server）',
  parseError: 'AI 返回数据格式异常，请重试',
  serverError: '服务端错误，请稍后重试',
  fallback: '已使用示例数据展示结果（API 未配置或请求失败）',
}
