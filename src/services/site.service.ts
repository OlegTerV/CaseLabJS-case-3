import type {Equipment} from"../models/entities/equipment"
import type {MaintenanceRequest} from "../models/entities/maintenance-request"
import type {RequestAssignees} from "../models/entities/request-assignees"

const {getSiteById} = require("./../repository/site.repository")
const {InvalidInputError, NotFoundError} = require("./../errors/custom-errors")
const {getAllSiteEquipmets} = require("./../repository/equipment.repository")
const {getAllRequestsForEquipment} = require("./../repository/maintenanceRequest.repository")
const {getAllEntiresForRequest} = require("./../repository/requestAssigness.repository")

module.exports.getInfo = function (siteId: string){
    const currentSite = getSiteById(siteId)
    if (!currentSite) throw new NotFoundError(`Сектор с id = ${siteId}`)

    const allSiteEquipments: Equipment[] = getAllSiteEquipmets(siteId)
    const allSiteRequests: MaintenanceRequest[] = []

    for (const equip of allSiteEquipments) {
        allSiteRequests.push(...getAllRequestsForEquipment(equip.id))
    }

    const options = ["low", "medium", "high", "critical"]
    const response: Record<string, any> = {}
    for (const priority of options) {
        const requestsWithPriority = allSiteRequests.filter((it: MaintenanceRequest) => it.priority === priority)
        const newReq: MaintenanceRequest[] =[]
        const inProgressReq: MaintenanceRequest[] =[]
        const rejectedReq: MaintenanceRequest[] =[]
        const doneReq: MaintenanceRequest[] = []
        let countClosedOrRejectedReqs = 0
        let hoursCount = 0
        for (const req of requestsWithPriority) {
            switch (req.status) {
                case "new": 
                    newReq.push(req); 
                    break;
                case "in_progress": 
                    inProgressReq.push(req); 
                    break;
                case "rejected": 
                    countClosedOrRejectedReqs+=1
                    hoursCount+= ((new Date(req.updatedAt).getTime() - new Date(req.createdAt).getTime())/1000/60/60)
                    rejectedReq.push(req); 
                    break;
                case "done": 
                    countClosedOrRejectedReqs+=1
                    hoursCount+= ((new Date(req.updatedAt).getTime() - new Date(req.createdAt).getTime())/1000/60/60)
                    doneReq.push(req); 
                    break;
            }
        }

        response[priority] = {
            "Количество заявок статуса 'new'": `${newReq.length}`,
            "Количество заявок статуса 'in_progress'": `${inProgressReq.length}`,
            "Количество заявок статуса 'rejected'": `${rejectedReq.length}`,
            "Количество заявок статуса 'done'": `${doneReq.length}`,
            "Среднее количество часов, затраченное на закрытие заявки (перевод в статус done, rejected)": `${Math.round(hoursCount/countClosedOrRejectedReqs)}`
        }
    }

/*
    const newReq: MaintenanceRequest[] =[]
    const inProgressReq: MaintenanceRequest[] =[]
    const rejectedReq: MaintenanceRequest[] =[]
    const doneReq: MaintenanceRequest[] = []
    let avgNewReq: number = 0
    let avgInProgressReq: number = 0
    let avgRejectedReq: number = 0
    let avgDoneReq: number = 0
    for (const req of allSiteRequests) {
        switch (req.status) {
            case "new": 
                newReq.push(req); 
                avgNewReq += averageTimeForReq(req)
                break;
            case "in_progress": 
                inProgressReq.push(req); 
                avgInProgressReq += averageTimeForReq(req)
                break;
            case "rejected": 
                rejectedReq.push(req); 
                avgRejectedReq += averageTimeForReq(req)
                break;
            case "done": 
                doneReq.push(req); 
                avgDoneReq += averageTimeForReq(req)
                break;
        }
    }*/

    return response
}

function averageTimeForReq(req: MaintenanceRequest) {
    const allReqAssignEntries: RequestAssignees[] = getAllEntiresForRequest(req.id)
    let sumHourse = 0
    for (const req of allReqAssignEntries) {
        sumHourse += req.hours
    }
    return sumHourse/allReqAssignEntries.length
}