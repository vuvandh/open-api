# API ENDPOINTS STRUCTURE

# Health Check

GET /health-check

# Todo Management API

GET /api/v1/todo/todos
POST /api/v1/todo/todos
GET /api/v1/todo/todos/:id
PATCH /api/v1/todo/todos/:id
DELETE /api/v1/todo/todos/:id

GET /api/v1/todo/categories
POST /api/v1/todo/categories
GET /api/v1/todo/categories/:id
PATCH /api/v1/todo/categories/:id
DELETE /api/v1/todo/categories/:id

GET /api/v1/todo/priorities
POST /api/v1/todo/priorities

# PRISMA SCHEMA STRUCTURE

# Todo Models

model Todo { ... }
model Category { ... }  
model Priority { ... }
