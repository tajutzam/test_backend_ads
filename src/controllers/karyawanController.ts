import { Request, Response } from 'express';
import prisma from '../prisma';
import { generateNomorInduk } from '../utils/utils';
import { validationResult } from 'express-validator';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';


export const getAllKaryawan = async (req: Request, res: Response) => {
    const { sortBy = 'nama', sortOrder = 'asc' } = req.query;
    try {
        const validSortBy: any = ['nama', 'tanggalLahir'].includes(sortBy as string) ? sortBy : 'nama';
        const validSortOrder = ['asc', 'desc'].includes(sortOrder as string) ? sortOrder : 'asc';
        const karyawan = await prisma.karyawan.findMany({
            orderBy: {
                [validSortBy]: validSortOrder,
            },
        });

        return sendSuccessResponse(res, 200, karyawan, "Berhasil mendapatkan data karyawan");
    } catch (error: any) {
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};

export const getById = async (req: Request, res: Response) => {

    const { nomorInduk } = req.params

    const karyawan = await prisma.karyawan.findUnique({
        where: { nomorInduk },
        include: { cuti: true }
    });

    if (!karyawan) {
        return sendErrorResponse(res, 404, "Karyawan tidak ditemukan")
    }
    return sendSuccessResponse(res, 200, karyawan, "Berhasil mendapatkan data karyawan")
}


export const updateKaryawan = async (req: Request, res: Response) => {
    const { nomorInduk } = req.params;
    const { nama, alamat, tanggalLahir, tanggalBergabung } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorResponse(res, 400, 'Validasi gagal', errors.array());
        }

        const updatedKaryawan = await prisma.karyawan.update({
            where: { nomorInduk },
            data: {
                nama,
                alamat,
                tanggalLahir,
                tanggalBergabung,
            },
        });
        return sendSuccessResponse(res, 200, updatedKaryawan, "Berhasil memperbarui karyawan");
    } catch (error: any) {
        if (error.code === 'P2025') {
            return sendErrorResponse(res, 404, 'Karyawan tidak ditemukan');
        }
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};


export const createKaryawan = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendErrorResponse(res, 400, 'Validasi gagal', errors.array());
    }

    const { nama, alamat, tanggalLahir, tanggalBergabung } = req.body;

    const nomorInduk = await generateNomorInduk();

    try {
        const newKaryawan = await prisma.karyawan.create({
            data: {
                nomorInduk,
                nama,
                alamat,
                tanggalLahir: new Date(tanggalLahir),
                tanggalBergabung: new Date(tanggalBergabung),
            },
        });
        return sendSuccessResponse(res, 201, newKaryawan, "Berhasil menambahkan data karyawan")
    } catch (error: any) {
        res.status(400).json({ status: 'failed', msg: error.message || "Tidak dapat menambahkan data karyawan" });
    }
};

export const deleteKaryawan = async (req: Request, res: Response) => {
    const { nomorInduk } = req.params;
    try {
        const karyawan = await prisma.karyawan.findUnique({
            where: { nomorInduk },
        });
        if (!karyawan) {
            return sendErrorResponse(res, 404, 'Karyawan tidak ditemukan');
        }
        await prisma.karyawan.delete({
            where: { nomorInduk },
        });

        return sendSuccessResponse(res, 200, true, "Berhasil menghapus karyawan");
    } catch (error: any) {
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};
