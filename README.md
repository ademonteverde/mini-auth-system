# Mini Auth System

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.0-black?style=for-the-badge&logo=express)
![bcrypt](https://img.shields.io/badge/bcryptjs-3.0.3-blue?style=for-the-badge)
![UUID](https://img.shields.io/badge/UUID-v4-6f42c1?style=for-the-badge)
![JSON Storage](https://img.shields.io/badge/Storage-JSON-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A lightweight authentication API built with **Node.js**, **Express**, **bcrypt**, and **file-based JSON storage**.  
This project handles **user registration, login, password hashing**, and includes a `/users` endpoint for development previews.

This is the foundation for a future full authentication system (JWT, protected routes, frontend login, etc.).

---

## Features

- Register new users  
- Login with email/password  
- Passwords hashed with **bcryptjs**  
- Users stored locally in `users.json`  
- ES Modules (`import/export`)  
- Minimal, clean Express structure  
- Dev helper route to list all users (without passwords)

---

## Tech Stack

- **Node.js (ESM)**
- **Express 5**
- **bcryptjs** for secure password hashing  
- **UUID** for unique user IDs  
- **morgan** for request logging  
- **JSON file storage**
- **nodemon** for development

---

## Project Structure
```
mini-auth-system/
│
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── auth.js
│   └── data/
│       └── users.json
│
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/ademonteverde/mini-auth-system.git
cd mini-auth-system
```

Install dependencies:

```bash
npm install
```

---

## Running the Server

### Development mode (auto restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

Server default URL:

```
http://localhost:4000
```

---

## 🔌 API Endpoints

### **POST /api/register**

Register a new user.

#### Request Body:

```json
{
  "name": "Andre",
  "email": "andre@example.com",
  "password": "test123"
}
```

#### Success Response:

```json
{
  "message": "User registered successfully.",
  "user": {
    "id": "...",
    "name": "Andre",
    "email": "andre@example.com",
    "createdAt": "..."
  }
}
```

---

### **POST /api/login**

Log a user in.

#### Request Body:

```json
{
  "email": "andre@example.com",
  "password": "test123"
}
```

#### Success Response:

```json
{
  "message": "Login successful.",
  "user": {
    "id": "...",
    "name": "Andre",
    "email": "andre@example.com",
    "createdAt": "..."
  }
}
```

---

### **GET /api/users**

Returns all users **without passwords**.

#### Example Response:

```json
[
  {
    "id": "...",
    "name": "Andre",
    "email": "andre@example.com",
    "createdAt": "..."
  }
]
```

---

## Password Security

All passwords are stored using:

```
bcrypt.hash(password, 10)
```

This provides:

- Salting  
- Hashing  
- Secure storage  

**Passwords are never returned** in any API response.

---

## Future Improvements

Planned next steps:

- Add **JWT authentication**
- Add **protected routes**
- Add **logout mechanism**
- Add **frontend login/register page**
- Switch to a real database (PostgreSQL)

---

## License

This project is licensed under the [MIT License](LICENSE).  
© 2025 Andre Carlo Demonteverde