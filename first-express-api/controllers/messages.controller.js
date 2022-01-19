function getMessages(req, res) {
  res
    .status(200)
    .send(
      '<ul><li>First Express API is working correctly...</li><li>Second Express API is working correctly...</li></ul>',
    )
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
