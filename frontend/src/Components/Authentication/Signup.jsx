import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate=useNavigate()

    const handleClick = () => setShow(!show);

    const submitHandler = async() => {
        setLoading(true);
        if (!username || !email || !password) {
            toast({
                title: "Please fill the all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
            return;
        }

        // request to register the data

        try {
            const userData = {
                name: username,
                email: email,
                password:password
            }
            let res = await fetch('https://chatflowbackend.onrender.com/user/api/register', {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(userData)
            })
            const data = await res.json();
            console.log(data);
            toast({
                title: "Registration is successfull",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
            navigate('/signinpage')
        } catch (error) {
            console.log(error.message)
            toast({
                title: "Error Occured!",
                // description: error.resonse.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
        }
    };

    return (
        <div>
            <VStack
                spacing={"5px"}
                color={'black'}
            >
                {/* Username */}
                <FormControl id="username" isRequired>
                    <FormLabel>Usename</FormLabel>
                    <Input
                        placeholder='Enter your Username'
                        onChange={(e) => setName(e.target.value)}
                    ></Input>
                </FormControl>

                {/* email */}
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder='Enter your Email'
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                </FormControl>

                {/* password */}
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Input>
                        <InputRightElement
                        width={'4.5rem'}
                        >
                            <Button
                                h="1.75rem" 
                                size='sm'
                                onClick={handleClick}
                            >
                                {show?"Hide":"Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    colorScheme='teal'
                    width={'100%'}
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </VStack>
        </div>
    );
}

export default Signup