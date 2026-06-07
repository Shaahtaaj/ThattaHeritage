from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import requests

from database import replace_table

WIKI_SUMMARY = "https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
COMMONS_SEARCH = "https://commons.wikimedia.org/w/api.php"


@dataclass
class ScrapeTarget:
    title: str
    name_sindhi: str
    table: str
    lat: float | None = None
    lng: float | None = None
    image_url: str | None = None
    source_url: str | None = None


HERITAGE_TARGETS = [
    ScrapeTarget("Makli_Necropolis", "مڪلي جو قبرستان", "heritage", 24.7461, 67.9006, "/photos/makli.jpg", "https://whc.unesco.org/en/list/143/"),
    ScrapeTarget("Shah_Jahan_Mosque,_Thatta", "شاھ جهان مسجد", "heritage", 24.7475, 67.9237, "/photos/shah-jahan-mosque.jpg"),
    ScrapeTarget("Keenjhar_Lake", "ڪينجھر ڍنڍ", "heritage", 24.9519, 68.0361, "/photos/keenjhar-lake-real.jpg"),
    ScrapeTarget("Haleji_Lake", "هاليجي ڍنڍ", "heritage", 24.7909, 67.7703, "/photos/haleji-lake-real.jpg"),
    ScrapeTarget("Banbhore", "ڀنڀور / ديبل", "heritage", 24.7557, 67.5208, "/photos/banbhore.jpg"),
    ScrapeTarget("Kalan_Kot", "ڪلان ڪوٽ قلعو", "heritage", 24.7216, 67.9287, "/photos/banbhore.jpg"),
    ScrapeTarget("Jam_Nizamuddin_II", "جام نظام الدين ثاني جو مقبرو", "heritage", 24.7373, 67.8998, "/photos/makli.jpg"),
    ScrapeTarget("Keti_Bunder", "ڪيٽي بندر", "heritage", 24.1434, 67.4495, "/photos/keenjhar-lake-real.jpg"),
    ScrapeTarget("Indus_River_Delta", "سنڌو ڊيلٽا", "heritage", 24.0500, 67.6667, "/photos/haleji-lake-real.jpg"),
    ScrapeTarget("Gujo", "گجو شهر", "heritage", 24.74344, 67.76881, "/photos/keenjhar-lake-real.jpg", "https://mapcarta.com/14701010"),
    ScrapeTarget("Jhimpir", "جهمپير پٽي", "heritage", 25.0108, 68.1369, "/photos/keenjhar-lake-real.jpg"),
]

CRAFT_TARGETS = [
    ScrapeTarget("Ajrak", "اجرڪ", "crafts", image_url="/photos/ajrak-chadar.jpg"),
    ScrapeTarget("Sindhi_cap", "سنڌي ٽوپي", "crafts", image_url="/photos/sindhi-topi.jpg"),
    ScrapeTarget("Sindhi_embroidery", "سنڌي ڀرت", "crafts", image_url="/photos/sindhi-embroidery.jpg"),
    ScrapeTarget("Ralli_quilt", "رلي", "crafts", image_url="/photos/ralli-real.jpg"),
    ScrapeTarget("Woodblock_printing_on_textiles", "بلاڪ پرنٽنگ", "crafts", image_url="/photos/ajrak-chadar.jpg"),
]

PERSONALITY_TARGETS = [
    ScrapeTarget("Jam_Nizamuddin_II", "جام نظام الدين ثاني", "personalities"),
    ScrapeTarget("Darya_Khan", "دريا خان", "personalities"),
    ScrapeTarget("Mirza_Isa_Tarkhan", "مرزا عيسيٰ ترخان", "personalities"),
    ScrapeTarget("Mirza_Jani_Beg", "مرزا جاني بيگ", "personalities"),
    ScrapeTarget("Noori_Jam_Tamachi", "نوري ڄام تماچي", "personalities"),
]

SINDHI_DESCRIPTIONS = {
    "Makli_Necropolis": "مڪلي ٺٽي ڀرسان دنيا جي وڏي تاريخي قبرستانن مان هڪ آهي، جتي سنڌ جي حڪمران خاندانن، عالمن ۽ صوفي شخصيتن جا مقبرا محفوظ آهن.",
    "Shah_Jahan_Mosque,_Thatta": "شاھ جهان مسجد ٺٽي جي مغل دور جي شاهڪار عمارت آهي، جنهن جي ڪاشي، محرابن ۽ گنبذن ۾ سنڌي-مغل هنر جو رنگ ملي ٿو.",
    "Keenjhar_Lake": "ڪينجھر ڍنڍ پاڻي، لوڪ ڪهاڻي، پکين ۽ سياحت جو اهم مرڪز آهي، جتي مقامي ماڻهو ٻيڙين ۽ مهمان نوازي سان لاڳاپيل آهن.",
    "Haleji_Lake": "هاليجي ڍنڍ ماحولياتي لحاظ کان اهم آبي ماڳ آهي، خاص طور لڏپلاڻ ڪندڙ پکين ۽ جهنگلي حيات جي مشاهدي لاءِ.",
    "Banbhore": "ڀنڀور قديم بندرگاهه ۽ آثار قديمه جو ماڳ آهي، جتي قلعي، شهر جي ڀتين ۽ ابتدائي اسلامي دور جي مسجد جا نشان ملن ٿا.",
    "Kalan_Kot": "ڪلان ڪوٽ ٺٽي ڀرسان پراڻو قلعو آهي، جنهن جا کنڊر سنڌ جي وچئين دور جي دفاعي ۽ شهري تاريخ ٻڌائين ٿا.",
    "Jam_Nizamuddin_II": "جام نظام الدين ثاني سما دور جو مشهور حاڪم هو؛ مڪلي ۾ سندس مقبرو پٿر جي نفيس گلڪاري ۽ خطاطي لاءِ اهم آهي.",
    "Keti_Bunder": "ڪيٽي بندر سنڌو ڊيلٽا جو سامونڊي علائقو آهي، جتي مڇي مارڻ، مينگرووز، لوڻياٺ ۽ سمنڊ جي واڌ مقامي زندگي سان جڙيل آهن.",
    "Indus_River_Delta": "سنڌو ڊيلٽا ٺٽي جي سامونڊي ماحوليات لاءِ اهم آهي؛ مينگرووز، مڇي ۽ ساحلي آبادي هتي جي قدرتي نظام تي دارومدار رکن ٿا.",
    "Gujo": "گجو ٺٽي ضلعي جو مقامي شهر آهي، جيڪو ڳوٺاڻي رستن، خدمتن ۽ مقامي زندگي جي حوالي سان اهم آهي.",
    "Jhimpir": "جهمپير ۽ ڪينجھر واري پٽي ٺٽي جي پاڻي، جبلن، هوا ۽ ڳوٺاڻي رستن سان لاڳاپيل آهي.",
    "Ajrak": "اجرڪ سنڌي ثقافت جو نمايان ڪپڙو آهي، جنهن ۾ بلاڪ پرنٽنگ، نيرو ۽ ڳاڙهو رنگ ۽ قديم هندسي ڊزائنون شامل آهن.",
    "Sindhi_cap": "سنڌي ٽوپي عزت ۽ ثقافتي سڃاڻپ جي علامت آهي، جنهن ۾ هٿ جي ڪڙهائي ۽ آئينن جو ڪم عام آهي.",
    "Sindhi_embroidery": "سنڌي ڀرت هٿ جي هنر، رنگين ڌاڳن ۽ آئينن جي نفيس ڪم سان مقامي لباس ۽ گهرن کي سينگاريندو آهي.",
    "Ralli_quilt": "رلي رنگين ڪپڙن جا ٽڪرا جوڙي ٺاهيل سنڌي هٿ جو ڪم آهي، جيڪو گهرن، بستري ۽ ثقافتي سينگار ۾ استعمال ٿئي ٿو.",
    "Woodblock_printing_on_textiles": "بلاڪ پرنٽنگ ۾ ڪاٺي بلاڪ ۽ رنگن سان ڪپڙي تي ورجائيندڙ نمونا ٺاهيا ويندا آهن؛ اجرڪ هن هنر جو مشهور روپ آهي.",
    "Mirza_Isa_Tarkhan": "مرزا عيسيٰ ترخان ٺٽي جي ترخان دور سان لاڳاپيل تاريخي شخصيت آهي، جنهن جي دور جا آثار اڄ به مڪلي ۾ ڏسجن ٿا.",
    "Darya_Khan": "دريا خان سما دور جو بهادر سپهه سالار هو، جنهن سنڌ جي دفاع ۽ ٺٽي جي سياسي تاريخ ۾ اهم ڪردار ادا ڪيو.",
    "Mirza_Jani_Beg": "مرزا جاني بيگ ترخان دور جو حڪمران هو، جنهن جي زندگي سنڌ ۽ مغل سلطنت جي سياسي لاڳاپن سان ڳنڍيل هئي.",
    "Noori_Jam_Tamachi": "نوري ڄام تماچي جي لوڪ ڪهاڻي ڪينجھر ڍنڍ ۽ سنڌي شاعري ۾ محبت، عاجزي ۽ مقامي زندگي جي علامت آهي.",
}


def fetch_wikipedia_summary(title: str) -> dict[str, Any]:
    response = requests.get(WIKI_SUMMARY.format(title=title), timeout=12)
    response.raise_for_status()
    return response.json()


def fetch_commons_image(search_term: str) -> str | None:
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": search_term,
        "gsrnamespace": 6,
        "gsrlimit": 1,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
    }
    response = requests.get(COMMONS_SEARCH, params=params, timeout=12)
    response.raise_for_status()
    pages = response.json().get("query", {}).get("pages", {})
    for page in pages.values():
        info = page.get("imageinfo", [])
        if info:
            return info[0].get("url")
    return None


def _record_from_target(index: int, target: ScrapeTarget) -> dict[str, Any]:
    summary: dict[str, Any] = {}
    try:
        summary = fetch_wikipedia_summary(target.title)
    except Exception:
        summary = {}

    image_url = target.image_url or summary.get("thumbnail", {}).get("source") or fetch_commons_image(target.title.replace("_", " "))
    base = {
        "id": index,
        "name_sindhi": target.name_sindhi,
        "description_sindhi": SINDHI_DESCRIPTIONS[target.title],
        "source_url": summary.get("content_urls", {}).get("desktop", {}).get("page")
        or target.source_url
        or f"https://en.wikipedia.org/wiki/{target.title}",
    }
    if target.table in {"heritage", "crafts"}:
        base["image_url"] = image_url
    if target.table == "heritage":
        base["map_lat"] = target.lat
        base["map_lng"] = target.lng
    return base


def scrape_all(save: bool = True) -> dict[str, list[dict[str, Any]]]:
    grouped: dict[str, list[dict[str, Any]]] = {"heritage": [], "crafts": [], "personalities": []}

    for targets in (HERITAGE_TARGETS, CRAFT_TARGETS, PERSONALITY_TARGETS):
        for index, target in enumerate(targets, start=1):
            try:
                grouped[target.table].append(_record_from_target(index, target))
            except Exception:
                continue

    if save:
        for table, rows in grouped.items():
            if rows:
                replace_table(table, rows)

    return grouped


if __name__ == "__main__":
    scraped = scrape_all(save=True)
    print({key: len(value) for key, value in scraped.items()})
