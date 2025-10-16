# MA Equal Foundation - Website Handover Documentation

## 🎯 Project Overview
**Website Type:** NGO Donation & Information Website  
**Technology:** React.js Frontend + Node.js Backend  
**Payment System:** Razorpay Live Integration  
**Database:** MongoDB Atlas (Cloud)  

## 💰 Live Payment System
- ✅ **Real Razorpay Integration** - Processes actual donations
- ✅ **Live Payment Keys** - Production ready
- ✅ **Automatic Receipts** - Email sent to donors
- ✅ **Admin Notifications** - Instant alerts for new donations

## 📊 Accessing Donation Data

### Method 1: MongoDB Atlas (Recommended)
1. **Login URL:** https://cloud.mongodb.com
2. **Account:** [CLIENT TO PROVIDE CREDENTIALS]
3. **Database:** Browse Collections → `donations`
4. **View All Data:** Complete donor information, payments, receipts

### Method 2: Razorpay Dashboard  
1. **Login URL:** https://dashboard.razorpay.com
2. **Account:** [CLIENT TO PROVIDE ACCESS]
3. **View:** All transactions, payment status, settlements

### Method 3: Email Notifications
- **Admin Email:** maequalfoundationtrust@gmail.com
- **Automatic Alerts:** Every donation sends notification with complete details

## 🔑 Important Account Information

### Razorpay Payment Gateway
- **Key ID:** rzp_live_RUDL6x3pV1q8NF
- **Account:** [CLIENT'S RAZORPAY ACCOUNT]
- **Settlement:** Auto-transfer to organization bank account

### MongoDB Database
- **Database Name:** [YOUR_DB_NAME]
- **Collections:** donations, causes, users
- **Backup:** Automatic daily backups by MongoDB Atlas

### Domain & Hosting
- **Current Status:** Ready for deployment
- **Recommended Host:** Netlify (Frontend) + Hostinger (Backend)
- **Domain:** [TO BE CONFIGURED BY CLIENT]

## 📧 Email System
- **Contact Forms:** Powered by Formspree
- **Donation Receipts:** Automatic via Gmail SMTP
- **Admin Notifications:** Instant alerts for new donations

## 🛠️ Website Management

### Adding New Content
- **Pages:** Home, About, Donate, Causes, Contact, Volunteer
- **Updates:** Contact developer for content changes
- **Images:** Can be updated in `/src/assets/` folder

### Viewing Donations
1. **Real-time:** Check email notifications
2. **Detailed:** Login to MongoDB Atlas dashboard  
3. **Payments:** Check Razorpay dashboard for transaction details

### Monthly Tasks
- ✅ Check MongoDB for donation records
- ✅ Verify Razorpay settlements
- ✅ Download donor data for accounting
- ✅ Update website content as needed

## 🚨 Critical Information

### Never Share Publicly
- ❌ Razorpay Key Secret
- ❌ MongoDB connection strings
- ❌ Email passwords
- ❌ Database credentials

### Emergency Contacts
- **Developer:** [YOUR CONTACT INFO]
- **Razorpay Support:** https://razorpay.com/support/
- **MongoDB Support:** https://support.mongodb.com/

## 📁 File Structure
```
ngo/
├── frontend/          # Website interface
├── backend/           # Server & payment processing
├── .env files         # Secure credentials (NEVER SHARE)
└── README files       # Technical documentation
```

## 🔄 Maintenance & Support
- **Updates:** Contact developer for feature additions
- **Security:** All sensitive data encrypted and secure
- **Backup:** Automatic daily database backups
- **Monitoring:** 24/7 uptime monitoring recommended

## 📞 Getting Help
1. **Technical Issues:** Contact developer
2. **Payment Issues:** Check Razorpay dashboard
3. **Email Issues:** Verify Gmail app password
4. **Database Issues:** Check MongoDB Atlas status

---
**Handover Date:** October 16, 2025  
**Developer:** [YOUR NAME & CONTACT]  
**Client:** MA Equal Foundation