import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    FLASK_ENV = os.environ.get('FLASK_ENV', 'default') 
    CONFIG_NAME = os.environ.get('CONFIG_NAME', 'default')
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get('JWT_SECRET', 'jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 
        'mysql+mysqlconnector://root:my-secret-pw@localhost:3306/task_manager'
    )
    PORT= os.environ.get('PORT', 5000)

class TestingConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')

config={
    'default': Config,
    'testing': TestingConfig,

}