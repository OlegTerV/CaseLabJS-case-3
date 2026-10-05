import type e = require("express")
const {v4} = require("uuid")

module.exports.setRequestId = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    (req as any).id = (req.headers["x-request-id"] as string) || v4()
    next()
}