import * as React from "react"
// import axios from "axios"
import { Container, Text } from "@chakra-ui/react"
import EventOverview from "../EventsCard/EventOverview"
export default function EventPage(){
    // const [events, setEvents] = React.useState([])
    // const [isFetching, setIsFetching] = React.useState(false)
    // const [error, setError] = React.useState(null)

    
    // React.useEffect(() => {
    //     const fetchEvents = async () => {
    //       setIsFetching(true)
    
    //       try {
    //         const res = await axios.get("http://localhost:3001")
    //         if (res?.data?.events) {
    //           setEvents(res.data.events)
    //         } else {
    //           setError("Error fetching events.")
    //         }
    //       } catch (err) {
    //         console.log(err)
    //         const message = err?.response?.data?.error?.message
    //         setError(message ?? String(err))
    //       } finally {
    //         setIsFetching(false)
    //       }
    //     }
    
    //     fetchEvents()
    //   }, [])
    
    return(
        <Container maxW="1200px" maxH="960px" position="relative">
            <Text>Events</Text>
            <EventOverview/>
        </Container>
    )
}