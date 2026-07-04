import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

from rag.retriever import get_retriever, get_all_chunks

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY")
)


# -------------------------
# Existing Question Answering
# -------------------------

def ask_pdf(question, collection_name):

    retriever = get_retriever(collection_name)

    docs = retriever.invoke(question)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are an AI assistant.

Answer ONLY using the context below.

If the answer is not present, reply exactly:

"I couldn't find that information in the uploaded PDF."

Context:
{context}

Question:
{question}
"""

    response = llm.invoke(prompt)

    return response.content


# -------------------------
# Whole PDF Summarization
# -------------------------

def summarize_pdf(collection_name):

    data = get_all_chunks(collection_name)

    chunks = data["documents"]

    print(f"Total Chunks : {len(chunks)}")

    batch_size = 15

    batch_summaries = []

    for i in range(0, len(chunks), batch_size):

        batch = chunks[i:i + batch_size]

        context = "\n\n".join(batch)

        prompt = f"""
Summarize the following part of a document.

Keep important facts.

Mention important names, concepts,
events, headings and conclusions.

Document Part:

{context}
"""

        summary = llm.invoke(prompt).content

        batch_summaries.append(summary)

        print(f"Finished Batch {len(batch_summaries)}")

    print("Creating Final Summary...")

    final_prompt = f"""
The following are summaries of different parts of one large document.

Combine them into ONE comprehensive summary.

Structure it using:

1. Executive Summary

2. Main Topics

3. Important Details

4. Key Takeaways

5. Final Conclusion


Summaries:

{chr(10).join(batch_summaries)}
"""

    final_summary = llm.invoke(final_prompt)

    return final_summary.content