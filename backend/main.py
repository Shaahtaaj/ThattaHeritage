from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai_qa import answer_question
from database import fetch_all, init_db, replace_table, seed_from_sample
from environment import fetch_environment_series, fetch_latest_environment
from scraper import scrape_all

app = FastAPI(title="Thatta Heritage & Culture Portal API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


@app.on_event("startup")
def startup() -> None:
    init_db()
    seed_from_sample(force=False)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Thatta Heritage & Culture Portal API"}


@app.get("/api/heritage")
def heritage() -> list[dict]:
    return fetch_all("heritage")


@app.get("/api/crafts")
def crafts() -> list[dict]:
    return fetch_all("crafts")


@app.get("/api/environment")
def environment() -> list[dict]:
    return fetch_all("environment")


@app.get("/api/personalities")
def personalities() -> list[dict]:
    return fetch_all("personalities")


@app.post("/api/ask")
def ask(payload: QuestionRequest) -> dict[str, str]:
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question is required.")
    return answer_question(payload.question)


@app.post("/api/refresh/scrape")
def refresh_scrape() -> dict[str, int]:
    result = scrape_all(save=True)
    return {key: len(value) for key, value in result.items()}


@app.post("/api/refresh/environment")
def refresh_environment() -> dict:
    rows = fetch_environment_series()
    replace_table("environment", rows)
    return {"rows": len(rows), "latest": rows[0] if rows else fetch_latest_environment()}
