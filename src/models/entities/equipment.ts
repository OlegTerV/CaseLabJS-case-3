const {EquipmentType} = require("./equipment-type")
const {Status} = require("./status")

export interface Equipment{
    id: string //(uuid, генерируется сервером)
    siteId: string,
    name: string, //3–100 символов, обязательное
    type: typeof EquipmentType, //turbine | inverter | sensor | substation
    serialNumber: string,
    location: {
        lat: number,
        lon: number
    }, //уникальный в пределах системы
    status: typeof Status, //operational | maintenance | fault | decommissioned
    installedAt: string //ISO-дата, не в будущем
}


