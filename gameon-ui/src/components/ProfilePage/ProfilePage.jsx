import * as React from "react"
import { useState, useEffect } from "react"
import { Box, Center, Text, Divider, Stack, Container, useDisclosure} from "@chakra-ui/react"
import { useAuthContext } from "../../contexts/auth"
import ProfileDetails from "./ProfileDetails"
import apiClient from "../../services/apiClient"
import UserUpcomingEvents from "./UserUpcomingEvents"
import UserPreviousEvents from "./UserPreviousEvents"

// FIXME: NEED TO FIX INTERMITTENT RENDER ISSUES FOR FILTERED EVENTS FEED
export default function ProfilePage() {
    const { user } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [prevEvents, setPrevEvents] = useState([])
    const [futureEvents, setFutureEvents] = useState([])

    const curDate = new Date()
    curDate.setHours(0,0,0,0)

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

                    <Center h='100px'>
                        <Text fontSize='3xl'>No Post Found</Text>
                    </Center>
                </Box>

            </Stack>
        </Container>
    )
}
