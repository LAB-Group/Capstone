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
} from '@chakra-ui/react';

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
    <Container centerContent minWidth="50vw">
      <FormControl variant="floating">
        {createPostForm.postTitle.length > 0 ? (
          <FormLabel transform="scale(0.85) translateY(-21px)">
            Post Title
          </FormLabel>
        ) : (
          <FormLabel>Post Title</FormLabel>
        )}

        <Input
          id="postTitle"
          type="text"
          focusBorderColor="purple.400"
          name="postTitle"
          defaultValue={createPostForm.postTitle}
          onChange={handleOnInputChange}
        />
      </FormControl>
      <FormControl variant="floating">
        {createPostForm.postContent.length > 0 ? (
          <FormLabel transform="scale(0.85) translateY(-21px)">
            Post Content
          </FormLabel>
        ) : (
          <FormLabel htmlFor="postContent">Post Content</FormLabel>
        )}
        <Textarea
          id="postContent"
          name="postContent"
          type="text"
          focusBorderColor="purple.400"
          defaultValue={createPostForm.postContent}
          onChange={handleOnInputChange}
        />
      </FormControl>
      <Button colorScheme="purple" mt={1} w="350px" onClick={handleOnSubmit}>
        Submit
      </Button>
    </Container>
  );
}

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