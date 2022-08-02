import * as React from "react"
import {Box, Heading, SimpleGrid, Stack, StackDivider, Flex,  VStack, HStack, Image, Text} from "@chakra-ui/react"
import { COLORS } from "../colors"
import pic from "../../media/Logo.png"
// import { Link } from "react-router-dom"

export default function About(){
    return (
        <Box width={"100%"} py={12}>
            <Heading id="events" fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>About</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} background={"hsl(255, 50%, 21%)"} roundedTop={"25px"}>
                <Stack spacing={4}>
                <Text
                    textTransform={'uppercase'}
                    color={'blue.400'}
                    fontWeight={600}
                    fontSize={'sm'}
                    bg={COLORS.offWhite}
                    p={2}
                    alignSelf={'flex-start'}
                    rounded={'md'}>
                    About us
                </Text>
                <Heading color={COLORS.offWhite}>GameOn</Heading>
                <Text color={COLORS.offWhite} fontSize={'lg'}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore
                </Text>
                <Stack spacing={4}
                divider={
                    <StackDivider borderColor={COLORS.darkAmethyst}/>
                }>
                </Stack>
                </Stack>
                <Flex>
                    <Image rounded={'md'} alt={'feature image'} src={pic} objectFit={'cover'}/>
                </Flex>
            </SimpleGrid>
        </Box>





        // <Box 
        // position={"relative"} 
        // height={"400px"} 
        // background={"hsl(271, 49%, 44%)"}>
        // <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>About</Heading>
        // <Stack>
        //     <VStack display={"flex"}>
        //         <Text color={COLORS.offWhite} display={"flex"} flexDirection={"column"} fontSize='lg'>
        //             Video games are a huge market across the globe, where anyone in your family could be a gamer, young or old. Because of this, gaming can be used to bring people together and there is a need to facilitate that growth and also allow others to find like-minded individuals.
        //         </Text>
        //     </VStack>
        // </Stack>
        // </Box>
    )
}