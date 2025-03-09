from flask import Blueprint

# Initialize the Blueprint modules
auth_bp = Blueprint('auth', __name__)
session_bp = Blueprint('session', __name__)
analysis_bp = Blueprint('analysis', __name__)
settings_bp = Blueprint('settings', __name__)
