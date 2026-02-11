# Expense Tracker

## Problem Statement

Build a RESTful API for a Personal Expense Tracker that allows a user to record and manage their expenses.  
All data is stored in a database and exposed through clean, well-structured REST APIs.

The system supports recording expenses, viewing and filtering them, updating and deleting entries, and calculating total spending over a given date range.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Validation**: Zod

---

## Features

**1. Add Expense**
- Create a new expense entry
- Validates request data using Zod
- Persists expense data in the database

**3. Get Expense by ID**
- Retrieves the details of a specific expense using its unique identifier.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MySQL Server
- MySQL Workbench (optional but recommended)

### Setup

### 1. Clone the repository
```bash
git clone https://github.com/RajDeshmukh2001/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment configuration
Create a .env file at the project root:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
DB_PORT=3306
```

### 4. Create database
Create the database manually using MySQL Workbench or any MySQL client:
```sql
CREATE DATABASE expense_tracker;
```

### 5. Run database migrations
Return to the project root and run:
```bash
npx drizzle-kit generate
```
- Reads the schema defined in src/models/schema.js
- Generates migration files based on the schema for creating or updating tables
- Stores these files in the migrations folder

```bash
npx drizzle-kit push
```
- Applies the generated migrations to the database
- Creates or updates tables in MySQL based on the schema
- Brings the database in sync with the application schema

### 6. Seed initial data
```bash
npm run seed
```
This will:
- Insert a default user
- Insert predefined categories

### 7. Start the server
```bash
npx nodemon server.js
```
Expected output:
```bash
Server running on port: 3000
Database connected successfully
```

---

## How to Verify Locally
**Verify database connection**
- Server logs should confirm DB connection on startup
- If DB is unreachable, the server will not start

**Verify seeded data**
Run the following query manually using MySQL Workbench or any MySQL client:
```sql
SELECT * FROM users;
```
```sql
SELECT * FROM categories;
```
You should see:
- One default user
- Multiple predefined categories**

---

## API Endpoints

**1. Add Expense API**

Add a new expense 

#### Endpoint
```
POST /api/expenses
```
#### Request Body
```json
{
  "title": "Grocery Shopping",
  "description": "Weekly groceries",
  "amount": 1500.50,
  "category": "FOOD",
  "paymentMethod": "UPI",
  "transactionDate": "2024-06-15",
  "userId": 1
}
```
#### Success Response
```json
{
  "message": "Expense created successfully"
}
```
Status: 201 

**3. Get Expense by ID API**
#### Endpoint
```
GET /api/expenses/:id
```

#### Headers
| Key       | Required | Description                    |
|-----------|----------|--------------------------------|
| user-id   | Yes      | The ID of the requesting user  |

#### Success Response
```json
{
  "id": 1,
  "title": "Grocery Shopping",
  "description": "Weekly groceries",
  "amount": 1500.5,
  "paymentMethod": "UPI",
  "transactionDate": "2024-06-15",
  "categoryId": 2,
  "userId": 1
}
```

Status: 200 OK