import * as React from 'react';
import {
  Container,
  VStack,
} from '@chakra-ui/react';
import UsersPosts from './UsersPosts';

export default function UsersPostsFeed({ posts }) {
    return (
        <VStack>
        <Container centerContent minWidth="85vw">
          <VStack>
            {posts?.map((post, index) => (
              <UsersPosts key={index} post={post} />
            ))}
          </VStack>
        </Container>
        </VStack>
      );
}