import Apartment from '../models/apartment.js'
import Category from '../models/category.js'
import owner from '../models/owner.js'
import City from '../models/city.js'
import apartment from '../models/apartment.js'
// הדירות כל הדירות
export const getAll = (req, res) => {
    Apartment.find()
    .populate('codeCategory')
    .populate('codeCity')
   .populate('codeOwner')
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפה לפי קוד דירה
export const getById = (req, res) => {
    Apartment.findById(req.params.id)
    .populate('codeCategory')
    .populate('codeCity')
   .populate('codeOwner')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפה לפי תנאי מסוים
//גדולה מ3 וקטנה מ20  שליפה לפי כמות מיטות
export const getNumBeds = (req, res) => {
    Apartment.find()
        .where({
            // $and: [
            numBeds: { $gt: req.params.numBeds}
            // { numBeds: { $lte: 20 } }
            // ]
        })
        .then(apartments => {
            // let list = products.filter(p => p.price > 15)
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת כל הדירות שמחירם בין 400 ל10000
export const getPrice = (req, res) => {
    Apartment.find() 
        .where({
            price: { $gt: req.params.price }
            // $and: [
            //     { price: { $gt: 400 } },
            //     { price: { $lte: 1000 } }
            // ]
        })                           
        .then(apartments => {                              
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// הוספת דירה
export const create = (req, res) => {
    const { nameApart,description,pic,codeCategory,codeCity,addres,numBeds,options,price,codeOwner } = req.body

    const p = new Apartment({
        nameApart,description,pic,codeCategory,codeCity,addres,numBeds,options,price,codeOwner
    })
console.log(p);

    p.save()
        .then(async apartment => {
            let x = await City.findByIdAndUpdate(apartment.codeCity, { $push: { apartments: apartment._id } })
            let y = await owner.findByIdAndUpdate(apartment.codeOwner, { $push: { apartmens: apartment._id } })
            let z = await Category.findByIdAndUpdate(apartment.codeCategory, { $push: { apartments: apartment._id } })
            if (!x) {
                return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update city failed!` })
            }

            if (!y) {
                return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update owner failed!` })
            }

            if (!z) {
                return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update owner failed!` })
            }
            return res.status(200).send({ message: `create apartment ${apartment._id} succeed!` })

        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
        }


        // עידכון של דירה
        export const update = (req, res) => {
            // alert("update")
            const { _id } = req.body
        
            if (_id) {           
                return res.status(403).send({ error: `update id is forbidden!` })
            }
        
            const { id } = req.params
        
            
            Apartment.findByIdAndUpdate(id, req.body) 
            
                // האובייקט שנשלח כתשובה - לפני השינוי
                .then(async apartment => {
                    // העדכון הצליח
                    // בדיקה האם עדכנו את הקטגוריה - האם היא נשלחה בגוף הבקשה
                    // מחיקת קוד הכתבה מהקטגוריה הישנה
                    // הוספת קוד הכתבה לקטגוריה החדשה
                    const { codeCategory } = req.body
                    const { codeCity} = req.body 

                    if (codeCategory && codeCategory!=apartment.codeCategory) {
                        // article.category - החזרנו את האובייקט לפני שהשינוי- הקטגוריה הישנה
                        let x = await Category.findByIdAndUpdate(apartment.codeCategory, { $pull: { apartments: apartment._id } })
                        // category - נשלח בגוף הבקשה - חדשה
                        let y = await Category.findByIdAndUpdate(codeCategory, { $push: { apartments: apartment._id } })  
                        if (!x || !y) {
                            return res.status(200).send({ message: `update apartment ${apartment._id} succeed!, upadte categories failed!` })
                        }
                    }

                    if (codeCity && codeCity!=apartment.codeCity) {
                        // article.category - החזרנו את האובייקט לפני שהשינוי- הקטגוריה הישנה
                        let x = await City.findByIdAndUpdate(apartment.codeCity, { $pull: { apartments: apartment._id } })
                        // City - נשלח בגוף הבקשה - חדשה
                        let y = await City.findByIdAndUpdate(codeCity, { $push: { apartments: apartment._id } })  
                        if (!x || !y) {
                            return res.status(200).send({ message: `update apartment ${apartment._id} succeed!, upadte categories failed!` })
                        }
                    }
                   
                    
                    return res.status(200).send({ message: `update apartment ${apartment._id} succeed!` })
                })
                .catch(err => {
                    res.status(500).send({ error: err.message })
                })
        
        
            // article.updateOne(req.body)
        
        }
      
                  
        export const remove = (req, res) => {
            Apartment.findByIdAndDelete(req.params.id)
                .then(async apartment => { 
                    if (!apartment) { 
                        return res.status(404).send({ error: `apartment not found!` })
                    }
                    let x = await Category.findByIdAndUpdate(apartment.codeCategory, { $pull: { apartments: apartment._id } })
                    if (!x) {
                        return res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update category failed!` })
                    }
                    res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
                })
                .catch(err => {
                    res.status(500).send({ error: err.message+"!!!" })
                })
        }
        
