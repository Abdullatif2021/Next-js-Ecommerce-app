import prisma from '../../../lib/prisma';

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    const products = await prisma.product.findMany({
      skip,
      take: limit,
    });

    const totalProducts = await prisma.product.count();

    return new Response(
      JSON.stringify({
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { name, description, price, imageUrl, category, stock } =
      await request.json();
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        stock: parseInt(stock),
      },
    });
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const { id, name, description, price, imageUrl, category, stock } =
      await request.json();
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        stock: parseInt(stock),
      },
    });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
      });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    return new Response(
      JSON.stringify({ message: 'Product deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
    });
  }
}
