import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../services/apiClient"

const EventContext = createContext(null)

export const EventContextProvider = ({ children }) => {
    const [events, setEvents] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const eventValue = { 
      events, 
      setEvents,
      initialized,
      setInitialized, 
      error, 
      setError, 
      isLoading, 
      setIsLoading 
    }

    useEffect(() => {
        const fetchEvent = async () => {
          setIsLoading(true)
          const { data, error } = await apiClient.fetchEvents()
          if(data) {
            setEvents(data.events)
          }
          if (error) setError(error)
        }
          setIsLoading(false)
          fetchEvent()
      },[])

    return (
        <EventContext.Provider value={eventValue}>
            <>{children}</>
        </EventContext.Provider>
    )
}

export const useEventContext = () => useContext(EventContext)