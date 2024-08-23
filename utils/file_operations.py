import os
from PIL import Image
import av
from config import UPLOAD_FOLDER, CONVERTED_FOLDER

def create_folders():
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(CONVERTED_FOLDER, exist_ok=True)

def convert_avif_to_jpg(input_path, output_path):
    container = av.open(input_path)
    for frame in container.decode(video=0):
        img = Image.fromarray(frame.to_rgb().to_ndarray())
        img.save(output_path, 'JPEG')
        print(f"Converted '{input_path}' to '{output_path}'")
    container.close()
    try:
        os.remove(input_path)
        print(f"File '{input_path}' deleted successfully.")
    except FileNotFoundError:
        print(f"File '{input_path}' not found.")