# Wealth Buddy Web Application

Wealthy Buddy is an application built for CitiHackOver 2022 with the intention to positions Citi as the modern bank for wealth management solutions, to drive client acquisition and strengthen client relationships in the Asian market.

## Key Features
- Embedded Dashboards 
- Stock price prediction built with WallStreetAI - Stock Price Predictor(https://github.com/Interstellarkai/WallStreetAI)
- AI chat built with Lex 
- Portfolio optimization (https://github.com/ketan1741/Benjamin-Graham-and-Warren-Buffett-Model-Stock-Exchange-)

## Screenshots
<img width="500" alt="Screen Shot 2022-08-12 at 12 42 07 AM" src="https://user-images.githubusercontent.com/72592202/184188994-c7d01bbb-71c1-4b4f-8b8e-c37c5418bf8a.png">
<img width="500" alt="Screen Shot 2022-08-12 at 12 38 32 AM" src="https://user-images.githubusercontent.com/72592202/184189005-461fb44a-96e0-44fc-b7db-b2821970456a.png">
<img width="500" alt="Screen Shot 2022-08-12 at 12 38 51 AM" src="https://user-images.githubusercontent.com/72592202/184189009-3202b5b8-c66d-466f-8241-1344658b6823.png">
<img width="500" alt="Screen Shot 2022-08-12 at 12 39 02 AM" src="https://user-images.githubusercontent.com/72592202/184189014-579cdf3b-af8f-44d9-98f3-089502e0cfec.png">

## Getting Started

Download or clone project from github:
```
$ git clone [https://github.com/Interstellarkai/WallStreetAI](https://github.com/Interstellarkai/Eternals)
```

## Install - Local
Create a project environment (pipenv recommended):
```
$ pipenv install
```

Otherwise install prerequisites:
```
$ pip install -r REQUIREMENTS.txt
```

Run project backend:
```
$ cd backend
$ pipenv shell (if virtual environment is used)
$ python3 runserver.py

Run project fronted:
```
$ cd frontend
$ npm run start

## Install - Docker

```
docker build -t <image name> .
docker run -it -p <localhost>:<localport>:<containerport> <image name>

Example:
By convention: image name is user/app:latest
docker build -t interstellarkai/wallstreetai:latest .    
docker run -it -p 0.0.0.0:5555:5555 interstellarkai/Eternals
