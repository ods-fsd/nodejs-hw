import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pino from 'pino-http';
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
import Note from './models/note.js';


const PORT = process.env.PORT || 3000;

const app = express();


app.use(logger);

app.use(express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '1mb',
}));

app.use(cors());
app.use(
    pino({
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'HH:MM:ss',
                ignore: 'pid,hostname',
                messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
                hideObject: true,
            },
        },
    }),
);

app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);


await connectMongoDB();


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API!'
    });
});


app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.status(200).json({
        message: 'Retrieved all notes',
        notes
    });
});


app.get('/notes/:noteId', async (req, res) => {
    const {
        noteId
    } = req.params;
    const note = await Note.findById(noteId);
    res.status(200).json({
        message: 'Retrieved note with id: ' + noteId,
        note
    });
});

app.get('/test-error', (req, res) => {
    throw new Error('Test error');
});


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    const isProd = process.env.NODE_ENV === "production";

    res.status(500).json({
        message: isProd ?
            "Something went wrong. Please try again later." : err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});