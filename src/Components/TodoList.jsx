import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                {
                    userId: 1,
                    id: 1,
                    title: 'delectus aut autem',
                    completed: false,
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'quis ut nam facilis et officia qui',
                    completed: false,
                },
                {
                    userId: 1,
                    id: 3,
                    title: 'fugiat veniam minus',
                    completed: false,
                },
                {
                    userId: 1,
                    id: 4,
                    title: 'et porro tempora',
                    completed: true,
                },
                {
                    userId: 1,
                    id: 5,
                    title:
                        'laboriosam mollitia et enim quasi adipisci quia provident illum',
                    completed: false,
                },
                {
                    userId: 1,
                    id: 6,
                    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
                    completed: false,
                },
            ],
        };
    }

    componentWillMount() {
        fetch('https://jsonplaceholder.typicode.com/todos?_start=7&_limit=20')
            .then((response) => response.json())
            .then((response) => {
                let todos = this.state.todoList;
                const todoList = todos.concat(response);
                console.log(response);
                this.setState({
                    todoList,
                });
            });
    }

    handleToggle = (index) => {
        const { todoList: todos } = this.state;

        let completed = todos[index].completed;
        console.log(completed);
        this.setState((prevState) => ({
            todoList: prevState.todoList.map((el, ind) =>
                ind === index ? { ...el, completed: !completed } : el,
            ),
        }));
    };

    handleDelete = (index) => {
        const { todoList: todos } = this.state;
        const todoList = todos.filter((el, ind) => ind !== index);
        this.setState({
            todoList,
        });
    };

    handleEdit = (index, value) => {
        const todoList = this.state.todoList.slice();
        todoList[index].title = value;

        console.log(value)

        this.setState({
            todoList,
        });
    };

    handleTodo = (input) => {
        let value = input.value;
        if (!value) return;
        let newTodoObj = {
            userId: 1,
            id: Date.now(),
            title: value,
            completed: false,
        };

        this.setState((prevState) => ({
            todoList: prevState.todoList.concat(newTodoObj),
        }));

        input.value = '';
    };

    render() {
        const { todoList } = this.state;

        const todos = todoList.map((todo, index) => {
            console.log(todo.id)
            return (
                <TodoItem
                    onToggle={() => this.handleToggle(index)}
                    onDelete={() => this.handleDelete(index)}
                    onEdit={(value) => this.handleEdit(index, value)}
                    key={todo.id}
                    todo={todo}
                />
            );
        });

        return (
            <Fragment>
                <AddTodo addTodo={this.handleTodo} />
                <ul className='todo-list'>{todos.reverse()}</ul>
            </Fragment>
        );
    }
}

export default TodoList