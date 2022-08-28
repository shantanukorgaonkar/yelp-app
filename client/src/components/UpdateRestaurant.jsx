import React  ,{useState , useEffect}from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantApi from '../api/RestaurantApi';
const UpdateRestaurant = (props) => {

    const {id} = useParams()
    let navigate = useNavigate();
    const[name,setName]=useState('');
    const[location,setLocation]=useState('');
    const[priceRange,setPriceRange]=useState('')

    useEffect(()=>{
        const fetchRestaurant = async ()=>{
            try {
                const response = await RestaurantApi.get(`/${id}`);
                setName(response.data.data.restaurant.name);
                setLocation(response.data.data.restaurant.location);
                setPriceRange(response.data.data.restaurant.price_range);

            } catch (error) {
                console.log(error)
            }
           
        }

        fetchRestaurant();
    },[])

    const submitHandler= async(event)=>{
        event.preventDefault();

        const updatedRestaurant = await RestaurantApi.put(`/${id}`,{
            name,
            location,
            price_range:priceRange
        });
        navigate('/')
    }

  return (
    <div>
        <form action=''>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input id='name' className='form-control' type='text' onChange={(event)=> setName(event.target.value)} value={name}/>
            </div>
            <div className='form-group'>
                <label htmlFor='location'>Location</label>
                <input id='location' className='form-control' type='text' onChange={(event)=> setLocation(event.target.value)} value={location}/>
            </div>
            <div className='form-group'>
                <label htmlFor='price'>Price Range</label>
                <input id='price' className='form-control' type='number' onChange={(event)=> setPriceRange(event.target.value)} value={priceRange} />
            </div>
            <button style={{marginTop:25}} className='btn btn-primary' type='submit' onClick={submitHandler}>Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant