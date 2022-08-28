require('dotenv').config()
const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/RestaurantRoutes.js')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.use('/api/v1/restaurants',restaurantRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is up and listening on port  ${PORT}`);
})