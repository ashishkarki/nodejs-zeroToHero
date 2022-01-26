const request = require('supertest')
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const { URI_PATHS } = require('../../constants')

// jest.useRealTimers()
jest.setTimeout(30000)

describe('launches API Testing...', () => {
  beforeAll(async () => {
    mongoConnect()
  })

  describe('Test GET /launches', () => {
    test('should respond with 200 success', async () => {
      const response = await request(app).get(URI_PATHS.LAUNCHES)

      const expectedStatus = 200
      const actualStatus = response.statusCode

      expect(actualStatus).toBe(expectedStatus)
    })

    // supertest way of doing the same thing from above
    test('should respond with 200 success supertest way', async () => {
      await request(app)
        .get(URI_PATHS.LAUNCHES)
        .expect(200)
        .expect('Content-Type', /json/)
    })
  })

  describe('Test POST /launch', () => {
    const dummyLaunchWithoutDate = {
      mission: 'Kepler Explorer',
      rocket: 'Explorer IS1',
      destination: 'Kepler-452 b',
    }
    const dummyLaunchFullData = {
      ...dummyLaunchWithoutDate,
      launchDate: 'Dec 30, 2099',
    }

    test('should respond with 201 success', async () => {
      const response = await request(app)
        .post(URI_PATHS.LAUNCHES)
        .send(dummyLaunchFullData)
        .expect('Content-Type', /json/)
        .expect(201)

      expect(response.body).toMatchObject(dummyLaunchWithoutDate)

      // convert dates to match them
      const reqDate = new Date(dummyLaunchFullData.launchDate).valueOf()
      const respDate = new Date(response.body.launchDate).valueOf()

      expect(reqDate).toBe(respDate)
    })

    test('should catch missing required props', async () => {
      const response = await request(app)
        .post(URI_PATHS.LAUNCHES)
        .send(dummyLaunchWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body).toStrictEqual({ error: 'Missing required fields.' })
    })

    test('should catch invalid dates', async () => {
      const response = await request(app)
        .post(URI_PATHS.LAUNCHES)
        .send({
          ...dummyLaunchWithoutDate,
          launchDate: 'Non-date string',
        })
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body).toStrictEqual({ error: 'Invalid launch date.' })
    })
  })

  afterAll(async () => {
    await mongoDisconnect()
  })
})
