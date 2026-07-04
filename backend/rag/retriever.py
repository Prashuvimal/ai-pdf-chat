from langchain_chroma import Chroma
from rag.embeddings import get_embeddings

DB_PATH = "chroma_db"


def get_vectorstore(collection_name):

    embeddings = get_embeddings()

    return Chroma(
        persist_directory=DB_PATH,
        embedding_function=embeddings,
        collection_name=collection_name,
    )


def get_retriever(collection_name):

    vectorstore = get_vectorstore(collection_name)

    return vectorstore.as_retriever(
        search_kwargs={"k": 8}
    )


def get_all_chunks(collection_name):

    vectorstore = get_vectorstore(collection_name)

    docs = vectorstore.get()

    return docs