"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "@/config"

// Definir un tipo para los datos del usuario
type User = {
  id: number
  name: string
  email: string
  username: string
  avatar?: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithToken: (token: string, userData?: User | null) => void
  register: (username: string, name: string, email: string, password: string) => Promise<void>
  logout: () => void
  exchangeSessionForToken: (sessionId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"))
  })
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Cargar datos del usuario al iniciar o cuando cambia el token
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          const res = await axios.get(`${API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          setUser(res.data)
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Error al cargar usuario:", error)
          // Si hay un error, limpiar el token
          localStorage.removeItem("token")
          setIsAuthenticated(false)
          setUser(null)
        }
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password })
      const { token, id, name, email: userEmail, username } = res.data

      if (!token) {
        throw new Error("No se recibió token")
      }

      localStorage.setItem("token", token)
      setIsAuthenticated(true)

      // Guardar datos básicos del usuario si están disponibles
      if (id) {
        setUser({
          id,
          name,
          email: userEmail,
          username,
        })
      } else {
        // Si no recibimos datos del usuario, los cargamos
        await loadUserData(token)
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.response?.data?.message || error.message)
      throw new Error(error.response?.data?.message || "Error al iniciar sesión")
    }
  }

  // Nueva función para iniciar sesión con un token (para Google)
  const loginWithToken = (token: string, userData: User | null = null) => {
    if (!token) {
      throw new Error("Token es requerido")
    }

    localStorage.setItem("token", token)
    setIsAuthenticated(true)

    if (userData) {
      setUser(userData)
    } else {
      // Si no recibimos datos del usuario, intentamos cargarlos
      loadUserData(token).catch((error) => {
        console.error("Error al cargar datos del usuario:", error)
      })
    }
  }

  // Función para cargar datos del usuario
  const loadUserData = async (token: string) => {
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUser(res.data)
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error)
      throw error
    }
  }

  // Función para intercambiar ID de sesión por token
  const exchangeSessionForToken = async (sessionId: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/exchange-token`, {
        session_id: sessionId,
      })

      const { token, user: userData } = res.data

      if (!token) {
        throw new Error("No se recibió token")
      }

      localStorage.setItem("token", token)
      setIsAuthenticated(true)

      if (userData) {
        setUser(userData)
      } else {
        await loadUserData(token)
      }
    } catch (error: any) {
      console.error("Error al intercambiar token:", error.response?.data?.message || error.message)
      throw new Error(error.response?.data?.message || "Error al autenticar")
    }
  }

  const register = async (username: string, name: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/register`, { username, name, email, password })
    } catch (error: any) {
      console.error("Error al registrarse:", error.response?.data?.message || error.message)
      throw new Error(error.response?.data?.message || "Error al registrarse")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        loginWithToken,
        register,
        logout,
        exchangeSessionForToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
