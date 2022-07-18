import * as React from "react"
import { Heading } from "@chakra-ui/react"
import { Slide } from "react-slideshow-image"
import pic from "../../media/evo.jpg"
import { Container, Box, Image } from '@chakra-ui/react'
import "react-slideshow-image/dist/styles.css"

export default function Hero() {
    return(
        <Container>
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
        <Container>
            <Slide>
                {slideImages.map((slideImage, idx) => (
                <Box  
                    maxW="1200px" 
                    height="360px"  
                    bgPosition="center" 
                    objectFit={'cover'} 
                    bgSize="100%" 
                    bgRepeat="no-repeat"
                >
                    <Image src={slideImage} key={idx} boxSize='500px'/>

                </Box>
                ) 
                )}
            </Slide>
        </Container>

    )
}