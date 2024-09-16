from services.todo_service import TodoService
from api.routers import router
from api.dependencies import get_db, get_current_user
from schemas.todo_schemas import TodoCreate
from fastapi import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session


@router.post("/todos", tags=["todos"])
def create_todo(
    todo: TodoCreate,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> JSONResponse:
    """Create a new todo."""
    new_todo = TodoService.create_todo(db, todo.dict(), user["id"])
    return JSONResponse(new_todo.to_dict(), status_code=201)


@router.get("/todos", tags=["todos"])
def get_todos(
    user: dict = Depends(get_current_user),
) -> JSONResponse:
    """Get all todos."""
    return JSONResponse([todo.to_dict() for todo in user.todos])


@router.put("/todos/{todo_id}", tags=["todos"])
def update_todo(
    todo_id: str,
    todo: TodoCreate,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> JSONResponse:
    """Update a todo."""
    todo = TodoService.update_todo(db, user.id, todo_id, todo)
    if not todo:
        return JSONResponse({"error": "Todo not found"}, status_code=404)
    return JSONResponse(todo.to_dict())
