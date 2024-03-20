import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, VStack, Box, HStack } from '@chakra-ui/react'
import { Image, Button, Text, Heading } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'


const HomeCard = () => {

    const navigate = useNavigate();
    const toWrite = () => {
        navigate("/add-record")
    }

    const toRecords = () => {
        navigate("/records")
    }

    return (

        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            h="80vh"
            w="100vw"
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '50%' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
                p="5px 10px 5px 10px"
                borderWidth="5px"
                borderRadius="20px"
            />

            <VStack >
                <CardBody>
                    <Heading size='md'>The perfect Diary</Heading>

                    <Text py='4' letterSpacing={"widest"} >
                        Digital Diary is your personal digital sanctuary where you can pour your heart out, document your life journey, and record the moments that matter most. With our intuitive and user-friendly platform, you can write and organize your entries with ease.
                    </Text>
                    <HStack>

                        <Button variant='solid' colorScheme='blue' p='2' onClick={toWrite} >
                            Write Now
                        </Button>




                        <Button variant='solid' colorScheme='blue' p='2' mx='2' onClick={toRecords} >
                            Go To Recors
                        </Button>

                    </HStack>

                </CardBody>


            </VStack>
        </Card>



    )
}

export default HomeCard
