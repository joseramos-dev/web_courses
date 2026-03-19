"""Course database schema definitions for the application."""

from enum import Enum

from pydantic import BaseModel


class UserRole(str, Enum):
    """Enumeration of possible user roles within the system."""
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"

class CourseUserModel(BaseModel):
    """Model for creating a new course user."""
    id: int | None = None
    name: str
    email: str
    password: str
    role: UserRole
    date_creation: str
