let Joi = require("joi");

let bookValidation = (req, res, next) => {
    let { title, author, category, publicationYear, totalCopies, availableCopies, status } = req.body;

    let schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        publicationYear: Joi.number().required(),
        totalCopies: Joi.number().required(),
        availableCopies: Joi.number().required(),
        status: Joi.string().valid("available", "unavailable").required(),
    });

    const { error } = schema.validate({title, author, category, publicationYear, totalCopies, availableCopies, status });


    if (error) {
        return res.status(400).json({ message: "Wrong Book Validation", error });
    }
    next();
};

module.exports = { bookValidation };