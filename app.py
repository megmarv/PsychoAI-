import os
import traceback
from flask import Flask
from flask_cors import CORS
from flask_session import Session  # Ensure Flask sessions work correctly
from database.db_connection import db
from routes.auth import auth_bp
from routes.session_routes import session_bp
from routes.analysis import analysis_bp
from routes.settings import settings_bp
from routes.report_routes import report_bp
from routes.user_routes import user_bp

app = Flask(__name__)

# Enable CORS for all routes and support credentials (cookies)
CORS(app, origins="http://localhost:3000", supports_credentials=True)

# Database Configuration (Use environment variables for security)
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "psychoai")

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Flask session configuration
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # Set to True in production (HTTPS)
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_FILE_DIR"] = "./flask_sessions"  # Explicit session storage directory

# Ensure session storage directory exists
if not os.path.exists(app.config["SESSION_FILE_DIR"]):
    os.makedirs(app.config["SESSION_FILE_DIR"])

# Secret key for Flask sessions (use an environment variable in production)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "your_default_secret_key")

# Initialize Flask-Session and database
Session(app)
db.init_app(app)

# Register Routes
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(session_bp, url_prefix="/session")
app.register_blueprint(analysis_bp, url_prefix="/analysis")
app.register_blueprint(settings_bp, url_prefix="/settings")
app.register_blueprint(report_bp, url_prefix="/report")
app.register_blueprint(user_bp, url_prefix="/user")

if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()  # Ensures tables are created
            print("✅ Database connected successfully")
        except Exception as e:
            print("❌ Database connection failed:")
            print(traceback.format_exc())

    app.run(debug=True)
