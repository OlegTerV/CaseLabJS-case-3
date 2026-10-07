const {Router} = require("express")
const {healthCheck} = require("./../controllers/health-check.controller")
const equipment_Router = require("./equipment.routes")
const maintenanceRequest_Router = require("./maintenance-request.routes")
const router = Router()
const {validation} = require("./../middlewares/validator")
const {getSiteInfo} = require("./../models/schemas/site-schema")
const {getEquipmentLoad} = require("./../models/schemas/equipment-schema")
const {getSiteInfoAboutRequests} = require("./../controllers/site.controller")
const {getEquipmentLoadInfo} = require("./../controllers/equipment.controller")

router.use("/equipment", equipment_Router)
router.use("/requests", maintenanceRequest_Router)
router.use("/health", healthCheck)
router.use("/sites/:siteId/summary", validation(getSiteInfo), getSiteInfoAboutRequests)
router.use("/reports/equipment-load", validation(getEquipmentLoad), getEquipmentLoadInfo)

module.exports = router