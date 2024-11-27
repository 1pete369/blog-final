import connectToDatabase from "@/lib/mongodb"
import { MetadataRoute } from "next"
import { FetchedBlog } from "./types/Blog"
import Blog from "./models/Blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase()
  const posts: FetchedBlog[] = await Blog.find()
  const postEntries: MetadataRoute.Sitemap = posts.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_APP_URL}/blogs/${blog.slug}`,
    lastModified: blog.createdAt
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_APP_URL}/blogs`,
    //   lastModified : new Date()
    },
    ...postEntries
  ]
}
