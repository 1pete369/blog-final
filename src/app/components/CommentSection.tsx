"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { CommentType } from "../types/Blog"
import { useUserContext } from "../context/UserDataProviderContext"

type CommentSectionPropsType = {
  slug: string
}

export default function CommentSection({ slug }: CommentSectionPropsType) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<CommentType[]>([])

  const { user } = useUserContext()

  const createComment = async (comment: CommentType) => {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
      })

      if (!response.ok) {
        throw new Error("Failed to create comment")
      }
      return await response.json()
    } catch (error) {
      console.error("Error saving comment:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim() === "") return

    const newComment: CommentType = {
      slug,
      commentId: crypto.randomUUID(),
      username: user?.personalInfo.username as string,
      commentText: comment,
      imageUrl: user?.personalInfo.photoURL as string,
      createdAt: new Date().toISOString()
    }

    console.log("New comment", newComment)

    const createdComment = await createComment(newComment)

    console.log("Response of CreatedComment", createdComment)
    if (createdComment) setComments([...comments, createdComment.newComment])
    setComment("")
  }

  useEffect(() => {
    async function fetchComments() {
      if (!slug) return // Wait until slug is available
      try {
        const fetchedComments = await fetch(`/api/comment?slug=${slug}`).then(
          (res) => res.json()
        )
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }
    fetchComments()
  }, [])

  if (user === null) {
    return (
      <section className="user-interaction py-16 bg-blue-600 dark:bg-blue-600 p-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Engage with the Community
          </h2>
          <p className="text-xl mb-6 text-slate-300 dark:text-slate-300">
            Login to comment on posts, ask questions, and share your thoughts
            with fellow readers.
          </p>
          <a
            href="/auth/signup"
            className="bg-myaccent-warning text-black font-semibold text-xl py-3 px-8 rounded-lg hover:bg-yellow-400"
          >
            Login to Comment
          </a>
        </div>
      </section>
    )
  }

  return (
    <div className=" bg-light-footerBg dark:bg-dark-footerBg">
      <div className="max-w-3xl mx-auto py-10 px-4 min-h-[400px]">
        <h1 className="text-light-primaryText dark:text-dark-primaryText mb-4 text-3xl">
          Comment section
        </h1>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className=" mx-auto flex flex-wrap gap-3"
        >
          <textarea
            className=" flex-1 min-w-[400px] px-5 py-2 rounded bg-light-inputBg dark:bg-dark-inputBg outline-none resize border-2"
            name=""
            rows={5}
            // cols={30}
            id=""
            placeholder="Type you comment!"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            type="submit"
            className="px-4 py-2 h-10 bg-blue-600 rounded text-white"
          >
            Add comment
          </button>
        </form>
        <div className="mt-4">
          <h2>Comments</h2>
          <div className="px-10 py-4 flex flex-col gap-2">
            {comments.length > 0 &&
              comments.map((comment) => {
                return (
                  <div
                    key={comment.commentId}
                    className="flex flex-col bg-slate-400/40 dark:bg-slate-800/40 p-4 rounded-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <Image
                          src={comment.imageUrl}
                          alt={comment.username}
                          height={40}
                          width={40}
                          className="rounded-full aspect-square object-cover object-top"
                        />
                        <p className="text-lg text-light-primaryText dark:text-dark-primaryText font-light">
                          {comment.username}
                        </p>
                      </div>
                      <p className="text-light-secondaryText dark:text-dark-secondaryText">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 text-light-secondaryText dark:text-dark-secondaryText">
                      {comment.commentText}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
