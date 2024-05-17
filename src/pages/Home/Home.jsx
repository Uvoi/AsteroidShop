import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

import './styles.css'
import { useNotification } from '../../components/Notification/Notification';
import homeMain from "../../images/home3.jpg"
import homeMainWtBg from "../../images/home3wtbg1.png"

const Home = (props)=>
{
    const [asteroidClick, setaAsteroidClick] = useState(false);
    const showNotification = useNotification();
    const asteroidMenuAnimation = useAnimation();
    const MainWtBgImgAnimation = useAnimation();

    useEffect(() => {
        if (!asteroidClick) {
            MainWtBgImgAnimation.start("small");
            asteroidMenuAnimation.start("hidden");
        } else {
            MainWtBgImgAnimation.start("big");
            asteroidMenuAnimation.start("visible");
        }
      }, [asteroidClick]);

    const buttonsLeft = [
        { label: 'Железные', id:1 },
        { label: 'Каменные', id:2 },
        { label: 'Железо-каменные', id:3 },
      ];

    const buttonsRight = [
        { label: 'Малые', id:4 },
        { label: 'Средние', id:5 },
        { label: 'Большие', id:6 },
    ];


    const homeMainWtBgImgClicked = () =>
    {
        return {
            small: { 
                scale:1, 
                transition: {
                    delay: (1.2), 
                    stiffness: 100,
                },
            },
            big: { 
                scale:1.1, 
                transition: {
                    delay: (0.2), 
                    stiffness: 100,
                },
            },
        };
    }

      const getButtonAnimation = (index, len) => {
        return {
            hidden: { 
                x: len, 
                opacity: 0,
                transition: {
                    delay: ((5-index) * 0.2), 
                },
            },
            visible: { 
                x: 0, 
                opacity: 1,           
                transition: {
                    delay: index * 0.2 + 0.2, 
                }, 
            },
        };
      };
      
      

    return(
        <div id='Home'>
            <div id='home'>
            <motion.div id="mainImageHm">
                    <img src={homeMain} id='homeMainImg' onClick={()=>{setaAsteroidClick(false)}}/>
                    
                    {buttonsLeft.map((button) => (
                        <motion.button
                            key={button.id}
                            variants={getButtonAnimation(button.id-1, 200)}
                            animate={asteroidMenuAnimation}
                            className={`asteroidMenu ${!asteroidClick ? "asteroidMenuHidden" : ""}`}
                            initial="hidden"
                        >
                            {button.label}
                        </motion.button>
                    ))}
                    <motion.img src={homeMainWtBg} 
                        id='homeMainWtBgImg'
                        onClick={()=>{setaAsteroidClick(!asteroidClick)}}
                        variants={homeMainWtBgImgClicked()}
                        animate={MainWtBgImgAnimation}
                    />
                    {buttonsRight.map((button) => (
                        <motion.button
                            key={button.id}
                            variants={getButtonAnimation(button.id-1, -200)}
                            animate={asteroidMenuAnimation}
                            className={`asteroidMenu ${!asteroidClick ? "asteroidMenuHidden" : ""}`}
                            initial="hidden"
                        >
                            {button.label}
                        </motion.button>
                    ))}
                </motion.div>

            </div>
        </div>
    );
};

export default Home;