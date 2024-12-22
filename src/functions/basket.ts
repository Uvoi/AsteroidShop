import axios from "axios";
import { checkSession } from "./user";

function addToBasketLS(prodId:number)
{
    if (!localStorage.getItem('countProd'))
        {
            localStorage.setItem('countProd', '1');
        }
        var prodCount = Number(localStorage.getItem('countProd'))
        localStorage.setItem('prod'+prodCount, String(prodId));
        localStorage.setItem('countProd', String(prodCount+1))
        getBasketLS()
}

function addToBasketServ(prodIds:number[])
{
    axios.post(`http://localhost:8000/api/basket/`, {ProdIDs:prodIds}, { withCredentials: true })
    .then(response => {
    })
    .catch(error => {
        console.log('Error send: ', error);
    });
}

export async function addToBasket(prodIds:number[]) {
    if (await checkSession()) {
        addToBasketServ(prodIds)
    } else {
        addToBasketLS(prodIds[0])
    }
    const countKey = 'countOfProd' + prodIds[0];
    const currentCount = Number(localStorage.getItem(countKey)) || 0;
    localStorage.setItem(countKey, String(currentCount + 1));
}

function delProdFromBasketLS(prodIds:number[])
{
    prodIds.forEach(prod => {        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('prod')) {
                const value = localStorage.getItem(key) || "";
                if (parseInt(value) === prod) {
                    localStorage.removeItem(key);
                    break; 
                }
            }
        }
    });
}

async function delProdFromBasketServ(prodIds:number[])
{
    axios.patch(`http://localhost:8000/api/basket/`, {ProdIDs:prodIds}, { withCredentials: true })
    .then(response => {
    })
    .catch(error => {
        console.log('Error delete: ', error);
    });
}

export async function delProdFromBasket(prodIds:number[], force=false)
{
    if (await checkSession())
        {
            delProdFromBasketServ(prodIds)
        }
    else
        {
            delProdFromBasketLS(prodIds)
        }
    if (force)
    {
        prodIds.forEach(element => {
            localStorage.setItem('countOfProd'+element, String(Number(localStorage.getItem('countOfProd'+element))-1))
        });
    }
    await setBasketCount()
        
}

export function clearBasketLS(force=false)
{
    for (let i = localStorage.length-1; i != -1 ; i--) {
        const key = localStorage.key(i);
        if ((key?.startsWith('prod') || (key?.startsWith('countOfProd') && force)) && key) {
            localStorage.removeItem(key);
        }
    }
    localStorage.removeItem('countProd')
}

async function clearBasketServ()
{
    axios.delete(`http://localhost:8000/api/basket/`, { withCredentials: true })
    .then(response => {
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
    setBasketCount()
}

function getBasketLS()
{
    var stor = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('prod')) {
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
    var basket = []
    if (await checkSession()) {
        basket = await getBasketServ();
    } else {
        basket = getBasketLS();
    }
    setBasketCount(basket)
    return basket;
}

export function sendLSBasketToServ()
{
    var prodIDs = getBasketLS()
    if (prodIDs)
        addToBasketServ(prodIDs)

    clearBasketLS()
    
}

export function getSelectedProds() 
{
    const resultArray = [];
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('countOfProd')) {
        const id = key.replace('countOfProd', '');
        const count = parseInt(localStorage.getItem(key)||"", 10);
        
        for (let j = 0; j < count; j++) {
          resultArray.push(parseInt(id, 10));
        }
      }
    }
    return resultArray;
};


export async function getBasketServByMass(prodIds: number[]) {
  if (prodIds.length != 0)
  {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/basket/data`,
            {
                params: { 
                    prod_mass:prodIds
                },
                paramsSerializer: (params: { [key: string]: number[] }) => {
                    return Object.keys(params)
                    .map(key =>
                        params[key]
                        .map(value => `${key}=${encodeURIComponent(value)}`)
                        .join('&')
                    )
                    .join('&')
                },
                withCredentials: true 
            }
        );
        return response.data;
      } catch (error) {
        console.error('Ошибка при получении продуктов из сервера:', error);
        throw error;
      }
  }
  return []
}


export async function setBasketCount(basket=[]) {
    basket = basket?basket:await getBasket()
    if (basket)
    {
        localStorage.setItem('basketCount', String(basket.length))
    }
    createUpdateBasketEvent()
}  

export async function incBasketCount() {
    localStorage.setItem('basketCount', String(Number(localStorage.getItem('basketCount'))+1))
    createUpdateBasketEvent()
}  

function createUpdateBasketEvent()
{
    const event = new Event('basketCountUpdated')
    window.dispatchEvent(event)
}
