from flask import Blueprint, request, session, jsonify

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/update_interval', methods=['POST'])
def set_update_interval():
    if 'user' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        new_interval = int(request.get_json().get('update_interval'))
        if new_interval > 0:
            session['update_interval'] = new_interval
            return jsonify({"message": "Update interval set successfully", "interval": new_interval})
        else:
            return jsonify({"error": "Please enter a valid positive number"}), 400
    except ValueError:
        return jsonify({"error": "Invalid input for update interval"}), 400
