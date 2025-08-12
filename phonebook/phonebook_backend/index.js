require('dotenv').config()
const express = require('express');

const cors = require('cors')
const morgan = require('morgan')
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://jenniewang2024:${password}@cluster0.4bjnssi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // 把 _id 改成 id（字符串）
        returnedObject.id = returnedObject._id.toString()
        // 删除 _id 和 __v
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// define a token called body, the return value of the callback function will be assigned to the body token
morgan.token('body', (request) => {
    return request.method === 'POST' ? JSON.stringify(request.body) : ""
})
// the  parameter in morgan defines the format of the log
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

// //  get single person through id
// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id);
//     const targetPerson = persons.find(p => Number(p.id) === id)
//     if (targetPerson) {
//         response.json(targetPerson);
//     } else {
//         response.status(404).end();
//     }
// })

// // delete person through id
// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id;
//     const deletedPerson = persons.find(p => p.id === id)
//     if (deletedPerson) {
//         persons = persons.filter(p => p.id !== id)
//         response.status(204).end()
//     } else {
//         response.status(404).end()
//     }
// })

// app.get('/api/info', (request, response) => {
//     const time = new Date();
//     response.send(`Phonebook has info for ${persons.length} people<br>${time}`)
// })

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
    }).catch(error => {
        console.error(error)
        response.status(500).json({ error: 'server error' })
    })
})


mongoose.connect(url)
    .then(() => {
        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(err => {
        console.error('error connecting to MongoDB:', err.message)
    })

