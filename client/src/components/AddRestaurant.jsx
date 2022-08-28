import React, { useState , useContext} from "react";
import RestaurantApi from "../api/RestaurantApi";
import { RestaurantsContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const {addRestaurant} = useContext(RestaurantsContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await RestaurantApi.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-center">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={submitHandler}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
