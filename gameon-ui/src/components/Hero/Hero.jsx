import * as React from "react"
import { Box, Heading, Text } from '@chakra-ui/react'
import {COLORS} from "../colors"
export default function Hero() {
    // Removed commented code 
    return(
        // Made some changes in the hero
        //Imported the COLORS function to makes it easy to utilize colors :)
        <Box 
        width={"100%"}
        height={"auto"}
        display={"flex"} 
        flexDirection={"column"} 
        alignItems={"center"} 
        // backgroundColor={"#302b3f"} 
        backgroundSize={"cover"}
        textAlign={"center"}
        paddingBottom={"2rem"}
        borderBottomRadius={"15px"}
        style={{
            "backgroundColor": "hsl(255, 50%, 21%)",
        }}
        >
            {/* font-family: 'VT323', monospace; */}
            <Heading textTransform={"uppercase"} fontFamily={"VT323, monospace"} fontSize={"6xl"} paddingTop={"4rem"} paddingBottom={"1rem"} fontWeight={700} color={COLORS.offWhite}>
                Game on!
            </Heading>
            <Box width={"70px"} height={"4px"} backgroundColor={COLORS.darkAmethyst} marginleft={"lg"} marginRight={"lg"}></Box>
            
            {/* font-family: 'Roboto', sans-serif */}
            <Text fontFamily={"Roboto, sans-serif"} paddingTop={"1rem"} color={COLORS.offWhite} fontSize={"xl"} fontWeight={"semibold"}>Community through gaming</Text>
        </Box>
    )


}