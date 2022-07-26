import * as React from "react"
import { Slide } from "react-slideshow-image"
//import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/pagination"
// import { Pagination } from "swiper"
import pic from "../../media/evo.jpg"
import { Container, Box, Image, Text, Flex } from '@chakra-ui/react'
import "react-slideshow-image/dist/styles.css"
export default function Hero() {
    return(
        // Shrinks container to 480px currently
        <Container maxW="3600px" minW="480px">
            <Flex flexDirection="column" alignItems="center">
                <Slideshow/> 
            </Flex> 
        </Container>
    )
}

function Slideshow () {
    
    const guiltyGear = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dcead6af-f80b-434a-95ff-e4f642e8da10/del9x8v-a10a328a-386b-49b5-b616-82cee562b577.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RjZWFkNmFmLWY4MGItNDM0YS05NWZmLWU0ZjY0MmU4ZGExMFwvZGVsOXg4di1hMTBhMzI4YS0zODZiLTQ5YjUtYjYxNi04MmNlZTU2MmI1NzcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-cwuEFvPq_T4WELqZujyeoQtUtdqodsVhVB5e2o0Q1U'
    const blazBlue = 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_auto/ncom/en_US/games/switch/b/blazblue-cross-tag-battle-switch/hero'
    const slideImages = [
        pic,guiltyGear,blazBlue
    ]
    return (
        
        //   Old Slideshow code
        // Widen container's width 
        <Container maxW="3600px" minW="480px" >
            <Slide width="100%">
                {slideImages.map((slideImage, idx) => (
                    <Box 
                        key={idx}
                        height="480px"  
                        bgPosition="center" 
                        objectFit={'cover'}  
                        bgRepeat="no-repeat"
                    >
            
                        <Image src={slideImage} key={idx} width={"100%"} height={"100%"} borderRadius="lg"/>
                    </Box>
                    ) 
                    )}
                </Slide>
            </Container>
            
        //Learning Swiper 
        
            // <>
            //     <Swiper 
            //      pagination={{
            //         dynamicBullets: true,
            //       }}
            //       modules={[Pagination]}
            //       className="mySwiper"
            //     >
            //         {slideImages.map((slideImage, idx) => (
            //         <SwiperSlide> 
                   
            //             <Image src={slideImage} key={idx} width={"100%"} height={"100%"} borderRadius="lg"/>
            //             </SwiperSlide>
            //         ) 
            //             )}
                    
            // </Swiper>
            // </>


    )
}