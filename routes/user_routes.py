from flask import Blueprint, jsonify, request
from database.models.user import User
from database.db_connection import db

user_bp = Blueprint('user', __name__)


@user_bp.route('/users', methods=['GET'])
def get_users():
    """Fetch all users from the database using User class method."""
    users = User.get_all_users()
    user_list = [
        {"userID": user.userID, "username": user.username, "role": user.role}
        for user in users
    ]
    return jsonify(user_list), 200


@user_bp.route('/users/<int:userID>', methods=['DELETE'])
def delete_user(userID):
    """Delete a user by ID."""
    user = User.query.get(userID)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": f"User {user.username} deleted successfully"}), 200


@user_bp.route('/users/<int:userID>', methods=['PUT'])
def update_user(userID):
    """Update an existing user's details (username, role)."""
    user = User.query.get(userID)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    username = data.get('username', user.username)  # Default to current value if not provided
    role = data.get('role', user.role)

    # Check if username already exists (and it's not the same user being updated)
    existing_user = User.query.filter_by(username=username).first()
    if existing_user and existing_user.userID != userID:
        return jsonify({"error": "Username already taken"}), 400

    user.username = username
    user.role = role
    db.session.commit()

    return jsonify({"message": f"User {user.username} updated successfully"}), 200
