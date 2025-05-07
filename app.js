import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sql } from './config/db.js';
dotenv.config();

import messagesRoutes from './routes/messagesRoutes.js';


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/messages", messagesRoutes);

async function initDB() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
  )`;
    } catch(error) {
        console.error("Error initializing database:", error);
    }
}


initDB().then(() => {
    console.log("Loaded DB credentials:", {
        PGUSER: process.env.PGUSER,
        PGPASSWORD: process.env.PGPASSWORD,
        PGHOST: process.env.PGHOST,
        PGDATABASE: process.env.PGDATABASE
      });
console.log("Database initialized successfully.");      
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});