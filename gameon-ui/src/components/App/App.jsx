import * as React from "react"
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import { EventContextProvider } from "../../contexts/event"
import Home from "../Home/Home"
import NavBar from "../NavBar/NavBar"
import ProfilePage from "../ProfilePage/ProfilePage"
import EventPage from "../Events/EventPage";
import Footer from "../Footer/Footer"
import background from "../../media/evo2.jpg"

export default function AppContainer() {
    return (
      <AuthContextProvider>
        <EventContextProvider>
          <App />
        </EventContextProvider>
      </AuthContextProvider>
    )
}

function App(){
    const { user, setUser } = useAuthContext()

    return( 
        <ChakraProvider>
        {/* Need to come back to this because of background image */}
        <Box backgroundPosition={"bottom"} backgroundImage={background} backgroundRepeat={"no-repeat"} backgroundAttachment={"fixed"} backgroundSize={"200%"}>     
        <BrowserRouter>
        <NavBar/>
        <Routes>
        
            {/* Home */}
            <Route path="/" element={<Home/>}/>
            
            {/* ProfilePage */}
            <Route path="/profile/*" element={user?.email?<ProfilePage/>:<></>}/>

            {/* EventFeed */}
            <Route path={"/events/:eventId"} element={<EventPage />}/>

        </Routes>

        {/* Footer */}
        <Footer/>
        </BrowserRouter>
        </Box> 
        </ChakraProvider>
        
    )
}