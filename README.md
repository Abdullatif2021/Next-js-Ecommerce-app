# 🛒 eCommerce Application

A full-stack eCommerce application with product management, authentication, and a checkout process. Built with Next.js, Prisma, and styled with Tailwind CSS, this application is ready for deployment on Vercel, complete with a cloud database connection.

## ✨ Features

- **Admin Dashboard**: Add, edit, and delete products and manage users with an intuitive interface.
- **User Authentication**: Secure sign-in and sign-up with NextAuth.js, including protected routes.
- **Product Pagination & Search**: Smooth product browsing experience with pagination and search functionality.
- **Shopping Cart**: Add items to cart, update quantities, and proceed to a checkout flow.
- **Order Simulation**: A payment page simulation to showcase an interactive checkout experience.

---

## 📚 Table of Contents

1. [Technologies Used](#technologies-used)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Running Migrations](#running-migrations)
6. [Project Structure](#project-structure)
7. [Deployment](#deployment)

## 🛠️ Technologies Used

- **Frontend**: Next.js, Tailwind CSS, React Hook Form, Yup validation
- **Backend**: Next.js API routes, Prisma ORM, Bcrypt
- **Database**: MySQL/PostgreSQL (set up with an external provider)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables** (see `.env.example` for required variables).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

- `DATABASE_URL`: URL for the Prisma database connection.
- `NEXTAUTH_SECRET`: Secret for NextAuth.js sessions.
- `NEXTAUTH_URL`: Base URL of your deployed app (set to `http://localhost:3000` for local development).

## 🗄️ Database Setup

1. **Configure Database URL**:
   Update the `DATABASE_URL` in your `.env` file to point to your database.

2. **Push Prisma Migrations**:
   ```bash
   npx prisma migrate dev
   ```

## 🌲 Project Structure

- **/app**: Contains the main application code.

  - `/admin`: Admin routes for managing products and users.
  - `/api`: API routes for authentication, products, and users.
  - `/context`: Context providers, such as the Cart context.
  - `/components`: Reusable UI components.

- **/lib**: Utility files and Prisma client configuration.

## 🚀 Deployment

1. **Deploy on Vercel**:

   - Import your repository into Vercel.
   - Set environment variables in Vercel settings (DATABASE_URL, NEXTAUTH_SECRET, etc.).

2. **Set Up External Database**:
   Use a managed database service like PlanetScale or Supabase and set its URL as `DATABASE_URL`.

3. **Push Database Migrations in Production**:

   ```bash
   npx prisma migrate deploy
   ```

4. **Final Check**:
   Verify your deployment URL and ensure everything works as expected.

---

## 📄 License

This project is licensed under the MIT License.

---

Happy coding! 🎉
