import bcrypt from 'bcrypt';
import prisma from '../../../../lib/prisma';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: 'User created successfully' }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error('Sign-Up Error:', error); // Log error to the console
    return new Response(
      JSON.stringify({ error: 'An error occurred during sign-up' }),
      {
        status: 500,
      }
    );
  }
}
