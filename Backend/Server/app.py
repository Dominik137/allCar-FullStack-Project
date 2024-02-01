# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import *
# Add your model imports

# Views go here!

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
    if request.method == "GET":
        pass
    elif request.method == "POST":
        new_car_info = CarInfo(year=request.json['year'], make=request.json['make'], model=request.json['model'], mileage=request.json['mileage'],
                               general_info=request.json['general_info'], engine_info=request.json['engine_info'], light_info=request.json['light_info'],
                               wheel_info=request.json['wheel_info'])
        db.session.add(new_car_info)
        db.session.commit()
        return jsonify(new_car_info.to_dict(), 200)
    
@app.route('/api/maintenance_info', methods=["Get", "POST"])
def maintenance_info():
    if request.method == "GET":
        pass
    elif request.method == "POST":
        new_maintenance_info = MaintenanceInfo(inputed_oil_service=request.json['inputed_oil_service'], inputed_tire_roto=request.json['inputed_tire_roto']
                                               ,inputed_break_fluid_service=request.json['inputed_break_fluid_service'])
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

@app.route('/api/saved_cars/<int:car_id>', methods=["GET", "POST", "PATCH"])
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)