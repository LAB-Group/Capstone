import { Box, Container, Divider } from "@chakra-ui/react"
import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import EventDetails from "./EventDetails"
import axios from "axios";
import apiClient from '../../services/apiClient';
import PostsForm from "../Posts/PostsForm"
import PostsFeed from "../Posts/PostsFeed"

export default function EventPage(){
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState([])
    const [games, setGames] = useState([])
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)

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

              for (let i=0;i<eventData.event.eventGame.length;i++) {
                const test = await apiClient.getGameInfoById(eventData.event.eventGame[i])
                setGames(curr => [...curr, test.data])
              }

            } catch(error) {
              return(error)
            }
          }
          getEvent()  
    },[])

    useEffect(() => {
        const fetchPosts = async () => {
          const { data, error } = await apiClient.listAllPostsByEventId(eventId)
          if(data) {
            setPosts(data.posts)
          }
          if (error) setError(error)
        }
          fetchPosts()
      },[])

    return(
        <Container centerContent >
            <EventDetails event={event} games={games} />
            <Divider orientation='horizontal' />
            {/* Moved this to EventDetails file */}
            {/* <EventRegistration event={event} /> */}
            <PostsFeed eventId={eventId} posts={posts} />
            <PostsForm event={event} eventId={eventId} />
        </Container>
    )
}