from sqlalchemy.orm import Session
from utils.hash_password import hash_password
from models.user import User
from schemas import user_schemas as schemas


class UserService:

    @staticmethod
    def get_user(db: Session, user_id):
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user: schemas.UserCreate):
        passw = user["password"]
        db_user = User(email=user["email"], password=hash_password(passw))
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
