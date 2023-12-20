import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase(): Promise<void> {
  try {
    mongoose.set('strictQuery', true);

    if (!process.env.URI) {
        throw new Error('A variável de ambiente URI não está definida.');
      }
      
    await mongoose.connect(process.env.URI);

    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro de conexão com o MongoDB:', error);
  }
}

export default connectToDatabase;