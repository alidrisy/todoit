from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from api.routers import router
from models.user import User
from models.todo import Todo
from db.db import engine, Base

Base.metadata.create_all(engine)


app = FastAPI(debug=True)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.router.include_router(router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=3000, reload=True)
