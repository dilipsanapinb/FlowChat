import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer';
import { Box, Container,Tab,TabList,TabPanel,TabPanels,Tabs,Text } from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';

const SignInPage = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main>
                <Container maxW='xl' centerContent>
                <Box
                    d="flex"
                    justifyContent={'center'}
                    p={3}
                    bg='white'
                    w='100%'
                    m='40px 0 15px 0'
                    borderRadius={'lg'}
                    borderWidth={'1px'}
                >
                    <Text fontSize={'4xl'}
                        color={'black'}
                        textAlign={'center'}>
                        Blogify
                    </Text>
                </Box>
                <Box
                    bg={'white'}
                    w={'100%'}
                    p={4}
                    borderRadius={'lg'}
                    borderWidth={'1px'}
                >
                    <Tabs
                        variant={'soft-rounded'}>
                        <TabList mb="1em">
                            <Tab width="50%">Login</Tab>
                            <Tab width="50%">Signup</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login/>
                            </TabPanel>
                            <TabPanel>
                                <Signup/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
            </main>
            <footer>
                <Footer/>
            </footer>
            
        </div>
    );
}

export default SignInPage