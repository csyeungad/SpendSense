import requests
from utils import encode_image2base64
import json


def save_json_to_file(data, filename):
    """Save JSON data to a file."""
    with open(filename, "w") as json_file:
        json.dump(data, json_file, indent=4)


def test_qwen_re(image_path):
    base64_image = encode_image2base64(image_path)

    response = requests.post(
        "http://localhost:8085/inference_re", json={"base64_string": base64_image}
    )
    print(response)

    return response


if __name__ == "__main__":
    image_path = r"data\re\re_4.jpeg"
    # image_path = r"data\re\re_fairwood.jpeg"
    receipt_result = test_qwen_re(image_path)
    print(receipt_result)
