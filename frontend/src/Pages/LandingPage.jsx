import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import {Box, Image } from "@chakra-ui/react"
const LandingPage = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <Box>
                <Image src='https://cdn.sanity.io/images/599r6htc/localized/4b2282f60ec5ebdd8f02af2455777d606f5619e7-1108x1108.png?w=1200&q=70&fit=max&auto=format'
                    width={'100%'}
                height={'700px'}>
            </Image>
            </Box>
            
            <footer>
                <Footer/>
            </footer>
            
        </div>
    );
}

export default LandingPage