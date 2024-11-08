// prisma/seed.js
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin user
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
