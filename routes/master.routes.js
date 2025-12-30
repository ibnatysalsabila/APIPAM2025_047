const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const pemilikController = require('../controllers/pemilik.controller');
const hewanController = require('../controllers/hewan.controller');
const layananController = require('../controllers/layanan.controller');
const pemeriksaanController = require('../controllers/pemeriksaan.controller');

console.log('authController:', authController);
console.log('authController.login:', typeof authController.login);

// =======================
// AUTH
// =======================
router.post('/auth/login', authController.login);


// =======================
// PROTECTED ROUTES
// =======================
router.use(authMiddleware.verifyToken);


// =======================
// PEMILIK HEWAN
// =======================
router.post('/pemilik/create', pemilikController.createPemilik);
router.get('/pemilik', pemilikController.getAllPemilik);
router.get('/pemilik/:id', pemilikController.getPemilikById);
router.put('/pemilik/update/:id', pemilikController.updatePemilik);
router.delete('/pemilik/delete/:id', pemilikController.deletePemilik);


// =======================
// HEWAN
// =======================
router.post('/hewan/create', hewanController.createHewan);
router.get('/hewan', hewanController.getAllHewan);
router.get('/hewan/:id', hewanController.getHewanById);
router.put('/hewan/update/:id', hewanController.updateHewan);
router.delete('/hewan/delete/:id', hewanController.deleteHewan);


// =======================
// LAYANAN MEDIS
// =======================
router.post('/layanan/create', layananController.createLayanan);
router.get('/layanan', layananController.getAllLayanan);
router.get('/layanan/:id', layananController.getLayananById);
router.put('/layanan/update/:id', layananController.updateLayanan);
router.delete('/layanan/delete/:id', layananController.deleteLayanan);


// =======================
// RIWAYAT PEMERIKSAAN
// =======================
router.post('/pemeriksaan/create', pemeriksaanController.createPemeriksaan);
router.get('/pemeriksaan', pemeriksaanController.getAllPemeriksaan);
router.get('/pemeriksaan/:id', pemeriksaanController.getPemeriksaanById);
router.put('/pemeriksaan/update/:id', pemeriksaanController.updatePemeriksaan);
router.delete('/pemeriksaan/delete/:id', pemeriksaanController.deletePemeriksaan);


module.exports = router;
