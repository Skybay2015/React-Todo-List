import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            editedValue: '',
        };
    }

    changeEditingStatus = () => {
        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
        }));
    };

    changeValue = (e) => {
        let input = e.target;

        this.setState({
            editedValue: input.value,
        });
    };

    render() {
        const { todo } = this.props;
        return (
            <li className='todo'>
                <h2
                    hidden={this.state.isEditing}
                    className={`todo__title'${
                        todo.completed ? ' completed' : ''
                    }`}>
                    {todo.title}
                </h2>

                <input
                    hidden={!this.state.isEditing}
                    value={this.state.editedValue}
                    onChange={this.changeValue}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            this.props.onEdit(this.state.editedValue);
                            this.setState({
                                isEditing: false,
                                editedValue: '',
                            });
                        }
                    }}
                />

                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={this.props.onToggle}
                />
                <button className='todo__delete' onClick={this.props.onDelete}>
                    Delete this todo
                </button>
                <button
                    className='todo__edit'
                    onClick={this.changeEditingStatus}>
                    Edit todo
                </button>
            </li>
        );
    }
}

export default TodoItem;
