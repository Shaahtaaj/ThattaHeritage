# Thatta Heritage & Culture Portal with Environmental Info

A self-contained FastAPI + React portal for Thatta heritage, Sindhi crafts, environmental awareness, maps, and Sindhi RTL Q&A.

## Features

- FastAPI backend with SQLite storage
- Scraper module for Wikipedia/Wikimedia Commons sourced heritage and craft data
- Environment collector with configurable PMD API URL and Open-Meteo fallback
- Sindhi RTL AI Q&A stub
- React + Vite frontend with Tailwind CSS, Framer Motion, Chart.js, and Leaflet
- Sample data included for immediate local testing

## Project Structure

```text
backend/
  ai_qa.py
  database.py
  environment.py
  main.py
  scraper.py
  seed_data.py
  data/sample_data.json
frontend/
  src/components/
  src/pages/
  src/App.jsx
  src/main.jsx
  src/index.css
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

Useful endpoints:

- `GET /api/heritage`
- `GET /api/crafts`
- `GET /api/environment`
- `POST /api/ask` with `{ "question": "مڪلي بابت ٻڌايو" }`
- `POST /api/refresh/scrape`
- `POST /api/refresh/environment` refreshes a chart-ready 7-day Open-Meteo weather/rainfall series, or a PMD row when `PMD_API_URL` is configured.
- `python backend/cache_photos.py` downloads real Wikimedia/Wikipedia photos into `frontend/public/photos` for reliable local display.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`.

If your backend is on a different URL, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Data Sources

The sample data is included so the app works immediately. The scraper can refresh online-sourced data from:

- Wikipedia REST API pages for Makli Necropolis, Shah Jahan Mosque, Keenjhar Lake, Haleji Lake, Ajrak, Sindhi cap, Sindhi embroidery, and historic personalities
- Wikimedia Commons image search API for open-license images
- Open-Meteo forecast/archive-friendly API as a no-key demo weather source
- Pakistan Meteorological Department source links are included; set `PMD_API_URL` if you have access to a PMD JSON endpoint

Environment variables:

```env
PMD_API_URL=https://example-pmd-json-endpoint
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
```

## Notes

- Sindhi text is rendered RTL with Noto Nastaliq Urdu from Google Fonts.
- The AI Q&A module is intentionally a local stub. It uses keyword matching today and can later be replaced with embeddings or an LLM.
- Frontend images use locally cached real photos from Wikimedia/Wikipedia under `frontend/public/photos`, plus a React fallback component, so the public website does not depend on hotlinked image availability at runtime.
- All runtime data is persisted in `backend/thatta_portal.db`.
