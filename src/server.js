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
const port = process.env.PORT || 4000;
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
