const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarArchivo, verArchivo, actualizarArchivoCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivo } = require('../middlewares/validar-archivo');

const router = Router();

router.post('/', validarArchivo,  cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'No es un ID válido.').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['default','usuarios','productos'])),
    validarCampos
//], actualizarArchivo);
], actualizarArchivoCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['default','usuarios','productos'])),
    validarCampos
], verArchivo);

module.exports = router;