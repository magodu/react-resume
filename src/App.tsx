import { Routes, Route, Navigate } from 'react-router-dom';
import Resume from './pages/Resume/Resume';


function App() {   
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/resume' />} />
            <Route path='/resume' element={<Resume />} />
        </Routes>

    );
}

export default App;
