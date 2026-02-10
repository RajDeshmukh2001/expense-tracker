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

### 3. Environment variables
Create a .env file in the root directory:
```env
PORT=3000
```

### 4. Start the server
```bash
node server.js
```
Server will run on: `http://localhost:3000`
