import os
from flask import Flask, render_template, request, redirect, url_for, session
from fer import FER
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from PIL import Image

# Flask configuration
app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Dummy credentials
USERNAME = 'admin'
PASSWORD_HASH = generate_password_hash('password')  # Use 'password' as the login password

UPLOAD_FOLDER = 'FacialExpressions'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_submit():
    username = request.form['username']
    password = request.form['password']

    if username == USERNAME and check_password_hash(PASSWORD_HASH, password):
        session['user'] = username
        return redirect(url_for('analyze'))
    else:
        return "Invalid credentials, please try again."

@app.route('/analyze')
def analyze():
    if 'user' not in session:
        return redirect(url_for('login'))

    emotions_count = {
        'disgust': 0,
        'neutral': 0,
        'confusion': 0,  # Confusion isn't directly supported by FER; adapt if needed
        'happiness': 0,
        'sadness': 0
    }

    # Use FER with mtcnn=True and video=False (No video processing required)
    detector = FER(mtcnn=True, video=False)

    # Analyze each image in the folder
    for filename in os.listdir(UPLOAD_FOLDER):
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        try:
            img = Image.open(filepath)
            emotion, _ = detector.top_emotion(img)

            if emotion in emotions_count:
                emotions_count[emotion] += 1
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    return render_template('results.html', emotions=emotions_count)

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
