# Load database connection
from database.db_connection import db

# Import models in the correct order
from database.models.user import User
from database.models.session import Session
from database.models.emotion_detection import EmotionDetection
from database.models.alert import Alert
from database.models.report import Report
