import datetime
import pandas as pd
import yfinance as yf


class Ticker:
    def __init__(self, ticker):
        """
        1. Creates a new instance of the class.
        2. Sets the ticker to the ticker parameter.
        3. Sets the socket to the yf.Ticker class.
        4. Sets the info dictionary to the info dictionary from the yf.Ticker class.

        - Actions – Corporate actions such as dividends and splits
        - Analysis – EPS targets and revisions
        - Info – Commonly queried data as a dictionary
        - Recommendations – Analyst buy, hold and sell ratings
        """
        self.ticker = ticker
        self.socket = yf.Ticker(self.ticker)
        self.info = {
            "sector": self.socket.info["sector"],
            "summary": self.socket.info["longBusinessSummary"],
            "country": self.socket.info["country"],
            "website": self.socket.info["website"],
            "employees": self.socket.info["fullTimeEmployees"]
        }
        self.analysis = self.socket.analysis.to_json(orient='records')
        self.recommendations = self.socket.recommendations.tail(
            10).to_json(orient='records')
        self.fundamentals = {
            "PE_ratio": self.socket.info["forwardPE"],
            "closing_price": self.socket.history["Close"].tail(1).values[0],
            "PE_ratio": self.socket.info["forwardPE"],
            "dividend_rates": self.socket.info["dividendRate"],
            "volume": self.socket.info["volume"],
            "market_cap": self.socket.info["marketCap"],
        }

    def get_fundamentals(self):
        return self.fundamentals


class Portfolio:
    def __init__(self, tickers):
        self.tickers = tickers
        self.socket = yf.Ticker(self.ticker)
        self.total_return = 0
        self.total_one_day_return = 0
        self.total_seven_day_return = 0
        self.end_date = datetime.datetime.now().date()
        self.update_tickers()
        self.update_portfolio()

    def update_tickers(self):
        for ticker in self.tickers:
            # attributes of ticker
            symbol = yf.Ticker(ticker['symbol'])
            shares = ticker['shares']
            purchase_date = datetime.datetime.strptime(
                ticker['purchase_date'], "%Y-%m-%d").date()

            # Get the stock exchange prices.
            data = symbol.history(start=purchase_date, end=self.end_date)

            # Difference in days
            difference_in_days = (self.end_date - purchase_date).days
            delta_seven = min(difference_in_days, 7)

            # Update
            ticker['oneDay'] = (data.Close.tail(
                1).values[0] - data.Open.tail(1).values[0]) * shares
            ticker['sevenDay'] = (data.Close.tail(
                1).values[0] - data.Open.tail(delta_seven).values[0]) * shares
            ticker['total'] = (data.Close.tail(1).values[0] -
                               data.Open.head(1).values[0]) * shares

    def update_portfolio(self):
        for ticker in self.tickers:
            self.total_return += ticker['total']
            self.total_one_day_return += ticker['oneDay']
            self.total_seven_day_return += ticker['sevenDay']
