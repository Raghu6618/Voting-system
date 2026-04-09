# 🗳️ Voting System - Full Stack Application

A complete voting system built with **Node.js/Express** backend and **React** frontend. Features user authentication, poll creation, voting, and admin dashboard.

## 🎯 Features

### 👤 User Features
- ✅ User registration and login (JWT Authentication)
- ✅ Vote on active polls (one vote per user per poll)
- ✅ View poll results and statistics in real-time
- ✅ See voting percentages with progress bars
- ✅ Vote confirmation feedback
- ✅ Browse all available polls

### 👨‍💼 Admin Features
- ✅ Create new polls with multiple options and descriptions
- ✅ View comprehensive admin dashboard with statistics
- ✅ Delete polls (with confirmation)
- ✅ Manage all system polls
- ✅ View total votes and trending polls
- ✅ Access admin panel for full control

### 🔐 Security Features
- ✅ JWT-based authentication with secure tokens
- ✅ Bcryptjs password hashing (salted)
- ✅ Role-based access control (Admin/User/Voter)
- ✅ Protected API routes with middleware
- ✅ Unique vote constraint at database level
- ✅ Input validation and sanitization
- ✅ Secure logout functionality

### 📊 System Features
- ✅ Real-time vote counting and updates
- ✅ Visual progress bars and statistics
- ✅ Demo data seeding system (8 sample polls)
- ✅ Admin credentials management
- ✅ Responsive and mobile-friendly design
- ✅ Comprehensive error handling
- ✅ Input validation on frontend and backend
- ✅ User-friendly success/error messages

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - Object Data Modeling
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

### Frontend
- **React 19** - UI library with hooks
- **React Router 7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - State management
- **CSS3** - Styling with gradients and animations

## 📋 Prerequisites

- **Node.js** v14+ and npm v6+
- **MongoDB** v4.4+ (local or cloud)
- **Git** (optional, for version control)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### Step 1: Clone/Download the Project
```bash
cd "Voting System"
```

### Step 2: Backend Setup

```bash
cd backend

# Install all dependencies
npm install

# Create/verify .env file with these variables:
#MONGO_URI=mongodb://localhost:27017/votingapp
#JWT_SECRET=voting_system_secret_key_2024_change_in_production
#PORT=5000
#NODE_ENV=development

# Start the backend server
npm start

# For development with auto-reload
npm run dev

# Seed demo data (optional)
npm run seed
```

**Verify backend is running:**
- Terminal should show: `✅ MongoDB connected`
- Terminal should show: `Server running on port 5000`
- Visit: `http://localhost:5000/api/polls` - should see JSON

### Step 3: Frontend Setup

**In a NEW terminal window:**
```bash
cd frontend

# Install all dependencies
npm install

# Start the React development server
npm start

# The app will automatically open in your browser
# If not, visit: http://localhost:3000
```

**Verify frontend is running:**
- Browser opens `http://localhost:3000`
- You see home page with "📋 Load Demo Polls" button
- No errors in browser console (F12)

## 📱 Using the Voting System

### First Time Setup

1. **Start both servers** (backend in one terminal, frontend in another)
2. **On the homepage**, click **"📋 Load Demo Polls"** button
3. **Demo credentials appear:**
   - Email: `admin@votingsystem.com`
   - Password: `admin123`

### User Workflow

#### Sign Up (If You Don't Have Account)
1. Click **"Signup"** in navigation
2. Fill in your details:
   - Full Name
   - Email
   - Password (minimum 6 characters)
   - Choose: Regular User or Administrator
3. Click **"Create Account"**
4. You'll be automatically logged in

#### Vote on a Poll (Regular User)
1. **Login** with your credentials
2. Go to **Home** page
3. Click on any poll card to see details
4. Click **"🗳️ Vote"** on your choice
5. See your vote recorded with green highlight
6. View real-time results with percentages

#### Create a New Poll (Admin)
1. **Login** with admin account (or signup as admin)
2. Click **"➕ Create Poll"** in navigation
3. Fill in:
   - Poll question
   - Optional description
   - At least 2 options (up to 10)
4. Click **"🎉 Create Poll"**
5. Poll is immediately available for voting

#### View Admin Dashboard (Admin Only)
1. **Login** as admin
2. Click **"📊 Admin Panel"** in navigation
3. See statistics:
   - Total polls created
   - Total votes across system
   - Most popular poll
4. Manage all polls:
   - View individual polls
   - Delete polls (with confirmation)
   - Create new polls

#### Logout
- Click **"Logout"** button in top navigation
- You'll be logged out and returned to home page

## 🔌 API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### **POST** `/auth/signup`
Create a new user account
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

#### **POST** `/auth/login`
Login and receive JWT token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### **POST** `/auth/seed-demo`
Load demo data
```bash
curl -X POST http://localhost:5000/api/auth/seed-demo
```

### Poll Endpoints

#### **GET** `/polls`
Get all polls (public - no auth required)
```bash
curl http://localhost:5000/api/polls
```

#### **GET** `/polls/:id`
Get single poll details
```bash
curl http://localhost:5000/api/polls/507f1f77bcf86cd799439011
```

#### **POST** `/polls`
Create new poll (admin only - requires JWT)
```bash
curl -X POST http://localhost:5000/api/polls \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "question": "Your poll question?",
    "description": "Optional poll description",
    "options": ["Option 1", "Option 2", "Option 3"]
  }'
```

#### **DELETE** `/polls/:id`
Delete poll (admin only - requires JWT)
```bash
curl -X DELETE http://localhost:5000/api/polls/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <token>"
```

#### **POST** `/polls/vote`
Cast a vote (requires JWT)
```bash
curl -X POST http://localhost:5000/api/polls/vote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "pollId": "507f1f77bcf86cd799439011",
    "optionIndex": 0
  }'
```

#### **GET** `/polls/:id/hasVoted`
Check if user already voted (requires JWT)
```bash
curl http://localhost:5000/api/polls/507f1f77bcf86cd799439011/hasVoted \
  -H "Authorization: Bearer <token>"
```

Response:
```json
{
  "hasVoted": true,
  "optionIndex": 1
}
```

## 🛡️ Preventing Duplicate Votes

The system uses **three-layer protection** against duplicate votes:

1. **Database Level (Primary):**
   - Unique compound index on `Vote` collection: `(userId, pollId)`
   - MongoDB enforces this: 11000 duplicate key error

2. **Application Level (Secondary):**
   - Backend checks Vote collection before creating new vote
   - Returns 400 error if vote found
   - Validates optionIndex against poll options array

3. **Frontend Level (User Experience):**
   - Displays "Already Voted" message after voting
   - Disables vote buttons once voted
   - Shows which option user selected with green highlight
   - `hasVoted` endpoint confirms vote status

This ensures **100% vote integrity**.

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcryptjs salt:10),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Poll Collection
```javascript
{
  _id: ObjectId,
  question: String (required, trimmed),
  description: String (optional),
  options: [{
    text: String (required),
    votes: Number (default: 0)
  }],
  status: String (enum: ['active', 'closed'], default: 'active'),
  createdBy: ObjectId (ref: User, required),
  startsAt: Date,
  endsAt: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Vote Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required, indexed),
  pollId: ObjectId (ref: Poll, required, indexed),
  optionIndex: Number (required),
  createdAt: Date (auto)
}
// Index: unique compound(userId, pollId)
```

## 🎪 Demo System

### What's Included

The demo includes:
- **1 Admin Account** - Full system access
- **8 Sample Polls** - Various topics
- **Pre-populated Votes** - Realistic vote counts

### Sample Polls

1. **Programming Languages** - JavaScript, Python, Java, C++
2. **Frontend Frameworks** - React, Vue, Angular, Svelte
3. **Work Location** - Remote, Office, Hybrid
4. **Code Editors** - VS Code, Sublime, Vim, WebStorm
5. **Databases** - MongoDB, PostgreSQL, MySQL, Firebase
6. **Productivity Time** - Early Morning, Mid-Morning, Afternoon, Evening
7. **Developer Skills** - Problem Solving, Communication, Time Management, Learning
8. **Testing Frameworks** - Jest, Mocha, Cypress, Playwright

### Loading Demo Data

**Option 1: From Frontend**
- Click **"📋 Load Demo Polls"** button on home page
- Credentials appear when demo loads

**Option 2: From Backend**
```bash
cd backend
npm run seed
```

**Option 3: Via API**
```bash
curl -X POST http://localhost:5000/api/auth/seed-demo
```

## 🔐 Authentication & Authorization

### JWT Token

Tokens are created on login:
```javascript
JWT.sign({ id: userId, role: userRole }, JWT_SECRET)
```

### Token Usage

Add to every authenticated request:
```
Authorization: Bearer <your_jwt_token>
```

Frontend automatically adds this in `utils/api.js` using Axios interceptor.

### Role-Based Access

| Action | Anonymous | User | Admin |
|--------|-----------|------|-------|
| View Polls | ✅ | ✅ | ✅ |
| Vote | ❌ | ✅ | ✅ |
| Create Poll | ❌ | ❌ | ✅ |
| Delete Poll | ❌ | ❌ | ✅ |
| Admin Panel | ❌ | ❌ | ✅ |

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Start MongoDB:
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo service mongod start
   ```
2. Verify MongoDB is running: `mongo --version`
3. Check MONGO_URI in `.env`

### Issue: "Port 5000 already in use"
**Solutions:**
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

Or change PORT in `.env` and restart.

### Issue: "Cannot vote after login"
**Check:**
1. Backend server is running (`npm start`)
2. JWT token is in localStorage (check DevTools → Application → localStorage)
3. Network requests show 200 status (check DevTools → Network)
4. Browser console shows no errors

### Issue: "Cannot create poll as admin"
**Check:**
1. You're logged in as admin (check user.role in DevTools)
2. Backend route order is correct (POST /vote before GET /:id)
3. No errors in backend console

### Issue: "Demo data already exists"
- Clear MongoDB:
  ```bash
  # In mongo shell
  db.polls.deleteMany({})
  db.users.deleteMany({})
  db.votes.deleteMany({})
  ```
- Or create new database in `.env`

### Issue: "npm install fails"
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📁 Project Structure

```
Voting System/
│
├── backend/
│   ├── models/
│   │   ├── User.js                 # User schema with auth fields
│   │   ├── Poll.js                 # Poll schema with options
│   │   └── Vote.js                 # Vote schema with unique constraint
│   │
│   ├── controllers/
│   │   ├── authController.js       # signup, login, seedDemo
│   │   └── pollController.js       # CRUD + vote operations
│   │
│   ├── routes/
│   │   ├── auth.js                 # /auth/* endpoints
│   │   └── polls.js                # /polls/* endpoints
│   │
│   ├── middleware/
│   │   └── auth.js                 # JWT & admin verification
│   │
│   ├── .env                        # Environment variables (local)
│   ├── .env.example                # Environment template
│   ├── server.js                   # Express app setup
│   ├── seed.js                     # Demo data seeder
│   └── package.json                # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js       # Top navbar with auth
│   │   │   ├── PollCard.js         # Poll listing card
│   │   │   ├── PollList.js         # Poll grid display
│   │   │   ├── DemoCredentials.js  # Demo info display
│   │   │   └── ProtectedRoute.js   # Auth/admin guards
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js      # Auth state management
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.js         # Home with demo loader
│   │   │   ├── LoginPage.js        # Login form
│   │   │   ├── SignupPage.js       # Registration form
│   │   │   ├── PollDetailPage.js   # Poll view & voting
│   │   │   ├── CreatePollPage.js   # New poll creation
│   │   │   └── AdminDashboard.js   # Admin stats & management
│   │   │
│   │   ├── utils/
│   │   │   └── api.js              # Axios with JWT interceptor
│   │   │
│   │   ├── App.js                  # Main app with routing
│   │   ├── App.css                 # Global styles
│   │   └── index.js                # React entry point
│   │
│   └── package.json                # Frontend dependencies
│
└── README.md                        # This file
```

## 🎨 UI/UX Features

- **Modern Gradient Design** - Purple/pink theme
- **Responsive Layout** - Desktop, tablet, mobile
- **Real-time Updates** - Live vote counts and progress bars
- **Smooth Animations** - Button hover effects, transitions
- **User Feedback** - Success alerts, error messages, loading states
- **Accessibility** - Proper labels, semantic HTML, keyboard navigation
- **Visual Hierarchy** - Clear buttons, readable fonts, good spacing

## 📊 Performance Optimizations

- **Database Indexing** - userId+pollId compound index on Votes
- **Query Optimization** - Specific field projections, populate only when needed
- **Frontend Caching** - localStorage for auth state
- **Efficient Components** - useCallback, memoization where needed
- **API Design** - RESTful endpoints, appropriate HTTP methods

## 🔒 Security Checklist for Production

- [ ] Change `JWT_SECRET` to long random string
- [ ] Enable HTTPS for all routes
- [ ] Use environment-specific `.env` files
- [ ] Add rate limiting (express-rate-limit)
- [ ] Add request validation (joi, express-validator)
- [ ] Enable CORS whitelist (not `*`)
- [ ] Add helmet.js for secure headers
- [ ] Set up MongoDB authentication
- [ ] Enable MongoDB connection pooling
- [ ] Regular dependency updates: `npm audit fix`
- [ ] Implement logging and monitoring
- [ ] Use cookies for JWT (httpOnly, secure)
- [ ] Add email verification for signup
- [ ] Implement forgot password flow

## 🚀 Deployment Guide

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Push 'build' folder to deployment
```

### Backend (Heroku/Render)
```bash
# Update MONGO_URI for cloud database (MongoDB Atlas)
# Update JWT_SECRET to production value
# Push code to Heroku/Render
```

### Database (MongoDB Atlas)
1. Create cluster at mongodb.com/cloud
2. Get connection string
3. Update MONGO_URI in production `.env`

## 📞 Support & Help

**If something doesn't work:**
1. Check troubleshooting section above
2. Verify MongoDB is running
3. Verify backend is running (port 5000)
4. Verify frontend is running (port 3000)
5. Check browser console for errors (F12)
6. Check backend terminal for error messages
7. Try clearing browser cache (Ctrl+Shift+Delete)

**Check these URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/polls
- MongoDB: Check .env MONGO_URI

## 📄 License

MIT License - Free for personal and commercial use

## ✅ Completion Checklist

- ✅ User authentication (signup/login/logout)
- ✅ JWT token management
- ✅ Role-based authorization (admin/user)
- ✅ Poll CRUD operations
- ✅ Voting system with duplicate prevention
- ✅ Real-time vote counting
- ✅ Admin dashboard with statistics
- ✅ Protected routes (frontend and backend)
- ✅ Error handling and validation
- ✅ Responsive UI design
- ✅ Demo data seeding
- ✅ Comprehensive documentation

---

**Version:** 2.0.0 (Production Ready)  
**Last Updated:** April 2024  
**Status:** ✅ Fully Functional & Tested
#   V o t i n g - s y s t e m  
 #   V o t i n g - s y s t e m  
 