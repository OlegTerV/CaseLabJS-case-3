const {z} = require("zod")

const bodySchema_post = z.strictObject({
    equipmentId: z.string(),
    title: z.string().min(5).max(120),
    description: z.string().max(2000),
    priority: z.enum(["low", "medium", "high", "critical"]),
    status: z.enum(["new", "in_progress", "done", "rejected"]).default("new"),
    plannedAt: z.string().datetime().optional()
})

const bodySchema_patch = z.strictObject({
    equipmentId: z.string().optional(),
    title: z.string().min(5).max(120).optional(),
    description: z.string().max(2000).optional(),
    priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    plannedAt: z.string().datetime().optional()
})

const paramsSchema = z.strictObject({
    requestId: z.string().guid().optional()
})

const querySchema_get = z.strictObject({
    //status: z.enum(["new", "in_progress", "done", "rejected"]).optional(),
    //priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    equipmentId: z.string().optional(),
    plannedAt: z.string().optional(),
    sort: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(15),
})

const getMaintenanceRequestSchema = {
    params: paramsSchema.optional(),
    query: querySchema_get.optional(),
    body: z.object({}).strict().optional() 
}

const postMaintenanceRequestSchema = {
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: bodySchema_post
}

const deleteMaintenanceRequestSchema = {
    params: paramsSchema,
    query: z.object({}).strict(),
    body: z.object({}).strict().optional() 
}

const patchMaintenanceRequestSchema = {
    params: paramsSchema,
    query: z.object({}).strict(),
    body: bodySchema_patch
}

const patchMaintenanceRequestStatusSchema = {
    params: paramsSchema,
    query: z.object({}).strict(),
    body: z.strictObject({
        status: z.enum(["new", "in_progress", "done", "rejected"]),
    })
}


module.exports = {
    getMaintenanceRequestSchema, 
    postMaintenanceRequestSchema, 
    deleteMaintenanceRequestSchema, 
    patchMaintenanceRequestSchema,
    patchMaintenanceRequestStatusSchema
}