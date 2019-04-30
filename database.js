'use strict';

// This is our in-memory database!
// It is not as advanced as Redis (https://redis.io)
// but enough to do the trick for our example.
// To make this database persistent, you need to 
// make sure that everytime something is written in
// the todos object, a copy is written to a file
// using fs.
// 
// Additionally, each time the program starts, you
// should read the file and populate the todos object.

// Finally, think about what happens the first time that
// the program runs and there might not be any file on 
// your hard drive to read.
function Database() {
    this.todos = {};
    this.getTodos = () => {
        return this.todos;
    };
    this.addTodo = (id, todo) => {
        this.todos[id] = todo;
    }
    this.removeTodo = (id) => {
        delete this.todos[id];
    }
    this.resetTodos = () => {
        this.todos = {};
    }
    this.editTodo = (id, todo) => {
        this.todos[id] = todo;
    }
}

module.exports = { Database };