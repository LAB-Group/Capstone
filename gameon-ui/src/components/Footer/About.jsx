import * as React from "react"
import {Box, Heading, SimpleGrid, Stack, StackDivider, Flex,  VStack, HStack, Image, Text, Highlight} from "@chakra-ui/react"
import { COLORS } from "../colors"
import pic from "../../media/Logo.png"
// import { Link } from "react-router-dom"

export default function About(){
    return (
        <Box width={"100%"} pt={12}
            // css={{
            //     "position": "relative",
            //     "transform": "translateX(150px)",
            //     "opacity": 0,
            //     "transition": "2s all ease"
            // }}
            // _active={{
            //     "transform": "translateX(0)",
            //     "opacity": 1
            // }}
        
        >
            <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>About</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} background={"hsl(255, 50%, 21%)"} roundedTop={"25px"}>
                <Stack spacing={4}>
                {/* <Text
                    textTransform={'uppercase'}
                    color={'blue.400'}
                    fontWeight={600}
                    fontSize={'sm'}
                    bg={COLORS.offWhite}
                    p={2}
                    alignSelf={'flex-start'}
                    rounded={'md'}>
                    About us
                </Text> */}
                <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite}>GameOn</Heading>
                <Text fontFamily={"mono, sans-serif"} color={COLORS.offWhite} fontSize={'lg'}>
                    
                    <Highlight query={"tempor"} styles={{backgroundColor:COLORS.darkAmethyst}}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore
                    </Highlight>
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

    )
}