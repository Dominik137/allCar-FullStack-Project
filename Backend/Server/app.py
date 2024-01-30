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
if __name__ == '__main__':
    app.run(port=5555, debug=True)