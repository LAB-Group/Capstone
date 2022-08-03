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
              <UsersPosts key={index} post={post} />
            ))}
          </VStack>
        </Box>
        </Stack>
        
      );
}