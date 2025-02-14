from fastapi import FastAPI
from pydantic import BaseModel
import os
import faiss
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

# Initialize FastAPI app
app = FastAPI()

# Initialize ChatGroq Model
groq_api_key = "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"
model = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.3-70b-versatile")

# Initialize Conversation Memory
memory = ConversationBufferMemory()

# Read text files
def read_txt_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

file1_path = "softskills_job.txt"  # LLM-based file
file2_path = "soft_skill.txt"  # Soft skills retrieval file
text1 = read_txt_file(file1_path)
text2 = read_txt_file(file2_path)

# Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
chunks1 = text_splitter.split_text(text1)  # LLM processing
chunks2 = text_splitter.split_text(text2)  # Similarity search

# Load Embedding Model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store1 = FAISS.from_texts(chunks1, embedding_model)  # For LLM
vector_store2 = FAISS.from_texts(chunks2, embedding_model)  # For similarity only

# Create Retrievers
retriever1 = vector_store1.as_retriever()  # LLM-based retrieval
retriever2 = vector_store2.as_retriever()  # Similarity search only

# Chatbot Prompt (Ensures Short Answers)
chat_prompt = PromptTemplate(
    input_variables=["history", "user_input"],
    template="You are a helpful AI assistant. Given the conversation history:\n{history}\n\n"
             "User: {user_input}\n"
             "Respond in one short, precise sentence."
)

# Upskilling Prompt
upskill_prompt = PromptTemplate(
    input_variables=["context", "profession", "education", "skills"],
    template=(
        "Give directly top 3 professions, don't add any extra text:\n"
        "If the input is irrelevant related to entertainment,jokes, say: 'I'm here to help with career guidance only.'\n\n"
        "- **Current Profession**: {profession}\n"
        "- **Highest Education**: {education}\n"
        "- **Technical Skills**: {skills}\n\n"
        "Relevant Context:\n{context}\n\n"
        "Recommend the top 3 upskilling professions.\n\n"
        "Provide a **short and precise** answer specific to India."
    )
)

# Create LLM Chains
chatbot_chain = LLMChain(llm=model, memory=memory, prompt=chat_prompt)
upskill_chain = LLMChain(llm=model, prompt=upskill_prompt)

# Request Body Schema
class ChatRequest(BaseModel):
    user_input: str

class QueryRequest(BaseModel):
    profession: str
    education: str
    skills: str
    soft_skills: str


def is_relevant_query(user_input):
    restricted_keywords = ["joke", "funny", "weather", "sports", "news", "politics", "movies", "entertainment"]
    return not any(word in user_input.lower() for word in restricted_keywords)

# Chatbot API (Chat with Memory)
@app.post("/chat")
def chat(request: ChatRequest):
    if request.user_input.lower() == "exit":
        return {"response": "Goodbye! Have a great day."}
    
    if not is_relevant_query(request.user_input):
        return {"response": "I'm here to assist with career guidance only. Please ask a relevant question."}

    response = chatbot_chain.run({"user_input": request.user_input})
    return {"response": response}


# Upskilling & Soft Skills API
@app.post("/query")
def get_query(request: QueryRequest):
    user_query = f"Profession: {request.profession}, Education: {request.education}, Skills: {request.skills}, Soft Skills: {request.soft_skills}"
    
    # Get relevant context for LLM
    relevant_docs = retriever1.get_relevant_documents(user_query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
    # LLM-based upskilling suggestions
    upskill_response = upskill_chain.run({
        "context": context,
        "profession": request.profession,
        "education": request.education,
        "skills": request.skills
    })
    
    # Retrieve top 3 soft skills
    soft_skill_docs = retriever2.get_relevant_documents(user_query)
    top_soft_skills = [doc.page_content for doc in soft_skill_docs][:3]
    
    return {
        "upskilling_suggestions": upskill_response,
        "top_soft_skills": top_soft_skills
    }

# Run FastAPI Server
if __name__ == "__main__":
    import uvicorn
    print("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
