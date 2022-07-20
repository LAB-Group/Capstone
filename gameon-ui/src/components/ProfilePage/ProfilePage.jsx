import * as React from "react"
import { Box,Image, Center, Text, VStack, Divider, HStack, Stack, Badge, Heading, Button, Container, useDisclosure, Modal} from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import profile from "../../media/elmo-burning.gif"
import EditProfile from "../EditProfile/EditProfile"
import { useAuthContext } from "../../contexts/auth"
 
// FIXME: Need to refactor below code and turn into different components
export default function ProfilePage(){
    const { user } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(

   <Container centerContent width={'100%'}>
        

    <Routes>
        <Route path="/profile/edit-profile" element={
            <EditProfile/>
        }/>
    </Routes> 

     <Stack direction = 'column'  spacing={7} align='stretch'>
       <Box w="1200px" h='300px'  p={4} borderRadius='sm'>
         <HStack spacing='24px'>
           <Box >
             <Image w='260px'h='260px' borderRadius='sm' borderWidth='9px' src={user.imageUrl}/>
           </Box>
           <Box w='1000px' h='200px'>
             <VStack p={5} spacing={4} >
                  <Box w= '810px' h='30px' ><Text>{user.firstName} {user.lastName}</Text></Box>
                   <Divider orientation='horizontal' />
                   <Box w= '810px' h='30px'  >Location</Box>
                   <Divider orientation='horizontal' />
                   <Box w= '810px' h='50px'  >Games played</Box>
                <Link to ="/profile/edit-profile">
                   <Button w= '810px' h='30px' borderRadius='sm' colorScheme='purple' variant='outline' onClick={onOpen} >Edit Profile</Button>
                </Link>

                <Modal isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose} /></Modal>

               </VStack>
           </Box>
        </HStack>
       </Box>


       <Text fontSize='3xl'>Upcoming Events</Text>
       <Divider orientation='horizontal' />

       <Box h='300px'borderRadius='sm'>
        <Box w ='300px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={profile} />
            <Box p='6'>
            <Box display='flex' alignItems='baseline'>
                <HStack spacing='56px'>
            <Heading size='md'>Event Title</Heading>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
                event date
            </Badge>
            </HStack>
            </Box>

        
        </Box>
    </Box>
       </Box>
       
       <Text fontSize='3xl'>Previous Events</Text>
       
       <Divider orientation='horizontal' />


       <Box h='300px'borderRadius='sm'>
        <Box w ='300px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={profile} />
            <Box p='6'>
            <Box display='flex' alignItems='baseline'>
                <HStack spacing='56px'>
            <Heading size='md'>Event Title</Heading>
            <Badge borderRadius='full' px='2' colorScheme='red'>
                event date
            </Badge>
            </HStack>
            </Box>

        
        </Box>
    </Box>
       </Box>
       <Text fontSize='3xl'>Post</Text>
       <Divider orientation='horizontal' />
       <Box h='700px'  borderRadius='sm'>
            
            <Center h='100px'>
                <Text fontSize='3xl'>No Post Found</Text>
            </Center>
       </Box>
       
         </Stack>
      </Container>
   )
}
