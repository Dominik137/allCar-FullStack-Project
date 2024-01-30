# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User
with app.app_context(): 
    def seed_users():
        # Creating a few more sample users
        users_data = [
            {"email": "john.doe@example.com", "username": "johndoe"},
            {"email": "jane.smith@example.com", "username": "janesmith"},
            {"email": "bob.jones@example.com", "username": "bobjones"},
        ]

        # Adding users to the database session
        for user_info in users_data:
            user = User(**user_info)
            db.session.add(user)

        # Committing the changes to the database
        db.session.commit()

    # Run the seed function
    seed_users()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!