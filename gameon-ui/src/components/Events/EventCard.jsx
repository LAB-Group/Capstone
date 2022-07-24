import { Image, Box, HStack, Heading, Badge, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import evo from "../../media/evo.jpg"

export default function EventCard({event}){

    return (

        <Box w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'} >
            <Link to={`/events/${event.id}`} >
            <Image src={event.eventImageUrl} objectFit={"cover"} height="200px" />
            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                    <HStack spacing='56px'>
                        <Heading size='md'>{event.eventName}</Heading>
                        <VStack>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>{event.eventType}</Badge>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>{event.eventDate}</Badge>
                        </VStack>   
                    </HStack>
                </Box>
            </Box>
            </Link>
        </Box>
    )
}