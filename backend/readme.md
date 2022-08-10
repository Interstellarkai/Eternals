# Guide to API routing!

This is a documentation of the various API calls to make or available from the **BackEnd Server**.

## Base
    index: http://127.0.0.1:5000

## Users
    Create
        post: http://127.0.0.1:5000/users
            Creates a user profile
        {
            "name": "test",
            "email": "test@abc.com",
            "password": "12345678",
            "type": "client_user"
        }
    
    Read
        get: http://127.0.0.1:5000/users
            Returns all the bankers (contact us)
        get: http://127.0.0.1:5000/users/<id>
            Returns a specific client
    
    Update
        put : http://127.0.0.1:5000/users/<id>
            Updates user's profile and type
        {
            "name": "test",
            "email": "test@abc.com",
            "password": "12345678",
            "type": "client_user"
        }
    
    Delete
        delete : http://127.0.0.1:5000/users/<id>
            Deletes a specific user

---
## Portfolio
    Create
        post: http://127.0.0.1:5000/portfolios
            Creates a client's portfolio
        {
            "client_id": "62f24141d3b1d63d7226b960",
            "banker_id": "62f24159d3b1d63d7226b962",
            "tickers": [
                {
                    "symbol": "AAPL", 
                    "shares": "100", 
                    "purchase_date": "2021-08-09",
                    "type'": "Buy", 
                    "oneDay": "0", 
                    "sevenDay": "0", 
                    "total": "0"
                },
                {
                    "symbol": "MSFT", 
                    "shares": "100", 
                    "purchase_date": "2021-07-09",
                    "type'": "Buy", 
                    "oneDay": "0", 
                    "sevenDay": "0", 
                    "total": "0"
                }
            ]
        }
	
    Read
        get: http://127.0.0.1:5000/portfolios
            Returns all portfolios
        get: http://127.0.0.1:5000/portfolios/62f24141d3b1d63d7226b960
            Returns all of client's portfolio, or banker's managing portfolio

    Update
        put : http://127.0.0.1:5000/portfolios/<id>
            Updates client's portfolio
        {
            "client_id": "62f24141d3b1d63d7226b960",
            "banker_id": "62f24159d3b1d63d7226b962",
            "tickers": [
                {
                    "symbol": "AAPL", 
                    "shares": "100", 
                    "purchase_date": "2021-08-09",
                    "type'": "Buy", 
                    "oneDay": "0", 
                    "sevenDay": "0", 
                    "total": "0"
                },
                {
                    "symbol": "MSFT", 
                    "shares": "100", 
                    "purchase_date": "2021-07-09",
                    "type'": "Buy", 
                    "oneDay": "0", 
                    "sevenDay": "0", 
                    "total": "0"
                }
            ]
        }
    
    Delete
        delete : http://127.0.0.1:5000/users/<id>
            Deletes client's portfolio
