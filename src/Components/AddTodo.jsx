import React, { Component } from 'react';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.addTodoInput = React.createRef()
    }

    render() {
        return (
            <div className='add-todo'>
                <input type='text' 
                className='add-todo__input' 
                ref={this.addTodoInput} 
                onKeyDown={(e) =>{
                    if (e.keyCode === 13) {
                        this.props.addTodo(this.addTodoInput.current)
                    }
                }} />
                <button
                    className='add-todo__button'
                    onClick={() => {
                        this.props.addTodo(this.addTodoInput.current);
                    }}>
                    Add todo
                </button>
            </div>
        );
    }
}

export default AddTodo;