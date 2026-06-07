from database import seed_from_sample


if __name__ == "__main__":
    seed_from_sample(force=True)
    print("Seeded backend/thatta_portal.db with sample data.")
