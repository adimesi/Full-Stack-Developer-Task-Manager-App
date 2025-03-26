from flask import request, jsonify , Blueprint
from models.task import Task, db
from models.subtask import Subtask
from middleware.auth import token_required  
from datetime import datetime

subtasks_bp = Blueprint('subtasks', __name__)

@subtasks_bp.route('/tasks/<int:task_id>/subtasks', methods=['POST'])
@token_required
def create_subtask(curr_user, task_id):
    task = Task.query.filter_by(id=task_id, user_id=curr_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    data = request.get_json()
    if not data['title']:
        return jsonify({'error': 'Please fill all fields'}), 400
    try:
        if 'due_date' in data and data['due_date']:
            due_date = datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
        else:
            due_date = None
        new_subtask = Subtask(
            title=data['title'],
            status=data.get('status', 'pending'),
            due_date=due_date,
            task_id=data.get('task_id', task.id)
        )
        db.session.add(new_subtask)
        db.session.commit()
        return jsonify({'message': 'Subtask created successfully'}), 201
    except ValueError:
        return jsonify({'error': 'Invalid due_date format'}), 400



@subtasks_bp.route('/tasks/<int:task_id>/subtasks', methods=['GET'])
@token_required
def get_subtasks(curr_user, task_id):
    task = Task.query.filter_by(id=task_id, user_id=curr_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    subtasks= Subtask.query.filter_by(task_id=task.id).all()
    return jsonify([subtask.to_dict() for subtask in subtasks]), 200