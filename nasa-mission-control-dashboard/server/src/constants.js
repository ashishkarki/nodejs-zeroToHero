const URI_PATHS = {
  PLANETS: '/planets',
  LAUNCHES: '/launches',
}

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

const logger = (...messages) => {
  if (
    process.env.NODE_ENV !== 'prod' ||
    process.env.NODE_ENV !== 'production'
  ) {
    console.log(...messages)
  }
}

module.exports = {
  URI_PATHS,
  HTTP_STATUS_CODES,
  logger,
}
