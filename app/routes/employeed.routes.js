module.exports = app => {
    const employee = require("../controllers/employee.controller");
  
    var router = require("express").Router();
  
    /**
     * @swagger
     * definitions:
     *   Employee:
     *     type: object
     *     required:
     *       - full_name
     *       - email
     *       - phone_number
     *       - password
     *     properties:
     *       full_name:
     *         type: string
     *         description: Full name of the employee
     *         example: Nguyen Van A
     *       email:
     *         type: string
     *         description: Gmail of the employee
     *         example: anguyen@gmail.com
     *       password:
     *         type: string
     *         description: Password of the employee
     *         example: 123
     *       birth_date:
     *         type: string
     *         format: date
     *         description: Birth date of the employee
     *         example: 1965-07-31
     *       phone_number:
     *         type: string
     *         description: phone_number of the employee
     *         example: "0912345678"
     */
  
    /**
     * @swagger
     * /api/employees/{id}:
     *   get:
     *     summary: Retrieve a single employee by ID
     *     tags: [Employees]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The employee id
     *     responses:
     *       200:
     *         description: employee data
     *         schema:
     *           $ref: '#/definitions/Employee'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/employees/{id}:
     *   delete:
     *     summary: Delete an employee by ID
     *     tags: [Employees]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The employee id
     *     responses:
     *       200:
     *         description: employee deleted
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/employees:
     *   post:
     *     summary: Create a new employee
     *     tags: [Employees]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/Employee'
     *     responses:
     *       201:
     *         description: The created employee.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/Employee'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/employees/listAll:
     *   get:
     *     summary: Retrieve a list of employee
     *     tags: [Employees]
     *     responses:
     *       200:
     *         description: A list of employee
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Employee'
     *       500:
     *         description: Some server error
     */
  
    /**
     * @swagger
     * /api/employees:
     *   put:
     *     summary: Update a employee
     *     tags: [Employees]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/Employee'
     *     responses:
     *       200:
     *         description: The updated employee.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/Employee'
     *       500:
     *         description: Some server error
     */
  
    router.post("/", employee.create);
    router.put("/", employee.update);
    router.get("/listAll", employee.findAll);
    router.get("/:id", employee.findOne);
    router.delete("/:id", employee.delete);
  
    app.use('/api/employees', router);
};
