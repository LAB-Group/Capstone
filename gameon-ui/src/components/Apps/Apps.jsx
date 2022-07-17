import * as React from "react"
import {
    ChakraProvider,
    VStack,
  } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../Home/Home"
import NavBar from "../NavBar/NavBar"

export default function Apps(){
    return( 
        <ChakraProvider>
        <VStack >     
       <BrowserRouter>
       <NavBar/>
        <Routes>
            <Route path="/" element={
                <Home/>
            }/>
        </Routes>
       </BrowserRouter> 
        </VStack>
        </ChakraProvider>
        
    )
}