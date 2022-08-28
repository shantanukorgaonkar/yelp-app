import React , {useState, createContext }from 'react'

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {


    const [restaurants,setRestaurants] = useState([]);
    const [selectedRestaurants,setSelectedRestaurants]=useState(null);

    const addRestaurant =(restaurant)=>{
        setRestaurants([...restaurants, restaurant])
    }


    return(<RestaurantsContext.Provider value={{restaurants, setRestaurants , addRestaurant, selectedRestaurants,setSelectedRestaurants}}>
        {props.children}
    </RestaurantsContext.Provider>)
}