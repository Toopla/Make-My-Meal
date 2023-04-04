import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import Home from './components/Home';
import Reservation from './components/Reservation';
import Login from './components/Login';
import Signup from './components/Signup';
import Planning from './components/Planning';

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['BearerToken']);

    return (
        <div className="App">
            <NavBar cookies={cookies} removeCookie={removeCookie}></NavBar>
            <Routes>
                <Route exact={true} path='/' element={<Home cookies={cookies}/>}></Route>
            </Routes>
            <Routes>
                <Route exact={true} path='/reservation' element={<Reservation/>}></Route>
            </Routes>
            <Routes>
                <Route exact={true} path='/planning' element={<Planning/>}></Route>
            </Routes>
            <Routes>
                <Route exact={true} path='/signup' element={<Signup/>}></Route>
            </Routes>
            <Routes>
                <Route exact={true} path='/login' element={<Login setCookie={setCookie}/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
