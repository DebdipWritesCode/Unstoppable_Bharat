from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
import faiss
import pickle
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

# ✅ Load environment variables
load_dotenv()

# ✅ Check API keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("❌ Error: GROQ_API_KEY is missing. Set it in .env.")

if not YOUTUBE_API_KEY:
    raise ValueError("❌ Error: YOUTUBE_API_KEY is missing. Set it in .env.")

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Initialize ChatGroq Model
model = ChatGroq(groq_api_key=GROQ_API_KEY, model_name="llama-3.3-70b-versatile")

# ✅ Initialize Conversation Memory
memory = ConversationBufferMemory()

# ✅ Read text files
def read_txt_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

file1_path = "softskills_job.txt"  # LLM-based file
file2_path = "soft_skill.txt"  # Soft skills retrieval file
text1 = read_txt_file(file1_path)
text2 = read_txt_file(file2_path)

# ✅ Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
chunks1 = text_splitter.split_text(text1)  # LLM processing
chunks2 = text_splitter.split_text(text2)  # Similarity search

# ✅ Load Embedding Model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# ✅ FAISS Index Persistence
FAISS_INDEX_PATH = "faiss_index.pkl"

def save_faiss_index(vector_store, path):
    with open(path, "wb") as f:
        pickle.dump(vector_store, f)

def load_faiss_index(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return pickle.load(f)
    return None

vector_store1 = load_faiss_index(FAISS_INDEX_PATH) or FAISS.from_texts(chunks1, embedding_model)
save_faiss_index(vector_store1, FAISS_INDEX_PATH)

vector_store2 = FAISS.from_texts(chunks2, embedding_model)

retriever1 = vector_store1.as_retriever()
retriever2 = vector_store2.as_retriever()

# ✅ Chatbot Prompt
chat_prompt = PromptTemplate(
    input_variables=["history", "user_input"],
    template="You are a helpful AI assistant. Given the conversation history:\n{history}\n\n"
             "User: {user_input}\n"
             "Respond in one short, precise sentence."
)

# ✅ Upskilling Prompt
upskill_prompt = PromptTemplate(
    input_variables=["context", "profession", "education", "skills"],
    template=(
        "Give top 3 professions without extra text:\n"
        "- **Current Profession**: {profession}\n"
        "- **Highest Education**: {education}\n"
        "- **Technical Skills**: {skills}\n\n"
        "Context:\n{context}\n\n"
        "Recommend the top 3 upskilling professions.\n\n"
        "Provide a **short and precise** answer specific to India."
    )
)

# ✅ Create LLM Chains
chatbot_chain = LLMChain(llm=model, memory=memory, prompt=chat_prompt)
upskill_chain = LLMChain(llm=model, prompt=upskill_prompt)

# ✅ Query Filter Function (Restricts Irrelevant Queries)
def is_relevant_query(user_input):
    restricted_keywords = ["joke", "funny", "weather", "sports", "news", "politics", "movies", "entertainment"]
    return not any(word in user_input.lower() for word in restricted_keywords)

# ✅ Request Body Schemas
class ChatRequest(BaseModel):
    user_input: str

class QueryRequest(BaseModel):
    profession: str
    education: str
    skills: str
    soft_skills: str

class YouTubeRequest(BaseModel):
    topic: str
    max_results: int = 5  # Default max results

# ✅ Chatbot API (Chat with Memory)
@app.post("/chat")
def chat(request: ChatRequest):
    if request.user_input.lower() == "exit":
        return {"response": "Goodbye! Have a great day."}
    
    if not is_relevant_query(request.user_input):
        return {"response": "I'm here to assist with career guidance only. Please ask a relevant question."}

    response = chatbot_chain.run({"user_input": request.user_input})
    return {"response": response}

# ✅ Upskilling & Soft Skills API
@app.post("/query")
def get_query(request: QueryRequest):
    user_query = f"Profession: {request.profession}, Education: {request.education}, Skills: {request.skills}, Soft Skills: {request.soft_skills}"
    
    if not is_relevant_query(user_query):
        return {"error": "Invalid query. Please ask a career-related question."}
    
    # Retrieve documents for LLM
    relevant_docs = retriever1.get_relevant_documents(user_query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
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

# ✅ YouTube Video Retrieval API
@app.post("/youtube")
def youtube_search(request: YouTubeRequest):
    def get_youtube_videos(query, max_results=5):
        url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            "part": "snippet",
            "q": query,
            "key": YOUTUBE_API_KEY,
            "maxResults": max_results,
            "type": "video"
        }
        response = requests.get(url, params=params)
        data = response.json()
        if "error" in data:
            raise HTTPException(status_code=400, detail=f"YouTube API Error: {data['error']['message']}")

        videos = [{"title": item["snippet"]["title"], "url": f'https://www.youtube.com/watch?v={item["id"]["videoId"]}'} for item in data.get("items", [])]

        return videos

    videos = get_youtube_videos(request.topic, request.max_results)
    return {"videos": videos}

# ✅ Run FastAPI Server
# if __name__ == "__main__":
#     import uvicorn
#     print("Starting FastAPI server...")
#     uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
