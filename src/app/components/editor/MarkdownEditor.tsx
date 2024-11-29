// // components/MarkdownEditor.tsx
"use client"

import React, { useState, useEffect } from "react"
import { marked } from "marked" // Import marked for parsing markdown
import { BlogCreated } from "@/app/types/Blog"
import Image from "next/image"
import MarkdownPreviewDialog from "./MarkdownPreviewDialog"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/app/firebase/config"

type MarkdownEditorProps = {
  onSave: (blog: BlogCreated) => void
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState<string>("")
  const [slug, setSlug] = useState<string>("")
  const [thumbnail, setThumbnail] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [htmlContent, setHtmlContent] = useState<string>("")
  // const [file, setFile] = useState<File | null>(null);
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    async function getMark() {
      const parsedContent = await marked(content)
      setHtmlContent(parsedContent)
    }
    getMark()
  }, [content]) 


  const handleSave = () => {
    if (title === "" || thumbnail === "" || content === "") return

    const slugCreated = slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)
    const createdAtValue = new Date().toISOString()
    const blogData: BlogCreated = {
      title,
      content,
      slug: slugCreated,
      thumbnail,
      createdAt: createdAtValue
    }
    onSave(blogData) // Save the blog content in Markdown format
  }

  return (
    <div className="mx-auto p-4 container">
      <h2 className="mb-6 font-bold text-3xl text-center">
        Create a New Blog Post
      </h2>

      {/* Title Input */}
      <div className="flex md:flex-row flex-col md:space-x-24 container">
        <div className="flex flex-col justify-between gap-4 md:my-4 md:w-1/2">
          <div className="">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Blog Title"
              className="border-slate-300 bg-light-bodyBg dark:bg-dark-bodyBg shadow-sm p-3 border rounded-md focus:ring-2 focus:ring-slate-500 w-full focus:outline-none max-w-2xl"
              required
            />
          </div>
          <div className="">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter Blog Slug"
              className="border-slate-300 bg-light-bodyBg dark:bg-dark-bodyBg shadow-sm p-3 border rounded-md focus:ring-2 focus:ring-slate-500 w-full focus:outline-none max-w-2xl"
              required
            />
          </div>
          <div className="">
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="Enter thumbnail url"
              className="border-slate-300 bg-light-bodyBg dark:bg-dark-bodyBg shadow-sm p-3 border rounded-md focus:ring-2 focus:ring-slate-500 w-full focus:outline-none max-w-2xl"
              required
            />
            {/* <form onSubmit={(e)=>handleSubmit(e)}>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=>handleFileChange(e)}
                />
              </div>
              <button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Submit"}
              </button>
              {imageUrl && (
                <div>
                  <p>Uploaded Image:</p>
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )}
            </form> */}
          </div>
        </div>
        <div className="relative flex justify-center items-center border-slate-300 bg-light-bodyBg dark:bg-dark-bodyBg shadow-sm mt-6 md:mt-0 p-3 border rounded-md w-full md:w-1/2 max-w-sm h-[250px]">
          {thumbnail === "" ? (
            <div className="absolute text-light-secondaryText text-xl dark:text-dark-secondaryText">
              No Thumbnail
            </div>
          ) : (
            <Image
              src={thumbnail}
              alt="Somethings wrong"
              height={250}
              width={300}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="md:flex md:space-x-6 mt-6">
        {/* Markdown Editor */}
        <div className="mb-6 w-full md:w-1/2">
          <h3 className="mb-4 font-semibold text-xl">Markdown Editor</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post in Markdown"
            className="border-slate-300 bg-light-bodyBg dark:bg-dark-bodyBg shadow-sm p-4 border rounded-md focus:ring-2 focus:ring-slate-500 w-full h-96 focus:outline-none"
          />
        </div>

        {/* Markdown Preview */}
        <div className="mb-6 w-full md:w-1/2">
          <div className="flex items-center gap-32 p-2">
            <h3 className="font-semibold text-xl">Markdown Preview</h3>
            <MarkdownPreviewDialog htmlContent={htmlContent} />
          </div>
          <div
            className="border-slate-300 bg-light-bodyBg dark:bg-dark-bodyBg shadow-sm p-4 border rounded-md w-full min-h-96 dark:prose-invert prose"
            dangerouslySetInnerHTML={{
              __html: htmlContent // Pass the parsed HTML content here
            }}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 mt-4 px-6 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-white focus:outline-none"
        >
          Save Blog Post
        </button>
      </div>
    </div>
  )
}

export default MarkdownEditor
