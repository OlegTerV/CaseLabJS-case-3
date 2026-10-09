import type {RequestAssignees} from "../models/entities/request-assignees"
const reqAssignStorage = require("./../storage/request-assignees-storage")
const {v4} = require("uuid")
const {getTechnicianById} = require("./technician.repository")

function setAssignee (items: any[], reqId: string, ) {
    const newAssignees: RequestAssignees[] = []
    items.forEach((it: any) => {
        const newReqAssign = {
            id: v4(),
            technicianId: it.technicianId,
            requestId: reqId,
            role:it.technicianRole,
            hours: it.hours
        }
        newAssignees.push(newReqAssign)
        reqAssignStorage.push(newReqAssign)
    })
    return newAssignees
}

function getAllReqAssignees () {
    return reqAssignStorage
}

function getAllAssigneesForRequest (reqId: string) {
    const assignees = reqAssignStorage
        .filter((it: RequestAssignees) => it.requestId === reqId)
        .map((it: RequestAssignees) => getTechnicianById(it.technicianId))
    return assignees
}

function removeRequestAsigneeFromStorage (requestAssignee: RequestAssignees) {
    const index = reqAssignStorage.indexOf(requestAssignee)
    reqAssignStorage.splice(index, 1)
}

function getReqAssigneeByReqIdTechId (reqId: string, technicialId: string) {
    return reqAssignStorage.find((it: RequestAssignees) => 
        ((it.technicianId == technicialId) && (it.requestId == reqId))
    )
}

function getAllEntiresForRequest (reqId: string) {
    const allEntries = reqAssignStorage.filter((it: RequestAssignees) => it.requestId === reqId)
    return allEntries
}

function deleteAllAssigneesForRequest (reqId: string) {
    const temp = reqAssignStorage.filter((it: RequestAssignees) => it.requestId !== reqId)
    reqAssignStorage.splice(0, reqAssignStorage.length)
    reqAssignStorage.push(...temp)
}

module.exports ={
    setAssignee,
    getAllReqAssignees,
    getAllAssigneesForRequest,
    removeRequestAsigneeFromStorage,
    getReqAssigneeByReqIdTechId,
    getAllEntiresForRequest,
    deleteAllAssigneesForRequest
}