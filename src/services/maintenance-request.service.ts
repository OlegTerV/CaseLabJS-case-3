import type technician = require("../models/entities/technician")

const {getById} = require("./../repository/equipment.repository")
const {getAll, getMaintReqById, addNew, deleteItem, getElementsCount} = require("./../repository/maintenanceRequest.repository")
const {v4} = require("uuid")
const {AppError, NotFoundError, ConflictError, InvalidInputError, UnprocessableEntity} = require("./../errors/custom-errors")
const logger = require("./../middlewares/logger")
const {getTechnicianById} = require("./../repository/technician.repository")
const {
    setAssignee, 
    getAllReqAssignees, 
    getAllAssigneesForRequest, 
    removeRequestAsigneeFromStorage, 
    getReqAssigneeByReqIdTechId,
    getAllEntiresForRequest,
    deleteAllAssigneesForRequest
} = require("./../repository/requestAssigness.repository")
const {getHistoryForReq, addHisotyStatusEntry} = require("./../repository/requestStatusHistory.repository")

module.exports.getAllItems = function (queryParams: any) {
    const start = queryParams.limit * (queryParams.page - 1)
    const end = queryParams.limit * queryParams.page
    const filterStatus = queryParams.status
    const filterPriority = queryParams.priority
    const filterEquipmentId = queryParams.equipmentId
    const filterPlannedAt = queryParams.plannedAt

    const requestsCount = getElementsCount(filterStatus, filterPriority, filterEquipmentId, filterPlannedAt)
    if (start > requestsCount) throw new InvalidInputError(`Для limit = ${queryParams.limit} доступно максимум ${Math.ceil(requestsCount/queryParams.limit)} страниц`)

    const result = {
        maintenanceRequests: getAll(start, end, filterStatus, filterPriority, filterEquipmentId, filterPlannedAt),
        page: queryParams.page,
        limit: queryParams.limit
    }
    
    return result
}

module.exports.getById = function (itemId: string) {
    const currentElement = getMaintReqById(itemId)
    if (!currentElement) throw new NotFoundError(`id = ${itemId}`)
    return currentElement
}

module.exports.createNewItem = function (reqBody: any) {
    const equipmentId = reqBody.equipmentId
    const equipment = getById(equipmentId)
    if (!equipment) throw new NotFoundError(`Прибор с id = ${equipmentId}`)
    const maintenanceRequestId = v4()
    const createdAt = new Date()
    const updatedAt = createdAt
    //plannedAt TODO
    const maintenanceRequest= {
        ...reqBody,
        id: maintenanceRequestId,
        createdAt: createdAt,
        updatedAt: updatedAt
    }
    addNew(maintenanceRequest)
    return maintenanceRequest
}

module.exports.editFields = function (reqBody: any, reqId: string) {
    const currentMaintenanceRequest = getMaintReqById(reqId)
    if (!currentMaintenanceRequest) throw new NotFoundError(`Запрос на обслуживание оборудования с id = ${reqId}`)
    
    if (reqBody.equipmentId) {
        const equipment = getById(reqBody.equipmentId)
        if (!equipment) throw new NotFoundError(`Прибор с id = ${reqBody.equipmentId}`)
    }

    const dateNow = new Date()
    const newMaintReq = {
        id: currentMaintenanceRequest.id,
        equipmentId: reqBody.equipmentId || currentMaintenanceRequest.equipmentId,
        title: reqBody.title || currentMaintenanceRequest.title,
        description: reqBody.description || currentMaintenanceRequest.description,
        priority: reqBody.priority || currentMaintenanceRequest.priority,
        status: currentMaintenanceRequest.status,
        plannedAt: reqBody.plannedAt || currentMaintenanceRequest.plannedAt,
        createdAt: currentMaintenanceRequest.createdAt,
        updatedAt: dateNow
    }

    deleteItem(currentMaintenanceRequest)
    addNew(newMaintReq)
    return newMaintReq
}

//new → in_progress → done ; new → rejected ; in_progress → rejected
module.exports.editMaintReqStatus = function (reqBody: any, reqId: string) {
    const currentMaintenanceRequest = getMaintReqById(reqId)
    if (!currentMaintenanceRequest) throw new NotFoundError(`Запрос на обслуживание оборудования с id = ${reqId}`)
    const newStatus = reqBody.status

    if (currentMaintenanceRequest.status === "new") {
        if ((newStatus !== "in_progress") && (newStatus !== "rejected")) {
            throw new ConflictError(`Нельзя изменить статус заявки с ${currentMaintenanceRequest.status} на ${newStatus}`)
        }
    } else if (currentMaintenanceRequest.status === "in_progress") {
        if ((newStatus !== "done") && (newStatus !== "rejected")) {
            throw new ConflictError(`Нельзя изменить статус заявки с ${currentMaintenanceRequest.status} на ${newStatus}`)
        }
    } else if ((currentMaintenanceRequest.status === "done") || (currentMaintenanceRequest.status === "rejected")) {
        throw new ConflictError(`Нельзя изменить статус заявки с ${currentMaintenanceRequest.status} на ${newStatus}`)
    }
    
    const changeAuthor = reqBody.changeAuthor
    if (!changeAuthor) throw new NotFoundError(`Специалист с id = ${changeAuthor}`)
    
    const allAssignees = getAllEntiresForRequest(reqId)
    if (allAssignees.length === 0 ) throw new ConflictError(`Заявку нельзя перевести в статус in_progress без назначенных исполнителей!`)

    addHisotyStatusEntry(currentMaintenanceRequest, newStatus, changeAuthor, reqBody.comment)
    
    deleteItem(currentMaintenanceRequest)
    currentMaintenanceRequest.status = newStatus
    currentMaintenanceRequest.updatedAt = new Date()
    addNew(currentMaintenanceRequest)
    return currentMaintenanceRequest
}

module.exports.daleteMaintReq = function (reqId: string) {
    const currentMaintenanceRequest = getMaintReqById(reqId)
    if (!currentMaintenanceRequest) throw new NotFoundError(`Запрос на обслуживание оборудования с id = ${reqId}`)

    deleteItem(currentMaintenanceRequest)
}

module.exports.postAssigneesService = function (reqId: string, body: any) {
    const currentReq = getMaintReqById(reqId)
    if (!currentReq) throw new NotFoundError(`id = ${reqId}`)
    const validIds: string[] = []
    let leadRoleFlag_count = 0
    const notValidTechnicianIds = body
        .filter((it: any) => {
            validIds.push(it.technicianId)
            if (it.technicianRole === "lead") leadRoleFlag_count += 1
            if (!getTechnicianById(it.technicianId)){
                return true
            } else return false
        })
        .map((it: any) => it.technicianId)
    if (notValidTechnicianIds.length !== 0 ) throw new InvalidInputError(`Нет специалиста(ов) с id: ${notValidTechnicianIds.join(", ")}`)

    const duplicates = getDuplicates(validIds)
    if (duplicates.size !== 0) throw new InvalidInputError(`Нельзя назначить специалиста(ов) несколько раз на одну и ту же заявку. id сепциалистов: ${duplicates}`)

        /*
    const assigneesIds = getAllAssigneesForRequest(reqId).map((it: technician.Technician) => it.id)
    for (const it of validIds){
        if (assigneesIds.includes(it)) throw new ConflictError(`Нельзя назначить специалиста с id = ${it} опять на эту же заявку`)
    }

    const currentAssignees = getAllEntiresForRequest(reqId)
    let leadRoleFlagOld = false
    //currentAssignees.forEach((it: any) => {if (it.role === "role") leadRoleFlagOld = true})
    for (const assignee of currentAssignees) {
        if (assignee.role === "lead") leadRoleFlagOld = true
    }

    if (leadRoleFlagNew) {
        if (leadRoleFlagOld) throw UnprocessableEntity(`Lead уже есть в бригаде!`)
    } else {
        if (!leadRoleFlagOld) throw UnprocessableEntity(`В команде обязательно должен быть lead!`)
    }
*/

    if (leadRoleFlag_count !== 1) {
        throw new UnprocessableEntity(`В бригаде должен быть ровно один lead!`)
    }

    deleteAllAssigneesForRequest(reqId)
    const newAssignees = setAssignee(body, reqId)

    return newAssignees
}

module.exports.removeRequestAsignee = function (reqId: string, technicianId: string) {
    const currentReq = getMaintReqById(reqId)
    if (!currentReq) throw new NotFoundError(`Запрос с id = ${reqId}`)

    const currentTechnician = getTechnicianById(technicianId)
    if (!currentTechnician) throw new NotFoundError(`Специалист с id = ${technicianId}`)

    const requestAssignee = getReqAssigneeByReqIdTechId(reqId, technicianId)
    if (!requestAssignee) throw new ConflictError(`Специалист с id = ${technicianId} не назначен на заявку с id = ${reqId}`)

    removeRequestAsigneeFromStorage(requestAssignee)
}

module.exports.getHistoryForRequestStatus = function (reqId: string) {
    const currentReq = getMaintReqById(reqId)
    if (!currentReq) throw new NotFoundError(`Запрос с id = ${reqId}`)
    
    return getHistoryForReq(reqId)
}

function getDuplicates (arr: string[]) { //method genered by Gemini
    const temp = new Set()
    const duplicates = new Set()

    for (const element of arr) {
        if (temp.has(element)) duplicates.add(element)
        else temp.add(element)
    }

    return duplicates
}