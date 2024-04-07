import auth from './auth.router.js';
import board from './board.router.js';
const routes = (app) => {
    app.use('/api/v1/auth/', auth);
    app.use('/api/v1/board/', board);
};

export default routes;
