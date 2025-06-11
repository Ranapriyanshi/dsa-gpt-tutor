from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class PromptInput(BaseModel):
    usr_prompt: str


@app.post("/generate-response")
def generate_response(prompt_input: PromptInput):
    return {"response": f"Generated response for: {prompt_input.usr_prompt}"}
