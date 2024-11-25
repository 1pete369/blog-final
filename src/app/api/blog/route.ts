import { BlogCreated } from '@/app/types/Blog';
import connect from '../../../lib/mongodb';  // MongoDB connection
import BlogModel from '../../models/Blog';     // Blog model


export async function GET() {
  try{
    await connect()
    const blogs = BlogModel.find()

    return new Response(JSON.stringify({ blogs : blogs }))
  }catch (error) {
    console.error('Error Finding blogs:', error);
    return new Response(JSON.stringify({ error: 'Failed to Fetch blog' }), {
      status: 500,
    });
  }
}

// export async function POST(req : Request) {
//   try {
//     const { title, content, slug , thumbnail , createdAt } : BlogCreated = await req.json();

//     // Connect to MongoDB
//     await connect();

//     // Create a new blog post
//     const newBlog = new BlogModel({
//       title,
//       content,
//       slug,
//       thumbnail,
//       createdAt
//     });

//     // Save blog post to database
//     await newBlog.save();
//     // await res.revalidate('/blogs');

//     return new Response(JSON.stringify({ message: 'Blog created successfully' }), {
//       status: 201,
//     });
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     return new Response(JSON.stringify({ error: 'Failed to create blog' }), {
//       status: 500,
//     });
//   }
// }


export async function POST(req: Request) {
  try {
    const { title, content, slug, thumbnail, createdAt }: BlogCreated = await req.json();

    // Connect to MongoDB
    await connect();

    // Create a new blog post
    const newBlog = new BlogModel({
      title,
      content,
      slug,
      thumbnail,
      createdAt,
    });

    // Save the blog post to the database
    await newBlog.save();

    // Revalidate pages
    const revalidationUrls = ['/blogs', '/'];

    await Promise.all(
      revalidationUrls.map(async (url) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=${url}`
          );

          if (!response.ok) {
            console.error(`Failed to revalidate ${url}:`, await response.text());
          }
        } catch (err) {
          console.error(`Error while revalidating ${url}:`, err);
        }
      })
    );

    return new Response(
      JSON.stringify({ message: 'Blog created successfully' }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create blog' }),
      { status: 500 }
    );
  }
}
