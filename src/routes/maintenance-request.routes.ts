const {Router} = require("express")
const router = Router()
const {validation} = require("./../middlewares/validator")
const {
    getMaintenanceRequestSchema, 
    postMaintenanceRequestSchema, 
    deleteMaintenanceRequestSchema, 
    patchMaintenanceRequestSchema,
    patchMaintenanceRequestStatusSchema,
    postMaintenanceRequestSchema_assignees,
    deleteMaintenanceRequestSchema_assignees
} = require("./../models/schemas/maintenance-request")
const {
    getAll, 
    getOneById, 
    createNewRequest, 
    editFieldsRequest, 
    editRequestStatus, 
    deleteRequest, 
    postAssignees, 
    deleteAssignee,
    getHistoryForRequest
} = require("./../controllers/maintenance-request.controller")

router.get("/", validation(getMaintenanceRequestSchema), getAll)
router.get("/:requestId", validation(getMaintenanceRequestSchema), getOneById)
router.post("/", validation(postMaintenanceRequestSchema), createNewRequest)
router.patch("/:requestId", validation(patchMaintenanceRequestSchema), editFieldsRequest)
router.patch("/:requestId/status", validation(patchMaintenanceRequestStatusSchema), editRequestStatus)
router.delete("/:requestId", validation(deleteMaintenanceRequestSchema), deleteRequest)
/*---------------------*/
router.post("/:requestId/assignees", validation(postMaintenanceRequestSchema_assignees), postAssignees)
router.delete("/:requestId/assignees/:technicianId", validation(deleteMaintenanceRequestSchema_assignees), deleteAssignee)
router.get("/:requestId/history", validation(getMaintenanceRequestSchema), getHistoryForRequest)

module.exports = router