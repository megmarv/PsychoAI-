import os
from datetime import datetime
import cv2
import numpy as np
from deepface import DeepFace

def extract_faces(image_folder):
    """Extract faces from all images in a given folder and save them into 'face_images'."""
    output_folder = 'face_images'
    os.makedirs(output_folder, exist_ok=True)  # Ensure the folder exists
    face_images = []  # Initialize list correctly

    #Check if the image folder exists and contains images
    if not os.path.exists(image_folder) or not os.listdir(image_folder):
        print(f"Error: No images found in {image_folder}")
        return []

    #Process each image in the folder
    for filename in os.listdir(image_folder):
        image_path = os.path.join(image_folder, filename)

        #Ensure it's a valid image file
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
            continue  # Skip non-image files

        try:
            #Extract faces
            faces = DeepFace.extract_faces(image_path, detector_backend='retinaface', enforce_detection=False)
            for idx, face in enumerate(faces):
                face_img = face["face"]
                if isinstance(face_img, np.ndarray):
                    face_filename = os.path.join(output_folder, f"face_{idx}_{int(datetime.now().timestamp())}.jpg")
                    cv2.imwrite(face_filename, face_img * 255)  # Convert to proper scale before saving
                    face_images.append(face_filename)

        except Exception as e:
            print(f"Error extracting faces from {filename}: {e}")

    return face_images  # ✅ Returns a list of face image paths

# Example Usage:
def analyze_emotions(folder_path):
    """Analyze emotions in all images within a given folder."""

    # Supported image formats
    valid_extensions = {'.jpg', '.jpeg', '.png'}

    # Collect image file paths
    face_image_paths = [
        os.path.join(folder_path, filename)
        for filename in os.listdir(folder_path)
        if os.path.splitext(filename)[1].lower() in valid_extensions
    ]

    if not face_image_paths:
        print("No valid face images found in the folder.")
        return 0, 0, {}

    # Emotion categories
    emotions_count = {emotion: 0 for emotion in ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']}
    focused_emotions = {"happy", "neutral", "surprise"}

    total_students = len(face_image_paths)
    unfocused_students = 0

    for face_path in face_image_paths:
        try:
            analysis = DeepFace.analyze(face_path, actions=['emotion'], enforce_detection=False)
            dominant_emotion = analysis[0]['dominant_emotion']
            emotions_count[dominant_emotion] += 1
            if dominant_emotion not in focused_emotions:
                unfocused_students += 1
        except Exception as e:
            print(f"Error analyzing {face_path}: {e}")

    print(total_students, unfocused_students, emotions_count)

face_images = extract_faces("routes/face_images")
analyze_emotions('face_images')