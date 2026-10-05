import type e = require("express")
const express = require("express")
const app = express()
const {securityHeaders} = require("./middlewares/security-middleware")
const {errorHandler} = require("./middlewares/errorHandler-middleware")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const {NotFoundError, TooManyRequestsError} = require("./errors/custom-errors")
const logger = require("./middlewares/logger")
const {setRequestId} = require("./middlewares/set-request-id")
const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(",")
const apiRoute = require("./routes/index")
const API_VERSION = parseInt(process.env.API_VERSION || "1", 10)
if (!API_VERSION) logger.warn("Переменная окружения API_VERSION задана некорректно")

const limitter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "", 10) || 15* 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || "", 10) || 100,
    handler: (req: e.Request, res: e.Response, next: e.NextFunction) => {
        next(new TooManyRequestsError())
    }
})

app.use(securityHeaders)
app.use(cors({
    origin: (
        origin: string | undefined, 
        callback: (err: Error | null, allow?: boolean) => void) => 
        {
        if (!origin) return callback(null, true)

        if (allowedOrigins?.includes(origin)) return callback(null, true)
            else return callback(new Error("Not allowed by CORS"))
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))
app.use(limitter)
app.use(express.json({limit: "100kb"}))
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(setRequestId)
app.use(`/api/v${API_VERSION}`, apiRoute)


app.use((req: e.Request, res: e.Response, next: e.NextFunction) => {
    next(new NotFoundError("Эндпоинт"))
})
app.use(errorHandler)

module.exports = app