const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema(
{
    tittle: String,
    status: Boolean
});

module.exports = mongoose.model('Task', Task);