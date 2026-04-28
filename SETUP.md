# K#2News - Frontend Setup

## Project Overview
K#2News is a role-based news management platform built with Svelte and Routify, featuring different user roles with distinct capabilities.

## Tech Stack
- **Framework**: Svelte 5.55.5
- **Build Tool**: Vite 8.0.10
- **Routing**: Routify 2.0.1 with hash-based navigation
- **Runtime**: Bun

## Roles & Features

### 👤 Guest
- View news articles
- Access login page

### 👨‍💼 Worker
- Create and submit news posts
- View personal post submissions
- Track post approval status (pending/approved/rejected)
- Edit and delete personal posts

### 🛡️ Admin
- Monitor all worker submissions
- Approve or reject posts
- Delete posts
- View moderation statistics

### 👑 Super Admin
- Full platform control
- View dashboard with analytics
- Content management (feature/delete posts)
- User management (activate/deactivate users)
- View all statistics and analytics

## Getting Started

### Installation
```bash
bun install
```

### Development
```bash
bun run dev
```
The app will be available at **http://localhost:3001**

### Build
```bash
bun run build
```

## Demo Credentials
The login page accepts any email and password combination. Select your desired role:
- **Worker**: Creates and submits posts for approval
- **Admin**: Reviews and approves/rejects posts
- **Super Admin**: Full platform management

## Project Structure
```
src/
├── main.ts           # Entry point
├── App.svelte        # Main app with routing
├── pages/
│   ├── index.svelte  # Home page
│   ├── login.svelte  # Login page
│   ├── news.svelte   # News feed
│   ├── worker.svelte # Worker dashboard
│   ├── admin.svelte  # Admin dashboard
│   └── superadmin.svelte # Super admin dashboard
├── components/       # Reusable components (to be added)
└── lib/
    └── router.js     # Routing utilities
```

## Features Implemented

### News Display
- News feed with category filtering
- Article cards with images and metadata
- Read more links (frontend ready for detail pages)

### Worker Dashboard
- Create new posts with title, category, content, and images
- Submit posts for approval
- View all personal posts with status
- Edit and delete functionality

### Admin Dashboard
- Statistics dashboard (total, pending, approved, rejected)
- Filter posts by status
- Approve/reject pending posts
- Delete any posts

### Super Admin Dashboard
- Full analytics and statistics
- Content management with featured post toggle
- User management with activate/deactivate
- Multiple tabs for different management areas

## Navigation
Hash-based routing using window.location.hash:
- `#/` - Home
- `#/login` - Login
- `#/news` - News feed
- `#/worker` - Worker dashboard
- `#/admin` - Admin dashboard
- `#/superadmin` - Super admin dashboard

## Local Storage
- User session stored in `localStorage.currentUser`
- Worker posts stored in `localStorage.workerPosts`
- Users data stored in `localStorage.users`

## Next Steps
- Connect to backend API
- Add authentication/authorization
- Implement actual image uploads
- Add search and filtering
- Add notifications
- Mobile optimization
