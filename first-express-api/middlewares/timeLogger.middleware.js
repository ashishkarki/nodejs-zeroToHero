function timeLoggerMiddleware(
  req,
  res,
  next,
  label = `my-logger-${Math.random()}`,
) {
  const start = Date.now()
  console.time(label)

  console.log(`method: ${req.method} - url: ${req.url} for ${label}`)
  next()

  const end = Date.now()
  console.timeEnd(label)
  console.log(`time spent for ${label}: ${end - start}ms`)
}

module.exports = timeLoggerMiddleware
