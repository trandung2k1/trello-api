import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();
router.get('/', function (req, res) {
    return res.status(StatusCodes.OK).send('Get all auth');
});
export default router;
