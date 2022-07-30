import { Container, Input, SimpleGrid, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, } from "@chakra-ui/react"
import * as React from "react"
import { useState, useEffect } from "react"
import EventCard from "./EventCard"

export default function SearchedEvents({events, isOpen, onOpen, onClose}){
    const [searchInput, setSearchInput] = useState("")
    let handleOnSearchChange = (event) => {
        setSearchInput(event.target.value)
      }

      const searchedEvents = events.filter(event => {
        return (event.eventName.toLowerCase().includes(searchInput.toLowerCase()))
      })
      console.log("SEARCHED: ", searchedEvents)
    return (
        <Container centerContent>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay overflowY={'auto'} width={'100%'} />
        <ModalContent maxWidth={'100rem'} >
          <ModalHeader>Search Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input margin={'1rem'} defaultValue="" placeholder="search events..." onChange={handleOnSearchChange}></Input>

            <SimpleGrid minWidth="50vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                {searchedEvents?.map((event, index) => (
                            <EventCard key={index} event={event}/>         
                ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Container>
    )
}