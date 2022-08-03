import {
  Box,
  Input,
  Button,
  FormLabel,
  Container,
  Wrap,
  HStack,
  extendTheme,
  Tag,
  FormControl,
  TagLabel,
  TagCloseButton,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { COLORS } from "../colors";

export default function Search({ selectedGames, setSelectedGames, selectedGamesNames, setSelectedGamesNames, selectedGamesPic, setSelectedGamesPic, selectedGamesSummary, setSelectedGamesSummary }) {
  const [errors, setErrors] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [listGames, setListGames] = useState([]);

  const handleOnInputChange = event => {
    setSearchInput(event.target.value);
  };

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));

    const { data, error } = await apiClient.searchGame({
      searched: searchInput,
    });

    setListGames([...data.games]);
  };

const clearSearch = async () => {
  setSearchInput('')
  setListGames([])
}

  return (
    <>
    {/* <Container centerContent maxW={'100%'}> */}
      <SearchBar
        searchInput={searchInput}
        value={searchInput}
        handleOnInputChange={handleOnInputChange}
        handleOnSubmit={handleOnSubmit}
        clearSearch={clearSearch}
        selectedGames={selectedGames}
        setSelectedGames={setSelectedGames}
        selectedGamesNames={selectedGamesNames}
        setSelectedGamesNames={setSelectedGamesNames}
        selectedGamesSummary={selectedGamesSummary}
        setSelectedGamesSummary={setSelectedGamesSummary}
        selectedGamesPic={selectedGamesPic}
        setSelectedGamesPic={setSelectedGamesPic}
      />
      <Container maxW={"100%"} maxH={'200px'} overflowY="auto" css={{
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#805AD5',
      borderRadius: '24px',
    },
  }} >
        <Wrap maxW={'100%'}>
          {listGames?.map((game, index) => (
            <Button
              onClick={() => {
                setSelectedGames(arr => [...arr, game.id]);
                setSelectedGamesNames(arr => [...arr, game.name]);
                setSelectedGamesSummary(arr => [...arr, game?.summary ? game.summary : ""]);
                setSelectedGamesPic(arr => [...arr, game.cover?.url ? game.cover.url : ""]);
              }}
              value={game.id}
              key={index}
              fontSize={'sm'}
            >
              {game.name}
            </Button>
          ))}
        </Wrap>
      </Container>
    {/* </Container> */}
    </>
  );
}

function SearchBar({
  searchInput,
  handleOnInputChange,
  handleOnSubmit,
  clearSearch,
  selectedGames,
  setSelectedGames,
  selectedGamesNames,
  setSelectedGamesNames,
  selectedGamesSummary,
  setSelectedGamesSummary,
  selectedGamesPic,
  setSelectedGamesPic
}) {
  function removeGame(id) {
    const copyArr = [...selectedGames];
    const copyNameArr = [...selectedGamesNames];
    const copySummArr = [...selectedGamesSummary];
    const copyPicArr = [...selectedGamesPic];
    const index = copyArr.indexOf(id);
    copyArr.splice(index, 1);
    copyNameArr.splice(index, 1);
    copySummArr.splice(index, 1);
    copyPicArr.splice(index, 1);
    setSelectedGames([...copyArr]);
    setSelectedGamesNames([...copyNameArr]);
    setSelectedGamesSummary([...copySummArr])
    setSelectedGamesPic([...copyPicArr]);
  }



  return (
    <VStack  w={'100%'} maxW={'100%'} spacing={2}>
      {/* Fixed it: The Tags were floating */}
      <Wrap w={'100%'} maxW={'100%'} maxHeight={"80px"} overflowY="auto" css={{
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#805AD5',
      borderRadius: '24px',
    },
  }}>
        {selectedGames?.map((id, index) => (
          <Tag
            size="md"
            variant="subtle"
            key={index}
            borderRadius="full"
            colorScheme="purple"
          >
            <TagLabel>{selectedGamesNames[selectedGames.indexOf(id)]}</TagLabel>
            <TagCloseButton onClick={() => removeGame(id)} />
          </Tag>
        ))}
      </Wrap>

      <Box w={'100%'} maxW={'100%'}>
        <FormControl variant="floating" mt={2}>
          {searchInput.length > 0 ? (
            <FormLabel transform="scale(0.85) translateY(-21px)">
              Games
            </FormLabel>
          ) : (
            <FormLabel>Games</FormLabel>
          )}
          <HStack maxW={'100%'} marginBottom={2}>
            <Input
              name="searchInput"
              type="text"
              maxW={'100%'}
              focusBorderColor={COLORS.ultraViolet}
              value={searchInput}
              onChange={handleOnInputChange}
            />
            <Button 
            background={"hsl(271, 70%, 60%)"} 
            color={"hsl(0, 0%, 100%)"} 
            _hover={{
              "background":COLORS.ultraViolet,
              "color": COLORS.offWhite
            }}
            onClick={handleOnSubmit}>
              Search
            </Button>
            <Button 
            background={"hsl(271, 70%, 70%)"} 
            color={"hsl(0, 0%, 100%)"}
            _hover={{
              "background":COLORS.ultraViolet,
              "color": COLORS.offWhite
            }} 
            onClick={clearSearch}>
              Clear
            </Button>
          </HStack>
        </FormControl>
      </Box>
    </VStack>
  );
}

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});