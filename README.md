# 🏗️ Event Circle Backend

The backend for **Event Circle** is a high-performance, domain-driven RESTful API built with **Express.js**, **TypeScript**, and **Prisma**. It serves as the core engine for user authentication, event lifecycle management, AI-powered assistance, and secure payment processing.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (v24+)
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **AI Integration**: Google Gemini AI (gemini-2.5-flash)
- **Database**: PostgreSQL (Neon/Cloud or Local)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt
- **Validation**: Zod
- **Payment Gateway**: SSLCommerz

---

## 📋 Architecture Overview

The backend follows a modular, layer-based architecture:

- **Modules**: Logic is divided into `auth`, `admin`, `user`, `ticket`, and `chatbot`.
- **AI Chatbot**: Integrated with Google Gemini to provide real-time event recommendations.
- **Sorting Logic**: All data-fetching endpoints are optimized to return the **latest data first** (Ordered by `createdAt` descending).
- **Vercel Optimized**: Configured for read-only filesystem environments (console-only logging).

---

## 📡 API Reference

### 🔐 Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and receive JWT | Public |
| GET | `/auth/user-profile`| Fetch current user details | Private |

### 👑 Admin Operations
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/admin/get-all-users` | Retrieve all users (Latest first) | ADMIN |
| POST | `/api/admin/create-event` | Create a new event | ADMIN |
| PUT | `/api/admin/update-event/:id`| Update an event | ADMIN |
| DELETE| `/api/admin/delete-event/:id`| Delete an event | ADMIN |
| GET | `/api/all-tickets` | View all successful bookings | ADMIN |

### 👤 User & Event Features
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/events` | List all events (Latest first) | Public |
| GET | `/api/events/:id` | Get event details | Public |
| GET | `/api/get-my-ticket/:email` | Get user's tickets (Latest first) | USER/ADMIN |
| POST | `/api/review` | Submit an event review | USER |
| POST | `/api/chatbot` | Interact with AI Assistant | Public |

---

## ⚙️ Prerequisites & Setup

### 1. Environment Variables
Create a `.env` file:

```env
PORT=4001
DATABASE_URL="your_postgresql_url"
JWT_SECRET="your_secure_random_key"
GEMINI_API_KEY="your_google_gemini_key"
FRONTEND_URL="http://localhost:3000"
```

### 2. Installation & Run
```bash
npm install
npx prisma generate
npm run dev
```

---

## 📦 Scripts
- `npm run dev`: Start server with `tsx watch`.
- `npm run build`: Compile TypeScript.
- `scripts/`: Contains utility scripts for DB testing and login verification.
