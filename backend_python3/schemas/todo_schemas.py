"""
This module defines the Todo schema for the database.
"""

from pydantic import BaseModel


class TodoBase(BaseModel):
    """
    This class defines the TodoBase schema for the database.
    """

    title: str
    description: str | None = None


class TodoCreate(TodoBase):
    """
    This class defines the TodoCreate schema for the database.
    """

    pass


class TodoUpdate(TodoBase):
    """
    This class defines the TodoUpdate schema for the database.
    """

    title: str | None = None
    description: str | None = None
    completed: bool | None = None


class Todo(TodoBase):
    """
    This class defines the Todo schema for the database.
    """

    id: int
    owner_id: int

    class Config:
        orm_mode = True
