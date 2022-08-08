// Restaurant Controller Class 
import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {

    static async apiGetRestaurants(req, res, next) {
        // api call is called through a url --> query string (specify certain parameters)
        // check if the query in the url exists, then parse it to an integer. Else default is 20
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        
        let filters = {} // Filter starts emppty
        // if cuisine is in the query string, then the cuisine is set to the query string
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }
        
        // call the getRestaurants 
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        })

        // response when the api url is called 
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response) // send a json response to whoever made the request
    }

    static async apiGetRestaurantById(req, res, next) {
        try {
            let id = req.params.id || {}
            let restaurant = await RestaurantsDAO.getRestaurantById(id)
            if (!restaurant) {
                res.status(404).json({ errpr: "Not found" })
                return
            }
            res.json(restaurant)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetRestaurantCuisines(req, res, next) {
        // get cuisines if not error
        try {
            let cuisines = await RestaurantsDAO.getCuisines()
            res.json(cuisines)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

}