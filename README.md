# 📌 TaskFlow-API

A simple RESTful API built with **Node.js**, **Express**, and **MySQL** to manage tasks with basic CRUD operations.

Now deployed on [Railway](https://railway.app).

---

## 📦 Tech Stack

- Node.js
- Express
- MySQL
- Express Validator
- Railway (Deployment)
- dotenv

---

## 🚀 Getting Started

### 📁 Clone the repo

```bash
git clone https://github.com/matiassbenitez/TaskFlow-API.git
cd taskflow-api
```

### 📦 Install dependencies

```bash
npm install
```

### ⚙️ Environment variables

Create a `.env` file in the root of the project with the following content:

```env
PORT=3000
DB_URI=mysql://user:password@localhost:3306/taskflow
JWT_SECRET=your-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

> Make sure your MySQL server is running and a `task` table exists in your `taskflow` database.
❌ Never commit your .env file. Only .env.example should be tracked in version control.
### ▶️ Run the app

```bash
npm run start
```
The server will be available at: http://localhost:3000

---

### ☁️ Deployment (Railway)

To deploy this app to Railway:

Push this repo to GitHub.

Create a new project in Railway > Deploy from GitHub.

Add your environment variables (DB_URI, PORT, JWT_SECRET, CORS_ORIGIN) in the Variables section.

(Optional) Add the MySQL plugin if you want to use Railway’s managed database.

Railway will automatically detect the start script and deploy your app.

After deployment, your API will be available at a URL like:
https://taskflow-api.up.railway.app

---

# 📚 API Endpoints

> Todos los endpoints bajo `/tasks` requieren autenticación mediante JWT.  
> Los endpoints de `/auth` son públicos.

---

## 🔐 Auth Endpoints

### 📝 `POST /auth/register`

Register a new user.

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@test.com",
  "password": "testpassword"
}
```

**Validaciones:**
- `email`: required, must be a valid email.
- `password`: minimum 6 characters.

**Response (201):**
```json
{
  "id": 1,
  "email": "test@test.com"
}
```

**Error (400 - email already registered):**
```json
{ "error": "User already exists" }
```

---

### 🔐 `POST /auth/login`

Log in and return a JWT token.

**Request Body:**
```json
{
  "email": "test@test.com",
  "password": "testpassword"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "test@test.com"
  }
}
```

**Error (401 - incorrect credentials):**
```json
{ "error": "Invalid email or password" }
```

---

## ✅ Task Endpoints

> All `/tasks` endpoints require the header:  
> `Authorization: Bearer <token>`

---

### 📋 `GET /tasks`

Returns all tasks for the authenticated user.

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk and bread",
    "done": false
  }
]
```

---

### 🔍 `GET /tasks/:id`

Returns a task by its ID.Devuelve una tarea por su ID.

**Response (200):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk and bread",
  "done": false
}
```

**Error (400 - invalid ID):**
```json
{ "error": "Invalid task ID" }
```

**Error (404 - not flound):**
```json
{ "error": "Task not found" }
```

---

### ➕ `POST /tasks`

Create a new task.

**Request Body:**
```json
{
  "title": "Do laundry",
  "description": "Separate white clothes",
  "done": true
}
```

**Validaciones:**
- `title`: required, minimum 3 characters.
- `description`: required.
- `done`: optional, boolean.

**Response (201):**
```json
{
  "id": 2,
  "title": "Do laundry",
  "description": "Separate white clothes",
  "done": true
}
```

**Error (400 - Validation):**
```json
{
  "message": "Validation error",
  "errors": [
    {
      "msg": "The title must be more than 3 caracters",
      "param": "title",
      "location": "body"
    }
  ]
}
```

**Error (400 - Description missing):**
```json
{ "error": "Description is required" }
```

---

### ✏️ `PUT /tasks/:id`

Updates a task by its ID.

**Request Body:**
```json
{
  "title": "Do laundry and ironing",
  "description": "Include ironing shirts",
  "done": false
}
```

**Validaciones:**
- `title`: required, minimum 3 characters.
- `done`: optional, boolean.

**Response (200):**
```json
{
  "id": 2,
  "title": "Do laundry and ironing",
  "description": "Include ironing shirts",
  "done": false
}
```

**Error (404):**
```json
{ "error": "Task not found" }
```

---

### 🗑️ `DELETE /tasks/:id`

Deletes a task by its ID.

**Response (200):**
```json
{ "message": "Task deleted successfully" }
```

**Error (404):**
```json
{ "error": "Task not found" }
```

---

## ⚠️ Auth Middleware (Protección JWT)

All `/tasks` endpoints use a middleware that validates the JWT token.

**Required header:**
```
Authorization: Bearer <token>
```

**Common errors:**

| Status | Cause                         | Response                             |
|--------|-------------------------------|--------------------------------------|
| 401    | No token provided             | `{ "error": "No token provided or invalid format" }` |
| 403    | Invalid or expired token      | `{ "error": "Invalid or expired token" }` |

---

## ❗ Error Responses

| Code   | Meaning                  | Cause                                |
|--------|--------------------------|--------------------------------------|
| 400    | Bad Request              | Validation error or missing data     |
| 401    | Unauthorized             | No token provided or invalid format  |
| 403    | Forbidden                | Invalid or expired token             |
| 404    | Not Found                | Resource not found                   |
| 500    | Internal Server Error    | Server error                         |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Matías Sebastián Benítez  
📧 [matias.benitez.2203@gmail.com]  
🔗 [https://github.com/matiassbenitez](https://github.com/matiassbenitez)
