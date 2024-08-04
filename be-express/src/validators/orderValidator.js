const { body } = require('express-validator')

const roleValidator = [
    body('code').isLength({ max: 128 }).withMessage('maximum 128 chars long').not().isEmpty().withMessage('required'),
    body('name').isLength({ max: 256 }).withMessage('maximum 256 chars long'),
    body('description').isLength({ max: 512 }).withMessage('maximum 512 chars long'),
]

module.exports = roleValidator
