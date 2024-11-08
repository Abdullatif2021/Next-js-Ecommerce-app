// app/api/users/route.js
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Error fetching users' }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id'); // Retrieve the `id` from the query parameters

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
      });
    }

    await prisma.user.delete({
      where: { id: parseInt(userId) }, // Assuming userId is an integer
    });

    return new Response(
      JSON.stringify({ message: 'User deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Error deleting user' }), {
      status: 500,
    });
  }
}

// Add new user (POST)
export async function POST(req) {
  try {
    const { email, password, isAdmin } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        {
          status: 400,
        }
      );
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false, // Default to false if isAdmin is not provided
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Error creating user' }), {
      status: 500,
    });
  }
}
