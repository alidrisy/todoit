"""
This module defines the User model for the database.
"""

from db.db import Base, engine
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from uuid import uuid4

Base.metadata.create_all(bind=engine)


class User(Base):
    """
    This class defines the User model for the database.
    """

    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True, default=str(uuid4()))
    email = Column(String(100), unique=True, index=True)
    name = Column(String(100))
    password = Column(String(100))
    created_at = Column(String(100), default=(str(datetime.now())))
    updated_at = Column(String(100), default=(str(datetime.now())))
    todos = relationship("Todo", back_populates="owner")

    def to_dict(self):
        """Return a dictionary representation of the User model."""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
