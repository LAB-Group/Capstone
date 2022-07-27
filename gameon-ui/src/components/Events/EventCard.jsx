import { Image, Box, HStack, Heading, Badge, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function EventCard({event}){

    const timestamp = Date.parse(event.eventDate)
    const date = new Date(timestamp).toLocaleDateString('en-US')
    const time = new Date(timestamp).toLocaleTimeString('en-US')

    return (

        <Box w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'} _hover={{transform: "scale3d(1.05, 1.05, 1)" }} >
            <Link to={`/events/${event.id}`}  >
            <Image src={event.eventImageUrl} objectFit={"cover"} height="200px" />
            <Box p='6'>
                <Box display='flex' alignItems='baseline' >
                    <HStack display='flex' flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing='56px'>
                        <Heading size='sm' textAlign={'center'} width={'100px'}>{event.eventName}</Heading>
                        <VStack maxW={'130px'}>
                            <Badge borderRadius='full' px='2' colorScheme='purple'>{event.eventType}</Badge>
                            <Badge borderRadius='full' px='2' colorScheme='purple'>{date}</Badge>
                            <Badge borderRadius='full' px='2' colorScheme='purple'>{time}</Badge>
                        </VStack>   
                    </HStack>
                </Box>
            </Box>
            </Link>
        </Box>
    )
}