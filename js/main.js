// DOM 元素
const promptForm = document.getElementById('promptForm');
const promptInput = document.getElementById('promptInput');
const chatContainer = document.getElementById('chatContainer');
const loadingModal = document.getElementById('loadingModal');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.querySelector('aside');

// 模拟后端API调用
async function callAIAPI(prompt, temperature = 0.7, maxTokens = 512) {
  // 显示加载状态
  loadingModal.classList.remove('hidden');
  
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟不同温度参数下的AI响应
    const responses = {
      low: "我可以协助信息检索、内容创作和问题解决。我的能力包括回答问题、生成文本以及根据提供的输入帮助完成各种任务。今天我能为您提供什么帮助？",
      medium: "我旨在帮助完成各种任务！无论您需要回答问题、帮助写作、解释复杂概念，甚至协助编码 - 都可以随时问我。您想处理什么问题？",
      high: "哦，我可以做各种有趣和有用的事情！要我写首诗吗？用五岁小孩都能懂的方式解释量子物理？生成素食千层面的食谱？或者帮您调试代码？告诉我您需要什么，我会尽力而为！"
    };
    
    let response;
    if (temperature < 0.3) response = responses.low;
    else if (temperature < 0.7) response = responses.medium;
    else response = responses.high;
    
    return response;
  } catch (error) {
    console.error('API调用失败:', error);
    return "抱歉，我无法处理您的请求。请稍后再试。";
  } finally {
    // 隐藏加载状态
    loadingModal.classList.add('hidden');
  }
}

// 添加消息到聊天界面
function addMessageToChat(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = isUser 
    ? 'flex justify-end max-w-3xl mx-auto' 
    : 'max-w-3xl mx-auto';
  
  const messageContent = isUser 
    ? `
      <div class="bg-primary/10 p-4 rounded-lg rounded-tl-none max-w-[85%] max-h-64 overflow-y-auto message-scroll animate-fadeIn">
        <p class="text-neutral-800">${content}</p>
      </div>
    `
    : `
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <i class="fa fa-robot text-white"></i>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-card max-w-[85%] max-h-96 overflow-y-auto message-scroll animate-fadeIn">
          <p class="text-neutral-800">${content}</p>
        </div>
      </div>
    `;
  
  messageDiv.innerHTML = messageContent;
  chatContainer.appendChild(messageDiv);
  
  // 滚动到底部
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 表单提交处理
promptForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const prompt = promptInput.value.trim();
  if (!prompt) return;
  
  // 获取温度参数值
  const temperature = parseFloat(document.getElementById('temperature').value);
  
  // 添加用户消息到聊天界面
  addMessageToChat(prompt, true);
  
  // 清空输入框
  promptInput.value = '';
  
  // 调用AI API并获取响应
  const aiResponse = await callAIAPI(prompt, temperature);
  
  // 添加AI响应到聊天界面
  addMessageToChat(aiResponse, false);
});

// 移动端菜单切换
mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
  sidebar.classList.toggle('fixed');
  sidebar.classList.toggle('inset-y-0');
  sidebar.classList.toggle('left-0');
  sidebar.classList.toggle('z-40');
  sidebar.classList.toggle('w-64');
  sidebar.classList.toggle('md:relative');
  sidebar.classList.toggle('md:w-64');
});

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);