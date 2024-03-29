const Note = require('../models/noteModel');

const createNote = async (note) => {
  const { title, body, createdAt, lastEdit } = note;
  const n = await Note.create({
    title: title,
    body: body,
    createdAt: createdAt,
    lastEdit: lastEdit
  });
  return n;
};
const deleteNote = async (id) => {
  await Note.findByIdAndDelete(id);
};
const updateNote = async (id, newNote) => {
  const { text, lastEdit } = newNote;
  return await Note.findByIdAndUpdate(id, { text: text, lastEdit: lastEdit });
};

module.exports = {
  createNote,
  updateNote,
  deleteNote
};
