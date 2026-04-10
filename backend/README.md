# Voting System Backend

This is the backend API for the Voting System application, built with Node.js, Express, and MongoDB.

## Features

- User authentication (signup/login)
- Poll creation and management (admin only)
- Voting functionality
- JWT-based authorization
- MongoDB database integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xtupmaj.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

   **For Frontend:** Create a `.env` file in the `frontend/` directory:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. Seed the database with demo data:
   ```bash
   npm run seed
   ```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/seed-demo` - Seed demo data

### Polls
- `GET /api/polls` - Get all polls
- `GET /api/polls/:id` - Get specific poll
- `POST /api/polls` - Create new poll (admin only)
- `DELETE /api/polls/:id` - Delete poll (admin only)
- `POST /api/polls/vote` - Cast a vote

## Frontend Setup

To run the complete application, you also need to set up the frontend:

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

## Demo Credentials

After seeding the database, you can use these credentials:

- **Admin:** admin@votingsystem.com / admin123
- **Users:** john@votingsystem.com, jane@votingsystem.com, mike@votingsystem.com / user123

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Deployment

### Single Service Deployment (Recommended for Render)

1. **Build the frontend** before deploying:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the backend service** on Render with these settings:
   - **Service Type**: Web Service
   - **Build Command**: `npm install && cd ../frontend && npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
   - **Environment Variables**:
     ```
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_secure_jwt_secret
     NODE_ENV=production
     ```

3. **Frontend Environment**: The backend will automatically serve the built React app.

### Alternative: Separate Services

If deploying frontend and backend separately:

1. **Backend Service**:
   - Same settings as above, but remove the build command for frontend

2. **Frontend Service**:
   - **Service Type**: Static Site
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**:
     ```
     REACT_APP_API_BASE_URL=https://your-backend-service.onrender.com/api
     ```

### Environment Variables Summary

**Backend** (set in Render service environment):
- `MONGO_URI`: MongoDB Atlas connection string (for production)
- `JWT_SECRET`: Secure random string for JWT signing
- `NODE_ENV`: Set to `production`

**Frontend** (only needed for separate deployment):
- `REACT_APP_API_BASE_URL`: Full URL to deployed backend API

**Local Development**:
- Use `MONGO_URI=mongodb://localhost:27017/votingapp` for local MongoDB
- Use `REACT_APP_API_BASE_URL=http://localhost:5000/api` for local development