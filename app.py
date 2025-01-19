import os
from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from PIL import Image
from fer import FER
import numpy as np

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


# Emotion detection function
def detect_emotions_in_folder(folder_path):
    """
    Detect emotions in images from a specified folder using the FER library.

    Parameters:
        folder_path (str): Path to the folder containing images.

    Returns:
        dict: A dictionary with emotions as keys and their counts as values.
    """
    # Dictionary to map detected emotions to standard keys
    emotion_mapping = {
        'angry': 'disgust',
        'neutral': 'neutral',
        'happy': 'happiness',
        'sad': 'sadness'
    }

    # Initialize the emotion count dictionary
    emotions_count = {key: 0 for key in emotion_mapping.values()}

    # Initialize the FER detector
    detector = FER(mtcnn=True)

    # Ensure the folder exists
    if not os.path.exists(folder_path):
        raise FileNotFoundError(f"The folder '{folder_path}' does not exist.")

    # Process each image in the folder
    for filename in os.listdir(folder_path):
        filepath = os.path.join(folder_path, filename)
        try:
            # Open the image
            img = Image.open(filepath)

            # Convert to NumPy array
            img_array = np.array(img)

            # Detect the top emotion
            detected_emotion, _ = detector.top_emotion(img_array)

            # Map the detected emotion and increment the count
            if detected_emotion in emotion_mapping:
                mapped_emotion = emotion_mapping[detected_emotion]
                emotions_count[mapped_emotion] += 1
            else:
                print(f"Detected unknown emotion '{detected_emotion}' in file {filename}")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

    return emotions_count


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

    try:
        # Call the emotion detection function
        emotions_count = detect_emotions_in_folder(app.config['UPLOAD_FOLDER'])
    except FileNotFoundError as e:
        return f"Error: {e}"

    return render_template('results.html', emotions=emotions_count)


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
