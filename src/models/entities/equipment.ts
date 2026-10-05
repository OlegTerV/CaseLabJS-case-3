const {EquipmentType} = require("./equipment-type")
const {Status} = require("./status")

interface Equipment{
    id: string //(uuid, генерируется сервером)
    name: string, //3–100 символов, обязательное
    type: typeof EquipmentType, //turbine | inverter | sensor | substation
    serialNumber: string, //уникальный в пределах системы
    location: {
        lat: number,
        lon: number
    }, //{ lat: number, lon: number }
    status: typeof Status, //operational | maintenance | fault | decommissioned
    installedAt: string //ISO-дата, не в будущем
}

export type {Equipment}

