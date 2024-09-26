import axios from "axios";

export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`http://localhost:8000/api/admin/product`, {
            params: { id: id },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
}

export async function addNewProduct(data) {
    try 
    {
        const response = await axios.post('http://127.0.0.1:8000/api/product', data, {withCredentials: true});
        console.log(response.data);
        return true
    }
    catch (error) 
    {
        console.error('Произошла ошибка!', error);
        return false
    }
}

export async function getProduct(id) {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/` + id, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  

  export async function getCatalog () {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/product/', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      throw error;
    }
  };