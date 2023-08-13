import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer';

const LandingPage = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>

            <h1>Langing page data</h1>
            <footer>
                <Footer/>
            </footer>
            
        </div>
    );
}

export default LandingPage