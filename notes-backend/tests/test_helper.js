const Note = require('../models/note');

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

// if we want get a valid(to avoid validation errors) id but not existing in the database
const nonExistingId = async () => {
  // when create a new note, it will get a valid MongoDB ObjectId but hasn't been saved to the database
  const note = new Note({ content: 'willremovethissoon' });
  // then await saving it to the database
  await note.save();
  // then remove it from the database
  await note.deleteOne();
  // but the note itself still has the valid ObjectId cause it in the memory
  return note._id.toString();
};

const notesInDb = async () => {
  // Note.find({}) 返回的是数组，数组元素是 Mongoose 文档对象（带 _id、__v 等）。
  // that why we need to map them to JSON objects
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
