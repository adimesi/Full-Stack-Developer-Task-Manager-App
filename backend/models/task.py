from flask_sqlalchemy import SQLAlchemy
import enum
from .user import db

class TaskStatus(enum.Enum):
    PENDING="pending"
    DONE="done"
    
    

class Task(db.Model):
    __tablename__='tasks'
    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(120), nullable=False)
    description=db.Column(db.String(120), nullable=True)
    status=db.Column(db.Enum(TaskStatus), default=TaskStatus.PENDING , nullable=False)
    due_date=db.Column(db.DateTime, nullable=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    subtasks = db.relationship('Subtask', backref='parent_task', lazy=True, cascade='all, delete-orphan')
    def to_dict(self):
        return {
            "id":self.id,
            "title":self.title,
            "description":self.description,
            "status":self.status.value,
            "due_date":self.due_date,
            "user_id":self.user_id
        }
   
    

    def __repr__(self):
        return f"<Task {self.title}>"
