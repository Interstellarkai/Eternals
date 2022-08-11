FROM node:14-slim
WORKDIR /user/src/app 

# Install dependencies with pipenv to prevent dependency issues
COPY ./package.json ./
RUN npm install 

# Port over the rest of the source code
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD ["start"]