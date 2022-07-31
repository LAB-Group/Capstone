import * as React from "react"
import { Container, Box, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react"
import About from "../Footer/About"
import { COLORS } from "../colors"
// import ContactUs from "../Footer/ContactUs"

export default function Footer(){
    return (
            <Box backgroundColor={COLORS.ultraViolet} color={COLORS.offWhite}>
                <Heading>THIS IS THE FOOTER</Heading>
                <Container maxWidth={"6xl"} paddingY={10}>
                    <SimpleGrid columns={{base: 1, sm: 2, md: 4}} spacing={8}>
                        <Stack align={"flex-start"}>

                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>           
        //<About/>
    )
} 