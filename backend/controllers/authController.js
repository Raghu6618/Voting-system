const User = require('../models/User');
const Poll = require('../models/Poll');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.seedDemo = async (req, res) => {
  try {
    console.log('Starting demo seed process...');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists');
      return res.status(400).json({ error: 'Demo data already exists. Clear collections first or request an admin to delete them.' });
    }

    console.log('Creating admin user...');
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@votingsystem.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create demo polls
    const demoPolls = [
      {
        question: 'Which is your favorite programming language?',
        options: [
          { text: 'JavaScript', votes: 8 },
          { text: 'Python', votes: 12 },
          { text: 'Java', votes: 6 },
          { text: 'C++', votes: 4 }
        ]
      },
      {
        question: 'What is the best frontend framework?',
        options: [
          { text: 'React', votes: 25 },
          { text: 'Vue.js', votes: 10 },
          { text: 'Angular', votes: 8 },
          { text: 'Svelte', votes: 5 }
        ]
      },
      {
        question: 'Where do you prefer to work?',
        options: [
          { text: 'Remote (Work from Home)', votes: 35 },
          { text: 'Office', votes: 12 },
          { text: 'Hybrid', votes: 28 }
        ]
      },
      {
        question: 'Which code editor do you use most?',
        options: [
          { text: 'VS Code', votes: 42 },
          { text: 'Sublime Text', votes: 8 },
          { text: 'Vim', votes: 12 },
          { text: 'WebStorm', votes: 6 }
        ]
      },
      {
        question: 'What is your preferred database?',
        options: [
          { text: 'MongoDB', votes: 18 },
          { text: 'PostgreSQL', votes: 22 },
          { text: 'MySQL', votes: 15 },
          { text: 'Firebase', votes: 9 }
        ]
      },
      {
        question: 'When are you most productive?',
        options: [
          { text: 'Early Morning (5-8 AM)', votes: 9 },
          { text: 'Mid Morning (9-12 PM)', votes: 24 },
          { text: 'Afternoon (1-5 PM)', votes: 14 },
          { text: 'Evening (6-9 PM)', votes: 18 }
        ]
      },
      {
        question: 'What is the most important skill for developers?',
        options: [
          { text: 'Problem Solving', votes: 35 },
          { text: 'Communication', votes: 18 },
          { text: 'Time Management', votes: 12 },
          { text: 'Learning Ability', votes: 28 }
        ]
      },
      {
        question: 'What is your favorite testing framework?',
        options: [
          { text: 'Jest', votes: 20 },
          { text: 'Mocha', votes: 8 },
          { text: 'Cypress', votes: 15 },
          { text: 'Playwright', votes: 12 }
        ]
      }
    ];

    const pollsWithCreator = demoPolls.map(poll => ({
      ...poll,
      createdBy: adminUser._id
    }));

    console.log('Inserting polls...');
    await Poll.insertMany(pollsWithCreator);
    console.log('Demo seed completed successfully!');

    res.json({
      message: 'Demo data seeded successfully!',
      credentials: {
        admin: { email: 'admin@votingsystem.com', password: 'admin123' }
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(400).json({ 
      error: error.message || 'Unknown error occurred while seeding demo data',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};