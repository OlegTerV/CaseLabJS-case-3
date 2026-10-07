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
    }
    const response = {
        "Количество заявок статуса 'new' / среднее время закрытия": `${newReq.length} / ${Math.round(avgNewReq/newReq.length)}`,
        "Количество заявок статуса 'in_progress' / среднее время закрытия": `${inProgressReq.length} / ${Math.round(avgInProgressReq/inProgressReq.length)}`,
        "Количество заявок статуса 'rejected' / среднее время закрытия": `${rejectedReq.length} / ${Math.round(avgRejectedReq/rejectedReq.length)}`,
        "Количество заявок статуса 'done' / среднее время закрытия": `${doneReq.length} / ${Math.round(avgDoneReq/doneReq.length)}`,
    }

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