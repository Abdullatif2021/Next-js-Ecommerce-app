# 🛍️ E-Commerce App with Admin Dashboard

This is a full-stack E-commerce application built with Next.js and Prisma, featuring a cart system, user authentication, and an admin dashboard for managing products and users.

---

## 📚 Table of Contents

1. [Technologies Used](#technologies-used)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Running Migrations](#running-migrations)
6. [Project Structure](#project-structure)
7. [Deployment](#deployment)

---

### 🛠 Technologies Used

- **Frontend**: React, Next.js (including `next-auth` for authentication)
- **Backend**: Node.js, Prisma (ORM)
- **Database**: PostgreSQL (or any relational database compatible with Prisma)
- **State Management**: React Context API, NgRx (for Angular parts)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (for hosting), and a PostgreSQL database hosted on [Railway](https://railway.app/) or [PlanetScale](https://planetscale.com/) (recommended for serverless deployment compatibility)

---

### 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/YourUsername/YourRepository.git
   cd YourRepository
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables** (see below).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

### 🔑 Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `NEXTAUTH_SECRET`: A secret key for NextAuth (for JWT encryption).
- `NEXTAUTH_URL`: The URL of your application (e.g., `http://localhost:3000` for local development).

Example `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/yourdatabase"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

### 📂 Database Setup

1. **Create the Database**: If you haven't created a database yet, create one using PostgreSQL.

2. **Prisma Setup**:

   - Run the following command to generate the Prisma client:
     ```bash
     npx prisma generate
     ```

3. **Database Seed**: (Optional) Seed your database with initial data if you have a seeding script.

---

### 🛠 Running Migrations

Prisma migrations ensure your database schema is synchronized with your Prisma schema.

1. **Create Migration**:

   ```bash
   npx prisma migrate dev --name init
   ```

2. **Run Migration**:
   ```bash
   npx prisma migrate deploy
   ```

---

### 🗂 Project Structure

Here's a brief overview of the main directories and files in this project:

- **app**: Contains the main pages and API routes for the Next.js application.
  - **auth**: Authentication pages (sign-in and sign-up).
  - **products**: Product-related pages (list, add, edit).
  - **admin**: Admin dashboard pages (user management, product management).
- **context**: Contains React Context for global state management (e.g., `CartContext`).
- **lib**: Contains reusable utility functions and Prisma setup.
- **public**: Static files such as images.
- **styles**: Global CSS and Tailwind setup.
- **prisma**: Prisma schema for database models.

---

### 🚀 Deployment

To deploy this app, you can use Vercel, which is well-suited for Next.js applications:

1. **Push your repository** to GitHub (or any Git provider).

2. **Import the project on Vercel**:

   - Go to [Vercel's dashboard](https://vercel.com/dashboard).
   - Choose "Import Project" and select your Git repository.
   - Set up the environment variables on Vercel that match your local `.env` file.

3. **Set up the database**:

   - Use a serverless-compatible PostgreSQL provider (like [Railway](https://railway.app/) or [PlanetScale](https://planetscale.com/)).
   - Update the `DATABASE_URL` environment variable in Vercel with the new database connection string.

4. **Deploy**:
   - After configuring your environment variables, click "Deploy" on Vercel.
   - Vercel will automatically build and deploy your application.

---

Enjoy building and managing your e-commerce app!
