# MA EQUAL FOUNDATION - DEPLOYMENT GUIDE
# =====================================================

## 🚀 HOSTINGER DEPLOYMENT CHECKLIST

### 📋 PRE-DEPLOYMENT PREPARATION

#### 1. **Razorpay Account Setup**
- [ ] Create Razorpay account at https://razorpay.com
- [ ] Complete KYC verification
- [ ] Get Test Keys for development
- [ ] Get Live Keys for production (after KYC approval)
- [ ] Note down both Key ID and Key Secret

#### 2. **Gmail App Password Setup**
- [ ] Enable 2-Step Verification on maequalfoundationtrust@gmail.com
- [ ] Generate App Password for Mail application
- [ ] Note down the 16-character app password
- [ ] Test email sending locally

#### 3. **MongoDB Atlas Configuration**
- [ ] Current connection string is working
- [ ] Add Hostinger server IP addresses to whitelist
- [ ] Test database connection

### 🖥️ BACKEND DEPLOYMENT (Node.js App)

#### 1. **Hostinger Setup**
```bash
# Upload all backend files to Hostinger Node.js app directory
# Files to upload: controllers/, models/, routes/, config/, package.json, index.js

# Install dependencies on Hostinger
npm install
```

#### 2. **Environment Variables (Update .env file)**
```env
# Change these values:
PORT=3000                              # Hostinger typically uses 3000
NODE_ENV=production                    # Change to production
FRONTEND_URL=https://yourdomain.com    # Your live frontend URL
RAZORPAY_KEY_ID=rzp_live_xxxxx        # Live Razorpay Key ID
RAZORPAY_KEY_SECRET=xxxxxxxx          # Live Razorpay Secret
EMAIL_PASS=your_app_password          # Gmail App Password
```

#### 3. **Hostinger Configuration**
- [ ] Set Node.js version to 18+
- [ ] Set startup file to `index.js`
- [ ] Configure environment variables in Hostinger panel
- [ ] Test API endpoints: https://your-backend-url.com/api/health

### 🌐 FRONTEND DEPLOYMENT (React App)

#### 1. **Build React App**
```bash
cd frontend
npm run build
```

#### 2. **Update Environment Variables**
```env
# In frontend/.env, change:
REACT_APP_BACKEND_URL=https://your-backend-url.com
REACT_APP_RAZORPAY_KEY_ID=rzp_live_xxxxx  # Live Razorpay Key ID
```

#### 3. **Upload to Hostinger**
```bash
# Upload contents of 'dist' or 'build' folder to public_html
# Make sure index.html is in the root of public_html
```

### 🔧 TESTING CHECKLIST

#### After Deployment:
- [ ] Test contact form submission
- [ ] Test donation flow with small amount
- [ ] Verify email notifications (donor & admin)
- [ ] Check payment verification
- [ ] Test mobile responsiveness
- [ ] Verify WhatsApp links work
- [ ] Test social media links

### 🚨 IMPORTANT SECURITY NOTES

#### 1. **Environment Variables**
- Never commit .env files to GitHub
- Use Hostinger's environment variable panel for production
- Keep test and live Razorpay keys separate

#### 2. **MongoDB Security**
- Whitelist only necessary IP addresses
- Use strong database passwords
- Regular backup of database

#### 3. **Email Security**
- Use App Password, not regular Gmail password
- Monitor email usage for suspicious activity

### 📱 CONTACT INFORMATION UPDATE

Make sure these are updated everywhere:
- **Phone**: +91 7906891253, +91 7455908415
- **Email**: maequalfoundationtrust@gmail.com
- **Address**: Chandausi road, Saif khan Sarai, Sambhal, 244302 UP
- **WhatsApp**: +91 7906891253
- **Facebook**: https://www.facebook.com/share/1BU4hsSJpF/
- **Instagram**: https://www.instagram.com/maequalfoundation?igsh=b2hmaTBzYnJqeWR3

### 🔗 USEFUL URLS

- **Hostinger Control Panel**: https://hpanel.hostinger.com
- **Razorpay Dashboard**: https://dashboard.razorpay.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Google Account Settings**: https://myaccount.google.com

### 📞 SUPPORT CONTACTS

If you face issues:
1. Check Hostinger documentation
2. Contact Hostinger support
3. Check MongoDB Atlas status
4. Verify Razorpay configuration

---
**Note**: Keep this file updated as you make changes during deployment.