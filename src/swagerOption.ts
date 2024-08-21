import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for your project',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            Karyawan: {
                type: 'object',
                properties: {
                    nomorInduk: { type: 'string', description: 'Unique identifier of the employee' },
                    nama: { type: 'string', description: 'Name of the employee' },
                    alamat: { type: 'string', description: 'Address of the employee' },
                    tanggalLahir: { type: 'string', format: 'date', description: 'Date of birth of the employee' },
                    tanggalBergabung: { type: 'string', format: 'date', description: 'Joining date of the employee' },
                },
                required: ['nomorInduk', 'nama', 'alamat', 'tanggalLahir', 'tanggalBergabung'],
            },
            KaryawanDetail: {
                type: 'object',
                properties: {
                    nomorInduk: { type: 'string', description: 'Unique identifier of the employee' },
                    nama: { type: 'string', description: 'Name of the employee' },
                    alamat: { type: 'string', description: 'Address of the employee' },
                    tanggalLahir: { type: 'string', format: 'date', description: 'Date of birth of the employee' },
                    tanggalBergabung: { type: 'string', format: 'date', description: 'Joining date of the employee' },
                    cuti: { // Include detailed leave data if applicable
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                tanggalCuti: { type: 'string', format: 'date', description: 'Date of leave' },
                                lamaCuti: { type: 'integer', description: 'Number of days of leave' },
                                keterangan: { type: 'string', description: 'Description or reason for leave' },
                            },
                            required: ['tanggalCuti', 'lamaCuti', 'keterangan'],
                        },
                        description: 'List of leave records for the employee',
                    },
                },
                required: ['nomorInduk', 'nama', 'alamat', 'tanggalLahir', 'tanggalBergabung'],
            },
            Cuti: {
                type: 'object',
                properties: {
                    nomorInduk: { type: 'string', description: 'Unique identifier of the employee' },
                    tanggalCuti: { type: 'string', format: 'date', description: 'Date of leave' },
                    lamaCuti: { type: 'integer', description: 'Number of days of leave' },
                    keterangan: { type: 'string', description: 'Description or reason for leave' },
                },
                required: ['nomorInduk', 'tanggalCuti', 'lamaCuti', 'keterangan'],
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Path to your API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
