import type {ReqStatHistoryEntry} from "../models/entities/entry-in-the-request-status-history"

const reqStatHistoryEntriesStorage = require("./../storage/req-stat-history-storage")

module.exports.getHistoryForReq = function (reqId: string) {
    return reqStatHistoryEntriesStorage.filter((it: ReqStatHistoryEntry) => it.requestId === reqId)
}