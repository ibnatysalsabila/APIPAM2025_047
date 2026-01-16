const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const pemilikController = require('../controllers/pemilik.controller');
const hewanController = require('../controllers/hewan.controller');
const layananController = require('../controllers/layanan.controller');
const pemeriksaanController = require('../controllers/pemeriksaan.controller');

// --- AUTH ---
router.post('/login', authController.login);

// --- PEMILIK ---
router.get('/pemilik', pemilikController.getAllPemilik);
router.post('/pemilik/create', pemilikController.createPemilik);
router.put('/pemilik/update/:id', pemilikController.updatePemilik);
router.delete('/pemilik/delete/:id', pemilikController.deletePemilik);

// --- HEWAN ---
router.get('/hewan', hewanController.getAllHewan);
router.post('/hewan/create', hewanController.createHewan);
router.put('/hewan/update/:id', hewanController.updateHewan);
router.delete('/hewan/delete/:id', hewanController.deleteHewan);

// --- LAYANAN MEDIS ---
router.get('/layanan', layananController.getAllLayanan);
router.post('/layanan/create', layananController.createLayanan);
router.put('/layanan/update/:id', layananController.updateLayanan);
router.delete('/layanan/delete/:id', layananController.deleteLayanan);

// --- RIWAYAT PEMERIKSAAN ---
router.get('/pemeriksaan', pemeriksaanController.getAllPemeriksaan);
router.post('/pemeriksaan/create', pemeriksaanController.createPemeriksaan);
router.put('/pemeriksaan/update/:id', pemeriksaanController.updatePemeriksaan);
router.delete('/pemeriksaan/delete/:id', pemeriksaanController.deletePemeriksaan);

module.exports = router;