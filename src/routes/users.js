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
     getByIdValidations,
     deleteValidations
} = require('../middlewares/users')

const router = Router()

router.get('/', getAllUsers)
router.post('/', postRequestValidations, createUser)
router.put('/:id', putRequestValidations, updateUser)
router.get('/:id', getByIdValidations, getById)
router.delete('/:id', deleteValidations, deleteUser)

module.exports = router