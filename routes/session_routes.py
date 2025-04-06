from flask import Blueprint, request, jsonify, session
from database.models.session import Session
from database.db_connection import db
from database.models.report import Report  # Import Report model

session_bp = Blueprint('session', __name__)

@session_bp.route('/start', methods=['POST'])
def start_session():
    print("Session before start_session:", session.get('userID'))  # Debugging
    if 'userID' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    lectureTitle = data.get('lectureTitle')
    updateInterval = data.get('updateInterval', 10)  # Default to 10 minutes

    new_session = Session(teacherID=session['userID'], lectureTitle=lectureTitle, updateInterval=updateInterval)
    db.session.add(new_session)
    db.session.commit()

    return jsonify({"message": "Session started", "sessionID": new_session.sessionID})

@session_bp.route('/end/<int:sessionID>', methods=['POST'])
def end_session(sessionID):
    """Ends the session and triggers the report generation."""
    session_data = Session.query.get(sessionID)
    if not session_data:
        return jsonify({"error": "Session not found"}), 404

    # End the session
    session_data.end_session()

    # Generate the session report
    report = Report.generate_session_report(sessionID)
    if not report:
        return jsonify({"error": "Failed to generate report"}), 500

    db.session.commit()

    return jsonify({"message": "Session ended successfully", "reportID": report.reportID})
