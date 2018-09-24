import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { Helmet } from 'react-helmet';
import Todo from '../../components/todo-item/Todo';
import { callAddTodo } from '../../../api/redux/async-actions';
import EventListener from 'react-event-listener';

class Home extends React.Component{
  constructor(props){
    super(props);
    console.log('create Home');
  }

  componentDidMount() {
    console.log('mount Home');
  }

  componentWillUnmount() {
    console.log('unmount Home');
  }


  handleAddTodo = (e) => {
    const { dispatchCallAddTodo } = this.props;

    if (e.key === 'Enter') {
      const elem = e.target;
      e.preventDefault();
      dispatchCallAddTodo(elem.value);
      elem.value = '';
    }
  };
   handleResize = ()=>{
    console.log(1);
  };
  render(){
    const { todos } = this.props;
    console.log('render Home');

    return (
      <div className="todo-wrapper">
        <EventListener
          target="window"
          onResize={this.handleResize}
        />
        <Helmet>
          <title>Homepage</title>
          <meta name="description" content="This is homepage. Just Helmet SSR demo" />
          <meta property="og:title" content="This is homepage. Just Helmet SSR demo for OG" />
        </Helmet>
        <div>
          <input
            type="text"
            className="add-todo-input"
            placeholder="Add todo item ..."
            onKeyPress={this.handleAddTodo}
          />
        </div>
        <div>
          {todos.map((t, i) => (
            <Todo
              todoId={t._id}
              message={t.message}
              finished={t.finished}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  todos: array.isRequired,
  dispatchCallAddTodo: func.isRequired,
};

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = dispatch => ({
  dispatchCallAddTodo: data => dispatch(callAddTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
