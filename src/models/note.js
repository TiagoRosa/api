const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content:{
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
},
{
  timestamps:true
}
);
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;