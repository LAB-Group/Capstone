import * as React from 'react';
import { useState, useEffect } from 'react';
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
  HStack,
  Text,
  Box,
  Heading,
  VStack, Modal, ModalOverlay, ModalFooter, ModalBody, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, ButtonGroup,Stack, Skeleton, Divider, Badge
} from '@chakra-ui/react';
import PostReply from './PostReply';

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
    <Container centerContent minWidth="65vw">
      <Box
              key="1"
              cursor="pointer"
              borderWidth="1px"
              shadow="md"
              bg="#fbfdff"
              position="relative"
              rounded="md"
              borderRadius="5px"
              w='1000px'
              mt={2}
              mb={2}
            >
         
              <Stack isInline justifyContent="space-between" mt={2} p={5}>
                <Box minW="100%">
                  <HStack spacing="640px">
                  <Stack isInline align="center" marginBottom="5px">
                    <Box>
                      <Image size="sm" width="2em" height="2em" borderRadius="50%" src={post.creatorImageUrl} />
                    </Box>
                    <Text fontWeight={'bold'} >@{post.creatorUsername}</Text>
                  </Stack>
                  <HStack>
                   <Badge variant='subtle' colorScheme='purple'>
                   {postDate}
                    </Badge>
                    <Badge variant='subtle' colorScheme='purple'>
                    {time}
                    </Badge>
                    </HStack>
                  </HStack>
                  <Divider ml={8} w="900px"/>
                  <Box pl="2.5em">
                    <Heading height="16px" pb={10} width="100%">{post.postTitle}</Heading>
                    <Stack spacing={2} mt={1} isInline alignItems="center">
                      <Text height="14px" width="80%">{post.postContent}</Text>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
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
      <VStack>
        {postReplies?.map((postReply, index) => (
          <PostReply key={index} postReply={postReply} eventId={eventId} />
        ))}
        {/* {posts?.length ? (
            <Box>
                <Text>No Posts available</Text>
            </Box>
            ) : null} */}
        <Button onClick={onOpen}>Reply to this thread</Button>
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
