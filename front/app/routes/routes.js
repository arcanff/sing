// HOMEPAGE //
import { Router } from "express";
import fetch from 'node-fetch';

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/acerca', (req, res) => {
    res.render('acerca');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/contactanos', (req, res) => {
    res.render('contactanos');
});

router.get('/preguntas', (req, res) => {
    res.render('preguntas');
});

router.get('/servicios', (req, res) => {
    res.render('servicios');
});

router.get('/T&C', (req, res) => {
    res.render('tyc');
});

//DASHBOARD//

router.get('/Inicio', (req, res) => {
    res.render('dashInicio');
});

router.get('/Publicaciones', (req, res) => {
    res.render('dashPublicaciones');
});

router.get('/CrearPublicacion', (req, res) => {
    res.render('dashCrearPubli');
});

router.get('/EditarPublicacion', (req, res) => {
    res.render('dashEditarPubli');
});

router.get('/Chat', (req, res) => {
    res.render('dashChat');
});

// perfil
router.get('/Perfil', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/user');
        const datos = await response.json();
        res.render('dashPerfil', { datos });
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
});


router.get('/Reportes', (req, res) => {
    res.render('dashReportes');
});

// editar perfil
router.put('/EditarPerfil', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/user');
        const datos = await response.json();
        res.render('dashEditarPerfil', { datos });
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
});

export default router;
