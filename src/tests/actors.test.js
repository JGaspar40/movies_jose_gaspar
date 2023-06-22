const supertest = require('supertest') //otro nombre aparte de supertest es request
const app = require('../app')
require('../models')

let actorstId
test("POST -> '/api/v1/actors', should return status code 201", async()=>{
    const actors = {
        firstName: "Luis",
        lastName: "Gaspar",
        nationality: "peruano",
        image: "imagen1",
        birthday: "1982-05-02"
    }

    const res = await supertest(app)
        .post('/api/v1/actors')
        .send(actors)
   console.log(res.body)
    actorstId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actors.firstName)
})

test("GET -> '/api/v1/actors', should return status code 200", async()=>{

    const res = await supertest(app).get('/api/v1/actors')
    console.log(res.body)
    expect(res.status).toBe(200)
    // expect(res.body).toHaveLength(7)
  
})

test("GET One-> '/api/v1/actors', should return status code 200, and res.body.firstName should return 'jose' ", async()=>{

    const res = await supertest(app)
        .get(`/api/v1/actors/${actorstId}`)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Luis")
})

test("PUT -> '/api/v1/actors/:id' should return status 200 and res.body.firstName --- Student.firstName", async()=>{
    const actors = {
        firstName: "Jose",
        lastName: "Gaspar",
        nationality: "peruano",
        image: "imagen1",
        birthday: "05-02-1982"
    }

    const res = await supertest(app)
        .put(`/api/v1/actors/${actorstId}`)
        .send(actors)

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actors.firstName)
})

test("DELETE -> '/api/v1/actors/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${actorstId}`)
    expect(res.status).toBe(204)
})