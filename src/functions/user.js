import axios from "axios";


export async function checkSession() {
    try {
        await axios.get(`http://localhost:8000/api/session/whoami`, { withCredentials: true });
        return true;
    } catch (error) {
        return false;
    }
}


export async function changeFullName(first_name, last_name) {
    const newName = {
        firstName: first_name,
        lastName: last_name,
    };

    try {
        await axios.patch(`http://localhost:8000/api/user/name`, newName, { withCredentials: true });
        console.log("Name changed");
        return true;
    } catch (error) {
        console.log('Error change name: ', error);
        return false;
    }
}


export async function changeAddress(address)
{
    const newAddress = {
        'address': address
    };

    try{ 
        await axios.patch(`http://localhost:8000/api/user/address`, newAddress, { withCredentials: true })
        console.log("Address changed");
        return true;
    } catch (error) {
        console.log('Error change address: ', error);
        return false
    };
}