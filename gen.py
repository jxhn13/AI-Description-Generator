from flask import Blueprint, request, jsonify
import os
import google.generativeai as genai
genai.configure(api_key=os.environ['AIzaSyBNxwScXkrwfKTtgBR7TjCxj1v4xoHB-VE'])

api = Blueprint('api', __name__)

@api.route('/description', methods=['POST'])
def get_description():
    data = request.json
    word = data.get('word')

    try:
        
        model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        
        
        response = model.generate_content(
            messages=[
                {'role': 'user', 'content': f'Provide a detailed description of the word: {word}'}
            ],
            temperature=0.7,
            max_tokens=1024
        )

        description = response.choices[0].message['content']
        return jsonify({'description': description})

    except Exception as e:
        print(f'Error fetching description: {e}')
        return jsonify({'error': f'Failed to fetch description: {str(e)}'}), 500


