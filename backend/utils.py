import base64
import json
import re


def extract_json_from_response(response: str) -> dict:
    """
    Identifies and extracts JSON data embedded within a given string.

    This method searches for JSON data within a string, specifically looking for
    JSON blocks that are marked with ```json``` notation. It attempts to parse
    and return the first JSON object found.

    Args:
        text (str): The text containing the JSON data to be extracted.

    Returns:
        dict: The parsed JSON data as a dictionary if successful.
        str: An error message indicating a parsing error or that no JSON data was found.
    """
    # Improved regular expression to find JSON data within a string
    json_regex = r"```json\n\s*\{\n\s*[\s\S\n]*\}\n\s*```"

    # Search for JSON data in the text
    matches = re.findall(json_regex, response)

    # Extract and parse the JSON data if found
    if matches:
        # Removing the ```json and ``` from the match to parse it as JSON
        json_data = matches[0].replace("```json", "").replace("```", "").strip()
        try:
            # Parse the JSON data
            parsed_json = json.loads(json_data)
            return parsed_json
        except json.JSONDecodeError as e:
            return f"Error parsing JSON data: {e}"
    else:
        return "No JSON data found in the string."


def encode_image2base64(image_path):
    """Encode image to base64 string"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def decode_base642byte(base64_string):
    """Decode base64 to byte stream"""
    return base64.b64decode(base64_string)
