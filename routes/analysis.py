from flask import Blueprint, request, jsonify
from database.models.emotion_detection import EmotionDetection
from database.models.alert import Alert
from database.db_connection import db

analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/emotions', methods=['POST'])
def analyze_emotions():
    data = request.get_json()
    sessionID = data.get('sessionID')
    image_path = 'routes/face_images'
    face_image_paths='face_images'

    # Step 1: Extract faces from the image
    EmotionDetection.extract_faces(image_path)

    # Step 2: Perform emotion analysis
    total_students, unfocused_students, emotions_count = EmotionDetection.analyze_emotions(face_image_paths)

    # Step 3: Store results in the database
    new_detection = EmotionDetection(
        sessionID=sessionID,
        totalStudents=total_students,
        focusedStudents=total_students - unfocused_students,
        unfocusedStudents=unfocused_students
    )
    db.session.add(new_detection)
    db.session.commit()

    # Step 4: Check if an alert should be triggered
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
