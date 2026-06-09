const express = require("express")
const server = express.Router()
const servicesController = require("../controllers/servicesController")

/**
 * @swagger
 * tags: 
 *   name: Services
 *   description: Services Management
 */

/**
 * @swagger
 * /server/create:
 *  post:
 *     tags: [Services]
 *     summary: Create a new services
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object     
 *             properties:
 *               icon:
 *                 type: string
 *               title: 
 *                 type: string
 *               description: 
 *                 type: string
 *               features:
 *                 type: string
 *     responses:
 *       201:
 *         description: Services created        
 *       400:
 *         description: Invalid Input
 *       500: 
 *         description: Server error
 */
 server.post("/create", servicesController.createServices)


 
/**
 * @swagger
 * /server/getServices:
 *  get:
 *    tags: [Services]
 *    summary: Barcha servislarni olish
 *    description: Barcha servislar ro'yxatini olish
 *    responses:
 *      200:
 *       description: Servislar ro'yxati muvaffaqiyatli qaytarildi
 *      500:
 *       description: Ichki server xatosi
 */
server.get("/getServices", servicesController.getServices)



/**
 * @swagger
 * /server/getServicesById/{id}:
 *  get:
 *    tags: [Services]
 *    summary: Servislarni ID bo‘yicha olish
 *    description: Servislarni ID orqali olish uchun endpoint
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Servislarni olish uchun ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Servislar muvaffaqiyatli qaytarildi
 *      500:
 *        description: Ichki server xatosi
 */
server.get("/getServicesById/:id", servicesController.getServices);

/**
 * @swagger
 * /server/deleteServices/{id}:
 *  delete:
 *    tags: [Services] 
 *    summary: Delete a services by ID
 *    description: Delete a services with the provided ID  
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: ID of services to delete
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *       description: Services deleted successfully
 *      500: 
 *       description: Internal server error
 */
server.delete("/deleteServices/:id", servicesController.deleteServices)


/**
 * @swagger
 * /server/updateServices/{id}:
 *  put:
 *    tags: [Services]
 *    summary: Servislarni yangilash (title, description, features)
 *    description: Cart ma'lumotlarini yangilash (title, description, features)
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Servislarni olish uchun ID 
 *        required: true
 *        schema: 
 *          type: string
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title: 
 *                type: string
 *              description: 
 *                type: string
 *              features: 
 *                type: string
 *    responses:
 *      200:
 *       description: Servislar muvaffaqiyatli qaytarildi
 *      404: 
 *       description: Sercices not found
 *      500: 
 *       description: Ichki server xatosi
 */
server.put("/updateServices/:id", servicesController.updateServices)


/**
 * @swagger
 * /server/searchServices:
 *   get:
 *     tags: [Services]
 *     summary: Servislarni qidirish
 *     description: Servislarni title yoki description bo‘yicha qidirish
 *     parameters: 
 *       - in: query
 *         name: query
 *         description: Qidiruv so‘rovi Servislarni izlash
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       400: 
 *         description: Servislar topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
server.get("/searchServices", servicesController.searchServices);
  module.exports = server