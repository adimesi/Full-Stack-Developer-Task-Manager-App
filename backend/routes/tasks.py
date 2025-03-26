from flask import request, jsonify , Blueprint
from models.task import Task, db
from middleware.auth import token_required  

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['GET'])
@token_required
def get_tasks(curr_user):
    tasks = Task.query.filter_by(user_id=curr_user.id).all()
    return jsonify([task.to_dict() for task in tasks]), 200

@tasks_bp.route('/tasks/<int:id>', methods=['GET'])
@token_required
def get_task(curr_user, id):
    task = Task.query.filter_by(id=id, user_id=curr_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task.to_dict()), 200

@tasks_bp.route('/tasks', methods=['POST'])
@token_required
def create_task(curr_user):
    data = request.get_json()
    if not data.get('title') :
        return jsonify({'error': 'Please fill all fields'}), 400
    new_task=Task(title=data['title'], description=data.get('description'),status=data.get('status','pending'), due_date=data.get('due_date'), user_id=curr_user.id)

    db.session.add(new_task)
    db.session.commit()
    return jsonify([new_task.to_dict()]), 201

@tasks_bp.route('/tasks/<int:id>', methods=['PUT'])
@token_required
def update_task(curr_user, id):
    task = Task.query.filter_by(id=id, user_id=curr_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    data = request.get_json()
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'due_date' in data:
        task.due_date = data['due_date']
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
@token_required
def delete_task(curr_user, id):
    task = Task.query.filter_by(id=id, user_id=curr_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'}), 200