import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../services/apiClient"

const EventContext = createContext(null)

export const EventContextProvider = ({ children }) => {
    const [event, setEvent] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEvent = async () => {
          setIsLoading(true)
          const { data, error } = await apiClient.listEvents()
          if(data) setEvent(data.event)
          if (error) setError(error)
        }
          setIsLoading(false)
          fetchEvent()
      },[])

    const eventValue = { 
        event, 
        setEvent,
        initialized,
        setInitialized, 
        error, 
        setError, 
        isLoading, 
        setIsLoading 
    }

    return (
        <EventContext.Provider value={eventValue}>
            <>{children}</>
        </EventContext.Provider>
    )
}

export const useEventContext = () => useContext(EventContext)