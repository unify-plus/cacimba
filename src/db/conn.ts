import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase(): Promise<void> {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect("mongodb+srv://kauaneiras:s8fkI1zak6c4VIU9@cluster0.lbit3zf.mongodb.net/?retryWrites=true&w=majority");

    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro de conexão com o MongoDB:', error);
  }
}

export default connectToDatabase;