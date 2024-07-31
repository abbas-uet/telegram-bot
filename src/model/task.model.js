const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: String,
    description: String,
    dueDate: Date,
    reminderSent: { type: Boolean, default: false }
});

module.exports = mongoose.model('task', taskSchema);
