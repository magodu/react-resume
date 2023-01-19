import React from 'react';
import Home from './pages/Home/Home';
import AboutMe from './pages/AboutMe/AboutMe';
import Experience from './pages/Experience/Experience';
import Skills from './pages/Skills/Skills';

function App() {

    return (
        <React.Fragment>
            <Home />
            <AboutMe />
            <Experience />
            <Skills />
        </React.Fragment>
    );
}

export default App;
