import {React, useState, useEffect, useContext} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Skeleton, Typography } from '@mui/material';
import { ArrowDropDown, Check } from '@mui/icons-material';

import './styles.css';
import { ReactComponent as BasketSvg } from './../../images/basket.svg'
import CommentsContainer from '../../components/CommentsContainer/CommentsContainer';
import Comment from '../../components/Comment/Comment';
import CommentInput from '../../components/CommentInput/CommentInput';
import {addToBasket} from '../../functions/basket'
import { themeContext, userContext } from '../../App';

const Asteroid = ()=>
{
    const theme = useContext(themeContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [asteroidData, setAsteroidData] = useState({});
    const user = useContext(userContext)

    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const parseIdFromUrl = (urlParams) => {
        const asteroidID = urlParams.get('id');
        if (asteroidID) {
            return asteroidID
        }
    }    
    const [idFromUrl, setIdFromUrl] = useState(parseIdFromUrl(searchParams));
    const [commentsData, setCommentsData] = useState({});

    const parseAsteroidData = (data) => {
        const newData = {
              title: data.title,
              description: data.description,
              price: data.price,
              weight: data.weight,
              diameter: data.diameter,
              category: data.category,
              imgLink: data.imgLink,
              Fe: data.iron,
              Ni: data.nickel,
              S: data.sulfur,
              Mg: data.magnesium,
              Si: data.silicon,
              Al: data.aluminum,
              Ca: data.calcium,
              O: data.oxygen,
            };
          setAsteroidData(newData); 
      };

    useEffect(() => {
        if (!idFromUrl)
            navigate('/catalog')
        else{
            axios.get(`http://localhost:8000/api/products/${idFromUrl}`, axios.defaults.withCredentials = true)
                .then(response => {
                    parseAsteroidData(response.data)
                })
                .catch(error => {
                    navigate('/catalog')
                });
                getCommentsFromServ()
            }

    },[idFromUrl])

    const getCommentsFromServ = () => 
        {
            axios.get(`http://localhost:8000/api/comments/${idFromUrl}`, axios.defaults.withCredentials = true)
                .then(response => {
                    parseCommentsData(response.data)
                })
                .catch(error => {
                    console.log("не удалось подгрузить комментарии")
                });
        }


    const parseCommentsData = (data) => {    
          const newData = {};
          if (Array.isArray(data)) {
            data.forEach(item => {
              newData[item.id] = {
                customerName: item.customerName,
                customerPhoto: item.customerPhoto,
                text: item.text,
                date: item.date,
              };
            });
            setCommentsData(newData); 
          } else {
            console.error('Полученные данные не являются массивом');
          }
      };

    const returnWeightCategory = (weight) => {
        if ((weight > 0.000001) && (weight < 1)) 
          return 'Малый'
        if ((weight > 1) && (weight < 50))
          return 'Средний'
        if (weight > 50)
          return 'Большой'
      };

    const elements = ['Fe', 'Ni', 'S', 'Mg', 'Si', 'Al', 'Ca', 'O'];


    const [isAdding, setIsaAdding] = useState(false)
    const handleAddToBasketClick = async () =>
    {
        setIsaAdding(true)
        addToBasket([idFromUrl])
        setTimeout(() => {
            setIsaAdding(false)
        }, 1000);
    }

    const handleImageLoad = () => {
        setLoading(false);
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return(
        <div id='Asteroid'>
            <div id="asteroid">
                <div id="asteroidDataTopAs">
                    {loading && (
                        <Skeleton variant="rectangular" width={'50%'} height={'100%'} />
                    )}
                    <img 
                    onLoad={handleImageLoad}
                    onError={() => setLoading(false)}
                    style={{ display: loading ? 'none' : 'block' }}
                    id="asteroidImgAs" 
                    src={asteroidData.imgLink}/>
                    <div id="asteroidDataRightAs" style={{color: theme.palette.text.primary}}>
                        <div id='asteroidDataRightTopAs'>
                            <h1 style={{color: theme.palette.text.ultra}}>{asteroidData.title}</h1>
                            <p>Вес: {asteroidData.weight} т.</p>
                            <p>Диаметр: {asteroidData.diameter} км.</p>
                            <p>Категория: <span style={asteroidData.category == "Железный"?{color: "#A0A0A0"}:(asteroidData.category == "Каменный"?{color: "#8f633f"}:{color:"#a18874"})}>{asteroidData.category}</span></p>
                            <p>Размер: {returnWeightCategory(asteroidData.weight)}</p>
                        </div>
                        <div id="asteroidPriceAndBuy">
                            <h2>{asteroidData.price}.000 <sub>₽</sub></h2>
                            <Button style={{background:(isAdding?theme.palette.success.main:theme.palette.primary.main)}} variant='contained' onClick={()=>{handleAddToBasketClick(idFromUrl)}}>
                                {isAdding?<Check/>:<BasketSvg filter='invert(100%)'/>}
                                <p>{isAdding?'Добавлено':'В  корзину'}</p>
                            </Button>
                        </div>
                    </div>
                    
                </div>
                <Divider variant='middle'/>
                <div id="asteroidDataBottomAs">
                    <h3 style={{color: theme.palette.text.primary}}>Описание</h3>
                    <div id='asteroidCompositionTable' style={{border: "1px solid black"}}>
                        <div style={{color: theme.palette.text.primary, display: 'flex', justifyContent: 'space-around'}}>
                            {elements.map(element => (
                                <span key={element}>{element}</span>
                            ))}
                        </div>
                        <div style={{color: theme.palette.text.primary, display: 'flex', justifyContent: 'space-around'}}>
                            {elements.map(element => (
                                <span key={element + "_value"}>{asteroidData[element] ? asteroidData[element]+"%" : ""}</span>
                            ))}
                        </div>
                    </div>

                    <p style={{color: theme.palette.text.secondary}}>{asteroidData.description}</p>
                </div>
                
                <h3 style={{color: theme.palette.text.primary}}>Комментарии</h3>
                        
                <CommentsContainer>
                    {Object.keys(commentsData).slice(-3).reverse().map(key => (
                        <Comment
                            key={key}
                            user={commentsData[key].customerName}
                            dateTime={commentsData[key].date}
                            photo={commentsData[key].customerPhoto}
                        >
                            {commentsData[key].text}
                        </Comment>
                    ))}

                    {Object.keys(commentsData).length > 3 && (
                        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                expandIcon={<ArrowDropDown />}
                                style={{color: theme.palette.primary.main}}
                            >
                                <Typography>Ещё...</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {Object.keys(commentsData).slice(0, -3).map(key => (
                                    <Comment
                                        key={key}
                                        user={commentsData[key].customerName}
                                        dateTime={commentsData[key].date}
                                        photo={commentsData[key].customerPhoto}
                                    >
                                        {commentsData[key].text}
                                    </Comment>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    )}

                    <CommentInput userEmail={user?.email} prodID={idFromUrl} updateComments={getCommentsFromServ}/>
                </CommentsContainer>

            </div>
        </div>
    );
};

export default Asteroid;