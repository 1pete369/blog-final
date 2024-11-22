"use client"

import { auth } from "../firebase/config"
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signOut, onAuthStateChanged } from "firebase/auth"
import React, { createContext, useContext, useEffect, useState } from "react"


export type MainUserObject = {
  uid: string,
  personalInfo : {
    email : string,
    displayName : string,
    username : string,
    photoURL : string,
    isEmailVerified : boolean
  },
  timings : {
    createdAt : string,
    lastLoginAt : string
  }
}

// userContext TYPE
type UserContextType = {
  user: MainUserObject | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  profileIsLoading : Boolean
  handleGoogleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
}


// Mapping the user object
const mapFirebaseUserToMainUserObjectForGoogle = async (
  firebaseUser: FirebaseUser,
) => {

    const placeHoldForUserName = `_${crypto.randomUUID().slice(1,10)}`
    
    
    const MainUserObject: MainUserObject = {
      uid: firebaseUser.uid,
    personalInfo : {
      email: firebaseUser.email || "",
      displayName: firebaseUser.displayName?.toLowerCase()!,
      username: firebaseUser.displayName?.replace(/\s+/g, "").toLowerCase().concat(placeHoldForUserName)!,
      photoURL: firebaseUser.photoURL || `https://picsum.photos/seed/${firebaseUser.uid}/200`,
      isEmailVerified: firebaseUser.emailVerified!,
    },
    timings : {
      createdAt : firebaseUser.metadata.creationTime!,
      lastLoginAt : firebaseUser.metadata.lastSignInTime!,
    }
  };
  
  console.log("Main user object",MainUserObject)
  
  return MainUserObject;
};

const userContext = createContext<UserContextType | null>(null)


// Main Component that returns the context provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    // Declarations
  const [user, setUser] = useState<MainUserObject | null>(null)
  const [error, setError ] = useState<string | null>(null)
  const [profileIsLoading, setProfileIsLoading] = useState(false)

//   Google Logic
  const handleGoogleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth,provider)
    } catch (err : unknown){
      if(err instanceof Error){
        console.log(err)
      }
        setError("Something wrong, Try again later!")
    }
}


// Logout of user 
  const handleLogout =async ()=>{
    try{
        await signOut(auth)
        setUser(null)
        setError(null)
    }catch(err : unknown){
      if(err instanceof Error){
        alert(err)
      }
    }
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{
        if(firebaseUser && user===null){
          setProfileIsLoading(true)
          if(firebaseUser.providerData[0].providerId === "google.com"){
            const MainUserObject = await mapFirebaseUserToMainUserObjectForGoogle(firebaseUser)
            setUser(MainUserObject)
            setProfileIsLoading(false)
          }
        }else{
            setUser(null)
        }
    })
    return ()=> unsubscribe()
  },[])


  return (
    <userContext.Provider value ={{ user ,profileIsLoading , handleGoogleLogin , handleLogout, setError  }}>{children}</userContext.Provider>
  )
}


//  Using of created userContext
export const useUserContext = ()=>{
    const context = useContext(userContext)
    if(context===null) {
        throw new Error('user context must be used within the provider')
    }
    return context
}
