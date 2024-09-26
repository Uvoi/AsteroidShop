from fastapi import APIRouter, HTTPException, Depends, Query
from data_base import getProductByID, add_products_to_basket, getCustomerByEmail,get_products_from_basket, delete_products_from_basket, delete_basket
from pydantic import BaseModel
from typing import List
from auth import auth


router = APIRouter(prefix="/api/basket")

class addNewRowC(BaseModel):
    id: int
    name: str
    description: str
    price: float
    weight: float
    diameter: float
    imglink: str
    composition: str

class addNewCommentC(BaseModel):
    ProdID: int
    userEmail: str
    Text: str

class ProductList(BaseModel):
    ProdIDs: List[int]

class OrderCreateRequest(BaseModel):
    productids: list[int]
    deliveryaddress: str

class OrderId(BaseModel):
    orderid: int

class GetAll(BaseModel):
    start: int
    count: int = 10
    
class Product(BaseModel):
    id: int

class GetUser(BaseModel):
    id: int


@router.get("/data")
async def getProdsByMass(prod_mass: list[int] = Query(...)):
    prod_mass.sort()
    prods = [getProductByID(i) for i in prod_mass]
    return prods

@router.post("/", dependencies=[Depends(auth.cookie)])
async def basket_add(toBasket: ProductList, session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    add_products_to_basket(UserID, toBasket.ProdIDs)
    return "Products added to basket"

@router.get("/", dependencies=[Depends(auth.cookie)])
async def getProductsFromBasket(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    products = get_products_from_basket(UserID)
    return {"product_ids": products}

@router.patch("/", dependencies=[Depends(auth.cookie)])
async def deleteProductFromBasket(deleteProds: ProductList, session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    
    UserID = User['id']
    delete_products_from_basket(UserID, deleteProds.ProdIDs)
    return "products deleted"

@router.delete("/", dependencies=[Depends(auth.cookie)])
async def deleteProductFromBasket(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    delete_basket(UserID)
    return "basket deleted"

