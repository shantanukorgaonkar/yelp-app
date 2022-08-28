import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantApi from "../api/RestaurantApi";
import { AddReview } from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantContext";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { setSelectedRestaurants, selectedRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantApi.get(`/${id}`);
        
        setSelectedRestaurants(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[]);

  return <div>
    { selectedRestaurants && (
    <>
    <h1 className="text-center display-1">{selectedRestaurants.restaurant.name}</h1>
    <div className="text-center">
      <StarRating  rating={selectedRestaurants.restaurant.average_rating}/>
      <span className="text-warning ml-1">
          {selectedRestaurants.restaurant.count? `(${selectedRestaurants.restaurant.count})`:`(0)`}
        </span>
    </div>
      <div className="mt-3">
        <Reviews reviews={selectedRestaurants.reviews} />
      </div>
      <AddReview />
    </>
  )}</div>;
};

export default RestaurantDetail;
