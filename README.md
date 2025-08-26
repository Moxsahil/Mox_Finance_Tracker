# 💰 MOX Finance Tracker

<div align="center">

**A comprehensive personal finance management application built with modern web technologies.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.30-green?style=for-the-badge)](https://orm.drizzle.team/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-purple?style=for-the-badge&logo=clerk)](https://clerk.com/)

[✨ Demo](#-demo) • [🚀 Features](#-features) • [⚡ Quick Start](#-quick-start) • [📖 Documentation](#-documentation)

</div>

---

## 📝 Overview

**MOX Finance Tracker** is a powerful, modern web application designed to help users take complete control of their financial life. Built with cutting-edge technologies like Next.js 14, TypeScript, and Drizzle ORM, it offers a seamless experience for tracking expenses, managing accounts, setting financial goals, and gaining insights into spending patterns.

## ✨ Demo

Visit the live application: [MOX Finance Tracker](https://your-demo-link.vercel.app)

## 🚀 Features

### 💳 **Core Financial Management**
- **Multi-Account Support** - Manage checking, savings, credit cards, and investment accounts
- **Transaction Tracking** - Add, edit, delete, and categorize all transactions
- **Smart Categorization** - Automatic and manual transaction categorization
- **Real-time Balance** - Live tracking of available balance, income, and expenses

### 📊 **Analytics & Insights**
- **Interactive Charts** - Beautiful visualizations using Recharts
- **Spending Analysis** - Detailed breakdown by categories and time periods
- **Smart Insights** - AI-powered spending pattern analysis
- **Custom Reports** - Generate detailed financial reports

### 🎯 **Goal Setting & Tracking**
- **Financial Goals** - Set and track savings goals with progress visualization
- **Goal Contributions** - Log contributions and monitor progress
- **Target Dates** - Set deadlines and receive progress updates

### 🔒 **Security & Authentication**
- **Secure Authentication** - Powered by Clerk with multiple sign-in options
- **User-specific Data** - Complete data isolation per user account
- **Session Management** - Secure session handling and token management

### 🎨 **User Experience**
- **Dark/Light Mode** - System preference aware theme switching
- **Responsive Design** - Seamless experience across all devices
- **Modern UI** - Clean, intuitive interface built with shadcn/ui
- **Data Import/Export** - CSV import for bulk transaction uploads

### 📱 **Additional Features**
- **Date Filtering** - Filter transactions by custom date ranges
- **Search & Sort** - Advanced search and sorting capabilities
- **Bulk Operations** - Select and manage multiple transactions
- **Loading States** - Smooth loading experiences throughout the app

## 🛠 Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand + TanStack Query

### **Backend & Database**
- **API**: Hono.js with Next.js API routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **File Processing**: Papa Parse (CSV handling)

### **DevOps & Tools**
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler
- **Database Studio**: Drizzle Studio
- **Package Manager**: npm/yarn/pnpm/bun

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18.17 or later
- **PostgreSQL** database (we recommend [Neon](https://neon.tech/))
- **Clerk** account for authentication

### 1. Clone the Repository
```bash
git clone https://github.com/Moxsahil/Mox_Finance.git
cd Mox_Finance
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/mox_finance

# Optional: Neon Database (recommended)
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 4. Database Setup
```bash
# Generate database schema
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open database studio
npm run db:studio
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Documentation

### Database Schema

The application uses a PostgreSQL database with the following main tables:

- **`accounts`** - User bank accounts and wallets
- **`categories`** - Transaction categories (Food, Bills, Entertainment, etc.)
- **`transactions`** - All financial transactions
- **`goals`** - Financial savings goals
- **`goal_contributions`** - Contributions made towards goals

### API Routes

All API endpoints are located in `app/api/[[...route]]/`:

- `GET|POST /api/accounts` - Account management
- `GET|POST /api/categories` - Category management  
- `GET|POST /api/transactions` - Transaction operations
- `GET|POST /api/goals` - Goal tracking
- `GET /api/summary` - Financial summary data
- `GET /api/insights` - Spending insights

### Component Architecture

```
components/
├── ui/                 # shadcn/ui base components
├── charts/            # Chart components (Area, Bar, Pie, etc.)
├── data-*             # Data display components
├── header.tsx         # Main navigation header
├── theme-switcher.tsx # Dark/Light mode toggle
└── ...
```

### Feature Modules

The application follows a feature-based architecture:

```
features/
├── accounts/          # Account management
├── categories/        # Category management
├── transactions/      # Transaction handling
├── goals/            # Goal tracking
└── summary/          # Dashboard summaries
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Drizzle schema
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Drizzle Studio
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write TypeScript for all new code
- Add proper error handling and loading states
- Test your changes thoroughly before submitting
- Update documentation when necessary

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://github.com/user-attachments/assets/744d9f3a-4206-449a-b561-d5c3885930a9)

### Transaction Management
![Transactions](https://github.com/user-attachments/assets/3c372728-2399-49de-b022-23d8e367bcc4)

### Financial Analytics
![Analytics](https://github.com/user-attachments/assets/6fefb76a-b9a5-4575-95e6-0c5e9ae1b472)

### Account Management
![Accounts](https://github.com/user-attachments/assets/3a8b5d5e-b69d-40a8-8cbb-dc5d8f085aa9)

### Goal Tracking
![Goals](https://github.com/user-attachments/assets/3db7e66f-a897-4ba1-8fb5-a65bc8bd9c4c)

## 🔗 Useful Links

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API
- **[Drizzle ORM Documentation](https://orm.drizzle.team/)** - Database ORM documentation
- **[Clerk Documentation](https://clerk.com/docs)** - Authentication setup and configuration
- **[shadcn/ui Documentation](https://ui.shadcn.com/)** - UI component library
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)** - Utility-first CSS framework

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/Moxsahil/Mox_Finance/issues)
- **LinkedIn**: [Sahil Barak](https://www.linkedin.com/in/sahil-barak-865063216/)
- **Portfolio**: [View Portfolio](https://my-portfolio-three-pi-92.vercel.app/)
- **YouTube**: [MOX Gaming](https://www.youtube.com/@MOXGamingYT01)

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Sahil Barak](https://github.com/Moxsahil)**

⭐ **Star this repository if you found it helpful!** ⭐

</div>