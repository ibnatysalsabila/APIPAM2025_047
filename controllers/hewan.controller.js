const pool = require('../config/db.config');

exports.createHewan = async (req, res) => {
    const { NamaHewan, Jenis, IDPemilik } = req.body;

    // Validasi input
    if (!NamaHewan || !Jenis || !IDPemilik) {
        return res.status(400).json({
            message: "NamaHewan, Jenis, dan IDPemilik wajib diisi"
        });
    }

    const [result] = await pool.execute(
        `INSERT INTO Hewan (NamaHewan, Jenis, IDPemilik) VALUES (?, ?, ?)`,
        [NamaHewan, Jenis, IDPemilik]
    );
    res.status(201).json({
        message: "Hewan berhasil ditambahkan",
        IDHewan: result.insertId
    });
};

exports.getAllHewan = async (req, res) => {
    const [rows] = await pool.execute(`
        SELECT h.*, p.Nama AS NamaPemilik
        FROM Hewan h
        JOIN PemilikHewan p ON h.IDPemilik = p.IDPemilik
    `);
    res.json(rows);
};

exports.getHewanById = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.execute(
        `SELECT * FROM Hewan WHERE IDHewan=?`, [id]
    );
    rows.length
        ? res.json(rows[0])
        : res.status(404).json({ message: "Hewan tidak ditemukan" });
};

exports.updateHewan = async (req, res) => {
    const { id } = req.params;
    const { NamaHewan, Jenis } = req.body;

    // Validasi input
    if (!NamaHewan || !Jenis) {
        return res.status(400).json({
            message: "NamaHewan dan Jenis wajib diisi"
        });
    }

    await pool.execute(
        `UPDATE Hewan SET NamaHewan=?, Jenis=? WHERE IDHewan=?`,
        [NamaHewan, Jenis, id]
    );
    res.json({ message: "Hewan berhasil diperbarui" });
};

exports.deleteHewan = async (req, res) => {
    const { id } = req.params;
    await pool.execute(`DELETE FROM Hewan WHERE IDHewan=?`, [id]);
    res.json({ message: "Hewan berhasil dihapus" });
};
