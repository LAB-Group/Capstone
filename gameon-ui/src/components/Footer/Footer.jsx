import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import About from "../Footer/About"
import { COLORS } from "../colors"
// import ContactUs from "../Footer/ContactUs"

export default function Footer(){
    return (
        <Box>
            <Flex flexWrap="wrap" justifyContent="center">
                {/* Moved About to Home.jsx */}
                {/* <Box id="contact">
                <ContactUs/>
                </Box> */}
            </Flex>
            <Box width={"200px"} backgroundColor={COLORS.ultraViolet}>
                <Text></Text>
            </Box>
            
        </Box>
        //<About/>
    )
} 