from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "thatta_portal.db"
SAMPLE_DATA_PATH = BASE_DIR / "data" / "sample_data.json"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS heritage (
                id INTEGER PRIMARY KEY,
                name_sindhi TEXT NOT NULL,
                description_sindhi TEXT NOT NULL,
                image_url TEXT,
                map_lat REAL,
                map_lng REAL,
                source_url TEXT
            );

            CREATE TABLE IF NOT EXISTS crafts (
                id INTEGER PRIMARY KEY,
                name_sindhi TEXT NOT NULL,
                description_sindhi TEXT NOT NULL,
                image_url TEXT,
                source_url TEXT
            );

            CREATE TABLE IF NOT EXISTS environment (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                temperature REAL,
                humidity REAL,
                rainfall REAL,
                lake_level REAL,
                source_url TEXT
            );

            CREATE TABLE IF NOT EXISTS personalities (
                id INTEGER PRIMARY KEY,
                name_sindhi TEXT NOT NULL,
                description_sindhi TEXT NOT NULL,
                source_url TEXT
            );
            """
        )


def seed_from_sample(force: bool = False) -> None:
    init_db()
    data = json.loads(SAMPLE_DATA_PATH.read_text(encoding="utf-8"))
    with get_connection() as conn:
        if force:
            for table in ("heritage", "crafts", "environment", "personalities"):
                conn.execute(f"DELETE FROM {table}")

        existing = conn.execute("SELECT COUNT(*) AS total FROM heritage").fetchone()["total"]
        if existing and not force:
            return

        conn.executemany(
            """
            INSERT OR REPLACE INTO heritage
            (id, name_sindhi, description_sindhi, image_url, map_lat, map_lng, source_url)
            VALUES (:id, :name_sindhi, :description_sindhi, :image_url, :map_lat, :map_lng, :source_url)
            """,
            data["heritage"],
        )
        conn.executemany(
            """
            INSERT OR REPLACE INTO crafts
            (id, name_sindhi, description_sindhi, image_url, source_url)
            VALUES (:id, :name_sindhi, :description_sindhi, :image_url, :source_url)
            """,
            data["crafts"],
        )
        conn.executemany(
            """
            INSERT INTO environment
            (timestamp, temperature, humidity, rainfall, lake_level, source_url)
            VALUES (:timestamp, :temperature, :humidity, :rainfall, :lake_level, :source_url)
            """,
            data["environment"],
        )
        conn.executemany(
            """
            INSERT OR REPLACE INTO personalities
            (id, name_sindhi, description_sindhi, source_url)
            VALUES (:id, :name_sindhi, :description_sindhi, :source_url)
            """,
            data.get("personalities", []),
        )


def fetch_all(table: str) -> list[dict[str, Any]]:
    allowed = {"heritage", "crafts", "environment", "personalities"}
    if table not in allowed:
        raise ValueError(f"Unsupported table: {table}")
    order = "timestamp DESC" if table == "environment" else "id ASC"
    with get_connection() as conn:
        rows = conn.execute(f"SELECT * FROM {table} ORDER BY {order}").fetchall()
    return [dict(row) for row in rows]


def replace_table(table: str, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return

    columns = list(rows[0].keys())
    placeholders = ", ".join(f":{column}" for column in columns)
    column_sql = ", ".join(columns)

    with get_connection() as conn:
        conn.execute(f"DELETE FROM {table}")
        conn.executemany(f"INSERT OR REPLACE INTO {table} ({column_sql}) VALUES ({placeholders})", rows)


def insert_environment(row: dict[str, Any]) -> None:
    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO environment
            (timestamp, temperature, humidity, rainfall, lake_level, source_url)
            VALUES (:timestamp, :temperature, :humidity, :rainfall, :lake_level, :source_url)
            """,
            row,
        )
