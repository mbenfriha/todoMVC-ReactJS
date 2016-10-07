const TodoHeader = React.createClass({

    add(e) {
        this.props.add(this.state.val);
        this.setState({val : ''});

        e.preventDefault();
    },

    getInitialState() {
        return {val : ''};
    },

    handleChange(event){
        this.setState({val : event.target.value})
    },

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.add}>
                    <input className="new-todo" onChange={this.handleChange}
                           value={this.state.val}
                           placeholder="What needs to be done?" />
                </form>
            </header>
        );
    },
});


const TodoFooter = React.createClass({

    completedClicked() {
        this.props.completedClicked();
    },

    activeClicked() {
        this.props.activeClicked();
    },

    allClicked(){
        this.props.allClicked();
    },

    render() {
        return (
            <footer className="footer">
                <span className="todo-count"><strong>{this.props.left}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a onClick={this.allClicked}  href="#/">All</a>
                    </li>
                    <li>
                        <a onClick={this.activeClicked} href="#/active">Active</a>
                    </li>
                    <li>
                        <a onClick={this.completedClicked} href="#/completed">Completed</a>
                    </li>
                </ul>
                <button className="clear-completed">Clear completed</button>
            </footer>
        );
    },
});

const TodoItem = React.createClass({

    delete() {
        this.props.delete(this.props.keyItem);
    },

    complete() {
        this.props.complete(this.props.keyItem);
    },

    render() {

        let classStr = '' ;

        if (this.props.todo.completed)
            classStr += 'completed';

        return (
            <li className={classStr}>
                <div className="view">
                    <input onClick={this.complete} checked={this.props.todo.completed} className="toggle" type="checkbox" />
                    <label>{this.props.todo.name}</label>
                    <button onClick={this.delete} className="destroy" />
                </div>
                <input className="edit" defaultValue="Create a TodoMVC template" />
            </li>
        );
    },
});

const TodoList = React.createClass({



    deleteItem(key){
        console.log(key);
        this.state.todos.splice(key, 1);
        this.setState({todos : this.state.todos});
    },

    completeItem(key){
        this.state.todos[key].completed = !this.state.todos[key].completed;
        this.setState({todos : this.state.todos});
    },

    addItem(item){
        this.state.todos.push({name : item, completed : false});
        this.setState({todos : this.state.todos});
    },

    completedClicked(){
        this.setState({filter: 'completed'});
    },
    activeClicked(){
        this.setState({filter: 'active'});
    },

    allClicked(){
        this.setState({filter: 'all'})
    },

    getFilteredTodos(){

        let { todos } = this.state;

        switch(this.state.filter){
            case 'all':
                return todos;
            case 'active':
                return todos.filter(t => !t.completed);
            case 'completed':
                return todos.filter(t => t.completed);
            default:
                throw new Error('Invalid Filter');
        }
    },


    getInitialState() {
        return {
            todos: [
                { name: 'finir ce tuto', completed: false },
                { name: 'finir uno', completed: true }
            ],
            filter: 'all'
        };
    },

    render() {

        let left = this.state.todos.filter(function(e){return !e.completed}).length;

        let that = this;

        const rows = that.getFilteredTodos().map((todo, i) => {
            return <TodoItem
                complete={that.completeItem}
                delete={that.deleteItem} todo={todo} keyItem={i} key={i}
                />;
        });

        return (
            <div>
                <TodoHeader add={that.addItem} />
                <section className="main">
                    <input className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {rows}
                    </ul>
                </section>
                <TodoFooter left={left} allClicked={that.allClicked} completedClicked={that.completedClicked} activeClicked={that.activeClicked} />
            </div>
        );
    },
});

ReactDOM.render(
    <TodoList />,
    document.getElementById('todoapp')
);
