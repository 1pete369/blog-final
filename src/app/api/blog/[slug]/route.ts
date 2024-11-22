// import connect from '../../../../lib/mongodb';
// import Blog from '../../../models/Blog';


// type BlogSlugType = {
//   params : { slug : string}
// }

// export async function GET({ params }: BlogSlugType) {
//   const { slug } = params;

//   try {
//     // Connect to MongoDB
//     await connect();

//     // Fetch blog by slug
//     const blog = await Blog.findOne({ slug });

//     if (!blog) {
//       return new Response(JSON.stringify({ error: 'Blog not found' }), {
//         status: 404,
//       });
//     }

//     // Log the blog data to ensure it's being fetched correctly
//     console.log('Fetched blog:', blog);

//     return new Response(JSON.stringify(blog), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error fetching blog:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch blog' }), {
//       status: 500,
//     });
//   }
// }
