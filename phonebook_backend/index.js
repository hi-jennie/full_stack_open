
const express = require('express');
const app = express();
app.use(express.json())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// get all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//  get single person through id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const targetPerson = persons.find(p => Number(p.id) === id)
    if (targetPerson) {
        response.json(targetPerson);
    } else {
        response.status(404).end();
    }
})

// delete person through id
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const deletedPerson = persons.find(p => p.id === id)
    if (deletedPerson) {
        persons = persons.filter(p => p.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
    const time = new Date();
    response.send(`Phonebook has info for ${persons.length} people<br>${time}`)
})

const generatedId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0
    return String(maxId + 1);
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number is missing' })
    }
    const existingPerson = persons.find(p => p.name.toUpperCase() === body.name.toUpperCase())
    if (existingPerson) {
        return response.status(400).json({
            error: 'name already existing'
        })
    }

    const newPerson = {
        id: generatedId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson);
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})