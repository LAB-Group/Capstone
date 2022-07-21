import { Image, Box, HStack, Heading, Badge } from "@chakra-ui/react"
import evo from "../../media/evo.jpg"

export default function EventCard({event}){

    return (

        <Box w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'}>
            <Image src={evo} objectFit={"cover"} height="200px" />
            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                    <HStack spacing='56px'>
                        <Heading size='md'>Event Title</Heading>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            event date
                        </Badge>
                    </HStack>
                </Box>
            </Box>
        </Box>
    )
}