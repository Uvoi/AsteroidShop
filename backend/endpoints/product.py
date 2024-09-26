from uuid import UUID
from fastapi import APIRouter
from data_base import getAllProducts, addNewProduct, getProductByID, getCompositionByID
from pydantic import BaseModel


router = APIRouter(prefix="/api/product")


class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    weight: float
    diameter: float
    imglink: str
    composition: str

@router.get("/")
async def catalog_all():
    return getAllProducts()

@router.post("/")
async def catalog_add(addNewRowData: Product):
    addNewProduct(addNewRowData.name, addNewRowData.description, addNewRowData.price, addNewRowData.weight, addNewRowData.diameter, addNewRowData.imglink, addNewRowData.composition, addNewRowData.id)
    return addNewRowData


@router.get("/{product_id}")
async def asteroid_by_id(product_id: int):
    product_info = getProductByID(product_id)
    composition_info = getCompositionByID(product_id)
    combined_info = {**product_info, **composition_info}
    return combined_info


