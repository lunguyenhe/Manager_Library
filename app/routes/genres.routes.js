module.exports = app => {
    const genres = require("../controllers/genres.controller");
  
    var router = require("express").Router();
  
   /**
   * @swagger
   * definitions:
   *   Genres:
   *     type: object
   *     required:
   *       - name
   *     properties:
   *       name:
   *         type: string
   *         description: Name of the Genres
   *         example: Math
   *   GenresUpdate:
   *     type: object
   *     required:
   *       - genres_id
   *       - name
   *     properties:
   *       genres_id:
   *         type: integer
   *         description: ID of the genres
   *         example: 1
   *       name:
   *         type: string
   *         description:  name of the Genres
   *         example: Math
   */
  
  /**
   * @swagger
   * /api/genres/listAll:
   *   get:
   *     summary: Retrieve a list of genres
   *     tags: [Genres]
   *     responses:
   *       200:
   *         description: A list of genres
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Genres'
   *       500:
   *         description: Some server error
   */
  
  /**
   * @swagger
   * /api/genres/{id}:
   *   get:
   *     summary: Retrieve a single genres by ID
   *     tags: [Genres]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The genres id
   *     responses:
   *       200:
   *         description: Genres data
   *         schema:
   *           $ref: '#/definitions/Genres'
   *       500:
   *         description: Some server error
   */
  
  /**
   * @swagger
   * /api/genres/{id}:
   *   delete:
   *     summary: Delete an genres by ID
   *     tags: [Genres]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The genres id
   *     responses:
   *       200:
   *         description: Genres deleted
   *       500:
   *         description: Some server error
   */
  
  /**
   * @swagger
   * /api/genres:
   *   post:
   *     summary: Create a new genres
   *     tags: [Genres]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/Genres'
   *     responses:
   *       201:
   *         description: The created genres.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Genres'
   *       500:
   *         description: Some server error
   */
  
  /**
   * @swagger
   * /api/genres:
   *   put:
   *     summary: Update an genres
   *     tags: [Genres]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/GenresUpdate'
   *     responses:
   *       200:
   *         description: The updated Genres.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/GenresUpdate'
   *       500:
   *         description: Some server error
   */
  
  router.post("/", genres.create);
  router.put("/", genres.update);
  router.get("/listAll", genres.findAll);
  router.get("/:id", genres.findOne);
  router.delete("/:id", genres.delete);
  
  app.use('/api/genres', router);
  };
  