import * as React from 'react';
import {
  Box,
  Text,
  Container,
  Stack,
  VStack,
} from '@chakra-ui/react';
import UsersPosts from './UsersPosts';
import {COLORS} from "../colors"

export default function UsersPostsFeed({ posts }) {
    return (
        <Stack>
        <Box width={"100%"}>
          {/* <Text color={COLORS.offWhite}>I'm Here</Text> */}
          <VStack>
            {posts?.map((post, index) => (
              <Box mt={1} key={index}>
                <UsersPosts key={post.id} post={post} />
              </Box>
            ))}
          </VStack>
        </Box>
        </Stack>
        
      );
}