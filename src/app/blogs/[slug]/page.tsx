import { FetchedBlog } from "../../types/Blog"
import connect from "@/lib/mongodb"
import BlogModel from "../../models/Blog"
import { marked } from "marked"
import CommentSection from "@/app/components/CommentSection"
import { Metadata } from "next"
import { notFound } from "next/navigation"

// export const dynamic = 'force-dynamic'; 


type BlogPagePropsType = {
  params: Promise<{ slug: string }>
}


export async function generateStaticParams() {
  await connect()
  const blogs: FetchedBlog[] = await BlogModel.find()
  return blogs.map(blog=>({slug : blog.slug}))
}


export async function generateMetadata({
  params
}: BlogPagePropsType): Promise<Metadata> {
  
  const { slug } = await params
  await connect()
  const blog: FetchedBlog | null = await BlogModel.findOne({ slug })

  return {
    title : blog?.title,
    description : blog?.slug,
    openGraph : {
      images : {
        url : blog?.thumbnail as string
      }
    }
  }

}
const BlogPage = async ({ params }: BlogPagePropsType) => {
  const { slug } = await params; // Ensure params is resolved properly

  // try {
    await connect();
    const blog: FetchedBlog | null = await BlogModel.findOne({ slug });

    // if (!blog) {
    //   return (
    //     <div className="flex justify-center items-center min-h-screen">
    //       <h1 className="font-bold text-4xl text-gray-800">Blog Not Found</h1>
    //     </div>
    //   );
    // }
    if(!blog){
      notFound()
    }

    const markdownContent = blog.content;
    const htmlContent = marked(markdownContent); // No need to await `marked`

    return (
      <div>
        <div className="mx-auto max-w-5xl min-h-[calc(100vh-70px)]">
          <div className="mx-auto p-6 max-w-3xl">
            <p className="text-right text-slate-700 dark:text-slate-400">
              Date: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div
            className="mx-auto px-6 py-4 max-w-3xl dark:prose-invert markdown prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
        <CommentSection slug={blog.slug} />
      </div>
    );
  }
//   } catch (error) {
//     console.error("Error fetching blog:", error);
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h1 className="font-bold text-4xl text-gray-800">
//           Error fetching the blog
//         </h1>
//       </div>
//     );
//   }
// };

export default BlogPage;
