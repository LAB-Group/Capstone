import { Box, Heading, Input, Button, FormLabel, Container, Wrap, Badge, CheckboxGroup, Checkbox, useCheckbox, HStack,  extendTheme, Tag, FormControl, TagLabel, TagCloseButton, VStack } from '@chakra-ui/react';
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


export default function Search({selectedGames, setSelectedGames}) {
  const [errors, setErrors] = useState({})
  const [searchInput, setSearchInput] = useState("")
  const [listGames, setListGames] = useState([])
  const [selectedGamesNames, setSelectedGamesNames] = useState([])

  const handleOnInputChange = event => {
    setSearchInput(event.target.value)
  }  

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }))

    const { data, error } = await apiClient.searchGame({searched:searchInput})

    setListGames([...data.games])
  }

  return (
    <Container centerContent>
      
        <SearchBar searchInput={searchInput} value={searchInput} handleOnInputChange={handleOnInputChange} handleOnSubmit={handleOnSubmit} selectedGames={selectedGames} setSelectedGames={setSelectedGames} selectedGamesNames={selectedGamesNames} setSelectedGamesNames={setSelectedGamesNames}/>
        
      <Wrap w="700px">
        {listGames?.map((game, index) => (
            <Button onClick={() =>{setSelectedGames( arr => [...arr, game.id]);setSelectedGamesNames( arr => [...arr, game.name])}} value={game.id} key={index}>{game.name}</Button>
            
        ))}
      </Wrap>
    </Container>
  );
} 


 

function SearchBar({searchInput, handleOnInputChange,handleOnSubmit, selectedGames, setSelectedGames, selectedGamesNames, setSelectedGamesNames}) {
  
  function removeGame (id) {
    const copyArr = [...selectedGames]
    const copyNameArr = [...selectedGamesNames]
    const index = copyArr.indexOf(id);
   copyArr.splice(index, 1)
   copyNameArr.splice(index, 1)
   setSelectedGames([...copyArr])
  setSelectedGamesNames([...copyNameArr])
  }

  return (
   
      
   <VStack spacing={2}>
     <Wrap w="700px">
       
     {selectedGames?.map((id, index) => (
          <Tag
            size="md"
            variant='subtle'
            key={index}
            borderRadius='full'
            colorScheme='purple'
          >
            <TagLabel>{selectedGamesNames[selectedGames.indexOf(id)]}</TagLabel>
            <TagCloseButton onClick={() => removeGame(id)}/>
          </Tag>
         ))}</Wrap>
    
    
      <Box>
     
       <FormControl variant="floating"mt={2}>
      {searchInput.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Game</FormLabel>
         : 
        <FormLabel>Event Game</FormLabel>}
         <HStack marginBottom={2}>
      <Input name='searchInput' type='text' w="608px" focusBorderColor='purple.400' value={searchInput} onChange={handleOnInputChange}/>
      <Button colorScheme='purple' onClick={handleOnSubmit} >Search</Button>
  </HStack></FormControl></Box>
 </VStack>
  );
}
