# Wealth Buddy Web Application

Wealthy Buddy is an application built for CitiHackOver 2022 with the intention to positions Citi as the modern bank for wealth management solutions, to drive client acquisition and strengthen client relationships in the Asian market.

## Key Features
- Embedded Dashboards 
- Stock price prediction built with WallStreetAI - Stock Price Predictor(https://github.com/Interstellarkai/WallStreetAI)
- AI chat built with Lex 
- Portfolio optimization (https://github.com/ketan1741/Benjamin-Graham-and-Warren-Buffett-Model-Stock-Exchange-)

## Screenshots


<img width="600" alt="Screen Shot 2022-08-12 at 12 42 07 AM" src="https://user-images.githubusercontent.com/72592202/184189413-1f2d92fd-b0d2-41d3-80da-3346d856b746.png">
<img width="700" alt="Screen Shot 2022-08-12 at 12 39 02 AM" src="https://user-images.githubusercontent.com/72592202/184189422-bed0b125-08c6-407f-b5a6-1eda98b45def.png">
<img width="750" alt="Screen Shot 2022-08-12 at 12 38 51 AM" src="https://user-images.githubusercontent.com/72592202/184189426-809a74c9-02c0-487e-93a7-ce1af864c986.png">
<img width="800" alt="Screen Shot 2022-08-12 at 12 38 32 AM" src="https://user-images.githubusercontent.com/72592202/184189432-cb0c9b80-aeaf-4baf-a28c-71f7d0061736.png">


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
