# PRAP Platform - Professional Readiness & Automation Platform

## Deployment Setup

### 1. Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
# Database (PostgreSQL required)
DATABASE_URL="postgresql://username:password@host:5432/database"

# NextAuth Configuration
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-random-32-char-string"

# GitHub OAuth (Create at github.com/settings/developers)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# JWT Secret
JWT_SECRET="generate-random-jwt-secret"
```

### 2. Database Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. Post-Deployment
```bash
# Create first admin user
npm run make-admin your-email@example.com
```

## Local Development
```bash
npm run dev
```

## Features
- GitHub OAuth authentication
- Portfolio health monitoring
- Admin panel with user management
- Student roster and showcase
- Learning tutorials with video integration