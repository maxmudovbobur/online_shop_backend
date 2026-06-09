const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0"
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerSpes = swaggerJsDoc(options)

const setUpSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpes))
}
module.exports = setUpSwagger