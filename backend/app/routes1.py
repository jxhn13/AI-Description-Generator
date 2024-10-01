from flask import Blueprint, request, jsonify
import google.generativeai as genai

Gemini_API_KEY=your_actual_api_key_here

genai.configure(api_key=GEMINI_API_KEY)

api = Blueprint('api', __name__)

@api.route('/api/description-gemini', methods=['POST'])
def get_description_gemini():
    data = request.json
    word = data.get('word')
    style = data.get('style', 'short')  

    
    if style == 'short':
        prompt = f"Write a short technical description about {word}."
    elif style == 'long':
        prompt = f"Write a detailed technical description about {word}. Provide in-depth details and comprehensive information."
    elif style == 'descriptive':
        prompt = f"Write a descriptive technical article about {word}. Include rich details and elaborate on various aspects."
    else:
        prompt = f"Write a technical article about {word}."

    try:
        model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        response1 = model.generate_content(prompt)
        description1 = response1.text if hasattr(response1, 'text') else "No description generated"
        
        return jsonify({'description1': description1})
    except Exception as e:
        print(f'Error fetching description: {e}')
        return jsonify({'error': f'Failed to fetch description: {str(e)}'}), 500


@api.route('/api/summarize-gemini', methods=['POST'])
def get_summary_gemini():
    data = request.json
    description1 = data.get('description1')
    prompt1 = f"Provide a concise technical summary of the following description:\n\n{description1}"

    try:
        model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        response2 = model.generate_content(prompt1)
        description2 = response2.text if hasattr(response2, 'text') else "No summary generated"
        
        return jsonify({'description2': description2})
    except Exception as e:
        print(f'Error fetching summary: {e}')
        return jsonify({'error': f'Failed to fetch summary: {str(e)}'}), 500

@api.route('/api/related-topics-gemini', methods=['POST'])
def get_related_topics_gemini():
    data = request.json
    word = data.get('word')
    prompt = f"List some related topics to {word} along with their URLs in this format: 'Name: URL'. Make sure URLs start with 'https://'. Provide each topic on a new line and do not give heading."

    try:
        model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        response = model.generate_content(prompt)
        related_topics_raw = response.text if hasattr(response, 'text') else "No related topics found"
        
        related_topics_list = []
        lines = related_topics_raw.split('\n')
        for line in lines:
            if ':' in line:
                name, url = line.split(':', 1)
                url = url.strip()
                if not url.startswith('https://'):
                    url = 'https://' + url.lstrip('http://')
                related_topics_list.append({
                    'name': name.strip(),
                    'url': url
                })
        
        related_topics_list = related_topics_list[:6]
        
        return jsonify({'related_topics': related_topics_list})
    except Exception as e:
        print(f'Error fetching related topics: {e}')
        return jsonify({'error': f'Failed to fetch related topics: {str(e)}'}), 500
