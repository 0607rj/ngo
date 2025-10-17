# Rate Limiting Implementation Guide

## 📊 Current Rate Limits

### General API Protection
- **Limit**: 100 requests per 15 minutes per IP
- **Purpose**: Prevent general API abuse and DDoS
- **Applied to**: All endpoints

### Donation Security
- **Limit**: 3 attempts per 5 minutes per IP
- **Purpose**: Prevent payment fraud and abuse
- **Applied to**: `/api/donations/*`
- **Special**: Successful requests don't count toward limit

### Contact Form Protection
- **Limit**: 5 submissions per 10 minutes per IP
- **Purpose**: Prevent spam and abuse
- **Applied to**: `/api/contact/*`

## 🛡️ How Rate Limiting Protects Your NGO

### 1. **Payment Security**
```
✅ Prevents automated donation fraud
✅ Stops repeated failed payment attempts
✅ Protects Razorpay integration from abuse
✅ Reduces payment processing costs
```

### 2. **Spam Prevention**
```
✅ Blocks automated contact form spam
✅ Prevents email inbox flooding
✅ Maintains server performance
✅ Improves user experience
```

### 3. **Server Protection**
```
✅ Prevents DDoS attacks
✅ Reduces server load
✅ Maintains website uptime
✅ Protects database resources
```

## 🔍 Monitoring & Logging

### Security Logs
- All donation attempts logged with IP
- Suspicious user agents detected
- Slow requests monitored (>5 seconds)
- Error responses tracked

### Rate Limit Violations
- IP addresses flagged after violations
- Automatic cleanup of suspicious IPs every hour
- Detailed error messages for legitimate users

## 📈 Rate Limit Response Format

When a user exceeds rate limits, they receive:

```json
{
  "success": false,
  "error": "Too many donation attempts detected. This is for security purposes.",
  "retryAfter": "5 minutes",
  "timestamp": "2025-10-17T10:30:00.000Z",
  "endpoint": "/api/donations/create-order"
}
```

## 🔧 Configuration Options

### Environment Variables
```env
# Rate limiting is configured in code
# No additional environment variables needed
```

### Adjusting Limits (in rateLimiting.js)
```javascript
// To increase donation attempts (if needed)
max: 5, // Change from 3 to 5

// To adjust time window
windowMs: 10 * 60 * 1000, // Change from 5 to 10 minutes
```

## 📋 Testing Rate Limits

### Test Donation Limits
1. Make 3 donation attempts within 5 minutes
2. 4th attempt should be blocked
3. Wait 5 minutes and try again

### Test Contact Limits
1. Submit 5 contact forms within 10 minutes
2. 6th submission should be blocked
3. Wait 10 minutes and try again

### Test General API Limits
1. Make 100+ API requests within 15 minutes
2. Additional requests should be blocked

## 🚨 When Rate Limits Trigger

### Legitimate Users
- Clear error message explaining the wait time
- Suggestions to try again later
- Contact information if urgent

### Malicious Users
- Requests blocked silently after repeated violations
- IP flagged for monitoring
- Security logs generated

## 🔄 Bypass Prevention

### Headers Monitored
- `x-forwarded-for`
- `x-real-ip`
- `x-cluster-client-ip`
- Proxy indicators

### Detection Methods
- IP address validation
- User agent analysis
- Request pattern analysis
- Suspicious behavior flagging

## 📞 Support Information

### For Users Experiencing Issues
```
If you're experiencing rate limit issues:
1. Wait for the specified time period
2. Ensure you're not making rapid repeated requests
3. Contact support if the issue persists

Contact: support@maequalfoundation.org
```

### For Administrators
- Monitor logs for patterns
- Adjust limits based on legitimate usage
- Whitelist trusted IPs if needed (requires code changes)

## 🔄 Render Deployment Notes

### Automatic Rate Limiting
- Rate limits are in-memory (resets on server restart)
- Render's free tier restarts servers, which clears limits
- Consider Redis for persistent rate limiting in production

### Scaling Considerations
- Current setup handles single server instances
- For multiple instances, use shared Redis store
- Monitor Render logs for rate limit violations

## 🎯 Best Practices Applied

1. **Different limits for different endpoints**
2. **Clear error messages for users**
3. **Security monitoring and logging**
4. **Bypass attempt detection**
5. **Automatic cleanup of flagged IPs**
6. **Skip limits for successful operations**
7. **Comprehensive request monitoring**

This rate limiting setup provides enterprise-level protection for your NGO website while maintaining good user experience for legitimate visitors.