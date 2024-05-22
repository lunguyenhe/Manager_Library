module.exports = app => {
    const feedback = require("../controllers/feedback.controller");
  
    var router = require("express").Router();
  
    /**
     * @swagger
     * definitions:
     *   Feedback:
     *     type: object
     *     required:
     *       - id
     *       - content
     *       - stars
     *     properties:
     *       id:
     *         type: integer
     *         description: Id of the Borrowed
     *         example: 1
     *       content:
     *         type: string
     *         description: Content of the Feedback
     *         example: Very Good
     *       stars:
     *         type: integer
     *         description: stars of the Feedback
     *         example: 5
     */
  
    /**
     * @swagger
     * /api/feedbacks/{id}:
     *   get:
     *     summary: Retrieve a single feedback by ID
     *     tags: [Feedbacks]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The feedback id
     *     responses:
     *       200:
     *         description: feedback data
     *         schema:
     *           $ref: '#/definitions/Feedback'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/feedbacks/{id}:
     *   delete:
     *     summary: Delete an feedback by ID
     *     tags: [Feedbacks]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The feedback id
     *     responses:
     *       200:
     *         description: feedback deleted
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/feedbacks:
     *   post:
     *     summary: Create a new feedback
     *     tags: [Feedbacks]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/Feedback'
     *     responses:
     *       201:
     *         description: The created feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/Feedback'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/feedbacks/listAll:
     *   get:
     *     summary: Retrieve a list of feedback
     *     tags: [Feedbacks]
     *     responses:
     *       200:
     *         description: A list of Feedback
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Feedback'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/feedbacks:
     *   put:
     *     summary: Update a feedback
     *     tags: [Feedbacks]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/Feedback'
     *     responses:
     *       200:
     *         description: The updated Feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/Feedback'
     *       500:
     *         description: Some server error
     */
  
    router.post("/", feedback.create);
    router.put("/", feedback.update);
    router.get("/listAll", feedback.findAll);
    router.get("/:id", feedback.findOne);
    router.delete("/:id", feedback.delete);
  
    app.use('/api/feedbacks', router);
};
