const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://jenniewang2024:${password}@cluster0.4bjnssi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
})
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // 把 _id 改成 id（字符串）
        returnedObject.id = returnedObject._id.toString()
        // 删除 _id 和 __v
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)

// 这个相当于定义了一个类，根据personSchema确定了这个类的结构，方便后面的实例化
// 这里的第一个参数 'person' 是模型名称（model name），Mongoose 会自动帮你：
// 	把模型名称转成小写复数形式，
// 	用这个复数形式作为 MongoDB 中集合（collection）的名字。
// 'person' → 自动变成复数形式 → 'people'
// 数据保存时就会存入 people 这个集合（collection）里。
// const Person = mongoose.model('person', personSchema)

// 创建实例
// if (process.argv[3] && process.argv[4]) {
//     const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4]
//     })
//     // save 实例到数据库
//     person.save().then(result => {
//         console.log(`added ${result.name} number ${result.number} to phonebook`)
//         mongoose.connection.close()
//     })
// } else {
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })
// }




