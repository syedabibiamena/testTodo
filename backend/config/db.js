
import mongoose from "mongoose";

const connecttoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is  Connected now :", con.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connecttoDB;
