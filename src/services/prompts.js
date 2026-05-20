// 预设例句提示用户选择
export const SENTENCE_ANALYZER_HINT = '选择一个预设例句或输入自定义句子，点击"开始解析"调用 AI 分析。'

export const WRITING_REVIEW_HINT = '在左侧输入作文或加载示例范文，点击"开始批改"获取 AI 评分和修改建议。'

// API 状态消息
export const API_MESSAGES = {
  noKey: '未配置 API Key。请在项目根目录创建 .env 文件并设置 DEEPSEEK_API_KEY=你的密钥，然后重启服务端。',
  networkError: '网络连接失败，请检查服务端是否启动（npm run dev:server）',
  parseError: 'AI 返回数据格式异常，请重试',
  serverError: '服务端错误，请稍后重试',
  fallback: '已使用示例数据展示结果（API 未配置或请求失败）',
}
