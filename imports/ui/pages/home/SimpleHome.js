import React from "react";
import ReactDOM from "react-dom";

export default class SimpleHome extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log({
      props: this.props,
      prevProps
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    if(text)
      this.props.handleInsert(text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleRemove = (event) => {
    event.preventDefault();
    this.props.handleRemove();
  }

  render() {
    const {todos} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="textInput"/>
        <button onClick={this.handleRemove} disabled={todos.length  === 0} type='button'>Remove ALL</button>
        {todos.map((item)=>{
          return <div key={item._id}>
            <h2>{item.message}</h2>
          </div>
        })}
      </form>
    );
  }
}

SimpleHome.defaultProps = {
  todos: [],
  handleInsert: ()=>{},
  handleRemove: ()=>{},
};
