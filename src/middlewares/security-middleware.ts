import type e = require("express")
import type nodeHttp = require("node:http")

const express = require("express")
const app = express()
const logger = require("./logger")

module.exports.securityHeaders = function (req: e.Request, res: e.Response & nodeHttp.ServerResponse, next: e.NextFunction) {
    res.removeHeader("X-Powered-By")
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
    )
    res.setHeader("X-Frame-Options", "DENY")
    res.setHeader("X-Content-Type-Options", "nosniff")

    /*
    res.setHeader(
        "Strict-Transport-Security",
        "max-age=3600; includeSubDomains; preload"
    )*/

    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin")

    res.setHeader(
        "Permissions-Policy",
        "geolocation=(), camera=(), microphone=()"
    )

    next()
}
