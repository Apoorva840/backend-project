const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb://localhost:27017/moviesdb',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected',()=>{
        console.log('Connected to the database');
    });

    mongoose.connection.on('error',(err)=>{
        console.error(err.message);
    });
}

module.exports = connectDB;