const maintReq = require("./../storage/maintenance-request-data")
const {InvalidInputError} = require("./../errors/custom-errors")

module.exports.getAll = function (start: number, end: number, filterStatus: string, filterPriority: string, filterEquipmentId: string, filterPlannedAt: string) {
    let tempData = maintReq
    tempData = filterByProp(filterStatus, "status", tempData)
    tempData = filterByProp(filterPriority, "priority", tempData)
    tempData = filterByProp(filterEquipmentId, "equipmentId", tempData)
    tempData = filterByProp(filterPlannedAt, "plannedAt", tempData)

    const currentElements = tempData.slice(start , end)
    return currentElements
}

module.exports.getElementsCount = function (filterStatus: string, filterPriority: string, filterEquipmentId: string, filterPlannedAt: string) {
    let tempData = maintReq
    tempData = filterByProp(filterStatus, "status", tempData)
    tempData = filterByProp(filterPriority, "priority", tempData)
    tempData = filterByProp(filterEquipmentId, "equipmentId", tempData)
    tempData = filterByProp(filterPlannedAt, "plannedAt", tempData)

    const count = tempData.length
    return count
}

module.exports.getMaintReqById = function (itemId: string) {
    const currentItem = maintReq.find((element: any) => element.id === itemId)
    return currentItem
}

module.exports.addNew = function (item: any) {
    maintReq.push(item)
}

module.exports.deleteItem = function (item: any) {
    const itemIndex = maintReq.indexOf(item)
    if (itemIndex !== -1) maintReq.splice(itemIndex, 1)
}

module.exports.getAllRequestsForEquipment = function (equipmentId: string) {
    const allRequests = maintReq.filter((element: any) => element.equipmentId === equipmentId)
    return allRequests
}

module.exports.openRequestsForEquioment = function (equipmentId: string) {
    const openRequests = maintReq.filter((element: any) => 
        ((element.status === "new" || element.status === "in_progress") && (element.equipmentId === equipmentId)))
    return openRequests
}

function filterByProp(arrayOfFiltersByOneProp: string | undefined, prop: string, data: any) {
    const standartPriority = ["low", "medium", "high", "critical"]
    const standartStatus = ["new", "in_progress", "done", "rejected"]

    if (arrayOfFiltersByOneProp) {
        const allFilters = arrayOfFiltersByOneProp.split(",").map((element: string) => element.trim())
        if (prop === "priority") {
            let index
            allFilters.forEach((element: string) => {
                index = standartPriority.indexOf(element)
                if (index === -1) throw new InvalidInputError(`Некорректное значение query-параметра (priority): ${element}`)
            })
        } else if (prop === "status") {
            let index
            allFilters.forEach((element: string) => {
                index = standartStatus.indexOf(element)
                if (index === -1) throw new InvalidInputError(`Некорректное значение query-параметра (status): ${element}`)
            })
        }
        const newData = data.filter((element: any) => {
            return allFilters.some((item: string) => item == element[prop])
        })
        return newData
    } else {
        return data
    }
}