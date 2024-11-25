import connectToDatabase from "@/lib/mongodb"
import Link from "next/link"
// import { FetchedBlog } from "../types/Blog"
import Blog from "../models/Blog"
import Image from "next/image"

export const dynamic = 'force-dynamic'; // Ensures SSR for fresh data on every request


const BlogList = async () => {
  try {
    await connectToDatabase()
    // const blogs: FetchedBlog[] | null = await Blog.find()
    const blogs = await Blog.find().lean();

    console.log("Blogs", blogs)

    if (!blogs) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800">Blogs Not Found</h1>
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-70px)]">
        <div className="text-3xl font-bold mb-4">All Blogs</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {blogs.map((blog) => {
            return (
              <div
                  key={blog.slug}
                  className="blog-card border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/10 rounded-lg overflow-hidden transition-transform transform hover:shadow-lg max-w-[300px]"
                >
                  {/* Image Section */}
                  <div className="image-wrapper">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.slug}
                      height={200}
                      width={300}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                      {blog.title}
                    </h3>
                    <Link
                      href={`blogs/${blog.slug}`}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog:", error)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800">
          Error fetching the blog
        </h1>
      </div>
    )
  }
}

// export const fetchCache = "force-no-store";
// export const revalidate = 0; 

export default BlogList
