// createAdmin.js - UPDATED
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/marble';
    console.log('🔗 Connecting to MongoDB for admin setup...', mongoURI);
    
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB for admin setup');

    // Define User schema - EXPLICITLY SET COLLECTION NAME TO "user"
    const userSchema = new mongoose.Schema({
      userName: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: 'admin' },
      createdAt: { type: Date, default: Date.now }
    }, { collection: 'user' }); // ← THIS IS THE KEY CHANGE!

    // Get or create User model
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ userName: 'admin' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists in "user" collection');
      return;
    }

    // Create admin user
    const password = 'Admin@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      userName: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    
    console.log('✅ Admin user created successfully in "user" collection!');
    console.log('👤 Username: admin');
    console.log('🔑 Password: Admin@123');
    console.log('🎭 Role: admin');
    console.log('\n⚠️ IMPORTANT: Change this password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  }
}

module.exports = createAdminUser;