import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles.css';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'; 
import { themeContext } from '../../App';



const SelectAddress = ({returnAddress, defaultAddress}) => {
  const theme = useContext(themeContext)
  const [value, setValue] = useState(defaultAddress);
  useEffect(() => {
    returnAddress(value.value)
    console.log(value)
  }, [value])
  console.log(defaultAddress)

  return(
    <div className="SelectAddress">
      <AddressSuggestions 
        inputProps={{placeholder:"Введите адрес доставки", style:{color: theme.palette.text.primary, background: theme.palette.background.default}}} 
        token="" 
        value={value} onChange={setValue} 
        count={5}
        defaultQuery={defaultAddress}
        selectOnBlur
      />
    </div>
  );
};

export default SelectAddress;
