from pydantic import BaseModel

class InferenceModal(BaseModel):
    base64_string: str

class InferenceResponse(BaseModel):
    Merchant: str
    Date: str
    Amount: str
    Category: str