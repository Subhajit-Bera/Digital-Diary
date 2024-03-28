import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Text,
    Textarea
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from "@chakra-ui/react";
import baseURL from '../baseURL';
import { DiaryState } from '../context/DiaryProvider';


const AddRecord = () => {
    const { user } = DiaryState();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    // const [searchDate, setSearchDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    })
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                `${baseURL}/api/v1/record/create`,
                { title, content },
                config
            );

            toast({
                title: "Record Compose Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            setTitle("");
            setContent("");

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }

    }

    const handleButtonClick = () => {
        navigate("/records")
    }

    if (loading) {
        return <div>Loading...</div>
    }



    return (
        <>
            <Navbar />
            <Container maxW="xl" centerContent >

                <Box
                    d="flex"
                    align="center"
                    p={3}
                    bg="white"
                    w="100%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="3xl">
                        Digital Diary
                    </Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                    <VStack spacing="10px">
                        <FormControl id="title" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={title}
                                type="text"
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Content</FormLabel>
                            <Textarea value={content} onChange={e => setContent(e.target.value)}></Textarea>
                        </FormControl>
                        <Button
                            colorScheme="blue"
                            width="100%"
                            style={{ marginTop: 15 }}
                            onClick={submitHandler}
                            isLoading={loading}
                        >
                            Compose
                        </Button>


                        <Button
                            colorScheme="blue"
                            width="100%"
                            style={{ marginTop: 15 }}
                            onClick={handleButtonClick}
                        >
                            Got to Records
                        </Button>

                    </VStack>
                </Box>
            </Container>

        </>
    )
}

export default AddRecord
