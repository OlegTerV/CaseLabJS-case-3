const {z} = require("zod")

const params = z.strictObject({
    siteId: z.string().guid()
})

const getSiteInfo = {
    params: params,
    query: z.object({}).strict(),
    body: z.object({}).strict().optional()
}

module.exports = {getSiteInfo}