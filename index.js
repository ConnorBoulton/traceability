const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    Rollbar.info('html file success')
})

app.get('/css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles.css'))
})


const port = process.env.PORT || 4545

app.listen(port, () => console.log(`running on ${port}`))