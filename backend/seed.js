const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Poll = require('./models/Poll');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Poll.deleteMany({});

    console.log('Creating demo users...');
    
    // Create demo admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@votingsystem.com',
      password: adminPassword,
      role: 'admin'
    });

    console.log('✓ Admin user created:', adminUser.email);

    // Create demo regular users
    const userPassword = await bcrypt.hash('user123', 10);
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@votingsystem.com',
      password: userPassword,
      role: 'user'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@votingsystem.com',
      password: userPassword,
      role: 'user'
    });

    const user3 = await User.create({
      name: 'Mike Johnson',
      email: 'mike@votingsystem.com',
      password: userPassword,
      role: 'user'
    });

    console.log('✓ Demo users created');

    console.log('Creating demo polls...');

    // Demo poll 1: Programming Languages
    const poll1 = await Poll.create({
      question: 'Which is your favorite programming language?',
      options: [
        { text: 'JavaScript', votes: 8 },
        { text: 'Python', votes: 12 },
        { text: 'Java', votes: 6 },
        { text: 'C++', votes: 4 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 2: Best Frontend Framework
    const poll2 = await Poll.create({
      question: 'What is the best frontend framework?',
      options: [
        { text: 'React', votes: 25 },
        { text: 'Vue.js', votes: 10 },
        { text: 'Angular', votes: 8 },
        { text: 'Svelte', votes: 5 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 3: Work Environment
    const poll3 = await Poll.create({
      question: 'Where do you prefer to work?',
      options: [
        { text: 'Remote (Work from Home)', votes: 35 },
        { text: 'Office', votes: 12 },
        { text: 'Hybrid', votes: 28 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 4: Best Code Editor
    const poll4 = await Poll.create({
      question: 'Which code editor do you use most?',
      options: [
        { text: 'VS Code', votes: 42 },
        { text: 'Sublime Text', votes: 8 },
        { text: 'Vim', votes: 12 },
        { text: 'WebStorm', votes: 6 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 5: Database Preference
    const poll5 = await Poll.create({
      question: 'What is your preferred database?',
      options: [
        { text: 'MongoDB', votes: 18 },
        { text: 'PostgreSQL', votes: 22 },
        { text: 'MySQL', votes: 15 },
        { text: 'Firebase', votes: 9 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 6: Best Time to Code
    const poll6 = await Poll.create({
      question: 'When are you most productive?',
      options: [
        { text: 'Early Morning (5-8 AM)', votes: 9 },
        { text: 'Mid Morning (9-12 PM)', votes: 24 },
        { text: 'Afternoon (1-5 PM)', votes: 14 },
        { text: 'Evening (6-9 PM)', votes: 18 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 7: Most Important Skill
    const poll7 = await Poll.create({
      question: 'What is the most important skill for developers?',
      options: [
        { text: 'Problem Solving', votes: 35 },
        { text: 'Communication', votes: 18 },
        { text: 'Time Management', votes: 12 },
        { text: 'Learning Ability', votes: 28 }
      ],
      createdBy: adminUser._id
    });

    // Demo poll 8: Favorite Testing Framework
    const poll8 = await Poll.create({
      question: 'What is your favorite testing framework?',
      options: [
        { text: 'Jest', votes: 20 },
        { text: 'Mocha', votes: 8 },
        { text: 'Cypress', votes: 15 },
        { text: 'Playwright', votes: 12 }
      ],
      createdBy: adminUser._id
    });

    console.log('✓ 8 demo polls created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('ADMIN:');
    console.log('  Email: admin@votingsystem.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('DEMO USERS:');
    console.log('  Email: john@votingsystem.com');
    console.log('  Email: jane@votingsystem.com');
    console.log('  Email: mike@votingsystem.com');
    console.log('  Password (all): user123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
