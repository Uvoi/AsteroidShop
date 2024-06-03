import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import './styles.css';
import Help from '../../pages/Help/Help';


const Content = ({theme})=>
{
    // const [modalActive, setModalActive] = useState(false);

    // const isUserAuthenticated = () => {
    //     if(User.name == undefined && User.email == undefined)
    //     {
    //         console.log(1)
    //         return false
            
    //     }
    //     else
    //     {
    //         console.log(2)
    //     return true
    //     }
    //   };

    //   const openModal = () => {
    //     setModalActive(true);
    //   };
    

    return(
        <div id='Main'>
           {/* <Modal active = {modalActive} setActive={setModalActive}> <Login active = {modalActive} setActive={setModalActive} ParentUpdate={childUpdate}></Modal> */}
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/catalog' element={<Catalog theme={theme}/>}/>
                    <Route exact path='/help' element={<Help/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default Content;