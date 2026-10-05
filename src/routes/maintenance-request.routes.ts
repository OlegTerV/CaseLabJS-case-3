const {Router} = require("express")
const router = Router()
const {validation} = require("./../middlewares/validator")
const {
    getMaintenanceRequestSchema, 
    postMaintenanceRequestSchema, 
    deleteMaintenanceRequestSchema, 
    patchMaintenanceRequestSchema,
    patchMaintenanceRequestStatusSchema
} = require("./../models/schemas/maintenance-request")
const {getAll, getOneById, createNewRequest, editFieldsRequest, editRequestStatus, deleteRequest} = require("./../controllers/maintenance-request.controller")

router.get("/", validation(getMaintenanceRequestSchema), getAll)
router.get("/:requestId", validation(getMaintenanceRequestSchema), getOneById)
router.post("/", validation(postMaintenanceRequestSchema), createNewRequest)
router.patch("/:requestId", validation(patchMaintenanceRequestSchema), editFieldsRequest)
router.patch("/:requestId/status", validation(patchMaintenanceRequestStatusSchema), editRequestStatus)
router.delete("/:requestId", validation(deleteMaintenanceRequestSchema), deleteRequest)

module.exports = router