import * as React from 'react';
import {
  Container,
  VStack,Stack,
  Heading
} from '@chakra-ui/react';
import UserPosts from './UserPosts';

export default function UserPostsFeed({ posts }) {
    return (
        <VStack>
        <Container centerContent minWidth="85vw">
          <VStack>
            {posts?.map((post, index) => (
              <UserPosts key={index} post={post} />
            ))}
            {/* {posts?.length ? (
              <Box>
                <Text>No Posts available</Text>
              </Box>
            ) : null} */}
          </VStack>
        </Container>
        </VStack>
      );
}