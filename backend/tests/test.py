import pytest
from app import create_app
from models.user import db, User
from models.task import Task
from models.subtask import Subtask
import json

@pytest.fixture
def client():
    app = create_app("testing") 
    app.config['SQLALCHEMY_DATABASE_URI'] ='mysql+mysqlconnector://root:my-secret-pw@localhost:3306/task_manager'
    app.config['TESTING'] = True
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.session.remove()
            db.drop_all()

@pytest.fixture
def user(client):
    user_data = {"email": "test@example.com", "username": "testuser", "password": "password"}
    client.post("/api/signup", json=user_data)
    return user_data

@pytest.fixture
def auth_token(client, user):
    response = client.post("/api/login", json={"email": user["email"], "password": user["password"]})
    return json.loads(response.data)["token"]

def test_signup(client):
    response = client.post("/api/signup", json={"email": "new@example.com", "username": "newuser", "password": "password"})
    assert response.status_code == 201

def test_login(client, user):
    response = client.post("/api/login", json={"email": user["email"], "password": user["password"]})
    assert response.status_code == 200
    assert "token" in json.loads(response.data)

def test_create_task(client, auth_token):
    response = client.post("/api/tasks", json={"title": "New Task","status":"PENDING"}, headers={"Authorization": f"Bearer {auth_token}"})
    assert response.status_code == 201

def test_get_tasks(client, auth_token):
    client.post("/api/tasks", json={"title":"Test Task","description":"This is a test task","status":"PENDING"}, headers={"Content-Type":"application/json","Authorization": f"Bearer {auth_token}"})
    response = client.get("/api/tasks", headers={"Authorization": f"Bearer {auth_token}"})

    assert response.status_code == 200
    

def test_update_task(client, auth_token):
    response = client.post("/api/tasks", json={"title": "Task to Update","status":"PENDING"}, headers={"Content-Type":"application/json","Authorization": f"Bearer {auth_token}"})
    task_id = json.loads(response.data)[0]["id"]
    update_response = client.put(f"/api/tasks/{task_id}", json={"title": "Updated Task"}, headers={"Content-Type":"application/json","Authorization": f"Bearer {auth_token}"})
    assert update_response.status_code == 200

def test_delete_task(client, auth_token):
    response = client.post("/api/tasks", json={"title":"Test Task","description":"This is a test task","status":"PENDING"}, headers={"Content-Type":"application/json","Authorization": f"Bearer {auth_token}"})
    task_id = json.loads(response.data)[0]["id"]
    delete_response = client.delete(f"/api/tasks/{task_id}", headers={"Content-Type":"application/json","Authorization": f"Bearer {auth_token}"})
    assert delete_response.status_code == 200
