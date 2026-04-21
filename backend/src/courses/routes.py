from pathlib import Path

import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.src.courses.models import CourseModel
from backend.src.courses.schemas import CourseQueryResponse, CourseSchema

course_router = APIRouter(
    prefix="/courses",
    tags=["courses"],
)


@course_router.get("/", response_model=CourseQueryResponse)
def get_courses(
    db: Session = Depends(get_db), skip:int=0, limit:int=100, query: str | None = None
):
    q = db.query(CourseModel)
    if query:
        q = q.filter(CourseModel.title.ilike(f"%{query}%"))
    total = q.count()
    courses_model = q.offset(skip).limit(limit).all()
    courses = [CourseSchema.model_validate(course) for course in courses_model]
    result = CourseQueryResponse(courses=courses, total=total)
    return result


@course_router.post("/initiate_db")
def initiate_db(db: Session = Depends(get_db)):
    file_path = Path("backend/data_analysis/online_courses_clean.csv")
    if not file_path.is_file():
        raise HTTPException(
            status_code=404,
            detail=f"Archivo no encontrado en la ruta: {file_path.absolute()}",
        )
    try:
        data = pd.read_csv(file_path)
        data = data.to_dict(orient="records")
        db.bulk_insert_mappings(CourseModel, data)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error ${str(e)}") from e
