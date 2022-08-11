FROM python:3
WORKDIR /usr/src/app/backend

# Install dependencies with pipenv to prevent dependency issues
COPY Pipfile* ./
RUN pip install pipenv && \
    apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev libssl-dev && \
    pipenv install --deploy --system && \
    apt-get remove -y gcc python3-dev libssl-dev && \
    apt-get autoremove -y && \
    pip uninstall pipenv -y

# Port over the rest of the source code
COPY . ./
RUN
CMD ["python3", "app.py", "--host=0.0.0.0", "--port=5555"]