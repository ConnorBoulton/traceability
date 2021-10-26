const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'c082d4da82ba456da5d5472a0d30d9ec',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    rollbar.info('html file success')
})

app.get('/css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles.css'))
})

app.get('/', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
        console.error(error);
      }
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.use(rollbar.errorHandler())


const port = process.env.PORT || 4545

app.listen(port, () => console.log(`running on ${port}`))