"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // In a real app, you would call your API to check authentication status
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email, password) => {
    setIsLoading(true)
    try {
      // This is a mock implementation
      const mockUser = {
        id: "user-1",
        name: "Test User",
        email,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return mockUser
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name, email, password) => {
    setIsLoading(true)
    try {
      // This is a mock implementation
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return mockUser
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      // This is a mock implementation
      const mockUser = {
        id: "google-user-1",
        name: "Google User",
        email: "google.user@example.com",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return mockUser
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      localStorage.removeItem("user")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
