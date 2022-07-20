import * as React from "react"
import { Heading, Text } from "@chakra-ui/react"
import { Slide } from "react-slideshow-image"
import pic from "../../media/evo.jpg"
import { Container, Box, Image } from '@chakra-ui/react'
import "react-slideshow-image/dist/styles.css"

export default function Hero() {
    return(
        // Shrinks container to 480px currently
        <Container maxW="3600px" minW="480px">
            <Slideshow/>
        </Container>
    )
}

function Slideshow () {
    const blazBlue = 'https://cdn.akamai.steamstatic.com/steam/apps/702890/capsule_616x353.jpg?t=1589346849'
    const tekken = 'https://image.api.playstation.com/vulcan/img/cfn/11307IKss2-L1ZsygmUb7abhTx6LCzjhXXgmYVEoToXezKywuFs5YyNfonN1rSwKBPZhRvQEOB6aBTyDHKLeHqRVEXcyA1Vz.png'
    const slideImages = [
        pic,blazBlue,tekken
    ]
    return (


        // Widen container's width 
        <Container maxW="3600px" minW="480px">
            <Slide width="100%">
                {slideImages.map((slideImage, idx) => (
                <Box   
                    height="480px"  
                    bgPosition="center" 
                    objectFit={'cover'}  
                    bgRepeat="no-repeat"
                >

                    <Image src={slideImage} key={idx} objectFit='cover' width={"100%"} height={"100%"}/>
                </Box>
                ) 
                )}
            </Slide>
        </Container>

    )
}