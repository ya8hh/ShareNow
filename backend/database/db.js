import mongoose from 'mongoose'

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"pintrest"
        });
        console.log("MONGODB CONNECTED");
    }
    catch(error){
        console.log("Error While Connecting To DataBase:",error)
    }
}
export default connectDb;