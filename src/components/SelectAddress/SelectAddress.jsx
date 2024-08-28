import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'; 
import { themeContext } from '../../App';



const SelectAddress = ({returnAddress, defaultAddress}) => {
  const theme = useContext(themeContext)
  const [value, setValue] = useState(defaultAddress);
  useEffect(() => {
    if (value!=undefined)
      returnAddress(value.value)
  }, [value])

  useEffect(() => {
    returnAddress(defaultAddress)
  }, [])

  return(
    <div className="SelectAddress">
      <AddressSuggestions 
        inputProps={{placeholder:"Введите адрес доставки", style:{color: theme.palette.text.primary, background: theme.palette.background.default}}} 
        token="8a2947c6ee5957d51e88f53249e9ebe9e2da0498" 
        value={value} onChange={setValue} 
        count={5}
        defaultQuery={defaultAddress}
        selectOnBlur
      />
    </div>
  );
};

export default SelectAddress;
