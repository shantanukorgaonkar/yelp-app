import React, { useEffect , useContext } from "react";
import RestaurantApi from "../api/RestaurantApi";
import {useNavigate} from 'react-router-dom'
import { RestaurantsContext } from "../context/RestaurantContext";
import StarRating from "./StarRating";


const RestaurantList = () => {

const {restaurants , setRestaurants} = useContext(RestaurantsContext);
let navigate= useNavigate();
  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const response = await RestaurantApi.get("/");
        setRestaurants(response.data.data.restaurants);

      } catch (error) {
        console.log(error.message)
      }
    };

    getAllRestaurants();
  }, []);

const restaurantDeleteHandler = async (event,id)=>{
event.stopPropagation()
try {
 const response = await RestaurantApi.delete(`/${id}`);
 setRestaurants(restaurants.filter((restaurant)=> restaurant.id !== id))
} catch (error) {
  console.log(error)
}

}

const restaurantUpdateHandler =(event,id)=>{
  event.stopPropagation()
navigate(`/restaurants/${id}/update`);
}

const selectRestaurantHandler = (id)=>{
    navigate(`/restaurants/${id}`)
}

const renderRating = (restaurant)=>{

  if(!restaurant.count){
    return <span className="text-warning">0 reviews</span>
  }
  
 return(<>
 <StarRating rating={restaurant.id}/>
 <span className="text-warning ml-1">({restaurant.count})</span>
 </>) 
}
  return (
    <div style={{ marginTop: 25 }} className="list-group">
      <table className="table table-hover table-bordered border-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-info text-white">
          {restaurants && restaurants.map((restaurant)=>{
            return(
            <tr key={restaurant.id} onClick={()=>selectRestaurantHandler(restaurant.id)}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{"$".repeat(restaurant.price_range)}</td>
              <td>{renderRating(restaurant)}</td>
              <td>
                <button className="btn btn-warning" onClick={(event)=> restaurantUpdateHandler(event,restaurant.id)}>Update</button>
              </td>
              <td>
                <button className="btn btn-danger text-dark" onClick={(event)=> restaurantDeleteHandler(event,restaurant.id)}> Delete</button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
