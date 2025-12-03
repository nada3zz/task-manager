# Task Management System

## Overview

Task Management APIs are built using Node.js, Express, Mongo, Mongoose. It provides endpoints for user authentication and task management. 

## Features
- User authentication (register and login)
- Task creation, retrieval, updating, and deletion
- User-specific task access (authorization)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (or use Docker)

### Installation Steps

1. **Clone the project directory**
   ```bash
   git clone https://github.com/nada3zz/task-manager.git
   cd task-manager-api
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration

3. **Run with Docker**
   ```bash
   docker-compose up --build
   ```
4. **Run without Docker** (requires local MongoDB)
   ```bash
   npm install

   npm run dev
   ```


## API Endpoints

### Authentication
- `POST /api/user/auth/register` - Register new user
- `POST /api/user/auth/login` - Login user

### Tasks (Protected - Requires JWT)
- `POST /api/task` - Create new task
- `GET /api/task` - Get all user's tasks
- `GET /api/task/:id` - Get single task
- `UPDATE /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task

## Example Usage
1. **Register User**
```bash curl -X POST http://localhost:3000/api/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "password": "Password@123"
  }'

Response:
json{
data: {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

```
2. **Login User**
```bash curl -X POST http://localhost:3000/api/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "Password@123"
  }'

Response:
json{
data: {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

```
3. **Create Task**
```bash curl -X POST http://localhost:3000/api/task \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete TypeScript API",
    "description": "Implement DTOs and interfaces",
    "completed": false,
  }'

Response:
json{
  "data": "Task has been added successfully"
}
```
4. **Get All Tasks**
```bash curl -X GET 'http://localhost:3000/api/task?page=1&limit=5&sortOrder=desc' \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

Response:
json{
  "count": 1,
  "tasks": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Complete TypeScript API",
      "description": "Implement DTOs and interfaces",
      "completed": false,
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-03-20T10:30:00.000Z",
      "updatedAt": "2024-03-20T10:30:00.000Z"
    }
  ]
}
```