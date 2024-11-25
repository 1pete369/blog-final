
import connectToDatabase from "@/lib/mongodb"
import Link from "next/link"
import React from "react"
import { FetchedBlog } from "./types/Blog"
import Blog from "./models/Blog"
import Image from "next/image"

export const dynamic = 'force-dynamic'; 

const BlogHomepage = async () => {

 
  try {
    await connectToDatabase()

    const latestBlogs: FetchedBlog[] | null = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(3)

    if (!latestBlogs) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800">Blogs Not Found</h1>
        </div>
      )
    }

    return (
      <div className=" bg-light-bodyBg dark:bg-dark-bodyBg">
        {/* Hero Section */}
        <section className="hero bg-blue-600 dark:bg-blue-600 text-white py-32 text-center p-4">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Your Self-Improvement Journey
            </h1>
            <p className="text-xl mb-8 text-slate-300 dark:text-slate-300">
              Read insightful articles, learn, and engage with our community of
              like-minded individuals.
            </p>
            <Link
              href="/blogs"
              className="bg-myaccent-warning text-black py-3 px-8 rounded-lg text-xl font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Start Reading
            </Link>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="blog-preview py-16 text-light-primaryText dark:text-dark-primaryText p-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Latest Blog Posts</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {latestBlogs.map((blog) => {
                return (
                  <div
                    key={blog.slug}
                    className="blog-card border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/10 rounded-lg overflow-hidden transition-transform transform hover:shadow-lg max-w-[300px] min-w-[300px] min-h-[30px] flex flex-col"
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
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                        {blog.title}
                      </h3>
                    </div>
                      <Link
                        href={`blogs/${blog.slug}`}
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        Read More
                      </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* User Interaction Section */}
        <section className="user-interaction py-16 bg-blue-600 dark:bg-blue-600 p-4 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Engage with the Community
            </h2>
            <p className="text-xl mb-6 text-slate-300 dark:text-slate-300">
              Login to comment on posts, ask questions, and share your thoughts
              with fellow readers.
            </p>
              <Link
              href="/auth/signup"
              className="bg-myaccent-warning text-black font-semibold text-xl py-3 px-8 rounded-lg hover:bg-yellow-400"
              >
              Start Reading
            </Link>
          </div>
        </section>

        {/* Footer Section */}
        <footer className=" text-light-secondaryText dark:text-dark-secondaryText py-8 p-4">
          <div className="container mx-auto text-center">
            {/* <div className="space-x-8 mb-4">
                <Link
                  href="/privacy"
                  className="text-light-link dark:text-dark-link"
                >
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-light-link dark:text-dark-link">
                  Terms of Service
                </Link>
                <Link
                  href="/contact"
                  className="text-light-link dark:text-dark-link"
                >
                  Contact Us
                </Link>
              </div>
              <div className="social-icons mb-4">
                <Link
                  href="https://instagram.com"
                  className="text-light-link dark:text-dark-link mx-4"
                >
                  Instagram
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-light-link dark:text-dark-link mx-4"
                >
                  Twitter
                </Link>
                <Link
                  href="https://youtube.com"
                  className="text-light-link dark:text-dark-link mx-4"
                >
                  YouTube
                </Link>
              </div> */}
            <div className="">
              &copy; copyright {new Date().getFullYear()} Productivity hub
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.log(error)
    return <div>Error Fetching Data </div>
  }
}

// export const fetchCache = "force-no-store";
// export const revalidate = 0; 

export default BlogHomepage
