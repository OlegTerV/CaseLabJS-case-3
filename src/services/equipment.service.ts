const {getAllElements, getById, getBySerialNumber, addItem, deleteItem, getElementsCount, getAllItemsWithoutPagination} = require("./../repository/equipment.repository")
const {getAllRequestsForEquipment, openRequestsForEquioment} = require("./../repository/maintenanceRequest.repository")
const {AppError, NotFoundError, ConflictError, InvalidInputError} = require("./../errors/custom-errors")
const {v4} = require("uuid")
const {getWeatherForCity} = require("./api-client")
const {getPoassportForEquipment} = require("./../repository/equipment-passport.repository")
const {getAllEntiresForRequest} = require("./../repository/requestAssigness.repository")

module.exports.getItemsList = function(queryParams: any) {
    const start = queryParams.limit * (queryParams.page - 1)
    const end = queryParams.limit * queryParams.page
    const filterStatus = queryParams.status
    const filterType = queryParams.type
    const filterSerialNumber = queryParams.serialNumber
    const filterInstalledAt = queryParams.installedAt
    const quipmentsCount = getElementsCount(filterStatus, filterType, filterSerialNumber, filterInstalledAt)
    if (start > quipmentsCount) throw new InvalidInputError(`Для limit = ${queryParams.limit} доступно максимум ${Math.ceil(quipmentsCount/queryParams.limit)} страниц`)

    const result = {
        equipments: getAllElements(start, end, filterStatus, filterType, filterSerialNumber, filterInstalledAt),
        page: queryParams.page,
        limit: queryParams.limit
    }
    return result
}

module.exports.getItemById = function(id: string) {
    const result = getById(id)
    if (result) return result
    else throw new NotFoundError(`id = ${id}`)
}

module.exports.createItem = function(itemData: any) {
    const userDate = new Date(itemData.installedAt)
    const dateNow = new Date()
    if (userDate > dateNow) throw new InvalidInputError(`Некорректная дата установки оборудования: ${userDate}`)
    const equipmentWithIdenticalSerialNumber = getBySerialNumber(itemData.serialNumber)
    if (equipmentWithIdenticalSerialNumber) throw new ConflictError(`Оборудование с сериныйм номером ${itemData.serialNumber} уже существует!`)

    const id = v4()
    const itemStore = {...itemData, id: id}
    addItem(itemStore)
    return itemStore
}

module.exports.updateItemData = function (itemData: any, itemId: string) {
    if (itemData.installedAt) {
        const userDate = new Date(itemData.installedAt)
        const dateNow = new Date()
        if (userDate > dateNow) throw new InvalidInputError(`Некорректная дата установки оборудования: ${userDate}`)
    }

    const currentItem = getById(itemId)
    if (!currentItem) throw new NotFoundError(`id = ${itemId}`)

    let equipmentWithIdenticalSerialNumber
    if (itemData.serialNumber) {
        if (currentItem.serialNumber != itemData.serialNumber) {
            equipmentWithIdenticalSerialNumber = getBySerialNumber(itemData.serialNumber)
        }
    }
    
    if (equipmentWithIdenticalSerialNumber) {
        throw new ConflictError(`Оборудование с серийым номером ${itemData.serialNumber} уже существует!`)
    }

    const newItem = {
        id: itemId,
        name: itemData.name || currentItem.name,
        type: itemData.type || currentItem.type,
        serialNumber: itemData.serialNumber || currentItem.serialNumber, //уникален
        location: itemData.location || currentItem.location,
        status: itemData.status || currentItem.status,
        installedAt: itemData.installedAt || currentItem.installedAt
    }
    
    deleteItem(currentItem)
    addItem(newItem)
    return newItem
}

module.exports.deleteItemData = function (itemId: string) {
    const currentItem = getById(itemId)
    if (!currentItem) throw new NotFoundError(`id = ${itemId}`)

    const requestsForEquipment = openRequestsForEquioment(itemId)
    if (requestsForEquipment.length !== 0) throw new ConflictError(`Оборудование с id = ${itemId} имеет незакрытые заявки, его удалить нельзя`)

    deleteItem(currentItem)
}

module.exports.getWeatherForescatForWindow = async function (itemId: string, countDays: number) {
    switch(true) {
        case (!(process.env.TEMPERATURE_2M_MIN)): throw new InvalidInputError("Переменная окружения - мнимальная температура - задана некорректно!")
        case (!(process.env.TEMPERATURE_2M_MAX)): throw new InvalidInputError("Переменная окружения - максимальная температура - задана некорректно!")
        case (!(process.env.PRECIPITATION_SUM)): throw new InvalidInputError("Переменная окружения - суммарное количество осадков - задана некорректно!")
        case (!(process.env.WIND_SPEED_10M_MAX)): throw new InvalidInputError("Переменная окружения - максимальная скорость ветра - задана некорректно!")
    }

    if (parseInt(process.env.TEMPERATURE_2M_MIN, 10) > parseInt(process.env.TEMPERATURE_2M_MAX, 10)) {
        throw new InvalidInputError("Минимальная температура должна быть не больше максимальной (переменные окружения)!")
    }

    if (parseInt(process.env.PRECIPITATION_SUM, 10) < 0) {
        throw new InvalidInputError("Переменная окружения - суммарное количество осадков - задана некорректно!")
    }

    if (parseInt(process.env.WIND_SPEED_10M_MAX, 10) < 0) {
        throw new InvalidInputError("Переменная окружения - максимальная скорость ветра - задана некорректно!")
    }

    let minTempBoundary = parseInt(process.env.TEMPERATURE_2M_MIN, 10)
    let maxTempBoundary = parseInt(process.env.TEMPERATURE_2M_MAX, 10)
    let precipitationBoundary = parseInt(process.env.PRECIPITATION_SUM, 10)
    let windSpeedBoundary = parseInt(process.env.WIND_SPEED_10M_MAX, 10)

    const item = getById(itemId)
    if (!item) throw new NotFoundError(`id = ${itemId}`)
    const coords = item.location
    let flagTemperature  = false, flagPrecipitation  = false, flagWindSpeed = false
    let indicator: string
    let weatherForecastAndIndicator
    try {
        const weatherForecast = await getWeatherForCity(coords, countDays)
        for (let i=0; i<countDays; i++){
            switch (true){
                case (weatherForecast.daily.temperature_2m_max[i] < minTempBoundary): flagTemperature = true
                case (weatherForecast.daily.temperature_2m_min[i] > maxTempBoundary): flagTemperature = true
                case (weatherForecast.daily.precipitation_sum[i] > precipitationBoundary): flagPrecipitation = true
                case (weatherForecast.daily.wind_speed_10m_max[i] > windSpeedBoundary): flagWindSpeed = true
            }
        }
        if (!(flagTemperature || flagPrecipitation || flagWindSpeed)) indicator = "Погода благоприятна для внешних работ"
        else indicator = "Погода не пригодня для внешних работ"
        weatherForecastAndIndicator = {
            ...weatherForecast.daily,
            indicator: indicator
        }
    } catch (error) {
        throw error
    }
    return weatherForecastAndIndicator
}

module.exports.getAllRequests = function (equipmnetId: string) {
    const currentEquipment = getById(equipmnetId)
    if (!currentEquipment) throw new NotFoundError(`id = ${equipmnetId}`)

    const allRequests = getAllRequestsForEquipment(equipmnetId)
    return allRequests
}

module.exports.getEquipmentLoadFromStorage = function () {
    const allEquipments = getAllItemsWithoutPagination()
    const result = []
    for (const equipemnt of allEquipments) {
        const passport = getPoassportForEquipment(equipemnt.id)
        const allReqs = getAllRequestsForEquipment(equipemnt.id)
        let hoursCount = 0
        for (const req of allReqs) {
            let hoursMax = -1
            const allAgreesForRequest = getAllEntiresForRequest(req.id)
            console.log(allAgreesForRequest)
            for (const agree of allAgreesForRequest) {
                if (parseInt(agree.hours, 10) > hoursMax) hoursMax = agree.hours
            }
            hoursCount += hoursMax
        }
        result.push({
            "Название": equipemnt.name,
            "Номинальная мощность": passport.ratedPower,
            "Нагрузка на оборудование (часы * ном.мощ.)": hoursCount * parseInt(passport.ratedPower, 10)
        })
    }

    return result
}