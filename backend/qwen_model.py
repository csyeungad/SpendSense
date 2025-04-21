
import os
from time import time
import pathlib

# Use relative path
download_path = pathlib.Path(__file__).parent / 'HF_HOME'
download_path = str(download_path.resolve())

os.environ['HF_HOME'] = download_path
os.environ['HF_HUB_CACHE'] = download_path

import torch
from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor, BitsAndBytesConfig
from qwen_vl_utils import process_vision_info
from prompt import RECIEPT_EXTRACTION
from utils import encode_image2base64, extract_json_from_response

class DocumentExtractor:
    def __init__(self, model_name, title_block_prompt = RECIEPT_EXTRACTION, max_new_tokens=512, resized_height=512, resized_width=1024, min_pixels=256*28*28, max_pixels=2560*28*28):
        self.model_name = model_name
        self.title_block_prompt = title_block_prompt
        self.max_new_tokens = max_new_tokens
        self.resized_height = resized_height
        self.resized_width = resized_width
        self.min_pixels = min_pixels
        self.max_pixels = max_pixels

        #Load in 4 bit quantization
        self.quantization_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="fp4",
            bnb_4bit_use_double_quant=True,
            bnb_4bit_compute_dtype=torch.bfloat16
        )
        #Load in 8 bit quantization
        # self.quantization_config = BitsAndBytesConfig(load_in_8bit=True)
        self.model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
            model_name, 
            torch_dtype="auto", 
            device_map="auto", 
            # quantization_config = self.quantization_config,
        )
        self.processor = AutoProcessor.from_pretrained(model_name, min_pixels=min_pixels, max_pixels=max_pixels)

    def extract_receipt(self, base64_image):
        
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "image": f"data:image;base64,{base64_image}",
                        "resized_height": self.resized_height,
                        "resized_width": self.resized_width,
                    },
                    {
                        "type": "text", 
                        "text": RECIEPT_EXTRACTION
                    },
                ],
            }
        ]

        text = self.processor.apply_chat_template(
            messages, tokenize=False, add_generation_prompt=True
        )
        time1 = time()
        image_inputs, _ = process_vision_info(messages)
        inputs = self.processor(
            text=[text],
            images=image_inputs,
            padding=True,
            return_tensors="pt",
        )

        inputs = inputs.to("cuda")
        time2 = time()
        print(f"Time to process image: {(time2-time1):.4f}s")
        time3 = time()
        generated_ids = self.model.generate(**inputs, max_new_tokens=self.max_new_tokens)
        time4 = time()
        print(f"Time to generate: {(time4-time3):.4f}s")
        time5 = time()
        generated_ids_trimmed = [out_ids[len(in_ids) :] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)]
        output_text = self.processor.batch_decode(generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False)
        time6 = time()
        print(f"Time to decode: {(time6-time5):.4f}s")
        return output_text

if __name__ == '__main__':

    image_path = r'D:\AI_archivist\data\re\re_4.jpeg'
    base64_img = encode_image2base64(image_path)
    print(base64_img[:10])
    extractor = DocumentExtractor("Qwen/Qwen2.5-VL-7B-Instruct")
    output_text = extractor.extract_receipt(base64_img)
    print(output_text)
    json_result = extract_json_from_response(output_text)
    print()

