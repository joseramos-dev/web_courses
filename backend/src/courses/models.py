import enum
from sqlalchemy import Column, Enum as SqlEnum, Integer, String, Float, Text

from backend.core.database import Base

class SiteEnum(str, enum.Enum):
    COURSERA = "Coursera"
    FUTURELEARN = "Future Learn"
    UDACITY = "Udacity"
    SIMPLILEARN = "Simplilearn"
class CategoryEnum(str, enum.Enum):
    NON_DEFINED = "Non defined"
    BUSINESS = "business"
    COMPUTER_SCIENCE = "computer science"
    DATA_SCIENCE = "data science"
    HEALTH = "health"
    INFORMATION_TECHNOLOGY = "information technology"
    PHYSICAL_SCIENCE_AND_ENGINEERING = "physical science and engineering"
    ARTS_AND_HUMANITIES = "arts and humanities"
    LANGUAGE_LEARNING = "language learning"
    SOCIAL_SCIENCES = "social sciences"
    PERSONAL_DEVELOPMENT = "personal development"
    MATH_AND_LOGIC = "math and logic"

class CourseModel(Base):
    __tablename__  = "courses"
    id                  = Column(Integer, primary_key=True, index=True, nullable=False)
    title               = Column(String, index=True, nullable=False)
    url                 = Column(String, unique=True, nullable=False)
    site                = Column(SqlEnum(SiteEnum), nullable=False)
    category            = Column(SqlEnum(CategoryEnum), nullable=False)
    language            = Column(String, index=True, nullable=False)
    course_type         = Column(String, nullable=False)
    subcategory        = Column(String, index=True, nullable=False)
    intro               = Column(Text, nullable=False)
    duration_seconds    = Column(Integer, nullable=False)
    rating             = Column(Float, nullable=False)
