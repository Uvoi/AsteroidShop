import axios from "axios";


export async function checkSession() {
    try {
        const response = await axios.get(`http://localhost:8000/api/session/whoami`, { withCredentials: true });
        return true;
    } catch (error) {
        return false;
    }
}

