from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from data_base import addNewCustomer, getCustomerByEmail

from auth import auth

router = APIRouter(prefix="/api/session")


class User(BaseModel):
    firstname: str
    lastname: str
    email: str
    address: str
    city: str
    postalcode: str
    country: str
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
    if not getCustomerByEmail(user.email):
        addNewCustomer(user.firstname, user.lastname, user.email, user.password)
        return getCustomerByEmail(user.email)
    raise HTTPException(status_code=468, detail="User with this email is already exist")

async def log_user(user: User):
    customer = getCustomerByEmail(user.email)
    if customer:
        if customer["password"] == user.password:
            return customer
        raise HTTPException(status_code=469, detail="Incorrect password")
    raise HTTPException(status_code=470, detail="User with this email doesn't exist")

@router.post("/create")
async def create_session(session_d : auth.SessionData, action, response : Response):
    customer = await check_user(session_d, action)
    data = auth.SessionData(firstname = customer["firstname"], lastname = customer["lastname"], email = customer["email"], address = customer["address"], city = customer["city"], postalcode = customer["postalcode"], country = customer["country"], password = customer["password"])

    session = uuid4()
    await auth.backend.create(session, data)
    auth.cookie.attach_to_response(response, session)
    return f"created session for {data}"



@router.get("/whoami", dependencies=[Depends(auth.cookie)], response_model = auth.SessionDataOut)
async def whoami(session_data: auth.SessionData = Depends(auth.verifier)):
    return session_data


@router.post("/delete")
async def del_session(response: Response, session_id: UUID = Depends(auth.cookie)):
    try:
        await auth.backend.delete(session_id)
        auth.cookie.delete_from_response(response)
        return "deleted session"
    except Exception as e:
        raise HTTPException(status_code=403, detail="Session doesn't exist")
