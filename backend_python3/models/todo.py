"""
This module defines the Todo model for the database.
"""

from db.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from utils.hash_password import hash_password
from uuid import uuid4


class Todo(Base):
    """
    This class defines the Todo model for the database.
    """

    __tablename__ = "todos"

    id = Column(String(50), primary_key=True, index=True, default=str(uuid4()))
    title = Column(String(255), index=True)
    description = Column(String(255), index=True)
    owner_id = Column(String(50), ForeignKey("users.id"))

    owner = relationship("User", back_populates="todos")

    def to_dict(self):
        """
        This method returns the Todo model as a dictionary.
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "owner_id": self.owner_id,
        }
