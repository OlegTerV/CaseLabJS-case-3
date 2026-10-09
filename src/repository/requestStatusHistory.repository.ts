import type {ReqStatHistoryEntry} from "../models/entities/entry-in-the-request-status-history"
const {v4} = require("uuid")

const reqStatHistoryEntriesStorage = require("./../storage/req-stat-history-storage")

module.exports.getHistoryForReq = function (reqId: string) {
    const hisotry = reqStatHistoryEntriesStorage.filter((it: ReqStatHistoryEntry) => it.requestId === reqId)
    return hisotry
}

module.exports.addHisotyStatusEntry = function (maintenanceRequest: any, newStatus: string, changeAuthorId: string, comment: string) {
    reqStatHistoryEntriesStorage.push({
        id: v4(),
        requestId: maintenanceRequest.id,
        oldStatus: maintenanceRequest.status,
        newStatus: newStatus,
        changeAuthor: changeAuthorId,
        comment: comment,
        createdAt: new Date()
    })
}

/*
 id: "e21e3593-08b7-4de4-6c48-d2f8f17395fe",
    requestId: "3bf32ae8-5d0c-4239-b13d-2d4d5ad8b739",
    oldStatus: "new",
    newStatus: "in_progress",
    changeAuthor: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d02",
    comment: "Начато плановое ТО",
    createdAt: "2026-10-03T14:10:00.000Z" */