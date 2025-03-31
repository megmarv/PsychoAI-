from flask import Blueprint, request, jsonify

from database import User
from database.models import user
from database.models.report import Report
from database.models.session import Session
from database.db_connection import db

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate/<int:sessionID>', methods=['POST'])
def generate_report(sessionID):
    """Generate a session report based on recorded emotions and alerts."""
    session = Session.query.get(sessionID)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    # Generate the report
    report = Report.generate_session_report(sessionID)
    if not report:
        return jsonify({"error": "No data available to generate report"}), 400

    return jsonify({
        "message": "Report generated successfully",
        "reportID": report.reportID,
        "summary": report.summaryText,
        "suggestions": report.suggestions,
        "generatedAt": report.generatedAt
    })


@report_bp.route('/get/<int:sessionID>', methods=['GET'])
def get_report(sessionID):
    """Retrieve a session report."""
    report = Report.query.filter_by(sessionID=sessionID).first()
    if not report:
        return jsonify({"error": "Report not found"}), 404

    return jsonify({
        "reportID": report.reportID,
        "sessionID": report.sessionID,
        "summary": report.summaryText,
        "suggestions": report.suggestions,
        "generatedAt": report.generatedAt
    })


@report_bp.route('/all', methods=['GET'])
def get_all_reports():
    """Retrieve all session reports with lecture title and teacher name."""
    reports = Report.query.join(Session).join(User).all()
    if not reports:
        return jsonify({"error": "No reports found"}), 404

    reports_list = [
        {
            "lectureTitle": report.session.lectureTitle,
            "teacher": report.session.teacher.username,
            "summary": report.summaryText,
            "suggestions": report.suggestions,
            "generatedAt": report.generatedAt
        }
        for report in reports
    ]

    return jsonify(reports_list), 200
