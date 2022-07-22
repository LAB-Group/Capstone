import { Box, Heading, Input, Button, Container, Wrap } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

export default function Search() {
  const [errors, setErrors] = useState({})
  const [searchInput, setSearchInput] = useState({searched:""})
  const [games, setGames] = useState({
    eventGame: [],
  })
  const [listGames, setListGames] = useState([])

  const handleOnInputChange = event => {
    setSearchInput(event.target.value)
  }

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }))

    const { data, error } = await apiClient.searchGame({searched:searchInput})
    // const { data, error } = await apiClient.searchForGame("guilty")
    // const data = await apiClient.searchForGame({searchInput:"guilty"})

    // if (error) setErrors(e => ({ ...e, form: error }))
    console.log("SEARCHINPUT",searchInput)
    setListGames([...data.games])
    console.log("LIST GAMES",data.games)
  }
  return (
    <Box>
      <Heading>Game Search Bar</Heading>
      <SearchBar searchInput={searchInput} value={searchInput} handleOnInputChange={handleOnInputChange} />
      <Button colorScheme='purple' mr={3} onClick={handleOnSubmit} >Submit</Button>
      <Wrap>
        {listGames?.map((game, index) => (
          <Box key={index}>{game.cover.url}</Box>
          // <Box key={index}>{Object.keys(game.cover).map}</Box>
        ))}

      </Wrap>
    </Box>
  );
}

function SearchBar({searchInput, handleOnInputChange}) {
  return (
    <Box>
      <Input name='searchInput' type='text' onChange={handleOnInputChange} />
    </Box>
  );
}
