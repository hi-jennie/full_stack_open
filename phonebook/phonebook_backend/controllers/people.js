const peopleRouter = require('express').Router()
const Person = require('../models/person') // 引入模型

// after extract the router from the index.js, all routes should use relative path.
// get all persons
peopleRouter.get('/', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

//  get single person through id
peopleRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).then(error => next(error))
})

// delete person through id
peopleRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(result => {
    if (result) {
      response.status(204).end() // delete successfully
    } else {
      response.status(404).json({ error: 'person not found' })
    }
  }).catch(error => next(error))
})



// const generatedId = () => {
//     const maxId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0
//     return String(maxId + 1);
// }

peopleRouter.post('/', (request, response, next) => {
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
peopleRouter.put('/:id', (request, response, next) => {
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


module.exports = peopleRouter