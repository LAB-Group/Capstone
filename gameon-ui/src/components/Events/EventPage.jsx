import { Container, Divider } from "@chakra-ui/react"
import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import EventDetails from "./EventDetails"
import EventRegistration from "./EventRegistration"
import { useEventContext } from "../../contexts/event"
import axios from "axios";

export default function EventPage(){
    const { events } = useEventContext()
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState([])

    let { eventId } = useParams()

    useEffect(() => {
        const getEvent = async () => {
        
            try {
              console.log('mounted')
              setTimeout(() => {
                setLoading(false)
              }, 100)
              const response = await axios.get(`http://localhost:3001/events/${eventId}`)

              console.log('responded')
              const eventData = response.data
              // console.log(eventData)
              setEvent(eventData.event)

            } catch(error) {
              console.log("ERROR")
            //   return <NotFound />
            }
          }
          getEvent()  
    },[])

    return(
        <Container>
            <EventDetails event={event} />
            <Divider orientation='horizontal' />
            <EventRegistration event={event} />
        </Container>
    )
}