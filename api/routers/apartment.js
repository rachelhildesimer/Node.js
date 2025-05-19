import express from 'express'
import {checkToken,categoryExists} from '../middlewares.js'
import {
    create,
    getAll,
    getById,
    remove,
    getPrice,
    getNumBeds,
    update,
    

} from '../controllers/apartment.js'

const router = express.Router()
   
router.get('', getAll)
router.get('/:id', getById) 
router.post('',checkToken,create)  
router.delete('/:id',checkToken, remove)
router.get('/getPrice/:price', getPrice)
router.get('/getNumBeds/:numBeds', getNumBeds)
// router.patch('/:id',checkToken, categoryExists, update)
     
// router.get('/getByCodeOwner/:id',getByCodeOwner)
router.patch('/:id',checkToken,update)


export default router; 