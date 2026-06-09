const express = require("express")
const order = express.Router()
const orderController = require("../controllers/orderController")

/**
 * @swagger
 * tags: 
 *   name: Order
 *   description: Order Management
 */

/**
 * @swagger
 * /order/create:
 *  post:
 *     tags: [Order]
 *     summary: Create a new order
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object     
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone: 
 *                 type: string
 *               customerAddress: 
 *                 type: string
 *               items:
 *                 type: string
 *               total: 
 *                 type: number
 *               paymentMethod: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created        
 *       400:
 *         description: Invalid Input
 *       500: 
 *         description: Server error
 */
 order.post("/create", orderController.createOrder)


 
/**
 * @swagger
 * /order/getOrder:
 *  get:
 *    tags: [Order]
 *    summary: Barcha mijozlarni olish
 *    description: Barcha mijozlar ro'yxatini olish
 *    responses:
 *      200:
 *       description: Mijozlar ro'yxati muvaffaqiyatli qaytarildi
 *      500:
 *       description: Ichki server xatosi
 */
order.get("/getOrder", orderController.getOrder)



/**
 * @swagger
 * /order/getOrderById/{id}:
 *  get:
 *    tags: [Order]
 *    summary: Mijozlarni ID bo‘yicha olish
 *    description: Mijozlarni ID orqali olish uchun endpoint
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Mijozlarni olish uchun ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Mijozlar muvaffaqiyatli qaytarildi
 *      500:
 *        description: Ichki server xatosi
 */
order.get("/getOrderById/:id", orderController.getOrderById);

/**
 * @swagger
 * /order/deleteOrder/{id}:
 *  delete:
 *    tags: [Order] 
 *    summary: Delete a order by ID
 *    description: Delete a order with the provided ID  
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: ID of order to delete
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *       description: Order deleted successfully
 *      500: 
 *       description: Internal server error
 */
order.delete("/deleteOrder/:id", orderController.deleteOrder)


/**
 * @swagger
 * /order/updateOrder/{id}:
 *  put:
 *    tags: [Order]
 *    summary: Mijozlarni yangilash (customerName, customerPhone, customerAddress, items, total, paymentMethod)
 *    description: Mijoz ma'lumotlarini yangilash (customerName, customerPhone, customerAddress, items, total, paymentMethod)
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Mijozlarni olish uchun ID 
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
 *              customerName: 
 *                type: string
 *              customerPhone: 
 *                type: string
 *              customerAddress: 
 *                type: string
 *              items:
 *                type: string
 *              total: 
 *                type: number
 *              paymentMethod: 
 *                type: string
 *    responses:
 *      200:
 *       description: Mijozlar muvaffaqiyatli qaytarildi
 *      404: 
 *       description: Order not found
 *      500: 
 *       description: Ichki server xatosi
 */
order.put("/updateOrder/:id", orderController.updateOrder)


/**
 * @swagger
 * /order/searchOrder:
 *   get:
 *     tags: [Order]
 *     summary: Mijozlarni qidirish
 *     description: Mijozlarni ismi yoki manzili bo‘yicha qidirish
 *     parameters: 
 *       - in: query
 *         name: query
 *         description: Qidiruv so‘rovi mijozlarni izlash
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       400: 
 *         description: Mijozlar topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
order.get("/searchOrder", orderController.searchOrder);
  module.exports = order