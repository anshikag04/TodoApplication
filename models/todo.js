const mongoose = require('mongoose')

var todosSchema = mongoose.Schema({
    yourTodo : {
        type: String,
        required: true
    },
    isDone : {
        type : Boolean,
        required : true,
        default : false
    }
})
var todosModel = mongoose.model('todo', todosSchema)

module.exports = todosModel