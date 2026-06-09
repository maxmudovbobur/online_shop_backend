const express = require("express")
const cont = express.Router()
const contactController = require("../controllers/contactController")

/**
 * @swagger
 * tags: 
 *   name: Contact
 *   description: Contact Management
 */

/**
 * @swagger
 * /cont/create:
 *  post:
 *     tags: [Contact]
 *     summary: Create a new contact
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
 *               phone: 
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created        
 *       400:
 *         description: Invalid Input
 *       500: 
 *         description: Server error
 */
 cont.post("/create", contactController.createContact)


 
/**
 * @swagger
 * /cont/getContact:
 *  get:
 *    tags: [Contact]
 *    summary: Barcha contaktlarni olish
 *    description: Barcha contaktlar ro'yxatini olish
 *    responses:
 *      200:
 *       description: Contaktlar ro'yxati muvaffaqiyatli qaytarildi
 *      500:
 *       description: Ichki server xatosi
 */
cont.get("/getContact", contactController.getContact)



/**
 * @swagger
 * /cont/getContactById/{id}:
 *  get:
 *    tags: [Contact]
 *    summary: Contaktlarni ID bo‘yicha olish
 *    description: Contaktlarni ID orqali olish uchun endpoint
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Contaktlarni olish uchun ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Contaktlar muvaffaqiyatli qaytarildi
 *      500:
 *        description: Ichki server xatosi
 */
cont.get("/getContactById/:id", contactController.getContactById);

/**
 * @swagger
 * /cont/deleteContact/{id}:
 *  delete:
 *    tags: [Contact] 
 *    summary: Delete a contact by ID
 *    description: Delete a contact with the provided ID  
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: ID of contact to delete
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *       description: Contact deleted successfully
 *      500: 
 *       description: Internal server error
 */
cont.delete("/deleteContact/:id", contactController.deleteContact)


/**
 * @swagger
 * /cont/updateContact/{id}:
 *  put:
 *    tags: [Contact]
 *    summary: Contactni yangilash (name, email, phone, message)
 *    description: Mijoz ma'lumotlarini yangilash (name, email, phone, message)
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Contaktlarni olish uchun ID 
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
 *              phone: 
 *                type: string
 *              message:
 *                type: string
 *    responses:
 *      200:
 *       description: Contaktlar muvaffaqiyatli qaytarildi
 *      404: 
 *       description: Contact not found
 *      500: 
 *       description: Ichki server xatosi
 */
cont.put("/updateContact/:id", contactController.updateContact)


/**
 * @swagger
 * /cont/searchContact:
 *   get:
 *     tags: [Contact]
 *     summary: Contaktlarni qidirish
 *     description: Contactlarni ismi yoki emaili bo‘yicha qidirish
 *     parameters: 
 *       - in: query
 *         name: query
 *         description: Qidiruv so‘rovi contaktlarni izlash
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       400: 
 *         description: Contaktlar topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
cont.get("/searchContact", contactController.searchContact);
  module.exports = cont