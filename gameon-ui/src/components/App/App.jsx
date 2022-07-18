import * as React from "react"
import {
    ChakraProvider,
    VStack,
  } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../Home/Home"
import NavBar from "../NavBar/NavBar"
import ProfilePage from "../ProfilePage/ProfilePage"

export default function App(){
    return( 
        <ChakraProvider>
        <VStack >     
        <BrowserRouter>
        <NavBar/>
        <Routes>
            {/* Home */}
            <Route path="/" element={
                <Home/>
            }/>
            {/* ProfilePage */}
            <Route path="/profile" element={
                <ProfilePage/>
            }/>
        </Routes>
        </BrowserRouter> 
        </VStack>
        </ChakraProvider>
        
    )
}