import express from "express" 
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router() // get access to the express router 

router.route("/").get(RestaurantsCtrl.apiGetRestaurants) // get the Return at the route from the RestaurantsCtrl file 
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById) // get specific restaurant with specific id
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines) // allow the user to click from a dropdown. this populates the dropdown

// route to put the new review 
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router
