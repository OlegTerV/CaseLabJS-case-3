require("dotenv").config({path: "src/.env"})
const app = require("./app")
const logger = require("./middlewares/logger")
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    logger.info(`Сервер запущен на порту ${PORT}`)
})