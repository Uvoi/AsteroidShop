from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from data_base import getAllProducts, addNewProduct, addNewComment, getProductByID, getCompositionByID, getCommentsByProdID, add_products_to_basket, getCustomerByEmail,get_products_from_basket, delete_product_from_basket, delete_basket, change_user_name, change_user_address
from pydantic import BaseModel
from typing import List
from auth import auth


router = APIRouter()

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
    UserID: int
    Text: str

class Product(BaseModel):
    ProdID: int

class ProductList(BaseModel):
    ProdIDs: List[int]

class UserName(BaseModel):
    firstName: str
    lastName: str

class UserAddress(BaseModel):
    address: str


@router.get("/api/catalog/all")
async def catalog_all():
    return getAllProducts()

@router.get("/api/products/{product_id}")
async def asteroid_by_id(product_id: int):
    product_info = getProductByID(product_id)
    composition_info = getCompositionByID(product_id)
    combined_info = {**product_info, **composition_info}
    return combined_info

@router.get("/api/comments/{product_id}")
async def comments_by_prod_id(product_id: int):
    comments = getCommentsByProdID(product_id)
    return comments

@router.post("/api/catalog/add")
async def catalog_add(addNewRowData: addNewRowC):
    addNewProduct(addNewRowData.name, addNewRowData.description, addNewRowData.price, addNewRowData.weight, addNewRowData.diameter, addNewRowData.imglink, addNewRowData.composition, addNewRowData.id)
    return addNewRowData

@router.post("/api/comments/add")
async def comments_add(addNewCommentData: addNewCommentC):
    addNewComment(addNewCommentData.ProdID, addNewCommentData.UserID, addNewCommentData.Text)
    return addNewCommentData

@router.post("/api/basket/getByMass")
async def getProdsByMass(prod_mass: list[int]):
    prod_mass.sort()
    prods = []
    for i in prod_mass:
        prods.append(getProductByID(i))
    return prods

@router.post("/api/basket/add", dependencies=[Depends(auth.cookie)])
async def basket_add(toBasket: ProductList, session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    add_products_to_basket(UserID, toBasket.ProdIDs)
    return "Products added to basket"

@router.get("/api/basket/", dependencies=[Depends(auth.cookie)])
async def getProductsFromBasket(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    products = get_products_from_basket(UserID)
    return {"product_ids": products}

@router.patch("/api/basket/", dependencies=[Depends(auth.cookie)])
async def deleteProductFromBasket(deleteProd: Product, session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    
    UserID = User['id']
    delete_product_from_basket(UserID, deleteProd.ProdID)
    return "product deleted"

@router.delete("/api/basket/", dependencies=[Depends(auth.cookie)])
async def deleteProductFromBasket(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    delete_basket(UserID)
    return "basket deleted"

@router.patch("/api/user/name", dependencies=[Depends(auth.cookie)])
async def changeUserName(newName: UserName, session_data: auth.SessionData = Depends(auth.verifier), session_id: UUID = Depends(auth.cookie)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    change_user_name(UserID, newName)

    session_data.firstname = newName.firstName
    session_data.lastname = newName.lastName
    await auth.backend.update(session_id, session_data)

    return "UserName changed"

@router.patch("/api/user/address", dependencies=[Depends(auth.cookie)])
async def changeUserAddress(newAddress: UserAddress, session_data: auth.SessionData = Depends(auth.verifier), session_id: UUID = Depends(auth.cookie)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    change_user_address(UserID, newAddress)

    session_data.address = newAddress.address
    await auth.backend.update(session_id, session_data)
    
    return "User address changed"
