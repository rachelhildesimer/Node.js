// import Apartment from '../models/apartment.js'
import Category from '../models/category.js'
// שליפת דירות לפי קוד קטגוריה
export const getApartmentById = (req, res) => {    
    Category.findById(req.params.id)
        .populate('apartments')
        .then(category => {
            res.status(200).send({ apartments: category.apartments })
            
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפה לפי קוד דירה
export const getById = (req, res) => {
    Apartment.findById(req.params.id)

        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
} 
// שליפה לפי קוד קטגוריה
export const getByCategoryCode = (req, res) => {    
    Category.findById(req.params.id)
    .populate('apartments') 
        .then(category => { 
            res.status(200).send({ apartments: category.apartments })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getAll = (req, res) => {
    Category.find()

        .then(list => { 
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    const { nameCategory, apartments } = req.body

    const p = new Category({
        nameCategory, apartments
    })

    p.save() 
        .then(category => {
            return res.status(200).send({ message: `create category ${category._id} succeed!` })
        }) 
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
}

 