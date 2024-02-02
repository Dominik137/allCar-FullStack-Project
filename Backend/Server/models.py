from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import datetime

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    username = db.Column(db.String)
    
    garage  = db.relationship('Garage', back_populates='user')

    serialize_rules = ('-garage',)

class Garage(db.Model, SerializerMixin):
    # Joins Users and theyre cars
    __tablename__ = "Garages"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
    saved_car_id = db.Column(db.Integer, db.ForeignKey('Saved_Cars.id'))

    user = db.relationship('User', back_populates='garage')
    saved_car = db.relationship('SavedCar', back_populates='garage')

class SavedCar(db.Model, SerializerMixin):
    # Joins the cars details and maintenance details
    __tablename__ = "Saved_Cars"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    car_info_id = db.Column(db.Integer, db.ForeignKey('Car_Infos.id'))  # Corrected this line
    maintenance_info_id = db.Column(db.Integer, db.ForeignKey('Maintenance_Infos.id'))  # Corrected this line

    garage = db.relationship('Garage', back_populates='saved_car', cascade="all, delete-orphan")
    car_info = db.relationship('CarInfo', back_populates='saved_car')
    maintenance_info = db.relationship('MaintenanceInfo', back_populates='saved_car')

    serialize_rules = ('-garage', '-car_info', '-maintenance_info')



class CarInfo(db.Model, SerializerMixin):
    __tablename__ = "Car_Infos"
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable = False)
    make = db.Column(db.String, nullable = False)
    model = db.Column(db.String, nullable = False)
    mileage = db.Column(db.Integer, nullable = False)
    general_info = db.Column(db.String, nullable = False)
    engine_info = db.Column(db.String)
    light_info = db.Column(db.String)
    wheel_info = db.Column(db.String)

    saved_car = db.relationship('SavedCar', back_populates='car_info', cascade="all, delete-orphan")

    serialize_rules = ('-saved_car',)

class MaintenanceInfo(db.Model, SerializerMixin):
    __tablename__ = "Maintenance_Infos"
    id = db.Column(db.Integer, primary_key=True)
    rec_oil_service = db.Column(db.String)
    rec_oil_type = db.Column(db.String)
    inputed_oil_service = db.Column(db.String)
    mileage_oil_service = db.Column(db.Integer)
    rec_tire_roto = db.Column(db.String)
    inputed_tire_roto = db.Column(db.String)
    rec_tire_psi = db.Column(db.String)
    rec_break_fluid_service = db.Column(db.String)
    inputed_break_fluid_service = db.Column(db.String)
    
    saved_car = db.relationship('SavedCar', back_populates='maintenance_info', cascade="all, delete-orphan")

    serialize_rules = ('-saved_car',)





