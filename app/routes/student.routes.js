module.exports = app => {
    const students = require("../controllers/student.controller");
  
    var router = require("express").Router();
  
    /**
     * @swagger
     * definitions:
     *   Student:
     *     type: object
     *     required:
     *       - full_name
     *       - email
     *       - phone_number
     *       - password
     *     properties:
     *       full_name:
     *         type: string
     *         description: Full name of the student
     *         example: Nguyen Van A
     *       email:
     *         type: string
     *         description: Gmail of the student
     *         example: anguyen@gmail.com
     *       password:
     *         type: string
     *         description: Password of the student
     *         example: 123
     *       birth_date:
     *         type: string
     *         format: date
     *         description: Birth date of the student
     *         example: 1965-07-31
     *       phone_number:
     *         type: string
     *         description: phone_number of the student
     *         example: "0912345678"
     */
  
    /**
     * @swagger
     * /api/students/{id}:
     *   get:
     *     summary: Retrieve a single Student by ID
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The Student id
     *     responses:
     *       200:
     *         description: Student data
     *         schema:
     *           $ref: '#/definitions/Student'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/students/{id}:
     *   delete:
     *     summary: Delete an Student by ID
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The student id
     *     responses:
     *       200:
     *         description: Student deleted
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/students:
     *   post:
     *     summary: Create a new Student
     *     tags: [Students]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/Student'
     *     responses:
     *       201:
     *         description: The created Student.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/Student'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/students/listAll:
     *   get:
     *     summary: Retrieve a list of Students
     *     tags: [Students]
     *     responses:
     *       200:
     *         description: A list of Students
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Student'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/students:
     *   put:
     *     summary: Update a student
     *     tags: [Students]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/Student'
     *     responses:
     *       200:
     *         description: The updated student.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/Student'
     *       500:
     *         description: Some server error
     */
  
    router.post("/", students.create);
    router.put("/", students.update);
    router.get("/listAll", students.findAll);
    router.get("/:id", students.findOne);
    router.delete("/:id", students.delete);
  
    app.use('/api/students', router);
};
