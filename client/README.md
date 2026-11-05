# Student Management System - Frontend

A modern CRUD frontend for the Student REST API built with **Vite**, **React (JavaScript)**, and **Tailwind CSS**.

## Features
- **No Modals**: Employs a clean two-column responsive split layout.
  - **Left Column**: Form for adding and editing students.
  - **Right Column**: Live searchable table of student records.
- **Inline Action Confirmation**: Safe deletion with an inline `"Delete? [Yes] [Cancel]"` confirmation prompt right inside the table row.
- **Real-Time Search**: Filter student records by ID, First Name, Last Name, Course, or Section.
- **Production & Dev Ready**: Supports `VITE_API_BASE_URL` for production on Render.com and dev proxy for local development.

---

## Deployment on Render.com

### Option 1: Automatic Blueprint Deployment
1. Connect your GitHub repository (`https://github.com/AaronDizon20/student_crud`) to [Render.com](https://render.com).
2. Render will automatically detect [`render.yaml`](./render.yaml).
3. Set the environment variable `VITE_API_BASE_URL` to your deployed backend URL (e.g. `https://student-backend.onrender.com`).
4. Click **Apply**.

### Option 2: Manual Static Site Setup
1. On your Render Dashboard, click **New +** > **Static Site**.
2. Connect repository: `https://github.com/AaronDizon20/student_crud`.
3. Configure the following settings:
   - **Name**: `student-crud` (or your choice)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - Add `VITE_API_BASE_URL`: URL of your deployed Spring Boot API (e.g. `https://your-api.onrender.com`).
5. **Redirects/Rewrites (SPA Routing)**:
   - Under **Redirects / Rewrites**, add:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## Local Development

### Prerequisites
- **Node.js** (v18+)
- Backend running on `http://localhost:8080`

### Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173). Requests to `/dizon/students` are automatically proxied to `http://localhost:8080`.
