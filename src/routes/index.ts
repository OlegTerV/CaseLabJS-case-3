const {Router} = require("express")
const {healthCheck} = require("./../controllers/health-check.controller")
const equipment_Router = require("./equipment.routes")
const maintenanceRequest_Router = require("./maintenance-request.routes")
const router = Router()

router.use("/equipment", equipment_Router)
router.use("/requests", maintenanceRequest_Router)
router.use("/health", healthCheck)
module.exports = router

