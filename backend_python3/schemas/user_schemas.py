"""
This module defines the User schema for the database.
"""

from pydantic import BaseModel
from .todo_schemas import Todo


class UserBase(BaseModel):
    """
    This class defines the UserBase schema for the database.
    """

    email: str
    name: str


class UserCreate(UserBase):
    """
    This class defines the UserCreate schema for the database.
    """

    email: str
    name: str = None
    password: str


class User(UserBase):
    id: str
    is_active: bool
    todos: list[Todo] = []

    class Config:

        orm_model = True
