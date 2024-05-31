import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import ProductCard from '../../components/ProductCard/ProductCard';

const Catalog = ({theme}) => {

  const [asteroidData, setAsteroidData] = useState({});

  useEffect(() => {
    const getAllData = () => {
      axios.get('http://127.0.0.1:8000/api/catalog/all', axios.defaults.withCredentials = true)
        .then(response => {
          console.log(response);
          parseData(response.data);
        })
        .catch(error => {
          console.error('Ошибка при обновлении данных:', error);
        });
    };

    const parseData = (data) => {
      const newData = {};
      if (Array.isArray(data)) {
        data.forEach(item => {
          newData[item.id] = {
            title: item.title,
            description: item.description,
            weight: item.weight,
            price: item.price,
            category: item.category
          };
        });
        setAsteroidData(newData); 
      } else {
        console.error('Полученные данные не являются массивом');
      }
    };

    getAllData();
  }, []);

  const selectCategories = {
    all: 'Все астероиды',
    iron: 'Железные',
    stone: 'Каменные',
    iron_stone: 'Железо-каменные',
    small: 'Малые',
    medium: 'Средние',
    big: 'Большие',
  };


  const [selectCategoryValue, setSelectCategoryValue] = useState([selectCategories.all]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let selectedValues = typeof value === 'string' ? value.split(',') : value;

    if(selectedValues.includes(selectCategories.all))
      {
        if(selectedValues[selectedValues.length - 1]==selectCategories.all && selectedValues.length > 1)
          {
            selectedValues = [selectCategories.all]
          }
          else
          {
            selectedValues = selectedValues.filter((item) => item !== selectCategories.all);
          }
      }
    if (selectedValues.length === 0) {
      selectedValues = [selectCategories.all];
    }
    setSelectCategoryValue(selectedValues);
  };

  return (
    <div id='Catalog'>
      <div id='catalog'>
        <FormControl id='selectAsteroidForm'>
          <InputLabel style={{background:theme.palette.background.default }} id="selectorCat-label">Категория</InputLabel>
          <Select
            labelId="selectorCat-label"
            id="selectorCat"
            multiple
            defaultValue={selectCategories.all}
            value={selectCategoryValue}
            onChange={handleChange}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip className='catalog_chips' key={value} label={value} />
                ))}
              </div>
            )}
          >
            {Object.values(selectCategories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ProductsContainer>
          {Object.keys(asteroidData).map(key => (
            <ProductCard
              key={key}
              theme={theme}
              prdtTitle={asteroidData[key].title}
              prdtDescription={asteroidData[key].description}
              prdtWeight={asteroidData[key].weight}
              prdtPrice={asteroidData[key].price}
              prdtCategory={asteroidData[key].category}
            />
          ))}
        </ProductsContainer>
      </div>
    </div>
  );
};

export default Catalog;
