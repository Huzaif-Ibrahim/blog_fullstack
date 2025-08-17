import mongoose from "mongoose";

const connectToDb = () => {
    mongoose.connect(`${process.env.MONGODB_URI}quickblog`)
      .then(() => console.log('Connected to DB'))
      .catch((err) => console.log(`DB error ${err.message}`)) 
}

export default connectToDb