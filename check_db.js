
const pool = require('./config/db.config');

async function checkAdmin() {
    try {
        const [rows] = await pool.execute('SELECT * FROM admin');
        console.log('Admin Table Content:', rows);
        process.exit(0);
    } catch (error) {
        console.error('Error checking admin:', error);
        process.exit(1);
    }
}

checkAdmin();
