const express = require('express');
const useMiddleware = require('./middleware');
const dotenv = require('dotenv').config();
const path = require('path');
const publicPath = path.join(__dirname, 'public');

const app = express();
useMiddleware(app);

const usersRouter = require('./routes/users')
const questionsRouter = require('./routes/questions')

app.use('/users', usersRouter)
app.use('/questions', questionsRouter)

app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app
