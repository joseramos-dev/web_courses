from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.src.users.models import UserModel
from backend.src.users.schemas import UserCreateSchema, UserSchema, UserLoginSchema

users_router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@users_router.get("/", response_model=list[UserSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users


@users_router.get("/{user_id}", response_model=UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter_by(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@users_router.post("/", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
def create_user(new_user: UserCreateSchema, db: Session = Depends(get_db)):
    existing_name = db.query(UserModel).filter(UserModel.name == new_user.name).first()
    if existing_name:
        raise HTTPException(status_code=400, detail="name already registered")
    existing_email = db.query(UserModel).filter(UserModel.email == new_user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = UserModel(
        name=new_user.name,
        email=new_user.email,
        password=new_user.password,
        role=new_user.role,
    )
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error interno al crear el usuario") from e
    return user


@users_router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()


@users_router.post("/login", response_model=UserSchema)
def login(user: UserLoginSchema, db: Session = Depends(get_db)):
    user_found = (
        db.query(UserModel)
        .filter(
            or_(
                UserModel.name == user.name_or_email,
                UserModel.email == user.name_or_email,
            )
        )
        .first()
    )
    if not user_found:
        raise HTTPException(status_code=404, detail="User not found")
    if user.password != user_found.password:
        raise HTTPException(status_code=401, detail="Credentials not valid")
    return user_found

@users_router.put("/", response_model=UserSchema)
def update_user(user: UserSchema, db: Session = Depends(get_db)):
    user_db = db.query(UserModel).filter(UserModel.id == user.id).first()
    user_db.name = user.name
    user_db.email = user.email
    user_db.password = user.password
    user_db.role = user.role
    user_db.date_creation = user.date_creation
    db.commit()
    db.refresh(user_db)
    return user_db
