from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

#DATABASE_URL = os.getenv("DATABASE_URL","postgresql://jsm:123456789@localhost:5432/web_courses")
DATABASE_URL =  "postgresql://jsm:123456789@localhost:5432/web_courses"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    return database to use
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
