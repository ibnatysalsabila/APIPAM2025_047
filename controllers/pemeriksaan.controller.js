const pool = require('../config/db.config');

exports.getAllPemeriksaan = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT p.*, h.NamaHewan, l.NamaLayanan 
            FROM riwayatpemeriksaan p
            LEFT JOIN hewan h ON p.IDHewan = h.IDHewan
            LEFT JOIN layananmedis l ON p.IDLayanan = l.IDLayanan
        `);
        // Format tanggal jika perlu, tapi biarkan raw date dulu
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPemeriksaan = async (req, res) => {
    const { IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan } = req.body;
    try {
        await pool.execute(
            'INSERT INTO riwayatpemeriksaan (IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan) VALUES (?, ?, ?, ?)',
            [IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan]
        );
        res.status(201).json({ message: "Pemeriksaan berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePemeriksaan = async (req, res) => {
    const { id } = req.params;
    const { IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan } = req.body;
    console.log(`[DEBUG] Update Pemeriksaan - ID: ${id}`, req.body);
    try {
        await pool.execute(
            'UPDATE riwayatpemeriksaan SET IDHewan=?, IDLayanan=?, TanggalPemeriksaan=?, CatatanPemeriksaan=? WHERE IDRiwayat=?',
            [IDHewan, IDLayanan, TanggalPemeriksaan, CatatanPemeriksaan, id]
        );
        res.json({ message: "Pemeriksaan berhasil diperbarui" });
    } catch (error) {
        console.error(`[ERROR] Update Pemeriksaan Failed:`, error);
        res.status(500).json({ message: error.message });
    }
};

exports.deletePemeriksaan = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM riwayatpemeriksaan WHERE IDRiwayat=?', [id]);
        res.json({ message: "Pemeriksaan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
