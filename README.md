# Vehicle Rental System

## Project Overview
This project is a backend API for a vehicle rental management system. It allows managing vehicles, customers, and bookings with role-based authentication and authorization.

## Live Deployment
[Live URL to be added after deployment]

## Features
- **User Management**: Register, login, and manage customer accounts.
- **Vehicle Management**: Add, update, delete, and view vehicles (admin only for some operations).
- **Booking Management**: Create, view, cancel, and complete bookings.
- **Authentication & Authorization**: Role-based access control with JWT tokens.
- **Secure Passwords**: User passwords are hashed with bcrypt before storage.
- **Vehicle Availability**: Automatically updates vehicle status based on bookings.

## Technology Stack
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- bcryptjs
- jsonwebtoken

## Project Structure
```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point for local development
├── configs/               # Configuration files (DB, environment)
├── middlewares/           # Authentication and role-based middleware
├── modules/
│   ├── auth/              # Authentication module
│   ├── users/             # User module
│   ├── vehicles/          # Vehicle module
│   └── bookings/          # Booking module
└── types/                 # TypeScript type definitions
```

## Setup & Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd assignment2
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the root directory with the following variables:**
```
DATABASE_URL=<your-database-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

4. **Initialize the database:**
```bash
npm run db:init
```

5. **Start the development server:**
```bash
npm run dev
```

The server will start on `http://localhost:5000`.

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login and receive JWT token

### Users
- `GET /users` - Admin only: Retrieve all users
- `GET /users/:id` - Admin or self: Get user by ID
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Admin only: Delete user

### Vehicles
- `POST /vehicles` - Admin only: Add a new vehicle
- `GET /vehicles` - Public: View all vehicles
- `GET /vehicles/:id` - Public: View vehicle by ID
- `PUT /vehicles/:id` - Admin only: Update vehicle
- `DELETE /vehicles/:id` - Admin only: Delete vehicle

### Bookings
- `POST /bookings` - Customer or Admin: Create a booking
- `GET /bookings` - Role-based: Admin sees all, Customer sees own
- `GET /bookings/my-bookings` - Customer: Get own bookings
- `PUT /bookings/:id` - Update booking status (cancel/return)