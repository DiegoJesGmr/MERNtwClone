import mongoose from 'mongoose';
const connectMongoDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected to: ${conn.connection.host}`)
    } catch(error){
        console.error(`Hubo un error al conectar a mongo: ${error.message}`);
        process.exit(1);
    }
}


export default connectMongoDB;