from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from qwen_model import DocumentExtractor
from utils import extract_json_from_response
import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()

MODEL_BACKEND_HOST = os.getenv("MODEL_BACKEND_HOST", "0.0.0.0")
MODEL_BACKEND_PORT = int(os.getenv("MODEL_BACKEND_PORT", "8081"))


class InferenceModal(BaseModel):
    base64_string: str


app = FastAPI()
origins = [
    "http://localhost",
    "http://127.0.0.1",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vlm_model = DocumentExtractor("Qwen/Qwen2.5-VL-7B-Instruct")
print(f"loaded VLM model")


@app.post("/inference_re")
async def perform_inference(base64_image: InferenceModal):
    try:
        vlm_result = vlm_model.extract_receipt(base64_image.base64_string)[0]
        if json_result := extract_json_from_response(vlm_result):
            return json_result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run(app, host=MODEL_BACKEND_HOST, port=MODEL_BACKEND_PORT)
