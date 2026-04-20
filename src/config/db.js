const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Database Connection Error: ${error.message}`);
    console.warn('Running in UI-only mode (without database).');
  }
};

module.exports = connectDB;