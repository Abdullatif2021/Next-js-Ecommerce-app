import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        reject(
          NextResponse.json({ error: 'Failed to parse form' }, { status: 500 })
        );
        return;
      }

      try {
        const { name, description, price, category, stock, imageBase64 } =
          fields;

        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

        const product = await prisma.product.create({
          data: {
            name,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            imageUrl,
          },
        });

        resolve(NextResponse.json(product, { status: 201 }));
      } catch (error) {
        console.error('Error saving product:', error);
        reject(
          NextResponse.json(
            { error: 'Failed to save product' },
            { status: 500 }
          )
        );
      }
    });
  });
}
