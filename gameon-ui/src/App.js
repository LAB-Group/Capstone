import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
// import Hero from "./components/Hero/Hero"
// import NavBar from './components/NavBar/NavBar';
import Apps from './components/Apps/Apps';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Apps />
    </ChakraProvider>
  );
}

export default App;
