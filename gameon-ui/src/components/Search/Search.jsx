import { Box, Heading, Input, Button, Container, Wrap, Badge, CheckboxGroup, Checkbox, useCheckbox, HStack } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

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
      <Input name='searchInput' type='text' value={searchInput} onChange={handleOnInputChange}/>
    </Box>
  );
}
