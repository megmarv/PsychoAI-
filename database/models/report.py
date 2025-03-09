from database.db_connection import db
from datetime import datetime
from database.models.alert import Alert
from database.models.emotion_detection import EmotionDetection


class Report(db.Model):
    __tablename__ = 'reports'

    reportID = db.Column(db.Integer, primary_key=True)
    sessionID = db.Column(db.Integer, db.ForeignKey('sessions.sessionID'), nullable=False)
    summaryText = db.Column(db.Text, nullable=False)
    suggestions = db.Column(db.Text, nullable=False)
    generatedAt = db.Column(db.DateTime, default=db.func.current_timestamp())

    session = db.relationship('Session', back_populates='report')

    def __init__(self, sessionID, summaryText, suggestions):
        self.sessionID = sessionID
        self.summaryText = summaryText
        self.suggestions = suggestions

    @staticmethod
    def generate_session_report(sessionID):
        """Compiles all emotion analyses and alerts into a session report."""

        # Get all emotion analysis data for the session
        emotion_records = EmotionDetection.query.filter_by(sessionID=sessionID).all()
        if not emotion_records:
            return None  # No data to generate a report

        # Calculate average focus ratio
        total_focus = sum(record.focusedRatio for record in emotion_records)
        avg_focus_ratio = total_focus / len(emotion_records)

        # Get all alert messages triggered during the session
        alert_records = Alert.query.filter_by(sessionID=sessionID).all()
        alert_messages = [alert.alertMessage for alert in alert_records] if alert_records else ["No alerts issued"]

        # Generate report summary
        summary_text = f"Session engagement analysis: The average focus ratio was {avg_focus_ratio:.2f}%."
        suggestions_text = "Focus improvement suggestions made during session:\n" + "\n".join(alert_messages)

        # Store the report in the database
        new_report = Report(sessionID=sessionID, summaryText=summary_text, suggestions=suggestions_text)
        db.session.add(new_report)
        db.session.commit()

        return new_report
