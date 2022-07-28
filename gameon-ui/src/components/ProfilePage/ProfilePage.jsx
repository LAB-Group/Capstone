import * as React from "react"
import { useState, useEffect } from "react"
import { Box, Center, Text, Divider, Stack, Container, useDisclosure} from "@chakra-ui/react"
import { useAuthContext } from "../../contexts/auth"
import ProfileDetails from "./ProfileDetails"
import apiClient from "../../services/apiClient"
import UserUpcomingEvents from "./UserUpcomingEvents"
import UserPreviousEvents from "./UserPreviousEvents"
import UserPostsFeed from "./UserPostsFeed"

// FIXME: NEED TO FIX INTERMITTENT RENDER ISSUES FOR FILTERED EVENTS FEED
export default function ProfilePage() {
    const { user } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [prevEvents, setPrevEvents] = useState([])
    const [futureEvents, setFutureEvents] = useState([])

    const curDate = new Date()
    curDate.setHours(0,0,0,0)

    useEffect(() => {
        const fetchUsersPosts = async () => {
            const { data, error } = await apiClient.listAllPostsByUserId(user.id)
            if (data) {
                const newPosts = data.posts
                console.log("newPosts: ", newPosts)
                setPosts(data.posts)
                console.log(posts)
            }
            if (error) setError(error)
        }

        fetchUsersPosts()
    }, [user.id])
    

    useEffect(() => {
        const getEvents = async () => {
        
            try {
              setTimeout(() => {
                
              }, 100)
              const response = await apiClient.fetchUsersEvents(user.id)
              const eventData = response.data
              setEvents(eventData)
              setLoading(false)
            } catch(error) {
              console.log("ERROR")
            }
          }
          getEvents()  
    },[])

    useEffect(() => {
        const filterEvents = () => {
            for (let i=0;i<events?.length;i++) {
                if (Date.parse(events[i].eventDate) < curDate.getTime()) {
                    setPrevEvents(current => [...current,events[i]]) 
                } else {
                    setFutureEvents(current => [...current,events[i]]) 
                }
                }
        }
        filterEvents()
    },[loading===false])

    return (

        <Container centerContent padding={6}>

            <Stack direction='column' spacing={7} align='stretch'>
                <ProfileDetails user={user} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                
                <Divider orientation='horizontal' />
                    <UserUpcomingEvents futureEvents={futureEvents} />

                <Divider orientation='horizontal' />
                    <UserPreviousEvents prevEvents={prevEvents} />

                
                <Divider orientation='horizontal' />
                <Text fontSize='3xl'>Post</Text>
                <Box h='700px' borderRadius='sm'>
                    {
                        posts.length === 0 ? 
                        
                        <Center h='100px'>
                            <Text fontSize='3xl'>No Post Found</Text>
                         </Center>
                        : 
                        <UserPostsFeed posts={posts} />
                    }
                </Box>

            </Stack>
        </Container>
    )
}
