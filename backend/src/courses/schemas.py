from enum import Enum
from pydantic import BaseModel

class SiteEnum(str, Enum):
    COURSERA = "Coursera"
    FUTURELEARN = "Future Learn"
    UDACITY = "Udacity"
    SIMPLILEARN = "Simplilearn"
class CategoryEnum(str, Enum):
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

class CourseSchema(BaseModel):
    id: int
    title: str
    url: str
    site: SiteEnum
    category: CategoryEnum
    language: str
    course_type: str
    subcategory: str
    intro: str
    duration_seconds: int
    rating: float
    model_config = {
        "from_attributes": True
    }

class CourseQueryResponse(BaseModel):
    courses: list[CourseSchema]
    total: int
