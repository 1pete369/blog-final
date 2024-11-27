"use client"

// pages/createBlog.tsx
import MarkdownEditor from "@/app/components/editor/MarkdownEditor";
import { useUserContext } from "@/app/context/UserDataProviderContext";
import { BlogCreated } from "@/app/types/Blog";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";



const CreateBlogPage = () => {
  const [savedBlog, setSavedBlog] = useState<BlogCreated | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const {user} = useUserContext()
  // Handle save action from MarkdownEditor
  const handleSave = async (blog: BlogCreated) => {
    setSavedBlog(blog); // Save the blog data to the state
  
    console.log("blog data at onsave", blog);
  
    try {
      const response = await fetch('/api/blog', {
        method: 'POST', // Use POST method to create a new blog
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog), // Send the blog data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
  
      const data = await response.json();
      console.log('Blog saved successfully:', data);
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  
  useEffect(() => {
    // Only check admin status after user data is loaded
    if (user !== null) {
      if (user.personalInfo.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true); // Set admin status
      } else {
        redirect('/'); // Redirect non-admin users
      }
    }
  }, [user]);

  // Do not render anything until admin check is completed
  if (user === null || !isAdmin) {
    return null; // Render nothing while validating
  }


  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* Render MarkdownEditor and pass onSave function */}
      <MarkdownEditor onSave={handleSave} />

      {savedBlog && (
        <div>
          <h3>Your blog has been saved!</h3>
          <p>Title: {savedBlog.title}</p>
          <p>Content: {savedBlog.content}</p>
          {/* Display additional details if needed */}
        </div>
      )}
    </div>
  );
};

export default CreateBlogPage;
