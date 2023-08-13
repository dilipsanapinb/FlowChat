import { Box, Flex, VStack,Text, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { FiPhoneCall } from 'react-icons/fi'

const Footer = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div
            style=
            {
                {
                    width: "100%",
                    margin: "auto",
                    borderRadius: '3px'
                }
            }
        >
            <Box
                as='footer'
                py={4}
                bg='#22A699'
                color={'white'}
                // borderRadius={'5px'}
                height={'150px'}
            >
                <Flex
                    justify={'center'}
                    align={'center'}
                    px={4}
                    flexDirection={{base:'column', md:'row'}}
                >
                    {/* Website name and contact */}
                    <VStack
                        spacing={2}
                        textAlign={{ base: 'center' }}
                    >
                        {/* name of website */}
                        <Text
                            fontSize={'lg'}
                            fontWeight={'bold'}
                        >
                            FlowChat
                        </Text>

                        {/* contact number */}

                        <Flex
                            align={'center'}>
                            <Icon
                                as={FiPhoneCall}
                                boxSize={4}
                                mr={1}
                            />
                            <Text
                            >Phone: +91 9175329907</Text>
                        </Flex>
                        <Flex align="center">
                            <Icon as={FaEnvelope} boxSize={4} mr={1} />
                            <Text>Email: dilipsanap@gmail.com</Text>
                        </Flex>
                    </VStack>

                    {/* Scroll-to-top arrow */}
                    {showScrollToTop && (
                        <Box
                            position="fixed"
                            bottom="20px"
                            right="20px"
                            zIndex="999"
                            cursor="pointer"
                            onClick={handleScrollToTop}
                            bg="teal.500"
                            color="white"
                            borderRadius="50%"
                            p={3}
                            boxShadow="lg"
                        >
                            <Icon as={AiOutlineArrowUp} boxSize="8" />
                        </Box>
                    )}
                </Flex>

            </Box>
        </div>
    );
}

export default Footer