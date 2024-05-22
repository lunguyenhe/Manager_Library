module.exports = app => {
  const authors = require("../controllers/author.controller");

  var router = require("express").Router();

 /**
 * @swagger
 * definitions:
 *   Author:
 *     type: object
 *     required:
 *       - full_name
 *       - birth_date
 *       - biography
 *     properties:
 *       full_name:
 *         type: string
 *         description: Full name of the author
 *         example: J.K. Rowling
 *       birth_date:
 *         type: string
 *         format: date
 *         description: Birth date of the author
 *         example: 1965-07-31
 *       death_date:
 *         type: string
 *         format: date
 *         description: Death date of the author (if applicable)
 *         example: 2023-01-01
 *       biography:
 *         type: string
 *         description: Biography of the author
 *         example: J.K. Rowling is the author of the Harry Potter series.
 *   AuthorUpdate:
 *     type: object
 *     required:
 *       - author_id
 *       - full_name
 *       - birth_date
 *       - biography
 *     properties:
 *       author_id:
 *         type: integer
 *         description: ID of the author
 *         example: 1
 *       full_name:
 *         type: string
 *         description: Full name of the author
 *         example: J.K. Rowling
 *       birth_date:
 *         type: string
 *         format: date
 *         description: Birth date of the author
 *         example: 1965-07-31
 *       death_date:
 *         type: string
 *         format: date
 *         description: Death date of the author (if applicable)
 *         example: 2023-01-01
 *       biography:
 *         type: string
 *         description: Biography of the author
 *         example: J.K. Rowling is the author of the Harry Potter series.
 */

/**
 * @swagger
 * /api/authors/listAll:
 *   get:
 *     summary: Retrieve a list of authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Author'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Retrieve a single author by ID
 *     tags: [Authors]
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
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: Author deleted
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Author'
 *     responses:
 *       201:
 *         description: The created author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Author'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/authors:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AuthorUpdate'
 *     responses:
 *       200:
 *         description: The updated author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AuthorUpdate'
 *       500:
 *         description: Some server error
 */

router.post("/", authors.create);
router.put("/", authors.update);
router.get("/listAll", authors.findAll);
router.get("/:id", authors.findOne);
router.delete("/:id", authors.delete);

app.use('/api/authors', router);
};
