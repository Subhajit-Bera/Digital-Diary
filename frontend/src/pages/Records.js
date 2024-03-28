import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Text,
    VStack,
    Spinner,
    Button,
    Flex,
    IconButton
} from "@chakra-ui/react";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { DiaryState } from '../context/DiaryProvider';
import baseURL from '../baseURL';
import Navbar from '../components/Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Records = () => {
    const { user } = DiaryState();
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    // const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.token);
    if (!user) {
        navigate("/");
    }



    useEffect(() => {

        const fetchRecords = async () => {

            setLoading(true);
            try {

                let url = `${baseURL}/api/v1/record`;
                if (selectedDate) {
                    url += `/search?date=${selectedDate}`;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get(url, config);
                setRecords(data);
                setLoading(false);
            } catch (error) {
                // console.log(error);
                // toast({
                //     title: "Error Occured!",
                //     description: error.message,
                //     status: "error",
                //     duration: 5000,
                //     isClosable: true,
                //     position: "bottom",
                // });
                setLoading(false);
            }

        }
        fetchRecords();
    }, [user, selectedDate, searching]);

    const handleDeleteRecord = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.delete(`${baseURL}/api/v1/record/${id}`, config);
            // Remove the deleted record from the state
            setRecords(records.filter(record => record._id !== id));
            toast({
                title: "Record Deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            // Handle error
            toast({
                title: "Error Occurred",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSearch = () => {
        setSearching(!searching);
        setSelectedDate("");
    };

    if (loading) {
        return <div>Loading....</div>
    }

    return (
        <>
            <Navbar />
            <Container maxW="xl" centerContent>
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
                        All Records
                    </Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                    <Flex mb={4} direction={{ base: "column", md: "row" }}>


                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            customInput={
                                <Box
                                    as="input"
                                    borderColor="gray.300"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    p={2}
                                    w="100%"
                                />
                            }
                        />
                        <Button ml={2} colorScheme="blue" onClick={handleSearch}>
                            {searching ? 'Clear Search' : 'Search'}
                        </Button>
                    </Flex>
                    <VStack spacing={4} align="stretch">
                        {records.map(record => (
                            <Flex key={record._id} p={4} borderWidth="1px" borderRadius="md" align="center">
                                <VStack align="flex-start" flex="1">
                                    <Link key={record._id} to={`/record/${record._id}`}>
                                        <Text fontSize="xl" fontWeight="bold">{record.title}</Text>
                                        <Text>{record.content.substring(0, 30) + "...."}</Text>
                                    </Link>
                                    <Text fontSize="sm" color="gray.500">{new Date(record.date).toLocaleString()}</Text>
                                </VStack>
                                <IconButton
                                    icon={<FaTrash />}
                                    colorScheme="red"
                                    aria-label="Delete"
                                    onClick={() => handleDeleteRecord(record._id)}
                                />
                            </Flex>

                        ))}
                        {records.length === 0 && (
                            <Text fontSize="lg" fontStyle="italic">No records found.</Text>
                        )}
                    </VStack>

                </Box>
            </Container>
        </>
    )
}

export default Records;
