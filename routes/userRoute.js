const express = require("express")
const root = express.Router()
const userController = require("../controllers/userController")

/**
 * @swagger
 * tags: 
 *   name: User
 *   description: User Management
 */

/**
 * @swagger
 * /root/create:
 *  post:
 *     tags: [User]
 *     summary: Create a new user
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object     
 *             properties:
 *               name:
 *                 type: string
 *               email: 
 *                 type: string
 *               password: 
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created        
 *       400:
 *         description: Invalid Input
 *       500: 
 *         description: Server error
 */
 root.post("/create", userController.createUser)

 /**
 * @swagger
 * /root/signin:
 *   post:
 *     tags: [User]
 *     summary: User Sign In
 *     description: Login user with email and password, returns JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
 root.post("/signin", userController.signIn)


/**
 * @swagger
 * /root/getUser:
 *  get:
 *    tags: [User]
 *    summary: Barcha foydalanuvchilarni olish 
 *    description: Barcha foydalanuvchilarni ro'yxatini olish
 *    responses: 
 *      200: 
 *        description: Foydalanuvchilar ro'yxati muvaffaqiyatli qaytarildi 
 *      500:
 *        description: Ichki server xatosi
 */
root.get("/getUser", userController.getUser)


/**
 * @swagger
 * /root/getUserById/{id}:
 *  get:
 *    tags: [User]
 *    summary: Foydalanuvchilarni ID bo'yicha olish
 *    description: Foydalanuvchini ID orqali olish uchun endpoint
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Foydalanuvchini olish uchun ID
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: Foydalanuvchi muvaffaqiyatli qaytarildi
 *      500: 
 *        description: Ichki server xatosi
 */
root.get("/getUserById/:id", userController.getUserById)


/**
 * @swagger
 * /root/deleteUser/{id}:
 *  delete:
 *    tags: [User]
 *    summary: Delete a user by ID
 *    description: Delete a user with the provided ID
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: ID of user to delete
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200: 
 *        description: User deleted successfully
 *      500:
 *        description: Internal server error
 */
root.delete("/deleteUser/:id", userController.deleteUser)


/**
 * @swagger
 * /root/updateUser/{id}:
 *  put:
 *    tags: [User]
 *    summary: Foydalanuvchilarni yangilash (name, email, password)
 *    description: Foydalanuvchi ma'lumotlarini yangilash (name, email, password)
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Foydalanuvchilarni olish uchun ID 
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
 *              name: 
 *                type: string
 *              email: 
 *                type: string
 *              password: 
 *                type: string
 *              phone:
 *                type: string
 *    responses:
 *      200: 
 *        description: Foydalanuvchi muvaffaqiyatli qaytarildi
 *      404:
 *        description: User not found
 *      500:
 *        description: Ichki server xatosi
 */
root.put("/updateUser/:id", userController.updateUser)


/**
 * @swagger
 * /root/searchUser:
 *  get:
 *    tags: [User]
 *    summary: Foydalanuvchilarni qidirish
 *    description: Foydalanuvchilarni ism yoki email bo'yicha qidirish
 *    parameters: 
 *      - in: query
 *        name: query
 *        description: Qidiruv so'rovi foydalanuvchini izlash
 *        required: true
 *        schema:
 *          type: string
 *    responses: 
 *      200: 
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      404: 
 *        description: Foydalanuvchi topilmadi
 *      500:
 *        description: Ichki server xatosi
 */
root.get("/searchUser", userController.searchUser)
 module.exports = root