from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil
import re

from rag.pdf_loader import load_pdf
from rag.splitter import split_documents
from rag.vectordb import create_vector_store, delete_collection
from rag.chain import ask_pdf, summarize_pdf

app = FastAPI()


# -----------------------------
# Request Models
# -----------------------------

class Question(BaseModel):
    question: str
    collection_name: str


class SummaryRequest(BaseModel):
    collection_name: str


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Upload Folder
# -----------------------------

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------
# Create Safe Chroma Collection Name
# -----------------------------

def make_collection_name(filename):

    name = os.path.splitext(filename)[0]

    # Replace spaces & invalid chars
    name = re.sub(r"[^a-zA-Z0-9._-]", "_", name)

    # Remove duplicate underscores
    name = re.sub(r"_+", "_", name)

    # Remove invalid start/end chars
    name = name.strip("._-")

    if len(name) < 3:
        name = "pdf_" + name

    return name


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():

    return {
        "message": "AI PDF Chat Backend Running!"
    }


# -----------------------------
# Upload PDF
# -----------------------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load PDF
    documents = load_pdf(file_path)

    # Split into chunks
    chunks = split_documents(documents)

    # Safe collection name
    collection_name = make_collection_name(
        file.filename
    )

    print("Collection:", collection_name)

    # Store into Chroma
    create_vector_store(
        chunks,
        collection_name
    )

    return {
        "filename": file.filename,
        "collection_name": collection_name,
        "pages": len(documents),
        "chunks": len(chunks),
        "message": "PDF uploaded successfully!"
    }


# -----------------------------
# Chat
# -----------------------------

@app.post("/chat")
async def chat(data: Question):

    try:

        answer = ask_pdf(
            data.question,
            data.collection_name
        )

        return {
            "answer": answer
        }

    except Exception as e:

        import traceback
        traceback.print_exc()

        return {
            "answer": str(e)
        }


# -----------------------------
# Summarize Whole PDF
# -----------------------------

@app.post("/summarize")
async def summarize(data: SummaryRequest):

    try:

        summary = summarize_pdf(
            data.collection_name
        )

        return {
            "summary": summary
        }

    except Exception as e:

        import traceback
        traceback.print_exc()

        return {
            "summary": str(e)
        }


# -----------------------------
# Delete PDF
# -----------------------------

@app.delete("/delete/{collection_name}")
async def delete_pdf(collection_name: str):

    success = delete_collection(collection_name)

    if success:

        return {
            "success": True,
            "message": "PDF deleted successfully."
        }

    return {
        "success": False,
        "message": "Collection not found."
    }