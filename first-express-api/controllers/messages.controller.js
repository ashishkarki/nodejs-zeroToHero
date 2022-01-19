const path = require('path')

function getMessages(req, res) {
  const imgPath = path.join(
    __dirname,
    '..',
    'public',
    'images',
    'cricket-stumps-batsman.jpg',
  )
  res.sendFile(imgPath)

  // res
  //   .status(200)
  //   .send(
  //     '<ul><li>First Express API is working correctly...</li><li>Second Express API is working correctly...</li></ul>',
  //   )
}

function postMessage(req, res) {
  const message = req.body
  console.log(`Adding message: ${message.text}`)
  res.status(201).json(message)
}

module.exports = {
  getMessages,
  postMessage,
}
