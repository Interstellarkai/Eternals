import datetime
# DataScience
import pandas as pd
import numpy as np
import math
# Ticker
import yfinance as yf
from yahoo_fin.stock_info import get_data, tickers_sp500, get_quote_table, get_stats
# AI
import prophet


#***************     Ticker    ******************#


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
        self.news = self.socket.news
        self.info = {
            "sector": self.socket.info["sector"],
            "summary": self.socket.info["longBusinessSummary"],
            "country": self.socket.info["country"],
            "website": self.socket.info["website"],
            "employees": self.socket.info["fullTimeEmployees"]
        }
        votes = list(self.socket.recommendations["To Grade"])
        self.recommendations = max(set(votes), key=votes.count)
        self.quote_table = get_quote_table(ticker)


#***************    Screener   ******************#


class Screener:
    """
    Benjamin Graham and Warren Buffett Model:
    - The model is a combination of the stock price and the stock volume.
    Step 1: Filtering out all companies with sales less than Rs 250 cr. Companies with sales lower than this are very small companies and might not have the business stability and access to finance that is required for a safe investment. This eliminates the basic business risk.
    Step 2: Filtering out all companies with debt to equity greater than 30%. Companies with low leverage are safer.
    Step 3: Filtering out all companies with interest coverage ratio of less than 4. Companies with high interest coverage ratio have a highly reduced bankruptcy risk.
    Step 4: Filtering out all companies with ROE less than 15% since they are earning less than their cost of capital. High ROE companies have a robust business model, which generates increased earnings for the company typically.
    Step 5: Filtering out all companies with PE ratio greater than 25 since they are too expensive even for a high-quality company. This enables us to pick companies which are relatively cheaper as against their actual value. He points out that applying these filters enables us to reduce and even eliminate a lot of fundamental risks while ensuring a robust business model, strong earning potential and a good buying price.
"""

    def __init__(self):
        """
        Stock suggestion based on Benjamin Graham and Warren Buffett Model.
        """
        self.SP500 = tickers_sp500()
        # self.suggestion = self.ben_graham()

        # pre-run json to expedite viewing
        self.suggestion = [
            {'name':'Copart, Inc.', 'ticker': 'CPRT', 'debt_to_equity': 12.06, 'interest_coverage': 5.47, 'return_on_equity': 28.47, 'PE_ratio': 31.02},
            {'name':'MarketAxess Holdings Inc.', 'ticker': 'MKTX', 'debt_to_equity': 8.55, 'interest_coverage': 12.85, 'return_on_equity': 23.91, 'PE_ratio': 36.9},
            {'name':'Monster Beverage Corporation', 'ticker': 'MNST', 'debt_to_equity': 0.5, 'interest_coverage': 4.54, 'return_on_equity': 22.01, 'PE_ratio': 31.41},
            {'name':'Monolithic Power Systems, Inc.', 'ticker': 'MPWR', 'debt_to_equity': 0.44, 'interest_coverage': 4.58, 'return_on_equity': 23.53, 'PE_ratio': 119.28},
            {'name':'Vertex Pharmaceuticals Incorporated', 'ticker': 'VRTX', 'debt_to_equity': 8.0, 'interest_coverage': 4.75, 'return_on_equity': 24.65, 'PE_ratio': 35.47}
            ]

    def ben_graham(self):
        res = []
        for ticker in self.SP500:
            DF = get_stats(ticker)
            debt_to_equity = float(
                DF.loc[DF['Attribute'] == 'Total Debt/Equity (mrq)']['Value'])
            # print(debt_to_equity)
            # Filter 1
            if math.isnan(debt_to_equity) or debt_to_equity > 30:
                continue

            interest_coverage = float(
                DF.loc[DF['Attribute'] == 'Current Ratio (mrq)']['Value'])
            # print(interest_coverage)
            # Filter 2
            if math.isnan(interest_coverage) or interest_coverage < 4:
                continue

            return_on_equity = float(
                (DF.loc[DF['Attribute'] == 'Return on Equity (ttm)']['Value']).str.rstrip("%"))
            # print(return_on_equity)
            # Filter 3
            if math.isnan(return_on_equity) or return_on_equity < 15:
                continue

            PE_ratio = get_quote_table(ticker)["PE Ratio (TTM)"]
            # print(PE_ratio)
            # Filter 4
            if math.isnan(PE_ratio) or PE_ratio < 25:
                continue

            stock = {
                "name": yf.Ticker(ticker).info["longName"],
                "ticker": ticker,
                "debt_to_equity": debt_to_equity,
                "interest_coverage": interest_coverage,
                "return_on_equity": return_on_equity,
                "PE_ratio": PE_ratio
            }
            print(stock)
            res.append(stock)
        return res

    #***************     Portfolio     ******************#


class Portfolio:
    def __init__(self, tickers):
        # tickers = [{"symbol": "AAPL", "shares": "100", "purchase_date": "2021-08-09", "oneDay": "0", "sevenDay": "0", "total": "0"}]
        self.tickers = tickers
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
            shares = int(ticker['shares'])
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

            # 2 decimal point
            ticker['oneDay'] = round(ticker['oneDay'], 2)
            ticker['sevenDay'] = round(ticker['sevenDay'], 2)
            ticker['total'] = round(ticker['total'], 2)

    def update_portfolio(self):
        for ticker in self.tickers:
            self.total_return += ticker['total']
            self.total_one_day_return += ticker['oneDay']
            self.total_seven_day_return += ticker['sevenDay']

        # 2 decimal point
        self.total_return = round(self.total_return, 2)
        self.total_one_day_return = round(self.total_one_day_return, 2)
        self.total_seven_day_return = round(self.total_seven_day_return, 2)

    def json_format(self):
        res = {
            "tickers": self.tickers,
            "total_return": self.total_return,
            "total_one_day_return": self.total_one_day_return,
            "total_seven_day_return": self.total_seven_day_return
        }
        return res


#***************   AI prediction   ******************#


class Dataset:
    def build_dataset(self):
        """
        1. Creates a new instance of the class `Dataset`
        2. Calls the `build_dataset` method of the class `Dataset`
        3. If the method returns True, the dataset is built successfully and is stored in the variable `self.dataset`
        4. If the method returns False, the dataset is not built successfully and is not stored in the variable `self.dataset`
        """
        start_date = datetime.datetime(2010, 1, 1).date()
        end_date = datetime.datetime.now().date()

        try:
            self.dataset = self.socket.history(
                start=start_date, end=end_date, interval="1d").reset_index()
            self.dataset.drop(
                columns=["Dividends", "Stock Splits", "Volume"], inplace=True)
            self.add_forecast_date()
        except Exception as e:
            print("Exception raised at: `utils.Dataset.build()", e)
            return False
        else:
            return True

    def add_forecast_date(self):
        """
        1. It takes the present date and adds one day to it.
        2. It checks if the present date is a Saturday or a Sunday.
        3. If it is a Saturday, it adds 7 days to the present date.
        4. If it is a Sunday, it adds 6 days to the present date.
        5. It then adds a new row to the dataset with the forecast date and the values of the columns 0 to 4 as 0.0.
        6. It then concatenates the dataset with the new row.
        """
        present_date = self.dataset.Date.max()
        day_number = pd.to_datetime(present_date).isoweekday()
        if day_number in [5, 6]:
            self.forecast_date = present_date + \
                datetime.timedelta(days=(7-day_number) + 1)
        else:
            self.forecast_date = present_date + datetime.timedelta(days=1)
        print("Present date:", present_date)
        print("Valid Forecast Date:", self.forecast_date)
        test_row = pd.DataFrame(
            [[self.forecast_date, 0.0, 0.0, 0.0, 0.0]], columns=self.dataset.columns)
        self.dataset = pd.concat([self.dataset, test_row])


class FeatureEngineering(Dataset):
    def create_features(self):
        """
        1. Builds the dataset by calling the build_dataset() method.
        2. Creates the lag features by calling the create_lag_features() method.
        3. Imputes the missing values by calling the impute_missing_values() method.
        4. Drops the columns Open, High, Low from the dataset.
        5. Prints the last 3 rows of the dataset.
        """
        status = self.build_dataset()
        if status:
            self.create_lag_features()
            self.impute_missing_values()
            self.dataset.drop(columns=["Open", "High", "Low"], inplace=True)
            print(self.dataset.tail(3))
            return True
        else:
            raise Exception("Dataset creation failed!")

    def create_lag_features(self, periods=12):
        """
        1. Creates a new column for each lag period.
        2. Assigns the shifted values to the new columns.
        3. Returns True.
        """
        for i in range(1, periods+1):
            self.dataset[f"Close_lag_{i}"] = self.dataset.Close.shift(
                periods=i, axis=0)
            self.dataset[f"Open_lag_{i}"] = self.dataset.Open.shift(
                periods=i, axis=0)
            self.dataset[f"High_lag_{i}"] = self.dataset.High.shift(
                periods=i, axis=0)
            self.dataset[f"Low_lag_{i}"] = self.dataset.Low.shift(
                periods=i, axis=0)
        return True

    def impute_missing_values(self):
        """
        1. Loads the data from the CSV file.
        2. Imputes missing values.
        3. Stores the minimum and maximum date in the info dictionary.
        4. Returns True.
        """
        self.dataset.fillna(0, inplace=True)
        self.info["min_date"] = self.dataset.Date.min().date()
        self.info["max_date"] = self.dataset.Date.max().date() - \
            datetime.timedelta(days=1)
        return True


class MasterProphet(FeatureEngineering):
    def __init__(self, ticker):
        """
        1. Creates a new instance of the class.
        2. Sets the ticker to the ticker parameter.
        3. Sets the socket to the yf.Ticker class.
        4. Sets the info dictionary to the info dictionary from the yf.Ticker class.
        """
        self.ticker = ticker
        self.socket = yf.Ticker(self.ticker)
        self.name = self.socket.info['longName']
        self.news = self.socket.news
        table = get_quote_table(self.ticker)
        self.quote_table = {
            "ftWeekRange": table["52 Week Range"],
            "DayRange": table["Day's Range"],
            "Open": table['Open'],
            "QuotePrice": round(table['Quote Price'], 2),
            "PreviousClose": table['Previous Close'],
        }
        self.info = {
            "name": self.socket.info['longName'],
            "day_change": round((self.quote_table["PreviousClose"] - self.quote_table["Open"]), 2),
            "day_change_percentage": round(100 * (self.quote_table["PreviousClose"] - self.quote_table["Open"]) / self.quote_table["Open"], 2),
            "sector": self.socket.info["sector"],
            "summary": self.socket.info["longBusinessSummary"],
            "country": self.socket.info["country"],
            "website": self.socket.info["website"],
            "employees": self.socket.info["fullTimeEmployees"]
        }
        votes = list(self.socket.recommendations["To Grade"])
        self.recommendations = max(set(votes), key=votes.count)

    def build_model(self):
        """
        1. Creates a new instance of the Prophet class.
        2. Adds all the columns in the dataset that have the word "lag" in them to the model.
        3. Sets the seasonality to be yearly and weekly.
        4. Builds the model.
        5. If an exception is raised, it prints the exception and returns False.
        6. If no exception is raised, it returns True.
        """
        additonal_features = [
            col for col in self.dataset.columns if "lag" in col]
        try:
            self.model = prophet.Prophet(
                yearly_seasonality=True, weekly_seasonality=True, seasonality_mode="additive")
            for name in additonal_features:
                self.model.add_regressor(name)
        except Exception as e:
            print("Exception raised at: `utilities.Prophet.build()`", e)
            return False
        else:
            return True

    def train_and_forecast(self):
        """
        1. Create a new model object.
        2. Fit the model to the training data.
        3. Predict the next day's close price.
        4. Return the predicted close price.
        """
        self.model.fit(
            df=self.dataset.iloc[:-1, :].rename(columns={"Date": "ds", "Close": "y"}))
        return self.model.predict(self.dataset.iloc[-1:][[col for col in self.dataset if col != "Close"]].rename(columns={"Date": "ds"}))

    def forecast(self):
        """
        1. Creates the features
        2. Builds the model
        3. Trains the model
        4. Forecasts the model
        """
        self.create_features()
        self.build_model()
        return self.train_and_forecast()
