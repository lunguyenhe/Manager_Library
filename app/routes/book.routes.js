module.exports = app => {
    const books = require("../controllers/book.controller");
  
    var router = require("express").Router();

/**
 * @swagger
 * definitions:
 *   Book:
 *     type: object
 *     required:
 *       - title
 *       - author_id
 *       - publishingyear
 *       - price
 *       - genres_id
 *     properties:
 *       title:
 *         type: string
 *         description: Title of the Book
 *         example: Harry Potter series I
 *       author_id:
 *         type: integer
 *         description: Author ID of the Book
 *         example: 1
 *       publishingyear:
 *         type: integer
 *         description: Publishing year of the Book
 *         example: 1988
 *       price:
 *         type: number
 *         format: double
 *         description: Price of the Book
 *         example: 200.00
 *       genres_id:
 *         type: integer
 *         description: Genres ID of the Book
 *         example: 1
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a single Book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: Author data
 *         schema:
 *           $ref: '#/definitions/Author'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new Book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Book'
 *     responses:
 *       201:
 *         description: The created Book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /api/books/listAll:
 *   get:
 *     summary: Retrieve a list of Books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of Books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 *       500:
 *         description: Some server error
 */


router.post("/", books.create);
router.put("/", books.update);
router.get("/listAll", books.findAll);
router.get("/:id", books.findOne);
router.delete("/:id", books.delete);

app.use('/api/books', router);
}