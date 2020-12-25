const fs = require('fs');
const { argv } = require('process');
const yargs = require('yargs');

const args = yargs.argv;
var command = args._[0];

//-----USAGE-----//
let usage = `Usage :-

$ ./todo add TITLE        # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del TITLE        # Delete a todo
$ ./todo help             # Show usage`;

//-------ADD FUNCTION------//
var add = (title)=>{
    var todos = fetchTodos();
    var todo = {
        title
    };

     var duplicateTodos = todos.filter((todo)=> todo.title == title);

    if(duplicateTodos.length === 0){
    todos.push(todo);
    saveTodos(todos);
    return true;
    }  
};

//----DELETE FUNCTION------//
var del = (title)=>{
    var todos = fetchTodos();
    var filteredtodos = todos.filter((e)=>{ 
        return e.title !== title;
    });
    saveTodos(filteredtodos);

    return todos.length !== filteredtodos.length;
};

//-----LS FUNCTION------//
var ls = ()=>{
    return fetchTodos();
};

//-----UTILITY FUNCTION-----//
var fetchTodos = () => {
    try {
      var todosString = fs.readFileSync('todos-data.json');
      return JSON.parse(todosString);
    } catch (e) {
      return [];
    }
  };

var saveTodos = (todos)=>{
    fs.writeFileSync('todos-data.json', JSON.stringify(todos));
};

var logTodos = (todo)=>{

    console.log(todo.title);
}

//------Logic-------//

if(command === 'add'){
   var todoAdded = add(args.title);
   var message = todoAdded ? 'Todo was added' : 'Failed to add';
   console.log(message);
}else if(command === 'del'){
    var todoDeleted = del(args.title);
    var message = todoDeleted ? 'Todo was deleted':'Todo was not found';
    console.log(message);
}else if(command === 'ls'){
    var allTodos = ls();
    allTodos.forEach((element) => logTodos(element));
    }else if(command === 'help'){
        console.log(usage);
    }else if(command == null){
        console.log(usage);
    }else{
    console.log('Invalid command.');
}