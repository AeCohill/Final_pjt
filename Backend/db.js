// Creates the database connection from MongoDB Atlas to our Backend - Neftali

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sdev_finalpjt:finalpjt2025@final-pjt.fltqk.mongodb.net/?retryWrites=true&w=majority&appName=final-pjt',{useNewURLParser: true})

module.exports = mongoose