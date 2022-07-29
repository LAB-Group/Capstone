import * as React from "react"
// import { Slide } from "react-slideshow-image"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/pagination"
// import { EffectFade, Pagination } from "swiper"
import pic from "../../media/Logo.png"
import background from "../../media/indigo.jpeg"
import { Box, Image, Heading, Text } from '@chakra-ui/react'
// import "react-slideshow-image/dist/styles.css"
export default function Hero() {

    return(
        <Box 
        width={"100%"}
        height={"auto"}
        display={"flex"} 
        flexDirection={"column"} 
        alignItems={"center"} 
        backgroundColor={"purple.900"} 
        backgroundPosition={"60%"}
        backgroundImage={background}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        textAlign={"center"}
        padding={"3rem"}
        borderBottomRadius={"15px"}
        >
            <Heading textTransform={"uppercase"} fontWeight={700} color={"whiteAlpha.900"}>
                Game on!
            </Heading>
            <Box width={"70px"} height={"4px"} backgroundColor={"purple.400"} marginleft={"lg"} marginRight={"lg"}></Box>
            <Text color={"whiteAlpha.900"} fontWeight={"semibold"}>Community through gaming</Text>
        </Box>
    )


    // Commented out Swiper slide
    // const guiltyGear = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dcead6af-f80b-434a-95ff-e4f642e8da10/del9x8v-a10a328a-386b-49b5-b616-82cee562b577.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RjZWFkNmFmLWY4MGItNDM0YS05NWZmLWU0ZjY0MmU4ZGExMFwvZGVsOXg4di1hMTBhMzI4YS0zODZiLTQ5YjUtYjYxNi04MmNlZTU2MmI1NzcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-cwuEFvPq_T4WELqZujyeoQtUtdqodsVhVB5e2o0Q1U'
    // const blazBlue = 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_auto/ncom/en_US/games/switch/b/blazblue-cross-tag-battle-switch/hero'
    // const slideImages = [
    //     pic,guiltyGear,blazBlue
    // ]
    // return (        
    //         <Container maxWidth={"1200px"} width={"100%"} height={"auto"} css={{
    //             ".swiper-pagination-bullet-active": {
    //                 "background-color": "#B794F4"
    //               },
    //             ".swiper-slide" :{
    //                 "width": "100%"
    //             }
    //         }}>
    //             <Swiper 
    //             spaceBetween={30}
    //             effect={"fade"}
    //             pagination={{
    //                 clickable: true,
    //                 color:"purple.400"
    //               }}
    //               modules={[EffectFade, Pagination]}
    //               className="mySwiper"
    //             >
    //                 {slideImages.map((slideImage, idx) => (
    //                     <SwiperSlide key={idx}> 
    //                     <Image src={slideImage} width={"100%"} height={"auto"} fit={"contain"}/>
    //                     </SwiperSlide>
    //                 ) 
    //                 )}
                    
    //             </Swiper>
    //         </Container>
    // )
}

// function Slideshow () {
    
    // const guiltyGear = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dcead6af-f80b-434a-95ff-e4f642e8da10/del9x8v-a10a328a-386b-49b5-b616-82cee562b577.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RjZWFkNmFmLWY4MGItNDM0YS05NWZmLWU0ZjY0MmU4ZGExMFwvZGVsOXg4di1hMTBhMzI4YS0zODZiLTQ5YjUtYjYxNi04MmNlZTU2MmI1NzcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-cwuEFvPq_T4WELqZujyeoQtUtdqodsVhVB5e2o0Q1U'
    // const blazBlue = 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_auto/ncom/en_US/games/switch/b/blazblue-cross-tag-battle-switch/hero'
    // const slideImages = [
    //     pic,guiltyGear,blazBlue
    // ]
    // return (
    //     //Learning Swiper 
        
            
    //         <Box maxW={"100%"} minW={"405px"} css={{
    //             ".swiper-pagination-bullet-active": {
    //                 "background-color": "#B794F4"
    //               },
    //             ".swiper-slide" :{
    //                 "width": "100%"
    //             }
    //         }}>
    //             <Swiper 
    //             spaceBetween={30}
    //             effect={"fade"}
    //             pagination={{
    //                 clickable: true,
    //                 color:"purple.400"
    //               }}
    //               modules={[EffectFade, Pagination]}
    //               className="mySwiper"
    //             >
    //                 {slideImages.map((slideImage, idx) => (
    //                     <SwiperSlide key={idx}> 
    //                     <Image src={slideImage} position={"relative"} width={"100%"} height={"500px"} objectFit={"cover"} borderRadius="lg"/>
    //                     </SwiperSlide>
    //                 ) 
    //                 )}
                    
    //             </Swiper>
    //         </Box>
            
        
        //   Old Slideshow code
        // Widen container's width 
        // <Container maxW="3600px" minW="480px" backgroundImage={"url(https://wallpaperaccess.com/full/1150850.jpg)"}>
        //     <Slide width="100%">
        //         {slideImages.map((slideImage, idx) => (
        //             <Box 
        //                 key={idx}
        //                 height="480px"  
        //                 bgPosition="center" 
        //                 objectFit={'cover'}  
        //                 bgRepeat="no-repeat"
        //             >
            
        //                 <Image src={slideImage} key={idx} width={"100%"} height={"100%"} borderRadius="lg"/>
        //             </Box>
        //             ) 
        //             )}
        //         </Slide>
        //     </Container>
            


//     )
// }