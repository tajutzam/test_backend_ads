import prisma from '../prisma';

/**
 * Mengambil nomor urut berikutnya dari database
 * @returns Nomor urut berikutnya
 */
async function getNextNomorUrut(): Promise<number> {
  try {
    // Mengambil karyawan terakhir berdasarkan nomorInduk secara menurun
    const lastKaryawan = await prisma.karyawan.findFirst({
      orderBy: {
        nomorInduk: 'desc',
      },
    });

    if (lastKaryawan) {
      // Ekstrak bagian nomor urut dari nomor induk terakhir dan increment
      const lastNomorUrut = parseInt(lastKaryawan.nomorInduk.slice(-3), 10);
      return lastNomorUrut + 1;
    }

    // Jika tidak ada data, mulai dengan nomor urut 1
    return 1;
  } catch (error) {
    // Tangani error dengan log atau lempar exception
    console.error('Error retrieving next nomor urut:', error);
    throw new Error('Could not retrieve the next nomor urut');
  }
}

/**
 * Menghasilkan nomor induk dengan format tertentu
 * @returns Nomor induk yang diformat
 */
export async function generateNomorInduk(): Promise<string> {
  try {
    const nomorUrut = await getNextNomorUrut();
    const prefix = 'IP';
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const nomorUrutFormatted = nomorUrut.toString().padStart(3, '0');
    return `${prefix}${month}${year}${nomorUrutFormatted}`;
  } catch (error) {
    // Tangani error dengan log atau lempar exception
    console.error('Error generating nomor induk:', error);
    throw new Error('Could not generate nomor induk');
  }
}
