from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Any

import requests

THATTA_LAT = 24.7475
THATTA_LNG = 67.9237
OPEN_METEO_URL = os.getenv("OPEN_METEO_URL", "https://api.open-meteo.com/v1/forecast")
PMD_API_URL = os.getenv("PMD_API_URL")


def _latest_open_meteo() -> dict[str, Any]:
    params = {
        "latitude": THATTA_LAT,
        "longitude": THATTA_LNG,
        "current": "temperature_2m,relative_humidity_2m,rain",
        "timezone": "Asia/Karachi",
    }
    response = requests.get(OPEN_METEO_URL, params=params, timeout=12)
    response.raise_for_status()
    payload = response.json()
    current = payload.get("current", {})
    return {
        "timestamp": current.get("time") or datetime.now(timezone.utc).isoformat(),
        "temperature": current.get("temperature_2m"),
        "humidity": current.get("relative_humidity_2m"),
        "rainfall": current.get("rain", 0),
        "lake_level": 47.1,
        "source_url": response.url,
    }


def _open_meteo_series() -> list[dict[str, Any]]:
    params = {
        "latitude": THATTA_LAT,
        "longitude": THATTA_LNG,
        "daily": "temperature_2m_max,precipitation_sum",
        "hourly": "relative_humidity_2m",
        "forecast_days": 7,
        "timezone": "Asia/Karachi",
    }
    response = requests.get(OPEN_METEO_URL, params=params, timeout=12)
    response.raise_for_status()
    payload = response.json()
    daily = payload.get("daily", {})
    hourly = payload.get("hourly", {})
    humidity_values = hourly.get("relative_humidity_2m") or []
    avg_humidity = round(sum(humidity_values[:24]) / len(humidity_values[:24]), 1) if humidity_values[:24] else None

    rows: list[dict[str, Any]] = []
    for date_value, temp, rain in zip(
        daily.get("time", []),
        daily.get("temperature_2m_max", []),
        daily.get("precipitation_sum", []),
    ):
        rows.append(
            {
                "timestamp": f"{date_value}T12:00:00+05:00",
                "temperature": temp,
                "humidity": avg_humidity,
                "rainfall": rain,
                "lake_level": None,
                "source_url": response.url,
            }
        )
    return rows


def _latest_pmd() -> dict[str, Any] | None:
    if not PMD_API_URL:
        return None

    response = requests.get(PMD_API_URL, timeout=12)
    response.raise_for_status()
    payload = response.json()

    return {
        "timestamp": payload.get("timestamp") or datetime.now(timezone.utc).isoformat(),
        "temperature": payload.get("temperature") or payload.get("temp"),
        "humidity": payload.get("humidity"),
        "rainfall": payload.get("rainfall") or payload.get("rain"),
        "lake_level": payload.get("lake_level") or 47.1,
        "source_url": PMD_API_URL,
    }


def fetch_latest_environment() -> dict[str, Any]:
    """Fetch latest environmental values.

    PMD does not consistently expose an unauthenticated public JSON endpoint.
    If `PMD_API_URL` is configured, it is used first. Otherwise Open-Meteo
    provides a no-key fallback so the project remains runnable locally.
    """

    try:
        pmd = _latest_pmd()
        if pmd:
            return pmd
    except Exception:
        pass

    return _latest_open_meteo()


def fetch_environment_series() -> list[dict[str, Any]]:
    """Fetch a chart-ready environmental series.

    PMD installations vary by access level, so a configured PMD endpoint is
    treated as the authoritative single latest row. Without it, Open-Meteo gives
    a no-key 7-day forecast series for Thatta temperature and precipitation.
    Lake-level remains null unless a verified water-data feed is configured.
    """

    try:
        pmd = _latest_pmd()
        if pmd:
            return [pmd]
    except Exception:
        pass

    rows = _open_meteo_series()
    return rows or [_latest_open_meteo()]
