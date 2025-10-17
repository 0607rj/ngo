// Security monitoring middleware
export const securityMonitor = (req, res, next) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent');
  const method = req.method;
  const path = req.path;
  
  // Log all requests to sensitive endpoints
  const sensitiveEndpoints = ['/api/donations', '/api/contact'];
  const isSensitive = sensitiveEndpoints.some(endpoint => path.startsWith(endpoint));
  
  if (isSensitive) {
    console.log(`🔒 Security Monitor - ${method} ${path} from ${clientIP}`);
    console.log(`   User-Agent: ${userAgent}`);
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /hack/i,
      /attack/i
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(userAgent) || pattern.test(path)
    );
    
    if (isSuspicious) {
      console.warn(`⚠️  SUSPICIOUS REQUEST DETECTED from ${clientIP}`);
      console.warn(`   Path: ${path}`);
      console.warn(`   User-Agent: ${userAgent}`);
    }
  }
  
  // Add response time logging
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    if (isSensitive) {
      console.log(`✅ ${method} ${path} - ${statusCode} (${duration}ms)`);
      
      // Log slow requests
      if (duration > 5000) {
        console.warn(`🐌 SLOW REQUEST: ${method} ${path} took ${duration}ms`);
      }
      
      // Log error responses
      if (statusCode >= 400) {
        console.warn(`❌ ERROR RESPONSE: ${method} ${path} - ${statusCode}`);
      }
    }
  });
  
  next();
};

// Rate limit bypass detection
export const detectRateLimitBypass = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const headers = req.headers;
  
  // Check for common bypass attempts
  const bypassHeaders = [
    'x-forwarded-for',
    'x-real-ip',
    'x-cluster-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ];
  
  let potentialBypass = false;
  bypassHeaders.forEach(header => {
    if (headers[header] && headers[header] !== clientIP) {
      console.warn(`🚨 POTENTIAL RATE LIMIT BYPASS ATTEMPT:`);
      console.warn(`   Real IP: ${clientIP}`);
      console.warn(`   Header ${header}: ${headers[header]}`);
      potentialBypass = true;
    }
  });
  
  // Check for proxy/VPN indicators
  const proxyIndicators = [
    'via',
    'x-forwarded-proto',
    'x-forwarded-host'
  ];
  
  proxyIndicators.forEach(header => {
    if (headers[header]) {
      console.log(`🔍 Proxy detected via ${header}: ${headers[header]}`);
    }
  });
  
  if (potentialBypass) {
    // You could implement additional security measures here
    // For now, we'll just log and continue
  }
  
  next();
};

// Request size monitoring
export const requestSizeMonitor = (req, res, next) => {
  const contentLength = req.get('Content-Length');
  
  if (contentLength) {
    const sizeInMB = parseInt(contentLength) / (1024 * 1024);
    
    if (sizeInMB > 10) { // Log requests larger than 10MB
      const clientIP = req.ip || req.connection.remoteAddress;
      console.warn(`📦 LARGE REQUEST: ${sizeInMB.toFixed(2)}MB from ${clientIP} to ${req.path}`);
    }
  }
  
  next();
};

// Export combined security middleware
export const securityMiddleware = [
  securityMonitor,
  detectRateLimitBypass,
  requestSizeMonitor
];