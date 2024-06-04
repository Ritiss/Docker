import React, { useContext, useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import LocalStorageService from "../services/LocalStorageService"
import Api from "../api/Api"
import { asyncLoadUserData } from "../store/reducer/auth/userInfoReducer"


const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [token, setToken] = useState()
  const [userType, setUserType] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    !isLoaded && initAuth()
    
  }, [])


  const initAuth = async () => {
    setToken(LocalStorageService.getValue("accessToken") || "")
    await loadUserData()
  }
  
  const dispatch = useDispatch()
  
  const loadUserData = async () => {
      const accessToken = LocalStorageService.getValue("accessToken")
      if (accessToken) {
          const response = await Api.decodeToken(accessToken)
          if (response.success) {
            dispatch(asyncLoadUserData())
            setAuthenticated(true)
            setToken(accessToken)
        } else {
            removeToken()
            setAuthenticated(false)
          }

          setIsLoaded(true)
      } else {
          setIsLoaded(true)
          setAuthenticated(false)
      }
  }

  const removeToken = () => {
      LocalStorageService.removeValue("accessToken")
      setToken("")
  }

  const updateToken = async (token) => {
      setToken(token)
      setAuthenticated(true)
      await loadUserData()
      LocalStorageService.setValue("accessToken", token)
  }

  const logout = () => {
      removeToken()
      navigate('/')
  }
  
  const value = {
    isAuthenticated,
    isLoaded,
    token, 
    updateToken,
    removeToken,
    logout,
    userType
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)