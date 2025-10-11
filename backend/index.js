import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import donationRoutes from "./routes/donations.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/donations", donationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("✅ MA Equal Foundation API is running...");
});

// Test Razorpay configuration
app.get("/api/test-razorpay", (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  res.json({
    razorpay_configured: !!(keyId && keySecret),
    key_id_present: !!keyId,
    key_secret_present: !!keySecret,
    key_id: keyId ? `${keyId.substring(0, 10)}...` : 'Not set',
    message: (keyId && keySecret) ? 'Razorpay keys are configured' : 'Razorpay keys are missing'
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "MA Equal Foundation API is healthy",
    timestamp: new Date().toISOString()
  });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`💰 Donation API: http://localhost:${PORT}/api/donations`);
});