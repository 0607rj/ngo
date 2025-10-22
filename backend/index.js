import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import donationRoutes from "./routes/donations.js";
import { 
  generalAPILimiter, 
  donationSecurityLimiter 
} from "./middleware/rateLimiting.js";
import { securityMiddleware } from "./middleware/security.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Apply security monitoring
app.use(securityMiddleware);

// Apply general rate limiting to all requests
app.use(generalAPILimiter);

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "https://ma-equal-foundadtion.netlify.app",
    "https://maequalfoundation.netlify.app",
    "https://maequalfoundation.com",
    "https://www.maequalfoundation.com",
    "http://maequalfoundation.com",
    "http://www.maequalfoundation.com",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Routes - Contact forms use Formspree, only donations need backend
// IMPORTANT: Apply rate limiting only to donation creation, not verification
app.use("/api/donations/create-order", donationSecurityLimiter);  // Limit payment attempts
app.use("/api/donations", donationRoutes);  // Allow unrestricted verification

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