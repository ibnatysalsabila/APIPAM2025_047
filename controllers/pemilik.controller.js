const pool = require('../config/db.config');

exports.createPemilik = async (req, res) => {
    const { Nama, NoHP, Email } = req.body;

    // Validasi Email harus @gmail.com
    if (Email && !Email.endsWith('@gmail.com')) {
        return res.status(400).json({
            message: "Email harus menggunakan domain @gmail.com"
        });
    }

    try {
        const [result] = await pool.execute(
            `INSERT INTO PemilikHewan (Nama, NoHP, Email) VALUES (?, ?, ?)`,
            [Nama, NoHP, Email]
        );
        res.status(201).json({
            message: "Pemilik hewan berhasil ditambahkan",
            IDPemilik: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah pemilik", error: error.message });
    }
};

exports.getAllPemilik = async (req, res) => {
    try {
        const [rows] = await pool.execute(`SELECT * FROM PemilikHewan`);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pemilik" });
    }
};

exports.getPemilikById = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.execute(
        `SELECT * FROM PemilikHewan WHERE IDPemilik = ?`,
        [id]
    );
    rows.length
        ? res.json(rows[0])
        : res.status(404).json({ message: "Pemilik tidak ditemukan" });
};

exports.updatePemilik = async (req, res) => {
    const { id } = req.params;
    const { Nama, NoHP, Email } = req.body;

    // Validasi Email harus @gmail.com
    if (Email && !Email.endsWith('@gmail.com')) {
        return res.status(400).json({
            message: "Email harus menggunakan domain @gmail.com"
        });
    }

    await pool.execute(
        `UPDATE PemilikHewan SET Nama=?, NoHP=?, Email=? WHERE IDPemilik=?`,
        [Nama, NoHP, Email, id]
    );
    res.json({ message: "Pemilik berhasil diperbarui" });
};

exports.deletePemilik = async (req, res) => {
    const { id } = req.params;
    await pool.execute(`DELETE FROM PemilikHewan WHERE IDPemilik=?`, [id]);
    res.json({ message: "Pemilik berhasil dihapus" });
};
