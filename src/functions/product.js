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
