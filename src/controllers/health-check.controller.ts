import type e = require("express")
import winston = require("winston")

module.exports.healthCheck = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    //TODO: проверить досутп к бд
    //TODO: проверить доступность внешних API (не надо)
    return res.status(200).json({
        accessibility: "Service is available",
        status: 200,
        version: process.env.API_VERSION || 1
    })//TODO статус, время работы, версия
}