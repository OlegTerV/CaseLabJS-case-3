const {InvalidInputError, RequestTimedOut, AppError} = require("./../errors/custom-errors")

module.exports.getWeatherForCity = async function (data_coords, countDays = 1){
    if (!(parseInt(process.env.TIMEOUT, 10))) {
        throw new InvalidInputError("Переменная окружения TIMEOUT задана некорректно")
    }
    let getWeatherURL

    try {
    getWeatherURL = process.env.WEATHER_URL
        .replace("{lat}", data_coords.lat)
        .replace("{lon}", data_coords.lon)
        .replace("{n}", countDays)
    } catch (error) {
        throw new InvalidInputError("Переменная окружения WEATHER_URL задана некорректно")
    }

    data_weather = await doFetchAndGetJson(getWeatherURL)

    return data_weather
}

async function doFetchAndGetJson(url){
    const controller = new AbortController()
    const signal = controller.signal
    let response

    const timerId = setTimeout(() => controller.abort(), parseInt(process.env.TIMEOUT, 10) || 5000)
    try {
        response = await fetch(url, {signal})
    } catch (error) {
        switch (error.name) {
            case "AbortError": throw new RequestTimedOut()
            case "TypeError": throw new AppError("Запрос не смог выполниться при обращении к внешнему API на сетевом уровне!")
            default: throw new AppError("Какая-то ошибка при обращении к внешнему API...!")
        }
    } 
    finally{
        clearTimeout(timerId)
    }

    if (!response.ok) {
        if ((response.status > 399) && (response.status < 500)) {
            //по идее, такая ситуация просто невозможна, так как есть валидация параметров
            throw new AppError("Клиентская ошибка при обращении к внешнему API!")
        } else if ((response.status > 499) && (response.status < 600)) {
            throw new AppError("Серверная ошибка при обращении к внешнему API!")
        } else {
            throw new AppError(`Ошибка HTTP запроса при обращении в нешнему API. Статус: ${response.status}.`)
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        throw new AppError("Внешнее API прислало битый JSON!")
    }

    return data
}