import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const avatarSrc = "https://avatars.githubusercontent.com/u/25058652";

const Footer = () => {
    return (
        <Box
            bg="white"
            overflow='hidden'
            variant='outline'
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
                <VStack w={"full"} alignItems={["center", "flex-start"]}>
                    <Text fontWeight={"bold"}>DigitalDiary</Text>
                    <Text
                        fontSize={"sm"}
                        letterSpacing={"widest"}
                        textAlign={["center", "left"]}
                    >
                        Thank you for choosing us as your digital diary companion ❤️
                    </Text>
                </VStack>

                <VStack >
                    <Button variant='ghost'>
                        <Link to="/contact" >Contant Us </Link>
                    </Button>
                </VStack>
            </Stack>
        </Box>
    );
};

export default Footer;