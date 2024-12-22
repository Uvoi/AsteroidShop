import React, { useEffect, useState } from 'react';
import './styles.css';
import { AddressSuggestions, DaDataSuggestion, DaDataAddress } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'; 
import { useTheme } from '../../themes/ThemeProvider';

interface SelectAddressProps {
  returnAddress: (address: string) => void; 
  defaultAddress: string;
}

const SelectAddress: React.FC<SelectAddressProps> = ({ returnAddress, defaultAddress }) => {
  const { theme } = useTheme();

  const [value, setValue] = useState<DaDataSuggestion<DaDataAddress> | undefined>();
 
  useEffect(() => {
    if (value?.value) {
      returnAddress(value.value);
    }
  }, [value]);

  useEffect(() => {
    returnAddress(defaultAddress);
  }, [defaultAddress]);

  return (
    <div className="SelectAddress">
      <AddressSuggestions 
        inputProps={{
          placeholder: "Введите адрес доставки",
          style: {
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
          },
        }}
        token="8a2947c6ee5957d51e88f53249e9ebe9e2da0498"
        value={value}
        onChange={(suggestion) => setValue(suggestion)}
        count={5}
        defaultQuery={defaultAddress}
        selectOnBlur
      />
    </div>
  );
};

export default SelectAddress;
