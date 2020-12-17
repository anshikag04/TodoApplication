const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.urlencoded({extended: true}))
app.set('view engine' ,'ejs')
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () => console.log('MongoDB connected'),
    (reason) => console.log(reason)
)

const todosModel = require('./models/todo')

app.post('/addTodo', (req,res) => {
    var todo = req.body.todo
    new todosModel({yourTodo : todo}).save().then((createTodo) => {
        if(createTodo) {
        res.redirect('/')
        console.log("Todo Created.")
        }
    })
})
app.get('/', (req,res) => {
    todosModel.find().then((todos) => {
        if(todos) {
           res.render('index.ejs', {todos : todos})
        }
    })
})

app.post('/deleteTodo', (req,res) => {
    var todoID = req.body.todoID
    todosModel.findById(todoID).then(todo => {
        todo.delete().then((deletedTodo) => {
            if(deletedTodo) {
                res.redirect('/')
            }
        })
    })
})

app.post('/doneTodo', (req,res) => {
    var todoID = req.body.todoID
    todosModel.findById(todoID).then((todo) => {
        todo.isDone = true
        todo.save().then(updatedTodo => {
            if(updatedTodo) {
                res.redirect('/')
            }
        })
    })
})
app.listen(3000, () => {
    console.log("We are listening to you!")
})

