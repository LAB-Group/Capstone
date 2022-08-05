import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
// import Hero from "./components/Hero/Hero"
// import NavBar from './components/NavBar/NavBar';
import App from './components/App/App';
function Main() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}

export default Main;
