import * as React from 'react';
import { useState } from 'react';
import apiClient from '../../services/apiClient';
import {
  Input,
  Textarea,
  Image,
  Container,
  Spacer,
  FormControl,
  FormLabel,
  Button,
  extendTheme,
  ChakraProvider,
  VStack,Box,Stack,HStack,Skeleton, Divider
} from '@chakra-ui/react';

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
  
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
});

export default function PostsForm({event, eventId}) {
  const [errors, setErrors] = useState({});
  const [createPostForm, setCreatePostForm] = useState({
    postTitle: '',
    postContent: '',
  });

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));

    const { data, error } = await apiClient.createNewPost({
      eventId: eventId,
      postTitle: createPostForm.postTitle,
      postContent: createPostForm.postContent,
    });
    if (error) setErrors(e => ({ ...e, form: error }));
    window.location.reload();
  };

  const handleOnInputChange = event => {
    setCreatePostForm(createPostForm => ({
      ...createPostForm,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <ChakraProvider theme={theme}>
      <Divider/>
    
    <Container mt={3} centerContent minWidth="50vw" w="100vw">
      <Box
              key="1"
              borderWidth="1px"
              shadow="md"
              bg="#fbfdff"
              position="relative"
              align="center"
              rounded="md"
              borderRadius="5px"
              maxW='1500px'
              mt={8}
              mb={2}
              p={10}
              
              w="75vw"
            >
      <VStack spacing={5} w='700px'>
  
      <FormControl variant="floating">
      
        <Input
          id="postTitle"
          type="text"
          w='900px'
          variant='unstyled'
          focusBorderColor="purple.400"
          name="postTitle"
          defaultValue={createPostForm.postTitle}
          onChange={handleOnInputChange}
        />
      </FormControl>
      <FormControl >
    
        <Textarea
          id="postContent"
          name="postContent"
          type="text"
          variant='unstyled'
          
          focusBorderColor="purple.400"
          defaultValue={createPostForm.postContent}
          onChange={handleOnInputChange}
        />
      </FormControl>
      
       
      </VStack></Box><Button colorScheme="purple" mt={1} w="350px" onClick={handleOnSubmit}>
        Submit
      </Button></Container>
    
    
     
   
    </ChakraProvider>
  );
}

