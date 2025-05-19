import jwt from "jsonwebtoken"
import Category from "./models/category.js"

// מידלוור כללי
// אין לו הגדרת ניתוב
// בהגדרת קריאת שרת שתרצה להשתמש בו - נשלח אליו
export const checkEmail = (req, res, next) => {
    const { email } = req.body
    if (email && email.contains('@')) {
        return next()
    }
    res.status(400).send({ error: 'invalid email!' })
}

export const categoryExists = (req, res, next) => { 

    const { codeCategory } = req.body
     
    if (!codeCategory && req.method == 'PATCH') {
        return next()
    }
   
    Category.findById(codeCategory)
        .then(codeCategory => {
            if (!codeCategory) {
                return res.status(404).send({ error: `catgory not found!` })
            }
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

// בדיקה האם נשלח טוקן והאם הוא תקין ותקף
// פונקציה שבודקת האם אני מחוברת 
export const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        // אין הרשאה
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // האימות נכשל
            return res.status(401).send({ error: 'Authentication failed!' })
        }
        if (decoded) {
            // האובייקט יכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // באם יהיה צורך נוכל לשמור אותם באובייקט הבקשה ואז להשתמש בפונקציות הבאות
            next()
        }
    })

}
