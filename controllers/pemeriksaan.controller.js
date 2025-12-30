const pool = require('../config/db.config');

// CREATE
exports.createPemeriksaan = async (req, res) => {
    try {
        const {
            IDHewan,
            IDLayanan,
            TanggalPemeriksaan,
            CatatanPemeriksaan
        } = req.body;

        // Validasi input
        if (!IDHewan || !IDLayanan || !TanggalPemeriksaan || !CatatanPemeriksaan) {
            return res.status(400).json({
                message: "IDHewan, IDLayanan, TanggalPemeriksaan, dan CatatanPemeriksaan wajib diisi"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO RiwayatPemeriksaan
             (IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan)
             VALUES (?, ?, ?, ?)`,
            [IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan]
        );

        res.status(201).json({
            message: "Riwayat pemeriksaan berhasil ditambahkan",
            IDRiwayat: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menambah riwayat pemeriksaan",
            error: error.message
        });
    }
};

// READ ALL
exports.getAllPemeriksaan = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT r.*, h.NamaHewan, l.NamaLayanan
            FROM RiwayatPemeriksaan r
            JOIN Hewan h ON r.IDHewan = h.IDHewan
            LEFT JOIN LayananMedis l ON r.IDLayanan = l.IDLayanan
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pemeriksaan" });
    }
};

// READ BY ID
exports.getPemeriksaanById = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.execute(
        `SELECT * FROM RiwayatPemeriksaan WHERE IDRiwayat=?`,
        [id]
    );

    rows.length
        ? res.json(rows[0])
        : res.status(404).json({ message: "Riwayat tidak ditemukan" });
};

// UPDATE
exports.updatePemeriksaan = async (req, res) => {
    const { id } = req.params;
    const { IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan } = req.body;

    // Validasi input
    if (!IDLayanan || !TanggalPemeriksaan || !CatatanPemeriksaan) {
        return res.status(400).json({
            message: "IDLayanan, TanggalPemeriksaan, dan CatatanPemeriksaan wajib diisi"
        });
    }

    await pool.execute(
        `UPDATE RiwayatPemeriksaan
         SET IDLayanan=?, TanggalPemeriksaan=?, CatatanPemeriksaan=?
         WHERE IDRiwayat=?`,
        [IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan, id]
    );

    res.json({ message: "Riwayat pemeriksaan berhasil diperbarui" });
};

// DELETE
exports.deletePemeriksaan = async (req, res) => {
    const { id } = req.params;
    await pool.execute(
        `DELETE FROM RiwayatPemeriksaan WHERE IDRiwayat=?`,
        [id]
    );
    res.json({ message: "Riwayat pemeriksaan berhasil dihapus" });
};
