import express from 'express'

import {
    register,
    login,
    // // create,
    // getAll,
    // getById,
    // remove,
    getApartmentsById,
    getByCodeOwner
} from '../controllers/owner.js'
import { checkToken } from '../middlewares.js'

const router = express.Router()

router.post('/login', login) 
router.get('/getApartmentsById/:id', getApartmentsById)
router.post('/register', register) 

router.get('/getByCodeOwner/:id',checkToken,getByCodeOwner)
       
export default router;