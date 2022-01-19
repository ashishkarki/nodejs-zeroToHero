const http = require('http')

const PORT = 3000

const { people, URI_PREFIX } = require('./constants')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)
  const urlItems = req.url.split('/')
  console.log(`urlItems: ${urlItems}`)
  // /person/1 => ['', 'person', '1']

  //   if (req.url === '/person') {
  if (req.method === 'GET') {
    if (urlItems[1] === URI_PREFIX) {
      res.writeHead(200, { 'Content-Type': 'application/json' })

      if (urlItems.length === 3 && Number(urlItems[2]) <= people.length) {
        const person = people[Number(urlItems[2])]
        res.end(JSON.stringify(person))
      } else {
        res.end(JSON.stringify(people))
      }
    } else if (urlItems[1] === 'tagline') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')

      res.write('<html><body><h1>Hello Tagline</h1></body></html>')

      res.end()
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')

      res.write('<html><body><h1>Page not found</h1></body></html>')

      res.end()
    }
  } else if (req.method === 'POST') {
    if (urlItems[1] === URI_PREFIX) {
      req.on('data', (data) => {
        const person = JSON.parse(data)
        people.push(person)

        // res.statusCode = 201
        // res.setHeader('Content-Type', 'text/html')
        // res.write('<html><body><h1>Person added</h1></body></html>')

        // res.end()

        // instead of above we can just pipe req to response
        req.pipe(res)
      })
    }
  } else if (req.method === 'PUT') {
  } else if (req.method === 'DELETE') {
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
