
# Project Overview: Task Manager App
The Task Manager App is a full-stack application designed to help users manage their tasks and subtasks efficiently. It includes features for user authentication, task creation, editing, deletion, and subtask management. The app is built with a React + TypeScript frontend and a Flask backend, with a MySQL database for data storage.

## Key Features
- User Authentication
- Task Management
- Subtask Management
- Real-Time Feedback
- Role-Based Data Access

## Tech Stack
- Frontend: React + TypeScript
- Backend: Flask 
- Database: MySQL 

# requirements
-install docker 
-install python 3.12.3
-install Node.js 20.13.1
-install npm,pip 

## 	Setup instructions 

# Setting Up MySQL with Docker

- Step 1: Create a Docker Container for MySQL
```bash
docker run -p 3306:3306 --name database -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql
```

- Step 2: Access the Container and Create a New Database
```bash
docker exec -it database sh
sh-5.1# mysql --password
mysql> SHOW DATABASES;
mysql> CREATE DATABASE task_manager;
```


### Backend
1. Navigate to the frontend folder
2. Configure `.env` base on the templata
3. Install dependencies using `pip install -r requirements.txt`.
4. Run the Flask app with `python app.py`.

### Frontend
1. Navigate to the frontend folder.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.


### Testing 
- Pytest for backend testing 
command:
```bash
cd ./backend
python -m pytest tests/test.py
```

# API Documentation
## Authentication

### Signup
**POST** `/api/signup`  
#### Request:
```json
{ "email": "user@example.com", "username": "user", "password": "pass123" }
```
#### Response:
**201 Created**
```json
{ "message": "User created successfully" }
```

### Login
**POST** `/api/login`  
#### Request:
```json
{ "email": "user@example.com", "password": "pass123" }
```
#### Response:
**200 OK**
```json
{ "token": "jwt-token", "user": { "id": 1, "email": "user@example.com" } }
```

## Tasks

### Get All Tasks
**GET** `/api/tasks`  
#### Response:
**200 OK**
```json
[ { "id": 1, "title": "Task 1", "status": "pending" } ]
```

### Get Task by ID
**GET** `/api/tasks/<id>`  
#### Response:
**200 OK**
```json
{ "id": 1, "title": "Task 1" }
```

### Create Task
**POST** `/api/tasks`  
#### Request:
```json
{ "title": "New Task", "status": "pending" }
```
#### Response:
**201 Created**
```json
{ "id": 2, "title": "New Task" }
```

### Update Task
**PUT** `/api/tasks/<id>`  
#### Request:
```json
{ "title": "Updated Task" }
```
#### Response:
**200 OK**
```json
{ "message": "Task updated successfully" }
```

### Delete Task
**DELETE** `/api/tasks/<id>`  
#### Response:
**200 OK**
```json
{ "message": "Task deleted successfully" }
```

## Subtasks

### Get Subtasks
**GET** `/api/tasks/<task_id>/subtasks`  
#### Response:
**200 OK**
```json
[ { "id": 1, "title": "Subtask 1" } ]
```

### Create Subtask
**POST** `/api/tasks/<task_id>/subtasks`  
#### Request:
```json
{ "title": "New Subtask", "status": "pending" }
```
#### Response:
**201 Created**
```json
{ "message": "Subtask created successfully" }
```
# .env config examples:
## Backkend 

- FLASK_ENV=development
- SECRET_KEY=secret
- JWT_SECRET=secret
- JWT_EXPIRATION=86400
- DATABASE_URL=mysql+mysqlconnector://root:my-secret-pw@localhost:3306/task_manager
- PORT=5000

# Frontend
- VITE_API_URL=http://localhost:5000/api