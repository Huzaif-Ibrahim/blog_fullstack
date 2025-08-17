import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GlobalContext = createContext()

export const ContextState = ({ children }) => {

    const navigate = useNavigate()

    const [blogs, setBlogs] = useState([])
    const [token, setToken] = useState(null)
    const [input, setInput] = useState('')
    const [homeLoading, setHomeLoading] = useState(false)

    const fetchData = async () => {
      setHomeLoading(true)
      try {
        const { data } = await axios.get('/api/blog/all')
        data.success ? setBlogs(data.blogs) : toast.error(data.message)
        setHomeLoading(false)
      } catch (error) {
        toast.error(error.message)
      } 
    }

    useEffect(() => {
      fetchData()
      const token = localStorage.getItem('token')
      if(token){
        setToken(token)
        axios.defaults.headers.common['Authorization'] = `${token}`
      }
    }, [])

    const exports = {
        blogs,
        setBlogs,
        token,
        setToken,
        input,
        setInput,
        navigate,
        axios,
        homeLoading,
        setHomeLoading
    }


  return (
    <GlobalContext.Provider value={exports}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useContextState = () => {
  return useContext(GlobalContext)
}
