from db.db import session
import bcrypt
from services.user_service import UserService
from fastapi import Depends, HTTPException, status, Cookie
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import jwt as jsonwebtoken
import os
from schemas import user_schemas

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")


def verify_password(plain_password, hashed_password):
    """Verify password."""
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password)


def get_user(user: dict | None, db: Session = Depends(get_db)):
    """Get user."""
    if user:
        return UserService.get_user_by_email(db, user["email"])


def authenticate_user(data: dict, password: str):
    """Authenticate user."""
    user = get_user(data)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, res: any):
    """Create access token."""
    token = jsonwebtoken.encode(
        {
            "userId": data["userId"],
            "exp": datetime.now(timezone.utc) + timedelta(days=15),
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    res.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        max_age=15 * 24 * 60 * 60,
        samesite="strict",
        secure=os.getenv("NODE_ENV") != "production",
    )
    return token


async def get_current_user(
    jwt: str | None = Cookie(default=None), db: Session = Depends(get_db)
):
    """Get current user."""
    if not jwt:
        return None

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jsonwebtoken.decode(jwt, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("userId")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = UserService.get_user(db, user_id)
    if user is None:
        raise credentials_exception
    return user.to_dict()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Ensure hashed_password is in bytes
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def authenticate_user(data: dict):
    """Authenticate user."""
    db = session()
    user = UserService.get_user_by_email(db, data["email"])
    print(user)
    if not user:
        return False
    if not verify_password(data["password"], user.password):
        return False
    return user
