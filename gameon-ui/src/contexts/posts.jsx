import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../services/apiClient"

const PostContext = createContext(null)

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const postValue = { 
      posts, 
      setPosts,
      initialized,
      setInitialized, 
      error, 
      setError, 
      isLoading, 
      setIsLoading 
    }

    useEffect(() => {
        const fetchPosts = async () => {
          setIsLoading(true)
          const { data, error } = await apiClient.listAllPostsByEventId()
          if(data) {
            setPosts(data.events)
          }
          if (error) setError(error)
        }
          setIsLoading(false)
          fetchPosts()
      },[])

    return (
        <PostContext.Provider value={postValue}>
            <>{children}</>
        </PostContext.Provider>
    )
}

export const usePostContext = () => useContext(PostContext)