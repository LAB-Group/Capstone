import * as React from "react"
import { Box, Container, Flex } from "@chakra-ui/react"
import About from "../Footer/About"

export default function Footer(){
    return (
        <Container>
            <Flex flexWrap="wrap" p="4rem 1.6rem" justifyContent="center">
                <Box id="about">
                <About/>
                </Box>
            </Flex>
        </Container>
        //<About/>
    )
} 