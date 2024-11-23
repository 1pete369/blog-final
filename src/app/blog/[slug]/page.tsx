import { FetchedBlog } from "../../types/Blog"
import connect from "@/lib/mongodb"
import BlogModel from "../../models/Blog"
import { marked } from "marked"
import CommentSection from "@/app/components/CommentSection"

type BlogPagePropsType = {
  params: Promise<{ slug: string }>
}

const BlogPage = async ({ params }: BlogPagePropsType) => {

  const { slug } = await params

  try {
    await connect()
    const blog: FetchedBlog | null = await BlogModel.findOne({ slug })

    if (!blog) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800">Blog Not Found</h1>
        </div>
      )
    }

    const markdownContent = blog.content

    // Convert markdown content to HTML
    const htmlContent = marked(markdownContent)

    return (
      <div>
        <div className="max-w-5xl mx-auto min-h-[calc(100vh-70px)]">
          <div className="max-w-3xl mx-auto p-6">
          <p className="text-right text-slate-700 dark:text-slate-400">Date :{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
          {/* <p className='py-4 px-6 max-w-3xl mx-auto'>{blog.slug}</p> */}
          <div
            className="markdown prose dark:prose-invert py-4 px-6 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: htmlContent
            }}
          />
        </div>
        <CommentSection slug={blog.slug} />
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

export default BlogPage
