import { Image, Box } from "@chakra-ui/react"

export default function EventCard({event}){
    return (
        <Box>
            {event.image ? <Image src={event.image}/>:null}
        </Box>
    )
}