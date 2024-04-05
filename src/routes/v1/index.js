import auth from './auth.route.js';
const routes = (app) => {
    app.use('/api/v1/auth/', auth);
};

export default routes;
