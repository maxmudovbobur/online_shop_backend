const express = require("express")
const cate = express.Router()
const categoryController = require("../controllers/categoryController")

/**
 * @swagger
 * tags: 
 *   name: Category
 *   description: Category Management
 */

/**
 * @swagger
 * /cate/create:
 *  post:
 *     tags: [Category]
 *     summary: Create a new category
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object     
 *             properties:
 *               name:
 *                 type: string
 *               icon: 
 *                 type: string
 *               count:
 *                 type: number
 *               description: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created        
 *       400:
 *         description: Invalid Input
 *       500: 
 *         description: Server error
 */
 cate.post("/create", categoryController.createCategory)


 
/**
 * @swagger
 * /cate/getCategory:
 *  get:
 *    tags: [Category]
 *    summary: Barcha categoriyalarni olish
 *    description: Barcha categoriyalar ro'yxatini olish
 *    responses:
 *      200:
 *       description: Categoriya ro'yxati muvaffaqiyatli qaytarildi
 *      500:
 *       description: Ichki server xatosi
 */
cate.get("/getCategory", categoryController.getCategory)



/**
 * @swagger
 * /cate/getCategoryById/{id}:
 *  get:
 *    tags: [Category]
 *    summary: Categoriyalarni ID bo‘yicha olish
 *    description: Categoriyalarni ID orqali olish uchun endpoint
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Categoriyalarni olish uchun ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Categoriyalar muvaffaqiyatli qaytarildi
 *      500:
 *        description: Ichki server xatosi
 */
cate.get("/getCategoryById/:id", categoryController.getCategory);

/**
 * @swagger
 * /cate/deleteCategory/{id}:
 *  delete:
 *    tags: [Category] 
 *    summary: Delete a category by ID
 *    description: Delete a category with the provided ID  
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: ID of category to delete
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *       description: Category deleted successfully
 *      500: 
 *       description: Internal server error
 */
cate.delete("/deleteCategory/:id", categoryController.deleteCategory)


/**
 * @swagger
 * /cate/updateCategory/{id}:
 *  put:
 *    tags: [Category]
 *    summary: Categoriyani yangilash (name, icon)
 *    description: Categoriya ma'lumotlarini yangilash (name, icon)
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Categoriyalarni olish uchun ID 
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
 *              icon: 
 *                type: string
 *              count:
 *                type: number
 *              description: 
 *                type: string
 *    responses:
 *      200:
 *       description: Categoriyalar muvaffaqiyatli qaytarildi
 *      404: 
 *       description: Categoriya not found
 *      500: 
 *       description: Ichki server xatosi
 */
cate.put("/updateCategory/:id", categoryController.updateCategory)


/**
 * @swagger
 * /cate/searchCategory:
 *   get:
 *     tags: [Category]
 *     summary: Categoriyalarni qidirish
 *     description: Categoriyalarni ismi yoki iconi bo‘yicha qidirish
 *     parameters: 
 *       - in: query
 *         name: query
 *         description: Qidiruv so‘rovi categoriyani izlash
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       400: 
 *         description: Categoriya topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
cate.get("/searchCategory", categoryController.searchCategory);
  module.exports = cate