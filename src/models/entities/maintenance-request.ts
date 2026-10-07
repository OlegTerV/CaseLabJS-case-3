const priority = require("./priority")
const status = require("./status")
const {v4} = require("uuid")

export interface MaintenanceRequest{
    id: string  // (uuid, генерируется сервером)
    equipmentId: string // ссылка на существующее оборудование
    title: string // 5–120 символов, обязательное
    description: string // до 2000 символов
    priority: typeof priority
    status: typeof status  //(по умолчанию new)
    plannedAt?: string  // ISO-дата-время, необязательное
    authorId: string,
    createdAt: string // ISO-дата-время (проставляется сервером)
    updatedAt: string // ISO-дата-время (проставляется сервером)
}