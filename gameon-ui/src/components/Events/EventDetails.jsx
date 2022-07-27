import * as React from "react"
import EventRegistration from "../Events/EventRegistration"
import { useState, useEffect } from "react"
import { 
    Container, Box, Text, SimpleGrid,
    Flex,
    Image, FormControl, FormLabel, 
    Heading, Input 
} from "@chakra-ui/react"
import axios from "axios";


export default function EventDetails({event}) {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    let string = ""
    if(event.eventGame !== undefined) {
        for(let i = 0; i < event.eventGame.length; i++) {
            if(i === event.eventGame.length - 1) {
                string += event.eventGame[i]
                break
            }
            string += event.eventGame[i] + ", "
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
          }, 100)
        const getGames = async () => {      
            try {
              const response = await axios.post(`http://localhost:3001/games/id`, {
                gameId: string
              })
              const gameData = response.data
              setGames(gameData)
            } catch(error) {
              console.log(error)
            }
          }
          getGames()  
    },[string])
    return(
        <Container position="relative" maxW="1000px">
            <Flex direction="column">
                    <Box>
                    {/* Image */}
                        <Image src={event.eventImageUrl}/>
                    {/* Date */}
                        <Text marginBottom={6} fontSize="3xl">Date: {new Date(event.eventDate).toDateString()}</Text>
                    {/* Type */}
                        <Text marginBottom={6} fontSize="3xl">Type: {event.eventType}</Text>
                    {/* Location */}
                        <Text marginBottom={6} fontSize="3xl">Location: {event.eventLocation}</Text>
                    {/* Details */}
                        <Text marginBottom={6} fontSize="3xl">Details: {event.eventDetails}</Text>
                    {/* Game */}
                        <Box marginBottom={6} fontSize="3xl">Game(s):
                        <SimpleGrid columns={4} spacing={10}>
                        {games.game?.map((game, index) => (
                            <>
                                <Text key={index}>{game.name}</Text>
                                <Image src={game.cover.url.replace("thumb", "cover_small_2x")} />
                            </>
                        ))}
                        </SimpleGrid>
                        </Box>
                    </Box>
                    <Box backgroundColor="purple.100">
                            <EventRegistration event={event} games={games}/>
                    </Box>
            </Flex>
               

        </Container>
    )
}