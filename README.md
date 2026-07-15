📖 TourNest – Travel Booking Platform (Client)

A modern full-stack travel booking platform where users can explore tourist destinations, book tours, manage bookings, and admins can oversee the entire system.

🌐 Live URL

https://tour-nest-client-beta.vercel.app/

🔗 Server Repository

https://github.com/your-username/tour-nest-server

👤 Demo Credentials
Admin

Email: admin@tournest.com

Password: Admin@123

User

Email: user@tournest.com

Password: User@123

✨ Key Features
Email/Password Authentication
Google OAuth Login (Firebase)
JWT Authentication
Browse and search tourist packages
Package details page
Online tour booking
Booking management
User Dashboard
Admin Dashboard
Package CRUD Operations
Image upload using ImgBB
Responsive design (Mobile, Tablet & Desktop)
Dark & Light Mode
Framer Motion animations
Toast notifications
📄 Pages
Page	Route
Home	/
All Packages	/packages
Package Details	/packages/:id
About	/about
Login	/login
Register	/register
Dashboard	/dashboard
My Bookings	/dashboard/my-bookings
Add Package	/dashboard/add-package
Manage Packages	/dashboard/manage-packages
Manage Users	/dashboard/manage-users
Profile	/dashboard/profile
📦 NPM Packages Used
Package	Purpose
react	UI Library
vite	Development Build Tool
react-router-dom	Routing
axios	HTTP Requests
firebase	Authentication
react-hot-toast	Toast Notifications
react-icons	Icons
framer-motion	Animations
react-hook-form	Form Handling
swiper	Slider
tailwindcss	CSS Framework
daisyUI	UI Components
jwt-decode	JWT Decode
🔐 Environment Variables

Create a .env.local file in the project root.

VITE_API_URL=your_server_url

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_IMGBB_API_KEY=your_imgbb_api_key
🚀 Getting Started
# Install Dependencies
npm install

# Run Development Server
npm run dev

# Build for Production
npm run build

# Preview Build
npm run preview
