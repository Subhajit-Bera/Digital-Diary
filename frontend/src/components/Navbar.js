import React from 'react'
import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';




const Navbar = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const navigate=useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }
    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                {/* Title */}

                <Text fontSize="2xl" fontWeight={"bold"}>
                    DigitalDiary
                </Text>


                <Box flex="1" />
                {/* Search Bar & Icon */}

                {/* <Tooltip label="Search by Title" hasArrow placement="bottom-end">

                    <Button leftIcon={<SearchIcon />} variant='ghost' mr={2}>
                        <Input
                            placeholder="Search"
                            variant="unstyled"
                            mr={1}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Button>
                </Tooltip> */}

                <Menu >
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Box>Menu</Box>
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Link} to="/records">Records</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        <MenuDivider />
                        <MenuItem as={Link} to="/contact">Contact Us</MenuItem>
                    </MenuList>
                </Menu>
            </Box>

        </>
    )
}

export default Navbar
