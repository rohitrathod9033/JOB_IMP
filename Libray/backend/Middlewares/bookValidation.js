import Joi from "joi";

const titleRegex = /^[A-Za-z0-9][A-Za-z0-9 ]*$/;
const stringOnlyRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

const bookValidation = (req, res, next) => {
    let { title, author, category, publicationYear, totalCopies, availableCopies, status, thumbnail  } = req.body;
    // let thumbnail = req.file?.filename;
    // console.log("thumbnail------->", thumbnail);

    let schema = Joi.object({
        title: Joi.string()
            .trim()
            .pattern(titleRegex)
            .min(2)
            .max(100)
            .required(),

        author: Joi.string()
            .trim()
            .pattern(stringOnlyRegex)
            .min(2)
            .max(50)
            .required(),

        category: Joi.string()
            .trim()
            .pattern(stringOnlyRegex)
            .min(3)
            .max(30)
            .required(),

        publicationYear: Joi.number()
            .integer()
            .min(1975)
            .max(new Date().getFullYear())
            .required(),

        totalCopies: Joi.number()
            .integer()
            .min(1)
            .required(),

        availableCopies: Joi.number()
            .integer()
            .min(0)
            .max(Joi.ref("totalCopies"))
            .required(),

        status: Joi.string()
            .valid("available", "unavailable")
            .required(),

        thumbnail: Joi.string()
            .required(),
    });

    const { error } = schema.validate({
        title,
        author,
        category,
        publicationYear,
        totalCopies,
        availableCopies,
        status,
        thumbnail
    });

    if (error) {
        return res.status(400).json({
            message: "Wrong Book Validation",
            error: error.details[0].message
        });
    }

    next();
};

export { bookValidation };