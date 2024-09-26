import axios from "axios";

export async function addNewComment(ProdID, userEmail, Text)
{
    const sendCommData = {
        ProdID: ProdID,
        userEmail: userEmail,
        Text: Text
    };
    axios.post(`http://localhost:8000/api/comment/`, sendCommData, { withCredentials: true })
    .then(response => {
        console.log("Success");
    })
    .catch(error => {
        console.log('Error: ', error);
    });
}

export async function getComments(productId) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/comment/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Не удалось подгрузить комментарии', error);
      throw error;
    }
  }