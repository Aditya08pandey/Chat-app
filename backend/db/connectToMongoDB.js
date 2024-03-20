import mongoose from "mongoose";

const connectToMongoDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MOngoDB")
    }
    catch(error){
        console.log("error connecting to MongoDB",error.message)
    }
};

export default connectToMongoDB;