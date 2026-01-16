const express = require('express');
const cors = require('cors');
const masterRoutes = require('./routes/master.routes');

const app = express();
app.use(cors()); // Izinkan akses dari Android
app.use(express.json());

// Logging untuk memantau data yang masuk dari HP
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ke ${req.url}`);
    next();
});

app.use('/api', masterRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server Backend aktif di port ${PORT}`);
});