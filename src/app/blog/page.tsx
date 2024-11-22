import connectToDatabase from "@/lib/mongodb"
import Link from "next/link"
import { FetchedBlog } from "../types/Blog"
import Blog from "../models/Blog"
import Image from "next/image"

const BlogList = async () => {
  try {
    await connectToDatabase()
    const blogs: FetchedBlog[] | null = await Blog.find()

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
          {blogs.map((blog: FetchedBlog) => {
            return (
              <div
                className="max-w-md mx-auto  bg-light-cardBg dark:bg-dark-cardBg rounded-sm shadow-md"
                key={blog._id}
              >
                <div className=" text-light-primaryText dark:text-dark-primaryText text-xl rounded-md overflow-hidden">
                  <Image
                    src={blog.thumbnail}
                    alt=""
                    width={300}
                    height={180}
                    className="mb-2 h-[240px] w-[300px] object-cover object-top"
                  />
                  <div className="mb-2 px-2">
                    <Link href={`/blog/${blog.slug}`} className="">
                      {blog.title}
                    </Link>
                  </div>
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
export default BlogList
