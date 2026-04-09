# 🎪 Demo Voting System Guide

Welcome to the Voting System demo! This guide will help you get started quickly with pre-populated sample data.

## 📋 Table of Contents
1. [Loading Demo Data](#loading-demo-data)
2. [Demo Credentials](#demo-credentials)
3. [Sample Polls](#sample-polls)
4. [Try It Out](#try-it-out)

---

## 🚀 Loading Demo Data

### Method 1: Using the Frontend (Easiest)
1. Start both backend and frontend servers
2. Navigate to http://localhost:3000
3. Click the **"📋 Load Demo Polls"** button on the home page
4. Wait for confirmation message
5. Refresh the page to see demo polls

### Method 2: Using npm Command
1. Open terminal in the `backend` directory
2. Run: `npm run seed`
3. Wait for completion message
4. Restart backend if needed
5. Refresh frontend

### What Gets Created
- ✅ 1 Admin user account
- ✅ 8 sample polls with pre-populated votes
- ✅ Each poll has 3-4 options with vote counts

---

## 🔐 Demo Credentials

### Admin User
Use this account to create and delete polls.

```
Email:    admin@votingsystem.com
Password: admin123
Role:     Admin
```

#### Admin Permissions:
- ✓ View all polls
- ✓ Vote on polls
- ✓ Create new polls
- ✓ Delete polls
- ✓ See poll management menu

### Regular Users
Use any of these accounts to vote on polls.

```
Email:    john@votingsystem.com
Email:    jane@votingsystem.com
Email:    mike@votingsystem.com
Password: user123 (same for all)
Role:     User
```

#### User Permissions:
- ✓ View all polls
- ✓ Vote on polls (once per poll)
- ✓ See voting results
- ✗ Cannot create polls
- ✗ Cannot delete polls

---

## 📊 Sample Polls

### Poll 1: Programming Languages
**Question:** Which is your favorite programming language?

| Option | Votes |
|--------|-------|
| JavaScript | 8 |
| Python | 12 |
| Java | 6 |
| C++ | 4 |
| **Total** | **30** |

---

### Poll 2: Frontend Frameworks
**Question:** What is the best frontend framework?

| Option | Votes |
|--------|-------|
| React | 25 |
| Vue.js | 10 |
| Angular | 8 |
| Svelte | 5 |
| **Total** | **48** |

---

### Poll 3: Work Environment
**Question:** Where do you prefer to work?

| Option | Votes |
|--------|-------|
| Remote (Work from Home) | 35 |
| Office | 12 |
| Hybrid | 28 |
| **Total** | **75** |

---

### Poll 4: Code Editors
**Question:** Which code editor do you use most?

| Option | Votes |
|--------|-------|
| VS Code | 42 |
| Sublime Text | 8 |
| Vim | 12 |
| WebStorm | 6 |
| **Total** | **68** |

---

### Poll 5: Database Preferences
**Question:** What is your preferred database?

| Option | Votes |
|--------|-------|
| MongoDB | 18 |
| PostgreSQL | 22 |
| MySQL | 15 |
| Firebase | 9 |
| **Total** | **64** |

---

### Poll 6: Productivity Timing
**Question:** When are you most productive?

| Option | Votes |
|--------|-------|
| Early Morning (5-8 AM) | 9 |
| Mid Morning (9-12 PM) | 24 |
| Afternoon (1-5 PM) | 14 |
| Evening (6-9 PM) | 18 |
| **Total** | **65** |

---

### Poll 7: Most Important Skills
**Question:** What is the most important skill for developers?

| Option | Votes |
|--------|-------|
| Problem Solving | 35 |
| Communication | 18 |
| Time Management | 12 |
| Learning Ability | 28 |
| **Total** | **93** |

---

### Poll 8: Testing Frameworks
**Question:** What is your favorite testing framework?

| Option | Votes |
|--------|-------|
| Jest | 20 |
| Mocha | 8 |
| Cypress | 15 |
| Playwright | 12 |
| **Total** | **55** |

---

## 🎯 Try It Out

### Step-by-Step Demo

#### 1. Load the Demo
- Navigate to home page
- Click **"📋 Load Demo Polls"** button
- See success message with credentials

#### 2. Login as Admin
- Click **Login** in navigation
- Use `admin@votingsystem.com` / `admin123`
- You'll see **Create Poll** option in navigation

#### 3. Explore Existing Polls
- See all 8 sample polls on home page
- Click on any poll to view details
- Check vote counts and percentages

#### 4. Vote on a Poll
- Click on any poll
- Select an option
- Click **Vote** button
- See button change to **"✓ Your Vote"** with animation
- Watch the progress bar and vote count update

#### 5. View Poll Results
- After voting, see which option you selected (highlighted in green)
- View vote percentages for all options
- See total votes and leading option

#### 6. Try Another User
- Logout (click **Logout** button)
- Login as different user `john@votingsystem.com` / `user123`
- Vote on the same poll from different perspective
- See votes increase

#### 7. Create a New Poll (Admin Only)
- Logout and login as admin
- Click **Create Poll** in navigation
- Enter poll question (e.g., "What's your favorite IDE?")
- Add options (at least 2 required)
- Click **Create Poll**
- Poll appears on home page

#### 8. Delete a Poll (Admin Only)
- Go to any poll detail page
- If you're admin, see **Delete Poll** button
- Click to delete poll
- Confirm deletion
- Redirected to home page

---

## 💡 Features to Explore

### 1. Real-time Vote Updates
- Open the same poll in two browser windows
- Vote in one window
- Refresh the other to see updated results

### 2. Vote Persistence
- Vote on a poll
- Navigate away and come back
- Your vote is remembered (button shows "Voted")

### 3. Vote Percentages
- Each option shows vote percentage
- Percentages update as more votes are cast
- Progress bars visualize vote distribution

### 4. Poll Cards
- Poll cards on home page show:
  - Poll question
  - Creator name
  - Vote status badge (if you've voted)
  - Link to vote or view results

### 5. User Authentication
- Logout and login to test session management
- Different users can vote independently
- Each user can vote once per poll

---

## 🔄 Resetting Demo Data

To start fresh with new demo data:

### Option 1: Using npm
```bash
cd backend
npm run seed
```
This will clear existing demo data and create fresh sample polls.

### Option 2: Manual Reset
1. Delete the MongoDB database: `use votingapp` then `db.dropDatabase()`
2. Run `npm run seed` again
3. Or just clear collections manually in MongoDB

---

## ✅ Checklist - Things to Try

- [ ] Load demo data
- [ ] Login as admin
- [ ] Login as regular user
- [ ] Vote on a poll
- [ ] See vote update live
- [ ] Check vote percentages
- [ ] Create new poll (admin only)
- [ ] Delete a poll (admin only)
- [ ] Logout and login as different user
- [ ] Verify you can't vote twice on same poll
- [ ] Check that votes persist across sessions
- [ ] Test on mobile (responsive design)

---

## 🔗 Quick Links

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Signup:** http://localhost:3000/signup
- **Backend API:** http://localhost:5000/api

---

## 📝 Notes

- Demo data is just sample data - feel free to modify it
- All votes shown are fictional and just for demonstration
- You can create unlimited new polls after loading demo data
- The system supports any number of polls and votes
- Real-time features require both frontend and backend running

---

## 🚀 Next Steps

After exploring the demo:
1. Create your own polls
2. Invite others to vote
3. Analyze voting patterns
4. Customize the system for your needs
5. Deploy to production (see main README.md)

Enjoy your voting experience! 🗳️
