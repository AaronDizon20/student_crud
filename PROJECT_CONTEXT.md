# Student Management System - Context, Architecture & Deployment

## 1. Project Overview
This repository contains a full-stack CRUD application for managing student records.
- **Backend**: Spring Boot REST API backed by PostgreSQL and Spring Data JPA (`student/`).
- **Frontend**: Vite + React (JavaScript) Single Page Application styled with **Tailwind CSS**, designed **without modals** (`client/`, synced with `https://github.com/AaronDizon20/student_crud`).

---

## 2. Backend API Analysis

### Location
- **Path**: `student/src/main/java/com/dizon/student/`
- **Application Class**: `StudentApplication.java`
- **Controller**: `StudentController.java` (`@CrossOrigin(origins = "*")`)
- **Repository**: `StudentRepository.java`
- **Entity**: `Student.java`
- **Database Configuration**: `student/src/main/resources/application.properties`
  - Dynamic port: `server.port=${PORT:8080}`
  - Dynamic datasource: `spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/db_student}`

### Entity Model (`Student`)
| Field | Type | Description |
|---|---|---|
| `id` | Integer | Primary key, Auto-generated |
| `firstname` | String | Student's first name |
| `lastname` | String | Student's last name |
| `course` | String | Student's course / degree program |
| `section` | String | Student's section / class group |

### REST Endpoints
| HTTP Method | Endpoint | Request Body | Response Status & Body | Description |
|---|---|---|---|---|
| `GET` | `/dizon/students` | None | `200 OK` (JSON array of students) | Fetch all students |
| `GET` | `/dizon/students/{id}` | None | `200 OK` (Student JSON) or `404 Not Found` | Fetch single student |
| `POST` | `/dizon/students` | Student JSON (without `id`) | `201 Created` (Saved Student JSON) | Create new student |
| `PUT` | `/dizon/students/{id}` | Student JSON (updated fields) | `200 OK` (Updated Student JSON) or `404 Not Found` | Update student details |
| `DELETE` | `/dizon/students/{id}` | None | `200 OK` ("Student with id {id} deleted.") or `404 Not Found` | Delete student |

---

## 3. Render.com Deployment Configuration

### Frontend (Static Site on Render)
- **Repository**: `https://github.com/AaronDizon20/student_crud`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Blueprint**: [`client/render.yaml`](file:///C:/Users/Student-00/Desktop/dizon/JAVA/STUDENT-CRUD/client/render.yaml) provided.
- **Environment Variable**: `VITE_API_BASE_URL` (points to the deployed Spring Boot Web Service URL).
- **Rewrite Rule**: `/*` -> `/index.html` (Rewrite for SPA).

### Backend (Web Service on Render)
- **Runtime**: Docker (using [`student/Dockerfile`](file:///C:/Users/Student-00/Desktop/dizon/JAVA/STUDENT-CRUD/student/Dockerfile)) or Maven.
- **Environment Variables**:
  - `PORT`: Automatically set by Render.
  - `SPRING_DATASOURCE_URL`: Internal database URL from Render PostgreSQL.
  - `SPRING_DATASOURCE_USERNAME`: Render PostgreSQL username.
  - `SPRING_DATASOURCE_PASSWORD`: Render PostgreSQL password.
- **CORS**: Enabled via `@CrossOrigin(origins = "*")` in `StudentController.java`.

---

## 4. Completed Directory Structure
```text
STUDENT-CRUD/
│
├── student/                           # Spring Boot backend
│   ├── Dockerfile                     # Multi-stage Dockerfile for Render Web Service
│   ├── src/main/java/com/dizon/student/
│   │   ├── Student.java               # JPA Entity
│   │   ├── StudentApplication.java    # Spring Boot entry point
│   │   ├── StudentController.java     # REST Controller with @CrossOrigin
│   │   └── StudentRepository.java     # CrudRepository
│   └── src/main/resources/application.properties  # Supports ${PORT} & ${SPRING_DATASOURCE_URL}
│
├── client/                            # Vite + React Frontend (AaronDizon20/student_crud)
│   ├── .env.example                   # Environment variable template (VITE_API_BASE_URL)
│   ├── render.yaml                    # Render Blueprint Infrastructure-as-Code
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx              # Status feedback banners
│   │   │   ├── Navbar.jsx             # Top bar, student count, refresh button
│   │   │   ├── SearchBar.jsx          # Real-time search filter
│   │   │   ├── StudentForm.jsx        # Non-modal Add/Edit card form
│   │   │   └── StudentTable.jsx       # Data table with inline row deletion
│   │   ├── services/
│   │   │   └── studentService.js      # CRUD API client with VITE_API_BASE_URL support
│   │   ├── App.jsx                    # Root state coordinator
│   │   ├── index.css                  # Tailwind CSS import & base styles
│   │   └── main.jsx                   # React entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                 # Dev server proxy configuration
│   └── README.md                      # Comprehensive Render setup instructions
│
└── PROJECT_CONTEXT.md                 # Project context & architecture documentation
```
