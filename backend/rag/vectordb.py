from langchain_chroma import Chroma
from chromadb import PersistentClient

from rag.embeddings import get_embeddings

DB_PATH = "chroma_db"


def create_vector_store(chunks, collection_name):

    embeddings = get_embeddings()

    vectorstore = Chroma(
        persist_directory=DB_PATH,
        embedding_function=embeddings,
        collection_name=collection_name,
    )

    vectorstore.add_documents(chunks)

    print(f"Created collection: {collection_name}")

    return vectorstore


def delete_collection(collection_name):

    client = PersistentClient(path=DB_PATH)

    try:

        collections = client.list_collections()
        names = [c.name for c in collections]

        if collection_name in names:

            client.delete_collection(collection_name)

            print(f"Deleted collection: {collection_name}")

            return True

        print(f"Collection not found: {collection_name}")

        return False

    except Exception as e:

        print("Delete Error:", e)

        return False