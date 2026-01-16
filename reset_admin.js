
const pool = require('./config/db.config');
const bcrypt = require('bcrypt');

async function resetAdmin() {
    const saltRounds = 10;
    const newHash = await bcrypt.hash('admin123', saltRounds);
    console.log('New Hash for admin123:', newHash);

    try {
        await pool.execute('UPDATE admin SET password = ? WHERE username = ?', [newHash, 'admin']);
        console.log('Admin password updated successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error updating admin:', error);
        process.exit(1);
    }
}

resetAdmin();
