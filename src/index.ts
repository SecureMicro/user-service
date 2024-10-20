import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const startServer = (): void => {
    try {
        const port: number = Number(process.env.APP_PORT) || 8000;
        app.start(port);
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();