"""
Entry point for the FastAPI application.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.users.routes import users_router
from backend.src.courses.routes import course_router
from backend.core.database import Base, engine

#para ejecutar --> uvicorn backend.src.main:app --reload

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(users_router)
app.include_router(course_router)

@app.get("/")
async def root():
    """_summary_
    provisional
    """
    return {"status": "ok"}
