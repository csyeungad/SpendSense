from fastapi import APIRouter, HTTPException
from models import InferenceModal, InferenceResponse
from core.qwen_model import DocumentExtractor
from utils import extract_json_from_response

router = APIRouter()

vlm_model = DocumentExtractor("Qwen/Qwen2.5-VL-7B-Instruct")

@router.post("/", response_model=InferenceResponse)
async def perform_inference(base64_image: InferenceModal):
    try:
        raw_result = vlm_model.extract_receipt(base64_image.base64_string)[0]
        json_result = extract_json_from_response(raw_result)
        if json_result:
            return InferenceResponse(**json_result)
        else:
            raise HTTPException(status_code=422, detail="Failed to parse extraction result.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))