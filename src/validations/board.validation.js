import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
const create = async (req, res, next) => {
    const createSchema = Joi.object({
        title: Joi.string()
            .required()
            .min(3)
            .max(100)
            .trim()
            .strict()
            .messages({
                'any.required': 'Title is required',
                'string.empty': 'Title is not allowed to be empty (custom)',
            }),
        description: Joi.string()
            .required()
            .allow(null)
            .min(3)
            .max(300)
            .trim()
            .strict(),
    });
    try {
        await createSchema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        const errors = error?.details?.map((i) => ({
            fieldname: i?.path?.join(', '),
            message: i?.message?.replace(/\"/g, ''),
        }));
        next(
            new ApiError(
                StatusCodes.UNPROCESSABLE_ENTITY,
                new Error(error).message.replace(/\"/g, '').replace('.', ','),
                errors,
            ),
        );
        // return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors });
    }
};
const update = (req, res, next) => {
    console.log('Validation board');
    next();
};

export const boardValidation = {
    create,
    update,
};
