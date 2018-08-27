const throng = require('throng')

const PORT = process.env.PORT || 3000
const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start)

function start () {
  require('dotenv').config()
  const express = require('express')
  const cors = require('cors')
  const bodyParser = require('body-parser')
  const path = require('path')

  // Initialize the app
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../webpack/build/')))
    app.get('*', function response (req, res) {
      res.sendFile(path.join(__dirname, '../../webpack/build/index.html'))
    })
  }

  // Start the server
  app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT)
  })
}
