# 🎓 Learning Management System - HustLMS

A modern, full-featured Learning Management System (LMS) built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. The platform supports both instructors and learners, providing tools for course creation, online learning, progress tracking, and revenue analytics.

---

## 👥 Target Users

The LMS is designed for **two main user groups**:

### 🧑‍🏫 Instructors
- Create and manage courses and lesson content (videos, documents, images)
- Monitor learner progress for each course
- Analyze revenue generated from course enrollments

### 👨‍🎓 Learners
- Register/login using email or social accounts (Google, Facebook via Clerk)
- Browse, search, and enroll in free or paid courses
- Watch video lectures, read documents (PDF, Word, images)
- Track learning progress and receive completion certificates
- Leave reviews and feedback after completing a course

---

## 🚀 Features

### ✅ Common Features
- 🔐 **Authentication** with Clerk (Email, Google/Facebook SSO)
- 🧩 **Role-based system** for Instructors and Learners
- 🌐 **Responsive UI** using Tailwind CSS and Ant Design, shadcn/ui
- ⚡ **Lazy loading** and **skeleton loaders** for enhanced UX

### 📚 Learner Features
- Course browsing and filtering by title, instructor, or category
- Detailed course info: description, chapters, duration, instructor bio, and ratings
- Online learning experience with videos, PDFs, Word docs, and images
- Real-time progress tracking (% completed)
- Secure checkout via **VNPay** (free courses can be enrolled instantly)
- Course rating and commenting system
- Auto-generated PDF certificate after course completion

### 🧑‍🏫 Instructor Features
- Course builder: Create/edit/delete courses with multiple chapters
- Upload videos and attach lesson materials
- View list of enrolled students per course
- Monitor each student's progress
- Revenue analytics: see earnings per course or by date
- Enrollment statistics and progress dashboards

---

## 🧱 Tech Stack

- **Frontend**: React 19, Next.js 15 (Turbopack), Tailwind CSS, Ant Design, shadcn/ui  
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL  
- **Authentication**: Clerk  
- **Payments**: VNPay  
- **Cloud Storage**: Cloudinary  
- **Validation**: Zod + React Hook Form  
- **State Management**: Zustand  
- **PDF Export**: React PDF  
- **Charts**: Recharts  
- **UI**: Radix UI, DaisyUI, Lucide Icons  
- **UX Enhancements**: Skeletons, Lazy loading, Toasts, Confetti  

---

## 📦 Getting Started

```
1. git clone https://github.com/tmtuan04/lms-project2-20242.git
2. cd learning-management-system

3. npm install
4. npx prisma generate
5. npm run dev (or pnpm dev)
```