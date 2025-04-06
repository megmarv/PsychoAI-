from database.db_connection import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'

    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    passwordHash = db.Column(db.Text, nullable=False)
    role = db.Column(db.Enum('teacher', 'admin'), nullable=False)

    # Add Back-Reference to Sessions
    sessions = db.relationship('Session', back_populates='teacher', cascade="all, delete-orphan")

    def __init__(self, username, password, role='teacher'):
        """Constructor to initialize user with hashed password."""
        self.username = username
        self.passwordHash = generate_password_hash(password)  # Hash the password before saving
        self.role = role

    def check_password(self, password):
        """Verify user password."""
        return check_password_hash(self.passwordHash, password)

    @staticmethod
    def get_user_by_username(username):
        """Get user by username."""
        return User.query.filter_by(username=username).first()

    @staticmethod
    def create_user(username, password, role):
        """Create a new user."""
        new_user = User(username, password, role)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def get_all_users():
        """Fetch all users from the database."""
        return User.query.all()
