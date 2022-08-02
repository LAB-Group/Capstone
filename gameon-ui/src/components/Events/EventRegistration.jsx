import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuthContext } from '../../contexts/auth';
import { Container, Button, FormLabel, Checkbox, Alert, AlertIcon, Heading, FormControl,
  AlertDescription, CheckboxGroup, Box, Stack, Input, extendTheme, ChakraProvider, Grid
} from '@chakra-ui/react';
import { COLORS } from "../colors"

export default function EventRegistration({ games }) {
  console.log("games: ", games)
  const { user } = useAuthContext()
  const { eventId } = useParams()
  const [checkedItems, setCheckedItems] = useState([])
  const [errors, setErrors] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [action, setAction] = useState()

  useEffect(() => {  
    const setItems = async() => {
      if(games) {
        setCheckedItems(new Array(games.length).fill(false))
      }
    }
    setItems()

    const getIsRegistered = async() => {
      const { data, error } = await apiClient.isUserRegistered(eventId, user.id)
       if(data) {
        setErrors(null)
        setIsRegistered(true)
       }
       if (error) {
        setErrors(error)
        setIsRegistered(false)
       }   
    }
    getIsRegistered()    
  }, [games, user.id, eventId]);

  function replaceAt(array, index, value) {
    const newArray = array.slice(0)
    newArray[index] = value
    return newArray
  }

  function getGamesRegistered(gameArray) {
    let registeredArray = []
    for(let i = 0; i < gameArray.length; i++) {
      if(gameArray[i]) {
        registeredArray.push(games[i].id)
      }   
    }
    return registeredArray
  }

  const handleOnSubmit = async () => {
    setErrors(error => ({...error, form: null}))
    const { data, error } = await apiClient.registerForEvent({
      eventId: eventId,
      eventGame: getGamesRegistered(checkedItems),
    })
    if(data) {
      setIsRegistered(true)
      setAction(true)
    }
    if(error) setErrors((e) => ({ ...e, form: error}))
  }

  const handleWithdraw = async () => {
    setErrors(error => ({...error, form: null}))
    const { data, error } = await apiClient.withdrawFromEvent({
      eventId: eventId,
    })
    if(data) {
      setIsRegistered(false)
      setAction(false)
    }
    if (error) setErrors((e) => ({ ...e, form: error}))
  }

  return (
    <ChakraProvider theme={theme}>
    {isRegistered ? 
    <Container centerContent>
      
      <Button 
          margin={2} 
          background={"hsl(271, 54%, 52%)"} 
          borderColor={"hsl(271, 49%, 44%)"} 
          color={"hsl(0,0%,100%)"} 
          marginRight={3} 
          _hover={{
            "background":"hsl(271, 49%, 44%)", 
            "borderColor":"hsl(271, 49%, 44%)", 
            "color":"hsl(0,0%,70%)" 
          }}
          onClick={handleWithdraw}>Withdraw</Button>

    </Container>
    
    :
    <Container centerContent>
    <FormLabel htmlFor="eventGame">
      <Heading color={COLORS.indigo}>Event Registration</Heading>
    </FormLabel>
    <Box>
        <Stack>
        <FormControl variant="floating">
          <FormLabel transform="scale(0.85) translateY(-21px)" >Email</FormLabel>
          <Input marginBottom={1} onFocusBorderColor='purple.400' value={user.email} isReadOnly />
        </FormControl>
        <FormControl variant="floating">
          <FormLabel transform="scale(0.85) translateY(-21px)">Username</FormLabel>
          <Input marginBottom={1} onFocusBorderColor='purple.400' value={user.username} isReadOnly />
          </FormControl>
          <FormControl variant="floating">
          <FormLabel transform="scale(0.85) translateY(-21px)">Name</FormLabel>
          <Input marginBottom={1} onFocusBorderColor='purple.400' value={(user.firstName + " " + user.lastName)} isReadOnly />
          </FormControl>
            <Grid spacing={4}>
                <CheckboxGroup size="lg" isDisabled={action || isRegistered}>
                    {games?.map((game, index) => (
                      <Checkbox colorScheme='purple' mt={2} key={game.gameId} value={game.gameName} isChecked={checkedItems[index]} 
                      onChange={e => setCheckedItems(replaceAt(checkedItems, index, e.target.checked))}>
                      {game.gameName}
                      </Checkbox>
                    ))}
                </CheckboxGroup>
            </Grid>
            </Stack>
        
    </Box>
    <Box position={"relative"} paddingLeft={"20px"}>
        {
          action === true ? 
          <AlertBox message={"Registered successfully!"}/>
          : action === false ?
          <AlertBox message={"Withdrew successfully!"}/>
          : null
        }
        <Button 
          margin={2} 
          background={"hsl(271, 54%, 52%)"} 
          borderColor={"hsl(271, 49%, 44%)"} 
          color={"hsl(0,0%,100%)"} 
          marginRight={3} 
          _hover={{
            "background":"hsl(271, 49%, 60%)", 
            "borderColor":"hsl(271, 49%, 44%)", 
            "color":"hsl(0,10%,100%)" 
          }}
          onClick={handleOnSubmit}>Register</Button>
        {/* {
          isRegistered ? 
          <Button 
          margin={2} 
          background={"hsl(271, 54%, 52%)"} 
          borderColor={"hsl(271, 49%, 44%)"} 
          color={"hsl(0,0%,100%)"} 
          marginRight={3} 
          _hover={{
            "background":"hsl(271, 49%, 44%)", 
            "borderColor":"hsl(271, 49%, 44%)", 
            "color":"hsl(0,0%,70%)" 
          }}
          onClick={handleWithdraw}>Withdraw</Button>
          : 
          <Button 
          margin={2} 
          background={"hsl(271, 54%, 52%)"} 
          borderColor={"hsl(271, 49%, 44%)"} 
          color={"hsl(0,0%,100%)"} 
          marginRight={3} 
          _hover={{
            "background":"hsl(271, 49%, 60%)", 
            "borderColor":"hsl(271, 49%, 44%)", 
            "color":"hsl(0,10%,100%)" 
          }}
          onClick={handleOnSubmit}>Register</Button>
        }        */}
    </Box>
  </Container>
    }

    </ChakraProvider>
  );
}

export function AlertBox({ message }) {
  return (
    <Alert status='success'>
      <AlertIcon />
      <Box>
        <AlertDescription>
          {message}
        </AlertDescription>
      </Box>
    </Alert>
  )
}

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                // ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
              // ...activeLabelStyles
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
