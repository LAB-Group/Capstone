import * as React from "react"
import { Box, Container, Flex } from "@chakra-ui/react"
import About from "../Footer/About"
// import ContactUs from "../Footer/ContactUs"

export default function Footer(){
    return (
        <Container>
            <Flex flexWrap="wrap" p="4rem 1.6rem" justifyContent="center">
                <Box id="about">
                <About/>
                </Box>
                {/* <Box id="contact">
                <ContactUs/>
                </Box> */}
            </Flex>
        </Container>
        //<About/>
    )
} 