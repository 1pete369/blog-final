import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import React from "react";
// import { FetchedBlog } from "./types/Blog";
import Blog from "./models/Blog";
import Image from "next/image";

const BlogHomepage = async () => {
  try {
    await connectToDatabase();

    // Fetch latest blogs
    const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3).lean();

    if (!latestBlogs || latestBlogs.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800">No Blogs Found</h1>
        </div>
      );
    }

    return (
      <div className="bg-light-bodyBg dark:bg-dark-bodyBg">
        {/* Hero Section */}
        <section className="hero bg-blue-600 text-white py-32 text-center p-4">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-6">Welcome to Your Blog</h1>
            <Link
              href="/blogs"
              className="bg-yellow-400 text-black py-3 px-8 rounded-lg text-xl font-semibold"
            >
              View All Blogs
            </Link>
          </div>
        </section>

        {/* Latest Blogs Section */}
        <section className="blog-preview py-16 text-light-primaryText dark:text-dark-primaryText p-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Latest Blogs</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {latestBlogs.map((blog) => (
                <div
                  key={blog.slug}
                  className="border border-gray-300 bg-white rounded-lg overflow-hidden max-w-[300px]"
                >
                  <div>
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <Link href={`blogs/${blog.slug}`} className="text-blue-600">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching homepage blogs:", error);
    return <div>Error Fetching Blogs</div>;
  }
};

// Force no cache
export const fetchCache = "force-no-store";
export const revalidate = 0; // No revalidation caching

export default BlogHomepage;
