from database.db_connection import db
from datetime import datetime

class Session(db.Model):
    __tablename__ = 'sessions'

    sessionID = db.Column(db.Integer, primary_key=True)
    teacherID = db.Column(db.Integer, db.ForeignKey('users.userID'), nullable=False)
    lectureTitle = db.Column(db.String(255), nullable=False)
    startTime = db.Column(db.DateTime, default=db.func.current_timestamp())
    endTime = db.Column(db.DateTime, nullable=True)
    updateInterval = db.Column(db.Integer, default=10)

    # ✅ Correct Relationships
    teacher = db.relationship('User', back_populates='sessions')
    emotion_detections = db.relationship('EmotionDetection', back_populates='session', cascade="all, delete-orphan")
    alerts = db.relationship('Alert', back_populates='session', cascade="all, delete-orphan")
    report = db.relationship('Report', back_populates='session', uselist=False, cascade="all, delete-orphan")

    def __init__(self, teacherID, lectureTitle, updateInterval=10):
        self.teacherID = teacherID
        self.lectureTitle = lectureTitle
        self.updateInterval = updateInterval

    def end_session(self):
        """Mark session as completed."""
        self.endTime = datetime.utcnow()
        db.session.commit()

    @staticmethod
    def get_active_sessions():
        return Session.query.filter_by(endTime=None).all()
