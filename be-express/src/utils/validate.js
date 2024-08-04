const { validationResult } = require('express-validator')

const validate = validations => {
    return async (request, response) => {
        await Promise.all(validations.map(validation => validation.run(request)))
        const result = validationResult(request)
        if (result.isEmpty()) return null
        else {
            const errors = []
            for (const error of result.errors)
                if (error.location == 'body') {
                    const index = errors.findIndex(x => x.Field == error.param)
                    if (index == -1)
                        errors.push({
                            Field: error.param,
                            Messages: [error.msg],
                        })
                    else errors[index].Messages.push(error.msg)
                }
            return errors
        }
    }
}

module.exports = validate
