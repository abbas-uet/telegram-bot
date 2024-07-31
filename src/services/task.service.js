const Task = require('../model/task.model');

const createTask = async (userId, description, dueDate) => {
    const task = new Task({ userId, description, dueDate });
    return task.save();
};

const updateTask = async (taskId, description, dueDate) => {
    return Task.findByIdAndUpdate(taskId, { description, dueDate }, { new: true });
};

const deleteTask = async (taskId) => {
    return Task.findByIdAndDelete(taskId);
};

const listTasks = async (userId) => {
    return Task.find({ userId });
};

const findTasksDueBefore = async (dueDate) => {
    return Task.find({ dueDate: { $lte: dueDate }, reminderSent: false });
};

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    listTasks,
    findTasksDueBefore
};
