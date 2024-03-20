import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Text,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";
import {Link,useNavigate} from "react-router-dom";
import baseURL from '../baseURL';
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


    
  
  const handleClick = () => setShow(!show);
  const submitHandler = async() => {
    setLoading(true);
    if (!email || !password) {
        toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        return;
    }

    try {
        const config = {
            headers: {
                "Content-type": "application/json", //content being sent is in JSON format.
            },
        };

        const { data } = await axios.post(
            `${baseURL}/api/v1/user/login`,
            { email, password },
            config
        );

        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/home");
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

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo?.token){
      navigate("/home")
    }
  },[]);
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
        <VStack spacing="10px">
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={email}
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Login
          </Button>

          

          <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}><p>Create an account</p></Link>
        </VStack>
      </Box>
    </Container>

  )
}

export default Login
