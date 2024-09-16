"""
This module defines the User schema for the database.
"""

from pydantic import BaseModel
from .todo_schemas import Todo


class UserBase(BaseModel):
    """
    This class defines the UserBase schema for the database.
    """

    pass


class UserCreate(UserBase):
    """
    This class defines the UserCreate schema for the database.
    """

    email: str
    name: str = None
    password: str


class UserLogin(UserBase):
    """
    This class defines the UserLogin schema for the database.
    """

    email: str
    password: str


class User(UserBase):
    id: str
    email: str
    name: str = None
    todos: list[Todo] = []

    class Config:

        orm_model = True
