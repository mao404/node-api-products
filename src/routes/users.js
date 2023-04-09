const { Router } = require('express')
const {
    getAllUsers, 
    createUser, 
    updateUser, 
    getById, 
    deleteUser
} = require('../controllers/users')

const {
    postRequestValidations,
    putRequestValidations,
    getRequestByIdValidations,
    deleteRequestValidations,
    getAllRequestValidations
} = require('../middlewares/users')

const router = Router()

router.get('/', getAllRequestValidations, getAllUsers)
router.post('/', postRequestValidations, createUser)
router.put('/:id', putRequestValidations, updateUser)
router.get('/:id', getRequestByIdValidations, getById)
router.delete('/:id', deleteRequestValidations, deleteUser)

module.exports = router