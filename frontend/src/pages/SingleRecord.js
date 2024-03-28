
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Text, VStack, Container, Button, IconButton, useToast } from "@chakra-ui/react";
import baseURL from '../baseURL';
import { DiaryState } from '../context/DiaryProvider';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import Navbar from '../components/Navbar';

const SingleRecord = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = DiaryState();
    const toast = useToast();
    const navigate = useNavigate();
    if (!user) {
        navigate("/");
    }
    useEffect(() => {
        const fetchRecord = async () => {
            setLoading(true);
            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get(`${baseURL}/api/v1/record/${id}`, config);
                // console.log(data);
                setRecord(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching record:', error);
                setLoading(false);
            }
        };

        fetchRecord();
    }, [id]);

    const handleDeleteRecord = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.delete(`${baseURL}/api/v1/record/${id}`, config);
            // Display success message
            toast({
                title: "Record Deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Redirect to the records page after deletion
            navigate("/records");
        } catch (error) {
            // Handle error
            console.error('Error deleting record:', error);
            toast({
                title: "Error Occurred",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!record) {
        return <div>Record not found</div>;
    }

    return (
        <>
            <Navbar />
            <Box mt={8}> {/* Add margin top to create space */}
                <Container maxW="xl" centerContent>
                    {/* <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                        <VStack spacing={4} align="stretch">
                            <Box p={4} borderWidth="1px" borderRadius="md">
                                <Text fontSize="xl" fontWeight="bold">{record.title}</Text>
                                <Text>{record.content}</Text>
                                <Text fontSize="sm" color="gray.500">Created at: {new Date(record.date).toLocaleString()}</Text>
                            </Box>
                            <Button colorScheme="red" onClick={handleDeleteRecord}>Delete</Button>
                        </VStack>
                    </Box> */}
                    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                        <VStack spacing={4} align="stretch">
                            <Box p={4} borderWidth="1px" borderRadius="md">
                                <Text fontSize="xl" fontWeight="bold">
                                    {record.title}
                                    <IconButton
                                        icon={<FaTrash />}
                                        colorScheme="red"
                                        aria-label="Delete"
                                        ml={2} // Add margin-left to separate the delete icon from the title
                                        onClick={handleDeleteRecord}
                                    />
                                </Text>
                                <Text>{record.content}</Text>
                                <Text fontSize="sm" color="gray.500">Created at: {new Date(record.date).toLocaleString()}</Text>
                            </Box>
                        </VStack>
                    </Box>
                </Container>
            </Box>
        </>

    );
};

export default SingleRecord;