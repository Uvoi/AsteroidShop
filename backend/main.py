from fastapi import  FastAPI, Response, Depends
from fastapi.middleware.cors import CORSMiddleware

from endpoints.data import router as data_router


app = FastAPI()

app.include_router(data_router)


origins = [
    "http://localhost:3000",  # Клиент на React, Vue и т.д., если он запущен на порту 3000
    "http://127.0.0.1:3000",   # То же самое, но с другим адресом
    "http://localhost:8000",  # Если ваш клиент тоже тут
    "http://127.0.0.1:8000"   # И этот тоже
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