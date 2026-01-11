// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());
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

// Middleware для обробки помилок
app.use((err, req, res, next) => {
    console.error(err);

    const isProd = process.env.NODE_ENV === "production";

    res.status(500).json({
        message: isProd ?
            "Something went wrong. Please try again later." : err.message,
    });
});


app.post('/users', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        message: 'User created'
    });
});

app.get('/notes', (req, res) => {
    res.status(200).json({
        message: 'Retrieved all notes'
    });
});

app.get('/notes/:id', (req, res) => {
    res.status(200).json({
        message: 'Retrieved note with id: ' + req.params.id
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});