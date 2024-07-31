require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const cron = require('node-cron');
const {
    createTask,
    updateTask,
    deleteTask,
    listTasks,
    findTasksDueBefore
} = require('./src/services/task.service');

// Initialize bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  console.log('Database Connected');
});

// In-memory store for registered users
const users = new Set();

// Register user
bot.onText(/\/register/, (msg) => {
    users.add(msg.chat.id);
    bot.sendMessage(msg.chat.id, 'You have been registered!');
});

// Create task
bot.onText(/\/create_task (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (!users.has(chatId)) return bot.sendMessage(chatId, 'Please register first using /register');

    const [description, dueDate] = match.slice(1);
    const task = await createTask(chatId, description, new Date(dueDate));
    bot.sendMessage(chatId, `Task created: ${task.description} (Due: ${task.dueDate})`);
});

// Update task
bot.onText(/\/update_task (\w+) (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (!users.has(chatId)) return bot.sendMessage(chatId, 'Please register first using /register');

    const [taskId, description, dueDate] = match.slice(1);
    const task = await updateTask(taskId, description, new Date(dueDate));
    bot.sendMessage(chatId, `Task updated: ${task.description} (Due: ${task.dueDate})`);
});

// Delete task
bot.onText(/\/delete_task (\w+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (!users.has(chatId)) return bot.sendMessage(chatId, 'Please register first using /register');

    const taskId = match[1];
    await deleteTask(taskId);
    bot.sendMessage(chatId, 'Task deleted');
});

// List tasks
bot.onText(/\/list_tasks/, async (msg) => {
    const chatId = msg.chat.id;
    if (!users.has(chatId)) return bot.sendMessage(chatId, 'Please register first using /register');

    const tasks = await listTasks(chatId);
    const taskList = tasks.map(task => `${task._id}: ${task.description} (Due: ${task.dueDate})`).join('\n');
    bot.sendMessage(chatId, `Your tasks:\n${taskList}`);
});

cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await findTasksDueBefore(reminderTime);

    tasks.forEach(async (task) => {
        bot.sendMessage(task.userId, `Reminder: Your task "${task.description}" is due in 1 hour!`);
        task.reminderSent = true;
        await task.save();
    });
});
