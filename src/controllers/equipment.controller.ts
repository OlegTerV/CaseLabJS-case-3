import type e = require("express")
const {
    getItemsList, 
    getItemById, 
    createItem, 
    updateItemData, 
    deleteItemData, 
    getWeatherForescatForWindow, 
    getAllRequests,
    getEquipmentLoadFromStorage
} = require("./../services/equipment.service")

function getAll (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const queryParams = (req as any).valid.query.data
        const allItems = getItemsList(queryParams)
        res.status(200).json(allItems)
    } catch (error) {
        next(error)
    }
}

function getOneById (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const itemId = (req as any).valid.params.data.equipmentId
        const result = getItemById(itemId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

function createNew (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqBody = (req as any).valid.body.data
        const result = createItem(reqBody)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

function updateItem (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const itemId = (req as any).valid.params.data.equipmentId
        const reqBody = (req as any).valid.body.data
        const result = updateItemData(reqBody, itemId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

function deleteItem (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const itemId = (req as any).valid.params.data.equipmentId
        deleteItemData(itemId)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

function getWeatherForecastForTheWork (req: e.Request, res: e.Response, next: e.NextFunction) {
    let equipmentId
    let countDays

    try {
        const reqParams = (req as any).valid.params.data
        const reqQuery = (req as any).valid.query.data
        equipmentId = reqParams.equipmentId
        countDays = reqQuery.daysCount
    } catch (error) {
        next(error)
    }

    getWeatherForescatForWindow(equipmentId, countDays)
    .then((element: any) => {
        res.status(200).json(element)
    }) 
    .catch((error: any) => {
        next(error)
    })
}

function getRequestsForEquipment(req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const itemId = (req as any).valid.params.data.equipmentId
        const allRequests = getAllRequests(itemId)
        res.status(200).json(allRequests)
    } catch (error) {
        next(error)
    }
}

function getEquipmentLoadInfo(req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const result = getEquipmentLoadFromStorage()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {getAll, 
    getOneById, 
    createNew, 
    updateItem, 
    deleteItem, 
    getWeatherForecastForTheWork, 
    getRequestsForEquipment, 
    getEquipmentLoadInfo
}