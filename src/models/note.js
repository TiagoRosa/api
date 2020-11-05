const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content:{
    type: String,
    require: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    require: true
  },
},
{
  timestamps:true
}
);
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;