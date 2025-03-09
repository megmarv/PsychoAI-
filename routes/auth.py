from flask import Blueprint, request, session, jsonify
from database.models.user import User
from database.db_connection import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.get_user_by_username(username)

    if user and user.check_password(password):
        session['userID'] = user.userID  # Store user session
        session.modified = True  # Ensure session gets saved
        print("User logged in. Session data:", session.get('userID'))  # Debugging

        return jsonify({"message": "Login successful", "userID": user.userID, "role": user.role})

    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('userID', None)
    print("User logged out. Session cleared.")  # Debugging
    return jsonify({"message": "Logged out successfully"})

@auth_bp.route('/register', methods=['POST'])
def register():
    """Registers a new user and saves to DB"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'teacher')  # Default role is 'teacher'

    existing_user = User.get_user_by_username(username)
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(username=username, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "userID": new_user.userID}), 201
