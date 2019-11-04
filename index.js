const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var hashmap = {}
var hourly_fee = 10

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('index.html', {root: path.join(__dirname, 'views')}))
  .get('/park/:id/:time', (req, res) => {
      // Check if the hashmap has the current user id
      if (!hashmap.hasOwnProperty(req.params.id)) {
          // If not add it
          hashmap[req.params.id] = []
      }

      // Updates map with new entry
      hashmap[req.params.id].push(req.params.time)

      // Check the number of entries associated with the current user
      if (hashmap[req.params.id].length % 2 == 1) {
          // If odd number of entries the user is entering the parking lot, just acknowledge the info
          res.send(`${req.params.id}-ack`)
      } else {
          // If even number user is leaving the parking lot, answer with the price paid
          previous_time = hashmap[req.params.id][hashmap[req.params.id].length - 2]
          current_time_seconds = new Date(req.params.time).getTime() / 1000
          previous_time_seconds = new Date(previous_time).getTime() / 1000

          seconds_elapsed = current_time_seconds - previous_time_seconds
          value = hourly_fee * seconds_elapsed / 3600
          res.send(`${req.params.id}-${value}`)
      }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
