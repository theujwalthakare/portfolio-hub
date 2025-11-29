# Admin Access Control Setup

## Overview
Admin access controls have been implemented with the following features:

- **Role-based access**: Users can have STUDENT, FACULTY, or ADMIN roles
- **Protected admin routes**: `/admin` page requires ADMIN role
- **Admin panel**: Full user management and system overview
- **Role management**: Admins can change user roles via dropdown

## Making Your First Admin

1. **Register/Login** with your GitHub account first
2. **Find your email** in the database or check your session
3. **Run the admin script**:
   ```bash
   npm run make-admin your-email@example.com
   ```

## Admin Features

### Dashboard Indicators
- Admin badge appears in dashboard header
- Red "ADMIN" link in navigation bar

### Admin Panel (`/admin`)
- **System Overview**: User stats, portfolio health metrics
- **User Management**: View all users, change roles via dropdown
- **Database Operations**: Backup, export, health checks
- **Site Configuration**: Maintenance mode, registration settings

### API Endpoints
- `PATCH /api/admin/users`: Update user roles (admin only)

## Security
- All admin routes protected by `requireAdmin()` function
- Session-based role checking
- Automatic redirect to dashboard for non-admins

## Usage
1. Login with GitHub
2. Get promoted to admin via script
3. Access admin panel at `/admin`
4. Manage users and system settings