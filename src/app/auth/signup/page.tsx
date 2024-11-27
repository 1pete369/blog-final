import LoginPage from '@/app/components/auth/LoginWithGoogle'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata ={
  title : "Sign-up"
}

export default function SignUpPage() {
  return (
    <div>
      <LoginPage />
    </div>
  )
}
