from sqlalchemy.orm import Session
from schemas.todo_schemas import TodoCreate
from models.todo import Todo


class TodoService:
    """
    This class defines the TodoService for the database.
    """

    @staticmethod
    def get_user_todos(db: Session, user_id: str, skip: int = 0, limit: int = 100):
        """
        This method gets the user todos from the database.
        """
        return (
            db.query(Todo)
            .filter(Todo.owner_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def create_todo(db: Session, item: TodoCreate, user_id: str):
        """
        This method creates the user todos in the database.
        """
        todo = Todo(**item, owner_id=user_id)
        db.add(todo)
        db.commit()
        db.refresh(todo)
        return todo

    @staticmethod
    def update_todo(db: Session, user_id: str, todo_id: str, item: TodoCreate):
        """
        This method updates the user todos in the database.
        """
        todo = (
            db.query(Todo).filter(Todo.owner_id == user_id, Todo.id == todo_id).first()
        )
        if not todo:
            return None
        for key, value in item.dict().items():
            if value is not None:
                setattr(todo, key, value)
        db.commit()
        db.refresh(todo)
        return todo

    @staticmethod
    def delete_todo(db: Session, user_id: str, todo_id: str):
        """
        This method deletes the user todos in the database.
        """
        todo = (
            db.query(Todo).filter(Todo.owner_id == user_id, Todo.id == todo_id).first()
        )
        if not todo:
            return None
        db.delete(todo)
        db.commit()
        return todo
