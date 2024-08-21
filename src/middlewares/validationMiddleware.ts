import { body } from 'express-validator';
import prisma from '../prisma';

export const validateKaryawan = [
    body('nama').isString().withMessage('Nama harus berupa string'),
    body('alamat').isString().withMessage('Alamat harus berupa string'),
    body('tanggalLahir').isISO8601().toDate().withMessage('Tanggal Lahir harus berupa tanggal yang valid'),
    body('tanggalBergabung').isISO8601().toDate().withMessage('Tanggal Bergabung harus berupa tanggal yang valid'),
];

export const validateCuti = [
    body('nomorInduk')
        .isString().withMessage('Nomor Induk harus berupa string')
        .notEmpty().withMessage('Nomor Induk tidak boleh kosong')
        .custom(async (value) => {
            const karyawan = await prisma.karyawan.findUnique({
                where: { nomorInduk: value }
            });
            if (!karyawan) {
                throw new Error('Nomor Induk tidak ditemukan di database');
            }
            return true;
        }),
    body('tanggalCuti').isISO8601().toDate().withMessage('Tanggal Cuti harus berupa tanggal yang valid'),
    body('lamaCuti').isInt({ min: 1 }).withMessage('Lama Cuti harus berupa angka positif'),
    body('keterangan').isString().withMessage('Keterangan harus berupa string'),
];
