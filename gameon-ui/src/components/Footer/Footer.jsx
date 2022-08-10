import * as React from "react"
import {HashLink as Link } from 'react-router-hash-link'
import { Container, Box, Text, Stack } from "@chakra-ui/react"
import { COLORS } from "../colors"
// import ContactUs from "../Footer/ContactUs"

export default function Footer(){
    return (
            <Box marginTop={"auto"} marginBottom={"auto"} paddingX={"10%"} fontFamily={"mono, sans-serif"}  backgroundColor={COLORS.indigo} color={COLORS.offWhite}>
                {/* <Heading>THIS IS THE FOOTER</Heading> */}
                <Container margin={0} as={Stack} maxWidth={"100%"} paddingY={5} direction={{ base: 'column', md: 'row' }} spacing={4}
                    justify={{ base: "center", md: "space-between" }} align={{ base: 'center', md: 'center' }}>
                    <Stack direction={'row'} spacing={6}>
                        <Link to="/">GameOn</Link>
                        <Link smooth to="#about">About</Link>
                        <Link smooth to="#events">Events</Link>
                    </Stack>
                    <Text>© 2022 GameOn. All rights reserved</Text>
                </Container>
            </Box>           
        //<About/>
    )
} 