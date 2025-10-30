# College ERP System

## Overview
A comprehensive College Enterprise Resource Planning (ERP) system built with React, TypeScript, and Tailwind CSS. This application provides role-based dashboards for managing various aspects of a college administration.

## Project Information
- **Name**: College ERP
- **Version**: 0.0.0
- **Type**: Frontend Application
- **Framework**: React 19 + Vite 7 + TypeScript
- **UI Library**: Tailwind CSS + Radix UI components
- **Routing**: React Router DOM

## Features
### Role-Based Dashboards
The system provides specialized dashboards for different user roles:

1. **Student Dashboard**
   - View academic records, CGPA, and exam results
   - Track attendance and class schedules
   - Check fee payment status
   - View assignments and notices

2. **Faculty Dashboard**
   - Manage class schedules
   - Mark student attendance
   - View student performance
   - Handle leave applications

3. **HOD (Head of Department) Dashboard**
   - Faculty management and workload distribution
   - Leave approvals
   - Department performance tracking
   - Subject allocation

4. **Dean Dashboard**
   - College-wide analytics
   - Department comparisons
   - Curriculum approvals
   - Faculty reviews

5. **Accountant Dashboard**
   - Fee payment tracking
   - Financial reports generation
   - Student account monitoring
   - Payment processing

6. **Registrar Dashboard**
   - Admissions management
   - Exam schedule management
   - Document generation (certificates, transcripts)
   - Student record management

7. **Director Dashboard**
   - Institutional KPIs
   - Strategic initiatives tracking
   - Accreditation status
   - Long-term planning and reports

## Project Structure
```
Frontend/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images and static resources
│   ├── components/   # Reusable UI components
│   │   ├── ui/       # shadcn/ui components (button, card, input, etc.)
│   │   └── theme-provider.tsx
│   ├── lib/          # Utility functions and mock data
│   ├── pages/        # Page components
│   │   ├── dashboards/  # Role-specific dashboards
│   │   └── LandingPage.tsx
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # Application entry point
│   └── index.css     # Global styles
├── vite.config.ts    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies
```

## Technology Stack
- **React 19.1.1**: UI library
- **TypeScript 5.9.3**: Type-safe JavaScript
- **Vite 7.1.7**: Build tool and dev server
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **React Router DOM 7.9.3**: Client-side routing
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

## Development Setup (Replit)
The project is configured to run on Replit with:
- Dev server on port 5000 (0.0.0.0)
- Host header verification bypassed for Replit's proxy
- Hot module replacement enabled

## Recent Changes
- **2025-10-30**: Initial project import and Replit environment setup
  - Installed Node.js 20
  - Configured Vite for Replit environment (port 5000, allow all hosts)
  - Set up workflow for development server
  - Configured deployment settings

## Current State
The application is currently using mock data (`lib/mockData.ts`) for demonstration purposes. Future enhancements could include:
- Backend API integration
- Database connectivity
- Authentication and authorization
- Real-time data updates
- File upload functionality
- Export/import features

## User Preferences
None specified yet.
