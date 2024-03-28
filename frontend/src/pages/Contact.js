

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Box,
  Container,
  Text,
} from "@chakra-ui/react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, for example, send the data to your server or an API

    // Show a toast message to indicate successful submission
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
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
      <VStack as="form" onSubmit={handleSubmit} spacing="10px">
        <FormControl id="name">
          <FormLabel>Your Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email Address</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormControl>
        <FormControl id="message">
          <FormLabel>Message</FormLabel>
          <Textarea name="message" value={formData.message} onChange={handleChange} rows={4} required />
        </FormControl>
        <Button type="submit" colorScheme="blue">Send Message</Button>
      </VStack>
      </Box>
    </Container>
  );
};

export default Contact;