# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from openai import OpenAI
import requests
import json
import os
import time
from dotenv import load_dotenv

# Local imports
from config import app, db, api
from models import *
# Add your model imports

# Views go here!
load_dotenv()
api_token = os.getenv("CARAPI_API_TOKEN")
api_secret = os.getenv("CARAPI_API_SECRET")
wheel_api = os.getenv('WHEELAPI_KEY')
gpt_key= os.getenv("OPENAI_KEY")
client = OpenAI(api_key=gpt_key)

@app.route('/')
def index():
    pass
@app.route('/api/users', methods=["GET", "POST"])
def user():

    if request.method == "GET":
        u_list = []
        users = User.query.all()

        for user in users:
            u_list.append(user.to_dict())

        return jsonify(u_list), 200
    
    if request.method == "POST":
        new_user = User(username=request.json['username'], email=request.json['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 200
    

@app.route('/api/car_info', methods=["Get", "POST"])
def car_info():
    if request.method == "POST":
        request_data = request.json  # Storing request.json in a variable
    
        def generate_summary(make, model, model_type="gpt-3.5-turbo", max_tokens=150, temperature=0.7):
            prompt = f"Give me a summary of a {make} {model}"
            messages = [{"role": "user", "content": prompt}]
            response = client.chat.completions.create(
                model=model_type,
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature
            )
            return response.choices[0].message.content

        # Assuming `request_data` and `client` are properly defined earlier
        summary_info = generate_summary(request_data.get('make'), request_data.get('modelForEng'))

        def get_wheel_info(make, model, year, region, api_key):
            url = f"https://api.wheel-size.com/v2/search/by_model/?make={make}&model={model}&year={year}&region={region}&user_key={api_key}"
            response = requests.get(url)
            
            

            if response.status_code ==  200:
                data = response.json()
                if data["data"] and len(data["data"]) >  0:
                    first_item = data["data"][0]
                    trim = first_item["name"].split()[0]
                    # Extract only the 'front' part of the first wheel object
                    front_wheel_data = first_item["wheels"][0]["front"] if first_item["wheels"] else None
                    saved_item = {
                        "trim": trim,
                        "technical": first_item["technical"],
                        "wheels": {"front": front_wheel_data}
                    }
                    return saved_item
                else:
                    return None
            else:
                return None

        wheel_info = get_wheel_info(request_data.get('make'), request_data.get('modelForEng'), request_data.get('year'), "usdm", wheel_api)
        # print(wheel_info)
        
        
        def get_body_info():
            login_url = "https://carapi.app/api/auth/login"
            bodies_url = "https://carapi.app/api/bodies"

            # Prepare the request body for authentication
            login_data = {
                "api_token": api_token,
                "api_secret": api_secret
            }

            # Authenticate and get the JWT token
            response = requests.post(login_url, json=login_data)

            # Check if the authentication was successful
            if response.status_code == 200:
                jwt_token = response.text.strip()  # Extract the JWT token
                headers = {
                    "Authorization": f"Bearer {jwt_token}",
                    "Accept": "application/json"
                }
                
                # Make a request to fetch bodies data
                # print(request_data.get('modelForEng'))
                params = {
                    "make": request_data.get('make'),
                    "model": request_data.get('modelForEng'),
                    "year": request_data.get('year'),
                    "id": 1,
                    "limit": 1
                }
                bodies_response = requests.get(bodies_url, params=params, headers=headers)

                # Check if the request was successful
                if bodies_response.status_code == 200:
                    bodies_data = bodies_response.json()
                    # print("Bodies data:", bodies_data['data'])
                    return (bodies_data['data'])
                else:
                    print("Failed to fetch bodies data:", bodies_response.status_code, "-", bodies_response.text)
            else:
                print("Failed to authenticate:", response.status_code, "-", response.text)
        body_info = get_body_info()
        def get_engine_info():
            login_url = "https://carapi.app/api/auth/login"
            engine_data_url = "https://carapi.app/api/engines?limit=&sort=make_model_trim_id&direction=asc&verbose=yes"

            # Prepare the request body for authentication
            login_data = {
                "api_token": api_token,
                "api_secret": api_secret
            }

            # Authenticate and get the JWT token
            response = requests.post(login_url, json=login_data)

            # Check if the authentication was successful
            if response.status_code == 200:
                jwt_token = response.text.strip()  # Extract the JWT token
                headers = {
                    "Authorization": f"Bearer {jwt_token}",
                    "Accept": "application/json"
                }
                # print(jwt_token)
                # Make a request to fetch engine data
                # print(request_data.get('modelForEng'))
                params = {
                    "make": request_data.get('make'),
                    "model": request_data.get('modelForEng'),
                    "year": request_data.get('year'),
                    "id": 1
                }
                engine_response = requests.get(engine_data_url, params=params, headers=headers)

                # Check if the request was successful
                if engine_response.status_code == 200:
                    engine_data = engine_response.json()
                    # print("Engine data:", engine_data)
                    return (engine_data['data'])  # Return the fetched engine data
                else:
                    print("Failed to fetch engine data:", engine_response.status_code, "-", engine_response.text)
                    return None  # Return None if failed to fetch engine data
            else:
                print("Failed to authenticate:", response.status_code, "-", response.text)
                return None  # Return None if failed to authenticate
            

        # Call the get_engine_info function with the extracted parameters
        engine_info = get_engine_info()
        # print(engine_info)
        new_car_info = CarInfo(year=request_data.get('year'), make=request_data.get('make'), model=request_data.get('model'), mileage=request_data.get('mileage'),
                                general_info=request_data.get('general_info'), engine_info=json.dumps(engine_info),
                                body_info=json.dumps(body_info),
                                wheel_info=json.dumps(wheel_info),
                                summary=(summary_info))
                                
                               
            
        db.session.add(new_car_info)
        db.session.commit()
            
        return jsonify(new_car_info.to_dict()), 200
    else:
            # Handle the case where engine information retrieval fails
        return jsonify({"error": "Failed to retrieve engine information"}), 500



@app.route('/api/car_info/<int:car_info_id>', methods=["GET", "POST", "PATCH"])
def car_info_id(car_info_id):
    car_info = CarInfo.query.get_or_404(car_info_id)

    if request.method == "GET":
        # Handle GET logic
        pass
    elif request.method == "POST":
        # Handle POST logic
        pass
    elif request.method == "PATCH":
        if 'mileage' in request.json:
            car_info.mileage = request.json['mileage']

        db.session.commit()

    return jsonify(car_info.to_dict())
    
@app.route('/api/maintenance_info', methods=["Get", "POST"])
def maintenance_info():
    if request.method == "GET":
        pass
    elif request.method == "POST":
        new_maintenance_info = MaintenanceInfo(inputed_oil_service=request.json['inputed_oil_service'], inputed_tire_roto=request.json['inputed_tire_roto']
                                               ,inputed_break_fluid_service=request.json['inputed_break_fluid_service'],mileage_oil_service=request.json['mileage_oil_service'])
        db.session.add(new_maintenance_info)
        db.session.commit()
        return jsonify(new_maintenance_info.to_dict(), 200)

@app.route('/api/saved_cars', methods=["GET", "POST"])
def saved_cars():
    if request.method == "GET":
        pass
    elif request.method == "POST":
        new_car = SavedCar(car_info_id=request.json['car_info_id'],maintenance_info_id=request.json['maintenance_info_id'], name=request.json['name'])
        db.session.add(new_car)
        db.session.commit()
        return jsonify(new_car.to_dict(), 200)

@app.route('/api/saved_cars/<int:car_id>', methods=["GET", "POST", "PATCH", "DELETE"])
def saved_cars_by_id(car_id):
    if request.method == "GET":
        saved_car = SavedCar.query.get(car_id)
        if saved_car is None:
            return jsonify({'message': 'No car found with this ID.'}), 404
        else:
            car_info = CarInfo.query.get(saved_car.car_info_id)
            maintenance_info = MaintenanceInfo.query.get(saved_car.maintenance_info_id)
            return jsonify({
                'car_info': car_info.to_dict(),
                'maintenance_info': maintenance_info.to_dict(),
                'saved_car': saved_car.to_dict()
            })
    elif request.method == "PATCH":
        data = request.get_json()

        saved_car = SavedCar.query.get(car_id)
        if saved_car is None:
            return jsonify({'message': 'No car found with this ID.'}), 404

        # Update the name if 'name' is present in the request JSON
        if 'name' in data:
            saved_car.name = data['name']

        db.session.commit()

        return jsonify({'message': 'Car name updated successfully.'})
    elif request.method == "DELETE":
        saved_car = SavedCar.query.get(car_id)
        if saved_car is None:
            return jsonify({'message': 'No car found with this ID.'}), 404

        car_info = CarInfo.query.get(saved_car.car_info_id)
        maintenance_info = MaintenanceInfo.query.get(saved_car.maintenance_info_id)

        db.session.delete(car_info)
        db.session.delete(maintenance_info)
        db.session.delete(saved_car)

        db.session.commit()

        return jsonify({'message': 'Car and associated info deleted successfully.'})
        
@app.route('/api/garage', methods=['POST'])
def create_garage():
    data = request.get_json()
    new_garage = Garage(user_id=data['user_id'], saved_car_id=data['saved_car_id'])
    db.session.add(new_garage)
    db.session.commit()
    return jsonify(new_garage.to_dict()), 201

@app.route('/api/garage/<int:user_id>', methods=['GET'])
def get_saved_cars(user_id):
    garages = Garage.query.filter_by(user_id=user_id).all()

    cars_list = []

    for garage in garages:
        saved_car = SavedCar.query.get(garage.saved_car_id)
        car_info = CarInfo.query.get(saved_car.car_info_id)
        maintenance_info = MaintenanceInfo.query.get(saved_car.maintenance_info_id)

        cars_list.append({
            'saved_car': saved_car.to_dict(),
            'car_info': car_info.to_dict(),
            'maintenance_info': maintenance_info.to_dict()
        })

    return jsonify({'cars': cars_list}), 200



def generate_response(prompt, model="gpt-3.5-turbo", max_tokens=150, temperature=0.7):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=max_tokens,
        temperature=temperature
    )
    return response.choices[0].message.content

@app.route('/api/gpt', methods=["POST"])
def gpt():
    data = request.json
    prompt = data.get("prompt")

    if prompt:
        response_text = generate_response(prompt)
        # Introduce a delay before sending the response
        
        return jsonify({"response": response_text})
    else:
        return jsonify({"error": "No prompt provided."}), 400

@app.route('/api/gpt_stream', methods=["POST"])
def gpt_stream():
    data = request.json
    prompt = data.get("prompt")

    if prompt:
        response_text = generate_response_streaming(prompt)
        return Response(response_text, content_type='text/plain')
    else:
        return jsonify({"error": "No prompt provided."}), 400

def generate_response_streaming(prompt, model="gpt-3.5-turbo", max_tokens=150, temperature=0.7):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=max_tokens,
        temperature=temperature
    )
    return response.choices[0].message.content



if __name__ == '__main__':
    app.run(port=5555, debug=True)