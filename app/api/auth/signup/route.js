import bcrypt from 'bcrypt';
import prisma from '../../../../lib/prisma';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    console.error('Sign-Up Error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred during sign-up' }),
      {
        status: 500,
      }
    );
  }
}
