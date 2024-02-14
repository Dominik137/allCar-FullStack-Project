# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
# seed.py

# Local imports
from app import app
from models import db

def seed_data():
    with app.app_context():
        print("Dropping existing tables...")
        db.drop_all()

        print("Creating tables...")
        db.create_all()

        print("Seed completed.")

if __name__ == '__main__':
    seed_data()
