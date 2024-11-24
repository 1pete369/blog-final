"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Maximize } from "lucide-react"
import { marked } from "marked"
import { useEffect, useState } from "react"

export default function MarkdownPreviewDialog({
  htmlContent
}: {
  htmlContent: string
}) {

    const [previewContent, setPreviewContent] = useState<string>("")

    useEffect(() => {
        async function getMark() { 
          // Convert markdown content to HTML when the content changes
          const parsedContent =await marked(htmlContent)
          setPreviewContent(parsedContent)
        }
        getMark()
      }, [htmlContent])

  return (
    <Dialog>
      <DialogTrigger>
        <Maximize />
      </DialogTrigger>
      <DialogContent className="min-w-max max-h-[90vh] overflow-auto">
        {" "}
        {/* Adjust the size */}
        <DialogHeader>
          <DialogTitle>Blog Preview</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        {/* Add your markdown preview or content here */}
        <div className="mx-auto max-w-5xl ">
          <div className="mx-auto p-6 max-w-3xl">
          <p className="text-right text-slate-700 dark:text-slate-400">Date :{new Date().toLocaleDateString()}</p>
          </div>
          {/* <p className='mx-auto px-6 py-4 max-w-3xl'>{blog.slug}</p> */}
          <div
            className="mx-auto px-6 py-4 max-w-3xl dark:prose-invert markdown prose"
            dangerouslySetInnerHTML={{
              __html: htmlContent
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
