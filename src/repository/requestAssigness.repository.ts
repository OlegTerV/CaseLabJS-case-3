import type {RequestAssignees} from "../models/entities/request-assignees"
const reqAssignStorage = require("./../storage/request-assignees-storage")
const {v4} = require("uuid")
const {getTechnicianById} = require("./technician.repository")

module.exports.setAssignee = function (item: any, reqId: string, ) {
    const newReqAssign = {
        id: v4(),
        technicianId: item.technicianId,
        requestId: reqId,
        role:item.technicianRole,
        hours: item.hours
    }

    reqAssignStorage.push(newReqAssign)
}

module.exports.getAllReqAssignees = function () {
    return reqAssignStorage
}

module.exports.getAllAssigneesForRequest = function (reqId: string) {
    return reqAssignStorage
        .filter((it: RequestAssignees) => it.requestId === reqId)
        .map((it: RequestAssignees) => getTechnicianById(it.technicianId))
}

module.exports.removeRequestAsigneeFromStorage = function (requestAssignee: RequestAssignees) {
    const index = reqAssignStorage.indexOf(requestAssignee)
    reqAssignStorage.splice(index, 1)
}

module.exports.getReqAssigneeByReqIdTechId = function (reqId: string, technicialId: string) {
    return reqAssignStorage.find((it: RequestAssignees) => 
        ((it.technicianId == technicialId) && (it.requestId == reqId))
    )
}

module.exports.getAllEntiresForRequest = function (reqId: string) {
    return reqAssignStorage.filter((it: RequestAssignees) => it.requestId === reqId)
}