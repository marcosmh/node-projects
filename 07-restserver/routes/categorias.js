const { Router } = require('express');
const { check } = require('express-validator');

//const { validarJWT, validarCampos  } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole } = require('../middlewares/validar-roles');

const { existeCategoria } = require('../helpers/existeCategoria');

const { 
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
 } = require('../controllers/categorias');

const router = Router();


//Obtener todas la categorias - public
router.get('/', obtenerCategorias);

//Obtener categoria por id
// router.get('/:id',[
//    check('id').custom( existeCategoria)
//], (req, res)
router.get('/:id',[
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);

//Crear categoria  - privado - cualquiera persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], crearCategoria);


//Actualizar categoria  - privado - cualquiera persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    validarCampos
],actualizarCategoria);

// Borrar una categoria -  solo si es Admin (false/true)
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);


module.exports = router;
