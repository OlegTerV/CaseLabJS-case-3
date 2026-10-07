import type technician = require("../models/entities/technician")

const technicianStorage = require("./../storage/technician-storage")

module.exports.getTechnicianById = function (id: string) {
    return technicianStorage.find((it: technician.Technician) => it.id === id)
}