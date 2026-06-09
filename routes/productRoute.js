const express = require("express")
const pro = express.Router()
const productController = require("../controllers/productController")

/**
 * @swagger
 * tags: 
 *   name: Product
 *   description: Product Management
 */

/**
 * @swagger
 * /pro/create:
 *  post:
 *     tags: [Product]
 *     summary: Create a new product
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object     
 *             properties:
 *               name:
 *                 type: string
 *               price: 
 *                 type: number
 *               image: 
 *                 type: string
 *               category:
 *                 type: string
 *               unit: 
 *                 type: string
 *     responses:
 *       201:
 *         description: User created        
 *       400:
 *         description: Invalid Input
 *       500: 
 *         description: Server error
 */
 pro.post("/create", productController.createProduct)


 
/**
 * @swagger
 * /pro/getProduct:
 *  get:
 *    tags: [Product]
 *    summary: Barcha maxsulotlarni olish
 *    description: Barcha maxsulotlar ro'yxatini olish
 *    responses:
 *      200:
 *       description: Maxsulotlar ro'yxati muvaffaqiyatli qaytarildi
 *      500:
 *       description: Ichki server xatosi
 */
pro.get("/getProduct", productController.getProduct)



/**
 * @swagger
 * /pro/getProductById/{id}:
 *  get:
 *    tags: [Product]
 *    summary: Maxsulotlarni ID bo‘yicha olish
 *    description: Maxsulotlarni ID orqali olish uchun endpoint
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Maxsulotlarni olish uchun ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Maxsulotlar muvaffaqiyatli qaytarildi
 *      500:
 *        description: Ichki server xatosi
 */
pro.get("/getProductById/:id", productController.getProductById);

/**
 * @swagger
 * /pro/deleteProduct/{id}:
 *  delete:
 *    tags: [Product] 
 *    summary: Delete a product by ID
 *    description: Delete a product with the provided ID  
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: ID of product to delete
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *       description: Product deleted successfully
 *      500: 
 *       description: Internal server error
 */
pro.delete("/deleteProduct/:id", productController.deleteProduct)


/**
 * @swagger
 * /pro/updateProduct/{id}:
 *  put:
 *    tags: [Product]
 *    summary: Foydalanuvchilarni yangilash (name, price, image, category, unit)
 *    description: Foydalanuvchi ma'lumotlarini yangilash (name, price, image, category, unit)
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: Maxsulotlarni olish uchun ID 
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
 *              price: 
 *                type: string
 *              image: 
 *                type: string
 *              category:
 *                type: string
 *              unit: 
 *                type: string
 *    responses:
 *      200:
 *       description: Maxsulotlar muvaffaqiyatli qaytarildi
 *      404: 
 *       description: Product not found
 *      500: 
 *       description: Ichki server xatosi
 */
pro.put("/updateProduct/:id", productController.updateProduct)


/**
 * @swagger
 * /pro/searchProduct:
 *   get:
 *     tags: [Product]
 *     summary: Maxsulotlarni qidirish
 *     description: Maxsulotlarni nomi yoki narxi bo‘yicha qidirish
 *     parameters: 
 *       - in: query
 *         name: query
 *         description: Qidiruv so‘rovi maxsulotni izlash
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       400: 
 *         description: Maxsulot topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
pro.get("/searchProduct", productController.searchProduct);
  module.exports = pro