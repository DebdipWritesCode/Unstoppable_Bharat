from fastapi import FastAPI
import os
import faiss
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

# Initialize FastAPI app
app = FastAPI()

groq_api_key = "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"
model = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.3-70b-versatile")

def read_txt_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

file1_path = "softskills_job.txt"  # File for LLM
file2_path = "soft_skill.txt"  # File for similarity search
text1 = read_txt_file(file1_path)
text2 = read_txt_file(file2_path)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)

# Split text into chunks
chunks1 = text_splitter.split_text(text1)  # For LLM processing
chunks2 = text_splitter.split_text(text2)  # For similarity search only

# Load Embedding Model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store1 = FAISS.from_texts(chunks1, embedding_model)  # For LLM
vector_store2 = FAISS.from_texts(chunks2, embedding_model)  # For similarity only

# Create Retrievers
retriever1 = vector_store1.as_retriever()  # LLM-based retrieval
retriever2 = vector_store2.as_retriever()  # Similarity search only

# Define Prompt
prompt = PromptTemplate(
    input_variables=["context", "profession", "education", "skills"],
    template=(
        "Give directlly top 3 profession dont give any line"
        "- **Current Profession**: {profession}\n"
        "- **Highest Education**: {education}\n"
        "- **Technical Skills**: {skills}\n\n"
        "Relevant Context:\n{context}\n\n"
        "Recommend the top upskilling professions only 3.\n\n"
        "Provide a **short and precise** answer specific to India."
    )
)

llm_chain = LLMChain(llm=model, prompt=prompt)

# Query Function
def query_rag(profession, education, skills, soft_skills, use_llm=True):
    user_query = f"Profession: {profession}, Education: {education}, Skills: {skills}, Soft Skills: {soft_skills}"
    
    if use_llm:
        relevant_docs = retriever1.get_relevant_documents(user_query)
        context = "\n\n".join([doc.page_content for doc in relevant_docs])
        response = llm_chain.run({
            "context": context,
            "profession": profession,
            "education": education,
            "skills": skills
        })
    else:
        relevant_docs = retriever2.get_relevant_documents(user_query)
        soft_skills_list = [doc.page_content for doc in relevant_docs][:3]
        response = "\n".join(soft_skills_list)
    
    return response

@app.get("/query")
def get_query(profession: str, education: str, skills: str, soft_skills: str):
    response1 = query_rag(profession, education, skills, soft_skills, use_llm=True)  # LLM processing
    response2 = query_rag(profession, education, skills, soft_skills, use_llm=False)  # Similarity search
    
    return {
        "upskilling_suggestions": response1,
        "top_soft_skills": response2
    }

if __name__ == "__main__":
    import uvicorn
    print("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
