from flask import Flask, jsonify, request
from flask_cors import CORS

from bson import ObjectId

import pymongo
from pymongo import MongoClient

import utilities

# For credentials
import os
from dotenv import load_dotenv
load_dotenv()


#*************** Setting up *************************#
# Instantiate the app
app = Flask(__name__)
# app.json_encoder = CustomJSONEncoder

# CORS to handle external request (settings)
CORS(app)

# Connect to MongoDB
cluster = MongoClient(os.getenv('DB_URI'))
db = cluster["eternals"]

# Database
USERS = db["users"]
PORTFOLIOS = db["portfolios"]
STORIES = db["stories"]
#*************** Define the routes ******************#


# Default route
@app.route('/')
def index() -> str:
    return jsonify({'success': 200})


# Create User
@app.route('/users', methods=['POST'])
def createUser() -> str:
    print(request.json)
    id = USERS.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password'],
        'type': request.json['type']  # client_user, banker_user
    })
    return jsonify(str(ObjectId(id.inserted_id)))


# Get all the bankers' details
@app.route('/users', methods=['GET'])
def getUsers() -> str:
    users = []
    for doc in USERS.find({'type': 'banker_user'}):
        users.append({
            'name': doc['name'],
            'email': doc['email'],
            '_id': str(ObjectId(doc['_id'])),

            # Issues with data leakage
            # 'password': doc['password']
        })
    return jsonify(users)


# Get a specific user's details
@app.route('/users/<id>', methods=['GET'])
def getUser(id: str) -> str:
    user = USERS.find_one({'_id': ObjectId(id)})
    client_portfolio = PORTFOLIOS.find({'client_user': ObjectId(id)})
    print(user)
    print(client_portfolio)
    return jsonify({
        'name': user['name'],
        'email': user['email'],
        '_id': str(ObjectId(user['_id'])),
        # Curated to primary key only
        'portfolio_id': [portfolio['_id'] for portfolio in client_portfolio],
        'portfolio': client_portfolio

        # Issues with data leakage
        # 'password': user['password']
    })


# Update user's details
@app.route('/users/<id>', methods=['PUT'])
def updateUser(id: str) -> str:
    print(request.json)
    USERS.update_one({'_id': ObjectId(id)}, {"$set": {
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password'],
        'type': request.json['type']
    }})
    return jsonify({'message': 'User Updated'})


# Delete a specific user
@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id: str) -> str:
    USERS.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'User Deleted'})


# Porfolios

# Create a portfolio
@app.route('/portfolios', methods=['POST'])
def createPortfolio() -> str:
    """
    Example:
    tickers = [{'symbol': "AAPL", 'shares': "100", 'purchase_date': "2022-08-08", 'oneDay': "0", 'sevenDay': "0", 'total': "0"}]
    """
    print(request.json)
    id = PORTFOLIOS.insert_one({
        'client_user': ObjectId(request.json['client_id']),
        'banker_user': ObjectId(request.json['banker_id']),
        'tickers': request.json['tickers']
    })
    return jsonify(str(ObjectId(id.inserted_id)))


# Get all the portfolios
@app.route('/portfolios', methods=['GET'])
def getPortfolios() -> str:
    portfolios = []
    for doc in PORTFOLIOS.find():
        portfolios.append({
            '_id': str(ObjectId(doc['_id'])),
            'client_user': str(doc['client_user']),
            'banker_user': str(doc['banker_user']),
            'tickers': utilities.Portfolio(doc['tickers']).json_format()
        })
    return jsonify(portfolios)


# Get a specific portfolio based on the client_id or banker_id
@app.route('/portfolios/<id>', methods=['GET'])
def getPortfolio(id: str) -> list:
    client_portfolio = PORTFOLIOS.find({'client_user': ObjectId(id)})
    banker_portfolio = PORTFOLIOS.find({'banker_user': ObjectId(id)})
    portfolios = client_portfolio if client_portfolio else banker_portfolio
    print(portfolios)

    res = []
    for portfolio in portfolios:
        res.append({
            '_id': str(ObjectId(portfolio['_id'])),
            'client_user': str(portfolio['client_user']),
            'banker_user': str(portfolio['banker_user']),
            'tickers': utilities.Portfolio(portfolio['tickers']).json_format()
        })
    return jsonify(res)


# Update a specific portfolio
@app.route('/portfolios/<id>', methods=['PUT'])
def updatePortfolio(id: str) -> str:
    print(request.json)
    PORTFOLIOS.update_one({'_id': ObjectId(id)}, {"$set": {
        'client_user': request.json['client_id'],
        'banker_user': request.json['banker_id'],
        'tickers': request.json['tickers']
    }})
    return jsonify({'message': 'Portfolio Updated'})


# Delete a specific portfolio
@app.route('/portfolios/<id>', methods=['DELETE'])
def deletePortfolio(id: str) -> str:
    PORTFOLIOS.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Portfolio Deleted'})


#*************** Run the App       ******************#
if __name__ == "__main__":
    app.run(debug=True)
