# 🚀 NEXUS - Premium E-Commerce Platform

A modern, lightweight, and fully-featured e-commerce platform built with **React**, **Express.js**, and **MongoDB**. Designed for optimal performance, security, and user experience.

![NEXUS](https://img.shields.io/badge/NEXUS-Premium%20Fashion-000000?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-13AA52?style=flat-square&logo=mongodb)

---

## ✨ Key Features

### 🛍️ **Customer Features**
- **User Authentication** - Sign up, login, password reset with JWT tokens
- **Product Browsing** - Browse collections with filters (category, type, price)
- **Shopping Cart** - Add/remove items, manage quantities
- **Checkout** - Secure payment with **Stripe** & **Razorpay**
- **Order Management** - Track orders and view order history
- **Product Reviews** - Leave ratings & reviews (synced across devices)
- **AI Chat Support** - Real-time customer support with Groq AI
- **Search & Filter** - Find products easily with advanced filtering
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 👨‍💼 **Admin Features**
- **Dashboard** - Overview of sales, orders, and customers
- **Product Management** - Add, edit, delete products with images
- **Order Management** - View and update order status
- **Inventory Control** - Manage product inventory
- **Analytics** - Track sales and revenue metrics

### 🔒 **Security Features**
- **Input Sanitization** - XSS protection with DOMPurify
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **CORS Protection** - Properly configured CORS headers
- **Environment Variables** - Secure credential management

---

## 🛠️ Tech Stack

### **Frontend**
- React 18.2.0 - UI library
- Vite - Lightning-fast build tool
- Tailwind CSS - Utility-first styling
- React Router - Client-side routing
- Axios - HTTP client
- DOMPurify - Security
- React Toastify - Notifications

### **Backend**
- Node.js + Express.js - Server framework
- MongoDB with Mongoose - Database
- JWT - Authentication
- bcryptjs - Password hashing
- Multer - File uploads
- Nodemailer - Email sending
- Cloudinary - Image CDN
- Razorpay & Stripe - Payments
- Groq AI - Chatbot

---

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- **MongoDB** (Local or Atlas)
- **Git**

---

## 🚀 Installation & Setup

### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/nexus-ecommerce.git
cd nexus-ecommerce
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run server
```

### **3. Frontend Setup**
```bash
cd ../frontend
npm install
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
npm run dev
```

### **4. Admin Panel Setup**
```bash
cd ../admin
npm install
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
npm run dev
```

---

## 🔑 Environment Variables

### **Backend (.env)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-random-secret-key-here
ADMIN_EMAIL=admin@nexus.com
ADMIN_PASSWORD=AdminNexus123@
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_KEY=your-secret-key
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
STRIPE_SECRET_KEY=your-stripe-secret
GROQ_API_KEY=your-groq-api-key
```

### **Frontend & Admin (.env)**
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🏃 Running the Application

**Backend:**
```bash
cd backend && npm run server
```
Runs on: **http://localhost:4000**

**Frontend:**
```bash
cd frontend && npm run dev
```
Runs on: **http://localhost:5173**

**Admin Panel:**
```bash
cd admin && npm run dev
```
Runs on: **http://localhost:5174**

---

## 📁 Project Structure

```
nexus-ecommerce/
├── frontend/           # React customer website
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # ShopContext (state management)
│   │   └── utils/     # Utility functions
│   └── package.json
├── admin/             # Admin dashboard
│   └── src/
├── backend/           # Express API server
│   ├── models/        # MongoDB schemas
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   └── middleware/    # Auth & custom middleware
└── README.md
```

---

## 🌐 API Endpoints

### **Authentication**
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login
- `POST /api/user/forgot-password` - Password reset request
- `POST /api/user/reset-password` - Reset password

### **Products**
- `GET /api/product/list` - Get all products
- `POST /api/product/single` - Get single product
- `POST /api/product/add` - Add product (Admin)
- `POST /api/product/remove` - Delete product (Admin)

### **Shopping Cart**
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/get` - Get user's cart
- `POST /api/cart/update` - Update item quantity
- `POST /api/cart/delete` - Remove item from cart

### **Orders**
- `POST /api/order/stripe` - Initiate Stripe payment
- `POST /api/order/razorpay` - Initiate Razorpay payment
- `POST /api/order/verifyStripe` - Verify Stripe payment
- `POST /api/order/verifyRazorpay` - Verify Razorpay payment
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

### **Reviews**
- `POST /api/review/add` - Add/update product review
- `POST /api/review/get` - Get all reviews for product
- `POST /api/review/user-review` - Get user's review
- `POST /api/review/delete` - Delete user's review

### **AI Chat**
- `POST /api/chat` - Chat with AI assistant

---

## 🧪 Testing

### **Admin Login Credentials:**
```
Email: admin@nexus.com
Password: AdminNexus123@
```

### **Payment Gateway Test Cards**

#### **Stripe Test Cards:**
| Type | Card Number | Expiry | CVC |
|------|------------|--------|-----|
| Success | `4242 4242 4242 4242` | Any future date (MM/YY) | Any 3 digits |
| Decline | `4000 0000 0000 0002` | Any future date (MM/YY) | Any 3 digits |

#### **Razorpay Test Cards:**
| Type | Card Number | Expiry | CVV |
|------|------------|--------|-----|
| Success | `4100 2800 0000 1007` | 12/25 | 123 |

### **Test Payment Flow:**

1. **Place Order** with test details
2. **Select Payment Method** (Stripe or Razorpay)
3. **For Stripe:**
   - Use card: `4242 4242 4242 4242`
   - Fill any future expiry date
   - Fill any 3-digit CVC

4. **For Razorpay (Test Mode):**
   - Use card: `4100 2800 0000 1007`
   - Expiry: `12/25`
   - CVV: `123`
   - Mock bank will appear → Click "Success" button

### **Order Creation Flow:**
- ✅ Order is created **ONLY after successful payment verification**
- ✅ Pending orders **will NOT be created** if payment fails
- ✅ Cart is automatically cleared after successful payment
- ✅ User is redirected to `/orders` page

---

## ✅ Features Implemented

✅ User authentication (JWT)
✅ Product catalog with filters
✅ Shopping cart management
✅ Secure payments (Stripe + Razorpay)
✅ Order tracking
✅ Product reviews (synced across devices)
✅ AI chatbot support
✅ Admin dashboard
✅ Image CDN (Cloudinary)
✅ Input sanitization (XSS protection)
✅ 404 error page
✅ Responsive design (mobile-first)
✅ Production-ready code
✅ Comprehensive error handling
✅ Professional UI/UX

---

## 🔐 Security

✅ XSS protection with DOMPurify
✅ JWT authentication
✅ Password hashing (bcryptjs)
✅ CORS properly configured
✅ Environment variables for secrets
✅ Input validation & sanitization

---

## 📊 Performance

- **Bundle Size:** < 500KB (gzipped)
- **Load Time:** < 2 seconds
- **Lighthouse Score:** 90+
- **Database:** Indexed fields for fast queries
- **CDN:** Cloudinary for optimized images

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Recommendation engine
- [ ] Wishlist/favorites feature
- [ ] Multi-language support
- [ ] Social login integration

---

## 📞 Support & Contact

**Email:** contact@nexus.com
**Phone:** +91 7973208007
**Location:** Gurgaon, Haryana, India

---

## 📝 License

MIT License - Feel free to use this project

---

**Made with ❤️ for premium fashion shopping**

**Last Updated:** May 31, 2026 | **Status:** ✅ Production Ready
