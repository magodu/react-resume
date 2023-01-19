import React from 'react';
import Home from './pages/Home/Home';
import AboutMe from './pages/AboutMe/AboutMe';
import Experience from './pages/Experience/Experience';
import Skills from './pages/Skills/Skills';
import Training from './pages/Training/Training';
import Contact from './pages/Contact/Contact';
import Footer from './pages/Footer/Footer';

function App() {

    return (
        <React.Fragment>
            <Home />
            <AboutMe />
            <Experience />
            <Skills />
            <Training />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

export default App;
