# Shajanand Project - Full Stack Blog Platform

This is a modern, full-stack Blog/CMS Platform. It features a robust Role-Based Access Control (RBAC) architecture where administrators can manage users and posts, and authenticated users can view the platform's content.

## 🛠️ Technology Stack

**Frontend:**
- **React 19** with **Vite**
- **TypeScript**
- **Tailwind CSS v4** & **Shadcn UI** (Radix UI) for modern, accessible components
- **React Router v7** for frontend routing
- **React Query v5** for robust state management and data fetching
- **Axios** for API communication

**Backend:**
- **Node.js** & **Express**
- **MongoDB** with **Mongoose ODM**
- **JWT (JSON Web Tokens)** & **Bcrypt** for authentication and authorization
- **Helmet** & **CORS** for API security

---

## 🎯 Architecture & Deep Analysis

### Backend System
The backend is structured around a RESTful API pattern under `/api/v1` and follows an MVC-like folder structure (Routes → Controllers → Models).
1. **Authentication & User Management:** Includes secure registration and login using JWT. Passwords are encrypted using `bcrypt`. Only admin users can fetch the entire list of users or activate/deactivate specific accounts.
2. **Post Management:** The `post` controllers handle standard CRUD operations. Only administrators have permission to create, update, or delete posts, making it heavily skewed towards a controlled publishing environment.
3. **Database:** Powered by MongoDB. It has two main models: `User` (email, password, role="user|admin", isActive) and `Post` (title, description, isActive).

### Frontend System
The frontend utilizes the latest packages like React 19 and Tailwind CSS v4.
1. **Routing:** Organized using `react-router-dom`. It is split across public routes (`/login`, `/register`) and private routes protected by a custom `<PrivateRoute>` wrapper which verifies the token in `localStorage`.
2. **Admin Dashboard:** Access to `/dashboard` is strictly gated to users with the `"admin"` role.
3. **State Management:** Handles asynchronous state (API queries and mutations) effectively using `@tanstack/react-query`, ensuring cache invalidation and loading states are handled smoothly.

---

## 🚀 How to Run the Project Locally

### Prerequisites
Make sure you have installed on your system:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Running locally on default port 27017 or a valid MongoDB Atlas URI)

### 1. Backend Setup
Open a terminal and navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Ensure your `.env` file is present in the `backend` folder with the following variables:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/blog-web
JWT_SECRET=THISISDEMOSECRET
```
Start the backend development server:
```bash
npm run dev
```
*The server should now be running on `http://localhost:8000`.*

### 2. Frontend Setup
Open a **new** terminal window/tab and navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Ensure your `.env` file is present in the `frontend` folder with the following variables:
```env
VITE_BASE_URL=http://localhost:8000/api/v1
```
Start the frontend development server:
```bash
npm run dev
```
*Vite will typically start the app on `http://localhost:5173`. Open this URL in your browser.*

---

## 💡 Troubleshooting & First Steps
* **Admin Access:** Since only admins can create posts, you will need to register an account normally. Then, open your MongoDB (using MongoDB Compass or `mongosh`), locate the newly created user in the `users` collection, and manually change their `role` field from `"user"` to `"admin"`.
* **Database Connection:** If you see any MongoDB connection errors in the backend terminal, double check that your local MongoDB daemon is up and running (`brew services start mongodb-community` on Mac).
