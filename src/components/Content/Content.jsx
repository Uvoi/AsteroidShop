import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import Help from '../../pages/Help/Help';
import AddToDB from '../AddToDB/AddToDB';
import Asteroid from '../../pages/Asteroid/Asteroid';
import Basket from '../../pages/Basket/Basket';
import Profile from '../../pages/Profile/Profile';
import Order from '../../pages/Order/Order';


const Content = ({updateUser})=>
{

    
    return(
        <div id='Main'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/catalog' element={<Catalog/>}/>
                    <Route exact path='/help' element={<Help/>}/>
                    <Route exact path='/catalog/add' element={<AddToDB/>}/>
                    <Route exact path='/asteroid' element={<Asteroid/>}/>
                    <Route exact path='/basket' element={<Basket/>}/>
                    <Route exact path='/basket/order' element={<Order/>}/>
                    <Route exact path='/profile' element={<Profile updateUser={updateUser}/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default Content;