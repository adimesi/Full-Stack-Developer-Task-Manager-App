from flask_sqlalchemy import SQLAlchemy
import bcrypt


db = SQLAlchemy()

class User(db.Model):
    __tablename__='users'
    id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(120), unique=True, nullable=False)
    username=db.Column(db.String(80), unique=True, nullable=False)
    password=db.Column(db.String(120), nullable=False)
    tasks=db.relationship('Task', backref='owner', lazy=True,cascade='all, delete-orphan')

    def __init__(self, email, username, password):
        self.email=email
        self.username=username
        self.password=self._hash_password(password)

    def _hash_password(self, password):
        salt=bcrypt.gensalt()
        hashed_password=bcrypt.hashpw(password.encode("utf-8"), salt)
        return hashed_password.decode("utf-8")
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))
    
    def to_dict(self):
        return {
            "id":self.id,
            "email":self.email,
            "username":self.username,
            "password":self.password
        }
    def __repr__(self):
        return f"<User {self.username}>"
    


    
    
