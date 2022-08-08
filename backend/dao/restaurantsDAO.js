// DAO - Data Access Object 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let restaurants // store reference to db 


// export class with several async methods
export default class RestaurantsDAO {
    // connect to db initially (as our server starts)
    static async injectDB(conn) {
        // reference is filled 
        if (restaurants) {
            return
        }
        // if reference is not filled, we will try to connect with a specific reference in our DB 
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`
            )
        }
    }

    // get a list of restaurants in the DB 
    static async getRestaurants({
        // options 
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        // query
        let query
        // 3 different filters 
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } } // text search, search any word in that text
            }
            else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } } // if cuisine in db equals to the cuisine passed in, search for cuisine
            }
            else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {
            // find all the restaurants from the database that go along with the query that was passed in
            cursor = await restaurants
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page) // get to a specific page

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    // get reviews and put it into restaurant
    static async getRestaurantById(id) {
        try {
            // create a pipeling (mongo db) to help match different collections together
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    // lookup other items to add to the results 
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                // find all the reviews that match the restaurant id
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews", // new field
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            // aggregate the pipeline means to combine everything together
            // return the next item 
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
        }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }
}