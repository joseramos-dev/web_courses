""" "
This is the main application file for the FastAPI backend.
It defines the FastAPI app and includes a simple route for testing purposes.
"""

import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from .schema import CourseUserModel

app = FastAPI()

# CORS configuration for local frontend development
# TODO: Update origins for production deployment
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


@app.get("/users")
async def root():
    return aux_getDbTestData()


@app.get("/users/{user_id}")
async def get_user(user_id: int):
    data  = aux_getDbTestData()
    #TODO: Change this to search by user ID instead of index in the list
    if 0 <= user_id < len(data):
        return data[user_id]
    return {"error": "User not found"}


@app.post("/register")
async def create_user(user: CourseUserModel):
    data  = aux_getDbTestData()
    user_dict = user.model_dump()
    user_dict["id"] = len(data) + 1
    data.append(user_dict)
    with aux_getDbFile().open("w", encoding="utf-8") as f:
        json.dump(data, f)
    print(user_dict)
    return user_dict


@app.get("/login")
async def login(userName: str, password: str):
    data  = aux_getDbTestData()
    for user in data:
        if (user["email"] == userName or user["name"] == userName):
            if user["password"] == password:
                return {"message": "Login successful", "user": user}
            else:
                raise HTTPException(status_code=401, detail="Incorrect password")
    raise HTTPException(status_code=404, detail="User not found")

@app.put("/update")
async def update_user(user: CourseUserModel):
    found = False
    data  = aux_getDbTestData()
    user_dict = user.model_dump()
    for i, u in enumerate(data):
        if u["id"] == user.id:
            data[i] = user_dict
            found = True
            break
    if found:
        with aux_getDbFile().open("w", encoding="utf-8") as f:
            json.dump(data, f)
            return {"message": "User updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


###########################################
## Auxiliary functions for testing purposes
###########################################

def aux_getDbTestData():
    db_file = aux_getDbFile()
    with db_file.open("r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"app.py:aux_getDbTestData(): Loaded {len(data)} users from the database.")
    return data

def aux_appendDbTestData(user: CourseUserModel):
    data = aux_getDbTestData()
    user_dict = user.model_dump()
    user_dict["id"] = len(data) + 1
    data.append(user_dict)
    db_file = aux_getDbFile()
    with db_file.open("w", encoding="utf-8") as f:
        json.dump(data, f)
    return user_dict
    
def aux_getDbFile():
    return Path(__file__).resolve().parent / "db_test_py.json"


FAVICON_PATH = Path(__file__).resolve().parent.parent / "static" / "favicon.png"

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(FAVICON_PATH)
