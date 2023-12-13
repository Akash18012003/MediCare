const mongoose = require('mongoose');
require("dotenv").config()
uri=process.env.MONGOURL;
const mongoURI = uri;

const mongoDB = async () => {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        await console.log("Connected to MongoDB");
        
    
        const healthItemsCollection = mongoose.connection.db.collection('medicine_iteams');
        healthItemsCollection.find({}).toArray(async function(err,data){
            
            const medicine_catogory = await mongoose.connection.db.collection('medicine_catogory');
            medicine_catogory.find({}).toArray(function(err,catData){
                if(err) console.log(err);
                else{
                    global.medicine_iteams=data;
                    global.medicine_catogory=catData;
                }
            })
            //global.medicine_iteams=data;
            //  console.log(data);
        })

        
    } catch (err) {
        await console.error("MongoDB connection error:", err);
    }
};

module.exports = mongoDB;