
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Text, VStack, Container } from "@chakra-ui/react";
import baseURL from '../baseURL';
import { DiaryState } from '../context/DiaryProvider';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
const SingleRecord = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    //   const { user } = DiaryState();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userInfo"));
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
                    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                        <VStack spacing={4} align="stretch">
                            <Box p={4} borderWidth="1px" borderRadius="md">
                                <Text fontSize="xl" fontWeight="bold">{record.title}</Text>
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