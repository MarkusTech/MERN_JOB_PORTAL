import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB);
    console.log(
      `Database connected on ${connect.connection.host} ${connect.connection.name}`
        .bgGreen
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
