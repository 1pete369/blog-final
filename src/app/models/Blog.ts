import mongoose, { Schema } from 'mongoose';


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail : { type : String , required : true},
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  comments : [{ type : mongoose.Schema.Types.ObjectId , ref : "Comment"}]
});


const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
