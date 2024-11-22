export type FetchedBlog = {
    _id: string        // Mongoose generated ID
    title: string       // Title of the blog
    content: string     // The content of the blog in markdown or HTML
    slug: string        // Unique slug for the blog URL
    createdAt: string  
    thumbnail : string // Date string in ISO format
  }

  export  type FetchedComments={
    _id : string
    slug : string
    commentId : string
    username : string
    commentText : string
    imageUrl : string
    createdAt : string
}

  

export  type BlogCreated = {
    title: string
    content: string
    slug: string
    thumbnail : string
    createdAt : string
  }

export  type CommentType={
    slug : string
    commentId : string
    username : string
    commentText : string
    imageUrl : string
    createdAt : string
}