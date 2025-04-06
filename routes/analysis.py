from flask import Blueprint, request, jsonify
from database.models.emotion_detection import EmotionDetection
from database.models.alert import Alert
from database.db_connection import db

analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/emotions', methods=['POST'])
def analyze_emotions():
    data = request.get_json()
    sessionID = data.get('sessionID')
    image_folder = 'routes/face_images'  # Folder where images will be stored
    face_images_folder = 'face_images'   # Folder for extracted faces

    # **Step 1: Capture Image from Webcam**
    captured_image = EmotionDetection.capture_image_from_webcam()

    if not captured_image:
        return jsonify({"error": "Failed to capture image"}), 500

    # **Step 2: Extract faces from the captured image**
    EmotionDetection.extract_faces(image_folder)

    # **Step 3: Perform emotion analysis**
    total_students, unfocused_students, emotions_count = EmotionDetection.analyze_emotions(face_images_folder)

    # **Step 4: Store results in the database**
    new_detection = EmotionDetection(
        sessionID=sessionID,
        totalStudents=total_students,
        focusedStudents=total_students - unfocused_students,
        unfocusedStudents=unfocused_students
    )
    db.session.add(new_detection)
    db.session.commit()

    # **Step 5: Check if an alert should be triggered**
    unfocused_ratio = (unfocused_students / total_students) * 100 if total_students > 0 else 0
    alert_message = None
    if unfocused_ratio > 30:
        alert_message = Alert.get_focus_gaining_technique(unfocused_ratio)
        new_alert = Alert(sessionID=sessionID, alertMessage=f"Engagement dropped! Suggested: {alert_message}")
        db.session.add(new_alert)
        db.session.commit()

    return jsonify({
        "message": "Emotion analysis completed",
        "emotions": emotions_count,
        "focused_ratio": 100 - unfocused_ratio,
        "alert": alert_message
    })