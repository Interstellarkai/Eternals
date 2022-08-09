# mongo.py
# -*- coding: utf-8 -*-

from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_social import Social
from flask_cors import CORS
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user, logout_user,\
    current_user
from pymongo.collection import ReturnDocument
from bson.objectid import ObjectId
import json
from bson import BSON
from bson import json_util


app = Flask(__name__)

# *****CORS to handle external request********//
CORS(app)
#*********Connect to MongoDb*************#
app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/restdb'
mongo = PyMongo(app)

# ********Config Facebook API*******

app.config['OAUTH_CREDENTIALS'] = {
    'facebook': {
        'consumer_key': 'your_consumer_key',
        'consumer_secret': 'your_consumer_secret'
    },

}


#***************Define the routes ******************#


@app.route('/')
def index():
    return jsonify({'success': 200})


# ***********SIGN IN && SIGN UP


@app.route('/signin', methods=['POST'])
def signin_facebook():

    Users = mongo.db.users
    data = Users.find()
    displayName = request.json['displayName']
    #photourl = request.json['photoURL']
    email = request.json['email']
    phoneNumber = request.json['phoneNumber']
    user = Users.find_one({"email": "j2i@gmailcom"})

    if(user is None):
        print("there is no user")

        id_user = Users.insert_one({'displayName': displayName, 'email': 'j2i@gmailcom',
                                    }).inserted_id
        output = {'success': 200, 'user': str(id_user)}

    else:

        # GET DATA USER *******
        print(user)
        output = {'success': 200, 'user': str(user['_id'])}

    return jsonify({'result': output})


# ******GET BOOKS /books **********

@app.route('/books', methods=['GET'])
def get_all_books():
    book = mongo.db.books
    output = []
    # print(book.find())
    for b in book.find():
        print(b.keys())
        output.append({'description': b['description'], 'publisher': b['publisher'],
                       'language': b['language'], 'image': b['image'],
                       'title': b['title'], 'category': b['category'],
                       'author': b['author'], 'language': b['language'],
                       'id': str(b['_id'])})

    return jsonify({'result': output})


# ****************SEARCH BOOK BY ISBN  ,AUTHOR OR TITLE *************

@app.route('/books/search', methods=['GET'])
def get_books_searched():
    query = request.args.get('query')
    book = mongo.db.books
    #b = book.find_one('$or'[ { 'title': query , "industryIdentifiers.identifier": str(query)}])
    b = book.find_one({'title': query})
    print(b)
    if b:
        print(b["industryIdentifiers"])
        output = {'description': b['description'], 'publisher': b['publisher'],
                  'language': b['language'], 'imageLinks': b['imageLinks'],
                  'title': b['title'], 'categories': b['categories'],
                  'authors': b['authors'], 'language': b['language'],
                  'id': str(b['_id']), 'industryIdentifiers': b['industryIdentifiers']}
        #output ={}
    else:
        output = "No such name"
    return jsonify({'result': output})


# ****************SEARCH BOOK BY CATEGORY *************

@app.route('/books/category', methods=['GET'])
def get_books_searched_by_category():
    query = request.args.get('category')
    book = mongo.db.books
    output = []
    b = book.find_one({'category': query})
    output.append(b)
    return jsonify({'result': json.dumps(output, sort_keys=True, indent=4, default=json_util.default)})


# ****************SEARCH BOOK BY CITY *************


@app.route('/books/city', methods=['GET'])
def get_books_by_city(name):
    book = mongo.db.books
    s = book.find_one({'city': query})
    if s:
        output = {'name': s['name'], 'distance': s['distance']}
    else:
        output = "No such name"
    return jsonify({'result': output})


# ****************GET BOOK BY ID *************

@app.route('/books/id', methods=['GET'])
def get_book_details(name):
    book = mongo.db.books
    s = book.find_one({'id': query})
    if s:
        output = {'name': s['name'], 'distance': s['distance']}
    else:
        output = "No such name"
    return jsonify({'result': output})


# ****************GET USER PROFILE *************


@app.route('/users/profile', methods=['GET'])
def get_user_information():
    uid = request.args.get('uid')
    Users = mongo.db.users
    b = Users.find_one({"_id": ObjectId(uid)})
    if b:

        output = {"user": json.dumps(
            b, sort_keys=True, indent=4, default=json_util.default)}
    else:
        output = {'msg': "No Such User", "user": None}
    return jsonify({'result': output})


# GET USER NOTIFICATIONS *************
@app.route('/users/profil/notifications', methods=['GET'])
def get_user_notifications():
    uid = request.args.get('uid')
    user = mongo.db.users
    #b = book.find_one('$or'[ { 'title': query , "industryIdentifiers.identifier": str(query)}])
    b = user.find_one({'uid': uid})
    print(b)
    if b:
        '''print(b["industryIdentifiers"])
        output = {'description' :b['description'] ,'publisher': b['publisher'],
                       'language': b['language'] , 'imageLinks': b['imageLinks'],
                       'title':b['title'],'categories': b['categories'],
                       'authors': b['authors'],'language' :b['language'],
                       'id': str(b['_id']) , 'industryIdentifiers': b['industryIdentifiers'] }'''
        output = {}
    else:
        output = "No such user"
    return jsonify({'result': output})


# ****************GET USER NOTIFICATIONS *************


@app.route('/users/profilemodify', methods=['POST'])
def modify_profile():

    User = mongo.db.users
   # ***********GET DATA********************
    firstName = request.json['firstName']
    lastname = request.json['lastname']
    birthday = request.json['birthday']
    adresse = request.json['adresse']
    ville = request.json['ville']
    idUser = request.json['iduser']
    id = User.update({"_id": ObjectId(idUser)},
                     {'$set': {"firstName": firstName, "adresse": adresse,
                               "lastname": lastname,
                               "ville": ville
                               }},
                     upsert=True)

    return jsonify({'result': id})


# ****************ADD book to Library *************


@app.route('/users/AddBook', methods=['GET'])
def add_Book_user():

    print(request.args)
    idUser = request.args.get('iduser')
    idBook = request.args.get('idbook')
    User = mongo.db.users
    print("iUse" + str(idUser) + " " + str(idBook))
    user = User.update({'_id': ObjectId(idUser)}, {
                       "$push": {"books": idBook}}, upsert=False)
    output = {"Success": 200, "user": json.dumps(
        user, sort_keys=True, indent=4, default=json_util.default)}
    return jsonify({'result': output})


# ****************Create query to exchange Book *************


@app.route('/CreateDemande', methods=['POST'])
def Create_Demande_Echanage():
    Users = mongo.db.users
    Demande = mongo.db.demandes

    print(request.get_json())

    # GET DATA FROM FRONT END
    startDate = request.json['startDate']
    endDate = request.json['endDate']
    ville = request.json['ville']
    idUser = request.json['iduser']
    idBook = request.json['idbook']

    id_demande = Demande.insert_one({'startDate': startDate,
                                     'endDate': endDate, 'ville': ville, 'Exchanger': idUser,
                                    'book': idBook
                                     }).inserted_id
    print(id_demande)
    output = {'success': 200, 'demande': str(id_demande)}

    return jsonify({'result': output})


# ****************Run the APP *************

if __name__ == '__main__':
    app.run(debug=True)
