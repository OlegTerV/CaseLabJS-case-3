const equipmentsData = require("./../storage/equipments-data")
const {InvalidInputError} = require("./../errors/custom-errors")
import type equipment = require("../models/entities/equipment");

module.exports.getAllElements = function (start: number, end: number, filterStatus: string, filterType: string, filterSerialNumber: string, filterInstalledAt: string) {
    let tempData = equipmentsData
    tempData = filterByProp(filterStatus, "status", tempData)
    tempData = filterByProp(filterType, "type", tempData)
    tempData = filterByProp(filterSerialNumber, "serialNumber", tempData)
    tempData = filterByProp(filterInstalledAt, "installedAt", tempData)
    
    const currentElements = tempData.slice(start, end)
    return currentElements
}

module.exports.getElementsCount = function (filterStatus: string, filterType: string, filterSerialNumber: string, filterInstalledAt: string) {
    let tempData = equipmentsData
    tempData = filterByProp(filterStatus, "status", tempData)
    tempData = filterByProp(filterType, "type", tempData)
    tempData = filterByProp(filterSerialNumber, "serialNumber", tempData)
    tempData = filterByProp(filterInstalledAt, "installedAt", tempData)
    
    return tempData.length
}

module.exports.getById = function (id: string) {
    let result
    equipmentsData.forEach((element: equipment.Equipment) => {
        if (element.id == id) {result = element}
    });
    return result
}

module.exports.getBySerialNumber = function (serialNumber: string) {
    const result = equipmentsData.find((element: any) => element.serialNumber === serialNumber)
    return result
}

module.exports.addItem = function (item: any) {
    equipmentsData.push(item)
}

module.exports.deleteItem = function (item: any) {
    const indexItem = equipmentsData.indexOf(item)
    if (indexItem !== -1) equipmentsData.splice(indexItem, 1)
}

function filterByProp(arrayOfFiltersByOneProp: string | undefined, prop: string, data: any) {
    const standartType = ["turbine", "inverter", "sensor", "substation"]
    const standartStatus = ["operational", "maintenance", "fault", "decommissioned"]

    if (arrayOfFiltersByOneProp) {            
        const allFilters = arrayOfFiltersByOneProp.split(",").map((element: string) => element.trim())
        if (prop === "type") {
            allFilters.forEach((element: string) => {
                const index = standartType.indexOf(element)
                if (index === -1) throw new InvalidInputError(`Некорректное значение query-параметра (type): ${element}`)
            }
        )} else if (prop === "status") {
            allFilters.forEach((element: any) => {
                const index = standartStatus.indexOf(element)
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