from fastapi import APIRouter, HTTPException, Response, Depends
from data_base import getAllProducts, addNewProduct, addNewComment, getProductByID, getCompositionByID, getCommentsByProdID
from pydantic import BaseModel

result_all_json = [
    {
        "id": 1,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
        {
        "id": 2,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
        {
        "id": 21,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
        {
        "id": 3,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
    {
        "id": 4,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
    {
        "id": 5,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
    {
        "id": 6,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
        {
        "id": 7,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид Ебейший астероид Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
    {
        "id": 8,
        "title": "Астероид 1" ,
        "description": "Ебейший астероид",
        "weight": 200, 
        "price": 15000,
        "category": 'Железный'
    },
]


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

@router.get("/api/catalog/all")
async def catalog_all():
    return getAllProducts()
    raise HTTPException(status_code=469, detail="Serv error")

@router.get("/api/products/{product_id}")
async def asteroid_by_id(product_id: int):
    product_info = getProductByID(product_id)
    composition_info = getCompositionByID(product_id)
    combined_info = {**product_info, **composition_info}
    return combined_info
    raise HTTPException(status_code=469, detail="Serv error")

@router.get("/api/comments/{product_id}")
async def comments_by_prod_id(product_id: int):
    comments = getCommentsByProdID(product_id)
    # print(comments)
    return comments
    raise HTTPException(status_code=469, detail="Serv error")


@router.post("/api/catalog/add")
async def catalog_add(addNewRowData: addNewRowC):
    # print(addNewRowData)
    addNewProduct(addNewRowData.name, addNewRowData.description, addNewRowData.price, addNewRowData.weight, addNewRowData.diameter, addNewRowData.imglink, addNewRowData.composition, addNewRowData.id)
    return addNewRowData

    raise HTTPException(status_code=470, detail="Serv error")


@router.post("/api/comments/add")
async def comments_add(addNewCommentData: addNewCommentC):
    # print(addNewCommentData)
    addNewComment(addNewCommentData.ProdID, addNewCommentData.UserID, addNewCommentData.Text)
    return addNewCommentData
