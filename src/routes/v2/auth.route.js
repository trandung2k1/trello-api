import { Router } from 'express';
const router = Router();
router.get('/', function (req, res) {
    return res.status(200).send('AUTH');
});
export default router;
