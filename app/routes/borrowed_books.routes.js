module.exports = (app) => {
  const borrowed_books = require("../controllers/borrowed_books.controller");
  const moment = require('moment')
  var router = require("express").Router();

 /**
 * @swagger
 * definitions:
 *   BorrowedBook:
 *     type: object
 *     required:
 *       - book_id
 *       - student_id
 *       - employee_id
 *       - borrowed_date
 *       - expected_return_date
 *     properties:
 *       book_id:
 *         type: integer
 *         description: Bookid of the Borrowed
 *         example: 1
 *       student_id:
 *         type: integer
 *         description: StudentId of the Borrowed
 *         example: 1
 *       employee_id:
 *         type: string
 *         description: employee_id of the Borrowed
 *         example: 1
 *       borrowed_date:
 *         type: string
 *         format: date-time
 *         description: borrowed_date date of the Borrowed
 *       expected_return_date:
 *         type: string
 *         format: date-time
 *         description: expected_return_date date of the Borrowed
 *       
 */



  /**
   * @swagger
   * /api/borrowedbooks/{id}:
   *   get:
   *     summary: Retrieve a single borrowedbooks by ID
   *     tags: [BorrowedBooks]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The BorrowedBook id
   *     responses:
   *       200:
   *         description: BorrowedBook data
   *         schema:
   *           $ref: '#/definitions/BorrowedBook'
   *       500:
   *         description: Some server error
   */

  /**
   * @swagger
   * /api/borrowedbooks/{id}:
   *   delete:
   *     summary: Delete an borrowedbooks by ID
   *     tags: [BorrowedBooks]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The borrowedbooks id
   *     responses:
   *       200:
   *         description: borrowedbooks deleted
   *       500:
   *         description: Some server error
   */

  /**
   * @swagger
   * /api/borrowedbooks:
   *   post:
   *     summary: Create a new borrowedbooks
   *     tags: [BorrowedBooks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/BorrowedBook'
   *     responses:
   *       201:
   *         description: The created BorrowedBook.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/BorrowedBook'
   *       500:
   *         description: Some server error
   */

  /**
   * @swagger
   * /api/borrowedbooks/listAll:
   *   get:
   *     summary: Retrieve a list of Borrowedbook
   *     tags: [BorrowedBooks]
   *     responses:
   *       200:
   *         description: A list of BorrowedBook
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/BorrowedBook'
   *       500:
   *         description: Some server error
   */

  /**
   * @swagger
   * /api/borrowedbooks:
   *   put:
   *     summary: Update a Borrowedbook
   *     tags: [BorrowedBooks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/BorrowedBook'
   *     responses:
   *       200:
   *         description: The updated BorrowedBook.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/BorrowedBook'
   *       500:
   *         description: Some server error
   */

  router.post("/", borrowed_books.create);
  router.put("/", borrowed_books.update);
  router.get("/listAll", borrowed_books.findAll);
  router.get("/:id", borrowed_books.findOne);
  router.delete("/:id", borrowed_books.delete);

  app.use("/api/borrowedbooks", router);
};
