import 'dotenv/config';

export const env = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    BUILD_MODE: process.env.BUILD_MODE,
};
