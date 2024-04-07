import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import BoardController from '~/controllers/board.controller';
import { boardValidation } from '~/validations/board.validation';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Board
 *   description: Board api documentation
 */
router.get('/', function (req, res) {
    return res.status(StatusCodes.OK).send('Get all board');
});

router.post('/', boardValidation.create, BoardController.create);
export default router;
