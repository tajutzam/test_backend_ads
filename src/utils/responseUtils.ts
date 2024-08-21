import { Response } from 'express';



export const sendErrorResponse = (res: Response, statusCode: number, message: string, details?: any[]) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
        details,
        code: statusCode,
    });
};

export const sendSuccessResponse = (res: Response, statusCode: number, data: any, msg: string) => {
    return res.status(statusCode).json({
        status: 'success',
        data,
        code: statusCode,
        msg: msg
    });
};
