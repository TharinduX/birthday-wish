import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
