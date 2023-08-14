import {
    Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, InputGroup, InputRightElement,
    useDisclosure,
    Link as ChakraLink,
    Button
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSearch } from "react-icons/bi"
import { HamburgerIcon } from "@chakra-ui/icons";
const Navbar = () => {
const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsSticky(scrollPosition > 0)
    }
    return (
            <Flex
                as='nav'
                alignItems={'center'}
                justifyContent={'space-between'}
                paddingY={'1rem'}
                width={'100%'}
                margin={"auto"}
                marginBottom={'10px'}
                bgColor={'orange'}
                position={isSticky ? "sticky" : "static"}
                top="0"
                zIndex={"999"}
                // borderRadius={"5px"}
            >
                {/* Left Part of Navbar */}
                <Flex className='navbar-left'>
                    <Link to="/" className='logo'>
                        <Box
                            fontSize={'3xl'}
                            fontWeight={'bold'}
                            color={'white'}
                            marginLeft={'20px'}
                        >
                            FlowChat
                        </Box>
                    </Link>
                </Flex>

                {/* Middlepart of navbar */}
                <Flex className='navbar-middle'
                    alignItems={'center'}
                    width={'70%'}
                    
                >
                    <InputGroup maxW={'600px'} mar="2rem">
                        <Input
                            type="text"
                            placeholder='Search'
                            borderRadius={'4px'}
                            bg={'white'}
                        size="md"
                        ></Input>
                        <InputRightElement pointerEvents="none">
            <BiSearch color="gray.500" style={{ cursor: "pointer" }} />
          </InputRightElement>
                    </InputGroup>
                </Flex>


                {/* Right part of  Navabar */}
                <Flex className='navbar-right'>
                    <IconButton
                        as={'button'}
                        className='hamburger'
                        icon={<HamburgerIcon />}
                        variant={'unstyled'}
                        fontSize={'1.5rem'}
                        marginRight={'10px'}
                        backgroundColor={''}
                        color={'white'}
                        onClick={onOpen}
                    />
                        <Drawer
                            placement='right'
                            onClose={onClose}
                            isOpen={isOpen}
                        >
                            <DrawerOverlay/>
                                <DrawerContent>
                                    <DrawerCloseButton/>
                                        <DrawerHeader>
                                            Menu
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <ChakraLink
                                                as={Link}
                                                to='/signinpage'
                                                className='dropdown-button'
                                                display={'block'}
                                                mb='0.5rem'
                                            >
                                                <Button
                                                    className='dropdown-button'
                                                    display={'block'}
                                                    mb={'0.5rem'}
                                                >
                                                    SignIn
                                                </Button>
                                                
                                            </ChakraLink>
                                            <Button
                                                    className='dropdown-button'
                                                    display={'block'}
                                                    mb={'0.5rem'}
                                                >
                                                    Logout
                                            </Button>
                                            <Button
                                                    className='dropdown-button'
                                                    display={'block'}
                                                    mb={'0.5rem'}
                                                >
                                                    More
                                                </Button>
                                        </DrawerBody>
                                </DrawerContent>

                        </Drawer>
                    
                </Flex>
                
            </Flex>
    );
}

export default Navbar