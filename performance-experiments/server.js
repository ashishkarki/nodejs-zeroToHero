const express = require('express')

const app = express()

function delay(ms) {
  const startTime = Date.now()
  while (Date.now() - startTime < ms) {
    // event loop is blocked since this is neither
    // a file or network IO operation which can be
    // delegate to the JS threadpool or even the OS
  }
}

app.get('/', (req, res) => {
  // another example of blocking function is JSON.stringify/parse
  // JSON.stringify({})
  // JSON.parse({})

  // another example is Array operations like sorting
  // [1, 2, 3].sort()

  // another example is the operations in the node/crypto module

  res.send('Hello World of Performance!')
})

app.get('/timers', (req, res) => {
  delay(9000)
  res.send(`Tring Tring..Timer/s done`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
