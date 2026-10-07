const RoleType = require("./role-type")

export interface RequestAssignees {
    id: string,
    technicianId: string,
    requestId: string,
    role: typeof RoleType,
    hours: number
}