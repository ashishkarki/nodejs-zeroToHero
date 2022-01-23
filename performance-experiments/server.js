const express = require('express')
// const cluster = require('cluster')
// const os = require('os')

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

  res.send('Hello World of Performance! with proces id: ${process.pid}')
})

app.get('/timers', (req, res) => {
  delay(9000)
  res.send(`Tring Tring..Timer/s done with process id: ${process.pid}`)
})

// if using pm2, clustering is built in, so no need to check isMaster etc
// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`)

//   const NUM_LOGICAL_CPUS = os.cpus().length

//   for (let i = 0; i < NUM_LOGICAL_CPUS; i++) {
//     cluster.fork()
//   }
//   //   cluster.fork()
//   //   cluster.fork()
// } else {
// const workerId = cluster.worker.id
// console.log(`Worker ${process.pid} is running`)

app.listen(3000, () => {
  console.log('Worker  listening on port 3000')
})
// }
