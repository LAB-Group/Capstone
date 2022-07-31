import * as React from "react"
import { useState, useEffect } from "react"
import { Box, Center, Text, Divider, Stack, Container, useDisclosure, Heading} from "@chakra-ui/react"
import { useAuthContext } from "../../contexts/auth"
import ProfileDetails from "./ProfileDetails"
import apiClient from "../../services/apiClient"
import UserUpcomingEvents from "./UserUpcomingEvents"
import UserPreviousEvents from "./UserPreviousEvents"
import UserPostsFeed from "./UserPostsFeed"

export default function ProfilePage() {
    const { user } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const [games, setGames] = useState([])

    const curDate = new Date()
    curDate.setHours(0,0,0,0)
    let prevEvents = events?.filter(event => {return Date.parse(event.eventDate) < curDate.getTime()})
    let futureEvents = events?.filter(event => {return Date.parse(event.eventDate) >= curDate.getTime()})

    useEffect(() => {
        const fetchUsersPosts = async () => {
            const { data, error } = await apiClient.listAllPostsByUserId(user.id)
            if (data) {
              setPosts(data.posts)
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
              return(error)
            }
          }
          getEvents()  
    },[])

    useEffect(() => {
        const getGames = async () => {      
            try {
                for (let i=0;i<user.gameList.length;i++) {
                    const response = await apiClient.getGameInfoById(user.gameList[i])
                    setGames(curr => [...curr, response.data])
                    console.log("GAMES:",games)
                  }
              } catch(error) {
              return(error)
            }
          }
          getGames()  
    },[])
    console.log("USER: ",games)

    return (

        <Container centerContent padding={6}>

            <Stack direction='column' spacing={7} align='stretch'>
                <ProfileDetails user={user} isOpen={isOpen} onOpen={onOpen} onClose={onClose} games={games} />
                
                <Divider orientation='horizontal' />
                    <UserUpcomingEvents futureEvents={futureEvents} />

                <Divider orientation='horizontal' />
                    <UserPreviousEvents prevEvents={prevEvents} />

                
                <Divider orientation='horizontal' />
                <Heading>Posts</Heading>
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
