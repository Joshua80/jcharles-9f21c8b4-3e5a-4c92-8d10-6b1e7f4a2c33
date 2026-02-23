# Secure Task Management System

A full-stack monorepo managed with **Nx**, featuring a **NestJS API** and an **Angular Dashboard**.

---

## 🚀 Complete Setup & Run Guide

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Git**: For cloning the repository (if applicable)

### Step 1: Install Dependencies

```bash
npm install
```

This installs all dependencies for both backend and frontend.

---

### Step 2: Backend Setup (API)

#### 2.1 Initialize Environment File

```bash
# Copy the sample environment file
cp apps/api/env.sample apps/api/.env
```

#### 2.2 Configure Environment Variables

Open `apps/api/.env` and configure:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:4200

# JWT Configuration (IMPORTANT: Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DB_TYPE=sqlite
DB_PATH=./database/database.sqlite
```

> **⚠️ Important**: Change `JWT_SECRET` to a strong random string in production!

---

### Step 3: Frontend Setup (Dashboard)

#### 3.1 Configure API URL

Open `apps/dashboard/public/config/config.json` and ensure it matches your API port:

```json
{
  "apiUrls": {
    "BASE_URL": "http://localhost:3000/",
    "TIMEOUT": 60000
  }
}
```

> **Note:** If you change the `PORT` in your API `.env`, update `BASE_URL` here to match.

---

### Step 4: Seed the Database

Before running the application, seed the database with initial data:

```bash
npx nx run api:seed
```

This creates:
- Demo organization
- Test users (Owner, Admin, Viewer roles)
- Default password: `123456`

**Expected Output:**
```
Seeding database...
Seeding completed successfully!
Owner: owner@example.com / 123456
Admin: admin@example.com / 123456
Viewer: viewer@example.com / 123456
Viewer1: viewer1@example.com / 123456
```

---

### Step 5: Start the Application

#### Option A: Quick Start (Windows) - Recommended

**Double-click `run-project.bat`** or run from command line:

```bash
run-project.bat
```

This batch file will:
- ✅ Check if dependencies are installed (runs `npm install` if needed)
- ✅ Create `.env` file from sample if missing
- ✅ Free up ports 3000 and 4200 if they're in use
- ✅ Start both API and Dashboard servers in separate windows
- ✅ Display server URLs

**To stop the servers:**
- Close the server windows, or
- Run `stop-project.bat` to kill all processes on ports 3000 and 4200

---

#### Option B: Manual Start (All Platforms)

You need **two terminal windows** - one for backend, one for frontend.

##### Terminal 1: Start Backend API

```bash
npx nx serve api
```

**Expected Output:**
```
🚀 Server running on http://localhost:3000
📚 Swagger docs available on http://localhost:3000/docs
🌍 Environment: development
```

**Verify it's running:**
- Open browser: `http://localhost:3000`
- Should see: `{"message":"Task Management API"}`

##### Terminal 2: Start Frontend Dashboard

```bash
npx nx serve dashboard
```

**Expected Output:**
```
✔ Browser application bundle generation complete.
Initial Chunk Files | Names         |  Size
...
** Angular Live Development Server is listening on localhost:4200 **
```

**Verify it's running:**
- Browser should auto-open to `http://localhost:4200`
- Or manually navigate to: `http://localhost:4200`

---

### Step 6: Access the Application

#### Option A: Use the Web Dashboard (Recommended)

1. **Open**: `http://localhost:4200`
2. **Login** with one of these accounts:
   - **Owner**: `owner@example.com` / `123456`
   - **Admin**: `admin@example.com` / `123456`
   - **Viewer**: `viewer@example.com` / `123456`
3. **Features Available**:
   - Create, edit, delete tasks
   - Drag-and-drop task reordering
   - Search and filter tasks
   - View audit logs (Owner/Admin only)

#### Option B: Use Swagger API Documentation

1. **Open**: `http://localhost:3000/docs`
2. **Login** to get JWT token:
   - Click `POST /auth/login`
   - Click "Try it out"
   - Enter credentials:
     ```json
     {
       "email": "owner@example.com",
       "password": "123456"
     }
     ```
   - Click "Execute"
   - Copy the `access_token` from response
3. **Authorize**:
   - Click the green "Authorize" button at top
   - Paste your token
   - Click "Authorize" then "Close"
4. **Test Endpoints**:
   - Try `GET /tasks` to list tasks
   - Try `POST /tasks` to create a task
   - Explore other endpoints

---

### Step 7: Verify Everything Works

#### Test Checklist:

- [ ] Backend API responds at `http://localhost:3000`
- [ ] Swagger docs load at `http://localhost:3000/docs`
- [ ] Frontend loads at `http://localhost:4200`
- [ ] Can login with test credentials
- [ ] Can create a task
- [ ] Can view tasks list
- [ ] Can edit/delete tasks (Owner/Admin)
- [ ] Drag-and-drop reordering works
- [ ] Audit logs accessible (Owner/Admin)

---

## 🛠 Running the Workspace

### Quick Commands Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Seed database | `npx nx run api:seed` |
| Start backend | `npx nx serve api` |
| Start frontend | `npx nx serve dashboard` |
| Build all | `npx nx run-many -t build` |
| Run tests | `npx nx test api` |
| View project graph | `npx nx graph` |
| Reset NX cache | `npx nx reset` |

### Running in Production Mode

```bash
# Build both apps
npx nx run-many -t build --configuration=production

# The built files will be in dist/apps/api and dist/apps/dashboard
```

---

## 🔐 Default Login Credentials

After seeding the database, use these accounts to test different permission levels:

> **Default Password for all accounts:** `123456`

| Role | Email | Username | Permissions |
|---|---|---|---|
| **Owner** | `owner@example.com` | `owner` | Full access (Create, Read, Update, Delete, View Audit Logs) |
| **Admin** | `admin@example.com` | `admin` | Create, Read, Update (own tasks), View Audit Logs |
| **Viewer** | `viewer@example.com` | `viewer` | Read only (assigned tasks) |
| **Viewer** | `viewer1@example.com` | `viewer1` | Read only (assigned tasks) |

### Role Permissions Summary

- **Owner**: Can do everything (create, edit, delete tasks, view audit logs, reorder tasks)
- **Admin**: Can create and edit tasks (only own tasks), view audit logs, reorder tasks
- **Viewer**: Can only view tasks assigned to them

---

## 📖 API Documentation (Swagger)

Once the API is running, interactive Swagger docs are available at:

**URL:** `http://localhost:3000/docs`

To test protected routes, click the **Authorize** button and paste your JWT Bearer token.

---

## 📋 Useful Nx Commands

| Action | Command |
|---|---|
| Build All | `npx nx run-many -t build` |
| Visualize Project Graph | `npx nx graph` |
| Reset Cache | `npx nx reset` |
| Kill Stuck Node Tasks | `pkill -9 node` |

---

## ⚠️ Common Issues

**CORS Blocked**
Ensure `app.enableCors()` is enabled in `apps/api/src/main.ts`.

**Port Mismatch**
If the API starts on a different port (e.g., `4000`), update both `config.json` and the Swagger URL accordingly.

**Database Path**
The SQLite file is stored at `apps/api/database/database.sqlite`.

---

## 📐 Architecture Overview

### NX Monorepo Layout

This project follows a modular NX monorepo structure:

```
hnamdev-7f3a1b92-6d4e-4c8a-9b5f-2e1a3c7d8e90/
├── apps/
│   ├── api/              # NestJS backend application
│   └── dashboard/        # Angular frontend application
├── libs/
│   ├── data/             # Shared TypeScript interfaces and DTOs
│   └── auth/             # Reusable RBAC logic and decorators
└── dist/                 # Build outputs
```

### Rationale

- **Shared Libraries (`libs/`)**: Promotes code reuse between frontend and backend, ensuring type safety and consistency
  - `libs/data/`: Common interfaces, enums, and DTOs
  - `libs/auth/`: RBAC decorators, guards, and permission logic
- **Modular Apps**: Separates concerns, enables independent deployment, and simplifies scaling
- **Type Safety**: Shared types prevent API contract mismatches

---

## 🗄️ Data Model

### Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│ Organization │◄──┐     │     User     │         │    Task     │
└─────────────┘   │     └──────────────┘         └─────────────┘
       │          │            │                          │
       │          │            │                          │
       │          └────────────┼──────────────────────────┘
       │                       │                          │
       │         ┌─────────────▼──────────┐              │
       │         │   organizationId       │              │
       └─────────┤   (ManyToOne)         │              │
                 └────────────────────────┘              │
                                                    │
                 ┌────────────────────────────────────▼────┐
                 │  createdById (ManyToOne)              │
                 │  assignedToId (ManyToOne, nullable)  │
                 │  organizationId (ManyToOne)          │
                 └──────────────────────────────────────┘

┌─────────────┐
│ Permission  │  (Future: Granular permissions per role/resource)
└─────────────┘

┌─────────────┐
│   Audit     │  (Logs all user actions)
└─────────────┘
```

### Schema Description

#### **Users**
- `id` (UUID): Primary key
- `username`: Unique username
- `email`: Unique email address
- `passwordHash`: Bcrypt hashed password
- `role`: Enum (OWNER, ADMIN, VIEWER)
- `organizationId`: Foreign key to Organization
- `createdAt`: Timestamp

#### **Organizations**
- `id` (UUID): Primary key
- `name`: Organization name
- `parentId`: Self-referential foreign key (2-level hierarchy)
- `children`: One-to-many relationship with child organizations

#### **Tasks**
- `id` (UUID): Primary key
- `title`: Task title
- `description`: Task description
- `category`: Task category (e.g., Work, Personal)
- `status`: Enum (TODO, IN_PROGRESS, DONE)
- `position`: Integer for drag-and-drop ordering
- `createdById`: Foreign key to User (creator)
- `assignedToId`: Foreign key to User (nullable, assignee)
- `organizationId`: Foreign key to Organization
- `createdAt`, `updatedAt`: Timestamps

#### **Permissions** (Entity created, ready for future use)
- `id` (UUID): Primary key
- `role`: Role type
- `resource`: Resource type (TASK, USER, etc.)
- `action`: Action type (CREATE, READ, UPDATE, DELETE, MANAGE)
- `allowed`: Boolean flag

#### **Audit Logs**
- `id` (UUID): Primary key
- `userId`: Foreign key to User
- `action`: Action performed (e.g., CREATE_TASK)
- `entityId`: ID of affected entity
- `entityType`: Type of entity (e.g., Task)
- `createdAt`: Timestamp

---

## 🔐 Access Control Implementation

### Role-Based Access Control (RBAC)

#### Role Hierarchy

The system implements role inheritance:

- **OWNER**: Inherits all permissions (OWNER, ADMIN, VIEWER)
- **ADMIN**: Inherits ADMIN and VIEWER permissions
- **VIEWER**: Only VIEWER permissions

```typescript
// Role hierarchy defined in libs/data/src/enums/role.enum.ts
ROLE_HIERARCHY = {
  OWNER: [OWNER, ADMIN, VIEWER],
  ADMIN: [ADMIN, VIEWER],
  VIEWER: [VIEWER],
}
```

#### Permission Matrix

| Action | OWNER | ADMIN | VIEWER |
|--------|-------|-------|--------|
| Create Task | ✅ | ✅ | ❌ |
| View All Tasks | ✅ | ✅ | Only Assigned |
| Update Task | ✅ | Own Tasks Only | ❌ |
| Delete Task | ✅ | ❌ | ❌ |
| View Audit Logs | ✅ | ✅ | ❌ |
| Reorder Tasks | ✅ | ✅ | ❌ |

#### Implementation Details

1. **JWT Authentication**
   - Login endpoint: `POST /auth/login`
   - Returns JWT token with payload: `{ userId, role, organizationId }`
   - Token included in `Authorization: Bearer <token>` header
   - All protected routes require valid JWT

2. **RBAC Guards**
   - `JwtAuthGuard`: Validates JWT token
   - `RolesGuard`: Checks role permissions with inheritance
   - Applied via `@UseGuards(JwtAuthGuard, RolesGuard)`

3. **Decorators**
   - `@Roles(RoleType.OWNER, RoleType.ADMIN)`: Specifies required roles
   - `@GetUser()`: Extracts current user from request

4. **Organization-Level Scoping**
   - Tasks are scoped to user's organization
   - Viewers only see tasks assigned to them
   - Cross-organization access is prevented

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
All endpoints (except `/auth/login`) require JWT authentication:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### **Authentication**

**POST `/auth/login`**
- **Description**: Authenticate user and receive JWT token
- **Request Body**:
  ```json
  {
    "email": "owner@example.com",
    "password": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### **Tasks**

**POST `/tasks`**
- **Description**: Create a new task (Owner, Admin only)
- **Request Body**:
  ```json
  {
    "title": "Setup project",
    "description": "Setup NestJS project with TypeORM",
    "category": "Development",
    "status": "TODO",
    "assignedToId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```
- **Response**: Created task object

**GET `/tasks`**
- **Description**: List tasks with pagination, search, and sorting
- **Query Parameters**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `search` (string, optional)
  - `sortBy` (string, optional)
  - `sortOrder` ('ASC' | 'DESC', default: 'DESC')
- **Response**:
  ```json
  {
    "data": [...],
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
  ```

**GET `/tasks/:id`**
- **Description**: Get a single task by ID
- **Response**: Task object

**PATCH `/tasks/:id`**
- **Description**: Update an existing task (Owner, Admin only)
- **Request Body**: Partial task object
- **Response**: Updated task object

**DELETE `/tasks/:id`**
- **Description**: Delete a task (Owner only)
- **Response**: `{ "message": "Task deleted successfully" }`

**POST `/tasks/reorder`**
- **Description**: Reorder tasks (drag-and-drop) (Owner, Admin only)
- **Request Body**:
  ```json
  {
    "tasks": [
      { "id": "task-uuid-1", "position": 0 },
      { "id": "task-uuid-2", "position": 1 }
    ]
  }
  ```

#### **Audit Logs**

**GET `/audit-log`**
- **Description**: Get audit logs (Owner, Admin only)
- **Query Parameters**:
  - `page` (number)
  - `limit` (number)
  - `action` (string, optional)
  - `entityType` (string, optional)
- **Response**: Paginated audit log entries

---

## 🔮 Future Considerations

### Security Enhancements
- **JWT Refresh Tokens**: Implement refresh token rotation for better security
- **CSRF Protection**: Add CSRF tokens for state-changing operations
- **RBAC Caching**: Cache permission checks for improved performance
- **Rate Limiting**: Implement per-user/IP rate limiting
- **Input Sanitization**: Enhanced XSS protection

### Advanced Features
- **Role Delegation**: Allow users to temporarily delegate permissions
- **Granular Permissions**: Use Permission entity for fine-grained control
- **Organization Hierarchy**: Leverage parent/child org relationships for access control
- **Task Dependencies**: Add task dependency management
- **Notifications**: Real-time notifications for task assignments/updates

### Performance & Scaling
- **Database Indexing**: Add indexes on frequently queried fields
- **Query Optimization**: Optimize complex queries with proper joins
- **Caching Layer**: Implement Redis for session/permission caching
- **Database Migration**: Switch to PostgreSQL for production scalability
- **API Pagination**: Implement cursor-based pagination for large datasets

### Testing & Quality
- **E2E Tests**: Add end-to-end tests with Cypress/Playwright
- **Integration Tests**: Comprehensive API integration tests
- **Load Testing**: Performance testing under load
- **Code Coverage**: Increase test coverage to >80%

### Monitoring & Observability
- **Structured Logging**: Implement structured logging (Winston/Pino)
- **Error Tracking**: Integrate Sentry or similar
- **Metrics**: Add Prometheus metrics
- **Health Checks**: Implement health check endpoints

---

## 🧪 Testing

### Backend Tests
```bash
# Run all tests
npx nx test api

# Run specific test file
npx nx test api --testFile=tasks.service.spec.ts
```

### Frontend Tests
```bash
# Run all tests
npx nx test dashboard
```

---

## 📝 Environment Configuration

### Backend (.env)
See `apps/api/.env.sample` for all available environment variables.

**Required:**
- `JWT_SECRET`: Strong secret for JWT signing
- `PORT`: API server port (default: 3000)

**Optional:**
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: CORS origin
- `DB_TYPE`: Database type (sqlite/postgres)
- `LOG_LEVEL`: Logging level

---

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production database)

### Steps
1. Set `NODE_ENV=production`
2. Configure production database
3. Set strong `JWT_SECRET`
4. Build applications: `npx nx run-many -t build --configuration=production`
5. Run migrations
6. Start API server
7. Serve frontend (via nginx/CDN)

---

## 📄 License

MIT