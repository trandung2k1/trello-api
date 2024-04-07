import express from 'express';
import cors from 'cors';
import routes from './routes/v1/index.js';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import corsOptions from './middlewares/cors.middleware.js';
import {
    errorHandler,
    notFound,
} from './middlewares/handlerError.middleware.js';
import connectDB, { client, getDatabaseInstance } from './config/db.js';
const port = process.env.PORT || 4000;

const startServer = () => {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('combined'));
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                fontSrc: ["'self'"],
                imgSrc: ["'self'"],
                scriptSrc: ["'self'"],
                upgradeInsecureRequests: [],
                styleSrc: ["'self'"],
                frameSrc: ["'self'"],
            },
            reportOnly: true, // Set to 'true' to enable report-only mode
        }),
    );
    app.get('/', (req, res) => {
        // console.log(getDatabaseInstance());
        return res.status(200).json({
            message: 'Welcome to the server',
        });
    });
    routes(app);
    app.use(notFound);
    app.use(errorHandler);
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
};

// connectDB()
//     .then(() => console.log('Connected MongoDB successfully'))
//     .then(() => startServer())
//     .catch(async (err) => {
//         console.log('Connected MongoDB failed.');
//         console.log(err);
//         await client.close();
//         process.exit(1);
//     });

process.on('SIGINT', async () => {
    console.log('You are performing a server shutdown!');
    console.log('Close connection MongoDB shutdown!');
    await client.close();
    process.exit(0);
});

(async () => {
    try {
        await connectDB();
        console.log('Connected MongoDB successfully');
        startServer();
    } catch (error) {
        console.log('Connected MongoDB failed.');
        console.log(error);
        process.exit(1);
    }
})();
