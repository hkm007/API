const app = require('express')()
const bodyParser = require('body-parser')
const apiRoute = require('./routes/api')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(apiRoute)

app.listen(5000, () => console.log("Server running on port 5000"))