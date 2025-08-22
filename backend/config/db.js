// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set in .env");
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// Import mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Check if the MongoDB URI is provided in environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in .env");
    }

    // Establish connection to MongoDB using mongoose
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Ensures compatibility with the new MongoDB connection string format
      useUnifiedTopology: true, // Uses the new Server Discovery and Monitoring engine
    });

    // Log success message with the connected host
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    // Log error message if connection fails
    console.error("❌ MongoDB connection error:", err.message);

    // Exit the process with failure code (1) if connection fails
    process.exit(1);
  }
};

// Export the function so it can be used in other files
module.exports = connectDB;
