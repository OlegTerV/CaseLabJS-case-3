import type {Site} from "../models/entities/site"

const sitesStorage = require("./../storage/sites-storage")

module.exports.getSiteById = function (siteId: string) {
    return sitesStorage.find((it: Site) => it.id === siteId)
}