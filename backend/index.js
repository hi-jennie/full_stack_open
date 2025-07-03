

const express = require('express')
const app = express();
app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

//  Express 会自动帮你把 JS 对象或数组转成 JSON 字符串！
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const notes = notes.filter(note => note.id !== id)
    response.status(204).end();
})

const generatedId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body;
    console.log(body)
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    // To be exact, when the important property is false, then the body.important || false expression will in fact return the false from the right-hand side...
    const newNote = {
        content: body.content,
        important: body.important || false,
        id: generatedId()
    }

    notes = notes.concat(newNote)
    response.json(newNote)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



// const http = require('http');
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'contentType': 'application/json' })
//     response.end(JSON.stringify(notes))
// })