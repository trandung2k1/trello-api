import auth from './auth.route.js';
const routes = (app) => {
    app.use('/api/v2/auth/', auth);
};

export default routes;
