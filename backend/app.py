from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId
import env


#*************** Setting up *************************#
# Instantiate the app
app = Flask(__name__)

# Connect to MongoDB
app.config['MONGO_DBNAME'] = env.DB_NAME
app.config['MONGO_URI'] = env.DB_URI
mongo = PyMongo(app)

# CORS to handle external request (settings)
CORS(app)

# Database
db = mongo.db.eternals
#*************** Define the routes ******************#

# Users


@app.route('/')
def index() -> str:
    return jsonify({'success': 200})


@app.route('/users', methods=['POST'])
def createUser() -> str:
    print(request.json)
    id = db.users.insert({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    })
    return jsonify(str(ObjectId(id)))


@app.route('/users', methods=['GET'])
def getUsers() -> str:
    users = []
    for doc in db.users.find():
        users.append({
            'name': doc['name'],
            'email': doc['email'],

            # Issues with data leakage
            '_id': str(ObjectId(doc['_id'])),
            'password': doc['password']
        })
    return jsonify(users)


@app.route('/users/<id>', methods=['GET'])
def getUser(id: str) -> str:
    user = db.users.find_one({'_id': ObjectId(id)})
    print(user)
    return jsonify({
        'name': user['name'],
        'email': user['email'],

        # Issues with data leakage
        '_id': str(ObjectId(user['_id'])),
        'password': user['password']
    })


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id: str) -> str:
    db.users.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'User Deleted'})


@app.route('/users/<id>', methods=['PUT'])
def updateUser(id: str) -> str:
    print(request.json)
    db.users.update_one({'_id': ObjectId(id)}, {"$set": {
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    }})
    return jsonify({'message': 'User Updated'})


# Porfolios


@app.route('/portfolios', methods=['POST'])
def createPortfolio(client_id: str, banker_id: str, tickers: list) -> str:
    """
    tickers = [{symbol: "AAPL", shares: "100", purchase_date: "", type: "Buy", oneDay: "", sevenDay: "", total: ""}]
    }
    """
    print(request.json)
    id = db.portfolios.insert({
        'client_user': ObjectId(client_id),
        'banker_user': ObjectId(banker_id),
        'tickers': request.json['tickers']
    })
    return jsonify(str(ObjectId(id)))


@app.route('/portfolios', methods=['GET'])
def getPortfolio() -> str:
    portfolios = []
    for doc in db.portfolios.find():
        portfolios.append({
            '_id': str(ObjectId(doc['_id'])),
            'client_user': doc['client_user'],
            'banker_user': doc['banker_user'],
            'tickers': doc['tickers']
        })
    return jsonify(portfolios)


@app.route('/portfolios/<id>', methods=['GET'])
def getPortfolio(id: str) -> str:
    portfolio = db.portfolios.find_one({'_id': ObjectId(id)})
    print(portfolio)

    return jsonify({
        '_id': str(ObjectId(portfolio['_id'])),
        'client_user': portfolio['client_user'],
        'banker_user': portfolio['banker_user'],
        'tickers': portfolio['tickers']
    })


@app.route('/portfolios/<id>', methods=['DELETE'])
def deletePortfolio(id: str) -> str:
    db.portfolios.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Portfolio Deleted'})


@app.route('/portfolios/<id>', methods=['PUT'])
def updatePortfolio(id: str) -> str:
    print(request.json)
    db.portfolios.update_one({'_id': ObjectId(id)}, {"$set": {
        'client_user': request.json['client_id'],
        'banker_user': request.json['banker_id'],
        'tickers': request.json['tickers']
    }})
    return jsonify({'message': 'Portfolio Updated'})


#*************** Run the App       ******************#
if __name__ == "__main__":
    app.run(debug=True)
