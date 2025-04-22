import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.v1 import inference

load_dotenv()

MODEL_BACKEND_HOST = os.getenv("MODEL_BACKEND_HOST", "0.0.0.0")
MODEL_BACKEND_PORT = int(os.getenv("MODEL_BACKEND_PORT", "8081"))

app = FastAPI(title="Document Extractor API")

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

# Include API router
app.include_router(inference.router, prefix="/api/v1/inference", tags=["inference"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=MODEL_BACKEND_HOST, port=MODEL_BACKEND_PORT)
