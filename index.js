const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('index.html', {root: path.join(__dirname, 'views')}))
  .get('/test_parking', (req, res) => res.send('server_response'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
