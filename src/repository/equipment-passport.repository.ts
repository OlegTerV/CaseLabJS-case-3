import type {EquipmentPassport} from "../models/entities/equipment-pasport"

const equipmentPassportsStorage = require("./../storage/equipments-passport-storage")

module.exports.getPoassportForEquipment = function (equipId: string){
    return equipmentPassportsStorage.find((it: EquipmentPassport) => it.id === equipId)
}