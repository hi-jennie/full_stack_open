const assert = require('node:assert');
const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const helper = require('./test_helper');
const Note = require('../models/note');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();

  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map((e) => e.content);
  assert(contents.includes('HTML is easy'));
});

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  assert(contents.includes('async/await simplifies making async calls'));
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
});

// viewing a specific note
test('a specific note can be viewed', async () => {
  // get all notes from the database
  const notesAtStart = await helper.notesInDb();
  // pick the first note
  const noteToView = notesAtStart[0];

  // make an api call to get that specific note
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.deepStrictEqual(resultNote.body, noteToView);
});

// delete a note
test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  const contents = notesAtEnd.map((n) => n.content);
  assert(!contents.includes(noteToDelete.content));

  // 测试应该基于「预期初始状态」去断言，而不是依赖「测试运行时的临时状态」。
  // this is why we should use helper.initialNotes.length but not notesAtStart.length
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
