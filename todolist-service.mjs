export class TodolistService {
    
    todolist = ["Programmer","Zaman","Now"];

    getJsonTodolist() {
        return JSON.stringify({
            code:200,
            status:"Ok",
            data: this.todolist.map((value,index) => {
                return {
                    id: index,
                    todo: value
                }
            })
        });
    }

    getJsonAddedTodolist() {
        var todo = this.todolist[this.todolist.length-1];

        var newTodo = [
            todo
        ];

        return JSON.stringify({
            code:200,
            status:"Success added",
            data: newTodo.map((todo) => {
                return {
                    id: this.todolist.length-1,
                    todo: todo
                }
            })
        });
    }

    getJsonItemTodolist(id,status) {
        var todo = this.todolist[id];

        var todoItem = [
            todo
        ];

        return JSON.stringify({
            code:200,
            status:status,
            data: todoItem.map((todo) => {
                return {
                    id: id,
                    todo: todo
                }
            })
        });
    }

    responseNotFound() {
        return JSON.stringify({
            code:404,
            status:"To do item not found",
            data: {}
        });
    }

    getTodolist(request, response) {
        response.write(this.getJsonTodolist());
        response.end();
    }

    createTodolist(request,response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.todolist.push(body.todo);

            response.write(this.getJsonAddedTodolist());
            response.end();
        });
    }

    updateTodolist(request,response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if (this.todolist[body.id]) {
                this.todolist[body.id] = body.todo;
                response.write(this.getJsonItemTodolist(body.id,"Add todo item success"));
            } else {
                response.write(this.responseNotFound());
            }
            response.end();
        });
    }

    deleteTodolist(request,response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if (this.todolist[body.id]) {
                var res = this.getJsonItemTodolist(body.id,"Delete todo item success");
                this.todolist.splice(body.id,1);
                response.write(res);
            } else {
                response.write(this.responseNotFound());
            }
            response.end();
        });
    }

}