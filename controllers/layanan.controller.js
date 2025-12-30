const pool = require('../config/db.config');

exports.createLayanan = async (req, res) => {
    const { NamaLayanan, Deskripsi, Biaya } = req.body;

    // Validasi input
    if (!NamaLayanan || !Deskripsi || Biaya === undefined) {
        return res.status(400).json({
            message: "NamaLayanan, Deskripsi, dan Biaya wajib diisi"
        });
    }

    const [result] = await pool.execute(
        `INSERT INTO LayananMedis (NamaLayanan, Deskripsi, Biaya)
         VALUES (?, ?, ?)`,
        [NamaLayanan, Deskripsi, Biaya]
    );
    res.status(201).json({
        message: "Layanan medis berhasil ditambahkan",
        IDLayanan: result.insertId
    });
};

exports.getAllLayanan = async (req, res) => {
    const [rows] = await pool.execute(`SELECT * FROM LayananMedis`);
    res.json(rows);
};

exports.getLayananById = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.execute(
        `SELECT * FROM LayananMedis WHERE IDLayanan=?`, [id]
    );
    rows.length
        ? res.json(rows[0])
        : res.status(404).json({ message: "Layanan tidak ditemukan" });
};

exports.updateLayanan = async (req, res) => {
    const { id } = req.params;
    const { NamaLayanan, Deskripsi, Biaya } = req.body;

    // Validasi input
    if (!NamaLayanan || !Deskripsi || Biaya === undefined) {
        return res.status(400).json({
            message: "NamaLayanan, Deskripsi, dan Biaya wajib diisi"
        });
    }

    await pool.execute(
        `UPDATE LayananMedis SET NamaLayanan=?, Deskripsi=?, Biaya=? WHERE IDLayanan=?`,
        [NamaLayanan, Deskripsi, Biaya, id]
    );
    res.json({ message: "Layanan berhasil diperbarui" });
};

exports.deleteLayanan = async (req, res) => {
    const { id } = req.params;
    await pool.execute(`DELETE FROM LayananMedis WHERE IDLayanan=?`, [id]);
    res.json({ message: "Layanan berhasil dihapus" });
};
