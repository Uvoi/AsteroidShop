import React, { useState } from 'react';
import './styles.css';
import { Input, Button } from '@mui/material';
import { useNotification } from '../Notification/Notification';
import { addNewProduct } from '../../functions/product';

interface Composition {
  Fe: string;
  Ni: string;
  S: string;
  Mg: string;
  Si: string;
  Al: string;
  Ca: string;
  O: string;
}

interface FormData {
  id: string;
  name: string;
  description: string;
  price: string;
  weight: string;
  diameter: string;
  imgLink: string;
  composition: Composition;
}

interface Errors {
  name?: boolean;
  description?: boolean;
  price?: boolean;
  weight?: boolean;
  diameter?: boolean;
  composition?: boolean;
}

const AddNewProduct: React.FC = () => {
  const showNotification = useNotification();
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: '',
    price: '',
    weight: '',
    diameter: '',
    imgLink: '',
    composition: {
      Fe: '',
      Ni: '',
      S: '',
      Mg: '',
      Si: '',
      Al: '',
      Ca: '',
      O: '',
    },
  });

  const [errors, setErrors] = useState<Errors>({});
  const [remains, setRemains] = useState<number>(0);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name) newErrors.name = true;
    if (!formData.description) newErrors.description = true;
    if (!formData.price) newErrors.price = true;
    if (!formData.weight) newErrors.weight = true;
    if (!formData.diameter) newErrors.diameter = true;

    const compositionValues = Object.values(formData.composition).map((value) =>
      Number(value || 0)
    );
    const compositionSum = compositionValues.reduce((acc, val) => acc + val, 0);
    setRemains(100 - compositionSum);

    if (compositionSum !== 100) {
      newErrors.composition = true;
      showNotification!(
        `Сумма элементов должна быть 100%. Осталось распределить ${100 - compositionSum}%`,
        'red',
        3500
      );
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompositionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      composition: {
        ...prevData.composition,
        [name]: value === '' ? '0' : Math.max(0, Number(value)).toString(),
      },
    }));
  };

  const sendToServ = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      id: formData.id ? Number(formData.id) : 0,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      weight: parseFloat(formData.weight),
      diameter: parseFloat(formData.diameter),
      imglink: formData.imgLink,
      composition: Object.values(formData.composition).map(value => value || '0').join(',')
    };
    
    const success = await addNewProduct(payload);    
    if (success) {
      showNotification!('Продукт успешно добавлен', 'green');
    }
  };

  return (
    <form id="AddToDB">
      <Input
        type="number"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        style={{ border: errors.name ? '1px solid red' : '1px solid #ccc' }}
      />
      <Input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        style={{ border: errors.description ? '1px solid red' : '1px solid #ccc' }}
      />
      <Input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        style={{ border: errors.price ? '1px solid red' : '1px solid #ccc' }}
      />
      <Input
        type="number"
        name="weight"
        placeholder="Weight"
        value={formData.weight}
        onChange={handleInputChange}
        style={{ border: errors.weight ? '1px solid red' : '1px solid #ccc' }}
      />
      <Input
        type="number"
        name="diameter"
        placeholder="Diameter"
        value={formData.diameter}
        onChange={handleInputChange}
        style={{ border: errors.diameter ? '1px solid red' : '1px solid #ccc' }}
      />
      <Input
        type="text"
        name="imgLink"
        placeholder="imgLink"
        value={formData.imgLink}
        onChange={handleInputChange}
      />
      <div id="composition">
        {Object.keys(formData.composition).map((key) => (
          <Input
            key={key}
            type="number"
            name={key}
            placeholder={key}
            value={formData.composition[key as keyof Composition]}
            onChange={handleCompositionChange}
            style={{ border: errors.composition ? '1px solid red' : '1px solid #ccc' }}
          />
        ))}
      </div>
      <Button variant="contained" type="submit" onClick={sendToServ}>
        Add
      </Button>
    </form>
  );
};

export default AddNewProduct;
