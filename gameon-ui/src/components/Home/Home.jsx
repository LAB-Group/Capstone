import * as React from "react"
import Hero from "../Hero/Hero"
import EventPage from "../Events/EventPage"
import { Image, Container, Spacer } from "@chakra-ui/react"

export default function Home(){
    return (
    
            <Container maxWidth="1200px" maxHeight="960px" >
            <Hero />
            <Spacer/>
            <EventPage />
            </Container>
            
        
    )
}

// function Swipershow() {
//   return (
//     <>
//       <Swiper
//         spaceBetween={30}
//         effect={"fade"}
//         navigation={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[EffectFade, Navigation, Pagination]}
//       >
//         <SwiperSlide>
//           <Image src={pic}/>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Image src={elmo}/>
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }