import { Box, Heading, Input, Button, FormLabel, Container, Wrap, Badge, CheckboxGroup, Checkbox, useCheckbox, HStack,  extendTheme } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';


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


export default function Search({games, setGames}) {
  const [errors, setErrors] = useState({})
  const [searchInput, setSearchInput] = useState("")
  // const [games, setGames] = useState([])
  const [listGames, setListGames] = useState([])

  const handleIsSelected = event => {

    // NEED TO ERROR CHECK AND NOT ADD DUPLICATE
      setGames(curGames => ([...curGames, event.target.value]))
      setListGames([])
      setSearchInput("")

  }

  const handleOnInputChange = event => {
    setSearchInput(event.target.value)
  }
 

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }))

    const { data, error } = await apiClient.searchGame({searched:searchInput})

    setListGames([...data.games])
  }
  console.log("REGISTERED LIST",games)

  // console.log(games[0]["cover"]["url"])
  //game["cover"].url
 console.log(searchInput)
  return (
    <Box>
      <HStack marginBottom={2}>
        <SearchBar searchInput={searchInput} value={searchInput} handleOnInputChange={handleOnInputChange} />
        <Button colorScheme='purple' mr={3} onClick={handleOnSubmit} >Search</Button>
      </HStack>
      
      <Wrap>
        {listGames?.map((game, index) => (
            <Button onClick={handleIsSelected} value={game.id} key={index}>{game.name}</Button>
        ))}
      </Wrap>
    </Box>
  );
}

function SearchBar({searchInput, handleOnInputChange}) {
  return (
    <Box>
      {searchInput.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Game</FormLabel>
         : 
        <FormLabel>Event Game</FormLabel>}
      <Input name='searchInput' type='text' w="610px" focusBorderColor='purple.400' value={searchInput} onChange={handleOnInputChange}/>
    </Box>
  );
}
