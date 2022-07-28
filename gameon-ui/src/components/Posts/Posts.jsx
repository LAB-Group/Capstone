import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import {
  Textarea, Image, Container, Button,
  HStack, Text, Box, Heading, VStack, 
  Modal, ModalOverlay, ModalFooter, 
  ModalBody, ModalContent, ModalHeader, 
  ModalCloseButton, useDisclosure, ButtonGroup, 
  Stack, Skeleton, Divider, Badge, Flex
} from '@chakra-ui/react';
import PostReply from './PostReply';

// Located in EventPage file

export default function Posts({ post, eventId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postReplies, setPostReplies] = useState([]);
  const [errors, setErrors] = useState(null);
  const [createReplyForm, setCreateReplyForm] = useState({
    replyContent: '',
  });

  let date = post.postCreatedAt;
  let newDate = new Date(date);
  let postDate = newDate.toLocaleDateString('en-US');
  let time = newDate.toLocaleTimeString('en-US');

  useEffect(() => {
    const fetchPostReplies = async () => {
      const { data, error } = await apiClient.listAllRepliesByEventId(
        eventId,
        post.postId
      );
      if (data) {
        setPostReplies(data.replies);
      }
      if (error) setErrors(error);
    };
    fetchPostReplies();
  }, []);

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));

    const { data, error } = await apiClient.createPostReply({
      eventId: eventId,
      postId: post.postId,
      replyContent: createReplyForm.replyContent,
    });
    if (error) setErrors(e => ({ ...e, form: error }));
    onClose()
    window.location.reload();
  };

  const handleOnInputChange = event => {
    setCreateReplyForm(createReplyForm => ({
      ...createReplyForm,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container centerContent>
      <Box 
        borderWidth="1px" 
        shadow="md" 
        bg="#fbfdff"
        position="relative"
        rounded="md"
        borderRadius="5px"
        minW='1000px'
        pb={2}
        m={8}
      >         
        <Stack isInline justifyContent="space-between" mt={2} pl={5} pr={5}>
            <Box minW="100%">      
                <Stack isInline align="center" marginBottom="5px">
                  <HStack spacing={3}>
                    <Flex justifyContent={{base: "center", md: "end",}} mt={-16}>
                      <Image  w={20} mt={8} borderRadius="50%" src={post.creatorImageUrl}/>
                    </Flex>
                    <Text fontWeight={'bold'} >@{post.creatorUsername}</Text>
                      {/* // <Image size="sm" width="2em" height="2em" borderRadius="50%" src={post.creatorImageUrl} /> */}
                    </HStack>
                    
                  </Stack>
          
                  
                  
                  <Box pl="10px">
                    <Stack direction="row">
                    <Heading height="16px"  pb={10} width="100%">{post.postTitle}</Heading>
                    <HStack>
                   <Badge variant='subtle' colorScheme='purple'>
                   {postDate}
                    </Badge>
                    <Badge variant='subtle' colorScheme='purple'>
                    {time}
                    </Badge>
                    </HStack>
                    </Stack>
                    <Divider w="950px"/>
                    
                      <Box>
                      <Text  mt={2} minH="14px" width="80%">{post.postContent}</Text>
                    </Box>
                  </Box>
                </Box>
              </Stack>
              <Box ml="55em" >
              <Button variant='ghost' onClick={onOpen}>Reply</Button></Box>
            </Box>
      {/* <Box>
        <HStack>
          <VStack>
            <Text fontWeight={'bold'}>{post.creatorUsername}</Text>
            <Image
              borderRadius={'lg'}
              w="80px"
              h="80px"
              borderWidth="9px"
              src={post.creatorImageUrl}
            />
            <Text>{postDate}</Text>
            <Text>{time}</Text>
          </VStack>
          <VStack>
            <Heading as={'h3'} size="md" display={'flex'}>
              {post.postTitle}
            </Heading>
            <Text>{post.postContent}</Text>
          </VStack>
        </HStack>
      </Box> */}
       {postReplies?.map((postReply, index) => (
          <PostReply key={index} postReply={postReply} eventId={eventId} />
        ))}
        <Divider w='1200px'/>
        <VStack>
        
       
        {/* {posts?.length ? (
            <Box>
                <Text>No Posts available</Text>
            </Box>
            ) : null} */}
        
        
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reply</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea name="replyContent" defaultValue={createReplyForm.replyContent} onChange={handleOnInputChange} />
            </ModalBody>
            <ModalFooter>
                <ButtonGroup margin={2} >
                    <Button onClick={handleOnSubmit}>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ButtonGroup>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
}
