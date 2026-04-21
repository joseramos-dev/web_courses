import enum
from sqlalchemy import Column, DateTime, Enum as SqlEnum, Integer, String
from sqlalchemy.sql.functions import now

from backend.core.database import Base


class UserRole(str, enum.Enum):
    """Enumeration of possible user roles within the system."""
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"


class UserModel(Base):
    __tablename__ = "users"
    id              = Column(Integer, primary_key=True, index=True)
    name            = Column(String, unique=True, index=True, nullable=False)
    email           = Column(String, unique=True, index=True, nullable=False)
    password        = Column(String, nullable=False)
    role            = Column(SqlEnum(UserRole), nullable=False)
    date_creation   = Column(DateTime(timezone=True), server_default=now())
