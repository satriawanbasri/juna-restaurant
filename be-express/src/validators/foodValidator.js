const { body } = require('express-validator')

const roleValidator = [
    body('name').isLength({ max: 128 }).withMessage('maximum 128 chars long').not().isEmpty().withMessage('required'),
    body('pictureUrl').isLength({ max: 512 }).withMessage('maximum 512 chars long').not().isEmpty().withMessage('required'),
    body('price').isNumeric().not().isEmpty().withMessage('required'),
]

module.exports = roleValidator
