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
import { COLORS } from '../colors';

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
    
    <Container mt={3} centerContent minWidth="50vw" w="75px" pb={8}>
      <Box
              key="1"
              borderWidth="1px"
              shadow="md"
              bg={"hsl(0,0%,98%)"}
              position="relative"
              align="center"
              rounded="md"
              borderRadius="5px"
              maxW='800px'
              mt={8}
              mb={2}
              pt={10}
              pb={2}
              border='1px' 
              borderColor='gray.200'
              
              w="75vw"
            >
      <VStack spacing={5} mx={5} >
  
      <FormControl variant="floating">
      
        <Input
          id="postTitle"
          type="text"
          placeholder='Title'
          variant={'filled'}
          focusBorderColor="purple.400"
          name="postTitle"
          defaultValue={createPostForm.postTitle}
          onChange={handleOnInputChange}
        />
      </FormControl>
      <Divider w={['150px','300px','450px','600px','750px']}/>
      <FormControl >
    
        <Textarea
          id="postContent"
          name="postContent"
          type="text"
          placeholder='Comment'
          variant={'filled'}
          focusBorderColor="purple.400"
          defaultValue={createPostForm.postContent}
          onChange={handleOnInputChange}
        />
      </FormControl>
      
       <Button colorScheme="purple" mt={1} w="350px"  variant='ghost' onClick={handleOnSubmit}>
        Post
      </Button>
      </VStack></Box></Container>
    
    
     
   
    </ChakraProvider>
  );
}

