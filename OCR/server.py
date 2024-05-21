from paddleocr import PaddleOCR,draw_ocr
from fastapi import FastAPI, UploadFile
import uvicorn
import cv2
import numpy as np

ocr = PaddleOCR(use_angle_cls=True, lang='ro') # need to run only once to download and load model into memory
app = FastAPI()

@app.post("/")
async def root(image: UploadFile):
    img_bytes = await image.read()

    img = cv2.imdecode(np.frombuffer(img_bytes,np.uint8), cv2.IMREAD_COLOR)
    return ocr.ocr(img, cls=True)

if __name__ == '__main__':
    uvicorn.run(app, host = "0.0.0.0", port = 8000)