import winston = require("winston")

const levels = {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    const env = process.env.NODE_ENV || "dev"
    return env === "dev"? "debug" : "warning"
}

const colors = {
    error: "red",
    warning: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
}

winston.addColors(colors)

const consoleFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.printf((info) => {
        const { timestamp, level, message, requestId, ...meta } = info;
        const metaString = Object.values(meta).map((it) => {
            if (typeof it === "object" ) {
                return JSON.stringify(it)
            }
            return it
        }).join(", ")
        return `${timestamp} ${level}: ReqID:${requestId} ${message} ${metaString}`;
    })
)

const fileJsonFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.uncolorize(),
    winston.format.json()
)

const fileLogFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.uncolorize(),
    winston.format.printf((info) => {
        const { timestamp, level, message, requestId, ...meta } = info;
        const metaString = Object.values(meta).map((it) => {
            if (typeof it === "object" ) {
                return JSON.stringify(it)
            }
            return it
        }).join(", ")


        return `${timestamp} ${level}: ReqID:${requestId} ${message} ${metaString}`;
    })
)

let transport

if (process.env.NODE_ENV !== "dev") {
    transport = [
        new winston.transports.File({
            filename: "C:/Users/FamilyT/Desktop/Repo from GitHub/CaseLabJS-case-2/logs/warns-and-errors.json",
            level: "warning",
            format: fileJsonFormat
        })
    ]
} else {
    transport = [
        new winston.transports.Console({format: winston.format.combine(consoleFormat, winston.format.colorize({ all: true }))}),
        new winston.transports.File({
            filename: "C:/Users/FamilyT/Desktop/Repo from GitHub/CaseLabJS-case-2/logs/error.log",
            level: "error",
            format: fileLogFormat
        }),
        new winston.transports.File({
            filename: "C:/Users/FamilyT/Desktop/Repo from GitHub/CaseLabJS-case-2/logs/all_logs.log", 
            format: fileLogFormat
        })
    ]
}

const logger = winston.createLogger({
    level: level(),
    levels: levels,
    transports: transport
})

module.exports = logger