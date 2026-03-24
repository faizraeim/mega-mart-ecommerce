import express from 'express';
import products from '../data/products.json'

const app = express()
const PORT = process.env.PORT || 3000;

const mockData = [
    { id: 1, name: "Faiz", role: "CTO" },
    { id: 2, name: "Rhman", role: "Manager" },
    { id: 3, name: "Zamzam", role: "Sales" }
]

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

app.use(express.json())

app.get("/", (request, response) => {
    response.status(200).send("Welcome")
})

app.get("/api/users", (request, response) => {
    console.log(request.query)
    const {query: {filter, value}} = request;

    if(!filter && !value) return response.send(mockData)
    if(filter && value) return response.send(mockData.filter((user)=> user[filter].includes(value)))
    // response.send(mockData)
})

app.post("/api/users", (request, response)=>{
    console.log(request.body)
    const {body} = request;
    const newUser = {id: mockData[mockData.length -1].id + 1, ...body}
    mockData.push(newUser)
    return response.send(newUser)
})
// console.log(mockData.length)

app.get("/api/users/:id", (request, response) => {
    console.log(request.params)
    const parsedID = parseInt(request.params.id)
    if (isNaN(parsedID))
        return response.status(400).send({ msg: "Bad requestuest, invalid ID" });
    const findUser = mockData.find((user) => user.id === parsedID);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser)
})
