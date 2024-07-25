import axios from "axios";
import { checkSession } from "./user";

function addToBasketLS(prodId)
{
    if (!localStorage.getItem('countProd'))
        {
            localStorage.setItem('countProd', 1);
        }
        var prodCount = Number(localStorage.getItem('countProd'))
        localStorage.setItem('prod'+prodCount, prodId);
        localStorage.setItem('countProd', prodCount+1)
        getBasketLS(prodCount+1)
}

function addToBasketServ(prodId)
{
    axios.post(`http://localhost:8000/api/basket/add`, {ProdIDs:prodId}, { withCredentials: true })
    .then(response => {
        console.log("Prod sended");
    })
    .catch(error => {
        console.log('Error send: ', error);
    });
}

export async function addToBasket(prodId) {
    if (await checkSession()) {
        addToBasketServ(prodId)
    } else {
        addToBasketLS(prodId)
    }
    const countKey = 'countOfProd' + prodId;
    const currentCount = Number(localStorage.getItem(countKey)) || 0;
    localStorage.setItem(countKey, currentCount + 1);
}


function delProdFromBasketLS(prodId)
{
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('prod')) {
            const value = localStorage.getItem(key);
            if (parseInt(value) === prodId) {
                localStorage.removeItem(key);
                break; 
            }
        }
    }
}

async function delProdFromBasketServ(prodId)
{
    axios.patch(`http://localhost:8000/api/basket/`, {ProdID:prodId}, { withCredentials: true })
    .then(response => {
        console.log("Product deleted");
    })
    .catch(error => {
        console.log('Error delete: ', error);
    });
}

export async function delProdFromBasket(prodId)
{
    if (await checkSession())
        {
            delProdFromBasketServ(prodId)
        }
    else
        {
            delProdFromBasketLS(prodId)
        }
}


function clearBasketLS()
{
    for (let i = localStorage.length-1; i != -1 ; i--) {
        console.log(i)
        const key = localStorage.key(i);
        if (key.startsWith('prod') || key.startsWith('countOfProd')) {
            localStorage.removeItem(key);
        }
    }
    localStorage.removeItem('countProd')
}

async function clearBasketServ()
{
    axios.delete(`http://localhost:8000/api/basket/`, { withCredentials: true })
    .then(response => {
        console.log("Basket cleared");
    })
    .catch(error => {
        console.log('Error clear: ', error);
    });
}

export async function clearBasket()
{
    if (await checkSession())
        {
            await clearBasketServ()
        }
}


function getBasketLS()
{
    var stor = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('prod')) {
            const value = localStorage.getItem(key);
            stor.push(Number(value))
        }
    }   
    return(stor)
}

async function getBasketServ() {
    try {
        const response = await axios.get('http://localhost:8000/api/basket/', { withCredentials: true });
        return response.data.product_ids;
    } catch (error) {
        console.log('Error fetching basket: ', error);
        return [];
    }
}

export async function getBasket() {
    if (await checkSession()) {
        return await getBasketServ();
    } else {
        return getBasketLS();
    }
}

export function sendLSBasketToServ()
{
    var prodIDs = getBasketLS()
    if (prodIDs)
        addToBasketServ(prodIDs)
        clearBasketLS()
    
}