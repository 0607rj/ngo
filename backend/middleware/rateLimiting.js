import rateLimit from "express-rate-limit";

// Store for tracking suspicious IPs
const suspiciousIPs = new Set();

// Enhanced rate limiter with proper IPv6 support
export const createAdvancedLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000,
    max: options.max || 100,
    message: options.message || {
      error: "Too many requests",
      retryAfter: "Please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    
    // Custom handler when rate limit is exceeded
    handler: (req, res) => {
      const ip = req.ip || req.connection.remoteAddress;
      
      // Mark IP as suspicious after multiple violations
      suspiciousIPs.add(ip);
      
      // Log the violation
      console.warn(`🚫 Rate limit exceeded for IP: ${ip} on ${req.path}`);
      
      // Send structured error response
      res.status(429).json({
        success: false,
        error: options.message?.error || "Too many requests",
        retryAfter: options.message?.retryAfter || "Please try again later",
        timestamp: new Date().toISOString(),
        endpoint: req.path
      });
    },
    
    // Skip rate limiting for certain conditions
    skip: (req) => {
      // Skip rate limiting for health check endpoints
      if (req.path === "/" || req.path === "/health") {
        return true;
      }
      
      // Skip for successful GET requests (reading data) if specified
      if (req.method === "GET" && options.skipSuccessfulRequests) {
        return true;
      }
      
      return false;
    }
  });
};

// Donation-specific rate limiter for ORDER CREATION ONLY
// Applied only to /create-order endpoint, NOT to verification
// This prevents spam while allowing proper payment verification
export const donationSecurityLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 order creation attempts per 5 minutes
  message: {
    success: false,
    error: "Too many donation attempts detected. This is for security purposes.",
    retryAfter: "5 minutes"
  },
  skipSuccessfulRequests: true, // Don't count successful payments
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.warn(`🚫 Donation rate limit exceeded for IP: ${ip}`);
    
    res.status(429).json({
      success: false,
      error: "Too many donation attempts detected. This is for security purposes.",
      retryAfter: "5 minutes",
      timestamp: new Date().toISOString()
    });
  }
});

// Contact forms now use Formspree - no backend rate limiting needed
// Removed contactSpamLimiter as it's no longer used

// General API protection
export const generalAPILimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    success: false,
    error: "Too many requests from this IP address.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.warn(`🚫 General rate limit exceeded for IP: ${ip} on ${req.path}`);
    
    res.status(429).json({
      success: false,
      error: "Too many requests from this IP address.",
      retryAfter: "15 minutes",
      timestamp: new Date().toISOString(),
      endpoint: req.path
    });
  }
});

// Clean up suspicious IPs periodically (every hour)
setInterval(() => {
  suspiciousIPs.clear();
  console.log("🧹 Cleared suspicious IPs cache");
}, 60 * 60 * 1000);