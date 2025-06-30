# 🛒 E-ComVerse

**E-ComVerse** is a simple e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js).  
It allows users to register, log in, and manage products with token-based authentication using JWT.

---

## 📦 Project Structure

```
E-ComVerse/
├── Backend/          → Node.js + Express + MongoDB + JWT
└── Frontend/         → React.js + HTML + CSS
```

---

## ⚙️ Backend Setup (Node.js + MongoDB)

### 📁 Navigate to Backend

```bash
cd Backend
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Create `.env` File

```env
JWT_KEY=your_secret_key
```

### 🚀 Start MongoDB Locally

Ensure MongoDB is running at: `mongodb://127.0.0.1:27017/e-comm`

### ▶️ Run the Server

```bash
node server.js
```

Server will be available at: `http://localhost:3000`

---

## 🧪 Backend API Endpoints

### 👤 Authentication

| Method | Endpoint   | Description         |
|--------|------------|---------------------|
| POST   | `/signup`  | Register new user   |
| POST   | `/login`   | Login existing user |

> Returns JWT token for authenticated access

### 📦 Products (Require Auth Header)

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | `/add-product`     | Add new product        |
| GET    | `/products`        | Get all products       |
| GET    | `/product/:id`     | Get product by ID      |
| PUT    | `/product/:id`     | Update product by ID   |
| DELETE | `/delete/:id`      | Delete product by ID   |
| GET    | `/search/:keyword` | Search by name/company/category |

### 🔐 Auth Header Format

```
Authorization: Bearer <your_jwt_token>
```

---

## 💻 Frontend Setup (React + Vite)

### 📁 Navigate to Frontend

```bash
cd Frontend
```

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Run the App

```bash
npm run dev
```

The React app will be running at: `http://localhost:5173`

---

## 🧾 Sample JSONs

### 👤 User

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### 📦 Product

```json
{
  "name": "iPhone 15",
  "price": "79999",
  "category": "Mobile",
  "company": "Apple",
  "userID": "mongodb_user_id_here"
}
```

---

## 🔒 Middleware

### `verifyToken`

All protected routes require a valid token in the `Authorization` header.
If the token is missing or invalid, a `403` or `401` response is returned.

---

## 📌 Features

- 🔐 JWT-based Authentication
- 📄 User Signup & Login
- 📦 Product Add / Edit / Delete / Search
- 🔍 Protected Routes with Token Verification
- 🎨 Frontend UI using React + CSS

---

## 🛑 Limitations

- No password hashing (not safe for production)
- No image upload or billing system
- Minimal form validation

---


## This project is open-source and free to use.
