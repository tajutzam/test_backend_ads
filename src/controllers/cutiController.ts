import { Request, Response } from 'express';
import prisma from '../prisma';
import { validationResult } from 'express-validator';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';

export const getAllCuti = async (req: Request, res: Response) => {
    const { sortBy = 'tanggalCuti', sortOrder = 'asc' } = req.query;
    try {
        const validSortBy: any = ['tanggalCuti', 'lamaCuti'].includes(sortBy as string) ? sortBy : 'tanggalCuti';
        const validSortOrder = ['asc', 'desc'].includes(sortOrder as string) ? sortOrder : 'asc';
        const cuti = await prisma.cuti.findMany({
            orderBy: {
                [validSortBy]: validSortOrder,
            },
        });

        return sendSuccessResponse(res, 200, cuti, "Berhasil mendapatkan data cuti");
    } catch (error: any) {
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};

// Mendapatkan cuti berdasarkan ID
export const getCutiById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cuti = await prisma.cuti.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!cuti) {
            return sendErrorResponse(res, 404, "Cuti tidak ditemukan");
        }
        return sendSuccessResponse(res, 200, cuti, "Berhasil mendapatkan data cuti");
    } catch (error: any) {
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};

// Menambahkan cuti baru
export const createCuti = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendErrorResponse(res, 400, 'Validasi gagal', errors.array());
    }

    const { nomorInduk, tanggalCuti, lamaCuti, keterangan } = req.body;

    try {
        const newCuti = await prisma.cuti.create({
            data: {
                nomorInduk,
                tanggalCuti: new Date(tanggalCuti),
                lamaCuti,
                keterangan,
            },
        });
        return sendSuccessResponse(res, 201, newCuti, "Berhasil menambahkan data cuti");
    } catch (error: any) {
        return sendErrorResponse(res, 400, error.message || "Tidak dapat menambahkan data cuti");
    }
};

// Mengupdate data cuti
export const updateCuti = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nomorInduk, tanggalCuti, lamaCuti, keterangan } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorResponse(res, 400, 'Validasi gagal', errors.array());
        }

        const updatedCuti = await prisma.cuti.update({
            where: { id: parseInt(id, 10) },
            data: {
                nomorInduk,
                tanggalCuti: new Date(tanggalCuti),
                lamaCuti,
                keterangan,
            },
        });
        return sendSuccessResponse(res, 200, updatedCuti, "Berhasil memperbarui data cuti");
    } catch (error: any) {
        if (error.code === 'P2025') {
            return sendErrorResponse(res, 404, 'Cuti tidak ditemukan');
        }
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};

// Menghapus data cuti
export const deleteCuti = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cuti = await prisma.cuti.findUnique({
            where: { id: parseInt(id, 10) },
        });
        if (!cuti) {
            return sendErrorResponse(res, 404, 'Cuti tidak ditemukan');
        }
        await prisma.cuti.delete({
            where: { id: parseInt(id, 10) },
        });

        return sendSuccessResponse(res, 200, true, "Berhasil menghapus data cuti");
    } catch (error: any) {
        return sendErrorResponse(res, 500, error.message || 'Terjadi kesalahan pada server');
    }
};
