import React ,{ useState } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantApi from '../api/RestaurantApi';

export const AddReview = () => {

    const [name,setName] = useState("");
    const [reviewText,setReviewText] = useState("");
    const [rating,setRating] = useState("Rating");
    const {id} = useParams();

    const submitHandler = async (event)=>{
        // event.preventDefault();
       const response = await RestaurantApi.post(`/${id}/addReview`,{
            name,
            review:reviewText,
            rating
        });
        console.log(response)
    }

  return (
    <div className='mb-2'>
        <form action=''>
            <div className='form-row'> 
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(event)=> setName(event.target.value)} id='name' placeholder='name' className='form-control'/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor='rating'>Ratings</label>
                    <select value={rating} onChange={(event)=> setRating(event.target.value)} id='rating' className='form-select'>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="Review">Review</label>
                <textarea value={reviewText} onChange={(event)=> setReviewText(event.target.value)} id='Review' cols={30} rows={10} className="form-control"></textarea>
            </div>
            <button onClick={submitHandler} type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    </div>
  )
}
