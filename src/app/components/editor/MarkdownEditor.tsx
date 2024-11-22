// components/MarkdownEditor.tsx
"use client"

import React, { useState } from "react"
import { marked } from "marked" // Import marked for parsing markdown
import { BlogCreated } from "@/app/types/Blog"


type MarkdownEditorProps = {
  onSave: (blog : BlogCreated) => void
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState<string>("")
  const [slug,setSlug]= useState<string>("")
  const [thumbnail, setThumbnail] = useState<string>("")
  const [content, setContent] = useState<string>("")

  const handleSave = () => {

    if(title==='' || thumbnail==='' || content==='') return

    const slugCreated = slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)
    const createdAtValue = new Date().toISOString()
    const blogData : BlogCreated = { title, content, slug : slugCreated, thumbnail , createdAt : createdAtValue }
    onSave(blogData) // Save the blog content in Markdown format
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create a New Blog Post
      </h2>

      {/* Title Input */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Blog Title"
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-light-bodyBg dark:bg-dark-bodyBg max-w-2xl"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter Blog Slug"
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-light-bodyBg dark:bg-dark-bodyBg max-w-2xl"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Enter thumbnail url"
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-light-bodyBg dark:bg-dark-bodyBg max-w-2xl"
          required
        />
      </div>

      <div className="md:flex md:space-x-6">
        {/* Markdown Editor */}
        <div className="w-full md:w-1/2 mb-6">
          <h3 className="text-xl font-semibold mb-2">Markdown Editor</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post in Markdown"
            className="w-full h-96 p-4 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-light-bodyBg dark:bg-dark-bodyBg"
          />
        </div>

        {/* Markdown Preview */}
        <div className="w-full md:w-1/2 mb-6">
          <h3 className="text-xl font-semibold mb-2">Markdown Preview</h3>
          <div
            className="prose dark:prose-invert w-full min-h-96 p-4 border border-slate-300 rounded-md shadow-sm bg-light-bodyBg dark:bg-dark-bodyBg"
            dangerouslySetInnerHTML={{
              __html: marked(content) // Convert markdown to HTML
            }}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Blog Post
        </button>
      </div>
    </div>
  )
}

export default MarkdownEditor
