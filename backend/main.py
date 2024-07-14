from fastapi import  FastAPI, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID, uuid4

from endpoints.data import router as data_router
from endpoints.session import router as session_router


app = FastAPI()

app.include_router(data_router)
app.include_router(session_router)


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)