const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRoute = require('./routes/api')
const BASE_DIR = './'

app.use(express.static(BASE_DIR + 'public/')); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(apiRoute)

//Homepage route
app.get('/', (req, res) => {
    res.render("home")
})

// Apis
app.get("/api", (req,res) => {
    res.render("api.ejs");
})


// Features
app.get("/features", (req,res) => {
    res.render("features.ejs");
})

// Documentation
app.get("/documentation", (req,res) => {
    res.render("doc.ejs");
})

// pricing
app.get("/pricing", (req,res) => {
    res.render("pricing.ejs");
})

// Developemnts
app.get("/developments", (req,res) => {
    res.render("dev.ejs");
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running at port ${port}`))