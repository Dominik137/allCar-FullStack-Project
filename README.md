# AllCar🚗 - Full Stack Web Application

## Introduction
AllCar is a full-stack web application designed to provide users with a centralized platform for managing their vehicles, getting information about their vehicles and locating nearby mechanics. Built with React, Tailwind CSS, Python, Flask, and SQLAlchemy, AllCar offers a seamless user experience that combines the power of modern frontend frameworks with the robustness of a backend built on Flask.

## Features
User Accounts: Users can create accounts to securely store and manage their vehicle information.
Vehicle Inventory Management: Owners can add their cars to the garage, complete with detailed specifications including wheel, engine, and body information.
Integrated GPT Chatbot: Ask questions about your cars and get instant answers with the built-in GPT-powered chatbot.
Summary Generation: Summary of a specific make and model are generated through GPT when adding a car.
Google Maps Integration: Use the integrated Google Maps feature to find nearby mechanics.

## Getting Started
To get started with AllCar, follow these steps:

Clone the repository to your local machine.
Open it in your code editor and make two terminal windows.

## Front End:
```bash
# For the first Window CD into "Frontend", and then CD into "clerk-react"
cd Frontend
cd clerk-react
npm install
# This will install all the needed packages for the front end
npm run dev
this will run a local server past the URL into your browser!
```
## Back End:
```bash
# For the second window Cd Into "Backend"
cd Backend
# The Run 
pipenv install; pipenv shell
# This will download all the backed packages and create a virtual environment
# then cd into "Server"
cd server
# Then run python app.py
python app.py
# This will launch the backend server and then you're good to go!
```
## Usage
- After setting up the application, you can:
- Register or sign in to your account.
- Add cars to your garage with detailed specifications.
- Use the chatbot to get information about your cars.
- Generate summaries of your cars.
- Find nearby mechanics using the Google Maps integration.

## Creator:
- Dominik Arment
- Linked in: https://www.linkedin.com/in/dominik-arment-579a39265/

![dashboard](https://github.com/Dominik137/allCar-FullStack-Project/assets/142343877/e0eac609-47ed-4888-9545-e9b3b134d2e9)

![Garage](https://github.com/Dominik137/allCar-FullStack-Project/assets/142343877/aacaa05c-d72a-4c83-9acd-3cf717f1174a)

![CarPage](https://github.com/Dominik137/allCar-FullStack-Project/assets/142343877/296f9443-b8cd-4114-8131-1b7da2478a1a)
