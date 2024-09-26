from fastapi import  FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from endpoints.session import router as session_router
from endpoints.user import router as user_router
from endpoints.product import router as product_router
from endpoints.order import router as order_router
from endpoints.basket import router as basket_router
from endpoints.comment import router as comment_router
from endpoints.admin import router as admin_router

app = FastAPI()

app.include_router(session_router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(order_router)
app.include_router(basket_router)
app.include_router(comment_router)
app.include_router(admin_router)


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:8000",
    "http://127.0.0.1:8000" 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key="your-very-secret-key",
    session_cookie="myapp_session",
    same_site="None",
    https_only=True
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)