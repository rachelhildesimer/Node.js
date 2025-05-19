
// import express from 'express'
// import bodyParser from 'body-parser'
// import mongoose from 'mongoose'
// // npm i dotenv
// // התקנה של ספריית משתני סביבה
// import dotenv from 'dotenv'
// // npm i cors 
// // cors ספריה לפתרון בעיית ה 
// import cors from 'cors'
// // ייבוא של כל הניתובים של כל הטבלאות

// import apartmentRouter from './api/routers/apartment.js' 
// import categoryRouter from './api/routers/category.js'
// import cityRouter from './api/routers/city.js'
// import ownerRouter from './api/routers/owner.js'


// const port = 3003
// const app=express()

// // המנגנון שמכיר את משתני הסביבה לכל הפרויקט
// dotenv.config();
// app.use(bodyParser.json())
// app.use(cors())
 
// mongoose.connect(process.env.LOCAL_URI)
//     .then(() => {
//         console.log('connect to mongoDB! 👍😁');
//     })
//     .catch(err => {
//         console.log({ error: err.message });
//     })
    
// app.use('/apartment', apartmentRouter)
// app.use('/owner', ownerRouter)
// app.use('/city', cityRouter)
// app.use('/Category', categoryRouter)
// // app.use('/category', categoryRouter)


 
// app.listen(port, () => {
//     console.log(`my application is listening on http://localhost:${port}`);
// })

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// npm i dotenv
// התקנה של ספריית משתני סביבה
import dotenv from 'dotenv'
// npm i cors 
// cors ספריה לפתרון בעיית ה 
import cors from 'cors'
// ייבוא של כל הניתובים של כל הטבלאות

import apartmentRouter from './api/routers/apartment.js' 
import categoryRouter from './api/routers/category.js'
import cityRouter from './api/routers/city.js'
import ownerRouter from './api/routers/owner.js'


const port = 3003
const app=express()

// המנגנון שמכיר את משתני הסביבה לכל הפרויקט
dotenv.config();
app.use(bodyParser.json())
app.use(cors())
 
mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😁');
    })
    .catch(err => {
        console.log({ error: err.message });
    })
    
app.use('/apartment', apartmentRouter)
app.use('/owner', ownerRouter)
app.use('/city', cityRouter)
app.use('/Category', categoryRouter)
// app.use('/category', categoryRouter)


 
app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})
