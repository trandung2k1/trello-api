import { StatusCodes } from 'http-status-codes';
import BoardService from '~/services/board.service';
class BoardController {
    static async create(req, res, next) {
        const { title, description } = req.body;
        try {
            const createdBoard = await BoardService.create({
                title,
                description,
            });
            return res.status(StatusCodes.CREATED).json(createdBoard);
        } catch (error) {
            // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            next(error);
        }
    }
}

export default BoardController;
