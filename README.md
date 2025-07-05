# 📌 TaskFlow-API

A simple RESTful API built with **Node.js**, **Express**, and **MySQL** to manage tasks with basic CRUD operations.

## 📦 Tech Stack

- Node.js
- Express
- MySQL
- Express Validator

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
```

> Make sure your MySQL server is running and a `task` table exists in your `taskflow` database.

### ▶️ Run the app

```bash
npm run start
```

---

## 📚 API Endpoints

All endpoints are prefixed with `/tasks`

---

### ✅ `GET /tasks`

Returns all tasks.

**Response:**
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

Returns a task by ID.

**Response (200):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk and bread",
  "done": false
}
```

**Response (404):**
```json
{ "error": "Task not found" }
```

---

### 📝 `POST /tasks`

Creates a new task.

**Request Body:**
```json
{
  "title": "Do laundry",
  "description": "Wash white clothes separately",
  "done": true
}
```

**Validation Rules:**
- `title`: required, minimum 3 characters.
- `done`: optional, must be boolean if present.

**Success (201):**
```json
{
  "id": 2,
  "title": "Do laundry",
  "description": "Wash white clothes separately",
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

---

### ✏️ `PUT /tasks/:id`

Updates a task by ID.

**Request Body:**
```json
{
  "title": "Do laundry and ironing",
  "description": "Include ironing the shirts",
  "done": false
}
```

**Validation Rules:**
- `title`: required, minimum 3 characters.
- `done`: optional, must be boolean if present.

**Success (200):**
```json
{
  "id": 2,
  "title": "Do laundry and ironing",
  "description": "Include ironing the shirts",
  "done": false
}
```

**Error (404):**
```json
{ "error": "Task not found" }
```

---

### 🗑️ `DELETE /tasks/:id`

Deletes a task by ID.

**Success (200):**
```json
{ "message": "Task deleted successfully" }
```

**Error (404):**
```json
{ "error": "Task not found" }
```

---

## ❗ Error Responses

| Code | Meaning            | Description                            |
|------|--------------------|----------------------------------------|
| 400  | Bad Request        | Validation failed                      |
| 404  | Not Found          | Task not found with given ID           |
| 500  | Internal Server Error | Something went wrong on the server |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Matías Sebastián Benítez  
📧 [matias.benitez.2203@gmail.com]  
🔗 [https://github.com/matiassbenitez](https://github.com/matiassbenitez)
