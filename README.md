# Wealth Buddy Web Application

Wealthy Buddy is an application built for CitiHackOver 2022 with the intention to positions Citi as the modern bank for wealth management solutions, to drive client acquisition and strengthen client relationships in the Asian market.

## Key Features
- Embedded Dashboards 
- Stock price prediction built with WallStreetAI - Stock Price Predictor(https://github.com/Interstellarkai/WallStreetAI)
- AI chat built with Lex 
- Portfolio optimization (https://github.com/ketan1741/Benjamin-Graham-and-Warren-Buffett-Model-Stock-Exchange-)

## Screenshots
<img width="947" alt="Screenshot 2022-08-12 004157" src="https://user-images.githubusercontent.com/72592202/184187702-f6ff0ea4-f6cc-492f-8071-54af5d6e53fc.png">

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
