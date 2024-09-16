from sqlalchemy.orm import Session
from schemas import todo_schema as schemas
from models import todo


class TodoService:
    """
    This class defines the TodoService for the database.
    """

    def get_user_todos(db: Session, skip: int = 0, limit: int = 100):
        """
        This method gets the user todos from the database.
        """
        return db.query(todo.Todo)filter().offset(skip).limit(limit).all()

    def create_user_todos(db: Session, item: schemas.ItemCreate, user_id: int):
        """
        This method creates the user todos in the database.
        """
        todo = todo.Todo(**item.dict(), owner_id=user_id)
        db.add(todo)
        db.commit()
        db.refresh(todo)
        return todo
