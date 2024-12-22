import axios from "axios";

export async function getStats() {
    try {
        const response = await axios.get('http://localhost:8000/api/admin/stats', {
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        return false;
    }
}