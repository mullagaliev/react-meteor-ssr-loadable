import React, {Component} from 'react';

export class Error extends Component {
  static defaultProps = {
    text: 'Some error'
  };

  render() {
    const {text} = this.props;
    return (
      <div style={{color: 'red'}}>
        {text}
      </div>
    );
  }
}

export default Error;
