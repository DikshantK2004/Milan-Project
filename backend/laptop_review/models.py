from pydantic import BaseModel

class Review(BaseModel):
    username:str
    user_id:str
    review:str
    laptop:str
    token: str
    
class Info(BaseModel):
    laptop : str
    user_id : str
    token : str