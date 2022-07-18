import * as React from "react"
import { Container, Box, Flex, Image, Center, Input, Text, Square, HStack } from "@chakra-ui/react"
import profile from "../../media/elmo-burning.gif"

export default function ProfilePage(){
    return(
        <Container maxW="900px" maxH="1200px" mt="200px">
           <Flex color='white'>
                <Box flexWrap='wrap' boxSize='400px' minW='400px'>
                    <Image 
                        boxSize='200px'
                        src={profile}/>
                </Box>
                <Box bg='#d6bcfa'>
                {/* Spacing the Name from the Handle */}
                    <HStack spacing='15em'>
                        <Text>Name of User</Text>
                        <Text>Preferred Handle</Text>
                    </HStack>
                    {/* Centered and spaced from the above text */}
                    <Center pt="2em">
                        <Text>Location</Text>
                    </Center>
                    <Center pt="3em">
                        <Text>Games Played</Text>
                    </Center>
                </Box>
            </Flex>
        </Container>
    )
}