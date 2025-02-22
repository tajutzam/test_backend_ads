# test_backend_ads

Proyek ini adalah API RESTful untuk mengelola catatan cuti karyawan (Cuti) dan informasi karyawan (Karyawan). Proyek ini menyediakan titik akhir untuk membuat, membaca, memperbarui, dan menghapus catatan cuti dan detail karyawan. Dokumentasi API dibuat secara otomatis menggunakan Swagger.

### Teknologi yang Digunakan

- **Node.js**: Lingkungan runtime JavaScript.
- **Express.js**: Kerangka aplikasi web untuk Node.js.
- **Prisma**: ORM untuk interaksi dengan database.
- **Swagger**: Dokumentasi dan pengujian API.
- **TypeScript**: Superset JavaScript untuk keamanan tipe.
- **expres validator**: Untuk validasi request.


### Instalasi

#### Prerequisites

- Node.js (>=14.x)
- npm atau Yarn

#### Langkah-langkah

1. **Clone repositori:**

   ```bash
   git clone https://github.com/tajutzam/test_backend_ads
   cd test_backend_ads
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   atau

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Buat file `.env` di direktori root dan tambahkan variabel lingkungan Anda. Contoh:

   ```
   DATABASE_URL="mysql://root@localhost:3306/nama_db"
   ```

4. **Jalankan migrasi database:**

   ```bash
   npx prisma migrate dev
   ```

5. **Mulai server development:**

   ```bash
   npm run dev
   ```

   atau

   ```bash
   yarn dev
   ```

### Penggunaan

#### Endpoint API

##### Karyawan (Employee)

- **Dapatkan semua karyawan**

  - **Endpoint:** `GET /api/karyawan`
  - **Deskripsi:** Mengambil semua catatan karyawan.
  - **Respons:** Daftar karyawan.

- **Buat karyawan baru**

  - **Endpoint:** `POST /api/karyawan`
  - **Deskripsi:** Membuat catatan karyawan baru.
  - **Request Body:** Detail karyawan.
  - **Respons:** Catatan karyawan yang dibuat.

- **Dapatkan karyawan berdasarkan NOMOR INDUK**

  - **Endpoint:** `GET /api/karyawan/:nomorInduk`
  - **Deskripsi:** Mengambil catatan karyawan berdasarkan ID uniknya.
  - **Respons:** Detail catatan karyawan.

- **Perbarui karyawan**

  - **Endpoint:** `PUT /api/karyawan/:nomorInduk`
  - **Deskripsi:** Memperbarui catatan karyawan yang ada.
  - **Request Body:** Detail karyawan yang diperbarui.
  - **Respons:** Catatan karyawan yang diperbarui.

- **Hapus karyawan**
  - **Endpoint:** `DELETE /api/karyawan/:nomorInduk`
  - **Deskripsi:** Menghapus catatan karyawan berdasarkan ID uniknya.
  - **Respons:** Pesan sukses atau gagal.

##### Cuti (Leave)

- **Dapatkan semua catatan cuti**

  - **Endpoint:** `GET /api/cuti`
  - **Deskripsi:** Mengambil semua catatan cuti.
  - **Respons:** Daftar catatan cuti.

- **Buat catatan cuti baru**

  - **Endpoint:** `POST /api/cuti`
  - **Deskripsi:** Membuat catatan cuti baru.
  - **Request Body:** Detail cuti.
  - **Respons:** Catatan cuti yang dibuat.

- **Dapatkan catatan cuti berdasarkan ID**

  - **Endpoint:** `GET /api/cuti/:id`
  - **Deskripsi:** Mengambil catatan cuti berdasarkan ID uniknya.
  - **Respons:** Detail catatan cuti.

- **Perbarui catatan cuti**

  - **Endpoint:** `PUT /api/cuti/:id`
  - **Deskripsi:** Memperbarui catatan cuti yang ada.
  - **Request Body:** Detail cuti yang diperbarui.
  - **Respons:** Catatan cuti yang diperbarui.

- **Hapus catatan cuti**
  - **Endpoint:** `DELETE /api/cuti/:id`
  - **Deskripsi:** Menghapus catatan cuti berdasarkan ID uniknya.
  - **Respons:** Pesan sukses atau gagal.

### Dokumentasi API

Dokumentasi API dapat diakses melalui Swagger UI di [http://localhost:3000/api-docs](http://localhost:3000/api-docs) setelah server berjalan.
