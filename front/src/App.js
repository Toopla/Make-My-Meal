import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import Home from './components/Home';
import Items from './components/Items';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['BearerToken']);

    return (
        <div className="App">
            <NavBar cookies={cookies} removeCookie={removeCookie}></NavBar>
            <Routes>
                <Route exact={true} path='/home' element={<Home cookies={cookies}/>}></Route>
            </Routes>
            <Routes>
                <Route exact={true} path='/items' element={<Items cookies={cookies}/>}></Route>
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
