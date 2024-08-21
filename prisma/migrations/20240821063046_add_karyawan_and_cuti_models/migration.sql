-- CreateTable
CREATE TABLE `Karyawan` (
    `nomorInduk` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `tanggalBergabung` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Karyawan_nomorInduk_key`(`nomorInduk`),
    PRIMARY KEY (`nomorInduk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggalCuti` DATETIME(3) NOT NULL,
    `lamaCuti` INTEGER NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `nomorInduk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cuti` ADD CONSTRAINT `Cuti_nomorInduk_fkey` FOREIGN KEY (`nomorInduk`) REFERENCES `Karyawan`(`nomorInduk`) ON DELETE RESTRICT ON UPDATE CASCADE;
