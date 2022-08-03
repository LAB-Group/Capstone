import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Box, Center, Text, Divider, Stack, Container, useDisclosure, Heading} from "@chakra-ui/react"
import UsersProfileDetails from "./UsersProfileDetails"
import apiClient from "../../services/apiClient"
import UsersUpcomingEvents from "./UsersUpcomingEvents"
import UsersPreviousEvents from "./UsersPreviousEvents"
import UsersPostsFeed from "./UsersPostsFeed"
import { COLORS } from "../colors"

export default function UsersProfilePage() {
    const [viewedUser, setViewedUser] = useState({})
    const { userId } = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const curDate = new Date()
    curDate.setHours(0,0,0,0)
    let prevEvents = events?.filter(event => {return Date.parse(event.eventDate) < curDate.getTime()})
    let futureEvents = events?.filter(event => {return Date.parse(event.eventDate) >= curDate.getTime()})

    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await apiClient.fetchUserFromID(userId)
          if(data) {
            setViewedUser(data.user)
          }
          if (error) setError(error)
        }
        fetchUser()
      },[userId])

    useEffect(() => {
        const fetchUsersPosts = async () => {
            const { data, error } = await apiClient.listAllPostsByUserId(userId)
            if (data) {
                const newPosts = data.posts
                setPosts(data.posts)
            }
            if (error) setError(error)
        }

        fetchUsersPosts()
    }, [viewedUser.userId, userId])

    useEffect(() => {
        const getEvents = async () => {
        
            try {
              setTimeout(() => {
                
              }, 100)
              const response = await apiClient.fetchUsersEvents(userId)
              const eventData = response.data
              setEvents(eventData)
              setLoading(false)
            } catch(error) {
              return(error)
            }
          }
          getEvents()  
    },[])

    return (

        <Box style={{"backdropFilter": "blur(10px)", "background":"rgba(0, 0, 0, 0.05)"}} >

            <Stack direction='column' spacing={6}>
                <UsersProfileDetails viewedUser={viewedUser} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                
                <Divider orientation='horizontal' />
                    <UsersUpcomingEvents futureEvents={futureEvents} />

                <Divider orientation='horizontal' />
                    <UsersPreviousEvents prevEvents={prevEvents} />

                
                <Divider orientation='horizontal' />
                {/* <Heading fontFamily={"Roboto, sans-serif"} marginLeft={10} mb={2} color={COLORS.offWhite}>Posts</Heading> */}
                <Box height="700px" borderRadius='sm'>
                <Heading fontFamily={"Roboto, sans-serif"} marginLeft={6} mb={2} color={COLORS.offWhite}>Posts</Heading>
                    {
                        posts.length === 0 ? 
                        
                        <Box width={"100%"} height='100px'>
                            <Text fontSize='3xl' color={COLORS.offWhite}>No Post Found</Text>
                         </Box>
                        : 
                        <UsersPostsFeed posts={posts} />
                    }
                </Box>

            </Stack>
        </Box>
    )
}
