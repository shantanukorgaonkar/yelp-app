const express = require('express');
const db = require('../db/index.js')

const router = express.Router();

// Get all restaurants

router.get('/', async (req, res) => {
    try {

        const restaurantRatingsData = await db.query('SELECT * FROM restaurants LEFT JOIN ( SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;');
        console.log("results",restaurantRatingsData);

        res.status(200).json({
            status: 'success',
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows
            }
        })

    } catch (error) {
        console.log(error)
    }

})

//Get a single restaurant

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const restaurant = await db.query('SELECT * FROM restaurants LEFT JOIN ( SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id=$1;', [id]);

        const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id=$1', [id]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0],
                reviews:reviews.rows
            }
        })
    } catch (error) {
        console.log(error)
    }

})


// Create a restaurant

router.post('/', async (req, res) => {

    const name = req.body.name;
    const location = req.body.location;
    const priceRange = req.body.price_range;
    

    try {

        const result = await db.query('INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) returning *', [name, location, priceRange])
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (error) {
        console.log(error);
    }
})

// Update a restaurant

router.put('/:id',async(req, res) => {

    const name = req.body.name;
    const location = req.body.location;
    const priceRange = req.body.price_range;
    const id = req.params.id;

    try {
        const result = await db.query('UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 returning *',[name,location,priceRange,id]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: result.rows[0]
            }
        })

    } catch (error) {
        console.log(error);
    }


})

// Delete a restaurant

router.delete('/:id',async (req, res) => {

    const id=req.params.id;

    try {
        const result = await db.query('DELETE FROM restaurants WHERE id=$1',[id]);

        res.status(204).json({
            status: 'deleted',
        })
    } catch (error) {
        console.log(error)
    }
   
})

router.post('/:id/addReview', async(req, res)=>{
    const restaurantId = req.params.id;
    const customerName = req.body.name;
    const customerReview = req.body.review;
    const customerRating = req.body.rating;

    try {

        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name , review , rating) values ($1,$2,$3,$4) returning *',[restaurantId,customerName,customerReview,customerRating]);
         res.status(201).json({
            status:'success',
            data:{
                review:newReview.rows[0]
            }
         })

         console.log(newReview)
    } catch (error) {
        console.log(error);
    }

})
module.exports = router;