"""
This module defines the Todo model for the database.
"""

from db.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from utils.hash_password import hash_password
from uuid import uuid4
from datetime import datetime


class Todo(Base):
    """
    This class defines the Todo model for the database.
    """

    __tablename__ = "todos"

    id = Column(String(50), primary_key=True, index=True, default=str(uuid4()))
    title = Column(String(255), index=True)
    description = Column(String(255), index=True)
    completed = Column(Boolean, default=False)
    owner_id = Column(String(50), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    owner = relationship("User", back_populates="todos")

    def to_dict(self):
        """
        This method returns the Todo model as a dictionary.
        """
        created_at = self.created_at.isoformat()
        updated_at = self.updated_at.isoformat()
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "owner_id": self.owner_id,
            "created_at": created_at,
            "updated_at": updated_at,
        }
