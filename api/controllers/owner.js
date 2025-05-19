// שליפה לפי קוד מפרסם
import Owner from '../models/owner.js'
import jwt from 'jsonwebtoken'
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

// const Admin = require("../models/admin")
// const User = require('../models/user')

// const nodemailer = require('nodemailer')

// const jwt = require('jsonwebtoken')

// const dotenv = require('dotenv')
// dotenv.config()
// שליפת דירות לפי קוד מפרסם יהי מאופשר רק למפרסמים מחוברים
export const getApartmentsById = (req, res) => {
    Owner.findById(req.params.id)
        .populate('owners')
        .then(owner => { 
            res.status(200).send({ apartments: owner.apartments })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}          
// כניסה - signin
// get 
export const login = (req, res) => {
    // שליפה לפי שם מפתח
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ error: `email and password are required!` })
    }

    Owner.find()
        // חיפוש לפי אימייל
        .where({ email: { $eq: email } })
        .then(async users => {
            // לא נמצאו משתמשים מתאימים
            if (users.length == 0) {
                console.log('email not found!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            // מערך - שליפה לפי מיקום
            let [user] = users

            // הסימה לא תואמת
            if (user.password !== password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match!` })
            }
            // יצירת טוקן:
            // מקבלת שלשה פרמטרים:
            // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
            // 2. מחרוזת יחודית למערכת
            // 3. אובייקט אפשרויות - לא חובה
            const token = await jwt.sign(
                { username: user.phone, email },
                process.env.SECRET,
                {
                    // ניתן להגדיר תוקף לטוקן
                    // expiresIn: '1hr' // hours
                    // expiresIn: '1d', // days
                    expiresIn: '10m', // minutes
                    // expiresIn: '20ms', // mili seconds
                    // expiresIn: '10s', // second
                    // expiresIn: '3 months', 
                }
            )   

            // המשתמש נמצא - נשלח חזרה לצד לקוח
            // res.status(200).send({ user, token });
            
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "estiwinkler207@gmail.com",
                        pass: "MandE207"
                    }
                });
                console.log(transporter);
                
                const mailOptions = {
                    from: "estiwinkler207@gmail.com",
                    to: '0504104126zh@gmail.com',
                    subject: `Hi, ${user.name}`,
                    html: '<h1>Hello</h1>'
                };
                console.log(mailOptions);
                
                // await transporter.sendMail(mailOptions);
                res.status(200).send({ user, token });

            } catch (error) {
                console.log("Error sending email:", error);
                res.status(500).send({ error: 'Error sending email' });
            }

        })
        .catch(err => {
            console.log("!!!");
            res.status(500).send({ error: err.message });
        });
};

// הרשמה - signup
// post 
export const register = (req, res) => {

    const { phone, email, password,moreTelephone } = req.body

    Owner.find()
        .where({ email: { $eq: email } })
        .then(users => {
            if (users.length > 0) {
                return res.status(400).send({ error: 'email has been exists already!' })
            }
            const newUser = new Owner({
                phone,
                email,
                password,
                moreTelephone 
            })

            newUser.save()
                .then(async user => {
                    // יצירת טוקן:
                    // מקבלת שלשה פרמטרים:
                    // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
                    // 2. מחרוזת יחודית למערכת
                    // 3. אובייקט אפשרויות - לא חובה
                    const token = await jwt.sign(
                        { username: user.phone, email },
                        process.env.SECRET,
                        {
                            // ניתן להגדיר תוקף לטוקן
                            // expiresIn: '1hr' // hours
                            // expiresIn: '1d', // days
                            expiresIn: '10m', // minutes
                            // expiresIn: '20ms', // mili seconds
                            // expiresIn: '10s', // second
                            // expiresIn: '3 months', 
                        }
                    )
                    return res.status(200).send({ user, token })
                })
                .catch(err => {
                    return res.status(500).send({ error: err.message })
                })
        })
}

  export const getByCodeOwner = (req, res) => {   
    
            Owner.findById(req.params.id)
            .populate('apartmens')
                .then(a => { 
                    res.status(200).send({ a :a.apartmens})
                })
                .catch(err => {
                    res.status(500).send({ error: err.message })
                })
        }