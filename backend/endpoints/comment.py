from fastapi import APIRouter, HTTPException
from data_base import addNewComment, getCommentsByProdID, getCustomerByEmail
from pydantic import BaseModel

router = APIRouter(prefix='/api/comment')

class addNewCommentC(BaseModel):
    ProdID: int
    userEmail: str
    Text: str


@router.get("/{product_id}")
async def comments_by_prod_id(product_id: int):
    comments = getCommentsByProdID(product_id)
    return comments

@router.post("/")
async def comments_add(addNewCommentData: addNewCommentC):
    User = await getCustomerByEmail(addNewCommentData.userEmail)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    addNewComment(addNewCommentData.ProdID, UserID, addNewCommentData.Text)
    return addNewCommentData