import type e = require("express")
const {ValidationError} = require("./../errors/custom-errors")

module.exports.validation = function (schema: any) {
    return (req: e.Request, res: e.Response, next: e.NextFunction) => {
        (req as any).valid = {}

        const keys = ["body", "query", "params"] as const //списал у Gemini, мой вариант обхода проблемы, связанной с типизацией req, представлен ниже в комментарии (отстойный вариант)

        for (const part of keys) {
            if (!schema[part]) continue
            
            const result = schema[part].safeParse(req[part])
            if (!result.success) {
                return next(new ValidationError(result.error))
            }

            (req as any).valid[part] = result
        }
        next()
    }
}

/*
        let result = schema.params.safeParse(req["params"])
        if (!result.success) {
            return next(new ValidationError(`Ошибка валидации: ${result.error}`))
        }
        (req as any).valid.params = result.data

        result = schema.query.safeParse(req.query)
        if (!result.success) {
            return next(new ValidationError(`Ошибка валидации: ${result.error}`))
        }
        (req as any).valid.query = result.data

        result = schema.body.safeParse(req.body)
        if (!result.success) {
            return next(new ValidationError(`Ошибка валидации: ${result.error}`))
        }
        (req as any).valid.body = result.data   

        next()*/