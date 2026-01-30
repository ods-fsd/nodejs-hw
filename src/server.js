import express from 'express';
import cors from 'cors';
import 'dotenv/config';


import notesRoutes from './routes/notesRoutes.js';
import {
    logger
} from "./middleware/logger.js";
import {
    notFoundHandler
} from "./middleware/notFoundHandler.js";
import {
    errorHandler
} from "./middleware/errorHandler.js";
import {
    connectMongoDB
} from './db/connectMongoDB.js';
import {
    errors,
} from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const PORT = Number(process.env.PORT) || 3000;
const app = express();


app.use(logger);
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(
    express.json({
        type: ['application/json', 'application/vnd.api+json'],
        limit: '1mb',
    })
);

app.use(cookieParser());

app.use(notesRoutes);
app.use(authRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectMongoDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();