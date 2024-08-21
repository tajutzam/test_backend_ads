// src/routes/cutiRoutes.ts
import { Router } from 'express';
import karyawanRoutes from './karyawanRoutes';
import cutiRoutes from './cutiRoutes';

const router = Router();

router.use("/api/karyawan" ,karyawanRoutes)
router.use("/api/cuti" ,cutiRoutes)

export default router;
