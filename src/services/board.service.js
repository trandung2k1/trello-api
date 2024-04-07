import { client } from '~/config/db';
import { slugify } from '~/utils/formatters';

class BoardService {
    static async create({ title, description }) {
        try {
            // const rs = await client
            //     .db('trello-api')
            //     .collection('users')
            //     .findOne({ title });
            // return rs;
            return { title, description, slug: slugify(title) };
        } catch (error) {
            throw error;
        }
    }
}

export default BoardService;
