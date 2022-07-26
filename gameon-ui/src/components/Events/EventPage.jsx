import { Container, Divider } from "@chakra-ui/react"
import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import EventDetails from "./EventDetails"
import EventRegistration from "./EventRegistration"
import { useEventContext } from "../../contexts/event"
import axios from "axios";
import apiClient from '../../services/apiClient';
import PostsForm from "../Posts/PostsForm"

export default function EventPage(){
    const { events } = useEventContext()
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState([])
    const [eventGames, setEventGames] = useState([])

    let { eventId } = useParams()

    useEffect(() => {
        const getEvent = async () => {
        
            try {
              setTimeout(() => {
                setLoading(false)
              }, 100)
              const response = await axios.get(`http://localhost:3001/events/${eventId}`)
              const eventData = response.data
              setEvent(eventData.event)
              setEventGames(event.eventGame)
            } catch(error) {
              console.log("ERROR")
            //   return <NotFound />
            }
          }
          getEvent()  
    },[])

    return(
        <Container maxW="1200px">
            <EventDetails event={event} />
            <Divider orientation='horizontal' />
            {/* Moved this to EventDetails file */}
            {/* <EventRegistration event={event} /> */}
            <PostsForm event={event} eventId={eventId} />
        </Container>
    )
}