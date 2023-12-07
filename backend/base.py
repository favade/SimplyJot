from flask import Flask, request, jsonify, session
from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 
app.secret_key = 'favade' 

class NoteManager:
    @app.route('/save_note', methods=['POST'])
    def save_note():
     data = request.get_json()
        title = data.get('title')
        note_content = data.get('note')

        if 'notes' not in session:
            session['notes'] = []

        session['notes'].append({'title': title, 'content': note_content})

        return jsonify({"message": "Note saved successfully"}), 200



if __name__ == '__main__':
    app.run(debug=True)

