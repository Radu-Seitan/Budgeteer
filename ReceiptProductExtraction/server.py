
from typing import Annotated
from fastapi import FastAPI, UploadFile, Form
import uvicorn
from chatgpt import ChatGPT
from prompts import ReceiptPrompt
import requests
import json
app = FastAPI()

chatGPT = ChatGPT()
@app.post("/")
async def root(categories:Annotated[str, Form()], ocr:Annotated[str, Form()]):
    categories = json.loads(categories)
    return chatGPT.handle_prompt(ReceiptPrompt(categories, json.loads(ocr)))

if __name__ == '__main__':
    uvicorn.run(app, host = "0.0.0.0", port = 55124)
