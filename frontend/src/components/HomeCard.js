import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, VStack, Box, HStack, Spacer } from '@chakra-ui/react'
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
            direction={{ base: 'column', sm: 'row', md: 'column' }} // Adjust direction for tablet
            overflow='hidden'
            variant='outline'
            h={{ base: 'auto', sm: '80vh', md: 'auto' }} // Adjust height for tablet
            w={{ base: '100%', sm: '100vw', md: '100%' }} // Adjust width for tablet
            p={{ base: '0', sm: '2', md: '4' }} // Adjust padding for tablet
        >
            <Image
                objectFit='cover'
                maxH={{ sm: '50%', md: '70vh' }}
                maxW={{ base: '100%', sm: '50%', md: '100%' }} // Adjust max width for tablet
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
                p="5px 10px 5px 10px"
                borderWidth="5px"
                borderRadius="20px"
            />

            <VStack w={{ base: '100%', sm: '50%', md: '100%' }} p={{ base: '4', sm: '2', md: '4' }} align={{ base: 'center', sm: 'flex-start', md: 'center' }} justify='center'>
                <CardBody>
                    <Heading size='md'>The perfect Diary</Heading>

                    <Text py='4' letterSpacing={"widest"} >
                        Digital Diary is your personal digital sanctuary where you can pour your heart out, document your life journey, and record the moments that matter most. With our intuitive and user-friendly platform, you can write and organize your entries with ease.
                    </Text>
                </CardBody>

                <HStack>
                    <Button variant='solid' colorScheme='blue' p='2' onClick={toWrite} >
                        Write Now
                    </Button>
                    <Spacer />
                    <Button variant='solid' colorScheme='blue' p='2' onClick={toRecords} >
                        Go To Records
                    </Button>
                </HStack>
            </VStack>
        </Card>
    )
}

export default HomeCard
