from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from data_base import addNewCustomer, getCustomerByEmail, get_user_photo, update_order_status_on_login

from auth import auth

router = APIRouter(prefix="/api/session")


class User(BaseModel):
    firstname: str
    lastname: str
    email: str
    address: str
    password: str


async def check_user(user: User, action):
    customer = {}
    if action == '1': #registration
        customer = await reg_user(user)
    elif action == '0': #login
        customer = await log_user(user)
    else:  
        raise HTTPException(status_code=467, detail="Incorrect action")
    return customer


async def reg_user(user: User):
    if not await getCustomerByEmail(user.email):
        addNewCustomer(user.firstname, user.lastname, user.email, user.password)
        return await getCustomerByEmail(user.email)
    raise HTTPException(status_code=468, detail="User with this email is already exist")

async def log_user(user: User):
    customer = await getCustomerByEmail(user.email)
    if customer:
        if customer["password"] == user.password:
            update_order_status_on_login(customer["id"])
            return customer
        raise HTTPException(status_code=469, detail="Incorrect password")
    raise HTTPException(status_code=470, detail="User with this email doesn't exist")

@router.post("/create")
async def create_session(session_d : auth.SessionData, action, response : Response):
    customer = await check_user(session_d, action)
    data = auth.SessionData(firstname = customer["firstname"], lastname = customer["lastname"], email = customer["email"], address = customer["address"], password = customer["password"])

    session = uuid4()
    await auth.backend.create(session, data)
    auth.cookie.attach_to_response(response, session)
    return f"created session for {customer["firstname"], customer["lastname"]}"



@router.get("/whoami", dependencies=[Depends(auth.cookie)], response_model = auth.SessionDataOut)
async def whoami(session_data: auth.SessionData = Depends(auth.verifier)):
    User = await getCustomerByEmail(session_data.email)
    if not User:
        raise HTTPException(status_code=404, detail="User not found")
    UserID = User['id']
    photo = get_user_photo(UserID)
    if photo:
        session_data.photo = photo
    return session_data


@router.post("/delete")
async def del_session(response: Response, session_id: UUID = Depends(auth.cookie)):
    try:
        await auth.backend.delete(session_id)
        auth.cookie.delete_from_response(response)
        return "deleted session"
    except Exception as e:
        raise HTTPException(status_code=403, detail="Session doesn't exist")
