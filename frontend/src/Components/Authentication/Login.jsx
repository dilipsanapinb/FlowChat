import React, { useState } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    VStack,
    InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    // handle the toggle
    const handleClick = () => 
        setShow(!show);
    
    // onsubmit of form
    const submitHandler = async() => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill in all the fields",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            console.log(email,password);
            const { data } = await axios.post(
                "https://chatflowbackend.onrender.com/user/api/login",
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
            const token = data.token;
            // console.log(token);
            localStorage.setItem("userInfo", JSON.stringify(token));
            setLoading(false);
            navigate("/chatpage");
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: error.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }

    return (
        <div>
            <VStack spacing="5px" color="black">
                {/* email form input */}
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </FormControl>

                {/* password */}

                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                    <Input
                        type={show? "text":"password"}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button h="1.75rem" size='sm' onClick={handleClick}>
                            {/* toggle the password show/hide */}
                            {show?"Hide":"Show"}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Login Button */}
                <Button
                    colorScheme='teal'
                    width={'100%'}
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Login
                </Button>
            </VStack>
        </div>
    );
}

export default Login