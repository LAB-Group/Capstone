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

      // FIXME: BELOW NOT RENDERING PROPERLY. MAY WANT TO HANDLE IN BACKEND OR EVENTCONTEXT. 
      // DOES NOT APPEAR TO BE RELIABLE ON PAGE LOAD
      // useEffect(() => {
      //   const getGameDetails = async () => {
      //     // const { data, error } = await apiClient.getGameDetails({gameId:event.eventGame[0]})
      //     // if(data) setEventGames([data])
    
      //       for (let i=0;i<event?.eventGame.length;i++) {
      //         const { data, error } = await apiClient.getGameDetails({gameId:event.eventGame[i]})
      //         // if(data) setEventGames(games => ([...games,data]))
      //         if(data) setEventGames(data)
  
      //         if (error) setErrors(error)
      //       }
      //   }
      //   getGameDetails()
      // },[])

    return (
        <EventContext.Provider value={eventValue}>
            <>{children}</>
        </EventContext.Provider>
    )
}

export const useEventContext = () => useContext(EventContext)