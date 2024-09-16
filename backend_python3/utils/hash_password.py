import bcrypt

def hash_password(password: str) -> str:
    """Encrypts a password using bcrypt"""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")