import express from 'express'

import {
    // create,
    getAll,
    // getById,
    // remove,
    create,
    getApartmentsById
} from '../controllers/city.js'
import { checkToken } from '../middlewares.js'
// import { getWeather } from '../controllers/weather.js'

const router = express.Router()

router.get('', getAll)
// router.get('/:id', getById)
// router.post('', create)
// router.delete('/:id', remove)
router.get('/get/:id', getApartmentsById)
router.post('',checkToken, create)
// router.get('/:city',getWeather)

      
export default router; 