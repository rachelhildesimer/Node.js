// יבוא של המודל

import Article from '../models/users.js'

export const getAll = (req, res) => {
    // שליפה כל המאמרים
    // find - שליפה של הכל
    // מחזירה מערך של כל האובייקטים באוסף
    Users.find()
        // בעת הצלחה
        // הפרמטר שמתקבל בפונקציה הפנימית זה הנתונים שחזרו מהמסד
        .then(list => {
            res.status(200).send({ articles: list })
        })
        // בעת כשלון
        // הפרמטר שמתקבל בפונקציה הפנימית זה אובייקט שמכיל נתונים על השגיאה
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    // שליפת מאמר לפי קוד
    // findById - שליפה לפי קוד של מפתח ראשי
    // מחזירה אובייקט ג'סון בודד
    Article.findById(req.params.id)
        .then(article => {
            res.status(200).send({ article })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    // יצירת מאמר חדש
    const newuser = new Users(req.body)

    newuser.save()
        .then(article => {
            res.status(200).send({ message: `create article ${article._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {

    Users.findByIdAndDelete(req.params.id)
        .then(article => {
            res.status(200).send({ message: `delete article ${article._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}