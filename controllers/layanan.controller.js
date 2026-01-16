const pool = require('../config/db.config');

exports.getAllLayanan = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM layananmedis');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createLayanan = async (req, res) => {
    const { NamaLayanan, Deskripsi, Biaya } = req.body;
    try {
        await pool.execute(
            'INSERT INTO layananmedis (NamaLayanan, Deskripsi, Biaya) VALUES (?, ?, ?)',
            [NamaLayanan, Deskripsi, Biaya]
        );
        res.status(201).json({ message: "Layanan berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLayanan = async (req, res) => {
    const { id } = req.params;
    const { NamaLayanan, Deskripsi, Biaya } = req.body;
    try {
        await pool.execute(
            'UPDATE layananmedis SET NamaLayanan=?, Deskripsi=?, Biaya=? WHERE IDLayanan=?',
            [NamaLayanan, Deskripsi, Biaya, id]
        );
        res.json({ message: "Layanan berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLayanan = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM layananmedis WHERE IDLayanan=?', [id]);
        res.json({ message: "Layanan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
