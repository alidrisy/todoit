"""Authentication routes."""

from services.user_service import UserService
from api.routers import router
from datetime import datetime
from fastapi import BackgroundTasks, Depends, Cookie, HTTPException, status
from fastapi.responses import JSONResponse
from api.dependencies import (
    get_db,
    create_access_token,
    get_current_user,
    authenticate_user,
)
from schemas.user_schemas import UserCreate, UserLogin
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated, Any


@router.post("/auth/signup", tags=["auth"])
def create_user(user: UserCreate, db: Session = Depends(get_db)) -> JSONResponse:
    """Create a new user."""

    existing_user = UserService.get_user_by_email(db, user.email)
    if existing_user:
        return JSONResponse({"error": "User already exists"}, status_code=400)

    new_user = UserService.create_user(db, user.dict())
    res = JSONResponse(new_user.to_dict(), status_code=201)
    create_access_token({"userId": new_user.id}, res)
    return res


@router.post("/auth/login", tags=["auth"])
def login(
    user: UserLogin,
) -> JSONResponse:
    """Login a user."""
    db_user = authenticate_user(user.dict())
    if not db_user:
        return JSONResponse({"error": "Invalid credentials"}, status_code=401)

    res = JSONResponse(db_user.to_dict())
    create_access_token({"userId": db_user.id}, res)
    return res
    return response


@router.post("/auth/logout", tags=["auth"])
def logout(
    jwt: Annotated[str | None, Cookie()] = None,
) -> JSONResponse:
    """Logout a user."""
    if not jwt:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie(key="jwt")
    return response


@router.get("/user/me", tags=["auth"])
async def read_users_me(
    current_user: dict = Depends(get_current_user),
) -> JSONResponse:
    """Read current user's information."""
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return JSONResponse(content=current_user.to_dict())
