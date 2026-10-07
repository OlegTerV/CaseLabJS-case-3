import e = require("express");
const {getInfo} = require("./../services/site.service")

module.exports.getSiteInfoAboutRequests = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const siteId = (req as any).valid.params.data.siteId
        const result = getInfo(siteId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}