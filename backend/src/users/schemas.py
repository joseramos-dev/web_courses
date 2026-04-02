"""Course database schema definitions for the application."""

from enum import Enum
from datetime import datetime

from pydantic import BaseModel


class UserRole(str, Enum):
    """Enumeration of possible user roles within the system."""
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"

class UserSchema(BaseModel):
    """Model for user."""
    id: int
    name: str
    email: str
    password: str
    role: UserRole
    date_creation: datetime

class UserCreateSchema(BaseModel):
    """Model for creating a new course user."""
    name:str
    email: str
    password: str
    role: UserRole

class UserLoginSchema(BaseModel):
    name_or_email: str
    password: str
