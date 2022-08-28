require('dotenv').config()
const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/RestaurantRoutes.js')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.use('/api/v1/restaurants',restaurantRoutes);

if(process.env.NODE_ENV==='production'){
app.use(express.static('client/build'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})

}

app.listen(PORT, ()=>{
    console.log(`Server is up and listening on port  ${PORT}`);
})