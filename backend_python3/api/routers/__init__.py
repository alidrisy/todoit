from fastapi import APIRouter

router = APIRouter(
    prefix="/api",
)

from api.routers.auth import *
