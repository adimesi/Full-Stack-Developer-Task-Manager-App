from flask import Flask, request, jsonify
from flask_cors import CORS
from config import config
import os
from models.user import db
from routes.auth import auth_bp
from routes.tasks import tasks_bp
from routes.subtasks import subtasks_bp

def create_app(config_name='default'):
    app=Flask(__name__)
    app.config.from_object(config[config_name])
    db.init_app(app)
    CORS(app)
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(tasks_bp, url_prefix='/api')
    app.register_blueprint(subtasks_bp, url_prefix='/api')
    with app.app_context():
        db.create_all()
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=int(config['default'].PORT))