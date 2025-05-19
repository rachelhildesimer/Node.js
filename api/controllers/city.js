import City from '../models/city.js'

// שליפה דירה לפי קוד עיר
// ??
export const getApartmentsById = (req, res) => {
    City.findById(req.params.id)
        .populate('apartments')
        .then(city => {
            res.status(200).send({ apartments: city.apartments })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    const { nameCity, apartmens } = req.body

    const p = new City({
        nameCity, apartmens
    })

    p.save()
        .then(city => {
            return res.status(200).send({ message: `create city ${city._id} succeed!` })
        }) 
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
}


export const getAll = (req, res) => {
    City.find() 

        .then(list => { 
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


