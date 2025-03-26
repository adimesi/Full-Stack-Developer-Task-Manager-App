from flask import request, jsonify , Blueprint
import jwt
from datetime import datetime, timedelta
from config import config
from models.user import User, db
config = config['default']
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    
    data = request.get_json()
    if not data.get("email") or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Please fill all fields'}), 400
   
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email already exists'}), 400
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({'error': 'Username already exists'}), 400
    new_user=User(email=data.get('email'), username=data.get('username'), password=data.get('password'))

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Please fill all fields'}), 400
    user = User.query.filter_by(email=data['email']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid credentials'}), 400
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.now() + config.JWT_ACCESS_TOKEN_EXPIRES
    }, config.JWT_SECRET)
    return jsonify({
        'token': token,
        'user': user.to_dict()
    }),200 