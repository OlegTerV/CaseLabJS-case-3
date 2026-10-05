const morgan = require("morgan")
import type m = require("morgan")
const logger = require("./logger")

const stream: m.StreamOptions = {
    write: (message) => logger.http(message)
}

const skip = () =>{
    const env = process.env.NODE_ENV || "dev"
    return env !== "dev"
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {stream, skip}
)

module.exports = morganMiddleware