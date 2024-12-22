import axios from "axios";
import { setBasketCount } from './basket';



export interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }


export async function checkSession() {
    try {
        await axios.get(`http://localhost:8000/api/session/whoami`, { withCredentials: true });
        return true;
    } catch (error) {
        return false;
    }
}

export async function createSession(action:number, userData:UserData) {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/session/create?action=${action}`,
        userData,
        { withCredentials: true }
      );
      setBasketCount()
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function changeFullName(first_name:string, last_name:string) {
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


export async function changeAddress(address:string)
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

export async function changePhoto(photoLink:string)
{
    const newPhoto = {
        'photo': photoLink
    };

    try{ 
        await axios.patch(`http://localhost:8000/api/user/photo`, newPhoto, { withCredentials: true })
        console.log("Photo changed");
        return true;
    } catch (error) {
        console.log('Error change photo: ', error);
        return false
    };
}

export async function isUserAdmin() {
    try {
        const response = await axios.get('http://localhost:8000/api/admin', { withCredentials: true });
        return response.data;
    } catch (error) {
        return false;
    }
}

export async function getAllUsers(start:number, count:number) {
    try {
        const response = await axios.get('http://localhost:8000/api/admin/users', {
            params: { 
                start: start, 
                count: count 
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        return false;
    }
}

export async function getUserData(id:number) {
    try {
        const response = await axios.get('http://localhost:8000/api/user', {
            params: { 
                id: id
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        return false;
    }
}

export async function deleteUser(id:number) {
    try {
        const response = await axios.delete('http://localhost:8000/api/admin/user', {
            params: { 
                id: id
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        return false;
    }
}


export async function deleteSession() {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/session/delete',
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  };