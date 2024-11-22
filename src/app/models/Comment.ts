import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  slug: String,
  commentId: String,
  username: String,
  commentText: String,
  imageUrl: String,
  createdAt: String
})

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment
