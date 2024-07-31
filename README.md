# Telegram Task Manager Bot

This is a Telegram bot built using Node.js that allows users to manage tasks. Users can create, update, delete, and list tasks. Additionally, the bot sends reminders and daily summaries of tasks.

## Features

- User registration
- Create task
- Update task
- Delete task
- List tasks
- Send reminders for tasks due in 1 hour
- Send daily summary of tasks at 8 AM

## Prerequisites

- Node.js
- MongoDB

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/task-manager-bot.git
   cd task-manager-bot
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root of your project and add the necessary environment variables:

   ```env
   BOT_TOKEN=your_telegram_bot_token
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start MongoDB**:

   Ensure your MongoDB instance is running. If you're using a local MongoDB server, start it with:

   ```bash
   mongod
   ```

   If you're using MongoDB Atlas, make sure you've configured the connection string in your `.env` file.

5. **Run the Bot**:

   Start your bot by running the `index.js` file:

   ```bash
   node index.js
   ```

## Usage

1. **Register**:

   ```text
   /register
   ```

2. **Create Task**:

   ```text
   /create_task <task_description> <due_date>
   ```
   Example:

   ```text
   /create_task Finish the project report 2024-07-30T10:00:00Z
   ```

3. **Update Task**:

   ```text
   /update_task <task_id> <new_task_description> <new_due_date>
   ```
   Example:

   ```text
   /update_task 60d5f0e4f60b7d55d8e1a9c2 Update project report 2024-07-31T12:00:00Z
   ```

4. **Delete Task**:

   ```text
   /delete_task <task_id>
   ```
   Example:

   ```text
   /delete_task 60d5f0e4f60b7d55d8e1a9c2
   ```

5. **List Tasks**:

   ```text
   /list_tasks
   ```

## Project Structure

```
.
├── models
│   ├── task.js
│   └── user.js
├── services
│   ├── taskService.js
│   └── userService.js
├── .env
├── app.js
├── package.json
└── README.md
```
