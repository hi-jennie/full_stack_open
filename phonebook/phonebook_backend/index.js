require('dotenv').config()
const express = require('express');

const cors = require('cors')
const morgan = require('morgan')
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
const Person = require('./models/person') // 引入模型

// define a token called body, the return value of the callback function will be assigned to the body token
morgan.token('body', (request) => {
    return request.method === 'POST' ? JSON.stringify(request.body) : ""
})
// the  parameter in morgan defines the format of the log
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/info', (request, response) => {
    const time = new Date();
    response.send("THIS IS YOUR PHONEBOOK")
})

// get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

//  get single person through id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).then(error => next(error))
})

// delete person through id
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(result => {
        if (result) {
            response.status(204).end() // delete successfully
        } else {
            res.status(404).json({ error: 'person not found' })
        }
    }).catch(error => next(error))
})



// const generatedId = () => {
//     const maxId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0
//     return String(maxId + 1);
// }

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body
    const newPerson = new Person({
        name: name,
        number: number
    })
    newPerson.save().then(result => {
        if (result) {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            response.json(result)  // 响应客户端
            // 注意：不要在这里关闭连接,不是每次请求完成后都要关数据库
        }
    }).catch(error => next(error))
})

// update phonebook entry for a person whose name is already in the phonebook
app.put('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (!person) {
            return response.status(404).end()
        }
        person.name = request.body.name
        person.number = request.body.number
        return person.save()
    }).then(updatedPerson => {
        console.log(updatedPerson)
        response.json(updatedPerson)
    }).catch(error => next(error))
})

//when call next(err) , this code down below will be executed
// In Express, any middleware with 4 parameters (error, req, res, next) is recognized as an error-handling middleware.
// CastError usually happens in Mongoose when you try to query MongoDB with an invalid ObjectId (e.g., 123abc).
// ValidationError is a Mongoose error when saving a document fails validation (e.g., required field missing, string doesn’t match a pattern, etc.).
app.use((error, req, res, next) => {
    console.error(1 + error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



