import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../services/apiClient"
import { useAuthContext } from './auth'

const EventContext = createContext(null)

export const EventContextProvider = ({ children }) => {
    const [events, setEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    const eventValue = { 
      events, 
      setEvents,
      initialized,
      setInitialized, 
      error, 
      setError, 
      isLoading, 
      setIsLoading,
      userEvents
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

      useEffect(() => {
        const fetchUsersEvent = async () => {
          const { data, error } = await apiClient.fetchUsersEvents(1)
          if(data) {

            setUserEvents(data)
          }
          if (error) setError(error)
        }
          fetchUsersEvent()
      },[])

    return (
        <EventContext.Provider value={eventValue}>
            <>{children}</>
        </EventContext.Provider>
    )
}

export const useEventContext = () => useContext(EventContext)