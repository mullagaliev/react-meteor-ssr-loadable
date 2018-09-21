import React, {Component} from 'react';

class Loading extends Component {

  componentDidMount() {
    console.log('loading');
  }


  componentWillUnmount() {
    console.log('loading finish');
  }

  render() {
    return (
      <div>
        Loading
      </div>
    );
  }
}

export default Loading;
