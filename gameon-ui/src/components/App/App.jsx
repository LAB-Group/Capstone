import * as React from "react"
import {
    ChakraProvider,
    VStack,
  } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import { EventContextProvider } from "../../contexts/event"
import Home from "../Home/Home"
import NavBar from "../NavBar/NavBar"
import ProfilePage from "../ProfilePage/ProfilePage"
import EventPage from "../Events/EventPage";
import Footer from "../Footer/Footer"

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
        <VStack>     
        <BrowserRouter>
        <NavBar/>
        <Routes>
        
            {/* Home */}
            <Route path="/" element={<Home/>}/>
            
            {/* ProfilePage */}
            <Route path="/profile/*" element={user?.email?<ProfilePage/>:<></>}/>
<<<<<<< HEAD

            {/* EventFeed */}
            <Route path={"/events/:eventId"} element={<EventPage />}/>

=======
    
>>>>>>> main-test
        </Routes>

        {/* Footer */}
        <Footer/>
        </BrowserRouter> 
        </VStack>
        </ChakraProvider>
        
    )
}