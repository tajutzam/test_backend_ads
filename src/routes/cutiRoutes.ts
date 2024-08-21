import { Router } from 'express';
import { createCuti, deleteCuti, getAllCuti, getCutiById, updateCuti } from '../controllers/cutiController';
import { validateCuti } from '../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cuti
 *   description: API endpoints for managing employee leave
 */

/**
 * @swagger
 * /api/cuti:
 *   get:
 *     summary: Get all leave records
 *     tags: [Cuti]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: tanggalCuti
 *           enum: [tanggalCuti, lamaCuti]
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
 *         description: Successfully retrieved the list of leave records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cuti'
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCuti);

/**
 * @swagger
 * /api/cuti:
 *   post:
 *     summary: Create a new leave record
 *     tags: [Cuti]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuti'
 *     responses:
 *       201:
 *         description: Successfully created a new leave record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuti'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', validateCuti, createCuti);

/**
 * @swagger
 * /api/cuti/{id}:
 *   get:
 *     summary: Get a leave record by ID
 *     tags: [Cuti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the leave record
 *     responses:
 *       200:
 *         description: Successfully retrieved the leave record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuti'
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getCutiById);

/**
 * @swagger
 * /api/cuti/{id}:
 *   put:
 *     summary: Update an existing leave record
 *     tags: [Cuti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the leave record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuti'
 *     responses:
 *       200:
 *         description: Successfully updated the leave record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuti'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateCuti, updateCuti);

/**
 * @swagger
 * /api/cuti/{id}:
 *   delete:
 *     summary: Delete a leave record by ID
 *     tags: [Cuti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the leave record
 *     responses:
 *       200:
 *         description: Successfully deleted the leave record
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteCuti);

export default router;
