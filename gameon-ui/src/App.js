import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Hero from "./components/Hero/Hero"
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
        <NavBar />
        <Hero />

    </ChakraProvider>
  );
}

export default App;
