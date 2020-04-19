const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb+srv://admin:1234Qwer@nd-test-j4ciw.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser: true})

async function seed() {
  const student = new User({
    login: "student",
    password: "sdemo",
    username: "Петя Петров",
    isTeacher: false
  })

  const teacher = new User({
    login: "teacher",
    password: "tdemo",
    username: "Иван Иванович Иванов",
    isTeacher: true
  })

  await student.save()
  await teacher.save()
}

seed().then(() => {
  console.log('OK');
  mongoose.connection.close();
})
