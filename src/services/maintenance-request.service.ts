const {getById} = require("./../repository/equipment.repository")
const {getAll, getMaintReqById, addNew, deleteItem, getElementsCount} = require("./../repository/maintenanceRequest.repository")
const {v4} = require("uuid")
const {AppError, NotFoundError, ConflictError, InvalidInputError} = require("./../errors/custom-errors")
const logger = require("./../middlewares/logger")

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