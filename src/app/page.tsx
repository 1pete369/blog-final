import Link from "next/link"
import React from "react"

const BlogHomepage = () => {
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
            href="/blog"
            className="bg-myaccent-warning text-black py-3 px-8 rounded-lg text-xl font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Start Reading
          </Link>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="blog-preview py-16 text-light-primaryText dark:text-dark-primaryText p-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="blog-card border border-black dark:border-slate-200 bg-light-cardBg text-light-primaryText dark:bg-dark-cardBg dark:text-dark-primaryText shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">
                How to Stay Productive Every Day
              </h3>
              <p className="text-lg mb-4 text-light-secondaryText dark:text-dark-secondaryText">
                Discover proven strategies to maintain focus and stay on track
                towards your goals.
              </p>
              <Link href="/blog/1" className="text-blue-600">
                Read More
              </Link>
            </div>
            <div className="blog-card border border-black dark:border-slate-200 bg-light-cardBg text-light-primaryText dark:bg-dark-cardBg dark:text-dark-primaryText shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">
                Mindset Hacks for Personal Growth
              </h3>
              <p className="text-lg mb-4 text-light-secondaryText dark:text-dark-secondaryText">
                Change your mindset, and you'll change your life. These tips
                will guide you on your journey.
              </p>
              <Link href="/blog/2" className="text-blue-600">
                Read More
              </Link>
            </div>
            <div className="blog-card border border-black dark:border-slate-200 bg-light-cardBg text-light-primaryText dark:bg-dark-cardBg dark:text-dark-primaryText shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">
                The Power of Healthy Habits
              </h3>
              <p className="text-lg mb-4 text-light-secondaryText dark:text-dark-secondaryText">
                Learn how small daily habits can lead to massive personal
                transformation over time.
              </p>
              <Link href="/blog/3" className="text-blue-600">
                Read More
              </Link>
            </div>
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
            Login to Comment
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className=" text-white py-8 p-4">
        <div className="container mx-auto text-center">
          <div className="space-x-8 mb-4">
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
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogHomepage
