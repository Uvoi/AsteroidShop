export function checkSession()
    {
        return false;
    }


export function addBasketInBrowser(prodId)
    {
        if (!localStorage.getItem('countProd'))
            {
                localStorage.setItem('countProd', 1);
            }
            var prodCount = Number(localStorage.getItem('countProd'))
            localStorage.setItem('prod'+prodCount, prodId);
            localStorage.setItem('countProd', prodCount+1)
            getProdsFromLS(prodCount+1)
    }


    export function getProdsFromLS()
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

    export function addToBasket(prodId, user="")
    {
        if (checkSession())
            {
                console.log("addToBasketTrue")
            }
        else
            {
                addBasketInBrowser(prodId)
            }
    }

    export function delProdFromBasket(prodId)
    {
        if (checkSession())
            {
                console.log("delProdFromBasketTrue")
            }
        else
            {
                delProdFromBasketLS(prodId)
            }
    }

    export function delProdFromBasketLS(prodId)
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
    
    export function clearBasket()
    {
        if (checkSession())
            {
                console.log("clearBasketTrue")
            }
        else
            {
                clearBasketLS()
            }
    }

    function clearBasketLS()
    {
        for (let i = localStorage.length-1; i != 0 ; i--) {
            console.log(i)
            const key = localStorage.key(i);
            console.log(key,"--kii")
            if (key.startsWith('prod')) {
                localStorage.removeItem(key);
            }
        }
        localStorage.setItem('countProd', 1)
    }


