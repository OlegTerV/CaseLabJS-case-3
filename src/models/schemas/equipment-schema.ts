const {z} = require("zod")

const locationSchema = z.strictObject({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180)
})

const bodySchema_post = z.strictObject({
    name: z.string().min(3).max(100),
    type: z.enum(["turbine", "inverter", "sensor", "substation"]),
    serialNumber: z.string(),
    location: locationSchema,
    status: z.enum(["operational", "maintenance", "fault", "decommissioned"]),
    installedAt: z.string().datetime()
})

const paramsSchema = z.strictObject({
    equipmentId: z.string().guid().optional(),
})

const querySchema_get = z.strictObject({
    //status: z.enum(["operational", "maintenance", "fault", "decommissioned"]).optional(),
    //type: z.enum(["turbine", "inverter", "sensor", "substation"]).optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    serialNumber: z.string().optional(),
    installedAt: z.string().optional(),
    sort: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(15),
    daysCount: z.coerce.number().int().min(1).max(100).default(1)
})

const bodySchema_patch = bodySchema_post.partial()

const getEquipmentSchema = {
    params: paramsSchema.optional(),
    query: querySchema_get.optional(),
    body: z.object({}).strict().optional() 
}

const postEquipmentSchema = {
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: bodySchema_post
}

const deleteEquipmentSchema = {
    params: paramsSchema,
    query: z.object({}).strict(),
    body: z.object({}).strict().optional() 
}

const patchEquipmentSchema = {
    params: paramsSchema.optional(),
    query: z.object({}).strict(),
    body: bodySchema_patch
}

module.exports = {
    getEquipmentSchema, 
    postEquipmentSchema, 
    deleteEquipmentSchema, 
    patchEquipmentSchema
}