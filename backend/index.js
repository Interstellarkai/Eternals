// connect the db and start the server 

import app from "./server.js" 
import mongodb from "mongodb" // access mongodb
import dotenv from "dotenv" // access env var
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

// configure dotenv
dotenv.config()

// give access to mongo client
const MongoClient = mongodb.MongoClient 

// if the port we specified cannot be accessed, we use port 8000
const port = process.env.PORT || 8000

// connect to db
MongoClient.connect(
    // passing in the options to access the database
    // https://stackoverflow.com/questions/68416009/mongoparseerror-options-poolsize-usenewurlparse-are-not-supported 
    
    process.env.RESTREVIEWS_DB_URI, {
        maxPoolSize: 50, // make it so only 50 people can connect at a time
        wtimeoutMS: 2500, // request will time out after 2500ms
        useNewUrlParser: true 
    })
    // catch errors
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        // how to start the web server 
        await RestaurantsDAO.injectDB(client) // get initial reference to the restaurant collection in the DB
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`) // ` not '
        }) 
    })