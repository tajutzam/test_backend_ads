// src/routes/karyawanRoutes.ts
import { Router } from 'express';
import { getAllKaryawan, createKaryawan, deleteKaryawan, updateKaryawan, getById } from '../controllers/karyawanController';
import { validateKaryawan } from '../middlewares/validationMiddleware';

const router = Router();


/**
 * @swagger
 * /api/karyawan:
 *   get:
 *     summary: Get all employees
 *     tags: [Karyawan]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: nama
 *           enum: [nama, tanggalLahir]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           default: asc
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Karyawan'
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllKaryawan);

/**
 * @swagger
 * /api/karyawan:
 *   post:
 *     summary: Create a new employee
 *     tags: [Karyawan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Karyawan'
 *     responses:
 *       201:
 *         description: Successfully created a new employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Karyawan'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', validateKaryawan, createKaryawan);

/**
 * @swagger
 * /api/karyawan/{nomorInduk}:
 *   delete:
 *     summary: Delete an employee by their unique identifier
 *     tags: [Karyawan]
 *     parameters:
 *       - in: path
 *         name: nomorInduk
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the employee
 *     responses:
 *       200:
 *         description: Successfully deleted the employee
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:nomorInduk', deleteKaryawan);

/**
 * @swagger
 * /api/karyawan/{nomorInduk}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Karyawan]
 *     parameters:
 *       - in: path
 *         name: nomorInduk
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Karyawan'
 *     responses:
 *       200:
 *         description: Successfully updated the employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Karyawan'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.put('/:nomorInduk', validateKaryawan, updateKaryawan);


/**
 * @swagger
 * /api/karyawan/{nomorInduk}:
 *   get:
 *     summary: Get detailed information about an employee
 *     tags: [Karyawan]
 *     parameters:
 *       - in: path
 *         name: nomorInduk
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved detailed employee information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KaryawanDetail'
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/:nomorInduk', getById);


export default router;
