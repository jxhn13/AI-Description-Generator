from flask import Blueprint, request, jsonify
import openai

openai.api_key = 'sk-proj-FUZv4I98ozyRZ5XGBCp6T3BlbkFJkv41JX2dtRXMd9dMYu58'

api = Blueprint('api', __name__)

@api.route('/description', methods=['POST'])
def get_description():
    data = request.json
    word = data.get('word')

    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
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
        return jsonify({'error': 'Failed to fetch description'}), 500