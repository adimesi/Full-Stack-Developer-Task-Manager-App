from flask_sqlalchemy import SQLAlchemy
import enum
from .user import db 

class TaskStatus(enum.Enum):
    PENDING="pending"
    DONE="done"
    
class Subtask(db.Model):
    __tablename__="subtasks"
    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(120), nullable=False)
    status=db.Column(db.Enum(TaskStatus), default=TaskStatus.PENDING , nullable=False)
    due_date=db.Column(db.DateTime, nullable=True)
    task_id=db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "status": self.status.value,
            "due_date": self.due_date,
            "task_id": self.task_id
        }
    
    
    def __repr__(self):
        return f"<Subtask {self.title}>"
    
