import { createClient, Client } from '@vercel/postgres';

export async function connectToDatabase(): Promise<Client> {
    const client = createClient({
    
    });


  try {
    await client.connect();
    console.log('Connected to database');
    return client;
  } catch (err) {
    console.error('Error connecting to database', err);
    throw err;
  }
}