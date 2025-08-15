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

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number is missing' })
    }
    Person.find({}).then(people => {
        const existingPerson = people.find(p => p.name.toUpperCase() === body.name.toUpperCase())
        if (existingPerson) {
            return response.status(400).json({
                error: 'name already existing'
            })
        }

        const newPerson = new Person({
            name: body.name,
            number: body.number
        })
        return newPerson.save()// 这里加return，继续链式调用
    }).then(result => {
        if (result) {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            response.json(result)  // 响应客户端
            // 注意：不要在这里关闭连接,不是每次请求完成后都要关数据库
        }
    }).catch(error => next(error))
})

// update phonebook entry for a person whose name is already in the phonebook
app.put('/api/persons/:id', (request, response) => {
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
app.use((error, req, res, next) => {
    console.error('Error message:', error.message); // 日志
    res.status(500).json({ error: error.message }); // 返回 JSON 错误
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



