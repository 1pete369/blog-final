import { CommentType } from "@/app/types/Blog"
import connect from "../../../lib/mongodb" // MongoDB connection
import Comment from "../../models/Comment" // Blog model
import Blog from "@/app/models/Blog"

export async function POST(req: Request) {
  try {
    const comment: CommentType = await req.json()

    // Connect to MongoDB
    await connect()

    // Create a new blog post
    const newComment = new Comment(comment)
    await newComment.save()

    await Blog.findOneAndUpdate(
      { slug: comment.slug },
      { $push: { comments: newComment._id } },
      { new: true }
    )

    // Save blog post to database

    return new Response(
      JSON.stringify({ message: "Comment created successfully" , newComment }),
      {
        status: 201
      }
    )
  } catch (error) {
    console.error("Error creating blog:", error)
    return new Response(JSON.stringify({ error: "Failed to create blog" }), {
      status: 500
    })
  }
}


export async function GET(req: Request) {
  try{
    await connect()

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    const comments = await Comment.find( { slug } )

    return new Response(
      JSON.stringify(comments)
    )
  }catch (error) {
    console.error("Error creating blog:", error)
    return new Response(JSON.stringify({ error: "Failed to create blog" }), {
      status: 500
    })
  } 
}