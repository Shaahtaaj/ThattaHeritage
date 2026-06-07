from __future__ import annotations

from database import fetch_all


def _normalize(text: str) -> str:
    return " ".join(text.strip().lower().split())


def answer_question(question: str) -> dict[str, str]:
    """Local Sindhi Q&A stub.

    The module intentionally avoids external AI dependencies. It performs simple
    Sindhi/English keyword matching over stored heritage, craft, and environment
    records and can later be replaced by embeddings or an LLM.
    """

    q = _normalize(question)
    heritage = fetch_all("heritage")
    crafts = fetch_all("crafts")
    environment = fetch_all("environment")

    keyword_map = {
        "makli": "مڪلي",
        "مڪلي": "مڪلي",
        "mosque": "مسجد",
        "مسجد": "مسجد",
        "shah": "شاھ",
        "keenjhar": "ڪينجھر",
        "ڪينجھر": "ڪينجھر",
        "haleji": "هاليجي",
        "هاليجي": "هاليجي",
        "ajrak": "اجرڪ",
        "اجرڪ": "اجرڪ",
        "cap": "ٽوپي",
        "ٽوپي": "ٽوپي",
        "weather": "موسم",
        "rain": "برسات",
        "موسم": "موسم",
        "برسات": "برسات",
        "banbhore": "ڀنڀور",
        "ڀنڀور": "ڀنڀور",
        "debal": "ديبل",
        "ديبل": "ديبل",
        "kalan": "ڪلان",
        "ڪلان": "ڪلان",
        "delta": "ڊيلٽا",
        "ڊيلٽا": "ڊيلٽا",
        "keti": "ڪيٽي",
        "ڪيٽي": "ڪيٽي",
        "ralli": "رلي",
        "رلي": "رلي",
        "tile": "ٽائل",
        "ڪاشي": "ڪاشي",
        "nizamuddin": "نظام",
        "نظام": "نظام",
    }

    matched_terms = [value for key, value in keyword_map.items() if key in q]

    for item in heritage + crafts:
        haystack = f"{item.get('name_sindhi', '')} {item.get('description_sindhi', '')}"
        if any(term in haystack for term in matched_terms):
            return {
                "answer": f"{item['name_sindhi']} بابت: {item['description_sindhi']}",
                "source": item.get("source_url", "local-db"),
            }

    if any(term in q for term in ("موسم", "برسات", "rain", "weather", "temperature")) and environment:
        latest = environment[0]
        return {
            "answer": (
                "ٺٽي جي تازي ماحولياتي ڄاڻ: "
                f"گرمي پد {latest['temperature']}°C، نمي {latest['humidity']}٪، "
                f"برسات {latest['rainfall']} ملي ميٽر، ۽ ڍنڍ سطح {latest['lake_level']} ميٽر آهي."
            ),
            "source": latest.get("source_url", "local-db"),
        }

    return {
        "answer": "مهرباني ڪري مڪلي، شاھ جهان مسجد، ڪينجھر، هاليجي، اجرڪ، ٽوپي يا موسم بابت سوال پڇو.",
        "source": "local-ai-stub",
    }
