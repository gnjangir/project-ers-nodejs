const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;