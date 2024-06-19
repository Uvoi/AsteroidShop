from fastapi import APIRouter, HTTPException, Response, Depends
from data_base import getAllProducts, addNewProduct, addNewComment, getProductByID, getCompositionByID, getCommentsByProdID
from pydantic import BaseModel



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
    #print(addNewCommentData)
    addNewComment(addNewCommentData.ProdID, addNewCommentData.UserID, addNewCommentData.Text)
    return addNewCommentData



@router.post("/api/basket/getByMass")
async def getProdsByMass(prod_mass: list[int]):
    prod_mass.sort()
    prods = []
    for i in prod_mass:
        prods.append(getProductByID(i))
    # print(prods)
    return prods
    raise HTTPException(status_code=469, detail="Serv error")