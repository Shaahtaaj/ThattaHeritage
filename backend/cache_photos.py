from __future__ import annotations

import json
import subprocess
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
PHOTO_DIR = PROJECT_DIR / "frontend" / "public" / "photos"

PHOTO_TARGETS = {
    "makli": "Makli_Necropolis",
    "shah-jahan-mosque": "Shah_Jahan_Mosque,_Thatta",
    "keenjhar-lake": "Keenjhar_Lake",
    "haleji-lake": "Haleji_Lake",
    "banbhore": "Banbhore",
    "jam-nizamuddin": "Jam_Nizamuddin_II",
    "keti-bunder": "Keti_Bunder",
    "indus-delta": "Indus_River_Delta",
    "ajrak": "Ajrak",
    "sindhi-topi": "Sindhi_cap",
    "sindhi-embroidery": "Sindhi_embroidery",
    "ralli": "Ralli_quilt",
    "block-printing": "Woodblock_printing_on_textiles",
    "jhimpir": "Jhimpir",
}


def curl_text(url: str) -> str:
    result = subprocess.run(
        ["curl.exe", "-k", "-L", "-sS", url],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return result.stdout


def curl_file(url: str, destination: Path) -> bool:
    result = subprocess.run(
        ["curl.exe", "-k", "-L", "-sS", url, "-o", str(destination)],
        check=False,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return result.returncode == 0 and destination.exists() and destination.stat().st_size > 10_000


def extension_from_url(url: str) -> str:
    suffix = Path(urlparse(url).path).suffix.lower()
    return suffix if suffix in {".jpg", ".jpeg", ".png", ".webp"} else ".jpg"


def main() -> None:
    PHOTO_DIR.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict[str, str]] = {}

    for slug, page in PHOTO_TARGETS.items():
        summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page}"
        try:
            payload = json.loads(curl_text(summary_url))
            source = payload.get("originalimage", {}).get("source") or payload.get("thumbnail", {}).get("source")
            if not source:
                print(f"SKIP {slug}: no image in summary")
                continue
            destination = PHOTO_DIR / f"{slug}{extension_from_url(source)}"
            if curl_file(source, destination):
                manifest[slug] = {
                    "path": f"/photos/{destination.name}",
                    "source_url": payload.get("content_urls", {}).get("desktop", {}).get("page", summary_url),
                    "image_source": source,
                }
                print(f"OK {slug} -> {destination.name}")
            else:
                print(f"FAIL {slug}: download failed")
        except Exception as exc:
            print(f"FAIL {slug}: {exc}")

    (BASE_DIR / "data" / "photo_manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
