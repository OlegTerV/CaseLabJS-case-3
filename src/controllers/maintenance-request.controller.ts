import type e = require("express")
const {getAllItems, getById, createNewItem, editFields, editMaintReqStatus, daleteMaintReq} = require("./../services/maintenance-request.service")

module.exports.getAll = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const queryParams = (req as any).valid.query.data
        const allItems = getAllItems(queryParams)
        res.status(200).json(allItems)
    } catch (error) {
        next(error)
    }
}

module.exports.getOneById = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const itemId = (req as any).valid.params.data.requestId
        const currentItem = getById(itemId)
        res.status(200).json(currentItem)
    } catch (error) {
        next(error)
    }
}

module.exports.createNewRequest = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqbody = (req as any).valid.body.data
        const result = createNewItem(reqbody)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports.editFieldsRequest = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqBody = (req as any).valid.body.data
        const reqId = (req as any).valid.params.data.requestId
        const result = editFields(reqBody, reqId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports.editRequestStatus = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqBody = (req as any).valid.body.data
        const reqId = (req as any).valid.params.data.requestId
        const result = editMaintReqStatus(reqBody, reqId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports.deleteRequest = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqId = (req as any).valid.params.data.requestId
        daleteMaintReq(reqId)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}