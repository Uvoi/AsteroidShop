from fastapi import APIRouter, HTTPException, Depends, Query
from data_base import getCustomerByEmail, is_user_admin, get_all_users, get_all_orders, get_stats, delete_product_by_id, delete_user_by_id
from pydantic import BaseModel
from auth import auth

router = APIRouter(prefix="/api/admin")


class GetAll(BaseModel):
    start: int
    count: int = 10

class GetUser(BaseModel):
    id: int
    

@router.get("/", dependencies=[Depends(auth.cookie)])
async def isAdmin(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']

    return is_user_admin(UserID)


@router.get("/users", dependencies=[Depends(auth.cookie)])
async def allUser(
    query_params:  GetAll = Depends(),
    session_data: auth.SessionData = Depends(auth.verifier)
):
    User = await getCustomerByEmail(session_data.email)  
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    
    UserID = User['id']
    if not is_user_admin(UserID):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    return get_all_users(query_params.start, query_params.count)
    

@router.get("/orders", dependencies=[Depends(auth.cookie)])
async def allOrders(
    query_params:  GetAll= Depends(),
    session_data: auth.SessionData = Depends(auth.verifier)
):
    User = await getCustomerByEmail(session_data.email)  
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    
    UserID = User['id']
    if not is_user_admin(UserID):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    return get_all_orders(query_params.start, query_params.count)


@router.get("/stats", dependencies=[Depends(auth.cookie)])
async def getStats(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)  
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    if not is_user_admin(UserID):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    return get_stats()


@router.delete("/product", dependencies=[Depends(auth.cookie)])
async def delete_product(
    id: int = Query(...),
    session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    if not is_user_admin(UserID):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    delete_product_by_id(id)
    return {f"Product with ID {id} was successfully deleted"}

@router.delete("/user", dependencies=[Depends(auth.cookie)])
async def deleteUser(
    query_params:  GetUser = Depends(),
    session_data: auth.SessionData = Depends(auth.verifier)
):
    User = await getCustomerByEmail(session_data.email)  
    UserID = User['id']
    if not is_user_admin(UserID):
        raise HTTPException(status_code=404, detail="User isn't admin")
    return delete_user_by_id(query_params.id)

