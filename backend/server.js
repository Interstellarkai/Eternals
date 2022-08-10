// configure an express server

// import statements 
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js" // yet to be created 

const app = express() // using to make server

// middle ware
app.use(cors())
app.use(express.json())  // server can accept json in the body of a request 

// initial routes
app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({error: "not found"})) // * means wild card, a route that is not in our route file, then we return 404 page not found

// export app as a module --> import the file that accesses the db 
// separate server code from the db code 
export default app 

