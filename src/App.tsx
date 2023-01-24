import React, { useEffect, useState } from 'react';

import Home from './pages/Home/Home';
import AboutMe from './pages/AboutMe/AboutMe';
import Experience from './pages/Experience/Experience';
import Skills from './pages/Skills/Skills';
import Training from './pages/Training/Training';
import Contact from './pages/Contact/Contact';
import Footer from './pages/Footer/Footer';
import Loading from './components/Loading/Loading';

import useHttp from './hooks/useHttp';


function App() {
    const [ data, setData ] = useState({});
    const { isLoading, error, sendRequest: fetchResumeData } = useHttp();

    useEffect(() => {
        const transformData = (response: any) => {
            console.log('response', response.data);

            setData(response.data);
        };

        fetchResumeData( {
                url: 'https://react-resume-data-default-rtdb.europe-west1.firebasedatabase.app/es.json'
            },
            transformData
        );
    }, []);

    return (
        <React.Fragment>
            { isLoading && <Loading /> }
            { !isLoading && (<div>
                <Home />
                <AboutMe/>
                <Experience />
                <Skills />
                <Training />
                <Contact />
                <Footer />
            </div>)}
        </React.Fragment>
    );
}

export default App;
