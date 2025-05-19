import express from 'express'

import {
    create,
    getAll,
    getApartmentById,
} from '../controllers/category.js'
import { checkToken } from '../middlewares.js'

const router = express.Router()

router.get('', getAll)
router.get('/get/:id', getApartmentById)
router.post('',checkToken,create)


export default router; 