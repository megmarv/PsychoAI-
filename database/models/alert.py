from database.db_connection import db
from datetime import datetime

class Alert(db.Model):
    __tablename__ = 'alerts'

    alertID = db.Column(db.Integer, primary_key=True)
    sessionID = db.Column(db.Integer, db.ForeignKey('sessions.sessionID'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    alertMessage = db.Column(db.Text, nullable=False)

    # ✅ Relationship: Alert belongs to a session
    session = db.relationship('Session', back_populates='alerts')

    def __init__(self, sessionID, alertMessage):
        self.sessionID = sessionID
        self.alertMessage = alertMessage

    @staticmethod
    def get_focus_gaining_technique(unfocused_ratio):
        """Return an appropriate focus-gaining technique based on engagement level."""
        techniques = [
            (86, 100, "Think-Pair-Share"),
            (71, 85, "Gamification"),
            (57, 70, "Short Break"),
            (44, 56, "Explaining Real-World Applications with Storytelling"),
            (30, 43, "Humor"),
        ]
        for min_val, max_val, technique in techniques:
            if min_val <= unfocused_ratio <= max_val:
                return technique
        return "No intervention needed"

    def generate_focus_alert(self, unfocused_ratio):
        """Generate an alert based on student engagement."""
        focus_technique = self.get_focus_gaining_technique(unfocused_ratio)
        alert_message = f"Engagement drop detected. Suggested intervention: {focus_technique}"
        self.alertMessage = alert_message
        db.session.add(self)
        db.session.commit()
        return alert_message
