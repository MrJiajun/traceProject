from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 模拟AI模型响应
responses = [
    "这是一个示例响应。我可以帮助您解决各种问题，包括回答问题、生成文本、解释概念等。",
    "感谢您的提问！基于您的输入，我可以提供相关信息和建议。",
    "我理解您的需求。让我为您生成一个详细的回答...",
    "这是一个复杂的问题，需要深入分析。让我思考一下...",
    "根据我的理解，您需要以下信息...",
]

# 生成随机长度的响应

def generate_response(prompt, temperature=0.7, max_tokens=512):
    # 模拟AI处理时间
    time.sleep(random.uniform(1, 3))
    
    # 根据温度参数调整响应的多样性
    response_count = len(responses)
    if temperature < 0.3:
        # 精确模式 - 总是返回第一个响应
        selected_response = responses[0]
    elif temperature > 0.8:
        # 创意模式 - 随机选择一个响应
        selected_response = random.choice(responses)
    else:
        # 平衡模式 - 加权随机选择
        weights = [temperature * (i + 1) for i in range(response_count)]
        total_weight = sum(weights)
        normalized_weights = [w / total_weight for w in weights]
        selected_response = random.choices(responses, weights=normalized_weights, k=1)[0]
    
    # 根据max_tokens参数限制响应长度
    words = selected_response.split()
    if len(words) > max_tokens:
        selected_response = ' '.join(words[:max_tokens]) + '...'
    
    return selected_response

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        temperature = data.get('temperature', 0.7)
        max_tokens = data.get('max_tokens', 512)
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # 生成AI响应
        response = generate_response(prompt, temperature, max_tokens)
        
        return jsonify({
            'response': response,
            'prompt': prompt,
            'temperature': temperature,
            'max_tokens': max_tokens
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 静态文件服务@app.route('/')
def index():
    return send_from_directory('.', 'kdAIStudio.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True, port=5000)