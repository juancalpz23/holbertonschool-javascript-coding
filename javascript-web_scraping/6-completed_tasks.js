#!/usr/bin/node
const request = require('request');

// Check if the URL argument is provided
if (process.argv.length !== 3) {
  console.error('Usage: node compute_completed_tasks.js <API_URL>');
  process.exit(1);
}

const apiUrl = process.argv[2];

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    process.exit(1);
  }

  const todos = JSON.parse(body);
  const completedTasks = {};

  todos.forEach(todo => {
    if (todo.completed) {
      if (!completedTasks[todo.userId]) {
        completedTasks[todo.userId] = 0;
      }
      completedTasks[todo.userId]++;
    }
  });

  for (const userId in completedTasks) {
    console.log(`User ${userId} has completed ${completedTasks[userId]} tasks`);
  }
});
