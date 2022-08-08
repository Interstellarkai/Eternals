// single restaurant
// add review
import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const Restaurant = props => {
  // initial restaurant state 
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // when the page renders call getRestaurant if id is updated 
  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  // splice the index of the one that was deleted and return the prev state 
  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        // restaurant array without the comment deleted 
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return ({
            ...prevState // return prev state w the review deleted 
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  // check if there is a restaurent. 
  // If there is a restaurant, then do the big chunk of html
  // If no restaurant, no restaurant selected is displayed 
  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br />
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street} {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}<br />
                          <strong>User: </strong>{review.name}<br />
                          <strong>Date: </strong>{review.date}
                        </p>
                        {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <button onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</button>
                            <Link to={{
                              pathname: "/restaurants/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;