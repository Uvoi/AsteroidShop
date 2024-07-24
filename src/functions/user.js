import axios from "axios";


export async function checkSession() {
    try {
        const response = await axios.get(`http://localhost:8000/api/session/whoami`, { withCredentials: true });
        return true;
    } catch (error) {
        return false;
    }
}

export function changeFullName(firstName, lastName)
{
    const newName = {
        'firstName': firstName,
        'lastname': lastName
    }
    axios.patch(`http://localhost:8000/api/user/name`, {newName}, { withCredentials: true })
    .then(response => {
        console.log("Name changed");
    })
    .catch(error => {
        console.log('Error change name: ', error);
    });
}

export function changeAddress(address)
{
    const newAddress = {
        'address': address
    }
    axios.patch(`http://localhost:8000/api/user/address`, {newAddress}, { withCredentials: true })
    .then(response => {
        console.log("Address changed");
    })
    .catch(error => {
        console.log('Error change address: ', error);
    });
}