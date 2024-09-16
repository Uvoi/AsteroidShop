import axios from 'axios';

export async function getCatalog () {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/catalog/all', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    throw error;
  }
};
