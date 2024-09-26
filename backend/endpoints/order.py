from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from data_base import getCustomerByEmail, get_user_orders, add_order, set_status_order, is_user_admin, update_order_status_on_login
from datetime import datetime, timedelta
from pydantic import BaseModel
import random
from auth import auth

router = APIRouter(prefix="/api/order")


class GetUser(BaseModel):
    id: int

class OrderCreateRequest(BaseModel):
    productids: list[int]
    deliveryaddress: str

class OrderId(BaseModel):
    orderid: int

@router.get("/", dependencies=[Depends(auth.cookie)])
async def getUserOrders(
    session_data: auth.SessionData = Depends(auth.verifier),
    query_params:  GetUser = Depends(),):
    customerID = 0

    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']

    if (query_params.id != -1):
        customerID = query_params.id
        update_order_status_on_login(query_params.id)
    else:
        customerID = UserID
    if is_user_admin(UserID):
        orders = get_user_orders(customerID, True)
    else:
        orders = get_user_orders(customerID, False)
    return {"orders": orders}

@router.post("/", dependencies=[Depends(auth.cookie)])
async def addOrder(toOrder: OrderCreateRequest, session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    add_order(
            customerid=UserID,
            productids=toOrder.productids,
            deliveryaddress=toOrder.deliveryaddress,
            orderdate = datetime.now(),
            deliverydate = datetime.now() + timedelta(days=random.randint(3, 5)),
            status = 'In Transit'
        )
    
    return "Order created successfully"

@router.patch("/cancel", dependencies=[Depends(auth.cookie)])
async def cancelOrder(orderID: OrderId):
    set_status_order(orderID.orderid, 'Cancelled')
    
    return "Order was canceled"

@router.patch("/delete", dependencies=[Depends(auth.cookie)])
async def deleteOrder(orderID: OrderId):
    set_status_order(orderID.orderid, 'Deleted')
    
    return "Order was deleted"

