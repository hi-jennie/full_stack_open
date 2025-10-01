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
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
