import axios from "axios";

export async function addNewComment(ProdID, UserID, Text)
{
    const sendCommData = {
        ProdID: ProdID,
        UserID: UserID,
        Text: Text
    };
    axios.post(`http://localhost:8000/api/comments/add`, sendCommData, { withCredentials: true })
    .then(response => {
        console.log("Success");
    })
    .catch(error => {
        console.log('Error: ', error);
    });
}