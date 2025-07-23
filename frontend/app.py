from flask import Flask, render_template, request, redirect, url_for
import json

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/settings', methods=['GET', 'POST'])
def settings():
 return render_template('settings.html')

@app.route('/questions', methods=['GET', 'POST'])
def questions():
    if request.method == 'POST':
        user_data = {
            'age': request.form['age'],
            'issue': request.form['issue'],
            'school': request.form['school']
        }
        with open('data/users.json', 'w') as f:
            json.dump(user_data, f)
        matched_peer = {
            'name': 'shayan',
            'age': '17',
            'issue': user_data['issue']
        }

        return render_template('match.html', match=matched_peer)

    return render_template('questions.html')

@app.route('/notes')
def notes():
    return render_template('notes.html')
@app.route('/support')
def support():
    return render_template('support.html') 
@app.route('/chat')
def chat():
    return render_template('chat.html')
if __name__ == '__main__':
    app.run(debug=True)
