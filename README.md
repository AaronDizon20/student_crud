# Student CRUD Management System

A full-stack CRUD application for managing student records.
- **Backend**: Spring Boot 4 REST API with Spring Data JPA and PostgreSQL (`/student`)
- **Frontend**: Vite + React + Tailwind CSS (No Modals) (`/client`)

---

## Deploying to Render.com

This repository (`https://github.com/AaronDizon20/student_crud`) is fully configured for deployment on [Render.com](https://render.com).

### Method 1: 1-Click Automated Blueprint (Recommended)
1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** &rarr; **Blueprint**.
3. Select this repository: `https://github.com/AaronDizon20/student_crud`.
4. Render reads the root [`render.yaml`](./render.yaml) and automatically creates:
   - **PostgreSQL Database** (`student-db`)
   - **Spring Boot Web Service** (`student-backend`) running in Docker connected to the DB
   - **React Static Site** (`student-frontend`) automatically pointing to `student-backend`
5. Click **Apply**.

---

### Method 2: Manual Step-by-Step UI Setup

#### Step A: Create the Database
1. In Render, click **New +** &rarr; **PostgreSQL**.
2. Name: `student-db`, Database: `db_student`, User: `postgres`.
3. Select the **Free** instance type.
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (e.g., `postgresql://postgres:password@dpg-xxxx:5432/db_student`).

#### Step B: Deploy the Backend Web Service
1. In Render, click **New +** &rarr; **Web Service**.
2. Connect `https://github.com/AaronDizon20/student_crud`.
3. Configure:
   - **Root Directory**: `student`
   - **Runtime**: `Docker` (Render detects `student/Dockerfile`)
   - **Instance Type**: `Free`
4. Under **Environment Variables**, add:
   - `PORT`: `8080`
   - `SPRING_DATASOURCE_URL`: *(paste the Internal Database URL from Step A, prefixed with `jdbc:` if not present, e.g. `jdbc:postgresql://dpg-xxxx:5432/db_student`)*
   - `SPRING_DATASOURCE_USERNAME`: *(database user)*
   - `SPRING_DATASOURCE_PASSWORD`: *(database password)*
5. Click **Create Web Service**.
6. Note the public URL generated (e.g., `https://student-backend-xxxx.onrender.com`).

#### Step C: Deploy the Frontend Static Site
1. In Render, click **New +** &rarr; **Static Site**.
2. Connect `https://github.com/AaronDizon20/student_crud`.
3. Configure:
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://student-backend-xxxx.onrender.com` *(your backend URL from Step B)*
5. Under **Redirects / Rewrites**, add:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## Local Development

### 1. Backend (Spring Boot)
```bash
cd student
./mvnw spring-boot:run
```
*(Runs on `http://localhost:8080`)*

### 2. Frontend (Vite + React)
```bash
cd client
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*
