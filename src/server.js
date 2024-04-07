import express from 'express';
import cors from 'cors';
import routes from './routes/v1/index.js';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import mongoSanitize from 'express-mongo-sanitize';
import corsOptions from './middlewares/cors.middleware.js';
import {
    errorHandler,
    notFound,
} from './middlewares/handlerError.middleware.js';

import connectDB, { client, getDatabaseInstance } from './config/db.js';
import { env } from './config/environment.js';
// import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import openapiSpecification from './config/swagger.js';
const port = env.PORT || 4000;
const startServer = () => {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('combined'));
    app.use(
        mongoSanitize({
            allowDots: true,
            replaceWith: '_',
        }),
    );
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
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(openapiSpecification),
    );
    app.get('/api-docs-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        return res.send(openapiSpecification);
    });
    routes(app);
    app.use(notFound);
    // app.use(errorHandler);
    app.use(errorHandlingMiddleware);
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    }).on('error', (e) => {
        console.log(e);
        process.exit(1);
    });
    process.on('SIGINT', async () => {
        console.log('You are performing a server shutdown!');
        console.log('Close connection MongoDB shutdown!');
        await client.close();
        process.exit(0);
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

(async () => {
    try {
        console.log('Connected MongoDB successfully');
        await connectDB();
        startServer();
    } catch (error) {
        console.log('Connected MongoDB failed.');
        console.log(error);
        process.exit(1);
    }
})();
