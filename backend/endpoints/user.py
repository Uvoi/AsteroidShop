from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from data_base import getCustomerByEmail, change_user_name, change_user_address, change_user_photo, is_user_admin, get_customer_by_id
from pydantic import BaseModel
from typing import List
from auth import auth

router = APIRouter(prefix="/api/user")

class UserName(BaseModel):
    firstName: str
    lastName: str

class UserAddress(BaseModel):
    address: str

class UserPhoto(BaseModel):
    photo: str

class GetUser(BaseModel):
    id: int




@router.patch("/name", dependencies=[Depends(auth.cookie)])
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

@router.patch("/address", dependencies=[Depends(auth.cookie)])
async def changeUserAddress(newAddress: UserAddress, session_data: auth.SessionData = Depends(auth.verifier), session_id: UUID = Depends(auth.cookie)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    change_user_address(UserID, newAddress)

    session_data.address = newAddress.address
    await auth.backend.update(session_id, session_data)
    
    return "User address changed"


@router.patch("/photo", dependencies=[Depends(auth.cookie)])
async def changeUserAddress(newPhoto: UserPhoto, session_data: auth.SessionData = Depends(auth.verifier), session_id: UUID = Depends(auth.cookie)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    change_user_photo(UserID, newPhoto)
    session_data.photo = newPhoto.photo
    await auth.backend.update(session_id, session_data)
    
    return "User photo changed"

@router.get("/", dependencies=[Depends(auth.cookie)])
async def getUser(
    query_params:  GetUser = Depends(),
    session_data: auth.SessionData = Depends(auth.verifier)
):
    User = await getCustomerByEmail(session_data.email)  
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    
    UserID = User['id']
    if not is_user_admin(UserID):
        return get_customer_by_id(query_params.id, False)
    return get_customer_by_id(query_params.id, True)